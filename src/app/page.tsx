import { Box } from "@mui/material";
import Hero from "./components/Hero";
import CryptoStats from "./components/CryptoStats";
import FeatureCards from "./components/FeatureCards";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <Box sx={{ bgcolor: "#0f172a" }}>
      <Navbar />
      <Hero />
      <CryptoStats />
      <FeatureCards />
    </Box>
  );
}
