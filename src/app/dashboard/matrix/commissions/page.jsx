"use client";

import { useState, useEffect } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { db, auth } from "@/app/firebase/firebaseClient";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function CommissionsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTrx, setSearchTrx] = useState("");
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "commissions"),
        where("userId", "==", user.uid)
      );

      const unsubscribe = onSnapshot(q, (snap) => {
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        }));
        // Client-side sort by date desc
        setCommissions(data.sort((a, b) => b.createdAt - a.createdAt));
        setLoading(false);
      });

      return () => unsubscribe();
    });

    return () => unsubscribeAuth();
  }, []);

  const filteredCommissions = commissions.filter((comm) => {
    const matchesTrx = comm.transactionId
      ?.toLowerCase()
      .includes(searchTrx.toLowerCase());
    
    // Simple date string match if date is selected
    let matchesDate = true;
    if (searchDate && comm.createdAt) {
      const commDate = comm.createdAt.toISOString().split('T')[0];
      matchesDate = commDate === searchDate;
    }

    return (searchTrx === "" || matchesTrx) && matchesDate;
  });

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, color: "white" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Level Commissions
      </Typography>

      {/* Filters */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          alignItems="center"
        >
          <TextField
            fullWidth
            placeholder="Trx ID"
            size="small"
            value={searchTrx}
            onChange={(e) => setSearchTrx(e.target.value)}
            InputProps={{ sx: { color: "white" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                "&:hover fieldset": { borderColor: "rgba(255,255,255,0.4)" },
                "&.Mui-focused fieldset": { borderColor: "#ff8a00" },
              },
              "& input": { color: "white" },
            }}
          />

          <TextField 
            type="date" 
            size="small" 
            fullWidth={isMobile}
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                "&:hover fieldset": { borderColor: "rgba(255,255,255,0.4)" },
                "&.Mui-focused fieldset": { borderColor: "#ff8a00" },
              },
              "& input": { color: "white" },
            }}
          />

          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{
              background: "#ff8a00",
              px: 4,
              width: isMobile ? "100%" : "auto",
              "&:hover": { background: "#e57c00" },
            }}
          >
            Search
          </Button>
        </Stack>
      </Paper>

      {/* Table */}
      <Paper
        sx={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Initiated At",
                "Trx",
                "Users",
                "Amount",
                "Details",
              ].map((head) => (
                <TableCell key={head} sx={{ color: "white", fontWeight: "bold" }}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  <CircularProgress size={30} sx={{ color: "#ff8a00" }} />
                </TableCell>
              </TableRow>
            ) : filteredCommissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ color: "gray", py: 3 }}>
                  No Data Found
                </TableCell>
              </TableRow>
            ) : (
              filteredCommissions.map((comm) => (
                <TableRow key={comm.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell sx={{ color: "rgba(255,255,255,0.7)" }}>
                    {comm.createdAt?.toLocaleString() || "-"}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {comm.transactionId || "-"}
                  </TableCell>
                  <TableCell sx={{ color: "rgba(255,255,255,0.7)" }}>
                    {comm.fromUser || "-"}
                  </TableCell>
                  <TableCell sx={{ color: "#4caf50", fontWeight: "bold" }}>
                    {comm.amount ? `$${comm.amount}` : "-"}
                  </TableCell>
                  <TableCell sx={{ color: "rgba(255,255,255,0.7)" }}>
                    {comm.details || "-"}
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
