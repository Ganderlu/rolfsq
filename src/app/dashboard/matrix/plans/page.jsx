"use client";

import { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { useAuth } from "@/context/AuthContext";

const plans = [
  {
    price: 100,
    title: "Intermediate",
    reward: "$2",
    commission: "$26",
    cashback: "26%",
    level: "$13 × 2 = $26",
  },
  {
    price: 200,
    title: "Advanced",
    reward: "$5",
    commission: "$30",
    cashback: "15%",
    level: "$15 × 2 = $30",
    recommended: true,
  },
  {
    price: 300,
    title: "Pro",
    reward: "$8",
    commission: "$40",
    cashback: "13.33%",
    level: "$20 × 2 = $40",
  },
];

function EnrollMatrixModal({ open, onClose, plan }) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!currentUser || !plan) return;

    setLoading(true);

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

    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Join {plan?.title} Matrix Scheme</DialogTitle>

      <DialogContent>
        <Typography mb={3}>
          Are you sure you want to enroll in this matrix scheme?
        </Typography>

        <Box display="flex" justifyContent="flex-end">
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ backgroundColor: "#ff7a00", color: "#000" }}
          >
            Submit
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
    <Box sx={{ p: { xs: 2, md: 4 }, background: "#000", minHeight: "100vh" }}>
      <Grid container spacing={3}>
        {plans.map((plan, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                background: "linear-gradient(145deg, #111, #2a1a0f)",
                borderRadius: 3,
                color: "#fff",
                position: "relative",
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
                    backgroundColor: "#ff7a00",
                    color: "#000",
                    fontWeight: 700,
                  }}
                />
              )}

              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Typography variant="h5" fontWeight={700}>
                  ${plan.price}
                </Typography>
                <Typography variant="subtitle1" mb={2}>
                  {plan.title}
                </Typography>

                <Box
                  sx={{
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 2,
                    p: 2,
                    mb: 2,
                  }}
                >
                  <Typography variant="body2">
                    Straightforward Referral Reward: {plan.reward}
                  </Typography>
                  <Typography variant="body2">
                    Aggregate Level Commission: {plan.commission}
                  </Typography>
                  <Typography variant="body2" color="#ff7a00">
                    Get back {plan.cashback} of what you invested
                  </Typography>
                </Box>

                <Typography variant="body2" mb={3}>
                  Level-1 &nbsp; &gt;&gt; &nbsp; {plan.level}
                </Typography>

                <Box
                  sx={{
                    p: { xs: 2, md: 4 },
                    background: "#000",
                    minHeight: "100vh",
                  }}
                >
                  <Grid container spacing={3}>
                    {plans.map((plan, index) => (
                      <Grid item xs={12} md={4} key={index}>
                        ...
                        <Button
                          fullWidth
                          onClick={() => {
                            setSelectedPlan(plan);
                            setOpen(true);
                          }}
                        >
                          Start Investing Now
                        </Button>
                      </Grid>
                    ))}
                  </Grid>

                  <EnrollMatrixModal
                    open={open}
                    onClose={() => setOpen(false)}
                    plan={selectedPlan}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
