"use client";

import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { useAuth } from "@/context/AuthContext";

export default function ActiveTrades() {
  const { currentUser } = useAuth();
  const [trades, setTrades] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "trades"),
      where("uid", "==", currentUser.uid),
      where("status", "==", "open"),
      orderBy("openedAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      setTrades(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <h3 className="text-foreground font-semibold mb-4">Active Trades</h3>
      <p className="text-sm text-muted-foreground mb-4">{trades.length} Active</p>
      
      {trades.length === 0 ? (
        <div className="text-center">
            <p className="text-muted-foreground text-sm">No active trades</p>
            <p className="text-muted-foreground/60 text-xs mt-2">
                Place a trade to get started
            </p>
        </div>
      ) : (
        <div className="space-y-3">
            {trades.map((trade) => (
                <div key={trade.id} className="p-3 rounded-lg bg-background border border-border text-sm">
                    <div className="flex justify-between mb-1">
                        <span className="font-semibold">{trade.asset}</span>
                        <span className={`font-bold ${trade.direction === "call" ? "text-emerald-500" : "text-red-500"}`}>
                            {trade.direction.toUpperCase()}
                        </span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>${trade.amount}</span>
                        <span>Entry: {trade.openPrice}</span>
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
}
