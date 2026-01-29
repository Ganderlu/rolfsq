"use client";

export default function PlaceOrder() {
  return (
    <div className="bg-black border border-white/10 rounded-2xl p-5 space-y-6">
      <h3 className="text-white font-semibold">Place Order</h3>

      {/* Direction */}
      <div>
        <p className="text-sm text-gray-400 mb-2">Direction</p>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-emerald-600 text-white py-3 rounded-lg font-semibold">
            CALL
            <span className="block text-xs font-normal">Price will rise</span>
          </button>
          <button className="border border-red-600 text-white py-3 rounded-lg">
            PUT
            <span className="block text-xs">Price will fall</span>
          </button>
        </div>
      </div>

      {/* Amount */}
      <div>
        <p className="text-sm text-gray-400 mb-2">Investment Amount</p>
        <div className="flex items-center bg-neutral-900 border border-white/10 rounded-lg overflow-hidden">
          <span className="px-3 text-gray-400">$</span>
          <input
            type="number"
            defaultValue={10}
            className="w-full bg-transparent px-2 py-2 text-white outline-none"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Min: 10</span>
          <span>Max: 0</span>
        </div>
      </div>

      {/* Duration */}
      <div>
        <p className="text-sm text-gray-400 mb-2">Duration</p>
        <select className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white">
          <option>Select duration</option>
          <option>1 Minute</option>
          <option>5 Minutes</option>
          <option>15 Minutes</option>
        </select>
      </div>

      <button className="w-full bg-orange-500 hover:bg-orange-600 transition py-3 rounded-lg font-semibold text-white">
        Place Trade
      </button>
    </div>
  );
}
