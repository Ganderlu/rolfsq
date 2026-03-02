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
  IconButton,
  TextField,
  InputAdornment,
  Avatar,
  Stack,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  Search,
  MoreVertical,
  UserPlus,
  UserCheck,
  UserX,
  Wallet,
  Calendar,
  Mail,
  ShieldCheck,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import {
  updateUserBalance,
  updateUserStatus,
  deleteUser,
} from "@/app/actions/admin";

export default function UsersClient({ initialUsers }: { initialUsers: any[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Balance Modal State
  const [balanceModal, setBalanceModal] = useState({
    open: false,
    userId: "",
    currentBalance: 0,
    amount: "",
  });

  const filteredUsers = users.filter((u: any) =>
    `${u.fullName} ${u.email}`.toLowerCase().includes(search.toLowerCase()),
  );

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: <UserPlus size={20} />,
      color: "#6366f1",
    },
    {
      label: "Active",
      value: users.filter((u) => u.status === "active").length,
      icon: <UserCheck size={20} />,
      color: "#22c55e",
    },
    {
      label: "Pending KYC",
      value: users.filter((u) => u.kyc === "pending").length,
      icon: <ShieldCheck size={20} />,
      color: "#eab308",
    },
    {
      label: "Inactive",
      value: users.filter((u) => u.status !== "active").length,
      icon: <UserX size={20} />,
      color: "#ef4444",
    },
  ];

  const handleAction = async (
    action: () => Promise<any>,
    successMsg: string,
  ) => {
    try {
      await action();
      setSnackbar({ open: true, message: successMsg, severity: "success" });
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.message || "Action failed",
        severity: "error",
      });
    }
  };

  const handleUpdateStatus = async (uid: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    setLoading(uid);
    await handleAction(
      () => updateUserStatus(uid, newStatus as any),
      `User status updated to ${newStatus}`,
    );
    setUsers((prev) =>
      prev.map((u) => (u.id === uid ? { ...u, status: newStatus } : u)),
    );
    setLoading(null);
  };

  const handleBalanceUpdate = async (type: "add" | "subtract") => {
    const amountNum = parseFloat(balanceModal.amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setSnackbar({
        open: true,
        message: "Please enter a valid amount",
        severity: "error",
      });
      return;
    }

    const finalAmount = type === "add" ? amountNum : -amountNum;
    setLoading(balanceModal.userId);
    const userId = balanceModal.userId; // Capture userId
    setBalanceModal((prev) => ({ ...prev, open: false }));

    try {
      const result = await updateUserBalance(userId, finalAmount);
      if (result.success) {
        setSnackbar({
          open: true,
          message: `Balance ${type === "add" ? "increased" : "decreased"} by $${amountNum}`,
          severity: "success",
        });
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId
              ? { ...u, walletBalance: (u.walletBalance || 0) + finalAmount }
              : u,
          ),
        );
      }
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.message || "Action failed",
        severity: "error",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight="800"
            sx={{
              color: "var(--foreground)",
              letterSpacing: "-0.02em",
              mb: 0.5,
            }}
          >
            User Management
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
            Monitor and manage all platform investors from one place.
          </Typography>
        </Box>
      </Stack>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((s) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={s.label}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: "var(--card)",
                border: "1px solid",
                borderColor: "var(--border)",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                gap: 2.5,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 10px 30px ${s.color}15`,
                  borderColor: s.color,
                },
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  bgcolor: `${s.color}15`,
                  color: s.color,
                  display: "flex",
                  boxShadow: `0 0 20px ${s.color}10`,
                }}
              >
                {s.icon}
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "var(--muted-foreground)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1.2,
                    fontSize: "0.65rem",
                  }}
                >
                  {s.label}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "var(--foreground)",
                    fontWeight: 800,
                    lineHeight: 1.2,
                  }}
                >
                  {s.value}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Filters & Search */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 4,
          bgcolor: "var(--card)",
          border: "1px solid",
          borderColor: "var(--border)",
          borderRadius: 4,
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          placeholder="Search by name, email or UID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} color="var(--muted-foreground)" />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "var(--background)",
              borderRadius: 3,
              "& fieldset": { borderColor: "var(--border)" },
              "&:hover fieldset": { borderColor: "primary.main" },
            },
            "& .MuiInputBase-input": {
              color: "var(--foreground)",
            },
          }}
        />
      </Paper>

      {/* Main Content */}
      {isMobile ? (
        <Stack spacing={2}>
          {filteredUsers.map((u: any) => (
            <UserCard
              key={u.id}
              user={u}
              onStatusToggle={() => handleUpdateStatus(u.id, u.status)}
              onBalanceClick={() =>
                setBalanceModal({
                  open: true,
                  userId: u.id,
                  currentBalance: u.walletBalance || 0,
                  amount: "",
                })
              }
              loading={loading === u.id}
            />
          ))}
        </Stack>
      ) : (
        <Paper
          elevation={0}
          sx={{
            bgcolor: "var(--card)",
            border: "1px solid",
            borderColor: "var(--border)",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <Table>
            <TableHead sx={{ bgcolor: "rgba(255,255,255,0.02)" }}>
              <TableRow>
                <TableCell
                  sx={{
                    color: "var(--muted-foreground)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Investor
                </TableCell>
                <TableCell
                  sx={{
                    color: "var(--muted-foreground)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Wallet
                </TableCell>
                <TableCell
                  sx={{
                    color: "var(--muted-foreground)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  KYC Status
                </TableCell>
                <TableCell
                  sx={{
                    color: "var(--muted-foreground)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    color: "var(--muted-foreground)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Joined
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: "var(--muted-foreground)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((u: any) => (
                <TableRow
                  key={u.id}
                  sx={{
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.02)",
                      "& .action-btn": { opacity: 1 },
                    },
                  }}
                >
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        sx={{
                          bgcolor: "primary.main",
                          fontWeight: 800,
                          width: 40,
                          height: 40,
                          fontSize: "0.9rem",
                          boxShadow: "0 4px 10px rgba(99, 102, 241, 0.2)",
                        }}
                      >
                        {u.fullName?.[0] || "U"}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight="700"
                          sx={{ color: "var(--foreground)" }}
                        >
                          {u.fullName || "Unnamed User"}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "var(--muted-foreground)" }}
                        >
                          {u.email}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--foreground)", fontWeight: 700 }}
                    >
                      $
                      {(u.walletBalance || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={u.kyc || "pending"}
                      size="small"
                      sx={{
                        bgcolor:
                          u.kyc === "approved"
                            ? "rgba(34, 197, 94, 0.1)"
                            : "rgba(234, 179, 8, 0.1)",
                        color: u.kyc === "approved" ? "#22c55e" : "#eab308",
                        fontWeight: 800,
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        borderRadius: 1.5,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={u.status}
                      size="small"
                      sx={{
                        bgcolor:
                          u.status === "active"
                            ? "rgba(34, 197, 94, 0.1)"
                            : "rgba(239, 68, 68, 0.1)",
                        color: u.status === "active" ? "#22c55e" : "#ef4444",
                        fontWeight: 800,
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        borderRadius: 1.5,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "var(--muted-foreground)",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                    }}
                  >
                    {u.joined}
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      <Tooltip title="Manage Balance">
                        <IconButton
                          className="action-btn"
                          size="small"
                          sx={{
                            color: "primary.main",
                            bgcolor: "rgba(99, 102, 241, 0.1)",
                            opacity: 0.6,
                            transition: "all 0.2s",
                            "&:hover": {
                              bgcolor: "primary.main",
                              color: "#fff",
                              transform: "scale(1.1)",
                            },
                          }}
                          onClick={() =>
                            setBalanceModal({
                              open: true,
                              userId: u.id,
                              currentBalance: u.walletBalance || 0,
                              amount: "",
                            })
                          }
                        >
                          <Wallet size={16} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title={
                          u.status === "active"
                            ? "Suspend Account"
                            : "Activate Account"
                        }
                      >
                        <IconButton
                          className="action-btn"
                          size="small"
                          disabled={loading === u.id}
                          sx={{
                            color:
                              u.status === "active" ? "#ef4444" : "#22c55e",
                            bgcolor:
                              u.status === "active"
                                ? "rgba(239, 68, 68, 0.1)"
                                : "rgba(34, 197, 94, 0.1)",
                            opacity: 0.6,
                            transition: "all 0.2s",
                            "&:hover": {
                              bgcolor:
                                u.status === "active" ? "#ef4444" : "#22c55e",
                              color: "#fff",
                              transform: "scale(1.1)",
                            },
                          }}
                          onClick={() => handleUpdateStatus(u.id, u.status)}
                        >
                          {loading === u.id ? (
                            <CircularProgress size={16} color="inherit" />
                          ) : u.status === "active" ? (
                            <UserX size={16} />
                          ) : (
                            <UserCheck size={16} />
                          )}
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Balance Modal */}
      <Dialog
        open={balanceModal.open}
        onClose={() => setBalanceModal((prev) => ({ ...prev, open: false }))}
        PaperProps={{
          sx: {
            bgcolor: "var(--card)",
            backgroundImage: "none",
            border: "1px solid var(--border)",
            borderRadius: 5,
            width: "100%",
            maxWidth: 400,
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "var(--foreground)",
            fontWeight: 800,
            fontSize: "1.25rem",
            pb: 1,
          }}
        >
          Manage Wallet
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 3,
              bgcolor: "rgba(99, 102, 241, 0.05)",
              border: "1px dashed rgba(99, 102, 241, 0.2)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "var(--muted-foreground)" }}
            >
              Current Balance
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "primary.main", fontWeight: 800 }}
            >
              ${balanceModal.currentBalance.toLocaleString()}
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="Adjustment Amount"
            type="number"
            value={balanceModal.amount}
            onChange={(e) =>
              setBalanceModal((prev) => ({ ...prev, amount: e.target.value }))
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography sx={{ color: "var(--muted-foreground)" }}>
                    $
                  </Typography>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                bgcolor: "var(--background)",
              },
              "& .MuiInputLabel-root": { color: "var(--muted-foreground)" },
              "& .MuiInputBase-input": { color: "var(--foreground)" },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0, gap: 1.5 }}>
          <Button
            fullWidth
            variant="contained"
            color="error"
            startIcon={<Minus size={18} />}
            onClick={() => handleBalanceUpdate("subtract")}
            sx={{
              borderRadius: 3,
              py: 1.2,
              fontWeight: 700,
              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)",
            }}
          >
            Deduct
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="success"
            startIcon={<Plus size={18} />}
            onClick={() => handleBalanceUpdate("add")}
            sx={{
              borderRadius: 3,
              py: 1.2,
              fontWeight: 700,
              boxShadow: "0 4px 12px rgba(34, 197, 94, 0.2)",
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", borderRadius: 3 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function UserCard({ user, onStatusToggle, onBalanceClick, loading }: any) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        bgcolor: "var(--card)",
        border: "1px solid",
        borderColor: "var(--border)",
        borderRadius: 5,
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Stack spacing={2.5}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              bgcolor: "primary.main",
              fontWeight: 800,
              width: 48,
              height: 48,
              boxShadow: "0 4px 10px rgba(99, 102, 241, 0.2)",
            }}
          >
            {user.fullName?.[0] || "U"}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="body1"
              fontWeight="800"
              sx={{ color: "var(--foreground)", lineHeight: 1.2 }}
            >
              {user.fullName || "Unnamed"}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "var(--muted-foreground)" }}
            >
              {user.email}
            </Typography>
          </Box>
          <Chip
            label={user.status}
            size="small"
            sx={{
              bgcolor:
                user.status === "active"
                  ? "rgba(34, 197, 94, 0.1)"
                  : "rgba(239, 68, 68, 0.1)",
              color: user.status === "active" ? "#22c55e" : "#ef4444",
              fontWeight: 800,
              fontSize: "0.65rem",
              textTransform: "uppercase",
              borderRadius: 1.5,
            }}
          />
        </Stack>

        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: "var(--background)",
            border: "1px solid var(--border)",
          }}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "var(--muted-foreground)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: "0.6rem",
                  letterSpacing: 0.5,
                  display: "block",
                  mb: 0.5,
                }}
              >
                Balance
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "var(--foreground)", fontWeight: 800 }}
              >
                ${(user.walletBalance || 0).toLocaleString()}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "var(--muted-foreground)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: "0.6rem",
                  letterSpacing: 0.5,
                  display: "block",
                  mb: 0.5,
                }}
              >
                KYC
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: user.kyc === "approved" ? "#22c55e" : "#eab308",
                  fontWeight: 800,
                  textTransform: "capitalize",
                }}
              >
                {user.kyc || "Pending"}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button
            fullWidth
            variant="outlined"
            size="medium"
            startIcon={<Wallet size={18} />}
            onClick={onBalanceClick}
            sx={{
              borderRadius: 3,
              borderColor: "var(--border)",
              color: "var(--foreground)",
              fontWeight: 700,
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "rgba(99, 102, 241, 0.05)",
              },
            }}
          >
            Balance
          </Button>
          <Button
            fullWidth
            variant="contained"
            size="medium"
            color={user.status === "active" ? "error" : "success"}
            disabled={loading}
            onClick={onStatusToggle}
            sx={{
              borderRadius: 3,
              fontWeight: 700,
              boxShadow:
                user.status === "active"
                  ? "0 4px 12px rgba(239, 68, 68, 0.2)"
                  : "0 4px 12px rgba(34, 197, 94, 0.2)",
            }}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : user.status === "active" ? (
              "Suspend"
            ) : (
              "Activate"
            )}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
