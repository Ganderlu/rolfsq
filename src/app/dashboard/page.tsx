"use client";

import { useState } from "react";
import { useEffect } from "react";
import { onSnapshot, doc, collection, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseClient";
import { auth } from "../firebase/firebaseClient";
import { useRouter } from "next/navigation";
import NotificationBell from "@/app/components/notifications/NotificationBell";
import CryptoTicker from "@/app/components/widgets/CryptoTicker";
import Link from "next/link";
import {
  Home,
  ArrowLeftRight,
  Grid3X3,
  Briefcase,
  BarChart3,
  Wallet,
  Zap,
  ArrowDownToLine,
  Users,
  Settings,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

export default function Dashboard({ username = "User" }) {
  const [open, setOpen] = useState(false);
  const [investOpen, setInvestOpen] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [tradeOpen, setTradeOpen] = useState(false);
  const [matrixOpen, setMatrixOpen] = useState(false);
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

  // useEffect(() => {
  //   const unsub = auth.onAuthStateChanged((user) => {
  //     if (!user) router.push("/login");
  //   });
  //   return () => unsub();
  // }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Main Content (LEFT) */}

      {/* Sidebar (RIGHT) */}
      <aside
        className={`fixed lg:static inset-y-0 right-0 w-64 bg-gradient-to-b from-black to-neutral-900 border-l border-neutral-800 transform transition-transform duration-300 z-40 ${
          open ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 text-xl font-bold text-purple-500 flex justify-between items-center">
          PRIME MAX
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="px-4 space-y-1 text-sm">
          {/* <NavItem icon={Home} label="Dashboard" /> */}
          <SubItem icon={Home} label="Dashboard" href="/dashboard" />
          {/* <NavItem icon={ArrowLeftRight} label="Transaction" /> */}
          <SubItem
            icon={ArrowLeftRight}
            label="Transactions"
            href="/dashboard/transactions"
          />

          {/* <NavItem icon={Grid3X3} label="Matrix" /> */}
          {/* Matrix Dropdown */}
          <button
            onClick={() => setMatrixOpen(!matrixOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-neutral-800"
          >
            <span className="flex items-center gap-3">
              <Briefcase size={18} />
              Matrix
            </span>
            <ChevronDown
              size={16}
              className={`transition ${matrixOpen ? "rotate-180" : ""}`}
            />
          </button>

          {matrixOpen && (
            <div className="ml-8 space-y-1">
              <SubItem label="Plans" href="/dashboard/matrix/plans" />
              <SubItem
                label="Referral Rewards"
                href="/dashboard/matrix/referralRewards"
              />
              <SubItem
                label="Commission"
                href="/dashboard/matrix/commissions"
              />
            </div>
          )}

          {/* Investments Dropdown */}
          <button
            onClick={() => setInvestOpen(!investOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-neutral-800"
          >
            <span className="flex items-center gap-3">
              <Briefcase size={18} />
              Investments
            </span>
            <ChevronDown
              size={16}
              className={`transition ${investOpen ? "rotate-180" : ""}`}
            />
          </button>

          {investOpen && (
            <div className="ml-8 space-y-1">
              <SubItem label="Plans" href="/dashboard/investments/plans" />
              <SubItem label="Funds" href="/dashboard/investments/funds" />
              <SubItem
                label="Profit Statistics"
                href="/dashboard/investments/profit-statistics"
              />
            </div>
          )}

          {/* Trades Dropdown */}
          <button
            onClick={() => setTradeOpen(!tradeOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-neutral-800"
          >
            <span className="flex items-center gap-3">
              <Briefcase size={18} />
              Trades
            </span>
            <ChevronDown
              size={16}
              className={`transition ${tradeOpen ? "rotate-180" : ""}`}
            />
          </button>

          {tradeOpen && (
            <div className="ml-8 space-y-1">
              <SubItem label="Trade Now" href="/dashboard/trades/trade" />
              <SubItem
                label="Market Data"
                href="/dashboard/trades/market-data"
              />
              <SubItem
                label="Trade History"
                href="/dashboard/trades/trade-history"
              />
            </div>
          )}

          {/* <NavItem icon={BarChart3} label="Trades" /> */}

          {/* Deposit Dropdown */}
          <button
            onClick={() => setDepositOpen(!depositOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-neutral-800"
          >
            <span className="flex items-center gap-3">
              <Briefcase size={18} />
              Deposit
            </span>
            <ChevronDown
              size={16}
              className={`transition ${depositOpen ? "rotate-180" : ""}`}
            />
          </button>

          {depositOpen && (
            <div className="ml-8 space-y-1">
              <SubItem label="Instant" href="/dashboard/deposit/instant" />
              <SubItem
                label="Commissions"
                href="/dashboard/deposit/commissions"
              />
            </div>
          )}
          {/* <NavItem icon={Wallet} label="Deposit" /> */}
          {/* <NavItem icon={Zap} label="Instant Commissions" /> */}

          {/* Withdraw Dropdown */}
          <button
            onClick={() => setWithdrawOpen(!withdrawOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-neutral-800"
          >
            <span className="flex items-center gap-3">
              <Briefcase size={18} />
              Withdrawal
            </span>
            <ChevronDown
              size={16}
              className={`transition ${withdrawOpen ? "rotate-180" : ""}`}
            />
          </button>

          {withdrawOpen && (
            <div className="ml-8 space-y-1">
              <SubItem label="Withdraw" href="/dashboard/withdraw/withdraw" />
              <SubItem
                label="InstaPIN Recharge"
                href="/dashboard/withdraw/instapin-recharge"
              />
            </div>
          )}
          {/* <NavItem icon={ArrowDownToLine} label="Withdraw" /> */}
          <NavItem icon={Users} label="Referrals" />
          <NavItem icon={Settings} label="Setting" />
          <NavItem icon={Settings} label="Suport" />
        </nav>
      </aside>
      <div className="flex-1">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-4 lg:px-8 py-4 border-b border-neutral-800">
          <h1 className="text-lg font-semibold">
            Welcome, <span className="text-purple-400">{stats.username}</span>
          </h1>
          <button className="lg:hidden" onClick={() => setOpen(true)}>
            <Menu />
          </button>

          <button className="relative md:block hidden">
            <NotificationBell />
          </button>
        </header>

        {/* Dashboard Cards */}
        <main className="p-4 lg:p-8 space-y-8">
          <CryptoTicker />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MiniCard label="Account Balance" value={`$${stats.balance}`} />
            <MiniCard label="Total Trades" value={stats.totalTrades} />
            <MiniCard label="Active Trades" value={stats.activeTrades} />
            <MiniCard label="Total P&L" value={`$${stats.netPnL}`} highlight />
          </div>
        </main>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}

function NavItem({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-neutral-800 cursor-pointer">
      <Icon size={18} /> {label}
    </div>
  );
}

function SubItem({ label, href }) {
  if (!href) {
    return (
      <div className="px-3 py-2 rounded-lg text-sm text-red-400"> {label}</div>
    );
  }

  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-neutral-800 cursor-pointer"
    >
      {label}
    </Link>
  );
}

function StatCard({ title, stats, button, onClick }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-gradient-to-br from-black to-neutral-900 p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <div className="space-y-2 text-sm">
        {stats.map(([k, v]) => (
          <div key={k} className="flex justify-between">
            <span className="text-neutral-300">{k}</span>
            <span>{v}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onClick}
        className="mt-6 w-full rounded-full bg-white text-black py-2 text-sm font-medium"
      >
        {button}
      </button>
    </div>
  );
}

function MiniCard({ label, value, highlight }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-black p-6">
      <div className={`text-xl font-bold ${highlight ? "text-green-400" : ""}`}>
        {value}
      </div>
      <div className="text-sm text-neutral-400">{label}</div>
    </div>
  );
}
