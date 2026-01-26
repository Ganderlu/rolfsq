// "use client"

// import NotificationBell from "@/app/components/notifications/NotificationBell";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen flex flex-col">
      
//       {/* 🔝 TOP NAVBAR */}
//       <header className="h-14 bg-white border-b flex items-center justify-between px-4">
//         <h1 className="font-semibold text-lg">Dashboard</h1>

//         {/* 🔔 MOUNTED HERE */}
//         <NotificationBell />
//       </header>

//       {/* PAGE CONTENT */}
//       <main className="flex-1 p-4 bg-gray-50">
//         {children}
//       </main>

//     </div>
//   );
// }


"use client";

import DashboardShell from "../components/dashboard/DashboardShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
