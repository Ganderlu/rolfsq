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

export default function WhyPrimeMax() {
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
          Join 15,000+ Traders from across the globe. Prime Max Capital is your
          trusted partner in forex, gold, cannabis, and real estate markets.
        </Typography>

        {/* Cards */}
        <Grid container spacing={4}>
          {/* Left Card */}
          <Grid item xs={12} md={6}>
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
                  Investment Opportunities
                </Typography>

                <Typography color="var(--muted-foreground)" mb={3}>
                  Prime Max Capital leads in diverse investment opportunities,
                  offering investors the chance to explore forex, gold,
                  cannabis, and real estate markets with tailored funding
                  solutions. Our innovative approach ensures you maximize your
                  potential with competitive profit-sharing models and scalable
                  growth plans.
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
                    Funding evaluations
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
                    Competitions
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
                    Profit share & Scaling plan
                  </AccordionSummary>
                  <AccordionDetails />
                </Accordion>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Card */}
          <Grid item xs={12} md={6}>
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
                  Brokerage
                </Typography>

                <Typography color="var(--muted-foreground)" mb={3}>
                  We offer a comprehensive suite of brokerage services. Our
                  brokerage provides traders access to a wide range of financial
                  instruments, including forex, commodities, indices, and more.
                  With competitive spreads, advanced trading tools, and
                  lightning fast execution, we ensure that you have everything
                  you need to trade with confidence.
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
                    Forex
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
                    Commodities & Indices
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
                    Trading Platforms
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
