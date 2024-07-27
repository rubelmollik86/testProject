import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  Container,
  Collapse,
  Stack,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import commaNumber from "comma-number";
import secureLocalStorage from "react-secure-storage";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import WorkIcon from "@mui/icons-material/Work";
import Loader from "../../../Assets/Ladies/loader/Render.gif";
import { format } from "date-fns";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CircleIcon from "@mui/icons-material/Circle";
import { styled } from "@mui/material/styles";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
// import AirLineName from "./AirLineName";
// import CommissionInvoice from "./CommissionInvoice";
import { fontWeight } from "@mui/system";
import { IoAirplaneSharp } from "react-icons/io5";
import Header from "../../Header/Header";
import FarePolicy from "../../Dashboard/FlightSearch/FarePolicy";
import FlightUserInformationReturn from "../FlightUserInformationReturn/FlightUserInformationReturn";
import FlightPriceBreakdownOneway from "../../Dashboard/FlightBookingOneway/FlightPriceBreakdownOneway/FlightPriceBreakdownOneway";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "var(--gray-text-color)",
    maxWidth: 220,
    fontSize: "5px",
    borderRadius: "8px 0px 8px 0px",
  },
}));

const FlightInformationReturn = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const returnFlightData = location?.state?.roundData;
  const {
    backarrival,
    backarrivalDate,
    backarrivalTime,
    backdeparture,
    backdepartureDate,
    backdepartureTime,
    backflightduration,
    bags,
    career,
    careerName,
    goarrival,
    goarrivalDate,
    goarrivalTime,
    godeparture,
    godepartureDate,
    godepartureTime,
    goflightduration,
    refundable,
    price,
    Taxes,
    seat,
    segment,
    segments,
    stop,
    system,
    transit,
    bookingcode,
    BasePrice,
    clientPrice,
    pricebreakdown,
  } = location.state.roundData;

  const [isLoaded, setIsLoaded] = useState(true);
  const [loadData, setLoadData] = useState([]);
  const { adultCount, childCount, infant } = location.state;
  const [value, setValue] = useState("1");
  const [flightDetails, setFlightDetails] = useState(true);
  const [activeGo, setActiveGo] = useState(true);
  const [activeBack, setActiveBack] = useState(false);
  const handleClickGo = (e) => {
    setActiveGo(true);
    setActiveBack(false);
  };
  const handleClickBack = (e) => {
    setActiveBack(true);
    setActiveGo(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const clientFare = Number.parseInt(clientPrice);
  const agentFare = Math.round(parseInt(price));

  const limitTime =
    location.state.roundData?.system === "Sabre"
      ? new Date()
      : location.state.roundData?.system === "Galileo"
      ? new Date()
      : loadData?.Results
      ? loadData?.Results[0]?.LastTicketDate
      : new Date();

  const goMarcketingCareerCode = segments.go
    .map((data) => data?.marketingcareer)
    .filter((value, index, arr) => arr.indexOf(value) === index);
  const backMarcketingCareerCode = segments.back
    .map((data) => data?.marketingcareer)
    .filter((value, index, arr) => arr.indexOf(value) === index);

  let url;
  let body;

  let go = [];
  let back = [];

  const tripType = location.state.tripType;

  if (tripType === "return") {
    location?.state?.roundData?.segments?.go?.map((data) =>
      go.push({
        departure: data?.departure,
        arrival: data?.arrival,
        dpTime: data?.departureTime,
        arrTime: data?.arrivalTime,
        bCode: data?.bookingcode,
        mCarrier: data.marketingcareer,
        mCarrierFN: data?.marketingflight,
        oCarrier: data?.operatingcareer,
        oCarrierFN: data.operatingflight,
      })
    );
    location?.state?.roundData?.segments?.back?.map((data) =>
      back.push({
        departure: data?.departure,
        arrival: data?.arrival,
        dpTime: data?.departureTime,
        arrTime: data?.arrivalTime,
        bCode: data?.bookingcode,
        mCarrier: data.marketingcareer,
        mCarrierFN: data?.marketingflight,
        oCarrier: data?.operatingcareer,
        oCarrierFN: data.operatingflight,
      })
    );
  }

  let returnSabreBody = {
    adultCount: adultCount,
    childCount: childCount,
    infantCount: infant,
    segment: location.state?.roundData?.segment,
    tripType: "2",
    segments: { go: go, back: back },
  };

  if (system === "Sabre") {
    url = "https://api.flyfarint.com/v.1.0.0/Sabre/AirPrice.php";
    body = returnSabreBody;
  } else if (system === "FlyHub") {
    url = "https://api.flyfarint.com/v.1.0.0/FlyHub/AirPrice.php";
    body = {
      SearchID: returnFlightData?.SearchID,
      ResultID: returnFlightData?.ResultID,
    };
  } else if (system === "Galileo") {
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
    if (body) {
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
          console.log(err.message);
          Swal.fire({
            // imageUrl: NotFound,
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
    }
  }, [
    body.adultCount,
    body.childCount,
    body.infant,
    body.segment,
    body.tripType,
  ]);

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
    <Box height="100vh">
      <Container>
        <Header />
        {Object.keys(loadData).length !== 0 ? (
          <Grid container columnSpacing={4}>
            <Grid item md={9}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: 500,
                    mt: 2,
                    mb: 1,
                    color: "var(--primary-color)",
                  }}
                >
                  Flight Information
                </Typography>
                <Grid
                  container
                  sx={{
                    display: {
                      xs: "flex",
                      sm: "flex",
                      md: "flex",
                    },
                    transition: "all .5s ease-in-out",
                    borderRadius: "5px",
                    overflow: "hidden",
                    bgcolor: "var(--white)",
                  }}
                >
                  <Grid item md={12} p={2}>
                    {/* for go flight  */}
                    <Grid container columnSpacing={1}>
                      {/* go 1st */}
                      <Grid item xs={12} md={3}>
                        <Box>
                          <Box width="50px" height="50px">
                            {goMarcketingCareerCode.map((data) => (
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data}.png`}
                                width="50px"
                                height="50px"
                                className={`${system
                                  ?.toLowerCase()
                                  ?.split(" ")
                                  ?.join("-")}-border`}
                                alt={`${segments?.go[0].marketingcareer}`}
                              />
                            ))}
                          </Box>
                          <Box width="90%">
                            <Tooltip
                              title={`${segments.go
                                .map((data) => data?.marketingcareerName)

                                .filter(
                                  (value, index, arr) =>
                                    arr.indexOf(value) === index
                                )
                                .join(", ")}`}
                            >
                              <Typography
                                sx={{
                                  color: "var(--secondary-color)",
                                  fontSize: {
                                    fontWeight: 500,
                                    xs: "12px",
                                    sm: "12px",
                                    md: "14px",
                                    cursor: "pointer",
                                  },
                                }}
                                noWrap
                              >{`${segments.go
                                .map((data) => data?.marketingcareerName)
                                .filter(
                                  (value, index, arr) =>
                                    arr.indexOf(value) === index
                                )
                                .join(", ")}`}</Typography>
                            </Tooltip>
                            <Tooltip
                              title={`${segments.go
                                .map(
                                  (data) =>
                                    `${
                                      data.marketingcareer ===
                                      data.operatingcareer
                                        ? `${data.marketingcareer}-${data.marketingflight}`
                                        : `${data.operatingcareer}-${data.operatingflight}`
                                    }`
                                )
                                .join(", ")}`}
                            >
                              <Typography
                                sx={{
                                  color: "var(--primary-color)",
                                  fontSize: {
                                    xs: "12px",
                                    sm: "12px",
                                    md: "13px",
                                    cursor: "pointer",
                                  },
                                }}
                                noWrap
                              >
                                {`${segments.go
                                  .map(
                                    (data) =>
                                      `${
                                        data.marketingcareer ===
                                        data.operatingcareer
                                          ? `${data.marketingcareer}-${data.marketingflight}`
                                          : `${data.operatingcareer}-${data.operatingflight}`
                                      }`
                                  )
                                  .join(", ")}`}
                              </Typography>
                            </Tooltip>
                          </Box>
                        </Box>
                      </Grid>
                      {/* go 2nd  */}
                      <Grid item xs={12} md={3}>
                        <Box>
                          <Tooltip
                            title={`${godeparture} ${
                              segments?.go[0]?.departureLocation?.split(",")[0]
                            }`}
                          >
                            <Typography
                              sx={{
                                color: "var(--secondary-color)",
                                fontWeight: 500,
                                fontSize: {
                                  xs: "14px",
                                  md: "18px",
                                },
                              }}
                            >
                              {segments.go[0]?.departureLocation?.split(",")[0]}
                              <span style={{ color: "var(--primary-color)" }}>
                                {godepartureTime?.substring(0, 5)}
                              </span>
                            </Typography>
                          </Tooltip>

                          <Tooltip title={segments.go[0]?.departureAirport}>
                            <Typography
                              noWrap
                              sx={{
                                color: "var(--text-black)",
                                fontWeight: 500,
                                fontSize: {
                                  xs: "12px",
                                },
                              }}
                            >
                              {segments.go[0]?.departureAirport}
                            </Typography>
                          </Tooltip>
                          <Typography
                            sx={{
                              color: "var(--gray-text-color)",
                              fontSize: {
                                xs: "12px",
                              },
                            }}
                          >
                            {godepartureDate}
                          </Typography>
                        </Box>
                      </Grid>
                      {/* go 3rd  */}
                      {/* 3rd  Animation and duration*/}
                      <Grid item xs={4} md={3} py={2}>
                        <Box>
                          <Typography
                            sx={{
                              textAlign: "center",
                              color: "var(--primary-color)",
                              fontWeight: 500,
                              fontSize: {
                                xs: "12px",
                                sm: "10px",
                                md: "12px",
                              },
                            }}
                          >
                            {goflightduration}
                          </Typography>
                          <Box px={1}>
                            <Box textAlign={"center"}>
                              <Typography>
                                {/* ---------stops------ */}

                                {segments?.go?.length === 3 ? (
                                  <Box>
                                    <Box px={1}>
                                      <div className="segment03">
                                        <div className="segment-circle">
                                          <div className="circle-0">
                                            <HtmlTooltip
                                              title={
                                                <React.Fragment>
                                                  <Typography
                                                    sx={{
                                                      color: "#fff",
                                                      fontSize: "10px",
                                                    }}
                                                  >
                                                    {godeparture}
                                                  </Typography>
                                                </React.Fragment>
                                              }
                                              followCursor
                                            >
                                              <span>
                                                <CircleIcon
                                                  sx={{
                                                    color:
                                                      "var(--gray-text-color)",
                                                    fontSize: "15px",
                                                    cursor: "pointer",
                                                  }}
                                                />
                                              </span>
                                            </HtmlTooltip>
                                          </div>
                                          <div className="segment-stop"></div>
                                          <div className="segment-stop"></div>
                                          <div className="circle-0">
                                            <HtmlTooltip
                                              title={
                                                <React.Fragment>
                                                  <Typography
                                                    sx={{
                                                      color: "#fff",
                                                      fontSize: "10px",
                                                    }}
                                                  >
                                                    {goarrival}
                                                  </Typography>
                                                </React.Fragment>
                                              }
                                              followCursor
                                            >
                                              <span>
                                                <CircleIcon
                                                  sx={{
                                                    color:
                                                      "var(--gray-text-color)",
                                                    fontSize: "15px",
                                                    cursor: "pointer",
                                                  }}
                                                />
                                              </span>
                                            </HtmlTooltip>
                                          </div>
                                        </div>
                                        <div className="segment-flight03">
                                          <IoAirplaneSharp />
                                        </div>
                                      </div>
                                    </Box>
                                    <Typography className="arival-seg-3">
                                      <HtmlTooltip
                                        title={
                                          <React.Fragment>
                                            <Typography
                                              sx={{
                                                color: "#fff",
                                                fontSize: "10px",
                                              }}
                                            >
                                              <span
                                                style={{ fontSize: "12px" }}
                                              >
                                                {
                                                  segments?.go[0]?.arrivalLocation?.split(
                                                    ","
                                                  )[0]
                                                }
                                              </span>
                                              <br />
                                              {segments?.go[1]?.marketingcareer}
                                              &nbsp;
                                              {
                                                segments?.go[1]?.marketingflight
                                              }{" "}
                                              <span> | </span>
                                              {transit?.go?.transit1}
                                            </Typography>
                                          </React.Fragment>
                                        }
                                        followCursor
                                      >
                                        <Box className="arival-text">
                                          {segments?.go[0]?.arrival}
                                        </Box>
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
                                              <span
                                                style={{ fontSize: "12px" }}
                                              >
                                                {
                                                  segments?.go[1]?.arrivalLocation?.split(
                                                    ","
                                                  )[0]
                                                }
                                              </span>
                                              <br />
                                              {segments?.go[2]?.marketingcareer}
                                              &nbsp;
                                              {segments?.go[2]?.marketingflight}
                                              <span> | </span>
                                              {transit?.go?.transit2}
                                            </Typography>
                                          </React.Fragment>
                                        }
                                        followCursor
                                      >
                                        <Box className="arival-text">
                                          {segments?.go[1]?.arrival}
                                        </Box>
                                      </HtmlTooltip>
                                    </Typography>
                                  </Box>
                                ) : segments?.go.length === 2 ? (
                                  <Box>
                                    <Box px={1}>
                                      <div className="segment02">
                                        <div className="segment-circle">
                                          <div className="circle-0">
                                            <HtmlTooltip
                                              title={
                                                <React.Fragment>
                                                  <Typography
                                                    sx={{
                                                      color: "#fff",
                                                      fontSize: "10px",
                                                    }}
                                                  >
                                                    {godeparture}
                                                  </Typography>
                                                </React.Fragment>
                                              }
                                              followCursor
                                            >
                                              <span>
                                                <CircleIcon
                                                  sx={{
                                                    color:
                                                      "var(--gray-text-color)",
                                                    fontSize: "15px",
                                                    cursor: "pointer",
                                                  }}
                                                />
                                              </span>
                                            </HtmlTooltip>
                                          </div>
                                          <div className="segment-stop"></div>
                                          <div className="circle-0">
                                            <HtmlTooltip
                                              title={
                                                <React.Fragment>
                                                  <Typography
                                                    sx={{
                                                      color: "#fff",
                                                      fontSize: "10px",
                                                    }}
                                                  >
                                                    {goarrival}
                                                  </Typography>
                                                </React.Fragment>
                                              }
                                              followCursor
                                            >
                                              <span>
                                                <CircleIcon
                                                  sx={{
                                                    color:
                                                      "var(--gray-text-color)",
                                                    fontSize: "15px",
                                                    cursor: "pointer",
                                                  }}
                                                />
                                              </span>
                                            </HtmlTooltip>
                                          </div>
                                        </div>
                                        <div className="segment-flight02">
                                          <IoAirplaneSharp />
                                        </div>
                                      </div>
                                    </Box>
                                    <Typography className="arival-seg2">
                                      <HtmlTooltip
                                        title={
                                          <React.Fragment>
                                            <Typography
                                              sx={{
                                                color: "#fff",
                                                fontSize: "10px",
                                              }}
                                            >
                                              <span
                                                style={{ fontSize: "12px" }}
                                              >
                                                {
                                                  segments?.go[0]?.arrivalLocation?.split(
                                                    ","
                                                  )[0]
                                                }{" "}
                                              </span>
                                              <br />
                                              {segments?.go[1]?.marketingcareer}
                                              &nbsp;
                                              {segments?.go[1]?.marketingflight}
                                              <span> | </span>
                                              {transit?.go?.transit1}
                                            </Typography>
                                          </React.Fragment>
                                        }
                                        followCursor
                                      >
                                        <Box className="arival-text2">
                                          {segments?.go[0]?.arrival}
                                        </Box>
                                      </HtmlTooltip>
                                    </Typography>
                                  </Box>
                                ) : (
                                  <Box>
                                    <Box px={1}>
                                      <div className="segment-1">
                                        <div className="segment-circle">
                                          <div className="circle-0">
                                            <HtmlTooltip
                                              title={
                                                <React.Fragment>
                                                  <Typography
                                                    sx={{
                                                      color: "#fff",
                                                      fontSize: "10px",
                                                    }}
                                                  >
                                                    {godeparture}
                                                  </Typography>
                                                </React.Fragment>
                                              }
                                              followCursor
                                            >
                                              <span>
                                                <CircleIcon
                                                  sx={{
                                                    color:
                                                      "var(--gray-text-color)",
                                                    fontSize: "15px",
                                                    cursor: "pointer",
                                                  }}
                                                />
                                              </span>
                                            </HtmlTooltip>
                                          </div>
                                          <div className="circle-0">
                                            <HtmlTooltip
                                              title={
                                                <React.Fragment>
                                                  <Typography
                                                    sx={{
                                                      color: "#fff",
                                                      fontSize: "10px",
                                                    }}
                                                  >
                                                    {goarrival}
                                                  </Typography>
                                                </React.Fragment>
                                              }
                                              followCursor
                                            >
                                              <span>
                                                <CircleIcon
                                                  sx={{
                                                    color:
                                                      "var(--gray-text-color)",
                                                    fontSize: "15px",
                                                    cursor: "pointer",
                                                  }}
                                                />
                                              </span>
                                            </HtmlTooltip>
                                          </div>
                                        </div>
                                        <div className="segment-flight1">
                                          <IoAirplaneSharp />
                                        </div>
                                      </div>
                                    </Box>
                                  </Box>
                                )}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                      {/* go 4th  */}
                      <Grid item xs={12} md={3} textAlign="left">
                        <Box>
                          <Tooltip
                            title={`${
                              segments.go[segments.go.length - 1].arrival
                            } ${
                              segments.go[
                                segments.go.length - 1
                              ].arrivalLocation?.split(",")[0]
                            }
                    `}
                          >
                            <Typography
                              sx={{
                                color: "var(--secondary-color)",
                                fontWeight: 500,
                                fontSize: {
                                  xs: "14px",
                                  md: "18px",
                                },
                              }}
                            >
                              {
                                segments.go[
                                  segments.go.length - 1
                                ].arrivalLocation?.split(",")[0]
                              }
                              <span style={{ color: "var(--primary-color)" }}>
                                {goarrivalTime?.substring(0, 5)}
                              </span>
                            </Typography>
                          </Tooltip>

                          <Tooltip
                            title={
                              segments?.go[segments?.go?.length - 1]
                                ?.arrivalAirport
                            }
                          >
                            <Typography
                              noWrap
                              sx={{
                                color: "var(--text-black)",
                                fontWeight: 500,
                                fontSize: {
                                  xs: "12px",
                                },
                              }}
                            >
                              {
                                segments?.go[segments?.go?.length - 1]
                                  ?.arrivalAirport
                              }
                            </Typography>
                          </Tooltip>

                          <Typography
                            sx={{
                              color: "var(--gray-text-color)",
                              fontSize: {
                                xs: "12px",
                              },
                            }}
                          >
                            {goarrivalDate}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    {/* for back flight  */}
                    <Grid container columnSpacing={1}>
                      {/* back 1st */}
                      <Grid item xs={12} md={3}>
                        <Box>
                          <Box width="50px" height="50px">
                            {backMarcketingCareerCode.map((data) => (
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data}.png`}
                                width="50px"
                                height="50px"
                                className={`${system
                                  ?.toLowerCase()
                                  ?.split(" ")
                                  ?.join("-")}-border`}
                                alt={`${segments?.back[0].marketingcareer}`}
                              />
                            ))}
                          </Box>
                          <Box width="90%">
                            <Tooltip
                              title={`${segments.back
                                .map((data) => data?.marketingcareerName)
                                .filter(
                                  (value, index, arr) =>
                                    arr.indexOf(value) === index
                                )
                                .join(", ")}`}
                            >
                              <Typography
                                sx={{
                                  color: "var(--secondary-color)",
                                  fontSize: {
                                    fontWeight: 500,
                                    xs: "12px",
                                    sm: "12px",
                                    md: "14px",
                                    cursor: "pointer",
                                  },
                                }}
                                noWrap
                              >{`${segments.back
                                .map((data) => data?.marketingcareerName)
                                .filter(
                                  (value, index, arr) =>
                                    arr.indexOf(value) === index
                                )
                                .join(", ")}`}</Typography>
                            </Tooltip>
                            <Tooltip
                              title={`${segments.back
                                .map(
                                  (data) =>
                                    `${
                                      data.marketingcareer ===
                                      data.operatingcareer
                                        ? `${data.marketingcareer}-${data.marketingflight}`
                                        : `${data.operatingcareer}-${data.operatingflight}`
                                    }`
                                )
                                .join(", ")}`}
                            >
                              <Typography
                                sx={{
                                  color: "var(--primary-color)",
                                  fontSize: {
                                    xs: "12px",
                                    sm: "12px",
                                    md: "13px",
                                    cursor: "pointer",
                                  },
                                }}
                                noWrap
                              >
                                {`${segments.back
                                  .map(
                                    (data) =>
                                      `${
                                        data.marketingcareer ===
                                        data.operatingcareer
                                          ? `${data.marketingcareer}-${data.marketingflight}`
                                          : `${data.operatingcareer}-${data.operatingflight}`
                                      }`
                                  )
                                  .join(", ")}`}
                              </Typography>
                            </Tooltip>
                          </Box>
                        </Box>
                      </Grid>
                      {/* back 2nd  */}
                      <Grid item xs={12} md={3}>
                        <Box>
                          <Tooltip
                            title={`${backdeparture} ${
                              segments?.back[0]?.departureLocation?.split(
                                ","
                              )[0]
                            }`}
                          >
                            <Typography
                              sx={{
                                color: "var(--secondary-color)",
                                fontWeight: 500,
                                fontSize: {
                                  xs: "14px",
                                  md: "18px",
                                },
                              }}
                            >
                              {
                                segments.back[0]?.departureLocation?.split(
                                  ","
                                )[0]
                              }
                              <span style={{ color: "var(--primary-color)" }}>
                                {backdepartureTime?.substring(0, 5)}
                              </span>
                            </Typography>
                          </Tooltip>

                          <Tooltip title={segments.back[0]?.departureAirport}>
                            <Typography
                              noWrap
                              sx={{
                                color: "var(--text-black)",
                                fontWeight: 500,
                                fontSize: {
                                  xs: "12px",
                                },
                              }}
                            >
                              {segments.back[0]?.departureAirport}
                            </Typography>
                          </Tooltip>
                          <Typography
                            sx={{
                              color: "var(--gray-text-color)",
                              fontSize: {
                                xs: "12px",
                              },
                            }}
                          >
                            {backdepartureDate}
                          </Typography>
                        </Box>
                      </Grid>
                      {/* back 3rd  */}
                      {/* 3rd  Animation and duration*/}
                      <Grid item xs={4} md={3} py={2}>
                        <Box>
                          <Typography
                            sx={{
                              textAlign: "center",
                              color: "var(--primary-color)",
                              fontWeight: 500,
                              fontSize: {
                                xs: "12px",
                                sm: "10px",
                                md: "12px",
                              },
                            }}
                          >
                            {backflightduration}
                          </Typography>
                          <Box px={1}>
                            <Box textAlign={"center"}>
                              <Typography>
                                {/* ---------stops------ */}

                                {segments?.back?.length === 3 ? (
                                  <Box>
                                    <Box px={1}>
                                      <div className="segment03">
                                        <div className="segment-circle">
                                          <div className="circle-0">
                                            <HtmlTooltip
                                              title={
                                                <React.Fragment>
                                                  <Typography
                                                    sx={{
                                                      color: "#fff",
                                                      fontSize: "10px",
                                                    }}
                                                  >
                                                    {backdeparture}
                                                  </Typography>
                                                </React.Fragment>
                                              }
                                              followCursor
                                            >
                                              <span>
                                                <CircleIcon
                                                  sx={{
                                                    color:
                                                      "var(--gray-text-color)",
                                                    fontSize: "15px",
                                                    cursor: "pointer",
                                                  }}
                                                />
                                              </span>
                                            </HtmlTooltip>
                                          </div>
                                          <div className="segment-stop"></div>
                                          <div className="segment-stop"></div>
                                          <div className="circle-0">
                                            <HtmlTooltip
                                              title={
                                                <React.Fragment>
                                                  <Typography
                                                    sx={{
                                                      color: "#fff",
                                                      fontSize: "10px",
                                                    }}
                                                  >
                                                    {backarrival}
                                                  </Typography>
                                                </React.Fragment>
                                              }
                                              followCursor
                                            >
                                              <span>
                                                <CircleIcon
                                                  sx={{
                                                    color:
                                                      "var(--gray-text-color)",
                                                    fontSize: "15px",
                                                    cursor: "pointer",
                                                  }}
                                                />
                                              </span>
                                            </HtmlTooltip>
                                          </div>
                                        </div>
                                        <div className="segment-flight03">
                                          <IoAirplaneSharp />
                                        </div>
                                      </div>
                                    </Box>
                                    <Typography className="arival-seg-3">
                                      <HtmlTooltip
                                        title={
                                          <React.Fragment>
                                            <Typography
                                              sx={{
                                                color: "#fff",
                                                fontSize: "10px",
                                              }}
                                            >
                                              <span
                                                style={{ fontSize: "12px" }}
                                              >
                                                {
                                                  segments?.back[0]?.arrivalLocation?.split(
                                                    ","
                                                  )[0]
                                                }
                                              </span>
                                              <br />
                                              {
                                                segments?.back[1]
                                                  ?.marketingcareer
                                              }
                                              &nbsp;
                                              {
                                                segments?.back[1]
                                                  ?.marketingflight
                                              }{" "}
                                              <span> | </span>
                                              {transit?.back?.transit1}
                                            </Typography>
                                          </React.Fragment>
                                        }
                                        followCursor
                                      >
                                        <Box className="arival-text">
                                          {segments?.back[0]?.arrival}
                                        </Box>
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
                                              <span
                                                style={{ fontSize: "12px" }}
                                              >
                                                {
                                                  segments?.back[1]?.arrivalLocation?.split(
                                                    ","
                                                  )[0]
                                                }
                                              </span>
                                              <br />
                                              {
                                                segments?.back[2]
                                                  ?.marketingcareer
                                              }
                                              &nbsp;
                                              {
                                                segments?.back[2]
                                                  ?.marketingflight
                                              }
                                              <span> | </span>
                                              {transit?.back?.transit2}
                                            </Typography>
                                          </React.Fragment>
                                        }
                                        followCursor
                                      >
                                        <Box className="arival-text">
                                          {segments?.back[1]?.arrival}
                                        </Box>
                                      </HtmlTooltip>
                                    </Typography>
                                  </Box>
                                ) : segments?.back.length === 2 ? (
                                  <Box>
                                    <Box px={1}>
                                      <div className="segment02">
                                        <div className="segment-circle">
                                          <div className="circle-0">
                                            <HtmlTooltip
                                              title={
                                                <React.Fragment>
                                                  <Typography
                                                    sx={{
                                                      color: "#fff",
                                                      fontSize: "10px",
                                                    }}
                                                  >
                                                    {backdeparture}
                                                  </Typography>
                                                </React.Fragment>
                                              }
                                              followCursor
                                            >
                                              <span>
                                                <CircleIcon
                                                  sx={{
                                                    color:
                                                      "var(--gray-text-color)",
                                                    fontSize: "15px",
                                                    cursor: "pointer",
                                                  }}
                                                />
                                              </span>
                                            </HtmlTooltip>
                                          </div>
                                          <div className="segment-stop"></div>
                                          <div className="circle-0">
                                            <HtmlTooltip
                                              title={
                                                <React.Fragment>
                                                  <Typography
                                                    sx={{
                                                      color: "#fff",
                                                      fontSize: "10px",
                                                    }}
                                                  >
                                                    {backarrival}
                                                  </Typography>
                                                </React.Fragment>
                                              }
                                              followCursor
                                            >
                                              <span>
                                                <CircleIcon
                                                  sx={{
                                                    color:
                                                      "var(--gray-text-color)",
                                                    fontSize: "15px",
                                                    cursor: "pointer",
                                                  }}
                                                />
                                              </span>
                                            </HtmlTooltip>
                                          </div>
                                        </div>
                                        <div className="segment-flight02">
                                          <IoAirplaneSharp />
                                        </div>
                                      </div>
                                    </Box>
                                    <Typography className="arival-seg2">
                                      <HtmlTooltip
                                        title={
                                          <React.Fragment>
                                            <Typography
                                              sx={{
                                                color: "#fff",
                                                fontSize: "10px",
                                              }}
                                            >
                                              <span
                                                style={{ fontSize: "12px" }}
                                              >
                                                {
                                                  segments?.back[0]?.arrivalLocation?.split(
                                                    ","
                                                  )[0]
                                                }{" "}
                                              </span>
                                              <br />
                                              {
                                                segments?.back[1]
                                                  ?.marketingcareer
                                              }
                                              &nbsp;
                                              {
                                                segments?.back[1]
                                                  ?.marketingflight
                                              }
                                              <span> | </span>
                                              {transit?.back?.transit1}
                                            </Typography>
                                          </React.Fragment>
                                        }
                                        followCursor
                                      >
                                        <Box className="arival-text2">
                                          {segments?.back[0]?.arrival}
                                        </Box>
                                      </HtmlTooltip>
                                    </Typography>
                                  </Box>
                                ) : (
                                  <Box>
                                    <Box px={1}>
                                      <div className="segment-1">
                                        <div className="segment-circle">
                                          <div className="circle-0">
                                            <HtmlTooltip
                                              title={
                                                <React.Fragment>
                                                  <Typography
                                                    sx={{
                                                      color: "#fff",
                                                      fontSize: "10px",
                                                    }}
                                                  >
                                                    {backdeparture}
                                                  </Typography>
                                                </React.Fragment>
                                              }
                                              followCursor
                                            >
                                              <span>
                                                <CircleIcon
                                                  sx={{
                                                    color:
                                                      "var(--gray-text-color)",
                                                    fontSize: "15px",
                                                    cursor: "pointer",
                                                  }}
                                                />
                                              </span>
                                            </HtmlTooltip>
                                          </div>
                                          <div className="circle-0">
                                            <HtmlTooltip
                                              title={
                                                <React.Fragment>
                                                  <Typography
                                                    sx={{
                                                      color: "#fff",
                                                      fontSize: "10px",
                                                    }}
                                                  >
                                                    {backarrival}
                                                  </Typography>
                                                </React.Fragment>
                                              }
                                              followCursor
                                            >
                                              <span>
                                                <CircleIcon
                                                  sx={{
                                                    color:
                                                      "var(--gray-text-color)",
                                                    fontSize: "15px",
                                                    cursor: "pointer",
                                                  }}
                                                />
                                              </span>
                                            </HtmlTooltip>
                                          </div>
                                        </div>
                                        <div className="segment-flight1">
                                          <IoAirplaneSharp />
                                        </div>
                                      </div>
                                    </Box>
                                  </Box>
                                )}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                      {/* back 4th  */}
                      <Grid item xs={12} md={3} textAlign="left">
                        <Box>
                          <Tooltip
                            title={`${
                              segments.back[segments.back.length - 1].arrival
                            } ${
                              segments.back[
                                segments.back.length - 1
                              ].arrivalLocation?.split(",")[0]
                            }
        `}
                          >
                            <Typography
                              sx={{
                                color: "var(--secondary-color)",
                                fontWeight: 500,
                                fontSize: {
                                  xs: "14px",
                                  md: "18px",
                                },
                              }}
                            >
                              {
                                segments.back[
                                  segments.back.length - 1
                                ].arrivalLocation?.split(",")[0]
                              }
                              <span style={{ color: "var(--primary-color)" }}>
                                {backarrivalTime?.substring(0, 5)}
                              </span>
                            </Typography>
                          </Tooltip>

                          <Tooltip
                            title={
                              segments?.back[segments?.back?.length - 1]
                                ?.arrivalAirport
                            }
                          >
                            <Typography
                              noWrap
                              sx={{
                                color: "var(--text-black)",
                                fontWeight: 500,
                                fontSize: {
                                  xs: "12px",
                                },
                              }}
                            >
                              {
                                segments?.back[segments?.back?.length - 1]
                                  ?.arrivalAirport
                              }
                            </Typography>
                          </Tooltip>

                          <Typography
                            sx={{
                              color: "var(--gray-text-color)",
                              fontSize: {
                                xs: "12px",
                              },
                            }}
                          >
                            {backarrivalDate}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* //todo: price section and flightDetails */}

                  {/* //todo:Flight Details start------------ */}

                  <Collapse
                    in={flightDetails}
                    timeout="auto"
                    unmountOnExit
                    sx={{ width: "100%" }}
                  >
                    <Box sx={{ width: "96%", margin: "15px auto" }}>
                      <TabContext value={value}>
                        <Box
                          sx={{
                            width: "fit-content",
                            height: "30px",
                            minHeight: "0px",
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            opacity: "1",
                            bgcolor: "var(--primary-color)",
                            borderRadius: "3px",
                            ".MuiTabs-flexContainer": {
                              flexWrap: "wrap",
                              padding: {
                                lg: "0px",
                                md: "0px",
                                sm: "0px 10px",
                                xs: "0px 10px",
                              },
                            },
                            "& button": {
                              color: "var(--white)",
                              opacity: "1",
                              borderBottom: "0",
                              textTransform: "capitalize",
                              padding: {
                                lg: "0 20px",
                                md: "0 20px",
                                sm: "0px 10px",
                                xs: "0px 20px",
                              },
                            },

                            "& button.Mui-selected": {
                              color: "var(--white)",
                              bgcolor: "var(--secondary-color)",
                              opacity: 1,
                              borderBottom: "0px",
                            },
                          }}
                        >
                          <TabList value={value} onChange={handleChange}>
                            <Tab
                              label="Flight Details"
                              value="1"
                              style={{ fontSize: "12px" }}
                            />
                            <Tab
                              label="Fare Details"
                              value="2"
                              style={{ fontSize: "12px" }}
                            />
                            <Tab
                              label="Baggage"
                              value="3"
                              style={{ fontSize: "12px" }}
                            />
                            <Tab
                              label="Fare Policy"
                              value="4"
                              style={{ fontSize: "12px" }}
                            />
                          </TabList>
                        </Box>
                        {/* //todo:Flight Details */}
                        <TabPanel className="tabs-details" value="1">
                          <Box>
                            <Box display={"flex"}>
                              <Box
                                mb={3}
                                mr={2}
                                onClick={handleClickGo}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  bgcolor: `${
                                    activeGo
                                      ? "var(--primary-color)"
                                      : "var(--transit-color)"
                                  }`,
                                  color: `${
                                    activeGo
                                      ? "var(--white)"
                                      : "var(--primary-color)"
                                  }`,
                                  padding: "0 10px",
                                  width: "fit-content",
                                  cursor: "pointer",
                                }}
                                fontSize="14px"
                              >
                                {godeparture}&nbsp;&nbsp; <TrendingFlatIcon />
                                &nbsp;&nbsp;{goarrival}
                              </Box>
                              <Box
                                mb={3}
                                onClick={handleClickBack}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  bgcolor: `${
                                    activeBack
                                      ? "var(--primary-color)"
                                      : "var(--transit-color)"
                                  }`,
                                  color: `${
                                    activeBack
                                      ? "var(--white)"
                                      : "var(--primary-color)"
                                  }`,
                                  padding: "0 10px",
                                  width: "fit-content",
                                  cursor: "pointer",
                                }}
                                fontSize="14px"
                              >
                                {backdeparture}&nbsp;&nbsp; <TrendingFlatIcon />
                                &nbsp;&nbsp; {backarrival}
                              </Box>
                            </Box>
                            {activeGo && (
                              <Box>
                                {segments.go.map((data, index, arr) => (
                                  <Box my={2}>
                                    <Grid container columnSpacing={1}>
                                      {/* 1st  */}
                                      <Grid item md={3.5}>
                                        <Stack direction="row">
                                          <Box width="40px" height="40px">
                                            <img
                                              src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${
                                                data.marketingcareer ===
                                                data.operatingcareer
                                                  ? data?.marketingcareer
                                                  : data?.operatingcareer
                                              }.png`}
                                              className={`${system
                                                ?.toLowerCase()
                                                ?.split(" ")
                                                ?.join("-")}-border`}
                                              width="40px"
                                              height="40px"
                                              alt={`${data.marketingcareer}`}
                                            />
                                          </Box>
                                          <Box>
                                            <Typography
                                              sx={{
                                                fontSize: "14px",
                                                color: "var(--primary-color)",
                                                fontWeight: 500,
                                              }}
                                            >
                                              {data?.marketingcareerName}
                                            </Typography>
                                            <Typography
                                              sx={{
                                                fontSize: "12px",
                                                color: "var(--text-black)",
                                              }}
                                            >
                                              {data.marketingcareer ===
                                              data.operatingcareer ? (
                                                <>
                                                  {data.marketingcareer}&nbsp;
                                                  {data.marketingflight}
                                                </>
                                              ) : (
                                                <>
                                                  {data.operatingcareer}&nbsp;
                                                  {data.operatingflight}
                                                </>
                                              )}
                                              {", "}
                                              Class: {data?.bookingcode}, Seat:{" "}
                                              {data?.seat || 2}
                                            </Typography>
                                            <Typography
                                              sx={{
                                                fontSize: "12px",
                                                color: "var(--text-color-g)",
                                              }}
                                            >
                                              Operated by{" "}
                                              {data?.operatingcareer}
                                            </Typography>
                                          </Box>
                                        </Stack>
                                      </Grid>
                                      {/* 2nd  */}
                                      <Grid item md={3}>
                                        <Box>
                                          <Typography
                                            sx={{
                                              fontSize: "14px",
                                              color: "var(--primary-color)",
                                              fontWeight: 500,
                                            }}
                                          >
                                            {data?.departureLocation}-(
                                            {data?.departure})
                                          </Typography>
                                          <Tooltip
                                            title={`(${data?.departure}) ${data?.departureAirport}`}
                                          >
                                            <Typography
                                              sx={{
                                                fontSize: "12px",
                                                color: "var(--text-black)",
                                                width: "90%",
                                              }}
                                              noWrap
                                            >
                                              {data?.departureAirport}
                                            </Typography>
                                          </Tooltip>
                                          <Typography
                                            sx={{
                                              fontSize: "12px",
                                              color: "var(--text-color-g)",
                                            }}
                                          >
                                            {format(
                                              new Date(
                                                data?.departureTime.toString()
                                              ),
                                              "dd MMM yyyy hh:mm a"
                                            )}
                                          </Typography>
                                        </Box>
                                      </Grid>
                                      {/* 3rd  */}
                                      <Grid
                                        item
                                        md={2.5}
                                        textAlign="center"
                                        px={{ xs: 1, md: 2 }}
                                      >
                                        <Typography
                                          sx={{
                                            fontSize: "12px",
                                            color: "var(--secondary-color)",
                                            fontWeight: 500,
                                          }}
                                        >
                                          {data.flightduration}
                                        </Typography>
                                        <Stack
                                          direction="row"
                                          justifyContent="space-between"
                                          alignItems="center"
                                        >
                                          <IoAirplaneSharp
                                            style={{
                                              color: "var(--text-color-g)",
                                              fontSize: "25px",
                                              cursor: "pointer",
                                            }}
                                          />
                                          <Box width="100%">
                                            <hr />
                                          </Box>
                                          <CircleIcon
                                            sx={{
                                              color: "#c7c7c7",
                                              fontSize: "12px",
                                              cursor: "pointer",
                                            }}
                                          />
                                        </Stack>
                                      </Grid>
                                      {/* 4th  */}

                                      <Grid item md={3}>
                                        <Box>
                                          <Typography
                                            sx={{
                                              fontSize: "14px",
                                              color: "var(--primary-color)",
                                              fontWeight: 500,
                                            }}
                                          >
                                            {data?.arrivalLocation}-(
                                            {data?.arrival})
                                          </Typography>
                                          <Tooltip
                                            title={`(${data?.departure}) ${data?.departureAirport}`}
                                          >
                                            <Typography
                                              sx={{
                                                fontSize: "12px",
                                                color: "var(--text-black)",
                                                width: "90%",
                                              }}
                                              noWrap
                                            >
                                              {data?.arrivalAirport}
                                            </Typography>
                                          </Tooltip>
                                          <Typography
                                            sx={{
                                              fontSize: "12px",
                                              color: "var(--text-color-g)",
                                            }}
                                          >
                                            {format(
                                              new Date(
                                                data?.arrivalTime.toString()
                                              ),
                                              "dd MMM yyyy hh:mm a"
                                            )}
                                          </Typography>
                                        </Box>
                                      </Grid>
                                    </Grid>

                                    <Box
                                      margin="auto"
                                      width={{ xs: "100%", md: "75%" }}
                                      my={2}
                                      style={{
                                        display:
                                          index === arr.length - 1
                                            ? "none"
                                            : "block",
                                      }}
                                    >
                                      {index === 0 && (
                                        <Typography
                                          sx={{
                                            color: "var(--primary-color)",
                                            backgroundColor:
                                              "var(--transit-color)",
                                            padding: "2px 20px",
                                            my: 3,
                                            display: "flex",
                                            justifyContent: "center",
                                            zIndex: 1,
                                            fontSize: "12px",
                                          }}
                                        >
                                          Change planes at{" "}
                                          {data?.arrivalAirport}, Transit Time:{" "}
                                          {transit?.go?.transit1}
                                        </Typography>
                                      )}
                                      {index === 1 && (
                                        <Typography
                                          sx={{
                                            color: "var(--primary-color)",
                                            backgroundColor:
                                              "var(--transit-color)",
                                            padding: "2px 20px",
                                            my: 3,
                                            display: "flex",
                                            justifyContent: "center",
                                            zIndex: 1,
                                            fontSize: "12px",
                                          }}
                                        >
                                          Change planes at{" "}
                                          {data?.arrivalAirport}, Transit Time:{" "}
                                          {transit?.go?.transit2}
                                        </Typography>
                                      )}
                                    </Box>
                                  </Box>
                                ))}
                              </Box>
                            )}

                            {activeBack && (
                              <Box>
                                {segments.back.map((data, index, arr) => (
                                  <Box my={2}>
                                    <Grid container columnSpacing={1}>
                                      {/* 1st  */}
                                      <Grid item md={3.5}>
                                        <Stack direction="row">
                                          <Box width="40px" height="40px">
                                            <img
                                              src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${
                                                data.marketingcareer ===
                                                data.operatingcareer
                                                  ? data?.marketingcareer
                                                  : data?.operatingcareer
                                              }.png`}
                                              className={`${system
                                                ?.toLowerCase()
                                                ?.split(" ")
                                                ?.join("-")}-border`}
                                              width="40px"
                                              height="40px"
                                              alt={`${data.marketingcareer}`}
                                            />
                                          </Box>
                                          <Box>
                                            <Typography
                                              sx={{
                                                fontSize: "14px",
                                                color: "var(--primary-color)",
                                                fontWeight: 500,
                                              }}
                                            >
                                              {data?.marketingcareerName}
                                            </Typography>
                                            <Typography
                                              sx={{
                                                fontSize: "12px",
                                                color: "var(--text-black)",
                                              }}
                                            >
                                              {data.marketingcareer ===
                                              data.operatingcareer ? (
                                                <>
                                                  {data.marketingcareer}&nbsp;
                                                  {data.marketingflight}
                                                </>
                                              ) : (
                                                <>
                                                  {data.operatingcareer}&nbsp;
                                                  {data.operatingflight}
                                                </>
                                              )}
                                              {", "}
                                              Class: {data?.bookingcode}, Seat:{" "}
                                              {data?.seat || 2}
                                            </Typography>
                                            <Typography
                                              sx={{
                                                fontSize: "12px",
                                                color: "var(--text-color-g)",
                                              }}
                                            >
                                              Operated by{" "}
                                              {data?.operatingcareer}
                                            </Typography>
                                          </Box>
                                        </Stack>
                                      </Grid>
                                      {/* 2nd  */}
                                      <Grid item md={3}>
                                        <Box>
                                          <Typography
                                            sx={{
                                              fontSize: "14px",
                                              color: "var(--primary-color)",
                                              fontWeight: 500,
                                            }}
                                          >
                                            {data?.departureLocation}-(
                                            {data?.departure})
                                          </Typography>
                                          <Tooltip
                                            title={`(${data?.departure}) ${data?.departureAirport}`}
                                          >
                                            <Typography
                                              sx={{
                                                fontSize: "12px",
                                                color: "var(--text-black)",
                                                width: "90%",
                                              }}
                                              noWrap
                                            >
                                              {data?.departureAirport}
                                            </Typography>
                                          </Tooltip>
                                          <Typography
                                            sx={{
                                              fontSize: "12px",
                                              color: "var(--text-color-g)",
                                            }}
                                          >
                                            {format(
                                              new Date(
                                                data?.departureTime.toString()
                                              ),
                                              "dd MMM yyyy hh:mm a"
                                            )}
                                          </Typography>
                                        </Box>
                                      </Grid>
                                      {/* 3rd  */}
                                      <Grid
                                        item
                                        md={2.5}
                                        textAlign="center"
                                        px={{ xs: 1, md: 2 }}
                                      >
                                        <Typography
                                          sx={{
                                            fontSize: "12px",
                                            color: "var(--secondary-color)",
                                            fontWeight: 500,
                                          }}
                                        >
                                          {data.flightduration}
                                        </Typography>
                                        <Stack
                                          direction="row"
                                          justifyContent="space-between"
                                          alignItems="center"
                                        >
                                          <IoAirplaneSharp
                                            style={{
                                              color: "var(--text-color-g)",
                                              fontSize: "25px",
                                              cursor: "pointer",
                                            }}
                                          />
                                          <Box width="100%">
                                            <hr />
                                          </Box>
                                          <CircleIcon
                                            sx={{
                                              color: "#c7c7c7",
                                              fontSize: "12px",
                                              cursor: "pointer",
                                            }}
                                          />
                                        </Stack>
                                      </Grid>
                                      {/* 4th  */}

                                      <Grid item md={3}>
                                        <Box>
                                          <Typography
                                            sx={{
                                              fontSize: "14px",
                                              color: "var(--primary-color)",
                                              fontWeight: 500,
                                            }}
                                          >
                                            {data?.arrivalLocation}-(
                                            {data?.arrival})
                                          </Typography>
                                          <Tooltip
                                            title={`(${data?.departure}) ${data?.departureAirport}`}
                                          >
                                            <Typography
                                              sx={{
                                                fontSize: "12px",
                                                color: "var(--text-black)",
                                                width: "90%",
                                              }}
                                              noWrap
                                            >
                                              {data?.arrivalAirport}
                                            </Typography>
                                          </Tooltip>
                                          <Typography
                                            sx={{
                                              fontSize: "12px",
                                              color: "var(--text-color-g)",
                                            }}
                                          >
                                            {format(
                                              new Date(
                                                data?.arrivalTime.toString()
                                              ),
                                              "dd MMM yyyy hh:mm a"
                                            )}
                                          </Typography>
                                        </Box>
                                      </Grid>
                                    </Grid>

                                    <Box
                                      margin="auto"
                                      width={{ xs: "100%", md: "75%" }}
                                      my={2}
                                      style={{
                                        display:
                                          index === arr.length - 1
                                            ? "none"
                                            : "block",
                                      }}
                                    >
                                      {index === 0 && (
                                        <Typography
                                          sx={{
                                            color: "var(--primary-color)",
                                            backgroundColor:
                                              "var(--transit-color)",
                                            padding: "2px 20px",
                                            my: 3,
                                            display: "flex",
                                            justifyContent: "center",
                                            zIndex: 1,
                                            fontSize: "12px",
                                          }}
                                        >
                                          Change planes at{" "}
                                          {data?.arrivalAirport}, Transit Time:{" "}
                                          {transit?.back?.transit1}
                                        </Typography>
                                      )}
                                      {index === 1 && (
                                        <Typography
                                          sx={{
                                            color: "var(--primary-color)",
                                            backgroundColor:
                                              "var(--transit-color)",
                                            padding: "2px 20px",
                                            my: 3,
                                            display: "flex",
                                            justifyContent: "center",
                                            zIndex: 1,
                                            fontSize: "12px",
                                          }}
                                        >
                                          Change planes at{" "}
                                          {data?.arrivalAirport}, Transit Time:{" "}
                                          {transit?.back?.transit2}
                                        </Typography>
                                      )}
                                    </Box>
                                  </Box>
                                ))}
                              </Box>
                            )}
                          </Box>
                        </TabPanel>
                        {/* //todo:Fare Summery */}
                        <TabPanel value="2">
                          <Box className="flight-search-table">
                            <table>
                              <tr>
                                <th>Pax Type</th>
                                <th>Base Fare</th>
                                <th>Tax</th>
                                <th>Total</th>
                                <th>Pax Count</th>
                                <th>Service Fee</th>
                                <th>Sub Total</th>
                              </tr>
                              {adultCount > 0 &&
                              childCount > 0 &&
                              infant > 0 ? (
                                <>
                                  <tr>
                                    <td>Adult x({adultCount})</td>
                                    <td>
                                      {commaNumber(pricebreakdown[0]?.BaseFare)}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(pricebreakdown[0]?.Tax)}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(
                                        parseInt(pricebreakdown[0]?.BaseFare) +
                                          parseInt(pricebreakdown[0]?.Tax)
                                      )}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(pricebreakdown[0]?.PaxCount)}
                                    </td>

                                    <td>
                                      {commaNumber(
                                        pricebreakdown[0]?.ServiceFee
                                      )}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(
                                        (parseInt(pricebreakdown[0]?.BaseFare) +
                                          parseInt(pricebreakdown[0]?.Tax) +
                                          parseInt(
                                            pricebreakdown[0]?.ServiceFee
                                          )) *
                                          pricebreakdown[0]?.PaxCount
                                      )}
                                      &nbsp;৳
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Child x({childCount})</td>
                                    <td>
                                      {commaNumber(pricebreakdown[1]?.BaseFare)}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(pricebreakdown[1]?.Tax)}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(
                                        parseInt(pricebreakdown[1]?.BaseFare) +
                                          parseInt(pricebreakdown[1]?.Tax)
                                      )}
                                      &nbsp;৳
                                    </td>
                                    <td>{pricebreakdown[1]?.PaxCount}</td>

                                    <td>
                                      {commaNumber(
                                        pricebreakdown[1]?.ServiceFee
                                      )}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(
                                        (parseInt(pricebreakdown[1]?.BaseFare) +
                                          parseInt(pricebreakdown[1]?.Tax) +
                                          parseInt(
                                            pricebreakdown[1]?.ServiceFee
                                          )) *
                                          pricebreakdown[1]?.PaxCount
                                      )}
                                      &nbsp;৳
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Infant x({infant})</td>
                                    <td>
                                      {commaNumber(pricebreakdown[2]?.BaseFare)}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(pricebreakdown[2]?.Tax)}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(
                                        parseInt(pricebreakdown[2]?.BaseFare) +
                                          parseInt(pricebreakdown[2]?.Tax)
                                      )}
                                      &nbsp;৳
                                    </td>
                                    <td>{pricebreakdown[2]?.PaxCount}</td>

                                    <td>
                                      {commaNumber(
                                        pricebreakdown[2]?.ServiceFee
                                      )}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(
                                        (parseInt(pricebreakdown[2]?.BaseFare) +
                                          parseInt(pricebreakdown[2]?.Tax) +
                                          parseInt(
                                            pricebreakdown[2]?.ServiceFee
                                          )) *
                                          pricebreakdown[2]?.PaxCount
                                      )}
                                      &nbsp;৳
                                    </td>
                                  </tr>
                                </>
                              ) : adultCount > 0 && childCount > 0 ? (
                                <>
                                  <tr>
                                    <td>Adult x({adultCount})</td>
                                    <td>
                                      {commaNumber(pricebreakdown[0]?.BaseFare)}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(pricebreakdown[0]?.Tax)}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(
                                        parseInt(pricebreakdown[0]?.BaseFare) +
                                          parseInt(pricebreakdown[0]?.Tax)
                                      )}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(pricebreakdown[0]?.PaxCount)}
                                    </td>

                                    <td>
                                      {commaNumber(
                                        pricebreakdown[0]?.ServiceFee
                                      )}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(
                                        (parseInt(pricebreakdown[0]?.BaseFare) +
                                          parseInt(pricebreakdown[0]?.Tax) +
                                          parseInt(
                                            pricebreakdown[0]?.ServiceFee
                                          )) *
                                          pricebreakdown[0]?.PaxCount
                                      )}
                                      &nbsp;৳
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Child x({childCount})</td>
                                    <td>
                                      {commaNumber(pricebreakdown[1]?.BaseFare)}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(pricebreakdown[1]?.Tax)}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(
                                        parseInt(pricebreakdown[1]?.BaseFare) +
                                          parseInt(pricebreakdown[1]?.Tax)
                                      )}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(pricebreakdown[1]?.PaxCount)}
                                    </td>

                                    <td>
                                      {commaNumber(
                                        pricebreakdown[1]?.ServiceFee
                                      )}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(
                                        (parseInt(pricebreakdown[1]?.BaseFare) +
                                          parseInt(pricebreakdown[1]?.Tax) +
                                          parseInt(
                                            pricebreakdown[1]?.ServiceFee
                                          )) *
                                          pricebreakdown[1]?.PaxCount
                                      )}
                                      &nbsp;৳
                                    </td>
                                  </tr>
                                </>
                              ) : adultCount > 0 && infant > 0 ? (
                                <>
                                  <tr>
                                    <td>Adult x({adultCount})</td>
                                    <td>
                                      {commaNumber(pricebreakdown[0]?.BaseFare)}
                                      &nbsp;৳
                                    </td>
                                    <td>{pricebreakdown[0]?.Tax}&nbsp;৳</td>
                                    <td>
                                      {commaNumber(
                                        parseInt(pricebreakdown[0]?.BaseFare) +
                                          parseInt(pricebreakdown[0]?.Tax)
                                      )}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(pricebreakdown[0]?.PaxCount)}
                                    </td>

                                    <td>
                                      {commaNumber(
                                        pricebreakdown[0]?.ServiceFee
                                      )}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(
                                        (parseInt(pricebreakdown[0]?.BaseFare) +
                                          parseInt(pricebreakdown[0]?.Tax) +
                                          parseInt(
                                            pricebreakdown[0]?.ServiceFee
                                          )) *
                                          pricebreakdown[0]?.PaxCount
                                      )}
                                      &nbsp;৳
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Infant x({infant})</td>
                                    <td>
                                      {commaNumber(pricebreakdown[1]?.BaseFare)}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(pricebreakdown[1]?.Tax)}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(
                                        parseInt(pricebreakdown[1]?.BaseFare) +
                                          parseInt(pricebreakdown[1]?.Tax)
                                      )}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(pricebreakdown[1]?.PaxCount)}
                                    </td>

                                    <td>
                                      {commaNumber(
                                        pricebreakdown[1]?.ServiceFee
                                      )}
                                      &nbsp;৳
                                    </td>
                                    <td>
                                      {commaNumber(
                                        (parseInt(pricebreakdown[1]?.BaseFare) +
                                          parseInt(pricebreakdown[1]?.Tax) +
                                          parseInt(
                                            pricebreakdown[1]?.ServiceFee
                                          )) *
                                          pricebreakdown[1]?.PaxCount
                                      )}
                                      &nbsp;৳
                                    </td>
                                  </tr>
                                </>
                              ) : (
                                <tr>
                                  <td>Adult x({adultCount})</td>
                                  <td>
                                    {commaNumber(pricebreakdown[0]?.BaseFare)}
                                    &nbsp;৳
                                  </td>
                                  <td>
                                    {commaNumber(pricebreakdown[0]?.Tax)}
                                    &nbsp;৳
                                  </td>
                                  <td>
                                    {commaNumber(
                                      parseInt(pricebreakdown[0]?.BaseFare) +
                                        parseInt(pricebreakdown[0]?.Tax)
                                    )}
                                    &nbsp;৳
                                  </td>
                                  <td>
                                    {commaNumber(pricebreakdown[0]?.PaxCount)}
                                  </td>

                                  <td>
                                    {commaNumber(pricebreakdown[0]?.ServiceFee)}
                                    &nbsp;৳
                                  </td>
                                  <td>
                                    {commaNumber(
                                      (parseInt(pricebreakdown[0]?.BaseFare) +
                                        parseInt(pricebreakdown[0]?.Tax) +
                                        parseInt(
                                          pricebreakdown[0]?.ServiceFee
                                        )) *
                                        pricebreakdown[0]?.PaxCount
                                    )}
                                    &nbsp;৳
                                  </td>
                                </tr>
                              )}
                            </table>
                          </Box>
                        </TabPanel>

                        {/*  //todo: Baggage*/}
                        <TabPanel value="3">
                          <Box className="flight-search-table">
                            <table>
                              <tr>
                                <th>Baggage</th>
                                <th>Check-In</th>
                                <th>Cabin</th>
                              </tr>

                              <tr>
                                <td>Adult</td>
                                <td>
                                  {bags === "3" ||
                                  bags === "2" ||
                                  bags === "1" ? (
                                    <>{bags?.split(" ")[0]} Piece</>
                                  ) : bags === " " ? (
                                    <>0 Kg</>
                                  ) : (
                                    <>{bags?.slice(0, 2) || 0} Kg</>
                                  )}
                                </td>
                                <td>7 Kg</td>
                              </tr>
                              {childCount > 0 && (
                                <tr>
                                  <td>Child</td>
                                  <td>
                                    {bags === "3" ||
                                    bags === "2" ||
                                    bags === "1" ? (
                                      <>{bags?.split(" ")[0]} Piece</>
                                    ) : bags === " " ? (
                                      <>0 Kg</>
                                    ) : bags.length === 6 ? (
                                      <>{bags?.slice(2, 4) || 0} Kg </>
                                    ) : (
                                      <>{bags?.slice(0, 2) || 0} Kg</>
                                    )}
                                  </td>
                                  <td>7 Kg</td>
                                </tr>
                              )}
                              {infant > 0 && (
                                <tr>
                                  <td>Infant</td>
                                  <td>
                                    {bags === "3" ||
                                    bags === "2" ||
                                    bags === "1" ? (
                                      <>{bags?.split(" ")[0]} Piece</>
                                    ) : bags === " " ? (
                                      <>0 Kg</>
                                    ) : bags.length === 6 ? (
                                      <>{bags?.slice(4, 6) || 0} Kg </>
                                    ) : (
                                      <>{bags?.slice(0, 2) || 0} Kg</>
                                    )}
                                  </td>
                                  <td>7 Kg</td>
                                </tr>
                              )}
                            </table>
                          </Box>
                        </TabPanel>
                        {/*  //todo: Policy*/}
                        <TabPanel value="4">
                          <FarePolicy />
                        </TabPanel>
                      </TabContext>
                    </Box>
                  </Collapse>
                </Grid>
              </Box>
              <Box>
                <FlightUserInformationReturn
                  loadData={loadData}
                  flightData={location.state.roundData}
                  tripType={location.state.tripType}
                  allData={location.state}
                  isLoaded={isLoaded}
                  adultCount={adultCount}
                  childCount={childCount}
                  infant={infant}
                  setIsLoaded={setIsLoaded}
                  SearchID={location?.state?.roundData?.SearchID}
                  ResultID={location?.state?.roundData?.ResultID}
                  limitTime={limitTime}
                />
              </Box>
            </Grid>

            <Grid item md={3}>
              <Box sx={{ background: "#ffff" }} p={1} mt={7.5}>
                <FlightPriceBreakdownOneway flightData2={returnFlightData} />
              </Box>
            </Grid>
          </Grid>
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
      </Container>
    </Box>
  );
};

export default FlightInformationReturn;
