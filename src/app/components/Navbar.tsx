"use client";

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "FAQs", href: "/faqs" },
  { label: "Our Licence", href: "/license" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        bgcolor: scrolled ? "var(--background)" : "transparent",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid",
        borderColor: scrolled ? "var(--border)" : "transparent",
        transition: "all 0.3s ease",
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
                  sx={{
                    color: "var(--muted-foreground)",
                    fontWeight: 500,
                    transition: "color 0.2s",
                    "&:hover": { color: "var(--foreground)" },
                  }}
                >
                  {link.label}
                </Typography>
              </Link>
            ))}
          </Stack>

          {/* Auth Buttons & Theme Toggle */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <ThemeToggle />
            <Button
              variant="text"
              sx={{ color: "var(--foreground)" }}
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
            sx={{ display: { md: "none" }, color: "var(--foreground)" }}
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
            bgcolor: "var(--background)",
            color: "var(--foreground)",
            top: "80px !important", // Below navbar
            boxShadow: "none",
            borderTop: "1px solid",
            borderColor: "var(--border)",
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
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <ThemeToggle />
            </Box>
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
