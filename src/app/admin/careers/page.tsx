"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Ban,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  CalendarPlus,
  CheckCircle2,
  Clock3,
  Eye,
  EyeOff,
  MapPin,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "INTERNSHIP"
  | "CONTRACT"
  | "FREELANCE";

type WorkMode =
  | "ONSITE"
  | "REMOTE"
  | "HYBRID";

type CareerStatus = "OPEN" | "CLOSED";

type DeadlineFilter =
  | "ALL"
  | "ACTIVE"
  | "CLOSING_SOON"
  | "EXPIRED"
  | "NO_DEADLINE";

type DeadlineType =
  | "ACTIVE"
  | "CLOSING_SOON"
  | "TODAY"
  | "EXPIRED"
  | "NO_DEADLINE";

type Career = {
  id: string;
  title: string;
  department: string;
  location: string;

  employmentType: EmploymentType;
  workMode: WorkMode;

  experienceLevel: string;

  shortDescription: string;
  description: string;

  responsibilities: string[];
  requirements: string[];
  skills: string[];

  salaryRange?: string | null;
  applicationEmail?: string | null;
  applicationUrl?: string | null;

  deadline?: string | null;

  status: CareerStatus;
  isPublished: boolean;

  createdAt: string;
  updatedAt?: string;
};

type CareerForm = {
  title: string;
  department: string;
  location: string;

  employmentType: EmploymentType;
  workMode: WorkMode;

  experienceLevel: string;

  shortDescription: string;
  description: string;

  responsibilities: string;
  requirements: string;
  skills: string;

  salaryRange: string;
  applicationEmail: string;
  applicationUrl: string;

  deadline: string;

  status: CareerStatus;
  isPublished: boolean;
};

const emptyForm: CareerForm = {
  title: "",
  department: "",
  location: "Colombo, Sri Lanka",

  employmentType: "FULL_TIME",
  workMode: "ONSITE",

  experienceLevel: "",

  shortDescription: "",
  description: "",

  responsibilities: "",
  requirements: "",
  skills: "",

  salaryRange: "",
  applicationEmail: "",
  applicationUrl: "",

  deadline: "",

  status: "OPEN",
  isPublished: true,
};

/* ======================================================
   DEADLINE HELPERS
====================================================== */

function getDeadlineInfo(deadline?: string | null): {
  type: DeadlineType;
  label: string;
  days: number | null;
} {
  if (!deadline) {
    return {
      type: "NO_DEADLINE",
      label: "No Deadline",
      days: null,
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);

  const difference =
    deadlineDate.getTime() - today.getTime();

  const days = Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );

  if (days < 0) {
    const expiredDays = Math.abs(days);

    return {
      type: "EXPIRED",
      label: `Expired ${expiredDays} day${
        expiredDays === 1 ? "" : "s"
      } ago`,
      days,
    };
  }

  if (days === 0) {
    return {
      type: "TODAY",
      label: "Expires Today",
      days,
    };
  }

  if (days <= 7) {
    return {
      type: "CLOSING_SOON",
      label: `Closing in ${days} day${
        days === 1 ? "" : "s"
      }`,
      days,
    };
  }

  return {
    type: "ACTIVE",
    label: `${days} days remaining`,
    days,
  };
}

function isExpired(deadline?: string | null) {
  return (
    getDeadlineInfo(deadline).type ===
    "EXPIRED"
  );
}

