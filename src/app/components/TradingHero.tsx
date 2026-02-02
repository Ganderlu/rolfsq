import * as React from "react";
import { Box, Container, Typography, Button } from "@mui/material";

export default function TradingHero() {
  return (
    <Box
      sx={{
        minHeight: { xs: "auto", md: "420px" },
        display: "flex",
        backgroundImage: "url('/images/julios.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        alignItems: "stretch",
        bgcolor: "var(--background)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "var(--background)",
          opacity: 0.85,
        }}
      />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" },
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* LEFT CONTENT */}
        <Box
          sx={{
            px: { xs: 3, md: 10 },
            py: { xs: 6, md: 8 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "var(--foreground)",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "36px", md: "56px" },
              fontWeight: 800,
              lineHeight: 1.1,
              mb: 3,
            }}
          >
            START TRADING
            <br />
            WITH US TODAY
          </Typography>

          <Typography
            sx={{
              maxWidth: 520,
              fontSize: { xs: "15px", md: "18px" },
              lineHeight: 1.7,
              opacity: 0.95,
              mb: 4,
              color: "var(--muted-foreground)",
            }}
          >
            Ready to take your trading to the next level? Sign up with us and
            unlock your potential with our world-class brokerage and prop
            trading services.
          </Typography>

          <Button
            variant="contained"
            sx={{
              bgcolor: "var(--primary)",
              color: "var(--primary-foreground)",
              width: "fit-content",
              px: 4,
              py: 1.4,
              borderRadius: 1,
              fontWeight: 700,
              fontSize: "15px",
              "&:hover": { bgcolor: "var(--primary)", opacity: 0.9 },
            }}
          >
            JOIN US TODAY
          </Button>
        </Box>

        {/* RIGHT IMAGE */}
        {/* <Box
          sx={{
            display: { xs: "none", md: "block" },
            backgroundImage:
              "url('/images/julios.webp')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            // filter: "grayscale(100%) contrast(1.1)",
          }}
        /> */}
      </Container>
    </Box>
  );
}
