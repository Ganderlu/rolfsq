"use client";

import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  TextField,
  IconButton,
  InputAdornment,
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

const chartData = [
  { month: "Feb-2025", profit: 0, invest: 0 },
  { month: "Mar-2025", profit: 0, invest: 0 },
  { month: "Apr-2025", profit: 0, invest: 0 },
  { month: "May-2025", profit: 0, invest: 0 },
  { month: "Jun-2025", profit: 0, invest: 0 },
  { month: "Jul-2025", profit: 0, invest: 0 },
];

export default function ProfitStatisticsPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* TOP SECTION */}
      <Grid container spacing={3}>
        {/* Investment Summary */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: "100%",
              p: 3,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, #0c0c0c 60%, #2b1605)",
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
              ["Total Invest", "$0"],
              ["Total Profits", "$0"],
              ["Running Invest", "$0"],
              ["Re-invest", "$0"],
              ["Closed Invest", "$0"],
            ].map(([label, value]) => (
              <Box
                key={label}
                display="flex"
                justifyContent="space-between"
                mt={2}
              >
                <Typography color="text.secondary">
                  {label}
                </Typography>
                <Typography fontWeight={600}>{value}</Typography>
              </Box>
            ))}

            <Button
              variant="outlined"
              fullWidth
              endIcon={<LaunchIcon />}
              sx={{
                mt: 3,
                borderRadius: 3,
                color: "#fff",
                borderColor: "#333",
              }}
            >
              Investment Now
            </Button>
          </Card>
        </Grid>

        {/* Monthly Chart */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              height: "100%",
              p: 3,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, #0c0c0c 60%, #1a1a1a)",
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
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#00bfff"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="invest"
                  stroke="#00ff9d"
                  strokeWidth={2}
                  dot={false}
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
          background:
            "linear-gradient(135deg, #0c0c0c 60%, #141414)",
        }}
      >
        <Typography fontWeight={600} mb={2}>
          Investment Profits and Commissions
        </Typography>

        {/* Filters */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Trx ID"
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="date"
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={4}>
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
          }}
        >
          <Typography>Initiated At</Typography>
          <Typography>Trx</Typography>
          <Typography>Amount</Typography>
          <Typography align="right">Details</Typography>
        </Box>

        {/* Empty State */}
        <Box
          textAlign="center"
          py={3}
          color="text.secondary"
        >
          No Data Found
        </Box>
      </Card>
    </Box>
  );
}
