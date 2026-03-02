"use client";

import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Stack,
  Chip,
  Divider,
  Snackbar,
  Alert,
  FormControlLabel,
  Switch,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, onSnapshot, updateDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { toggleUserMode } from "@/app/actions/user";
import {
  User,
  Mail,
  Phone,
  Settings as SettingsIcon,
  Shield,
  Bell,
  Monitor,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Info,
} from "lucide-react";

type UserProfile = {
  username?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  mode?: "demo" | "live";
};

export default function SettingsPage() {
  const { currentUser } = useAuth();

  const [profile, setProfile] = useState<UserProfile>({});
  const [form, setForm] = useState<UserProfile>({});
  const [savingProfile, setSavingProfile] = useState(false);
  const [modeUpdating, setModeUpdating] = useState(false);
  const [notificationEmail, setNotificationEmail] = useState(true);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    const unsub = onSnapshot(userRef, (snap) => {
      if (!snap.exists()) return;
      const data = snap.data() as any;
      const base: UserProfile = {
        username: data.username || "",
        fullName: data.fullName || "",
        email: data.email || currentUser.email || "",
        phone: data.phone || "",
        mode: data.mode || "demo",
      };
      setProfile(base);
      setForm(base);
      setNotificationEmail(
        typeof data.notificationEmail === "boolean"
          ? data.notificationEmail
          : true,
      );
    });

    return () => unsub();
  }, [currentUser]);

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    if (!currentUser) return;
    setSavingProfile(true);
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(
        userRef,
        {
          username: form.username || "",
          fullName: form.fullName || "",
          phone: form.phone || "",
        },
        { merge: true },
      );
      setSnackbar({
        open: true,
        message: "Profile updated successfully.",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to update profile. Please try again.",
        severity: "error",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleModeToggle = async () => {
    if (!currentUser || !profile.mode) return;
    const newMode = profile.mode === "demo" ? "live" : "demo";
    setModeUpdating(true);
    try {
      await toggleUserMode(currentUser.uid, newMode);
      setSnackbar({
        open: true,
        message: `Trading mode switched to ${newMode.toUpperCase()}.`,
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to change trading mode.",
        severity: "error",
      });
    } finally {
      setModeUpdating(false);
    }
  };

  const handleNotificationToggle = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const checked = event.target.checked;
    setNotificationEmail(checked);
    if (!currentUser) return;
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(userRef, { notificationEmail: checked }, { merge: true });
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to update notification settings.",
        severity: "error",
      });
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
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#ffffff", mb: 1 }}
        >
          Settings
        </Typography>
        <Typography variant="body1" sx={{ color: "var(--muted-foreground)" }}>
          Personalize your dashboard and manage your account preferences.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Profile Settings Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: "var(--card)",
              color: "#ffffff",
              border: "1px solid",
              borderColor: "var(--border)",
              borderRadius: 4,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: "rgba(99, 102, 241, 0.1)",
                  color: "primary.main",
                  display: "flex",
                }}
              >
                <User size={20} />
              </Box>
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{ color: "#ffffff" }}
              >
                Personal Profile
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ mb: 4, color: "var(--muted-foreground)" }}
            >
              This information is used across the platform to identify you and
              personalize your experience.
            </Typography>

            <Stack spacing={3} sx={{ flexGrow: 1 }}>
              <TextField
                label="Username"
                value={form.username || ""}
                onChange={(e) =>
                  handleProfileChange("username", e.target.value)
                }
                sx={{
                  "& .MuiInputLabel-root": { color: "#ffffff" },
                  "& .MuiOutlinedInput-root": { color: "#ffffff" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Smartphone size={18} color="var(--muted-foreground)" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Enter your username"
              />
              <TextField
                label="Full Name"
                value={form.fullName || ""}
                onChange={(e) =>
                  handleProfileChange("fullName", e.target.value)
                }
                sx={{
                  "& .MuiInputLabel-root": { color: "#ffffff" },
                  "& .MuiOutlinedInput-root": { color: "#ffffff" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={18} color="var(--muted-foreground)" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Enter your full name"
              />
              <TextField
                label="Email Address"
                value={form.email || ""}
                sx={{
                  "& .MuiInputLabel-root": { color: "#ffffff" },
                  "& .MuiOutlinedInput-root": {
                    color: "var(--muted-foreground)",
                  },
                }}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={18} color="var(--muted-foreground)" />
                    </InputAdornment>
                  ),
                }}
                helperText="To change your email, please contact our support team."
              />
              <TextField
                label="Phone Number"
                value={form.phone || ""}
                onChange={(e) => handleProfileChange("phone", e.target.value)}
                sx={{
                  "& .MuiInputLabel-root": { color: "#ffffff" },
                  "& .MuiOutlinedInput-root": { color: "#ffffff" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone size={18} color="var(--muted-foreground)" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Enter your phone number"
              />

              <Box sx={{ pt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSaveProfile}
                  disabled={savingProfile}
                  startIcon={savingProfile ? null : <CheckCircle2 size={18} />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    bgcolor: "primary.main",
                    color: "#ffffff",
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: "0 8px 16px -4px rgba(99, 102, 241, 0.3)",
                    "&:hover": {
                      bgcolor: "primary.dark",
                      boxShadow: "0 12px 20px -4px rgba(99, 102, 241, 0.4)",
                    },
                  }}
                >
                  {savingProfile ? "Saving Changes..." : "Update Profile"}
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* Preferences & Security Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={4}>
            {/* Trading Mode */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: "var(--card)",
                color: "#ffffff",
                border: "1px solid",
                borderColor: "var(--border)",
                borderRadius: 4,
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
              >
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "rgba(34, 197, 94, 0.1)",
                    color: "success.main",
                    display: "flex",
                  }}
                >
                  <Monitor size={20} />
                </Box>
                <Typography
                  variant="h6"
                  fontWeight="600"
                  sx={{ color: "#ffffff" }}
                >
                  Trading Preferences
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ mb: 3, color: "var(--muted-foreground)" }}
              >
                Switch between live trading and practice mode to test your
                strategies.
              </Typography>

              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  bgcolor: "var(--background)",
                  border: "1px solid",
                  borderColor: "var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Chip
                    label={
                      profile.mode === "live" ? "Live Account" : "Demo Account"
                    }
                    variant="filled"
                    sx={{
                      bgcolor:
                        profile.mode === "live"
                          ? "rgba(34, 197, 94, 0.15)"
                          : "rgba(148, 163, 184, 0.1)",
                      color:
                        profile.mode === "live"
                          ? "success.main"
                          : "var(--muted-foreground)",
                      fontWeight: 700,
                      borderRadius: 1.5,
                      px: 1,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "var(--muted-foreground)" }}
                  >
                    {profile.mode === "live"
                      ? "Real market execution"
                      : "Virtual funds practice"}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleModeToggle}
                  disabled={modeUpdating}
                  sx={{
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: "none",
                    color: "#ffffff",
                    borderColor: "var(--border)",
                    "&:hover": {
                      borderColor: "primary.main",
                      bgcolor: "rgba(99, 102, 241, 0.05)",
                    },
                  }}
                >
                  {modeUpdating
                    ? "Switching..."
                    : `Switch to ${profile.mode === "demo" ? "Live" : "Demo"}`}
                </Button>
              </Box>
            </Paper>

            {/* Notifications */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: "var(--card)",
                color: "#ffffff",
                border: "1px solid",
                borderColor: "var(--border)",
                borderRadius: 4,
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
              >
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "rgba(245, 158, 11, 0.1)",
                    color: "warning.main",
                    display: "flex",
                  }}
                >
                  <Bell size={20} />
                </Box>
                <Typography
                  variant="h6"
                  fontWeight="600"
                  sx={{ color: "#ffffff" }}
                >
                  Notification Settings
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ mb: 3, color: "var(--muted-foreground)" }}
              >
                Manage how you receive alerts and platform updates.
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={notificationEmail}
                    onChange={handleNotificationToggle}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight="500"
                      sx={{ color: "#ffffff" }}
                    >
                      Email Alerts
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "var(--muted-foreground)" }}
                    >
                      Receive updates on withdrawals and important security
                      alerts.
                    </Typography>
                  </Box>
                }
                sx={{
                  m: 0,
                  p: 2,
                  width: "100%",
                  borderRadius: 3,
                  bgcolor: "var(--background)",
                  border: "1px solid",
                  borderColor: "var(--border)",
                  "& .MuiFormControlLabel-label": { ml: 2, flexGrow: 1 },
                }}
              />
            </Paper>

            {/* Security Notice */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: "rgba(239, 68, 68, 0.03)",
                color: "#ffffff",
                border: "1px dashed",
                borderColor: "rgba(239, 68, 68, 0.2)",
                borderRadius: 4,
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
              >
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "rgba(239, 68, 68, 0.1)",
                    color: "destructive.main",
                    display: "flex",
                  }}
                >
                  <Shield size={20} />
                </Box>
                <Typography variant="h6" fontWeight="600" color="error.main">
                  Security Controls
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ mb: 3, color: "var(--muted-foreground)" }}
              >
                For your protection, certain security settings are restricted.
              </Typography>

              <Stack spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "rgba(255, 255, 255, 0.03)",
                  }}
                >
                  <Info size={18} color="var(--muted-foreground)" />
                  <Typography
                    variant="body2"
                    sx={{ color: "var(--muted-foreground)" }}
                  >
                    Self-service password reset and 2FA are coming soon.
                  </Typography>
                </Box>
                <Button
                  variant="text"
                  color="error"
                  startIcon={<AlertCircle size={18} />}
                  sx={{
                    justifyContent: "flex-start",
                    px: 0,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Need to change password? Contact Support
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
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
