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
import FarePolicy from "../../Dashboard/FlightSearch/FarePolicy";

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

const FlightInformationReturnData = ({ flightData }) => {
  const searchData = secureLocalStorage.getItem("search-data");

  const [flightDetails, setFlightDetails] = useState(true);
  const location = useLocation();

  const adultCount = searchData?.adultCount;

  const childCount = searchData?.childCount;
  const infant = searchData?.infant;

  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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

  const goMarcketingCareerCode = flightData?.segments?.go
    .map((data) => data?.marketingcareer)

    .filter((value, index, arr) => arr.indexOf(value) === index);
  const backMarcketingCareerCode = flightData?.segments.back
    .map((data) => data?.marketingcareer)
    .filter((value, index, arr) => arr.indexOf(value) === index);

  return (
    <Box>
      <Box>
        <Typography sx={{ fontSize: "24px", fontWeight: 500, mt: 2, mb: 1 }}>
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
                        className={`${flightData?.system
                          ?.toLowerCase()
                          ?.split(" ")
                          ?.join("-")}-border`}
                        alt={`${flightData?.segments?.go[0].marketingcareer}`}
                      />
                    ))}
                  </Box>
                  <Box width="90%">
                    <Tooltip
                      title={`${flightData?.segments.go
                        .map((data) => data?.marketingcareerName)

                        .filter(
                          (value, index, arr) => arr.indexOf(value) === index
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
                      >{`${flightData?.segments.go
                        .map((data) => data?.marketingcareerName)
                        .filter(
                          (value, index, arr) => arr.indexOf(value) === index
                        )
                        .join(", ")}`}</Typography>
                    </Tooltip>
                    <Tooltip
                      title={`${flightData?.segments.go
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
                        {`${flightData?.segments.go
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
              {/* go 2nd  */}
              <Grid item xs={12} md={3}>
                <Box>
                  <Tooltip
                    title={`${flightData?.godeparture} ${
                      flightData?.segments?.go[0]?.departureLocation?.split(
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
                        flightData?.segments.go[0]?.departureLocation?.split(
                          ","
                        )[0]
                      }
                      <span style={{ color: "var(--primary-color)" }}>
                        {flightData?.godepartureTime?.substring(0, 5)}
                      </span>
                    </Typography>
                  </Tooltip>

                  <Tooltip title={flightData?.segments.go[0]?.departureAirport}>
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
                      {flightData?.segments.go[0]?.departureAirport}
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
                    {flightData?.godepartureDate}
                  </Typography>
                </Box>
              </Grid>
              {/* go 3rd  */}
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
                    {flightData?.goflightduration}
                  </Typography>
                  <Box px={1}>
                    <Box textAlign={"center"}>
                      <Typography>
                        {/* ---------stops------ */}

                        {flightData?.segments?.go?.length === 3 ? (
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
                                            {flightData?.godeparture}
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
                                            {flightData?.goarrival}
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
                                          flightData?.segments?.go[0]?.arrivalLocation?.split(
                                            ","
                                          )[0]
                                        }
                                      </span>
                                      <br />
                                      {
                                        flightData?.segments?.go[1]
                                          ?.marketingcareer
                                      }
                                      &nbsp;
                                      {
                                        flightData?.segments?.go[1]
                                          ?.marketingflight
                                      }{" "}
                                      <span> | </span>
                                      {flightData?.transit?.go?.transit1}
                                    </Typography>
                                  </React.Fragment>
                                }
                                followCursor
                              >
                                <Box className="arival-text">
                                  {flightData?.segments?.go[0]?.arrival}
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
                                          flightData?.segments?.go[1]?.arrivalLocation?.split(
                                            ","
                                          )[0]
                                        }
                                      </span>
                                      <br />
                                      {
                                        flightData?.segments?.go[2]
                                          ?.marketingcareer
                                      }
                                      &nbsp;
                                      {
                                        flightData?.segments?.go[2]
                                          ?.marketingflight
                                      }
                                      <span> | </span>
                                      {flightData?.transit?.go?.transit2}
                                    </Typography>
                                  </React.Fragment>
                                }
                                followCursor
                              >
                                <Box className="arival-text">
                                  {flightData?.segments?.go[1]?.arrival}
                                </Box>
                              </HtmlTooltip>
                            </Typography>
                          </Box>
                        ) : flightData?.segments?.go.length === 2 ? (
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
                                            {flightData?.godeparture}
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
                                            {flightData?.goarrival}
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
                                          flightData?.segments?.go[0]?.arrivalLocation?.split(
                                            ","
                                          )[0]
                                        }{" "}
                                      </span>
                                      <br />
                                      {
                                        flightData?.segments?.go[1]
                                          ?.marketingcareer
                                      }
                                      &nbsp;
                                      {
                                        flightData?.segments?.go[1]
                                          ?.marketingflight
                                      }
                                      <span> | </span>
                                      {flightData?.transit?.go?.transit1}
                                    </Typography>
                                  </React.Fragment>
                                }
                                followCursor
                              >
                                <Box className="arival-text2">
                                  {flightData?.segments?.go[0]?.arrival}
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
                                            {flightData?.godeparture}
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
                                            {flightData?.goarrival}
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
              {/* go 4th  */}
              <Grid item xs={12} md={3} textAlign="left">
                <Box>
                  <Tooltip
                    title={`${
                      flightData?.segments.go[
                        flightData?.segments.go.length - 1
                      ].arrival
                    } ${
                      flightData?.segments.go[
                        flightData?.segments.go.length - 1
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
                        flightData?.segments.go[
                          flightData?.segments.go.length - 1
                        ].arrivalLocation?.split(",")[0]
                      }
                      <span style={{ color: "var(--primary-color)" }}>
                        {flightData?.goarrivalTime?.substring(0, 5)}
                      </span>
                    </Typography>
                  </Tooltip>

                  <Tooltip
                    title={
                      flightData?.segments?.go[
                        flightData?.segments?.go?.length - 1
                      ]?.arrivalAirport
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
                        flightData?.segments?.go[
                          flightData?.segments?.go?.length - 1
                        ]?.arrivalAirport
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
                    {flightData?.goarrivalDate}
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
                        className={`${flightData?.system
                          ?.toLowerCase()
                          ?.split(" ")
                          ?.join("-")}-border`}
                        alt={`${flightData?.segments?.back[0].marketingcareer}`}
                      />
                    ))}
                  </Box>
                  <Box width="90%">
                    <Tooltip
                      title={`${flightData?.segments.back
                        .map((data) => data?.marketingcareerName)
                        .filter(
                          (value, index, arr) => arr.indexOf(value) === index
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
                      >{`${flightData?.segments.back
                        .map((data) => data?.marketingcareerName)
                        .filter(
                          (value, index, arr) => arr.indexOf(value) === index
                        )
                        .join(", ")}`}</Typography>
                    </Tooltip>
                    <Tooltip
                      title={`${flightData?.segments.back
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
                        {`${flightData?.segments.back
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
              {/* back 2nd  */}
              <Grid item xs={12} md={3}>
                <Box>
                  <Tooltip
                    title={`${flightData?.backdeparture} ${
                      flightData?.segments?.back[0]?.departureLocation?.split(
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
                        flightData?.segments.back[0]?.departureLocation?.split(
                          ","
                        )[0]
                      }
                      <span style={{ color: "var(--primary-color)" }}>
                        {flightData?.backdepartureTime?.substring(0, 5)}
                      </span>
                    </Typography>
                  </Tooltip>

                  <Tooltip
                    title={flightData?.segments.back[0]?.departureAirport}
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
                      {flightData?.segments.back[0]?.departureAirport}
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
                    {flightData?.backdepartureDate}
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
                    {flightData?.backflightduration}
                  </Typography>
                  <Box px={1}>
                    <Box textAlign={"center"}>
                      <Typography>
                        {/* ---------stops------ */}

                        {flightData?.segments?.back?.length === 3 ? (
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
                                            {flightData?.backdeparture}
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
                                            {flightData?.backarrival}
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
                                          flightData?.segments?.back[0]?.arrivalLocation?.split(
                                            ","
                                          )[0]
                                        }
                                      </span>
                                      <br />
                                      {
                                        flightData?.segments?.back[1]
                                          ?.marketingcareer
                                      }
                                      &nbsp;
                                      {
                                        flightData?.segments?.back[1]
                                          ?.marketingflight
                                      }{" "}
                                      <span> | </span>
                                      {flightData?.transit?.back?.transit1}
                                    </Typography>
                                  </React.Fragment>
                                }
                                followCursor
                              >
                                <Box className="arival-text">
                                  {flightData?.segments?.back[0]?.arrival}
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
                                          flightData?.segments?.back[1]?.arrivalLocation?.split(
                                            ","
                                          )[0]
                                        }
                                      </span>
                                      <br />
                                      {
                                        flightData?.segments?.back[2]
                                          ?.marketingcareer
                                      }
                                      &nbsp;
                                      {
                                        flightData?.segments?.back[2]
                                          ?.marketingflight
                                      }
                                      <span> | </span>
                                      {flightData?.transit?.back?.transit2}
                                    </Typography>
                                  </React.Fragment>
                                }
                                followCursor
                              >
                                <Box className="arival-text">
                                  {flightData?.segments?.back[1]?.arrival}
                                </Box>
                              </HtmlTooltip>
                            </Typography>
                          </Box>
                        ) : flightData?.segments?.back.length === 2 ? (
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
                                            {flightData?.backdeparture}
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
                                            {flightData?.backarrival}
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
                                          flightData?.segments?.back[0]?.arrivalLocation?.split(
                                            ","
                                          )[0]
                                        }{" "}
                                      </span>
                                      <br />
                                      {
                                        flightData?.segments?.back[1]
                                          ?.marketingcareer
                                      }
                                      &nbsp;
                                      {
                                        flightData?.segments?.back[1]
                                          ?.marketingflight
                                      }
                                      <span> | </span>
                                      {flightData?.transit?.back?.transit1}
                                    </Typography>
                                  </React.Fragment>
                                }
                                followCursor
                              >
                                <Box className="arival-text2">
                                  {flightData?.segments?.back[0]?.arrival}
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
                                            {flightData?.backdeparture}
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
                                            {flightData?.backarrival}
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
              {/* back 4th  */}
              <Grid item xs={12} md={3} textAlign="left">
                <Box>
                  <Tooltip
                    title={`${
                      flightData?.segments.back[
                        flightData?.segments.back.length - 1
                      ].arrival
                    } ${
                      flightData?.segments.back[
                        flightData?.segments.back.length - 1
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
                        flightData?.segments.back[
                          flightData?.segments.back.length - 1
                        ].arrivalLocation?.split(",")[0]
                      }
                      <span style={{ color: "var(--primary-color)" }}>
                        {flightData?.backarrivalTime?.substring(0, 5)}
                      </span>
                    </Typography>
                  </Tooltip>

                  <Tooltip
                    title={
                      flightData?.segments?.back[
                        flightData?.segments?.back?.length - 1
                      ]?.arrivalAirport
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
                        flightData?.segments?.back[
                          flightData?.segments?.back?.length - 1
                        ]?.arrivalAirport
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
                    {flightData?.backarrivalDate}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

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
                            activeGo ? "var(--white)" : "var(--primary-color)"
                          }`,
                          padding: "0 10px",
                          width: "fit-content",
                          cursor: "pointer",
                        }}
                        fontSize="14px"
                      >
                        {flightData?.godeparture}&nbsp;&nbsp;{" "}
                        <TrendingFlatIcon />
                        &nbsp;&nbsp;{flightData?.goarrival}
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
                            activeBack ? "var(--white)" : "var(--primary-color)"
                          }`,
                          padding: "0 10px",
                          width: "fit-content",
                          cursor: "pointer",
                        }}
                        fontSize="14px"
                      >
                        {flightData?.backdeparture}&nbsp;&nbsp;{" "}
                        <TrendingFlatIcon />
                        &nbsp;&nbsp; {flightData?.backarrival}
                      </Box>
                    </Box>
                    {activeGo && (
                      <Box>
                        {flightData?.segments.go.map((data, index, arr) => (
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
                                      new Date(data?.departureTime.toString()),
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
                                    fontSize: "12px",
                                  }}
                                >
                                  Change planes at {data?.arrivalAirport},
                                  Transit Time:{" "}
                                  {flightData?.transit?.go?.transit1}
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
                                  Change planes at {data?.arrivalAirport},
                                  Transit Time:{" "}
                                  {flightData?.transit?.go?.transit2}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    )}

                    {activeBack && (
                      <Box>
                        {flightData?.segments.back.map((data, index, arr) => (
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
                                      new Date(data?.departureTime.toString()),
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
                                    fontSize: "12px",
                                  }}
                                >
                                  Change planes at {data?.arrivalAirport},
                                  Transit Time:{" "}
                                  {flightData?.transit?.back?.transit1}
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
                                  Change planes at {data?.arrivalAirport},
                                  Transit Time:{" "}
                                  {flightData?.transit?.back?.transit2}
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
                      {adultCount > 0 && childCount > 0 && infant > 0 ? (
                        <>
                          <tr>
                            <td>Adult x({flightData?.adultCount})</td>
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
                            <td>{flightData?.pricebreakdown[0]?.Tax}&nbsp;৳</td>
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
                {/*  //todo: Policy*/}
                <TabPanel value="4">
                  <FarePolicy />
                </TabPanel>
              </TabContext>
            </Box>
          </Collapse>
        </Grid>
      </Box>
    </Box>
  );
};

export default FlightInformationReturnData;
