import { InsertEmoticon } from "@mui/icons-material";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import commaNumber from "comma-number";
import React from "react";

const CommissionInvoice = ({
  flightData,
  clientFare,
  agentFare,
  commission,
}) => {
  const totalBaseFare = flightData.pricebreakdown.reduce(
    (cur, acc) => cur + parseInt(acc.BaseFare),
    0
  );
  // //console.log(totalBaseFare);
  const totalTax = flightData.pricebreakdown.reduce(
    (cur, acc) => cur + parseInt(acc.Tax),
    0
  );
  const ait = 0;
  const discount = 0;
  const others = 0;
  const totalFare = totalBaseFare + totalTax + ait + discount + others;
  return (
    <Box m={2}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow
              sx={{
                "th:not([scope='row'])": {
                  color: "var(--gray-text-color)",
                  background: "var(--white)",
                  boxShadow: "0px",
                },
              }}
            >
              <TableCell align="left">Customer Invoice</TableCell>
              <TableCell align="left">Agent Invoice</TableCell>
              <TableCell align="left">Profit Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& td, & th": {
                color: "var(--gray-text-color)",
                background: "var(--white)",
                boxShadow: "0px",
              },
            }}
          >
            <TableRow
              sx={{
                "&:nth-of-type(odd)": {
                  bgcolor: "var(--white)",
                },
                "&:last-child td, &:last-child th": { border: 0 },
                borderRadius: "0px",
              }}
            >
              <TableCell align="left">
                {commaNumber(parseInt(clientFare || 0))} &#2547;
              </TableCell>
              <TableCell align="left">
                {commaNumber(parseInt(agentFare || 0))} &#2547;
              </TableCell>
              <TableCell align="left">{parseInt(commission)} &#2547;</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CommissionInvoice;
