"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Paper, Container } from "@mui/material";

export default function CryptoStats() {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
    )
      .then((res) => res.json())
      .then((data) => setPrice(data.bitcoin.usd));
  }, []);

  return (
    <Box py={16} display="flex" justifyContent="center">
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: 8,
            textAlign: "center",
            bgcolor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
            borderRadius: 4,
          }}
        >
          <Typography variant="h6" color="rgba(255,255,255,0.6)" mb={1}>
            Bitcoin Live Price
          </Typography>
          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              background: "linear-gradient(to right, #fff, #94a3b8)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {price ? `$${price.toLocaleString()}` : "Loading..."}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
