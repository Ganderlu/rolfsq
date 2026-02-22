"use client";

import {
  Button,
  Table,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  increment,
  setDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { useEffect, useState } from "react";

export default function AdminWithdrawals() {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    return onSnapshot(collection(db, "withdrawals"), (snap) => {
      setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const approve = async (w: any) => {
    await updateDoc(doc(db, "withdrawals", w.id), {
      status: "approved",
    });

    const userRef = doc(db, "users", w.userId);
    await setDoc(
      userRef,
      {
        usdtBalance: increment(-w.amount),
      },
      { merge: true },
    );
  };

  const reject = async (id: string) => {
    await updateDoc(doc(db, "withdrawals", id), {
      status: "rejected",
    });
  };

  return (
    <Table>
      {rows.map((w) => (
        <TableRow key={w.id}>
          <TableCell>{w.userId}</TableCell>
          <TableCell>${w.amount}</TableCell>
          <TableCell>{w.status}</TableCell>
          <TableCell>
            <Button onClick={() => approve(w)}>Approve</Button>
            <Button color="error" onClick={() => reject(w.id)}>
              Reject
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
}
