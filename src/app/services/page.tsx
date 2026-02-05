import { Box, Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServicesSection from "../components/ServicesSection";
import PlansSection from "../components/PlansSection";
import TradeSection from "../components/TradeSection";
import FeatureCards from "../components/FeatureCards";
import TradingHero from "../components/TradingHero";

export default function ServicesPage() {
  return (
    <Box sx={{ bgcolor: "var(--background)", minHeight: "100vh" }}>
      <Navbar />
      
      {/* Page Header */}
      {/* <Box sx={{ 
        pt: 15, 
        pb: 8, 
        textAlign: "center"
      }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ 
            fontWeight: "bold", 
            color: "var(--foreground)",
            mb: 2
          }}>
            Our Services
          </Typography>
          <Typography variant="h6" sx={{ color: "var(--muted-foreground)", maxWidth: "800px", mx: "auto" }}>
            Comprehensive trading solutions designed for both beginners and professional investors.
          </Typography>
        </Container>
      </Box> */}

      <ServicesSection />
      <TradeSection />
      <FeatureCards />
      <PlansSection />
      <TradingHero />
      
      <Footer />
    </Box>
  );
}
