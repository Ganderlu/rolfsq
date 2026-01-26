"use client";

import { useEffect } from "react";

export default function CryptoTicker() {
  useEffect(() => {
    if (document.getElementById("tradingview-ticker")) return;

    const script = document.createElement("script");
    script.id = "tradingview-ticker";
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "NASDAQ:AAPL", title: "Apple" },
        { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
      ],
      showSymbolLogo: true,
      colorTheme: "dark",
      isTransparent: true,
      displayMode: "adaptive",
      locale: "en",
    });

    document.getElementById("ticker-container")?.appendChild(script);
  }, []);

  return <div id="ticker-container" className="mb-6" />;
}
