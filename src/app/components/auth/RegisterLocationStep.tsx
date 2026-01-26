"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { saveStep2 } from "../../../app/register/actions";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

export default function RegisterLocationStep() {
  const searchParams = useSearchParams();
  const rid = searchParams.get("rid"); // ✅ get registration id
  const [country, setCountry] = useState("");

  if (!rid) {
    return (
      <Typography color="red" textAlign="center">
        Invalid registration session
      </Typography>
    );
  }

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: "radial-gradient(circle at top, #0f172a, #020617)",
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            bgcolor: "#020617",
            borderRadius: 4,
            border: "1px solid #1e293b",
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Typography
              textAlign="center"
              fontWeight={700}
              fontSize={22}
              color="#c026d3"
              mb={1}
            >
              PRIME MAX CAPITAL
            </Typography>

            <Typography
              textAlign="center"
              fontSize={22}
              fontWeight={600}
              color="white"
            >
              Join Prime Max Capital
            </Typography>

            <Typography
              textAlign="center"
              color="#94a3b8"
              fontSize={14}
              mb={3}
            >
              Start your professional trading journey
            </Typography>

            {/* Stepper */}
            <Stepper activeStep={1} alternativeLabel sx={{ mb: 4 }}>
              {["Personal Info", "Location", "Security"].map(
                (label, index) => (
                  <Step key={label} completed={index === 0}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                )
              )}
            </Stepper>

            {/* ✅ FORM CONNECTED TO FIREBASE */}
            <form action={saveStep2}>
              {/* REQUIRED */}
              <input type="hidden" name="rid" value={rid} />

              <Typography fontSize={13} fontWeight={600} color="white" mb={1}>
                Country *
              </Typography>

              <Select
                fullWidth
                name="country" // ✅ REQUIRED
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                displayEmpty
                sx={{ mb: 3 }}
              >
                <MenuItem disabled value="">
                  Select your country
                </MenuItem>
                <MenuItem value="NG">Nigeria</MenuItem>
                <MenuItem value="US">United States</MenuItem>
                <MenuItem value="UK">United Kingdom</MenuItem>
                <MenuItem value="CA">Canada</MenuItem>
              </Select>

              <Box display="flex" justifyContent="space-between" gap={2}>
                <Button
                  variant="text"
                  sx={{ color: "#94a3b8" }}
                  href="/register"
                >
                  ← Previous Step
                </Button>

                <Button
                  type="submit" // ✅ triggers saveStep2
                  variant="contained"
                  disabled={!country}
                  sx={{
                    px: 4,
                    py: 1.2,
                    fontWeight: 600,
                    background:
                      "linear-gradient(90deg, #4f46e5, #6366f1)",
                  }}
                >
                  Continue →
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
