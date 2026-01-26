"use client";


import { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";


export default function CryptoStats() {
const [price, setPrice] = useState<number | null>(null);


useEffect(() => {
fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
.then(res => res.json())
.then(data => setPrice(data.bitcoin.usd));
}, []);


return (
<Box py={6} display="flex" justifyContent="center">
<Paper elevation={4} sx={{ p: 4, minWidth: 300 }}>
<Typography variant="h6">Bitcoin Price</Typography>
<Typography variant="h4" fontWeight={700}>
{price ? `$${price.toLocaleString()}` : "Loading..."}
</Typography>
</Paper>
</Box>
);
}