"use client";

import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  Stack,
  Paper,
  IconButton,
  Avatar,
  Tooltip,
  CircularProgress,
  useTheme,
  useMediaQuery,
  TextField,
  InputAdornment,
} from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { useEffect, useState } from "react";
import { approveDeposit, rejectDeposit } from "@/app/actions/admin";
import {
  CreditCard,
  Search,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  User,
  ArrowDownLeft,
} from "lucide-react";

export default function AdminDepositsPage() {
  const [deposits, setDeposits] = useState<any[]>([]);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    return onSnapshot(collection(db, "deposits"), (snap) => {
      setDeposits(
        (snap.docs.map((d) => ({ id: d.id, ...d.data() })) as any[]).sort(
          (a, b) => {
            const dateA = a.createdAt?.toDate?.() || new Date(0);
            const dateB = b.createdAt?.toDate?.() || new Date(0);
            return dateB - dateA;
          },
        ),
      );
    });
  }, []);

  const handleApprove = async (deposit: any) => {
    try {
      setLoadingAction(deposit.id);
      await approveDeposit(deposit);
    } catch (err: any) {
      alert(err.message || "Failed to approve deposit");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleReject = async (id: string) => {
    try {
      setLoadingAction(id);
      await rejectDeposit(id);
    } catch (err: any) {
      alert(err.message || "Failed to reject deposit");
    } finally {
      setLoadingAction(null);
    }
  };

  const filteredDeposits = deposits.filter((d) =>
    `${d.userEmail} ${d.txHash} ${d.id}`
      .toLowerCase()
      .includes(search.toLowerCase()),
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
            <CreditCard size={28} color="#3b82f6" /> Deposit Requests
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
            Review and process manual deposit verifications from platform
            investors.
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
          placeholder="Search by email, transaction hash or request ID..."
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
                Investor
              </TableCell>
              <TableCell
                sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
              >
                Asset/Network
              </TableCell>
              <TableCell
                sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
              >
                Amount
              </TableCell>
              <TableCell
                sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
              >
                Tx Hash
              </TableCell>
              <TableCell
                sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
              >
                Proof
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
            {filteredDeposits.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 10 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "var(--muted-foreground)" }}
                  >
                    No deposit requests found matching your search.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredDeposits.map((d) => (
                <TableRow
                  key={d.id}
                  sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.01)" } }}
                >
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: "rgba(59, 130, 246, 0.1)",
                          color: "#3b82f6",
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
                          {d.userEmail?.split("@")[0]}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "var(--muted-foreground)" }}
                        >
                          {d.userEmail}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      fontWeight="600"
                      sx={{ color: "var(--foreground)" }}
                    >
                      {d.asset}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "var(--muted-foreground)",
                        textTransform: "uppercase",
                      }}
                    >
                      {d.network}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      fontWeight="800"
                      sx={{ color: "#22c55e" }}
                    >
                      +$
                      {Number(d.amount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title={d.txHash}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "var(--muted-foreground)",
                          fontFamily: "monospace",
                        }}
                      >
                        {d.txHash?.slice(0, 10)}...
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    {d.proofUrl ? (
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<FileText size={14} />}
                        href={d.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          borderRadius: 2,
                          py: 0.5,
                          textTransform: "none",
                          fontSize: "0.75rem",
                        }}
                      >
                        View Proof
                      </Button>
                    ) : (
                      <Typography
                        variant="caption"
                        sx={{ color: "var(--muted-foreground)" }}
                      >
                        No File
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={d.status}
                      size="small"
                      icon={
                        d.status === "approved" ? (
                          <CheckCircle2 size={12} />
                        ) : d.status === "rejected" ? (
                          <XCircle size={12} />
                        ) : (
                          <Clock size={12} />
                        )
                      }
                      sx={{
                        bgcolor:
                          d.status === "approved"
                            ? "rgba(34, 197, 94, 0.1)"
                            : d.status === "rejected"
                              ? "rgba(239, 68, 68, 0.1)"
                              : "rgba(234, 179, 8, 0.1)",
                        color:
                          d.status === "approved"
                            ? "#22c55e"
                            : d.status === "rejected"
                              ? "#ef4444"
                              : "#eab308",
                        fontWeight: 800,
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {d.status === "pending" ? (
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                      >
                        <Button
                          size="small"
                          variant="contained"
                          disabled={loadingAction === d.id}
                          onClick={() => handleApprove(d)}
                          sx={{
                            bgcolor: "#22c55e",
                            "&:hover": { bgcolor: "#16a34a" },
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 700,
                          }}
                        >
                          {loadingAction === d.id ? (
                            <CircularProgress size={16} color="inherit" />
                          ) : (
                            "Approve"
                          )}
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          disabled={loadingAction === d.id}
                          onClick={() => handleReject(d.id)}
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 700,
                          }}
                        >
                          {loadingAction === d.id ? (
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
