"use client";

import { Grid, Paper, Typography, Box, Container } from "@mui/material";
import { ShieldCheck, TrendingUp, Wallet } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    text: "Firebase-backed authentication and top-tier data security standards.",
  },
  {
    icon: TrendingUp,
    title: "Smart Investments",
    text: "Advanced algorithms to track and manage your digital asset portfolio.",
  },
  {
    icon: Wallet,
    title: "Real-Time Tracking",
    text: "Monitor your balances, trades, and investment status instantly.",
  },
];

export default function FeatureCards() {
  return (
    <Container maxWidth="xl" sx={{ pb: 16 }}>
      <Grid container spacing={8}>
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Paper
                elevation={0}
                sx={{
                  p: 8,
                  height: "100%",
                  bgcolor: "var(--card)",
                  border: "1px solid",
                  borderColor: "var(--border)",
                  color: "var(--card-foreground)",
                  borderRadius: 4,
                  transition: "all 0.3s",
                  "&:hover": {
                    bgcolor: "var(--accent)",
                    transform: "translateY(-5px)",
                    borderColor: "var(--primary)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    p: 2,
                    borderRadius: 3,
                    bgcolor: "rgba(59,130,246,0.1)",
                    color: "var(--primary)",
                    mb: 3,
                  }}
                >
                  <Icon size={32} />
                </Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {f.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="var(--muted-foreground)"
                  lineHeight={1.7}
                >
                  {f.text}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
