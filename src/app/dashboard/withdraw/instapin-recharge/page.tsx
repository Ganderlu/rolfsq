"use client";

import { CreditCard, Lock, ExternalLink } from "lucide-react";

export default function InstaPinRechargePage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#0b0b0b] border border-neutral-800 rounded-xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-orange-500/10 text-orange-500">
              <CreditCard />
            </div>
            <div>
              <p className="text-white font-medium">Recharge Now</p>
            </div>
          </div>
          <ExternalLink className="text-gray-400" />
        </div>

        <div className="bg-[#0b0b0b] border border-neutral-800 rounded-xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-orange-500/10 text-orange-500">
              <Lock />
            </div>
            <div>
              <p className="text-white font-medium">Generate Pin</p>
            </div>
          </div>
          <ExternalLink className="text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0b0b0b] border border-neutral-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-300">
            <thead className="bg-[#111]">
              <tr>
                {[
                  "Initiated At",
                  "Amount",
                  "Charge",
                  "Net Credit",
                  "Pin Number",
                  "Status",
                  "Details",
                ].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                  No Data Found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
