"use client";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  Stack,
  CircularProgress,
  Avatar,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { approvePinRecharge, rejectPinRecharge } from "@/app/actions/admin";
import { 
  Smartphone, 
  Search, 
  User, 
  Hash, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Clock,
  ArrowRight
} from "lucide-react";

export default function PinRechargesPage() {
  const [recharges, setRecharges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = query(collection(db, "pinRecharges"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setRecharges(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      await approvePinRecharge(id);
    } catch (err: any) {
      alert(err.message || "Failed to approve");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    setActionLoading(id);
    try {
      await rejectPinRecharge(id);
    } catch (err: any) {
      alert(err.message || "Failed to reject");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredRecharges = recharges.filter((r) =>
    `${r.userId} ${r.pinNumber} ${r.id}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "var(--background)", minHeight: "100vh" }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ color: "var(--foreground)", mb: 0.5, display: "flex", alignItems: "center", gap: 1.5 }}>
            <Smartphone size={28} color="primary.main" /> InstaPIN Recharges
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
            Validate and process physical card PIN recharges for user account funding.
          </Typography>
        </Box>
      </Stack>

      {/* Filter */}
      <Paper elevation={0} sx={{ p: 2, mb: 4, bgcolor: "var(--card)", border: "1px solid var(--border)", borderRadius: 4 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search by PIN, user ID or request ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} color="var(--muted-foreground)" />
              </InputAdornment>
            ),
            sx: { bgcolor: "rgba(255,255,255,0.02)", borderRadius: 3 }
          }}
        />
      </Paper>

      <Paper elevation={0} sx={{ bgcolor: "var(--card)", border: "1px solid var(--border)", borderRadius: 4, overflow: "hidden" }}>
        <Box sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead sx={{ bgcolor: "rgba(255,255,255,0.02)" }}>
              <TableRow>
                <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}>Investor</TableCell>
                <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}>PIN Number</TableCell>
                <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}>Face Value</TableCell>
                <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}>Net Credit</TableCell>
                <TableCell sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}>Status</TableCell>
                <TableCell align="right" sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                    <CircularProgress size={30} />
                  </TableCell>
                </TableRow>
              ) : filteredRecharges.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 10, color: "var(--muted-foreground)" }}>
                    No recharge requests found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredRecharges.map((row) => (
                  <TableRow key={row.id} sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.01)" } }}>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ width: 32, height: 32, bgcolor: "rgba(99, 102, 241, 0.1)", color: "primary.main" }}>
                          <User size={16} />
                        </Avatar>
                        <Typography variant="body2" fontWeight="600" sx={{ color: "var(--foreground)" }}>
                          {row.userId?.slice(0, 12)}...
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Hash size={14} color="var(--muted-foreground)" />
                        <Typography variant="body2" fontWeight="700" sx={{ color: "primary.main", fontFamily: "monospace" }}>
                          {row.pinNumber}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="600" sx={{ color: "var(--foreground)" }}>
                        ${Number(row.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="800" sx={{ color: "#22c55e" }}>
                        +${Number(row.netCredit).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={row.status} 
                        size="small" 
                        icon={row.status === "approved" ? <CheckCircle2 size={12} /> : row.status === "rejected" ? <XCircle size={12} /> : <Clock size={12} />}
                        sx={{ 
                          bgcolor: row.status === "approved" ? "rgba(34, 197, 94, 0.1)" : row.status === "rejected" ? "rgba(239, 68, 68, 0.1)" : "rgba(234, 179, 8, 0.1)",
                          color: row.status === "approved" ? "#22c55e" : row.status === "rejected" ? "#ef4444" : "#eab308",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          fontSize: "0.65rem"
                        }} 
                      />
                    </TableCell>
                    <TableCell align="right">
                      {row.status === "pending" ? (
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Button 
                            size="small" 
                            variant="contained" 
                            onClick={() => handleApprove(row.id)}
                            disabled={actionLoading === row.id}
                            sx={{ bgcolor: "#22c55e", "&:hover": { bgcolor: "#16a34a" }, borderRadius: 2, textTransform: "none", fontWeight: 700 }}
                          >
                            {actionLoading === row.id ? <CircularProgress size={16} color="inherit" /> : "Approve"}
                          </Button>
                          <Button 
                            size="small" 
                            variant="outlined" 
                            color="error" 
                            onClick={() => handleReject(row.id)}
                            disabled={actionLoading === row.id}
                            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}
                          >
                            {actionLoading === row.id ? <CircularProgress size={16} color="inherit" /> : "Reject"}
                          </Button>
                        </Stack>
                      ) : (
                        <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>Processed</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
}
