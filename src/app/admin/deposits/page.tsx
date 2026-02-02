"use client";

import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  Stack,
  Paper,
} from "@mui/material";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { useEffect, useState } from "react";

export default function AdminDepositsPage() {
  const [deposits, setDeposits] = useState<any[]>([]);

  useEffect(() => {
    return onSnapshot(collection(db, "deposits"), (snap) => {
      setDeposits(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const approveDeposit = async (deposit: any) => {
    // 1️⃣ Update deposit status
    await updateDoc(doc(db, "deposits", deposit.id), {
      status: "approved",
    });

    // 2️⃣ Credit user balance
    await updateDoc(doc(db, "users", deposit.userId), {
      usdtBalance: increment(deposit.amount),
    });
  };

  const rejectDeposit = async (id: string) => {
    await updateDoc(doc(db, "deposits", id), {
      status: "rejected",
    });
  };

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Typography fontSize={22} fontWeight={700} mb={3} color="text.primary">
        Deposit Requests
      </Typography>

      <Paper sx={{ overflowX: "auto", bgcolor: "background.paper", border: 1, borderColor: "divider" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "text.secondary" }}>User</TableCell>
              <TableCell sx={{ color: "text.secondary" }}>Asset</TableCell>
              <TableCell sx={{ color: "text.secondary" }}>Amount</TableCell>
              <TableCell sx={{ color: "text.secondary" }}>Tx Hash</TableCell>
              <TableCell sx={{ color: "text.secondary" }}>Status</TableCell>
              <TableCell align="right" sx={{ color: "text.secondary" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {deposits.map((d) => (
              <TableRow key={d.id}>
                <TableCell sx={{ color: "text.primary" }}>{d.userEmail}</TableCell>
                <TableCell sx={{ color: "text.primary" }}>
                  {d.asset} ({d.network})
                </TableCell>
                <TableCell sx={{ color: "text.primary" }}>${d.amount}</TableCell>
                <TableCell
                  sx={{
                    maxWidth: 120,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "text.primary",
                  }}
                >
                  {d.txHash}
                </TableCell>
                <TableCell>
                  <Chip
                    label={d.status}
                    color={
                      d.status === "approved"
                        ? "success"
                        : d.status === "rejected"
                        ? "error"
                        : "warning"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  {d.status === "pending" && (
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => approveDeposit(d)}
                      >
                        Approve
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        onClick={() => rejectDeposit(d.id)}
                      >
                        Reject
                      </Button>
                    </Stack>
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
