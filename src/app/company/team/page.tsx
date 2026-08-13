// "use client";

// import React, { useMemo, useState } from "react";
// import Link from "next/link";
// import { Plus_Jakarta_Sans } from "next/font/google";
// import {
//   ArrowRight,
//   Award,
//   BadgeCheck,
//   BarChart3,
//   Brain,
//   Briefcase,
//   Building2,
//   CheckCircle2,
//   ChevronRight,
//   Code2,
//   Compass,
//   Cpu,
//   Globe2,
//   GraduationCap,
//   HeartHandshake,
//   Layers3,
//   Lightbulb,
//   Rocket,
//   Search,
//   ShieldCheck,
//   Sparkles,
//   Users,
//   Workflow,
// } from "lucide-react";

// function Linkedin({ size = 16 }: { size?: number }) {
//   return (
//     <svg
//       aria-hidden="true"
//       viewBox="0 0 24 24"
//       width={size}
//       height={size}
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <rect x="2" y="2" width="20" height="20" rx="4" fill="#0A66C2" />
//       <path
//         d="M7.2 10.1V17M7.2 7.1v.1M10.2 10.1V17M10.2 10.1v1.1c.5-.8 1.3-1.4 2.5-1.4 1.9 0 3.1 1.2 3.1 3.5V17"
//         stroke="#ffffff"
//         strokeWidth="1.8"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <circle cx="7.2" cy="7.2" r="0.9" fill="#ffffff" />
//     </svg>
//   );
// }

// const plusJakartaSans = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "800"],
//   variable: "--font-plus-jakarta",
// });

// const filterDepts = ["All", "Software Engineering", "Creative Design", "QA & Management", "Support"];

// const expertsData = [
//   {
//     name: "Suresh Perera",
//     role: "Senior Full-Stack Engineer",
//     dept: "Software Engineering",
//     skills: ["Next.js", "Spring Boot", "TypeScript"],
//     exp: "4+ Years",
//     intro: "Builds secure APIs, production-ready web apps, and fast UI systems with a focus on reliability.",
//     initials: "SP",
//   },
//   {
//     name: "Nimali Silva",
//     role: "Lead UI/UX Architect",
//     dept: "Creative Design",
//     skills: ["Figma", "Brand Systems", "Motion UI"],
//     exp: "3+ Years",
//     intro: "Shapes bold brand narratives and user flows that feel premium, clear, and effortless.",
//     initials: "NS",
//   },
//   {
//     name: "Kasun Jayasinghe",
//     role: "QA Automation Lead",
//     dept: "QA & Management",
//     skills: ["Selenium", "CI/CD", "Manual Testing"],
//     exp: "3+ Years",
//     intro: "Protects release quality with structured test coverage, process discipline, and measurable checks.",
//     initials: "KJ",
//   },
//   {
//     name: "Dulani Fernando",
//     role: "Client Success Specialist",
//     dept: "Support",
//     skills: ["SLA Management", "Tickets", "Communication"],
//     exp: "2+ Years",
//     intro: "Keeps project communication crisp, clients informed, and operational support moving smoothly.",
//     initials: "DF",
//   },
// ];

// const departments = [
//   {
//     icon: Code2,
//     title: "Software Engineering",
//     desc: "Product engineering, backend architecture, integrations, and high-performance web delivery.",
//     tools: "Next.js, Spring Boot, TypeScript, MongoDB",
//     accent: "from-sky-500/15 to-cyan-500/15",
//   },
//   {
//     icon: Sparkles,
//     title: "Creative Design",
//     desc: "Brand systems, UI layouts, motion treatment, and visual storytelling across screens.",
//     tools: "Figma, Adobe Suite, Tailwind CSS",
//     accent: "from-amber-500/15 to-orange-500/15",
//   },
//   {
//     icon: ShieldCheck,
//     title: "QA & Project Management",
//     desc: "Release quality, planning, validation, and clear delivery workflows from start to launch.",
//     tools: "Selenium, Jira, Agile, Manual Testing",
//     accent: "from-emerald-500/15 to-teal-500/15",
//   },
//   {
//     icon: BarChart3,
//     title: "Digital Marketing",
//     desc: "Search visibility, campaign execution, analytics, and growth-oriented messaging.",
//     tools: "SEO, Analytics, Meta Ads, Content Strategy",
//     accent: "from-violet-500/15 to-fuchsia-500/15",
//   },
//   {
//     icon: HeartHandshake,
//     title: "Customer Success",
//     desc: "Support, onboarding, response management, and ongoing client relationship care.",
//     tools: "SLA Control, Ticketing, Client Relations",
//     accent: "from-rose-500/15 to-pink-500/15",
//   },
// ];

// const workflow = [
//   "Requirements",
//   "Analysis",
//   "UI/UX",
//   "Development",
//   "QA Testing",
//   "Deployment",
//   "Launch",
//   "Maintenance",
// ];

// const milestones = [
//   { value: "20+", label: "Completed builds" },
//   { value: "15+", label: "Active clients" },
//   { value: "100%", label: "Deployment checks" },
//   { value: "3+", label: "Years in operation" },
// ];

// const testimonials = [
//   {
//     quote: "The team keeps quality visible. Planning, design, and deployment all feel connected instead of siloed.",
//     name: "Engineering Intern",
//     role: "Web Team",
//   },
//   {
//     quote: "Creative direction is precise, modern, and fast. Every review adds clarity without slowing momentum.",
//     name: "UI/UX Layout Associate",
//     role: "Design Team",
//   },
// ];

// const cultureCards = [
//   { icon: Compass, title: "Clear direction", text: "We work with visible goals, weekly checkpoints, and fast feedback loops." },
//   { icon: Lightbulb, title: "Practical innovation", text: "New ideas are tested quickly and only kept if they improve the product." },
//   { icon: Award, title: "Ownership", text: "Everyone is accountable for the quality, timing, and clarity of their output." },
//   { icon: Globe2, title: "Open collaboration", text: "Design, engineering, and support stay aligned across the entire project cycle." },
// ];

// export default function OurTeamPage() {
//   const [selectedDept, setSelectedDept] = useState("All");

//   const filteredExperts = useMemo(() => {
//     return selectedDept === "All"
//       ? expertsData
//       : expertsData.filter((expert) => expert.dept === selectedDept);
//   }, [selectedDept]);

