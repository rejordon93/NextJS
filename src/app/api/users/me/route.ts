import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";

export async function GET(request: NextRequest) {
  try {
    const userID = getDataFromToken(request);
    const user = await prisma.user.findUnique({
      where: { id: userID },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
