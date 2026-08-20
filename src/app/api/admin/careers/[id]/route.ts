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

export const dynamic = "force-dynamic";

/* ======================================================
   GET ONE CAREER
====================================================== */

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const career = await prisma.career.findUnique({
      where: {
        id,
      },
    });

    if (!career) {
      return NextResponse.json(
        {
          success: false,
          message: "Career vacancy not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: career,
    });
  } catch (error) {
    console.error("GET CAREER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch career vacancy.",
      },
      {
        status: 500,
      }
    );
  }
}

/* ======================================================
   UPDATE FULL CAREER
====================================================== */

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existingCareer =
      await prisma.career.findUnique({
        where: {
          id,
        },
      });

    if (!existingCareer) {
      return NextResponse.json(
        {
          success: false,
          message: "Career vacancy not found.",
        },
        {
          status: 404,
        }
      );
    }

    let deadline: Date | null = null;

    if (body.deadline) {
      deadline = new Date(
        `${body.deadline}T12:00:00`
      );

      if (Number.isNaN(deadline.getTime())) {
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

    const career = await prisma.career.update({
      where: {
        id,
      },

      data: {
        title:
          body.title?.trim() ||
          existingCareer.title,

        department:
          body.department?.trim() ||
          existingCareer.department,

        location:
          body.location?.trim() ||
          existingCareer.location,

        employmentType:
          body.employmentType ||
          existingCareer.employmentType,

        workMode:
          body.workMode ||
          existingCareer.workMode,

        experienceLevel:
          body.experienceLevel?.trim() ||
          existingCareer.experienceLevel,

        shortDescription:
          body.shortDescription?.trim() ||
          existingCareer.shortDescription,

        description:
          body.description?.trim() ||
          existingCareer.description,

        responsibilities:
          Array.isArray(body.responsibilities)
            ? body.responsibilities
                .map((item: string) => item.trim())
                .filter(Boolean)
            : existingCareer.responsibilities,

        requirements:
          Array.isArray(body.requirements)
            ? body.requirements
                .map((item: string) => item.trim())
                .filter(Boolean)
            : existingCareer.requirements,

        skills:
          Array.isArray(body.skills)
            ? body.skills
                .map((item: string) => item.trim())
                .filter(Boolean)
            : existingCareer.skills,

        salaryRange:
          body.salaryRange?.trim() || null,

        applicationEmail:
          body.applicationEmail?.trim() || null,

        applicationUrl:
          body.applicationUrl?.trim() || null,

        deadline,

        status:
          body.status === "CLOSED"
            ? "CLOSED"
            : "OPEN",

        isPublished:
          typeof body.isPublished === "boolean"
            ? body.isPublished
            : existingCareer.isPublished,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Career vacancy updated successfully.",
      data: career,
    });
  } catch (error) {
    console.error("UPDATE CAREER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update career vacancy.",
      },
      {
        status: 500,
      }
    );
  }
}

/* ======================================================
   QUICK UPDATE
   visibility / status / deadline
====================================================== */

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existingCareer =
      await prisma.career.findUnique({
        where: {
          id,
        },
      });

    if (!existingCareer) {
      return NextResponse.json(
        {
          success: false,
          message: "Career vacancy not found.",
        },
        {
          status: 404,
        }
      );
    }

    const updateData: {
      isPublished?: boolean;
      status?: "OPEN" | "CLOSED";
      deadline?: Date | null;
    } = {};

    if (
      typeof body.isPublished === "boolean"
    ) {
      updateData.isPublished =
        body.isPublished;
    }

    if (
      body.status === "OPEN" ||
      body.status === "CLOSED"
    ) {
      updateData.status =
        body.status;
    }

    if (body.deadline !== undefined) {
      if (!body.deadline) {
        updateData.deadline = null;
      } else {
        const parsedDeadline =
          new Date(
            `${body.deadline}T12:00:00`
          );

        if (
          Number.isNaN(
            parsedDeadline.getTime()
          )
        ) {
          return NextResponse.json(
            {
              success: false,
              message: "Invalid deadline.",
            },
            {
              status: 400,
            }
          );
        }

        updateData.deadline =
          parsedDeadline;
      }
    }

    const career = await prisma.career.update({
      where: {
        id,
      },

      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Career vacancy updated successfully.",
      data: career,
    });
  } catch (error) {
    console.error("PATCH CAREER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update career vacancy.",
      },
      {
        status: 500,
      }
    );
  }
}

/* ======================================================
   DELETE
====================================================== */

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const existingCareer =
      await prisma.career.findUnique({
        where: {
          id,
        },
      });

    if (!existingCareer) {
      return NextResponse.json(
        {
          success: false,
          message: "Career vacancy not found.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.career.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Career vacancy deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE CAREER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete career vacancy.",
      },
      {
        status: 500,
      }
    );
  }
}

// type Props = {
//   params: Promise<{
//     id: string;
//   }>;
// };

// export async function GET(
//   request: NextRequest,
//   { params }: Props
// ) {
//   try {
//     const { id } = await params;

//     const career = await prisma.career.findUnique({
//       where: {
//         id,
//       },
//     });

//     if (!career) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Career vacancy not found.",
//         },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       data: career,
//     });
//   } catch (error) {
//     console.error("GET CAREER ERROR:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to fetch career vacancy.",
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(
//   request: NextRequest,
//   { params }: Props
// ) {
//   try {
//     const { id } = await params;
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

//     const career = await prisma.career.update({
//       where: {
//         id,
//       },

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

//         status,
//         isPublished,
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Career vacancy updated successfully.",
//       data: career,
//     });
//   } catch (error) {
//     console.error("UPDATE CAREER ERROR:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to update career vacancy.",
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(
//   request: NextRequest,
//   { params }: Props
// ) {
//   try {
//     const { id } = await params;
//     const body = await request.json();

//     const updateData: {
//       isPublished?: boolean;
//       status?: "OPEN" | "CLOSED";
//       deadline?: Date | null;
//     } = {};

//     if (typeof body.isPublished === "boolean") {
//       updateData.isPublished = body.isPublished;
//     }

//     if (body.status) {
//       updateData.status = body.status;
//     }

//     if (body.deadline !== undefined) {
//       updateData.deadline = body.deadline
//         ? new Date(body.deadline)
//         : null;
//     }

//     const career = await prisma.career.update({
//       where: {
//         id,
//       },
//       data: updateData,
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Career vacancy updated successfully.",
//       data: career,
//     });
//   } catch (error) {
//     console.error("CAREER PATCH ERROR:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to update career vacancy.",
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   request: NextRequest,
//   { params }: Props
// ) {
//   try {
//     const { id } = await params;

//     await prisma.career.delete({
//       where: {
//         id,
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Career vacancy deleted successfully.",
//     });
//   } catch (error) {
//     console.error("DELETE CAREER ERROR:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to delete career vacancy.",
//       },
//       { status: 500 }
//     );
//   }
// }