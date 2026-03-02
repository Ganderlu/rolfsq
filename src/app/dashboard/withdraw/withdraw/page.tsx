"use client";

import { Box, Typography, Grid, Paper, Stack, useTheme, useMediaQuery } from "@mui/material";
import GatewayCard from "../../../components/withdraw/GatewayCard";
import WithdrawLogs from "../../../components/withdraw/WithdrawLogs";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { auth } from "../../../firebase/firebaseClient";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Wallet, ArrowDownToLine, History } from "lucide-react";

const gateways = [
  { name: "Bitcoin", icon: "BTC" },
  { name: "Ethereum", icon: "ETH" },
  { name: "BNB Smart Chain", icon: "BNB" },
  { name: "TRON (TRC20)", icon: "TRX" },
  { name: "USDT (ERC20)", icon: "USDT" },
  { name: "Solana", icon: "SOL" },
];

export default function WithdrawPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const unsubSnap = onSnapshot(doc(db, "users", user.uid), (snap) => {
        if (snap.exists()) {
          setUsdtBalance(Number(snap.data().usdtBalance || 0));
        }
        setLoading(false);
      });

      return () => unsubSnap();
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "var(--background)",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="700" sx={{ color: "#ffffff", mb: 0.5, display: "flex", alignItems: "center", gap: 1.5 }}>
            <ArrowDownToLine size={28} color="primary.main" /> Withdraw Funds
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
            Select your preferred withdrawal gateway and enter your details to receive funds.
          </Typography>
        </Box>
        
        {!isMobile && (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              px: 3,
              bgcolor: "var(--card)",
              border: "1px solid",
              borderColor: "var(--border)",
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              gap: 2
            }}
          >
            <Box sx={{ p: 1, borderRadius: 2, bgcolor: "rgba(99, 102, 241, 0.1)", color: "primary.main" }}>
              <Wallet size={20} />
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: "var(--muted-foreground)", display: "block" }}>Available Balance</Typography>
              <Typography variant="h6" fontWeight="700" sx={{ color: "#ffffff" }}>${usdtBalance.toLocaleString()}</Typography>
            </Box>
          </Paper>
        )}
      </Stack>

      {/* Mobile Balance View */}
      {isMobile && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 4,
            bgcolor: "var(--card)",
            border: "1px solid",
            borderColor: "var(--border)",
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ p: 1, borderRadius: 2, bgcolor: "rgba(99, 102, 241, 0.1)", color: "primary.main" }}>
              <Wallet size={20} />
            </Box>
            <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>Available Balance</Typography>
          </Stack>
          <Typography variant="h6" fontWeight="700" sx={{ color: "#ffffff" }}>${usdtBalance.toLocaleString()}</Typography>
        </Paper>
      )}

      {/* GATEWAY GRID */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {gateways.map((gw) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={gw.name}>
            <GatewayCard title={gw.name} balance={usdtBalance} />
          </Grid>
        ))}
      </Grid>

      {/* WITHDRAWAL HISTORY */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="700" sx={{ color: "#ffffff", mb: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
          <History size={24} color="primary.main" /> Withdrawal History
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 0,
            bgcolor: "var(--card)",
            color: "var(--card-foreground)",
            borderRadius: 4,
            border: "1px solid",
            borderColor: "var(--border)",
            overflow: "hidden"
          }}
        >
          <WithdrawLogs />
        </Paper>
      </Box>
    </Box>
  );
}
