"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { submitContactForm } from "./actions";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactUsPage() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    try {
      await submitContactForm(formData);
      setStatus("success");
      // Reset form
      const form = document.getElementById("contact-form") as HTMLFormElement;
      form?.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <Box sx={{ bgcolor: "var(--background)", minHeight: "100vh" }}>
      <Navbar />

      {/* Page Header */}
      <Box
        sx={{
          pt: 15,
          pb: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: "var(--foreground)",
              mb: 2,
            }}
          >
            Contact Us!
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "var(--text-secondary)", maxWidth: "800px", mx: "auto" }}
          >
            Have questions? Our support team is available 24/7 to assist you.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <Grid container spacing={6}>
          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Card
                sx={{
                  bgcolor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <CardContent
                  sx={{ display: "flex", alignItems: "start", gap: 3, p: 3 }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: "rgba(16, 185, 129, 0.1)",
                      borderRadius: "12px",
                    }}
                  >
                    <Mail size={24} className="text-emerald-500" />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ color: "var(--foreground)", fontWeight: "bold" }}
                    >
                      Email Us
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 1 }}
                    >
                      For general inquiries and support.
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "var(--primary)", fontWeight: "medium" }}
                    >
                      support@rolfsq.com
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card
                sx={{
                  bgcolor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <CardContent
                  sx={{ display: "flex", alignItems: "start", gap: 3, p: 3 }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: "rgba(245, 158, 11, 0.1)",
                      borderRadius: "12px",
                    }}
                  >
                    <Phone size={24} className="text-amber-500" />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ color: "var(--foreground)", fontWeight: "bold" }}
                    >
                      Call Us
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 1 }}
                    >
                      Mon-Fri from 8am to 5pm.
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "var(--primary)", fontWeight: "medium" }}
                    >
                      +1 (555) 123-4567
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card
                sx={{
                  bgcolor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <CardContent
                  sx={{ display: "flex", alignItems: "start", gap: 3, p: 3 }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: "rgba(59, 130, 246, 0.1)",
                      borderRadius: "12px",
                    }}
                  >
                    <MapPin size={24} className="text-blue-500" />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ color: "var(--foreground)", fontWeight: "bold" }}
                    >
                      Visit Us
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 1 }}
                    >
                      Our global headquarters.
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "var(--primary)", fontWeight: "medium" }}
                    >
                      12 Financial District, Canary Wharf, London, UK
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card
              sx={{ bgcolor: "var(--card)", border: "1px solid var(--border)" }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{ mb: 3, fontWeight: "bold", color: "var(--foreground)" }}
                >
                  Send us a Message
                </Typography>

                {status === "success" && (
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Message sent successfully! We'll get back to you soon.
                  </Alert>
                )}
                {status === "error" && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    Failed to send message. Please try again.
                  </Alert>
                )}

                <form id="contact-form" action={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        name="name"
                        label="Your Name"
                        required
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            color: "var(--foreground)",
                          },
                          "& .MuiInputLabel-root": { color: "text.secondary" },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "var(--border)",
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        name="email"
                        type="email"
                        label="Email Address"
                        required
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            color: "var(--foreground)",
                          },
                          "& .MuiInputLabel-root": { color: "text.secondary" },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "var(--border)",
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        name="subject"
                        label="Subject"
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            color: "var(--foreground)",
                          },
                          "& .MuiInputLabel-root": { color: "text.secondary" },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "var(--border)",
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        name="message"
                        label="Message"
                        multiline
                        rows={4}
                        required
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            color: "var(--foreground)",
                          },
                          "& .MuiInputLabel-root": { color: "text.secondary" },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "var(--border)",
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={status === "loading"}
                        startIcon={
                          status === "loading" ? null : <Send size={18} />
                        }
                        sx={{
                          bgcolor: "var(--primary)",
                          color: "white",
                          py: 1.5,
                          fontWeight: "bold",
                          "&:hover": { bgcolor: "var(--primary-dark)" },
                        }}
                      >
                        {status === "loading" ? "Sending..." : "Send Message"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}
