"use client";


import { Box } from "@mui/material";


export default function MarketChart() {
return (
<Box height={400} bgcolor="#020617" borderRadius={2}>
<iframe
src="https://s.tradingview.com/widgetembed/?symbol=BINANCE:BTCUSDT&interval=30&theme=dark"
width="100%"
height="100%"
frameBorder="0"
/>
</Box>
);
}