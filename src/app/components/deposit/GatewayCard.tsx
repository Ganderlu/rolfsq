"use client";

import { Paper, Typography, Button, Box } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function GatewayCard({ title }: { title: string }) {
  return (
    <Paper
      sx={{
        height: "100%",
        p: 3,
        background: "linear-gradient(180deg,#111,#060606)",
        border: "1px solid #1c1c1c",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography fontWeight={600}>{title}</Typography>

      <Box mt={3} textAlign="center">
        <Button
          variant="contained"
          endIcon={<OpenInNewIcon />}
          sx={{
            backgroundColor: "#ff7a00",
            color: "#FFF",
            fontWeight: 600,
            px: 3,
            borderRadius: "20px",
            "&:hover": { backgroundColor: "#ff8f26" },
          }}
        >
          Deposit Now
        </Button>
      </Box>
    </Paper>
  );
}
