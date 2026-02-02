import { Paper, Typography, List, ListItem } from "@mui/material";

export default function TransactionPanel() {
  return (
    <Paper sx={{ p: 3, bgcolor: "background.paper", border: 1, borderColor: "divider" }}>
      <Typography fontWeight={600} mb={2} color="text.primary">
        Total Transactions
      </Typography>

      <List>
        <ListItem sx={{ color: "text.primary" }}>Withdraw $200 USD via Bitcoin</ListItem>
        <ListItem sx={{ color: "text.primary" }}>Make a Payment with Bitcoin</ListItem>
        <ListItem sx={{ color: "text.primary" }}>Added Balance via Admin</ListItem>
        <ListItem sx={{ color: "text.primary" }}>$2000 invested (Student Plan)</ListItem>
      </List>
    </Paper>
  );
}
