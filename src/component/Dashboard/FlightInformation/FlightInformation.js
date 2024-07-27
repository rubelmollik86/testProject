import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import commaNumber from "comma-number";
import Swal from "sweetalert2";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CircleIcon from "@mui/icons-material/Circle";
import seat1 from "../../../image/Icon/bag.svg";
import bag from "../../../image/Icon/seat.svg";
import anemy from "../../../image/anemy.png";
import FlightUserInfo from "./FlightUserInfo/FlightUserInfo";
import FlightUserInfoFlyHub from "./FlightUserInfo/FlightUserInfoFlyHub";
import FlightUserInfoSabre from "./FlightUserInfo/FlightUserInfoSabre";
import Loader from "../../../image/loader/Render.gif";
import FlightInfoDetails from "./FlightUserInfo/FlightInfoDetails";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import "./FlightInformation.css";
import WaitingPreloader from "../../Preloader/WaitingPreloader";

import NotFound from "../../../image/undraw/undraw_not_found_re_bh2e.svg";
import secureLocalStorage from "react-secure-storage";

const HtmlTooltip = styled(({ className, ...propss }) => (
  <Tooltip {...propss} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "var(--gray-text-color)",
    maxWidth: 220,
    fontSize: "5px",
    borderRadius: "8px 0px 8px 0px",
  },
}));

