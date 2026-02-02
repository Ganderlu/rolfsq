import { Paper, Typography } from "@mui/material";

export default function StatCard({ title, value }: any) {
  return (
    <Paper sx={{ p: 2.5, borderRadius: 2, bgcolor: "background.paper", border: 1, borderColor: "divider" }}>
      <Typography fontSize={12} color="text.secondary">
        {title}
      </Typography>
      <Typography fontSize={20} fontWeight={700} color="text.primary">
        {value}
      </Typography>
    </Paper>
  );
}
