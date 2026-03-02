"use client";

import {
  collection,
  doc,
  onSnapshot,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
  Paper,
  Stack,
  Avatar,
  Chip,
  Tooltip,
  CircularProgress,
  useTheme,
  useMediaQuery,
  TextField,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  ArrowUpRight,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Wallet,
  AlertCircle,
  Calendar,
} from "lucide-react";

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    return onSnapshot(collection(db, "withdrawals"), (snap) => {
      setWithdrawals(
        snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => {
            const dateA = a.createdAt?.toDate?.() || new Date(0);
            const dateB = b.createdAt?.toDate?.() || new Date(0);
            return dateB - dateA;
          }),
      );
    });
  }, []);

  const approveWithdraw = async (w: any) => {
    try {
      setLoadingAction(w.id);
      const userRef = doc(db, "users", w.userId);
      const withdrawalRef = doc(db, "withdrawals", w.id);

      await runTransaction(db, async (tx) => {
        const userSnap = await tx.get(userRef);
        if (!userSnap.exists()) throw new Error("User not found");

        const balance = userSnap.data().usdtBalance || 0;

        if (balance < w.amount) {
          throw new Error("Insufficient balance");
        }

        tx.update(userRef, {
          usdtBalance: balance - w.amount,
        });

        tx.update(withdrawalRef, {
          status: "approved",
          processedAt: new Date(),
        });

        tx.set(doc(collection(db, "notifications")), {
          userId: w.userId,
          title: "Withdrawal Approved",
          message: `Your $${w.amount} withdrawal was approved.`,
          read: false,
          createdAt: new Date(),
        });
      });
    } catch (err: any) {
      alert(err.message || "Failed to approve withdrawal");
    } finally {
      setLoadingAction(null);
    }
  };

  const rejectWithdraw = async (id: string) => {
    try {
      setLoadingAction(id);
      await updateDoc(doc(db, "withdrawals", id), {
        status: "rejected",
        processedAt: new Date(),
      });
    } catch (err: any) {
      alert(err.message || "Failed to reject withdrawal");
    } finally {
      setLoadingAction(null);
    }
  };

  const filteredWithdrawals = withdrawals.filter((w) =>
    `${w.userId} ${w.id}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "var(--background)",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
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
            <ArrowUpRight size={28} color="#ef4444" /> Withdrawal Requests
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
            Review and process capital withdrawal requests from platform
            members.
          </Typography>
        </Box>
      </Stack>

      {/* Filters */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 4,
          bgcolor: "var(--card)",
          border: "1px solid",
          borderColor: "var(--border)",
          borderRadius: 4,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search by User ID or Request ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} color="var(--muted-foreground)" />
              </InputAdornment>
            ),
            sx: { bgcolor: "rgba(255,255,255,0.02)", borderRadius: 3 },
          }}
        />
      </Paper>

      {/* Content */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: "var(--card)",
          border: "1px solid",
          borderColor: "var(--border)",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "rgba(255,255,255,0.02)" }}>
            <TableRow>
              <TableCell
                sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
              >
                Investor ID
              </TableCell>
              <TableCell
                sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
              >
                Amount
              </TableCell>
              <TableCell
                sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
              >
                Date Requested
              </TableCell>
              <TableCell
                sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
              >
                Status
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredWithdrawals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "var(--muted-foreground)" }}
                  >
                    No withdrawal requests found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredWithdrawals.map((w) => (
                <TableRow
                  key={w.id}
                  sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.01)" } }}
                >
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: "rgba(239, 68, 68, 0.1)",
                          color: "#ef4444",
                        }}
                      >
                        <User size={16} />
                      </Avatar>
                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight="700"
                          sx={{ color: "var(--foreground)" }}
                        >
                          {w.userId?.slice(0, 12)}...
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "var(--muted-foreground)" }}
                        >
                          ID: {w.id?.slice(0, 8)}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      fontWeight="800"
                      sx={{ color: "#ef4444" }}
                    >
                      -$
                      {Number(w.amount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Calendar size={14} color="var(--muted-foreground)" />
                      <Typography
                        variant="caption"
                        sx={{ color: "var(--muted-foreground)" }}
                      >
                        {w.createdAt?.toDate?.().toLocaleString() || "N/A"}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={w.status}
                      size="small"
                      icon={
                        w.status === "approved" ? (
                          <CheckCircle2 size={12} />
                        ) : w.status === "rejected" ? (
                          <XCircle size={12} />
                        ) : (
                          <Clock size={12} />
                        )
                      }
                      sx={{
                        bgcolor:
                          w.status === "approved"
                            ? "rgba(34, 197, 94, 0.1)"
                            : w.status === "rejected"
                              ? "rgba(239, 68, 68, 0.1)"
                              : "rgba(234, 179, 8, 0.1)",
                        color:
                          w.status === "approved"
                            ? "#22c55e"
                            : w.status === "rejected"
                              ? "#ef4444"
                              : "#eab308",
                        fontWeight: 800,
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {w.status === "pending" ? (
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                      >
                        <Button
                          size="small"
                          variant="contained"
                          disabled={loadingAction === w.id}
                          onClick={() => approveWithdraw(w)}
                          sx={{
                            bgcolor: "#22c55e",
                            "&:hover": { bgcolor: "#16a34a" },
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 700,
                          }}
                        >
                          {loadingAction === w.id ? (
                            <CircularProgress size={16} color="inherit" />
                          ) : (
                            "Approve"
                          )}
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          disabled={loadingAction === w.id}
                          onClick={() => rejectWithdraw(w.id)}
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 700,
                          }}
                        >
                          {loadingAction === w.id ? (
                            <CircularProgress size={16} color="inherit" />
                          ) : (
                            "Reject"
                          )}
                        </Button>
                      </Stack>
                    ) : (
                      <Typography
                        variant="caption"
                        sx={{ color: "var(--muted-foreground)" }}
                      >
                        Processed
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
