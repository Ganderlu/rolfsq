"use client";

import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
  TextField,
  Alert,
  IconButton,
  Divider,
  Stack,
  InputAdornment,
  CircularProgress,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import {
  X,
  Info,
  Wallet,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseClient";
import { useAuth } from "@/context/AuthContext";

export default function WithdrawModal({
  open,
  onClose,
  balance = 0,
  asset = "USDT (TRC20)",
}: {
  open: boolean;
  onClose: () => void;
  balance: number;
  asset?: string;
}) {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { currentUser } = useAuth();

  const MIN_WITHDRAW = 100;
  const MAX_WITHDRAW = 1000000;
  const FEE_PERCENTAGE = 0.02; // 2% fee

  const numericAmount = Number(amount);
  const fee = numericAmount * FEE_PERCENTAGE;
  const receiveAmount = numericAmount > 0 ? numericAmount - fee : 0;

  const insufficient = numericAmount > balance;
  const belowMin = numericAmount > 0 && numericAmount < MIN_WITHDRAW;
  const aboveMax = numericAmount > MAX_WITHDRAW;
  const invalidAddress = address.length > 0 && address.length < 10;

  const isInvalid =
    !numericAmount ||
    insufficient ||
    belowMin ||
    aboveMax ||
    !address ||
    invalidAddress;

  const handleWithdraw = async () => {
    if (isInvalid || !currentUser) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "withdrawals"), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        asset: asset,
        amount: numericAmount,
        fee: fee,
        receiveAmount: receiveAmount,
        address: address,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setAmount("");
        setAddress("");
        onClose();
      }, 2500);
    } catch (error) {
      console.error("Withdrawal error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          bgcolor: "var(--card)",
          backgroundImage: "none",
          border: "1px solid",
          borderColor: "var(--border)",
          borderRadius: 4,
          color: "#ffffff",
        },
      }}
    >
      <DialogTitle
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box component="span" sx={{ fontSize: "1.25rem", fontWeight: 700 }}>
          Withdraw {asset}
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: "var(--muted-foreground)" }}
        >
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 2, sm: 3 }, pt: 1 }}>
        {success ? (
          <Stack
            spacing={2}
            alignItems="center"
            sx={{ py: 4, textAlign: "center" }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: "50%",
                bgcolor: "rgba(34, 197, 94, 0.1)",
                color: "#22c55e",
              }}
            >
              <CheckCircle2 size={48} />
            </Box>
            <Typography variant="h6" fontWeight="700">
              Request Submitted!
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "var(--muted-foreground)" }}
            >
              Your withdrawal request for ${numericAmount.toLocaleString()} has
              been sent for processing.
            </Typography>
          </Stack>
        ) : (
          <Stack spacing={2.5}>
            {/* Info Box */}
            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: "rgba(99, 102, 241, 0.05)",
                border: "1px solid rgba(99, 102, 241, 0.1)",
                display: "flex",
                gap: 1.5,
              }}
            >
              <Info
                size={18}
                color="var(--primary)"
                style={{ flexShrink: 0, marginTop: 2 }}
              />
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "var(--muted-foreground)", display: "block" }}
                >
                  Withdrawal Limit
                </Typography>
                <Typography
                  variant="caption"
                  fontWeight="600"
                  sx={{ color: "#ffffff" }}
                >
                  Min: ${MIN_WITHDRAW} | Max: ${MAX_WITHDRAW.toLocaleString()}
                </Typography>
              </Box>
            </Box>

            {/* Amount Input */}
            <Box>
              <Typography
                variant="caption"
                fontWeight="600"
                sx={{ mb: 0.5, display: "block", color: "#ffffff" }}
              >
                Amount to Withdraw
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography
                        variant="body2"
                        sx={{
                          color: "var(--muted-foreground)",
                          fontWeight: "700",
                        }}
                      >
                        $
                      </Typography>
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: "rgba(255,255,255,0.03)",
                    borderRadius: 2.5,
                    "& fieldset": { borderColor: "var(--border)" },
                    "& input": { color: "#ffffff", fontSize: "0.9rem" },
                  },
                }}
              />
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mt: 0.5 }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: "var(--muted-foreground)" }}
                >
                  Available:{" "}
                  <span style={{ color: "#ffffff", fontWeight: "600" }}>
                    ${balance.toLocaleString()}
                  </span>
                </Typography>
                {insufficient && (
                  <Typography
                    variant="caption"
                    sx={{ color: "#ef4444", fontWeight: "600" }}
                  >
                    Insufficient Balance
                  </Typography>
                )}
              </Stack>
            </Box>

            {/* Address Input */}
            <Box>
              <Typography
                variant="caption"
                fontWeight="600"
                sx={{ mb: 0.5, display: "block", color: "#ffffff" }}
              >
                {asset} Wallet Address
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter your destination address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Wallet size={16} color="var(--muted-foreground)" />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: "rgba(255,255,255,0.03)",
                    borderRadius: 2.5,
                    "& fieldset": { borderColor: "var(--border)" },
                    "& input": { color: "#ffffff", fontSize: "0.9rem" },
                  },
                }}
              />
            </Box>

            <Divider sx={{ borderColor: "var(--border)" }} />

            {/* Summary */}
            <Box
              sx={{
                p: 1.5,
                bgcolor: "rgba(255,255,255,0.02)",
                borderRadius: 2.5,
                border: "1px solid var(--border)",
              }}
            >
              <Stack spacing={0.5}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    variant="caption"
                    sx={{ color: "var(--muted-foreground)" }}
                  >
                    Processing Fee (2%)
                  </Typography>
                  <Typography
                    variant="caption"
                    fontWeight="600"
                    sx={{ color: "#ef4444" }}
                  >
                    -${fee.toFixed(2)}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    variant="body2"
                    fontWeight="700"
                    sx={{ color: "#ffffff" }}
                  >
                    Total to Receive
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="800"
                    sx={{ color: "#22c55e" }}
                  >
                    ${receiveAmount.toFixed(2)}
                  </Typography>
                </Stack>
              </Stack>
            </Box>

            <Button
              fullWidth
              variant="contained"
              disabled={isInvalid || loading}
              onClick={handleWithdraw}
              startIcon={
                loading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <ShieldCheck size={18} />
                )
              }
              sx={{
                borderRadius: 2.5,
                py: 1.2,
                textTransform: "none",
                fontWeight: "700",
                fontSize: "0.95rem",
                boxShadow: "0 4px 14px 0 rgba(99, 102, 241, 0.39)",
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              {loading ? "Processing..." : "Confirm Withdrawal"}
            </Button>

            <Typography
              variant="caption"
              align="center"
              sx={{ color: "var(--muted-foreground)", display: "block" }}
            >
              Withdrawals are processed within 24 hours.
            </Typography>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}
