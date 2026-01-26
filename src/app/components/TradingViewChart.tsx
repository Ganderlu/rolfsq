"use client";

import { useEffect, useRef } from "react";

export default function TradingViewChart() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      // @ts-expect-error // TradingView global variable
      new window.TradingView.widget({
        autosize: true,
        symbol: "BINANCE:BTCUSDT",
        interval: "1",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#0b0b0b",
        hide_side_toolbar: false,
        allow_symbol_change: true,
        container_id: "tv_chart_container",
      });
    };

    container.current.appendChild(script);
  }, []);

  return (
    <div
      id="tv_chart_container"
      ref={container}
      className="w-full h-[500px] md:h-[600px]"
    />
  );
}
