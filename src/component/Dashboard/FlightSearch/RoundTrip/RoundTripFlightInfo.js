import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CircleIcon from "@mui/icons-material/Circle";
import FlightIcon from "@mui/icons-material/Flight";
import seat1 from "../../../../image/Icon/bag.svg";
import bag from "../../../../image/Icon/seat.svg";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import commaNumber from "comma-number";
import Swal from "sweetalert2";
import { styled } from "@mui/material/styles";
import ReturnFlightUserInfo from "../../FlightInformation/FlightUserInfo/ReturnFlightUserInfo";
import ReturnFlightUserInfoSabre from "../../FlightInformation/FlightUserInfo/ReturnFlightUserInfoSabre";
import ReturnFlightUserInfoFlyHub from "../../FlightInformation/FlightUserInfo/ReturnFlightUserInfoFlyHub";
import RoundFlightInfoDetails from "./RoundFlightInfoDetails";
import { AiFillCaretDown } from "react-icons/ai";
import anemy from "../../../../image/anemy.png";
import Loader from "../../../../image/loader/Render.gif";
import NotFound from "../../../../image/undraw/undraw_web_search_re_efla.svg";
import "./RoundTripFlightInfo.css";
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

const RoundTripFlightInfo = () => {
  const users = secureLocalStorage.getItem("user-info");
  let agentId = users?.user?.agentId;
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(true);
  const [progress, setProgress] = useState(0);

  //todo: Baggage Information
  const [goAdultBagage, setGoAdultBagage] = useState();
  const [goChildBagage, setGoChildBagage] = useState();
  const [goInfatBagage, setGoInfatBagage] = useState();
  const [backAdultBagage, setBackAdultBagage] = useState();
  const [backChildBagage, setBackChildBagage] = useState();
  const [backInfantBagage, setBackInfantBagage] = useState();
  //todo: End Baggage Information end

  //todo: cupon
  const [coupon, setCoupon] = useState("");
  const [couponAppliedMessage, setCouponAppliedMessage] = useState({});
  //todo:end cupon
  const [balance, setBalance] = useState({});

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

  const { adultCount, childCount, infant } = location.state;
  const [loadData, setLoadData] = useState([]);
  const timeconvarta1 =
    location?.state?.roundData?.segments?.go[0]?.arrivalTime;
  const ArrivalTime1 = new Date(timeconvarta1).toUTCString();
  const timeconvarta2 =
    location?.state?.roundData?.segments?.go[1]?.arrivalTime;
  const ArrivalTime2 = new Date(timeconvarta2).toUTCString();
  const navigate = useNavigate();
  let url;
  let body;
  if (location.state?.roundData?.system === "Sabre") {
    url = "https://api.flyfarint.com/v.1.0.0/Sabre/AirPrice.php";
    body = {
      adultCount: location.state.adultCount,
      childCount: location.state.childCount,
      infantCount: location.state.infant,
      segment: location.state?.roundData?.segment,
      tripType: location.state?.tripType === "oneway" ? "1" : "2",
      segments: {
        go:
          location.state?.roundData?.segment === "2"
            ? [
                {
                  departure: location.state.roundData.segments.go[0].departure,
                  arrival: location.state.roundData.segments.go[0].arrival,
                  dpTime: location.state.roundData.segments.go[0].departureTime,
                  arrTime: location.state.roundData.segments.go[0].arrivalTime,
                  bCode: location.state.roundData.segments.go[0].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.go[0].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.go[0].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.go[0].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.go[0].operatingflight,
                },
                {
                  departure: location.state.roundData.segments.go[1].departure,
                  arrival: location.state.roundData.segments.go[1].arrival,
                  dpTime: location.state.roundData.segments.go[1].departureTime,
                  arrTime: location.state.roundData.segments.go[1].arrivalTime,
                  bCode: location.state.roundData.segments.go[1].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.go[1].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.go[1].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.go[1].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.go[1].operatingflight,
                },
              ]
            : location.state?.roundData?.segment === "21"
            ? [
                {
                  departure: location.state.roundData.segments.go[0].departure,
                  arrival: location.state.roundData.segments.go[0].arrival,
                  dpTime: location.state.roundData.segments.go[0].departureTime,
                  arrTime: location.state.roundData.segments.go[0].arrivalTime,
                  bCode: location.state.roundData.segments.go[0].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.go[0].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.go[0].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.go[0].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.go[0].operatingflight,
                },
                {
                  departure: location.state.roundData.segments.go[1].departure,
                  arrival: location.state.roundData.segments.go[1].arrival,
                  dpTime: location.state.roundData.segments.go[1].departureTime,
                  arrTime: location.state.roundData.segments.go[1].arrivalTime,
                  bCode: location.state.roundData.segments.go[1].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.go[1].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.go[1].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.go[1].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.go[1].operatingflight,
                },
              ]
            : location.state?.roundData?.segment === "12"
            ? [
                {
                  departure: location.state.roundData.segments.go[0].departure,
                  arrival: location.state.roundData.segments.go[0].arrival,
                  dpTime: location.state.roundData.segments.go[0].departureTime,
                  arrTime: location.state.roundData.segments.go[0].arrivalTime,
                  bCode: location.state.roundData.segments.go[0].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.go[0].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.go[0].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.go[0].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.go[0].operatingflight,
                },
              ]
            : [
                {
                  departure: location.state.roundData.segments.go[0].departure,
                  arrival: location.state.roundData.segments.go[0].arrival,
                  dpTime: location.state.roundData.segments.go[0].departureTime,
                  arrTime: location.state.roundData.segments.go[0].arrivalTime,
                  bCode: location.state.roundData.segments.go[0].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.go[0].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.go[0].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.go[0].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.go[0].operatingflight,
                },
              ],
        back:
          location.state?.roundData?.segment === "2"
            ? [
                {
                  departure:
                    location.state.roundData.segments.back[0].departure,
                  arrival: location.state.roundData.segments.back[0].arrival,
                  dpTime:
                    location.state.roundData.segments.back[0].departureTime,
                  arrTime:
                    location.state.roundData.segments.back[0].arrivalTime,
                  bCode: location.state.roundData.segments.back[0].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.back[0].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.back[0].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.back[0].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.back[0].operatingflight,
                },
                {
                  departure:
                    location.state.roundData.segments.back[1].departure,
                  arrival: location.state.roundData.segments.back[1].arrival,
                  dpTime:
                    location.state.roundData.segments.back[1].departureTime,
                  arrTime:
                    location.state.roundData.segments.back[1].arrivalTime,
                  bCode: location.state.roundData.segments.back[1].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.back[1].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.back[1].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.back[1].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.back[1].operatingflight,
                },
              ]
            : location.state?.roundData?.segment === "12"
            ? [
                {
                  departure:
                    location.state.roundData.segments.back[0].departure,
                  arrival: location.state.roundData.segments.back[0].arrival,
                  dpTime:
                    location.state.roundData.segments.back[0].departureTime,
                  arrTime:
                    location.state.roundData.segments.back[0].arrivalTime,
                  bCode: location.state.roundData.segments.back[0].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.back[0].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.back[0].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.back[0].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.back[0].operatingflight,
                },
                {
                  departure:
                    location.state.roundData.segments.back[1].departure,
                  arrival: location.state.roundData.segments.back[1].arrival,
                  dpTime:
                    location.state.roundData.segments.back[1].departureTime,
                  arrTime:
                    location.state.roundData.segments.back[1].arrivalTime,
                  bCode: location.state.roundData.segments.back[1].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.back[1].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.back[1].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.back[1].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.back[1].operatingflight,
                },
              ]
            : location.state?.roundData?.segment === "21"
            ? [
                {
                  departure:
                    location.state.roundData.segments.back[0].departure,
                  arrival: location.state.roundData.segments.back[0].arrival,
                  dpTime:
                    location.state.roundData.segments.back[0].departureTime,
                  arrTime:
                    location.state.roundData.segments.back[0].arrivalTime,
                  bCode: location.state.roundData.segments.back[0].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.back[0].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.back[0].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.back[0].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.back[0].operatingflight,
                },
              ]
            : [
                {
                  departure:
                    location.state.roundData.segments.back[0].departure,
                  arrival: location.state.roundData.segments.back[0].arrival,
                  dpTime:
                    location.state.roundData.segments.back[0].departureTime,
                  arrTime:
                    location.state.roundData.segments.back[0].arrivalTime,
                  bCode: location.state.roundData.segments.back[0].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.back[0].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.back[0].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.back[0].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.back[0].operatingflight,
                },
              ],
      },
    };
  } else if (location.state?.roundData.system === "FlyHub") {
    url = "https://api.flyfarint.com/v.1.0.0/FlyHub/AirPrice.php";
    body = {
      SearchID: location.state?.roundData?.SearchID,
      ResultID: location.state?.roundData?.ResultID,
    };
  } else if (location.state?.roundData.system === "Galileo") {
    url = "https://api.flyfarint.com/v.1.0.0/Galileo/AirPrice.php";
    body = {
      adultCount: adultCount,
      childCount: childCount,
      infantCount: infant,
      segment: location.state?.roundData?.segment,
      tripType: location.state.tripType === "oneway" ? "1" : "2",
      segments: {
        go:
          location.state?.roundData?.segment === "2"
            ? [
                {
                  AirSegmentKey:
                    location.state.roundData.segments.go[0].segmentDetails.key,
                  Group:
                    location.state.roundData.segments.go[0].segmentDetails
                      .Group,
                  Carrier:
                    location.state.roundData.segments.go[0].segmentDetails
                      .Carrier,
                  FareBasisCode: location.state.roundData.goFareBasisCode,
                  FlightNumber:
                    location.state.roundData.segments.go[0].segmentDetails
                      .FlightNumber,
                  Origin:
                    location.state.roundData.segments.go[0].segmentDetails
                      .Origin,
                  Destination:
                    location.state.roundData.segments.go[0].segmentDetails
                      .Destination,
                  DepartureTime:
                    location.state.roundData.segments.go[0].segmentDetails
                      .DepartureTime,
                  ArrivalTime:
                    location.state.roundData.segments.go[0].segmentDetails
                      .ArrivalTime,
                  BookingCode:
                    location.state.roundData.segments.go[0].bookingcode,
                },
                {
                  AirSegmentKey:
                    location.state.roundData.segments.go[1].segmentDetails.key,
                  Group:
                    location.state.roundData.segments.go[1].segmentDetails
                      .Group,
                  Carrier:
                    location.state.roundData.segments.go[1].segmentDetails
                      .Carrier,
                  FareBasisCode: location.state.roundData.goFareBasisCode,
                  FlightNumber:
                    location.state.roundData.segments.go[1].segmentDetails
                      .FlightNumber,
                  Origin:
                    location.state.roundData.segments.go[1].segmentDetails
                      .Origin,
                  Destination:
                    location.state.roundData.segments.go[1].segmentDetails
                      .Destination,
                  DepartureTime:
                    location.state.roundData.segments.go[1].segmentDetails
                      .DepartureTime,
                  ArrivalTime:
                    location.state.roundData.segments.go[1].segmentDetails
                      .ArrivalTime,
                  BookingCode:
                    location.state.roundData.segments.go[1].bookingcode,
                },
              ]
            : [
                {
                  AirSegmentKey:
                    location.state.roundData.segments.go[0].segmentDetails.key,
                  Group:
                    location.state.roundData.segments.go[0].segmentDetails
                      .Group,
                  Carrier:
                    location.state.roundData.segments.go[0].segmentDetails
                      .Carrier,
                  FareBasisCode: location.state.roundData.goFareBasisCode,
                  FlightNumber:
                    location.state.roundData.segments.go[0].segmentDetails
                      .FlightNumber,
                  Origin:
                    location.state.roundData.segments.go[0].segmentDetails
                      .Origin,
                  Destination:
                    location.state.roundData.segments.go[0].segmentDetails
                      .Destination,
                  DepartureTime:
                    location.state.roundData.segments.go[0].segmentDetails
                      .DepartureTime,
                  ArrivalTime:
                    location.state.roundData.segments.go[0].segmentDetails
                      .ArrivalTime,
                  BookingCode:
                    location.state.roundData.segments.go[0].bookingcode,
                },
              ],
        back:
          location.state?.roundData?.segment === "2"
            ? [
                {
                  AirSegmentKey:
                    location.state.roundData.segments.back[0].segmentDetails
                      .key,
                  Group:
                    location.state.roundData.segments.back[0].segmentDetails
                      .Group,
                  Carrier:
                    location.state.roundData.segments.back[0].segmentDetails
                      .Carrier,
                  FareBasisCode: location.state.roundData.backFareBasisCode,
                  FlightNumber:
                    location.state.roundData.segments.back[0].segmentDetails
                      .FlightNumber,
                  Origin:
                    location.state.roundData.segments.back[0].segmentDetails
                      .Origin,
                  Destination:
                    location.state.roundData.segments.back[0].segmentDetails
                      .Destination,
                  DepartureTime:
                    location.state.roundData.segments.back[0].departureTime,
                  ArrivalTime:
                    location.state.roundData.segments.back[0].arrivalTime,
                  BookingCode:
                    location.state.roundData.segments.back[0].bookingcode,
                },
                {
                  AirSegmentKey:
                    location.state.roundData.segments.back[1].segmentDetails
                      .key,
                  Group:
                    location.state.roundData.segments.back[1].segmentDetails
                      .Group,
                  Carrier:
                    location.state.roundData.segments.back[1].segmentDetails
                      .Carrier,
                  FareBasisCode: location.state.roundData.backFareBasisCode,
                  FlightNumber:
                    location.state.roundData.segments.back[1].segmentDetails
                      .FlightNumber,
                  Origin:
                    location.state.roundData.segments.back[1].segmentDetails
                      .Origin,
                  Destination:
                    location.state.roundData.segments.back[1].segmentDetails
                      .Destination,
                  DepartureTime:
                    location.state.roundData.segments.back[1].departureTime,
                  ArrivalTime:
                    location.state.roundData.segments.back[1].arrivalTime,
                  BookingCode:
                    location.state.roundData.segments.back[1].bookingcode,
                },
              ]
            : [
                {
                  AirSegmentKey:
                    location.state.roundData.segments.back[0].segmentDetails
                      .key,
                  Group:
                    location.state.roundData.segments.back[0].segmentDetails
                      .Group,
                  Carrier:
                    location.state.roundData.segments.back[0].segmentDetails
                      .Carrier,
                  FareBasisCode: location.state.roundData.backFareBasisCode,
                  FlightNumber:
                    location.state.roundData.segments.back[0].segmentDetails
                      .FlightNumber,
                  Origin:
                    location.state.roundData.segments.back[0].segmentDetails
                      .Origin,
                  Destination:
                    location.state.roundData.segments.back[0].segmentDetails
                      .Destination,
                  DepartureTime:
                    location.state.roundData.segments.back[0].departureTime,
                  ArrivalTime:
                    location.state.roundData.segments.back[0].arrivalTime,
                  BookingCode:
                    location.state.roundData.segments.back[0].bookingcode,
                },
              ],
      },
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
      .then((res) => res.json())
      .then((data) => {
        if (data?.status !== "error" || data?.Error === null) {
          setLoadData(data);
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => {
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
    totalBaseFare = 0,
    totalTax = 0,
    totalFare = 0,
    serviceFeeAdult = 0,
    serviceFeeChild = 0,
    serviceFeeInfant = 0,
    discount = 0,
    agentTotal = 0,
    limitTime;

  if (Object.keys(loadData).length !== 0) {
    if (adultCount > 0) {
      adultPrice =
        location.state?.roundData?.system === "Sabre"
          ? loadData?.groupedItineraryResponse?.itineraryGroups[0]
              ?.itineraries[0]?.pricingInformation[0]?.fare
              ?.passengerInfoList[0]?.passengerInfo?.passengerTotalFare
              ?.equivalentAmount * location?.state?.adultCount
          : location?.state?.roundData?.system === "Galileo"
          ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.EquivalentBasePrice?.slice(
              3
            ) * location?.state?.adultCount
          : loadData?.Results[0].Fares[0].BaseFare *
            location?.state?.adultCount;

      adultTaxPrice =
        location.state?.roundData?.system === "Sabre"
          ? loadData.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare.passengerInfoList[0].passengerInfo
              .passengerTotalFare.totalTaxAmount * location.state?.adultCount
          : location.state?.roundData?.system === "Galileo"
          ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.Taxes?.slice(
              3
            ) *
              location.state?.adultCount +
            adultPrice
          : loadData?.Results[0]?.Fares[0]?.Tax * location.state?.adultCount;
      serviceFeeAdult =
        location.state?.roundData?.system === "Sabre"
          ? 0
          : location.state?.roundData?.system === "Galileo"
          ? 0
          : loadData?.Results[0]?.Fares[0]?.ServiceFee
          ? loadData?.Results[0]?.Fares[0]?.ServiceFee
          : 0 * location.state?.adultCount;
    }

    if (childCount > 0) {
      childPrice =
        location?.state?.roundData?.system === "Sabre"
          ? loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare.passengerInfoList[1].passengerInfo
              .passengerTotalFare.equivalentAmount * location.state?.childCount
          : location.state.roundData?.system === "Galileo"
          ? loadData.airAirPriceResult?.airAirPricingSolution[0]?.attributes.EquivalentBasePrice?.slice(
              3
            ) * location.state?.childCount
          : loadData?.Results[0]?.Fares[1]?.BaseFare *
            location.state?.childCount;
      childTaxPrice =
        location.state.roundData?.system === "Sabre"
          ? loadData.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare.passengerInfoList[1].passengerInfo
              .passengerTotalFare.totalTaxAmount * location.state?.childCount
          : location.state.roundData?.system === "Galileo"
          ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.Taxes?.slice(
              3
            ) *
              location.state?.childCount +
            childPrice
          : loadData?.Results[0]?.Fares[1]?.Tax * location.state?.childCount;
      serviceFeeChild =
        location.state?.roundData?.system === "Sabre"
          ? 0
          : location.state?.roundData?.system === "Galileo"
          ? 0
          : loadData?.Results[0]?.Fares[1]?.ServiceFee
          ? loadData?.Results[0]?.Fares[1]?.ServiceFee
          : 0 * location.state?.childCount;
    }

    if (infant > 0) {
      infPrice =
        location.state?.roundData?.system === "Sabre"
          ? loadData?.groupedItineraryResponse?.itineraryGroups[0]
              ?.itineraries[0]?.pricingInformation[1]?.fare.passengerInfoList[2]
              ?.passengerInfo?.passengerTotalFare?.equivalentAmount ||
            loadData?.groupedItineraryResponse?.itineraryGroups[0]
              ?.itineraries[0]?.pricingInformation[0]?.fare.passengerInfoList[1]
              ?.passengerInfo?.passengerTotalFare?.equivalentAmount *
              location.state?.infant
          : location.state.roundData?.system === "Galileo"
          ? loadData.airAirPriceResult?.airAirPricingSolution[0]?.attributes.EquivalentBasePrice?.slice(
              3
            ) * location.state?.infant
          : loadData?.Results[0]?.Fares[2]?.BaseFare ||
            loadData?.Results[0]?.Fares[1]?.BaseFare * location.state?.infant;

      infTaxPrice =
        location?.state?.roundData?.system === "Sabre"
          ? loadData.groupedItineraryResponse?.itineraryGroups[0]
              ?.itineraries[0]?.pricingInformation[1]?.fare.passengerInfoList[2]
              ?.passengerInfo?.passengerTotalFare?.totalTaxAmount ??
            loadData.groupedItineraryResponse?.itineraryGroups[0]
              ?.itineraries[0]?.pricingInformation[0]?.fare.passengerInfoList[1]
              ?.passengerInfo?.passengerTotalFare?.totalTaxAmount *
              location.state?.infant
          : location.state.roundData?.system === "Galileo"
          ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.Taxes?.slice(
              3
            ) * location.state?.infant
          : loadData?.Results[0]?.Fares[2]?.Tax ??
            loadData?.Results[0]?.Fares[1]?.Tax * location.state?.infant;
      serviceFeeInfant =
        location.state?.roundData?.system === "Sabre"
          ? 0
          : location.state?.roundData?.system === "Galileo"
          ? 0
          : loadData?.Results[0]?.Fares[2]?.ServiceFee
          ? loadData?.Results[0]?.Fares[2]?.ServiceFee
          : 0 * location.state?.infant;
    }

    totalTax =
      location.state?.roundData?.system === "Sabre"
        ? loadData.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
            .pricingInformation[0].fare.totalFare.totalTaxAmount
        : location.state.roundData?.system === "Galileo"
        ? loadData.airAirPriceResult?.airAirPricingSolution[0]?.attributes.Taxes?.slice(
            3
          )
        : adultTaxPrice + childTaxPrice + infTaxPrice;

    totalBaseFare =
      location.state.roundData?.system === "Sabre"
        ? adultPrice + childPrice + infPrice
        : location.state.roundData?.system === "Galileo"
        ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.EquivalentBasePrice?.slice(
            3
          )
        : adultPrice + childPrice + infPrice;

    totalFare =
      location.state.roundData?.system === "Sabre"
        ? totalBaseFare +
          totalTax +
          serviceFeeAdult +
          serviceFeeChild +
          serviceFeeInfant
        : location.state.roundData?.system === "Galileo"
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
        ? Number(location.state.roundData.price - 100)
        : Number(location.state.roundData.price);

    discount = Number(location.state.roundData.comission);

    limitTime =
      location.state.roundData?.system === "Sabre"
        ? new Date()
        : location.state.roundData?.system === "Galileo"
        ? new Date()
        : new Date();
  }

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
    <Box>
      {Object.keys(loadData).length !== 0 ? (
        <Container maxWidth="xxl">
          <Grid container>
            <Grid item xs={12} sm={9} md={9} lg={9}>
              <Box width={"100%"} px={"24px"}>
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
                    {location.state?.roundData.segment === "3" ? (
                      <>
                        {/*  For Go Flight 33*/}
                        <Box>
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
                                {
                                  location.state?.roundData?.segments?.go[0]
                                    ?.departure
                                }{" "}
                                -{" "}
                                {`${
                                  location.state?.roundData?.godepartureTime?.split(
                                    ":"
                                  )[0]
                                }:${
                                  location.state?.roundData?.godepartureTime?.split(
                                    ":"
                                  )[1]
                                }`}
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
                                {
                                  location.state?.roundData?.segments?.go[2]
                                    ?.arrival
                                }{" "}
                                -{" "}
                                {`${
                                  location.state?.roundData?.goarrivalTime?.split(
                                    ":"
                                  )[0]
                                }:${
                                  location.state?.roundData?.goarrivalTime?.split(
                                    ":"
                                  )[1]
                                }`}
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
                                {`${
                                  location.state?.roundData?.segments?.go[0]?.departureLocation?.split(
                                    ","
                                  )[0]
                                }:${
                                  location.state?.roundData?.segments?.go[0]?.departureLocation?.split(
                                    ","
                                  )[1]
                                }`}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  fontWeight: 500,
                                  color: "var(--gray-text-color)",
                                }}
                              >
                                {location.state?.roundData?.godepartureDate}
                              </Typography>
                            </Grid>
                            <Grid textAlign={"center"}>
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  fontWeight: 600,
                                  color: "var(--primary-color)",
                                }}
                              >
                                {
                                  location.state?.roundData?.segments?.go[0]?.arrivalLocation?.split(
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
                                {ArrivalTime1?.slice(0, 16)}
                              </Typography>
                            </Grid>
                            <Grid textAlign={"center"}>
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  fontWeight: 600,
                                  color: "var(--primary-color)",
                                }}
                              >
                                {
                                  location.state?.roundData?.segments?.go[1]?.arrivalLocation?.split(
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
                                {ArrivalTime2?.slice(0, 16)}
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
                                  location.state?.roundData?.segments?.go[1]?.arrivalLocation?.split(
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
                                {location.state?.roundData?.goarrivalDate}
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
                                location.state?.roundData?.segments?.go[0]
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
                                location.state?.roundData?.segments?.go[1]
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
                                        sx={{
                                          color: "#fff",
                                          fontSize: "10px",
                                        }}
                                      >
                                        Layover Time:{" "}
                                        {
                                          location.state?.roundData?.transit?.go
                                            .transit1
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
                                        sx={{
                                          color: "#fff",
                                          fontSize: "10px",
                                        }}
                                      >
                                        Layover Time:{" "}
                                        {
                                          location.state?.roundData?.transit?.go
                                            .transit2
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
                              <div className="round-segment-flight03">
                                <img src={anemy} width="50px" alt="flight" />
                              </div>
                            </div>
                          </Box>

                          <Grid
                            container
                            justifyContent={"space-around"}
                            mb={2}
                          >
                            <Grid>
                              <Grid container alignItems={"center"}>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.roundData?.segments.go[0]?.marketingcareer}.png`}
                                  width="40px"
                                  height="40px"
                                  alt="flight icon"
                                  className={
                                    location.state?.roundData?.system ===
                                    "Sabre"
                                      ? "img-border-sabre"
                                      : location.state?.roundData?.system ===
                                        "FlyHub"
                                      ? "img-border-flyhub"
                                      : "img-border-galileo"
                                  }
                                />
                                <Box>
                                  <Typography
                                    sx={{
                                      color: "#DC143C",
                                      fontSize: "12px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {location.state?.roundData?.careerName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {
                                      location.state?.roundData?.segments?.go[0]
                                        ?.marketingcareer
                                    }
                                    {
                                      location.state?.roundData?.segments?.go[0]
                                        ?.marketingflight
                                    }
                                    {" | Cabin Class: "}
                                    {
                                      location.state?.roundData?.segments?.go[0]
                                        ?.bookingcode
                                    }
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                            <Grid>
                              <Grid container alignItems={"center"}>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.roundData?.segments.go[1]?.marketingcareer}.png`}
                                  width="40px"
                                  height="40px"
                                  alt="flight icon"
                                  className={
                                    location.state?.roundData?.system ===
                                    "Sabre"
                                      ? "img-border-sabre"
                                      : location.state?.roundData?.system ===
                                        "FlyHub"
                                      ? "img-border-flyhub"
                                      : "img-border-galileo"
                                  }
                                />
                                <Box>
                                  <Typography
                                    sx={{
                                      color: "#DC143C",
                                      fontSize: "12px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {location.state?.roundData?.careerName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {
                                      location.state?.roundData?.segments?.go[1]
                                        ?.marketingcareer
                                    }

                                    {
                                      location.state?.roundData?.segments?.go[1]
                                        ?.marketingflight
                                    }
                                    {" | Cabin Class: "}
                                    {
                                      location.state?.roundData?.segments?.go[1]
                                        ?.bookingcode
                                    }
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                            <Grid>
                              <Grid container alignItems={"center"}>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.roundData?.segments.go[2]?.marketingcareer}.png`}
                                  width="40px"
                                  height="40px"
                                  alt="flight icon"
                                  className={
                                    location.state?.roundData?.system ===
                                    "Sabre"
                                      ? "img-border-sabre"
                                      : location.state?.roundData?.system ===
                                        "FlyHub"
                                      ? "img-border-flyhub"
                                      : "img-border-galileo"
                                  }
                                />
                                <Box>
                                  <Typography
                                    sx={{
                                      color: "#DC143C",
                                      fontSize: "12px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {location.state?.roundData?.careerName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {
                                      location.state?.roundData?.segments?.go[2]
                                        ?.marketingcareer
                                    }

                                    {
                                      location.state?.roundData?.segments?.go[2]
                                        ?.marketingflight
                                    }
                                    {" | Cabin Class: "}
                                    {
                                      location.state?.roundData?.segments?.go[2]
                                        ?.bookingcode
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
                                Class:{" "}
                                {location.state?.flightData?.class || "Economy"}
                              </Typography>
                              <Typography>
                                {location.state?.roundData?.refundable ===
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
                                {
                                  location.state?.roundData?.segments?.go[0]
                                    ?.seat
                                }{" "}
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
                                {location.state?.roundData?.goflightduration}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box my={4}></Box>
                        {/* For Back Flight 33 */}
                        <Box>
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
                            Return Flight
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
                                {
                                  location.state?.roundData?.segments?.back[0]
                                    ?.departure
                                }{" "}
                                -{" "}
                                {`${
                                  location.state?.roundData?.backdepartureTime?.split(
                                    ":"
                                  )[0]
                                }:${
                                  location.state?.roundData?.backdepartureTime?.split(
                                    ":"
                                  )[1]
                                }`}
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
                                {
                                  location.state?.roundData?.segments?.back[2]
                                    ?.arrival
                                }{" "}
                                -{" "}
                                {` ${
                                  location.state?.roundData?.backarrivalTime?.split(
                                    ":"
                                  )[0]
                                }:${
                                  location.state?.roundData?.backarrivalTime?.split(
                                    ":"
                                  )[1]
                                }`}
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
                                  location.state?.roundData?.segments?.back[0]?.departureLocation?.split(
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
                                {location.state?.roundData?.backdepartureDate}
                              </Typography>
                            </Grid>
                            <Grid>
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  fontWeight: 600,
                                  color: "var(--primary-color)",
                                }}
                              >
                                {
                                  location.state?.roundData?.segments?.back[0]?.arrivalLocation?.split(
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
                                {ArrivalTime1?.slice(0, 16)}
                              </Typography>
                            </Grid>
                            <Grid>
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  fontWeight: 600,
                                  color: "var(--primary-color)",
                                }}
                              >
                                {
                                  location.state?.roundData?.segments?.back[1]?.arrivalLocation?.split(
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
                                {ArrivalTime2?.slice(0, 16)}
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
                                  location.state?.roundData?.segments?.back[2]?.arrivalLocation?.split(
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
                                {location.state?.roundData?.backarrivalDate}
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
                                location.state?.roundData?.segments?.back[0]
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
                                location.state?.roundData?.segments?.back[1]
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
                                        sx={{
                                          color: "#fff",
                                          fontSize: "10px",
                                        }}
                                      >
                                        Layover Time:{" "}
                                        {
                                          location.state?.roundData?.transit
                                            ?.back?.transit1
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

                          <Grid
                            container
                            justifyContent={"space-around"}
                            mb={2}
                          >
                            <Grid>
                              <Grid container alignItems={"center"}>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.roundData?.segments.back[0]?.marketingcareer}.png`}
                                  width="40px"
                                  height="40px"
                                  alt="flight icon"
                                  className={
                                    location.state?.roundData?.system ===
                                    "Sabre"
                                      ? "img-border-sabre"
                                      : location.state?.roundData?.system ===
                                        "FlyHub"
                                      ? "img-border-flyhub"
                                      : "img-border-galileo"
                                  }
                                />
                                <Box>
                                  <Typography
                                    sx={{
                                      color: "#DC143C",
                                      fontSize: "12px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {location.state?.roundData?.careerName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[0]?.marketingcareer
                                    }

                                    {
                                      location.state?.roundData?.segments
                                        ?.back[0]?.marketingflight
                                    }
                                    {" | Cabin Class: "}
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[0]?.bookingcode
                                    }
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                            <Grid>
                              <Grid container alignItems={"center"}>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.roundData?.segments.back[1]?.marketingcareer}.png`}
                                  width="40px"
                                  height="40px"
                                  alt="flight icon"
                                  className={
                                    location.state?.roundData?.system ===
                                    "Sabre"
                                      ? "img-border-sabre"
                                      : location.state?.roundData?.system ===
                                        "FlyHub"
                                      ? "img-border-flyhub"
                                      : "img-border-galileo"
                                  }
                                />
                                <Box>
                                  <Typography
                                    sx={{
                                      color: "#DC143C",
                                      fontSize: "12px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {location.state?.roundData?.careerName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[1]?.marketingcareer
                                    }

                                    {
                                      location.state?.roundData?.segments
                                        ?.back[1]?.marketingflight
                                    }
                                    {" | Cabin Class: "}
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[1]?.bookingcode
                                    }
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                            <Grid>
                              <Grid container alignItems={"center"}>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.roundData?.segments.back[2]?.marketingcareer}.png`}
                                  width="40px"
                                  height="40px"
                                  alt="flight icon"
                                  className={
                                    location.state?.roundData?.system ===
                                    "Sabre"
                                      ? "img-border-sabre"
                                      : location.state?.roundData?.system ===
                                        "FlyHub"
                                      ? "img-border-flyhub"
                                      : "img-border-galileo"
                                  }
                                />
                                <Box>
                                  <Typography
                                    sx={{
                                      color: "#DC143C",
                                      fontSize: "12px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {location.state?.roundData?.careerName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[2]?.marketingcareer
                                    }

                                    {
                                      location.state?.roundData?.segments
                                        ?.back[2]?.marketingflight
                                    }
                                    {" | Cabin Class: "}
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[2]?.bookingcode
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
                                Class:{" "}
                                {location.state?.flightData?.class || "Economy"}
                              </Typography>
                              <Typography>
                                {location.state?.roundData?.refundable ===
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
                                {
                                  location.state?.roundData?.segments?.back[0]
                                    ?.seat
                                }{" "}
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
                                {location.state?.roundData?.backflightduration}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </>
                    ) : location.state?.roundData.segment === "2" ||
                      location.state?.roundData.segment === "22" ? (
                      <>
                        {/*  For Go Flight */}
                        <Box>
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
                                {/* {location.state?.roundData?.godeparture} -{" "} */}
                                {
                                  location.state?.roundData?.segments?.go[0]
                                    ?.departure
                                }{" "}
                                -{" "}
                                {`${
                                  location.state?.roundData?.godepartureTime?.split(
                                    ":"
                                  )[0]
                                }:${
                                  location.state?.roundData?.godepartureTime?.split(
                                    ":"
                                  )[1]
                                }`}
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
                                {/* {location.state?.roundData?.goarrival} -{" "} */}
                                {
                                  location.state?.roundData?.segments?.go[1]
                                    ?.arrival
                                }{" "}
                                -{" "}
                                {`${
                                  location.state?.roundData?.goarrivalTime?.split(
                                    ":"
                                  )[0]
                                }:${
                                  location.state?.roundData?.goarrivalTime?.split(
                                    ":"
                                  )[1]
                                }`}
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
                                  location.state?.roundData?.segments?.go[0]?.departureLocation?.split(
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
                                {location.state?.roundData?.godepartureDate}
                              </Typography>
                            </Grid>
                            <Grid textAlign={"center"}>
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  fontWeight: 600,
                                  color: "var(--primary-color)",
                                }}
                              >
                                {
                                  location.state?.roundData?.segments?.go[0]?.arrivalLocation?.split(
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
                                {ArrivalTime1?.slice(0, 16)}
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
                                  location.state?.roundData?.segments?.go[1]?.arrivalLocation?.split(
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
                                {location.state?.roundData?.goarrivalDate}
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
                                location.state?.roundData?.segments?.go[0]
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
                                location.state?.roundData?.segments?.go[1]
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
                                        sx={{
                                          color: "#fff",
                                          fontSize: "10px",
                                        }}
                                      >
                                        Layover Time:{" "}
                                        {
                                          location.state?.roundData?.transit?.go
                                            .transit1
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
                                <img src={anemy} width="50px" alt="flight" />
                              </div>
                            </div>
                          </Box>

                          <Grid
                            container
                            justifyContent={"space-around"}
                            mb={2}
                          >
                            <Grid>
                              <Grid container alignItems={"center"}>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.roundData?.segments.go[0]?.marketingcareer}.png`}
                                  width="40px"
                                  height="40px"
                                  alt="flight icon"
                                  className={
                                    location.state?.roundData?.system ===
                                    "Sabre"
                                      ? "img-border-sabre"
                                      : location.state?.roundData?.system ===
                                        "FlyHub"
                                      ? "img-border-flyhub"
                                      : "img-border-galileo"
                                  }
                                />
                                <Box>
                                  <Typography
                                    sx={{
                                      color: "#DC143C",
                                      fontSize: "12px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {location.state?.roundData?.careerName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {
                                      location.state?.roundData?.segments?.go[0]
                                        ?.marketingcareer
                                    }
                                    {
                                      location.state?.roundData?.segments?.go[0]
                                        ?.marketingflight
                                    }
                                    {" | Cabin Class: "}
                                    {
                                      location.state?.roundData?.segments?.go[0]
                                        ?.bookingcode
                                    }
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                            <Grid>
                              <Grid container alignItems={"center"}>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.roundData?.segments.go[1]?.marketingcareer}.png`}
                                  width="40px"
                                  height="40px"
                                  alt="flight icon"
                                  className={
                                    location.state?.roundData?.system ===
                                    "Sabre"
                                      ? "img-border-sabre"
                                      : location.state?.roundData?.system ===
                                        "FlyHub"
                                      ? "img-border-flyhub"
                                      : "img-border-galileo"
                                  }
                                />
                                <Box>
                                  <Typography
                                    sx={{
                                      color: "#DC143C",
                                      fontSize: "12px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {location.state?.roundData?.careerName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {
                                      location.state?.roundData?.segments?.go[1]
                                        ?.marketingcareer
                                    }
                                    {
                                      location.state?.roundData?.segments?.go[1]
                                        ?.marketingflight
                                    }
                                    {" | Cabin Class: "}
                                    {
                                      location.state?.roundData?.segments?.go[1]
                                        ?.bookingcode
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
                                Class:{" "}
                                {location.state?.flightData?.class || "Economy"}
                              </Typography>
                              <Typography>
                                {location.state?.roundData?.refundable ===
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
                                {
                                  location.state?.roundData?.segments?.go[0]
                                    ?.seat
                                }{" "}
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
                                {location.state?.roundData?.goflightduration}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box my={4}></Box>
                        {/* For Back Flight 22 */}
                        <Box>
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
                            Return Flight
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
                                {
                                  location.state?.roundData?.segments?.back[0]
                                    ?.departure
                                }{" "}
                                -{" "}
                                {`${
                                  location.state?.roundData?.backdepartureTime?.split(
                                    ":"
                                  )[0]
                                }:${
                                  location.state?.roundData?.backdepartureTime?.split(
                                    ":"
                                  )[1]
                                }`}
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
                                {
                                  location.state?.roundData?.segments?.back[1]
                                    ?.arrival
                                }{" "}
                                -{" "}
                                {` ${
                                  location.state?.roundData?.backarrivalTime?.split(
                                    ":"
                                  )[0]
                                }:${
                                  location.state?.roundData?.backarrivalTime?.split(
                                    ":"
                                  )[1]
                                }`}
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
                                  location.state?.roundData?.segments?.back[0]?.departureLocation?.split(
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
                                {location.state?.roundData?.backdepartureDate}
                              </Typography>
                            </Grid>
                            <Grid>
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  fontWeight: 600,
                                  color: "var(--primary-color)",
                                }}
                              >
                                {
                                  location.state?.roundData?.segments?.back[0]?.arrivalLocation?.split(
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
                                {ArrivalTime1?.slice(0, 16)}
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
                                  location.state?.roundData?.segments?.back[1]?.arrivalLocation?.split(
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
                                {location.state?.roundData?.backarrivalDate}
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
                                location.state?.roundData?.segments?.back[0]
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
                                location.state?.roundData?.segments?.back[1]
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
                                        sx={{
                                          color: "#fff",
                                          fontSize: "10px",
                                        }}
                                      >
                                        Layover Time:{" "}
                                        {
                                          location.state?.roundData?.transit
                                            ?.back.transit1
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

                          <Grid
                            container
                            justifyContent={"space-around"}
                            mb={2}
                          >
                            <Grid>
                              <Grid container alignItems={"center"}>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.roundData?.segments.back[0]?.marketingcareer}.png`}
                                  width="40px"
                                  height="40px"
                                  alt="flight icon"
                                  className={
                                    location.state?.roundData?.system ===
                                    "Sabre"
                                      ? "img-border-sabre"
                                      : location.state?.roundData?.system ===
                                        "FlyHub"
                                      ? "img-border-flyhub"
                                      : "img-border-galileo"
                                  }
                                />
                                <Box>
                                  <Typography
                                    sx={{
                                      color: "#DC143C",
                                      fontSize: "12px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {location.state?.roundData?.careerName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[0]?.marketingcareer
                                    }
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[0]?.marketingflight
                                    }
                                    {" | Cabin Class: "}
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[0]?.bookingcode
                                    }
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                            <Grid>
                              <Grid container alignItems={"center"}>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.roundData?.segments.back[1]?.marketingcareer}.png`}
                                  width="40px"
                                  height="40px"
                                  alt="flight icon"
                                  className={
                                    location.state?.roundData?.system ===
                                    "Sabre"
                                      ? "img-border-sabre"
                                      : location.state?.roundData?.system ===
                                        "FlyHub"
                                      ? "img-border-flyhub"
                                      : "img-border-galileo"
                                  }
                                />
                                <Box>
                                  <Typography
                                    sx={{
                                      color: "#DC143C",
                                      fontSize: "12px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {location.state?.roundData?.careerName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[1]?.marketingcareer
                                    }
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[1]?.marketingflight
                                    }
                                    {" | Cabin Class: "}
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[1]?.bookingcode
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
                                Class:{" "}
                                {location.state?.flightData?.class || "Economy"}
                              </Typography>
                              <Typography>
                                {location.state?.roundData?.refundable ===
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
                                {
                                  location.state?.roundData?.segments?.back[0]
                                    ?.seat
                                }{" "}
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
                                {location.state?.roundData?.backflightduration}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </>
                    ) : location.state?.roundData.segment === "12" ? (
                      <>
                        {/*  For Go Flight 12 */}
                        <Box>
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
                                {/* {location.state?.roundData?.godeparture} -{" "} */}
                                {
                                  location.state?.roundData?.segments?.go[0]
                                    ?.departure
                                }{" "}
                                -{" "}
                                {`${
                                  location.state?.roundData?.godepartureTime?.split(
                                    ":"
                                  )[0]
                                }:${
                                  location.state?.roundData?.godepartureTime?.split(
                                    ":"
                                  )[1]
                                }`}
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
                                {
                                  location.state?.roundData?.segments?.go[0]
                                    ?.arrival
                                }{" "}
                                -{" "}
                                {`${
                                  location.state?.roundData?.goarrivalTime?.split(
                                    ":"
                                  )[0]
                                }:${
                                  location.state?.roundData?.goarrivalTime?.split(
                                    ":"
                                  )[1]
                                }`}
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
                                  location.state?.roundData?.segments?.go[0]?.departureLocation?.split(
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
                                {location.state?.roundData?.godepartureDate}
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
                                  location.state?.roundData?.segments?.go[0]?.arrivalLocation?.split(
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
                                {location.state?.roundData?.goarrivalDate}
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
                              {location.state?.roundData?.goflightduration}
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
                                <img src={anemy} width="50px" alt="flight" />
                              </div>
                            </div>
                          </Box>

                          <Grid
                            container
                            justifyContent={"space-around"}
                            mb={2}
                          >
                            <Grid>
                              <Grid container alignItems={"center"}>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.roundData?.segments.go[0]?.marketingcareer}.png`}
                                  width="40px"
                                  height="40px"
                                  alt="flight icon"
                                  className={
                                    location.state?.roundData?.system ===
                                    "Sabre"
                                      ? "img-border-sabre"
                                      : location.state?.roundData?.system ===
                                        "FlyHub"
                                      ? "img-border-flyhub"
                                      : "img-border-galileo"
                                  }
                                />
                                <Box>
                                  <Typography
                                    sx={{
                                      color: "#DC143C",
                                      fontSize: "12px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {location.state?.roundData?.careerName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {
                                      location.state?.roundData?.segments?.go[0]
                                        ?.marketingcareer
                                    }
                                    {
                                      location.state?.roundData?.segments?.go[0]
                                        ?.marketingflight
                                    }
                                    {" | Cabin Class: "}
                                    {
                                      location.state?.roundData?.segments?.go[0]
                                        ?.bookingcode
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
                                Class:{" "}
                                {location.state?.flightData?.class || "Economy"}
                              </Typography>
                              <Typography>
                                {location.state?.roundData?.refundable ===
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
                                {
                                  location.state?.roundData?.segments?.go[0]
                                    ?.seat
                                }{" "}
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
                                {location.state?.roundData?.goflightduration}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box my={4}> </Box>
                        {/* For Back Flight 12 */}
                        <Box>
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
                            Return Flight
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
                                {
                                  location.state?.roundData?.segments?.back[0]
                                    ?.departure
                                }{" "}
                                -{" "}
                                {`${
                                  location.state?.roundData?.backdepartureTime?.split(
                                    ":"
                                  )[0]
                                }:${
                                  location.state?.roundData?.backdepartureTime?.split(
                                    ":"
                                  )[1]
                                }`}
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
                                {
                                  location.state?.roundData?.segments?.back[1]
                                    ?.arrival
                                }{" "}
                                -{" "}
                                {` ${
                                  location.state?.roundData?.backarrivalTime?.split(
                                    ":"
                                  )[0]
                                }:${
                                  location.state?.roundData?.backarrivalTime?.split(
                                    ":"
                                  )[1]
                                }`}
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
                                  location.state?.roundData?.segments?.back[0]?.departureLocation?.split(
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
                                {location.state?.roundData?.backdepartureDate}
                              </Typography>
                            </Grid>
                            <Grid>
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  fontWeight: 600,
                                  color: "var(--primary-color)",
                                }}
                              >
                                {
                                  location.state?.roundData?.segments?.back[0]?.arrivalLocation?.split(
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
                                {ArrivalTime1?.slice(0, 16)}
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
                                  location.state?.roundData?.segments?.back[1]?.arrivalLocation?.split(
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
                                {location.state?.roundData?.backarrivalDate}
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
                                location.state?.roundData?.segments?.back[0]
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
                                location.state?.roundData?.segments?.back[1]
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
                                        sx={{
                                          color: "#fff",
                                          fontSize: "10px",
                                        }}
                                      >
                                        Layover Time:{" "}
                                        {
                                          location.state?.roundData?.transit
                                            ?.back.transit1
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

                          <Grid
                            container
                            justifyContent={"space-around"}
                            mb={2}
                          >
                            <Grid>
                              <Grid container alignItems={"center"}>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.roundData?.segments.back[0]?.marketingcareer}.png`}
                                  width="40px"
                                  height="40px"
                                  alt="flight icon"
                                  className={
                                    location.state?.roundData?.system ===
                                    "Sabre"
                                      ? "img-border-sabre"
                                      : location.state?.roundData?.system ===
                                        "FlyHub"
                                      ? "img-border-flyhub"
                                      : "img-border-galileo"
                                  }
                                />
                                <Box>
                                  <Typography
                                    sx={{
                                      color: "#DC143C",
                                      fontSize: "12px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {location.state?.roundData?.careerName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[0]?.marketingcareer
                                    }
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[0]?.marketingflight
                                    }
                                    {" | Cabin Class: "}
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[0]?.bookingcode
                                    }
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                            <Grid>
                              <Grid container alignItems={"center"}>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.roundData?.segments.back[1]?.marketingcareer}.png`}
                                  width="40px"
                                  height="40px"
                                  alt="flight icon"
                                  className={
                                    location.state?.roundData?.system ===
                                    "Sabre"
                                      ? "img-border-sabre"
                                      : location.state?.roundData?.system ===
                                        "FlyHub"
                                      ? "img-border-flyhub"
                                      : "img-border-galileo"
                                  }
                                />
                                <Box>
                                  <Typography
                                    sx={{
                                      color: "#DC143C",
                                      fontSize: "12px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {location.state?.roundData?.careerName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[1]?.marketingcareer
                                    }
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[1]?.marketingflight
                                    }
                                    {" | Cabin Class: "}
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[1]?.bookingcode
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
                                Class:{" "}
                                {location.state?.flightData?.class || "Economy"}
                              </Typography>
                              <Typography>
                                {location.state?.roundData?.refundable ===
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
                                {
                                  location.state?.roundData?.segments?.back[0]
                                    ?.seat
                                }{" "}
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
                                {location.state?.roundData?.backflightduration}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </>
                    ) : location.state?.roundData.segment === "21" ? (
                      <>
                        {/*  For Go Flight */}
                        <Box>
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
                                {
                                  location.state?.roundData?.segments?.go[0]
                                    ?.departure
                                }{" "}
                                -{" "}
                                {`${
                                  location.state?.roundData?.godepartureTime?.split(
                                    ":"
                                  )[0]
                                }:${
                                  location.state?.roundData?.godepartureTime?.split(
                                    ":"
                                  )[1]
                                }`}
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
                                {
                                  location.state?.roundData?.segments?.go[1]
                                    ?.arrival
                                }{" "}
                                -{" "}
                                {`${
                                  location.state?.roundData?.goarrivalTime?.split(
                                    ":"
                                  )[0]
                                }:${
                                  location.state?.roundData?.goarrivalTime?.split(
                                    ":"
                                  )[1]
                                }`}
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
                                  location.state?.roundData?.segments?.go[0]?.departureLocation?.split(
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
                                {location.state?.roundData?.godepartureDate}
                              </Typography>
                            </Grid>
                            <Grid>
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  fontWeight: 600,
                                  color: "var(--primary-color)",
                                }}
                              >
                                {
                                  location.state?.roundData?.segments?.go[0]?.arrivalLocation?.split(
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
                                {ArrivalTime1?.slice(0, 16)}
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
                                  location.state?.roundData?.segments?.go[0]?.arrivalLocation?.split(
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
                                {location.state?.roundData?.goarrivalDate}
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
                                location.state?.roundData?.segments?.go[0]
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
                                location.state?.roundData?.segments?.go[1]
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
                                        sx={{
                                          color: "#fff",
                                          fontSize: "10px",
                                        }}
                                      >
                                        Layover Time:{" "}
                                        {
                                          location.state?.roundData?.transit?.go
                                            .transit2
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

                          <Grid
                            container
                            justifyContent={"space-around"}
                            mb={2}
                          >
                            <Grid>
                              <Grid container alignItems={"center"}>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.roundData?.segments.go[0]?.marketingcareer}.png`}
                                  width="40px"
                                  height="40px"
                                  alt="flight icon"
                                  className={
                                    location.state?.roundData?.system ===
                                    "Sabre"
                                      ? "img-border-sabre"
                                      : location.state?.roundData?.system ===
                                        "FlyHub"
                                      ? "img-border-flyhub"
                                      : "img-border-galileo"
                                  }
                                />
                                <Box>
                                  <Typography
                                    sx={{
                                      color: "#DC143C",
                                      fontSize: "12px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {location.state?.roundData?.careerName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {
                                      location.state?.roundData?.segments?.go[0]
                                        ?.marketingcareer
                                    }
                                    {
                                      location.state?.roundData?.segments?.go[0]
                                        ?.marketingflight
                                    }
                                    {" | Cabin Class: "}
                                    {
                                      location.state?.roundData?.segments?.go[0]
                                        ?.bookingcode
                                    }
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                            <Grid>
                              <Grid container alignItems={"center"}>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.roundData?.segments.go[1]?.marketingcareer}.png`}
                                  width="40px"
                                  height="40px"
                                  alt="flight icon"
                                  className={
                                    location.state?.roundData?.system ===
                                    "Sabre"
                                      ? "img-border-sabre"
                                      : location.state?.roundData?.system ===
                                        "FlyHub"
                                      ? "img-border-flyhub"
                                      : "img-border-galileo"
                                  }
                                />
                                <Box>
                                  <Typography
                                    sx={{
                                      color: "#DC143C",
                                      fontSize: "12px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {location.state?.roundData?.careerName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {
                                      location.state?.roundData?.segments?.go[1]
                                        ?.marketingcareer
                                    }
                                    {
                                      location.state?.roundData?.segments?.go[1]
                                        ?.marketingflight
                                    }
                                    {" | Cabin Class: "}
                                    {
                                      location.state?.roundData?.segments?.go[1]
                                        ?.bookingcode
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
                                Class:{" "}
                                {location.state?.flightData?.class || "Economy"}
                              </Typography>
                              <Typography>
                                {location.state?.roundData?.refundable ===
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
                                {
                                  location.state?.roundData?.segments?.go[0]
                                    ?.seat
                                }{" "}
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
                                {location.state?.roundData?.goflightduration}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box my={4}></Box>
                        {/* For Back Flight */}
                        <Box>
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
                            Return Flight
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
                                {
                                  location.state?.roundData?.segments?.back[0]
                                    ?.departure
                                }{" "}
                                -{" "}
                                {`${
                                  location.state?.roundData?.backdepartureTime?.split(
                                    ":"
                                  )[0]
                                }:${
                                  location.state?.roundData?.backdepartureTime?.split(
                                    ":"
                                  )[1]
                                }`}
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
                                {
                                  location.state?.roundData?.segments?.back[0]
                                    ?.arrival
                                }{" "}
                                -{" "}
                                {` ${
                                  location.state?.roundData?.backarrivalTime?.split(
                                    ":"
                                  )[0]
                                }:${
                                  location.state?.roundData?.backarrivalTime?.split(
                                    ":"
                                  )[1]
                                }`}
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
                                  location.state?.roundData?.segments?.back[0]?.departureLocation?.split(
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
                                {location.state?.roundData?.backdepartureDate}
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
                                  location.state?.roundData?.segments?.back[0]?.arrivalLocation?.split(
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
                                {location.state?.roundData?.backarrivalDate}
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
                              {location.state?.roundData?.backflightduration}
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

                          <Grid
                            container
                            justifyContent={"space-around"}
                            mb={2}
                          >
                            <Grid>
                              <Grid container alignItems={"center"}>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.roundData?.segments.back[0]?.marketingcareer}.png`}
                                  width="40px"
                                  height="40px"
                                  alt="flight icon"
                                  className={
                                    location.state?.roundData?.system ===
                                    "Sabre"
                                      ? "img-border-sabre"
                                      : location.state?.roundData?.system ===
                                        "FlyHub"
                                      ? "img-border-flyhub"
                                      : "img-border-galileo"
                                  }
                                />
                                <Box>
                                  <Typography
                                    sx={{
                                      color: "#DC143C",
                                      fontSize: "12px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {location.state?.roundData?.careerName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[0]?.marketingcareer
                                    }
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[0]?.marketingflight
                                    }
                                    {" | Cabin Class: "}
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[0]?.bookingcode
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
                                Class:{" "}
                                {location.state?.flightData?.class || "Economy"}
                              </Typography>
                              <Typography>
                                {location.state?.roundData?.refundable ===
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
                                {
                                  location.state?.roundData?.segments?.back[0]
                                    ?.seat
                                }{" "}
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
                                {location.state?.roundData?.backflightduration}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box>
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
                                {
                                  location.state?.roundData?.segments?.go[0]
                                    ?.departure
                                }{" "}
                                -{" "}
                                {`${
                                  location.state?.roundData?.godepartureTime?.split(
                                    ":"
                                  )[0]
                                }:${
                                  location.state?.roundData?.godepartureTime?.split(
                                    ":"
                                  )[1]
                                }`}
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
                                {
                                  location.state?.roundData?.segments.go[0]
                                    ?.arrival
                                }{" "}
                                -{" "}
                                {`${
                                  location.state?.roundData?.goarrivalTime?.split(
                                    ":"
                                  )[0]
                                }:${
                                  location.state?.roundData?.goarrivalTime?.split(
                                    ":"
                                  )[1]
                                }`}
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
                                  location.state?.roundData?.segments?.go[0]?.departureLocation?.split(
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
                                {location.state?.roundData?.godepartureDate}
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
                                  location.state?.roundData?.segments?.go[0]?.arrivalLocation?.split(
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
                                {location.state?.roundData?.goarrivalDate}
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
                              {location.state?.roundData?.goflightduration}
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

                          <Grid
                            container
                            justifyContent={"space-around"}
                            mb={2}
                          >
                            <Grid>
                              <Grid container alignItems={"center"}>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.roundData?.segments.go[0]?.marketingcareer}.png`}
                                  width="40px"
                                  height="40px"
                                  alt="flight icon"
                                  className={
                                    location.state?.roundData?.system ===
                                    "Sabre"
                                      ? "img-border-sabre"
                                      : location.state?.roundData?.system ===
                                        "FlyHub"
                                      ? "img-border-flyhub"
                                      : "img-border-galileo"
                                  }
                                />
                                <Box>
                                  <Typography
                                    sx={{
                                      color: "#DC143C",
                                      fontSize: "12px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {location.state?.roundData?.careerName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {
                                      location.state?.roundData?.segments?.go[0]
                                        ?.marketingcareer
                                    }
                                    {
                                      location.state?.roundData?.segments?.go[0]
                                        ?.marketingflight
                                    }
                                    {" | Cabin Class: "}
                                    {
                                      location.state?.roundData?.segments?.go[0]
                                        ?.bookingcode
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
                                Class:{" "}
                                {location.state?.flightData?.class || "Economy"}
                              </Typography>
                              <Typography>
                                {location.state?.roundData?.refundable ===
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
                                {
                                  location.state?.roundData?.segments?.go[0]
                                    ?.seat
                                }{" "}
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
                                {location.state?.roundData?.goflightduration}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box my={4}></Box>
                        {/* For Back Flight */}
                        <Box>
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
                            Return Flight
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
                                {
                                  location.state?.roundData?.segments?.back[0]
                                    ?.departure
                                }{" "}
                                -{" "}
                                {`${
                                  location.state?.roundData?.backdepartureTime?.split(
                                    ":"
                                  )[0]
                                }:${
                                  location.state?.roundData?.backdepartureTime?.split(
                                    ":"
                                  )[1]
                                }`}
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
                                {
                                  location.state?.roundData?.segments?.back[0]
                                    ?.arrival
                                }{" "}
                                -{" "}
                                {` ${
                                  location.state?.roundData?.backarrivalTime?.split(
                                    ":"
                                  )[0]
                                }:${
                                  location.state?.roundData?.backarrivalTime?.split(
                                    ":"
                                  )[1]
                                }`}
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
                                  location.state?.roundData?.segments?.back[0]?.departureLocation?.split(
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
                                {location.state?.roundData?.backdepartureDate}
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
                                  location.state?.roundData?.segments?.back[0]?.arrivalLocation?.split(
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
                                {location.state?.roundData?.backarrivalDate}
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
                              {location.state?.roundData?.backflightduration}
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

                          <Grid
                            container
                            justifyContent={"space-around"}
                            mb={2}
                          >
                            <Grid>
                              <Grid container alignItems={"center"}>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.roundData?.segments.back[0]?.marketingcareer}.png`}
                                  width="40px"
                                  height="40px"
                                  alt="flight icon"
                                  className={
                                    location.state?.roundData?.system ===
                                    "Sabre"
                                      ? "img-border-sabre"
                                      : location.state?.roundData?.system ===
                                        "FlyHub"
                                      ? "img-border-flyhub"
                                      : "img-border-galileo"
                                  }
                                />
                                <Box>
                                  <Typography
                                    sx={{
                                      color: "#DC143C",
                                      fontSize: "12px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {location.state?.roundData?.careerName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[0]?.marketingcareer
                                    }
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[0]?.marketingflight
                                    }
                                    {" | Cabin Class: "}
                                    {
                                      location.state?.roundData?.segments
                                        ?.back[0]?.bookingcode
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
                                Class:{" "}
                                {location.state?.flightData?.class || "Economy"}
                              </Typography>
                              <Typography>
                                {location.state?.roundData?.refundable ===
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
                                {
                                  location.state?.roundData?.segments?.back[0]
                                    ?.seat
                                }{" "}
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
                                {location.state?.roundData?.backflightduration}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </>
                    )}
                  </AccordionDetails>
                </Accordion>{" "}
              </Box>
              {/* Flight infprmaton Details start */}
              <Box mt={3}>
                {location.state?.roundData.system === "Galileo" ? (
                  <ReturnFlightUserInfo
                    tripType={location.state?.tripType}
                    userData={location.state}
                    searchResult={loadData}
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
                    totalTax={totalTax}
                    totalFare={totalFare}
                    totalBaseFare={totalBaseFare}
                    limitTime={limitTime}
                    isLoaded={isLoaded}
                    setIsLoaded={setIsLoaded}
                    clientFare={location.state.clientFare}
                    coupon={coupon}
                    setCoupon={setCoupon}
                    couponAppliedMessage={couponAppliedMessage}
                    setCouponAppliedMessage={setCouponAppliedMessage}
                    goAdultBaggage={goAdultBagage}
                    setGoAdultBaggage={setGoAdultBagage}
                    goChildBaggage={goChildBagage}
                    setGoChildBaggage={setGoChildBagage}
                    goInfantBaggage={goInfatBagage}
                    setGoInfatBaggage={setGoInfatBagage}
                    backAdultBaggage={backAdultBagage}
                    setBackAdultBaggage={setBackAdultBagage}
                    backChildBaggage={backChildBagage}
                    setBackChildBaggage={setBackChildBagage}
                    backInfantBaggage={backInfantBagage}
                    setBackInfantBaggage={setBackInfantBagage}
                  />
                ) : location.state?.roundData.system === "Sabre" ? (
                  <ReturnFlightUserInfoSabre
                    tripType={location.state?.tripType}
                    userData={location.state}
                    searchResult={loadData}
                    adultCount={location?.state?.adultCount}
                    childCount={location?.state?.childCount}
                    infant={location?.state?.infant}
                    adultPrice={adultPrice}
                    childPrice={childPrice}
                    infPrice={infPrice}
                    adultTaxPrice={adultTaxPrice}
                    childTaxPrice={childTaxPrice}
                    serviceFeeAdult={serviceFeeAdult}
                    serviceFeeChild={serviceFeeChild}
                    serviceFeeInfant={serviceFeeInfant}
                    infTaxPrice={infTaxPrice}
                    totalTax={totalTax}
                    totalFare={totalFare}
                    totalBaseFare={totalBaseFare}
                    limitTime={limitTime}
                    isLoaded={isLoaded}
                    setIsLoaded={setIsLoaded}
                    clientFare={location.state.clientFare}
                    coupon={coupon}
                    setCoupon={setCoupon}
                    couponAppliedMessage={couponAppliedMessage}
                    setCouponAppliedMessage={setCouponAppliedMessage}
                    goAdultBaggage={goAdultBagage}
                    setGoAdultBaggage={setGoAdultBagage}
                    goChildBaggage={goChildBagage}
                    setGoChildBaggage={setGoChildBagage}
                    goInfantBaggage={goInfatBagage}
                    setGoInfatBaggage={setGoInfatBagage}
                    backAdultBaggage={backAdultBagage}
                    setBackAdultBaggage={setBackAdultBagage}
                    backChildBaggage={backChildBagage}
                    setBackChildBaggage={setBackChildBagage}
                    backInfantBaggage={backInfantBagage}
                    setBackInfantBaggage={setBackInfantBagage}
                  />
                ) : (
                  <ReturnFlightUserInfoFlyHub
                    tripType={location.state?.tripType}
                    userData={location.state}
                    searchResult={loadData}
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
                    totalTax={totalTax}
                    totalFare={totalFare}
                    totalBaseFare={totalBaseFare}
                    limitTime={limitTime}
                    isLoaded={isLoaded}
                    setIsLoaded={setIsLoaded}
                    clientFare={location.state.clientFare}
                    coupon={coupon}
                    setCoupon={setCoupon}
                    couponAppliedMessage={couponAppliedMessage}
                    setCouponAppliedMessage={setCouponAppliedMessage}
                    goAdultBaggage={goAdultBagage}
                    setGoAdultBaggage={setGoAdultBagage}
                    goChildBaggage={goChildBagage}
                    setGoChildBaggage={setGoChildBagage}
                    goInfantBaggage={goInfatBagage}
                    setGoInfatBaggage={setGoInfatBagage}
                    backAdultBaggage={backAdultBagage}
                    setBackAdultBaggage={setBackAdultBagage}
                    backChildBaggage={backChildBagage}
                    setBackChildBaggage={setBackChildBagage}
                    backInfantBaggage={backInfantBagage}
                    setBackInfantBaggage={setBackInfantBagage}
                    balance={balance}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <RoundFlightInfoDetails
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
                totalTax={totalTax}
                totalFare={totalFare}
                totalBaseFare={totalBaseFare}
                limitTime={limitTime}
                clientFare={location.state.clientFare}
                agentTotal={agentTotal}
                discount={discount}
                coupon={coupon}
                setCoupon={setCoupon}
                couponAppliedMessage={couponAppliedMessage}
                setCouponAppliedMessage={setCouponAppliedMessage}
                goAdultBagage={goAdultBagage}
                setGoAdultBagage={setGoAdultBagage}
                goChildBagage={goChildBagage}
                setGoChildBagage={setGoChildBagage}
                goInfatBagage={goInfatBagage}
                setGoInfatBagage={setGoInfatBagage}
                backAdultBagage={backAdultBagage}
                setBackAdultBagage={setBackAdultBagage}
                backChildBagage={backChildBagage}
                setBackChildBagage={setBackChildBagage}
                backInfantBagage={backInfantBagage}
                setBackInfantBagage={setBackInfantBagage}
              />
            </Grid>
          </Grid>
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
    </Box>
  );
};

export default RoundTripFlightInfo;
