"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f4f6f8">
      <Sidebar open={open} onClose={() => setOpen(false)} />

      <Box flex={1}>
        <Header onMenu={() => setOpen(true)} />
        <Box p={{ xs: 2, md: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
