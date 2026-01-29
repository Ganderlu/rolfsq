import { Box } from "@mui/material";
import Hero from "./components/Hero";
import CryptoStats from "./components/CryptoStats";
import TradeSection from "./components/TradeSection";
import CommunitySection from "./components/CommunitySection";
import WhyPrimeMax from "./components/WhyPrimeMax";
import FeatureCards from "./components/FeatureCards";
import Advisor from "./components/advisor";
import Navbar from "./components/Navbar";
import CreditCard from "./components/CreditCard";
import MissionSection from "./components/MissionSection";
import PlansSection from "./components/PlansSection";
import PrinciplesSection from "./components/PrinciplesSection";
import ServicesSection from "./components/ServicesSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <Box sx={{ bgcolor: "#0f172a" }}>
      <Navbar />
      <Hero />
      <CryptoStats />
      <FeatureCards />
      <TradeSection />
      <WhyPrimeMax />
      <CommunitySection />
      <Advisor/>
      <PrinciplesSection />
      <ServicesSection />
      <CreditCard />
      <MissionSection />
      <PlansSection />
      <Footer/>
    </Box>
  );
}
