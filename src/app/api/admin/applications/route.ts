import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const applications =
      await prisma.careerApplication.findMany({
        orderBy: {
          createdAt: "desc",
        },

        include: {
          career: {
            select: {
              id: true,
              title: true,
              department: true,
              location: true,
            },
          },
        },
      });

    return NextResponse.json(
      {
        success: true,
        data: applications,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "GET APPLICATIONS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load career applications.",
      },
      {
        status: 500,
      }
    );
  }
}