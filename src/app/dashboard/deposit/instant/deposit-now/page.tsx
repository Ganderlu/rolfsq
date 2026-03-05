"use client";

import {
  Alert,
  Box,
  Button,
  Chip,
  Grid,
  InputAdornment,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { ArrowLeft, Info } from "lucide-react";

const WALLET_MAP: Record<string, { network: string; address: string }[]> = {
  bitcoin: [{ network: "BTC", address: "1Nx5hR6WdKULtpB7PZN64Kbzu8HP3MhYtV" }],
  ethereum: [{ network: "ERC20", address: "0xf311ac9df89e6c5663a49438971c8e7403af6642" }],
  "bnb smart chain": [{ network: "BEP20", address: "0xf311ac9df89e6c5663a49438971c8e7403af6642" }],
  tron: [{ network: "TRC20", address: "TEFHSDaGkvgycMZqL28NiFekygVEuKNLqW" }],
  usdt: [
    { network: "TRC20", address: "TEFHSDaGkvgycMZqL28NiFekygVEuKNLqW" },
    { network: "ERC20", address: "0xf311ac9df89e6c5663a49438971c8e7403af6642" },
  ],
  solana: [{ network: "SOL", address: "GXYQcxvitv5pUgvoapX5W3zKhE5W6gZqUNnQLYYnu5dH" }],
};

export default function DepositNowPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const params = useSearchParams();
  const router = useRouter();
  const { currentUser } = useAuth();

  const asset = (params.get("gateway") || "").toLowerCase();
  const requestedNetwork = params.get("network") || "";

  const wallets = useMemo(() => WALLET_MAP[asset] || [], [asset]);
  const initialNetwork = useMemo(() => {
    const match = wallets.find((w) => w.network.toLowerCase() === requestedNetwork.toLowerCase());
    return match?.network || wallets[0]?.network || "";
  }, [wallets, requestedNetwork]);

  const [network, setNetwork] = useState<string>(initialNetwork);
  const selectedWallet = useMemo(() => wallets.find((w) => w.network === network) || wallets[0], [wallets, network]);

  const [amount, setAmount] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");
  const [proofUrl, setProofUrl] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; msg: string; severity: "success" | "error" }>({
    open: false,
    msg: "",
    severity: "success",
  });

  const copyAddress = async () => {
    if (!selectedWallet?.address) return;
    try {
      await navigator.clipboard.writeText(selectedWallet.address);
      setSnackbar({ open: true, msg: "Address copied", severity: "success" });
    } catch {
      setSnackbar({ open: true, msg: "Copy failed", severity: "error" });
    }
  };

  const submit = async () => {
    if (!currentUser) {
      setSnackbar({ open: true, msg: "Please login to continue", severity: "error" });
      return;
    }
    const amt = Number(amount);
    if (!selectedWallet || !Number.isFinite(amt) || amt <= 0) {
      setSnackbar({ open: true, msg: "Enter a valid amount", severity: "error" });
      return;
    }
    if (!txHash.trim()) {
      setSnackbar({ open: true, msg: "Transaction hash is required", severity: "error" });
      return;
    }

    try {
      setSubmitting(true);
      await addDoc(collection(db, "deposits"), {
        userId: currentUser.uid,
        userEmail: currentUser.email || "",
        asset: asset ? asset.toUpperCase() : "CRYPTO",
        network: selectedWallet.network,
        address: selectedWallet.address,
        amount: amt,
        txHash: txHash.trim(),
        proofUrl: proofUrl.trim(),
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setSnackbar({ open: true, msg: "Deposit submitted successfully", severity: "success" });
      setTimeout(() => router.replace("/dashboard/deposit/instant"), 800);
    } catch (e: any) {
      setSnackbar({ open: true, msg: e?.message || "Failed to submit deposit", severity: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "var(--background)", minHeight: "100vh" }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowLeft size={16} />}
          onClick={() => router.back()}
          sx={{ borderRadius: 2.5, textTransform: "none", fontWeight: 800 }}
        >
          Back
        </Button>
        <Box>
          <Typography variant="h5" fontWeight="900" sx={{ color: "var(--foreground)" }}>
            Deposit Now
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
            Send funds to the address and submit the transaction details.
          </Typography>
        </Box>
      </Stack>

      {!selectedWallet ? (
        <Paper elevation={0} sx={{ p: 3, bgcolor: "var(--card)", border: "1px solid", borderColor: "#000000", borderRadius: 4 }}>
          <Typography sx={{ color: "var(--muted-foreground)" }}>
            Please select a gateway from Instant Deposit first.
          </Typography>
          <Button sx={{ mt: 2, borderRadius: 2.5 }} variant="contained" onClick={() => router.replace("/dashboard/deposit/instant")}>
            Go to Instant Deposit
          </Button>
        </Paper>
      ) : (
        <Stack spacing={3}>
          <Paper elevation={0} sx={{ p: 2.5, bgcolor: "rgba(99, 102, 241, 0.05)", border: "1px solid rgba(99, 102, 241, 0.12)", borderRadius: 4 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Info size={18} color="primary.main" />
              <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
                Deposits are verified manually. After submission, your request appears in Deposit History.
              </Typography>
            </Stack>
          </Paper>

          <Paper elevation={0} sx={{ p: 3, bgcolor: "var(--card)", border: "1px solid", borderColor: "#000000", borderRadius: 4 }}>
            <Stack spacing={2.5}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }}>
                <Box>
                  <Typography variant="h6" fontWeight="900" sx={{ color: "var(--foreground)" }}>
                    {asset.toUpperCase()} — {network}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>
                    Use the exact network shown to avoid loss of funds.
                  </Typography>
                </Box>
                <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={copyAddress} sx={{ borderRadius: 2.5, textTransform: "none", fontWeight: 800 }}>
                  Copy Address
                </Button>
              </Stack>

              {wallets.length > 1 && (
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {wallets.map((w) => (
                    <Chip
                      key={w.network}
                      label={w.network}
                      onClick={() => setNetwork(w.network)}
                      sx={{
                        bgcolor: w.network === network ? "rgba(255,255,255,0.06)" : "transparent",
                        border: "1px solid var(--border)",
                        color: "var(--foreground)",
                        fontWeight: 900,
                      }}
                    />
                  ))}
                </Stack>
              )}

              <Box sx={{ p: 2, borderRadius: 3, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <Typography variant="caption" sx={{ color: "var(--muted-foreground)", display: "block" }}>
                  Wallet Address
                </Typography>
                <Typography variant="body2" fontWeight="900" sx={{ color: "var(--foreground)", wordBreak: "break-all" }}>
                  {selectedWallet.address}
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="Amount (USD)"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          $
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField fullWidth label="Transaction Hash" value={txHash} onChange={(e) => setTxHash(e.target.value)} />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField fullWidth label="Proof URL (optional)" value={proofUrl} onChange={(e) => setProofUrl(e.target.value)} />
                </Grid>
              </Grid>

              <Stack direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="flex-end">
                <Button
                  variant="contained"
                  onClick={submit}
                  disabled={submitting}
                  sx={{ borderRadius: 2.5, fontWeight: 900, py: 1.2, width: isMobile ? "100%" : "auto" }}
                >
                  {submitting ? "Submitting..." : "Submit Deposit"}
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      )}

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: 3 }}>
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

