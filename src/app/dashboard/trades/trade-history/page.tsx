"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";

export default function TradeHistoryPage() {
  const [filters, setFilters] = useState({
    search: "",
    symbol: "all",
    direction: "all",
    status: "all",
    startDate: "",
    endDate: "",
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {["Total Trades", "Win Rate", "Total P&L", "Total Volume"].map(
          (label, i) => (
            <div
              key={i}
              className="bg-[#0b0b0b] border border-neutral-800 rounded-xl p-4"
            >
              <p className="text-gray-400 text-sm">{label}</p>
              <p className="text-xl font-semibold text-white">0</p>
            </div>
          ),
        )}
      </div>

      {/* Filters */}
      <div className="bg-[#0b0b0b] border border-neutral-800 rounded-xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold">Filters</h2>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-emerald-600 text-white text-sm">
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <input
            placeholder="Trade ID, Symbol..."
            className="bg-[#111] border border-neutral-800 rounded px-3 py-2 text-sm text-white"
          />

          <select className="bg-[#111] border border-neutral-800 rounded px-3 py-2 text-sm text-white">
            <option>All Symbols</option>
          </select>

          <select className="bg-[#111] border border-neutral-800 rounded px-3 py-2 text-sm text-white">
            <option>All Directions</option>
          </select>

          <select className="bg-[#111] border border-neutral-800 rounded px-3 py-2 text-sm text-white">
            <option>All Statuses</option>
          </select>

          <input
            type="date"
            className="bg-[#111] border border-neutral-800 rounded px-3 py-2 text-sm text-white"
          />

          <input
            type="date"
            className="bg-[#111] border border-neutral-800 rounded px-3 py-2 text-sm text-white"
          />
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-orange-600 text-white rounded text-sm">
            Apply Filters
          </button>
          <button className="px-4 py-2 bg-neutral-800 text-white rounded text-sm">
            Clear
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0b0b0b] border border-neutral-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-300">
            <thead className="bg-[#111]">
              <tr>
                {[
                  "Trade ID",
                  "Symbol",
                  "Direction",
                  "Amount",
                  "Payout Rate",
                  "Status",
                  "P&L",
                  "Date",
                  "Action",
                ].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={9} className="px-4 py-16 text-center">
                  <p className="text-white font-medium">No Trades Found</p>
                  <p className="text-gray-500 text-sm">
                    You haven't placed any trades yet
                  </p>
                  <button className="mt-4 px-4 py-2 bg-orange-600 text-white rounded">
                    Start Trading
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
