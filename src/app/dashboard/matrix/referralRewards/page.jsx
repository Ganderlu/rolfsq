"use client";

import {
  Box,
  Typography,
  TextField,
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
  CircularProgress,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { auth, db } from "@/app/firebase/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";

export default function ReferralRewardsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      // Query 'referralRewards' collection
      // Ensure you have this collection or adjust to 'transactions' where type == 'referral'
      const q = query(
        collection(db, "referralRewards"),
        where("userId", "==", user.uid)
        // orderBy("createdAt", "desc") // Requires index, use client-side sort if needed initially
      );

      const unsubscribe = onSnapshot(q, (snap) => {
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        }));
        setRewards(data.sort((a, b) => b.createdAt - a.createdAt));
        setLoading(false);
      });

      return () => unsubscribe();
    });

    return () => unsubscribeAuth();
  }, []);

  const filteredRewards = rewards.filter((r) =>
    r.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, color: "text.primary", minHeight: "100vh" }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Referral Rewards
      </Typography>

      {/* Filters */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
        }}
      >
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          alignItems="center"
        >
          <TextField
            fullWidth
            placeholder="Search Reward ID"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{
              bgcolor: "#ff7a00",
              color: "#fff",
              px: 4,
              width: isMobile ? "100%" : "auto",
              "&:hover": { bgcolor: "#e66e00" },
            }}
          >
            Search
          </Button>
        </Stack>
      </Paper>

      {/* Table */}
      <Paper
        sx={{
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Date",
                "Reward ID",
                "From User",
                "Plan",
                "Amount",
                "Status",
              ].map((head) => (
                <TableCell key={head} sx={{ color: "text.secondary", fontWeight: 600 }}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <CircularProgress size={30} sx={{ color: "#ff7a00" }} />
                </TableCell>
              </TableRow>
            ) : filteredRewards.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{ color: "text.secondary", py: 4 }}
                >
                  No Referral Rewards Found
                </TableCell>
              </TableRow>
            ) : (
              filteredRewards.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ color: "text.primary" }}>
                    {row.createdAt?.toLocaleDateString() || "N/A"}
                  </TableCell>
                  <TableCell sx={{ color: "text.secondary", fontSize: 12 }}>
                    {row.id.substring(0, 8)}...
                  </TableCell>
                  <TableCell sx={{ color: "text.primary" }}>
                    {row.fromUser || "Anonymous"}
                  </TableCell>
                  <TableCell sx={{ color: "text.primary" }}>
                    {row.planTitle || "N/A"}
                  </TableCell>
                  <TableCell sx={{ color: "#4caf50", fontWeight: "bold" }}>
                    +${row.amount}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.status || "COMPLETED"}
                      size="small"
                      sx={{
                        bgcolor: "rgba(76, 175, 80, 0.1)",
                        color: "#4caf50",
                        fontWeight: "bold",
                        border: "1px solid rgba(76, 175, 80, 0.2)",
                      }}
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
