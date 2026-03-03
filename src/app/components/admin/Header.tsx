"use client";

import { 
  Box, 
  IconButton, 
  Stack, 
  Typography, 
  Avatar, 
  Menu, 
  MenuItem,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { 
  Menu as MenuIcon, 
  Search, 
  Settings, 
  User, 
  LogOut, 
  Bell, 
  HelpCircle,
  ChevronDown,
  ShieldCheck
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { db } from "@/app/firebase/firebaseClient";
import { collection, limit, onSnapshot, orderBy, query, updateDoc, doc } from "firebase/firestore";

export default function Header({ onMenu }: any) {
  const { currentUser, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);
  const notifOpen = Boolean(notifAnchor);
  const [notifications, setNotifications] = useState<any[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const q = query(collection(db, "notifications"), orderBy("createdAt", "desc"), limit(20));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setNotifications(data as any[]);
    });
    return () => unsub();
  }, []);

  const unread = useMemo(() => notifications.filter((n: any) => !n.read).length, [notifications]);

  const openNotif = (e: React.MouseEvent<HTMLElement>) => {
    setNotifAnchor(e.currentTarget);
  };
  const closeNotif = () => setNotifAnchor(null);

  const markAllRead = async () => {
    const unreadList = notifications.filter((n: any) => !n.read);
    await Promise.all(
      unreadList.map((n: any) => updateDoc(doc(db, "notifications", n.id), { read: true }))
    );
  };

  return (
    <Box
      sx={{
        height: 72,
        px: { xs: 2, md: 4 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "var(--card)",
        borderBottom: "1px solid",
        borderColor: "var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(10px)",
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0))"
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton
          onClick={onMenu}
          sx={{ display: { md: "none" }, color: "var(--muted-foreground)" }}
        >
          <MenuIcon size={20} />
        </IconButton>

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box 
              sx={{ 
                px: 1, 
                py: 0.2, 
                borderRadius: 1, 
                bgcolor: "rgba(239, 68, 68, 0.1)", 
                color: "#ef4444", 
                fontSize: "0.65rem", 
                fontWeight: 800,
                textTransform: "uppercase"
              }}
            >
              System Admin
            </Box>
            <Typography variant="body2" sx={{ color: "var(--muted-foreground)", fontWeight: 500 }}>
              Management Console v2.0
            </Typography>
          </Stack>
        </Box>
      </Stack>

      <Stack direction="row" spacing={1.5} alignItems="center">
        <IconButton 
          size="small" 
          sx={{ 
            color: "var(--muted-foreground)", 
            bgcolor: "rgba(255,255,255,0.02)", 
            border: "1px solid",
            borderColor: "var(--border)",
            "&:hover": { color: "var(--foreground)", bgcolor: "rgba(255,255,255,0.05)" }
          }}
        >
          <Search size={18} />
        </IconButton>

        <IconButton 
          size="small" 
          onClick={openNotif}
          sx={{ 
            color: "var(--muted-foreground)", 
            bgcolor: "rgba(255,255,255,0.02)", 
            border: "1px solid",
            borderColor: "var(--border)",
            "&:hover": { color: "var(--foreground)", bgcolor: "rgba(255,255,255,0.05)" }
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Bell size={18} />
            {unread > 0 && (
              <Box sx={{ position: "absolute", top: -4, right: -4, width: 8, height: 8, bgcolor: "#ef4444", borderRadius: "50%" }} />
            )}
          </Box>
        </IconButton>
        <Menu
          anchorEl={notifAnchor}
          open={notifOpen}
          onClose={closeNotif}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: {
              mt: 1.5,
              width: 360,
              maxWidth: '90vw',
              bgcolor: "var(--card)",
              border: "1px solid",
              borderColor: "var(--border)",
              borderRadius: 3,
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
              backgroundImage: "none",
              color: "var(--foreground)"
            }
          }}
        >
          <Box sx={{ px: 2, py: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="subtitle2" fontWeight={800}>Notifications</Typography>
            <Button size="small" onClick={markAllRead} sx={{ textTransform: "none", borderRadius: 2 }}>Mark all read</Button>
          </Box>
          <Divider sx={{ borderColor: "var(--border)" }} />
          <Box sx={{ maxHeight: 360, overflowY: "auto" }}>
            {notifications.length === 0 ? (
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>No notifications</Typography>
              </Box>
            ) : (
              notifications.map((n: any) => (
                <Box key={n.id} sx={{ px: 2, py: 1.5, display: "flex", gap: 1.5, alignItems: "flex-start", bgcolor: n.read ? "transparent" : "rgba(34,197,94,0.06)" }}>
                  <Avatar sx={{ width: 28, height: 28, bgcolor: "rgba(99,102,241,0.2)", color: "primary.main" }}>
                    <Bell size={14} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={700} sx={{ color: "var(--foreground)" }}>{n.title || 'Notification'}</Typography>
                    <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>{n.message || ''}</Typography>
                    <Typography variant="caption" sx={{ color: "var(--muted-foreground)", display: "block", mt: 0.5 }}>
                      {n.createdAt?.toDate ? n.createdAt.toDate().toLocaleString() : new Date(n.createdAt || Date.now()).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Menu>

        <Divider orientation="vertical" flexItem sx={{ height: 24, alignSelf: "center", borderColor: "var(--border)", mx: 1 }} />

        <Button
          onClick={handleClick}
          sx={{
            p: 0.5,
            pr: 1.5,
            borderRadius: 3,
            textTransform: "none",
            color: "var(--foreground)",
            bgcolor: open ? "rgba(255,255,255,0.05)" : "transparent",
            "&:hover": { bgcolor: "rgba(255,255,255,0.05)" }
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#ef4444",
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 700,
                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)"
              }}
            >
              <ShieldCheck size={18} />
            </Avatar>
            <Box textAlign="left" sx={{ display: { xs: "none", md: "block" } }}>
              <Typography variant="body2" fontWeight="700" sx={{ lineHeight: 1.2 }}>
                Admin Portal
              </Typography>
              <Typography variant="caption" sx={{ color: "var(--muted-foreground)", fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Full Authority
              </Typography>
            </Box>
            <ChevronDown size={14} color="var(--muted-foreground)" />
          </Stack>
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 220,
              bgcolor: "var(--card)",
              border: "1px solid",
              borderColor: "var(--border)",
              borderRadius: 3,
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
              backgroundImage: "none",
              color: "var(--foreground)"
            }
          }}
        >
          <Box px={2} py={1.5}>
            <Typography variant="subtitle2" fontWeight="700">Administrator</Typography>
            <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>{currentUser?.email}</Typography>
          </Box>
          <Divider sx={{ borderColor: "var(--border)" }} />
          <MenuItem onClick={handleClose} sx={{ py: 1.2 }}>
            <ListItemIcon><User size={18} color="var(--muted-foreground)" /></ListItemIcon>
            <ListItemText primary={<Typography variant="body2" fontWeight={500}>System Settings</Typography>} />
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ py: 1.2 }}>
            <ListItemIcon><Settings size={18} color="var(--muted-foreground)" /></ListItemIcon>
            <ListItemText primary={<Typography variant="body2" fontWeight={500}>Security Logs</Typography>} />
          </MenuItem>
          <Divider sx={{ borderColor: "var(--border)" }} />
          <MenuItem onClick={() => { handleClose(); logout(); }} sx={{ py: 1.2, color: "#ef4444" }}>
            <ListItemIcon><LogOut size={18} color="#ef4444" /></ListItemIcon>
            <ListItemText primary={<Typography variant="body2" fontWeight={700}>Sign Out</Typography>} />
          </MenuItem>
        </Menu>
      </Stack>
    </Box>
  );
}

