"use client";

import { Box, Button, Container, Paper, Typography } from "@mui/material";

const rows = [
  {
    product: "ADAUSD",
    spread: "0.00102",
    price: "0.99",
    d: "+1.03%",
    w: "-0.79%",
    up: true,
  },
  {
    product: "AUDJPY",
    spread: "0.011",
    price: "96.79",
    d: "-0.25%",
    w: "-0.06%",
    up: false,
  },
  {
    product: "AUDUSD",
    spread: "0.0001",
    price: "0.62",
    d: "+0.11%",
    w: "+0.03%",
    up: true,
  },
  {
    product: "BTCUSD",
    spread: "16.1",
    price: "104729.70",
    d: "+0.16%",
    w: "+0.46%",
    up: true,
  },
  {
    product: "EURJPY",
    spread: "0.018",
    price: "161.71",
    d: "-0.40%",
    w: "-0.03%",
    up: false,
  },
  {
    product: "GBPJPY",
    spread: "0.019",
    price: "193.15",
    d: "-0.25%",
    w: "-0.09%",
    up: false,
  },
  {
    product: "GBPUSD",
    spread: "0.0001",
    price: "1.25",
    d: "+0.13%",
    w: "+0.02%",
    up: true,
  },
  {
    product: "USDHKD",
    spread: "0.0003",
    price: "7.79",
    d: "0.00%",
    w: "0.00%",
    up: true,
  },
  {
    product: "USDJPY",
    spread: "0.008",
    price: "155.12",
    d: "-0.38%",
    w: "-0.11%",
    up: false,
  },
  {
    product: "XAUUSD",
    spread: "0.46",
    price: "2771.58",
    d: "+0.34%",
    w: "+0.54%",
    up: true,
  },
];

export default function TradeSection() {
  return (
    <Box py={{ xs: 6, md: 10 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          flexDirection={{ xs: "column", md: "row" }}
          gap={3}
        >
          <Box maxWidth={520}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              TRADE THE WAY YOU WANT
            </Typography>
            <Typography color="text.secondary">
              Choose between forex, gold, cannabis, and real estate — with
              account types and strategies to suit any investment style. At OFL
              (Prime Max Capital), we provide the tools and flexibility to build
              your ideal portfolio.
            </Typography>
          </Box>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#9c27b0",
              px: 4,
              py: 1.2,
              borderRadius: 1,
              fontWeight: 600,
              "&:hover": { bgcolor: "#7b1fa2" },
            }}
          >
            FIND OUT MORE
          </Button>
        </Box>

        {/* Table Card */}
        <Box mt={6} display="flex" justifyContent="center">
          <Paper
            sx={{
              width: "100%",
              maxWidth: 900,
              p: 3,
              borderRadius: 3,
              bgcolor: "var(--card)",
              border: "1px solid",
              borderColor: "var(--border)",
              color: "var(--card-foreground)",
              overflowX: "auto",
            }}
          >
            {/* Header Row */}
            <Box
              display="grid"
              gridTemplateColumns="repeat(7, minmax(120px, 1fr))"
              fontSize={13}
              color="var(--muted-foreground)"
              mb={2}
            >
              <div>Product</div>
              <div>Min Spread</div>
              <div>Margin</div>
              <div>Price</div>
              <div>Daily Change</div>
              <div>Weekly Change</div>
              <div>Trend (24H)</div>
            </Box>

            {/* Rows */}
            {rows.map((r) => (
              <Box
                key={r.product}
                display="grid"
                gridTemplateColumns="repeat(7, minmax(120px, 1fr))"
                alignItems="center"
                py={1}
                fontSize={14}
                sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <strong>{r.product}</strong>
                <div>{r.spread}</div>
                <div>-</div>
                <strong>{r.price}</strong>

                <Change value={r.d} up={r.up} />
                <Change value={r.w} up={r.up} />

                <Trend up={r.up} />
              </Box>
            ))}

            <Typography
              variant="caption"
              color="text.secondary"
              mt={2}
              display="block"
            >
              Pricing is indicative. Past performance is not a reliable
              indicator of future results.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

/* ---------- helpers ---------- */

function Change({ value, up }: { value: string; up: boolean }) {
  return (
    <Box color={up ? "#4ade80" : "#f87171"} fontWeight={600}>
      {up ? "↑" : "↓"} {value}
    </Box>
  );
}

function Trend({ up }: { up: boolean }) {
  return (
    <svg width="90" height="24" viewBox="0 0 100 30">
      <polyline
        fill="none"
        stroke={up ? "#4ade80" : "#f87171"}
        strokeWidth="2"
        points={
          up
            ? "0,20 10,10 20,14 30,8 40,12 50,6 60,10 70,8 80,9 90,7"
            : "0,10 10,14 20,12 30,18 40,14 50,20 60,16 70,18 80,17 90,19"
        }
      />
    </svg>
  );
}