//   return (
//     <div className={`${plusJakartaSans.className} relative min-h-screen overflow-hidden text-slate-100`} style={{ backgroundColor: "#08111f" }}>
//       <div className="pointer-events-none fixed inset-0 -z-10 bg-[#08111f]" aria-hidden="true" />
//       <main className="overflow-hidden">
//         <section
//           className="relative isolate overflow-hidden px-6 pb-20 pt-24 lg:px-8 lg:pb-28 lg:pt-28"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle at top left, rgba(56,189,248,0.22), transparent 30%), radial-gradient(circle at top right, rgba(251,191,36,0.20), transparent 28%), linear-gradient(180deg, #08111f 0%, #0d1727 60%, #111c2f 100%)",
//           }}
//         >
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
//           <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
//             <div className="relative z-10 max-w-3xl animate-fade-up">
//               <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-200 backdrop-blur-md">
//                 <Users size={14} /> The Masterminds
//               </span>
//               <h1 className="mt-6 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
//                 Meet the team powering <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-sky-300 bg-clip-text text-transparent">Easy Master IT Solutions</span>
//               </h1>
//               <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
//                 A focused group of engineers, designers, strategists, and support specialists building polished digital experiences with speed, structure, and care.
//               </p>
//               <div className="mt-10 flex flex-col gap-4 sm:flex-row">
//                 <a href="#experts" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-[0_16px_40px_rgba(251,191,36,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(251,191,36,0.38)]">
//                   Meet Our Experts <ArrowRight size={16} />
//                 </a>
//                 <Link href="/company/careers" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:border-white/20 hover:bg-white/10">
//                   Join Our Team <ChevronRight size={16} />
//                 </Link>
//               </div>
//               <div className="mt-12 grid gap-4 sm:grid-cols-3">
//                 {[
//                   { title: "Fast delivery", value: "Sprint-first" },
//                   { title: "Quality", value: "QA-led" },
//                   { title: "Culture", value: "Open & modern" },
//                 ].map((item) => (
//                   <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
//                     <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{item.title}</p>
//                     <p className="mt-2 text-lg font-bold text-white">{item.value}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="relative z-10 animate-float">
//               <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_25px_90px_rgba(2,6,23,0.45)] backdrop-blur-xl">
//                 <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-amber-400/20 blur-2xl" />
//                 <div className="absolute -bottom-10 -right-8 h-28 w-28 rounded-full bg-sky-400/20 blur-2xl" />
//                 <div className="grid gap-4 sm:grid-cols-2">
//                   <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
//                     <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Team snapshot</p>
//                     <h2 className="mt-2 text-2xl font-black text-white">Modern delivery, human collaboration.</h2>
//                     <p className="mt-3 text-sm leading-7 text-slate-300">
//                       We design with intent, build with discipline, and support with clarity.
//                     </p>
//                   </div>
//                   <div className="grid gap-4">
//                     {[
//                       { label: "Engineers", value: "04", icon: Cpu },
//                       { label: "Designers", value: "02", icon: Sparkles },
//                       { label: "Support", value: "01", icon: HeartHandshake },
//                     ].map((item) => {
//                       const Icon = item.icon;
//                       return (
//                         <div key={item.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/7 px-4 py-3">
//                           <div className="flex items-center gap-3">
//                             <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-amber-300">
//                               <Icon size={18} />
//                             </span>
//                             <div>
//                               <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
//                               <p className="text-sm font-semibold text-white">Active members</p>
//                             </div>
//                           </div>
//                           <span className="text-2xl font-black text-amber-300">{item.value}</span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <SectionShell id="philosophy" eyebrow="Team Philosophy & Culture" title="A team built around clarity, speed, and ownership" desc="We keep the structure open, the feedback loops short, and the standards high so every project moves with purpose.">
//           <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
//             <div className="rounded-[1.75rem] border border-slate-200/10 bg-white/5 p-7 shadow-[0_20px_60px_rgba(2,6,23,0.25)] backdrop-blur-xl">
//               <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-300">Our culture hub</p>
//               <h3 className="mt-3 text-3xl font-black text-white">Team philosophy</h3>
//               <div className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
//                 <p>We value architectural accuracy, predictable delivery, and strong communication over noisy process overhead.</p>
//                 <p>Each team member has room to think independently while still working inside a shared design and engineering system.</p>
//               </div>
//               <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/50 p-5 text-sm text-slate-200">
//                 <p><span className="font-bold text-amber-300">Vision:</span> Build clean digital products that feel sharp, stable, and premium.</p>
//                 <p className="mt-3 border-t border-white/10 pt-3"><span className="font-bold text-amber-300">Mission:</span> Ship modern interfaces and reliable systems without sacrificing speed.</p>
//               </div>
//             </div>
//             <div className="grid gap-5 sm:grid-cols-2">
//               {cultureCards.map((item, index) => {
//                 const Icon = item.icon;
//                 return (
//                   <div key={item.title} className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/8" style={{ animationDelay: `${index * 90}ms` }}>
//                     <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-sky-400/20 text-amber-300 transition group-hover:scale-105">
//                       <Icon size={22} />
//                     </div>
//                     <h4 className="mt-4 text-lg font-bold text-white">{item.title}</h4>
//                     <p className="mt-2 text-sm leading-7 text-slate-300">{item.text}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </SectionShell>

//         <SectionShell id="leadership" eyebrow="Leadership Team" title="Leadership that keeps product, quality, and people aligned" desc="The core team balances design intent, engineering discipline, and delivery accountability.">
//           <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
//             <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-slate-950 to-slate-900 p-7 shadow-[0_20px_60px_rgba(2,6,23,0.28)]">
//               <div className="flex items-center gap-4">
//                 <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-sky-400 text-2xl font-black text-slate-950">EM</div>
//                 <div>
//                   <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Founder</p>
//                   <h3 className="text-2xl font-black text-white">Lead IT Architect</h3>
//                   <p className="mt-1 text-sm text-sky-300">UI/UX Designer & Full-Stack Systems Engineer</p>
//                 </div>
//               </div>
//               <p className="mt-6 text-sm leading-7 text-slate-300">
//                 Overseeing project structure, backend stability, front-end quality, and the design language that keeps the brand consistent.
//               </p>
//               <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-300">
//                 <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Next.js</span>
//                 <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Spring Boot</span>
//                 <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Figma</span>
//               </div>
//               <a href="#" className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
//                 <Linkedin size={16} /> Connect via LinkedIn
//               </a>
//             </div>
//             <div className="grid gap-4 sm:grid-cols-2">
//               {[
//                 { icon: Rocket, title: "Visionary Direction", text: "Keeps product goals focused and release timelines realistic." },
//                 { icon: BadgeCheck, title: "Total Accountability", text: "Owns decisions, deadlines, and delivery standards end-to-end." },
//                 { icon: Brain, title: "Technical Mentorship", text: "Supports team growth with reviews, guidance, and clarity." },
//                 { icon: Layers3, title: "Quality Oversight", text: "Maintains the bar for code, design, and operational excellence." },
//               ].map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
//                     <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-400/15 text-sky-300">
//                       <Icon size={20} />
//                     </div>
//                     <h4 className="mt-4 text-lg font-bold text-white">{item.title}</h4>
//                     <p className="mt-2 text-sm leading-7 text-slate-300">{item.text}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </SectionShell>

