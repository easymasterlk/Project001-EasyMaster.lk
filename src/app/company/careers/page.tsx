"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import {
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  Coffee,
  HeartHandshake,
  Laptop2,
  Lightbulb,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react";

/* ===============================================
   TYPES
=============================================== */

type Career = {
  id: string;
  title: string;
  department: string;
  location: string;

  employmentType:
    | "FULL_TIME"
    | "PART_TIME"
    | "INTERNSHIP"
    | "CONTRACT"
    | "FREELANCE";

  workMode:
    | "ONSITE"
    | "REMOTE"
    | "HYBRID";

  experienceLevel: string;

  shortDescription: string;
  description: string;

  responsibilities: string[];
  requirements: string[];
  skills: string[];

  salaryRange?: string | null;

  deadline?: string | null;
};

type ApplicationForm = {
  careerId: string;
  jobTitle: string;

  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  currentRole: string;
  experience: string;

  linkedinUrl: string;
  portfolioUrl: string;

  message: string;
};

const emptyApplication: ApplicationForm = {
  careerId: "",
  jobTitle: "",

  firstName: "",
  lastName: "",

  email: "",
  phone: "",

  currentRole: "",
  experience: "",

  linkedinUrl: "",
  portfolioUrl: "",

  message: "",
};

/* ===============================================
   HELPERS
=============================================== */

function formatEnum(
  value: string
) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase()
    );
}

