import {
  NextRequest,
  NextResponse,
} from "next/server";

import { prisma } from "../../../../lib/prisma";

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const {
      careerId,
      jobTitle,

      firstName,
      lastName,

      email,
      phone,

      currentRole,
      experience,

      linkedinUrl,
      portfolioUrl,

      message,
    } = body;

    /* =========================================
       REQUIRED FIELDS
    ========================================= */

    if (
      !jobTitle?.trim() ||
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please complete all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    /* =========================================
       EMAIL VALIDATION
    ========================================= */

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(
        email.trim()
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    /* =========================================
       VALIDATE SELECTED CAREER
    ========================================= */

    if (careerId) {
      const career =
        await prisma.career.findUnique({
          where: {
            id: careerId,
          },
        });

      if (!career) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Selected vacancy no longer exists.",
          },
          {
            status: 404,
          }
        );
      }

      if (career.status !== "OPEN") {
        return NextResponse.json(
          {
            success: false,
            message:
              "This vacancy is currently closed.",
          },
          {
            status: 400,
          }
        );
      }

      if (!career.isPublished) {
        return NextResponse.json(
          {
            success: false,
            message:
              "This vacancy is no longer available.",
          },
          {
            status: 400,
          }
        );
      }

      if (career.deadline) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const deadline =
          new Date(career.deadline);

        deadline.setHours(
          0,
          0,
          0,
          0
        );

        if (deadline < today) {
          return NextResponse.json(
            {
              success: false,
              message:
                "The application deadline for this vacancy has passed.",
            },
            {
              status: 400,
            }
          );
        }
      }
    }

    /* =========================================
       CREATE APPLICATION
    ========================================= */

    const application =
      await prisma.careerApplication.create({
        data: {
          careerId:
            careerId || null,

          jobTitle:
            jobTitle.trim(),

          firstName:
            firstName.trim(),

          lastName:
            lastName.trim(),

          email:
            email
              .trim()
              .toLowerCase(),

          phone:
            phone?.trim() || null,

          currentRole:
            currentRole?.trim() || null,

          experience:
            experience?.trim() || null,

          linkedinUrl:
            linkedinUrl?.trim() || null,

          portfolioUrl:
            portfolioUrl?.trim() || null,

          message:
            message?.trim() || null,

          status: "NEW",
        },
      });

    return NextResponse.json(
      {
        success: true,

        message:
          "Your application has been submitted successfully.",

        data: {
          id: application.id,

          jobTitle:
            application.jobTitle,

          status:
            application.status,

          createdAt:
            application.createdAt,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CAREER APPLICATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to submit your application. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}