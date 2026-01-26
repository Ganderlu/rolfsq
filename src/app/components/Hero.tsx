"use client";


import { Box, Button, Typography, Stack } from "@mui/material";
import { useRouter } from "next/navigation";


export default function Hero() {
const router = useRouter();


return (
<Box
sx={{
minHeight: "90vh",
background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
color: "#fff",
display: "flex",
alignItems: "center",
px: { xs: 3, md: 10 },
}}
>
<Stack spacing={3} maxWidth={600}>
<Typography variant="h2" fontWeight={700}>
Invest Smarter in Bitcoin
</Typography>
<Typography variant="h6" color="rgba(255,255,255,0.85)">
Rolfsq is a secure crypto investment platform designed to help you grow
your Bitcoin portfolio with transparency and control.
</Typography>
<Stack direction="row" spacing={2}>
<Button
size="large"
variant="contained"
onClick={() => router.push("/register")}
>
Get Started
</Button>
<Button
size="large"
variant="outlined"
color="inherit"
onClick={() => router.push("/login")}
>
Login
</Button>
</Stack>
</Stack>
</Box>
);
}