"use client";

import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  useTheme,
  useMediaQuery,
  Chip,
  CircularProgress,
  IconButton,
  InputAdornment,
  Divider,
  Tabs,
  Tab,
  Avatar,
} from "@mui/material";
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCw, 
  Calendar, 
  Hash, 
  Wallet,
  Activity,
  Award,
  Zap,
  History,
  CreditCard,
  ChevronRight
} from "lucide-react";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { auth, db } from "@/app/firebase/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";

export default function TransactionsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const uid = user.uid;

      // Define queries for all transaction types
      const queries = {
        deposits: query(collection(db, "deposits"), where("userId", "==", uid)),
        withdrawals: query(collection(db, "withdrawals"), where("userId", "==", uid)),
        trades: query(collection(db, "trades"), where("uid", "==", uid)),
        investments: query(collection(db, "investments"), where("userId", "==", uid)),
        matrix: query(collection(db, "matrixEnrollments"), where("userId", "==", uid)),
        rewards: query(collection(db, "referralRewards"), where("userId", "==", uid)),
      };

      const unsubscribers: any[] = [];
      const dataStore: any = {
        deposits: [],
        withdrawals: [],
        trades: [],
        investments: [],
        matrix: [],
        rewards: [],
      };

      const updateAll = () => {
        const combined = [
          ...dataStore.deposits.map((d: any) => ({ ...d, type: "DEPOSIT", label: "Deposit", color: "#22c55e", icon: <ArrowDownLeft size={16} /> })),
          ...dataStore.withdrawals.map((w: any) => ({ ...w, type: "WITHDRAWAL", label: "Withdrawal", color: "#ef4444", icon: <ArrowUpRight size={16} /> })),
          ...dataStore.trades.map((t: any) => ({ ...t, type: "TRADE", label: "Trade Execution", color: "#3b82f6", icon: <Activity size={16} />, amount: t.amount })),
          ...dataStore.investments.map((i: any) => ({ ...i, type: "INVESTMENT", label: "Investment", color: "#6366f1", icon: <Zap size={16} /> })),
          ...dataStore.matrix.map((m: any) => ({ ...m, type: "MATRIX", label: "Matrix Join", color: "#eab308", icon: <Award size={16} /> })),
          ...dataStore.rewards.map((r: any) => ({ ...r, type: "REWARD", label: "Referral Reward", color: "#22c55e", icon: <History size={16} /> })),
        ].sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || a.timestamp?.toDate?.() || new Date(0);
          const dateB = b.createdAt?.toDate?.() || b.timestamp?.toDate?.() || new Date(0);
          return dateB - dateA;
        });
        setTransactions(combined);
        setLoading(false);
      };

      // Set up individual listeners
      Object.entries(queries).forEach(([key, q]) => {
        const unsub = onSnapshot(q, (snap) => {
          dataStore[key] = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          updateAll();
        });
        unsubscribers.push(unsub);
      });

      return () => unsubscribers.forEach(unsub => unsub());
    });

    return () => unsubscribeAuth();
  }, []);

  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase();
    if (s === "approved" || s === "completed" || s === "success" || s === "won" || s === "active") return "#22c55e";
    if (s === "pending" || s === "running" || s === "open") return "#eab308";
    if (s === "rejected" || s === "failed" || s === "lost") return "#ef4444";
    return "var(--muted-foreground)";
  };

  const filteredTransactions = transactions.filter(t => {
    const matchesType = filterType === "ALL" || t.type === filterType;
    const matchesSearch = searchTerm === "" || 
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.asset?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.label?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "var(--background)", minHeight: "100vh" }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ color: "#ffffff", mb: 0.5, display: "flex", alignItems: "center", gap: 1.5 }}>
            <History size={28} color="primary.main" /> Transactions
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
            A comprehensive history of all your account activities, rewards, and trades.
          </Typography>
        </Box>
        {!isMobile && (
          <Button 
            variant="outlined" 
            startIcon={<RefreshCw size={16} />}
            onClick={() => window.location.reload()}
            sx={{ borderRadius: 2.5, borderColor: "var(--border)", color: "#ffffff", textTransform: "none" }}
          >
            Refresh Logs
          </Button>
        )}
      </Stack>

      {/* Filters & Tabs */}
      <Paper 
        elevation={0} 
        sx={{ 
          bgcolor: "var(--card)", 
          border: "1px solid", 
          borderColor: "var(--border)", 
          borderRadius: 4, 
          mb: 4,
          overflow: "hidden"
        }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid var(--border)" }}>
          <Stack direction={isMobile ? "column" : "row"} spacing={2} alignItems="center">
            <TextField
              fullWidth
              size="small"
              placeholder="Search by Trx ID or Asset..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search size={18} color="var(--muted-foreground)" /></InputAdornment>,
                sx: { bgcolor: "rgba(255,255,255,0.02)", borderRadius: 2.5 }
              }}
            />
            <TextField
              select
              size="small"
              sx={{ minWidth: isMobile ? "100%" : 200 }}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Filter size={18} color="var(--muted-foreground)" /></InputAdornment>,
                sx: { bgcolor: "rgba(255,255,255,0.02)", borderRadius: 2.5 }
              }}
            >
              <MenuItem value="ALL">All Transactions</MenuItem>
              <MenuItem value="DEPOSIT">Deposits</MenuItem>
              <MenuItem value="WITHDRAWAL">Withdrawals</MenuItem>
              <MenuItem value="TRADE">Trades</MenuItem>
              <MenuItem value="INVESTMENT">Investments</MenuItem>
              <MenuItem value="REWARD">Rewards</MenuItem>
            </TextField>
          </Stack>
        </Box>

        {/* Desktop Table View */}
        {!isMobile ? (
          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead sx={{ bgcolor: "rgba(255,255,255,0.02)" }}>
                <TableRow>
                  <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}>Activity</TableCell>
                  <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}>Amount</TableCell>
                  <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}>Trx ID</TableCell>
                  <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}>Date</TableCell>
                  <TableCell align="right" sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} align="center" sx={{ py: 10 }}><CircularProgress size={30} /></TableCell></TableRow>
                ) : filteredTransactions.length === 0 ? (
                  <TableRow><TableCell colSpan={5} align="center" sx={{ py: 10, color: "var(--muted-foreground)" }}>No records found matching your filters.</TableCell></TableRow>
                ) : (
                  filteredTransactions.map((t) => (
                    <TableRow key={t.id} sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.01)" } }}>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar sx={{ width: 32, height: 32, bgcolor: `${t.color}15`, color: t.color }}>{t.icon}</Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="700" sx={{ color: "#ffffff" }}>{t.label}</Typography>
                            <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>{t.asset || t.planTitle || t.planName || "System"}</Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                        <Typography variant="body2" fontWeight="800" sx={{ color: t.type === "WITHDRAWAL" ? "#ef4444" : "#22c55e" }}>
                          {t.type === "WITHDRAWAL" ? "-" : "+"}${t.amount?.toLocaleString() || t.receiveAmount?.toLocaleString() || "0.00"}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                        <Typography variant="caption" sx={{ color: "var(--muted-foreground)", fontFamily: "monospace" }}>{t.id.slice(0, 12)}...</Typography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                        <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>
                          {t.createdAt?.toDate?.().toLocaleString() || t.timestamp?.toDate?.().toLocaleString() || "N/A"}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                        <Chip 
                          label={t.status || "Completed"} 
                          size="small" 
                          sx={{ 
                            bgcolor: `${getStatusColor(t.status || "completed")}15`, 
                            color: getStatusColor(t.status || "completed"),
                            fontWeight: "800",
                            fontSize: "0.65rem",
                            textTransform: "uppercase"
                          }} 
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Box>
        ) : (
          /* Mobile Card View */
          <Stack spacing={0} divider={<Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />}>
            {loading ? (
              <Box sx={{ py: 10, textAlign: "center" }}><CircularProgress size={30} /></Box>
            ) : filteredTransactions.length === 0 ? (
              <Box sx={{ py: 10, textAlign: "center", color: "var(--muted-foreground)" }}>No records found.</Box>
            ) : (
              filteredTransactions.map((t) => (
                <Box key={t.id} sx={{ p: 2.5 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ width: 40, height: 40, bgcolor: `${t.color}15`, color: t.color }}>{t.icon}</Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="800" sx={{ color: "#ffffff" }}>{t.label}</Typography>
                        <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>{t.asset || t.planTitle || t.planName || "System"}</Typography>
                      </Box>
                    </Stack>
                    <Typography variant="subtitle2" fontWeight="900" sx={{ color: t.type === "WITHDRAWAL" ? "#ef4444" : "#22c55e" }}>
                      {t.type === "WITHDRAWAL" ? "-" : "+"}${t.amount?.toLocaleString() || t.receiveAmount?.toLocaleString() || "0.00"}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Calendar size={12} color="var(--muted-foreground)" />
                      <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>
                        {t.createdAt?.toDate?.().toLocaleDateString() || t.timestamp?.toDate?.().toLocaleDateString() || "N/A"}
                      </Typography>
                    </Stack>
                    <Chip 
                      label={t.status || "Completed"} 
                      size="small" 
                      sx={{ 
                        height: 20,
                        bgcolor: `${getStatusColor(t.status || "completed")}15`, 
                        color: getStatusColor(t.status || "completed"),
                        fontWeight: "800",
                        fontSize: "0.6rem",
                        textTransform: "uppercase"
                      }} 
                    />
                  </Stack>
                </Box>
              ))
            )}
          </Stack>
        )}
      </Paper>
    </Box>
  );
}