//         <SectionShell id="departments" eyebrow="Departments" title="The company structure that keeps delivery flowing" desc="Each department plays a specific role in the same system: build well, test well, communicate well.">
//           <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//             {departments.map((department, index) => {
//               const Icon = department.icon;
//               return (
//                 <div key={department.title} className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/7" style={{ animationDelay: `${index * 70}ms` }}>
//                   <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${department.accent} text-white`}>
//                     <Icon size={22} />
//                   </div>
//                   <h4 className="mt-5 text-xl font-bold text-white">{department.title}</h4>
//                   <p className="mt-3 text-sm leading-7 text-slate-300">{department.desc}</p>
//                   <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-xs text-slate-300">
//                     <span className="block font-bold uppercase tracking-[0.24em] text-slate-400">Ecosystem</span>
//                     <span className="mt-2 block leading-6 text-slate-200">{department.tools}</span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </SectionShell>

//         <SectionShell id="experts" eyebrow="Meet Our Experts" title="Focused specialists, working as one team" desc="Filter the people behind the product and see how each discipline contributes to the same delivery engine.">
//           <div className="mb-8 flex flex-wrap gap-2 rounded-[1.25rem] border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
//             {filterDepts.map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setSelectedDept(tab)}
//                 className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${selectedDept === tab ? "bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20" : "text-slate-300 hover:bg-white/8 hover:text-white"}`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//           <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
//             {filteredExperts.map((expert, index) => (
//               <article key={expert.name} className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/7" style={{ animationDelay: `${index * 90}ms` }}>
//                 <div className="flex items-center gap-4">
//                   <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-amber-400 text-sm font-black text-slate-950">{expert.initials}</div>
//                   <div>
//                     <h4 className="text-lg font-bold text-white">{expert.name}</h4>
//                     <p className="text-sm font-semibold text-sky-300">{expert.role}</p>
//                   </div>
//                 </div>
//                 <p className="mt-4 text-sm leading-7 text-slate-300">{expert.intro}</p>
//                 <div className="mt-5 border-t border-white/10 pt-4 text-sm">
//                   <div className="flex items-center justify-between text-slate-300">
//                     <span>Experience</span>
//                     <span className="font-semibold text-white">{expert.exp}</span>
//                   </div>
//                   <div className="mt-4 flex flex-wrap gap-2">
//                     {expert.skills.map((skill) => (
//                       <span key={skill} className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-[11px] font-semibold text-slate-200">
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </SectionShell>

//         <SectionShell id="workflow" eyebrow="How We Work Together" title="A straightforward process with visible checkpoints" desc="We keep the work moving through a clear sequence so progress is easy to follow and quality stays high.">
//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
//             {workflow.map((step, index) => (
//               <div key={step} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-xl">
//                 <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-amber-300">
//                   0{index + 1}
//                 </div>
//                 <p className="text-sm font-semibold text-white">{step}</p>
//               </div>
//             ))}
//           </div>
//           <div className="mt-8 grid gap-4 rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-6 md:grid-cols-4">
//             {[
//               "Direct communication",
//               "Agile standups",
//               "Weekly code reviews",
//               "Strict QA checks",
//             ].map((item) => (
//               <div key={item} className="text-sm font-semibold text-slate-200">• {item}</div>
//             ))}
//           </div>
//         </SectionShell>

//         <SectionShell id="workplace" eyebrow="Team Culture & Workplace" title="A workplace that feels active, intentional, and open" desc="We keep the environment professional but warm, with room for collaboration, quiet focus, and team connection.">
//           <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
//             <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
//               <div className="grid gap-4 sm:grid-cols-2">
//                 {[
//                   { label: "Mutual respect", value: "Every voice matters" },
//                   { label: "Innovation", value: "Ideas move quickly" },
//                   { label: "Regular meets", value: "Always in sync" },
//                   { label: "CSR", value: "Community first" },
//                 ].map((item) => (
//                   <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/45 p-5">
//                     <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
//                     <p className="mt-2 text-lg font-bold text-white">{item.value}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="grid gap-4 sm:grid-cols-2">
//               {[
//                 "Daily work cycles",
//                 "Internal hack sessions",
//                 "Celebration moments",
//                 "Volunteer projects",
//               ].map((item, index) => (
//                 <div key={item} className={`rounded-[1.5rem] border border-white/10 p-6 text-sm font-semibold text-white shadow-[0_20px_55px_rgba(2,6,23,0.2)] ${index % 2 === 0 ? "bg-gradient-to-br from-slate-900 to-slate-800" : "bg-gradient-to-br from-slate-800 to-slate-900"}`}>
//                   {item}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </SectionShell>

//         <SectionShell id="growth" eyebrow="Employee Growth & Learning" title="Growth is part of the team system" desc="We support team members with mentorship, learning time, and practical exposure to modern delivery workflows.">
//           <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
//             <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
//               <p className="text-sm leading-8 text-slate-300">
//                 Engineers and designers are encouraged to keep improving through weekly learning sessions, peer review, and certification-oriented growth tracks.
//               </p>
//               <div className="mt-6 space-y-4">
//                 {[
//                   "Direct technical mentorship from senior leads.",
//                   "Weekly knowledge sharing around architecture and UI systems.",
//                   "Certification support for practical career growth.",
//                 ].map((item) => (
//                   <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/45 p-4 text-sm text-slate-200">
//                     <CheckCircle2 size={18} className="mt-0.5 text-amber-300" />
//                     <span>{item}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="grid gap-4 sm:grid-cols-2">
//               {[
//                 { icon: GraduationCap, title: "Tech Training" },
//                 { icon: Award, title: "Certifications" },
//                 { icon: Workflow, title: "Process Mastery" },
//                 { icon: Briefcase, title: "Real Projects" },
//               ].map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl">
//                     <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-sky-400/20 text-amber-300">
//                       <Icon size={22} />
//                     </div>
//                     <p className="mt-4 text-sm font-bold text-white">{item.title}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </SectionShell>