function getTodayString() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    today.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(date?: string | null) {
  if (!date) return "No deadline";

  return new Date(date).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function formatEnum(value: string) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

/* ======================================================
   PAGE
====================================================== */

export default function AdminCareersPage() {
  const [careers, setCareers] = useState<
    Career[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [search, setSearch] = useState("");

  const [deadlineFilter, setDeadlineFilter] =
    useState<DeadlineFilter>("ALL");

  const [showForm, setShowForm] =
    useState(false);

  const [editingCareer, setEditingCareer] =
    useState<Career | null>(null);

  const [form, setForm] =
    useState<CareerForm>(emptyForm);

  const [extendCareer, setExtendCareer] =
    useState<Career | null>(null);

  const [newDeadline, setNewDeadline] =
    useState("");

  const [extending, setExtending] =
    useState(false);

  /* ======================================================
     FETCH
  ====================================================== */

  async function fetchCareers() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/admin/careers",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(
          data.message ||
            "Failed to fetch careers."
        );
        return;
      }

      if (data.success) {
        setCareers(data.data);
      }
    } catch (error) {
      console.error(
        "Failed to load careers:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCareers();
  }, []);

  /* ======================================================
     FORM
  ====================================================== */

  function updateForm<K extends keyof CareerForm>(
    field: K,
    value: CareerForm[K]
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function openAddForm() {
    setEditingCareer(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEditForm(career: Career) {
    setEditingCareer(career);

    setForm({
      title: career.title,
      department: career.department,
      location: career.location,

      employmentType:
        career.employmentType,

      workMode: career.workMode,

      experienceLevel:
        career.experienceLevel,

      shortDescription:
        career.shortDescription,

      description: career.description,

      responsibilities:
        career.responsibilities.join("\n"),

      requirements:
        career.requirements.join("\n"),

      skills: career.skills.join(", "),

      salaryRange:
        career.salaryRange || "",

      applicationEmail:
        career.applicationEmail || "",

      applicationUrl:
        career.applicationUrl || "",

      deadline: career.deadline
        ? new Date(career.deadline)
            .toISOString()
            .split("T")[0]
        : "",

      status: career.status,

      isPublished:
        career.isPublished,
    });

    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingCareer(null);
    setForm(emptyForm);
  }

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    if (
      form.deadline &&
      form.deadline < getTodayString() &&
      !editingCareer
    ) {
      alert(
        "Application deadline cannot be in the past."
      );
      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...form,

        title: form.title.trim(),
        department:
          form.department.trim(),

        location: form.location.trim(),

        experienceLevel:
          form.experienceLevel.trim(),

        shortDescription:
          form.shortDescription.trim(),

        description:
          form.description.trim(),

        responsibilities:
          form.responsibilities
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),

        requirements:
          form.requirements
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),

        skills: form.skills
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        salaryRange:
          form.salaryRange.trim(),

        applicationEmail:
          form.applicationEmail.trim(),

        applicationUrl:
          form.applicationUrl.trim(),
      };

      const url = editingCareer
        ? `/api/admin/careers/${editingCareer.id}`
        : "/api/admin/careers";

      const response = await fetch(url, {
        method: editingCareer
          ? "PUT"
          : "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Something went wrong."
        );
        return;
      }

      closeForm();
      await fetchCareers();
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong while saving the vacancy."
      );
    } finally {
      setSaving(false);
    }
  }

  /* ======================================================
     VISIBILITY
  ====================================================== */

  async function toggleVisibility(
    career: Career
  ) {
    try {
      const response = await fetch(
        `/api/admin/careers/${career.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            isPublished:
              !career.isPublished,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to update visibility."
        );
        return;
      }

      await fetchCareers();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to update vacancy visibility."
      );
    }
  }

  /* ======================================================
     OPEN / CLOSE STATUS
  ====================================================== */

  async function toggleStatus(
    career: Career
  ) {
    const newStatus: CareerStatus =
      career.status === "OPEN"
        ? "CLOSED"
        : "OPEN";

    const confirmed = window.confirm(
      newStatus === "CLOSED"
        ? `Close "${career.title}" vacancy?`
        : `Re-open "${career.title}" vacancy?`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/admin/careers/${career.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to update vacancy status."
        );
        return;
      }

      await fetchCareers();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to update vacancy status."
      );
    }
  }

  /* ======================================================
     DELETE
  ====================================================== */

  async function deleteCareer(
    career: Career
  ) {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${career.title}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/admin/careers/${career.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to delete vacancy."
        );
        return;
      }

      await fetchCareers();
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong while deleting the vacancy."
      );
    }
  }

  /* ======================================================
     EXTEND DEADLINE
  ====================================================== */

  function openExtendDeadline(
    career: Career
  ) {
    setExtendCareer(career);

    setNewDeadline(
      career.deadline
        ? new Date(career.deadline)
            .toISOString()
            .split("T")[0]
        : ""
    );
  }

  function closeExtendDeadline() {
    setExtendCareer(null);
    setNewDeadline("");
  }

  async function handleExtendDeadline() {
    if (!extendCareer) return;

    if (!newDeadline) {
      alert(
        "Please select a new deadline."
      );
      return;
    }

    if (newDeadline < getTodayString()) {
      alert(
        "New deadline cannot be in the past."
      );
      return;
    }

    if (
      extendCareer.deadline &&
      newDeadline <=
        new Date(extendCareer.deadline)
          .toISOString()
          .split("T")[0]
    ) {
      const confirmed = window.confirm(
        "The selected date is not later than the current deadline. Do you still want to continue?"
      );

      if (!confirmed) return;
    }

    try {
      setExtending(true);

      const response = await fetch(
        `/api/admin/careers/${extendCareer.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            deadline: newDeadline,

            // Automatically re-open when deadline is extended
            status: "OPEN",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to extend deadline."
        );
        return;
      }

      closeExtendDeadline();
      await fetchCareers();
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong while extending the deadline."
      );
    } finally {
      setExtending(false);
    }
  }

  /* ======================================================
     COUNTS
  ====================================================== */

  const openVacancies =
    careers.filter(
      (career) =>
        career.status === "OPEN"
    ).length;

  const publishedVacancies =
    careers.filter(
      (career) => career.isPublished
    ).length;

  const closingSoonVacancies =
    careers.filter((career) => {
      const type =
        getDeadlineInfo(
          career.deadline
        ).type;

      return (
        type === "CLOSING_SOON" ||
        type === "TODAY"
      );
    }).length;

  const expiredVacancies =
    careers.filter((career) =>
      isExpired(career.deadline)
    ).length;

  /* ======================================================
     SEARCH + FILTER
  ====================================================== */

  const filteredCareers =
    careers.filter((career) => {
      const searchTerm =
        search.toLowerCase().trim();

      const matchesSearch =
        !searchTerm ||
        career.title
          .toLowerCase()
          .includes(searchTerm) ||
        career.department
          .toLowerCase()
          .includes(searchTerm) ||
        career.location
          .toLowerCase()
          .includes(searchTerm) ||
        career.skills.some((skill) =>
          skill
            .toLowerCase()
            .includes(searchTerm)
        );

      if (!matchesSearch) {
        return false;
      }

      const deadlineInfo =
        getDeadlineInfo(
          career.deadline
        );

      if (
        deadlineFilter === "ALL"
      ) {
        return true;
      }

      if (
        deadlineFilter === "ACTIVE"
      ) {
        return (
          deadlineInfo.type ===
          "ACTIVE"
        );
      }

      if (
        deadlineFilter ===
        "CLOSING_SOON"
      ) {
        return (
          deadlineInfo.type ===
            "CLOSING_SOON" ||
          deadlineInfo.type ===
            "TODAY"
        );
      }

      if (
        deadlineFilter === "EXPIRED"
      ) {
        return (
          deadlineInfo.type ===
          "EXPIRED"
        );
      }

      if (
        deadlineFilter ===
        "NO_DEADLINE"
      ) {
        return (
          deadlineInfo.type ===
          "NO_DEADLINE"
        );
      }

      return true;
    });

  /* ======================================================
     UI
  ====================================================== */

  return (
    <div className="min-h-screen bg-slate-50 p-5 md:p-8">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-amber-500">
            Website Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Careers
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Create and manage job
            vacancies, internships and
            career opportunities
            published on the EasyMaster
            website.
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <Plus size={18} />
          Add Career
        </button>
      </div>

      {/* ================= STATS ================= */}

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Total Vacancies"
          value={careers.length}
          icon={BriefcaseBusiness}
        />

        <StatCard
          title="Open Vacancies"
          value={openVacancies}
          icon={CheckCircle2}
        />

        <StatCard
          title="Closing Soon"
          value={
            closingSoonVacancies
          }
          icon={CalendarClock}
        />

        <StatCard
          title="Expired"
          value={expiredVacancies}
          icon={AlertTriangle}
        />

        <StatCard
          title="Published"
          value={publishedVacancies}
          icon={Eye}
        />
      </div>

      {/* ================= MAIN PANEL ================= */}

      <div className="mt-7 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        {/* Panel header */}

        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Career Vacancies
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Manage all employment
              opportunities.
            </p>
          </div>

          <div className="relative w-full lg:w-[340px]">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search title, department, location or skill..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
            />
          </div>
        </div>

        {/* Filters */}

        <div className="flex flex-wrap gap-2 border-b border-slate-100 bg-slate-50/50 px-5 py-4">
          <FilterButton
            active={
              deadlineFilter === "ALL"
            }
            onClick={() =>
              setDeadlineFilter("ALL")
            }
            label={`All (${careers.length})`}
          />

          <FilterButton
            active={
              deadlineFilter ===
              "ACTIVE"
            }
            onClick={() =>
              setDeadlineFilter(
                "ACTIVE"
              )
            }
            label="Active"
          />

          <FilterButton
            active={
              deadlineFilter ===
              "CLOSING_SOON"
            }
            onClick={() =>
              setDeadlineFilter(
                "CLOSING_SOON"
              )
            }
            label={`Closing Soon (${closingSoonVacancies})`}
          />

          <FilterButton
            active={
              deadlineFilter ===
              "EXPIRED"
            }
            onClick={() =>
              setDeadlineFilter(
                "EXPIRED"
              )
            }
            label={`Expired (${expiredVacancies})`}
          />

          <FilterButton
            active={
              deadlineFilter ===
              "NO_DEADLINE"
            }
            onClick={() =>
              setDeadlineFilter(
                "NO_DEADLINE"
              )
            }
            label="No Deadline"
          />
        </div>

        {/* List */}

        <div className="p-5">
          {loading ? (
            <div className="py-16 text-center text-sm text-slate-400">
              Loading careers...
            </div>
          ) : filteredCareers.length ===
            0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50">
                <BriefcaseBusiness
                  size={26}
                  className="text-amber-500"
                />
              </div>

              <h3 className="mt-4 font-bold text-slate-700">
                No career vacancies
                found
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Try another filter or add
                a new career opportunity.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCareers.map(
                (career) => {
                  const deadlineInfo =
                    getDeadlineInfo(
                      career.deadline
                    );

                  return (
                    <div
                      key={career.id}
                      className={`rounded-2xl border p-5 transition hover:shadow-md ${
                        deadlineInfo.type ===
                        "EXPIRED"
                          ? "border-red-100 bg-red-50/20"
                          : deadlineInfo.type ===
                              "CLOSING_SOON" ||
                            deadlineInfo.type ===
                              "TODAY"
                          ? "border-amber-100 bg-amber-50/20"
                          : "border-slate-100 bg-white hover:border-amber-100"
                      }`}
                    >
                      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                        {/* Details */}

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-bold text-slate-800">
                              {
                                career.title
                              }
                            </h3>

                            <StatusBadge
                              status={
                                career.status
                              }
                            />

                            <VisibilityBadge
                              visible={
                                career.isPublished
                              }
                            />

                            <DeadlineBadge
                              type={
                                deadlineInfo.type
                              }
                              label={
                                deadlineInfo.label
                              }
                            />
                          </div>

                          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                            {
                              career.shortDescription
                            }
                          </p>

                          {/* Meta */}

                          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <Building2
                                size={15}
                              />
                              {
                                career.department
                              }
                            </span>

                            <span className="flex items-center gap-1.5">
                              <MapPin
                                size={15}
                              />
                              {
                                career.location
                              }
                            </span>

                            <span className="flex items-center gap-1.5">
                              <BriefcaseBusiness
                                size={15}
                              />
                              {formatEnum(
                                career.employmentType
                              )}
                            </span>

                            <span className="flex items-center gap-1.5">
                              <Clock3
                                size={15}
                              />
                              {formatEnum(
                                career.workMode
                              )}
                            </span>

                            <span className="flex items-center gap-1.5">
                              <CalendarClock
                                size={15}
                              />
                              Deadline:{" "}
                              {formatDate(
                                career.deadline
                              )}
                            </span>
                          </div>

                          {/* Skills */}

                          {career.skills
                            .length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {career.skills
                                .slice(0, 6)
                                .map(
                                  (
                                    skill
                                  ) => (
                                    <span
                                      key={
                                        skill
                                      }
                                      className="rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700"
                                    >
                                      {
                                        skill
                                      }
                                    </span>
                                  )
                                )}

                              {career
                                .skills
                                .length >
                                6 && (
                                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                                  +
                                  {career
                                    .skills
                                    .length -
                                    6}{" "}
                                  more
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Actions */}

                        <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                          {/* Extend */}

                          <ActionButton
                            title="Extend deadline"
                            onClick={() =>
                              openExtendDeadline(
                                career
                              )
                            }
                            className="hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                          >
                            <CalendarPlus
                              size={18}
                            />
                          </ActionButton>

                          {/* Show / hide */}

                          <ActionButton
                            title={
                              career.isPublished
                                ? "Hide vacancy"
                                : "Show vacancy"
                            }
                            onClick={() =>
                              toggleVisibility(
                                career
                              )
                            }
                            className="hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                          >
                            {career.isPublished ? (
                              <EyeOff
                                size={18}
                              />
                            ) : (
                              <Eye
                                size={18}
                              />
                            )}
                          </ActionButton>

                          {/* Open / close */}

                          <ActionButton
                            title={
                              career.status ===
                              "OPEN"
                                ? "Close vacancy"
                                : "Re-open vacancy"
                            }
                            onClick={() =>
                              toggleStatus(
                                career
                              )
                            }
                            className={
                              career.status ===
                              "OPEN"
                                ? "hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                                : "hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                            }
                          >
                            {career.status ===
                            "OPEN" ? (
                              <Ban
                                size={18}
                              />
                            ) : (
                              <CheckCircle2
                                size={18}
                              />
                            )}
                          </ActionButton>

                          {/* Edit */}

                          <ActionButton
                            title="Edit vacancy"
                            onClick={() =>
                              openEditForm(
                                career
                              )
                            }
                            className="hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Pencil
                              size={18}
                            />
                          </ActionButton>

                          {/* Delete */}

                          <ActionButton
                            title="Delete vacancy"
                            onClick={() =>
                              deleteCareer(
                                career
                              )
                            }
                            className="hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2
                              size={18}
                            />
                          </ActionButton>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>

      {/* ==================================================
          ADD / EDIT MODAL
      ================================================== */}

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* Modal header */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5 md:px-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-500">
                  Career Management
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {editingCareer
                    ? "Update Career Vacancy"
                    : "Add New Career Vacancy"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-7"
            >
              {/* Basic information */}

              <FormSection
                title="Basic Information"
                description="Core details about the position."
              >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Input
                    label="Job Title"
                    required
                    value={form.title}
                    onChange={(
                      value
                    ) =>
                      updateForm(
                        "title",
                        value
                      )
                    }
                    placeholder="e.g. Software Engineer"
                  />

                  <Input
                    label="Department"
                    required
                    value={
                      form.department
                    }
                    onChange={(
                      value
                    ) =>
                      updateForm(
                        "department",
                        value
                      )
                    }
                    placeholder="e.g. Software Engineering"
                  />

                  <Input
                    label="Location"
                    required
                    value={form.location}
                    onChange={(
                      value
                    ) =>
                      updateForm(
                        "location",
                        value
                      )
                    }
                    placeholder="Colombo, Sri Lanka"
                  />

                  <Input
                    label="Experience Level"
                    required
                    value={
                      form.experienceLevel
                    }
                    onChange={(
                      value
                    ) =>
                      updateForm(
                        "experienceLevel",
                        value
                      )
                    }
                    placeholder="e.g. Entry Level / 1 - 2 Years"
                  />

                  <Select
                    label="Employment Type"
                    value={
                      form.employmentType
                    }
                    onChange={(
                      value
                    ) =>
                      updateForm(
                        "employmentType",
                        value as EmploymentType
                      )
                    }
                    options={[
                      {
                        value:
                          "FULL_TIME",
                        label:
                          "Full Time",
                      },
                      {
                        value:
                          "PART_TIME",
                        label:
                          "Part Time",
                      },
                      {
                        value:
                          "INTERNSHIP",
                        label:
                          "Internship",
                      },
                      {
                        value:
                          "CONTRACT",
                        label:
                          "Contract",
                      },
                      {
                        value:
                          "FREELANCE",
                        label:
                          "Freelance",
                      },
                    ]}
                  />

                  <Select
                    label="Work Mode"
                    value={
                      form.workMode
                    }
                    onChange={(
                      value
                    ) =>
                      updateForm(
                        "workMode",
                        value as WorkMode
                      )
                    }
                    options={[
                      {
                        value:
                          "ONSITE",
                        label:
                          "On-site",
                      },
                      {
                        value:
                          "REMOTE",
                        label:
                          "Remote",
                      },
                      {
                        value:
                          "HYBRID",
                        label:
                          "Hybrid",
                      },
                    ]}
                  />

                  <Input
                    label="Salary Range"
                    value={
                      form.salaryRange
                    }
                    onChange={(
                      value
                    ) =>
                      updateForm(
                        "salaryRange",
                        value
                      )
                    }
                    placeholder="e.g. Negotiable"
                  />

                  <Input
                    label="Application Deadline"
                    type="date"
                    min={
                      editingCareer
                        ? undefined
                        : getTodayString()
                    }
                    value={
                      form.deadline
                    }
                    onChange={(
                      value
                    ) =>
                      updateForm(
                        "deadline",
                        value
                      )
                    }
                  />
                </div>
              </FormSection>

              {/* Job content */}

              <FormSection
                title="Job Information"
                description="Information applicants will see on the career page."
              >
                <div className="space-y-5">
                  <TextArea
                    label="Short Description"
                    required
                    value={
                      form.shortDescription
                    }
                    onChange={(
                      value
                    ) =>
                      updateForm(
                        "shortDescription",
                        value
                      )
                    }
                    placeholder="Write a concise introduction for this vacancy..."
                    rows={3}
                  />

                  <TextArea
                    label="Job Description"
                    required
                    value={
                      form.description
                    }
                    onChange={(
                      value
                    ) =>
                      updateForm(
                        "description",
                        value
                      )
                    }
                    placeholder="Describe the role, team and purpose of the position..."
                    rows={5}
                  />

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <TextArea
                      label="Key Responsibilities"
                      value={
                        form.responsibilities
                      }
                      onChange={(
                        value
                      ) =>
                        updateForm(
                          "responsibilities",
                          value
                        )
                      }
                      placeholder={`Enter one responsibility per line.\nDevelop and maintain web applications\nCollaborate with the development team`}
                      rows={7}
                    />

                    <TextArea
                      label="Requirements"
                      value={
                        form.requirements
                      }
                      onChange={(
                        value
                      ) =>
                        updateForm(
                          "requirements",
                          value
                        )
                      }
                      placeholder={`Enter one requirement per line.\nDegree in IT or related field\nKnowledge of JavaScript`}
                      rows={7}
                    />
                  </div>

                  <div>
                    <Input
                      label="Skills"
                      value={
                        form.skills
                      }
                      onChange={(
                        value
                      ) =>
                        updateForm(
                          "skills",
                          value
                        )
                      }
                      placeholder="React, Next.js, TypeScript, Node.js, PostgreSQL"
                    />

                    <p className="mt-1.5 text-xs text-slate-400">
                      Separate each skill
                      using a comma.
                    </p>
                  </div>
                </div>
              </FormSection>

              {/* Application */}

              <FormSection
                title="Application Settings"
                description="Control how candidates apply and whether the vacancy is visible."
              >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Input
                    label="Application Email"
                    type="email"
                    value={
                      form.applicationEmail
                    }
                    onChange={(
                      value
                    ) =>
                      updateForm(
                        "applicationEmail",
                        value
                      )
                    }
                    placeholder="careers@easymaster.lk"
                  />

                  <Input
                    label="External Application URL"
                    type="url"
                    value={
                      form.applicationUrl
                    }
                    onChange={(
                      value
                    ) =>
                      updateForm(
                        "applicationUrl",
                        value
                      )
                    }
                    placeholder="https://..."
                  />

                  <Select
                    label="Vacancy Status"
                    value={form.status}
                    onChange={(
                      value
                    ) =>
                      updateForm(
                        "status",
                        value as CareerStatus
                      )
                    }
                    options={[
                      {
                        value: "OPEN",
                        label: "Open",
                      },
                      {
                        value:
                          "CLOSED",
                        label:
                          "Closed",
                      },
                    ]}
                  />

                  {/* Visibility */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Website Visibility
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        updateForm(
                          "isPublished",
                          !form.isPublished
                        )
                      }
                      className={`flex h-[46px] w-full items-center justify-between rounded-xl border px-4 transition ${
                        form.isPublished
                          ? "border-emerald-200 bg-emerald-50"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <span
                        className={`text-sm font-semibold ${
                          form.isPublished
                            ? "text-emerald-700"
                            : "text-slate-500"
                        }`}
                      >
                        {form.isPublished
                          ? "Visible on website"
                          : "Hidden from website"}
                      </span>

                      {form.isPublished ? (
                        <Eye
                          size={18}
                          className="text-emerald-600"
                        />
                      ) : (
                        <EyeOff
                          size={18}
                          className="text-slate-400"
                        />
                      )}
                    </button>
                  </div>
                </div>
              </FormSection>

              {/* Buttons */}

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-6 py-2.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingCareer
                    ? "Update Vacancy"
                    : "Publish Vacancy"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================
          EXTEND DEADLINE MODAL
      ================================================== */}

      {extendCareer && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            {/* Header */}

            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-500">
                  Deadline Management
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Extend Deadline
                </h2>
              </div>

              <button
                type="button"
                onClick={
                  closeExtendDeadline
                }
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Vacancy */}

            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Vacancy
              </p>

              <p className="mt-1 font-bold text-slate-800">
                {
                  extendCareer.title
                }
              </p>

              <div className="mt-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Current Deadline
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {formatDate(
                    extendCareer.deadline
                  )}
                </p>

                <div className="mt-2">
                  <DeadlineBadge
                    type={
                      getDeadlineInfo(
                        extendCareer.deadline
                      ).type
                    }
                    label={
                      getDeadlineInfo(
                        extendCareer.deadline
                      ).label
                    }
                  />
                </div>
              </div>
            </div>

            {/* New date */}

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                New Application Deadline
              </label>

              <input
                type="date"
                min={getTodayString()}
                value={newDeadline}
                onChange={(event) =>
                  setNewDeadline(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            <div className="mt-4 flex gap-2 rounded-xl border border-amber-100 bg-amber-50 p-3">
              <AlertTriangle
                size={17}
                className="mt-0.5 shrink-0 text-amber-600"
              />

              <p className="text-xs leading-5 text-amber-800">
                Extending the deadline
                will automatically set
                this vacancy status back
                to{" "}
                <strong>Open</strong>.
              </p>
            </div>

            {/* Buttons */}

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={
                  closeExtendDeadline
                }
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleExtendDeadline
                }
                disabled={
                  extending ||
                  !newDeadline
                }
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CalendarPlus
                  size={17}
                />

                {extending
                  ? "Extending..."
                  : "Extend Deadline"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ======================================================
   COMPONENTS
====================================================== */

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
          <Icon
            size={22}
            className="text-amber-500"
          />
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3.5 py-2 text-xs font-bold transition ${
        active
          ? "bg-amber-500 text-white shadow-sm"
          : "bg-slate-100 text-slate-500 hover:bg-amber-50 hover:text-amber-600"
      }`}
    >
      {label}
    </button>
  );
}

function ActionButton({
  title,
  onClick,
  children,
  className = "",
}: {
  title: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition ${className}`}
    >
      {children}
    </button>
  );
}

function StatusBadge({
  status,
}: {
  status: CareerStatus;
}) {
  if (status === "OPEN") {
    return (
      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-600">
        Open
      </span>
    );
  }

  return (
    <span className="rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-500">
      Closed
    </span>
  );
}

function VisibilityBadge({
  visible,
}: {
  visible: boolean;
}) {
  if (visible) {
    return (
      <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600">
        <Eye size={12} />
        Visible
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">
      <EyeOff size={12} />
      Hidden
    </span>
  );
}

function DeadlineBadge({
  type,
  label,
}: {
  type: DeadlineType;
  label: string;
}) {
  if (type === "EXPIRED") {
    return (
      <span className="flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-600">
        <AlertTriangle
          size={12}
        />
        {label}
      </span>
    );
  }

  if (type === "TODAY") {
    return (
      <span className="flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-600">
        <AlertTriangle
          size={12}
        />
        {label}
      </span>
    );
  }

  if (
    type === "CLOSING_SOON"
  ) {
    return (
      <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">
        <CalendarClock
          size={12}
        />
        {label}
      </span>
    );
  }

  if (type === "ACTIVE") {
    return (
      <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600">
        <CalendarClock
          size={12}
        />
        {label}
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">
      <CalendarClock size={12} />
      No Deadline
    </span>
  );
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="mb-5 border-b border-slate-100 pb-3">
        <h3 className="font-bold text-slate-800">
          {title}
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  min,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  min?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        required={required}
        min={min}
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows: number;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <textarea
        required={required}
        value={value}
        rows={rows}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        placeholder={placeholder}
        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
      >
        {options.map(
          (option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          )
        )}
      </select>
    </div>
  );
}