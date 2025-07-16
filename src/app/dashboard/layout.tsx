import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import MobileMenu from "@/components/layout/MobileMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f8f9fa] mt-2">
      <MobileMenu />
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0">
        <Sidebar />
      </div>
      <main className="flex-1 lg:ml-64 p-6">{children}</main>
    </div>
  );
}
