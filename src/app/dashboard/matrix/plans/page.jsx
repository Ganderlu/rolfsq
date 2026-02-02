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
} from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { useAuth } from "@/context/AuthContext";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const plans = [
  {
    price: 100,
    title: "Intermediate",
    reward: "$2",
    commission: "$26",
    cashback: "26%",
    level: "$13 x 2 = $26",
  },
  {
    price: 200,
    title: "Advanced",
    reward: "$5",
    commission: "$30",
    cashback: "15%",
    level: "$15 x 2 = $30",
    recommended: true,
  },
  {
    price: 300,
    title: "Pro",
    reward: "$8",
    commission: "$40",
    cashback: "13.33%",
    level: "$20 x 2 = $40",
  },
];

function EnrollMatrixModal({ open, onClose, plan }) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!currentUser || !plan) return;

    setLoading(true);

    try {
      await addDoc(collection(db, "matrixEnrollments"), {
        userId: currentUser.uid,
        planTitle: plan.title,
        amount: plan.price,
        reward: plan.reward,
        commission: plan.commission,
        cashback: plan.cashback,
        status: "active",
        createdAt: serverTimestamp(),
      });
      onClose();
    } catch (error) {
      console.error("Error enrolling in plan:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Join {plan?.title} Matrix Scheme</DialogTitle>
      <DialogContent>
        <Typography mb={3}>
          Are you sure you want to enroll in the {plan?.title} plan for $
          {plan?.price}?
        </Typography>

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              bgcolor: "#ff7a00",
              color: "#fff",
              "&:hover": { bgcolor: "#e66e00" },
            }}
          >
            {loading ? "Processing..." : "Confirm Enrollment"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default function MatrixPlansPage() {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <Box
      sx={{ p: { xs: 2, md: 4 }, minHeight: "100vh", color: "text.primary" }}
    >
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        Matrix Plans
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
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
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                },
              }}
            >
              {plan.recommended && (
                <Chip
                  label="RECOMMEND"
                  sx={{
                    position: "absolute",
                    top: -12,
                    right: 24,
                    bgcolor: "#ff7a00",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: "4px",
                  }}
                />
              )}

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                mb={2}
              >
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    ${plan.price}
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ opacity: 0.9 }}
                  >
                    {plan.title}
                  </Typography>
                </Box>
                <WorkspacePremiumIcon sx={{ color: "#ff7a00", fontSize: 40 }} />
              </Box>

              <Box
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 2,
                  p: 2,
                  mb: 4,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <Typography variant="body2" sx={{ mb: 1, color: "#ccc" }}>
                  Straightforward Referral Reward: {plan.reward}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, color: "#ccc" }}>
                  Aggregate Level Commission: {plan.commission}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#ff7a00", fontWeight: "bold" }}
                >
                  Get back {plan.cashback} of what you invested
                </Typography>
              </Box>

              <Typography variant="body1" mb={4} sx={{ fontWeight: 500 }}>
                Level-1 &nbsp; &gt;&gt; &nbsp; {plan.level}
              </Typography>

              <Box mt="auto">
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setSelectedPlan(plan);
                    setOpen(true);
                  }}
                  sx={{
                    bgcolor: "#ff7a00",
                    color: "#fff",
                    py: 1.5,
                    borderRadius: 50,
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": {
                      bgcolor: "#e66e00",
                    },
                  }}
                >
                  Start Investing Now
                </Button>
              </Box>
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
