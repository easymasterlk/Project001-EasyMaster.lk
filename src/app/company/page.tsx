"use client";

import React from "react";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronRight,
  Code2,
  Compass,
  HeartHandshake,
  Lightbulb,
  MessageSquareQuote,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const stats = [
  {
    value: "2020",
    label: "Our journey began",
  },
  {
    value: "360°",
    label: "Digital solutions",
  },
  {
    value: "100%",
    label: "Client-focused approach",
  },
  {
    value: "∞",
    label: "Ideas to explore",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We explore better technologies, smarter workflows, and thoughtful ideas to create solutions that move businesses forward.",
  },
  {
    icon: ShieldCheck,
    title: "Quality",
    description:
      "From design details to development standards, we care about creating reliable digital experiences with purpose.",
  },
  {
    icon: HeartHandshake,
    title: "Partnership",
    description:
      "We work collaboratively, communicate clearly, and build around the real objectives behind every project.",
  },
  {
    icon: Zap,
    title: "Progress",
    description:
      "We believe great digital products keep evolving. We learn, improve, adapt, and continuously raise the standard.",
  },
];

const aboutLinks = [
  {
    number: "01",
    eyebrow: "Purpose & Direction",
    title: "Mission & Vision",
    description:
      "Discover the purpose that guides our work today and the future we are working to create through technology, creativity, and meaningful digital experiences.",
    href: "/company/mission-vision",
    icon: Target,
  },
  {
    number: "02",
    eyebrow: "Where It Started",
    title: "Our Story",
    description:
      "From creative beginnings to a growing technology-focused team, explore the journey, ideas, lessons, and ambition behind EasyMaster IT Solutions.",
    href: "/company/story",
    icon: Rocket,
  },
  {
    number: "03",
    eyebrow: "People Behind the Work",
    title: "Our Team",
    description:
      "Meet the people, skills, collaboration, and perspectives that turn ideas into useful digital products and memorable creative experiences.",
    href: "/company/team",
    icon: Users,
  },
  {
    number: "04",
    eyebrow: "Grow With Us",
    title: "Careers",
    description:
      "Explore opportunities to learn, contribute, experiment, and grow with a team interested in technology, design, creativity, and real-world problem solving.",
    href: "/company/careers",
    icon: BriefcaseBusiness,
  },
  {
    number: "05",
    eyebrow: "From Our Leadership",
    title: "CEO Message",
    description:
      "Read the perspective behind our direction, the principles that shape our decisions, and the ambition driving the next chapter of EasyMaster.",
    href: "/company/ceo",
    icon: MessageSquareQuote,
  },
];

