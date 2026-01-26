import { Paper, Typography, List, ListItem } from "@mui/material";

export default function CryptoPrices() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Crypto Prices
      </Typography>

      <List>
        <ListItem>Bitcoin — $8072</ListItem>
        <ListItem>Ethereum — $3071</ListItem>
        <ListItem>USDT — $1</ListItem>
        <ListItem>BNB — $378</ListItem>
        <ListItem>Solana — $127</ListItem>
      </List>
    </Paper>
  );
}