//         <SectionShell id="milestones" eyebrow="Team Achievements & Milestones" title="Results that show our pace and consistency" desc="These milestones reflect stable delivery, long-term relationships, and the reliability of the team engine.">
//           <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//             {milestones.map((item) => (
//               <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/7 to-white/4 p-6 text-center shadow-[0_20px_60px_rgba(2,6,23,0.2)] backdrop-blur-xl">
//                 <p className="text-4xl font-black text-amber-300">{item.value}</p>
//                 <p className="mt-3 text-sm font-semibold text-slate-200">{item.label}</p>
//               </div>
//             ))}
//           </div>
//         </SectionShell>

//         <SectionShell id="life" eyebrow="Life at Easy Master" title="A team that works hard and keeps the energy human" desc="The workplace mixes product focus with moments of learning, celebration, and shared momentum.">
//           <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
//             {[
//               { title: "Daily work cycles", tone: "from-sky-500/25 to-cyan-500/25" },
//               { title: "Internal hackathons", tone: "from-amber-500/25 to-orange-500/25" },
//               { title: "Team celebrations", tone: "from-rose-500/25 to-pink-500/25" },
//               { title: "Volunteer projects", tone: "from-emerald-500/25 to-teal-500/25" },
//             ].map((item) => (
//               <div key={item.title} className={`relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br ${item.tone} p-6`}>
//                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.24),transparent_35%)]" />
//                 <div className="relative z-10 flex h-40 items-end">
//                   <p className="text-lg font-bold text-white">{item.title}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </SectionShell>

//         <SectionShell id="testimonials" eyebrow="Employee Testimonials" title="What people say about the team experience" desc="A few short reflections from the people who contribute day to day.">
//           <div className="grid gap-6 md:grid-cols-2">
//             {testimonials.map((item) => (
//               <blockquote key={item.name} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
//                 <p className="text-base leading-8 text-slate-200">“{item.quote}”</p>
//                 <footer className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
//                   <div>
//                     <p className="font-bold text-white">{item.name}</p>
//                     <p className="text-slate-400">{item.role}</p>
//                   </div>
//                   <Sparkles size={18} className="text-amber-300" />
//                 </footer>
//               </blockquote>
//             ))}
//           </div>
//         </SectionShell>

//         <section id="join" className="relative isolate overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-24 lg:px-8">
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.2),transparent_30%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_28%)]" />
//           <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-[0_30px_100px_rgba(2,6,23,0.45)] backdrop-blur-xl lg:p-12">
//             <p className="text-xs font-bold uppercase tracking-[0.32em] text-amber-300">Join Our Team</p>
//             <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">Ready to build modern work with us?</h2>
//             <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
//               We are always looking for people who care about quality, modern systems, and clear collaboration.
//             </p>
//             <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
//               <Link href="/company/careers" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5">
//                 View Open Opportunities <ArrowRight size={16} />
//               </Link>
//               <a href="#experts" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
//                 Explore the Team <Search size={16} />
//               </a>
//             </div>
//           </div>
//         </section>
//       </main>

//       <style jsx global>{`
//         @keyframes fade-up {
//           0% {
//             opacity: 0;
//             transform: translateY(18px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }

//         .animate-fade-up {
//           animation: fade-up 0.85s ease-out both;
//         }

//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// }

// function SectionShell({
//   id,
//   eyebrow,
//   title,
//   desc,
//   children,
// }: {
//   id: string;
//   eyebrow: string;
//   title: string;
//   desc: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <section id={id} className="px-6 py-20 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         <div className="mx-auto mb-12 max-w-3xl text-center">
//           <p className="text-xs font-bold uppercase tracking-[0.32em] text-amber-300">{eyebrow}</p>
//           <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h2>
//           <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">{desc}</p>
//         </div>
//         {children}
//       </div>
//     </section>
//   );
// }








// "use client";

// import React, { useMemo, useState } from "react";
// import Link from "next/link";
// import { Plus_Jakarta_Sans } from "next/font/google";
// import {
//   ArrowRight,
//   Award,
//   BadgeCheck,
//   BarChart3,
//   Brain,
//   Briefcase,
//   Building2,
//   CheckCircle2,
//   ChevronRight,
//   Code2,
//   Compass,
//   Cpu,
//   Globe2,
//   GraduationCap,
//   HeartHandshake,
//   Layers3,
//   Lightbulb,
//   Rocket,
//   Search,
//   ShieldCheck,
//   Sparkles,
//   Users,
//   Workflow,
// } from "lucide-react";

// function Linkedin({ size = 16 }: { size?: number }) {
//   return (
//     <svg
//       aria-hidden="true"
//       viewBox="0 0 24 24"
//       width={size}
//       height={size}
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <rect x="2" y="2" width="20" height="20" rx="4" fill="#0A66C2" />
//       <path
//         d="M7.2 10.1V17M7.2 7.1v.1M10.2 10.1V17M10.2 10.1v1.1c.5-.8 1.3-1.4 2.5-1.4 1.9 0 3.1 1.2 3.1 3.5V17"
//         stroke="#ffffff"
//         strokeWidth="1.8"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <circle cx="7.2" cy="7.2" r="0.9" fill="#ffffff" />
//     </svg>
//   );
// }

// const plusJakartaSans = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "800"],
//   variable: "--font-plus-jakarta",
// });

// const filterDepts = ["All", "Software Engineering", "Creative Design", "QA & Management", "Support"];

// const expertsData = [
//   {
//     name: "Suresh Perera",
//     role: "Senior Full-Stack Engineer",
//     dept: "Software Engineering",
//     skills: ["Next.js", "Spring Boot", "TypeScript"],
//     exp: "4+ Years",
//     intro: "Builds secure APIs, production-ready web apps, and fast UI systems with a focus on reliability.",
//     initials: "SP",
//   },
//   {
//     name: "Nimali Silva",
//     role: "Lead UI/UX Architect",
//     dept: "Creative Design",
//     skills: ["Figma", "Brand Systems", "Motion UI"],
//     exp: "3+ Years",
//     intro: "Shapes bold brand narratives and user flows that feel premium, clear, and effortless.",
//     initials: "NS",
//   },
//   {
//     name: "Kasun Jayasinghe",
//     role: "QA Automation Lead",
//     dept: "QA & Management",
//     skills: ["Selenium", "CI/CD", "Manual Testing"],
//     exp: "3+ Years",
//     intro: "Protects release quality with structured test coverage, process discipline, and measurable checks.",
//     initials: "KJ",
//   },
//   {
//     name: "Dulani Fernando",
//     role: "Client Success Specialist",
//     dept: "Support",
//     skills: ["SLA Management", "Tickets", "Communication"],
//     exp: "2+ Years",
//     intro: "Keeps project communication crisp, clients informed, and operational support moving smoothly.",
//     initials: "DF",
//   },
// ];

