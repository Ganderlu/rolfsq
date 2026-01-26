"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getCountFromServer,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import AdminCharts from "./../../components/AdminCharts";
import { Box, Grid, Paper, Typography } from "@mui/material";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    deposits: 0,
    pendingDeposits: 0,
    withdrawals: 0,
    pendingWithdrawals: 0,
    approvedWithdrawals: 0,
    totalBalance: 0,
  });
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
  const unsubDeposits = onSnapshot(collection(db, "deposits"), (snap) => {
    const map: any = {};

    snap.forEach((doc) => {
      const d = doc.data();
      if (!d.createdAt) return;

      const date = d.createdAt.toDate().toLocaleDateString();
      map[date] = map[date] || { date, deposits: 0, withdrawals: 0 };

      if (d.status === "approved") {
        map[date].deposits += Number(d.amount || 0);
      }
    });

    setChartData((prev) =>
      Object.values({ ...Object.fromEntries(prev.map((p: any) => [p.date, p])), ...map })
    );
  });

  const unsubWithdrawals = onSnapshot(
    collection(db, "withdrawals"),
    (snap) => {
      const map: any = {};

      snap.forEach((doc) => {
        const d = doc.data();
        if (!d.createdAt) return;

        const date = d.createdAt.toDate().toLocaleDateString();
        map[date] = map[date] || { date, deposits: 0, withdrawals: 0 };

        if (d.status === "approved") {
          map[date].withdrawals += Number(d.amount || 0);
        }
      });

      setChartData((prev) =>
        Object.values({ ...Object.fromEntries(prev.map((p: any) => [p.date, p])), ...map })
      );
    }
  );

  return () => {
    unsubDeposits();
    unsubWithdrawals();
  };
}, []);

useEffect(() => {
  const unsubUsers = onSnapshot(collection(db, "users"), (snap) => {
    let balance = 0;
    snap.forEach((d) => {
      balance += Number(d.data().usdtBalance || 0);
    });

    setStats((s) => ({
      ...s,
      users: snap.size,
      totalBalance: balance,
    }));
  });

  const unsubDeposits = onSnapshot(collection(db, "deposits"), (snap) => {
    let total = 0;
    let pending = 0;

    snap.forEach((d) => {
      total++;
      if (d.data().status === "pending") pending++;
    });

    setStats((s) => ({
      ...s,
      deposits: total,
      pendingDeposits: pending,
    }));
  });

  const unsubWithdrawals = onSnapshot(
    collection(db, "withdrawals"),
    (snap) => {
      let total = 0;
      let pending = 0;
      let approved = 0;

      snap.forEach((d) => {
        total++;
        if (d.data().status === "pending") pending++;
        if (d.data().status === "approved") approved++;
      });

      setStats((s) => ({
        ...s,
        withdrawals: total,
        pendingWithdrawals: pending,
        approvedWithdrawals: approved,
      }));
    }
  );

  return () => {
    unsubUsers();
    unsubDeposits();
    unsubWithdrawals();
  };
}, []);




  // useEffect(() => {
  //   const loadStats = async () => {
  //     // USERS
  //     const usersSnap = await getDocs(collection(db, "users"));
  //     let balanceSum = 0;

  //     usersSnap.forEach((doc) => {
  //       balanceSum += Number(doc.data().usdtBalance || 0);
  //     });

  //     // COUNTS
  //     const depositsCount = await getCountFromServer(
  //       collection(db, "deposits"),
  //     );

  //     const pendingDepositsCount = await getCountFromServer(
  //       query(collection(db, "deposits"), where("status", "==", "pending")),
  //     );

  //     const withdrawalsCount = await getCountFromServer(
  //       collection(db, "withdrawals"),
  //     );

  //     const pendingWithdrawalsCount = await getCountFromServer(
  //       query(collection(db, "withdrawals"), where("status", "==", "pending")),
  //     );

  //     const approvedWithdrawalsCount = await getCountFromServer(
  //       query(collection(db, "withdrawals"), where("status", "==", "approved")),
  //     );

  //     setStats({
  //       users: usersSnap.size,
  //       deposits: depositsCount.data().count,
  //       pendingDeposits: pendingDepositsCount.data().count,
  //       withdrawals: withdrawalsCount.data().count,
  //       pendingWithdrawals: pendingWithdrawalsCount.data().count,
  //       approvedWithdrawals: approvedWithdrawalsCount.data().count,
  //       totalBalance: balanceSum,
  //     });
  //   };

  //   loadStats();
  // }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={2}>
        <StatCard title="Total Users" value={stats.users} />
        <StatCard title="Total Deposits" value={stats.deposits} />
        <StatCard title="Pending Deposits" value={stats.pendingDeposits} />
        <StatCard title="Total Withdrawals" value={stats.withdrawals} />
        <StatCard
          title="Pending Withdrawals"
          value={stats.pendingWithdrawals}
        />
        <StatCard
          title="Approved Withdrawals"
          value={stats.approvedWithdrawals}
        />
        <StatCard
          title="Total User Balance (USDT)"
          value={`$${stats.totalBalance.toLocaleString()}`}
        />
      </Grid>

      <Box mt={4}>
        <AdminCharts data={chartData} />
      </Box>
    </Box>
  );
}

function StatCard({ title, value }: { title: string; value: any }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper sx={{ p: 2, borderRadius: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h6" fontWeight={600}>
          {value}
        </Typography>
      </Paper>
    </Grid>
  );
}
