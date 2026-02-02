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
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function InvestmentPlansPage() {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const { currentUser } = useAuth();

  const plans = [
    {
      title: "Student Plan",
      duration: "5 Days",
      interest: "2%",
      limit: "$100 - $4,999",
      returnText: "10% + capital",
    },
    {
      title: "Professional Plan",
      duration: "5 Days",
      interest: "3%",
      limit: "$5,000 - $14,999",
      returnText: "15% + capital",
      recommended: true,
    },
    {
      title: "Gold Plan",
      duration: "7 Days",
      interest: "3.5%",
      limit: "$15,000 - $49,999",
      returnText: "24.5% + capital",
    },
    {
      title: "Real Estate Plan",
      duration: "1 Month",
      interest: "28%",
      limit: "$50,000 - $500,000",
      returnText: "28% + capital",
      note: "For Enterprise and Large Investors",
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, color: "#fff" }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
        Enhancing Capital through Binary Investments
      </Typography>
      <Typography variant="body2" sx={{ mb: 4, color: "gray" }}>
        Choose a plan that suits your financial goals
      </Typography>

      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item xs={12} md={6} lg={4} key={plan.title}>
            <Paper
              sx={{
                position: "relative",
                p: 4,
                bgcolor: "#1e1e1e",
                color: "#fff",
                borderRadius: 4,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  border: "1px solid #ff7a00",
                },
              }}
            >
              {plan.recommended && (
                <Chip
                  label="RECOMMENDED"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    bgcolor: "#ff7a00",
                    color: "#000",
                    fontWeight: "bold",
                    borderRadius: "4px",
                  }}
                />
              )}

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#ff7a00", mb: 1 }}
                >
                  {plan.title}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <TrendingUpIcon sx={{ color: "gray", fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    Duration: {plan.duration}
                  </Typography>
                </Stack>
              </Box>

              <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", mb: 3 }} />

              <Stack spacing={2} sx={{ mb: 4, flex: 1 }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="gray">
                    Daily Interest
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {plan.interest}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="gray">
                    Limit
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {plan.limit}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="gray">
                    Total Return
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {plan.returnText}
                  </Typography>
                </Box>
                {plan.note && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#ff7a00",
                      bgcolor: "rgba(255, 122, 0, 0.1)",
                      p: 1,
                      borderRadius: 1,
                      textAlign: "center",
                    }}
                  >
                    {plan.note}
                  </Typography>
                )}
              </Stack>

              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  setSelectedPlan(plan);
                  setOpen(true);
                }}
                sx={{
                  bgcolor: "#ff7a00",
                  color: "#000",
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    bgcolor: "#ff9533",
                  },
                }}
              >
                Invest Now
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

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
