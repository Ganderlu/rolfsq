"use client";

import { useEffect, useState } from "react";
import { IconButton, Badge } from "@mui/material";
import { Bell } from "lucide-react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { useAuth } from "@/context/AuthContext";

export default function NotificationBell() {
  const { currentUser } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", currentUser.uid),
    );

    return onSnapshot(q, (snap) => {
      const all = snap.docs.map((d) => d.data() as any);
      setUnreadCount(all.filter((n) => !n.read).length);
    });
  }, [currentUser]);

  return (
    <IconButton
      size="small"
      sx={{
        color: "var(--muted-foreground)",
        "&:hover": { color: "var(--foreground)", bgcolor: "var(--accent)" },
      }}
    >
      <Badge
        color="error"
        badgeContent={unreadCount}
        overlap="circular"
        sx={{
          "& .MuiBadge-badge": {
            fontSize: 10,
            minWidth: 16,
            height: 16,
          },
        }}
      >
        <Bell size={20} />
      </Badge>
    </IconButton>
  );
}
