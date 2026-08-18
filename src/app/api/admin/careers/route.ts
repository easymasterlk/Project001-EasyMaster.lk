// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "../../../../lib/prisma";

// export async function GET() {
//   try {
//     const careers = await prisma.career.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       data: careers,
//     });
//   } catch (error) {
//     console.error("GET CAREERS ERROR:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to fetch career vacancies.",
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     const {
//       title,
//       department,
//       location,
//       employmentType,
//       workMode,
//       experienceLevel,
//       shortDescription,
//       description,
//       responsibilities,
//       requirements,
//       skills,
//       salaryRange,
//       applicationEmail,
//       applicationUrl,
//       deadline,
//       status,
//       isPublished,
//     } = body;

//     if (
//       !title ||
//       !department ||
//       !location ||
//       !employmentType ||
//       !workMode ||
//       !experienceLevel ||
//       !shortDescription ||
//       !description
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Please fill all required fields.",
//         },
//         { status: 400 }
//       );
//     }

//     const career = await prisma.career.create({
//       data: {
//         title,
//         department,
//         location,
//         employmentType,
//         workMode,
//         experienceLevel,
//         shortDescription,
//         description,

//         responsibilities: responsibilities || [],
//         requirements: requirements || [],
//         skills: skills || [],

//         salaryRange: salaryRange || null,
//         applicationEmail: applicationEmail || null,
//         applicationUrl: applicationUrl || null,

//         deadline: deadline ? new Date(deadline) : null,

//         status: status || "OPEN",
//         isPublished: isPublished ?? true,
//       },
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Career vacancy created successfully.",
//         data: career,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("CREATE CAREER ERROR:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to create career vacancy.",
//       },
//       { status: 500 }
//     );
//   }
// }


import {
  NextRequest,
  NextResponse,
} from "next/server";

import { prisma } from "../../../../lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const careers = await prisma.career.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: careers,
      },
      {
        status: 200,

        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("ADMIN GET CAREERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch career vacancies.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const {
      title,
      department,
      location,
      employmentType,
      workMode,
      experienceLevel,

      shortDescription,
      description,

      responsibilities,
      requirements,
      skills,

      salaryRange,
      applicationEmail,
      applicationUrl,

      deadline,

      status,
      isPublished,
    } = body;

    if (
      !title?.trim() ||
      !department?.trim() ||
      !location?.trim() ||
      !employmentType ||
      !workMode ||
      !experienceLevel?.trim() ||
      !shortDescription?.trim() ||
      !description?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    let parsedDeadline: Date | null = null;

    if (deadline) {
      parsedDeadline = new Date(
        `${deadline}T12:00:00`
      );

      if (Number.isNaN(parsedDeadline.getTime())) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid application deadline.",
          },
          {
            status: 400,
          }
        );
      }
    }

    const career = await prisma.career.create({
      data: {
        title: title.trim(),

        department:
          department.trim(),

        location:
          location.trim(),

        employmentType,
        workMode,

        experienceLevel:
          experienceLevel.trim(),

        shortDescription:
          shortDescription.trim(),

        description:
          description.trim(),

        responsibilities:
          Array.isArray(responsibilities)
            ? responsibilities
                .map((item: string) => item.trim())
                .filter(Boolean)
            : [],

        requirements:
          Array.isArray(requirements)
            ? requirements
                .map((item: string) => item.trim())
                .filter(Boolean)
            : [],

        skills:
          Array.isArray(skills)
            ? skills
                .map((item: string) => item.trim())
                .filter(Boolean)
            : [],

        salaryRange:
          salaryRange?.trim() || null,

        applicationEmail:
          applicationEmail?.trim() || null,

        applicationUrl:
          applicationUrl?.trim() || null,

        deadline: parsedDeadline,

        status:
          status === "CLOSED"
            ? "CLOSED"
            : "OPEN",

        isPublished:
          typeof isPublished === "boolean"
            ? isPublished
            : true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Career vacancy created successfully.",
        data: career,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("CREATE CAREER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create career vacancy.",
      },
      {
        status: 500,
      }
    );
  }
}