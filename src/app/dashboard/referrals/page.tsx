"use client";

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  InputAdornment,
  Tooltip,
  Avatar,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
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
import {
  Copy,
  Users,
  DollarSign,
  TrendingUp,
  Share2,
  CheckCircle2,
  ExternalLink,
  Award,
  History,
  UserPlus,
} from "lucide-react";

type ReferredUser = {
  id: string;
  fullName?: string;
  email?: string;
  joined?: string;
  status?: string;
};

type RewardTransaction = {
  id: string;
  amount: number;
  type: string;
  timestamp: any;
  referredUserEmail?: string;
};

export default function ReferralsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [copyLabel, setCopyLabel] = useState("Copy Link");

  const [referredUsers, setReferredUsers] = useState<ReferredUser[]>([]);
  const [rewardTransactions, setRewardTransactions] = useState<
    RewardTransaction[]
  >([]);
  const [totalReferralRewards, setTotalReferralRewards] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const uid = user.uid;
      setReferralCode(uid);

      if (typeof window !== "undefined") {
        const origin = window.location.origin;
        setReferralLink(`${origin}/register?ref=${uid}`);
      }

      const usersQuery = query(
        collection(db, "users"),
        where("referredBy", "==", uid),
      );

      const rewardsQuery = query(
        collection(db, "referralRewards"),
        where("userId", "==", uid),
        orderBy("timestamp", "desc"),
      );

      const unsubscribeUsers = onSnapshot(usersQuery, (snap) => {
        const users: ReferredUser[] = snap.docs.map((doc) => {
          const data = doc.data() as any;
          return {
            id: doc.id,
            fullName: data.fullName || data.username || "User",
            email: data.email || "",
            joined: data.createdAt?.toDate().toLocaleDateString() || "-",
            status: data.status || "active",
          };
        });
        setReferredUsers(users);
      });

      const unsubscribeRewards = onSnapshot(rewardsQuery, (snap) => {
        let total = 0;
        const txs: RewardTransaction[] = snap.docs.map((doc) => {
          const data = doc.data() as any;
          total += Number(data.amount) || 0;
          return {
            id: doc.id,
            amount: data.amount,
            type: data.type,
            timestamp: data.timestamp?.toDate().toLocaleString() || "-",
            referredUserEmail: data.referredUserEmail,
          };
        });
        setRewardTransactions(txs);
        setTotalReferralRewards(total);
        setLoading(false);
      });

      return () => {
        unsubscribeUsers();
        unsubscribeRewards();
      };
    });

    return () => unsubscribeAuth();
  }, []);

  const handleCopy = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopyLabel("Copied!");
      setTimeout(() => setCopyLabel("Copy Link"), 2000);
    } catch {
      setCopyLabel("Failed");
      setTimeout(() => setCopyLabel("Copy Link"), 2000);
    }
  };

  const stats = [
    {
      label: "Total Referrals",
      value: referredUsers.length,
      icon: <Users size={20} />,
      color: "#6366f1",
      desc: "Users joined via your link",
    },
    {
      label: "Earned Rewards",
      value: `$${totalReferralRewards.toFixed(2)}`,
      icon: <DollarSign size={20} />,
      color: "#22c55e",
      desc: "Total commission earned",
    },
    {
      label: "Active Network",
      value: referredUsers.filter((u) => u.status === "active").length,
      icon: <TrendingUp size={20} />,
      color: "#eab308",
      desc: "Currently active traders",
    },
  ];

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
            fontWeight="700"
            sx={{ color: "#ffffff", mb: 0.5 }}
          >
            Refer & Earn
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
            Invite your friends to Rolfsq and earn a $5.00 bonus for every
            successful registration.
          </Typography>
        </Box>
        {!isMobile && (
          <Button
            variant="contained"
            startIcon={<Share2 size={18} />}
            sx={{
              borderRadius: 3,
              bgcolor: "primary.main",
              px: 3,
              py: 1.2,
              boxShadow: "0 4px 14px 0 rgba(99, 102, 241, 0.39)",
            }}
          >
            Share Program
          </Button>
        )}
      </Stack>

      {/* Referral Link Section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          bgcolor: "var(--card)",
          border: "1px solid",
          borderColor: "var(--border)",
          borderRadius: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{
              color: "#ffffff",
              mb: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Award size={20} color="#eab308" /> Your Referral Link
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--muted-foreground)", mb: 3, maxWidth: 600 }}
          >
            Share this link with your network. When they sign up, you'll both
            start benefiting from the community rewards program.
          </Typography>

          <Stack direction={isMobile ? "column" : "row"} spacing={2}>
            <TextField
              fullWidth
              value={referralLink || "Sign in to see your referral link"}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <ExternalLink size={18} color="var(--muted-foreground)" />
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: "rgba(255,255,255,0.03)",
                  borderRadius: 3,
                  "& fieldset": { borderColor: "var(--border)" },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleCopy}
              startIcon={
                copyLabel === "Copied!" ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <Copy size={18} />
                )
              }
              sx={{
                minWidth: 160,
                borderRadius: 3,
                bgcolor: copyLabel === "Copied!" ? "#22c55e" : "primary.main",
                "&:hover": {
                  bgcolor: copyLabel === "Copied!" ? "#16a34a" : "primary.dark",
                },
                transition: "all 0.2s",
              }}
            >
              {copyLabel}
            </Button>
          </Stack>
        </Box>
        {/* Background Accent */}
        <Box
          sx={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 150,
            height: 150,
            borderRadius: "50%",
            bgcolor: "primary.main",
            opacity: 0.05,
            filter: "blur(40px)",
          }}
        />
      </Paper>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((s) => (
          <Grid size={{ xs: 12, md: 4 }} key={s.label}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: "var(--card)",
                border: "1px solid",
                borderColor: "var(--border)",
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  sx={{
                    p: 1.2,
                    borderRadius: 2.5,
                    bgcolor: `${s.color}15`,
                    color: s.color,
                    display: "flex",
                  }}
                >
                  {s.icon}
                </Box>
                <Typography
                  variant="h4"
                  fontWeight="700"
                  sx={{ color: "#ffffff" }}
                >
                  {s.value}
                </Typography>
              </Stack>
              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight="700"
                  sx={{ color: "#ffffff" }}
                >
                  {s.label}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "var(--muted-foreground)" }}
                >
                  {s.desc}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Tabs Section */}
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
        <Box sx={{ borderBottom: "1px solid var(--border)", px: 2 }}>
          <Tabs
            value={tabValue}
            onChange={(_, val) => setTabValue(val)}
            sx={{
              "& .MuiTab-root": { color: "var(--muted-foreground)", py: 2.5 },
              "& .Mui-selected": { color: "primary.main" },
              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
            }}
          >
            <Tab
              icon={<UserPlus size={18} />}
              iconPosition="start"
              label="Referred Users"
            />
            <Tab
              icon={<History size={18} />}
              iconPosition="start"
              label="Reward Transactions"
            />
          </Tabs>
        </Box>

        <Box sx={{ overflowX: "auto" }}>
          {tabValue === 0 ? (
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
                    User
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "var(--muted-foreground)",
                      fontWeight: 600,
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    Joined Date
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
                  <TableCell
                    align="right"
                    sx={{
                      color: "var(--muted-foreground)",
                      fontWeight: 600,
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    Account Type
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                      <Typography sx={{ color: "var(--muted-foreground)" }}>
                        Fetching referral data...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : referredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 10 }}>
                      <Stack spacing={1} alignItems="center">
                        <Users size={40} color="var(--border)" />
                        <Typography
                          sx={{ color: "var(--muted-foreground)", mt: 1 }}
                        >
                          No referred users found.
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ) : (
                  referredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.01)" } }}
                    >
                      <TableCell
                        sx={{
                          borderBottom: "1px solid rgba(255,255,255,0.03)",
                        }}
                      >
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              bgcolor: "rgba(99, 102, 241, 0.2)",
                              color: "primary.main",
                              fontWeight: 700,
                            }}
                          >
                            {user.fullName?.[0] || "U"}
                          </Avatar>
                          <Box>
                            <Typography
                              variant="body2"
                              fontWeight="600"
                              sx={{ color: "#ffffff" }}
                            >
                              {user.fullName}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "var(--muted-foreground)" }}
                            >
                              {user.email}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "var(--muted-foreground)",
                          fontSize: "0.875rem",
                          borderBottom: "1px solid rgba(255,255,255,0.03)",
                        }}
                      >
                        {user.joined}
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid rgba(255,255,255,0.03)",
                        }}
                      >
                        <Chip
                          label={user.status}
                          size="small"
                          sx={{
                            bgcolor:
                              user.status === "active"
                                ? "rgba(34, 197, 94, 0.1)"
                                : "rgba(255, 255, 255, 0.05)",
                            color:
                              user.status === "active"
                                ? "#22c55e"
                                : "var(--muted-foreground)",
                            fontWeight: 700,
                            fontSize: "0.7rem",
                            textTransform: "capitalize",
                          }}
                        />
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: "var(--muted-foreground)",
                          borderBottom: "1px solid rgba(255,255,255,0.03)",
                        }}
                      >
                        Standard Account
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          ) : (
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
                    Type
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "var(--muted-foreground)",
                      fontWeight: 600,
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    Referred User
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
                    align="right"
                    sx={{
                      color: "var(--muted-foreground)",
                      fontWeight: 600,
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                      <Typography sx={{ color: "var(--muted-foreground)" }}>
                        Fetching rewards...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : rewardTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 10 }}>
                      <Stack spacing={1} alignItems="center">
                        <History size={40} color="var(--border)" />
                        <Typography
                          sx={{ color: "var(--muted-foreground)", mt: 1 }}
                        >
                          No rewards earned yet.
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ) : (
                  rewardTransactions.map((tx) => (
                    <TableRow
                      key={tx.id}
                      sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.01)" } }}
                    >
                      <TableCell
                        sx={{
                          borderBottom: "1px solid rgba(255,255,255,0.03)",
                        }}
                      >
                        <Chip
                          label={tx.type.replace("_", " ")}
                          size="small"
                          sx={{
                            bgcolor:
                              tx.type === "signup"
                                ? "rgba(99, 102, 241, 0.1)"
                                : "rgba(34, 197, 94, 0.1)",
                            color:
                              tx.type === "signup" ? "primary.main" : "#22c55e",
                            fontWeight: 700,
                            textTransform: "capitalize",
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#ffffff",
                          borderBottom: "1px solid rgba(255,255,255,0.03)",
                        }}
                      >
                        {tx.referredUserEmail}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "var(--muted-foreground)",
                          fontSize: "0.875rem",
                          borderBottom: "1px solid rgba(255,255,255,0.03)",
                        }}
                      >
                        {tx.timestamp}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontWeight: 700,
                          color: "#22c55e",
                          borderBottom: "1px solid rgba(255,255,255,0.03)",
                        }}
                      >
                        +${tx.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
