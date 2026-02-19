"use client";

import { Box, Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQSection from "../components/FAQSection";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQsPage() {
  const { t } = useLanguage();

  return (
    <Box sx={{ bgcolor: "var(--background)", minHeight: "100vh" }}>
      <Navbar />
      <Box
        sx={{
          pt: 15,
          pb: 4,
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
            {t("faqs.title")}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "var(--text-secondary)",
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            {t("faqs.subtitle")}
          </Typography>
        </Container>
      </Box>

      <FAQSection />

      <Footer />
    </Box>
  );
}
