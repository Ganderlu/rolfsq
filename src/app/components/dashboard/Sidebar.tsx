"use client";

import {
  Box,
  Stack,
  Typography,
  Drawer,
  useMediaQuery,
  useTheme,
  Collapse,
  Paper,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  TrendingUp,
  PieChart,
  Activity,
  Wallet,
  ArrowDownToLine,
  User,
  LogOut,
  Grid3X3,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";

interface NavItem {
  label: string;
  href?: string;
  icon: any;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Transactions", href: "/dashboard/transactions", icon: FileText },
  {
    label: "Matrix",
    icon: Grid3X3,
    children: [{ label: "Matrix Plans", href: "/dashboard/matrix/plans" }],
  },
  {
    label: "Investments",
    icon: TrendingUp,
    children: [
      { label: "Investment Plans", href: "/dashboard/investments/plans" },
      { label: "Funds", href: "/dashboard/investments/funds" },
      {
        label: "Profit Statistics",
        href: "/dashboard/investments/profit-statistics",
      },
    ],
  },
  {
    label: "Trades",
    icon: Activity,
    children: [
      { label: "Trade Now", href: "/dashboard/trades/trade" },
      { label: "Market Data", href: "/dashboard/trades/market-data" },
      { label: "Trade History", href: "/dashboard/trades/trade-history" },
    ],
  },
  {
    label: "Deposit",
    icon: Wallet,
    children: [
      { label: "Instant Deposit", href: "/dashboard/deposit/instant" },
      // { label: "Referral Commission", href: "/dashboard/referrals" },
    ],
  },
  {
    label: "Withdraw",
    icon: ArrowDownToLine,
    children: [
      { label: "Withdraw Funds", href: "/dashboard/withdraw/withdraw" },
      {
        label: "InstaPIN Recharge",
        href: "/dashboard/withdraw/instapin-recharge",
      },
    ],
  },
  { label: "Referrals", href: "/dashboard/referrals", icon: Users },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

function SidebarItem({
  item,
  pathname,
  onClose,
}: {
  item: NavItem;
  pathname: string;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const isActive = item.href ? pathname === item.href : false;
  const hasChildren = item.children && item.children.length > 0;
  const isChildActive =
    hasChildren && item.children?.some((child) => pathname === child.href);

  // Auto-expand if child is active
  if (isChildActive && !open) {
    setOpen(true);
  }

  const Icon = item.icon;

  if (hasChildren) {
    return (
      <Box>
        <Box
          onClick={() => setOpen(!open)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.2,
            borderRadius: 2.5,
            color: isChildActive ? "#ffffff" : "var(--muted-foreground)",
            bgcolor: isChildActive ? "rgba(99, 102, 241, 0.08)" : "transparent",
            cursor: "pointer",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.04)",
              color: "#ffffff",
            },
          }}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <Icon size={18} strokeWidth={isActive || isChildActive ? 2.5 : 2} />
            <Typography variant="body2" fontWeight={isChildActive ? 700 : 500}>
              {item.label}
            </Typography>
          </Box>
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </Box>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Stack
            spacing={0.5}
            mt={0.5}
            sx={{
              borderLeft: "1px solid rgba(255,255,255,0.05)",
              ml: 2.5,
              pl: 1,
            }}
          >
            {item.children?.map((child) => {
              const isChildItemActive = pathname === child.href;
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  style={{ textDecoration: "none" }}
                  onClick={onClose}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      color: isChildItemActive
                        ? "primary.main"
                        : "var(--muted-foreground)",
                      bgcolor: isChildItemActive
                        ? "rgba(99, 102, 241, 0.08)"
                        : "transparent",
                      transition: "all 0.2s",
                      position: "relative",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.04)",
                        color: "#ffffff",
                      },
                    }}
                  >
                    {isChildItemActive && (
                      <Box
                        sx={{
                          position: "absolute",
                          left: -9,
                          width: 3,
                          height: 16,
                          borderRadius: 1,
                          bgcolor: "primary.main",
                        }}
                      />
                    )}
                    <Typography
                      variant="body2"
                      fontWeight={isChildItemActive ? 700 : 500}
                      sx={{ fontSize: "0.825rem" }}
                    >
                      {child.label}
                    </Typography>
                  </Box>
                </Link>
              );
            })}
          </Stack>
        </Collapse>
      </Box>
    );
  }

  return (
    <Link
      href={item.href!}
      style={{ textDecoration: "none" }}
      onClick={onClose}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 2,
          py: 1.2,
          borderRadius: 2.5,
          color: isActive ? "#ffffff" : "var(--muted-foreground)",
          bgcolor: isActive ? "primary.main" : "transparent",
          boxShadow: isActive ? "0 4px 12px rgba(99, 102, 241, 0.3)" : "none",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            bgcolor: isActive ? "primary.main" : "rgba(255, 255, 255, 0.04)",
            color: "#ffffff",
          },
        }}
      >
        <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
        <Typography variant="body2" fontWeight={isActive ? 700 : 500}>
          {item.label}
        </Typography>
      </Box>
    </Link>
  );
}

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0))",
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
              boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)",
            }}
          >
            <Activity size={20} color="#ffffff" strokeWidth={3} />
          </Box>
          <Typography
            variant="h5"
            fontWeight="900"
            sx={{
              color: "#ffffff",
              letterSpacing: -0.5,
              textTransform: "uppercase",
              fontSize: "1.25rem",
            }}
          >
            rolfsq
          </Typography>
        </Stack>
      </Box>

      <Box flex={1} overflow="auto" py={1}>
        <Stack spacing={0.8} px={2}>
          {navItems.map((item, index) => (
            <SidebarItem
              key={index}
              item={item}
              pathname={pathname}
              onClose={isMobile ? onClose : undefined}
            />
          ))}
        </Stack>
      </Box>

      <Box p={2} sx={{ mt: "auto" }}>
        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            bgcolor: "rgba(255,255,255,0.03)",
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Stack spacing={1}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 1.5,
                py: 1,
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <ThemeToggle />
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ color: "#ffffff", fontSize: "0.8rem" }}
                >
                  Dark Mode
                </Typography>
              </Stack>
            </Box>

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
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{ fontSize: "0.85rem" }}
                >
                  Sign Out
                </Typography>
              </Box>
            </Link>
          </Stack>
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
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 260,
          boxSizing: "border-box",
          border: "none",
        },
      }}
    >
      {SidebarContent}
    </Drawer>
  );
}
