"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useMarketStore } from "@/store/useMarketStore";

export default function TradingViewChart() {
  const container = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const { symbol } = useMarketStore();

  useEffect(() => {
    if (!container.current) return;

    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    const theme = resolvedTheme === "light" ? "light" : "dark";
    const toolbarBg = resolvedTheme === "light" ? "#ffffff" : "#0b0b0b";

    script.onload = () => {
      // @ts-expect-error // TradingView global variable
      new window.TradingView.widget({
        autosize: true,
        symbol: symbol,
        interval: "1",
        timezone: "Etc/UTC",
        theme: theme,
        style: "1",
        locale: "en",
        toolbar_bg: toolbarBg,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        container_id: "tv_chart_container",
      });
    };

    container.current.appendChild(script);
  }, [resolvedTheme, symbol]);

  return (
    <div
      id="tv_chart_container"
      ref={container}
      className="w-full h-[500px] md:h-[600px] bg-card rounded-xl overflow-hidden"
    />
  );
}
