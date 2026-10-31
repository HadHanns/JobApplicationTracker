import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/lib/auth";
import { getDb } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
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
      include: {
        interviews: {
          orderBy: { date: "asc" },
        },
      },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({ data: application });
  } catch (error) {
    console.error("Failed to get application:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Failed to retrieve application" }, { status: 500 });
  }
}

export async function PUT(
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

    // Verify ownership
    const existing = await prisma.jobApplication.findFirst({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Application not found or unauthorized" },
        { status: 404 }
      );
    }

    const body = await req.json() as Record<string, any>;

    const validStatuses = [
      "Wishlist",
      "Applied",
      "Assessment",
      "Interview",
      "Offer",
      "Rejected",
      "Withdrawn",
    ];

    const updateData: Record<string, any> = {};
    if (typeof body.company === "string" && body.company.trim()) {
      updateData.company = body.company.trim();
    }
    if (typeof body.position === "string" && body.position.trim()) {
      updateData.position = body.position.trim();
    }
    if (typeof body.location === "string") updateData.location = body.location.trim();
    if (typeof body.jobUrl === "string") updateData.jobUrl = body.jobUrl.trim();
    if (typeof body.status === "string" && validStatuses.includes(body.status)) {
      updateData.status = body.status;
    }
    if (typeof body.detailedProgress === "string") {
      updateData.detailedProgress = body.detailedProgress.trim();
    }
    if (typeof body.appliedDate === "string" && body.appliedDate) {
      updateData.appliedDate = body.appliedDate;
    }
    if (typeof body.salary === "string") updateData.salary = body.salary.trim();
    if (typeof body.jobType === "string") updateData.jobType = body.jobType.trim();
    if (typeof body.referralSource === "string") updateData.referralSource = body.referralSource.trim();
    if (typeof body.notes === "string") updateData.notes = body.notes.trim();
    if (typeof body.followUpDate === "string") {
      updateData.followUpDate = body.followUpDate.trim();
    }

    const updated = await prisma.jobApplication.update({
      where: { id: id },
      data: updateData,
      include: {
        interviews: {
          orderBy: { date: "asc" },
        },
      },
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("Failed to update application:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const prisma = getDb();
    const session = await getServerSession(getAuthOptions());
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify ownership
    const existing = await prisma.jobApplication.findFirst({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Application not found or unauthorized" },
        { status: 404 }
      );
    }

    await prisma.jobApplication.delete({
      where: { id: id },
    });

    return NextResponse.json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    console.error("Failed to delete application:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Failed to delete application" }, { status: 500 });
  }
}
