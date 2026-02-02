"use client";

import {
  Box,
  Card,
  Typography,
  Button,
  Grid,
  Chip,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShieldIcon from "@mui/icons-material/Shield";
import { useRouter } from "next/navigation";

const steps = ["Payment Method", "Send Payment", "Confirmation"];

export default function DepositConfirmationPage() {
  const router = useRouter();

  return (
    <Box
      minHeight="100vh"
      px={{ xs: 2, md: 6 }}
      py={6}
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Chip
          icon={<ShieldIcon />}
          label="Secure Payment Confirmation"
          sx={{
            mb: 2,
            bgcolor: "background.paper",
            color: "primary.main",
            border: 1,
            borderColor: "divider",
          }}
        />

        <Typography fontSize={26} fontWeight={700}>
          Deposit Submitted Successfully
        </Typography>
        <Typography color="text.secondary" fontSize={14} mt={1}>
          Your payment proof has been received and is under review
        </Typography>
      </Box>

      {/* Stepper */}
      <Box maxWidth={700} mx="auto" mb={4}>
        <Stepper activeStep={2} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Confirmation Card */}
      <Card
        sx={{
          maxWidth: 700,
          mx: "auto",
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          borderRadius: 4,
          p: { xs: 3, md: 4 },
          textAlign: "center",
        }}
      >
        {/* Success Icon */}
        <CheckCircleIcon sx={{ fontSize: 80, color: "success.main", mb: 2 }} />

        <Typography fontSize={22} fontWeight={700} mb={1}>
          Payment Proof Submitted
        </Typography>

        <Typography fontSize={14} color="text.secondary" mb={3}>
          Our team is reviewing your deposit. This usually takes a few minutes.
        </Typography>

        {/* Deposit Summary */}
        <Card
          sx={{
            bgcolor: "action.hover",
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
            p: 3,
            textAlign: "left",
            mb: 3,
          }}
        >
          <Typography fontWeight={600} mb={2}>
            Deposit Summary
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <Typography fontSize={13} color="text.secondary">
                Payment Method
              </Typography>
              <Typography fontWeight={600}>USDT</Typography>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Typography fontSize={13} color="text.secondary">
                Amount
              </Typography>
              <Typography fontWeight={600}>100.00 USD</Typography>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Typography fontSize={13} color="text.secondary">
                Status
              </Typography>
              <Chip label="Pending Confirmation" color="warning" size="small" />
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Typography fontSize={13} color="text.secondary">
                Reference ID
              </Typography>
              <Typography fontWeight={600}>DEP-982374</Typography>
            </Grid>
          </Grid>
        </Card>

        {/* Info */}
        <Typography fontSize={13} color="text.secondary" mb={3}>
          Once confirmed, your balance will be credited automatically and you
          can start trading immediately.
        </Typography>

        {/* Actions */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Button
              fullWidth
              size="large"
              variant="outlined"
              onClick={() => router.push("/dashboard")}
            >
              Go to Dashboard
            </Button>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Button
              fullWidth
              size="large"
              sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                "&:hover": { bgcolor: "primary.dark" },
              }}
              onClick={() => router.push("/dashboard/deposit")}
            >
              Make Another Deposit
            </Button>
          </Grid>
        </Grid>

        <Typography fontSize={11} color="text.secondary" mt={3} textAlign="center">
          Deposits are protected with 256-bit SSL encryption
        </Typography>
      </Card>

      {/* Trust Section */}
      <Grid container spacing={2} maxWidth={700} mx="auto" mt={4}>
        {[
          "24/7 Customer Support",
          "Fast Confirmation",
          "Enterprise-Level Security",
        ].map((item) => (
          <Grid size={{ xs: 12, md: 4 }} key={item}>
            <Card
              sx={{
                bgcolor: "background.paper",
                border: 1,
                borderColor: "divider",
                p: 3,
                textAlign: "center",
              }}
            >
              <Typography fontWeight={600}>{item}</Typography>
              <Typography fontSize={12} color="text.secondary">
                Your funds are always protected
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
