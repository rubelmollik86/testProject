import { Grid, Typography, Box, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { AiFillCaretDown } from "react-icons/ai";
import commaNumber from "comma-number";
import secureLocalStorage from "react-secure-storage";
import "./FlightInfoDetails.css";
import { useEffect, useState } from "react";

const FlightInfoDetails = ({
  loadData,
  searchData,
  adultCount,
  childCount,
  infant,
  adultPrice,
  childPrice,
  infPrice,
  adultTaxPrice,
  childTaxPrice,
  infTaxPrice,
  totalBaseFare,
  inTotalBaseFare,
  totalTax,
  totalFare,
  clientFare,
  serviceFeeAdult,
  serviceFeeChild,
  serviceFeeInfant,
  agentTotal,
  discount,
  coupon,
  setCoupon,
  couponAppliedMessage,
  setCouponAppliedMessage,
  adultBaggage,
  setAdultBaggage,
  childBaggage,
  setChildBaggage,
  infantBaggage,
  setInfantBaggage,
}) => {
  const users = secureLocalStorage.getItem("user-info");
  const agentId = users?.user?.agentId;

  const submitCoupon = (e) => {
    e.preventDefault();
    let url = "https://api.flyfarint.com/v.1.0.0/Coupon/check.php";
    let body = JSON.stringify({
      agentId,
      coupon,
    });
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCouponAppliedMessage(data);
        } else {
          setCouponAppliedMessage(data);
          // setTimeout(() => {
          //   setCouponAppliedMessage({});
          // }, 10000);
        }
      });
    // e.target.reset();
  };
  useEffect(() => {
    if (searchData?.flightData?.system === "FlyHub") {
      const [adultBag = "", childBag = "", infantBag = ""] =
        loadData?.Results[0]?.segments[0]?.baggageDetails;
      setAdultBaggage(adultBag.Checkin);
      setChildBaggage(childBag.Checkin || "");
      setInfantBaggage(infantBag.Checkin || "");
    }
    const baggagefunction = () => {
      if (searchData?.flightData?.system === "Sabre") {
        if (adultCount > 0 && childCount > 0 && infant > 0) {
          const adultBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[0]?.passengerInfo
              .baggageInformation[0]?.allowance?.ref || 0;
          const adultBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              adultBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              adultBagRef - 1
            ]?.pieceCount;
          setAdultBaggage(adultBag);

          const childBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[1]?.passengerInfo
              ?.baggageInformation[0]?.allowance.ref || 0;

          const childBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              childBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              childBagRef - 1
            ]?.pieceCount ||
            0;
          setChildBaggage(childBag);

          const infantBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[2]?.passengerInfo
              ?.baggageInformation[0]?.allowance?.ref || 0;

          const infantBag =
            loadData?.groupedItineraryResponse?.baggageAllowanceDescs[
              infantBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              infantBagRef - 1
            ]?.pieceCount;
          setInfantBaggage(infantBag);
        } else if (adultCount > 0 && childCount > 0) {
          const adultBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[0]?.passengerInfo
              .baggageInformation[0]?.allowance?.ref || 0;
          const adultBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              adultBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              adultBagRef - 1
            ]?.pieceCount;
          setAdultBaggage(adultBag);

          const childBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[1]?.passengerInfo
              ?.baggageInformation[0]?.allowance.ref || 0;

          const childBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              childBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              childBagRef - 1
            ]?.pieceCount ||
            0;
          setChildBaggage(childBag);
        } else if (adultCount > 0 && infant > 0) {
          const adultBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[0]?.passengerInfo
              .baggageInformation[0]?.allowance?.ref || 0;
          const adultBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              adultBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              adultBagRef - 1
            ]?.pieceCount;
          setAdultBaggage(adultBag);

          const infantBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[1]?.passengerInfo
              ?.baggageInformation[0]?.allowance?.ref || 0;

          const infantBag =
            loadData?.groupedItineraryResponse?.baggageAllowanceDescs[
              infantBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              infantBagRef - 1
            ]?.pieceCount;
          setInfantBaggage(infantBag);
        } else {
          const adultBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[0]?.passengerInfo
              .baggageInformation[0]?.allowance?.ref || 0;
          const adultBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              adultBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              adultBagRef - 1
            ]?.pieceCount;
          setAdultBaggage(adultBag);
        }
      }
    };
    baggagefunction();
  }, []);
  return (
    <Box>
      <Accordion defaultExpanded={true} className="flight-accordian1">
        <AccordionSummary
          expandIcon={<AiFillCaretDown color="var(--primary-color)" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container justifyContent={"space-between"}>
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontSize: "16px",
                fontWeight: 600,
                width: "100%",
              }}
            >
              Price Break Down
              <Box className="eticket-title-line"></Box>
            </Typography>
          </Grid>
        </AccordionSummary>
        <AccordionDetails className="flight-accordian2">
          {adultCount >= 1 && childCount >= 1 && infant >= 1 ? (
            <Box>
              <Box>
                <Typography
                  sx={{
                    color: "#DC143C",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  Adult x{adultCount}
                </Typography>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Base
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {commaNumber(adultPrice)}৳
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Taxes
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {commaNumber(adultTaxPrice)}৳
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Service Fee
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {serviceFeeAdult}৳
                  </Typography>
                </Grid>
              </Box>
              <Box className="eticket-hr-line"></Box>

              <Box>
                <Typography
                  sx={{
                    color: "#DC143C",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  Child x{childCount}
                </Typography>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Base
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {commaNumber(childPrice)}৳
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Taxes
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {commaNumber(childTaxPrice)}৳
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Service Fee
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {serviceFeeChild}৳
                  </Typography>
                </Grid>
              </Box>
              <Box className="eticket-hr-line"></Box>

              <Box>
                <Typography
                  sx={{
                    color: "#DC143C",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  Infant x{infant}
                </Typography>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Base
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {commaNumber(infPrice)}৳
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Taxes
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {commaNumber(infTaxPrice)}৳
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Service Fee
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {serviceFeeInfant}৳
                  </Typography>
                </Grid>
              </Box>
            </Box>
          ) : adultCount >= 1 && childCount >= 1 ? (
            <Box>
              <Box>
                <Typography
                  sx={{
                    color: "#DC143C",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  Adult x{adultCount}
                </Typography>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Base
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {commaNumber(adultPrice)}৳
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Taxes
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {commaNumber(adultTaxPrice)}৳
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Service Fee
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {serviceFeeAdult}৳
                  </Typography>
                </Grid>
              </Box>
              <Box className="eticket-hr-line"></Box>
              <Box>
                <Typography
                  sx={{
                    color: "#DC143C",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  Child x{childCount}
                </Typography>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Base
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {commaNumber(childPrice)}৳
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Taxes
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {commaNumber(childTaxPrice)}৳
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Service Fee
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {serviceFeeChild}৳
                  </Typography>
                </Grid>
              </Box>
              <Box className="eticket-hr-line"></Box>
            </Box>
          ) : adultCount >= 1 && infant >= 1 ? (
            <Box>
              <Box>
                <Typography
                  sx={{
                    color: "#DC143C",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  Adult x{adultCount}
                </Typography>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Base
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {commaNumber(adultPrice)}৳
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Taxes
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {commaNumber(adultTaxPrice)}৳
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Service Fee
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {serviceFeeAdult}৳
                  </Typography>
                </Grid>
              </Box>
              <Box className="eticket-hr-line"></Box>
              <Box>
                <Typography
                  sx={{
                    color: "#DC143C",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  Infant x{infant}
                </Typography>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Base
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {commaNumber(infPrice)}৳
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Taxes
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {commaNumber(infTaxPrice)}৳
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Service Fee
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {serviceFeeInfant}৳
                  </Typography>
                </Grid>
              </Box>
              <Box className="eticket-hr-line"></Box>
            </Box>
          ) : (
            <Box>
              <Box>
                <Typography
                  sx={{
                    color: "#DC143C",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  Adult x{adultCount}
                </Typography>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Base
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {commaNumber(adultPrice)}৳
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Taxes
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {commaNumber(adultTaxPrice)}৳
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Service Fee
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {serviceFeeAdult}৳
                  </Typography>
                </Grid>
              </Box>
            </Box>
          )}
          {/* -------no cut */}
          <Box my={2} height="2px" bgcolor="#DEDEDE"></Box>
          <Grid container justifyContent="space-between">
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Total PAX
            </Typography>
            <Typography
              sx={{
                color: "#000",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              {adultCount + childCount + infant}&#128100;
            </Typography>
          </Grid>
          <Grid container justifyContent="space-between">
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Total Base Fare
            </Typography>
            <Typography
              sx={{
                color: "#000",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              {commaNumber(totalBaseFare)}৳
            </Typography>
          </Grid>
          <Grid container justifyContent="space-between">
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Total TAX
            </Typography>
            <Typography
              sx={{
                color: "#000",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              {commaNumber(totalTax)}৳
            </Typography>
          </Grid>

          {couponAppliedMessage.status === "success" && (
            <Grid container justifyContent="space-between">
              <Typography
                sx={{
                  color: "var(--primary-color)",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                Coupon
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                {commaNumber(-100)}৳
              </Typography>
            </Grid>
          )}
          <Grid container justifyContent="space-between">
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Agent Total
            </Typography>
            <Typography
              sx={{
                color: "#000",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              {couponAppliedMessage.status === "success"
                ? commaNumber(agentTotal - 100)
                : commaNumber(agentTotal)}
              ৳
            </Typography>
          </Grid>
          <Grid container justifyContent="space-between">
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Customer Total
            </Typography>
            <Typography
              sx={{
                color: "#000",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              {commaNumber(totalFare)}৳
            </Typography>
          </Grid>
          <Grid container justifyContent="space-between">
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Discount
            </Typography>
            <Typography
              sx={{
                color: "#000",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              {commaNumber(discount)}৳
            </Typography>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {/* //TODO: Baggage Policy */}
      <Accordion defaultExpanded={false} className="flight-accordian1">
        <AccordionSummary
          expandIcon={<AiFillCaretDown color="var(--primary-color)" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container justifyContent={"space-between"}>
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontSize: "16px",
                fontWeight: 600,
                width: "100%",
              }}
            >
              Baggage Policy
              <Box className="eticket-title-line"></Box>
            </Typography>
          </Grid>
        </AccordionSummary>
        <AccordionDetails className="flight-accordian2">
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#DC143C",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              {searchData?.flightData?.departure?.trim()} -{" "}
              {searchData?.flightData?.arrival?.trim()}
            </Typography>
          </Box>
          <Box>
            <Grid container justifyContent={"space-between"}>
              <Grid item>
                <Typography color="#000" fontSize="14px">
                  {adultCount > 0 && (
                    <>
                      Adult <br />
                    </>
                  )}

                  {childCount > 0 && (
                    <>
                      Child
                      <br />
                    </>
                  )}

                  {infant > 0 && (
                    <>
                      Infant <br />
                    </>
                  )}
                </Typography>
              </Grid>
              <Grid item>
                <Typography color="#000" fontSize="14px">
                  {searchData?.flightData?.system === "Sabre" ? (
                    <>
                      {adultBaggage === 0 && (
                        <>
                          "0Kg"
                          <br />
                        </>
                      )}
                      {childBaggage === 0 && (
                        <>
                          "0Kg"
                          <br />
                        </>
                      )}
                      {infantBaggage === 0 && "0Kg"}
                      {adultBaggage ? (
                        <>
                          {adultBaggage > 5 ? (
                            <>{adultBaggage || 0}Kg </>
                          ) : adultBaggage < 0 ? (
                            <>0 Kg</>
                          ) : (
                            <>{adultBaggage || 0}Piece </>
                          )}
                          <br />
                        </>
                      ) : (
                        <></>
                      )}{" "}
                      {childBaggage ? (
                        <>
                          {childBaggage > 5 ? (
                            <>{childBaggage || 0}Kg </>
                          ) : (
                            <>{childBaggage || 0}Piece </>
                          )}
                          <br />
                        </>
                      ) : (
                        <></>
                      )}{" "}
                      {infantBaggage ? (
                        <>
                          {infantBaggage > 5 ? (
                            <>{infantBaggage || 0}Kg </>
                          ) : (
                            <>{infantBaggage || 0}Piece </>
                          )}
                          <br />
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : searchData?.flightData?.system === "FlyHub" ? (
                    <>
                      <Typography color="#000" fontSize="14px">
                        {loadData?.Results[0].segments[0].Baggage === null && (
                          <>
                            {adultCount > 0 && (
                              <>
                                0Kg <br />{" "}
                              </>
                            )}
                            {childCount > 0 && (
                              <>
                                0Kg <br />{" "}
                              </>
                            )}
                            {infant > 0 && <>0Kg</>}
                          </>
                        )}
                        {loadData?.Results[0]?.segments[0]?.baggageDetails.map(
                          (bag) => (
                            <>
                              {bag?.Checkin || "0"} <br />
                            </>
                          )
                        )}
                      </Typography>
                    </>
                  ) : (
                    <></>
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion defaultExpanded={false} className="flight-accordian1">
        <AccordionSummary
          expandIcon={<AiFillCaretDown color="var(--primary-color)" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container justifyContent={"space-between"}>
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontSize: "16px",
                fontWeight: 600,
                width: "100%",
              }}
            >
              Baggage Policy
              <Box className="eticket-title-line"></Box>
            </Typography>
          </Grid>
        </AccordionSummary>
        <AccordionDetails className="flight-accordian2">
          <Box>
            <Grid container justifyContent={"space-between"}>
              <Grid item>
                <Typography color="#000" fontSize="14px">
                  {adultCount > 0 && (
                    <>
                      Adult <br />
                    </>
                  )}

                  {childCount > 0 && (
                    <>
                      Child
                      <br />
                    </>
                  )}

                  {infant > 0 && (
                    <>
                      Infant <br />
                    </>
                  )}
                </Typography>
              </Grid>
              <Grid item>
                <Typography color="#000" fontSize="14px">
                  {searchData?.flightData?.system === "Sabre" ? (
                    <>
                      {loadData?.groupedItineraryResponse?.baggageAllowanceDescs.map(
                        (bag) => (
                          <>
                            {bag?.weight !== undefined ? (
                              <>
                                {bag?.weight || "0"} {bag?.unit || "0"}
                                <br />
                              </>
                            ) : (
                              <>
                                {bag?.pieceCount || "0"} Piece
                                <br />
                              </>
                            )}
                          </>
                        )
                      )}
                    </>
                  ) : searchData?.flightData?.system === "FlyHub" ? (
                    <>
                      <Typography color="#000" fontSize="14px">
                        {loadData?.Results[0].segments[0].Baggage === null && (
                          <>
                            {adultCount > 0 && (
                              <>
                                0Kg <br />{" "}
                              </>
                            )}
                            {childCount > 0 && (
                              <>
                                0Kg <br />{" "}
                              </>
                            )}
                            {infant > 0 && <>0Kg</>}
                          </>
                        )}
                        {loadData?.Results[0]?.segments[0]?.baggageDetails.map(
                          (bag) => (
                            <>
                              {bag?.Checkin || "0"} <br />
                            </>
                          )
                        )}
                      </Typography>
                    </>
                  ) : (
                    <></>
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion> */}
      {/* //TODO: End Baggage Policy */}

      {/* //Todo: Cancellation Policy Section */}
      <Accordion defaultExpanded={false} className="flight-accordian1">
        <AccordionSummary
          expandIcon={<AiFillCaretDown color="var(--primary-color)" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container justifyContent={"space-between"}>
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontSize: "16px",
                fontWeight: 600,
                width: "100%",
              }}
            >
              Cancellation Policy
              <Box className="eticket-title-line"></Box>
            </Typography>
          </Grid>
        </AccordionSummary>
        <AccordionDetails className="flight-accordian2">
          <Typography>
            <ul className="eticket-list">
              System cannot retrieve cancelation policy. please contact with our
              reservation officer or policy can be reveal after booking.
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/* //Todo: End Cancellation Policy Section */}
    </Box>
  );
};

export default FlightInfoDetails;