// const departments = [
//   {
//     icon: Code2,
//     title: "Software Engineering",
//     desc: "Product engineering, backend architecture, integrations, and high-performance web delivery.",
//     tools: "Next.js, Spring Boot, TypeScript, MongoDB",
//     accent: "from-sky-500/20 to-cyan-500/20 text-sky-400 border-sky-500/30",
//   },
//   {
//     icon: Sparkles,
//     title: "Creative Design",
//     desc: "Brand systems, UI layouts, motion treatment, and visual storytelling across screens.",
//     tools: "Figma, Adobe Suite, Tailwind CSS",
//     accent: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
//   },
//   {
//     icon: ShieldCheck,
//     title: "QA & Project Management",
//     desc: "Release quality, planning, validation, and clear delivery workflows from start to launch.",
//     tools: "Selenium, Jira, Agile, Manual Testing",
//     accent: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
//   },
//   {
//     icon: BarChart3,
//     title: "Digital Marketing",
//     desc: "Search visibility, campaign execution, analytics, and growth-oriented messaging.",
//     tools: "SEO, Analytics, Meta Ads, Content Strategy",
//     accent: "from-violet-500/20 to-fuchsia-500/20 text-violet-400 border-violet-500/30",
//   },
//   {
//     icon: HeartHandshake,
//     title: "Customer Success",
//     desc: "Support, onboarding, response management, and ongoing client relationship care.",
//     tools: "SLA Control, Ticketing, Client Relations",
//     accent: "from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30",
//   },
// ];

// const workflow = [
//   "Requirements",
//   "Analysis",
//   "UI/UX Design",
//   "Development",
//   "QA Testing",
//   "Deployment",
//   "Launch",
//   "Maintenance",
// ];

// const milestones = [
//   { value: "20+", label: "Completed builds" },
//   { value: "15+", label: "Active clients" },
//   { value: "100%", label: "Deployment checks" },
//   { value: "3+", label: "Years in operation" },
// ];

// const testimonials = [
//   {
//     quote: "The team keeps quality visible. Planning, design, and deployment all feel connected instead of siloed.",
//     name: "Engineering Intern",
//     role: "Web Team",
//   },
//   {
//     quote: "Creative direction is precise, modern, and fast. Every review adds clarity without slowing momentum.",
//     name: "UI/UX Layout Associate",
//     role: "Design Team",
//   },
// ];

// const cultureCards = [
//   { icon: Compass, title: "Clear direction", text: "We work with visible goals, weekly checkpoints, and fast feedback loops." },
//   { icon: Lightbulb, title: "Practical innovation", text: "New ideas are tested quickly and only kept if they improve the product." },
//   { icon: Award, title: "Ownership", text: "Everyone is accountable for the quality, timing, and clarity of their output." },
//   { icon: Globe2, title: "Open collaboration", text: "Design, engineering, and support stay aligned across the entire project cycle." },
// ];

// export default function OurTeamPage() {
//   const [selectedDept, setSelectedDept] = useState("All");

//   const filteredExperts = useMemo(() => {
//     return selectedDept === "All"
//       ? expertsData
//       : expertsData.filter((expert) => expert.dept === selectedDept);
//   }, [selectedDept]);

//   return (
//     <div className={`${plusJakartaSans.className} relative min-h-screen overflow-x-hidden text-slate-100 bg-[#040a15]`}>
      
//       {/* Dynamic Background Mesh Effect */}
//       <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.12),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.1),transparent_45%)]" />

//       <main className="relative">
        
//         {/* --- 1. HERO SECTION --- */}
//         <section
//           className="relative isolate overflow-hidden px-6 pb-24 pt-28 lg:px-8 lg:pb-32 lg:pt-36 border-b border-white/5"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle at top left, rgba(56,189,248,0.18), transparent 35%), radial-gradient(circle at top right, rgba(251,191,36,0.15), transparent 32%), linear-gradient(180deg, #040a15 0%, #081122 100%)",
//           }}
//         >
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40" />
          
//           <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
//             <div className="relative z-10 max-w-3xl transform transition duration-700 ease-out">
//               <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-300 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.2)]">
//                 <Users size={14} /> The Masterminds
//               </span>
//               <h1 className="mt-6 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl leading-none">
//                 Meet the team powering <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-sky-400 bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(251,191,36,0.2)]">Easy Master IT Solutions</span>
//               </h1>
//               <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
//                 A focused group of engineers, designers, strategists, and support specialists building polished digital experiences with speed, structure, and care.
//               </p>
              
//               <div className="mt-10 flex flex-col gap-4 sm:flex-row">
//                 <a href="#experts" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 px-7 py-4 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(251,191,36,0.3)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(251,191,36,0.5)]">
//                   Meet Our Experts <ArrowRight size={16} />
//                 </a>
//                 <Link href="/company/careers" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:bg-white/10 hover:border-white/20">
//                   Join Our Team <ChevronRight size={16} />
//                 </Link>
//               </div>

//               <div className="mt-14 grid gap-4 sm:grid-cols-3">
//                 {[
//                   { title: "Fast delivery", value: "Sprint-first" },
//                   { title: "Quality", value: "QA-led" },
//                   { title: "Culture", value: "Open & modern" },
//                 ].map((item) => (
//                   <div key={item.title} className="rounded-2xl border border-white/5 bg-slate-900/40 p-4 backdrop-blur-md hover:border-white/10 transition">
//                     <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{item.title}</p>
//                     <p className="mt-2 text-lg font-bold text-white">{item.value}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Right Interactive Card Panel */}
//             <div className="relative z-10">
//               <div className="relative rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-6 shadow-[0_0_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
//                 <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl" />
//                 <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-sky-500/10 blur-2xl" />
                
//                 <div className="grid gap-5">
//                   <div className="rounded-3xl border border-white/5 bg-slate-950/40 p-5">
//                     <p className="text-xs uppercase tracking-[0.28em] text-amber-400">Team snapshot</p>
//                     <h2 className="mt-2 text-xl font-bold text-white">Modern delivery, human collaboration.</h2>
//                     <p className="mt-2 text-xs leading-6 text-slate-300">
//                       We design with intent, build with discipline, and support with clarity.
//                     </p>
//                   </div>
                  
