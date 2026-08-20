import AdminSidebar from "../../component/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="min-h-screen ml-[270px]">
        {children}
      </main>
    </div>
  );
}