import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/lib/auth";
import { getDb } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const prisma = getDb();
    const session = await getServerSession(getAuthOptions());
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const application = await prisma.jobApplication.findFirst({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found or unauthorized" },
        { status: 404 }
      );
    }

    const body = await req.json() as Record<string, any>;
    const { stage, date, time, interviewer, meetingLink, notes } = body;

    if (!stage || typeof stage !== "string" || !stage.trim()) {
      return NextResponse.json({ error: "Interview stage is required" }, { status: 400 });
    }
    if (!date || typeof date !== "string" || !date.trim()) {
      return NextResponse.json({ error: "Scheduled date is required" }, { status: 400 });
    }

    const newInterview = await prisma.interviewSession.create({
      data: {
        applicationId: id,
        stage: stage.trim(),
        date: date.trim(),
        time: typeof time === "string" ? time.trim() : "",
        interviewer: typeof interviewer === "string" ? interviewer.trim() : "",
        meetingLink: typeof meetingLink === "string" ? meetingLink.trim() : "",
        notes: typeof notes === "string" ? notes.trim() : "",
        completed: false,
      },
    });

    // Also update application status to 'Interview' if it was wishlist/applied
    if (application.status === "Wishlist" || application.status === "Applied") {
      await prisma.jobApplication.update({
        where: { id: id },
        data: {
          status: "Interview",
          detailedProgress: stage.trim(),
        },
      });
    }

    return NextResponse.json({ data: newInterview }, { status: 201 });
  } catch (error) {
    console.error("Failed to create interview:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Failed to schedule interview" }, { status: 500 });
  }
}
