"use client";

import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  Stack,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Card,
  Grid,
  Avatar,
  TextField,
  InputAdornment,
} from "@mui/material";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { useEffect, useState } from "react";
import {
  Grid3X3,
  Search,
  User,
  Calendar,
  TrendingUp,
  Award,
  Activity,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function AdminMatrixSchemePage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const q = query(
      collection(db, "matrixEnrollments"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }));
      setEnrollments(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredEnrollments = enrollments.filter((e) =>
    `${e.planTitle} ${e.userId} ${e.id}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

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
            <Grid3X3 size={28} color="#eab308" /> Matrix Scheme
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
            Monitor multi-level network enrollments and aggregate commission
            distributions.
          </Typography>
        </Box>
      </Stack>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              bgcolor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 4,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: "rgba(234, 179, 8, 0.1)",
                  color: "#eab308",
                }}
              >
                <Award size={20} />
              </Box>
              <Typography
                variant="caption"
                fontWeight="700"
                sx={{
                  color: "var(--muted-foreground)",
                  textTransform: "uppercase",
                }}
              >
                Total Enrollments
              </Typography>
            </Stack>
            <Typography
              variant="h4"
              fontWeight="900"
              sx={{ color: "var(--foreground)" }}
            >
              {enrollments.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              bgcolor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 4,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: "rgba(34, 197, 94, 0.1)",
                  color: "#22c55e",
                }}
              >
                <CheckCircle2 size={20} />
              </Box>
              <Typography
                variant="caption"
                fontWeight="700"
                sx={{
                  color: "var(--muted-foreground)",
                  textTransform: "uppercase",
                }}
              >
                Active Plans
              </Typography>
            </Stack>
            <Typography variant="h4" fontWeight="900" sx={{ color: "#22c55e" }}>
              {
                enrollments.filter((e) => e.status === "active" || !e.status)
                  .length
              }
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Filter */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 4,
          bgcolor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 4,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search by plan, user ID or request ID..."
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
          border: "1px solid var(--border)",
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
                Enrollment Date
              </TableCell>
              <TableCell
                sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
              >
                Investor
              </TableCell>
              <TableCell
                sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
              >
                Plan Package
              </TableCell>
              <TableCell
                sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
              >
                Amount
              </TableCell>
              <TableCell
                sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
              >
                Commission
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEnrollments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "var(--muted-foreground)" }}
                  >
                    No matrix enrollments found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredEnrollments.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.01)" } }}
                >
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Calendar size={14} color="var(--muted-foreground)" />
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ color: "var(--foreground)" }}
                        >
                          {row.createdAt?.toLocaleDateString()}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "var(--muted-foreground)" }}
                        >
                          {row.createdAt?.toLocaleTimeString()}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: "rgba(234, 179, 8, 0.1)",
                          color: "#eab308",
                        }}
                      >
                        <User size={16} />
                      </Avatar>
                      <Typography
                        variant="body2"
                        fontWeight="600"
                        sx={{ color: "var(--foreground)" }}
                      >
                        {row.userId?.slice(0, 12)}...
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      fontWeight="800"
                      sx={{ color: "var(--foreground)" }}
                    >
                      {row.planTitle}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      fontWeight="800"
                      sx={{ color: "#eab308" }}
                    >
                      ${row.amount?.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      fontWeight="800"
                      sx={{ color: "#22c55e" }}
                    >
                      +${row.commission?.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={row.status || "active"}
                      size="small"
                      icon={
                        row.status === "active" || !row.status ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <Clock size={12} />
                        )
                      }
                      sx={{
                        bgcolor:
                          row.status === "active" || !row.status
                            ? "rgba(34, 197, 94, 0.1)"
                            : "rgba(255, 255, 255, 0.05)",
                        color:
                          row.status === "active" || !row.status
                            ? "#22c55e"
                            : "var(--muted-foreground)",
                        fontWeight: 800,
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
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
