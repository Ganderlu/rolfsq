"use client";

export default function PlaceOrder() {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 space-y-6">
      <h3 className="text-foreground font-semibold">Place Order</h3>

      {/* Direction */}
      <div>
        <p className="text-sm text-muted-foreground mb-2">Direction</p>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition-colors">
            CALL
            <span className="block text-xs font-normal opacity-80">Price will rise</span>
          </button>
          <button className="border border-red-600 text-red-500 hover:bg-red-600 hover:text-white py-3 rounded-lg transition-all">
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
            defaultValue={10}
            className="w-full bg-transparent px-2 py-2 text-foreground outline-none"
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Min: 10</span>
          <span>Max: 0</span>
        </div>
      </div>

      {/* Duration */}
      <div>
        <p className="text-sm text-muted-foreground mb-2">Duration</p>
        <select className="w-full bg-background border border-input rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
          <option>Select duration</option>
          <option>1 Minute</option>
          <option>5 Minutes</option>
          <option>15 Minutes</option>
        </select>
      </div>

      <button className="w-full bg-primary hover:bg-primary/90 transition py-3 rounded-lg font-semibold text-primary-foreground shadow-lg shadow-primary/20">
        Place Trade
      </button>
    </div>
  );
}
