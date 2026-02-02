import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQSection() {
  const faqs = [
    "How do I create my account?",
    "How long does my deposit take before it can reflect on my Prime Max Capital Investments account dashboard?",
    "How many times can I make a deposit?",
    "How do I make a deposit?",
    "How many years has it been functional?",
    "How long does it take to process my withdrawal?",
  ];

  return (
    <Box sx={{ bgcolor: "var(--background)", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
            gap: 4,
          }}
        >
          {/* FAQ LIST */}
          <Paper sx={{ p: { xs: 2, md: 4 }, bgcolor: "var(--card)", color: "var(--card-foreground)", border: "1px solid", borderColor: "var(--border)" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 3 }}
            >
              Frequently Asked Questions
            </Typography>

            {faqs.map((q, index) => (
              <Accordion key={index} elevation={0} disableGutters sx={{ bgcolor: "transparent", color: "var(--foreground)", "&:before": { display: "none" } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "var(--foreground)" }} />}>
                  <Typography sx={{ fontWeight: 500 }}>{q}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: "var(--muted-foreground)" }}>
                    This answer will be provided by Prime Max Capital Investments.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>

          {/* HELP CARD */}
          <Paper
            sx={{
              bgcolor: "var(--primary)",
              color: "var(--primary-foreground)",
              p: { xs: 3, md: 4 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Need any help!
              </Typography>
              <Typography sx={{ opacity: 0.9, mb: 4 }}>
                Find answers to frequently asked questions about Prime Max Capital
              </Typography>
            </Box>

            <Button
              variant="contained"
              sx={{
                bgcolor: "var(--background)",
                color: "var(--foreground)",
                borderRadius: 999,
                py: 1.2,
                fontWeight: 600,
                "&:hover": { bgcolor: "var(--muted)" },
              }}
            >
              Contact Us
            </Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
