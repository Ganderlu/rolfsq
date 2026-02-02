import { Paper, Typography, List, ListItem } from "@mui/material";

export default function CryptoPrices() {
  return (
    <Paper sx={{ p: 3, bgcolor: "background.paper", border: 1, borderColor: "divider" }}>
      <Typography fontWeight={600} mb={2} color="text.primary">
        Crypto Prices
      </Typography>

      <List>
        <ListItem sx={{ color: "text.primary" }}>Bitcoin — $8072</ListItem>
        <ListItem sx={{ color: "text.primary" }}>Ethereum — $3071</ListItem>
        <ListItem sx={{ color: "text.primary" }}>USDT — $1</ListItem>
        <ListItem sx={{ color: "text.primary" }}>BNB — $378</ListItem>
        <ListItem sx={{ color: "text.primary" }}>Solana — $127</ListItem>
      </List>
    </Paper>
  );
}
