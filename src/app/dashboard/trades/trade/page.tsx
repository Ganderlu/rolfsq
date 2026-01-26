"use client";

import { useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function TradeNowPage() {
  const [direction, setDirection] = useState<"call" | "put">("call");

  return (
    <div className="min-h-screen bg-black text-white p-4 space-y-4">

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat title="Account Balance" value="$0" />
        <Stat title="Total Trades" value="0" />
        <Stat title="Active Trades" value="0" />
        <Stat title="Total P&L" value="$0" green />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr_320px] gap-4">

        {/* ASSET SELECTOR */}
        <div className="bg-[#0b0b0b] rounded-xl border border-white/10 p-4">
          <h3 className="text-sm font-semibold mb-2">Select Asset</h3>

          <input
            placeholder="Search symbols..."
            className="w-full mb-3 rounded bg-black border border-white/10 px-3 py-2 text-sm"
          />

          <Asset name="BTC" payout="84%" />
          <Asset name="ETH" payout="90%" />
          <Asset name="USDT" payout="85%" />
          <Asset name="BNB" payout="85%" />
        </div>

        {/* CHART */}
        <div className="bg-[#0b0b0b] rounded-xl border border-white/10 p-2">
          {/* <TradingViewWidget
            symbol="BTCUSDT"
            theme="dark"
            autosize
            interval="1"
            timezone="Etc/UTC"
            style="1"
            locale="en"
            allow_symbol_change={false}
          /> */}
        </div>

        {/* PLACE ORDER */}
        <div className="bg-[#0b0b0b] rounded-xl border border-white/10 p-4 space-y-4">
          <h3 className="text-sm font-semibold">Place Order</h3>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setDirection("call")}
              className={`flex items-center justify-center gap-1 rounded-lg py-3 font-semibold ${
                direction === "call"
                  ? "bg-green-600 text-black"
                  : "border border-green-600 text-green-500"
              }`}
            >
              <ArrowUp size={16} /> CALL
            </button>

            <button
              onClick={() => setDirection("put")}
              className={`flex items-center justify-center gap-1 rounded-lg py-3 font-semibold ${
                direction === "put"
                  ? "bg-red-600 text-black"
                  : "border border-red-600 text-red-500"
              }`}
            >
              <ArrowDown size={16} /> PUT
            </button>
          </div>

          <div>
            <label className="text-xs text-white/60">Investment amount</label>
            <input
              type="number"
              defaultValue={10}
              className="w-full mt-1 rounded bg-black border border-white/10 px-3 py-2"
            />
            <p className="text-[10px] text-white/40 mt-1">Min: 10</p>
          </div>

          <div>
            <label className="text-xs text-white/60">Duration</label>
            <select className="w-full mt-1 rounded bg-black border border-white/10 px-3 py-2">
              <option>Select duration</option>
              <option>1 Minute</option>
              <option>5 Minutes</option>
              <option>15 Minutes</option>
            </select>
          </div>

          <button className="w-full rounded-lg bg-orange-500 hover:bg-orange-400 text-black font-semibold py-3">
            Place Trade
          </button>
        </div>
      </div>

      {/* ACTIVE TRADES */}
      <div className="bg-[#0b0b0b] rounded-xl border border-white/10 p-4">
        <h3 className="text-sm font-semibold mb-2">Active Trades</h3>
        <p className="text-xs text-white/40">No active trades</p>
      </div>
    </div>
  );
}

function Stat({ title, value, green }: any) {
  return (
    <div className="bg-[#0b0b0b] rounded-xl border border-white/10 p-4">
      <p className="text-xs text-white/50">{title}</p>
      <p className={`text-lg font-semibold ${green ? "text-green-500" : ""}`}>
        {value}
      </p>
    </div>
  );
}

function Asset({ name, payout }: any) {
  return (
    <div className="rounded-lg border border-white/10 p-3 mb-2 hover:bg-white/5 cursor-pointer">
      <div className="flex justify-between">
        <span className="font-semibold">{name}</span>
        <span className="text-xs text-white/60">{payout}</span>
      </div>
      <p className="text-[10px] text-white/40">Payout</p>
    </div>
  );
}
