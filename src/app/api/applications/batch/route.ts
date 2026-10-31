import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/lib/auth";
import { getDb } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const prisma = getDb();
    const session = await getServerSession(getAuthOptions());
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ensure user exists in database (for users who signed in before PrismaAdapter was added)
    try {
      const existingUser = await prisma.user.findUnique({
        where: { id: session.user.id },
      });
      if (!existingUser) {
        await prisma.user.create({
          data: {
            id: session.user.id,
            name: session.user.name || "User",
            email: session.user.email || "",
            image: session.user.image || "",
          },
        });
      }
    } catch (userError) {
      console.warn("Could not ensure user exists:", userError);
    }

    const body = (await req.json()) as Record<string, any>;
    const { applications, mode } = body; // mode: "append" | "replace"

    if (!Array.isArray(applications)) {
      return NextResponse.json({ error: "Applications array is required" }, { status: 400 });
    }

    if (applications.length === 0 && mode !== "replace") {
      return NextResponse.json({ error: "Applications array is empty" }, { status: 400 });
    }

    const validStatuses = [
      "Wishlist",
      "Applied",
      "Assessment",
      "Interview",
      "Offer",
      "Rejected",
      "Withdrawn",
    ];

    // Transaction for atomic batch operation
    await prisma.$transaction(async (tx) => {
      if (mode === "replace") {
        await tx.jobApplication.deleteMany({
          where: { userId: session.user.id },
        });
      }

      for (const item of applications) {
        if (!item.company || !item.position) continue;

        const safeStatus = validStatuses.includes(item.status) ? item.status : "Applied";

        const app = await tx.jobApplication.create({
          data: {
            userId: session.user.id,
            company: String(item.company).trim(),
            position: String(item.position).trim(),
            location: item.location ? String(item.location).trim() : "",
            jobUrl: item.jobUrl ? String(item.jobUrl).trim() : "",
            status: safeStatus,
            detailedProgress: item.detailedProgress ? String(item.detailedProgress).trim() : safeStatus,
            appliedDate:
              item.appliedDate && String(item.appliedDate).trim()
                ? String(item.appliedDate).trim()
                : new Date().toISOString().split("T")[0],
            salary: item.salary ? String(item.salary).trim() : "",
            jobType: item.jobType ? String(item.jobType).trim() : "Fulltime",
            referralSource: item.referralSource ? String(item.referralSource).trim() : "LinkedIn",
            notes: item.notes ? String(item.notes).trim() : "",
            followUpDate: item.followUpDate ? String(item.followUpDate).trim() : "",
            rowNumber: typeof item.rowNumber === "number" ? item.rowNumber : null,
          },
        });

        // If interviews are present in import/restore
        if (Array.isArray(item.interviews) && item.interviews.length > 0) {
          for (const interview of item.interviews) {
            if (!interview.stage || !interview.date) continue;
            await tx.interviewSession.create({
              data: {
                applicationId: app.id,
                stage: String(interview.stage).trim(),
                date: String(interview.date).trim(),
                time: interview.time ? String(interview.time).trim() : "",
                interviewer: interview.interviewer ? String(interview.interviewer).trim() : "",
                meetingLink: interview.meetingLink ? String(interview.meetingLink).trim() : "",
                notes: interview.notes ? String(interview.notes).trim() : "",
                completed: Boolean(interview.completed),
              },
            });
          }
        }
      }
    });

    const currentApps = await prisma.jobApplication.findMany({
      where: { userId: session.user.id },
      include: {
        interviews: {
          orderBy: { date: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: currentApps,
      count: currentApps.length,
    });
  } catch (error) {
    console.error("Failed batch processing:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Failed to process batch applications" }, { status: 500 });
  }
}
