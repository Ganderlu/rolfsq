import { useEffect } from "react";
import { useMarketStore } from "@/store/useMarketStore";

export function useLivePrice() {
  const { symbol, setPrice } = useMarketStore();

  useEffect(() => {
    const wsSymbol = symbol.split(":")[1].toLowerCase();
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${wsSymbol}@trade`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrice(parseFloat(data.p));
    };

    return () => ws.close();
  }, [symbol]);
}
