"use client";

import { useEffect, useState } from "react";

export default function LiveEarnings({ investment }: { investment: any }) {
  const [earned, setEarned] = useState(0);

  useEffect(() => {
    if (!investment) return;

    const start = investment.startAt.toMillis();
    const end = investment.matureAt.toMillis();
    const totalProfit = investment.profit;

    const interval = setInterval(() => {
      const now = Date.now();

      if (now >= end) {
        setEarned(totalProfit);
        clearInterval(interval);
        return;
      }

      const progress = (now - start) / (end - start);
      setEarned(Number((totalProfit * progress).toFixed(2)));
    }, 1000);

    return () => clearInterval(interval);
  }, [investment]);

  return (
    <div className="text-sm">
      <span className="text-neutral-400">Live Earnings:</span>{" "}
      <span className="text-green-500 font-semibold">
        ${earned.toLocaleString()}
      </span>
    </div>
  );
}
