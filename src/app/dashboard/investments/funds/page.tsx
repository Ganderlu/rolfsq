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
  CircularProgress,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "@/app/firebase/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";

export default function TransactionsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [investments, setInvestments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      // Create a query against the collection.
      // Note: If you see an index error in console, you might need to create an index
      // or remove orderBy until the index is created.
      // For now we'll fetch then sort client-side to avoid index issues during dev.
      const q = query(
        collection(db, "investments"),
        where("userId", "==", user.uid)
      );

      const unsubscribe = onSnapshot(q, (snap) => {
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        }));
        // Client-side sort by date descending
        data.sort((a, b) => b.createdAt - a.createdAt);
        setInvestments(data);
        setLoading(false);
      });

      return () => unsubscribe();
    });

    return () => unsubscribeAuth();
  }, []);

  const filteredInvestments = investments.filter((inv) =>
    inv.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        color: "var(--foreground)",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Investment Records
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
            placeholder="Search by ID"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ sx: { color: "var(--foreground)" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "var(--border)" },
                "&:hover fieldset": { borderColor: "var(--primary)" },
                "&.Mui-focused fieldset": { borderColor: "var(--primary)" },
              },
            }}
          />

          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{
              background: "#ff8a00",
              px: 4,
              width: isMobile ? "100%" : "auto",
              "&:hover": { background: "#ff9533" },
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
                "Initiated At",
                "Plan",
                "Amount",
                "Interest",
                "Duration",
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
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <CircularProgress size={30} sx={{ color: "#ff7a00" }} />
                </TableCell>
              </TableRow>
            ) : filteredInvestments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{ color: "var(--muted-foreground)", py: 4 }}
                >
                  No Data Found
                </TableCell>
              </TableRow>
            ) : (
              filteredInvestments.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ color: "var(--foreground)" }}>
                    {row.createdAt?.toLocaleDateString() || "N/A"}
                    <Typography variant="caption" display="block" color="gray">
                      {row.createdAt?.toLocaleTimeString()}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "var(--foreground)" }}>
                    {row.planName || "N/A"}
                  </TableCell>
                  <TableCell sx={{ color: "#00ff00" }}>
                    ${row.amount?.toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ color: "var(--foreground)" }}>
                    {row.interest || "0%"}
                  </TableCell>
                  <TableCell sx={{ color: "var(--foreground)" }}>
                    {row.duration || "N/A"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.status || "active"}
                      size="small"
                      sx={{
                        bgcolor:
                          row.status === "completed"
                            ? "rgba(0, 255, 0, 0.1)"
                            : "rgba(255, 165, 0, 0.1)",
                        color:
                          row.status === "completed" ? "#00ff00" : "#ffa500",
                        textTransform: "capitalize",
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
