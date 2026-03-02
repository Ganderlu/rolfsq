"use client";

import { 
  Box, 
  Drawer, 
  List, 
  ListItemButton, 
  Typography, 
  Stack, 
  useTheme, 
  useMediaQuery, 
  Divider,
  Paper
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  TrendingUp, 
  Grid3X3, 
  Activity, 
  CreditCard, 
  ArrowUpRight, 
  Smartphone, 
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

const menu = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Statistics & Report", href: "/admin/statistics", icon: BarChart3 },
  { label: "Manage Users", href: "/admin/users", icon: Users },
  { label: "Investment Controls", href: "/admin/investment-controls", icon: ShieldCheck },
  { label: "Matrix Scheme", href: "/admin/matrix-scheme", icon: Grid3X3 },
  { label: "Trading", href: "/admin/trading", icon: Activity },
  { label: "Payment Processor", href: "/admin/deposits", icon: CreditCard },
  { label: "Withdrawals", href: "/admin/withdrawals", icon: ArrowUpRight },
  { label: "InstaPIN Recharges", href: "/admin/pin-recharges", icon: Smartphone },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function SidebarItem({ item, pathname, onClose }: any) {
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link href={item.href} style={{ textDecoration: "none" }} onClick={onClose}>
      <ListItemButton
        sx={{
          mx: 1.5,
          my: 0.5,
          borderRadius: 2.5,
          color: isActive ? "#ffffff" : "var(--muted-foreground)",
          bgcolor: isActive ? "primary.main" : "transparent",
          px: 2,
          py: 1.2,
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: isActive ? "0 4px 12px rgba(99, 102, 241, 0.3)" : "none",
          "&:hover": {
            bgcolor: isActive ? "primary.main" : "rgba(255, 255, 255, 0.04)",
            color: "#ffffff",
          },
        }}
      >
        <Icon size={18} style={{ marginRight: 12 }} strokeWidth={isActive ? 2.5 : 2} />
        <Typography variant="body2" fontWeight={isActive ? 700 : 500}>
          {item.label}
        </Typography>
      </ListItemButton>
    </Link>
  );
}

export default function Sidebar({ open, onClose }: any) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pathname = usePathname();

  const SidebarContent = (
    <Box
      width={260}
      bgcolor="var(--card)"
      color="var(--card-foreground)"
      height="100%"
      display="flex"
      flexDirection="column"
      sx={{ 
        borderRight: "1px solid", 
        borderColor: "var(--border)",
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0))"
      }}
    >
      <Box p={3} sx={{ mb: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box 
            sx={{ 
              width: 36, 
              height: 36, 
              borderRadius: 2, 
              bgcolor: "primary.main", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)"
            }}
          >
            <ShieldCheck size={20} color="#ffffff" strokeWidth={3} />
          </Box>
          <Typography
            variant="h5"
            fontWeight="900"
            sx={{
              color: "#ffffff",
              letterSpacing: -0.5,
              textTransform: "uppercase",
              fontSize: "1.25rem"
            }}
          >
            rolfsq Admin
          </Typography>
        </Stack>
      </Box>

      <Box flex={1} overflow="auto" py={1}>
        <List sx={{ px: 1 }}>
          {menu.map((item) => (
            <SidebarItem
              key={item.label}
              item={item}
              pathname={pathname}
              onClose={isMobile ? onClose : undefined}
            />
          ))}
        </List>
      </Box>

      <Box p={2} sx={{ mt: "auto" }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 1.5, 
            bgcolor: "rgba(255,255,255,0.03)", 
            borderRadius: 3, 
            border: "1px solid rgba(255,255,255,0.05)" 
          }}
        >
          <Link href="/logout" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 1.5,
                py: 1.2,
                borderRadius: 2,
                color: "#ef4444",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "rgba(239, 68, 68, 0.08)",
                },
              }}
            >
              <LogOut size={18} />
              <Typography variant="body2" fontWeight={700} sx={{ fontSize: "0.85rem" }}>
                Sign Out
              </Typography>
            </Box>
          </Link>
        </Paper>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { border: "none", bgcolor: "transparent" } }}
      >
        {SidebarContent}
      </Drawer>
    );
  }

  return (
    <Box
      width={260}
      sx={{
        display: { xs: "none", md: "block" },
        height: "100vh",
        position: "sticky",
        top: 0
      }}
    >
      {SidebarContent}
    </Box>
  );
}
