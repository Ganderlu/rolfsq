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
    <Box sx={{ p: { xs: 2, md: 4 }, color: "text.primary" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Transactions
      </Typography>

      {/* Filters */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
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

          <TextField
            select
            size="small"
            fullWidth={isMobile}
            defaultValue="PRIMARY"
          >
            <MenuItem value="PRIMARY">PRIMARY</MenuItem>
            <MenuItem value="DEMO">DEMO</MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            fullWidth={isMobile}
            defaultValue="ALL"
          >
            <MenuItem value="ALL">ALL</MenuItem>
            <MenuItem value="DEPOSIT">DEPOSIT</MenuItem>
            <MenuItem value="WITHDRAW">WITHDRAW</MenuItem>
          </TextField>

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
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Initiated At",
                "Trx",
                "Amount",
                "Post Balance",
                "Charge",
                "Source",
                "Wallet",
                "Details",
              ].map((head) => (
                <TableCell key={head} sx={{ color: "text.secondary" }}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{ color: "text.secondary" }}>
                No Data Found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
