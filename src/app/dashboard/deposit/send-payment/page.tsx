"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Button, Card } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebaseClient";

const paymentConfig = {
  USDT: { name: "USDT (TRC20)", network: "TRC20" },
  Bitcoin: { name: "Bitcoin", network: "BTC" },
  Ethereum: { name: "Ethereum", network: "ERC20" },
};

export default function SendPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const coin = searchParams.get("coin");
  const network = searchParams.get("network");
  const address = searchParams.get("address");
  const amount = searchParams.get("amount");

  const payment = coin
    ? paymentConfig[coin as keyof typeof paymentConfig]
    : null;

  useEffect(() => {
    if (!payment || !amount) {
      router.replace("/dashboard/deposit/instant");
    }
  }, [payment, amount, router]);

  if (!payment || !amount) return null;

  const handleSubmitPayment = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "deposits"), {
        userId: user.uid,
        coin,
        network,
        address,
        amount: Number(amount),
        status: "pending", // ⏳ admin decision
        createdAt: serverTimestamp(),
      });

      router.push("/dashboard/deposit/confirmation");
    } catch (error) {
      console.error("Deposit error:", error);
      alert("Failed to submit payment. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minHeight="100vh"
      px={{ xs: 2, md: 6 }}
      py={6}
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Card
        sx={{
          maxWidth: 520,
          mx: "auto",
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 3,
          border: 1,
          borderColor: "divider",
        }}
      >
        <Typography fontWeight={700} fontSize={22} mb={2}>
          Send Payment
        </Typography>

        <Typography fontSize={14} color="text.secondary">
          Coin
        </Typography>
        <Typography mb={2}>{payment.name}</Typography>

        <Typography fontSize={14} color="text.secondary">
          Network
        </Typography>
        <Typography mb={2}>{network}</Typography>

        <Typography fontSize={14} color="text.secondary">
          Wallet Address
        </Typography>
        <Typography mb={2} sx={{ wordBreak: "break-all" }}>
          {address}
        </Typography>

        <Typography fontSize={14} color="text.secondary">
          Amount
        </Typography>
        <Typography mb={3}>${amount}</Typography>

        <Button
          fullWidth
          size="large"
          disabled={loading}
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            fontWeight: 600,
            "&:hover": { bgcolor: "primary.dark" },
          }}
          onClick={handleSubmitPayment}
        >
          {loading ? "Submitting..." : "I Have Sent Payment"}
        </Button>
      </Card>
    </Box>
  );
}

// "use client";

// import { useEffect } from "react";
// import { Box, Typography, Button, Card } from "@mui/material";
// import { useRouter, useSearchParams } from "next/navigation";

// const paymentConfig = {
//   USDT: {
//     name: "USDT (TRC20)",
//     network: "TRC20",
//   },
//   Bitcoin: {
//     name: "Bitcoin",
//     network: "BTC",
//   },
//   Ethereum: {
//     name: "Ethereum",
//     network: "ERC20",
//   },
// };

// export default function SendPaymentPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const coin = searchParams.get("coin");
//   const network = searchParams.get("network");
//   const address = searchParams.get("address");
//   const amount = searchParams.get("amount");

//   const payment = coin
//     ? paymentConfig[coin as keyof typeof paymentConfig]
//     : null;

//   // ✅ REDIRECT SAFELY
//   useEffect(() => {
//     if (!payment || !amount) {
//       router.replace("/dashboard/deposit/instant");
//     }
//   }, [payment, amount, router]);

//   // ⛔ prevent rendering while redirecting
//   if (!payment || !amount) return null;

//   return (
//     <Box
//       minHeight="100vh"
//       px={{ xs: 2, md: 6 }}
//       py={6}
//       sx={{
//         background: "radial-gradient(circle at top, #111a2e 0%, #070b16 60%)",
//         color: "#fff",
//       }}
//     >
//       <Card
//         sx={{
//           maxWidth: 520,
//           mx: "auto",
//           p: 4,
//           background: "#0c1324",
//           borderRadius: 3,
//           border: "1px solid #1f2a44",
//         }}
//       >
//         <Typography fontWeight={700} fontSize={22} mb={2}>
//           Send Payment
//         </Typography>

//         <Typography fontSize={14} color="gray">
//           Coin
//         </Typography>
//         <Typography mb={2}>{payment.name}</Typography>

//         <Typography fontSize={14} color="gray">
//           Network
//         </Typography>
//         <Typography mb={2}>{network}</Typography>

//         <Typography fontSize={14} color="gray">
//           Wallet Address
//         </Typography>
//         <Typography mb={2} sx={{ wordBreak: "break-all" }}>
//           {address}
//         </Typography>

//         <Typography fontSize={14} color="gray">
//           Amount
//         </Typography>
//         <Typography mb={3}>${amount}</Typography>

//         <Button
//           fullWidth
//           size="large"
//           sx={{
//             background: "linear-gradient(90deg, #2563eb, #3b82f6)",
//             color: "#fff",
//             fontWeight: 600,
//           }}
//           onClick={() =>
//             router.push("/dashboard/deposit/confirmation")
//           }
//         >
//           I Have Sent Payment
//         </Button>
//       </Card>
//     </Box>
//   );
// }
