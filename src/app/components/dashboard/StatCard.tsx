import { Paper, Typography, Stack } from "@mui/material";


export default function StatCard({ title, value }: { title: string; value: string }) {
return (
<Paper sx={{ p: 3, bgcolor: "#0f172a", color: "#fff" }}>
<Stack spacing={1}>
<Typography color="gray">{title}</Typography>
<Typography variant="h5" fontWeight={700}>{value}</Typography>
</Stack>
</Paper>
);
}