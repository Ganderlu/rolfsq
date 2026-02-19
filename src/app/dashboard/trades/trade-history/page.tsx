"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/app/firebase/firebaseClient";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";

interface Trade {
  id: string;
  asset: string;
  direction: "call" | "put";
  amount: number;
  payout: number;
  status: "open" | "won" | "lost";
  openPrice: number;
  closePrice: number | null;
  openedAt: Timestamp;
  expiresAt: Timestamp;
}

export default function TradeHistoryPage() {
  const { currentUser } = useAuth();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    symbol: "all",
    direction: "all",
    status: "all",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "trades"),
      where("uid", "==", currentUser.uid),
      orderBy("openedAt", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTrades = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Trade[];
      setTrades(fetchedTrades);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Derived State: Filtered Trades
  const filteredTrades = trades.filter((trade) => {
    const matchesSearch =
      trade.id.toLowerCase().includes(filters.search.toLowerCase()) ||
      trade.asset.toLowerCase().includes(filters.search.toLowerCase());
    const matchesSymbol =
      filters.symbol === "all" || trade.asset === filters.symbol;
    const matchesDirection =
      filters.direction === "all" || trade.direction === filters.direction;
    const matchesStatus =
      filters.status === "all" || trade.status === filters.status;

    let matchesDate = true;
    if (filters.startDate) {
      matchesDate =
        matchesDate &&
        (trade.openedAt?.toDate() ?? new Date(0)) >=
          new Date(filters.startDate);
    }
    if (filters.endDate) {
      const end = new Date(filters.endDate);
      end.setHours(23, 59, 59, 999);
      matchesDate = matchesDate && trade.openedAt?.toDate() <= end;
    }

    return (
      matchesSearch &&
      matchesSymbol &&
      matchesDirection &&
      matchesStatus &&
      matchesDate
    );
  });

  // Derived State: Stats
  const totalTrades = filteredTrades.length;
  const wonTrades = filteredTrades.filter((t) => t.status === "won").length;
  const winRate =
    totalTrades > 0 ? ((wonTrades / totalTrades) * 100).toFixed(1) : "0.0";
  const totalVolume = filteredTrades.reduce((sum, t) => sum + t.amount, 0);
  const totalPnL = filteredTrades.reduce((sum, t) => {
    if (t.status === "won") return sum + t.amount * t.payout;
    if (t.status === "lost") return sum - t.amount;
    return sum;
  }, 0);

  // Unique symbols for filter dropdown
  const uniqueSymbols = Array.from(new Set(trades.map((t) => t.asset)));

  return (
    <div className="p-4 md:p-6 space-y-6 text-foreground">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-muted-foreground text-sm">Total Trades</p>
          <p className="text-xl font-semibold">{totalTrades}</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-muted-foreground text-sm">Win Rate</p>
          <p className="text-xl font-semibold">{winRate}%</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-muted-foreground text-sm">Total P&L</p>
          <p
            className={`text-xl font-semibold ${totalPnL >= 0 ? "text-emerald-500" : "text-red-500"}`}
          >
            ${totalPnL.toFixed(2)}
          </p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-muted-foreground text-sm">Total Volume</p>
          <p className="text-xl font-semibold">
            ${totalVolume.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-2xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Filters</h2>
          <button
            onClick={() =>
              setFilters({
                search: "",
                symbol: "all",
                direction: "all",
                status: "all",
                startDate: "",
                endDate: "",
              })
            }
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition"
          >
            <RefreshCw size={14} /> Reset
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <input
            placeholder="Trade ID, Symbol..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="bg-background border border-border rounded px-3 py-2 text-sm text-foreground"
          />

          <select
            value={filters.symbol}
            onChange={(e) => setFilters({ ...filters, symbol: e.target.value })}
            className="bg-background border border-border rounded px-3 py-2 text-sm text-foreground"
          >
            <option value="all">All Symbols</option>
            {uniqueSymbols.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={filters.direction}
            onChange={(e) =>
              setFilters({ ...filters, direction: e.target.value })
            }
            className="bg-background border border-border rounded px-3 py-2 text-sm text-foreground"
          >
            <option value="all">All Directions</option>
            <option value="call">Call (Buy)</option>
            <option value="put">Put (Sell)</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="bg-background border border-border rounded px-3 py-2 text-sm text-foreground"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>

          <input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
            className="bg-background border border-border rounded px-3 py-2 text-sm text-foreground"
          />

          <input
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
            className="bg-background border border-border rounded px-3 py-2 text-sm text-foreground"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-muted-foreground">
            <thead className="bg-muted">
              <tr>
                {[
                  "Trade ID",
                  "Symbol",
                  "Direction",
                  "Amount",
                  "Payout",
                  "Status",
                  "P&L",
                  "Open Time",
                  "Close Time",
                ].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    Loading trades...
                  </td>
                </tr>
              ) : filteredTrades.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-16 text-center">
                    <p className="font-medium">No Trades Found</p>
                    <p className="text-muted-foreground text-sm">
                      Try adjusting your filters or place a new trade
                    </p>
                  </td>
                </tr>
              ) : (
                filteredTrades.map((trade) => {
                  const pnl =
                    trade.status === "won"
                      ? trade.amount * trade.payout
                      : trade.status === "lost"
                        ? -trade.amount
                        : 0;
                  return (
                    <tr
                      key={trade.id}
                      className="border-b border-border hover:bg-muted/40"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        {trade.id.slice(0, 8)}...
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">
                        {trade.asset}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${trade.direction === "call" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}
                        >
                          {trade.direction.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white">
                        ${trade.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {(trade.payout * 100).toFixed(0)}%
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            trade.status === "won"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : trade.status === "lost"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {trade.status.toUpperCase()}
                        </span>
                      </td>
                      <td
                        className={`px-4 py-3 font-medium ${pnl > 0 ? "text-emerald-400" : pnl < 0 ? "text-red-400" : "text-gray-400"}`}
                      >
                        {pnl > 0 ? "+" : ""}${pnl.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {trade.openedAt?.toDate()?.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {trade.expiresAt?.toDate()?.toLocaleString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
