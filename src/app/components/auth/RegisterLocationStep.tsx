"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { saveStep2 } from "../../../app/register/actions";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
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
  const router = useRouter();
  const rid = searchParams.get("rid"); // ✅ get registration id
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    try {
      const res = await saveStep2(formData);
      if (res?.success) {
        router.push(`/register/security?rid=${res.rid}`);
      } else {
        // @ts-ignore
        setError(res?.error || "Something went wrong");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  if (!rid) {
    return (
      <Typography color="error" textAlign="center">
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
        bgcolor: "var(--background)",
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            bgcolor: "var(--card)",
            borderRadius: 4,
            border: "1px solid",
            borderColor: "var(--border)",
            color: "var(--card-foreground)",
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Typography
              textAlign="center"
              fontWeight={700}
              variant="h5"
              sx={{ color: "var(--primary)" }}
              mb={1}
            >
              ROLFSQ
            </Typography>

            <Typography
              textAlign="center"
              variant="h6"
              fontWeight={600}
              sx={{ color: "var(--foreground)" }}
            >
              Join Rolfsq Invest
            </Typography>

            <Typography
              textAlign="center"
              sx={{ color: "var(--muted-foreground)" }}
              variant="body2"
              mb={3}
            >
              Start your professional trading journey
            </Typography>

            {/* Stepper */}
            <Stepper activeStep={1} alternativeLabel sx={{ mb: 4 }}>
              {["Personal Info", "Location", "Security"].map((label, index) => (
                <Step key={label} completed={index === 0}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* ✅ FORM CONNECTED TO FIREBASE */}
            <form onSubmit={handleSubmit}>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
              {/* REQUIRED */}
              <input type="hidden" name="rid" value={rid} />

              <Typography
                fontSize={14}
                fontWeight={600}
                sx={{ color: "var(--foreground)" }}
                mb={1}
              >
                Select Country
              </Typography>
              <Select
                fullWidth
                displayEmpty
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                name="country"
                required
                sx={{
                  bgcolor: "var(--background)",
                  color: "var(--foreground)",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--input)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--primary)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--ring)",
                  },
                  mb: 3,
                }}
              >
                <MenuItem value="" disabled>
                  <span className="text-muted-foreground">
                    Select your country
                  </span>
                </MenuItem>
                <MenuItem value="US">United States</MenuItem>
                <MenuItem value="UK">United Kingdom</MenuItem>
                <MenuItem value="CA">Canada</MenuItem>
                <MenuItem value="AU">Australia</MenuItem>
                <MenuItem value="NG">Nigeria</MenuItem>
                <MenuItem value="ZA">South Africa</MenuItem>
              </Select>

              {/* Actions */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  href={`/register?rid=${rid}`}
                  sx={{
                    color: "var(--muted-foreground)",
                    textTransform: "none",
                    "&:hover": { color: "var(--foreground)" },
                  }}
                >
                  ← Previous Step
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    bgcolor: "var(--primary)",
                    color: "var(--primary-foreground)",
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 4,
                    py: 1,
                    textTransform: "none",
                    "&:hover": { bgcolor: "var(--primary)", opacity: 0.9 },
                  }}
                >
                  {loading && (
                    <CircularProgress
                      size={16}
                      color="inherit"
                      sx={{ mr: 1 }}
                    />
                  )}
                  {loading ? "Saving..." : "Next Step"}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
