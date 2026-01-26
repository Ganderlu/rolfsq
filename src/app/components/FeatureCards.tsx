import { Grid, Paper, Typography } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";


const features = [
{ icon: <SecurityIcon fontSize="large" />, title: "Secure Platform", text: "Firebase-backed authentication and data security." },
{ icon: <TrendingUpIcon fontSize="large" />, title: "Smart Investments", text: "Track and manage your Bitcoin investments." },
{ icon: <AccountBalanceWalletIcon fontSize="large" />, title: "Real-Time Tracking", text: "Monitor balances and investment status." },
];


export default function FeatureCards() {
return (
<Grid container spacing={3} px={{ xs: 2, md: 10 }} pb={8}>
{features.map((f, i) => (
<Grid item xs={12} md={4} key={i}>
<Paper sx={{ p: 4, textAlign: "center" }}>
{f.icon}
<Typography variant="h6" mt={2}>{f.title}</Typography>
<Typography color="text.secondary">{f.text}</Typography>
</Paper>
</Grid>
))}
</Grid>
);
}