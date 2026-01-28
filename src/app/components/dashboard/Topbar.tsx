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
        bgcolor: "#0f172a",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton
          onClick={onMenuClick}
          sx={{ display: { md: "none" }, color: "#94a3b8" }}
        >
          <MenuIcon />
        </IconButton>

        {/* Only show welcome on desktop to save space */}
        <Typography
          variant="h6"
          fontWeight={600}
          color="#f1f5f9"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Welcome Back!
        </Typography>
      </Stack>

      <Stack direction="row" spacing={3} alignItems="center">
        <Stack direction="row" spacing={1}>
          <IconButton
            size="small"
            sx={{
              color: "#94a3b8",
              "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.05)" },
            }}
          >
            <Search size={20} />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: "#94a3b8",
              "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.05)" },
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
            borderLeft: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Box textAlign="right" sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography variant="body2" fontWeight={600} color="#f1f5f9">
              {currentUser?.email?.split("@")[0] || "User"}
            </Typography>
            <Typography variant="caption" color="#94a3b8">
              Investor
            </Typography>
          </Box>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: "primary.main",
              fontSize: 16,
              border: "2px solid rgba(255,255,255,0.1)",
            }}
          >
            {currentUser?.email?.[0].toUpperCase() || "U"}
          </Avatar>
        </Box>
      </Stack>
    </Box>
  );
}
