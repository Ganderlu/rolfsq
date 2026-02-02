"use client";

import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function MarketChart() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Box height={400} bgcolor="var(--card)" borderRadius={2} />;

  const theme = resolvedTheme === "light" ? "light" : "dark";

  return (
    <Box
      height={400}
      bgcolor="var(--card)"
      borderRadius={2}
      sx={{ border: "1px solid", borderColor: "var(--border)", overflow: "hidden" }}
    >
      <iframe
        src={`https://s.tradingview.com/widgetembed/?symbol=BINANCE:BTCUSDT&interval=30&theme=${theme}`}
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </Box>
  );
}