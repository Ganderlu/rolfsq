"use client";

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  InputAdornment,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { useEffect, useMemo, useState } from "react";
import {
  ShieldCheck,
  Search,
  Coins,
  Calendar,
  Timer,
  CheckCircle2,
  Hourglass,
  Download,
} from "lucide-react";
import { settleInvestment } from "@/app/actions/admin";

type InvestmentRow = {
  id: string;
  userId?: string;
  planName?: string;
  duration?: string;
  interest?: string;
  amount?: number;
  profit?: number;
  status?: string;
  startAt?: any;
  matureAt?: any;
  createdAt?: any;
  createdDate?: Date;
  matureDate?: Date;
};

export default function AdminInvestmentControlsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [investments, setInvestments] = useState<InvestmentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "running" | "completed" | "cancelled">("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    return onSnapshot(collection(db, "investments"), (snap) => {
      const data = snap.docs.map((d) => {
        const raw: any = d.data();
        const createdDate = raw.createdAt?.toDate?.() || raw.startAt?.toDate?.() || raw.startAt || undefined;
        const matureDate = raw.matureAt?.toDate?.() || raw.matureAt || undefined;
        return {
          id: d.id,
          ...raw,
          amount: Number(raw.amount || 0),
          profit: Number(raw.profit || 0),
          createdDate,
          matureDate,
        } as InvestmentRow;
      });

      (data as any[]).sort((a, b) => {
        const dateA = a.createdDate || new Date(0);
        const dateB = b.createdDate || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });

      setInvestments(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return investments.filter((i) => {
      if (status !== "all" && (i.status || "running") !== status) return false;
      if (!q) return true;
      return `${i.id} ${i.userId || ""} ${i.planName || ""}`.toLowerCase().includes(q);
    });
  }, [investments, search, status]);

  const metrics = useMemo(() => {
    const running = investments.filter((i) => (i.status || "running") === "running");
    const completed = investments.filter((i) => (i.status || "running") === "completed");
    const now = new Date();
    const matured = running.filter((i) => (i.matureDate ? i.matureDate <= now : false));
    const invested = running.reduce((sum, i) => sum + Number(i.amount || 0), 0);
    const profitDue = matured.reduce((sum, i) => sum + Number(i.profit || 0), 0);
    return {
      total: investments.length,
      running: running.length,
      completed: completed.length,
      matured: matured.length,
      invested,
      profitDue,
    };
  }, [investments]);

  const exportCSV = () => {
    const headers = ["ID", "User ID", "Plan", "Amount", "Profit", "Status", "Start", "Mature"];
    const lines = filtered.map((r) => [
      r.id,
      r.userId || "",
      r.planName || "",
      String(r.amount ?? 0),
      String(r.profit ?? 0),
      r.status || "running",
      r.createdDate ? r.createdDate.toISOString() : "",
      r.matureDate ? r.matureDate.toISOString() : "",
    ]);
    const csv = [headers, ...lines]
      .map((arr) => arr.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "investment-controls.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSettle = async (row: InvestmentRow) => {
    try {
      setActionLoading(row.id);
      await settleInvestment(row.id);
      setSnackbar({ open: true, message: "Investment settled successfully", severity: "success" });
    } catch (err: any) {
      setSnackbar({ open: true, message: err?.message || "Failed to settle investment", severity: "error" });
    } finally {
      setActionLoading(null);
    }
  };

  const StatusChip = ({ value }: { value: string }) => (
    <Chip
      label={value}
      size="small"
      sx={{
        bgcolor:
          value === "completed"
            ? "rgba(34,197,94,0.12)"
            : value === "cancelled"
              ? "rgba(239,68,68,0.12)"
              : "rgba(234,179,8,0.12)",
        color:
          value === "completed"
            ? "#22c55e"
            : value === "cancelled"
              ? "#ef4444"
              : "#eab308",
        fontWeight: 800,
        fontSize: "0.65rem",
        textTransform: "uppercase",
      }}
    />
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "var(--background)" }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight="800"
            sx={{ color: "var(--foreground)", mb: 0.5, display: "flex", alignItems: "center", gap: 1.5 }}
          >
            <ShieldCheck size={28} color="#22c55e" /> Investment Controls
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
            Monitor all investment cycles and settle matured positions securely.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<Download size={16} />} onClick={exportCSV} sx={{ borderRadius: 2.5 }}>
            Export
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: "var(--card)", border: "1px solid", borderColor: "#000000", borderRadius: 4 }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
              <Box sx={{ p: 1.2, borderRadius: 2.5, bgcolor: "rgba(59,130,246,0.12)", color: "#3b82f6", display: "flex" }}>
                <Coins size={18} />
              </Box>
              <Typography variant="caption" sx={{ color: "var(--muted-foreground)", fontWeight: 800, letterSpacing: 0.6, textTransform: "uppercase" }}>
                Total Investments
              </Typography>
            </Stack>
            <Typography variant="h5" fontWeight="900" sx={{ color: "var(--foreground)" }}>
              {metrics.total}
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: "var(--card)", border: "1px solid", borderColor: "#000000", borderRadius: 4 }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
              <Box sx={{ p: 1.2, borderRadius: 2.5, bgcolor: "rgba(234,179,8,0.12)", color: "#eab308", display: "flex" }}>
                <Hourglass size={18} />
              </Box>
              <Typography variant="caption" sx={{ color: "var(--muted-foreground)", fontWeight: 800, letterSpacing: 0.6, textTransform: "uppercase" }}>
                Running
              </Typography>
            </Stack>
            <Typography variant="h5" fontWeight="900" sx={{ color: "var(--foreground)" }}>
              {metrics.running}
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: "var(--card)", border: "1px solid", borderColor: "#000000", borderRadius: 4 }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
              <Box sx={{ p: 1.2, borderRadius: 2.5, bgcolor: "rgba(34,197,94,0.12)", color: "#22c55e", display: "flex" }}>
                <CheckCircle2 size={18} />
              </Box>
              <Typography variant="caption" sx={{ color: "var(--muted-foreground)", fontWeight: 800, letterSpacing: 0.6, textTransform: "uppercase" }}>
                Completed
              </Typography>
            </Stack>
            <Typography variant="h5" fontWeight="900" sx={{ color: "var(--foreground)" }}>
              {metrics.completed}
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: "var(--card)", border: "1px solid", borderColor: "#000000", borderRadius: 4 }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
              <Box sx={{ p: 1.2, borderRadius: 2.5, bgcolor: "rgba(99,102,241,0.12)", color: "primary.main", display: "flex" }}>
                <Timer size={18} />
              </Box>
              <Typography variant="caption" sx={{ color: "var(--muted-foreground)", fontWeight: 800, letterSpacing: 0.6, textTransform: "uppercase" }}>
                Matured (Running)
              </Typography>
            </Stack>
            <Typography variant="h5" fontWeight="900" sx={{ color: "var(--foreground)" }}>
              {metrics.matured}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={0} sx={{ p: 2, bgcolor: "var(--card)", border: "1px solid", borderColor: "#000000", borderRadius: 4, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              placeholder="Search by ID, user, or plan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} color="var(--muted-foreground)" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "var(--background)",
                  borderRadius: 3,
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              select
              fullWidth
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "var(--background)",
                  borderRadius: 3,
                },
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="running">Running</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Stack direction="row" justifyContent={{ xs: "flex-start", md: "flex-end" }} spacing={1}>
              <Chip
                label={`Invested: $${metrics.invested.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                size="small"
                sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "var(--foreground)", fontWeight: 800 }}
              />
              <Chip
                label={`Profit due: $${metrics.profitDue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                size="small"
                sx={{ bgcolor: "rgba(34,197,94,0.12)", color: "#22c55e", fontWeight: 900 }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress />
        </Box>
      ) : isMobile ? (
        <Stack spacing={2}>
          {filtered.map((r) => {
            const statusValue = (r.status || "running") as string;
            const matured = r.matureDate ? r.matureDate <= new Date() : false;
            const canSettle = statusValue === "running" && matured;
            return (
              <Paper key={r.id} elevation={0} sx={{ p: 2.5, bgcolor: "var(--card)", border: "1px solid", borderColor: "#000000", borderRadius: 4 }}>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" fontWeight="800" sx={{ color: "var(--foreground)" }}>
                        {r.planName || "Investment"}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "var(--muted-foreground)", fontFamily: "monospace" }}>
                        {r.id}
                      </Typography>
                    </Box>
                    <StatusChip value={statusValue} />
                  </Stack>

                  <Divider sx={{ borderColor: "rgba(0,0,0,0.6)" }} />

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="caption" sx={{ color: "var(--muted-foreground)", fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5 }}>
                        Amount
                      </Typography>
                      <Typography variant="body2" fontWeight="900" sx={{ color: "var(--foreground)" }}>
                        ${Number(r.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="caption" sx={{ color: "var(--muted-foreground)", fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5 }}>
                        Profit
                      </Typography>
                      <Typography variant="body2" fontWeight="900" sx={{ color: "#22c55e" }}>
                        +${Number(r.profit || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Calendar size={14} color="var(--muted-foreground)" />
                        <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>
                          Mature: {r.matureDate ? r.matureDate.toLocaleString() : "N/A"}
                        </Typography>
                        {matured && (
                          <Chip size="small" label="Matured" sx={{ ml: "auto", bgcolor: "rgba(34,197,94,0.12)", color: "#22c55e", fontWeight: 900, fontSize: "0.65rem", textTransform: "uppercase" }} />
                        )}
                      </Stack>
                    </Grid>
                  </Grid>

                  <Button
                    fullWidth
                    variant="contained"
                    disabled={!canSettle || actionLoading === r.id}
                    onClick={() => handleSettle(r)}
                    sx={{ borderRadius: 3, fontWeight: 900, py: 1.2 }}
                  >
                    {actionLoading === r.id ? <CircularProgress size={18} color="inherit" /> : canSettle ? "Settle Investment" : "Not Matured"}
                  </Button>
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      ) : (
        <Paper elevation={0} sx={{ bgcolor: "var(--card)", border: "1px solid", borderColor: "#000000", borderRadius: 4, overflow: "hidden" }}>
          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead sx={{ bgcolor: "rgba(255,255,255,0.02)" }}>
                <TableRow>
                  <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase" }}>Investor</TableCell>
                  <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase" }}>Plan</TableCell>
                  <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase" }}>Amount</TableCell>
                  <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase" }}>Profit</TableCell>
                  <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase" }}>Matures</TableCell>
                  <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase" }}>Status</TableCell>
                  <TableCell align="right" sx={{ color: "var(--muted-foreground)", fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((r) => {
                  const statusValue = (r.status || "running") as string;
                  const matured = r.matureDate ? r.matureDate <= new Date() : false;
                  const canSettle = statusValue === "running" && matured;
                  return (
                    <TableRow key={r.id} sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.02)" } }}>
                      <TableCell sx={{ color: "var(--foreground)", fontFamily: "monospace", fontWeight: 700 }}>
                        {r.userId || "N/A"}
                        <Typography variant="caption" sx={{ color: "var(--muted-foreground)", display: "block" }}>
                          {r.id.slice(0, 10)}…
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: "var(--foreground)", fontWeight: 800 }}>{r.planName || "N/A"}</TableCell>
                      <TableCell sx={{ color: "var(--foreground)", fontWeight: 800 }}>
                        ${Number(r.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell sx={{ color: "#22c55e", fontWeight: 900 }}>
                        +${Number(r.profit || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell sx={{ color: "var(--muted-foreground)" }}>
                        {r.matureDate ? r.matureDate.toLocaleString() : "N/A"}
                        {matured && (
                          <Chip
                            label="Matured"
                            size="small"
                            sx={{ ml: 1, bgcolor: "rgba(34,197,94,0.12)", color: "#22c55e", fontWeight: 900, fontSize: "0.65rem", textTransform: "uppercase" }}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <StatusChip value={statusValue} />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          size="small"
                          disabled={!canSettle || actionLoading === r.id}
                          onClick={() => handleSettle(r)}
                          sx={{ borderRadius: 2.5, fontWeight: 900, textTransform: "none" }}
                        >
                          {actionLoading === r.id ? <CircularProgress size={16} color="inherit" /> : "Settle"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      )}

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: 3 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

