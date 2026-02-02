"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Paper, Typography, Box } from "@mui/material";

export default function AdminCharts({
  data,
}: {
  data: { date: string; deposits: number; withdrawals: number }[];
}) {
  return (
    <Paper sx={{ p: 2, borderRadius: 2, bgcolor: "background.paper", border: 1, borderColor: "divider" }}>
      <Typography fontWeight={600} mb={2} color="text.primary">
        Daily Transactions
      </Typography>

      <Box height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="deposits"
              stroke="#4caf50"
              strokeWidth={2}
            />

            <Line
              type="monotone"
              dataKey="withdrawals"
              stroke="#f44336"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
