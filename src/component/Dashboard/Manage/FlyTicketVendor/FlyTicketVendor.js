import { Box, Grid, Input, InputBase, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

import "./FlyTicketVendor.css";
const FlyTicketVendor = () => {
  return (
    <Box mt={"20px"}>
      <Container maxWidth="xxl">
        <Box className="ticketVendor-parent">
          <h3>Fly Ticket Vendor</h3>

          <Box>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3}>
                <Box className="ticketVendor">
                  <select>
                    <option>Choose Source</option>
                    <option value="ADT">Severe</option>
                    <option value="CHI">Galileo</option>
                    <option value="INF">FlyHub</option>
                  </select>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box className="ticketVendor">
                  <input type="text" placeholder="Enter PNR" name="pnr"></input>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box className="ticketVendor">
                  <input type="text" placeholder="Code" name="code"></input>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box className="ticketVendorbtn">
            <button>Import</button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FlyTicketVendor;
