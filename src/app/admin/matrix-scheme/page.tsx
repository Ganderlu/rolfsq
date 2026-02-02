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
} from "@mui/material";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { useEffect, useState } from "react";

export default function AdminMatrixSchemePage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const q = query(
      collection(db, "matrixEnrollments"),
      orderBy("createdAt", "desc")
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

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Matrix Scheme Enrollments
      </Typography>

      {/* Stats Overview */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, bgcolor: "#1e1e1e", color: "white" }}>
            <Typography variant="subtitle2" color="gray">
              Total Enrollments
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {enrollments.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, bgcolor: "#1e1e1e", color: "white" }}>
            <Typography variant="subtitle2" color="gray">
              Active Plans
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="#00e676">
              {enrollments.filter((e) => e.status === "active").length}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Mobile View - Cards */}
      {isMobile ? (
        <Stack spacing={2}>
          {enrollments.map((row) => (
            <Card
              key={row.id}
              sx={{
                p: 2,
                bgcolor: "#1e1e1e",
                color: "white",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Stack spacing={1}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1" fontWeight="bold" color="#ff7a00">
                    {row.planTitle}
                  </Typography>
                  <Chip
                    label={row.status || "active"}
                    size="small"
                    sx={{
                      bgcolor:
                        row.status === "active"
                          ? "rgba(0, 230, 118, 0.1)"
                          : "rgba(255, 255, 255, 0.1)",
                      color: row.status === "active" ? "#00e676" : "gray",
                      textTransform: "capitalize",
                    }}
                  />
                </Box>
                <Typography variant="body2" color="gray">
                  User ID: {row.userId}
                </Typography>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2">Amount: ${row.amount}</Typography>
                  <Typography variant="body2">
                    Commission: ${row.commission}
                  </Typography>
                </Box>
                <Typography variant="caption" color="gray" sx={{ mt: 1 }}>
                  {row.createdAt?.toLocaleString()}
                </Typography>
              </Stack>
            </Card>
          ))}
          {enrollments.length === 0 && (
            <Typography align="center" color="gray">
              No enrollments found.
            </Typography>
          )}
        </Stack>
      ) : (
        /* Desktop View - Table */
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            bgcolor: "#1e1e1e",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: "#2d2d2d", color: "white" }}>
                  Date
                </TableCell>
                <TableCell sx={{ bgcolor: "#2d2d2d", color: "white" }}>
                  User ID
                </TableCell>
                <TableCell sx={{ bgcolor: "#2d2d2d", color: "white" }}>
                  Plan
                </TableCell>
                <TableCell sx={{ bgcolor: "#2d2d2d", color: "white" }}>
                  Amount
                </TableCell>
                <TableCell sx={{ bgcolor: "#2d2d2d", color: "white" }}>
                  Commission
                </TableCell>
                <TableCell sx={{ bgcolor: "#2d2d2d", color: "white" }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrollments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                    sx={{ color: "gray", py: 3 }}
                  >
                    No enrollments found
                  </TableCell>
                </TableRow>
              ) : (
                enrollments.map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{
                      "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                    }}
                  >
                    <TableCell sx={{ color: "white" }}>
                      {row.createdAt?.toLocaleDateString()}{" "}
                      <Typography variant="caption" color="gray">
                        {row.createdAt?.toLocaleTimeString()}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: "gray", fontSize: "0.875rem" }}>
                      {row.userId}
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      {row.planTitle}
                    </TableCell>
                    <TableCell sx={{ color: "#ff7a00" }}>
                      ${row.amount?.toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ color: "#00e676" }}>
                      ${row.commission?.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.status || "active"}
                        size="small"
                        sx={{
                          bgcolor:
                            row.status === "active"
                              ? "rgba(0, 230, 118, 0.1)"
                              : "rgba(255, 255, 255, 0.1)",
                          color: row.status === "active" ? "#00e676" : "gray",
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
      )}
    </Box>
  );
}
