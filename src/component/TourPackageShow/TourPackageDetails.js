import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Tab,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Modal,
  Skeleton,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import ToysOutlinedIcon from "@mui/icons-material/ToysOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Header from "./../Header/Header";
import Slider from "react-slick";
import { useLocation, useNavigate } from "react-router-dom";
import PlaceSlider from "./PlaceSlider";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import tourImage from "../../Assets/Ladies/tourimage.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import commaNumber from "comma-number";
import CircleIcon from "@mui/icons-material/Circle";
import { useQuery } from "react-query";
import "./TourPackageDetails.css";
import Footer from "../Home/Footer/Footer";
import secureLocalStorage from "react-secure-storage";
import Swal from "sweetalert2";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Header/config";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useAuthentication from "../../hooks/useAuthentication";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
// import Tours from "../Home/Tours";
import AskAQuestion from "./AskAQuestion";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import TourPlan from "./TourPlan";
import Test from "../../Test";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFPackageDesign from "../TourPackagePdf/PDFPackageDesign/PDFPackageDesign";
import UserSigninSignup from "../UserSigninSignup/UserSigninSignup";
import Tours from "../Home/Tours/Tours";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 350, md: 600 },
  bgcolor: "white",
  outline: "none",
  p: 3,
  borderRadius: "5px",
  overflow: "auto",
  height: {
    xs: "80%",
    sm: "auto",
  },
  display: "block",
};

