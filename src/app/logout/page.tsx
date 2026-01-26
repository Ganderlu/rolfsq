"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/firebaseClient";
import { Box, Typography, CircularProgress, Container, Paper } from "@mui/material";
import { LogOut } from "lucide-react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await auth.signOut();
        // Add a small delay for better UX so the user sees the "Logging out" animation
        setTimeout(() => {
          router.replace("/login");
        }, 1500);
      } catch (error) {
        console.error("Error signing out:", error);
        // Even if error, try to redirect
        router.replace("/login");
      }
    };

    performLogout();
  }, [router]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#0f172a", // Dark theme background
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            bgcolor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 4,
            color: "#fff",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              p: 2,
              borderRadius: "50%",
              bgcolor: "rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
              mb: 1,
            }}
          >
            <LogOut size={40} />
          </Box>
          
          <Box>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Signing Out
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.6)">
              Please wait while we securely log you out...
            </Typography>
          </Box>

          <CircularProgress 
            size={24} 
            sx={{ 
              color: "#3b82f6",
              mt: 2 
            }} 
          />
        </Paper>
      </Container>
    </Box>
  );
}
