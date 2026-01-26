"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";
import { Paper, Typography } from "@mui/material";

export default function DepositWithdrawalChart({ data }: any) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Deposit & Withdrawal Statistics
      </Typography>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="deposit" />
          <Bar dataKey="withdrawal" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
