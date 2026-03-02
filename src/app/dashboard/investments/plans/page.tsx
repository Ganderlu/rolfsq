"use client";

import { useState } from "react";
import InvestModal from "@/app/components/invest/InvestModal";
import { useAuth } from "@/context/AuthContext";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  TrendingUp,
  Clock,
  ShieldCheck,
  ChevronRight,
  Target,
  BarChart3,
  Gem,
  Building2,
} from "lucide-react";

export default function InvestmentPlansPage() {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const { currentUser } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const plans = [
    {
      title: "Student Plan",
      duration: "5 Days",
      interest: "2%",
      limit: "$100 - $4,999",
      returnText: "10% + capital",
      icon: <Target size={24} />,
      color: "#6366f1",
    },
    {
      title: "Professional Plan",
      duration: "5 Days",
      interest: "3%",
      limit: "$5,000 - $14,999",
      returnText: "15% + capital",
      recommended: true,
      icon: <BarChart3 size={24} />,
      color: "#22c55e",
    },
    {
      title: "Gold Plan",
      duration: "7 Days",
      interest: "3.5%",
      limit: "$15,000 - $49,999",
      returnText: "24.5% + capital",
      icon: <Gem size={24} />,
      color: "#eab308",
    },
    {
      title: "Real Estate Plan",
      duration: "1 Month",
      interest: "28%",
      limit: "$50,000 - $500,000",
      returnText: "28% + capital",
      note: "For Enterprise and Large Investors",
      icon: <Building2 size={24} />,
      color: "#ef4444",
    },
  ];

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "var(--background)",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight="800" sx={{ color: "#ffffff", mb: 1.5, display: "flex", alignItems: "center", gap: 1.5 }}>
          <TrendingUp size={32} color="primary.main" /> Investment Plans
        </Typography>
        <Typography variant="body1" sx={{ color: "var(--muted-foreground)", maxWidth: "700px" }}>
          Securely grow your wealth with our curated binary investment strategies. Choose a plan that fits your financial objectives.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item xs={12} md={6} lg={4} key={plan.title}>
            <Paper
              elevation={0}
              sx={{
                position: "relative",
                p: { xs: 3, md: 4 },
                bgcolor: "var(--card)",
                borderRadius: 4,
                border: "1px solid",
                borderColor: plan.recommended ? "primary.main" : "var(--border)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${plan.color}10`,
                  borderColor: plan.color,
                },
              }}
            >
              {plan.recommended && (
                <Chip
                  label="BEST VALUE"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: -12,
                    right: 24,
                    bgcolor: "primary.main",
                    color: "#ffffff",
                    fontWeight: "800",
                    fontSize: "0.7rem",
                    borderRadius: 1,
                    px: 1,
                    boxShadow: "0 4px 10px rgba(99, 102, 241, 0.4)",
                  }}
                />
              )}

              <Box sx={{ mb: 4 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: `${plan.color}15`, color: plan.color, display: "flex" }}>
                    {plan.icon}
                  </Box>
                  <Typography variant="h5" fontWeight="800" sx={{ color: "#ffffff" }}>
                    {plan.title}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Clock size={16} color="var(--muted-foreground)" />
                  <Typography variant="body2" sx={{ color: "var(--muted-foreground)", fontWeight: "600" }}>
                    Duration: {plan.duration}
                  </Typography>
                </Stack>
              </Box>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mb: 4 }} />

              <Stack spacing={2.5} sx={{ mb: 5, flex: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" sx={{ color: "var(--muted-foreground)", fontWeight: "500" }}>
                    Daily Return
                  </Typography>
                  <Typography variant="h6" fontWeight="800" sx={{ color: plan.color }}>
                    {plan.interest}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" sx={{ color: "var(--muted-foreground)", fontWeight: "500" }}>
                    Investment Limit
                  </Typography>
                  <Typography variant="body1" fontWeight="700" sx={{ color: "#ffffff" }}>
                    {plan.limit}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" sx={{ color: "var(--muted-foreground)", fontWeight: "500" }}>
                    Total Return
                  </Typography>
                  <Typography variant="body1" fontWeight="700" sx={{ color: "#22c55e" }}>
                    {plan.returnText}
                  </Typography>
                </Box>
                {plan.note && (
                  <Box sx={{ 
                    mt: 2, 
                    p: 1.5, 
                    borderRadius: 2, 
                    bgcolor: "rgba(255,255,255,0.02)", 
                    border: "1px dashed rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                  }}>
                    <Typography variant="caption" sx={{ color: plan.color, fontWeight: "700", textAlign: "center", width: "100%" }}>
                      {plan.note}
                    </Typography>
                  </Box>
                )}
              </Stack>

              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  setSelectedPlan(plan);
                  setOpen(true);
                }}
                endIcon={<ChevronRight size={18} />}
                sx={{
                  bgcolor: plan.color,
                  color: "#ffffff",
                  py: 1.8,
                  borderRadius: 3,
                  fontWeight: "800",
                  textTransform: "none",
                  fontSize: "1rem",
                  boxShadow: `0 8px 20px ${plan.color}25`,
                  "&:hover": {
                    bgcolor: plan.color,
                    opacity: 0.9,
                    transform: "scale(1.02)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                Start Investment
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mt: 8, mb: 4, opacity: 0.6 }}>
        <ShieldCheck size={16} color="var(--muted-foreground)" />
        <Typography variant="caption" sx={{ color: "var(--muted-foreground)", fontWeight: "600" }}>
          All investments are protected by end-to-end encryption and cold storage security.
        </Typography>
      </Stack>

      {selectedPlan && currentUser && (
        <InvestModal
          open={open}
          onClose={() => setOpen(false)}
          plan={selectedPlan}
          userId={currentUser.uid}
        />
      )}
    </Box>
  );
}
