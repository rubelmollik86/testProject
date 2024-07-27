import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const FarePolicy = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box>
            <Box
              style={{
                width: "120px",
                background: "var(--transit-color)",
                padding: "5px 12px",
                borderRadius: "2px",
              }}
            >
              <Typography
                style={{
                  fontSize: "13px",
                  color: "var(--primary-color)",
                  textAlign: "center",
                  fontWeight: 500,
                }}
              >
                Cancellation
              </Typography>
            </Box>
            <Typography
              style={{
                fontSize: "13px",
                color: "var(--gray-text-color)",
                fontWeight: "500",
                marginTop: "12px",
              }}
            >
              Refund Amount = Paid Amount - Airline Cancellation Fee
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Box
              sx={{
                width: "120px",
                background: "var(--transit-color)",
                padding: "5px 12px",
                borderRadius: "2px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "var(--primary-color)",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                Re-Issue
              </Typography>
            </Box>
            <Typography
              style={{
                fontSize: "13px",
                color: "var(--gray-text-color)",

                fontWeight: "500",
                marginTop: "12px",
              }}
            >
              Re-issue Fee = Airline’s Fee + Fare Difference
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Box
              style={{
                width: "120px",
                background: "var(--transit-color)",
                padding: "5px 12px",
                borderRadius: "2px",
              }}
            >
              <Typography
                style={{
                  fontSize: "13px",
                  color: "var(--primary-color)",
                  textAlign: "center",
                  fontWeight: 500,
                }}
              >
                Refund
              </Typography>
            </Box>
            <Typography
              style={{
                fontSize: "13px",
                color: "var(--gray-text-color)",

                fontWeight: "500",
                marginTop: "12px",
              }}
            >
              Refund Fee = Airline’s Fee + Fare Difference
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Box
              style={{
                width: "120px",
                background: "var(--transit-color)",
                padding: "5px 12px",
                borderRadius: "2px",
              }}
            >
              <Typography
                style={{
                  fontSize: "13px",
                  color: "var(--primary-color)",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                Void
              </Typography>
            </Box>
            <Typography
              style={{
                fontSize: "13px",
                color: "var(--gray-text-color)",

                fontWeight: "500",
                marginTop: "12px",
              }}
            >
              Void Fee = Airline’s Fee + Fare Difference
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FarePolicy;
