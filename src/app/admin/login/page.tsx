"use client";

import { useState, FormEvent } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseClient";
import { isAdmin } from "../../utils/isAdmin";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      const admin = await isAdmin(res.user.uid);

      if (!admin) {
        await auth.signOut();
        setError("Access denied. Admins only.");
        setLoading(false);
        return;
      }

      router.replace("/admin/dashboard");
    } catch (err) {
      setError("Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={2}
      sx={{ bgcolor: "background.default" }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 3,
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="h5" fontWeight={700} textAlign="center" mb={1} color="text.primary">
          Admin Login
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mb={3}
        >
          Authorized personnel only
        </Typography>

        {error && (
          <Typography color="error" mb={2} fontSize={14}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Admin Email"
            type="email"
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.4,
              borderRadius: "30px",
              fontWeight: 600,
              backgroundColor: "#ff7a00",
              color: "#000",
              "&:hover": { backgroundColor: "#ff8f26" },
            }}
          >
            {loading ? <CircularProgress size={22} /> : "Login"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
