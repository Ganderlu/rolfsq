"use client";


import { Paper, Typography, TextField, Button, Stack } from "@mui/material";


export default function QuickTrade() {
return (
<Paper sx={{ p: 3, bgcolor: "#1e293b", color: "#fff" }}>
<Typography fontWeight={700} mb={2}>Quick Trade</Typography>
<Stack spacing={2}>
<TextField label="Asset" defaultValue="BTCUSD" />
<TextField label="Amount" />
<Button variant="contained" color="success">BUY</Button>
<Button variant="contained" color="error">SELL</Button>
</Stack>
</Paper>
);
}