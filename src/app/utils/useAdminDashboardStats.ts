"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseClient";

export function useAdminDashboardStats() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const usersSnap = await getDocs(collection(db, "users"));
      const txSnap = await getDocs(collection(db, "transactions"));
      const investSnap = await getDocs(collection(db, "investments"));

      let runningInvestment = 0;
      let totalInvestment = 0;

      investSnap.forEach((doc) => {
        totalInvestment += doc.data().amount || 0;
        if (doc.data().status === "running") {
          runningInvestment += doc.data().amount || 0;
        }
      });

      setStats({
        totalUsers: usersSnap.size,
        totalTransactions: txSnap.size,
        totalInvestment,
        runningInvestment,
      });

      setLoading(false);
    };

    fetchStats();
  }, []);

  return { stats, loading };
}
