"use client";

import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
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
      sx={{
        background: "linear-gradient(180deg,#050505,#000)",
        px: 2,
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 3,
          background: "linear-gradient(180deg,#111,#050505)",
          border: "1px solid #1c1c1c",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          mb={1}
          textAlign="center"
        >
          Login
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mb={3}
          textAlign="center"
        >
          Sign in to continue
        </Typography>

        {error && (
          <Typography color="error" mb={2} fontSize={14}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            required
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
              fontWeight: 600,
              backgroundColor: "#ff7a00",
              color: "#000",
              borderRadius: "30px",
              "&:hover": {
                backgroundColor: "#ff8f26",
              },
            }}
          >
            {loading ? <CircularProgress size={22} /> : "Login"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
