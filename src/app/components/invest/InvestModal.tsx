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
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          bgcolor: "var(--card)",
          color: "var(--card-foreground)",
          border: "1px solid",
          borderColor: "var(--border)",
          backgroundImage: "none",
        },
      }}
    >
      <DialogContent>
        <Typography fontWeight={600} mb={2}>
          Start Investing with the {plan.title}
        </Typography>

        <Typography fontSize={14} mb={1} sx={{ color: "var(--muted-foreground)" }}>
          Amount
        </Typography>

        <Box display="flex" gap={1} mb={3}>
          <TextField
            fullWidth
            placeholder="Enter invest amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            sx={{
              "& .MuiInputBase-root": {
                bgcolor: "var(--background)",
                color: "var(--foreground)",
                borderRadius: 1,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--input)",
              },
            }}
          />
          <Box
            sx={{
              px: 2,
              display: "flex",
              alignItems: "center",
              bgcolor: "var(--background)",
              color: "var(--foreground)",
              border: "1px solid",
              borderColor: "var(--input)",
              borderRadius: 1,
            }}
          >
            USD
          </Box>
        </Box>

        <Box display="flex" justifyContent="flex-end" gap={1}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              color: "var(--muted-foreground)",
              borderColor: "var(--border)",
              "&:hover": { borderColor: "var(--foreground)", color: "var(--foreground)" },
            }}
          >
            Close
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              bgcolor: "var(--primary)",
              color: "var(--primary-foreground)",
              "&:hover": { bgcolor: "var(--primary)", opacity: 0.9 },
            }}
          >
            {loading ? "Processing..." : "Invest"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
