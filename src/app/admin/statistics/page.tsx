"use client";

import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  Button,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Calendar,
  Download,
  Filter,
  Users,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";
import AdminCharts from "@/app/components/AdminCharts";

type Tx = {
  id: string;
  type: "deposit" | "withdrawal";
  amount: number;
  status: string;
  userEmail?: string;
  userId?: string;
  createdAt?: any;
  createdDate?: Date;
};

export default function AdminStatisticsPage() {
  const [deposits, setDeposits] = useState<any[]>([]);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");

  useEffect(() => {
    const unsubDeps = onSnapshot(collection(db, "deposits"), (snap) => {
      setDeposits(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    const unsubWiths = onSnapshot(collection(db, "withdrawals"), (snap) => {
      setWithdrawals(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => {
      unsubDeps();
      unsubWiths();
    };
  }, []);

  const range = useMemo(() => {
    const s = start ? new Date(start) : undefined;
    const e = end ? new Date(end) : undefined;
    if (e) e.setHours(23, 59, 59, 999);
    return { s, e };
  }, [start, end]);

  const rows: Tx[] = useMemo(() => {
    const mapDeps: Tx[] = (deposits as any[]).map((d) => ({
      id: d.id,
      type: "deposit",
      amount: Number(d.amount || 0),
      status: d.status || "pending",
      userEmail: d.userEmail,
      userId: d.userId,
      createdAt: d.createdAt,
      createdDate: d.createdAt?.toDate?.() || undefined,
    }));
    const mapWiths: Tx[] = (withdrawals as any[]).map((w) => ({
      id: w.id,
      type: "withdrawal",
      amount: Number(w.amount || 0),
      status: w.status || "pending",
      userEmail: w.userEmail,
      userId: w.userId,
      createdAt: w.createdAt,
      createdDate: w.createdAt?.toDate?.() || undefined,
    }));
    const all = [...mapDeps, ...mapWiths].filter((r) => r.createdDate);
    return all
      .filter((r) => {
        if (range.s && r.createdDate! < range.s) return false;
        if (range.e && r.createdDate! > range.e) return false;
        return true;
      })
      .sort((a, b) => b.createdDate!.getTime() - a.createdDate!.getTime());
  }, [deposits, withdrawals, range]);

  const metrics = useMemo(() => {
    const approvedDeps = rows.filter(
      (r) => r.type === "deposit" && r.status === "approved",
    );
    const approvedWiths = rows.filter(
      (r) => r.type === "withdrawal" && r.status === "approved",
    );
    const totalDeps = approvedDeps.reduce((sum, r) => sum + r.amount, 0);
    const totalWiths = approvedWiths.reduce((sum, r) => sum + r.amount, 0);
    const users = new Set(
      rows.map((r) => r.userId || r.userEmail).filter(Boolean),
    );
    return {
      totalDeps,
      totalWiths,
      net: totalDeps - totalWiths,
      activeUsers: users.size,
    };
  }, [rows]);

  const chartData = useMemo(() => {
    const byDate: Record<
      string,
      { date: string; deposits: number; withdrawals: number }
    > = {};
    rows.forEach((r) => {
      const key = r.createdDate!.toLocaleDateString();
      if (!byDate[key])
        byDate[key] = { date: key, deposits: 0, withdrawals: 0 };
      if (r.status === "approved") {
        if (r.type === "deposit") byDate[key].deposits += r.amount;
        if (r.type === "withdrawal") byDate[key].withdrawals += r.amount;
      }
    });
    return Object.values(byDate).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }, [rows]);

  const setPreset = (days: number) => {
    const e = new Date();
    const s = new Date();
    s.setDate(e.getDate() - (days - 1));
    setStart(s.toISOString().slice(0, 10));
    setEnd(e.toISOString().slice(0, 10));
  };

  const exportCSV = () => {
    const headers = ["Date", "Type", "User", "Amount", "Status", "ID"];
    const lines = rows.map((r) => [
      r.createdDate?.toISOString() || "",
      r.type,
      r.userEmail || r.userId || "",
      r.amount.toString(),
      r.status,
      r.id,
    ]);
    const csv = [headers, ...lines]
      .map((arr) =>
        arr.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "statistics-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "var(--background)",
        p: { xs: 2, md: 4 },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight="800"
            sx={{
              color: "var(--foreground)",
              mb: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <BarChart3 size={28} color="#3b82f6" /> Statistics & Reports
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
            Analyze deposits, withdrawals, and net flows across a custom date
            range.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            onClick={() => setPreset(7)}
            sx={{ borderRadius: 2 }}
          >
            Last 7 Days
          </Button>
          <Button
            variant="outlined"
            onClick={() => setPreset(30)}
            sx={{ borderRadius: 2 }}
          >
            Last 30 Days
          </Button>
        </Stack>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          bgcolor: "var(--card)",
          border: "1px solid",
          borderColor: "#000000",
          borderRadius: 4,
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Calendar size={18} color="var(--muted-foreground)" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="End Date"
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Calendar size={18} color="var(--muted-foreground)" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ height: "100%" }}
              alignItems="center"
              justifyContent={{ xs: "flex-start", md: "flex-end" }}
            >
              <Button
                variant="contained"
                startIcon={<Filter size={16} />}
                onClick={() => {}}
                sx={{ borderRadius: 2 }}
              >
                Apply
              </Button>
              <Button
                variant="outlined"
                startIcon={<Download size={16} />}
                onClick={exportCSV}
                sx={{ borderRadius: 2 }}
              >
                Export CSV
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: "var(--card)",
              border: "1px solid",
              borderColor: "#000000",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                p: 1.2,
                borderRadius: 2.5,
                bgcolor: "rgba(34,197,94,0.12)",
                color: "#22c55e",
                display: "flex",
              }}
            >
              <ArrowDownLeft size={18} />
            </Box>
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: "var(--muted-foreground)",
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                Approved Deposits
              </Typography>
              <Typography
                variant="h6"
                fontWeight="900"
                sx={{ color: "var(--foreground)" }}
              >
                ${metrics.totalDeps.toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: "var(--card)",
              border: "1px solid",
              borderColor: "#000000",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                p: 1.2,
                borderRadius: 2.5,
                bgcolor: "rgba(239,68,68,0.12)",
                color: "#ef4444",
                display: "flex",
              }}
            >
              <ArrowUpRight size={18} />
            </Box>
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: "var(--muted-foreground)",
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                Approved Withdrawals
              </Typography>
              <Typography
                variant="h6"
                fontWeight="900"
                sx={{ color: "var(--foreground)" }}
              >
                ${metrics.totalWiths.toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: "var(--card)",
              border: "1px solid",
              borderColor: "#000000",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                p: 1.2,
                borderRadius: 2.5,
                bgcolor:
                  metrics.net >= 0
                    ? "rgba(34,197,94,0.12)"
                    : "rgba(239,68,68,0.12)",
                color: metrics.net >= 0 ? "#22c55e" : "#ef4444",
                display: "flex",
              }}
            >
              <BarChart3 size={18} />
            </Box>
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: "var(--muted-foreground)",
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                Net Flow
              </Typography>
              <Typography
                variant="h6"
                fontWeight="900"
                sx={{ color: metrics.net >= 0 ? "#22c55e" : "#ef4444" }}
              >
                ${metrics.net.toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: "var(--card)",
              border: "1px solid",
              borderColor: "#000000",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                p: 1.2,
                borderRadius: 2.5,
                bgcolor: "rgba(59,130,246,0.12)",
                color: "#3b82f6",
                display: "flex",
              }}
            >
              <Users size={18} />
            </Box>
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: "var(--muted-foreground)",
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                Active Users
              </Typography>
              <Typography
                variant="h6"
                fontWeight="900"
                sx={{ color: "var(--foreground)" }}
              >
                {metrics.activeUsers}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          mb: 3,
          bgcolor: "var(--card)",
          border: "1px solid",
          borderColor: "#000000",
          borderRadius: 4,
          height: { xs: 300, md: 380 },
        }}
      >
        <AdminCharts data={chartData} />
      </Paper>

      <Paper
        elevation={0}
        sx={{
          bgcolor: "var(--card)",
          border: "1px solid",
          borderColor: "#000000",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Box sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead sx={{ bgcolor: "rgba(255,255,255,0.02)" }}>
              <TableRow>
                <TableCell
                  sx={{
                    color: "var(--muted-foreground)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{
                    color: "var(--muted-foreground)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  Type
                </TableCell>
                <TableCell
                  sx={{
                    color: "var(--muted-foreground)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  User
                </TableCell>
                <TableCell
                  sx={{
                    color: "var(--muted-foreground)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  Amount
                </TableCell>
                <TableCell
                  sx={{
                    color: "var(--muted-foreground)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    color: "var(--muted-foreground)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  ID
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((r) => (
                <TableRow
                  key={r.id}
                  sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.02)" } }}
                >
                  <TableCell sx={{ color: "var(--muted-foreground)" }}>
                    {r.createdDate?.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={r.type}
                      size="small"
                      sx={{
                        bgcolor:
                          r.type === "deposit"
                            ? "rgba(34,197,94,0.12)"
                            : "rgba(239,68,68,0.12)",
                        color: r.type === "deposit" ? "#22c55e" : "#ef4444",
                        fontWeight: 800,
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "var(--foreground)" }}>
                    {r.userEmail || r.userId || "N/A"}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: r.type === "deposit" ? "#22c55e" : "#ef4444",
                      fontWeight: 800,
                    }}
                  >
                    {r.type === "deposit" ? "+" : "-"}$
                    {r.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={r.status}
                      size="small"
                      sx={{
                        bgcolor:
                          r.status === "approved"
                            ? "rgba(34,197,94,0.12)"
                            : r.status === "rejected"
                              ? "rgba(239,68,68,0.12)"
                              : "rgba(234,179,8,0.12)",
                        color:
                          r.status === "approved"
                            ? "#22c55e"
                            : r.status === "rejected"
                              ? "#ef4444"
                              : "#eab308",
                        fontWeight: 800,
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                      }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "var(--muted-foreground)",
                      fontFamily: "monospace",
                    }}
                  >
                    {r.id}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
}
