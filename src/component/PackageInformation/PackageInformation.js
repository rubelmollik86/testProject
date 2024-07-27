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
import Header from "../Header/Header";
import cto from "../../image/place.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import ToysOutlinedIcon from "@mui/icons-material/ToysOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { useState } from "react";
import Slider from "react-slick";
import tourImage from "../../Assets/Ladies/tourimage.png";
import SearchIcon from "@mui/icons-material/Search";
import DoneIcon from "@mui/icons-material/Done";
import Radio from "@mui/material/Radio";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircleIcon from "@mui/icons-material/Circle";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Home/Footer/Footer";
import commaNumber from "comma-number";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import CountryList from "../CountryList";
import secureLocalStorage from "react-secure-storage";
import { addDays, format } from "date-fns";
import { Calendar } from "react-date-range";
import { useRef } from "react";

const PackageInformation = () => {
  const userInfo = secureLocalStorage.getItem("UserData");
  const now = useRef(new Date());

  const navigate = useNavigate();
  const location = useLocation();
  const allData = location?.state?.allData;
  console.log(allData);

  const [promoCode, setPromoCode] = useState("");
  const handlePromoCode = () => {};

  //  price calculation
  const amount = parseInt(allData?.Price);
  const discount = allData?.Discount;
  const result = amount - (discount / 100) * amount;
  const finalDiscount = amount - result;
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [value, setValue] = React.useState("1");
  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };

  const [tourValue, setTourValue] = React.useState("1");
  const handleTourTabs = (event, newValue) => {
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
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
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

  // todo: add traveler handle

  const [travelers, setTravelers] = useState([
    {
      FirstName: "",
      LastName: "",
      DOB: "",
      Gender: "",
      Nationality: "",
      PassportNumber: "",
      PassportExpireDate: "",
      openDob: false,
      openExp: false,
    },
  ]);

  const visitInputTextChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...travelers];
    list[index][name] = value;
    setTravelers(list);
  };

  const visitInputRemove = (index) => {
    const list = [...travelers];
    list.splice(index, 1);
    setTravelers(list);
  };

  const visitInputAdd = (i) => {
    setTravelers([
      ...travelers,
      {
        FirstName: "",
        LastName: "",
        DOB: "",
        Gender: "",
        Nationality: "",
        PassportNumber: "",
        PassportExpireDate: "",
      },
    ]);
  };

  const handleSelectDOB = (index, item) => {
    const tempData = [...travelers];
    tempData[index] = {
      ...tempData[index],
      openDob: !item.openDob,
    };
    setTravelers(tempData);
  };

  const handleSelectEXP = (index, item) => {
    const tempData = [...travelers];
    tempData[index] = {
      ...tempData[index],
      openExp: !item.openExp,
    };
    setTravelers(tempData);
  };

  const updatedData = {
    travelers: travelers.map(({ openDob, openExp, ...rest }) => rest),
  };

  let body = JSON.stringify({
    travelers: updatedData?.travelers,
  });

  const handleBookAndHold = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let url = `https://flyfarladies-apiv2.appspot.com/booking/${allData?.Id}/book/${userInfo?.uuid}`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setIsLoading(false);
          Swal.fire({
            icon: "success",
            title: data?.status,
            text: data?.message,
            confirmButtonText: "ok",
          }).then(function () {
            navigate("/dashboard/mybookings");
          });
        } else {
          setIsLoading(false);
          Swal.fire({
            icon: "error",
            title: data?.status,
            text: data?.message,
            confirmButtonText: "ok",
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
            Package Information
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
                          src={allData?.coverimageurl}
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
                          {allData?.MainTitle}
                        </Typography>
                        <Typography
                          sx={{
                            color: "var(--text-black)",
                            fontSize: { xs: 12, sm: 12, md: 12 },
                            fontWeight: 500,
                            paddingTop: "2px",
                          }}
                          mt={1}
                        >
                          {allData?.SubTitle}
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
                          <em> {allData?.Location}</em>
                        </Typography>
                        <Box mt={0}>
                          <Typography
                            sx={{
                              color: "var(--gtext-color)",
                              fontSize: { xs: 12, sm: 12, md: 11 },
                              fontWeight: 500,
                            }}
                          >
                            Start Date : {allData?.StartDate}
                          </Typography>
                          <Typography
                            sx={{
                              color: "var(--gtext-color)",
                              fontSize: { xs: 12, sm: 12, md: 11 },
                              fontWeight: 500,
                            }}
                          >
                            End Date :{allData?.EndDate}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box>
                        <Typography
                          sx={{
                            color: "var(--gtext-color)",
                            fontSize: { xs: 12, sm: 12, md: 16 },
                            fontWeight: 500,
                            textAlign: "right",
                          }}
                        >
                          {allData?.TotalDuration}
                        </Typography>

                        <Box mt={1}>
                          <Stack
                            direction="row"
                            justifyContent={"flex-end"}
                            spacing={0.5}
                          >
                            {allData?.Flight === true && (
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
                            {allData?.Hotel === true && (
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
                            {allData?.Food === true && (
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
                            {allData?.Transport === true && (
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
                          {allData?.PackageOverview}
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
                          {allData?.__vistitedImages__.map((image) => (
                            <Box
                              sx={{
                                bgcolor: "var(--white)",
                                borderRadius: "10px",
                              }}
                            >
                              <Box className="tours-box">
                                {/* <Box
                                  sx={{
                                    color: "#fff",
                                    position: "absolute",
                                    top: "10px",
                                    left: "10px",
                                  }}
                                >
                                  <Typography
                                    sx={{ color: "#fff", fontSize: "12px" }}
                                  >
                                    {image?.PlaceName}
                                  </Typography>
                                </Box> */}
                                <img
                                  src={image?.VisitedImagePath}
                                  alt="Tours Package"
                                  width="97%"
                                  height="100px"
                                />
                              </Box>
                            </Box>
                          ))}
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

                        {allData?.__highlights__.map((data) => (
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
                        {allData?.__tourpackageplans__?.map((data, index) => (
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
                                  fontSize: "14px",
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
                        ))}
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
                                label="inclusion"
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
                                label="Booking policy"
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
                            {allData?.__PackageInclusions__?.map((data) => (
                              <Typography
                                style={{
                                  display: "flex",
                                  gap: "6px",
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
                                {data?.Inclusions}
                              </Typography>
                            ))}
                          </TabPanel>
                          <TabPanel value="2" style={{ paddingLeft: "0px " }}>
                            {allData?.__exclusions__?.map((data) => (
                              <Typography
                                style={{
                                  display: "flex",
                                  gap: "6px",
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
                                {data?.PackageExclusions}
                              </Typography>
                            ))}
                          </TabPanel>

                          <TabPanel value="3" style={{ paddingLeft: "0px " }}>
                            {allData?.__BookingPolicys__?.map((data) => (
                              <Typography
                                style={{
                                  display: "flex",
                                  gap: "6px",
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
                          </TabPanel>
                          <TabPanel value="4" style={{ paddingLeft: "0px " }}>
                            {allData?.__refundpolicys__?.map((data) => (
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
                                <CheckCircleIcon
                                  style={{
                                    fontSize: "20px",
                                    color: "var(--tab-text)",
                                  }}
                                />
                                {data?.RefundPolicy}
                              </Typography>
                            ))}
                          </TabPanel>
                        </TabContext>
                      </Box>
                    </TabPanel>
                  </TabContext>
                </Box>
              </Box>

              {/* travel details */}
              <Box>
                <Typography
                  sx={{
                    color: "var(--primary-color)",
                    fontSize: { xs: 14, sm: 14, md: 18 },
                    fontWeight: 500,
                  }}
                  my={2}
                >
                  Traveler Details
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
                      <Box style={{ position: "relative" }}>
                        <input
                          type="text"
                          placeholder="Search From your Favorite Traveler List"
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
                        />

                        <SearchIcon
                          style={{
                            position: "absolute",
                            right: "5px",
                            top: "6px",
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      display="flex"
                      justifyContent="flex-end"
                    >
                      <button
                        style={{
                          border: "none",
                          width: "120px",
                          height: "33px",
                          background: "var(--gtext-color)",
                          color: "#fff",
                          borderRadius: "3px",
                        }}
                      >
                        Traveler
                      </button>
                    </Grid>
                  </Grid>
                  <form onSubmit={handleBookAndHold}>
                    {travelers.map((item, index) => {
                      return (
                        <Grid
                          container
                          spacing={2}
                          mt={1}
                          sx={{
                            input: {
                              width: "100%",
                              border: "none",
                              background: "var(--input-bgcolor)",
                              height: "35px",
                              fontSize: "12px",
                              color: "var(--text-mateBlack)",
                              padding: "0px 5px",
                              borderRadius: "3px",
                              boxSizing: "border-box",
                            },
                            select: {
                              width: "100%",
                              border: "none",
                              background: "var(--input-bgcolor)",
                              height: "35px",
                              fontSize: "12px",
                              color: "var(--text-mateBlack)",
                              padding: "0px 5px",
                              borderRadius: "3px",
                            },
                          }}
                        >
                          <Grid item xs={12} sm={6} md={4}>
                            <input
                              type="text"
                              required
                              placeholder="Enter First / GIver Name"
                              name="FirstName"
                              onChange={(e) => visitInputTextChange(e, index)}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <input
                              type="text"
                              required
                              placeholder="Enter Last / Surname "
                              name="LastName"
                              onChange={(e) => visitInputTextChange(e, index)}
                            />
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            sx={{ position: "relative" }}
                          >
                            <input
                              required
                              type="text"
                              name="DOB"
                              autoComplete="off"
                              value={item.DOB}
                              placeholder="Date of Birth"
                              onClick={() => {
                                handleSelectDOB(index, item);
                              }}
                            />

                            {item.openDob && (
                              <Calendar
                                color={"#003566"}
                                onChange={(date) => {
                                  const tempFlightData = [...travelers];
                                  tempFlightData[index] = {
                                    ...tempFlightData[index],
                                    DOB: new Date(date).toLocaleDateString(
                                      "sv"
                                    ),
                                    openDob: false,
                                  };
                                  setTravelers(tempFlightData);
                                }}
                                months={1}
                                maxDate={new Date()}
                                className="user-info-calendar"
                              />
                            )}
                          </Grid>

                          <Grid item xs={12} sm={6} md={4}>
                            <select
                              required
                              id="trip"
                              name="Gender"
                              onChange={(e) => visitInputTextChange(e, index)}
                            >
                              <option>Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <select
                              required
                              id="trip"
                              name="Nationality"
                              onChange={(e) => visitInputTextChange(e, index)}
                            >
                              <option>Select Nationality</option>

                              {CountryList?.map((data) => (
                                <option value={data?.name}>{data?.name}</option>
                              ))}
                            </select>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <input
                              type="text"
                              id="subtitle"
                              placeholder="Enter passport Number"
                              name="PassportNumber"
                              onChange={(e) => visitInputTextChange(e, index)}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            sx={{ position: "relative" }}
                          >
                            <input
                              required
                              type="text"
                              autoComplete="off"
                              name="PassportExpireDate"
                              value={item.PassportExpireDate}
                              placeholder="Enter Passport Expire Data"
                              onClick={() => {
                                handleSelectEXP(index, item);
                              }}
                            />

                            {item.openExp && (
                              <Calendar
                                color={"#003566"}
                                onChange={(date) => {
                                  const tempTravelData = [...travelers];
                                  tempTravelData[index] = {
                                    ...tempTravelData[index],
                                    PassportExpireDate: new Date(
                                      date
                                    ).toLocaleDateString("sv"),
                                    openExp: false,
                                  };
                                  setTravelers(tempTravelData);
                                }}
                                minDate={new Date()}
                                months={1}
                                className="user-info-calendar"
                              />
                            )}
                          </Grid>
                          <Grid item xs={12} sm={12} md={6}>
                            {travelers.length - 1 === index && (
                              <Button
                                onClick={() => visitInputAdd(index)}
                                sx={{
                                  marginRight: "10px",
                                  width: "150px",
                                  height: "35px",
                                  background: "var(--tab-text)",
                                  color: "#fff",
                                  fontSize: { xs: 14, sm: 14, md: 15 },
                                  border: "none",
                                  borderRadius: "3px",
                                  textTransform: "capitalize",
                                  "&:hover": {
                                    background: "var(--tab-text)",
                                    color: "#fff",
                                  },
                                }}
                              >
                                Add Traveler
                              </Button>
                            )}
                            {travelers.length !== 1 && (
                              <Button
                                onClick={() => visitInputRemove(index)}
                                sx={{
                                  width: "150px",
                                  height: "35px",
                                  background: "var(--tomato-color)",
                                  color: "#fff",
                                  fontSize: { xs: 14, sm: 14, md: 15 },
                                  border: "none",
                                  borderRadius: "3px",
                                  textTransform: "capitalize",
                                  "&:hover": {
                                    background: "var(--tomato-color)",
                                    color: "#fff",
                                  },
                                }}
                              >
                                Remove
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                      );
                    })}
                    <Box>
                      <Box
                        style={{ display: "flex", alignItems: "center" }}
                        mt={2}
                      >
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                defaultChecked
                                sx={{
                                  color: "#BC6277",
                                  "&.Mui-checked": {
                                    color: "#BC6277",
                                  },
                                }}
                              />
                            }
                            label={
                              <span
                                style={{ color: "#B6B6CC", fontSize: "14px" }}
                              >
                                By Complete this Booking agree our{" "}
                                <span style={{ color: "#BC6277" }}>
                                  Terms & Conditions
                                </span>
                              </span>
                            }
                          />
                        </FormGroup>
                      </Box>
                      <Box style={{ textAlign: "center" }} mt={2}>
                        {isLoading === false ? (
                          <button
                            style={{
                              width: "100%",
                              height: "35px",
                              border: "none",
                              background: "var(--primary-color)",
                              color: "#fff",
                              borderRadius: "3px",
                              cursor: "pointer",
                            }}
                            type="submit"
                          >
                            Book & Hold
                          </button>
                        ) : (
                          <button
                            style={{
                              width: "100%",
                              height: "35px",
                              border: "none",
                              background: "var(--primary-color)",
                              color: "#fff",
                              borderRadius: "3px",
                              cursor: "pointer",
                            }}
                            type="submit"
                          >
                            <CircularProgress
                              size="1.5rem"
                              sx={{
                                color: "#fff",
                              }}
                            />
                          </button>
                        )}
                      </Box>
                    </Box>
                  </form>
                </Box>
              </Box>
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
                    BDT{" "}
                    {commaNumber(
                      amount * travelers.length -
                        finalDiscount * travelers.length
                    )}
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
                    Passenger x{travelers.length}
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
                      Fare x{travelers.length}
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: "11px",
                        fontWeight: 500,
                      }}
                    >
                      {commaNumber(amount * travelers.length)} BDT
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
                      {commaNumber(amount * travelers.length)} BDT
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
                      {commaNumber(finalDiscount * travelers.length)} BDT
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
                        amount * travelers.length -
                          finalDiscount * travelers.length
                      )}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* apply Promo Code */}
              {/* <Box
                sx={{ background: "var(--white)", padding: "15px 0px" }}
                mt={2}
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
                    Apply Promo Code
                  </Typography>
                </Box>

                <Box sx={{ padding: "15px 15px" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }} mt={1}>
                    <input
                      style={{
                        width: "90%",
                        height: "30px",
                        outline: "none",
                        border: "1px solid #B6B6CC ",
                        borderTopLeftRadius: "3px",
                        borderBottomLeftRadius: "3px",
                      }}
                      type="text"
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button
                      style={{
                        height: "30px",
                        outline: "none",
                        border: "1px solid #B6B6CC ",
                        cursor: "pointer",
                        borderTopRightRadius: "3px",
                        borderBottomRightRadius: "3px",
                        background: "#B6B6CC",
                      }}
                      onClick={() => handlePromoCode()}
                    >
                      <DoneIcon sx={{ fontSize: "20px" }} />
                    </button>
                  </Box>

                  <Typography
                    sx={{
                      color: "var(--text-mateBlack)",
                      fontSize: "11px",
                      fontWeight: 500,
                    }}
                    mt={1.5}
                  >
                    Your Promo code has been applied you’ve saved 2268 BDT
                  </Typography>

                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: 500,
                      background: "#FE99A6",
                      padding: "3px 15px",
                    }}
                    mt={1.5}
                  >
                    Other Promo Code
                  </Typography>

                  <Box mt={1}>
                    <Radio
                      {...controlProps("a")}
                      sx={{
                        color: "#BC6277",
                        "&.Mui-checked": {
                          color: "#BC6277",
                        },
                      }}
                    />
                    <span
                      style={{ color: "var(--text-black)", fontSize: "14px" }}
                    >
                      ATHAFAAF
                    </span>
                  </Box>
                  <Typography
                    sx={{
                      color: "var(--text-mateBlack)",
                      fontSize: "11px",
                      fontWeight: 500,
                    }}
                    mt={1}
                  >
                    Your Promo code has been applied you’ve saved 2268 BDT
                  </Typography>
                </Box>
              </Box> */}

              {/* Installment */}
              <Box
                sx={{ background: "var(--white)", padding: "15px 0px" }}
                mt={2}
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

                {allData?.__installments__.map((data, index) => (
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

export default PackageInformation;
