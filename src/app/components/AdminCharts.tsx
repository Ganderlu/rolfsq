"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Box, useTheme } from "@mui/material";

export default function AdminCharts({
  data,
}: {
  data: { date: string; deposits: number; withdrawals: number }[];
}) {
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorDeps" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorWiths" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "var(--card)", 
              border: "1px solid var(--border)", 
              borderRadius: "8px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
            }}
            itemStyle={{ fontSize: "12px", fontWeight: 700 }}
            labelStyle={{ color: "var(--foreground)", marginBottom: "4px", fontWeight: 800 }}
          />
          <Area
            type="monotone"
            dataKey="deposits"
            stroke="#22c55e"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorDeps)"
          />
          <Area
            type="monotone"
            dataKey="withdrawals"
            stroke="#ef4444"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorWiths)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}
