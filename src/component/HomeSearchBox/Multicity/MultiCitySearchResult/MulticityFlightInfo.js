import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../images/loader/Render.gif";
import NotFound from "../../images/undraw/undraw_not_found_re_bh2e.svg";
import FlightIcon from "@mui/icons-material/Flight";
import { format } from "date-fns";
import Header from "../../components/Header/Header";
import { MultiCityFlightInfoDetails } from "../MultiCityFlightInfoDetails/MultiCityFlightInfoDetails";
import MultiCityUserInfo from "../MultiCityUserInfo/MultiCityUserInfo";

const MulticityFlightInfo = () => {
  const location = useLocation();
  const [loadData, setLoadData] = useState([]);
  const { adultCount, childCount, infant } = location.state;
  const [isLoaded, setIsLoaded] = useState(true);
  const navigate = useNavigate();
  //todo: cupon
  const [coupon, setCoupon] = useState("");
  const [couponAppliedMessage, setCouponAppliedMessage] = useState({});
  //todo:end cupon
  //todo: Baggage Information
  const [adultBaggage, setAdultBaggage] = useState(0);
  const [childBaggage, setChildBaggage] = useState(0);
  const [infantBaggage, setInfantBaggage] = useState(0);
  //todo: End Baggage Information end
  //todo: Markup Information
  const [markup, setMarkup] = useState(0);

  useEffect(() => {
    let url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/MyAccount/all.php?website=${window.location.hostname.replace(
      "www.",
      ""
    )}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMarkup(0);
      });
  }, []);

  let url;
  let body;
  let segments = [];
  location.state?.flightData?.segments?.map((data) =>
    segments.push({
      departure: data.departure,
      arrival: data.arrival,
      dpTime: data.departureTime,
      arrTime: data.arrivalTime,
      bCode: data.bookingcode,
      mCarrier: data.marketingcareer,
      mCarrierFN: data.marketingflight,
      oCarrier: data.marketingcareer,
      oCarrierFN: data.operatingflight,
    })
  );

  if (location.state?.flightData?.system === "Sabre") {
    url = "https://api.flyfarint.com/v.1.0.0/Sabre/AirPrice.php";
    body = {
      adultCount: adultCount,
      childCount: childCount,
      infantCount: infant,
      segment: location.state.flightData.segment,
      tripType: location.state.tripType,
      segments: segments,
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
      tripType: location.state.tripType,
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
          // console.log(data);
          setLoadData(data);
        } else {
          throw new Error(data);
        }
      })
      .catch((err) => {
        //console.log(err);
        Swal.fire({
          imageUrl: NotFound,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "No Data Found",
          confirmButtonText: "Search Another Flights...",
          confirmButtonColor: "var(--primary-color)",
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
    otherCharges = 0,
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
    otherCharges =
      location.state?.flightData?.system === "Sabre"
        ? 0
        : location.state.flightData?.system === "Galileo"
        ? 0
        : Number.parseInt(loadData?.Results[0]?.Fares[0]?.OtherCharges || 0);
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
          serviceFeeInfant +
          otherCharges;

    agentTotal = Number(location.state.agentFare);
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
  const marcketingCareerCode = location?.state?.flightData?.segments
    .map((data) => data?.marketingcareerName)
    .filter((value, index, arr) => arr.indexOf(value) === index);

  return (
    <Box>
      <Header />
      {Object.keys(loadData).length !== 0 ? (
        <Container>
          <Grid container mt={5}>
            <Grid item xs={12} sm={9} md={12} lg={12}>
              <Grid container>
                <Grid item xs={12} sm={3} md={6} lg={6}>
                  <Box>
                    <Box style={{ padding: "5px 0" }}>
                      <Typography
                        style={{
                          fontSize: "22px",
                          fontWeight: "500",
                          color: "#222222",
                        }}
                      >
                        Flight Information Details
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "13px",
                          fontWeight: "500",
                          color: "var(--primary-color)",
                        }}
                      >
                        {marcketingCareerCode?.map((data) => data)}
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        margin: "10px 0px 20px 0",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <Typography className="flight-details-title">
                        {`${
                          location?.state?.flightData?.segments[0]?.departure
                        }:${format(
                          new Date(
                            location?.state?.flightData?.segments[0]?.departureTime
                          ),
                          "hh:mm a"
                        )}`}
                      </Typography>
                      <FlightIcon sx={{ transform: "rotate(90deg)" }} />
                      <Typography className="flight-details-title">
                        {`${
                          location?.state?.flightData?.segments[
                            location?.state?.flightData?.segments.length - 1
                          ].arrival
                        }:${format(
                          new Date(
                            location?.state?.flightData?.segments[
                              location?.state?.flightData?.segments.length - 1
                            ].arrivalTime
                          ),
                          "hh:mm a"
                        )}`}
                      </Typography>
                      <Typography className="flight-details-title">
                        {location?.state?.flightData?.segment === 1 ? (
                          "Non Stop"
                        ) : (
                          <>
                            {location?.state?.flightData?.segment - 1} Stop(s)
                          </>
                        )}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          color: "var(--secondary-color)",
                        }}
                      >
                        {location?.state?.flightData?.flightduration}
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        width: "100%",
                        overflow: "auto",
                        padding: "0px 15px",
                      }}
                      className="flight-accordian2 no-scrollbar"
                    >
                      {location?.state?.flightData?.segments?.map(
                        (data, index, arr) => (
                          <Box>
                            <Grid container justifyContent={"space-between"}>
                              <Box>
                                <Box
                                  style={{
                                    borderLeft:
                                      "2px solid var(--primary-color)",
                                    position: "absulote",
                                  }}
                                >
                                  <Box
                                    style={{
                                      display: "flex",
                                      marginLeft: "10px",
                                    }}
                                  >
                                    <Box position="relative">
                                      <Box
                                        sx={{
                                          width: "20px",
                                          height: "20px",
                                          backgroundColor:
                                            "var(--primary-color)",
                                          position: "absolute",
                                          borderRadius: "50%",
                                          left: "-20px",
                                          display:
                                            index !== 0 ? "none" : "block",
                                        }}
                                      ></Box>
                                      <FlightIcon
                                        style={{
                                          transform: "rotate(180deg)",
                                          fontSize: "35px",
                                          position: "absolute",
                                          top: "40px",
                                          left: "-29px",
                                          color: "var(--secondary-color)",
                                          display:
                                            index !== 0 ? "none" : "block",
                                        }}
                                      />
                                    </Box>

                                    <Box sx={{ margin: "0px 0 10px 20px" }}>
                                      <Box
                                        sx={{
                                          display:
                                            index !== 0 ? "none" : "block",
                                        }}
                                      >
                                        <Typography
                                          style={{
                                            fontWeight: "500",
                                            fontSize: "16px",
                                            color: "#222222",
                                          }}
                                        >
                                          {data?.departure}
                                          <span
                                            style={{
                                              color: "var(--secondary-color)",
                                              padding: "0px 10px",
                                            }}
                                          >
                                            {new Date(data.departureTime)
                                              ?.toTimeString()
                                              ?.split(" ")
                                              ?.at(0)
                                              .slice(0, 5)}
                                          </span>
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontWeight: "500",
                                            fontSize: "13px",
                                            color: "#222222",
                                          }}
                                        >
                                          {data?.departureAirport}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontWeight: "500",
                                            fontSize: "12px",
                                            color: "var(--secondary-color)",
                                          }}
                                        >
                                          {
                                            location.state?.flightData
                                              ?.departureDate
                                          }
                                        </Typography>
                                      </Box>
                                      <Box
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "5px",
                                        }}
                                        my={3}
                                      >
                                        <Box
                                          sx={{
                                            width: "50px",
                                            height: "50px",
                                            mr: "10px",
                                          }}
                                        >
                                          <img
                                            src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data?.marketingcareer}.png`}
                                            className={`${location.state?.flightData?.system.toLowerCase()}`}
                                            alt={`${data?.marketingcareer}`}
                                          />
                                        </Box>
                                        <Box>
                                          <Typography
                                            style={{
                                              fontSize: "15px",
                                              fontWeight: "500",
                                              color: "#222222",
                                            }}
                                          >
                                            {data?.marketingcareerName}
                                          </Typography>
                                          <Typography
                                            style={{
                                              fontSize: "12px",
                                              fontWeight: "500",
                                              color: "var(--primary-color)",
                                            }}
                                          >
                                            {data?.marketingcareer}
                                            &nbsp;
                                            {data?.marketingflight} || Flight
                                            Duration: {data?.flightduration}
                                          </Typography>
                                        </Box>
                                      </Box>
                                      <Box>
                                        <Typography
                                          style={{
                                            fontWeight: "500",
                                            fontSize: "16px",
                                            color: "#222222",
                                          }}
                                        >
                                          {data?.arrival} -{" "}
                                          <span
                                            style={{
                                              color: "var(--secondary-color)",
                                              padding: "0px 10px",
                                            }}
                                          >
                                            {new Date(data.arrivalTime)
                                              ?.toTimeString()
                                              ?.split(" ")
                                              ?.at(0)
                                              .slice(0, 5)}
                                          </span>
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontWeight: "500",
                                            fontSize: "13px",
                                            color: "#222222",
                                          }}
                                        >
                                          {data?.arrivalAirport}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontWeight: "500",
                                            fontSize: "12px",
                                            color: "var(--secondary-color)",
                                            marginBottom: "5px",
                                          }}
                                        >
                                          {
                                            location.state?.flightData
                                              ?.arrivalDate
                                          }
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontWeight: "500",
                                            fontSize: "12px",
                                            color: "var(--secondary-color)",
                                            marginBottom: "5px",
                                            display:
                                              index === arr.length - 1
                                                ? "none"
                                                : "block",
                                          }}
                                        >
                                          {index === 0 && (
                                            <>
                                              <span
                                                style={{
                                                  color: "var(--primary-color)",
                                                }}
                                              >
                                                Transit Time:{" "}
                                                {
                                                  location?.state?.flightData
                                                    ?.transit?.transit1
                                                }
                                              </span>
                                              <br />
                                              {(arr.length === 2 ||
                                                arr.length === 3) && (
                                                <>
                                                  {`Departure Date & Time: ${format(
                                                    new Date(
                                                      location?.state?.flightData?.segments[1]?.departureTime
                                                    ),
                                                    "EE MM dd yyyy || hh:mm a"
                                                  )}`}
                                                </>
                                              )}
                                            </>
                                          )}
                                          {index === 1 && (
                                            <>
                                              <span
                                                style={{
                                                  color: "var(--primary-color)",
                                                }}
                                              >
                                                Transit Time:{" "}
                                                {
                                                  location?.state?.flightData
                                                    ?.transit?.transit2
                                                }
                                              </span>
                                              <br />
                                              {arr.length === 3 && (
                                                <>
                                                  {`Departure Date & Time: ${format(
                                                    new Date(
                                                      location?.state?.flightData?.segments[2]?.departureTime
                                                    ),
                                                    "EE MM dd yyyy || hh:mm a"
                                                  )}`}
                                                </>
                                              )}
                                            </>
                                          )}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>

                              {/* ---------------------- ------------------------------------ */}
                            </Grid>
                          </Box>
                        )
                      )}
                    </Box>
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      padding: "10px 50px",
                    }}
                    mt={1}
                  >
                    <Typography
                      style={{
                        color: "var(--primary-color)",
                        fontSize: "16px",

                        fontWeight: 400,
                      }}
                    >
                      {location.state?.flightData?.refundable}
                    </Typography>

                    <Typography
                      style={{
                        color: "var(--primary-color)",
                        fontSize: "16px",

                        fontWeight: 400,
                        padding: "0px 0 0 10px",
                      }}
                    >
                      {location.state?.flightData?.seat} Seats
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={3} md={6} lg={6}>
                  {/*// todo: price breakdown section */}
                  <MultiCityFlightInfoDetails
                    otherCharges={otherCharges}
                    markup={markup}
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
                    cabin={location.state?.flightData?.segments[0]?.bookingcode}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={9} md={12} lg={12}>
              <Box mt={3}>
                <MultiCityUserInfo
                  otherCharges={otherCharges}
                  markup={markup}
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
                />
              </Box>
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

export default MulticityFlightInfo;
