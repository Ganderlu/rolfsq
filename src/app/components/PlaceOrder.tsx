"use client";

import { useState } from "react";
import { useMarketStore } from "@/store/useMarketStore";
import { ASSETS } from "../constants/assets";
import { placeTrade } from "../dashboard/trades/actions";
import { useAuth } from "@/context/AuthContext";

import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Stack,
  Chip,
  MenuItem,
  CircularProgress,
  Divider,
  Paper,
  Grid,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Zap,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function PlaceOrder() {
  const { symbol } = useMarketStore();
  const { currentUser } = useAuth();
  const [direction, setDirection] = useState<"call" | "put">("call");
  const [amount, setAmount] = useState(10);
  const [duration, setDuration] = useState(60); // seconds (1 min)
  const [loading, setLoading] = useState(false);

  // Parse symbol to get asset name (e.g. "BTC")
  const assetName = symbol.replace("BINANCE:", "").replace("USDT", "");
  const assetInfo = ASSETS.find((a) => a.symbol === assetName);
  const payoutStr = assetInfo?.payout || "85%";
  const payout = parseFloat(payoutStr) / 100;

  const handleTrade = async () => {
    if (loading) return;
    if (!currentUser) {
      alert("Please log in to trade");
      return;
    }
    setLoading(true);

    try {
      const tickerSymbol = `${assetName}USDT`;
      const res = await fetch(
        `https://api.binance.com/api/v3/ticker/price?symbol=${tickerSymbol}`,
      );
      const data = await res.json();
      const price = parseFloat(data.price);

      if (!price) throw new Error("Failed to fetch price");

      await placeTrade({
        uid: currentUser.uid,
        asset: assetName,
        direction,
        amount,
        duration,
        payout,
        price,
      });
    } catch (err: any) {
      alert(err.message || "Failed to place trade");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2.5, bgcolor: "var(--card)", borderRadius: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="700"
          sx={{ color: "#ffffff" }}
        >
          Place Order
        </Typography>
        <Chip
          label={`${assetName}/USDT ${payoutStr}`}
          size="small"
          sx={{
            bgcolor: "rgba(99, 102, 241, 0.1)",
            color: "primary.main",
            fontWeight: "700",
            fontSize: "0.7rem",
            fontFamily: "monospace",
          }}
        />
      </Stack>

      <Stack spacing={3}>
        {/* Direction */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: "var(--muted-foreground)",
              fontWeight: "600",
              mb: 1,
              display: "block",
            }}
          >
            SELECT DIRECTION
          </Typography>
          <Grid container spacing={1.5}>
            <Grid item xs={6}>
              <Button
                fullWidth
                onClick={() => setDirection("call")}
                variant={direction === "call" ? "contained" : "outlined"}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  bgcolor: direction === "call" ? "#22c55e" : "transparent",
                  borderColor: "#22c55e",
                  color: direction === "call" ? "#ffffff" : "#22c55e",
                  "&:hover": {
                    bgcolor:
                      direction === "call"
                        ? "#16a34a"
                        : "rgba(34, 197, 94, 0.05)",
                    borderColor: "#22c55e",
                  },
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                  transition: "all 0.2s",
                }}
              >
                <TrendingUp size={18} />
                <Typography variant="caption" fontWeight="800">
                  CALL
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                onClick={() => setDirection("put")}
                variant={direction === "put" ? "contained" : "outlined"}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  bgcolor: direction === "put" ? "#ef4444" : "transparent",
                  borderColor: "#ef4444",
                  color: direction === "put" ? "#ffffff" : "#ef4444",
                  "&:hover": {
                    bgcolor:
                      direction === "put"
                        ? "#dc2626"
                        : "rgba(239, 68, 68, 0.05)",
                    borderColor: "#ef4444",
                  },
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                  transition: "all 0.2s",
                }}
              >
                <TrendingDown size={18} />
                <Typography variant="caption" fontWeight="800">
                  PUT
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Amount */}
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="caption"
              sx={{ color: "var(--muted-foreground)", fontWeight: "600" }}
            >
              INVESTMENT AMOUNT
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#22c55e", fontWeight: "700" }}
            >
              Profit: +${(amount * payout).toFixed(2)}
            </Typography>
          </Stack>
          <TextField
            fullWidth
            size="small"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DollarSign size={16} color="var(--muted-foreground)" />
                </InputAdornment>
              ),
              sx: {
                bgcolor: "rgba(255,255,255,0.03)",
                borderRadius: 2.5,
                "& fieldset": { borderColor: "var(--border)" },
                "& input": { color: "#ffffff", fontWeight: "700" },
              },
            }}
          />
        </Box>

        {/* Duration */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: "var(--muted-foreground)",
              fontWeight: "600",
              mb: 1,
              display: "block",
            }}
          >
            EXPIRY DURATION
          </Typography>
          <TextField
            select
            fullWidth
            size="small"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Clock size={16} color="var(--muted-foreground)" />
                </InputAdornment>
              ),
              sx: {
                bgcolor: "rgba(255,255,255,0.03)",
                borderRadius: 2.5,
                "& fieldset": { borderColor: "var(--border)" },
                "& .MuiSelect-select": { color: "#ffffff", fontWeight: "600" },
              },
            }}
          >
            <MenuItem value={60}>1 Minute</MenuItem>
            <MenuItem value={300}>5 Minutes</MenuItem>
            <MenuItem value={900}>15 Minutes</MenuItem>
            <MenuItem value={1800}>30 Minutes</MenuItem>
            <MenuItem value={3600}>1 Hour</MenuItem>
          </TextField>
        </Box>

        <Button
          fullWidth
          variant="contained"
          onClick={handleTrade}
          disabled={loading}
          startIcon={
            loading ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <Zap size={18} />
            )
          }
          sx={{
            py: 1.5,
            borderRadius: 3,
            bgcolor: "primary.main",
            fontWeight: "800",
            fontSize: "0.95rem",
            boxShadow: "0 4px 14px 0 rgba(99, 102, 241, 0.39)",
            "&:hover": { bgcolor: "primary.dark" },
            textTransform: "none",
          }}
        >
          {loading ? "EXECUTING..." : "PLACE TRADE"}
        </Button>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <ShieldCheck size={12} color="var(--muted-foreground)" />
          <Typography
            variant="caption"
            sx={{ color: "var(--muted-foreground)" }}
          >
            Secure instant execution
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
