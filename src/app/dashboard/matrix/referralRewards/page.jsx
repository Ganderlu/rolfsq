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
    <Box sx={{ p: { xs: 2, md: 4 }, color: "white" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Referral Rewards
      </Typography>

      {/* Filters */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
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
            InputProps={{ sx: { color: "white" } }}
          />

          {/* <TextField
            select
            size="small"
            fullWidth={isMobile}
            defaultValue="PRIMARY"
          >
            <MenuItem value="PRIMARY">PRIMARY</MenuItem>
            <MenuItem value="DEMO">DEMO</MenuItem>
          </TextField> */}

          {/* <TextField
            select
            size="small"
            fullWidth={isMobile}
            defaultValue="ALL"
          >
            <MenuItem value="ALL">ALL</MenuItem>
            <MenuItem value="DEPOSIT">DEPOSIT</MenuItem>
            <MenuItem value="WITHDRAW">WITHDRAW</MenuItem>
          </TextField> */}

          <TextField type="date" size="small" fullWidth={isMobile} />

          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{
              background: "#ff8a00",
              px: 4,
              width: isMobile ? "100%" : "auto",
            }}
          >
            Search
          </Button>
        </Stack>
      </Paper>

      {/* Table */}
      <Paper
        sx={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
          overflowX: "auto",
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
                <TableCell key={head} sx={{ color: "white" }}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{ color: "gray" }}>
                No Data Found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
