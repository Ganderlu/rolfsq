export default function ActiveTrades() {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 text-center">
      <h3 className="text-foreground font-semibold mb-4">Active Trades</h3>
      <p className="text-sm text-muted-foreground mb-2">0 Active</p>
      <p className="text-muted-foreground text-sm">No active trades</p>
      <p className="text-muted-foreground/60 text-xs mt-2">
        Place a trade to get started
      </p>
    </div>
  );
}
