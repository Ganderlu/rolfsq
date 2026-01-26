"use client";

import { useEffect, useState } from "react";

export default function TradeTimer({ expiresAt }: { expiresAt: number }) {
  const [timeLeft, setTimeLeft] = useState(
    Math.max(0, expiresAt - Date.now())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(Math.max(0, expiresAt - Date.now()));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  if (timeLeft <= 0) return <span>Expired</span>;

  return <span>{Math.ceil(timeLeft / 1000)}s</span>;
}
