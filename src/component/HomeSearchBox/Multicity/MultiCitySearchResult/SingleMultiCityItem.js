import React, { useState } from "react";
import {
  Box,
  Grid,
  Tab,
  Typography,
  Tooltip,
  Button,
  Collapse,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { useNavigate } from "react-router-dom";
import FlightIcon from "@mui/icons-material/Flight";
import commaNumber from "comma-number";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import WorkIcon from "@mui/icons-material/Work";
import { format } from "date-fns";
import "./SingleMultiCityItem.css";
import FlightDetails from "../FlightDetails/FlightDetails";
import FareDetails from "../FareDetails/FareDetails";
import FarePolicy from "../FarePolicy/FarePolicy";
import Baggage from "../Baggage/Baggage";
import CommissionInvoice from "../CommissionInvoice/CommissionInvoice";
import EventSeatIcon from "@mui/icons-material/EventSeat";

const SingleMultiCityItem = ({
  flightData,
  adultCount,
  childCount,
  infant,
  to,
  from,
  tripType,
  fromAddress,
  toAddress,
  dDate,
  agentFarePrice,
  setAgentFarePrice,
  commisionFarePrice,
  setCommisionFarePrice,
  customerFare,
  setCustomerFare,
  isLoaded,
}) => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [flightDetails, setFlightDetails] = useState(false);
  const clientPrice = parseInt(
    flightData.system !== "Galileo"
      ? flightData?.customerPrice || flightData?.clientPrice
      : flightData?.price || flightData?.customerPrice
  );

  const clientFare = Math.round(clientPrice);
  const agentFare = Math.round(
    parseInt(
      flightData.system !== "Galileo"
        ? flightData?.subagentprice || flightData.price
        : flightData.subagentprice
    )
  );
  const commission = Math.round(clientFare - agentFare);

  const navigate = useNavigate();
  const FlightInformation = () => {
    navigate("/multicityflightinfo", {
      state: {
        flightData,
        adultCount,
        childCount,
        infant,
        to,
        from,
        tripType,
        fromAddress,
        toAddress,
        dDate,
        clientFare,
        agentFare,
        commission,
      },
    });
  };

  const paxCount = adultCount + childCount + infant;
  let count = [];
  for (let i = 0; i < paxCount; i++) {
    count.push(i);
  }
  //todo: calculate total flight duration
  const calDuration = (arr) => {
    const timeArr = arr.map((item) => item.flightduration);
    const convertTime = timeArr.map(
      (item) =>
        parseInt(item.split(" ")[0]) * 3600 * 1000 +
        parseInt(item.split(" ")[1]) * 60 * 1000
    );
    const milliseconds = convertTime.reduce((cur, acc) => cur + acc, 0);
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = seconds >= 30 ? minutes + 1 : minutes;
    minutes = minutes % 60;
    hours = hours % 24;
    return `${hours.toString().padStart(2, 0)}H:${minutes
      .toString()
      .padStart(2, 0)}Min`;
  };

  return (
    <Box>
      <Grid
        container
        sx={{
          transition: "all .5s ease-in-out",
          boxShadow:
            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
          marginBottom: "10px",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <Grid container sm={8} md={10} padding="15px 15px 0px 15px">
          <Grid item md={12} sm={12}>
            {flightData.segments.map((segment, i, arr) => (
              <Grid container height="100px" key={i}>
                {/* //todo: first section */}
                <Grid item md={5}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "start",
                      gap: "10px",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        width: "20%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "start",
                        flexDirection: "column",
                        gap: "3px",
                      }}
                    >
                      <Tooltip title={`${segment?.marketingcareerName}`}>
                        <Box sx={{ width: "50px", height: "50px" }}>
                          <img
                            src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segment?.marketingcareer}.png`}
                            className={`${flightData?.system?.toLowerCase()}`}
                            alt={`${segment?.marketingcareer}`}
                          />
                        </Box>
                      </Tooltip>
                      <Tooltip title={`${segment?.marketingcareerName}`}>
                        <Typography
                          sx={{
                            color: "var(--secondary-color)",
                            fontWeight: 400,
                            fontSize: {
                              xs: "14px",
                              sm: "14px",
                              md: "14px",
                              cursor: "pointer",
                            },
                            width: "100%",
                          }}
                          noWrap
                        >{`${segment?.marketingcareerName}`}</Typography>
                      </Tooltip>
                      <Tooltip
                        title={`${segment?.marketingcareer} ${segment?.marketingflight} & ${segment?.bookingcode}`}
                      >
                        <Typography
                          sx={{
                            color: "var(--black)",
                            fontWeight: 400,
                            fontSize: {
                              xs: "12px",
                              sm: "12px",
                              md: "12px",
                              cursor: "pointer",
                            },
                          }}
                          noWrap
                        >{`${segment?.marketingcareer} ${segment?.marketingflight} & ${segment?.bookingcode}`}</Typography>
                      </Tooltip>
                    </Box>
                    <Box
                      sx={{
                        width: "calc(80% - 10px)",
                        height: "100%",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "start",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        sx={{
                          width: "100%",
                          color: "var(--secondary-color)",
                          fontWeight: 500,
                        }}
                      >{`${segment?.departure} ${format(
                        new Date(segment?.departureTime),
                        "hh:mm a"
                      )}`}</Typography>
                      <Tooltip title={`${segment?.departureAirport}`}>
                        <Typography
                          sx={{
                            width: "100%",
                            cursor: "pointer",
                            color: "var(--secondary-color)",
                            fontWeight: "normal",
                          }}
                          noWrap
                        >{`${segment?.departureAirport}`}</Typography>
                      </Tooltip>
                      <Typography
                        sx={{
                          width: "100%",
                          fontSize: "14px",
                          color: "var(--gray)",
                        }}
                      >{`${format(
                        new Date(segment?.departureTime),
                        "MMM dd,EE"
                      )}`}</Typography>
                    </Box>
                  </Box>
                </Grid>
                {/* //todo: second section */}
                <Grid item md={2}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "fit-content",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FlightIcon
                          style={{
                            color: "var(--primary-color)",
                            transform: "rotate(90deg)",
                          }}
                        />
                      </Box>
                      <Typography
                        sx={{
                          color: "var(--gray)",
                          fontWeight: 400,
                          fontSize: {
                            xs: "12px",
                            sm: "10px",
                            md: "12px",
                          },
                        }}
                      >
                        {segment.length > 0
                          ? `${segment.length} stop`
                          : "Nonstop"}
                      </Typography>
                      <Tooltip title={segment.flightduration}>
                        <Typography
                          sx={{
                            color: "var(--gray)",
                            fontWeight: 400,
                            fontSize: {
                              xs: "12px",
                              sm: "10px",
                              md: "12px",
                            },
                            cursor: "pointer",
                          }}
                          noWrap
                        >
                          {/* {calDuration(segment)} */}
                          {segment.flightduration}
                        </Typography>
                      </Tooltip>
                    </Box>
                  </Box>
                </Grid>
                {/* //todo: third section */}
                <Grid item md={5}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "start",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "100%",
                        color: "var(--secondary-color)",
                        fontWeight: 500,
                      }}
                    >{`${segment?.arrival || "empty"} ${
                      segment?.arrivalTime
                        ? format(new Date(segment?.arrivalTime), "hh:mm a")
                        : "empty"
                    }`}</Typography>
                    <Tooltip title={`${segment.arrivalAirport}`}>
                      <Typography
                        sx={{
                          width: "100%",
                          cursor: "pointer",
                          color: "var(--secondary-color)",
                          fontWeight: "normal",
                        }}
                        noWrap
                      >{`${segment?.arrivalAirport || "empty"}`}</Typography>
                    </Tooltip>
                    <Typography
                      sx={{
                        width: "100%",
                        fontSize: "14px",
                        color: "var(--gray)",
                      }}
                    >{`${
                      segment.arrivalTime
                        ? format(new Date(segment.arrivalTime), "MMM dd,EEE")
                        : "empty"
                    }`}</Typography>
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Grid>
          {/* //todo:Four */}
          <Grid
            item
            md={12}
            style={{
              width: "100%",
              height: "50px",
              marginTop: "15px",
              marginLeft: "-15px",
            }}
          >
            <Grid
              container
              alignItems="center"
              sx={{
                width: "80%",
                height: "100%",
                background: "var(--lightBlue)",
                padding: "10px 0",
              }}
            >
              <Grid md={4}>
                <Typography
                  sx={{
                    color: "var(--secondary-color)",
                    fontWeight: 400,
                    fontSize: {
                      xs: "14px",
                      sm: "12px",
                      md: "14px",
                      lg: "16px",
                    },
                    width: "100%",
                    height: "fit-content",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {flightData?.refundable === "Refundable"
                    ? "Refundable"
                    : "Non Refundable"}
                </Typography>
              </Grid>
              <Grid md={4}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <WorkIcon style={{ color: "var(--secondary-color)" }} />
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontWeight: 400,
                      fontSize: {
                        xs: "12px",
                        sm: "12px",
                        md: "14px",
                        lg: "16px",
                      },
                    }}
                  >
                    {`${flightData?.bags} ${
                      Number.parseInt(flightData?.bags).toString().length === 1
                        ? "Piece"
                        : "Kg"
                    }`}
                  </Typography>
                </Box>
              </Grid>
              <Grid md={4}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <EventSeatIcon style={{ color: "var(--secondary-color)" }} />
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontWeight: 400,
                      fontSize: {
                        xs: "12px",
                        sm: "12px",
                        md: "14px",
                        lg: "16px",
                      },
                    }}
                  >
                    {flightData?.segments[0]?.seat || 9} Seat
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* //todo: left section */}
        <Grid item md={2}>
          <Box
            sx={{
              background: "rgba(var(--secondary-rgb), 0.4)",
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "space-between",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "end",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <Typography
                style={{
                  fontSize: "18px",
                  color: "var(--secondary-color)",
                  fontWeight: "bold",
                }}
              >
                BDT {commaNumber(Number.parseInt(agentFare))}
              </Typography>
              <Typography
                style={{
                  fontSize: "14px",
                  color: "var(--secondary-color)",
                  fontWeight: "normal",
                }}
              >
                BDT {commaNumber(Number.parseInt(clientFare))}
              </Typography>
            </Box>
            <Box
              style={{
                height: "fit-content",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "end",
                gap: "5px",
                padding: "0px 10px 10px 0px",
              }}
            >
              <Button
                className="shine-effect"
                sx={{
                  color: "var(--white)",
                  fontWeight: 400,
                  background: "var(--primary-color)",
                  borderRadius: "5px",
                  width: "fit-content",
                }}
                disabled={flightData?.system === "Galileo" ? true : false}
                onClick={FlightInformation}
              >
                BOOK NOW
              </Button>
              <Button
                style={{
                  color: "var(--secondary-color)",
                  fontWeight: 400,
                  textTransform: "capitalize",
                  width: "fit-content",
                  paddingRight: "0px",
                  fontSize: "12px",
                }}
                onClick={() => setFlightDetails(!flightDetails)}
              >
                {!flightDetails ? (
                  <Typography
                    style={{
                      color: "var(--secondary-color)",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    Show Details
                    <ArrowDropDownIcon style={{ width: "fit-content" }} />
                  </Typography>
                ) : (
                  <Typography
                    style={{
                      color: "var(--secondary-color)",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    Hide Details <ArrowDropUpIcon />
                  </Typography>
                )}
              </Button>
            </Box>
          </Box>
        </Grid>
        {/* //TODO:Flight Details start------------ */}
        <Collapse
          in={flightDetails}
          timeout="auto"
          unmountOnExit
          sx={{ width: "100%", marginBottom: "0px" }}
        >
          <Box sx={{ width: "100%", marginTop: "0px" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  width: "100%",
                  background: "var(--secondary-color)",
                  height: { lg: "40px", md: "40px", sm: "40px", xs: "40px" },
                  minHeight: "100%",
                  borderRadius: "0px",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: "1",
                  ".MuiTabs-flexContainer": {
                    flexWrap: "wrap",
                    padding: {
                      lg: "0px",
                      md: "0px",
                      sm: "0px 20px",
                      xs: "0px 20px",
                    },
                  },
                  "& button": {
                    background: "var(--secondary-color)",
                    color: "var(--white)",
                    opacity: "1",
                  },

                  "& button.Mui-selected": {
                    background: "var(--primary-color)",
                    color: "var(--white)",
                    opacity: "1",
                  },
                }}
              >
                <TabList
                  value={value}
                  onChange={handleChange}
                  TabIndicatorProps={{ style: { display: "none" } }}
                >
                  <Tab label="Flight Details" value="1" />
                  <Tab label="Fare Details" value="2" />
                  <Tab label="Commission & Invoice" value="3" />
                  <Tab label="Fare Policy" value="4" />
                  <Tab label="Baggage" value="5" />
                </TabList>
              </Box>

              {/* //todo:Flight Details */}
              <TabPanel value="1" style={{ padding: "10px" }}>
                <FlightDetails
                  flightData={flightData}
                  clientFare={clientFare}
                  agentFare={agentFare}
                  commission={commission}
                  adultCount={adultCount}
                  childCount={childCount}
                  infant={infant}
                />
              </TabPanel>
              {/* //todo:Fare Details */}
              <TabPanel value="2" style={{ padding: "10px" }}>
                <FareDetails
                  flightData={flightData}
                  clientFare={clientFare}
                  agentFare={agentFare}
                  commission={commission}
                  adultCount={adultCount}
                  childCount={childCount}
                  infant={infant}
                />
              </TabPanel>
              {/* //todo:Commission and invoice */}
              <TabPanel value="3" style={{ padding: "10px" }}>
                <CommissionInvoice
                  flightData={flightData}
                  clientFare={clientFare}
                  agentFare={agentFare}
                  commission={commission}
                  adultCount={adultCount}
                  childCount={childCount}
                  infant={infant}
                />
              </TabPanel>
              {/* //todo:Fare Policy */}
              <TabPanel value="4" style={{ padding: "10px" }}>
                <FarePolicy
                  flightData={flightData}
                  clientFare={clientFare}
                  agentFare={agentFare}
                  commission={commission}
                  adultCount={adultCount}
                  childCount={childCount}
                  infant={infant}
                />
              </TabPanel>
              {/* //todo:Baggage */}
              <TabPanel value="5" style={{ padding: "10px" }}>
                <Baggage
                  flightData={flightData}
                  clientFare={clientFare}
                  agentFare={agentFare}
                  commission={commission}
                  adultCount={adultCount}
                  childCount={childCount}
                  infant={infant}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </Collapse>
        {/* //TODO:Flight Details end------------ */}
      </Grid>
    </Box>
  );
};

export default SingleMultiCityItem;
