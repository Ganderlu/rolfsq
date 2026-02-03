"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function CryptoTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous widget
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "NASDAQ:AAPL", title: "Apple" },
        { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
        { proName: "BITSTAMP:XRPUSD", title: "XRP" },
        { proName: "BITSTAMP:BNBUSD", title: "BNB" },
        { proName: "BITSTAMP:ADAUSD", title: "Cardano" },
        { proName: "BITSTAMP:SOLUSD", title: "Solana" },
      ],
      showSymbolLogo: true,
      colorTheme: resolvedTheme === "light" ? "light" : "dark",
      isTransparent: true,
      displayMode: "adaptive",
      locale: "en",
    });

    containerRef.current.appendChild(script);
  }, [resolvedTheme]);

  return <div ref={containerRef} className="mb-6 w-full" />;
}
