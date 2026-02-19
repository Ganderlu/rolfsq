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
} from "@mui/material";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/app/firebase/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";

type ReferredUser = {
  id: string;
  fullName?: string;
  email?: string;
  joined?: string;
  status?: string;
};

export default function ReferralsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [copyLabel, setCopyLabel] = useState("Copy Link");

  const [referredUsers, setReferredUsers] = useState<ReferredUser[]>([]);
  const [totalReferralRewards, setTotalReferralRewards] = useState(0);
  const [totalRewardsCount, setTotalRewardsCount] = useState(0);
  const [loading, setLoading] = useState(true);

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
      );

      const unsubscribeUsers = onSnapshot(usersQuery, (snap) => {
        const users: ReferredUser[] = snap.docs.map((doc) => {
          const data = doc.data() as any;
          return {
            id: doc.id,
            fullName: data.fullName || data.username || "User",
            email: data.email || "",
            joined: data.joined || "",
            status: data.status || "",
          };
        });
        setReferredUsers(users);
      });

      const unsubscribeRewards = onSnapshot(rewardsQuery, (snap) => {
        let total = 0;
        snap.forEach((doc) => {
          const data = doc.data() as any;
          total += Number(data.amount) || 0;
        });
        setTotalReferralRewards(total);
        setTotalRewardsCount(snap.size);
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
      setCopyLabel("Copied");
      setTimeout(() => setCopyLabel("Copy Link"), 1500);
    } catch {
      setCopyLabel("Failed");
      setTimeout(() => setCopyLabel("Copy Link"), 1500);
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        color: "var(--foreground)",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
        Referrals
      </Typography>
      <Typography
        variant="body2"
        sx={{ mb: 4, color: "var(--muted-foreground)" }}
      >
        Share your referral link to grow the community and earn rewards from
        your network&apos;s activity.
      </Typography>

      <Paper
        sx={{
          p: 3,
          mb: 4,
          bgcolor: "var(--card)",
          color: "var(--card-foreground)",
          border: "1px solid",
          borderColor: "var(--border)",
          borderRadius: 3,
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Your Referral Link
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 2, color: "var(--muted-foreground)" }}
        >
          Use this unique link to invite new users. Accounts created through
          this link are automatically connected to your profile.
        </Typography>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          alignItems={isMobile ? "stretch" : "center"}
        >
          <TextField
            fullWidth
            value={referralLink || "Sign in to see your referral link"}
            InputProps={{
              readOnly: true,
            }}
          />
          <Button
            variant="contained"
            onClick={handleCopy}
            sx={{
              minWidth: 140,
              bgcolor: "#3b82f6",
              "&:hover": { bgcolor: "#2563eb" },
            }}
          >
            {copyLabel}
          </Button>
        </Stack>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              bgcolor: "var(--card)",
              color: "var(--card-foreground)",
              borderRadius: 3,
              border: "1px solid",
              borderColor: "var(--border)",
            }}
          >
            <CardContent>
              <Typography
                variant="subtitle2"
                sx={{ color: "var(--muted-foreground)" }}
              >
                Total Referred Users
              </Typography>
              <Typography variant="h4" sx={{ mt: 1 }}>
                {referredUsers.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              bgcolor: "var(--card)",
              color: "var(--card-foreground)",
              borderRadius: 3,
              border: "1px solid",
              borderColor: "var(--border)",
            }}
          >
            <CardContent>
              <Typography
                variant="subtitle2"
                sx={{ color: "var(--muted-foreground)" }}
              >
                Total Referral Rewards
              </Typography>
              <Typography variant="h4" sx={{ mt: 1 }}>
                ${totalReferralRewards.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              bgcolor: "var(--card)",
              color: "var(--card-foreground)",
              borderRadius: 3,
              border: "1px solid",
              borderColor: "var(--border)",
            }}
          >
            <CardContent>
              <Typography
                variant="subtitle2"
                sx={{ color: "var(--muted-foreground)" }}
              >
                Reward Transactions
              </Typography>
              <Typography variant="h4" sx={{ mt: 1 }}>
                {totalRewardsCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Referred Users
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                {["Name", "Email", "Joined", "Status"].map((head) => (
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
                  <TableCell colSpan={4} align="center">
                    Loading referrals...
                  </TableCell>
                </TableRow>
              ) : referredUsers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    align="center"
                    sx={{ color: "text.secondary", py: 4 }}
                  >
                    No referred users found yet.
                  </TableCell>
                </TableRow>
              ) : (
                referredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.joined || "-"}</TableCell>
                    <TableCell>
                      {user.status ? (
                        <Chip
                          label={user.status}
                          size="small"
                          color={
                            user.status === "active"
                              ? "success"
                              : user.status === "inactive"
                                ? "default"
                                : "warning"
                          }
                        />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
}