const TourPackageDetails = () => {
  const { loginUser, isLoading, error } = useAuthentication();
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : true);
  };
  const [value, setValue] = React.useState("1");
  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const allData = location?.state?.tourData;

  const numberFind = allData?.TotalDuration?.trim()?.split(" ");

  const packagePrice = parseInt(allData?.Price);
  const packageDiscount = parseInt(allData?.Discount);
  const discountPrice = packagePrice - (packageDiscount / 100) * packagePrice;
  const mainimage = location?.state?.tourData?.__mainimage__;

  var settings = {
    arrows: false,
    dots: true,
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [slideLoad, setSlideLoad] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [availablePac, setAvailablePac] = useState([]);

  useEffect(() => {
    fetch(`https://flyfarladies-apiv2.appspot.com/tourpackage/allpackage`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(true);
        const availableTourData = data?.allTourPackages?.filter((data) => {
          return data?.Showpackage === true && data?.Id !== allData?.Id;
        });
        setAvailablePac(availableTourData);
      });
  }, [allData?.Id]);

  const userInfo = secureLocalStorage.getItem("UserData");
  const userId = userInfo?.uuid;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [askModal, setAskModal] = useState(false);
  const handleOpenAsk = () => setAskModal(true);
  const handleCloseAsk = () => setAskModal(false);

  return (
    <Box>
      <Container>
        <Header />
        <Box sx={{ mb: 1.5 }}>
          <Grid container columnSpacing={3}>
            <Grid item xs={12} sm={8}>
              <Box className="full-screen-slider">
                {mainimage.length !== 0 ? (
                  <>
                    {loading ? (
                      <Slider {...settings}>
                        {mainimage?.map((image, index) => (
                          <Box
                            key={index}
                            className="slider-item"
                            sx={{
                              position: "relative",
                              backgroundImage: `url(${image?.MainImageUrl})`,
                              backgroundSize: " cover",
                              backgroundPosition: "center",
                              height: { md: "450px" },
                              borderRadius: "5px",
                            }}
                          ></Box>
                        ))}
                      </Slider>
                    ) : (
                      <Box
                        style={{
                          width: "100%",
                          margin: "0px 0px",
                          borderRadius: "5px",
                          height: "450px",
                          overFlow: "hidden",
                        }}
                      >
                        <Skeleton
                          sx={{ borderRadius: "5px" }}
                          variant="rectangular"
                          width={"100%"}
                          height={"100%"}
                        />
                      </Box>
                    )}
                  </>
                ) : (
                  ""
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} mt={{ xs: 3, md: 0 }}>
              <Box height="100%">
                <Stack direction="column" justifyContent="space-between">
                  <Tooltip followCursor title={allData?.MainTitle || ""}>
                    <Typography
                      sx={{
                        color: "var(--primary-color)",
                        fontSize: { xs: 18, sm: 18, md: 18 },
                        fontWeight: 500,
                        textTransform: "capitalize",
                        marginTop: "-5px",
                      }}
                      noWrap
                    >
                      {allData?.MainTitle}
                    </Typography>
                  </Tooltip>

                  <Tooltip followCursor title={allData?.MainTitle || ""}>
                    <Typography
                      style={{
                        fontSize: "13.5px",
                        color: "var(--text-color-b)",
                      }}
                      mt={1}
                      noWrap
                    >
                      {allData?.SubTitle}
                    </Typography>
                  </Tooltip>

                  <Typography
                    sx={{
                      pt: 1,
                      color: "var(--secondary-color)",
                      fontSize: { xs: 12, sm: 14, md: 15 },
                      fontWeight: 400,
                    }}
                    mb={1}
                  >
                    <Box>
                      <Typography
                        style={{
                          fontSize: "14px",
                          color: "var(--text-black)",
                        }}
                      >
                        Journey Start Date:{" "}
                        <span style={{ color: "var(--primary-color)" }}>
                          {allData?.StartDate}
                        </span>
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        style={{
                          fontSize: "14px",
                          color: "var(--text-black)",
                        }}
                      >
                        Journey End Date:{" "}
                        <span style={{ color: "var(--primary-color)" }}>
                          {allData?.EndDate}
                        </span>
                      </Typography>
                    </Box>
                  </Typography>

                  <Grid container spacing={2} mb={2}>
                    <Grid item xs={12} sm={6} md={6}>
                      <Box>
                        <Typography
                          sx={{
                            pt: 1,
                            color: "var(--text-color-b)",
                            fontSize: { xs: 16, md: 15 },
                            fontWeight: 500,
                          }}
                        >
                          Duration
                        </Typography>
                        <Typography style={{ fontSize: "15px" }}>
                          {
                            <>
                              <span style={{ fontWeight: "bold" }}>
                                {numberFind[0]}
                              </span>{" "}
                              <span>{numberFind[1]}</span>{" "}
                              <span style={{ fontWeight: "bold" }}>
                                {numberFind[2]}
                              </span>{" "}
                              <span>{numberFind[3]}</span>{" "}
                              <span style={{ fontWeight: "bold" }}>
                                {numberFind[4]}
                              </span>{" "}
                              <span>{numberFind[5]}</span>
                            </>
                          }
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Typography
                        sx={{
                          pt: 1,
                          color: "var(--text-color-b)",
                          fontSize: { xs: 16, md: 15 },
                          fontWeight: 500,
                        }}
                      >
                        Available Seat
                      </Typography>
                      <Typography
                        style={{ fontSize: "15px", fontWeight: "500" }}
                      >
                        {allData?.AvailableSeats}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                      <Box>
                        <Typography
                          sx={{
                            pt: 1,
                            color: "var(--text-color-b)",
                            fontSize: { xs: 16, md: 15 },
                            fontWeight: 500,
                          }}
                          mb={0.5}
                        >
                          Includes
                        </Typography>
                        <Stack direction="row">
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
                          &nbsp;
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
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Typography
                        sx={{
                          pt: 1,
                          color: "var(--text-color-b)",
                          fontSize: { xs: 16, md: 15 },
                          fontWeight: 500,
                        }}
                      >
                        Age Range
                      </Typography>
                      <Typography style={{ fontSize: "15px" }}>
                        {allData?.MinimumAge} to {allData?.MaximumAge}
                      </Typography>
                    </Grid>
                  </Grid>
                </Stack>
                <Box
                  sx={{
                    background: "var(--white)",
                    padding: "10px 20px",
                    borderRadius: "5px",
                  }}
                  mt={6}
                >
                  <Typography
                    style={{
                      color: "var(--primary-color)",
                      fontWeight: "500",
                      fontSize: "13.5px",
                    }}
                  >
                    Price Per/ Person
                  </Typography>
                  <Box style={{ textAlign: "right" }} my={2}>
                    <span
                      style={{
                        fontSize: "35px",
                        fontWeight: "500",
                        color: "var(--text-color-b)",
                      }}
                    >
                      {commaNumber(discountPrice)}
                    </span>
                    <sup
                      style={{
                        top: "-10px",
                        position: "relative",
                      }}
                    >
                      bdt
                    </sup>
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      paddingBottom: "5px",
                    }}
                  >
                    {userInfo?.Name ? (
                      <button
                        style={{
                          width: "130px",
                          border: "none",
                          background: "var(--text-color-b)",
                          color: "var(--white)",
                          height: "30px",
                          borderRadius: "3px",
                          fontSize: "12px",
                          marginRight: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          navigate("/dashboard/packageinformation", {
                            state: {
                              allData,
                            },
                          })
                        }
                      >
                        Proceed Booking
                      </button>
                    ) : (
                      <button
                        style={{
                          width: "130px",
                          border: "none",
                          background: "var(--text-color-b)",
                          color: "var(--white)",
                          height: "30px",
                          borderRadius: "3px",
                          fontSize: "12px",
                          marginRight: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() => setOpen(true)}
                      >
                        Proceed Booking
                      </button>
                    )}
                    {/* 
                    <button
                      style={{
                        width: "130px",
                        border: "none",
                        background: "var(--secondary-color)",
                        color: "var(--white)",
                        height: "30px",
                        borderRadius: "3px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      <PDFDownloadLink
                        document={
                          <PDFPackageDesign
                            copy="Booking Copy"
                            data={allData}
                          />
                        }
                        fileName={"Tour Package"}
                      >
                        {({ blob, url, fileName, loading, error }) =>
                          loading ? (
                            "Loading document..."
                          ) : (
                            <a
                              href={fileName}
                              target="_blank"
                              style={{
                                cursor: "pointer",
                                color: "var(--white)",
                                textDecoration: "none",
                              }}
                              rel="noreferrer"
                            >
                              Download Brochure
                            </a>
                          )
                        }
                      </PDFDownloadLink>
                    </button> */}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
            mt={2}
            display="flex"
            alignItems={"center"}
          >
            <Grid item xs={12} sm={12} md={12}>
              <Box>
                <Typography
                  style={{
                    fontSize: "18px",
                    color: "var(--primary-color)",
                    fontWeight: "500",
                  }}
                  my={2}
                >
                  Overview
                </Typography>
                <Typography
                  style={{
                    fontSize: "13.5px",
                    color: "var(--text-color-b)",
                    textAlign: "justify",
                  }}
                >
                  {allData?.PackageOverview}
                </Typography>
              </Box>
            </Grid>

            {/* <Grid item xs={12} sm={6} md={4}>
              <Box
                style={{
                  background: "var(--white)",
                  padding: "10px 20px",
                  borderRadius: "5px",
                }}
              >
                <Typography
                  style={{
                    color: "var(--primary-color)",
                    fontWeight: "500",
                    fontSize: "13.5px",
                  }}
                >
                  Price Per/ Person
                </Typography>
                <Box style={{ textAlign: "right" }} my={2}>
                  <span
                    style={{
                      fontSize: "35px",
                      fontWeight: "500",
                      color: "var(--text-color-b)",
                    }}
                  >
                    {commaNumber(discountPrice)}
                  </span>
                  <sup
                    style={{
                      top: "-10px",
                      position: "relative",
                    }}
                  >
                    bdt
                  </sup>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingBottom: "5px",
                  }}
                >
                  {userInfo?.Name ? (
                    <button
                      style={{
                        width: "130px",
                        border: "none",
                        background: "var(--text-color-b)",
                        color: "var(--white)",
                        height: "30px",
                        borderRadius: "3px",
                        fontSize: "12px",
                        marginRight: "8px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        navigate("/dashboard/packageinformation", {
                          state: {
                            allData,
                          },
                        })
                      }
                    >
                      Proceed Booking
                    </button>
                  ) : (
                    <button
                      style={{
                        width: "130px",
                        border: "none",
                        background: "var(--text-color-b)",
                        color: "var(--white)",
                        height: "30px",
                        borderRadius: "3px",
                        fontSize: "12px",
                        marginRight: "8px",
                        cursor: "pointer",
                      }}
                      onClick={() => setOpen(true)}
                    >
                      Proceed Booking
                    </button>
                  )}

                  <button
                    style={{
                      width: "130px",
                      border: "none",
                      background: "var(--secondary-color)",
                      color: "var(--white)",
                      height: "30px",
                      borderRadius: "3px",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    <PDFDownloadLink
                      document={
                        <PDFPackageDesign copy="Booking Copy" data={allData} />
                      }
                      fileName={"Tour Package"}
                    >
                      {({ blob, url, fileName, loading, error }) =>
                        loading ? (
                          "Loading document..."
                        ) : (
                          <a
                            href={fileName}
                            target="_blank"
                            style={{
                              cursor: "pointer",
                              color: "var(--white)",
                              textDecoration: "none",
                            }}
                            rel="noreferrer"
                          >
                            Download Brochure
                          </a>
                        )
                      }
                    </PDFDownloadLink>
                  </button>
                </Box>
              </Box>
            </Grid> */}
          </Grid>

          {/*Place you will See  */}
          <PlaceSlider allData={allData} loading={loading} />

          {/* Highlights */}

          <Box mt={5}>
            <Typography
              style={{
                fontSize: "18px",
                color: "var(--primary-color)",
                fontWeight: "500",
              }}
              pb={2.5}
            >
              Highlights
            </Typography>
            {allData?.__highlights__.map((highlightData) => (
              <Typography
                style={{
                  display: "flex",
                  gap: "10px",
                  fontSize: "13.5px",
                  color: "var(--mateBlack)",
                }}
                pb={2}
              >
                <CheckCircleIcon
                  style={{ fontSize: "20px", color: "var(--tab-text)" }}
                />
                {highlightData?.description}
              </Typography>
            ))}
          </Box>

          {/* Tour Plane */}
          <Box mt={5}>
            <Typography
              style={{
                fontSize: "18px",
                color: "var(--primary-color)",
                fontWeight: "500",
              }}
              pb={2.5}
            >
              Tour Plan
            </Typography>
            {allData?.__tourpackageplans__.map((tourPlan, index) => (
              <Accordion
                expanded={expanded === `panel${index + 1}`}
                onChange={handleChange(`panel${index + 1}`)}
                style={{
                  marginBottom: "10px",
                  boxShadow: "none",
                  // background: "#FFC8CF",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    margin: "0px",
                  }}
                >
                  <Typography
                    sx={{
                      width: "100%",
                      flexShrink: 0,
                      color: "var(--primary-color)",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    Day - {index + 1}
                    <span
                      style={{
                        color: "#222222",
                        fontWeight: "400",
                        fontSize: "14.5px",
                        paddingLeft: "10px",
                      }}
                    >
                      {" "}
                      {tourPlan?.Title}
                    </span>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ borderTop: "1px solid #c7c7c7" }}>
                  <Typography
                    style={{
                      fontSize: "13.5px",
                      color: "var(--mateBlack)",
                      textAlign: "justify",
                    }}
                  >
                    {tourPlan?.dayplan}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          {/* Objectives */}
          <Box mt={7} sx={{ width: "100%", typography: "body1" }}>
            <Typography
              style={{
                fontSize: "18px",
                color: "var(--primary-color)",
                fontWeight: "500",
              }}
              mb={2.5}
            >
              Objectives
            </Typography>

            <Box
              style={{
                backgroundColor: "#fff",
                padding: "5px 30px 0px 30px",
                borderRadius: "3px",
              }}
            >
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <TabList
                    onChange={handleTabs}
                    aria-label="lab API tabs example"
                    TabIndicatorProps={{
                      style: {
                        backgroundColor: "var(--tab-text)",
                      },
                    }}
                  >
                    <Tab
                      label="Installment Option"
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
                      label="Inclusion"
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
                      label="Exclusion"
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
                      label="Booking Policy"
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
                    <Tab
                      label="Refund Policy"
                      value="5"
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
                <TabPanel value="1">
                  {allData?.__installments__.length !== 0 ? (
                    <>
                      {allData?.__installments__?.map((data, index) => (
                        <Typography
                          style={{
                            display: "flex",
                            gap: "5px",
                            fontSize: "13.5px",
                            color: "var(--mateBlack)",
                          }}
                          pb={2}
                        >
                          <CheckCircleIcon
                            style={{
                              fontSize: "20px",
                              color: "var(--tab-text)",
                            }}
                          />
                          The amount of the{" "}
                          {index + 1 === 1
                            ? "1st"
                            : index + 1 === 2
                            ? "2nd"
                            : index + 1 === 3
                            ? "3rd"
                            : index + 1 === 4
                            ? "4th"
                            : index + 1 === 5
                            ? "5th"
                            : index + 1 === 6
                            ? "6th"
                            : ""}
                           installment payment, which need to be confirmed by{" "}
                          {data?.Date}, will be {commaNumber(data?.Amount)} BDT.
                        </Typography>
                      ))}
                    </>
                  ) : (
                    <Box>
                      <Typography
                        style={{
                          color: "var(--mateBlack)",
                          fontSize: "13.5px",
                        }}
                      >
                        Installment are not available for this package
                      </Typography>
                    </Box>
                  )}
                </TabPanel>
                <TabPanel value="2">
                  {allData?.__PackageInclusions__?.map((inclusion) => (
                    <Typography
                      style={{
                        display: "flex",
                        gap: "6px",
                        fontSize: "13.5px",
                        color: "var(--gtext-color)",
                      }}
                      pb={2}
                    >
                      <CheckCircleIcon
                        style={{
                          fontSize: "20px",
                          color: "var(--tab-text)",
                        }}
                      />
                      {inclusion?.Inclusions}
                    </Typography>
                  ))}
                </TabPanel>
                <TabPanel value="3">
                  {allData?.__exclusions__?.map((exclusions) => (
                    <Typography
                      style={{
                        display: "flex",
                        gap: "6px",
                        fontSize: "13.5px",
                        color: "var(--gtext-color)",
                      }}
                      pb={2}
                    >
                      <CheckCircleIcon
                        style={{
                          fontSize: "20px",
                          color: "var(--tab-text)",
                        }}
                      />
                      {exclusions?.PackageExclusions}
                    </Typography>
                  ))}
                </TabPanel>
                <TabPanel value="4">
                  {allData?.__BookingPolicys__?.map((bookingPolicy) => (
                    <Typography
                      style={{
                        display: "flex",
                        gap: "6px",
                        fontSize: "13px",
                        color: "var(--gtext-color)",
                      }}
                      pb={2}
                    >
                      <CheckCircleIcon
                        style={{
                          fontSize: "20px",
                          color: "var(--tab-text)",
                        }}
                      />
                      {bookingPolicy?.description}
                    </Typography>
                  ))}
                </TabPanel>
                <TabPanel value="5">
                  {allData?.__refundpolicys__?.map((refund) => (
                    <Typography
                      style={{
                        display: "flex",
                        gap: "6px",
                        fontSize: "13px",
                        color: "var(--gtext-color)",
                      }}
                      pb={2}
                    >
                      <CheckCircleIcon
                        style={{
                          fontSize: "20px",
                          color: "var(--tab-text)",
                        }}
                      />
                      {refund?.RefundPolicy}
                    </Typography>
                  ))}
                </TabPanel>
              </TabContext>
            </Box>
          </Box>
          {/*ask your question */}

          <Box
            style={{
              background: "var(--gtext-color)",
              padding: "10px 10px",
              borderRadius: "5px",
            }}
            mt={6}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <HeadsetMicIcon style={{ fontSize: "25px", color: "#fff" }} />
                <Box>
                  <Typography
                    sx={{ color: "#fff" }}
                    fontSize={{ xs: "11px", md: "14px" }}
                  >
                    Have a Question About this tour ?
                  </Typography>
                  <Typography
                    sx={{ color: "#fff" }}
                    fontSize={{ xs: "11px", md: "14px" }}
                  >
                    Reach out to our travel experts.
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography
                  style={{
                    color: "#fff",
                    paddingRight: "10px",
                    cursor: "pointer",
                  }}
                  fontSize={{ xs: "13px", md: "14px" }}
                  onClick={handleOpenAsk}
                >
                  Ask Question
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Album */}
          <Box py={1}>
            <Typography
              style={{
                fontSize: "18px",
                color: "var(--primary-color)",
                fontWeight: "500",
              }}
              mt={5}
            >
              {allData?.__albumImages__[0]?.AlbumTitle}
            </Typography>

            <Box mt={2} style={{ position: "relative" }}>
              <Box
                style={{
                  backgroundImage: `url(${allData?.__albumImages__[0]?.albumImageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  height: "250px",
                  borderRadius: "5px",
                }}
              >
                <div
                  style={{
                    top: "0",
                    left: " 0",
                    width: "100%",
                    height: "100%",
                    backgroundColor: " rgba(0, 0, 0, 0.5)",
                  }}
                ></div>
              </Box>

              {/* <NavLink to={"/dashboard/albumimgview"}>
              
              </NavLink> */}

              <button
                style={{
                  position: "absolute",
                  bottom: "25px",
                  right: "20px",
                  background: "var(--tab-text)",
                  border: "none",
                  width: "130px",
                  height: "33px",
                  color: "#fff",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate("/dashboard/albumimgview", {
                    state: {
                      allData: allData,
                    },
                  })
                }
              >
                View All
              </button>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Popular Tour */}
      <Container sx={{ marginBottom: "100px" }}>
        <Box>
          {/* <Tours /> */}
          <Tours isloading={loading} availablePac={availablePac} />
        </Box>
      </Container>
      <Box
        sx={{
          background: "rgba(112, 44, 139, 0.7)",
          backdropFilter: " blur(5px)",
          height: "58px",
          position: "fixed",
          width: "100%",
          bottom: "0px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container>
          <Grid container spacing={0} display={"flex"} alignItems={"center"}>
            <Grid item xs={3.5} sm={2} md={2.5}>
              <Box
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite sx={{ color: "var(--white)" }} />}
                  sx={{ color: "var(--white)", p: 0, pl: 1 }}
                />
                <Typography
                  sx={{ color: "#fff", fontWeight: "400" }}
                  fontSize={{ xs: "10px", md: "14px" }}
                >
                  Add to Wish List
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3.5} sm={2} md={2.5}>
              <Box>
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: "400",
                    cursor: "pointer",
                  }}
                  fontSize={{ xs: "11px", md: "14px" }}
                  onClick={handleOpenAsk}
                >
                  Ask a Question ?
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={5}
              sm={3}
              md={7}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <Box>
                {userInfo?.Name ? (
                  <button
                    style={{
                      width: "135px",
                      border: "none",
                      backgroundColor: "#702C8B",
                      color: "#fff",
                      fontSize: "13px",
                      height: "32px",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      navigate("/dashboard/packageinformation", {
                        state: {
                          allData,
                        },
                      })
                    }
                  >
                    Proceed Booking
                  </button>
                ) : (
                  <button
                    style={{
                      width: "135px",
                      border: "none",
                      backgroundColor: "#702C8B",
                      color: "#fff",
                      fontSize: "13px",
                      height: "32px",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                    onClick={() => setOpen(true)}
                  >
                    Proceed Booking
                  </button>
                )}
              </Box>
            </Grid>
          </Grid>
          {/* sign in and signup modal here */}
          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <UserSigninSignup home="home" open={open} setOpen={setOpen} />
            </Box>
          </Modal>

          {askModal ? (
            <AskAQuestion
              handleOpen={handleOpenAsk}
              handleClose={handleCloseAsk}
              setOpenAsk={setAskModal}
              openAsk={askModal}
            />
          ) : null}
        </Container>
      </Box>
      <Footer mt={15} />
    </Box>
  );
};

export default TourPackageDetails;
