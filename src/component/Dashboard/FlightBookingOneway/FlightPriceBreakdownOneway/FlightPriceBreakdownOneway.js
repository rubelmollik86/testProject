import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import commaNumber from "comma-number";
import secureLocalStorage from "react-secure-storage";
import fakeData from "../FlightInformationOneWayData/fakeData";

const FlightPriceBreakdownOneway = ({ flightData2 }) => {
  const flightData = flightData2;
  const totalFare = flightData?.customerPrice || flightData?.clientPrice;

  //  Adult price calculate
  const adultData = flightData?.pricebreakdown?.filter((data) => {
    return data?.PaxType === "ADT";
  });
  const adultInfo = adultData[0];

  const adultBaseFare =
    parseInt(adultInfo?.PaxCount || 0) * parseInt(adultInfo?.BaseFare || 0);

  const adultTotalTax =
    parseInt(adultInfo?.PaxCount || 0) * parseInt(adultInfo?.Tax || 0);

  //  child price calculate
  const childData = flightData?.pricebreakdown?.filter((data) => {
    return data?.PaxType === "CNN";
  });
  const childInfo = childData[0];

  const childBaseFare =
    parseInt(childInfo?.PaxCount || 0) * parseInt(childInfo?.BaseFare || 0);

  const childTotalTax =
    parseInt(childInfo?.PaxCount || 0) * parseInt(childInfo?.Tax || 0);

  //  Infant price calculate
  const infantData = flightData?.pricebreakdown?.filter((data) => {
    return data?.PaxType === "INF";
  });
  const infantInfo = infantData[0];

  const infantBaseFare =
    parseInt(infantInfo?.PaxCount || 0) * parseInt(infantInfo?.BaseFare || 0);

  const infantTotalTax =
    parseInt(infantInfo?.PaxCount || 0) * parseInt(infantInfo?.Tax || 0);

  const totalPax =
    parseInt(adultInfo?.PaxCount || 0) +
    parseInt(childInfo?.PaxCount || 0) +
    parseInt(infantInfo?.PaxCount || 0);

  const totalServiceFee =
    parseInt(adultInfo?.ServiceFee || 0) +
    parseInt(childInfo?.ServiceFee || 0) +
    parseInt(infantInfo?.ServiceFee || 0);

  const OtherCharges =
    parseInt(adultInfo?.OtherCharges || 0) +
    parseInt(childInfo?.OtherCharges || 0) +
    parseInt(infantInfo?.OtherCharges || 0);

  return (
    <Box>
      {/*  //TODO:price break down start here */}
      <Box>
        <Box>
          <Typography
            style={{
              color: "var(--black)",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Total Payable
          </Typography>
          <Typography
            style={{
              color: "var(--black)",
              fontSize: "22px",
              fontWeight: "500",
            }}
          >
            BDT {commaNumber(totalFare)}
          </Typography>
        </Box>

        {adultData.length !== 0 && (
          <Box>
            <Box>
              <Box
                style={{
                  background: "var(--secondary-color)",
                  padding: "2px 10px",
                  display: "flex",
                  alignItems: "center",
                  margin: "8px 0px",
                }}
              >
                <Typography
                  style={{
                    color: "#fff",

                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  Adult x{adultInfo?.PaxCount}
                </Typography>
              </Box>
              <Grid container justifyContent="space-between">
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "#222222",

                    fontWeight: "500",
                  }}
                >
                  Base Fare x{adultInfo?.PaxCount}
                </Typography>

                <Typography
                  style={{
                    fontSize: "12px",
                    color: "var(--secondary-color)",

                    fontWeight: "500",
                  }}
                >
                  {commaNumber(adultBaseFare)} ৳
                </Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "#222222",

                    fontWeight: "500",
                  }}
                >
                  Taxes
                </Typography>
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "var(--secondary-color)",

                    fontWeight: "500",
                  }}
                >
                  {commaNumber(adultTotalTax)} ৳
                </Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "#222222",

                    fontWeight: "500",
                  }}
                >
                  Service Fee
                </Typography>
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "var(--secondary-color)",

                    fontWeight: "500",
                  }}
                >
                  {adultInfo?.ServiceFee} ৳
                </Typography>
              </Grid>
            </Box>
          </Box>
        )}

        {childData.length !== 0 && (
          <Box>
            <Box>
              <Box
                style={{
                  background: "var(--secondary-color)",
                  padding: "2px 10px",
                  display: "flex",
                  alignItems: "center",
                  margin: "8px 0px",
                }}
              >
                <Typography
                  style={{
                    color: "#fff",

                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  Child x{childInfo?.PaxCount}
                </Typography>
              </Box>
              <Grid container justifyContent="space-between">
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "#222222",

                    fontWeight: "500",
                  }}
                >
                  Base Fare x{childInfo?.PaxCount}
                </Typography>

                <Typography
                  style={{
                    fontSize: "12px",
                    color: "var(--secondary-color)",

                    fontWeight: "500",
                  }}
                >
                  {commaNumber(childBaseFare)} ৳
                </Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "#222222",

                    fontWeight: "500",
                  }}
                >
                  Taxes
                </Typography>
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "var(--secondary-color)",

                    fontWeight: "500",
                  }}
                >
                  {commaNumber(childTotalTax)} ৳
                </Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "#222222",

                    fontWeight: "500",
                  }}
                >
                  Service Fee
                </Typography>
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "var(--secondary-color)",

                    fontWeight: "500",
                  }}
                >
                  {childInfo?.ServiceFee} ৳
                </Typography>
              </Grid>
            </Box>
          </Box>
        )}

        {infantData.length !== 0 && (
          <Box>
            <Box>
              <Box
                style={{
                  background: "var(--secondary-color)",
                  padding: "2px 10px",
                  display: "flex",
                  alignItems: "center",
                  margin: "8px 0px",
                }}
              >
                <Typography
                  style={{
                    color: "#fff",

                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  Infant x{infantInfo?.PaxCount}
                </Typography>
              </Box>
              <Grid container justifyContent="space-between">
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "#222222",

                    fontWeight: "500",
                  }}
                >
                  Base Fare x{infantInfo?.PaxCount}
                </Typography>

                <Typography
                  style={{
                    fontSize: "12px",
                    color: "var(--secondary-color)",

                    fontWeight: "500",
                  }}
                >
                  {commaNumber(infantBaseFare)} ৳
                </Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "#222222",

                    fontWeight: "500",
                  }}
                >
                  Taxes
                </Typography>
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "var(--secondary-color)",

                    fontWeight: "500",
                  }}
                >
                  {commaNumber(infantTotalTax)} ৳
                </Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "#222222",

                    fontWeight: "500",
                  }}
                >
                  Service Fee
                </Typography>
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "var(--secondary-color)",

                    fontWeight: "500",
                  }}
                >
                  {infantInfo?.ServiceFee} ৳
                </Typography>
              </Grid>
            </Box>
          </Box>
        )}

        <Box my={2} height="2px" bgcolor="#DEDEDE"></Box>

        <Grid container justifyContent="space-between">
          <Typography
            style={{
              fontSize: "12px",
              color: "#222222",

              fontWeight: "500",
            }}
          >
            Total PAX
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "var(--secondary-color)",

              fontWeight: "500",
            }}
          >
            {totalPax}&#128100;
          </Typography>
        </Grid>

        <Grid container justifyContent="space-between">
          <Typography
            style={{
              fontSize: "12px",
              color: "#222222",

              fontWeight: "500",
            }}
          >
            Total Base Fare
          </Typography>
          <Typography
            style={{
              fontSize: "12px",
              color: "var(--secondary-color)",

              fontWeight: "500",
            }}
          >
            {commaNumber(adultBaseFare + childBaseFare + infantBaseFare)} ৳
          </Typography>
        </Grid>

        <Grid container justifyContent="space-between">
          <Typography
            style={{
              fontSize: "12px",
              color: "#222222",

              fontWeight: "500",
            }}
          >
            Total TAX
          </Typography>
          <Typography
            style={{
              fontSize: "12px",
              color: "var(--secondary-color)",

              fontWeight: "500",
            }}
          >
            {commaNumber(adultTotalTax + childTotalTax + infantTotalTax)} ৳
          </Typography>
        </Grid>

        <Grid container justifyContent="space-between">
          <Typography
            style={{
              fontSize: "12px",
              color: "#222222",
              fontWeight: "500",
            }}
          >
            Total Service Fee
          </Typography>
          <Typography
            style={{
              fontSize: "12px",
              color: "var(--secondary-color)",

              fontWeight: "500",
            }}
          >
            {totalServiceFee} ৳
          </Typography>
        </Grid>

        <Grid container justifyContent="space-between">
          <Typography
            style={{
              fontSize: "12px",
              color: "#222222",
              fontWeight: "500",
            }}
          >
            Others
          </Typography>
          <Typography
            style={{
              fontSize: "12px",
              color: "var(--secondary-color)",
              fontWeight: "500",
            }}
          >
            {OtherCharges} ৳
          </Typography>
        </Grid>

        <Box className="eticket-hr-line"></Box>

        {/* {couponAppliedMessage.status === "success" && (
          <Grid container justifyContent="space-between">
            <Typography
              style={{
                fontSize: "12px",
                color: "#222222",

                fontWeight: "500",
              }}
            >
              Coupon
            </Typography>
            <Typography
              style={{
                fontSize: "12px",
                color: "var(--secondary-color)",

                fontWeight: "500",
              }}
            >
              {commaNumber(-100)} ৳
            </Typography>
          </Grid>
        )} */}

        <Grid container justifyContent="space-between">
          <Typography
            style={{
              fontSize: "14px",
              color: "#222222",
              fontWeight: "500",
            }}
          >
            Customer Total
          </Typography>
          <Typography
            style={{
              fontSize: "14px",
              color: "var(--secondary-color)",

              fontWeight: "500",
            }}
          >
            BDT {commaNumber(totalFare)} ৳
          </Typography>
        </Grid>
      </Box>
    </Box>
  );
};

export default FlightPriceBreakdownOneway;
