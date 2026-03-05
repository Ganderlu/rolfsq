"use client";

import {
  Box,
  Typography,
  Grid,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import GatewayCard from "../../../components/deposit/GatewayCard";
import DepositLogs from "../../../components/deposit/DepositLogs";
import { History, Zap, ShieldCheck, Info } from "lucide-react";

const gateways = [
  { name: "Bitcoin", icon: "BTC", network: "BTC" },
  { name: "Ethereum", icon: "ETH", network: "ERC20" },
  { name: "BNB Smart Chain", icon: "BNB", network: "BEP20" },
  { name: "TRON", icon: "TRX", network: "TRC20" },
  { name: "USDT", icon: "USDT", network: "TRC20" },
  { name: "Solana", icon: "SOL", network: "SOL" },
];

const WALLET_MAP: Record<string, { network: string; address: string }[]> = {
  bitcoin: [{ network: "BTC", address: "1Nx5hR6WdKULtpB7PZN64Kbzu8HP3MhYtV" }],
  ethereum: [
    { network: "ERC20", address: "0xf311ac9df89e6c5663a49438971c8e7403af6642" },
  ],
  "bnb smart chain": [
    { network: "BEP20", address: "0xf311ac9df89e6c5663a49438971c8e7403af6642" },
  ],
  tron: [{ network: "TRC20", address: "TEFHSDaGkvgycMZqL28NiFekygVEuKNLqW" }],
  usdt: [
    { network: "TRC20", address: "TEFHSDaGkvgycMZqL28NiFekygVEuKNLqW" },
    { network: "ERC20", address: "0xf311ac9df89e6c5663a49438971c8e7403af6642" },
  ],
  solana: [
    { network: "SOL", address: "GXYQcxvitv5pUgvoapX5W3zKhE5W6gZqUNnQLYYnu5dH" },
  ],
};

export default function DepositInstantPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "var(--background)",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
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
            sx={{
              color: "#ffffff",
              mb: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Zap size={28} color="primary.main" /> Instant Deposit
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
            Select a payment gateway to fund your account instantly via
            cryptocurrency.
          </Typography>
        </Box>

        {!isMobile && (
          <Stack direction="row" spacing={2}>
            <Box
              sx={{
                p: 1.5,
                px: 3,
                borderRadius: 3,
                bgcolor: "rgba(34, 197, 94, 0.05)",
                border: "1px solid rgba(34, 197, 94, 0.1)",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <ShieldCheck size={18} color="#22c55e" />
              <Typography
                variant="caption"
                fontWeight="700"
                sx={{ color: "#22c55e" }}
              >
                SECURE PAYMENTS
              </Typography>
            </Box>
          </Stack>
        )}
      </Stack>

      {/* Info Card */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 4,
          bgcolor: "rgba(99, 102, 241, 0.05)",
          border: "1px solid rgba(99, 102, 241, 0.1)",
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Info size={20} color="var(--primary)" />
        <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
          Deposits are typically processed within 5-15 minutes after network
          confirmation.
        </Typography>
      </Paper>

      {/* GATEWAY GRID */}
      <Typography
        variant="h6"
        fontWeight="700"
        sx={{ color: "#ffffff", mb: 3 }}
      >
        Select Gateway
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {gateways.map((gw) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={gw.name}>
            <GatewayCard title={gw.name} network={gw.network} />
          </Grid>
        ))}
      </Grid>

      {/* DEPOSIT LOGS */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          fontWeight="700"
          sx={{
            color: "#ffffff",
            mb: 3,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <History size={24} color="primary.main" /> Deposit History
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
            overflow: "hidden",
          }}
        >
          <DepositLogs />
        </Paper>
      </Box>
    </Box>
  );
}
