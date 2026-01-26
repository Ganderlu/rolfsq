"use client";

import { useAdminDashboardStats } from "../../utils/useAdminDashboardStats";

export default function DashboardClient() {
  const { stats, loading } = useAdminDashboardStats();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div>Total Users: {stats.totalUsers}</div>
      <div>Total Trades: {stats.totalTrades}</div>
      <div>Total Volume: {stats.totalVolume}</div>
    </div>
  );
}