export default function CompanyOverview() {
  return (
    <main
      className={`${plusJakarta.className} overflow-hidden bg-slate-50 text-slate-950`}
    >
      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}

      <section className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
        {/* background glow */}
        <div className="absolute inset-0">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl" />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24 lg:px-8">
          <div className="grid w-full items-center gap-16 lg:grid-cols-2">
            {/* Left */}
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                <Sparkles size={15} className="text-cyan-400" />

                <span className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                  About EasyMaster IT Solutions
                </span>
              </div>

              <h1 className="max-w-4xl text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                Technology with
                <span className="block text-blue-400">
                  purpose behind it.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                EasyMaster IT Solutions brings technology, design, creativity,
                and problem solving together to build digital experiences that
                help ideas grow into meaningful solutions.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#discover"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 transition duration-300 hover:-translate-y-1 hover:bg-blue-50"
                >
                  Discover our company

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Talk to us
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right Visual */}
            <div className="hidden justify-center lg:flex">
              <div className="relative flex h-96 w-96 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <div className="absolute left-0 top-20 rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl backdrop-blur">
                  <Code2 size={20} className="text-cyan-400" />

                  <p className="mt-3 text-xs font-semibold text-white">
                    Technology
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Built with purpose
                  </p>
                </div>

                <div className="absolute right-0 top-8 rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl backdrop-blur">
                  <Compass size={20} className="text-blue-400" />

                  <p className="mt-3 text-xs font-semibold text-white">
                    Strategy
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Direction that matters
                  </p>
                </div>

                <div className="absolute bottom-8 right-8 rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl backdrop-blur">
                  <Sparkles size={20} className="text-violet-400" />

                  <p className="mt-3 text-xs font-semibold text-white">
                    Creativity
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Experiences people notice
                  </p>
                </div>

                <div className="relative flex h-40 w-40 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-2xl">
                  <span className="text-5xl font-extrabold">EM</span>

                  <div className="absolute -right-3 -top-3 h-7 w-7 rounded-full border-4 border-slate-950 bg-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* STATS                                                            */}
      {/* ================================================================ */}

      <section className="relative z-20 mx-auto -mt-16 max-w-7xl px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-7 py-8 ${
                index !== stats.length - 1
                  ? "border-b border-slate-100 lg:border-b-0 lg:border-r"
                  : ""
              }`}
            >
              <p className="text-3xl font-extrabold tracking-tight text-slate-950">
                {stat.value}
              </p>

              <p className="mt-2 text-xs font-medium text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* WHO WE ARE                                                       */}
      {/* ================================================================ */}

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-blue-600">
                Who we are
              </p>

              <h2 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                More than a
                <span className="block text-slate-400">
                  technology company.
                </span>
              </h2>
            </div>

            <div>
              <p className="text-lg font-medium leading-8 text-slate-700">
                We believe technology becomes valuable when it solves a real
                problem, creates a better experience, or opens a new
                opportunity.
              </p>

              <p className="mt-6 max-w-3xl text-base leading-7 text-slate-500">
                EasyMaster IT Solutions brings together software development,
                digital design, creative thinking, and business understanding.
                Our goal is not simply to create another website or
                application. We aim to understand the idea behind it, shape the
                right experience around it, and build something that can evolve
                alongside the people and businesses using it.
              </p>

              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                {[
                  "Technology-led thinking",
                  "Human-centered experiences",
                  "Creative problem solving",
                  "Long-term improvement",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-semibold text-slate-700"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <Check size={13} strokeWidth={3} />
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* DISCOVER EASYMASTER                                               */}
      {/* ================================================================ */}

      <section
        id="discover"
        className="border-y border-slate-200 bg-white py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-10 bg-blue-600" />

              <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Discover EasyMaster
              </p>
            </div>

            <h2 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Five perspectives.
              <span className="block text-slate-400">
                One evolving company.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-500">
              Explore the ideas, people, journey, opportunities, and leadership
              behind EasyMaster IT Solutions.
            </p>
          </div>

          {/* Mission & Vision */}
          <AboutFeature
            {...aboutLinks[0]}
            visual={
              <div className="relative min-h-80 overflow-hidden rounded-3xl bg-slate-950">
                <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-blue-500/30 blur-3xl" />

                <div className="absolute -bottom-16 -left-12 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-white/10">
                    <div className="absolute h-40 w-40 rounded-full border border-white/10" />

                    <div className="absolute h-24 w-24 rounded-full border border-white/10" />

                    <Target size={42} className="text-blue-400" />

                    <span className="absolute -right-4 top-10 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white">
                      Mission
                    </span>

                    <span className="absolute -bottom-3 left-5 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white">
                      Vision
                    </span>
                  </div>
                </div>
              </div>
            }
          />

          {/* Our Story */}
          <AboutFeature
            {...aboutLinks[1]}
            reverse
            visual={
              <div className="relative min-h-80 overflow-hidden rounded-3xl bg-slate-950 p-8">
                <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-violet-600/20 blur-3xl" />

                <div className="relative flex h-full flex-col justify-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    A journey in progress
                  </p>

                  <div className="mt-9">
                    {[
                      ["2020", "Creative beginnings"],
                      ["Next", "Digital expansion"],
                      ["Today", "EasyMaster IT Solutions"],
                      ["Future", "Build. Learn. Grow."],
                    ].map(([year, text], index) => (
                      <div key={year} className="relative flex gap-5 pb-7">
                        {index !== 3 && (
                          <div className="absolute left-2 top-5 h-full w-px bg-white/10" />
                        )}

                        <div
                          className={`relative mt-1 h-4 w-4 flex-none rounded-full border-4 border-slate-950 ${
                            index === 2 ? "bg-violet-400" : "bg-slate-700"
                          }`}
                        />

                        <div>
                          <p className="text-xs font-bold text-violet-400">
                            {year}
                          </p>

                          <p className="mt-1 text-sm font-semibold text-white">
                            {text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
          />

          {/* Our Team */}
          <AboutFeature
            {...aboutLinks[2]}
            visual={
              <div className="relative min-h-80 overflow-hidden rounded-3xl bg-emerald-950 p-7">
                <div className="absolute -right-16 -top-10 h-60 w-60 rounded-full bg-emerald-400/20 blur-3xl" />

                <div className="relative grid grid-cols-2 gap-4">
                  {[
                    ["SE", "Software", "Engineering"],
                    ["CD", "Creative", "Design"],
                    ["QA", "Quality", "Assurance"],
                    ["PM", "Project", "Management"],
                  ].map(([short, first, second], index) => (
                    <div
                      key={short}
                      className={`flex min-h-32 flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5 ${
                        index === 1 || index === 2 ? "translate-y-4" : ""
                      }`}
                    >
                      <span className="text-2xl font-extrabold text-emerald-400">
                        {short}
                      </span>

                      <p className="text-xs font-semibold leading-5 text-slate-300">
                        {first}
                        <br />
                        {second}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            }
          />

          {/* Careers */}
          <AboutFeature
            {...aboutLinks[3]}
            reverse
            visual={
              <div className="relative min-h-80 overflow-hidden rounded-3xl bg-amber-950 p-8">
                <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-orange-400/20 blur-3xl" />

                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-400/10 px-3 py-2 text-xs font-bold uppercase tracking-widest text-orange-300">
                      Build your future
                    </span>

                    <h3 className="mt-7 max-w-xs text-3xl font-extrabold tracking-tight text-white">
                      Bring your curiosity.
                      <span className="block text-slate-500">
                        Grow with the work.
                      </span>
                    </h3>
                  </div>

                  <div className="mt-10 flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {["01", "02", "03"].map((item) => (
                        <div
                          key={item}
                          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-950 bg-slate-800 text-xs font-bold text-slate-400"
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                    <p className="text-xs leading-5 text-slate-500">
                      Learn.
                      <br />
                      Collaborate. Create.
                    </p>
                  </div>
                </div>
              </div>
            }
          />

          {/* CEO Message */}
          <AboutFeature
            {...aboutLinks[4]}
            visual={
              <div className="relative min-h-80 overflow-hidden rounded-3xl bg-rose-950 p-8">
                <div className="absolute -right-10 top-0 h-60 w-60 rounded-full bg-rose-500/20 blur-3xl" />

                <div className="relative flex h-full flex-col justify-between">
                  <MessageSquareQuote
                    size={42}
                    strokeWidth={1.5}
                    className="text-rose-400"
                  />

                  <div className="my-12">
                    <p className="max-w-md text-xl font-semibold leading-8 text-white">
                      “Technology should not only look forward. It should help
                      people move forward.”
                    </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-white/10 pt-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                      EM
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-white">
                        Leadership
                      </p>

                      <p className="text-xs text-slate-500">
                        EasyMaster IT Solutions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* ================================================================ */}
      {/* CORE PRINCIPLES                                                  */}
      {/* ================================================================ */}

      <section className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-blue-600">
                What guides us
              </p>

              <h2 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Principles behind
                <span className="block text-slate-400">
                  the work we do.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-slate-500">
                Technology changes quickly. The principles behind good work
                should remain clear.
              </p>
            </div>

            <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 sm:grid-cols-2">
              {values.map((value) => {
                const Icon = value.icon;

                return (
                  <div
                    key={value.title}
                    className="group border border-slate-100 bg-white p-8 transition-colors duration-300 hover:bg-slate-50"
                  >
                    <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-900 transition-all duration-300 group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-blue-600">
                      <Icon size={20} />
                    </div>

                    <h3 className="text-lg font-bold text-slate-950">
                      {value.title}
                    </h3>

                    <p className="mt-3 text-xs leading-6 text-slate-500">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FINAL CTA                                                        */}
      {/* ================================================================ */}

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-8 py-16 text-white sm:px-12 lg:px-16 lg:py-20">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative grid items-end gap-12 lg:grid-cols-2">
              <div className="max-w-3xl">
                <div className="mb-6 flex items-center gap-2">
                  <Building2 size={16} className="text-blue-400" />

                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    EasyMaster IT Solutions
                  </p>
                </div>

                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  We&apos;re building
                  <span className="block text-slate-500">
                    what comes next.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-sm leading-7 text-slate-400">
                  Have an idea, project, challenge, or opportunity? Let&apos;s
                  explore what technology and thoughtful design can make
                  possible.
                </p>
              </div>

              <div className="lg:flex lg:justify-end">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-50"
                >
                  Start a conversation

                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

type AboutFeatureProps = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  reverse?: boolean;
  visual: React.ReactNode;
};

function AboutFeature({
  number,
  eyebrow,
  title,
  description,
  href,
  icon: Icon,
  reverse = false,
  visual,
}: AboutFeatureProps) {
  return (
    <div className="border-t border-slate-200 py-16 sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className={reverse ? "lg:order-2" : ""}>
          <div className="mb-7 flex items-center gap-4">
            <span className="text-xs font-bold tracking-widest text-slate-300">
              {number}
            </span>

            <div className="h-px w-8 bg-slate-200" />

            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              {eyebrow}
            </span>
          </div>

          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Icon size={22} />
          </div>

          <h3 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            {title}
          </h3>

          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500">
            {description}
          </p>

          <Link
            href={href}
            className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-slate-950"
          >
            Explore {title}

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 transition-all duration-300 group-hover:border-slate-950 group-hover:bg-slate-950 group-hover:text-white">
              <ChevronRight size={14} />
            </span>
          </Link>
        </div>

        <div className={reverse ? "lg:order-1" : ""}>{visual}</div>
      </div>
    </div>
  );
}