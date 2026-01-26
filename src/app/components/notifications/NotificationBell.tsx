"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { useAuth } from "@/context/AuthContext";

export default function NotificationBell() {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", currentUser.uid)
    );

    return onSnapshot(q, (snap) => {
      setNotifications(snap.docs.map(d => ({
        id: d.id,
        ...d.data(),
      })));
    });
  }, [currentUser]);

  return (
    <div>
      🔔 {notifications.filter(n => !n.read).length}
    </div>
  );
}
