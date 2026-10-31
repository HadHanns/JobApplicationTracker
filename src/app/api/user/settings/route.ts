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

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        workspaceTitle: true,
        dailyGoalCurrent: true,
        dailyGoalTarget: true,
        name: true,
        email: true,
        image: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: user });
  } catch (error) {
    console.error("Failed to get user settings:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Failed to retrieve user settings" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const prisma = getDb();
    const session = await getServerSession(getAuthOptions());
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as Record<string, any>;
    const updateData: Record<string, any> = {};

    if (typeof body.workspaceTitle === "string" && body.workspaceTitle.trim()) {
      updateData.workspaceTitle = body.workspaceTitle.trim();
    }
    if (typeof body.dailyGoalCurrent === "number") {
      updateData.dailyGoalCurrent = body.dailyGoalCurrent;
    }
    if (typeof body.dailyGoalTarget === "number" && body.dailyGoalTarget > 0) {
      updateData.dailyGoalTarget = body.dailyGoalTarget;
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        workspaceTitle: true,
        dailyGoalCurrent: true,
        dailyGoalTarget: true,
      },
    });

    return NextResponse.json({ data: user });
  } catch (error) {
    console.error("Failed to update user settings:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Failed to update user settings" }, { status: 500 });
  }
}
