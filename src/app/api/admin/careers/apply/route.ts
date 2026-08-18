import {
  NextRequest,
  NextResponse,
} from "next/server";

import { prisma } from "../../../../../lib/prisma";

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

    if (
      !jobTitle ||
      !firstName ||
      !lastName ||
      !email
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

      if (
        career.status !== "OPEN" ||
        !career.isPublished
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Applications are no longer accepted for this vacancy.",
          },
          {
            status: 400,
          }
        );
      }

      if (
        career.deadline &&
        new Date(career.deadline) <
          new Date()
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "The application deadline has passed.",
          },
          {
            status: 400,
          }
        );
      }
    }

    const application =
      await prisma.careerApplication.create(
        {
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
              currentRole?.trim() ||
              null,

            experience:
              experience?.trim() ||
              null,

            linkedinUrl:
              linkedinUrl?.trim() ||
              null,

            portfolioUrl:
              portfolioUrl?.trim() ||
              null,

            message:
              message?.trim() ||
              null,
          },
        }
      );

    return NextResponse.json(
      {
        success: true,

        message:
          "Your application has been submitted successfully.",

        data: {
          id: application.id,
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
          "Unable to submit your application.",
      },
      {
        status: 500,
      }
    );
  }
}