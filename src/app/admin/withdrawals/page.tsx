"use client";

import {
  collection,
  doc,
  onSnapshot,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
  Paper,
} from "@mui/material";

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<any[]>([]);

  useEffect(() => {
    return onSnapshot(collection(db, "withdrawals"), (snap) => {
      setWithdrawals(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const approveWithdraw = async (w: any) => {
    const userRef = doc(db, "users", w.userId);
    const withdrawalRef = doc(db, "withdrawals", w.id);

    await runTransaction(db, async (tx) => {
      const userSnap = await tx.get(userRef);
      if (!userSnap.exists()) throw new Error("User not found");

      const balance = userSnap.data().usdtBalance || 0;

      if (balance < w.amount) {
        throw new Error("Insufficient balance");
      }

      tx.update(userRef, {
        usdtBalance: balance - w.amount,
      });

      tx.update(withdrawalRef, {
        status: "approved",
        processedAt: new Date(),
      });

      tx.set(doc(collection(db, "notifications")), {
        userId: w.userId,
        title: "Withdrawal Approved",
        message: `Your $${w.amount} withdrawal was approved.`,
        read: false,
        createdAt: new Date(),
      });
    });
  };

  const rejectWithdraw = async (id: string) => {
    await updateDoc(doc(db, "withdrawals", id), {
      status: "rejected",
      processedAt: new Date(),
    });
  };

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Typography fontSize={22} fontWeight={700} mb={3} color="text.primary">
        Withdrawal Requests
      </Typography>

      <Paper
        sx={{
          overflowX: "auto",
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "text.secondary" }}>User</TableCell>
              <TableCell sx={{ color: "text.secondary" }}>Amount</TableCell>
              <TableCell sx={{ color: "text.secondary" }}>Status</TableCell>
              <TableCell sx={{ color: "text.secondary" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {withdrawals.map((w) => (
              <TableRow key={w.id}>
                <TableCell sx={{ color: "text.primary" }}>{w.userId}</TableCell>
                <TableCell sx={{ color: "text.primary" }}>
                  ${w.amount}
                </TableCell>
                <TableCell sx={{ color: "text.primary" }}>{w.status}</TableCell>
                <TableCell>
                  {w.status === "pending" && (
                    <>
                      <Button onClick={() => approveWithdraw(w)}>
                        Approve
                      </Button>
                      <Button
                        color="error"
                        onClick={() => rejectWithdraw(w.id)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