//                   <div className="grid gap-3">
//                     {[
//                       { label: "Engineers", value: "04", icon: Cpu, color: "text-sky-400" },
//                       { label: "Designers", value: "02", icon: Sparkles, color: "text-amber-400" },
//                       { label: "Support", value: "01", icon: HeartHandshake, color: "text-rose-400" },
//                     ].map((item) => {
//                       const Icon = item.icon;
//                       return (
//                         <div key={item.label} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4 transition hover:bg-white/8">
//                           <div className="flex items-center gap-3">
//                             <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ${item.color}`}>
//                               <Icon size={18} />
//                             </span>
//                             <div>
//                               <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
//                               <p className="text-xs font-semibold text-white">Active members</p>
//                             </div>
//                           </div>
//                           <span className={`text-xl font-black ${item.color}`}>{item.value}</span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* --- 2. TEAM PHILOSOPHY --- */}
//         <SectionShell id="philosophy" eyebrow="Team Philosophy & Culture" title="A team built around clarity, speed, and ownership" desc="We keep the structure open, the feedback loops short, and the standards high.">
//           <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
//             <div className="rounded-[2rem] border border-white/5 bg-gradient-to-b from-slate-900/60 to-slate-950/60 p-8 backdrop-blur-xl">
//               <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-400">Our culture hub</p>
//               <h3 className="mt-3 text-2xl font-black text-white">Team philosophy</h3>
//               <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
//                 <p>We value architectural accuracy, predictable delivery, and strong communication over noisy process overhead.</p>
//                 <p>Each team member has room to think independently while still working inside a shared system.</p>
//               </div>
//               <div className="mt-6 rounded-2xl border border-white/5 bg-slate-950/80 p-5 text-xs space-y-3">
//                 <p><span className="font-bold text-amber-400 uppercase tracking-wider block mb-1">Vision:</span> Build clean digital products that feel sharp, stable, and premium.</p>
//                 <div className="border-t border-white/5 pt-3">
//                   <p><span className="font-bold text-sky-400 uppercase tracking-wider block mb-1">Mission:</span> Ship modern interfaces and reliable systems without sacrificing speed.</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="grid gap-4 sm:grid-cols-2">
//               {cultureCards.map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <div key={item.title} className="group rounded-[1.5rem] border border-white/5 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:bg-white/8">
//                     <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 transition group-hover:scale-105">
//                       <Icon size={20} />
//                     </div>
//                     <h4 className="mt-4 text-base font-bold text-white">{item.title}</h4>
//                     <p className="mt-2 text-xs leading-6 text-slate-400">{item.text}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </SectionShell>

//         {/* --- 3. LEADERSHIP TEAM --- */}
//         <SectionShell id="leadership" eyebrow="Leadership Team" title="Leadership that keeps products and people aligned" desc="The core team balances design intent, engineering discipline, and delivery accountability.">
//           <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
//             <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 shadow-xl relative overflow-hidden group">
//               <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-sky-500/10 to-transparent blur-xl" />
//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
//                 <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-sky-400 text-2xl font-black text-slate-950 shadow-lg shadow-orange-500/20">EM</div>
//                 <div>
//                   <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">Founder & Leader</p>
//                   <h3 className="text-2xl font-bold text-white tracking-tight">Lead IT Architect</h3>
//                   <p className="text-xs text-sky-400 font-medium">UI/UX Designer & Full-Stack Systems Engineer</p>
//                 </div>
//               </div>
//               <p className="mt-6 text-sm leading-6 text-slate-300 border-t border-white/5 pt-4">
//                 Overseeing corporate project structures, backend scalability, modern glow-enhanced front-end quality, and intuitive design workflows that keep products consistent.
//               </p>
//               <div className="mt-5 flex flex-wrap gap-2 text-[10px] text-slate-300">
//                 <span className="rounded-full bg-white/5 px-3 py-1 border border-white/5">Next.js</span>
//                 <span className="rounded-full bg-white/5 px-3 py-1 border border-white/5">Spring Boot</span>
//                 <span className="rounded-full bg-white/5 px-3 py-1 border border-white/5">Figma Enterprise</span>
//               </div>
//               <div className="mt-6">
//                 <a href="#" className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10 hover:border-white/20 border border-white/5">
//                   <Linkedin size={14} /> Connect via LinkedIn
//                 </a>
//               </div>
//             </div>

//             <div className="grid gap-4 sm:grid-cols-2">
//               {[
//                 { icon: Rocket, title: "Visionary Direction", text: "Keeps corporate goals focused and release timelines clear." },
//                 { icon: BadgeCheck, title: "Total Accountability", text: "Owns decisions, deadlines, and delivery standards end-to-end." },
//                 { icon: Brain, title: "Technical Mentorship", text: "Supports internal team growth with fast reviews and guidance." },
//                 { icon: Layers3, title: "Quality Oversight", text: "Maintains high standards for enterprise code and premium design." },
//               ].map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <div key={item.title} className="rounded-[1.5rem] border border-white/5 bg-slate-900/30 p-5 backdrop-blur-md">
//                     <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
//                       <Icon size={18} />
//                     </div>
//                     <h4 className="mt-3 text-sm font-bold text-white">{item.title}</h4>
//                     <p className="mt-1.5 text-xs leading-5 text-slate-400">{item.text}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </SectionShell>

//         {/* --- 4. DEPARTMENTS --- */}
//         <SectionShell id="departments" eyebrow="Departments" title="Company structure optimized for delivery" desc="Each division is specialized to keep code clean, designs premium, and deployments safe.">
//           <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//             {departments.map((department) => {
//               const Icon = department.icon;
//               return (
//                 <div key={department.title} className="group rounded-[1.75rem] border border-white/5 bg-gradient-to-b from-slate-900/40 to-slate-950/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-white/10">
//                   <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${department.accent} border`}>
//                     <Icon size={20} />
//                   </div>
//                   <h4 className="mt-4 text-lg font-bold text-white group-hover:text-amber-300 transition">{department.title}</h4>
//                   <p className="mt-2 text-xs leading-6 text-slate-400">{department.desc}</p>
//                   <div className="mt-4 rounded-xl border border-white/5 bg-slate-950/60 p-3 text-[11px]">
//                     <span className="block font-semibold uppercase tracking-wider text-slate-500">Tech Stack / Tools</span>
//                     <span className="mt-1 block text-slate-300">{department.tools}</span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </SectionShell>

//         {/* --- 5. MEET OUR EXPERTS --- */}
//         <SectionShell id="experts" eyebrow="Meet Our Experts" title="Focused specialists, working as one team" desc="Filter the specialists behind our modern systems and interface workflows.">
//           <div className="mb-8 flex flex-wrap gap-1.5 rounded-2xl border border-white/5 bg-slate-950/40 p-1.5 max-w-max backdrop-blur-md">
//             {filterDepts.map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setSelectedDept(tab)}
//                 className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${selectedDept === tab ? "bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
          
