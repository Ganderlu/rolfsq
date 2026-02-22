"use client";

import { Box, Paper, Typography, IconButton, Button } from "@mui/material";
import { MessageCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChatWidget() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <Box
          sx={{
            position: "fixed",
            bottom: { xs: 80, md: 96 },
            right: { xs: 16, md: 24 },
            zIndex: 1300,
          }}
        >
          <Paper
            elevation={6}
            sx={{
              width: 280,
              borderRadius: 3,
              p: 2,
              bgcolor: "var(--card)",
              color: "var(--card-foreground)",
              border: "1px solid",
              borderColor: "var(--border)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1.5,
              }}
            >
              <Box>
                <Typography variant="subtitle2">Support</Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "var(--muted-foreground)" }}
                >
                  Typically replies within a few minutes
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={() => setOpen(false)}
                sx={{ color: "var(--muted-foreground)" }}
              >
                <X size={16} />
              </IconButton>
            </Box>

            <Typography
              variant="body2"
              sx={{ mb: 1.5, color: "var(--muted-foreground)" }}
            >
              Hi there 👋 How can we help you today?
            </Typography>

            <Button
              variant="contained"
              fullWidth
              sx={{
                mb: 1,
                textTransform: "none",
                bgcolor: "#2563eb",
                "&:hover": { bgcolor: "#1d4ed8" },
              }}
              onClick={() => router.push("/contact-us")}
            >
              Go to Contact Page
            </Button>

            <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>
              Our team will get back to you as soon as possible.
            </Typography>
          </Paper>
        </Box>
      )}

      <Box
        sx={{
          position: "fixed",
          bottom: { xs: 16, md: 24 },
          right: { xs: 16, md: 24 },
          zIndex: 1300,
          cursor: "pointer",
        }}
        onClick={() => setOpen((v) => !v)}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            bgcolor: "#2563eb",
            borderRadius: 999,
            px: 2.5,
            py: 1.25,
            boxShadow: "0 18px 35px rgba(37, 99, 235, 0.4)",
          }}
        >
          <Box
            sx={{ position: "relative", display: "flex", alignItems: "center" }}
          >
            <MessageCircle size={20} color="#ffffff" />
            <Box
              sx={{
                position: "absolute",
                bottom: -2,
                right: -2,
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: "#22c55e",
                border: "2px solid #2563eb",
              }}
            />
          </Box>
          <Typography
            variant="body2"
            sx={{ color: "#ffffff", fontWeight: 600, letterSpacing: 0.2 }}
          >
            Chat
          </Typography>
        </Box>
      </Box>
    </>

  );
}
