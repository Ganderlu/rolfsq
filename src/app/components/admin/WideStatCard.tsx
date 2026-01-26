import { Paper, Typography } from "@mui/material";

export default function WideStatCard({ title, value, subtitle }: any) {
  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography fontSize={13}>{title}</Typography>
      <Typography fontSize={22} fontWeight={700}>
        {value}
      </Typography>
      {subtitle && (
        <Typography fontSize={12} color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Paper>
  );
}
