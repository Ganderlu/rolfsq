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
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";

function GoogleTranslateWidget() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const w = window as any;
    const elementId = "google_translate_element";

    // Clear previous widget content to avoid duplicates on route changes
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = "";
    }

    if (!w.googleTranslateElementInit) {
      w.googleTranslateElementInit = () => {
        if (
          !w.google ||
          !w.google.translate ||
          !w.google.translate.TranslateElement
        ) {
          return;
        }
        new w.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
          },
          elementId,
        );
      };
    }

    const scriptId = "google-translate-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (w.google && w.google.translate) {
      w.googleTranslateElementInit();
    }
  }, [pathname]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        // White square container from the image on mobile
        bgcolor: { xs: "#ffffff", md: "transparent" },
        border: { xs: "1px solid var(--border)", md: "none" },
        borderRadius: { xs: "6px", md: 0 },
        width: { xs: 34, md: "auto" },
        height: { xs: 34, md: "auto" },
        justifyContent: "center",
        overflow: "hidden",
        boxShadow: { xs: "0 2px 5px rgba(0,0,0,0.1)", md: "none" },
      }}
    >
      {/* Icon showing behind the hidden select element on mobile */}
      <Box
        component="img"
        src="https://www.gstatic.com/images/branding/product/1x/translate_24dp.png"
        sx={{
          width: { xs: 20, md: 0 }, // Only show icon on mobile
          height: { xs: 20, md: 0 },
          display: { xs: "block", md: "none" },
          pointerEvents: "none",
          position: "absolute",
          zIndex: 0,
        }}
      />

      <Box
        id="google_translate_element"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          "& .goog-te-gadget": {
            fontSize: 0,
            color: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          "& .goog-te-gadget span": {
            display: "none",
          },
          "& .goog-te-combo": {
            fontSize: 13,
            padding: { xs: "0", md: "6px 8px" },
            borderRadius: 4,
            borderColor: "var(--border)",
            color: "var(--foreground)",
            backgroundColor: { xs: "transparent", md: "var(--background)" },
            minWidth: { xs: 34, md: 180 },
            height: { xs: 34, md: "auto" },
            cursor: "pointer",
            outline: "none",
            border: { xs: "none", md: "1px solid var(--border)" },
            // Make it transparent on mobile so the icon shows through, but it's still clickable
            opacity: { xs: 0, md: 1 },
            position: { xs: "absolute", md: "static" },
            left: 0,
            top: 0,
            WebkitAppearance: "none",
            MozAppearance: "none",
            appearance: "none",
          },
        }}
      />
    </Box>
  );
}

const navLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/about-us" },
  { key: "services", href: "/services" },
  { key: "faqs", href: "/faqs" },
  { key: "license", href: "/license" },
  { key: "contact", href: "/contact-us" },
];

export default function Navbar() {
  const router = useRouter();
  const { t } = useLanguage();
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
              Rolfsq
            </Typography>
          </Link>

          <Stack
            direction="row"
            spacing={4}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.key}
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
                  {t(`nav.${link.key}`)}
                </Typography>
              </Link>
            ))}
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ display: "flex" }}
          >
            <GoogleTranslateWidget />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <ThemeToggle />
            </Box>
            <Button
              variant="text"
              sx={{
                color: "var(--foreground)",
                display: { xs: "none", md: "inline-flex" },
              }}
              onClick={() => router.push("/login")}
            >
              {t("nav.login")}
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#3b82f6",
                "&:hover": { bgcolor: "#2563eb" },
                display: { xs: "none", md: "inline-flex" },
              }}
              onClick={() => router.push("/register")}
            >
              {t("nav.getStarted")}
            </Button>
            <IconButton
              sx={{
                color: "var(--foreground)",
                display: { xs: "flex", md: "none" },
              }}
              onClick={toggleDrawer}
            >
              {mobileOpen ? <X /> : <Menu />}
            </IconButton>
          </Stack>
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
            <ListItem key={link.key} disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push(link.href);
                  toggleDrawer();
                }}
                sx={{ borderRadius: 2, mb: 1 }}
              >
                <ListItemText primary={t(`nav.${link.key}`)} />
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
              {t("nav.login")}
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{ bgcolor: "#3b82f6" }}
              onClick={() => router.push("/register")}
            >
              {t("nav.getStarted")}
            </Button>
          </Stack>
        </List>
      </Drawer>
    </Box>
  );
}
