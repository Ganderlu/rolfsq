import { Paper, Typography, Stack } from "@mui/material";


export default function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Paper
      sx={{
        p: 3,
        bgcolor: "var(--card)",
        color: "var(--card-foreground)",
        border: "1px solid",
        borderColor: "var(--border)",
      }}
    >
      <Stack spacing={1}>
        <Typography sx={{ color: "var(--muted-foreground)" }}>{title}</Typography>
        <Typography variant="h5" fontWeight={700}>
          {value}
        </Typography>
      </Stack>
    </Paper>
  );
}