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
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Header({ onMenu }: any) {
  const { currentUser, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          sx={{ 
            color: "var(--muted-foreground)", 
            bgcolor: "rgba(255,255,255,0.02)", 
            border: "1px solid",
            borderColor: "var(--border)",
            "&:hover": { color: "var(--foreground)", bgcolor: "rgba(255,255,255,0.05)" }
          }}
        >
          <Bell size={18} />
        </IconButton>

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

