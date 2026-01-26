"use client";

import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  TextField,
  MenuItem,
  Chip,
  Stack,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useRouter } from "next/navigation";
import { useState } from "react";

const quickAmounts = [100, 500, 1000, 5000];
const paymentMethods = [
  {
    coin: "USDT",
    network: "TRC20",
    address: "TXyP9Yh2K8QJ4exampleUSDTAddress",
  },
  {
    coin: "Bitcoin",
    network: "BTC",
    address: "bc1qexamplebitcoinaddress",
  },
  {
    coin: "Ethereum",
    network: "ERC20",
    address: "0xExampleEthereumWallet",
  },
  {
    coin: "Solana",
    network: "SOL",
    address: "ExampleSolanaWalletAddress",
  },
  {
    coin: "XRP",
    network: "XRP",
    address: "rExampleXRPWallet",
  },
];

export default function DepositPage() {
  const router = useRouter();

  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);
  const [amount, setAmount] = useState("");
  return (
    <Box
      minHeight="100vh"
      px={{ xs: 2, md: 6 }}
      py={6}
      sx={{
        background: "radial-gradient(circle at top, #111a2e 0%, #070b16 60%)",
        color: "#fff",
      }}
    >
      {/* Header */}
      <Box textAlign="center" mb={5}>
        <Typography fontSize={28} fontWeight={700}>
          Fund Your Account
        </Typography>
        <Typography color="gray" mt={1}>
          Secure deposits to start trading
        </Typography>
      </Box>

      {/* Quick Amounts */}
      <Box textAlign="center" mb={6}>
        <Typography fontSize={13} color="gray" mb={1}>
          Quick amounts:
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
          flexWrap="wrap"
        >
          {quickAmounts.map((amt) => (
            <Button
              key={amt}
              variant="outlined"
              onClick={() => setAmount(String(amt))}
              sx={{
                color: "#fff",
                borderColor: "#1f2a44",
                "&:hover": { borderColor: "#3b82f6" },
              }}
            >
              ${amt.toLocaleString()}
            </Button>
          ))}
        </Stack>
      </Box>

      {/* Main Content */}
      <Grid container spacing={3} justifyContent="center">
        {/* Deposit Form */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: "#0c1324",
              borderRadius: 3,
              border: "1px solid #1f2a44",
              p: 3,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography fontWeight={600}>Make a Deposit</Typography>
              <Chip
                icon={<SecurityIcon />}
                label="Secure"
                size="small"
                sx={{
                  background: "#0f2d1f",
                  color: "#22c55e",
                }}
              />
            </Box>

            <Typography fontSize={13} mb={1}>
              Payment Method *
            </Typography>
            <TextField
              select
              fullWidth
              value={selectedMethod.coin}
              onChange={(e) => {
                const method = paymentMethods.find(
                  (m) => m.coin === e.target.value,
                );
                setSelectedMethod(method!);
              }}
              sx={{
                mb: 3,
                background: "#131b2e",
                borderRadius: 1,
              }}
            >
              {paymentMethods.map((method) => (
                <MenuItem key={method.coin} value={method.coin}>
                  {method.coin} ({method.network})
                </MenuItem>
              ))}
            </TextField>

            <Typography fontSize={13} mb={1}>
              Amount to Deposit *
            </Typography>
            <TextField
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="$ 0.00"
              sx={{
                background: "#131b2e",
                borderRadius: 1,
              }}
            />
            <Typography fontSize={12} color="gray" mt={1}>
              Enter the amount you wish to deposit
            </Typography>

            <Button
              onClick={() => {
                if (!amount) {
                  alert("Enter deposit amount");
                  return;
                }

                const query = new URLSearchParams({
                  coin: selectedMethod.coin,
                  network: selectedMethod.network,
                  address: selectedMethod.address,
                  amount,
                }).toString();

                router.push(`/dashboard/deposit/send-payment?${query}`);
              }}
              fullWidth
              size="large"
              sx={{
                mt: 3,
                background: "linear-gradient(90deg, #2563eb, #3b82f6)",
                color: "#fff",
                fontWeight: 600,
              }}
            >
              Proceed with Deposit
            </Button>
          </Card>
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} md={4}>
          {/* Payment Methods */}
          <Card
            sx={{
              background: "#0c1324",
              borderRadius: 3,
              border: "1px solid #1f2a44",
              p: 3,
              mb: 3,
            }}
          >
            <Typography fontWeight={600} mb={2}>
              Payment Methods
            </Typography>

            <Stack spacing={1}>
              {paymentMethods.map((method) => (
                <Box
                  key={method.coin}
                  display="flex"
                  alignItems="center"
                  gap={1}
                  p={1.5}
                  borderRadius={2}
                  sx={{
                    background: "#131b2e",
                  }}
                >
                  <CreditCardIcon fontSize="small" />
                  <Typography fontSize={14}>{method.coin}</Typography>
                </Box>
              ))}
            </Stack>
          </Card>

          {/* How To Deposit */}
          <Card
            sx={{
              background: "#0c1324",
              borderRadius: 3,
              border: "1px solid #1f2a44",
              p: 3,
            }}
          >
            <Typography fontWeight={600} mb={2}>
              How to Deposit
            </Typography>

            <Stack spacing={2}>
              <Typography fontSize={13}>
                1️⃣ Choose your payment method
              </Typography>
              <Typography fontSize={13}>2️⃣ Enter deposit amount</Typography>
              <Typography fontSize={13}>3️⃣ Complete secure payment</Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

// "use client";

// import { Box, Typography, Grid, Paper } from "@mui/material";
// import GatewayCard from "../../../components/deposit/GatewayCard";
// import DepositLogs from "../../../components/deposit/DepositLogs";

// const gateways = [
//   "Flutterwave",
//   "Pay Stack",
//   "Bitcoin",
//   "ETH",
//   "USDT (ETH)",
//   "USDT (TRC 20)",
//   "BNB",
//   "SOLANA",
//   "TRON",
// ];

// export default function DepositInstantPage() {
//   return (
//     <Box sx={{ p: { xs: 2, md: 4 }, color: "#fff" }}>
//       {/* PAGE TITLE */}
//       <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
//         Payment Gateway
//       </Typography>

//       {/* GATEWAY GRID */}
//       <Grid container spacing={2}>
//         {gateways.map((name) => (
//           <Grid item xs={12} sm={6} lg={4} key={name}>
//             <GatewayCard title={name} />
//           </Grid>
//         ))}
//       </Grid>

//       {/* DEPOSIT LOGS */}
//       <Paper
//         sx={{
//           mt: 4,
//           p: { xs: 2, md: 3 },
//           background: "linear-gradient(180deg,#0f0f0f,#050505)",
//           borderRadius: 2,
//           border: "1px solid #1c1c1c",
//         }}
//       >
//         <DepositLogs />
//       </Paper>
//     </Box>
//   );
// }
