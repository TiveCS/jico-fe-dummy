import DashboardNav from "@/components/pages/dashboard/dashboard-nav";
import React from "react";

export default function DashboardRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardNav />

      <main className="max-w-6xl mx-auto">{children}</main>
    </>
  );
}
