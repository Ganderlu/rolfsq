import { Box, Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MissionSection from "../components/MissionSection";
import PrinciplesSection from "../components/PrinciplesSection";
import WhyPrimeMax from "../components/WhyPrimeMax";
import Advisor from "../components/advisor";
import CommunitySection from "../components/CommunitySection";

export default function AboutUsPage() {
  return (
    <Box sx={{ bgcolor: "var(--background)", minHeight: "100vh" }}>
      <Navbar />
      
      {/* Page Header */}
      <Box sx={{ 
        pt: 15, 
        pb: 8, 
        textAlign: "center",
        background: "linear-gradient(180deg, rgba(11,11,11,0) 0%, rgba(11,11,11,1) 100%), url('/images/hero-bg.jpg')",
        backgroundSize: "cover"
      }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ 
            fontWeight: "bold", 
            color: "var(--foreground)",
            mb: 2
          }}>
            About Rolfsq Invest
          </Typography>
          <Typography variant="h6" sx={{ color: "var(--text-secondary)", maxWidth: "800px", mx: "auto" }}>
            Empowering traders worldwide with advanced technology, security, and transparent financial solutions.
          </Typography>
        </Container>
      </Box>

      <MissionSection />
      <WhyPrimeMax />
      <PrinciplesSection />
      <Advisor />
      <CommunitySection />
      
      <Footer />
    </Box>
  );
}
