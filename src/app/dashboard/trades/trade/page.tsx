"use client";

import { useUserStats } from "@/hooks/useUserStats";
import SelectAsset from "@/app/components/SelectAsset";
import TradingViewChart from "@/app/components/TradingViewChart";
import PlaceOrder from "@/app/components/PlaceOrder";
import ActiveTrades from "@/app/components/ActiveTrades";
import { toggleUserMode } from "@/app/actions/user";
import { useAuth } from "@/context/AuthContext";
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Stack, 
  useTheme, 
  useMediaQuery,
  Chip,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  History as HistoryIcon, 
  Activity, 
  RefreshCw,
  Zap,
  LayoutDashboard,
  ShieldCheck
} from "lucide-react";

export default function TradeNowPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("xl"));
  const { currentUser } = useAuth();
  const stats = useUserStats();
  const balance = stats.mode === "demo" ? stats.balanceDemo : stats.balanceLive;

  const handleModeToggle = async () => {
    if (!currentUser) return;
    const newMode = stats.mode === "demo" ? "live" : "demo";
    await toggleUserMode(currentUser.uid, newMode);
  };

  return (
    <Box sx={{ p: { xs: 1.5, md: 3 }, bgcolor: "var(--background)", minHeight: "100vh" }}>
      {/* HEADER SECTION */}
      <Stack 
        direction={isMobile ? "column" : "row"} 
        spacing={2} 
        justifyContent="space-between" 
        alignItems={isMobile ? "stretch" : "center"} 
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ color: "#ffffff", mb: 0.5, display: "flex", alignItems: "center", gap: 1.5 }}>
            <Activity size={28} color="primary.main" /> Trade Now
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
            Execute trades on global markets with instant execution and professional charting.
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 1,
            px: 2,
            bgcolor: "var(--card)",
            border: "1px solid",
            borderColor: "var(--border)",
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            gap: 2
          }}
        >
          <Box sx={{ textAlign: isMobile ? "left" : "right" }}>
            <Typography variant="caption" sx={{ color: "var(--muted-foreground)", display: "block" }}>Account Mode</Typography>
            <Typography variant="body2" fontWeight="800" sx={{ color: stats.mode === "live" ? "#22c55e" : "#eab308" }}>
              {stats.mode === "live" ? "LIVE ACCOUNT" : "DEMO ACCOUNT"}
            </Typography>
          </Box>
          <Button 
            variant="contained"
            size="small"
            onClick={handleModeToggle}
            startIcon={<RefreshCw size={14} />}
            sx={{ 
              borderRadius: 2, 
              bgcolor: stats.mode === "live" ? "rgba(34, 197, 94, 0.1)" : "rgba(234, 179, 8, 0.1)",
              color: stats.mode === "live" ? "#22c55e" : "#eab308",
              fontWeight: "700",
              fontSize: "0.75rem",
              "&:hover": { bgcolor: stats.mode === "live" ? "rgba(34, 197, 94, 0.2)" : "rgba(234, 179, 8, 0.2)" },
              boxShadow: "none"
            }}
          >
            Switch
          </Button>
        </Paper>
      </Stack>

      {/* STATS GRID */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatCard title="Available Balance" value={`$${balance.toLocaleString()}`} icon={<Wallet size={18} />} color="#6366f1" />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatCard title="Active Trades" value={stats.activeTrades} icon={<Zap size={18} />} color="#22c55e" />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatCard title="Total Volume" value={stats.totalTrades} icon={<TrendingUp size={18} />} color="#3b82f6" />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatCard title="Net P&L" value={`$${stats.netPnL.toFixed(2)}`} icon={<Activity size={18} />} color={stats.netPnL >= 0 ? "#22c55e" : "#ef4444"} isProfit />
        </Grid>
      </Grid>

      {/* MAIN TRADING INTERFACE */}
      <Grid container spacing={2}>
        
        {/* LEFT: ASSETS SELECTOR (HIDDEN ON MOBILE, USES DRAWER OR TABS INSTEAD?) */}
        {!isTablet && (
          <Grid size={{ xs: 12, xl: 2.5 }}>
            <Paper elevation={0} sx={{ height: "calc(100vh - 280px)", minHeight: 600, bgcolor: "var(--card)", border: "1px solid", borderColor: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
              <SelectAsset />
            </Paper>
          </Grid>
        )}

        {/* MIDDLE: CHART */}
        <Grid size={{ xs: 12, xl: isTablet ? 8 : 6.5 }}>
          <Paper 
            elevation={0} 
            sx={{ 
              height: isMobile ? "400px" : "calc(100vh - 280px)", 
              minHeight: isMobile ? 400 : 600, 
              bgcolor: "var(--card)", 
              border: "1px solid", 
              borderColor: "var(--border)", 
              borderRadius: 4, 
              overflow: "hidden",
              p: 1
            }}
          >
            <TradingViewChart />
          </Paper>
        </Grid>

        {/* RIGHT: ORDER FORM & ACTIVE TRADES */}
        <Grid size={{ xs: 12, xl: isTablet ? 4 : 3 }}>
          <Stack spacing={2} sx={{ height: isTablet ? "auto" : "calc(100vh - 280px)", minHeight: isTablet ? "auto" : 600 }}>
            <Paper elevation={0} sx={{ p: 0, bgcolor: "var(--card)", border: "1px solid", borderColor: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
              <PlaceOrder />
            </Paper>
            <Box sx={{ flex: 1, overflowY: "auto" }}>
              <ActiveTrades />
            </Box>
          </Stack>
        </Grid>

      </Grid>
    </Box>
  );
}

function StatCard({ title, value, icon, color, isProfit }: { title: string; value: string | number; icon: React.ReactNode; color: string; isProfit?: boolean }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        bgcolor: "var(--card)",
        border: "1px solid",
        borderColor: "var(--border)",
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Box sx={{ p: 0.8, borderRadius: 2, bgcolor: `${color}15`, color: color, display: "flex" }}>
          {icon}
        </Box>
        <Typography variant="caption" sx={{ color: "var(--muted-foreground)", fontWeight: "600" }}>
          {title}
        </Typography>
      </Stack>
      <Typography variant="h6" fontWeight="800" sx={{ color: isProfit ? (parseFloat(String(value).replace("$", "")) >= 0 ? "#22c55e" : "#ef4444") : "#ffffff" }}>
        {value}
      </Typography>
    </Paper>
  );
}
