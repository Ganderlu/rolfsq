"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <Box
      sx={{
        minHeight: "90vh",
        backgroundImage:
          "linear-gradient(to right, var(--background) 0%, color-mix(in srgb, var(--background), transparent 20%) 100%), url('/images/fforex.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "var(--foreground)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decor */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--primary) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(50px)",
          opacity: 0.2,
        }}
      />

      <Container maxWidth="xl">
        <Stack
          spacing={8}
          maxWidth={800}
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Stack spacing={4}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: 10,
                bgcolor: "rgba(37, 99, 235, 0.1)", // Primary with opacity
                border: "1px solid",
                borderColor: "var(--primary)",
                width: "fit-content",
              }}
            >
              <ShieldCheck size={16} className="text-primary" />
              <Typography
                variant="caption"
                sx={{ color: "var(--primary)", fontWeight: 600 }}
              >
                {t("hero.badge")}
              </Typography>
            </Box>

            <Typography
              variant="h1"
              fontWeight={800}
              sx={{
                fontSize: { xs: "2.5rem", md: "4.5rem" },
                lineHeight: 1.1,
                color: "var(--foreground)",
              }}
            >
              {t("hero.title")}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "var(--muted-foreground)",
                maxWidth: 600,
                fontSize: { xs: "1rem", md: "1.25rem" },
                lineHeight: 1.6,
              }}
            >
              {t("hero.subtitle")}
            </Typography>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              size="large"
              variant="contained"
              endIcon={<ArrowRight size={20} />}
              sx={{
                bgcolor: "#3b82f6",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: 2,
                textTransform: "none",
                "&:hover": { bgcolor: "#2563eb" },
              }}
              onClick={() => router.push("/register")}
            >
              {t("hero.primaryCta")}
            </Button>
            <Button
              size="large"
              variant="outlined"
              startIcon={<TrendingUp size={20} />}
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.2)",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: 2,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#fff",
                  bgcolor: "rgba(255,255,255,0.05)",
                },
              }}
              onClick={() => router.push("/login")}
            >
              {t("hero.secondaryCta")}
            </Button>
          </Stack>

          {/* Stats */}
          <Stack
            direction="row"
            spacing={{ xs: 4, md: 8 }}
            divider={
              <Box
                sx={{
                  width: "1px",
                  height: 40,
                  bgcolor: "rgba(255,255,255,0.1)",
                }}
              />
            }
          >
            <Box>
              <Typography variant="h4" fontWeight={700} color="#fff">
                $50M+
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.5)">
                {t("hero.stat.assets")}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight={700} color="#fff">
                25k+
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.5)">
                {t("hero.stat.investors")}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight={700} color="#fff">
                120+
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.5)">
                {t("hero.stat.countries")}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
