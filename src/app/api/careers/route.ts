import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const now = new Date();

    const careers = await prisma.career.findMany({
      where: {
        status: "OPEN",
        isPublished: true,

        OR: [
          {
            deadline: null,
          },
          {
            deadline: {
              gte: now,
            },
          },
        ],
      },

      orderBy: [
        {
          deadline: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return NextResponse.json({
      success: true,
      data: careers,
    });
  } catch (error) {
    console.error("PUBLIC CAREERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load career opportunities.",
      },
      {
        status: 500,
      }
    );
  }
}