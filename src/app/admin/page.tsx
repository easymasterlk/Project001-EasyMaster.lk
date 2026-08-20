import {
  Users,
  MessageSquare,
  FileText,
  FolderKanban,
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Customers",
      value: "0",
      icon: Users,
    },
    {
      title: "New Inquiries",
      value: "0",
      icon: MessageSquare,
    },
    {
      title: "Quote Requests",
      value: "0",
      icon: FileText,
    },
    {
      title: "Projects",
      value: "0",
      icon: FolderKanban,
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-500">
          EasyMaster Administration
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your website content, customers and business activities.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
                  <Icon
                    size={23}
                    className="text-amber-500"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="min-h-[300px] rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">
            Recent Inquiries
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            No inquiries available yet.
          </p>
        </div>

        <div className="min-h-[300px] rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">
            Recent Quote Requests
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            No quote requests available yet.
          </p>
        </div>
      </div>
    </div>
  );
}