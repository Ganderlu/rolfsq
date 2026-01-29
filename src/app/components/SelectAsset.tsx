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
    <div className="bg-black border border-white/10 rounded-2xl p-4 h-full">
      <h3 className="text-white font-semibold mb-1">Select Asset</h3>
      <p className="text-xs text-gray-400 mb-4">33 Available</p>

      <input
        placeholder="Search symbols..."
        className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white mb-4"
      />

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        {assets.map((asset, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl border cursor-pointer ${
              i === 0
                ? "border-blue-500 bg-white/5"
                : "border-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex justify-between text-white font-semibold">
              <span>{asset.symbol}</span>
              <span className="text-sm">{asset.payout}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Payout: {asset.payout} • $10 – $5000
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