//           <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
//             {filteredExperts.map((expert) => (
//               <article key={expert.name} className="group rounded-[1.75rem] border border-white/5 bg-gradient-to-b from-slate-900/50 to-slate-950/50 p-5 transition duration-300 hover:-translate-y-1 hover:border-sky-500/20">
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400/20 to-amber-400/20 border border-white/10 text-xs font-bold text-amber-300">{expert.initials}</div>
//                   <div>
//                     <h4 className="text-sm font-bold text-white">{expert.name}</h4>
//                     <p className="text-[11px] font-medium text-sky-400">{expert.role}</p>
//                   </div>
//                 </div>
//                 <p className="mt-4 text-xs leading-6 text-slate-400 min-h-[48px]">{expert.intro}</p>
//                 <div className="mt-4 border-t border-white/5 pt-3 text-[11px]">
//                   <div className="flex items-center justify-between text-slate-400">
//                     <span>Experience</span>
//                     <span className="font-bold text-white">{expert.exp}</span>
//                   </div>
//                   <div className="mt-3 flex flex-wrap gap-1.5">
//                     {expert.skills.map((skill) => (
//                       <span key={skill} className="rounded-md bg-slate-950/80 px-2 py-0.5 text-[10px] font-medium text-slate-300 border border-white/5">
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </SectionShell>

//         {/* --- 6. HOW WE WORK TOGETHER --- */}
//         <SectionShell id="workflow" eyebrow="How We Work Together" title="A straightforward process with visible checkpoints" desc="We keep development steps mapped transparently from requirements up to active maintenance cycles.">
//           <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 xl:grid-cols-8">
//             {workflow.map((step, index) => (
//               <div key={step} className="rounded-xl border border-white/5 bg-slate-900/40 p-4 text-center hover:border-amber-500/20 transition">
//                 <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-xs font-black text-amber-400 border border-white/5">
//                   {index + 1}
//                 </div>
//                 <p className="text-xs font-semibold text-white truncate">{step}</p>
//               </div>
//             ))}
//           </div>
//           <div className="mt-6 grid gap-3 rounded-2xl border border-white/5 bg-slate-950/40 p-5 sm:grid-cols-2 lg:grid-cols-4 text-center">
//             {[
//               "Direct client channels",
//               "Agile sprint cycles",
//               "Weekly system reviews",
//               "Automated QA parameters",
//             ].map((item) => (
//               <div key={item} className="text-xs font-medium text-slate-300 flex items-center justify-center gap-2">
//                 <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,1)]" /> {item}
//               </div>
//             ))}
//           </div>
//         </SectionShell>

//         {/* --- 7. TEAM CULTURE & WORKPLACE --- */}
//         <SectionShell id="workplace" eyebrow="Team Culture & Workplace" title="An ecosystem focused on real outcomes" desc="Mixing standard engineering practices with a professional, growth-oriented environment.">
//           <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
//             <div className="rounded-[1.75rem] border border-white/5 bg-slate-900/20 p-6 backdrop-blur-md">
//               <div className="grid gap-4 sm:grid-cols-2">
//                 {[
//                   { label: "Mutual respect", value: "Every voice is critical" },
//                   { label: "Innovation first", value: "Concepts deploy rapidly" },
//                   { label: "Regular syncs", value: "Zero system silos" },
//                   { label: "Social responsibility", value: "Community driven values" },
//                 ].map((item) => (
//                   <div key={item.label} className="rounded-xl border border-white/5 bg-slate-950/60 p-4 text-left">
//                     <p className="text-[10px] uppercase tracking-wider text-slate-500">{item.label}</p>
//                     <p className="mt-1 text-sm font-bold text-white">{item.value}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="grid gap-3 sm:grid-cols-2">
//               {[
//                 "Daily system standups",
//                 "Internal tech hack sessions",
//                 "Milestone celebrations",
//                 "CSR & Volunteer tracks",
//               ].map((item, index) => (
//                 <div key={item} className={`flex items-end rounded-2xl border border-white/5 p-5 text-xs font-bold text-white ${index % 2 === 0 ? "bg-gradient-to-br from-slate-900 to-slate-950" : "bg-gradient-to-br from-slate-950 to-slate-900"} hover:border-white/10 transition`}>
//                   {item}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </SectionShell>

//         {/* --- 8. GROWTH & LEARNING --- */}
//         <SectionShell id="growth" eyebrow="Employee Growth & Learning" title="Continuous technical and professional evolution" desc="We give engineers and creatives room to validate ideas and acquire specialized industry certifications.">
//           <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
//             <div className="rounded-[1.75rem] border border-white/5 bg-gradient-to-b from-slate-900/40 to-slate-950/40 p-6 space-y-3">
//               {[
//                 "Direct architectural mentorship from system leads.",
//                 "Weekly knowledge sharing around UI frameworks and edge infrastructure.",
//                 "Subsidized training models for official career certifications.",
//               ].map((item) => (
//                 <div key={item} className="flex items-start gap-3 rounded-xl border border-white/5 bg-slate-950/50 p-4 text-xs text-slate-300">
//                   <CheckCircle2 size={16} className="mt-0.5 text-amber-400 shrink-0" />
//                   <span>{item}</span>
//                 </div>
//               ))}
//             </div>
            
//             <div className="grid gap-3 sm:grid-cols-2">
//               {[
//                 { icon: GraduationCap, title: "Tech Training" },
//                 { icon: Award, title: "Certifications" },
//                 { icon: Workflow, title: "Process Mastery" },
//                 { icon: Briefcase, title: "Enterprise Builds" },
//               ].map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <div key={item.title} className="rounded-xl border border-white/5 bg-slate-900/40 p-5 text-center transition hover:bg-slate-900/60">
//                     <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
//                       <Icon size={18} />
//                     </div>
//                     <p className="mt-3 text-xs font-bold text-white">{item.title}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </SectionShell>

//         {/* --- 9. ACHIEVEMENTS & MILESTONES --- */}
//         <SectionShell id="milestones" eyebrow="Achievements & Milestones" title="Results that show our delivery pace" desc="Key indicators that validate our design standards and architecture stability over time.">
//           <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
//             {milestones.map((item) => (
//               <div key={item.label} className="rounded-2xl border border-white/5 bg-gradient-to-b from-slate-900/60 to-slate-950/60 p-5 text-center backdrop-blur-sm">
//                 <p className="text-3xl font-black text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.2)]">{item.value}</p>
//                 <p className="mt-1 text-xs font-medium text-slate-400">{item.label}</p>
//               </div>
//             ))}
//           </div>
//         </SectionShell>

