"use client";

import { Box, Typography, Grid, Paper } from "@mui/material";
import GatewayCard from "../../../components/withdraw/GatewayCard";
import WithdrawLogs from "../../../components/withdraw/WithdrawLogs";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { auth } from "../../../firebase/firebaseClient";
import { getAuth } from "firebase/auth";


const gateways = ["Bitcoin", "ETH", "BNB", "TRON"];

export default function WithdrawPage() {
   const currentUser = auth.currentUser;
 const [usdtBalance, setUsdtBalance] = useState(0);

 useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const unsub = onSnapshot(doc(db, "users", user.uid), (snap) => {
      if (snap.exists()) {
        setUsdtBalance(Number(snap.data().usdtBalance || 0));
      }
    });

    return () => unsub();
  }, []);
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, color: "#fff" }}>
      {/* PAGE TITLE */}
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Withdraw Gateway
      </Typography>

      {/* GATEWAY GRID */}
      <Grid container spacing={2}>
        {gateways.map((name) => (
          <Grid item xs={12} sm={6} lg={4} key={name}>
            <GatewayCard title="USDT (TRC20)" balance={usdtBalance}/>
          </Grid>
        ))}
      </Grid>

      {/* DEPOSIT LOGS */}
      <Paper
        sx={{
          mt: 4,
          p: { xs: 2, md: 3 },
          background: "linear-gradient(180deg,#0f0f0f,#050505)",
          borderRadius: 2,
          border: "1px solid #1c1c1c",
        }}
      >
        <WithdrawLogs />
      </Paper>
    </Box>
  );
}
