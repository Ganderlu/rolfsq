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
} from "@mui/material";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, onSnapshot, updateDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { toggleUserMode } from "@/app/actions/user";

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
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
        Settings
      </Typography>
      <Typography
        variant="body2"
        sx={{ mb: 4, color: "var(--muted-foreground)" }}
      >
        Configure your account details, trading preferences, and notification
        options in one place.
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 3,
              bgcolor: "var(--card)",
              color: "var(--card-foreground)",
              border: "1px solid",
              borderColor: "var(--border)",
              borderRadius: 3,
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Profile
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 3, color: "var(--muted-foreground)" }}
            >
              Review and update your basic account information.
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="Username"
                fullWidth
                value={form.username || ""}
                onChange={(e) =>
                  handleProfileChange("username", e.target.value)
                }
              />
              <TextField
                label="Full Name"
                fullWidth
                value={form.fullName || ""}
                onChange={(e) =>
                  handleProfileChange("fullName", e.target.value)
                }
              />
              <TextField
                label="Email"
                fullWidth
                value={form.email || ""}
                InputProps={{ readOnly: true }}
                helperText="Email can be changed by contacting support."
              />
              <TextField
                label="Phone"
                fullWidth
                value={form.phone || ""}
                onChange={(e) => handleProfileChange("phone", e.target.value)}
              />

              <Box display="flex" justifyContent="flex-end" mt={1}>
                <Button
                  variant="contained"
                  onClick={handleSaveProfile}
                  disabled={savingProfile}
                  sx={{
                    bgcolor: "primary.main",
                    "&:hover": { bgcolor: "primary.dark" },
                  }}
                >
                  {savingProfile ? "Saving..." : "Save Changes"}
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            <Paper
              sx={{
                p: 3,
                bgcolor: "var(--card)",
                color: "var(--card-foreground)",
                border: "1px solid",
                borderColor: "var(--border)",
                borderRadius: 3,
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Trading Mode
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "var(--muted-foreground)" }}
              >
                Choose whether your trades run in Demo or Live mode. This
                setting controls how balances are used.
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center">
                <Chip
                  label={
                    profile.mode === "live" ? "Live Trading" : "Demo Trading"
                  }
                  color={profile.mode === "live" ? "success" : "default"}
                />
                <Button
                  variant="outlined"
                  onClick={handleModeToggle}
                  disabled={modeUpdating}
                >
                  {modeUpdating
                    ? "Updating..."
                    : profile.mode === "demo"
                      ? "Switch to Live"
                      : "Switch to Demo"}
                </Button>
              </Stack>
            </Paper>

            <Paper
              sx={{
                p: 3,
                bgcolor: "var(--card)",
                color: "var(--card-foreground)",
                border: "1px solid",
                borderColor: "var(--border)",
                borderRadius: 3,
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Notifications
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "var(--muted-foreground)" }}
              >
                Decide how you want to hear from us about important account
                activity.
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={notificationEmail}
                    onChange={handleNotificationToggle}
                  />
                }
                label="Email me about important account updates"
              />
            </Paper>

            <Paper
              sx={{
                p: 3,
                bgcolor: "var(--card)",
                color: "var(--card-foreground)",
                border: "1px solid",
                borderColor: "var(--border)",
                borderRadius: 3,
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Security
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "var(--muted-foreground)" }}
              >
                For password changes and advanced security settings, please
                contact support.
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="body2"
                sx={{ color: "var(--muted-foreground)" }}
              >
                We are working on adding self-service password resets and secure
                two-factor authentication directly inside your dashboard.
              </Typography>
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
