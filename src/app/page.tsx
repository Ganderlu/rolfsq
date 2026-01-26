import { Box } from "@mui/material";
import Hero from "./components/Hero";
import CryptoStats from "./components/CryptoStats";
import FeatureCards from "./components/FeatureCards";


export default function Home() {
return (
<Box>
<Hero />
<CryptoStats />
<FeatureCards />
</Box>
);
}