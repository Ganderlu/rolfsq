"use client";


import { Box, Typography, Button, Stack, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Sidebar from "./Sidebar";


export default function Topbar() {
const [open, setOpen] = useState(false);


return (
<>
<Sidebar open={open} onClose={() => setOpen(false)} />
<Box
px={2}
py={2}
bgcolor="#050a17"
display="flex"
justifyContent="space-between"
alignItems="center"
>
<Stack direction="row" spacing={2} alignItems="center">
<IconButton onClick={() => setOpen(true)} sx={{ color: "#fff", display: { md: "none" } }}>
<MenuIcon />
</IconButton>
<Typography color="#fff">Welcome back, User</Typography>
</Stack>


<Stack direction="row" spacing={2}>
<Button variant="contained" color="success" size="small">Wallet Connected</Button>
<Button variant="contained" size="small">Invest</Button>
</Stack>
</Box>
</>
);
}