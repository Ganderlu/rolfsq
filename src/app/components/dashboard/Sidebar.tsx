"use client";


import { Box, Stack, Typography, Button, Drawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";


const navItems = [
"Dashboard",
"Account Statement",
"Investment Plans",
"My Portfolio",
"Live Markets",
"Deposit Funds",
"Withdraw Funds",
"Profile Settings",
];


export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down("md"));


const content = (
<Box width={260} bgcolor="#050a17" color="#fff" px={2} py={3}>
<Typography fontWeight={700} mb={3}>ROLFSQ</Typography>
<Stack spacing={1}>
{navItems.map(item => (
<Button
key={item}
fullWidth
sx={{ justifyContent: "flex-start", color: "#cbd5e1" }}
onClick={onClose}
>
{item}
</Button>
))}
</Stack>
</Box>
);


if (isMobile) {
return (
<Drawer open={open} onClose={onClose}>
{content}
</Drawer>
);
}


return content;
}