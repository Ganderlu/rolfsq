"use client";

import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function TransactionsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        color: "var(--foreground)",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Referral Deposit Commission Rewards
      </Typography>

      {/* Filters */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          bgcolor: "var(--card)",
          color: "var(--card-foreground)",
          border: "1px solid",
          borderColor: "var(--border)",
          borderRadius: 3,
        }}
      >
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          alignItems="center"
        >
          <TextField
            fullWidth
            placeholder="Trx ID"
            size="small"
          />

          <TextField type="date" size="small" fullWidth={isMobile} />

          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              px: 4,
              width: isMobile ? "100%" : "auto",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            Search
          </Button>
        </Stack>
      </Paper>

      {/* Table */}
      <Paper
        sx={{
          bgcolor: "var(--card)",
          color: "var(--card-foreground)",
          border: "1px solid",
          borderColor: "var(--border)",
          overflowX: "auto",
          borderRadius: 3,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
               "Initiated At",
                "Trx",
                "Users",
                "Amount",
                "Details",
              ].map((head) => (
                <TableCell
                  key={head}
                  sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={8}
                align="center"
                sx={{ color: "var(--muted-foreground)" }}
              >
                No Data Found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