//         {/* --- 10. LIFE AT EASY MASTER --- */}
//         <SectionShell id="life" eyebrow="Life at Easy Master" title="Keeping operations focused yet human" desc="A snapshot look into daily visual design cycles, clean environment values, and interactive sessions.">
//           <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
//             {[
//               { title: "Daily work sprints", glow: "from-sky-500/10 to-cyan-500/10 text-sky-300 border-sky-500/20" },
//               { title: "Internal tech jams", glow: "from-amber-500/10 to-orange-500/10 text-amber-300 border-amber-500/20" },
//               { title: "Annual trips & events", glow: "from-rose-500/10 to-pink-500/10 text-rose-300 border-rose-500/20" },
//               { title: "CSR volunteer paths", glow: "from-emerald-500/10 to-teal-500/10 text-emerald-300 border-emerald-500/20" },
//             ].map((item) => (
//               <div key={item.title} className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${item.glow} p-5 min-h-[120px] flex items-end`}>
//                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_40%)]" />
//                 <p className="text-sm font-bold relative z-10">{item.title}</p>
//               </div>
//             ))}
//           </div>
//         </SectionShell>

//         {/* --- 11. TESTIMONIALS --- */}
//         <SectionShell id="testimonials" eyebrow="Employee Testimonials" title="What people say about our operational workflows" desc="Short insights from internal team members cooperating inside Easy Master.">
//           <div className="grid gap-6 md:grid-cols-2">
//             {testimonials.map((item) => (
//               <blockquote key={item.name} className="rounded-2xl border border-white/5 bg-slate-900/30 p-6 backdrop-blur-md flex flex-col justify-between">
//                 <p className="text-xs leading-6 text-slate-300 italic">“{item.quote}”</p>
//                 <footer className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
//                   <div>
//                     <p className="text-xs font-bold text-white">{item.name}</p>
//                     <p className="text-[10px] text-slate-500">{item.role}</p>
//                   </div>
//                   <Sparkles size={14} className="text-amber-400" />
//                 </footer>
//               </blockquote>
//             ))}
//           </div>
//         </SectionShell>

//         {/* --- 12. JOIN OUR TEAM (CTA) --- */}
//         <section id="join" className="relative isolate overflow-hidden px-6 py-24 lg:px-8 border-t border-white/5">
//           <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_center,rgba(56,189,248,0.08),transparent_50%)]" />
//           <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-8 text-center shadow-2xl backdrop-blur-xl lg:p-12">
//             <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">Join Our Team</p>
//             <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl tracking-tight">Ready to build modern web systems?</h2>
//             <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-slate-400">
//               We are constantly seeking disciplined developers and designers who care about high-end visuals, clean database schemas, and structured code logic.
//             </p>
//             <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
//               <Link href="/company/careers" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 px-6 py-3.5 text-xs font-bold text-slate-950 shadow-lg shadow-orange-500/20 transition hover:scale-[1.02]">
//                 View Open Opportunities <ArrowRight size={14} />
//               </Link>
//               <a href="#experts" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-semibold text-white transition hover:bg-white/10">
//                 Explore Team Engine <Search size={14} />
//               </a>
//             </div>
//           </div>
//         </section>

//       </main>
//     </div>
//   );
// }

// function SectionShell({
//   id,
//   eyebrow,
//   title,
//   desc,
//   children,
// }: {
//   id: string;
//   eyebrow: string;
//   title: string;
//   desc: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <section id={id} className="px-6 py-16 lg:px-8 border-b border-white/5">
//       <div className="mx-auto max-w-7xl">
//         <div className="mx-auto mb-10 max-w-3xl text-center">
//           <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-400">{eyebrow}</p>
//           <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">{title}</h2>
//           <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-slate-400">{desc}</p>
//         </div>
//         {children}
//       </div>
//     </section>
//   );
// }



"use client";

import {
  Award,
  Compass,
  Globe2,
  Lightbulb,
} from "lucide-react";

const cultureCards = [
  {
    icon: Compass,
    title: "Clear Direction",
    text: "Every project begins with a clear roadmap, defined milestones, and measurable outcomes.",
  },
  {
    icon: Lightbulb,
    title: "Practical Innovation",
    text: "We embrace new technologies only when they create real value for our clients and products.",
  },
  {
    icon: Award,
    title: "Ownership",
    text: "Every team member is responsible for quality, communication, and successful delivery.",
  },
  {
    icon: Globe2,
    title: "Open Collaboration",
    text: "Designers, developers, QA engineers, and support teams work together from day one.",
  },
];

export default function TeamPhilosophy() {
  return (
    <section
      id="philosophy"
      className="relative overflow-hidden border-b border-white/5 px-6 py-24 lg:px-8"
    >
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-sky-500/10 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-amber-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-300">
            Team Philosophy
          </span>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-white lg:text-5xl">
            Built Around{" "}
            <span className="bg-gradient-to-r from-sky-400 to-amber-300 bg-clip-text text-transparent">
              Trust, Quality &
              Innovation
            </span>
          </h2>

          <p className="mt-6 text-base leading-8 text-slate-400">
            We believe outstanding software comes from clear communication,
            strong ownership, continuous learning, and teamwork—not complexity.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">

          {/* Left Side */}
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">

            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />

            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">
              Our Vision
            </span>

            <h3 className="mt-4 text-3xl font-black text-white">
              Deliver modern digital experiences with confidence.
            </h3>

            <p className="mt-6 text-sm leading-8 text-slate-300">
              Easy Master IT Solutions combines engineering excellence,
              thoughtful design, and reliable support to build digital products
              that are scalable, secure, and enjoyable to use.
            </p>

            <div className="mt-10 space-y-4">

              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
                <p className="text-xs uppercase tracking-widest text-sky-400">
                  Vision
                </p>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Create digital solutions that help businesses grow through
                  innovation, reliability, and exceptional user experiences.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
                <p className="text-xs uppercase tracking-widest text-amber-400">
                  Mission
                </p>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Build high-quality software with modern technologies while
                  maintaining transparency, collaboration, and continuous
                  improvement.
                </p>
              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="grid gap-6 sm:grid-cols-2">

            {cultureCards.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-sky-500/30 hover:bg-white/[0.05] hover:shadow-[0_20px_60px_rgba(14,165,233,.15)]"
                >
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-sky-500/5 blur-3xl transition-all duration-500 group-hover:bg-sky-500/10" />

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-amber-500/20 text-sky-300">
                    <Icon size={24} />
                  </div>

                  <h4 className="mt-6 text-lg font-bold text-white">
                    {item.title}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {item.text}
                  </p>

                  <div className="mt-6 h-[2px] w-0 bg-gradient-to-r from-sky-400 to-amber-400 transition-all duration-500 group-hover:w-full" />
                </div>
              );
            })}

          </div>

        </div>
      </div>
    </section>
  );
}