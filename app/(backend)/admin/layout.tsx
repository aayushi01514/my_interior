// app/(backend)/admin/layout.tsx

import AdminSidebar from '@/app/components/SidebarAdmin';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <main>{children}</main>
      </div>
    </div>
  );
}
