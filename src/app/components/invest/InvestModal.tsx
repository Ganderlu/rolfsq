"use client";

import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";

export default function InvestModal({
  open,
  onClose,
  plan,
  userId,
}: {
  open: boolean;
  onClose: () => void;
  plan: any;
  userId: string;
}) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!amount || Number(amount) <= 0) return;

    setLoading(true);

    await addDoc(collection(db, "investments"), {
      userId,
      planName: plan.title,
      duration: plan.duration,
      interest: plan.interest,
      amount: Number(amount),
      status: "active",
      createdAt: serverTimestamp(),
    });

    setLoading(false);
    onClose();
    setAmount("");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent
        sx={{
          background: "#2c2c2c",
          color: "#fff",
          borderRadius: 2,
        }}
      >
        <Typography fontWeight={600} mb={2}>
          Start Investing with the {plan.title}
        </Typography>

        <Typography fontSize={14} mb={1}>
          Amount
        </Typography>

        <Box display="flex" gap={1} mb={3}>
          <TextField
            fullWidth
            placeholder="Enter invest amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            sx={{ background: "#111", borderRadius: 1 }}
          />
          <Box
            sx={{
              px: 2,
              display: "flex",
              alignItems: "center",
              background: "#fff",
              color: "#000",
              borderRadius: 1,
            }}
          >
            USD
          </Box>
        </Box>

        <Box display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose} variant="outlined">
            Close
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              background: "#ff7a00",
              color: "#fff",
              "&:hover": { background: "#ff8f26" },
            }}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
