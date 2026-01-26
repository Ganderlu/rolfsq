"use client";

import { Paper, Typography, Button, Box } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import WithdrawModal from "./WithdrawModal";
import { useState } from "react";

export default function GatewayCard({ balance }: { balance: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Paper
        sx={{
          p: 3,
          background: "#111",
          borderRadius: 2,
        }}
      >
        <Typography fontWeight={600}>USDT (TRC20)</Typography>

        <Typography mt={1} fontSize={14}>
          Balance: ${balance}
        </Typography>

        <Box mt={3}>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            endIcon={<OpenInNewIcon />}
          >
            Withdraw Now
          </Button>
        </Box>
      </Paper>

      <WithdrawModal
        open={open}
        onClose={() => setOpen(false)}
        balance={balance}
      />
    </>
  );
}
