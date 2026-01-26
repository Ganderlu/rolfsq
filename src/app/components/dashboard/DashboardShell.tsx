"use client";

import { Box } from "@mui/material";


export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <Box display="flex" minHeight="100vh" bgcolor="#0b1220">
      

      <Box flex={1}>
        
        <Box >{children}</Box>
      </Box>
    </Box>
  );
}
