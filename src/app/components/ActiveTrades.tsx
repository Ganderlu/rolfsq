export default function ActiveTrades() {
  return (
    <div className="bg-black border border-white/10 rounded-2xl p-5 text-center">
      <h3 className="text-white font-semibold mb-4">Active Trades</h3>
      <p className="text-sm text-gray-400 mb-2">0 Active</p>
      <p className="text-gray-500 text-sm">No active trades</p>
      <p className="text-gray-600 text-xs mt-2">
        Place a trade to get started
      </p>
    </div>
  );
}
