import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShieldCheck, FileCheck, Globe, Building2 } from "lucide-react";

export default function LicensePage() {
  return (
    <Box sx={{ bgcolor: "var(--background)", minHeight: "100vh" }}>
      <Navbar />

      {/* Page Header */}
      <Box
        sx={{
          pt: 15,
          pb: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: "var(--foreground)",
              mb: 2,
            }}
          >
            Licensing & Regulation
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "var(--text-secondary)", maxWidth: "800px", mx: "auto" }}
          >
            We operate under strict regulatory standards to ensure the safety
            and security of your investments.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                bgcolor: "var(--card)",
                border: "1px solid var(--border)",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <ShieldCheck size={32} color="#10b981" />
                  <Typography
                    variant="h5"
                    sx={{
                      ml: 2,
                      fontWeight: "bold",
                      color: "var(--foreground)",
                    }}
                  >
                    Registered Entity
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", mb: 2 }}
                >
                  Rolfsq Invest is a fully registered financial services
                  provider, operating in compliance with international financial
                  laws.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "var(--primary)", fontWeight: "bold" }}
                  >
                    Registration Number:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    RF-2024-8892-GLOBAL
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                bgcolor: "var(--card)",
                border: "1px solid var(--border)",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <FileCheck size={32} color="#f59e0b" />
                  <Typography
                    variant="h5"
                    sx={{
                      ml: 2,
                      fontWeight: "bold",
                      color: "var(--foreground)",
                    }}
                  >
                    Compliance & Audit
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", mb: 2 }}
                >
                  Our platform undergoes regular third-party audits to verify
                  solvency, security protocols, and fair trading practices.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "var(--primary)", fontWeight: "bold" }}
                  >
                    Regulator:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Global Financial Markets Authority (GFMA)
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{ p: 3, border: "1px solid var(--border)", borderRadius: 2 }}
            >
              <Globe size={24} className="text-blue-500 mb-2" />
              <Typography
                variant="h6"
                sx={{ color: "var(--foreground)", mb: 1 }}
              >
                Global Coverage
              </Typography>
              <Typography variant="body2" sx={{ color: "var(--text-secondary)" }}>
                Licensed to operate in over 150 countries worldwide, excluding
                restricted jurisdictions.
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{ p: 3, border: "1px solid var(--border)", borderRadius: 2 }}
            >
              <Building2 size={24} className="text-purple-500 mb-2" />
              <Typography
                variant="h6"
                sx={{ color: "var(--foreground)", mb: 1 }}
              >
                Headquarters
              </Typography>
              <Typography variant="body2" sx={{ color: "var(--text-secondary)" }}>
                12 Financial District, Canary Wharf, London, United Kingdom.
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{ p: 3, border: "1px solid var(--border)", borderRadius: 2 }}
            >
              <ShieldCheck size={24} className="text-emerald-500 mb-2" />
              <Typography
                variant="h6"
                sx={{ color: "var(--foreground)", mb: 1 }}
              >
                Insurance
              </Typography>
              <Typography variant="body2" sx={{ color: "var(--text-secondary)" }}>
                Client funds are insured up to $1,000,000 against platform
                insolvency.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}
