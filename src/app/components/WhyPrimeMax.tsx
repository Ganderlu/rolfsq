"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyPrimeMax() {
  const { t } = useLanguage();

  return (
    <Box py={{ xs: 6, md: 10 }}>
      <Container maxWidth="lg">
        {/* Heading */}
        <Typography
          variant="h4"
          align="center"
          fontWeight={500}
          maxWidth={900}
          mx="auto"
          mb={6}
        >
          {t("why.heading")}
        </Typography>

        {/* Cards */}
        <Grid container spacing={4}>
          {/* Left Card */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                height: "100%",
                bgcolor: "var(--card)",
                border: "1px solid",
                borderColor: "var(--border)",
                color: "var(--card-foreground)",
              }}
            >
              <CardMedia
                component="img"
                height="280"
                image="/images/opportunities.jpg"
                alt="Investment Opportunities"
              />

              <CardContent>
                <Typography variant="h5" fontWeight={600} mb={2}>
                  {t("why.investmentTitle")}
                </Typography>

                <Typography color="var(--muted-foreground)" mb={3}>
                  {t("why.investmentText")}
                </Typography>

                <Accordion
                  disableGutters
                  elevation={0}
                  sx={{
                    bgcolor: "transparent",
                    color: "var(--foreground)",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon sx={{ color: "var(--foreground)" }} />
                    }
                  >
                    {t("why.investmentAccordion1")}
                  </AccordionSummary>
                  <AccordionDetails />
                </Accordion>

                <Divider sx={{ borderColor: "var(--border)" }} />

                <Accordion
                  disableGutters
                  elevation={0}
                  sx={{
                    bgcolor: "transparent",
                    color: "var(--foreground)",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon sx={{ color: "var(--foreground)" }} />
                    }
                  >
                    {t("why.investmentAccordion2")}
                  </AccordionSummary>
                  <AccordionDetails />
                </Accordion>

                <Divider sx={{ borderColor: "var(--border)" }} />

                <Accordion
                  disableGutters
                  elevation={0}
                  sx={{
                    bgcolor: "transparent",
                    color: "var(--foreground)",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon sx={{ color: "var(--foreground)" }} />
                    }
                  >
                    {t("why.investmentAccordion3")}
                  </AccordionSummary>
                  <AccordionDetails />
                </Accordion>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Card */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                height: "100%",
                bgcolor: "var(--card)",
                border: "1px solid",
                borderColor: "var(--border)",
                color: "var(--card-foreground)",
              }}
            >
              <CardMedia
                component="img"
                height="280"
                image="/images/brokerage.jpg" // replace with your image
                alt="Brokerage"
              />

              <CardContent>
                <Typography variant="h5" fontWeight={600} mb={2}>
                  {t("why.brokerageTitle")}
                </Typography>

                <Typography color="var(--muted-foreground)" mb={3}>
                  {t("why.brokerageText")}
                </Typography>

                <Accordion
                  disableGutters
                  elevation={0}
                  sx={{
                    bgcolor: "transparent",
                    color: "var(--foreground)",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon sx={{ color: "var(--foreground)" }} />
                    }
                  >
                    {t("why.brokerageAccordion1")}
                  </AccordionSummary>
                  <AccordionDetails />
                </Accordion>

                <Divider sx={{ borderColor: "var(--border)" }} />

                <Accordion
                  disableGutters
                  elevation={0}
                  sx={{
                    bgcolor: "transparent",
                    color: "var(--foreground)",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon sx={{ color: "var(--foreground)" }} />
                    }
                  >
                    {t("why.brokerageAccordion2")}
                  </AccordionSummary>
                  <AccordionDetails />
                </Accordion>

                <Divider sx={{ borderColor: "var(--border)" }} />

                <Accordion
                  disableGutters
                  elevation={0}
                  sx={{
                    bgcolor: "transparent",
                    color: "var(--foreground)",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon sx={{ color: "var(--foreground)" }} />
                    }
                  >
                    {t("why.brokerageAccordion3")}
                  </AccordionSummary>
                  <AccordionDetails />
                </Accordion>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