const FlightInformation = (props) => {
  const users = secureLocalStorage.getItem("user-info");
  let agentId = users?.user?.agentId;
  const location = useLocation();
  const [loadData, setLoadData] = useState([]);
  const { adultCount, childCount, infant } = location.state;
  const [isLoaded, setIsLoaded] = useState(true);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  //todo: cupon
  const [coupon, setCoupon] = useState("");
  const [couponAppliedMessage, setCouponAppliedMessage] = useState({});
  //todo:end cupon
  //todo: Baggage Information
  const [adultBaggage, setAdultBaggage] = useState(0);
  const [childBaggage, setChildBaggage] = useState(0);
  const [infantBaggage, setInfantBaggage] = useState(0);
  const [balance, setBalance] = useState({});
  //todo: End Baggage Information end

  useEffect(() => {
    const url = `https://api.flyfarint.com/v.1.0.0/Accounts/ClientLeadger.php?agentId=${agentId}&balance`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBalance(data[0]);
      });
    // const timer = setInterval(() => {
    setProgress((prevProgress) =>
      prevProgress >= 100 ? 0 : prevProgress + 10
    );
    // }, 800);

    // return () => {
    //   clearInterval(timer);
    // };
  }, []);

  let url;
  let body;
  if (location.state?.flightData?.system === "Sabre") {
    url = "https://api.flyfarint.com/v.1.0.0/Sabre/AirPrice.php";
    body = {
      adultCount: adultCount,
      childCount: childCount,
      infantCount: infant,
      segment: location.state.flightData.segment,
      tripType: location.state.tripType === "oneway" ? "1" : "2",
      segments:
        location.state?.flightData?.segment === "3"
          ? [
              {
                departure: location.state.flightData.segments[0].departure,
                arrival: location.state.flightData.segments[0].arrival,
                dpTime: location.state.flightData.segments[0].departureTime,
                arrTime: location.state.flightData.segments[0].arrivalTime,
                bCode: location.state.flightData.segments[0].bookingcode,
                mCarrier: location.state.flightData.segments[0].marketingcareer,
                mCarrierFN:
                  location.state.flightData.segments[0].marketingflight,
                oCarrier: location.state.flightData.segments[0].operatingcareer,
                oCarrierFN:
                  location.state.flightData.segments[0].operatingflight,
              },
              {
                departure: location.state.flightData.segments[1].departure,
                arrival: location.state.flightData.segments[1].arrival,
                dpTime: location.state.flightData.segments[1].departureTime,
                arrTime: location.state.flightData.segments[1].arrivalTime,
                bCode: location.state.flightData.segments[1].bookingcode,
                mCarrier: location.state.flightData.segments[1].marketingcareer,
                mCarrierFN:
                  location.state.flightData.segments[1].marketingflight,
                oCarrier: location.state.flightData.segments[1].operatingcareer,
                oCarrierFN:
                  location.state.flightData.segments[1].operatingflight,
              },
              {
                departure: location.state.flightData.segments[2].departure,
                arrival: location.state.flightData.segments[2].arrival,
                dpTime: location.state.flightData.segments[2].departureTime,
                arrTime: location.state.flightData.segments[2].arrivalTime,
                bCode: location.state.flightData.segments[2].bookingcode,
                mCarrier: location.state.flightData.segments[2].marketingcareer,
                mCarrierFN:
                  location.state.flightData.segments[2].marketingflight,
                oCarrier: location.state.flightData.segments[2].operatingcareer,
                oCarrierFN:
                  location.state.flightData.segments[2].operatingflight,
              },
            ]
          : location.state?.flightData?.segment === "2"
          ? [
              {
                departure: location.state.flightData.segments[0].departure,
                arrival: location.state.flightData.segments[0].arrival,
                dpTime: location.state.flightData.segments[0].departureTime,
                arrTime: location.state.flightData.segments[0].arrivalTime,
                bCode: location.state.flightData.segments[0].bookingcode,
                mCarrier: location.state.flightData.segments[0].marketingcareer,
                mCarrierFN:
                  location.state.flightData.segments[0].marketingflight,
                oCarrier: location.state.flightData.segments[0].operatingcareer,
                oCarrierFN:
                  location.state.flightData.segments[0].operatingflight,
              },
              {
                departure: location.state.flightData.segments[1].departure,
                arrival: location.state.flightData.segments[1].arrival,
                dpTime: location.state.flightData.segments[1].departureTime,
                arrTime: location.state.flightData.segments[1].arrivalTime,
                bCode: location.state.flightData.segments[1].bookingcode,
                mCarrier: location.state.flightData.segments[1].marketingcareer,
                mCarrierFN:
                  location.state.flightData.segments[1].marketingflight,
                oCarrier: location.state.flightData.segments[1].operatingcareer,
                oCarrierFN:
                  location.state.flightData.segments[1].operatingflight,
              },
            ]
          : [
              {
                departure: location.state.flightData.segments[0].departure,
                arrival: location.state.flightData.segments[0].arrival,
                dpTime: location.state.flightData.segments[0].departureTime,
                arrTime: location.state.flightData.segments[0].arrivalTime,
                bCode: location.state.flightData.segments[0].bookingcode,
                mCarrier: location.state.flightData.segments[0].marketingcareer,
                mCarrierFN:
                  location.state.flightData.segments[0].marketingflight,
                oCarrier: location.state.flightData.segments[0].operatingcareer,
                oCarrierFN:
                  location.state.flightData.segments[0].operatingflight,
              },
            ],
    };
  } else if (location.state?.flightData.system === "FlyHub") {
    url = "https://api.flyfarint.com/v.1.0.0/FlyHub/AirPrice.php";
    body = {
      SearchID: location.state?.flightData?.SearchID,
      ResultID: location.state?.flightData?.ResultID,
    };
  } else if (location.state?.flightData.system === "Galileo") {
    url = "https://api.flyfarint.com/v.1.0.0/Galileo/AirPrice.php";
    body = {
      adultCount: adultCount,
      childCount: childCount,
      infantCount: infant,
      segment: location.state?.flightData?.segment,
      tripType: location.state.tripType === "oneway" ? "1" : "2",
      segments:
        location.state?.flightData?.segment === "2"
          ? [
              {
                AirSegmentKey:
                  location.state.flightData.segments[0].SegmentDetails.key,
                Group:
                  location.state.flightData.segments[0].SegmentDetails.Group,
                Carrier:
                  location.state.flightData.segments[0].SegmentDetails.Carrier,
                FareBasisCode: location.state.flightData.FareBasisCode,
                FlightNumber:
                  location.state.flightData.segments[0].SegmentDetails
                    .FlightNumber,
                Origin:
                  location.state.flightData.segments[0].SegmentDetails.Origin,
                Destination:
                  location.state.flightData.segments[0].SegmentDetails
                    .Destination,
                DepartureTime:
                  location.state.flightData.segments[0].SegmentDetails
                    .DepartureTime,
                ArrivalTime:
                  location.state.flightData.segments[0].SegmentDetails
                    .ArrivalTime,
                BookingCode: location.state.flightData.segments[0].bookingcode,
              },
              {
                AirSegmentKey:
                  location.state.flightData.segments[1].SegmentDetails.key,
                Group:
                  location.state.flightData.segments[1].SegmentDetails.Group,
                Carrier:
                  location.state.flightData.segments[1].SegmentDetails.Carrier,
                FareBasisCode: location.state.flightData.FareBasisCode,
                FlightNumber:
                  location.state.flightData.segments[1].SegmentDetails
                    .FlightNumber,
                Origin:
                  location.state.flightData.segments[1].SegmentDetails.Origin,
                Destination:
                  location.state.flightData.segments[1].SegmentDetails
                    .Destination,
                DepartureTime:
                  location.state.flightData.segments[1].SegmentDetails
                    .DepartureTime,
                ArrivalTime:
                  location.state.flightData.segments[1].SegmentDetails
                    .ArrivalTime,
                BookingCode: location.state.flightData.segments[1].bookingcode,
              },
            ]
          : [
              {
                AirSegmentKey:
                  location.state.flightData.segments[0].SegmentDetails.key,
                Group:
                  location.state.flightData.segments[0].SegmentDetails.Group,
                Carrier:
                  location.state.flightData.segments[0].SegmentDetails.Carrier,
                FareBasisCode: location.state.flightData.FareBasisCode,
                FlightNumber:
                  location.state.flightData.segments[0].SegmentDetails
                    .FlightNumber,
                Origin:
                  location.state.flightData.segments[0].SegmentDetails.Origin,
                Destination:
                  location.state.flightData.segments[0].SegmentDetails
                    .Destination,
                DepartureTime:
                  location.state.flightData.segments[0].SegmentDetails
                    .DepartureTime,
                ArrivalTime:
                  location.state.flightData.segments[0].SegmentDetails
                    .ArrivalTime,
                BookingCode: location.state.flightData.segments[0].bookingcode,
              },
            ],
    };
  }

  useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data?.status !== "error" || data?.Error === null) {
          setLoadData(data);
        } else {
          throw new Error(data);
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          imageUrl: NotFound,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "No Data Found",
          confirmButtonText: "Search Another Flights...",
          confirmButtonColor: "#dc143c",
        }).then(function () {
          navigate(-1);
        });
      });
  }, [
    body.adultCount,
    body.childCount,
    body.infant,
    body.segment,
    body.tripType,
    navigate,
  ]);

  let adultPrice = 0,
    adultTaxPrice = 0,
    childPrice = 0,
    childTaxPrice = 0,
    infTaxPrice = 0,
    infPrice = 0,
    inTotalBaseFare = 0,
    totalTax = 0,
    totalFare = 0,
    totalBaseFare = 0,
    serviceFeeAdult = 0,
    serviceFeeChild = 0,
    serviceFeeInfant = 0,
    discount = 0,
    agentTotal = 0,
    limitTime;

  if (Object.keys(loadData).length !== 0) {
    if (adultCount > 0) {
      adultPrice =
        location.state?.flightData?.system === "Sabre"
          ? loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare.passengerInfoList[0].passengerInfo
              .passengerTotalFare.equivalentAmount * location?.state?.adultCount
          : location?.state?.flightData?.system === "Galileo"
          ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.EquivalentBasePrice?.slice(
              3
            ) * location?.state?.adultCount
          : loadData?.Results[0].Fares[0].BaseFare * adultCount;

      adultTaxPrice =
        location.state?.flightData?.system === "Sabre"
          ? loadData.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare.passengerInfoList[0].passengerInfo
              .passengerTotalFare.totalTaxAmount * location.state?.adultCount
          : location.state?.flightData?.system === "Galileo"
          ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.Taxes?.slice(
              3
            ) *
              location.state?.adultCount +
            adultPrice
          : loadData?.Results[0].Fares[0].Tax * adultCount;
      serviceFeeAdult =
        location.state?.flightData?.system === "Sabre"
          ? 0
          : location.state?.flightData?.system === "Galileo"
          ? 0
          : loadData?.Results[0]?.Fares[0]?.ServiceFee
          ? loadData?.Results[0]?.Fares[0]?.ServiceFee
          : 0 * location.state?.adultCount;
   
    }
    if (childCount > 0) {
      childPrice =
        location.state.flightData?.system === "Sabre"
          ? loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare.passengerInfoList[1].passengerInfo
              .passengerTotalFare.equivalentAmount * location.state?.childCount
          : location.state.flightData?.system === "Galileo"
          ? loadData.airAirPriceResult?.airAirPricingSolution[0]?.attributes.EquivalentBasePrice?.slice(
              3
            ) * location.state?.childCount
          : loadData?.Results[0].Fares[1].BaseFare * childCount;
      childTaxPrice =
        location.state.flightData?.system === "Sabre"
          ? loadData.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare.passengerInfoList[1].passengerInfo
              .passengerTotalFare.totalTaxAmount * location.state?.childCount
          : location.state.flightData?.system === "Galileo"
          ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.Taxes?.slice(
              3
            ) *
              location.state?.childCount +
            childPrice
          : loadData?.Results[0]?.Fares[1]?.Tax * location.state?.childCount;
      serviceFeeChild =
        location.state?.flightData?.system === "Sabre"
          ? 0
          : location.state?.flightData?.system === "Galileo"
          ? 0
          : loadData?.Results[0]?.Fares[1]?.ServiceFee
          ? loadData?.Results[0]?.Fares[1]?.ServiceFee
          : 0 * location.state?.childCount;
    }

    if (infant > 0) {
      infPrice =
        location.state.flightData?.system === "Sabre"
          ? loadData?.groupedItineraryResponse?.itineraryGroups[0]
              ?.itineraries[0]?.pricingInformation[0]?.fare.passengerInfoList[2]
              ?.passengerInfo?.passengerTotalFare?.equivalentAmount ||
            loadData?.groupedItineraryResponse?.itineraryGroups[0]
              ?.itineraries[0]?.pricingInformation[0]?.fare.passengerInfoList[1]
              ?.passengerInfo.passengerTotalFare.equivalentAmount *
              location.state?.infant
          : location.state.flightData?.system === "Galileo"
          ? loadData.airAirPriceResult?.airAirPricingSolution[0]?.attributes.EquivalentBasePrice?.slice(
              3
            ) * location.state?.infant
          : loadData?.Results[0]?.Fares[2]?.BaseFare ||
            loadData?.Results[0]?.Fares[1]?.BaseFare * location.state?.infant;

      infTaxPrice =
        location.state.flightData?.system === "Sabre"
          ? loadData.groupedItineraryResponse?.itineraryGroups[0]
              ?.itineraries[0]?.pricingInformation[0]?.fare
              ?.passengerInfoList[2]?.passengerInfo?.passengerTotalFare
              ?.totalTaxAmount ??
            loadData?.groupedItineraryResponse?.itineraryGroups[0]
              ?.itineraries[0].pricingInformation[1]?.fare?.passengerInfoList[1]
              ?.passengerInfo?.passengerTotalFare?.totalTaxAmount *
              location.state?.infant
          : location.state.flightData?.system === "Galileo"
          ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.Taxes?.slice(
              3
            ) *
              location.state?.infant +
            infPrice
          : loadData?.Results[0]?.Fares[2]?.Tax ??
            loadData?.Results[0]?.Fares[1]?.Tax * location.state?.infant;
      serviceFeeInfant =
        location.state?.flightData?.system === "Sabre"
          ? 0
          : location.state?.flightData?.system === "Galileo"
          ? 0
          : loadData?.Results[0]?.Fares[2]?.ServiceFee
          ? loadData?.Results[0]?.Fares[2]?.ServiceFee
          : 0 * location.state?.infant;
    }

    totalTax =
      location.state?.flightData?.system === "Sabre"
        ? loadData.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
            .pricingInformation[0].fare.totalFare.totalTaxAmount
        : location.state.flightData?.system === "Galileo"
        ? loadData.airAirPriceResult?.airAirPricingSolution[0]?.attributes.Taxes?.slice(
            3
          )
        : adultTaxPrice + childTaxPrice + infTaxPrice;
    totalBaseFare =
      location.state.flightData?.system === "Sabre"
        ? adultPrice + childPrice + infPrice
        : location.state.flightData?.system === "Galileo"
        ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.EquivalentBasePrice?.slice(
            3
          )
        : adultPrice + childPrice + infPrice;
    totalFare =
      location.state.flightData?.system === "Sabre"
        ? totalBaseFare + totalTax
        : location.state.flightData?.system === "Galileo"
        ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.EquivalentBasePrice?.slice(
            3
          )
        : totalBaseFare +
          totalTax +
          serviceFeeAdult +
          serviceFeeChild +
          serviceFeeInfant;

    agentTotal =
      couponAppliedMessage?.status === "success"
        ? Number(location.state.agentFare - 100)
        : Number(location.state.agentFare);
    discount = Number(location.state.commission);

    limitTime =
      location.state.roundData?.system === "Sabre"
        ? new Date()
        : location.state.roundData?.system === "Galileo"
        ? new Date()
        : loadData?.Results
        ? loadData?.Results[0]?.LastTicketDate
        : new Date();
  }
  const timeconvarta1 = location?.state?.flightData?.segments[0]?.departureTime;
  const departureTime1 = new Date(timeconvarta1).toUTCString();
  const timeconvarta2 = location?.state?.flightData?.segments[1]?.departureTime;
  const departureTime2 = new Date(timeconvarta2).toUTCString();

  if (!isLoaded) {
    return (
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          width: "70vw",
          marginInline: "auto",
        }}
      >
        <Box
          style={{
            width: "50%",
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={Loader}
            alt="loader"
            style={{
              width: "40%",
              objectFit: "center",
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <div>
      {Object.keys(loadData).length !== 0 ? (
        <Container maxWidth="xxl">
          {/* <Box className="flightDetailsBox-parent"> */}
          <Grid container>
            <Grid item xs={12} sm={9} md={9} px={"24px"}>
              <Box width={"100%"}>
                <Accordion defaultExpanded={true} className="flight-accordian1">
                  <AccordionSummary
                    style={{ padding: "0px" }}
                    expandIcon={
                      <AiFillCaretDown color="var(--primary-color)" />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography
                      sx={{
                        px: "0px",
                        mx: "0px",
                        color: "var(--primary-color)",
                        fontSize: "18px",
                        fontWeight: 600,
                      }}
                    >
                      Flight Itinerary Details
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{ padding: "0px" }}
                    className="flight-accordian2"
                  >
                    {location.state?.flightData.segment === "3" ? (
                      <Box mb={2}>
                        <Typography
                          sx={{
                            backgroundColor: "var(--gray-text-color)",
                            width: "20%",
                            fontSize: "12px",
                            fontWeight: 500,
                            color: "#fff",
                            marginBottom: "10px",
                            p: "5px",
                            textAlign: "center",
                            borderRadius: "10px 0px",
                          }}
                        >
                          Departure Flight
                        </Typography>
                        <Grid container justifyContent={"space-between"}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                fontSize: "20px",
                                fontWeight: 600,
                                color: "#000",
                              }}
                            >
                              {location.state?.flightData?.departure} -{" "}
                              {location.state?.flightData?.departureTime}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} textAlign="end">
                            <Typography
                              sx={{
                                fontSize: "20px",
                                fontWeight: 600,
                                color: "#000",
                              }}
                            >
                              {location.state?.flightData?.arrival} -{" "}
                              {location.state?.flightData?.arrivalTime}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container justifyContent={"space-between"}>
                          <Grid>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "var(--primary-color)",
                              }}
                            >
                              {
                                location.state?.flightData?.segments[0]?.departureLocation?.split(
                                  ","
                                )[0]
                              }
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "var(--gray-text-color)",
                              }}
                            >
                              {location.state?.flightData?.departureDate}
                            </Typography>
                          </Grid>

                          <Grid textAlign="center">
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "var(--primary-color)",
                              }}
                            >
                              {
                                location.state?.flightData?.segments[0]?.arrivalLocation?.split(
                                  ","
                                )[0]
                              }
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "var(--gray-text-color)",
                              }}
                            >
                              {departureTime1?.slice(0, 16)}
                            </Typography>
                          </Grid>
                          <Grid textAlign="center">
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "var(--primary-color)",
                              }}
                            >
                              {
                                location.state?.flightData?.segments[1]?.arrivalLocation?.split(
                                  ","
                                )[0]
                              }
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "var(--gray-text-color)",
                              }}
                            >
                              {departureTime2?.slice(0, 16)}
                            </Typography>
                          </Grid>
                          <Grid textAlign="end">
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "var(--primary-color)",
                              }}
                            >
                              {
                                location.state?.flightData?.segments[2]?.arrivalLocation?.split(
                                  ","
                                )[0]
                              }
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "var(--gray-text-color)",
                              }}
                            >
                              {location.state?.flightData?.arrivalDate}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container justifyContent={"space-around"}>
                          <Typography
                            sx={{
                              color: "var(--primary-color)",
                              fontSize: "13px",
                              fontWeight: 500,
                            }}
                          >
                            {
                              location.state?.flightData?.segments[0]
                                ?.flightduration
                            }
                          </Typography>
                          <Typography
                            sx={{
                              color: "var(--primary-color)",
                              fontSize: "13px",
                              fontWeight: 500,
                            }}
                          >
                            {
                              location.state?.flightData?.segments[1]
                                ?.flightduration
                            }
                          </Typography>
                          <Typography
                            sx={{
                              color: "var(--primary-color)",
                              fontSize: "13px",
                              fontWeight: 500,
                            }}
                          >
                            {
                              location.state?.flightData?.segments[2]
                                ?.flightduration
                            }
                          </Typography>
                        </Grid>

                        <Box py={2} className="roundway-animation">
                          <div className="round-segment-line0">
                            <div className="round-segment-circle">
                              <div className="circle-0">
                                <CircleIcon
                                  sx={{
                                    color: "var(--gray-text-color)",
                                    fontSize: "15px",
                                    cursor: "pointer",
                                  }}
                                />
                              </div>
                              <HtmlTooltip
                                title={
                                  <React.Fragment>
                                    <Typography
                                      sx={{ color: "#fff", fontSize: "10px" }}
                                    >
                                      Layover Time:{" "}
                                      {
                                        location?.state?.flightData?.transit
                                          ?.transit1
                                      }
                                    </Typography>
                                  </React.Fragment>
                                }
                                followCursor
                              >
                                <span>
                                  <div className="round-segment-stop"></div>
                                </span>
                              </HtmlTooltip>
                              <HtmlTooltip
                                title={
                                  <React.Fragment>
                                    <Typography
                                      sx={{ color: "#fff", fontSize: "10px" }}
                                    >
                                      Layover Time:{" "}
                                      {
                                        location?.state?.flightData?.transit
                                          ?.transit2
                                      }
                                    </Typography>
                                  </React.Fragment>
                                }
                                followCursor
                              >
                                <span>
                                  <div className="round-segment-stop"></div>
                                </span>
                              </HtmlTooltip>
                              {/* <div className="round-segment-stop"></div>
                              <div className="round-segment-stop"></div> */}
                              <div className="circle-0">
                                <CircleIcon
                                  sx={{
                                    color: "var(--gray-text-color)",
                                    fontSize: "15px",
                                    cursor: "pointer",
                                  }}
                                />
                              </div>
                            </div>
                            <div className="round-segment-flight03">
                              {/* <FlightIcon /> */}
                              <img src={anemy} width="50px" alt="flight" />
                            </div>
                          </div>
                        </Box>

                        <Grid container justifyContent={"space-around"} mb={2}>
                          <Grid>
                            <Grid container alignItems={"center"}>
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.flightData?.segments[0]?.marketingcareer}.png`}
                                width="40px"
                                height="40px"
                                className={
                                  location.state?.flightData?.system === "Sabre"
                                    ? "img-border-sabre"
                                    : location.state?.flightData?.system ===
                                      "FlyHub"
                                    ? "img-border-flyhub"
                                    : "img-border-galileo"
                                }
                                alt="flight icon"
                              />{" "}
                              &nbsp;
                              <Box>
                                <Typography
                                  sx={{
                                    color: "#DC143C",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                  }}
                                >
                                  {
                                    location.state?.flightData?.segments[0]
                                      ?.marketingcareerName
                                  }
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "var(--primary-color)",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                  }}
                                >
                                  {
                                    location.state?.flightData?.segments[0]
                                      ?.marketingcareer
                                  }
                                  &nbsp;
                                  {
                                    location.state?.flightData?.segments[0]
                                      ?.marketingflight
                                  }
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid>
                            <Grid container alignItems={"center"}>
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.flightData?.segments[1]?.marketingcareer}.png`}
                                width="40px"
                                height="40px"
                                className={
                                  location.state?.flightData?.system === "Sabre"
                                    ? "img-border-sabre"
                                    : location.state?.flightData?.system ===
                                      "FlyHub"
                                    ? "img-border-flyhub"
                                    : "img-border-galileo"
                                }
                                alt="flight icon"
                              />
                              &nbsp;
                              <Box>
                                <Typography
                                  sx={{
                                    color: "#DC143C",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                  }}
                                >
                                  {
                                    location.state?.flightData?.segments[1]
                                      ?.marketingcareerName
                                  }
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "var(--primary-color)",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                  }}
                                >
                                  {
                                    location.state?.flightData?.segments[1]
                                      ?.marketingcareer
                                  }
                                  &nbsp;
                                  {
                                    location.state?.flightData?.segments[1]
                                      ?.marketingflight
                                  }
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid>
                            <Grid container alignItems={"center"}>
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.flightData?.segments[2]?.marketingcareer}.png`}
                                width="40px"
                                height="40px"
                                className={
                                  location.state?.flightData?.system === "Sabre"
                                    ? "img-border-sabre"
                                    : location.state?.flightData?.system ===
                                      "FlyHub"
                                    ? "img-border-flyhub"
                                    : "img-border-galileo"
                                }
                                alt="flight icon"
                              />
                              &nbsp;
                              <Box>
                                <Typography
                                  sx={{
                                    color: "#DC143C",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                  }}
                                >
                                  {
                                    location.state?.flightData?.segments[2]
                                      ?.marketingcareerName
                                  }
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "var(--primary-color)",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                  }}
                                >
                                  {
                                    location.state?.flightData?.segments[2]
                                      ?.marketingcareer
                                  }
                                  &nbsp;
                                  {
                                    location.state?.flightData?.segments[2]
                                      ?.marketingflight
                                  }
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid container justifyContent={"space-between"}>
                          <Grid
                            md={6}
                            container
                            justifyContent={"space-between"}
                            alignItems="end"
                          >
                            <Typography
                              sx={{
                                color: "#000",
                                fontSize: "12px",
                                fontWeight: 500,
                              }}
                            >
                              Class: {location.state?.flightData?.class}
                            </Typography>
                            <Typography>
                              {location.state?.flightData?.refundable ===
                              "Refundable" ? (
                                <Typography
                                  sx={{
                                    color: "green",
                                    fontSize: "12px",
                                  }}
                                >
                                  <>Refundable</>
                                </Typography>
                              ) : (
                                <Typography
                                  sx={{
                                    color: "#DC143C",
                                    fontSize: "12px",
                                  }}
                                >
                                  Non Refundable
                                </Typography>
                              )}
                            </Typography>

                            <Typography
                              sx={{
                                color: "#000",
                                fontSize: "12px",
                                fontWeight: 500,
                              }}
                            >
                              <img src={seat1} width="18px" alt="seat" />{" "}
                              {location.state?.flightData?.segments[0]?.seat}{" "}
                              Seat
                            </Typography>
                          </Grid>
                          <Grid item md={2.5} textAlign={"center"}>
                            <Typography
                              sx={{
                                color: "#fff",
                                fontSize: "12px",
                                fontWeight: 500,
                                bgcolor: "var(--primary-color)",
                                borderRadius: "12px 0px",
                                padding: "8px",
                              }}
                            >
                              Flight Duration{" "}
                              {location.state?.flightData?.flightduration}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    ) : location.state?.flightData.segment === "2" ? (
                      <Box mb={2}>
                        <Typography
                          sx={{
                            backgroundColor: "var(--gray-text-color)",
                            width: "20%",
                            fontSize: "12px",
                            fontWeight: 500,
                            color: "#fff",
                            marginBottom: "10px",
                            p: "5px",
                            textAlign: "center",
                            borderRadius: "10px 0px",
                          }}
                        >
                          Departure Flight
                        </Typography>
                        <Grid container justifyContent={"space-between"}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                fontSize: "20px",
                                fontWeight: 600,
                                color: "#000",
                              }}
                            >
                              {location.state?.flightData?.departure} -{" "}
                              {location.state?.flightData?.departureTime}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} textAlign="end">
                            <Typography
                              sx={{
                                fontSize: "20px",
                                fontWeight: 600,
                                color: "#000",
                              }}
                            >
                              {location.state?.flightData?.arrival} -{" "}
                              {location.state?.flightData?.arrivalTime}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container justifyContent={"space-between"}>
                          <Grid>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "var(--primary-color)",
                              }}
                            >
                              {
                                location.state?.flightData?.segments[0]?.departureLocation?.split(
                                  ","
                                )[0]
                              }
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "var(--gray-text-color)",
                              }}
                            >
                              {location.state?.flightData?.departureDate}
                            </Typography>
                          </Grid>
                          <Grid>
                            <Typography
                              sx={{
                                textAlign: "center",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "var(--primary-color)",
                              }}
                            >
                              {
                                location.state?.flightData?.segments[0]?.arrivalLocation?.split(
                                  ","
                                )[0]
                              }
                            </Typography>
                            <Typography
                              sx={{
                                textAlign: "center",
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "var(--gray-text-color)",
                              }}
                            >
                              {/* {
                                location.state?.flightData?.segments[0]?.arrivalTime?.split(
                                  "T"
                                )[0]
                              } */}
                              {departureTime1?.slice(0, 16)}
                            </Typography>
                          </Grid>

                          <Grid textAlign="end">
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "var(--primary-color)",
                              }}
                            >
                              {
                                location.state?.flightData?.segments[1]?.arrivalLocation?.split(
                                  ","
                                )[0]
                              }
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "var(--gray-text-color)",
                              }}
                            >
                              {location.state?.flightData?.arrivalDate}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container justifyContent={"space-around"}>
                          <Typography
                            sx={{
                              color: "var(--primary-color)",
                              fontSize: "13px",
                              fontWeight: 500,
                            }}
                          >
                            {
                              location.state?.flightData?.segments[0]
                                ?.flightduration
                            }
                          </Typography>
                          <Typography
                            sx={{
                              color: "var(--primary-color)",
                              fontSize: "13px",
                              fontWeight: 500,
                            }}
                          >
                            {
                              location.state?.flightData?.segments[1]
                                ?.flightduration
                            }
                          </Typography>
                        </Grid>

                        <Box py={2} className="roundway-animation">
                          <div className="round-segment-line0">
                            <div className="round-segment-circle">
                              <div className="circle-0">
                                <CircleIcon
                                  sx={{
                                    color: "var(--gray-text-color)",
                                    fontSize: "15px",
                                    cursor: "pointer",
                                  }}
                                />
                              </div>
                              <HtmlTooltip
                                title={
                                  <React.Fragment>
                                    <Typography
                                      sx={{ color: "#fff", fontSize: "10px" }}
                                    >
                                      Layover Time:{" "}
                                      {
                                        location?.state?.flightData?.transit
                                          ?.transit1
                                      }
                                    </Typography>
                                  </React.Fragment>
                                }
                                followCursor
                              >
                                <span>
                                  <div className="round-segment-stop"></div>
                                </span>
                              </HtmlTooltip>
                              <div className="circle-0">
                                <CircleIcon
                                  sx={{
                                    color: "var(--gray-text-color)",
                                    fontSize: "15px",
                                    cursor: "pointer",
                                  }}
                                />
                              </div>
                            </div>
                            <div className="round-segment-flight02">
                              {/* <FlightIcon /> */}
                              <img src={anemy} width="50px" alt="flight" />
                            </div>
                          </div>
                        </Box>

                        <Grid container justifyContent={"space-around"} mb={2}>
                          <Grid>
                            <Grid container alignItems={"center"}>
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.flightData?.segments[0]?.marketingcareer}.png`}
                                width="40px"
                                height="40px"
                                className={
                                  location.state?.flightData?.system === "Sabre"
                                    ? "img-border-sabre"
                                    : location.state?.flightData?.system ===
                                      "FlyHub"
                                    ? "img-border-flyhub"
                                    : "img-border-galileo"
                                }
                                alt="flight icon"
                              />
                              &nbsp;
                              <Box>
                                <Typography
                                  sx={{
                                    color: "#DC143C",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                  }}
                                >
                                  {
                                    location.state?.flightData?.segments[0]
                                      ?.marketingcareerName
                                  }
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "var(--primary-color)",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                  }}
                                >
                                  {
                                    location.state?.flightData?.segments[0]
                                      ?.marketingcareer
                                  }
                                  &nbsp;
                                  {
                                    location.state?.flightData?.segments[0]
                                      ?.marketingflight
                                  }
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid>
                            <Grid container alignItems={"center"}>
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.flightData?.segments[1]?.marketingcareer}.png`}
                                width="40px"
                                height="40px"
                                className={
                                  location.state?.flightData?.system === "Sabre"
                                    ? "img-border-sabre"
                                    : location.state?.flightData?.system ===
                                      "FlyHub"
                                    ? "img-border-flyhub"
                                    : "img-border-galileo"
                                }
                                alt="flight icon"
                              />
                              &nbsp;
                              <Box>
                                <Typography
                                  sx={{
                                    color: "#DC143C",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                  }}
                                >
                                  {
                                    location.state?.flightData?.segments[0]
                                      ?.marketingcareerName
                                  }
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "var(--primary-color)",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                  }}
                                >
                                  {
                                    location.state?.flightData?.segments[1]
                                      ?.marketingcareer
                                  }
                                  &nbsp;
                                  {
                                    location.state?.flightData?.segments[1]
                                      ?.marketingflight
                                  }
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid container justifyContent={"space-between"}>
                          <Grid
                            md={6}
                            container
                            justifyContent={"space-between"}
                            alignItems="end"
                          >
                            <Typography
                              sx={{
                                color: "#000",
                                fontSize: "12px",
                                fontWeight: 500,
                              }}
                            >
                              {location.state?.flightData?.class === "Sabre" ? (
                                <>Economy</>
                              ) : location.state?.flightData?.class ===
                                "FlyHub" ? (
                                <>Economy</>
                              ) : (
                                <>Class: {location.state?.flightData?.class}</>
                              )}
                            </Typography>
                            <Typography>
                              {location.state?.flightData?.refundable ===
                              "Refundable" ? (
                                <Typography
                                  sx={{
                                    color: "green",
                                    fontSize: "12px",
                                  }}
                                >
                                  <>Refundable</>
                                </Typography>
                              ) : (
                                <Typography
                                  sx={{
                                    color: "#DC143C",
                                    fontSize: "12px",
                                  }}
                                >
                                  Non Refundable
                                </Typography>
                              )}
                            </Typography>

                            <Typography
                              sx={{
                                color: "#000",
                                fontSize: "12px",
                                fontWeight: 500,
                              }}
                            >
                              <img src={seat1} width="18px" alt="seat" />{" "}
                              {location.state?.flightData?.segments[0]?.seat}{" "}
                              Seat
                            </Typography>
                          </Grid>
                          <Grid item md={2.5} textAlign={"center"}>
                            <Typography
                              sx={{
                                color: "#fff",
                                fontSize: "12px",
                                fontWeight: 500,
                                bgcolor: "var(--primary-color)",
                                borderRadius: "12px 0px",
                                padding: "8px",
                              }}
                            >
                              Flight Duration{" "}
                              {location.state?.flightData?.flightduration}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    ) : (
                      <Box mb={2}>
                        <Typography
                          sx={{
                            backgroundColor: "var(--gray-text-color)",
                            width: "20%",
                            fontSize: "12px",
                            fontWeight: 500,
                            color: "#fff",
                            marginBottom: "10px",
                            p: "5px",
                            textAlign: "center",
                            borderRadius: "10px 0px",
                          }}
                        >
                          Departure Flight
                        </Typography>
                        <Grid container justifyContent={"space-between"}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                fontSize: "20px",
                                fontWeight: 600,
                                color: "#000",
                              }}
                            >
                              {location.state?.flightData?.departure} -{" "}
                              {location.state?.flightData?.departureTime}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} textAlign="end">
                            <Typography
                              sx={{
                                fontSize: "20px",
                                fontWeight: 600,
                                color: "#000",
                              }}
                            >
                              {location.state?.flightData?.arrival} -{" "}
                              {location.state?.flightData?.arrivalTime}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container justifyContent={"space-between"}>
                          <Grid>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "var(--primary-color)",
                              }}
                            >
                              {
                                location.state?.flightData?.segments[0]?.departureLocation?.split(
                                  ","
                                )[0]
                              }
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "var(--gray-text-color)",
                              }}
                            >
                              {location.state?.flightData?.departureDate}
                            </Typography>
                          </Grid>

                          <Grid textAlign="end">
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "var(--primary-color)",
                              }}
                            >
                              {
                                location.state?.flightData?.segments[0]?.arrivalLocation?.split(
                                  ","
                                )[0]
                              }
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "var(--gray-text-color)",
                              }}
                            >
                              {location.state?.flightData?.arrivalDate}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container justifyContent={"space-around"}>
                          <Typography
                            sx={{
                              color: "var(--primary-color)",
                              fontSize: "13px",
                              fontWeight: 500,
                            }}
                          >
                            {location.state?.flightData?.flightduration}
                          </Typography>
                        </Grid>

                        <Box py={2} className="roundway-animation">
                          <div className="round-segment-line0">
                            <div className="round-segment-circle">
                              <div className="circle-0">
                                <CircleIcon
                                  sx={{
                                    color: "var(--gray-text-color)",
                                    fontSize: "15px",
                                    cursor: "pointer",
                                  }}
                                />
                              </div>
                              <div className="circle-0">
                                <CircleIcon
                                  sx={{
                                    color: "var(--gray-text-color)",
                                    fontSize: "15px",
                                    cursor: "pointer",
                                  }}
                                />
                              </div>
                            </div>
                            <div className="round-segment-flight01">
                              {/* <FlightIcon /> */}
                              <img src={anemy} width="50px" alt="flight" />
                            </div>
                          </div>
                        </Box>

                        <Grid container justifyContent={"space-around"} mb={2}>
                          <Grid>
                            <Grid container alignItems={"center"}>
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.flightData?.segments[0]?.marketingcareer}.png`}
                                width="40px"
                                height="40px"
                                className={
                                  location.state?.flightData?.system === "Sabre"
                                    ? "img-border-sabre"
                                    : location.state?.flightData?.system ===
                                      "FlyHub"
                                    ? "img-border-flyhub"
                                    : "img-border-galileo"
                                }
                                alt="flight icon"
                              />
                              &nbsp;
                              <Box>
                                <Typography
                                  sx={{
                                    color: "#DC143C",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                  }}
                                >
                                  {
                                    location.state?.flightData?.segments[0]
                                      ?.marketingcareerName
                                  }
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "var(--primary-color)",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                  }}
                                >
                                  {
                                    location.state?.flightData?.segments[0]
                                      ?.marketingcareer
                                  }
                                  &nbsp;
                                  {
                                    location.state?.flightData?.segments[0]
                                      ?.marketingflight
                                  }
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid container justifyContent={"space-between"}>
                          <Grid
                            md={6}
                            container
                            justifyContent={"space-between"}
                            alignItems="end"
                          >
                            <Typography
                              sx={{
                                color: "#000",
                                fontSize: "12px",
                                fontWeight: 500,
                              }}
                            >
                              {location.state?.flightData?.class === "Sabre" ? (
                                <>Economy</>
                              ) : location.state?.flightData?.class ===
                                "FlyHub" ? (
                                <>Economy</>
                              ) : (
                                <>Class: {location.state?.flightData?.class}</>
                              )}
                            </Typography>
                            <Typography>
                              {location.state?.flightData?.refundable ===
                              "Refundable" ? (
                                <Typography
                                  sx={{
                                    color: "green",
                                    fontSize: "12px",
                                  }}
                                >
                                  <>Refundable</>
                                </Typography>
                              ) : (
                                <Typography
                                  sx={{
                                    color: "#DC143C",
                                    fontSize: "12px",
                                  }}
                                >
                                  Non Refundable
                                </Typography>
                              )}
                            </Typography>

                            <Typography
                              sx={{
                                color: "#000",
                                fontSize: "12px",
                                fontWeight: 500,
                              }}
                            >
                              <img src={seat1} width="18px" alt="seat" />{" "}
                              {location.state?.flightData?.segments[0]?.seat}{" "}
                              Seat
                            </Typography>
                          </Grid>
                          <Grid item md={2.5} textAlign={"center"}>
                            <Typography
                              sx={{
                                color: "#fff",
                                fontSize: "12px",
                                fontWeight: 500,
                                bgcolor: "var(--primary-color)",
                                borderRadius: "12px 0px",
                                padding: "8px",
                              }}
                            >
                              Flight Duration{" "}
                              {location.state?.flightData?.flightduration}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Box mt={3}>
                {location.state?.flightData?.system === "Galileo" ? (
                  <FlightUserInfo
                    loadData={loadData}
                    userData={location.state}
                    searchResult={loadData}
                    adultPrice={adultPrice}
                    childPrice={childPrice}
                    infPrice={infPrice}
                    adultTaxPrice={adultTaxPrice}
                    childTaxPrice={childTaxPrice}
                    infTaxPrice={infTaxPrice}
                    serviceFeeAdult={serviceFeeAdult}
                    serviceFeeChild={serviceFeeChild}
                    serviceFeeInfant={serviceFeeInfant}
                    totalBaseFare={totalBaseFare}
                    inTotalBaseFare={inTotalBaseFare}
                    totalTax={totalTax}
                    totalFare={totalFare}
                    limitTime={limitTime}
                    isLoaded={isLoaded}
                    setIsLoaded={setIsLoaded}
                    clientFare={location.state.clientFare}
                    coupon={coupon}
                    setCoupon={setCoupon}
                    couponAppliedMessage={couponAppliedMessage}
                    setCouponAppliedMessage={setCouponAppliedMessage}
                    adultBaggage={adultBaggage}
                    setAdultBaggage={setAdultBaggage}
                    childBaggage={childBaggage}
                    setChildBaggage={setChildBaggage}
                    infantBaggage={infantBaggage}
                    setInfantBaggage={setInfantBaggage}
                    balance={balance}
                  />
                ) : location.state?.flightData?.system === "FlyHub" ? (
                  <FlightUserInfoFlyHub
                    loadData={loadData}
                    userData={location.state}
                    searchResult={loadData}
                    adultPrice={adultPrice}
                    childPrice={childPrice}
                    infPrice={infPrice}
                    adultTaxPrice={adultTaxPrice}
                    childTaxPrice={childTaxPrice}
                    infTaxPrice={infTaxPrice}
                    serviceFeeAdult={serviceFeeAdult}
                    serviceFeeChild={serviceFeeChild}
                    serviceFeeInfant={serviceFeeInfant}
                    inTotalBaseFare={inTotalBaseFare}
                    totalBaseFare={totalBaseFare}
                    totalTax={totalTax}
                    totalFare={totalFare}
                    limitTime={limitTime}
                    isLoaded={isLoaded}
                    setIsLoaded={setIsLoaded}
                    clientFare={location.state.clientFare}
                    coupon={coupon}
                    setCoupon={setCoupon}
                    couponAppliedMessage={couponAppliedMessage}
                    setCouponAppliedMessage={setCouponAppliedMessage}
                    adultBaggage={adultBaggage}
                    setAdultBaggage={setAdultBaggage}
                    childBaggage={childBaggage}
                    setChildBaggage={setChildBaggage}
                    infantBaggage={infantBaggage}
                    setInfantBaggage={setInfantBaggage}
                    balance={balance}
                  />
                ) : (
                  <FlightUserInfoSabre
                    loadData={loadData}
                    userData={location.state}
                    searchResult={loadData}
                    adultPrice={adultPrice}
                    childPrice={childPrice}
                    infPrice={infPrice}
                    adultTaxPrice={adultTaxPrice}
                    childTaxPrice={childTaxPrice}
                    infTaxPrice={infTaxPrice}
                    serviceFeeAdult={serviceFeeAdult}
                    serviceFeeChild={serviceFeeChild}
                    serviceFeeInfant={serviceFeeInfant}
                    inTotalBaseFare={inTotalBaseFare}
                    totalBaseFare={totalBaseFare}
                    totalTax={totalTax}
                    totalFare={totalFare}
                    limitTime={limitTime}
                    isLoaded={isLoaded}
                    setIsLoaded={setIsLoaded}
                    clientFare={location.state.clientFare}
                    coupon={coupon}
                    setCoupon={setCoupon}
                    couponAppliedMessage={couponAppliedMessage}
                    setCouponAppliedMessage={setCouponAppliedMessage}
                    adultBaggage={adultBaggage}
                    setAdultBaggage={setAdultBaggage}
                    childBaggage={childBaggage}
                    setChildBaggage={setChildBaggage}
                    infantBaggage={infantBaggage}
                    setInfantBaggage={setInfantBaggage}
                    balance={balance}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              {/*// todo --------------------- */}
              <FlightInfoDetails
                loadData={loadData}
                searchData={location?.state}
                adultCount={location?.state?.adultCount}
                childCount={location?.state?.childCount}
                infant={location?.state?.infant}
                adultPrice={adultPrice}
                childPrice={childPrice}
                infPrice={infPrice}
                adultTaxPrice={adultTaxPrice}
                childTaxPrice={childTaxPrice}
                infTaxPrice={infTaxPrice}
                serviceFeeAdult={serviceFeeAdult}
                serviceFeeChild={serviceFeeChild}
                serviceFeeInfant={serviceFeeInfant}
                totalBaseFare={totalBaseFare}
                totalTax={totalTax}
                totalFare={totalFare}
                inTotalBaseFare={inTotalBaseFare}
                limitTime={limitTime}
                clientFare={location.state.clientFare}
                agentTotal={agentTotal}
                discount={discount}
                coupon={coupon}
                setCoupon={setCoupon}
                couponAppliedMessage={couponAppliedMessage}
                setCouponAppliedMessage={setCouponAppliedMessage}
                adultBaggage={adultBaggage}
                setAdultBaggage={setAdultBaggage}
                childBaggage={childBaggage}
                setChildBaggage={setChildBaggage}
                infantBaggage={infantBaggage}
                setInfantBaggage={setInfantBaggage}
                balance={balance}
              />
            </Grid>
          </Grid>
          {/* </Box> */}
        </Container>
      ) : (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
            width: "70vw",
            marginInline: "auto",
          }}
        >
          <Box
            style={{
              width: "50%",
              height: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={Loader}
              alt="loader"
              style={{
                width: "40%",
                objectFit: "center",
              }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default FlightInformation;
