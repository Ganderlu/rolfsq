"use client";

import { useState } from "react";
import { useMarketStore } from "@/store/useMarketStore";
import { ASSETS } from "../constants/assets";
import { placeTrade } from "../dashboard/trades/actions";
import { useAuth } from "@/context/AuthContext";

export default function PlaceOrder() {
  const { symbol } = useMarketStore();
  const { currentUser } = useAuth();
  const [direction, setDirection] = useState<"call" | "put">("call");
  const [amount, setAmount] = useState(10);
  const [duration, setDuration] = useState(60); // seconds (1 min)
  const [loading, setLoading] = useState(false);

  // Parse symbol to get asset name (e.g. "BTC")
  const assetName = symbol.replace("BINANCE:", "").replace("USDT", "");
  const assetInfo = ASSETS.find(a => a.symbol === assetName);
  const payoutStr = assetInfo?.payout || "85%";
  const payout = parseFloat(payoutStr) / 100;

  const handleTrade = async () => {
    if (loading) return;
    if (!currentUser) {
        alert("Please log in to trade");
        return;
    }
    setLoading(true);

    try {
        // Fetch price
        const tickerSymbol = `${assetName}USDT`;
        const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${tickerSymbol}`);
        const data = await res.json();
        const price = parseFloat(data.price);

        if (!price) throw new Error("Failed to fetch price");

        await placeTrade({
            uid: currentUser.uid,
            asset: assetName,
            direction,
            amount,
            duration,
            payout,
            price
        });

        alert("Trade placed successfully!");
    } catch (err: any) {
        alert(err.message || "Failed to place trade");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-foreground font-semibold">Place Order</h3>
        <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
            {assetName}/USDT <span className="text-primary">{payoutStr}</span>
        </span>
      </div>

      {/* Direction */}
      <div>
        <p className="text-sm text-muted-foreground mb-2">Direction</p>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setDirection("call")}
            className={`py-3 rounded-lg font-semibold transition-colors ${direction === "call" ? "bg-emerald-600 text-white" : "border border-emerald-600 text-emerald-500 hover:bg-emerald-600/10"}`}
          >
            CALL
            <span className="block text-xs font-normal opacity-80">Price will rise</span>
          </button>
          <button 
            onClick={() => setDirection("put")}
            className={`py-3 rounded-lg transition-all ${direction === "put" ? "bg-red-600 text-white" : "border border-red-600 text-red-500 hover:bg-red-600/10"}`}
          >
            PUT
            <span className="block text-xs opacity-80">Price will fall</span>
          </button>
        </div>
      </div>

      {/* Amount */}
      <div>
        <p className="text-sm text-muted-foreground mb-2">Investment Amount</p>
        <div className="flex items-center bg-background border border-input rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary">
          <span className="px-3 text-muted-foreground">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-transparent px-2 py-2 text-foreground outline-none"
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Min: 10</span>
          <span>Profit: ${(amount * payout).toFixed(2)}</span>
        </div>
      </div>

      {/* Duration */}
      <div>
        <p className="text-sm text-muted-foreground mb-2">Duration</p>
        <select 
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full bg-background border border-input rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value={60}>1 Minute</option>
          <option value={300}>5 Minutes</option>
          <option value={900}>15 Minutes</option>
        </select>
      </div>

      <button 
        onClick={handleTrade}
        disabled={loading}
        className="w-full bg-primary hover:bg-primary/90 transition py-3 rounded-lg font-semibold text-primary-foreground shadow-lg shadow-primary/20 disabled:opacity-50"
      >
        {loading ? "Placing..." : "Place Trade"}
      </button>
    </div>
  );
}
