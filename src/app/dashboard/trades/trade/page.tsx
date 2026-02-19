"use client";

import { useUserStats } from "@/hooks/useUserStats";
import SelectAsset from "@/app/components/SelectAsset";
import TradingViewChart from "@/app/components/TradingViewChart";
import PlaceOrder from "@/app/components/PlaceOrder";
import ActiveTrades from "@/app/components/ActiveTrades";
import { toggleUserMode } from "@/app/actions/user";
import { useAuth } from "@/context/AuthContext";

export default function TradeNowPage() {
  const { currentUser } = useAuth();
  const stats = useUserStats();
  const balance = stats.mode === "demo" ? stats.balanceDemo : stats.balanceLive;

  const handleModeToggle = async () => {
    if (!currentUser) return;
    const newMode = stats.mode === "demo" ? "live" : "demo";
    await toggleUserMode(currentUser.uid, newMode);
  };

  return (
    <div className="space-y-4 text-foreground">
      {/* HEADER & STATS */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
         <h1 className="text-2xl font-bold">Trade Now</h1>
         <div className="flex items-center gap-4">
             <div className="text-right">
                 <p className="text-xs text-muted-foreground">Current Mode</p>
                 <p className={`font-bold ${stats.mode === "live" ? "text-green-500" : "text-orange-500"}`}>
                     {stats.mode === "live" ? "LIVE ACCOUNT" : "DEMO ACCOUNT"}
                 </p>
             </div>
             <button 
                onClick={handleModeToggle}
                className="px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-semibold text-sm transition-colors"
             >
                Switch to {stats.mode === "demo" ? "Live" : "Demo"}
             </button>
         </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat title="Balance" value={`$${balance.toFixed(2)}`} />
        <Stat title="Active Trades" value={stats.activeTrades} />
        <Stat title="Total Trades" value={stats.totalTrades} />
        <Stat title="Net P&L" value={`$${stats.netPnL.toFixed(2)}`} green={stats.netPnL >= 0} />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr_320px] gap-4">
        
        {/* LEFT: ASSETS */}
        <div className="h-[600px] xl:h-[calc(100vh-200px)] min-h-[500px]">
            <SelectAsset />
        </div>

        {/* MIDDLE: CHART */}
        <div className="h-[600px] xl:h-[calc(100vh-200px)] min-h-[500px] bg-card border border-border rounded-2xl overflow-hidden p-2">
            <TradingViewChart />
        </div>

        {/* RIGHT: ORDER & TRADES */}
        <div className="space-y-4 h-[600px] xl:h-[calc(100vh-200px)] overflow-y-auto pr-1">
            <div className="bg-card border border-border rounded-2xl p-4">
                <PlaceOrder />
            </div>
            <ActiveTrades />
        </div>

      </div>
    </div>
  );
}

function Stat({ title, value, green }: { title: string; value: string | number; green?: boolean }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className={`text-2xl font-bold ${green ? "text-emerald-500" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}
