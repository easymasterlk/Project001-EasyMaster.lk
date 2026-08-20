import {
  NextRequest,
  NextResponse,
} from "next/server";

import { prisma } from "../../../../../lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

const allowedStatuses = [
  "NEW",
  "REVIEWING",
  "SHORTLISTED",
  "INTERVIEW",
  "HIRED",
  "REJECTED",
];

/* ======================================================
   GET SINGLE APPLICATION
====================================================== */

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const application =
      await prisma.careerApplication.findUnique({
        where: {
          id,
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

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Career application not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error(
      "GET APPLICATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load career application.",
      },
      {
        status: 500,
      }
    );
  }
}

/* ======================================================
   UPDATE APPLICATION STATUS
====================================================== */

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const body =
      await request.json();

    const { status } = body;

    if (
      !status ||
      !allowedStatuses.includes(status)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid application status.",
        },
        {
          status: 400,
        }
      );
    }

    const existingApplication =
      await prisma.careerApplication.findUnique({
        where: {
          id,
        },
      });

    if (!existingApplication) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Career application not found.",
        },
        {
          status: 404,
        }
      );
    }

    const application =
      await prisma.careerApplication.update({
        where: {
          id,
        },

        data: {
          status,
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

    return NextResponse.json({
      success: true,
      message:
        "Application status updated successfully.",
      data: application,
    });
  } catch (error) {
    console.error(
      "UPDATE APPLICATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update application.",
      },
      {
        status: 500,
      }
    );
  }
}

/* ======================================================
   DELETE APPLICATION
====================================================== */

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const existingApplication =
      await prisma.careerApplication.findUnique({
        where: {
          id,
        },
      });

    if (!existingApplication) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Career application not found.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.careerApplication.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Career application deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE APPLICATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete career application.",
      },
      {
        status: 500,
      }
    );
  }
}