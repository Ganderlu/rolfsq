import { useState, useEffect } from "react";
import {
  onSnapshot,
  doc,
  collection,
  query,
  where,
  getCountFromServer,
  getDocs,
} from "firebase/firestore";
import { db } from "../app/firebase/firebaseClient";
import { useAuth } from "@/context/AuthContext";

export function useUserStats() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalInvest: 0,
    totalProfit: 0,
    runningInvest: 0,
    totalCommission: 0,
    referralCommission: 0,
    levelCommission: 0,
    totalTrades: 0,
    winRate: 0,
    netPnL: 0,
    activeTrades: 0,
    balance: 0,
    balanceDemo: 0,
    balanceLive: 0,
    mode: "demo",
    username: "User",
  });

  useEffect(() => {
    if (!currentUser) return;

    // USER PROFILE (Balance & Mode)
    const unsubUser = onSnapshot(doc(db, "users", currentUser.uid), (snap) => {
      if (snap.exists()) {
        const d = snap.data();
        setStats((s) => ({
          ...s,
          balance: d.usdtBalance || 0,
          balanceDemo: d.balanceDemo || 0,
          balanceLive: d.balanceLive || 0,
          mode: d.mode || "demo",
          username: d.username || "User",
        }));
      }
    });

    // TRADES (Source of Truth for Stats)
    const unsubTrades = onSnapshot(
      query(collection(db, "trades"), where("uid", "==", currentUser.uid)),
      (snap) => {
        let active = 0;
        let pnl = 0;
        let won = 0;

        snap.forEach((doc) => {
          const t = doc.data();
          if (t.status === "open") {
            active++;
          } else if (t.status === "won") {
            pnl += t.amount * t.payout;
            won++;
          } else if (t.status === "lost") {
            pnl -= t.amount;
          }
        });

        const total = snap.size;
        const closed = total - active;
        const winRate = closed > 0 ? (won / closed) * 100 : 0;

        setStats((s) => ({
          ...s,
          totalTrades: total,
          activeTrades: active,
          netPnL: pnl,
          winRate: parseFloat(winRate.toFixed(2)),
        }));
      },
    );

    // INVESTMENTS
    const unsubInvest = onSnapshot(
      query(
        collection(db, "investments"),
        where("userId", "==", currentUser.uid),
      ),
      (snap) => {
        let total = 0;
        let profit = 0;
        let running = 0;

        snap.forEach((d) => {
          const i = d.data();
          total += i.amount || 0;
          profit += i.profit || 0;
          if (i.status === "running") running += i.amount;
        });

        setStats((s) => ({
          ...s,
          totalInvest: total,
          totalProfit: profit,
          runningInvest: running,
        }));
      },
    );

    // MATRIX
    const unsubMatrix = onSnapshot(
      query(
        collection(db, "matrixEnrollments"),
        where("userId", "==", currentUser.uid),
      ),
      (snap) => {
        let total = 0;
        snap.forEach((d) => (total += d.data().commission || 0));

        setStats((s) => ({
          ...s,
          totalCommission: total,
        }));
      },
    );

    return () => {
      unsubUser();
      unsubTrades();
      unsubInvest();
      unsubMatrix();
    };
  }, [currentUser]);

  return stats;
}
