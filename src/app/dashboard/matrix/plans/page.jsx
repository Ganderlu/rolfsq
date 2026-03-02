"use client";

import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  Stack,
  Chip,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert,
} from "@mui/material";
import { enrollInMatrix } from "@/app/actions/matrix";
import { useAuth } from "@/context/AuthContext";
import { 
  Zap, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Award, 
  ChevronRight, 
  X,
  CheckCircle2,
  Gem,
  Rocket,
  Crown
} from "lucide-react";

const plans = [
  {
    price: 100,
    title: "Intermediate",
    reward: "$2",
    commission: "$26",
    cashback: "26%",
    level: "$13 x 2 = $26",
    icon: <Zap size={24} />,
    color: "#6366f1",
  },
  {
    price: 200,
    title: "Advanced",
    reward: "$5",
    commission: "$30",
    cashback: "15%",
    level: "$15 x 2 = $30",
    recommended: true,
    icon: <Rocket size={24} />,
    color: "#22c55e",
  },
  {
    price: 300,
    title: "Pro",
    reward: "$8",
    commission: "$40",
    cashback: "13.33%",
    level: "$20 x 2 = $40",
    icon: <Crown size={24} />,
    color: "#eab308",
  },
];

function EnrollMatrixModal({ open, onClose, plan }) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!currentUser || !plan) return;

    setLoading(true);
    setError(null);

    try {
      const res = await enrollInMatrix(currentUser.uid, plan);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 2500);
      }
    } catch (err) {
      setError(err.message || "Error enrolling in plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="xs"
      PaperProps={{
        sx: {
          bgcolor: "var(--card)",
          backgroundImage: "none",
          border: "1px solid",
          borderColor: "var(--border)",
          borderRadius: 4,
          color: "#ffffff"
        }
      }}
    >
      <DialogTitle sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box component="span" sx={{ fontSize: "1.25rem", fontWeight: 700 }}>
          Join {plan?.title}
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: "var(--muted-foreground)" }}>
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 2, sm: 3 }, pt: 1 }}>
        {success ? (
          <Stack spacing={2} alignItems="center" sx={{ py: 4, textAlign: "center" }}>
            <Box sx={{ p: 2, borderRadius: "50%", bgcolor: "rgba(34, 197, 94, 0.1)", color: "#22c55e" }}>
              <CheckCircle2 size={48} />
            </Box>
            <Typography variant="h6" fontWeight="700">Enrolled Successfully!</Typography>
            <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
              You have successfully joined the {plan?.title} Matrix scheme.
            </Typography>
          </Stack>
        ) : (
          <Stack spacing={3}>
            {error && (
              <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
              You are about to enroll in the <strong>{plan?.title}</strong> Matrix plan. This will deduct <strong>${plan?.price}</strong> from your account balance.
            </Typography>

            <Paper sx={{ p: 2, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: 2.5 }}>
              <Stack spacing={1.5}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>Enrollment Fee</Typography>
                  <Typography variant="caption" fontWeight="700" sx={{ color: "#ffffff" }}>${plan?.price}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>Direct Reward</Typography>
                  <Typography variant="caption" fontWeight="700" sx={{ color: "#22c55e" }}>{plan?.reward}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>Aggregate Commission</Typography>
                  <Typography variant="caption" fontWeight="700" sx={{ color: "#22c55e" }}>{plan?.commission}</Typography>
                </Stack>
              </Stack>
            </Paper>

            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <ShieldCheck size={18} />}
              sx={{
                py: 1.5,
                borderRadius: 3,
                bgcolor: plan?.color || "primary.main",
                fontWeight: "800",
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": { bgcolor: plan?.color || "primary.dark", opacity: 0.9 }
              }}
            >
              {loading ? "Processing..." : "Confirm Enrollment"}
            </Button>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function MatrixPlansPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "var(--background)",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ mb: 6, textAlign: isMobile ? "center" : "left" }}>
        <Typography variant="h4" fontWeight="800" sx={{ color: "#ffffff", mb: 1.5, display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start", gap: 1.5 }}>
          <Users size={32} color="primary.main" /> Matrix Plans
        </Typography>
        <Typography variant="body1" sx={{ color: "var(--muted-foreground)", maxWidth: "700px" }}>
          Participate in our multi-level matrix scheme to earn automated referral rewards and aggregate commissions.
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
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
                  label="POPULAR"
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
                <Typography variant="h3" fontWeight="900" sx={{ color: "#ffffff", mb: 1 }}>
                  ${plan.price}
                </Typography>
                <Typography variant="caption" sx={{ color: "var(--muted-foreground)", fontWeight: "700", textTransform: "uppercase", letterSpacing: 1 }}>
                  Enrollment Package
                </Typography>
              </Box>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mb: 4 }} />

              <Stack spacing={2.5} sx={{ mb: 5, flex: 1 }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Award size={18} color={plan.color} />
                  <Box>
                    <Typography variant="caption" sx={{ color: "var(--muted-foreground)", display: "block" }}>Direct Reward</Typography>
                    <Typography variant="body2" fontWeight="700" sx={{ color: "#ffffff" }}>{plan.reward} per referral</Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1.5} alignItems="center">
                  <TrendingUp size={18} color="#22c55e" />
                  <Box>
                    <Typography variant="caption" sx={{ color: "var(--muted-foreground)", display: "block" }}>Aggregate Commission</Typography>
                    <Typography variant="body2" fontWeight="700" sx={{ color: "#ffffff" }}>{plan.commission} total level bonus</Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1.5} alignItems="center">
                  <ShieldCheck size={18} color={plan.color} />
                  <Box>
                    <Typography variant="caption" sx={{ color: "var(--muted-foreground)", display: "block" }}>Cashback Guarantee</Typography>
                    <Typography variant="body2" fontWeight="700" sx={{ color: plan.color }}>{plan.cashback} Return on Investment</Typography>
                  </Box>
                </Stack>

                <Box sx={{ 
                  mt: 2, 
                  p: 1.5, 
                  borderRadius: 2, 
                  bgcolor: "rgba(255,255,255,0.02)", 
                  border: "1px dashed rgba(255,255,255,0.1)"
                }}>
                  <Typography variant="caption" sx={{ color: "var(--muted-foreground)", display: "block", mb: 0.5, textAlign: "center" }}>
                    Level-1 Structure
                  </Typography>
                  <Typography variant="body2" fontWeight="800" sx={{ color: "#ffffff", textAlign: "center" }}>
                    {plan.level}
                  </Typography>
                </Box>
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
                Join Matrix Scheme
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <EnrollMatrixModal
        open={open}
        onClose={() => setOpen(false)}
        plan={selectedPlan}
      />
    </Box>
  );
}
