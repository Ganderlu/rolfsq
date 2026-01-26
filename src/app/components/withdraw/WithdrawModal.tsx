"use client";

import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseClient";
import { useAuth } from "@/context/AuthContext";



export default function WithdrawModal({
  open,
  onClose,
  balance = 0,
}: {
  open: boolean;
  onClose: () => void;
  balance: number;
}) {
  const [amount, setAmount] = useState("");
  const { currentUser } = useAuth();

  const MIN_WITHDRAW = 100;
  const MAX_WITHDRAW = 1_000_000;

  const FEE = 0;
  const receive = amount ? Number(amount) - FEE : 0;

//   const { currentUser } = useAuth();
//   const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const numericAmount = Number(amount);

  const insufficient = numericAmount > balance;
  const belowMin = numericAmount < MIN_WITHDRAW;
  const aboveMax = numericAmount > MAX_WITHDRAW;

  const isInvalid = !numericAmount || insufficient || belowMin || aboveMax;

  const handleWithdraw = async () => {
    if (isInvalid || !currentUser) return;

    setLoading(true);

    await addDoc(collection(db, "withdrawals"), {
      userId: currentUser.uid,
      asset: "USDT",
      network: "TRC20",
      amount: numericAmount,
      fee: FEE,
      receiveAmount: numericAmount - FEE,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent sx={{ background: "#2c2c2c", color: "#fff" }}>
        <Typography fontWeight={600} mb={2}>
          Withdraw with USDT (TRC20)
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          Limit: ${MIN_WITHDRAW} - ${MAX_WITHDRAW}
        </Alert>

        <TextField
          fullWidth
          placeholder="Enter amount to withdraw"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          sx={{ mb: 1 }}
        />

        <Typography variant="body2" mb={2}>
          Available Balance: ${balance}
        </Typography>

        {insufficient && <Alert severity="error">Insufficient balance</Alert>}
        {belowMin && amount && (
          <Alert severity="warning">Minimum is ${MIN_WITHDRAW}</Alert>
        )}
        {aboveMax && (
          <Alert severity="warning">Maximum is ${MAX_WITHDRAW}</Alert>
        )}

        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={isInvalid || loading}
            onClick={handleWithdraw}
            sx={{ background: "#ff7a00" }}
          >
            {loading ? "Processing..." : "Proceed to Withdrawal"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );

  //   return (
  //     <Dialog
  //       open={open}
  //       onClose={onClose}
  //       fullWidth
  //       maxWidth="xs"
  //       sx={{
  //         "& .MuiDialog-paper": {
  //           background: "#2b2b2b",
  //           color: "#fff",
  //           borderRadius: 2,
  //         },
  //       }}
  //     >
  //       {/* Header */}
  //       <Box
  //         display="flex"
  //         justifyContent="space-between"
  //         alignItems="center"
  //         px={2}
  //         py={1.5}
  //       >
  //         <Typography fontWeight={600}>Withdraw with USDT (TRC20)</Typography>
  //         <IconButton onClick={onClose} sx={{ color: "#aaa" }}>
  //           <CloseIcon />
  //         </IconButton>
  //       </Box>

  //       <DialogContent>
  //         {/* Info Box */}
  //         <Box
  //           display="flex"
  //           alignItems="center"
  //           gap={1}
  //           p={2}
  //           mb={2}
  //           borderRadius={1}
  //           sx={{ backgroundColor: "#d9f7ff", color: "#000" }}
  //         >
  //           <InfoOutlinedIcon fontSize="small" />
  //           <Typography fontSize={14}>Limit: $100 - $1000000</Typography>
  //         </Box>

  //         {/* Amount */}
  //         <Typography mb={1}>Withdrawal Amount</Typography>

  //         <Box display="flex">
  //           <TextField
  //             fullWidth
  //             placeholder="Enter amount to withdraw"
  //             value={amount}
  //             onChange={(e) => setAmount(e.target.value)}
  //             InputProps={{
  //               sx: {
  //                 background: "#111",
  //                 color: "#fff",
  //                 borderRadius: "4px 0 0 4px",
  //               },
  //             }}
  //           />
  //           <Box
  //             px={2}
  //             display="flex"
  //             alignItems="center"
  //             sx={{
  //               background: "#fff",
  //               color: "#000",
  //               borderRadius: "0 4px 4px 0",
  //             }}
  //           >
  //             USD
  //           </Box>
  //         </Box>

  //         <Typography mt={1} fontSize={13} color="#aaa">
  //           Available Balance: $0
  //         </Typography>

  //         <Divider sx={{ my: 2, borderColor: "#444" }} />

  //         {/* Summary */}
  //         <Box display="flex" justifyContent="space-between" mb={2}>
  //           <Box>
  //             <Typography fontSize={13} color="#aaa">
  //               Processing Fee
  //             </Typography>
  //             <Typography fontWeight={600}>${fee.toFixed(2)}</Typography>
  //           </Box>

  //           <Box textAlign="right">
  //             <Typography fontSize={13} color="#aaa">
  //               You Will Receive
  //             </Typography>
  //             <Typography fontWeight={600}>${receive.toFixed(2)}</Typography>
  //           </Box>
  //         </Box>

  //         {/* Actions */}
  //         <Box display="flex" justifyContent="space-between">
  //           <Button
  //             variant="outlined"
  //             onClick={onClose}
  //             sx={{ color: "#fff", borderColor: "#555" }}
  //           >
  //             Cancel
  //           </Button>

  //           <Button
  //             variant="contained"
  //             sx={{
  //               backgroundColor: "#ff7a00",
  //               fontWeight: 600,
  //               "&:hover": { backgroundColor: "#ff8f26" },
  //             }}
  //           >
  //             Proceed to Withdrawal
  //           </Button>
  //         </Box>
  //       </DialogContent>
  //     </Dialog>
  //   );
}
