"use client";

import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function DepositLogs() {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Deposit Logs
      </Typography>

      {/* FILTERS */}
      <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
        <TextField placeholder="Trx ID" size="small" sx={{ minWidth: 200 }} />

        <TextField
          select
          size="small"
          defaultValue="PENDING"
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="PENDING">PENDING</MenuItem>
          <MenuItem value="SUCCESS">SUCCESS</MenuItem>
          <MenuItem value="FAILED">FAILED</MenuItem>
        </TextField>

        <TextField type="date" size="small" sx={{ minWidth: 180 }} />

        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            fontWeight: 600,
            px: 4,
            borderRadius: "20px",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          Search
        </Button>
      </Box>

      {/* TABLE */}
      <Box sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Initiated At",
                "Trx",
                "Gateway",
                "Amount",
                "Charge",
                "Conversion",
                "Payable Amount",
                "Net Credit",
                "Crypto Payment",
                "Wallet",
                "Status",
              ].map((head) => (
                <TableCell key={head} sx={{ color: "text.secondary" }}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell colSpan={11} align="center">
                No Data Found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
