"use client";

import {
  Box,
  IconButton,
  Stack,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon, Bell, Search, Settings } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { currentUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Box
      sx={{
        height: 72,
        px: { xs: 3, md: 5 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "var(--background)",
        borderBottom: "1px solid",
        borderColor: "var(--border)",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton
          onClick={onMenuClick}
          sx={{ display: { md: "none" }, color: "var(--muted-foreground)" }}
        >
          <MenuIcon />
        </IconButton>

        {/* Only show welcome on desktop to save space */}
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{ display: { xs: "none", sm: "block" }, color: "var(--foreground)" }}
        >
          Welcome Back!
        </Typography>
      </Stack>

      <Stack direction="row" spacing={3} alignItems="center">
        <Stack direction="row" spacing={1}>
          <IconButton
            size="small"
            sx={{
              color: "var(--muted-foreground)",
              "&:hover": { color: "var(--foreground)", bgcolor: "var(--accent)" },
            }}
          >
            <Search size={20} />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: "var(--muted-foreground)",
              "&:hover": { color: "var(--foreground)", bgcolor: "var(--accent)" },
            }}
          >
            <Bell size={20} />
          </IconButton>
        </Stack>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            ml: 1,
            pl: 3,
            borderLeft: "1px solid",
            borderColor: "var(--border)",
          }}
        >
          <Box textAlign="right" sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography variant="body2" fontWeight={600} sx={{ color: "var(--foreground)" }}>
              {currentUser?.email?.split("@")[0] || "User"}
            </Typography>
            <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>
              Investor
            </Typography>
          </Box>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: "var(--primary)",
              color: "var(--primary-foreground)",
              fontSize: 16,
              border: "2px solid",
              borderColor: "var(--border)",
            }}
          >
            {currentUser?.email?.[0].toUpperCase() || "U"}
          </Avatar>
        </Box>
      </Stack>
    </Box>
  );
}
