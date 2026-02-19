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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/app/firebase/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";

export default function TransactionsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [deposits, setDeposits] = useState<any[]>([]);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      // Fetch Deposits
      const qDeposits = query(
        collection(db, "deposits"),
        where("userId", "==", user.uid),
      );

      const unsubDeposits = onSnapshot(qDeposits, (snap) => {
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          type: "DEPOSIT",
          ...doc.data(),
          date: doc.data().createdAt?.toDate(),
        }));
        setDeposits(data);
      });

      // Fetch Withdrawals
      const qWithdrawals = query(
        collection(db, "withdrawals"),
        where("userId", "==", user.uid),
      );

      const unsubWithdrawals = onSnapshot(qWithdrawals, (snap) => {
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          type: "WITHDRAWAL",
          ...doc.data(),
          date: doc.data().createdAt?.toDate(),
        }));
        setWithdrawals(data);
        setLoading(false);
      });

      return () => {
        unsubDeposits();
        unsubWithdrawals();
      };
    });

    return () => unsubscribeAuth();
  }, []);

  // Merge, Sort, and Filter
  const allTransactions = [...deposits, ...withdrawals]
    .sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0))
    .filter((t) => {
      const matchesType =
        filterType === "ALL" ||
        (filterType === "DEPOSIT" && t.type === "DEPOSIT") ||
        (filterType === "WITHDRAW" && t.type === "WITHDRAWAL");

      const matchesSearch =
        searchTerm === "" ||
        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.txHash && t.txHash.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesType && matchesSearch;
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        color: "var(--foreground)",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Transactions
      </Typography>

      {/* Filters */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          bgcolor: "var(--card)",
          color: "var(--card-foreground)",
          border: "1px solid",
          borderColor: "var(--border)",
          borderRadius: 3,
        }}
      >
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          alignItems="center"
        >
          <TextField
            fullWidth
            placeholder="Search Trx ID"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <TextField
            select
            size="small"
            fullWidth={isMobile}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="ALL">ALL TYPES</MenuItem>
            <MenuItem value="DEPOSIT">DEPOSIT</MenuItem>
            <MenuItem value="WITHDRAW">WITHDRAWAL</MenuItem>
          </TextField>

          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              px: 4,
              width: isMobile ? "100%" : "auto",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            Search
          </Button>
        </Stack>
      </Paper>

      {/* Table */}
      <Paper
        sx={{
          bgcolor: "var(--card)",
          color: "var(--card-foreground)",
          border: "1px solid",
          borderColor: "var(--border)",
          overflowX: "auto",
          borderRadius: 3,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Date",
                "Trx ID",
                "Type",
                "Amount",
                "Asset/Network",
                "Status",
              ].map((head) => (
                <TableCell
                  key={head}
                  sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                  <TableCell colSpan={6} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : allTransactions.length === 0 ? (
              <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                    sx={{ color: "var(--muted-foreground)", py: 4 }}
                  >
                  No Transactions Found
                </TableCell>
              </TableRow>
            ) : (
              allTransactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell sx={{ color: "var(--foreground)" }}>
                    {t.date?.toLocaleDateString() || "N/A"}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "var(--muted-foreground)",
                      fontSize: 12,
                      maxWidth: 100,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={t.txHash || t.id}
                  >
                    {t.txHash || t.id}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={t.type}
                      size="small"
                      variant="outlined"
                      color={t.type === "DEPOSIT" ? "success" : "info"}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "text.primary", fontWeight: 600 }}>
                    ${t.amount}
                  </TableCell>
                  <TableCell sx={{ color: "text.secondary" }}>
                    {t.asset ? `${t.asset} (${t.network})` : "USDT"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={t.status?.toUpperCase()}
                      size="small"
                      color={getStatusColor(t.status)}
                    />
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
