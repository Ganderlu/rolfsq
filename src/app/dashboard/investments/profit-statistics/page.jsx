"use client";

import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/app/firebase/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function ProfitStatisticsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalInvest: 0,
    totalProfit: 0,
    runningInvest: 0,
    reInvest: 0,
    closedInvest: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "investments"),
        where("userId", "==", user.uid),
      );

      const unsubscribe = onSnapshot(q, (snap) => {
        let tInvest = 0;
        let tProfit = 0;
        let rInvest = 0;
        let cInvest = 0;
        const monthlyData = {};
        const trxList = [];

        snap.forEach((doc) => {
          const data = doc.data();
          const amt = Number(data.amount) || 0;
          const profit = Number(data.profit) || 0; // Assuming profit field exists
          const createdAt = data.createdAt?.toDate() || new Date();

          // Aggregate Stats
          tInvest += amt;
          tProfit += profit;
          if (data.status === "active" || data.status === "running") {
            rInvest += amt;
          } else if (data.status === "completed") {
            cInvest += amt;
          }

          // Prepare Chart Data
          const monthYear = createdAt.toLocaleString("default", {
            month: "short",
            year: "numeric",
          });
          if (!monthlyData[monthYear]) {
            monthlyData[monthYear] = {
              month: monthYear,
              profit: 0,
              invest: 0,
              timestamp: createdAt.getTime(), // for sorting
            };
          }
          monthlyData[monthYear].invest += amt;
          monthlyData[monthYear].profit += profit;

          // Prepare Transaction List
          trxList.push({
            id: doc.id,
            ...data,
            createdAt: createdAt,
          });
        });

        setStats({
          totalInvest: tInvest,
          totalProfit: tProfit,
          runningInvest: rInvest,
          reInvest: 0, // Placeholder
          closedInvest: cInvest,
        });

        // Convert monthlyData object to array and sort
        const chartArr = Object.values(monthlyData).sort(
          (a, b) => a.timestamp - b.timestamp,
        );
        setChartData(chartArr);

        // Sort transactions desc
        trxList.sort((a, b) => b.createdAt - a.createdAt);
        setTransactions(trxList);
        setLoading(false);
      });

      return () => unsubscribe();
    });

    return () => unsubscribeAuth();
  }, []);

  const filteredTransactions = transactions.filter((t) =>
    t.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, color: "#fff" }}>
      {/* TOP SECTION */}
      <Grid container spacing={3}>
        {/* Investment Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              height: "100%",
              p: 3,
              borderRadius: 3,
              background: "linear-gradient(135deg, #0c0c0c 60%, #2b1605)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight={600}>Investment</Typography>
              <IconButton
                size="small"
                sx={{ bgcolor: "#ff7a00", color: "#000" }}
              >
                <LaunchIcon fontSize="small" />
              </IconButton>
            </Box>

            {[
              ["Total Invest", stats.totalInvest],
              ["Total Profits", stats.totalProfit],
              ["Running Invest", stats.runningInvest],
              ["Re-invest", stats.reInvest],
              ["Closed Invest", stats.closedInvest],
            ].map(([label, value]) => (
              <Box
                key={label}
                display="flex"
                justifyContent="space-between"
                mt={2}
              >
                <Typography color="gray" fontSize={14}>
                  {label}
                </Typography>
                <Typography fontWeight={600}>
                  ${value.toLocaleString()}
                </Typography>
              </Box>
            ))}

            <Button
              variant="outlined"
              fullWidth
              endIcon={<LaunchIcon />}
              onClick={() => router.push("/dashboard/investments/plans")}
              sx={{
                mt: 3,
                borderRadius: 3,
                color: "#fff",
                borderColor: "#333",
                "&:hover": { borderColor: "#ff7a00", color: "#ff7a00" },
              }}
            >
              Invest Now
            </Button>
          </Card>
        </Grid>

        {/* Monthly Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card
            sx={{
              height: "100%",
              p: 3,
              borderRadius: 3,
              background: "linear-gradient(135deg, #0c0c0c 60%, #1a1a1a)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Typography fontWeight={600} mb={2}>
              Monthly investment statistics
            </Typography>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="#222" />
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e1e1e",
                    border: "1px solid #333",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#00bfff"
                  strokeWidth={2}
                  dot={false}
                  name="Profit"
                />
                <Line
                  type="monotone"
                  dataKey="invest"
                  stroke="#00ff9d"
                  strokeWidth={2}
                  dot={false}
                  name="Invest"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

      {/* TABLE SECTION */}
      <Card
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          background: "linear-gradient(135deg, #0c0c0c 60%, #141414)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Typography fontWeight={600} mb={2}>
          Investment Profits and Commissions
        </Typography>

        {/* Filters */}
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              placeholder="Search by ID"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{ sx: { color: "white" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&.Mui-focused fieldset": { borderColor: "#ff7a00" },
                },
              }}
            />
          </Grid>
          {/* <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="date"
              size="small"
              sx={{ bgcolor: "rgba(255,255,255,0.05)", borderRadius: 1 }}
            />
          </Grid> */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Button
              fullWidth
              startIcon={<SearchIcon />}
              sx={{
                height: "100%",
                bgcolor: "#ff7a00",
                color: "#000",
                fontWeight: 600,
                "&:hover": { bgcolor: "#ff8c1a" },
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>

        {/* Table Header */}
        <Box
          display="grid"
          gridTemplateColumns="1.5fr 2fr 1fr 1fr"
          sx={{
            bgcolor: "#121212",
            p: 1.5,
            borderRadius: 2,
            fontSize: 13,
            mb: 1,
            color: "gray",
          }}
        >
          <Typography>Initiated At</Typography>
          <Typography>Trx</Typography>
          <Typography>Amount</Typography>
          <Typography align="right">Status</Typography>
        </Box>

        {/* Table Rows */}
        {loading ? (
          <Box display="flex" justify="center" p={3}>
            <CircularProgress size={24} sx={{ color: "#ff7a00" }} />
          </Box>
        ) : filteredTransactions.length === 0 ? (
          <Box textAlign="center" py={3} color="text.secondary">
            No Data Found
          </Box>
        ) : (
          filteredTransactions.map((trx) => (
            <Box
              key={trx.id}
              display="grid"
              gridTemplateColumns="1.5fr 2fr 1fr 1fr"
              sx={{
                p: 1.5,
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                fontSize: 14,
                "&:hover": { bgcolor: "rgba(255,255,255,0.02)" },
              }}
            >
              <Box>
                <Typography fontSize={14}>
                  {trx.createdAt?.toLocaleDateString()}
                </Typography>
                <Typography fontSize={12} color="gray">
                  {trx.createdAt?.toLocaleTimeString()}
                </Typography>
              </Box>
              <Typography sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                {trx.id}
              </Typography>
              <Typography color="#00ff00">
                ${trx.amount?.toLocaleString()}
              </Typography>
              <Typography
                align="right"
                sx={{
                  color: trx.status === "completed" ? "#00ff00" : "#ffa500",
                  textTransform: "capitalize",
                }}
              >
                {trx.status}
              </Typography>
            </Box>
          ))
        )}
      </Card>
    </Box>
  );
}
