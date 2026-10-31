import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/lib/auth";
import { getDb } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const prisma = getDb();
    const session = await getServerSession(getAuthOptions());
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ensure user exists in database
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

    const applications = await prisma.jobApplication.findMany({
      where: { userId: session.user.id },
      include: {
        interviews: {
          orderBy: { date: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: applications });
  } catch (error) {
    console.error("Failed to fetch applications:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Internal server error while fetching applications" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const prisma = getDb();
    const session = await getServerSession(getAuthOptions());
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ensure user exists in database
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
    const {
      company,
      position,
      location,
      jobUrl,
      status,
      detailedProgress,
      appliedDate,
      salary,
      jobType,
      referralSource,
      notes,
      followUpDate,
      rowNumber,
    } = body;

    // Strict validation
    if (!company || typeof company !== "string" || !company.trim()) {
      return NextResponse.json({ error: "Company name is required" }, { status: 400 });
    }
    if (!position || typeof position !== "string" || !position.trim()) {
      return NextResponse.json({ error: "Job position is required" }, { status: 400 });
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
    const safeStatus = validStatuses.includes(status) ? status : "Applied";

    const newApp = await prisma.jobApplication.create({
      data: {
        userId: session.user.id,
        company: company.trim(),
        position: position.trim(),
        location: typeof location === "string" ? location.trim() : "",
        jobUrl: typeof jobUrl === "string" ? jobUrl.trim() : "",
        status: safeStatus,
        detailedProgress: typeof detailedProgress === "string" ? detailedProgress.trim() : safeStatus,
        appliedDate:
          typeof appliedDate === "string" && appliedDate
            ? appliedDate
            : new Date().toISOString().split("T")[0],
        salary: typeof salary === "string" ? salary.trim() : "",
        jobType: typeof jobType === "string" ? jobType.trim() : "Fulltime",
        referralSource: typeof referralSource === "string" ? referralSource.trim() : "LinkedIn",
        notes: typeof notes === "string" ? notes.trim() : "",
        followUpDate: typeof followUpDate === "string" ? followUpDate.trim() : "",
        rowNumber: typeof rowNumber === "number" ? rowNumber : null,
      },
      include: {
        interviews: true,
      },
    });

    return NextResponse.json({ data: newApp }, { status: 201 });
  } catch (error) {
    console.error("Failed to create application:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Internal server error while creating application" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const prisma = getDb();
    const session = await getServerSession(getAuthOptions());
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Atomic wipe of all user applications & interviews
    const result = await prisma.jobApplication.deleteMany({
      where: { userId: session.user.id },
    });

    return NextResponse.json({
      success: true,
      message: "All applications deleted successfully from database",
      count: result.count,
    });
  } catch (error) {
    console.error("Failed to clear all applications:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Failed to clear applications from database" },
      { status: 500 }
    );
  }
}
