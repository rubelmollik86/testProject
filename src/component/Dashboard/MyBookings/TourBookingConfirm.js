import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Tab,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import ToysOutlinedIcon from "@mui/icons-material/ToysOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { useState } from "react";
import Slider from "react-slick";
import SearchIcon from "@mui/icons-material/Search";
import DoneIcon from "@mui/icons-material/Done";
import Radio from "@mui/material/Radio";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircleIcon from "@mui/icons-material/Circle";
import { useLocation, useNavigate } from "react-router-dom";
import format from "date-fns/format";
import commaNumber from "comma-number";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import Header from "../../Header/Header";
import Footer from "../../Home/Footer/Footer";
import secureLocalStorage from "react-secure-storage";
import bkash from "../../../Assets/Ladies/bkash.png";
import visa from "../../../Assets/Ladies/visa.png";
import nagad from "../../../Assets/Ladies/nagad.png";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const TourBookingConfirm = () => {
  const navigate = useNavigate();
  const getUserData = secureLocalStorage.getItem("UserData");
  const location = useLocation();
  const allData = location.state?.data;

  const [promoCode, setPromoCode] = useState("");
  const handlePromoCode = () => {};

  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [checkedSignUp, setCheckedSignUp] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [value, setValue] = React.useState("1");
  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };

  const [tourValue, setTourValue] = React.useState("1");
  const handleTourTabs = (event, newValue) => {
    console.log(newValue);

    setTourValue(newValue);
  };

  const [selectedValue, setSelectedValue] = React.useState("a");
  const handleChangeRadio = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChangeRadio,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  var Package = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [slideLoad, setSlideLoad] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  // todo:  traveler length

  const traveler = allData?.travelers?.length;

  //  todo: price calculation
  const amount = parseInt(allData?.tourPackage?.Price);
  const discount = allData?.tourPackage?.Discount;
  const result = amount - (discount / 100) * amount;
  const finalDiscount = amount - result;

  // wallet handle payment
  const handleWallet = async () => {
    Swal.fire({
      title: "Are you sure?",
      // text: `${commaNumber(
      //   Number(parseInt(amount))
      // )} ৳. You Wants to Approve this Amount?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#003566",
      cancelButtonColor: "red",
      confirmButtonText: "Yes, Approve it !",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        let url = `https://flyfarladies-apiv2.appspot.com/booking/${allData?.Bookingid}/confirmed`;
        let body = JSON.stringify({
          uuid: getUserData?.uuid,
        });
        console.log(url, body);
        fetch(url, {
          method: "PATCH",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: body,
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.status === "success") {
              Swal.fire({
                icon: "success",
                title: data?.message,
                confirmButtonText: "OK",
              }).then(() => {
                navigate("/dashboard/mybookings");
              });
            } else {
              throw new Error("error");
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Insufficient balance! please deposit to your wallet",
              confirmButtonText: "OK",
            }).then(() => {
              navigate(0);
            });
          });
      }
    });
  };

  return (
    <Box>
      <Container>
        <Header />
        <Box>
          <Typography
            sx={{
              color: "var(--primary-color)",
              fontSize: { xs: 14, sm: 14, md: 18 },
              fontWeight: 500,
            }}
            mb={2}
          >
            Booking Confirmation
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9} mt={2}>
              <Box
                style={{
                  background: "var(--white)",
                  borderRadius: "3px",
                }}
              >
                <Box
                  style={{
                    padding: "0px 15px",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={2.5}>
                      <Box>
                        <img
                          style={{
                            width: "100%",
                            height: "150px",
                            borderRadius: "3px",
                          }}
                          src={allData?.tourPackage?.coverimageurl}
                          alt="tourImg"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6.5}>
                      <Box height="100%">
                        <Typography
                          sx={{
                            color: "var(--primary-color)",
                            fontSize: { xs: 14, sm: 14, md: 17 },
                            fontWeight: 500,
                          }}
                        >
                          {allData?.tourPackage?.MainTitle}
                        </Typography>
                        <Typography
                          sx={{
                            color: "var(--text-black)",
                            fontSize: { xs: 12, sm: 12, md: 12 },
                            fontWeight: 500,
                            paddingTop: "2px",
                          }}
                        >
                          {allData?.tourPackage?.SubTitle}
                        </Typography>
                        <Typography
                          sx={{
                            color: "var(--tab-text)",
                            fontSize: { xs: 12, sm: 12, md: 11 },
                            fontWeight: 500,
                            padding: "10px 0px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <LocationOnIcon style={{ fontSize: "18px" }} />
                          <span> {allData?.tourPackage?.Location}</span>
                        </Typography>
                        <Box mt={4}>
                          <Typography
                            sx={{
                              color: "var(--gtext-color)",
                              fontSize: { xs: 12, sm: 12, md: 11 },
                              fontWeight: 500,
                            }}
                          >
                            Start Date : {allData?.tourPackage?.StartDate}
                          </Typography>
                          <Typography
                            sx={{
                              color: "var(--gtext-color)",
                              fontSize: { xs: 12, sm: 12, md: 11 },
                              fontWeight: 500,
                            }}
                          >
                            End Date :{allData?.tourPackage?.EndDate}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box>
                        <Typography
                          sx={{
                            color: "var(--gtext-color)",
                            fontSize: { xs: 12, sm: 12, md: 11 },
                            fontWeight: 500,
                            textAlign: "right",
                          }}
                        >
                          <b>
                            Total Duration:{" "}
                            {allData?.tourPackage?.TotalDuration}
                          </b>
                        </Typography>

                        <Box mt={1}>
                          <Stack
                            direction="row"
                            justifyContent={"flex-end"}
                            spacing={1}
                          >
                            {allData?.tourPackage?.Flight === true && (
                              <FlightIcon
                                sx={{
                                  bgcolor: "var(--days-color)",
                                  color: "#fff",
                                  borderRadius: "50%",
                                  p: 1,
                                  fontSize: 30,
                                }}
                              />
                            )}
                            {allData?.tourPackage?.Hotel === true && (
                              <HotelIcon
                                sx={{
                                  bgcolor: "var(--days-color)",
                                  color: "#fff",
                                  borderRadius: "50%",
                                  p: 1,
                                  fontSize: 30,
                                }}
                              />
                            )}
                            &nbsp;
                            {allData?.tourPackage?.Food === true && (
                              <LocalDiningOutlinedIcon
                                sx={{
                                  bgcolor: "var(--days-color)",
                                  color: "#fff",
                                  borderRadius: "50%",
                                  p: 1,
                                  fontSize: 30,
                                }}
                              />
                            )}
                            &nbsp;
                            {allData?.tourPackage?.Transport === true && (
                              <ToysOutlinedIcon
                                sx={{
                                  bgcolor: "var(--days-color)",
                                  color: "#fff",
                                  borderRadius: "50%",
                                  p: 1,
                                  fontSize: 30,
                                }}
                              />
                            )}
                          </Stack>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                {/*--------  tab ---------*/}
                {/*  tab */}
                <Box mt={4}>
                  <TabContext value={value}>
                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: "transparent",
                      }}
                    >
                      <TabList
                        onChange={handleTabs}
                        aria-label="lab API tabs example"
                        TabIndicatorProps={{
                          style: {
                            backgroundColor: "transparent",
                          },
                        }}
                        style={{
                          backgroundColor: "var(--primary-color)",
                          minHeight: "5px",
                          height: "25px",
                          width: "fit-content",
                        }}
                      >
                        <Tab
                          label="Tour Overview"
                          value="1"
                          sx={{
                            backgroundColor: "var(secondary-color)",
                            textTransform: "capitalize",
                            color: "var(--white)",
                            opacity: "1",
                            width: {
                              lg: "fit-content",
                              xs: "fit-content",
                            },

                            minHeight: "5px",
                            height: "25px",
                            margin: {
                              xs: "0px 0px",
                            },
                            "&.MuiTab-root.Mui-selected": {
                              color: "var(--white)",
                              opacity: "1",
                              background: "var(--secondary-color)",
                              height: "25px",
                            },
                            fontSize: { xs: "11px", sm: "11px", md: "11px" },
                            paddingLeft: { xs: "0px", md: "15px" },
                          }}
                        />

                        <Tab
                          label="Highlights"
                          value="2"
                          sx={{
                            backgroundColor: "var(secondary-color)",
                            textTransform: "capitalize",
                            color: "var(--white)",
                            opacity: "1",
                            width: {
                              lg: "fit-content",
                              xs: "fit-content",
                            },

                            minHeight: "5px",
                            height: "25px",
                            margin: {
                              xs: "0px 0px",
                            },
                            "&.MuiTab-root.Mui-selected": {
                              color: "var(--white)",
                              opacity: "1",
                              background: "var(--secondary-color)",
                              height: "25px",
                            },
                            fontSize: { xs: "11px", sm: "11px", md: "11px" },
                          }}
                        />
                        <Tab
                          label="Tour Plan"
                          value="3"
                          sx={{
                            backgroundColor: "var(secondary-color)",
                            textTransform: "capitalize",
                            color: "var(--white)",
                            opacity: "1",
                            width: {
                              lg: "fit-content",
                              xs: "fit-content",
                            },

                            minHeight: "5px",
                            height: "25px",
                            margin: {
                              xs: "0px 0px",
                            },
                            "&.MuiTab-root.Mui-selected": {
                              color: "var(--white)",
                              opacity: "1",
                              background: "var(--secondary-color)",
                              height: "25px",
                            },
                            fontSize: { xs: "11px", sm: "11px", md: "11px" },
                          }}
                        />
                        <Tab
                          label="Tour Policy"
                          value="4"
                          sx={{
                            backgroundColor: "var(secondary-color)",
                            textTransform: "capitalize",
                            color: "var(--white)",
                            opacity: "1",
                            width: {
                              lg: "fit-content",
                              xs: "fit-content",
                            },

                            minHeight: "5px",
                            height: "25px",
                            margin: {
                              xs: "0px 0px",
                            },
                            "&.MuiTab-root.Mui-selected": {
                              color: "var(--white)",
                              opacity: "1",
                              background: "var(--secondary-color)",
                              height: "25px",
                            },
                            fontSize: { xs: "11px", sm: "11px", md: "11px" },
                          }}
                        />
                      </TabList>
                    </Box>
                    <TabPanel value="1" style={{ paddingLeft: "0px" }}>
                      <Box
                        style={{
                          padding: "0px 15px",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "var(--primary-color)",
                            fontSize: { xs: 14, sm: 14, md: 15 },
                            fontWeight: 500,
                          }}
                        >
                          Overview
                        </Typography>

                        <Typography
                          style={{
                            textAlign: "justify",
                            fontSize: "12px",
                            color: "var(--text-black)",
                            fontWeight: "500",
                            marginTop: "10px",
                          }}
                        >
                          {allData?.tourPackage?.PackageOverview}
                        </Typography>

                        <Typography
                          sx={{
                            color: "var(--primary-color)",
                            fontSize: { xs: 14, sm: 14, md: 15 },
                            fontWeight: 500,
                            marginTop: "10px",
                            marginBottom: "10px",
                          }}
                        >
                          Place you will See
                        </Typography>
                        <Slider {...Package}>
                          {allData?.tourPackage?.__vistitedImages__?.map(
                            (image) => (
                              <Box
                                sx={{
                                  bgcolor: "var(--white)",
                                  borderRadius: "10px",
                                }}
                              >
                                <Box className="tours-box">
                                  <Box
                                    sx={{
                                      color: "#fff",
                                      position: "absolute",
                                      top: "10px",
                                      left: "10px",
                                    }}
                                  >
                                    {/* <Typography
                                      sx={{ color: "#fff", fontSize: "12px" }}
                                    >
                                      {image?.PlaceName}
                                    </Typography> */}
                                  </Box>
                                  <img
                                    src={image?.VisitedImagePath}
                                    alt="Tours Package"
                                    width="97%"
                                    height="100px"
                                  />
                                </Box>
                              </Box>
                            )
                          )}
                        </Slider>
                      </Box>
                    </TabPanel>
                    <TabPanel value="2" style={{ paddingLeft: "15px" }}>
                      <Box>
                        <Typography
                          sx={{
                            color: "var(--primary-color)",
                            fontSize: { xs: 14, sm: 14, md: 15 },
                            fontWeight: 500,
                          }}
                          mb={1}
                        >
                          Highlights
                        </Typography>

                        {allData?.tourPackage?.__highlights__.map((data) => (
                          <Typography
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              fontSize: "13px",
                              color: "var(--gtext-color)",
                            }}
                            pb={1}
                          >
                            <CheckCircleIcon
                              style={{
                                fontSize: "20px",
                                color: "var(--tab-text)",
                              }}
                            />
                            {data?.description}
                          </Typography>
                        ))}
                      </Box>
                    </TabPanel>
                    <TabPanel value="3" style={{ paddingLeft: "15px" }}>
                      <Box>
                        <Typography
                          style={{
                            fontSize: "15px",
                            color: "var(--primary-color)",
                            fontWeight: "500",
                          }}
                          pb={1.5}
                        >
                          Tour Plane
                        </Typography>
                        {allData?.tourPackage?.__tourpackageplans__?.map(
                          (data, index) => (
                            <Accordion
                              expanded={expanded === `panel${index + 1}`}
                              onChange={handleChange(`panel${index + 1}`)}
                              style={{
                                marginBottom: "10px",
                                boxShadow: "none",
                                background: "#FFC8CF",
                              }}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                style={{ margin: "0px" }}
                              >
                                <Typography
                                  sx={{
                                    width: "33%",
                                    flexShrink: 0,
                                    color: "var(--primary-color)",
                                  }}
                                >
                                  Day - {index + 1}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography
                                  style={{
                                    fontSize: "13px",
                                    color: "var(--gtext-color)",
                                  }}
                                >
                                  {data?.dayplan}
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          )
                        )}
                      </Box>
                    </TabPanel>
                    <TabPanel value="4">
                      <Box sx={{ width: "100%", typography: "body1" }}>
                        <TabContext value={tourValue}>
                          <Box
                            sx={{
                              borderBottom: 1,
                              borderColor: "divider",
                            }}
                          >
                            <TabList
                              onChange={handleTourTabs}
                              aria-label="lab API tabs example"
                              TabIndicatorProps={{
                                style: {
                                  backgroundColor: "var(--tab-text)",
                                },
                              }}
                            >
                              <Tab
                                label="inclusion "
                                value="1"
                                sx={{
                                  backgroundColor: "var(secondary-color)",
                                  color: "var(--secondary-color)",
                                  opacity: "1",
                                  width: {
                                    lg: "fit-content",
                                    xs: "fit-content",
                                  },
                                  minHeight: "50px",
                                  margin: {
                                    xs: "0px 0px",
                                  },
                                  "&.MuiTab-root.Mui-selected": {
                                    color: "var(--tab-text)",
                                    opacity: "1",
                                  },
                                  paddingLeft: "0px",

                                  fontSize: { xs: "11px", sm: "13px" },
                                }}
                              />
                              <Tab
                                label="Exclusion"
                                value="2"
                                sx={{
                                  backgroundColor: "var(secondary-color)",
                                  color: "var(--secondary-color)",
                                  opacity: "1",
                                  width: {
                                    lg: "fit-content",
                                    xs: "fit-content",
                                  },
                                  minHeight: "50px",
                                  margin: {
                                    xs: "0px 0px",
                                  },
                                  "&.MuiTab-root.Mui-selected": {
                                    color: "var(--tab-text)",
                                    opacity: "1",
                                  },

                                  fontSize: { xs: "11px", sm: "13px" },
                                }}
                              />
                              <Tab
                                label="Booking Policy"
                                value="3"
                                sx={{
                                  backgroundColor: "var(secondary-color)",
                                  color: "var(--secondary-color)",
                                  opacity: "1",
                                  width: {
                                    lg: "fit-content",
                                    xs: "fit-content",
                                  },
                                  minHeight: "50px",
                                  margin: {
                                    xs: "0px 0px",
                                  },
                                  "&.MuiTab-root.Mui-selected": {
                                    color: "var(--tab-text)",
                                    opacity: "1",
                                  },

                                  fontSize: { xs: "11px", sm: "13px" },
                                }}
                              />
                              <Tab
                                label="Refund Policy"
                                value="4"
                                sx={{
                                  backgroundColor: "var(secondary-color)",
                                  color: "var(--secondary-color)",
                                  opacity: "1",
                                  width: {
                                    lg: "fit-content",
                                    xs: "fit-content",
                                  },
                                  minHeight: "50px",
                                  margin: {
                                    xs: "0px 0px",
                                  },
                                  "&.MuiTab-root.Mui-selected": {
                                    color: "var(--tab-text)",
                                    opacity: "1",
                                  },

                                  fontSize: { xs: "11px", sm: "13px" },
                                }}
                              />
                            </TabList>
                          </Box>
                          <TabPanel value="1" style={{ paddingLeft: "0px" }}>
                            {allData?.tourPackage?.__PackageInclusions__?.map(
                              (data) => (
                                <Typography
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    fontSize: "13px",
                                    color: "var(--gtext-color)",
                                  }}
                                  pb={1}
                                >
                                  <CircleIcon
                                    style={{
                                      fontSize: "6px",
                                      color: "var(--tab-text)",
                                    }}
                                  />
                                  {data?.Inclusions}
                                </Typography>
                              )
                            )}
                          </TabPanel>
                          <TabPanel value="2">
                            {allData?.tourPackage?.__exclusions__?.map(
                              (data) => (
                                <Typography
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    fontSize: "13px",
                                    color: "var(--gtext-color)",
                                  }}
                                  pb={1}
                                >
                                  <CircleIcon
                                    style={{
                                      fontSize: "6px",
                                      color: "var(--tab-text)",
                                    }}
                                  />
                                  {data?.PackageExclusions}
                                </Typography>
                              )
                            )}
                          </TabPanel>

                          <TabPanel value="3">
                            {allData?.tourPackage?.__tourpackageplans__?.map(
                              (data) => (
                                <Typography
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    fontSize: "13px",
                                    color: "var(--gtext-color)",
                                  }}
                                  pb={1}
                                >
                                  <CircleIcon
                                    style={{
                                      fontSize: "6px",
                                      color: "var(--tab-text)",
                                    }}
                                  />
                                  {data?.dayplan}
                                </Typography>
                              )
                            )}
                          </TabPanel>
                          <TabPanel value="4">
                            {allData?.tourPackage?.__refundpolicys__?.map(
                              (data) => (
                                <Typography
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    fontSize: "13px",
                                    color: "var(--gtext-color)",
                                  }}
                                  pb={1}
                                >
                                  <CircleIcon
                                    style={{
                                      fontSize: "6px",
                                      color: "var(--tab-text)",
                                    }}
                                  />
                                  {data?.RefundPolicy}
                                </Typography>
                              )
                            )}
                          </TabPanel>
                        </TabContext>
                      </Box>
                    </TabPanel>
                  </TabContext>
                </Box>
              </Box>

              {/*  Passenger info */}

              <Box className="admin-balance-transaction" marginTop={"20px"}>
                <Typography
                  sx={{
                    color: "var(--primary-color)",
                    fontSize: { xs: 14, sm: 14, md: 18 },
                    fontWeight: 500,
                  }}
                  my={2}
                >
                  Passenger Information
                </Typography>
                {isLoading === false ? (
                  <table>
                    <tr>
                      <th>Sl</th>
                      <th>Name</th>
                      <th>Gender</th>
                      <th>Nationality</th>
                      {/* <th>Pax Type</th> */}
                      <th>DOB</th>
                      <th>Passport Number</th>
                      <th>Passport Ex. Date</th>
                      {/* <th>Attachment</th> */}
                    </tr>
                    <>
                      {allData?.travelers?.map((data, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            {data?.FirstName} {data?.LastName}
                          </td>
                          <td>{data?.Gender}</td>
                          <td>{data?.Nationality}</td>
                          {/* <td>{traveler}</td> */}
                          <td> {format(new Date(data?.DOB), "dd MMM yyyy")}</td>
                          <td>{data?.PassportNumber}</td>
                          <td>
                            {" "}
                            {format(
                              new Date(data?.PassportExpireDate),
                              "dd MMM yyyy"
                            )}
                          </td>
                          {/* <td>
                            <a href={data?.PassportCopyURL} target="_blank">
                              View
                            </a>
                          </td> */}
                        </tr>
                      ))}
                    </>
                  </table>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "30vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}
              </Box>

              {/* Payment method */}

              {allData?.status === "approved" ? (
                ""
              ) : (
                <Box mb={2}>
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: { xs: 14, sm: 14, md: 18 },
                      fontWeight: 500,
                    }}
                    my={2}
                  >
                    Pay Method
                  </Typography>
                  <Box
                    style={{
                      background: "var(--white)",
                      borderRadius: "3px",
                      padding: "30px 15px",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={6}>
                        <select
                          required
                          id="trip"
                          name="tripType"
                          style={{
                            width: "100%",
                            border: "none",
                            background: "var(--input-bgcolor)",
                            height: "35px",
                            fontSize: "12px",
                            color: "var(--text-mateBlack)",
                            padding: "0px 5px",
                            borderRadius: "3px",
                          }}
                        >
                          <option>Select your payment method</option>
                          <option value="Domestic">Credit</option>
                          <option value="International">Bkash</option>
                        </select>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} mt={1}>
                      <Grid item xs={12} sm={6} md={6}>
                        <Box>
                          <button
                            style={{
                              border: "1px solid #0D3E83",
                              background: "transparent",
                              height: "35px",
                              borderRadius: "3px",
                              width: "100%",
                              cursor: "pointer",
                              color: "#0D3C82",
                              fontWeight: "500",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "15px",
                            }}
                          >
                            <img
                              src={visa}
                              style={{ width: "50px" }}
                              alt="visa"
                            />
                            Using Credit or Debit Card
                          </button>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Box>
                          <button
                            style={{
                              border: "1px solid #DF146E",
                              background: "transparent",
                              height: "35px",
                              borderRadius: "3px",
                              width: "100%",
                              cursor: "pointer",
                              color: "#DF146E",
                              fontWeight: "500",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "15px",
                            }}
                          >
                            <img
                              src={bkash}
                              style={{ width: "50px" }}
                              alt="bkashImg"
                            />
                            Pay Using BKash
                          </button>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Box>
                          <button
                            style={{
                              border: "1px solid #EA2B24",
                              background: "transparent",
                              height: "35px",
                              borderRadius: "3px",
                              width: "100%",
                              cursor: "pointer",
                              color: "#EA2B24",
                              fontWeight: "500",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "15px",
                            }}
                          >
                            <img
                              src={nagad}
                              style={{ width: "45px" }}
                              alt="visa"
                            />
                            Pay Using Nagad
                          </button>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Box>
                          <button
                            style={{
                              border: "1px solid #252733",
                              background: "transparent",
                              height: "35px",
                              borderRadius: "3px",
                              width: "100%",
                              cursor: "pointer",
                              color: "#252733",
                              fontWeight: "500",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "15px",
                            }}
                            onClick={() => handleWallet()}
                          >
                            <AccountBalanceWalletIcon
                              sx={{ fontSize: "25px" }}
                            />
                            Pay Using Wallet
                          </button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={3}>
              {/* price BreakDown */}
              <Box sx={{ background: "var(--white)", paddingBottom: "15px" }}>
                <Box sx={{ padding: "15px 15px" }}>
                  <Typography
                    sx={{
                      color: "var(--text-mateBlack)",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    Total Payable
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--text-mateBlack)",
                      fontSize: "22px",
                      fontWeight: 500,
                    }}
                  >
                    BDT
                    {commaNumber(amount * traveler - finalDiscount * traveler)}
                  </Typography>
                </Box>
                <Box sx={{ background: "var(--primary-color)" }}>
                  <Typography
                    sx={{
                      padding: "3px 15px",
                      fontSize: "12px",
                      color: "var(--white)",
                    }}
                  >
                    Price Breakdown
                  </Typography>
                </Box>

                <Box sx={{ padding: "15px 15px" }}>
                  <Typography
                    sx={{
                      color: "var(--text-mateBlack)",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    Passenger x{traveler}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    mt={1}
                    mb={2}
                  >
                    <Typography
                      sx={{
                        color: "#888888",
                        fontSize: "11px",
                        fontWeight: 500,
                      }}
                    >
                      Fare x{traveler}
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: "11px",
                        fontWeight: 500,
                      }}
                    >
                      {commaNumber(amount * traveler)} BDT
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    mt={1}
                  >
                    <Typography
                      sx={{
                        color: "#888888",
                        fontSize: "11px",
                        fontWeight: 500,
                      }}
                    >
                      Customer Invoice Total
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: "11px",
                        fontWeight: 500,
                      }}
                    >
                      {commaNumber(amount * traveler)} BDT
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    mt={0.5}
                  >
                    <Typography
                      sx={{
                        color: "#888888",
                        fontSize: "11px",
                        fontWeight: 500,
                      }}
                    >
                      Discount
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: "11px",
                        fontWeight: 500,
                      }}
                    >
                      {commaNumber(finalDiscount * traveler)} BDT
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    mt={3}
                  >
                    <Typography
                      sx={{
                        color: "#888888",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      Grand Total
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      BDT{" "}
                      {commaNumber(
                        amount * traveler - finalDiscount * traveler
                      )}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              {/* Installment */}
              <Box
                sx={{ background: "var(--white)", padding: "15px 0px" }}
                mt={2}
                mb={{ xs: 15, md: 0 }}
              >
                <Box
                  sx={{
                    background: "var(--primary-color)",
                  }}
                >
                  <Typography
                    sx={{
                      padding: "3px 15px",
                      fontSize: "12px",
                      color: "var(--white)",
                    }}
                  >
                    Instalment
                  </Typography>
                </Box>

                {allData?.tourPackage?.__installments__.map((data, index) => (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0px 15px",
                    }}
                    mt={2}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "#BC6277",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        {index + 1}.Instalment
                      </Typography>
                      <Typography
                        style={{ color: "#837FB1", fontSize: "12px" }}
                      >
                        {data?.Name}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          color: "#3C4258",
                          fontSize: "14px",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        {commaNumber(Number(data?.Amount))} BDT
                        <CheckCircleIcon
                          style={{ fontSize: "20px", color: "var(--deposit)" }}
                        />
                      </Typography>
                    </Box>
                  </Box>
                ))}

                <Box sx={{ padding: "15px 15px" }}>
                  <Typography
                    sx={{
                      color: "#525371",
                      fontSize: "11px",
                      fontWeight: 500,
                    }}
                    mt={1}
                  >
                    To read more about our Instalment policy view
                    <span style={{ color: "#BC6277" }}>
                      {" "}
                      Terms & Conditions
                    </span>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default TourBookingConfirm;
