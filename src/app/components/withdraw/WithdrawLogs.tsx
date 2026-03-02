import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Box,
  Typography,
  Stack,
  Skeleton,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Calendar, Wallet, DollarSign, ArrowRight } from "lucide-react";

export default function WithdrawalHistory() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { currentUser } = useAuth();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "withdrawals"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc"),
    );

    const unsub = onSnapshot(q, (snap) => {
      setRows(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          date: d.data().createdAt?.toDate()?.toLocaleDateString() || "-",
        })),
      );
      setLoading(false);
    });

    return () => unsub();
  }, [currentUser]);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton
          variant="rectangular"
          height={200}
          sx={{ borderRadius: 2, bgcolor: "rgba(255,255,255,0.05)" }}
        />
      </Box>
    );
  }

  if (rows.length === 0) {
    return (
      <Box sx={{ p: 8, textAlign: "center" }}>
        <Typography sx={{ color: "var(--muted-foreground)" }}>
          No withdrawal requests found.
        </Typography>
      </Box>
    );
  }

  if (isMobile) {
    return (
      <Stack spacing={2} sx={{ p: 2 }}>
        {rows.map((row) => (
          <Box
            key={row.id}
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              sx={{ mb: 2 }}
            >
              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight="700"
                  sx={{ color: "#ffffff" }}
                >
                  {row.asset}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Calendar size={12} color="var(--muted-foreground)" />
                  <Typography
                    variant="caption"
                    sx={{ color: "var(--muted-foreground)" }}
                  >
                    {row.date}
                  </Typography>
                </Stack>
              </Box>
              <Chip
                label={row.status}
                size="small"
                sx={{
                  bgcolor:
                    row.status === "approved"
                      ? "rgba(34, 197, 94, 0.1)"
                      : row.status === "rejected"
                        ? "rgba(239, 68, 68, 0.1)"
                        : "rgba(234, 179, 8, 0.1)",
                  color:
                    row.status === "approved"
                      ? "#22c55e"
                      : row.status === "rejected"
                        ? "#ef4444"
                        : "#eab308",
                  fontWeight: 700,
                  fontSize: "0.65rem",
                  textTransform: "capitalize",
                }}
              />
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 1.5 }}
            >
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "var(--muted-foreground)", display: "block" }}
                >
                  Amount
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="600"
                  sx={{ color: "#ffffff" }}
                >
                  ${row.amount?.toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography
                  variant="caption"
                  sx={{ color: "var(--muted-foreground)", display: "block" }}
                >
                  Receivable
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="700"
                  sx={{ color: "#22c55e" }}
                >
                  ${row.receiveAmount?.toLocaleString()}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.05)" }} />

            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: "var(--muted-foreground)",
                  display: "block",
                  mb: 0.5,
                }}
              >
                Wallet Address
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Wallet size={12} color="var(--muted-foreground)" />
                <Typography
                  variant="caption"
                  sx={{
                    color: "var(--muted-foreground)",
                    wordBreak: "break-all",
                  }}
                >
                  {row.address}
                </Typography>
              </Stack>
            </Box>
          </Box>
        ))}
      </Stack>
    );
  }

  return (
    <Box sx={{ overflowX: "auto" }}>
      <Table>
        <TableHead sx={{ bgcolor: "rgba(255,255,255,0.02)" }}>
          <TableRow>
            <TableCell
              sx={{
                color: "var(--muted-foreground)",
                fontWeight: 600,
                borderBottom: "1px solid var(--border)",
              }}
            >
              Asset
            </TableCell>
            <TableCell
              sx={{
                color: "var(--muted-foreground)",
                fontWeight: 600,
                borderBottom: "1px solid var(--border)",
              }}
            >
              Amount
            </TableCell>
            <TableCell
              sx={{
                color: "var(--muted-foreground)",
                fontWeight: 600,
                borderBottom: "1px solid var(--border)",
              }}
            >
              Fee (2%)
            </TableCell>
            <TableCell
              sx={{
                color: "var(--muted-foreground)",
                fontWeight: 600,
                borderBottom: "1px solid var(--border)",
              }}
            >
              Receivable
            </TableCell>
            <TableCell
              sx={{
                color: "var(--muted-foreground)",
                fontWeight: 600,
                borderBottom: "1px solid var(--border)",
              }}
            >
              Address
            </TableCell>
            <TableCell
              sx={{
                color: "var(--muted-foreground)",
                fontWeight: 600,
                borderBottom: "1px solid var(--border)",
              }}
            >
              Date
            </TableCell>
            <TableCell
              sx={{
                color: "var(--muted-foreground)",
                fontWeight: 600,
                borderBottom: "1px solid var(--border)",
              }}
            >
              Status
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.01)" } }}
            >
              <TableCell
                sx={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
              >
                <Typography
                  variant="body2"
                  fontWeight="600"
                  sx={{ color: "#ffffff" }}
                >
                  {row.asset}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid rgba(255,255,255,0.03)",
                  color: "#ffffff",
                }}
              >
                ${row.amount?.toLocaleString()}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid rgba(255,255,255,0.03)",
                  color: "#ef4444",
                }}
              >
                -${row.fee?.toFixed(2)}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid rgba(255,255,255,0.03)",
                  color: "#22c55e",
                  fontWeight: "700",
                }}
              >
                ${row.receiveAmount?.toLocaleString()}
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Wallet size={14} color="var(--muted-foreground)" />
                  <Typography
                    variant="caption"
                    sx={{
                      color: "var(--muted-foreground)",
                      maxWidth: 120,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.address}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Calendar size={14} color="var(--muted-foreground)" />
                  <Typography
                    variant="caption"
                    sx={{ color: "var(--muted-foreground)" }}
                  >
                    {row.date}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
              >
                <Chip
                  label={row.status}
                  size="small"
                  sx={{
                    bgcolor:
                      row.status === "approved"
                        ? "rgba(34, 197, 94, 0.1)"
                        : row.status === "rejected"
                          ? "rgba(239, 68, 68, 0.1)"
                          : "rgba(234, 179, 8, 0.1)",
                    color:
                      row.status === "approved"
                        ? "#22c55e"
                        : row.status === "rejected"
                          ? "#ef4444"
                          : "#eab308",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    textTransform: "capitalize",
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
