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
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Search,
  TrendingUp,
  TrendingDown,
  Wallet,
  Timer,
} from "lucide-react";
import { settleTrade } from "@/app/dashboard/trades/settle";

type Trade = {
  id: string;
  uid: string;
  asset: string;
  direction: "call" | "put";
  amount: number;
  payout: number;
  mode: "demo" | "live";
  openPrice: number;
  closePrice: number | null;
  openedAt?: any;
  expiresAt?: any;
  status: "open" | "won" | "lost";
  openedDate?: Date;
  expiresDate?: Date;
};

export default function AdminTradingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [trades, setTrades] = useState<Trade[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "open" | "won" | "lost">("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [dialog, setDialog] = useState<{ open: boolean; tradeId: string | null; price: string }>({
    open: false,
    tradeId: null,
    price: "",
  });

  useEffect(() => {
    return onSnapshot(collection(db, "trades"), (snap) => {
      const data = snap.docs.map((d) => {
        const raw: any = d.data();
        return {
          id: d.id,
          ...raw,
          amount: Number(raw.amount || 0),
          payout: Number(raw.payout || 0),
          openPrice: Number(raw.openPrice || 0),
          closePrice: raw.closePrice ?? null,
          openedDate: raw.openedAt?.toDate?.() || undefined,
          expiresDate: raw.expiresAt?.toDate?.() || undefined,
        } as Trade;
      });
      (data as any[]).sort((a, b) => {
        const aDate = a.openedDate || new Date(0);
        const bDate = b.openedDate || new Date(0);
        return bDate.getTime() - aDate.getTime();
      });
      setTrades(data);
    });
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return trades.filter((t) => {
      if (status !== "all" && t.status !== status) return false;
      if (!q) return true;
      return `${t.uid} ${t.asset} ${t.id}`.toLowerCase().includes(q);
    });
  }, [trades, search, status]);

  const metrics = useMemo(() => {
    const open = trades.filter((t) => t.status === "open");
    const won = trades.filter((t) => t.status === "won");
    const lost = trades.filter((t) => t.status === "lost");
    const exposure = open.reduce((sum, t) => sum + t.amount, 0);
    return { open: open.length, won: won.length, lost: lost.length, exposure };
  }, [trades]);

  const openSettle = (tradeId: string, defaultPrice?: number | null) => {
    setDialog({ open: true, tradeId, price: defaultPrice ? String(defaultPrice) : "" });
  };

  const doSettle = async () => {
    if (!dialog.tradeId) return;
    const priceNum = Number(dialog.price);
    if (!Number.isFinite(priceNum) || priceNum <= 0) return;
    try {
      setActionLoading(dialog.tradeId);
      await settleTrade(dialog.tradeId, priceNum);
      setDialog({ open: false, tradeId: null, price: "" });
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "var(--background)", minHeight: "100vh" }}>
      <Stack direction={isMobile ? "column" : "row"} spacing={2} justifyContent="space-between" alignItems={isMobile ? "flex-start" : "center"} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ color: "var(--foreground)", mb: 0.5, display: "flex", alignItems: "center", gap: 1.5 }}>
            <Activity size={28} color="#22c55e" /> Trading Oversight
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
            Monitor positions in real time and settle trades securely.
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: "var(--card)", border: "1px solid", borderColor: "#000000", borderRadius: 4, display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ p: 1.2, borderRadius: 2.5, bgcolor: "rgba(234,179,8,0.12)", color: "#eab308", display: "flex" }}>
              <Timer size={18} />
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: "var(--muted-foreground)", fontWeight: 800, letterSpacing: 0.6, textTransform: "uppercase" }}>Open Trades</Typography>
              <Typography variant="h6" fontWeight="900" sx={{ color: "var(--foreground)" }}>{metrics.open}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: "var(--card)", border: "1px solid", borderColor: "#000000", borderRadius: 4, display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ p: 1.2, borderRadius: 2.5, bgcolor: "rgba(34,197,94,0.12)", color: "#22c55e", display: "flex" }}>
              <TrendingUp size={18} />
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: "var(--muted-foreground)", fontWeight: 800, letterSpacing: 0.6, textTransform: "uppercase" }}>Won</Typography>
              <Typography variant="h6" fontWeight="900" sx={{ color: "var(--foreground)" }}>{metrics.won}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: "var(--card)", border: "1px solid", borderColor: "#000000", borderRadius: 4, display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ p: 1.2, borderRadius: 2.5, bgcolor: "rgba(239,68,68,0.12)", color: "#ef4444", display: "flex" }}>
              <TrendingDown size={18} />
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: "var(--muted-foreground)", fontWeight: 800, letterSpacing: 0.6, textTransform: "uppercase" }}>Lost</Typography>
              <Typography variant="h6" fontWeight="900" sx={{ color: "var(--foreground)" }}>{metrics.lost}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: "var(--card)", border: "1px solid", borderColor: "#000000", borderRadius: 4, display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ p: 1.2, borderRadius: 2.5, bgcolor: "rgba(59,130,246,0.12)", color: "#3b82f6", display: "flex" }}>
              <Wallet size={18} />
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: "var(--muted-foreground)", fontWeight: 800, letterSpacing: 0.6, textTransform: "uppercase" }}>Open Exposure</Typography>
              <Typography variant="h6" fontWeight="900" sx={{ color: "var(--foreground)" }}>${metrics.exposure.toLocaleString()}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: "var(--card)", border: "1px solid", borderColor: "#000000", borderRadius: 4 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              placeholder="Search by user, asset, or trade ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} color="var(--muted-foreground)" />
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { bgcolor: "var(--background)", borderRadius: 3 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack direction="row" spacing={1} justifyContent={{ xs: "flex-start", md: "flex-end" }}>
              <Chip
                label="All"
                onClick={() => setStatus("all")}
                sx={{ bgcolor: status === "all" ? "rgba(255,255,255,0.06)" : "transparent", color: "var(--foreground)", border: "1px solid var(--border)", fontWeight: 800 }}
              />
              <Chip
                label="Open"
                onClick={() => setStatus("open")}
                sx={{ bgcolor: status === "open" ? "rgba(255,255,255,0.06)" : "transparent", color: "var(--foreground)", border: "1px solid var(--border)", fontWeight: 800 }}
              />
              <Chip
                label="Won"
                onClick={() => setStatus("won")}
                sx={{ bgcolor: status === "won" ? "rgba(34,197,94,0.12)" : "transparent", color: status === "won" ? "#22c55e" : "var(--foreground)", border: "1px solid var(--border)", fontWeight: 800 }}
              />
              <Chip
                label="Lost"
                onClick={() => setStatus("lost")}
                sx={{ bgcolor: status === "lost" ? "rgba(239,68,68,0.12)" : "transparent", color: status === "lost" ? "#ef4444" : "var(--foreground)", border: "1px solid var(--border)", fontWeight: 800 }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ bgcolor: "var(--card)", border: "1px solid", borderColor: "#000000", borderRadius: 4, overflow: "hidden" }}>
        <Box sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead sx={{ bgcolor: "rgba(255,255,255,0.02)" }}>
              <TableRow>
                <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase" }}>User</TableCell>
                <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase" }}>Asset</TableCell>
                <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase" }}>Direction</TableCell>
                <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase" }}>Amount</TableCell>
                <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase" }}>Open</TableCell>
                <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase" }}>Expires</TableCell>
                <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase" }}>Mode</TableCell>
                <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase" }}>Status</TableCell>
                <TableCell align="right" sx={{ color: "var(--muted-foreground)", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((t) => (
                <TableRow key={t.id} sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.02)" } }}>
                  <TableCell sx={{ color: "var(--foreground)", fontFamily: "monospace", fontWeight: 700 }}>
                    {t.uid?.slice(0, 12)}…
                    <Typography variant="caption" sx={{ color: "var(--muted-foreground)", display: "block" }}>
                      {t.id.slice(0, 10)}…
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "var(--foreground)", fontWeight: 800 }}>{t.asset}</TableCell>
                  <TableCell>
                    <Chip
                      label={t.direction.toUpperCase()}
                      size="small"
                      sx={{
                        bgcolor: t.direction === "call" ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                        color: t.direction === "call" ? "#22c55e" : "#ef4444",
                        fontWeight: 800,
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#22c55e", fontWeight: 900 }}>
                    +${t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell sx={{ color: "var(--muted-foreground)" }}>
                    {t.openedDate ? t.openedDate.toLocaleTimeString() : "N/A"}
                  </TableCell>
                  <TableCell sx={{ color: "var(--muted-foreground)" }}>
                    {t.expiresDate ? t.expiresDate.toLocaleTimeString() : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={t.mode}
                      size="small"
                      sx={{
                        bgcolor: t.mode === "live" ? "rgba(34,197,94,0.12)" : "rgba(59,130,246,0.12)",
                        color: t.mode === "live" ? "#22c55e" : "#3b82f6",
                        fontWeight: 800,
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={t.status}
                      size="small"
                      sx={{
                        bgcolor:
                          t.status === "open"
                            ? "rgba(234,179,8,0.12)"
                            : t.status === "won"
                            ? "rgba(34,197,94,0.12)"
                            : "rgba(239,68,68,0.12)",
                        color:
                          t.status === "open"
                            ? "#eab308"
                            : t.status === "won"
                            ? "#22c55e"
                            : "#ef4444",
                        fontWeight: 800,
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {t.status === "open" ? (
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => openSettle(t.id, t.openPrice)}
                          disabled={actionLoading === t.id}
                          sx={{ borderRadius: 2, textTransform: "none", fontWeight: 800 }}
                        >
                          {actionLoading === t.id ? <CircularProgress size={16} color="inherit" /> : "Settle"}
                        </Button>
                      </Stack>
                    ) : (
                      <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>Processed</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>

      <Dialog open={dialog.open} onClose={() => setDialog({ open: false, tradeId: null, price: "" })} fullWidth maxWidth="xs">
        <DialogTitle>Settle Trade</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="number"
            label="Close Price"
            value={dialog.price}
            onChange={(e) => setDialog((d) => ({ ...d, price: e.target.value }))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  $
                </InputAdornment>
              ),
            }}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog({ open: false, tradeId: null, price: "" })}>Cancel</Button>
          <Button variant="contained" onClick={doSettle} disabled={actionLoading !== null}>
            {actionLoading ? <CircularProgress size={18} color="inherit" /> : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

