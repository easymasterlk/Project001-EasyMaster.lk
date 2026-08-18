"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ExternalLink,
  Eye,
  FileSearch,
  Filter,
  Mail,
  MapPin,
  Phone,
  Search,
  Trash2,
  UserCheck,
  UserRound,
  Users,
  X,
  XCircle,
} from "lucide-react";

/* ======================================================
   TYPES
====================================================== */

type ApplicationStatus =
  | "NEW"
  | "REVIEWING"
  | "SHORTLISTED"
  | "INTERVIEW"
  | "HIRED"
  | "REJECTED";

type CareerInfo = {
  id: string;
  title: string;
  department: string;
  location: string;
};

type Application = {
  id: string;

  careerId?: string | null;

  jobTitle: string;

  firstName: string;
  lastName: string;

  email: string;
  phone?: string | null;

  currentRole?: string | null;
  experience?: string | null;

  portfolioUrl?: string | null;
  linkedinUrl?: string | null;

  message?: string | null;
  resumeUrl?: string | null;

  status: ApplicationStatus;

  createdAt: string;
  updatedAt: string;

  career?: CareerInfo | null;
};

type StatusFilter =
  | "ALL"
  | ApplicationStatus;

/* ======================================================
   PAGE
====================================================== */

export default function ApplicationsPage() {
  const [
    applications,
    setApplications,
  ] = useState<Application[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [
    updatingStatus,
    setUpdatingStatus,
  ] = useState<string | null>(
    null
  );

  const [search, setSearch] =
    useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] =
    useState<StatusFilter>(
      "ALL"
    );

  const [
    positionFilter,
    setPositionFilter,
  ] = useState("ALL");

  const [
    selectedApplication,
    setSelectedApplication,
  ] =
    useState<Application | null>(
      null
    );

  /* ======================================================
     FETCH
  ====================================================== */

  async function fetchApplications() {
    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/admin/applications",
          {
            cache: "no-store",
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
          "Applications API returned non JSON:",
          text
        );

        return;
      }

      const data =
        await response.json();

      if (!response.ok) {
        console.error(
          data.message ||
            "Failed to load applications."
        );

        return;
      }

      if (
        data.success &&
        Array.isArray(
          data.data
        )
      ) {
        setApplications(
          data.data
        );
      }
    } catch (error) {
      console.error(
        "LOAD APPLICATIONS ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  /* ======================================================
     UPDATE STATUS
  ====================================================== */

  async function updateStatus(
    application: Application,
    status: ApplicationStatus
  ) {
    try {
      setUpdatingStatus(
        application.id
      );

      const response =
        await fetch(
          `/api/admin/applications/${application.id}`,
          {
            method:
              "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                status,
              }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to update status."
        );
        return;
      }

      setApplications(
        (previous) =>
          previous.map(
            (item) =>
              item.id ===
              application.id
                ? {
                    ...item,
                    status,
                  }
                : item
          )
      );

      setSelectedApplication(
        (current) =>
          current?.id ===
          application.id
            ? {
                ...current,
                status,
              }
            : current
      );
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong while updating the application."
      );
    } finally {
      setUpdatingStatus(
        null
      );
    }
  }

  /* ======================================================
     DELETE
  ====================================================== */

  async function deleteApplication(
    application: Application
  ) {
    const fullName =
      `${application.firstName} ${application.lastName}`;

    const confirmed =
      window.confirm(
        `Are you sure you want to permanently delete ${fullName}'s application?\n\nThis action cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          `/api/admin/applications/${application.id}`,
          {
            method:
              "DELETE",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to delete application."
        );

        return;
      }

      setApplications(
        (previous) =>
          previous.filter(
            (item) =>
              item.id !==
              application.id
          )
      );

      if (
        selectedApplication?.id ===
        application.id
      ) {
        setSelectedApplication(
          null
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong while deleting the application."
      );
    }
  }

  /* ======================================================
     COUNTS
  ====================================================== */

  const totalApplications =
    applications.length;

  const newApplications =
    applications.filter(
      (application) =>
        application.status ===
        "NEW"
    ).length;

  const shortlistedApplications =
    applications.filter(
      (application) =>
        application.status ===
        "SHORTLISTED"
    ).length;

  const interviewApplications =
    applications.filter(
      (application) =>
        application.status ===
        "INTERVIEW"
    ).length;

  const hiredApplications =
    applications.filter(
      (application) =>
        application.status ===
        "HIRED"
    ).length;

  /* ======================================================
     POSITION OPTIONS
  ====================================================== */

  const positions =
    useMemo(() => {
      return Array.from(
        new Set(
          applications.map(
            (application) =>
              application.jobTitle
          )
        )
      ).sort();
    }, [applications]);

  /* ======================================================
     FILTER
  ====================================================== */

  const filteredApplications =
    applications.filter(
      (application) => {
        const searchTerm =
          search
            .trim()
            .toLowerCase();

        const fullName =
          `${application.firstName} ${application.lastName}`.toLowerCase();

        const matchesSearch =
          !searchTerm ||
          fullName.includes(
            searchTerm
          ) ||
          application.email
            .toLowerCase()
            .includes(
              searchTerm
            ) ||
          application.jobTitle
            .toLowerCase()
            .includes(
              searchTerm
            ) ||
          application.currentRole
            ?.toLowerCase()
            .includes(
              searchTerm
            );

        const matchesStatus =
          statusFilter ===
            "ALL" ||
          application.status ===
            statusFilter;

        const matchesPosition =
          positionFilter ===
            "ALL" ||
          application.jobTitle ===
            positionFilter;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesPosition
        );
      }
    );

  /* ======================================================
     UI
  ====================================================== */

  return (
    <div className="min-h-screen bg-slate-50 p-5 md:p-8">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="text-sm font-semibold text-amber-500">
            Recruitment
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Applications
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Review applicants,
            manage recruitment
            progress and keep track
            of candidates applying
            for EasyMaster career
            opportunities.
          </p>

        </div>

      </div>

      {/* ================= STATS ================= */}

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">

        <StatCard
          title="Total Applications"
          value={
            totalApplications
          }
          icon={Users}
        />

        <StatCard
          title="New"
          value={
            newApplications
          }
          icon={FileSearch}
        />

        <StatCard
          title="Shortlisted"
          value={
            shortlistedApplications
          }
          icon={UserCheck}
        />

        <StatCard
          title="Interviews"
          value={
            interviewApplications
          }
          icon={Clock3}
        />

        <StatCard
          title="Hired"
          value={
            hiredApplications
          }
          icon={CheckCircle2}
        />

      </div>

      {/* ================= MAIN PANEL ================= */}

      <div className="mt-7 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

        {/* Panel Header */}

        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 xl:flex-row xl:items-center xl:justify-between">

          <div>

            <h2 className="text-lg font-bold text-slate-800">
              Candidate Applications
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {
                filteredApplications.length
              }{" "}
              application
              {filteredApplications.length ===
              1
                ? ""
                : "s"}{" "}
              found
            </p>

          </div>

          <div className="flex w-full flex-col gap-3 md:flex-row xl:w-auto">

            {/* Search */}

            <div className="relative w-full md:min-w-[300px]">

              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(
                  event
                ) =>
                  setSearch(
                    event.target
                      .value
                  )
                }
                placeholder="Search applicant, email or position..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
              />

            </div>

            {/* Position */}

            <select
              value={
                positionFilter
              }
              onChange={(
                event
              ) =>
                setPositionFilter(
                  event.target
                    .value
                )
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            >

              <option value="ALL">
                All Positions
              </option>

              {positions.map(
                (position) => (
                  <option
                    key={
                      position
                    }
                    value={
                      position
                    }
                  >
                    {
                      position
                    }
                  </option>
                )
              )}

            </select>

          </div>
        </div>

        {/* Status Filters */}

        <div className="flex flex-wrap gap-2 border-b border-slate-100 bg-slate-50/50 px-5 py-4">

          {(
            [
              "ALL",
              "NEW",
              "REVIEWING",
              "SHORTLISTED",
              "INTERVIEW",
              "HIRED",
              "REJECTED",
            ] as StatusFilter[]
          ).map(
            (status) => (
              <button
                key={status}
                onClick={() =>
                  setStatusFilter(
                    status
                  )
                }
                className={`rounded-lg px-3.5 py-2 text-xs font-bold transition ${
                  statusFilter ===
                  status
                    ? "bg-amber-500 text-white shadow-sm"
                    : "bg-slate-100 text-slate-500 hover:bg-amber-50 hover:text-amber-600"
                }`}
              >
                {status ===
                "ALL"
                  ? "All"
                  : formatStatus(
                      status
                    )}
              </button>
            )
          )}

        </div>

        {/* Applications */}

        <div className="p-5">

          {loading ? (

            <div className="py-16 text-center text-sm text-slate-400">
              Loading applications...
            </div>

          ) : filteredApplications.length ===
            0 ? (

            <div className="flex flex-col items-center justify-center py-16 text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50">
                <Users
                  size={26}
                  className="text-amber-500"
                />
              </div>

              <h3 className="mt-4 font-bold text-slate-700">
                No applications
                found
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Applications
                submitted through
                the Careers page
                will appear here.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {filteredApplications.map(
                (
                  application
                ) => (

                  <div
                    key={
                      application.id
                    }
                    className="rounded-2xl border border-slate-100 bg-white p-5 transition hover:border-amber-100 hover:shadow-md"
                  >

                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                      {/* Applicant */}

                      <div className="flex min-w-0 flex-1 items-start gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">

                          <UserRound
                            size={
                              22
                            }
                          />

                        </div>

                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-2">

                            <h3 className="font-bold text-slate-800">
                              {
                                application.firstName
                              }{" "}
                              {
                                application.lastName
                              }
                            </h3>

                            <ApplicationStatusBadge
                              status={
                                application.status
                              }
                            />

                          </div>

                          <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-600">

                            <BriefcaseBusiness
                              size={
                                15
                              }
                              className="text-amber-500"
                            />

                            {
                              application.jobTitle
                            }

                          </div>

                          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-500">

                            <span className="flex items-center gap-1.5">

                              <Mail
                                size={
                                  14
                                }
                              />

                              {
                                application.email
                              }

                            </span>

                            {application.phone && (

                              <span className="flex items-center gap-1.5">

                                <Phone
                                  size={
                                    14
                                  }
                                />

                                {
                                  application.phone
                                }

                              </span>

                            )}

                            <span className="flex items-center gap-1.5">

                              <Clock3
                                size={
                                  14
                                }
                              />

                              Applied{" "}
                              {formatDate(
                                application.createdAt
                              )}

                            </span>

                          </div>

                        </div>

                      </div>

                      {/* Actions */}

                      <div className="flex flex-wrap items-center gap-2">

                        {/* Quick Status */}

                        <div className="relative">

                          <select
                            disabled={
                              updatingStatus ===
                              application.id
                            }
                            value={
                              application.status
                            }
                            onChange={(
                              event
                            ) =>
                              updateStatus(
                                application,
                                event
                                  .target
                                  .value as ApplicationStatus
                              )
                            }
                            className="h-10 min-w-[145px] rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-600 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100 disabled:opacity-60"
                          >

                            <option value="NEW">
                              New
                            </option>

                            <option value="REVIEWING">
                              Reviewing
                            </option>

                            <option value="SHORTLISTED">
                              Shortlisted
                            </option>

                            <option value="INTERVIEW">
                              Interview
                            </option>

                            <option value="HIRED">
                              Hired
                            </option>

                            <option value="REJECTED">
                              Rejected
                            </option>

                          </select>

                        </div>

                        {/* View */}

                        <button
                          onClick={() =>
                            setSelectedApplication(
                              application
                            )
                          }
                          title="View application"
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                        >

                          <Eye
                            size={
                              18
                            }
                          />

                        </button>

                        {/* Delete */}

                        <button
                          onClick={() =>
                            deleteApplication(
                              application
                            )
                          }
                          title="Delete application"
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                        >

                          <Trash2
                            size={
                              18
                            }
                          />

                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

      {/* ==================================================
          APPLICATION DETAILS MODAL
      ================================================== */}

      {selectedApplication && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">

          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

            {/* Header */}

            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-100 bg-white px-6 py-5 md:px-7">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-500">
                  Candidate Application
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {
                    selectedApplication.firstName
                  }{" "}
                  {
                    selectedApplication.lastName
                  }
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedApplication(
                    null
                  )
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
              >

                <X
                  size={20}
                />

              </button>

            </div>

            <div className="p-6 md:p-7">

              {/* Top Summary */}

              <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-5">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
                      Applied Position
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-slate-900">
                      {
                        selectedApplication.jobTitle
                      }
                    </h3>

                    {selectedApplication
                      .career && (

                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">

                        <span className="flex items-center gap-1">

                          <BriefcaseBusiness
                            size={
                              13
                            }
                          />

                          {
                            selectedApplication
                              .career
                              .department
                          }

                        </span>

                        <span className="flex items-center gap-1">

                          <MapPin
                            size={
                              13
                            }
                          />

                          {
                            selectedApplication
                              .career
                              .location
                          }

                        </span>

                      </div>

                    )}

                  </div>

                  <ApplicationStatusBadge
                    status={
                      selectedApplication.status
                    }
                  />

                </div>

              </div>

              {/* Recruitment Status */}

              <DetailsSection
                title="Recruitment Status"
              >

                <div className="max-w-sm">

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Current Status
                  </label>

                  <select
                    value={
                      selectedApplication.status
                    }
                    disabled={
                      updatingStatus ===
                      selectedApplication.id
                    }
                    onChange={(
                      event
                    ) =>
                      updateStatus(
                        selectedApplication,
                        event.target
                          .value as ApplicationStatus
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  >

                    <option value="NEW">
                      New
                    </option>

                    <option value="REVIEWING">
                      Reviewing
                    </option>

                    <option value="SHORTLISTED">
                      Shortlisted
                    </option>

                    <option value="INTERVIEW">
                      Interview
                    </option>

                    <option value="HIRED">
                      Hired
                    </option>

                    <option value="REJECTED">
                      Rejected
                    </option>

                  </select>

                </div>

              </DetailsSection>

              {/* Contact */}

              <DetailsSection
                title="Contact Information"
              >

                <div className="grid gap-4 md:grid-cols-2">

                  <DetailItem
                    label="Email Address"
                    value={
                      selectedApplication.email
                    }
                  />

                  <DetailItem
                    label="Phone Number"
                    value={
                      selectedApplication.phone ||
                      "Not provided"
                    }
                  />

                </div>

              </DetailsSection>

              {/* Background */}

              <DetailsSection
                title="Professional Background"
              >

                <div className="grid gap-4 md:grid-cols-2">

                  <DetailItem
                    label="Current Role / Study Program"
                    value={
                      selectedApplication.currentRole ||
                      "Not provided"
                    }
                  />

                  <DetailItem
                    label="Experience"
                    value={
                      selectedApplication.experience ||
                      "Not provided"
                    }
                  />

                </div>

              </DetailsSection>

              {/* Links */}

              <DetailsSection
                title="Professional Links"
              >

                <div className="flex flex-wrap gap-3">

                  {selectedApplication.linkedinUrl ? (

                    <ExternalButton
                      href={
                        selectedApplication.linkedinUrl
                      }
                      label="View LinkedIn"
                    />

                  ) : (

                    <p className="text-sm text-slate-400">
                      LinkedIn not
                      provided.
                    </p>

                  )}

                  {selectedApplication.portfolioUrl && (

                    <ExternalButton
                      href={
                        selectedApplication.portfolioUrl
                      }
                      label="View Portfolio / GitHub"
                    />

                  )}

                </div>

              </DetailsSection>

              {/* Message */}

              <DetailsSection
                title="Candidate Message"
              >

                <div className="rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">

                  {selectedApplication.message ||
                    "No additional message provided."}

                </div>

              </DetailsSection>

              {/* Dates */}

              <DetailsSection
                title="Application Information"
              >

                <div className="grid gap-4 md:grid-cols-2">

                  <DetailItem
                    label="Applied On"
                    value={
                      formatFullDate(
                        selectedApplication.createdAt
                      )
                    }
                  />

                  <DetailItem
                    label="Last Updated"
                    value={
                      formatFullDate(
                        selectedApplication.updatedAt
                      )
                    }
                  />

                </div>

              </DetailsSection>

              {/* Bottom actions */}

              <div className="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-6">

                <button
                  onClick={() =>
                    setSelectedApplication(
                      null
                    )
                  }
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Close
                </button>

                <button
                  onClick={() =>
                    deleteApplication(
                      selectedApplication
                    )
                  }
                  className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100"
                >

                  <Trash2
                    size={16}
                  />

                  Delete

                </button>

              </div>

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

function ApplicationStatusBadge({
  status,
}: {
  status: ApplicationStatus;
}) {
  const styles: Record<
    ApplicationStatus,
    string
  > = {
    NEW:
      "bg-blue-50 text-blue-600",

    REVIEWING:
      "bg-violet-50 text-violet-600",

    SHORTLISTED:
      "bg-amber-50 text-amber-700",

    INTERVIEW:
      "bg-orange-50 text-orange-600",

    HIRED:
      "bg-emerald-50 text-emerald-600",

    REJECTED:
      "bg-red-50 text-red-600",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${styles[status]}`}
    >
      {formatStatus(
        status
      )}
    </span>
  );
}

function DetailsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-7">

      <div className="mb-4 border-b border-slate-100 pb-3">

        <h3 className="text-sm font-bold text-slate-800">
          {title}
        </h3>

      </div>

      {children}

    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">

      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-slate-700">
        {value}
      </p>

    </div>
  );
}

function ExternalButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
    >

      <ExternalLink
        size={16}
      />

      {label}

    </a>
  );
}

function formatStatus(
  status: string
) {
  return status
    .replaceAll(
      "_",
      " "
    )
    .toLowerCase()
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase()
    );
}

function formatDate(
  value: string
) {
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

function formatFullDate(
  value: string
) {
  return new Date(
    value
  ).toLocaleString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",

      hour: "2-digit",
      minute: "2-digit",
    }
  );
}