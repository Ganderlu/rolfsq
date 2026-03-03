"use client";

import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { db } from "@/app/firebase/firebaseClient";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { Settings, Shield, Save } from "lucide-react";

type SystemSettings = {
  maintenance?: boolean;
  tradingEnabled?: boolean;
  investmentsEnabled?: boolean;
  depositsEnabled?: boolean;
  withdrawalsEnabled?: boolean;
  companyName?: string;
  supportEmail?: string;
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SystemSettings>({
    maintenance: false,
    tradingEnabled: true,
    investmentsEnabled: true,
    depositsEnabled: true,
    withdrawalsEnabled: true,
    companyName: "rolfsq",
    supportEmail: "support@example.com",
  });
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; msg: string; severity: "success" | "error" }>({
    open: false,
    msg: "",
    severity: "success",
  });

  useEffect(() => {
    const ref = doc(db, "system", "settings");
    return onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setSettings((prev) => ({ ...prev, ...(snap.data() as any) }));
      }
    });
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const ref = doc(db, "system", "settings");
      await setDoc(ref, settings, { merge: true });
      setSnackbar({ open: true, msg: "Settings saved", severity: "success" });
    } catch (e: any) {
      setSnackbar({ open: true, msg: e.message || "Failed to save settings", severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "var(--background)", minHeight: "100vh" }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ color: "var(--foreground)", mb: 0.5, display: "flex", alignItems: "center", gap: 1.5 }}>
            <Settings size={28} color="#3b82f6" /> System Settings
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
            Configure platform features and company metadata.
          </Typography>
        </Box>
        <Button variant="contained" onClick={save} disabled={saving} startIcon={<Save size={16} />} sx={{ borderRadius: 2.5, fontWeight: 800 }}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: "var(--card)", border: "1px solid", borderColor: "#000000", borderRadius: 4 }}>
            <Typography variant="subtitle1" fontWeight="800" sx={{ color: "var(--foreground)", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <Shield size={18} /> Feature Toggles
            </Typography>
            <Stack spacing={1.5}>
              <FormControlLabel
                control={<Switch checked={!!settings.maintenance} onChange={(e) => setSettings((s) => ({ ...s, maintenance: e.target.checked }))} />}
                label="Maintenance Mode"
                sx={{ color: "var(--foreground)" }}
              />
              <FormControlLabel
                control={<Switch checked={!!settings.tradingEnabled} onChange={(e) => setSettings((s) => ({ ...s, tradingEnabled: e.target.checked }))} />}
                label="Enable Trading"
                sx={{ color: "var(--foreground)" }}
              />
              <FormControlLabel
                control={<Switch checked={!!settings.investmentsEnabled} onChange={(e) => setSettings((s) => ({ ...s, investmentsEnabled: e.target.checked }))} />}
                label="Enable Investments"
                sx={{ color: "var(--foreground)" }}
              />
              <FormControlLabel
                control={<Switch checked={!!settings.depositsEnabled} onChange={(e) => setSettings((s) => ({ ...s, depositsEnabled: e.target.checked }))} />}
                label="Enable Deposits"
                sx={{ color: "var(--foreground)" }}
              />
              <FormControlLabel
                control={<Switch checked={!!settings.withdrawalsEnabled} onChange={(e) => setSettings((s) => ({ ...s, withdrawalsEnabled: e.target.checked }))} />}
                label="Enable Withdrawals"
                sx={{ color: "var(--foreground)" }}
              />
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: "var(--card)", border: "1px solid", borderColor: "#000000", borderRadius: 4 }}>
            <Typography variant="subtitle1" fontWeight="800" sx={{ color: "var(--foreground)", mb: 2 }}>
              Organization
            </Typography>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Company Name"
                value={settings.companyName || ""}
                onChange={(e) => setSettings((s) => ({ ...s, companyName: e.target.value }))}
              />
              <TextField
                fullWidth
                label="Support Email"
                type="email"
                value={settings.supportEmail || ""}
                onChange={(e) => setSettings((s) => ({ ...s, supportEmail: e.target.value }))}
              />
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: 3 }}>
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

