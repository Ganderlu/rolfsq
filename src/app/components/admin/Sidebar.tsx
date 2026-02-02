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
        bgcolor="background.paper"
        color="text.primary"
        display={{ xs: "none", md: "block" }}
        borderRight={1}
        borderColor="divider"
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
                color: "text.primary",
                "&:hover": { backgroundColor: "action.hover" },
              }}
            >
              {item.label}
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Mobile Drawer */}
      <Drawer open={open} onClose={onClose}>
        <Box width={260} bgcolor="background.paper" color="text.primary" height="100%">
          <List>
            {menu.map((item) => (
              <ListItemButton
                key={item.label}
                component={Link}
                href={item.href}
                onClick={onClose}
                sx={{
                  color: "text.primary",
                  "&:hover": { backgroundColor: "action.hover" },
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