function formatDate(
  value?: string | null
) {
  if (!value) {
    return "Open until filled";
  }

  return new Date(
    value
  ).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

/* ===============================================
   PAGE
=============================================== */

export default function CareersPage() {
  const [careers, setCareers] =
    useState<Career[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedCareer, setSelectedCareer] =
    useState<Career | null>(null);

  const [openFaq, setOpenFaq] =
    useState<number | null>(0);

  const [submitting, setSubmitting] =
    useState(false);

  const [
    applicationMessage,
    setApplicationMessage,
  ] = useState("");

  const [form, setForm] =
    useState<ApplicationForm>(
      emptyApplication
    );

  /* ===============================================
     LOAD JOBS
  =============================================== */

async function fetchCareers() {
  try {
    setLoading(true);

    const response = await fetch(
      "/api/careers",
      {
        method: "GET",

        cache: "no-store",

        headers: {
          Accept: "application/json",
        },
      }
    );

    const contentType =
      response.headers.get(
        "content-type"
      );

    if (
      !contentType?.includes(
        "application/json"
      )
    ) {
      const text =
        await response.text();

      console.error(
        "Careers API returned non-JSON response:",
        text
      );

      setCareers([]);

      return;
    }

    const data =
      await response.json();

    console.log(
      "PUBLIC CAREERS:",
      data
    );

    if (!response.ok) {
      console.error(
        data.message ||
          "Failed to load careers."
      );

      setCareers([]);

      return;
    }

    if (
      data.success &&
      Array.isArray(data.data)
    ) {
      setCareers(
        data.data
      );
    } else {
      setCareers([]);
    }
  } catch (error) {
    console.error(
      "Failed to load careers:",
      error
    );

    setCareers([]);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    fetchCareers();
  }, []);

  /* ===============================================
     APPLY
  =============================================== */

  function scrollToJobs() {
    document
      .getElementById(
        "open-positions"
      )
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }

  function scrollToApply() {
    document
      .getElementById(
        "apply-now"
      )
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }

  function applyForCareer(
    career: Career
  ) {
    setSelectedCareer(career);

    setForm(
      (previous) => ({
        ...previous,

        careerId:
          career.id,

        jobTitle:
          career.title,
      })
    );

    setApplicationMessage("");

    setTimeout(
      () =>
        scrollToApply(),
      100
    );
  }

  function updateForm(
    field:
      keyof ApplicationForm,
    value: string
  ) {
    setForm(
      (previous) => ({
        ...previous,
        [field]: value,
      })
    );
  }

  async function submitApplication(
    event: React.FormEvent
  ) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setApplicationMessage("");

      const response =
        await fetch(
          "/api/careers/apply",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                form
              ),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        setApplicationMessage(
          data.message ||
            "Unable to submit application."
        );

        return;
      }

      setApplicationMessage(
        "Thank you! Your application has been submitted successfully."
      );

      setForm(
        emptyApplication
      );

      setSelectedCareer(
        null
      );
    } catch {
      setApplicationMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  /* ===============================================
     DATA
  =============================================== */

  const benefits = [
    {
      icon: Rocket,
      title:
        "Career Growth",
      text:
        "Clear opportunities to grow your technical, creative and professional career.",
    },
    {
      icon: Laptop2,
      title:
        "Modern Technology",
      text:
        "Work with modern tools, frameworks and technologies across real-world IT projects.",
    },
    {
      icon: BookOpen,
      title:
        "Continuous Learning",
      text:
        "Learn through mentoring, knowledge sharing, practical challenges and hands-on projects.",
    },
    {
      icon: Users,
      title:
        "Collaborative Team",
      text:
        "Work with a supportive team that values communication, ideas and collaboration.",
    },
    {
      icon: Lightbulb,
      title:
        "Innovation Culture",
      text:
        "Explore new ideas and contribute to creative digital solutions for real business needs.",
    },
    {
      icon: HeartHandshake,
      title:
        "Supportive Workplace",
      text:
        "Be part of a professional environment built around respect, trust and teamwork.",
    },
  ];

  const process = [
    {
      number: "01",
      title:
        "Submit Application",
      text:
        "Choose a suitable opportunity and send us your details.",
    },
    {
      number: "02",
      title:
        "Application Review",
      text:
        "Our team reviews your experience, skills and career interests.",
    },
    {
      number: "03",
      title:
        "Interview",
      text:
        "Selected candidates meet our team for a practical and friendly discussion.",
    },
    {
      number: "04",
      title:
        "Final Decision",
      text:
        "Successful candidates receive the next steps and onboarding information.",
    },
  ];

  const faqs = [
    {
      question:
        "Can undergraduates apply for internships?",
      answer:
        "Yes. EasyMaster welcomes motivated undergraduate students who want practical exposure to the IT industry.",
    },
    {
      question:
        "Can I apply even if there is no matching vacancy?",
      answer:
        "Yes. You can use the Apply Now form and select General Application. We can keep your details for suitable future opportunities.",
    },
    {
      question:
        "Do you provide remote or hybrid opportunities?",
      answer:
        "The working arrangement depends on the role and project requirements. Available work modes are shown clearly on each vacancy.",
    },
    {
      question:
        "How long does the hiring process take?",
      answer:
        "The timeline varies by role, but shortlisted candidates are contacted after the initial application review.",
    },
    {
      question:
        "What should I include in my application?",
      answer:
        "Include accurate contact details, your relevant experience, LinkedIn or portfolio links where applicable, and a short message explaining your interest.",
    },
  ];

  return (
    <main className="overflow-hidden bg-white text-slate-900">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="relative overflow-hidden bg-[#11120f] px-4 pb-16 pt-8 md:px-6 md:pb-24 lg:px-8">
        {/* Background glow */}

        <div className="pointer-events-none absolute left-1/2 top-[-140px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-amber-500/20 blur-[140px]" />

        <div className="pointer-events-none absolute bottom-[-180px] right-[-80px] h-[400px] w-[400px] rounded-full bg-orange-600/10 blur-[130px]" />

        <div className="relative mx-auto max-w-[1400px] rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] px-5 pb-0 pt-12 shadow-2xl md:px-12 lg:px-16 lg:pt-16">

          {/* Badge */}

          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-400">
            <Sparkles size={14} />

            Careers at
            EasyMaster
          </div>

          {/* Heading */}

          <div className="mx-auto mt-8 max-w-5xl text-center">

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-white md:text-6xl lg:text-[72px]">

              Build your career.

              <span className="block bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                Shape what comes next.
              </span>

            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-400 md:text-lg">
              Join a team of
              curious builders,
              designers and
              problem-solvers
              creating modern
              digital experiences
              and meaningful
              technology solutions.
            </p>

            {/* CTA */}

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <button
                onClick={
                  scrollToJobs
                }
                className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-950/20 transition hover:-translate-y-1"
              >
                View Open Positions

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={
                  scrollToApply
                }
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/10"
              >
                Apply Now
              </button>

            </div>
          </div>

          {/* Hero images */}

          <div className="relative mx-auto mt-14 grid max-w-5xl grid-cols-3 items-end gap-3 md:gap-5">

            <div className="relative h-[180px] overflow-hidden rounded-t-[28px] border border-white/10 md:h-[280px] lg:h-[330px]">
              <Image
                src="/images/careers page_02.jpg"
                alt="EasyMaster careers"
                fill
                className="object-cover"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <div className="relative h-[220px] overflow-hidden rounded-t-[30px] border border-amber-400/20 md:h-[330px] lg:h-[390px]">
              <Image
                src="/images/careers page_03.jpg"
                alt="EasyMaster team"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="relative h-[180px] overflow-hidden rounded-t-[28px] border border-white/10 md:h-[280px] lg:h-[330px]">
              <Image
                src="/images/careers page_05.jpg"
                alt="EasyMaster work environment"
                fill
                className="object-cover"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          WHY JOIN
      ========================================= */}

      <section className="px-5 py-24 md:px-8">

        <SectionHeading
          eyebrow="Why EasyMaster"
          title="Why join EasyMaster?"
          description="Build meaningful work, grow with talented people and develop practical experience in a modern IT environment."
        />

        <div className="mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">

          {benefits.map(
            (benefit) => {
              const Icon =
                benefit.icon;

              return (
                <div
                  key={
                    benefit.title
                  }
                  className="group rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-amber-100 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition group-hover:bg-amber-500 group-hover:text-white">
                    <Icon
                      size={23}
                    />
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-slate-900">
                    {
                      benefit.title
                    }
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {
                      benefit.text
                    }
                  </p>
                </div>
              );
            }
          )}

        </div>
      </section>

      {/* =========================================
          BENEFITS
      ========================================= */}

      <section className="bg-slate-50 px-5 py-24 md:px-8">

        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-500">
              Employee Benefits
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              More than just
              a place to work.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-500">
              We believe strong
              teams are built by
              creating space for
              people to learn,
              contribute and grow.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              {[
                "Hands-on project experience",
                "Mentoring and knowledge sharing",
                "Career development opportunities",
                "Collaborative work culture",
                "Exposure to modern technologies",
                "Recognition for good work",
              ].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <Check
                        size={14}
                      />
                    </div>

                    <span className="text-sm font-semibold leading-6 text-slate-700">
                      {item}
                    </span>
                  </div>
                )
              )}

            </div>
          </div>

          <div className="relative h-[470px] overflow-hidden rounded-[32px]">

            <Image
              src="/images/careers page_03.jpg"
              alt="EasyMaster employee benefits"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

            <div className="absolute bottom-0 p-8">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white">
                <Award size={23} />
              </div>

              <h3 className="mt-4 text-2xl font-bold text-white">
                Grow together.
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-white/75">
                Your development
                matters to us, from
                your first day to
                your next major
                career milestone.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          COMPANY CULTURE
      ========================================= */}

      <section className="px-5 py-24 md:px-8">

        <SectionHeading
          eyebrow="Company Culture"
          title="Where ideas become solutions."
          description="Our culture is built around teamwork, continuous improvement and the freedom to contribute meaningful ideas."
        />

        <div className="mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-4">

          <CultureCard
            icon={Lightbulb}
            title="Be Curious"
            text="Ask questions, explore better approaches and keep learning."
          />

          <CultureCard
            icon={Users}
            title="Work Together"
            text="Share knowledge and solve challenges as one team."
          />

          <CultureCard
            icon={Target}
            title="Create Impact"
            text="Focus on solutions that deliver real value to users and businesses."
          />

          <CultureCard
            icon={ShieldCheck}
            title="Take Ownership"
            text="Be responsible for your work and proud of what you deliver."
          />

        </div>
      </section>

      {/* =========================================
          OPEN POSITIONS
      ========================================= */}

      <section
        id="open-positions"
        className="bg-[#11120f] px-5 py-24 md:px-8"
      >

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

            <div>

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-400">
                Join the Team
              </p>

              <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">
                Current open positions.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400">
                Explore available
                opportunities and
                find the role that
                matches your skills,
                interests and career
                goals.
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-slate-300">
              {
                careers.length
              }{" "}
              position
              {careers.length ===
              1
                ? ""
                : "s"}{" "}
              available
            </div>

          </div>

          <div className="mt-12">

            {loading ? (
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center text-slate-400">
                Loading opportunities...
              </div>
            ) : careers.length ===
              0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">

                <BriefcaseBusiness
                  size={32}
                  className="mx-auto text-amber-400"
                />

                <h3 className="mt-4 text-xl font-bold text-white">
                  No open positions
                  right now
                </h3>

                <p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-slate-400">
                  We are always
                  interested in
                  talented people.
                  Submit a general
                  application below
                  and tell us how you
                  could contribute.
                </p>

              </div>
            ) : (
              <div className="grid gap-4">

                {careers.map(
                  (career) => (
                    <div
                      key={
                        career.id
                      }
                      className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-amber-500/30 hover:bg-white/[0.07] md:p-7"
                    >

                      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-2">

                            <span className="rounded-full bg-amber-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-400">
                              {
                                career.department
                              }
                            </span>

                            <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-bold text-slate-400">
                              {formatEnum(
                                career.employmentType
                              )}
                            </span>

                          </div>

                          <h3 className="mt-4 text-xl font-bold text-white md:text-2xl">
                            {
                              career.title
                            }
                          </h3>

                          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                            {
                              career.shortDescription
                            }
                          </p>

                          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-400">

                            <span className="flex items-center gap-1.5">
                              <MapPin
                                size={15}
                                className="text-amber-400"
                              />

                              {
                                career.location
                              }
                            </span>

                            <span className="flex items-center gap-1.5">
                              <Laptop2
                                size={15}
                                className="text-amber-400"
                              />

                              {formatEnum(
                                career.workMode
                              )}
                            </span>

                            <span className="flex items-center gap-1.5">
                              <Clock3
                                size={15}
                                className="text-amber-400"
                              />

                              {
                                career.experienceLevel
                              }
                            </span>

                            <span className="flex items-center gap-1.5">
                              <CalendarDays
                                size={15}
                                className="text-amber-400"
                              />

                              {formatDate(
                                career.deadline
                              )}
                            </span>

                          </div>

                          {career
                            .skills
                            .length >
                            0 && (
                            <div className="mt-5 flex flex-wrap gap-2">

                              {career.skills
                                .slice(
                                  0,
                                  6
                                )
                                .map(
                                  (
                                    skill
                                  ) => (
                                    <span
                                      key={
                                        skill
                                      }
                                      className="rounded-lg bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-slate-300"
                                    >
                                      {
                                        skill
                                      }
                                    </span>
                                  )
                                )}

                            </div>
                          )}

                        </div>

                        <button
                          onClick={() =>
                            applyForCareer(
                              career
                            )
                          }
                          className="group/button flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-1"
                        >
                          Apply Now

                          <ArrowRight
                            size={17}
                            className="transition-transform group-hover/button:translate-x-1"
                          />
                        </button>

                      </div>
                    </div>
                  )
                )}

              </div>
            )}

          </div>
        </div>
      </section>

      {/* =========================================
          INTERNSHIP PROGRAM
      ========================================= */}

      <section className="px-5 py-24 md:px-8">

        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[36px] bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 lg:grid-cols-2">

          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">

            <span className="w-fit rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white">
              Internship Program
            </span>

            <h2 className="mt-6 text-3xl font-black text-white md:text-5xl">
              Start your IT career
              with real experience.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/80">
              Our internship program
              gives undergraduates
              practical exposure to
              real projects, teamwork,
              professional workflows
              and modern technologies.
            </p>

            <div className="mt-8 space-y-3">

              {[
                "Real project exposure",
                "Mentoring from team members",
                "Technical and professional development",
                "Opportunity to build your portfolio",
              ].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-semibold text-white"
                  >
                    <Check
                      size={17}
                    />
                    {item}
                  </div>
                )
              )}

            </div>

            <button
              onClick={
                scrollToApply
              }
              className="mt-9 flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-orange-600 shadow-lg transition hover:-translate-y-1"
            >
              Apply for Internship
              <ArrowRight
                size={17}
              />
            </button>

          </div>

          <div className="relative min-h-[420px]">

            <Image
              src="/images/careers page_02.jpg"
              alt="EasyMaster internship program"
              fill
              className="object-cover"
            />

          </div>
        </div>
      </section>

      {/* =========================================
          HIRING PROCESS
      ========================================= */}

      <section className="bg-slate-50 px-5 py-24 md:px-8">

        <SectionHeading
          eyebrow="Hiring Process"
          title="A simple, transparent journey."
          description="Our hiring process is designed to help us understand your potential while giving you the opportunity to understand EasyMaster."
        />

        <div className="mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">

          {process.map(
            (step) => (
              <div
                key={
                  step.number
                }
                className="relative rounded-3xl border border-slate-100 bg-white p-7 shadow-sm"
              >

                <span className="text-5xl font-black text-amber-100">
                  {
                    step.number
                  }
                </span>

                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  {
                    step.title
                  }
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {
                    step.text
                  }
                </p>

              </div>
            )
          )}

        </div>
      </section>

      {/* =========================================
          WORK ENVIRONMENT
      ========================================= */}

      <section className="px-5 py-24 md:px-8">

        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">

          <div className="relative min-h-[500px] overflow-hidden rounded-[36px]">

            <Image
              src="/images/careers page_05.jpg"
              alt="EasyMaster work environment"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/15 bg-black/30 p-5 backdrop-blur-md">

              <p className="text-sm font-bold text-white">
                Build. Learn.
                Collaborate.
              </p>

              <p className="mt-2 text-xs leading-6 text-white/70">
                A modern environment
                designed for focused
                work, collaboration and
                continuous improvement.
              </p>

            </div>
          </div>

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-500">
              Work Environment
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              Do your best work
              with a team that
              supports you.
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-500">
              We combine structure
              with flexibility,
              helping our teams stay
              productive while
              maintaining strong
              communication and
              collaboration.
            </p>

            <div className="mt-8 grid gap-4">

              <EnvironmentItem
                icon={Workflow}
                title="Collaborative Workflow"
                text="Work across development, design and business teams."
              />

              <EnvironmentItem
                icon={Code2}
                title="Modern Development Practices"
                text="Use industry-relevant workflows, tools and technologies."
              />

              <EnvironmentItem
                icon={Coffee}
                title="Human-Centered Culture"
                text="A professional workplace that values respect and balance."
              />

            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          LEARNING & GROWTH
      ========================================= */}

      <section className="bg-[#11120f] px-5 py-24 md:px-8">

        <div className="mx-auto max-w-7xl">

          <SectionHeadingDark
            eyebrow="Learning & Growth"
            title="Keep moving forward."
            description="Technology changes quickly. We help our team keep learning, experimenting and strengthening the skills needed for tomorrow."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-3">

            <DarkFeature
              icon={BookOpen}
              title="Learn Continuously"
              text="Build knowledge through hands-on work, self-learning and knowledge sharing."
            />

            <DarkFeature
              icon={Zap}
              title="Take New Challenges"
              text="Work on new problems that strengthen your technical and professional capabilities."
            />

            <DarkFeature
              icon={Rocket}
              title="Grow Your Career"
              text="Develop the experience and confidence needed to take the next step."
            />

          </div>
        </div>
      </section>

      {/* =========================================
          TESTIMONIALS
      ========================================= */}

      <section className="px-5 py-24 md:px-8">

        <SectionHeading
          eyebrow="Our People"
          title="What it's like to grow with us."
          description="A workplace experience built around learning, teamwork and meaningful contribution."
        />

        <div className="mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-3">

          <Testimonial
            quote="EasyMaster creates an environment where you can ask questions, learn quickly and contribute to real work from the beginning."
            role="Software Engineering Team"
          />

          <Testimonial
            quote="The collaborative culture makes it easy to share ideas and understand how different parts of a project come together."
            role="Design & Product Team"
          />

          <Testimonial
            quote="Working on practical projects gives you the confidence to improve both your technical skills and professional communication."
            role="Internship Experience"
          />

        </div>
      </section>

      {/* =========================================
          FAQ
      ========================================= */}

      <section className="bg-slate-50 px-5 py-24 md:px-8">

        <div className="mx-auto max-w-4xl">

          <SectionHeading
            eyebrow="FAQ"
            title="Questions before you apply?"
            description="Here are answers to some common questions about careers and internships at EasyMaster."
          />

          <div className="mt-12 space-y-3">

            {faqs.map(
              (
                faq,
                index
              ) => {
                const active =
                  openFaq ===
                  index;

                return (
                  <div
                    key={
                      faq.question
                    }
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                  >

                    <button
                      onClick={() =>
                        setOpenFaq(
                          active
                            ? null
                            : index
                        )
                      }
                      className="flex w-full items-center justify-between gap-5 p-5 text-left"
                    >

                      <span className="font-bold text-slate-800">
                        {
                          faq.question
                        }
                      </span>

                      <ChevronDown
                        size={19}
                        className={`shrink-0 text-amber-500 transition ${
                          active
                            ? "rotate-180"
                            : ""
                        }`}
                      />

                    </button>

                    {active && (
                      <div className="border-t border-slate-100 px-5 py-5 text-sm leading-7 text-slate-500">
                        {
                          faq.answer
                        }
                      </div>
                    )}

                  </div>
                );
              }
            )}

          </div>
        </div>
      </section>

      {/* =========================================
          APPLY NOW
      ========================================= */}

      <section
        id="apply-now"
        className="px-5 py-24 md:px-8"
      >

        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[36px] border border-slate-100 bg-white shadow-xl lg:grid-cols-[0.8fr_1.2fr]">

          {/* Left */}

          <div className="relative overflow-hidden bg-[#11120f] p-8 md:p-12">

            <div className="absolute right-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-amber-500/20 blur-[100px]" />

            <div className="relative">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">
                Apply Now
              </p>

              <h2 className="mt-5 text-3xl font-black text-white md:text-4xl">
                Ready to take
                the next step?
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-400">
                Tell us about
                yourself and the
                opportunity you're
                interested in.
              </p>

              <div className="mt-10 space-y-5">

                <ApplyPoint
                  number="01"
                  text="Choose a position or submit a general application."
                />

                <ApplyPoint
                  number="02"
                  text="Share your professional and contact details."
                />

                <ApplyPoint
                  number="03"
                  text="Our team will review your application."
                />

              </div>

            </div>
          </div>

          {/* Form */}

          <form
            onSubmit={
              submitApplication
            }
            className="p-7 md:p-10"
          >

            <h3 className="text-xl font-bold text-slate-900">
              Application Form
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Fields marked with *
              are required.
            </p>

            {/* Position */}

            <div className="mt-7">

              <FormLabel
                label="Position"
                required
              />

              <select
                required
                value={
                  form.careerId
                }
                onChange={(
                  event
                ) => {
                  const id =
                    event.target
                      .value;

                  const selected =
                    careers.find(
                      (career) =>
                        career.id ===
                        id
                    );

                  if (
                    selected
                  ) {
                    setSelectedCareer(
                      selected
                    );

                    setForm(
                      (
                        previous
                      ) => ({
                        ...previous,
                        careerId:
                          selected.id,
                        jobTitle:
                          selected.title,
                      })
                    );
                  } else {
                    setSelectedCareer(
                      null
                    );

                    setForm(
                      (
                        previous
                      ) => ({
                        ...previous,
                        careerId:
                          "",
                        jobTitle:
                          "General Application",
                      })
                    );
                  }
                }}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              >

                <option value="">
                  General Application
                </option>

                {careers.map(
                  (career) => (
                    <option
                      key={
                        career.id
                      }
                      value={
                        career.id
                      }
                    >
                      {
                        career.title
                      }
                    </option>
                  )
                )}

              </select>

            </div>

            {/* Names */}

            <div className="mt-5 grid gap-5 md:grid-cols-2">

              <FormInput
                label="First Name"
                required
                value={
                  form.firstName
                }
                onChange={(
                  value
                ) =>
                  updateForm(
                    "firstName",
                    value
                  )
                }
              />

              <FormInput
                label="Last Name"
                required
                value={
                  form.lastName
                }
                onChange={(
                  value
                ) =>
                  updateForm(
                    "lastName",
                    value
                  )
                }
              />

            </div>

            {/* Contact */}

            <div className="mt-5 grid gap-5 md:grid-cols-2">

              <FormInput
                label="Email"
                type="email"
                required
                value={
                  form.email
                }
                onChange={(
                  value
                ) =>
                  updateForm(
                    "email",
                    value
                  )
                }
              />

              <FormInput
                label="Phone Number"
                value={
                  form.phone
                }
                onChange={(
                  value
                ) =>
                  updateForm(
                    "phone",
                    value
                  )
                }
              />

            </div>

            {/* Experience */}

            <div className="mt-5 grid gap-5 md:grid-cols-2">

              <FormInput
                label="Current Role / Study Program"
                value={
                  form.currentRole
                }
                onChange={(
                  value
                ) =>
                  updateForm(
                    "currentRole",
                    value
                  )
                }
                placeholder="e.g. IT Undergraduate"
              />

              <FormInput
                label="Experience"
                value={
                  form.experience
                }
                onChange={(
                  value
                ) =>
                  updateForm(
                    "experience",
                    value
                  )
                }
                placeholder="e.g. Entry Level"
              />

            </div>

            {/* URLs */}

            <div className="mt-5 grid gap-5 md:grid-cols-2">

              <FormInput
                label="LinkedIn URL"
                type="url"
                value={
                  form.linkedinUrl
                }
                onChange={(
                  value
                ) =>
                  updateForm(
                    "linkedinUrl",
                    value
                  )
                }
                placeholder="https://linkedin.com/in/..."
              />

              <FormInput
                label="Portfolio / GitHub URL"
                type="url"
                value={
                  form.portfolioUrl
                }
                onChange={(
                  value
                ) =>
                  updateForm(
                    "portfolioUrl",
                    value
                  )
                }
                placeholder="https://..."
              />

            </div>

            {/* Message */}

            <div className="mt-5">

              <FormLabel
                label="Message"
              />

              <textarea
                rows={5}
                value={
                  form.message
                }
                onChange={(
                  event
                ) =>
                  updateForm(
                    "message",
                    event.target
                      .value
                  )
                }
                placeholder="Tell us why you're interested in joining EasyMaster..."
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-slate-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />

            </div>

            {applicationMessage && (
              <div
                className={`mt-5 rounded-xl px-4 py-3 text-sm font-semibold ${
                  applicationMessage.startsWith(
                    "Thank"
                  )
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {
                  applicationMessage
                }
              </div>
            )}

            <button
              type="submit"
              disabled={
                submitting
              }
              className="group mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Submitting..."
                : "Submit Application"}

              {!submitting && (
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>

          </form>

        </div>
      </section>

    </main>
  );
}

/* ===============================================
   COMPONENTS
=============================================== */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">

      <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-500">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
        {title}
      </h2>

      <p className="mt-5 text-base leading-8 text-slate-500">
        {description}
      </p>

    </div>
  );
}

function SectionHeadingDark({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">

      <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-400">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
        {title}
      </h2>

      <p className="mt-5 text-base leading-8 text-slate-400">
        {description}
      </p>

    </div>
  );
}

function CultureCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition hover:-translate-y-2 hover:border-amber-100 hover:shadow-xl">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
        <Icon size={22} />
      </div>

      <h3 className="mt-6 text-lg font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-500">
        {text}
      </p>

    </div>
  );
}

function EnvironmentItem({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
        <Icon size={20} />
      </div>

      <div>

        <h3 className="font-bold text-slate-800">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {text}
        </p>

      </div>
    </div>
  );
}

function DarkFeature({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-400">
        <Icon size={22} />
      </div>

      <h3 className="mt-6 text-lg font-bold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-400">
        {text}
      </p>

    </div>
  );
}

function Testimonial({
  quote,
  role,
}: {
  quote: string;
  role: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">

      <div className="text-5xl font-black leading-none text-amber-300">
        “
      </div>

      <p className="mt-2 text-sm leading-7 text-slate-600">
        {quote}
      </p>

      <div className="mt-6 border-t border-slate-100 pt-5">

        <p className="text-sm font-bold text-slate-800">
          EasyMaster Team
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {role}
        </p>

      </div>
    </div>
  );
}

function ApplyPoint({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-xs font-black text-amber-400">
        {number}
      </div>

      <p className="pt-1 text-sm leading-6 text-slate-300">
        {text}
      </p>

    </div>
  );
}

function FormLabel({
  label,
  required = false,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <label className="mb-2 block text-sm font-semibold text-slate-700">

      {label}

      {required && (
        <span className="ml-1 text-red-500">
          *
        </span>
      )}

    </label>
  );
}

function FormInput({
  label,
  value,
  onChange,
  required = false,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>

      <FormLabel
        label={label}
        required={
          required
        }
      />

      <input
        type={type}
        value={value}
        required={
          required
        }
        placeholder={
          placeholder
        }
        onChange={(
          event
        ) =>
          onChange(
            event.target.value
          )
        }
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
      />

    </div>
  );
}