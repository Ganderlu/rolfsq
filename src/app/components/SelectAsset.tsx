"use client";
import { useMarketStore } from "@/store/useMarketStore";

const assets = [
  { symbol: "BTC", payout: "84%" },
  { symbol: "ETH", payout: "90%" },
  { symbol: "USDT", payout: "85%" },
  { symbol: "BNB", payout: "85%" },
  { symbol: "SOL", payout: "87%" },
];



export default function SelectAsset() {
   
  return (
    <div className="bg-card border border-border rounded-2xl p-4 h-full">
      <h3 className="text-foreground font-semibold mb-1">Select Asset</h3>
      <p className="text-xs text-muted-foreground mb-4">33 Available</p>

      <input
        placeholder="Search symbols..."
        className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-4"
      />

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        {assets.map((asset, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              i === 0
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
        ))}
      </div>
    </div>
  );
}
