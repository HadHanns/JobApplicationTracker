import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/lib/auth";
import { getDb } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; interviewId: string }> }
) {
  try {
    const { id, interviewId } = await params;
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

    const existingInterview = await prisma.interviewSession.findFirst({
      where: {
        id: interviewId,
        applicationId: id,
      },
    });

    if (!existingInterview) {
      return NextResponse.json({ error: "Interview not found" }, { status: 404 });
    }

    const body = await req.json();
    const updateData: Record<string, any> = {};

    if (typeof body.completed === "boolean") {
      updateData.completed = body.completed;
    }
    if (typeof body.stage === "string" && body.stage.trim()) {
      updateData.stage = body.stage.trim();
    }
    if (typeof body.date === "string" && body.date.trim()) {
      updateData.date = body.date.trim();
    }
    if (typeof body.time === "string") updateData.time = body.time.trim();
    if (typeof body.interviewer === "string") updateData.interviewer = body.interviewer.trim();
    if (typeof body.meetingLink === "string") updateData.meetingLink = body.meetingLink.trim();
    if (typeof body.notes === "string") updateData.notes = body.notes.trim();

    const updated = await prisma.interviewSession.update({
      where: { id: interviewId },
      data: updateData,
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("Failed to update interview:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Failed to update interview" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; interviewId: string }> }
) {
  try {
    const { id, interviewId } = await params;
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

    const existingInterview = await prisma.interviewSession.findFirst({
      where: {
        id: interviewId,
        applicationId: id,
      },
    });

    if (!existingInterview) {
      return NextResponse.json({ error: "Interview not found" }, { status: 404 });
    }

    await prisma.interviewSession.delete({
      where: { id: interviewId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete interview:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Failed to delete interview" }, { status: 500 });
  }
}
