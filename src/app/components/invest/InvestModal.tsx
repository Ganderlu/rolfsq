"use client";

import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
  TextField,
  IconButton,
  Stack,
  InputAdornment,
  CircularProgress,
  DialogTitle,
  Divider,
} from "@mui/material";
import {
  X,
  Info,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
} from "lucide-react";
import { useState } from "react";
import { createInvestment } from "@/app/actions/investment";

export default function InvestModal({
  open,
  onClose,
  plan,
  userId,
}: {
  open: boolean;
  onClose: () => void;
  plan: any;
  userId: string;
}) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!amount || Number(amount) <= 0) return;

    setLoading(true);
    setError(null);

    try {
      const res = await createInvestment(userId, plan, Number(amount));
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setAmount("");
          onClose();
        }, 2500);
      }
    } catch (err: any) {
      setError(err.message || "Failed to create investment");
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
          Invest in {plan.title}
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
              Investment Active!
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "var(--muted-foreground)" }}
            >
              Your ${Number(amount).toLocaleString()} investment in the{" "}
              {plan.title} has been successfully activated.
            </Typography>
          </Stack>
        ) : (
          <Stack spacing={3}>
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
                  Plan Limit
                </Typography>
                <Typography
                  variant="caption"
                  fontWeight="600"
                  sx={{ color: "#ffffff" }}
                >
                  {plan.limit}
                </Typography>
              </Box>
            </Box>

            {error && (
              <Alert
                severity="error"
                variant="filled"
                sx={{ borderRadius: 2, fontSize: "0.8rem" }}
              >
                {error}
              </Alert>
            )}

            {/* Amount Input */}
            <Box>
              <Typography
                variant="caption"
                fontWeight="600"
                sx={{ mb: 0.5, display: "block", color: "#ffffff" }}
              >
                Investment Amount
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
                      <DollarSign size={16} color="var(--muted-foreground)" />
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
                    Daily Interest
                  </Typography>
                  <Typography
                    variant="caption"
                    fontWeight="600"
                    sx={{ color: plan.color || "primary.main" }}
                  >
                    {plan.interest}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    variant="caption"
                    sx={{ color: "var(--muted-foreground)" }}
                  >
                    Duration
                  </Typography>
                  <Typography
                    variant="caption"
                    fontWeight="600"
                    sx={{ color: "#ffffff" }}
                  >
                    {plan.duration}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mt: 1 }}
                >
                  <Typography
                    variant="body2"
                    fontWeight="700"
                    sx={{ color: "#ffffff" }}
                  >
                    Total ROI
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="800"
                    sx={{ color: "#22c55e" }}
                  >
                    {plan.returnText}
                  </Typography>
                </Stack>
              </Stack>
            </Box>

            <Button
              fullWidth
              variant="contained"
              disabled={!amount || Number(amount) <= 0 || loading}
              onClick={handleSubmit}
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
                bgcolor: plan.color || "primary.main",
                "&:hover": {
                  bgcolor: plan.color || "primary.dark",
                  opacity: 0.9,
                },
              }}
            >
              {loading ? "Processing..." : "Activate Plan"}
            </Button>

            <Typography
              variant="caption"
              align="center"
              sx={{ color: "var(--muted-foreground)", display: "block" }}
            >
              Funds will be locked for the duration of the plan.
            </Typography>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}
