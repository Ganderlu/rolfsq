"use client";

import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { useAuth } from "@/context/AuthContext";

import { 
  Box, 
  Typography, 
  Stack, 
  Chip, 
  Divider, 
  CircularProgress,
  LinearProgress
} from "@mui/material";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Activity, 
  Zap,
  ChevronRight
} from "lucide-react";

export default function ActiveTrades() {
  const { currentUser } = useAuth();
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "trades"),
      where("uid", "==", currentUser.uid),
      where("status", "==", "open"),
      orderBy("openedAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      setTrades(snap.docs.map((doc) => {
        const data = doc.data();
        const openedAt = data.openedAt?.toDate();
        const duration = data.duration || 60;
        const expiresAt = openedAt ? new Date(openedAt.getTime() + duration * 1000) : null;
        
        return { 
          id: doc.id, 
          ...data,
          expiresAt
        };
      }));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <Box sx={{ p: 2.5, bgcolor: "var(--card)", borderRadius: 4, border: "1px solid", borderColor: "var(--border)" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="700" sx={{ color: "#ffffff", display: "flex", alignItems: "center", gap: 1 }}>
          <Activity size={18} color="var(--primary)" /> Active Trades
        </Typography>
        <Chip 
          label={trades.length} 
          size="small" 
          sx={{ 
            bgcolor: "rgba(255,255,255,0.05)", 
            color: "#ffffff", 
            fontWeight: "700",
            fontSize: "0.7rem"
          }} 
        />
      </Stack>
      
      {loading ? (
        <Box sx={{ py: 4, textAlign: "center" }}>
          <CircularProgress size={24} />
        </Box>
      ) : trades.length === 0 ? (
        <Box sx={{ py: 6, textAlign: "center", border: "1px dashed", borderColor: "var(--border)", borderRadius: 3 }}>
          <Zap size={32} color="var(--border)" style={{ marginBottom: 12 }} />
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>No active trades</Typography>
          <Typography variant="caption" sx={{ color: "var(--muted-foreground)", opacity: 0.6 }}>
            Execute a trade to see it here
          </Typography>
        </Box>
      ) : (
        <Stack spacing={2}>
          {trades.map((trade) => {
            const isCall = trade.direction === "call";
            return (
              <Box 
                key={trade.id} 
                sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  bgcolor: "rgba(255,255,255,0.02)", 
                  border: "1px solid", 
                  borderColor: "rgba(255,255,255,0.05)",
                  transition: "all 0.2s",
                  "&:hover": { borderColor: isCall ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)" }
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" fontWeight="700" sx={{ color: "#ffffff" }}>{trade.asset}</Typography>
                    <Chip 
                      label={trade.direction.toUpperCase()} 
                      size="small" 
                      sx={{ 
                        height: 18, 
                        fontSize: "0.6rem", 
                        fontWeight: "800",
                        bgcolor: isCall ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
                        color: isCall ? "#22c55e" : "#ef4444"
                      }} 
                    />
                  </Stack>
                  <Typography variant="body2" fontWeight="800" sx={{ color: "#ffffff" }}>
                    ${trade.amount}
                  </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: "var(--muted-foreground)", display: "block" }}>Entry Price</Typography>
                    <Typography variant="caption" fontWeight="600" sx={{ color: "#ffffff" }}>{trade.openPrice}</Typography>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="caption" sx={{ color: "var(--muted-foreground)", display: "block" }}>Potential Profit</Typography>
                    <Typography variant="caption" fontWeight="700" sx={{ color: "#22c55e" }}>+${(trade.amount * (trade.payout || 0.85)).toFixed(2)}</Typography>
                  </Box>
                </Stack>

                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Clock size={10} color="var(--muted-foreground)" />
                      <Typography variant="caption" sx={{ color: "var(--muted-foreground)", fontSize: "0.65rem" }}>Time Remaining</Typography>
                    </Stack>
                    <Typography variant="caption" sx={{ color: "#ffffff", fontSize: "0.65rem", fontWeight: "700" }}>
                      {trade.expiresAt ? "Live" : "Pending..."}
                    </Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={70} // This would need a live timer hook to be accurate
                    sx={{ 
                      height: 4, 
                      borderRadius: 2, 
                      bgcolor: "rgba(255,255,255,0.05)",
                      "& .MuiLinearProgress-bar": { bgcolor: isCall ? "#22c55e" : "#ef4444" }
                    }} 
                  />
                </Box>
              </Box>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}
