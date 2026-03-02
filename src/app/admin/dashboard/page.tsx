"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import AdminCharts from "./../../components/AdminCharts";
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Stack, 
  Avatar, 
  useTheme, 
  useMediaQuery,
  Divider,
  IconButton,
  Button
} from "@mui/material";
import { 
  Users, 
  TrendingUp, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Activity, 
  Wallet, 
  ShieldCheck,
  RefreshCw,
  MoreVertical,
  ArrowRight
} from "lucide-react";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
        Object.values({
          ...Object.fromEntries(prev.map((p: any) => [p.date, p])),
          ...map,
        }),
      );
    });

    const unsubWithdrawals = onSnapshot(collection(db, "withdrawals"), (snap) => {
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
        Object.values({
          ...Object.fromEntries(prev.map((p: any) => [p.date, p])),
          ...map,
        }),
      );
    });

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

    const unsubDeps = onSnapshot(collection(db, "deposits"), (snap) => {
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

    const unsubWiths = onSnapshot(collection(db, "withdrawals"), (snap) => {
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
    });

    return () => {
      unsubDeposits();
      unsubWithdrawals();
      unsubUsers();
      unsubDeps();
      unsubWiths();
    };
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "var(--background)", p: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Stack direction={isMobile ? "column" : "row"} spacing={2} justifyContent="space-between" alignItems={isMobile ? "flex-start" : "center"} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ color: "var(--foreground)", mb: 0.5, display: "flex", alignItems: "center", gap: 1.5 }}>
            <Activity size={28} color="#ef4444" /> Admin Console
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
            Real-time platform metrics, user capital flow, and system risk assessment.
          </Typography>
        </Box>
        <Button 
          variant="outlined" 
          startIcon={<RefreshCw size={16} />}
          onClick={() => window.location.reload()}
          sx={{ borderRadius: 2.5, borderColor: "var(--border)", color: "var(--foreground)", textTransform: "none", fontWeight: 700 }}
        >
          Refresh Metrics
        </Button>
      </Stack>

      {/* Main Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6} lg={3}>
          <AdminStatCard 
            title="Total Platform Users" 
            value={stats.users.toLocaleString()} 
            icon={<Users size={20} />} 
            color="#3b82f6" 
            trend="+12% this month"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <AdminStatCard 
            title="Total Capital Balance" 
            value={`$${stats.totalBalance.toLocaleString()}`} 
            icon={<Wallet size={20} />} 
            color="#22c55e" 
            trend="Active Liquidity"
            highlight
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <AdminStatCard 
            title="Pending Deposits" 
            value={stats.pendingDeposits} 
            icon={<ArrowDownLeft size={20} />} 
            color="#eab308" 
            trend="Requires Attention"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <AdminStatCard 
            title="Pending Withdrawals" 
            value={stats.pendingWithdrawals} 
            icon={<ArrowUpRight size={20} />} 
            color="#ef4444" 
            trend="High Priority"
          />
        </Grid>
      </Grid>

      {/* Charts & Secondary Stats */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 4,
              bgcolor: "var(--card)",
              border: "1px solid",
              borderColor: "var(--border)",
              height: "100%",
              backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0))"
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
              <Box>
                <Typography variant="h6" fontWeight="800" sx={{ color: "var(--foreground)" }}>Capital Flow Analysis</Typography>
                <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>Deposits vs Withdrawals over time</Typography>
              </Box>
              <IconButton size="small" sx={{ color: "var(--muted-foreground)" }}><MoreVertical size={20} /></IconButton>
            </Stack>
            
            <Box sx={{ height: 350, mt: 2 }}>
              <AdminCharts data={chartData} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: "var(--card)",
                border: "1px solid",
                borderColor: "var(--border)",
              }}
            >
              <Typography variant="subtitle1" fontWeight="800" sx={{ color: "var(--foreground)", mb: 3 }}>Quick System Audit</Typography>
              <Stack spacing={2.5}>
                <AuditItem label="Total Deposits" value={stats.deposits} color="#22c55e" />
                <AuditItem label="Total Withdrawals" value={stats.withdrawals} color="#ef4444" />
                <AuditItem label="Approved With." value={stats.approvedWithdrawals} color="#3b82f6" />
                <Divider sx={{ borderColor: "var(--border)", my: 1 }} />
                <Box sx={{ pt: 1 }}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    endIcon={<ArrowRight size={18} />}
                    sx={{ py: 1.5, borderRadius: 2.5, fontWeight: 800, textTransform: "none" }}
                  >
                    Generate Full Report
                  </Button>
                </Box>
              </Stack>
            </Paper>

            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: "primary.main",
                color: "#ffffff",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Typography variant="subtitle2" fontWeight="700" sx={{ opacity: 0.8, mb: 1 }}>SECURITY STATUS</Typography>
                <Typography variant="h5" fontWeight="900" sx={{ mb: 2 }}>System Fully Operational</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <ShieldCheck size={18} />
                  <Typography variant="caption" fontWeight="700">All protocols active & monitored</Typography>
                </Stack>
              </Box>
              <Box sx={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.1)" }} />
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

function AdminStatCard({ title, value, icon, color, trend, highlight }: any) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: "var(--card)",
        border: "1px solid",
        borderColor: highlight ? color : "var(--border)",
        borderRadius: 4,
        position: "relative",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: `0 10px 30px ${color}15`,
          borderColor: color
        }
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
        <Box sx={{ p: 1.2, borderRadius: 2.5, bgcolor: `${color}15`, color: color, display: "flex" }}>
          {icon}
        </Box>
        <Typography variant="caption" fontWeight="700" sx={{ color: color }}>{trend}</Typography>
      </Stack>
      <Box>
        <Typography variant="h4" fontWeight="900" sx={{ color: "var(--foreground)", mb: 0.5 }}>{value}</Typography>
        <Typography variant="caption" fontWeight="600" sx={{ color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: 0.5 }}>{title}</Typography>
      </Box>
    </Paper>
  );
}

function AuditItem({ label, value, color }: any) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="body2" sx={{ color: "var(--muted-foreground)", fontWeight: 500 }}>{label}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Typography variant="body2" fontWeight="800" sx={{ color: "var(--foreground)" }}>{value}</Typography>
        <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: color }} />
      </Box>
    </Stack>
  );
}
