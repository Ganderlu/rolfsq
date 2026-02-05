import { Box, Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQSection from "../components/FAQSection";

export default function FAQsPage() {
  return (
    <Box sx={{ bgcolor: "var(--background)", minHeight: "100vh" }}>
      <Navbar />
      
      {/* Page Header */}
      <Box sx={{ 
        pt: 15, 
        pb: 4, 
        textAlign: "center"
      }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ 
            fontWeight: "bold", 
            color: "var(--foreground)",
            mb: 2
          }}>
            Frequently Asked Questions
          </Typography>
          <Typography variant="h6" sx={{ color: "var(--text-secondary)", maxWidth: "800px", mx: "auto" }}>
            Find answers to common questions about our platform, trading, and account management.
          </Typography>
        </Container>
      </Box>

      <FAQSection />
      
      <Footer />
    </Box>
  );
}
