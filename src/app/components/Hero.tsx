"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";

export default function Hero() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "90vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decor */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(50px)",
        }}
      />

      <Container maxWidth="xl">
        <Stack
          spacing={8}
          maxWidth={800}
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Stack spacing={4}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: 10,
                bgcolor: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.2)",
                width: "fit-content",
              }}
            >
              <ShieldCheck size={16} color="#3b82f6" />
              <Typography variant="caption" color="#60a5fa" fontWeight={600}>
                SECURE & REGULATED PLATFORM
              </Typography>
            </Box>

            <Typography
              variant="h1"
              fontWeight={800}
              sx={{
                fontSize: { xs: "2.5rem", md: "4.5rem" },
                lineHeight: 1.1,
                background: "linear-gradient(to right, #fff, #94a3b8)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Invest Smarter in <br />
              <span style={{ color: "#3b82f6" }}>Digital Assets</span>
            </Typography>

            <Typography
              variant="h6"
              color="rgba(255,255,255,0.7)"
              maxWidth={600}
              sx={{ fontSize: { xs: "1rem", md: "1.25rem" }, lineHeight: 1.6 }}
            >
              Rolfsq provides a secure, transparent, and efficient way to grow
              your portfolio. Join thousands of investors earning passive income
              through our advanced trading algorithms.
            </Typography>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              size="large"
              variant="contained"
              endIcon={<ArrowRight size={20} />}
              sx={{
                bgcolor: "#3b82f6",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: 2,
                textTransform: "none",
                "&:hover": { bgcolor: "#2563eb" },
              }}
              onClick={() => router.push("/register")}
            >
              Start Investing
            </Button>
            <Button
              size="large"
              variant="outlined"
              startIcon={<TrendingUp size={20} />}
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.2)",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: 2,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#fff",
                  bgcolor: "rgba(255,255,255,0.05)",
                },
              }}
              onClick={() => router.push("/login")}
            >
              View Markets
            </Button>
          </Stack>

          {/* Stats */}
          <Stack
            direction="row"
            spacing={{ xs: 4, md: 8 }}
            divider={
              <Box
                sx={{
                  width: "1px",
                  height: 40,
                  bgcolor: "rgba(255,255,255,0.1)",
                }}
              />
            }
          >
            <Box>
              <Typography variant="h4" fontWeight={700} color="#fff">
                $50M+
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.5)">
                Assets Managed
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight={700} color="#fff">
                25k+
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.5)">
                Active Investors
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight={700} color="#fff">
                120+
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.5)">
                Countries
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
