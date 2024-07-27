import { Box, Grid, Stack, Tooltip, Typography } from "@mui/material";
import { tooltipClasses } from "@mui/material/Tooltip";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import { IoAirplaneSharp } from "react-icons/io5";
import moment from "moment/moment";
import WorkIcon from "@mui/icons-material/Work";
import { styled } from "@mui/material/styles";

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

const ReturnFlightDetails = ({ flightData, status, allData }) => {


  const [value, setValue] = useState("1");
  const location = useLocation();
  const [flightDetails, setFlightDetails] = useState(true);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const adultCount = 0;
  const childCount = 0;
  const infant = 0;

  const transitCalculation = (date1, date2) => {
  
    const duration = moment.duration(moment(date1).diff(moment(date2)));
    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes()) - hours * 60;
    const transit = `${Math.abs(hours)}h:${Math.abs(minutes)}min`;
    return transit;
  };

  return (
    <Box>
      <Typography
        sx={{
          mt: 2,
          fontSize: 14,
          fontWeight: 500,
          color: "var(--primary-color)",
          bgcolor: "var(--white)",
          px: 2,
          borderRadius: "5px",
          width: "fit-content",
        }}
      >
        Departure Flight
      </Typography>
      {flightData?.Segment_data?.go?.map((data, index, arr) => (
        <Box key={index}>
          <Grid
            container
            sx={{
              transition: "all .5s ease-in-out",
              borderRadius: "5px",
              overflow: "hidden",
              bgcolor: "var(--white)",
              px: 2,
              py: 2,
              columnSpacing: 2,
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
                  <img
                    src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data?.goMarketingCareer}.png`}
                    width="50px"
                    height="50px"
                    alt="flight-img"
                  />
                </Box>
                {/* //todo: Text Part */}
                <Box width="90%">
                  <Tooltip followCursor title={data?.goMarketingCareerName}>
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
                    >
                      {data?.goMarketingCareerName}
                    </Typography>
                  </Tooltip>
                  <Tooltip
                    followCursor
                    title={`${data?.goMarketingCareer}-${data?.goMarketingFlight}`}
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
                      {`${data?.goMarketingCareer}-${data?.goMarketingFlight}`}
                    </Typography>
                  </Tooltip>
                </Box>
              </Box>
            </Grid>
            {/* 2nd  */}
            <Grid item xs={4} md={3}>
              <Box>
                <Tooltip
                  followCursor
                  title={`${data?.goDeparture} ${", "}
                ${data?.goDepartureLocation?.split(",")[0]}`}
                >
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontWeight: 500,
                      fontSize: {
                        xs: "16px",
                        md: "18px",
                        fontWeight: 500,
                      },
                    }}
                  >
                    {data?.goDepartureLocation?.split(",")[0]}{" "}
                    <span
                      style={{
                        color: "var(--primary-color)",
                        fontSize: "14px",
                      }}
                    >
                      {moment(new Date(data?.goDepartureTime)).format("hh:mma")}
                    </span>
                  </Typography>
                </Tooltip>

                <Tooltip followCursor title={data?.goDepartureAirport}>
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
                    {data?.goDepartureAirport}
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
                  {moment(new Date(data?.goDepartureTime)).format(
                    "ddd DD MMM YY "
                  )}
                </Typography>

                <Typography
                  sx={{
                    color: "var(--green-text)",
                    fontWeight: 500,
                    fontSize: {
                      md: "14px",
                      xs: "12px",
                    },

                    pt: { xs: "0", md: 3 },
                  }}
                  display={`${index === arr.length - 1 ? "block" : "none"}`}
                >
                  {allData?.refundable ? "Refundable" : "Non Refundable"}
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
                  {data?.goFlightDuration}
                </Typography>

                <Box px={3} textAlign={"center"}>
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
                                {data?.goDeparture}
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
                                {data?.goArrival}
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
            </Grid>

            {/* 4th */}
            <Grid item xs={4} md={3} textAlign="left">
              <Box>
                <Tooltip
                  followCursor
                  title={`${data?.goArrivalLocation}${", "} ${
                    data?.goArrivalTime?.split(",")[0]
                  }
                `}
                >
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontWeight: 500,
                      fontSize: {
                        xs: "16px",
                        md: "18px",
                      },
                    }}
                  >
                    {data?.goArrivalLocation?.split(",")[0]}
                    <span
                      style={{
                        color: "var(--primary-color)",
                        fontSize: "14px",
                      }}
                    >
                      {moment(data?.arrivalTime?.split(",")[0]).format(
                        "hh:mma"
                      )}
                    </span>
                  </Typography>
                </Tooltip>

                <Tooltip
                  followCursor
                  title={data?.goArrivalAirport?.split(",")[0]}
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
                    {data?.goArrivalAirport?.split(",")[0]}
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
                  {moment(data?.arrivalTime?.split(",")[0]).format(
                    "ddd DD MMM YY"
                  )}
                </Typography>

                <Box display={`${index === arr.length - 1 ? "block" : "none"}`}>
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
                            sm: "18px",
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
                        {allData?.adultBag}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/* ----Transit Time  */}
          <Box
            sx={{
              borderBottom: "1px solid var(--secondary-color)",
              display: `${index === arr.length - 1 ? "none" : "block"}`,
              position: "relative",
            }}
          >
            <Typography
              sx={{
                color: "var(--text-black)",
                bgcolor: "var(--secondary-color)",
                width: "fit-content",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                px: 3,
                py: 0.2,
                fontSize: 12,
                borderRadius: "20px",
              }}
            >
              Layover Time{" "}
              {transitCalculation(
                flightData?.Segment_data?.go[index + 1]?.goDepartureTime,
                flightData?.Segment_data?.go[index - 1 + 1]?.goArrivalTime
              )}
            </Typography>
          </Box>
        </Box>
      ))}
      <Typography
        sx={{
          mt: 2,
          fontSize: 14,
          fontWeight: 500,
          color: "var(--primary-color)",
          bgcolor: "var(--white)",
          px: 2,
          borderRadius: "5px",
          width: "fit-content",
        }}
      >
        Return Flight
      </Typography>
      {flightData?.Segment_data?.back?.map((data, index, arr) => (
        <Box key={index}>
          <Grid
            container
            sx={{
              transition: "all .5s ease-in-out",
              borderRadius: "5px",
              overflow: "hidden",
              bgcolor: "var(--white)",
              px: 2,
              py: 2,
              columnSpacing: 2,
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
                  <img
                    src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data?.backMarketingCareer}.png`}
                    width="50px"
                    height="50px"
                    alt="flight-img"
                  />
                </Box>
                {/* //todo: Text Part */}
                <Box width="90%">
                  <Tooltip followCursor title={data?.backMarketingCareerName}>
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
                    >
                      {data?.backMarketingCareerName}
                    </Typography>
                  </Tooltip>
                  <Tooltip
                    followCursor
                    title={`${data?.backMarketingCareer}-${data?.backMarketingFlight}`}
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
                      {`${data?.backMarketingCareer}-${data?.backMarketingFlight}`}
                    </Typography>
                  </Tooltip>
                </Box>
              </Box>
            </Grid>
            {/* 2nd  */}
            <Grid item xs={4} md={3}>
              <Box>
                <Tooltip
                  followCursor
                  title={`${data?.backDeparture} ${", "}
                ${data?.backDepartureLocation?.split(",")[0]}`}
                >
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontWeight: 500,
                      fontSize: {
                        xs: "16px",
                        md: "18px",
                        fontWeight: 500,
                      },
                    }}
                  >
                    {data?.backDepartureLocation?.split(",")[0]}{" "}
                    <span
                      style={{
                        color: "var(--primary-color)",
                        fontSize: "14px",
                      }}
                    >
                      {moment(new Date(data?.backDepartureTime)).format(
                        "hh:mma"
                      )}
                    </span>
                  </Typography>
                </Tooltip>

                <Tooltip followCursor title={data?.backDepartureAirport}>
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
                    {data?.backDepartureAirport}
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
                  {moment(new Date(data?.backDepartureTime)).format(
                    "ddd DD MMM YY "
                  )}
                </Typography>

                <Typography
                  sx={{
                    color: "var(--green-text)",
                    fontWeight: 500,
                    fontSize: {
                      md: "14px",
                      xs: "12px",
                    },

                    pt: { xs: "0", md: 3 },
                  }}
                  display={`${index === arr.length - 1 ? "block" : "none"}`}
                >
                  {allData?.refundable ? "Refundable" : "Non Refundable"}
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
                  {data?.backFlightDuration}
                </Typography>

                <Box px={3} textAlign={"center"}>
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
                                {data?.backDeparture}
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
                                {data?.backArrival}
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
            </Grid>

            {/* 4th */}
            <Grid item xs={4} md={3} textAlign="left">
              <Box>
                <Tooltip
                  followCursor
                  title={`${data?.backArrivalLocation}${", "} ${
                    data?.backArrivalTime?.split(",")[0]
                  }
                `}
                >
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontWeight: 500,
                      fontSize: {
                        xs: "16px",
                        md: "18px",
                      },
                    }}
                  >
                    {data?.backArrivalLocation?.split(",")[0]}
                    <span
                      style={{
                        color: "var(--primary-color)",
                        fontSize: "14px",
                      }}
                    >
                      {moment(data?.arrivalTime?.split(",")[0]).format(
                        "hh:mma"
                      )}
                    </span>
                  </Typography>
                </Tooltip>

                <Tooltip
                  followCursor
                  title={data?.backArrivalAirport?.split(",")[0]}
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
                    {data?.backArrivalAirport?.split(",")[0]}
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
                  {moment(data?.arrivalTime?.split(",")[0]).format(
                    "ddd DD MMM YY"
                  )}
                </Typography>

                <Box display={`${index === arr.length - 1 ? "block" : "none"}`}>
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
                            sm: "18px",
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
                        {allData?.adultBag}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/* ----Transit Time  */}
          <Box
            sx={{
              borderBottom: "1px solid var(--secondary-color)",
              display: `${index === arr.length - 1 ? "none" : "block"}`,
              position: "relative",
            }}
          >
            <Typography
              sx={{
                color: "var(--text-black)",
                bgcolor: "var(--secondary-color)",
                width: "fit-content",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                px: 3,
                py: 0.2,
                fontSize: 12,
                borderRadius: "20px",
              }}
            >
              Layover Time{" "}
              {transitCalculation(
                flightData?.Segment_data?.back[index + 1]?.backDepartureTime,
                flightData?.Segment_data?.back[index - 1 + 1]?.backArrivalTime
              )}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ReturnFlightDetails;
