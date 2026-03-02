"use client";

import { Paper, Typography, Button, Box, Avatar, Stack } from "@mui/material";
import { ArrowUpRight } from "lucide-react";
import WithdrawModal from "./WithdrawModal";
import { useState } from "react";

const getAssetIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes("bitcoin")) return "https://cryptologos.cc/logos/bitcoin-btc-logo.png";
  if (t.includes("ethereum")) return "https://cryptologos.cc/logos/ethereum-eth-logo.png";
  if (t.includes("bnb")) return "https://cryptologos.cc/logos/binance-coin-bnb-logo.png";
  if (t.includes("tron")) return "https://cryptologos.cc/logos/tron-trx-logo.png";
  if (t.includes("usdt")) return "https://cryptologos.cc/logos/tether-usdt-logo.png";
  if (t.includes("solana")) return "https://cryptologos.cc/logos/solana-sol-logo.png";
  return "";
};

export default function GatewayCard({ title, balance }: { title: string; balance: number }) {
  const [open, setOpen] = useState(false);
  const icon = getAssetIcon(title);

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          bgcolor: "var(--card)",
          border: "1px solid",
          borderColor: "var(--border)",
          borderRadius: 4,
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "primary.main",
            transform: "translateY(-4px)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
          }
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Avatar 
            src={icon} 
            sx={{ 
              width: 48, 
              height: 48, 
              bgcolor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)"
            }} 
          >
            {title[0]}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="700" sx={{ color: "#ffffff" }}>
              {title}
            </Typography>
            <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>
              Instant Payout
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ mb: 3 }}>
          <Typography variant="caption" sx={{ color: "var(--muted-foreground)", display: "block", mb: 0.5 }}>
            Withdrawal Limit
          </Typography>
          <Typography variant="body2" fontWeight="600" sx={{ color: "#ffffff" }}>
            $100.00 - $1,000,000.00
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          onClick={() => setOpen(true)}
          endIcon={<ArrowUpRight size={18} />}
          sx={{
            borderRadius: 2.5,
            py: 1.2,
            textTransform: "none",
            fontWeight: "700",
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" }
          }}
        >
          Withdraw Now
        </Button>
      </Paper>

      <WithdrawModal
        open={open}
        onClose={() => setOpen(false)}
        balance={balance}
        asset={title}
      />
    </>
  );
}
