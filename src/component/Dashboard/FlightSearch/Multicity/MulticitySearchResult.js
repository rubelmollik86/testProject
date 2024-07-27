import React, { useState } from "react";
import { Box, Button, Grid, Tab, Tabs, Container } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CircleIcon from "@mui/icons-material/Circle";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import seat from "../../../../image/Icon/bag.svg";
import bag from "../../../../image/Icon/seat.svg";
import toimg from "../../../../image/Icon/to.svg";
import { useNavigate } from "react-router-dom";
import { TabContext, TabPanel } from "@material-ui/lab";
import FlightIcon from "@mui/icons-material/Flight";
import commaNumber from "comma-number";
import secureLocalStorage from "react-secure-storage";
import { format } from "date-fns";

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

const MulticitySearchResult = () => {
  const [flightDetails, setFlightDetails] = useState(false);
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        margin: "24px",
      }}
      mt={5}
      mb={2.5}
    >
      {/* ---------For tab and mobile Start --------- */}

      {/* ---------for tab and mobile End --------- */}

      <Grid container justifyContent="space-between">
        <Grid
          item
          lg={2.2}
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "none",
              lg: "block",
              boxShadow:
                "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
            },
          }}
        >
          Name{" "}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={9.6}>
          <Grid
            container
            className="flight-filter1"
            sx={{
              display: {
                xs: "none",
                sm: "flex",
                md: "flex",
                transition: "all .5s ease-in-out",
                boxShadow:
                  "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
              },
            }}
          >
            <Grid sm={7.5} md={9.5} paddingY="15px">
              <Grid container justifyContent={"space-between"}>
                <Grid item md={4}>
                  <Grid md={12} lg={12} xl={4}>
                    <Box
                      sx={{
                        width: {
                          xs: "50px",
                          sm: "50px",
                          md: "71px",
                          lg: "71px",
                        },
                      }}
                    >
                      <img
                        src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/EK.png`}
                        className="flight-icon-sab3"
                        alt="EK"
                      />
                    </Box>
                  </Grid>

                  <Grid md={12} lg={12} xl={8}>
                    <Box pl={1}>
                      <Typography
                        sx={{
                          color: "#DC143C",
                          fontWeight: 500,
                          fontSize: {
                            xs: "12px",
                            sm: "10px",
                            md: "14px",
                            lg: "15px",
                          },
                        }}
                      >
                        Emirates
                      </Typography>
                      <Typography
                        sx={{
                          color: "var(--primary-color)",
                          fontWeight: 500,
                          fontSize: {
                            xs: "12px",
                            sm: "10px",
                            md: "12px",
                            lg: "12px",
                          },
                        }}
                      >
                        EK <>583</>
                      </Typography>
                      <Typography
                        sx={{
                          color: "var(--primary-color)",
                          fontWeight: 500,
                          fontSize: "12px",
                        }}
                      >
                        6H 55Min&nbsp;|&nbsp;
                      </Typography>
                      <Typography
                        sx={{
                          color: "#DC143C",
                          fontWeight: 500,
                          fontSize: "12px",
                        }}
                      >
                        Non Stops
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item md={8}></Grid>
                <Grid md={4}>
                  <Box>
                    <Typography
                      sx={{
                        color: "#000",
                        fontWeight: 500,
                        fontSize: {
                          xs: "12px",
                          sm: "13px",
                          md: "15px",
                          lg: "16px",
                        },
                      }}
                    >
                      DAC
                      <span> - </span>
                      12.00
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--primary-color)",
                        fontWeight: 600,
                        fontSize: {
                          xs: "12px",
                          sm: "11px",
                          md: "13px",
                        },
                      }}
                    >
                      Dhaka
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6c757d",
                        fontWeight: 500,
                        fontSize: {
                          xs: "12px",
                          sm: "11px",
                          md: "13px",
                        },
                      }}
                    >
                      10 DEC 2022
                    </Typography>
                  </Box>
                </Grid>

                <Grid md={4}>
                  <Box textAlign={"center"}>
                    <Typography>
                      {/* ---------stops------ */}

                      <Box>
                        <Grid container justifyContent="center">
                          {" "}
                          <Typography
                            sx={{
                              color: "var(--primary-color)",
                              fontWeight: 500,
                              fontSize: {
                                xs: "12px",
                                sm: "10px",
                                md: "12px",
                              },
                            }}
                          >
                            6H 55Min
                          </Typography>
                        </Grid>
                        <Box px={1}>
                          <div className="segment-1">
                            <div className="segment-circle">
                              <div className="circle-0">
                                <HtmlTooltip
                                  title={
                                    <React.Fragment>
                                      <Typography
                                        sx={{ color: "#fff", fontSize: "10px" }}
                                      >
                                        DAC
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
                                        sx={{ color: "#fff", fontSize: "10px" }}
                                      >
                                        DXB
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
                              <FlightIcon />
                            </div>
                          </div>
                        </Box>
                      </Box>
                    </Typography>
                  </Box>
                </Grid>

                <Grid md={4}>
                  <Box textAlign={"end"}>
                    <Typography
                      sx={{
                        color: "#000",
                        fontWeight: 500,
                        fontSize: {
                          xs: "12px",
                          sm: "13px",
                          md: "15px",
                          lg: "16px",
                        },
                      }}
                    >
                      DXB
                      <span> - </span>
                      10:00
                    </Typography>

                    <Typography
                      sx={{
                        color: "var(--primary-color)",
                        fontWeight: 600,
                        fontSize: {
                          xs: "12px",
                          sm: "11px",
                          md: "13px",
                        },
                      }}
                    >
                      Dubai
                    </Typography>

                    <Typography
                      sx={{
                        color: "#6c757d",
                        fontWeight: 500,
                        fontSize: {
                          xs: "12px",
                          sm: "11px",
                          md: "13px",
                        },
                      }}
                    >
                      11 Dec 2022
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container justifyContent={"space-between"} pt={3}>
                <Grid md={3}>
                  <Typography
                    sx={{
                      color: "#000",
                      fontWeight: 500,
                      fontSize: {
                        xs: "12px",
                        sm: "12px",
                        md: "14px",
                        lg: "16px",
                      },
                    }}
                  >
                    Economy
                  </Typography>
                </Grid>
                <Grid md={4}>
                  <Typography
                    sx={{
                      color: "green",
                      fontWeight: 500,
                      fontSize: {
                        xs: "14px",
                        sm: "12px",
                        md: "14px",
                        lg: "16px",
                      },
                    }}
                  >
                    Refundable
                  </Typography>
                </Grid>
                <Grid md={2.5}>
                  <Box className="img-text-bag-0">
                    <img src={bag} alt="seat" /> &nbsp;{" "}
                    <Typography
                      sx={{
                        color: "#000",
                        fontWeight: 500,
                        fontSize: {
                          xs: "12px",
                          sm: "12px",
                          md: "14px",
                          lg: "16px",
                        },
                      }}
                    >
                      0 Kg
                    </Typography>
                  </Box>
                </Grid>
                <Grid md={2.5}>
                  <Box className="img-text-0">
                    <img src={seat} alt="bag" />
                    &nbsp;
                    <Typography
                      sx={{
                        color: "#000",
                        fontWeight: 500,
                        fontSize: {
                          xs: "12px",
                          sm: "12px",
                          md: "14px",
                          lg: "16px",
                        },
                      }}
                    >
                      9 Seat
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            {/*  non stops box start */}

            <Grid
              sm={2.5}
              md={2.5}
              sx={{
                paddingLeft: { xs: "none", sm: "5px", md: "20px" },
              }}
            >
              <Box className="updatebooknowbtn" style={{ paddingLeft: "12px" }}>
                <Box height={"40px"}>
                  <Box>
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <Typography
                        sx={{
                          fontSize: {
                            xs: "12px",
                            sm: "12.5px",
                            md: "17px",
                          },
                          color: "#fff",
                          pt: {
                            sm: "5px",
                          },
                        }}
                      >
                        CF
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: {
                            xs: "12px",
                            sm: "12.5px",
                            md: "17px",
                          },
                          color: "#fff",
                          pt: {
                            sm: "5px",
                          },
                        }}
                      >
                        200 &#2547;
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        borderBottom: "0.5px solid rgba(209, 233, 255, 0.52)",
                      }}
                    ></Box>
                  </Box>
                </Box>
                <Box height={"40px"} style={{ marginTop: "5px" }}>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "12px",
                          sm: "12px",
                          md: "13px",
                        },
                        color: "#D1E9FF",
                      }}
                    >
                      AF
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "12px",
                          sm: "12px",
                          md: "13px",
                        },
                        color: "#D1E9FF",
                      }}
                    >
                      200 &#2547;
                    </Typography>
                  </Box>

                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "12px",
                          sm: "12px",
                          md: "13px",
                        },
                        color: "#D1E9FF",
                        pb: {
                          sm: "7px",
                        },
                      }}
                    >
                      CM
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "12px",
                          sm: "12px",
                          md: "13px",
                        },
                        color: "#D1E9FF",
                        pb: {
                          sm: "7px",
                        },
                      }}
                    >
                      200 &#2547;
                    </Typography>
                  </Box>
                </Box>

                <Button
                  className="booknow-btn-0 shine-effect"
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    bgcolor: "#DC143C",
                    borderRadius: "12px  0px",
                    mt: { xs: "5px" },
                    p: {
                      xs: "5px 20px",
                      sm: "5px 10px",
                      md: "5px 15px",
                    },
                    fontSize: {
                      xs: "12px",
                      sm: "10px",
                      md: "16px",
                    },
                  }}
                  // disabled={flightData?.system === "Galileo" ? true : false}
                  // onClick={FlightInformation}
                >
                  BOOK NOW{" "}
                </Button>
                <br />
                <Button
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    textTransform: "capitalize",
                    fontSize: {
                      xs: "10px",
                      sm: "10px",
                      md: "12px",
                    },
                  }}
                  onClick={() => setFlightDetails(!flightDetails)}
                >
                  {!flightDetails ? <> Flight Details</> : <> Hide Details</>}
                </Button>
              </Box>
            </Grid>

            {/* --------------Flight Details start------------ */}
            {/* <Box margin="auto"> */}
            {flightDetails && (
              <Box
                width="100%"
                className="accordion-cursor flight-search-accordion flight-details-btn"
                Accordion
                style={{ boxShadow: "none" }}
              >
                <Container maxWidth="xxl">
                  <Box className="accordion-border"></Box>
                </Container>

                <Box className="accordian-center">
                  <Box
                    className="tab-list-width"
                    sx={{
                      maxWidth: { sm: 500, md: 500, lg: 800, xl: 900 },
                      bgcolor: "background.paper",
                    }}
                  >
                    <TabContext value={value}>
                      <Tabs
                        className="tablist-btn"
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        aria-label="scrollable force tabs example"
                        sx={{
                          minHeight: "0px",
                          height: "35px",
                          padding: "0px",
                          margin: "0px",
                          fontSize: "10px",
                          "@media screen and (max-width: 320px)": {
                            minHeight: "0px",
                            height: "25px",
                            fontSize: "10px",
                          },
                        }}
                      >
                        <Tab
                          sx={{
                            margin: "auto",
                            minHeight: "0px",
                            height: "35px",
                            "@media screen and (max-width: 320px)": {
                              minHeight: "10px",
                              height: "10px",
                              fontSize: "10px",
                              color: "#9dccfb !important",
                            },
                          }}
                          className="tabList"
                          label="Flight Details"
                          value="1"
                        />
                        <Tab
                          sx={{
                            margin: "auto",
                            minHeight: "0px",
                            height: "35px",
                            "@media screen and (max-width: 320px)": {
                              minHeight: "10px",
                              height: "10px",
                              fontSize: "10px",
                              color: "#9dccfb !important",
                            },
                          }}
                          className="tabList"
                          label="Fare Summery"
                          value="2"
                        />

                        <Tab
                          sx={{
                            margin: "auto",
                            minHeight: "0px",
                            height: "35px",
                            "@media screen and (max-width: 320px)": {
                              minHeight: "10px",
                              height: "10px",
                              fontSize: "10px",
                              color: "#9dccfb !important",
                            },
                          }}
                          className="tabList"
                          label="Commission & Invoice"
                          value="3"
                        />
                        <Tab
                          sx={{
                            margin: "auto",
                            minHeight: "0px",
                            height: "35px",
                            "@media screen and (max-width: 320px)": {
                              minHeight: "10px",
                              height: "10px",
                              fontSize: "10px",
                              color: "#9dccfb !important",
                            },
                          }}
                          className="tabList"
                          label="Refund"
                          value="4"
                        />
                        <Tab
                          sx={{
                            margin: "auto",
                            minHeight: "0px",
                            height: "35px",
                            "@media screen and (max-width: 320px)": {
                              minHeight: "10px",
                              height: "10px",
                              fontSize: "10px",
                              color: "#9dccfb !important",
                            },
                          }}
                          className="tabList"
                          label="reIssue"
                          value="5"
                        />
                        <Tab
                          sx={{
                            margin: "auto",
                            minHeight: "0px",
                            height: "35px",
                            "@media screen and (max-width: 320px)": {
                              minHeight: "10px",
                              height: "10px",
                              fontSize: "10px",
                              color: "#9dccfb !important",
                            },
                          }}
                          className="tabList"
                          label="Baggage"
                          value="6"
                        />
                      </Tabs>

                      <TabPanel className="tabs-details" value="1">
                        <Box className="segment-2">
                          <Box
                            display="flex"
                            justifyContent={"center"}
                            alignItems="center"
                            pb={2}
                            gap={2}
                          >
                            <Typography
                              sx={{
                                fontSize: "16px",
                                color: "var(--primary-color)",
                                fontWeight: 600,
                              }}
                            >
                              Dhaka
                            </Typography>
                            <img src={toimg} alt="to" />
                            <Typography
                              sx={{
                                fontSize: "16px",
                                color: "var(--primary-color)",
                                fontWeight: 600,
                              }}
                            >
                              Dubai
                            </Typography>
                          </Box>
                          <Box className="single-flight-parent">
                            <Grid
                              className="single-flight-details"
                              sx={{
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                              }}
                              container
                              spacing={{ xs: 2, md: 3 }}
                              columns={{ xs: 4, sm: 8, md: 12 }}
                            >
                              <Grid
                                sx={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                }}
                                item
                                xs={2}
                                sm={3}
                                md={4.5}
                              >
                                <Box textAlign="center" paddingRight={2}>
                                  <img
                                    src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/EK.png`}
                                    alt="EK"
                                  />
                                  <Typography
                                    width="100px"
                                    fontSize="12px"
                                    fontWeight={500}
                                    textAlign="center"
                                    paddingRight={2}
                                  >
                                    Emirates
                                  </Typography>
                                </Box>
                                <Box className="flight-content-detail">
                                  <h4>Departure From</h4>
                                  <h5>DAC- Dhaka hazrat......</h5>
                                  <h5>Dhaka</h5>
                                  <h5>10 Dec 2022</h5>
                                </Box>
                              </Grid>
                              <Grid item xs={2} sm={2} md={3}>
                                <Box className="flight-content-detail">
                                  <h4>Arrival To</h4>
                                  <h5>DAC- Dhaka hazrat......</h5>
                                  <h5>Dhaka</h5>
                                  <h5>10 Dec 2022</h5>
                                </Box>
                              </Grid>
                              <Grid item xs={2} sm={2} md={3}>
                                <Box className="flight-content-detail">
                                  <h4>Duration</h4>
                                  <h5>5h 10m</h5>
                                  <h5>
                                    <span style={{ color: "tomato" }}>
                                      EK 568
                                    </span>
                                    <span
                                      style={{
                                        color: "var(--gray-text-color)",
                                        fontSize: "15px",
                                      }}
                                    >
                                      {" | "}
                                    </span>
                                    Class: M
                                    <span
                                      style={{
                                        color: "var(--gray-text-color)",
                                        fontSize: "15px",
                                      }}
                                    >
                                      {" | "}
                                    </span>
                                    <span>Seat: 9</span>
                                  </h5>
                                  <h5>Baggage: 10 kg</h5>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </TabPanel>

                      <TabPanel value="2" className="tab-class">
                        <Box className="tab-table" sx={{ m: "5px 0px" }}>
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

                              <tr>
                                <td>Adult</td>
                                <td>100</td>
                                <td>20</td>
                                <td>120</td>
                                <td>1</td>

                                <td>50</td>
                                <td>555</td>
                              </tr>
                            </table>
                          </Box>
                        </Box>
                      </TabPanel>

                      <TabPanel value="3" className="tab-class">
                        <Box className="tab-table" sx={{ m: "5px 0px" }}>
                          <Box className="flight-search-table">
                            <table>
                              <tr>
                                <th>Customer Invoice</th>
                                <th>Commission</th>
                                <th>Agent Invoice</th>
                                <th>Profit Amount</th>
                              </tr>

                              <tr>
                                <td>100</td>
                                <td>7%</td>
                                <td>100</td>
                                <td>100</td>
                              </tr>
                            </table>
                          </Box>
                        </Box>
                      </TabPanel>

                      {/* discount & gross start */}
                      <TabPanel value="4" className="cancelation-1">
                        <Grid
                          className="cancellation-content "
                          container
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          <Grid item xs={4} sm={4} md={6}>
                            <Typography variant="h4">Time Frame </Typography>
                            <Typography variant="h4">
                              (From Scheduled Flight Departure)
                            </Typography>
                          </Grid>

                          <Grid item xs={4} sm={4} md={6}>
                            <Typography variant="h4">
                              Airline Fee + Flyfarint Fee{" "}
                            </Typography>
                            <Typography variant="h4">
                              (Per Passenger)
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid
                          className=" cancellation-content-cus "
                          container
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          <Grid item xs={4} sm={4} md={6}>
                            <Typography variant="h4">
                              0 hours to 72 hours
                            </Typography>
                          </Grid>

                          <Grid item xs={4} sm={4} md={6}>
                            <Typography variant="h4">
                              Adult : Airline Policy + 200 BDT
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid
                          className=" cancellation-content-cus2  "
                          container
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          <Grid item xs={4} sm={4} md={6}>
                            <Typography variant="h4">
                              72 hours to 335 hours
                            </Typography>
                          </Grid>

                          <Grid item xs={4} sm={4} md={6}>
                            <Typography variant="h4">
                              Adult : Airline Policy + 200 BDT
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          className="cancellation-content"
                          container
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          <Grid item xs={4} sm={4} md={6}>
                            <Typography variant="h4">Time Frame </Typography>
                            <Typography variant="h4">
                              (From Scheduled Flight Departure)
                            </Typography>
                          </Grid>

                          <Grid item xs={4} sm={4} md={6}>
                            <Typography variant="h4">
                              Airline Fee + Flyfarint Fee{" "}
                            </Typography>
                            <Typography variant="h4">
                              (Per Passenger)
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid
                          className="cancellation-content-cus3 "
                          container
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          <Grid item xs={4} sm={4} md={6}>
                            <Typography variant="h4">
                              All Flight Departure
                            </Typography>
                          </Grid>

                          <Grid item xs={4} sm={4} md={6}>
                            <Typography variant="h4">
                              Adult : Airline Policy + No-Show Charge + 200 BDT
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                          <Grid item xs={12} sm={12} md={12}>
                            <Typography
                              fontSize={"12px"}
                              border="1px solid red"
                              py={1}
                              px={2}
                              my={1}
                            >
                              *Important: This destination may have COVID-19
                              travel restriction in place, including specific
                              restriction for loading Check any nation,local and
                              health advisories for this destination before you
                              book.
                            </Typography>
                          </Grid>
                        </Grid>
                      </TabPanel>
                      <TabPanel value="5" className="cancelation-1">
                        <Grid
                          className="cancellation-content "
                          container
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          <Grid item xs={4} sm={4} md={6}>
                            <Typography variant="h4">Time Frame </Typography>
                            <Typography variant="h4">
                              (From Scheduled Flight Departure)
                            </Typography>
                          </Grid>

                          <Grid item xs={4} sm={4} md={6}>
                            <Typography variant="h4">
                              Airline Fee + Flyfarint Fee{" "}
                            </Typography>
                            <Typography variant="h4">
                              (Per Passenger)
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid
                          className=" cancellation-content-cus "
                          container
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          <Grid item xs={4} sm={4} md={6}>
                            <Typography variant="h4">
                              0 hours to 72 hours
                            </Typography>
                          </Grid>

                          <Grid item xs={4} sm={4} md={6}>
                            <Typography variant="h4">
                              Adult : Airline Policy + 200 BDT
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid
                          className=" cancellation-content-cus2  "
                          container
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          <Grid item xs={4} sm={4} md={6}>
                            <Typography variant="h4">
                              72 hours to 335 hours
                            </Typography>
                          </Grid>

                          <Grid item xs={4} sm={4} md={6}>
                            <Typography variant="h4">
                              Adult : Airline Policy + 200 BDT
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          className="cancellation-content"
                          container
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          <Grid item xs={4} sm={4} md={6}>
                            <Typography variant="h4">Time Frame </Typography>
                            <Typography variant="h4">
                              (From Scheduled Flight Departure)
                            </Typography>
                          </Grid>

                          <Grid item xs={4} sm={4} md={6}>
                            <Typography variant="h4">
                              Airline Fee + Flyfarint Fee{" "}
                            </Typography>
                            <Typography variant="h4">
                              (Per Passenger)
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid
                          className="cancellation-content-cus3 "
                          container
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          <Grid item xs={4} sm={4} md={6}>
                            <Typography variant="h4">
                              All Flight Departure
                            </Typography>
                          </Grid>

                          <Grid item xs={4} sm={4} md={6}>
                            <Typography variant="h4">
                              Adult : Airline Policy + No-Show Charge + 200 BDT
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                          <Grid item xs={12} sm={12} md={12}>
                            <Typography
                              fontSize={"12px"}
                              border="1px solid red"
                              py={1}
                              px={2}
                              my={1}
                            >
                              *Important: This destination may have COVID-19
                              travel restriction in place, including specific
                              restriction for loading Check any nation,local and
                              health advisories for this destination before you
                              book.
                            </Typography>
                          </Grid>
                        </Grid>
                      </TabPanel>

                      <TabPanel value="6" className="tab-class">
                        <Box className="tab-table" sx={{ m: "5px 0px" }}>
                          <Box className="flight-search-table">
                            <table>
                              <tr>
                                <th>Baggage</th>
                                <th>Check-In</th>
                                <th>Cabin</th>
                              </tr>

                              <tr>
                                <td>Adult</td>
                                <td>30 Kg</td>
                                <td>Economy</td>
                              </tr>
                            </table>
                          </Box>
                        </Box>
                      </TabPanel>
                    </TabContext>
                  </Box>
                </Box>
              </Box>
            )}
            {/* </Box> */}
            {/* --------------Flight Details end------------ */}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MulticitySearchResult;
