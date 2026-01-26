"use client";

import { Box, Button, Container, Stack, Typography, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Markets", href: "/markets" },
  { label: "Features", href: "/features" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      component="nav"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        bgcolor: "rgba(15, 23, 42, 0.9)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 80,
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
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
          </Link>

          {/* Desktop Nav */}
          <Stack
            direction="row"
            spacing={4}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  color="rgba(255,255,255,0.7)"
                  fontWeight={500}
                  sx={{
                    transition: "color 0.2s",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  {link.label}
                </Typography>
              </Link>
            ))}
          </Stack>

          {/* Auth Buttons */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Button
              variant="text"
              sx={{ color: "#fff" }}
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#3b82f6",
                "&:hover": { bgcolor: "#2563eb" },
              }}
              onClick={() => router.push("/register")}
            >
              Get Started
            </Button>
          </Stack>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{ display: { md: "none" }, color: "#fff" }}
            onClick={toggleDrawer}
          >
            {mobileOpen ? <X /> : <Menu />}
          </IconButton>
        </Box>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="top"
        open={mobileOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            bgcolor: "#0f172a",
            color: "#fff",
            top: "80px !important", // Below navbar
            boxShadow: "none",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      >
        <List sx={{ px: 2, pb: 4 }}>
          {navLinks.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push(link.href);
                  toggleDrawer();
                }}
                sx={{ borderRadius: 2, mb: 1 }}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
          <Stack spacing={2} mt={2}>
            <Button
              variant="outlined"
              color="inherit"
              fullWidth
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{ bgcolor: "#3b82f6" }}
              onClick={() => router.push("/register")}
            >
              Get Started
            </Button>
          </Stack>
        </List>
      </Drawer>
    </Box>
  );
}
