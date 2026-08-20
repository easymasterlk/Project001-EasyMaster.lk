"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Oxanium } from "next/font/google";

import {
  LayoutDashboard,
  Building2,
  BriefcaseBusiness,
  Monitor,
  Newspaper,
  BadgeDollarSign,
  FolderKanban,
  Cpu,
  Users,
  MessageSquare,
  FileText,
  CalendarDays,
  LifeBuoy,
  ShieldCheck,
  Settings,
  LogOut,
  ChevronRight,
  ExternalLink,
  ClipboardList,
} from "lucide-react";

const oxanium = Oxanium({
  subsets: ["latin"],
});

/* ======================================================
   WEBSITE MANAGEMENT
====================================================== */

const websiteItems = [
  {
    label: "Company",
    href: "/admin/company",
    icon: Building2,
  },
  {
    label: "Solutions",
    href: "/admin/solutions",
    icon: Monitor,
  },
  {
    label: "Insights",
    href: "/admin/insights",
    icon: Newspaper,
  },
  {
    label: "Pricing",
    href: "/admin/pricing",
    icon: BadgeDollarSign,
  },
  {
    label: "Portfolio",
    href: "/admin/portfolio",
    icon: FolderKanban,
  },
  {
    label: "Technologies",
    href: "/admin/technologies",
    icon: Cpu,
  },
];

/* ======================================================
   RECRUITMENT
====================================================== */

const recruitmentItems = [
  {
    label: "Careers",
    href: "/admin/careers",
    icon: BriefcaseBusiness,
  },
  {
    label: "Applications",
    href: "/admin/applications",
    icon: ClipboardList,
  },
];

/* ======================================================
   CUSTOMER MANAGEMENT
====================================================== */

const customerItems = [
  {
    label: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    label: "Inquiries",
    href: "/admin/inquiries",
    icon: MessageSquare,
  },
  {
    label: "Quote Requests",
    href: "/admin/quotes",
    icon: FileText,
  },
  {
    label: "Meetings",
    href: "/admin/meetings",
    icon: CalendarDays,
  },
  {
    label: "Support Requests",
    href: "/admin/support",
    icon: LifeBuoy,
  },
];

/* ======================================================
   SYSTEM
====================================================== */

const systemItems = [
  {
    label: "Admin Users",
    href: "/admin/users",
    icon: ShieldCheck,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

/* ======================================================
   COMPONENT
====================================================== */

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname.startsWith(href);
  };

  const renderItem = (item: {
    label: string;
    href: string;
    icon: React.ElementType;
  }) => {
    const Icon = item.icon;
    const active = isActive(item.href);

    return (
      <Link
        key={item.href}
        href={item.href}
        className={`group flex items-center justify-between rounded-xl px-3 py-2.5
          text-[14px] font-semibold transition-all duration-200
          ${
            active
              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
              : "text-slate-600 hover:bg-amber-50 hover:text-amber-600"
          }
        `}
      >
        <div className="flex items-center gap-3">
          <Icon
            size={19}
            strokeWidth={1.9}
            className={
              active
                ? "text-white"
                : "text-slate-500 group-hover:text-amber-500"
            }
          />

          <span>{item.label}</span>
        </div>

        <ChevronRight
          size={15}
          className={`transition-all ${
            active
              ? "text-white"
              : "text-slate-300 opacity-0 group-hover:opacity-100"
          }`}
        />
      </Link>
    );
  };

  return (
    <aside
      className={`${oxanium.className} fixed left-0 top-0 z-40 flex h-screen w-[270px] flex-col border-r border-slate-200 bg-white`}
    >
      {/* ==================================================
          LOGO
          Same image + same size as user navbar
      ================================================== */}

      <div className="flex h-20 items-center border-b border-slate-100">
        <Link
          href="/admin"
          className="flex items-center"
        >
          <div className="relative flex h-[58px] w-[210px] items-center overflow-visible">
            <Image
              src="/images/EM web nav logo LightT .png"
              alt="Easymaster IT Solution"
              width={210}
              height={58}
              className="block h-auto w-full object-contain"
              priority
            />
          </div>
        </Link>
      </div>

      {/* ==================================================
          ADMIN LABEL
      ================================================== */}

      <div className="border-b border-slate-100 px-5 py-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">
          Administration
        </p>

        <p className="mt-1 text-sm font-bold text-slate-800">
          EasyMaster Control Panel
        </p>
      </div>

      {/* ==================================================
          NAVIGATION
      ================================================== */}

      <div className="flex-1 overflow-y-auto px-4 py-5">
        {/* Dashboard */}

        <div className="space-y-1">
          {renderItem({
            label: "Dashboard",
            href: "/admin",
            icon: LayoutDashboard,
          })}
        </div>

        {/* Website Management */}

        <div className="mt-7">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Website Management
          </p>

          <div className="space-y-1">
            {websiteItems.map(renderItem)}
          </div>
        </div>

        {/* Recruitment */}

        <div className="mt-7">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Recruitment
          </p>

          <div className="space-y-1">
            {recruitmentItems.map(renderItem)}
          </div>
        </div>

        {/* Customer Management */}

        <div className="mt-7">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Customer Management
          </p>

          <div className="space-y-1">
            {customerItems.map(renderItem)}
          </div>
        </div>

        {/* System */}

        <div className="mt-7">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            System
          </p>

          <div className="space-y-1">
            {systemItems.map(renderItem)}
          </div>
        </div>
      </div>

      {/* ==================================================
          BOTTOM ACTIONS
      ================================================== */}

      <div className="border-t border-slate-100 p-4">
        <Link
          href="/"
          target="_blank"
          className="mb-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-amber-600"
        >
          <ExternalLink size={18} />

          View Website
        </Link>

        <form
          action="/api/auth/logout"
          method="POST"
        >
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={18} />

            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}