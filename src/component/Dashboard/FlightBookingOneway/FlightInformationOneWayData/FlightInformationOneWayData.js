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
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CircleIcon from "@mui/icons-material/Circle";
import { IoAirplaneSharp } from "react-icons/io5";
import commaNumber from "comma-number";
import WorkIcon from "@mui/icons-material/Work";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import FarePolicy from "../../FlightSearch/FarePolicy";
import fakeData from "./fakeData";

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

const FlightInformationOneWayData = ({ flightData }) => {
  // const flightData = fakeData[0];

  const [value, setValue] = useState("1");
  const location = useLocation();
  const [flightDetails, setFlightDetails] = useState(true);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //   const { adultCount, childCount, infant } = location.state;
  const adultCount = 0;
  const childCount = 0;
  const infant = 0;

  const marcketingCareerCode = flightData.segments
    .map((data) => data?.marketingcareer)
    .filter((value, index, arr) => arr.indexOf(value) === index);

  return (
    <Box>
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
            px: 2,
            py: 3,
            columnSpacing: 2,
            rowSpacing: 2,
          }}
        >
          {/* 1st  */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
                justifyContent: "start",
                alignItems: "start",
              }}
            >
              {/* //todo: Image Part */}
              <Box>
                {marcketingCareerCode.map((data) => (
                  <img
                    src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data}.png`}
                    width="50px"
                    height="50px"
                    className={`${flightData?.system
                      ?.toLowerCase()
                      ?.split(" ")
                      ?.join("-")}-border`}
                    alt={`${flightData.segments[0]?.marketingcareer}`}
                  />
                ))}
              </Box>
              {/* //todo: Text Part */}
              <Box width="90%">
                <Tooltip
                  title={`${flightData.segments
                    .map((data) => data?.marketingcareerName)
                    .filter((value, index, arr) => arr.indexOf(value) === index)
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
                  >{`${flightData.segments
                    .map((data) => data?.marketingcareerName)
                    .filter((value, index, arr) => arr.indexOf(value) === index)
                    .join(", ")}`}</Typography>
                </Tooltip>
                <Tooltip
                  title={`${flightData.segments
                    .map(
                      (data) =>
                        `${
                          data.marketingcareer === data.operatingcareer
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
                    {`${flightData.segments
                      .map(
                        (data) =>
                          `${
                            data.marketingcareer === data.operatingcareer
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
          {/* 2nd  */}
          <Grid item xs={4} md={3}>
            <Box>
              <Tooltip
                title={`${flightData.departure}${", "} ${
                  flightData.segments[0].departureLocation?.split(",")[0]
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
                  {flightData.segments[0].departureLocation?.split(",")[0]}{" "}
                  <span style={{ color: "var(--primary-color)" }}>
                    {flightData?.departureTime}
                  </span>
                </Typography>
              </Tooltip>
              <Tooltip title={flightData?.segments[0]?.departureAirport}>
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
                  {flightData?.segments[0]?.departureAirport}
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
                {flightData?.departureDate}
              </Typography>
              <Typography
                sx={{
                  color: "var(--green-text)",
                  fontWeight: 500,
                  fontSize: {
                    md: "14px",
                    xs: "12px",
                  },
                  // display: { xs: "none", md: "flex" },

                  pt: { xs: "0", md: 3 },
                }}
                display={{ xs: "block", sm: "block" }}
              >
                {flightData?.refundable || "Non Refundable"}
              </Typography>
            </Box>
          </Grid>

          {/* 3rd  Animation and duration*/}
          <Grid item xs={4} md={3}>
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
                {flightData?.flightduration}
              </Typography>
              <Box px={1}>
                <Box textAlign={"center"}>
                  <Typography>
                    {/* ---------stops------ */}

                    {flightData?.segment === "3" ? (
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
                                        {flightData?.departure}
                                      </Typography>
                                    </React.Fragment>
                                  }
                                  followCursor
                                >
                                  <span>
                                    <CircleIcon
                                      sx={{
                                        color: "var(--gray-text-color)",
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
                                        {flightData?.arrival}
                                      </Typography>
                                    </React.Fragment>
                                  }
                                  followCursor
                                >
                                  <span>
                                    <CircleIcon
                                      sx={{
                                        color: "var(--gray-text-color)",
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
                                  <span style={{ fontSize: "12px" }}>
                                    {
                                      flightData?.segments[0]?.arrivalLocation?.split(
                                        ","
                                      )[0]
                                    }
                                  </span>
                                  <br />
                                  {flightData?.segments[1]?.marketingcareer}
                                  &nbsp;
                                  {
                                    flightData?.segments[1]?.marketingflight
                                  }{" "}
                                  <span> | </span>
                                  {flightData?.transit.transit1}
                                </Typography>
                              </React.Fragment>
                            }
                            followCursor
                          >
                            <Box className="arival-text">
                              {flightData?.segments[0]?.arrival}
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
                                  <span style={{ fontSize: "12px" }}>
                                    {
                                      flightData?.segments[1]?.arrivalLocation?.split(
                                        ","
                                      )[0]
                                    }
                                  </span>
                                  <br />
                                  {flightData?.segments[2]?.marketingcareer}
                                  &nbsp;
                                  {flightData?.segments[2]?.marketingflight}
                                  <span> | </span>
                                  {flightData?.transit.transit2}
                                </Typography>
                              </React.Fragment>
                            }
                            followCursor
                          >
                            <Box className="arival-text">
                              {" "}
                              {flightData?.segments[1]?.arrival}
                            </Box>
                          </HtmlTooltip>
                        </Typography>
                      </Box>
                    ) : flightData?.segment === "2" ? (
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
                                        {flightData?.departure}
                                      </Typography>
                                    </React.Fragment>
                                  }
                                  followCursor
                                >
                                  <span>
                                    <CircleIcon
                                      sx={{
                                        color: "var(--gray-text-color)",
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
                                        {flightData?.arrival}
                                      </Typography>
                                    </React.Fragment>
                                  }
                                  followCursor
                                >
                                  <span>
                                    <CircleIcon
                                      sx={{
                                        color: "var(--gray-text-color)",
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
                                  <span style={{ fontSize: "12px" }}>
                                    {
                                      flightData?.segments[0]?.arrivalLocation?.split(
                                        ","
                                      )[0]
                                    }{" "}
                                  </span>
                                  <br />
                                  {flightData?.segments[1]?.marketingcareer}
                                  &nbsp;
                                  {flightData?.segments[1]?.marketingflight}
                                  <span> | </span>
                                  {flightData?.transit.transit1}
                                </Typography>
                              </React.Fragment>
                            }
                            followCursor
                          >
                            <Box className="arival-text2">
                              {flightData?.segments[0]?.arrival}
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
                                        {flightData?.departure}
                                      </Typography>
                                    </React.Fragment>
                                  }
                                  followCursor
                                >
                                  <span>
                                    <CircleIcon
                                      sx={{
                                        color: "var(--gray-text-color)",
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
                                        {flightData?.arrival}
                                      </Typography>
                                    </React.Fragment>
                                  }
                                  followCursor
                                >
                                  <span>
                                    <CircleIcon
                                      sx={{
                                        color: "var(--gray-text-color)",
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
          
          {/* 4th */}
          <Grid item xs={4} md={3} textAlign="left">
            <Box>
              <Tooltip
                title={`${
                  flightData.segments[flightData.segments.length - 1].arrival
                }${", "} ${
                  flightData.segments[
                    flightData.segments.length - 1
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
                    flightData.segments[
                      flightData.segments.length - 1
                    ].arrivalLocation?.split(",")[0]
                  }
                  <span style={{ color: "var(--primary-color)" }}>
                    {flightData?.arrivalTime}
                  </span>
                </Typography>
              </Tooltip>
              <Tooltip
                title={
                  flightData?.segments[flightData?.segments?.length - 1]
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
                    flightData?.segments[flightData?.segments?.length - 1]
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
                {flightData?.arrivalDate}
              </Typography>
              <Box display={{ xs: "block", sm: "block" }}>
                <Stack
                  pt={{ md: 3 }}
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  spacing={1}
                >
                  <Stack direction="row" spacing={0.5}>
                    <WorkIcon
                      sx={{
                        color: "var(--primary-color)",
                        fontWeight: 500,
                        fontSize: {
                          xs: "10px",
                          sm: "16px",
                        },
                        display: { xs: "none", sm: "block" },
                      }}
                    />
                    <Typography
                      sx={{
                        color: "var(--primary-color)",
                        fontWeight: 500,
                        fontSize: {
                          xs: "10px",
                          sm: "14px",
                        },
                      }}
                    >
                      {parseInt(flightData.bags) > 4 ? (
                        <>{flightData?.bags?.slice(0, 2) || 0} Kg</>
                      ) : flightData.bags === "2 N" ? (
                        <>2 N</>
                      ) : flightData.bags === "2 P" ? (
                        <>2 P</>
                      ) : parseInt(flightData.bags) < 4 ? (
                        <>{parseInt(flightData.bags)} Piece</>
                      ) : parseInt(flightData.bags) === "NaN" ? (
                        <>{flightData.bags}</>
                      ) : (
                        <>0 Kg</>
                      )}
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontWeight: 500,
                      fontSize: {
                        xs: "10px",
                        sm: "14px",
                      },
                    }}
                  >
                    Seats: {flightData?.seat || 9}&nbsp;
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Grid>
          {/* 5th */}

          {/* //todo: price section */}

          {/* //todo:Flight Details start------------ */}
          <Collapse
            in={flightDetails}
            timeout="auto"
            unmountOnExit
            sx={{ width: "100%" }}
          >
            <Box sx={{ width: "100%", margin: "15px auto" }}>
              <TabContext value={value}>
                <Box
                  sx={{
                    width: { xs: "300px", sm: "fit-content" },
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
                      // scroller: {
                      //   flexGrow: "0",
                      // },
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
                        xs: "0px 2px",
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
                  <TabList
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    allowScrollButtonsMobile
                    aria-label="scrollable prevent tabs example"
                  >
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
                <TabPanel
                  className="tabs-details"
                  value="1"
                  sx={{ padding: 0, margin: 0 }}
                >
                  <Box>
                    <Typography
                      mb={3}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        bgcolor: "var(--transit-color)",
                        color: "var(--primary-color)",
                        padding: "0 10px",
                        width: "fit-content",
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                    >
                      {flightData.departure}&nbsp;&nbsp; <IoAirplaneSharp />
                      &nbsp;&nbsp; {flightData.arrival}
                    </Typography>
                    {flightData?.segments.map((data, index, arr) => (
                      <Box my={2}>
                        <Grid container columnSpacing={1} rowSpacing={2}>
                          {/* 1st  */}
                          <Grid item xs={12} sm={3.5}>
                            <Stack direction="row">
                              <Box width="40px" height="40px">
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${
                                    data.marketingcareer ===
                                    data.operatingcareer
                                      ? data?.marketingcareer
                                      : data?.operatingcareer
                                  }.png`}
                                  className={`${flightData?.system
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
                                  Operated by {data?.operatingcareer}
                                </Typography>
                              </Box>
                            </Stack>
                          </Grid>
                          {/* 2nd  */}
                          <Grid item xs={6} sm={3}>
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: { xs: "10px", sm: "14px" },
                                  color: "var(--primary-color)",
                                  fontWeight: 500,
                                }}
                                noWrap
                              >
                                {data?.departureLocation}-(
                                {data?.departure})
                              </Typography>
                              <Tooltip
                                title={`(${data?.departure}) ${data?.departureAirport}`}
                              >
                                <Typography
                                  sx={{
                                    fontSize: { xs: "10px", sm: "12px" },
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
                                  fontSize: { xs: "10px", sm: "12px" },
                                  color: "var(--text-color-g)",
                                }}
                              >
                                {format(
                                  new Date(data?.departureTime.toString()),
                                  "dd MMM yyyy hh:mm a"
                                )}
                              </Typography>
                            </Box>
                          </Grid>
                          {/* 3rd  */}
                          <Grid
                            item
                            sm={2.5}
                            textAlign="center"
                            px={{ xs: 1, md: 3 }}
                            display={{ xs: "none", sm: "block" }}
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

                          <Grid item xs={6} sm={3}>
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: { xs: "10px", sm: "14px" },
                                  color: "var(--primary-color)",
                                  fontWeight: 500,
                                }}
                                noWrap
                              >
                                {data?.arrivalLocation}-({data?.arrival})
                              </Typography>
                              <Tooltip
                                title={`(${data?.departure}) ${data?.departureAirport}`}
                              >
                                <Typography
                                  sx={{
                                    fontSize: { xs: "10px", sm: "12px" },
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
                                  fontSize: { xs: "10px", sm: "12px" },
                                  color: "var(--text-color-g)",
                                }}
                              >
                                {format(
                                  new Date(data?.departureTime.toString()),
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
                              index === arr.length - 1 ? "none" : "block",
                          }}
                        >
                          {index === 0 && (
                            <Typography
                              sx={{
                                color: "var(--primary-color)",
                                backgroundColor: "var(--transit-color)",
                                padding: "2px 20px",
                                my: 3,
                                display: "flex",
                                justifyContent: "center",
                                zIndex: 1,
                                fontSize: { xs: "10px", sm: "11px" },
                              }}
                            >
                              Change planes at {data?.arrivalAirport}, Transit
                              Time: {flightData?.transit?.transit1}
                            </Typography>
                          )}
                          {index === 1 && (
                            <Typography
                              sx={{
                                color: "var(--primary-color)",
                                backgroundColor: "var(--transit-color)",
                                padding: "2px 20px",
                                my: 3,
                                display: "flex",
                                justifyContent: "center",
                                zIndex: 1,
                                fontSize: "12px",
                              }}
                            >
                              Change planes at {data?.arrivalAirport}, Transit
                              Time: {flightData?.transit?.transit2}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    ))}
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
                      {adultCount > 0 && childCount > 0 && infant > 0 ? (
                        <>
                          <tr>
                            <td>Adult x({adultCount})</td>
                            <td>
                              {commaNumber(
                                flightData?.pricebreakdown[0]?.BaseFare
                              )}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(flightData?.pricebreakdown[0]?.Tax)}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(
                                parseInt(
                                  flightData?.pricebreakdown[0]?.BaseFare
                                ) + parseInt(flightData?.pricebreakdown[0]?.Tax)
                              )}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(
                                flightData?.pricebreakdown[0]?.PaxCount
                              )}
                            </td>

                            <td>
                              {commaNumber(
                                flightData?.pricebreakdown[0]?.ServiceFee
                              )}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(
                                (parseInt(
                                  flightData?.pricebreakdown[0]?.BaseFare
                                ) +
                                  parseInt(flightData?.pricebreakdown[0]?.Tax) +
                                  parseInt(
                                    flightData?.pricebreakdown[0]?.ServiceFee
                                  )) *
                                  flightData?.pricebreakdown[0]?.PaxCount
                              )}
                              &nbsp;৳
                            </td>
                          </tr>
                          <tr>
                            <td>Child x({childCount})</td>
                            <td>
                              {commaNumber(
                                flightData?.pricebreakdown[1]?.BaseFare
                              )}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(flightData?.pricebreakdown[1]?.Tax)}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(
                                parseInt(
                                  flightData?.pricebreakdown[1]?.BaseFare
                                ) + parseInt(flightData?.pricebreakdown[1]?.Tax)
                              )}
                              &nbsp;৳
                            </td>
                            <td>{flightData?.pricebreakdown[1]?.PaxCount}</td>

                            <td>
                              {commaNumber(
                                flightData?.pricebreakdown[1]?.ServiceFee
                              )}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(
                                (parseInt(
                                  flightData?.pricebreakdown[1]?.BaseFare
                                ) +
                                  parseInt(flightData?.pricebreakdown[1]?.Tax) +
                                  parseInt(
                                    flightData?.pricebreakdown[1]?.ServiceFee
                                  )) *
                                  flightData?.pricebreakdown[1]?.PaxCount
                              )}
                              &nbsp;৳
                            </td>
                          </tr>
                          <tr>
                            <td>Infant x({infant})</td>
                            <td>
                              {commaNumber(
                                flightData?.pricebreakdown[2]?.BaseFare
                              )}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(flightData?.pricebreakdown[2]?.Tax)}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(
                                parseInt(
                                  flightData?.pricebreakdown[2]?.BaseFare
                                ) + parseInt(flightData?.pricebreakdown[2]?.Tax)
                              )}
                              &nbsp;৳
                            </td>
                            <td>{flightData?.pricebreakdown[2]?.PaxCount}</td>

                            <td>
                              {commaNumber(
                                flightData?.pricebreakdown[2]?.ServiceFee
                              )}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(
                                (parseInt(
                                  flightData?.pricebreakdown[2]?.BaseFare
                                ) +
                                  parseInt(flightData?.pricebreakdown[2]?.Tax) +
                                  parseInt(
                                    flightData?.pricebreakdown[2]?.ServiceFee
                                  )) *
                                  flightData?.pricebreakdown[2]?.PaxCount
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
                              {commaNumber(
                                flightData?.pricebreakdown[0]?.BaseFare
                              )}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(flightData?.pricebreakdown[0]?.Tax)}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(
                                parseInt(
                                  flightData?.pricebreakdown[0]?.BaseFare
                                ) + parseInt(flightData?.pricebreakdown[0]?.Tax)
                              )}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(
                                flightData?.pricebreakdown[0]?.PaxCount
                              )}
                            </td>

                            <td>
                              {commaNumber(
                                flightData?.pricebreakdown[0]?.ServiceFee
                              )}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(
                                (parseInt(
                                  flightData?.pricebreakdown[0]?.BaseFare
                                ) +
                                  parseInt(flightData?.pricebreakdown[0]?.Tax) +
                                  parseInt(
                                    flightData?.pricebreakdown[0]?.ServiceFee
                                  )) *
                                  flightData?.pricebreakdown[0]?.PaxCount
                              )}
                              &nbsp;৳
                            </td>
                          </tr>
                          <tr>
                            <td>Child x({childCount})</td>
                            <td>
                              {commaNumber(
                                flightData?.pricebreakdown[1]?.BaseFare
                              )}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(flightData?.pricebreakdown[1]?.Tax)}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(
                                parseInt(
                                  flightData?.pricebreakdown[1]?.BaseFare
                                ) + parseInt(flightData?.pricebreakdown[1]?.Tax)
                              )}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(
                                flightData?.pricebreakdown[1]?.PaxCount
                              )}
                            </td>

                            <td>
                              {commaNumber(
                                flightData?.pricebreakdown[1]?.ServiceFee
                              )}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(
                                (parseInt(
                                  flightData?.pricebreakdown[1]?.BaseFare
                                ) +
                                  parseInt(flightData?.pricebreakdown[1]?.Tax) +
                                  parseInt(
                                    flightData?.pricebreakdown[1]?.ServiceFee
                                  )) *
                                  flightData?.pricebreakdown[1]?.PaxCount
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
                              {commaNumber(
                                flightData?.pricebreakdown[0]?.BaseFare
                              )}
                              &nbsp;৳
                            </td>
                            <td>
                              {flightData?.pricebreakdown[0]?.Tax}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(
                                parseInt(
                                  flightData?.pricebreakdown[0]?.BaseFare
                                ) + parseInt(flightData?.pricebreakdown[0]?.Tax)
                              )}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(
                                flightData?.pricebreakdown[0]?.PaxCount
                              )}
                            </td>

                            <td>
                              {commaNumber(
                                flightData?.pricebreakdown[0]?.ServiceFee
                              )}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(
                                (parseInt(
                                  flightData?.pricebreakdown[0]?.BaseFare
                                ) +
                                  parseInt(flightData?.pricebreakdown[0]?.Tax) +
                                  parseInt(
                                    flightData?.pricebreakdown[0]?.ServiceFee
                                  )) *
                                  flightData?.pricebreakdown[0]?.PaxCount
                              )}
                              &nbsp;৳
                            </td>
                          </tr>
                          <tr>
                            <td>Infant x({infant})</td>
                            <td>
                              {commaNumber(
                                flightData?.pricebreakdown[1]?.BaseFare
                              )}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(flightData?.pricebreakdown[1]?.Tax)}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(
                                parseInt(
                                  flightData?.pricebreakdown[1]?.BaseFare
                                ) + parseInt(flightData?.pricebreakdown[1]?.Tax)
                              )}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(
                                flightData?.pricebreakdown[1]?.PaxCount
                              )}
                            </td>

                            <td>
                              {commaNumber(
                                flightData?.pricebreakdown[1]?.ServiceFee
                              )}
                              &nbsp;৳
                            </td>
                            <td>
                              {commaNumber(
                                (parseInt(
                                  flightData?.pricebreakdown[1]?.BaseFare
                                ) +
                                  parseInt(flightData?.pricebreakdown[1]?.Tax) +
                                  parseInt(
                                    flightData?.pricebreakdown[1]?.ServiceFee
                                  )) *
                                  flightData?.pricebreakdown[1]?.PaxCount
                              )}
                              &nbsp;৳
                            </td>
                          </tr>
                        </>
                      ) : (
                        <tr>
                          <td>Adult x({adultCount})</td>
                          <td>
                            {commaNumber(
                              flightData?.pricebreakdown[0]?.BaseFare
                            )}
                            &nbsp;৳
                          </td>
                          <td>
                            {commaNumber(flightData?.pricebreakdown[0]?.Tax)}
                            &nbsp;৳
                          </td>
                          <td>
                            {commaNumber(
                              parseInt(
                                flightData?.pricebreakdown[0]?.BaseFare
                              ) + parseInt(flightData?.pricebreakdown[0]?.Tax)
                            )}
                            &nbsp;৳
                          </td>
                          <td>
                            {commaNumber(
                              flightData?.pricebreakdown[0]?.PaxCount
                            )}
                          </td>

                          <td>
                            {commaNumber(
                              flightData?.pricebreakdown[0]?.ServiceFee
                            )}
                            &nbsp;৳
                          </td>
                          <td>
                            {commaNumber(
                              (parseInt(
                                flightData?.pricebreakdown[0]?.BaseFare
                              ) +
                                parseInt(flightData?.pricebreakdown[0]?.Tax) +
                                parseInt(
                                  flightData?.pricebreakdown[0]?.ServiceFee
                                )) *
                                flightData?.pricebreakdown[0]?.PaxCount
                            )}
                            &nbsp;৳
                          </td>
                        </tr>
                      )}
                    </table>
                  </Box>
                </TabPanel>
                {/* //todo:Commission & Invoice */}

                {/*  //todo: Policy*/}
                <TabPanel value="3">
                  <FarePolicy flightData={flightData} />
                </TabPanel>
                {/*  //todo: Baggage*/}
                <TabPanel value="4">
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
                          {flightData?.bags === "3" ||
                          flightData?.bags === "2" ||
                          flightData?.bags === "1" ? (
                            <>{flightData?.bags?.split(" ")[0]} Piece</>
                          ) : flightData?.bags === " " ? (
                            <>0 Kg</>
                          ) : (
                            <>{flightData?.bags?.slice(0, 2) || 0} Kg</>
                          )}
                        </td>
                        <td>7 Kg</td>
                      </tr>
                      {childCount > 0 && (
                        <tr>
                          <td>Child</td>
                          <td>
                            {flightData?.bags === "3" ||
                            flightData?.bags === "2" ||
                            flightData?.bags === "1" ? (
                              <>{flightData?.bags?.split(" ")[0]} Piece</>
                            ) : flightData?.bags === " " ? (
                              <>0 Kg</>
                            ) : flightData?.bags.length === 6 ? (
                              <>{flightData?.bags?.slice(2, 4) || 0} Kg </>
                            ) : (
                              <>{flightData?.bags?.slice(0, 2) || 0} Kg</>
                            )}
                          </td>
                          <td>7 Kg</td>
                        </tr>
                      )}
                      {infant > 0 && (
                        <tr>
                          <td>Infant</td>
                          <td>
                            {flightData?.bags === "3" ||
                            flightData?.bags === "2" ||
                            flightData?.bags === "1" ? (
                              <>{flightData?.bags?.split(" ")[0]} Piece</>
                            ) : flightData?.bags === " " ? (
                              <>0 Kg</>
                            ) : flightData?.bags.length === 6 ? (
                              <>{flightData?.bags?.slice(4, 6) || 0} Kg </>
                            ) : (
                              <>{flightData?.bags?.slice(0, 2) || 0} Kg</>
                            )}
                          </td>
                          <td>7 Kg</td>
                        </tr>
                      )}
                    </table>
                  </Box>
                </TabPanel>
              </TabContext>
            </Box>
          </Collapse>
        </Grid>
      </Box>
    </Box>
  );
};

export default FlightInformationOneWayData;
