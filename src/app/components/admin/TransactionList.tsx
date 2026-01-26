import { Paper, Typography, List, ListItem } from "@mui/material";

export default function TransactionPanel() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Total Transactions
      </Typography>

      <List>
        <ListItem>Withdraw $200 USD via Bitcoin</ListItem>
        <ListItem>Make a Payment with Bitcoin</ListItem>
        <ListItem>Added Balance via Admin</ListItem>
        <ListItem>$2000 invested (Student Plan)</ListItem>
      </List>
    </Paper>
  );
}
