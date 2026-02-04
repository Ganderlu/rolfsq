"use client";
import { useMarketStore } from "@/store/useMarketStore";
import { ASSETS } from "../constants/assets";

export default function SelectAsset() {
  const { symbol, setSymbol } = useMarketStore();

  return (
    <div className="bg-card border border-border rounded-2xl p-4 h-full">
      <h3 className="text-foreground font-semibold mb-1">Select Asset</h3>
      <p className="text-xs text-muted-foreground mb-4">
        {ASSETS.length} Available
      </p>

      <input
        placeholder="Search symbols..."
        className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-4"
      />

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        {ASSETS.map((asset, i) => {
          const fullSymbol = `BINANCE:${asset.symbol}USDT`;
          const isSelected = symbol === fullSymbol;

          return (
            <div
              key={i}
              onClick={() => setSymbol(fullSymbol)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex justify-between text-foreground font-semibold">
                <span>{asset.symbol}</span>
                <span className="text-sm">{asset.payout}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Payout: {asset.payout} • $10 – $5000
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
