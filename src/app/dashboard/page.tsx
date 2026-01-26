"use client";

import { useState, useEffect } from "react";
import { onSnapshot, doc, collection, query, where } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseClient";
import { useRouter } from "next/navigation";
import NotificationBell from "@/app/components/notifications/NotificationBell";
import CryptoTicker from "@/app/components/widgets/CryptoTicker";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
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
    username: "User",
  });

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // USER PROFILE
    const unsubUser = onSnapshot(doc(db, "users", user.uid), (snap) => {
      if (snap.exists()) {
        const d = snap.data();
        setStats((s) => ({
          ...s,
          balance: d.usdtBalance || 0,
          totalTrades: d.totalTrades || 0,
          activeTrades: d.activeTrades || 0,
          netPnL: d.totalPnL || 0,
          username: d.username || "User",
        }));
      }
    });

    // INVESTMENTS
    const unsubInvest = onSnapshot(
      query(collection(db, "investments"), where("userId", "==", user.uid)),
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
        where("userId", "==", user.uid),
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
      unsubInvest();
      unsubMatrix();
    };
  }, []);

  return (
    <div className="space-y-10 text-white">
      {/* <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome,{" "}
          <span className="text-purple-400">{stats.username}</span>
        </h1>
      </div> */}

      <div className="py-4">
        <CryptoTicker />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard
          title="Investment"
          button="Investment Now"
          onClick={() => router.push("/dashboard/investments/plans")}
          stats={[
            ["Total Invest", `$${stats.totalInvest}`],
            ["Total Profits", `$${stats.totalProfit}`],
            ["Running Invest", `$${stats.runningInvest}`],
          ]}
        />
        <StatCard
          title="Matrix"
          button="Enrolled"
          onClick={() => router.push("/dashboard/matrix/plans")}
          stats={[
            ["Total Commission", `$${stats.totalCommission}`],
            ["Referral Commission", `$${stats.referralCommission}`],
            ["Level Commission", `$${stats.levelCommission}`],
          ]}
        />
        <StatCard
          title="Trade"
          button="Start Trading"
          onClick={() => router.push("/dashboard/trades/trade")}
          stats={[
            ["Total Trades", stats.totalTrades],
            ["Win Rate", `${stats.winRate}%`],
            ["Net P&L", `$${stats.netPnL}`],
            ["Active Trades", stats.activeTrades],
          ]}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <MiniCard label="Account Balance" value={`$${stats.balance}`} />
        <MiniCard label="Total Trades" value={stats.totalTrades} />
        <MiniCard label="Active Trades" value={stats.activeTrades} />
        <MiniCard label="Total P&L" value={`$${stats.netPnL}`} highlight />
      </div>
    </div>
  );
}

function StatCard({
  title,
  stats,
  button,
  onClick,
}: {
  title: string;
  stats: (string | number)[][];
  button: string;
  onClick: () => void;
}) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-black p-8 shadow-xl hover:border-neutral-700 transition-all duration-300">
      <h3 className="text-xl font-semibold mb-8 text-white tracking-wide">
        {title}
      </h3>

      <div className="space-y-6 text-sm">
        {stats.map(([k, v]) => (
          <div
            key={k}
            className="flex justify-between border-b border-neutral-800 pb-4 last:border-0 last:pb-0"
          >
            <span className="text-neutral-400">{k}</span>
            <span className="font-semibold text-white tracking-wide">{v}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onClick}
        className="mt-8 w-full rounded-xl bg-purple-600 hover:bg-purple-700 text-white py-4 text-sm font-semibold tracking-wide transition-all shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40"
      >
        {button}
      </button>
    </div>
  );
}

function MiniCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-black p-8 shadow-xl hover:border-purple-500/30 transition-all duration-300">
      <div
        className={`text-3xl font-bold mb-2 ${highlight ? "text-green-400" : "text-white"}`}
      >
        {value}
      </div>
      <div className="text-sm font-medium text-neutral-500 tracking-wide">
        {label}
      </div>
    </div>
  );
}
