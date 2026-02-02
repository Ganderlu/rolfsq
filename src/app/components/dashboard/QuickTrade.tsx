"use client";

export default function QuickTrade() {
  return (
    <div className="p-6 bg-card border border-border rounded-xl h-full">
      <h3 className="font-bold text-foreground mb-4">Quick Trade</h3>
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Asset</label>
          <input
            defaultValue="BTCUSD"
            className="w-full bg-background border border-input rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Amount</label>
          <input
            type="number"
            placeholder="0.00"
            className="w-full bg-background border border-input rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-lg shadow-emerald-900/20">
            BUY
          </button>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-lg shadow-red-900/20">
            SELL
          </button>
        </div>
      </div>
    </div>
  );
}
