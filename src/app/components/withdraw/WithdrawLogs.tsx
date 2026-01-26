"use client";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function WithdrawalHistory() {
  const { currentUser } = useAuth();
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "withdrawals"),
      where("userId", "==", currentUser.uid)
    );

    return onSnapshot(q, (snap) => {
      setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, [currentUser]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Asset</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.asset}</TableCell>
            <TableCell>${row.amount}</TableCell>
            <TableCell>
              <Chip
                label={row.status}
                color={
                  row.status === "approved"
                    ? "success"
                    : row.status === "rejected"
                    ? "error"
                    : "warning"
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
