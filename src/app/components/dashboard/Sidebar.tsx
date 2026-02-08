"use client";

import {
  Box,
  Stack,
  Typography,
  Drawer,
  useMediaQuery,
  useTheme,
  Collapse,
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
    children: [
      { label: "Matrix Plans", href: "/dashboard/matrix/plans" },
      { label: "Referral Rewards", href: "/dashboard/matrix/referralRewards" },
      { label: "Commissions", href: "/dashboard/matrix/commissions" },
    ],
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
      { label: "Commissions", href: "/dashboard/deposit/commissions" },
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
            py: 1.5,
            borderRadius: 2,
            color: isChildActive
              ? "var(--foreground)"
              : "var(--muted-foreground)",
            bgcolor: isChildActive ? "var(--accent)" : "transparent",
            cursor: "pointer",
            transition: "all 0.2s",
            "&:hover": {
              bgcolor: "var(--accent)",
              color: "var(--foreground)",
            },
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Icon size={20} />
            <Typography variant="body2" fontWeight={500}>
              {item.label}
            </Typography>
          </Box>
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </Box>
        <Collapse in={open}>
          <Stack spacing={0.5} mt={0.5} pl={2}>
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
                      gap: 2,
                      px: 2,
                      py: 1.5,
                      borderRadius: 2,
                      color: isChildItemActive
                        ? "var(--primary-foreground)"
                        : "var(--muted-foreground)",
                      bgcolor: isChildItemActive
                        ? "var(--primary)"
                        : "transparent",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: isChildItemActive
                          ? "var(--primary)"
                          : "var(--accent)",
                        color: isChildItemActive
                          ? "var(--primary-foreground)"
                          : "var(--foreground)",
                      },
                    }}
                  >
                    <Box
                      width={6}
                      height={6}
                      borderRadius="50%"
                      bgcolor={
                        isChildItemActive
                          ? "currentColor"
                          : "var(--muted-foreground)"
                      }
                    />
                    <Typography variant="body2" fontWeight={500}>
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
          gap: 2,
          px: 2,
          py: 1.5,
          borderRadius: 2,
          color: isActive
            ? "var(--primary-foreground)"
            : "var(--muted-foreground)",
          bgcolor: isActive ? "var(--primary)" : "transparent",
          transition: "all 0.2s",
          "&:hover": {
            bgcolor: isActive ? "var(--primary)" : "var(--accent)",
            color: isActive ? "var(--primary-foreground)" : "var(--foreground)",
          },
        }}
      >
        <Icon size={20} />
        <Typography variant="body2" fontWeight={500}>
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
      width={240}
      bgcolor="var(--card)"
      color="var(--card-foreground)"
      height="100%"
      display="flex"
      flexDirection="column"
      sx={{ borderRight: "1px solid", borderColor: "var(--border)" }}
    >
      <Box p={3} borderBottom="1px solid" borderColor="var(--border)">
        <Typography
          variant="h5"
          fontWeight={800}
          letterSpacing={1}
          sx={{
            background: "linear-gradient(45deg, #3b82f6, #06b6d4)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          ROLFSQ
        </Typography>
      </Box>

      <Box flex={1} overflow="auto" py={2}>
        <Stack spacing={0.5} px={1}>
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

      <Box p={1} borderTop="1px solid" borderColor="var(--border)">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            px: 2,
            py: 1.5,
            mb: 0.5,
          }}
        >
          <ThemeToggle />
          <Typography variant="body2" fontWeight={500}>
            Theme
          </Typography>
        </Box>
        <Link href="/logout" style={{ textDecoration: "none" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 2,
              py: 1.5,
              borderRadius: 2,
              color: "var(--destructive)",
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": {
                bgcolor: "var(--accent)",
                color: "var(--destructive-foreground)",
              },
            }}
          >
            <LogOut size={20} />
            <Typography variant="body2" fontWeight={500}>
              Sign Out
            </Typography>
          </Box>
        </Link>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { border: "none" } }}
      >
        {SidebarContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          border: "none",
        },
      }}
    >
      {SidebarContent}
    </Drawer>
  );
}
