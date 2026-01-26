"use client";

import { Box, Drawer, List, ListItemButton } from "@mui/material";
import Link from "next/link";

const menu = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Statistics & Report", href: "/admin/statistics" },
  { label: "Manage Users", href: "/admin/users" }, // 👈 USERS PAGE
  { label: "Investment Controls", href: "/admin/investment-controls" },
  { label: "Matrix Scheme", href: "/admin/matrix-scheme" },
  { label: "Trading", href: "/admin/trading" },
  { label: "Payment Processor", href: "/admin/deposits" },
  { label: "Withdrawals", href: "/admin/withdrawals" },
  { label: "Settings", href: "/admin/settings" },
];

export default function Sidebar({ open, onClose }: any) {
  return (
    <>
      <Box
        width={260}
        bgcolor="#0b0f1a"
        color="#fff"
        display={{ xs: "none", md: "block" }}
      >
        <Box p={3} fontWeight={700}>
          PRIME MAX CAPITAL
        </Box>

        <List>
          {menu.map((item) => (
            <ListItemButton
              key={item.label}
              component={Link}
              href={item.href}
              sx={{
                color: "#fff",
                "&:hover": { backgroundColor: "#1a1f2e" },
              }}
            >
              {item.label}
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Mobile Drawer */}
      <Drawer open={open} onClose={onClose}>
        <Box width={260} bgcolor="#0b0f1a" color="#fff" height="100%">
          <List>
            {menu.map((item) => (
              <ListItemButton
                key={item.label}
                component={Link}
                href={item.href}
                onClick={onClose}
                sx={{
                  color: "#fff",
                  "&:hover": { backgroundColor: "#1a1f2e" },
                }}
              >
                {item.label}
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
