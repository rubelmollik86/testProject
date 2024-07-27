import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Stack,
  Tab,
  Typography,
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
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import tourImage from "../../Assets/Ladies/tourimage.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import commaNumber from "comma-number";
import CircleIcon from "@mui/icons-material/Circle";
import { useQuery } from "react-query";
import "./TourPackageDetails.css";
import Footer from "../Home/Footer/Footer";

const TourPackageDetails = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [value, setValue] = React.useState("1");

  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };

  const location = useLocation();

  const [isLoaded, setIsLoaded] = useState(false);
  const allData = location?.state?.tourData;
  const mainimage = location?.state?.tourData?.mainimage;

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
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

  const [slideLoad, setSlideLoad] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://flyfarladies-apiv2.appspot.com/tourpackage/allpackage`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  // const { isLoading, error, data } = useQuery("package", () =>
  //   fetch("https://flyfarladies-apiv2.appspot.com/tourpackage/allpackage").then((res) =>
  //     res.json()
  //   )
  // );

  return (
    <Box>
      <Container>
        <Header />
        <Box sx={{ mb: 1.5, width: "100%", height: "100%" }}>
          <Grid container columnSpacing={3}>
            <Grid item xs={12} sm={8}>
              <Box>
                <Slider>
                  {mainimage?.map((image, index) => (
                    <div key={index} width="600px" height="300px">
                      <img
                        src={image.MainImageUrl}
                        alt={`Image ${index}`}
                        width="100%"
                        height="300px"
                      />
                    </div>
                  ))}
                </Slider>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box height="100%">
                <Stack
                  direction="column"
                  justifyContent="space-between"
                  height="100%"
                >
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: { xs: 18, sm: 18, md: 20 },
                      fontWeight: 500,
                      textTransform: "capitalize",
                    }}
                  >
                    {allData?.MainTitle}
                    <Box mt={1}>
                      <Typography
                        style={{
                          fontSize: "15px",
                          color: "var(--text-color-b)",
                        }}
                      >
                        {allData?.SubTitle}
                      </Typography>
                    </Box>
                  </Typography>

                  <Typography
                    sx={{
                      pt: 1,
                      color: "var(--days-color)",
                      fontSize: 15,
                      fontWeight: 500,
                    }}
                  >
                    {allData?.TotalDuration}
                  </Typography>
                  <Typography
                    sx={{
                      pt: 1,
                      color: "var(--secondary-color)",
                      fontSize: { xs: 12, sm: 14, md: 15 },
                      fontWeight: 400,
                    }}
                  >
                    <Box>Journey Start Date :{allData?.StartDate}</Box>
                    <Box>Journey End Date :{allData?.EndDate}</Box>
                  </Typography>
                  <Box>
                    <Typography
                      sx={{
                        pt: 1,
                        color: "var(--text-color-b)",
                        fontSize: { xs: 16, md: 17 },
                        fontWeight: 500,
                      }}
                    >
                      Includes
                    </Typography>
                    <Stack direction="row" spacing={1.5}>
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
                </Stack>
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
            <Grid item xs={12} sm={6} md={8}>
              <Box>
                <Typography
                  style={{
                    fontSize: "18px",
                    color: "var(--primary-color)",
                    fontWeight: "500",
                  }}
                  my={1}
                >
                  Overview
                </Typography>
                <Typography
                  style={{
                    fontSize: "13px",
                    color: "var(--text-color-b)",
                    textAlign: "justify",
                  }}
                >
                  {allData?.PackageOverview}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
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
                    fontSize: "13px",
                  }}
                >
                  Price Per/ Person
                </Typography>
                <Box style={{ textAlign: "right" }} my={2}>
                  <span
                    style={{
                      fontSize: "30px",
                      fontWeight: "500",
                      color: "var(--text-color-b)",
                    }}
                  >
                    {commaNumber(Number(allData?.Price))}
                  </span>
                  <sup style={{ top: "-10px", position: "relative" }}>bdt</sup>
                </Box>
                <Box style={{ display: "flex", justifyContent: "flex-end" }}>
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
                    Download Brochure
                  </button>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/*Place you will See  */}
          <PlaceSlider allData={allData} />

          {/* Highlights */}
          <Box mt={3}>
            <Typography
              style={{
                fontSize: "18px",
                color: "var(--primary-color)",
                fontWeight: "500",
              }}
              pb={1.5}
            >
              Highlights
            </Typography>
            {allData?.highlights.map((highlightData) => (
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
                  style={{ fontSize: "20px", color: "var(--tab-text)" }}
                />
                {highlightData?.description}
              </Typography>
            ))}
          </Box>

          {/* Tour Plane */}
          <Box mt={3}>
            <Typography
              style={{
                fontSize: "18px",
                color: "var(--primary-color)",
                fontWeight: "500",
              }}
              pb={1.5}
            >
              Tour Plane
            </Typography>

            {allData?.tourpackageplans.map((tourPlan, index) => (
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
                    style={{ fontSize: "13px", color: "var(--gtext-color)" }}
                  >
                    {tourPlan?.dayplan}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          {/* Objectives */}
          <Box mt={5} sx={{ width: "100%", typography: "body1" }}>
            <Typography
              style={{
                fontSize: "18px",
                color: "var(--primary-color)",
                fontWeight: "500",
              }}
            >
              Objectives
            </Typography>

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
                    label="Payment Option"
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
              <TabPanel value="1" style={{ paddingLeft: "0px" }}>
                <Box className="tour-pack-table-responsive-p">
                  <table className="tour-pack-deposite-table tour-pack-table-responsive-c">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Amount</th>
                      </tr>
                    </thead>{" "}
                    <tbody>
                      {allData?.installments?.map((data) => (
                        <tr>
                          <td>{data?.InstallmentId}st install</td>
                          <td>{data?.Date}</td>
                          <td>{commaNumber(data?.Amount)} BDT</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              </TabPanel>
              <TabPanel value="2">
                {allData?.PackageInclusions?.map((inclusion) => (
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
                      style={{ fontSize: "6px", color: "var(--tab-text)" }}
                    />
                    {inclusion?.Inclusions}
                  </Typography>
                ))}
              </TabPanel>
              <TabPanel value="3">
                {allData?.exclusions?.map((exclusions) => (
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
                      style={{ fontSize: "6px", color: "var(--tab-text)" }}
                    />
                    {exclusions?.PackageExclusions}
                  </Typography>
                ))}
              </TabPanel>
              <TabPanel value="4">
                {allData?.BookingPolicys?.map((bookingPolicy) => (
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
                      style={{ fontSize: "6px", color: "var(--tab-text)" }}
                    />
                    {bookingPolicy?.description}
                  </Typography>
                ))}
              </TabPanel>
              <TabPanel value="5">
                {allData?.refundpolicys?.map((refund) => (
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
                      style={{ fontSize: "6px", color: "var(--tab-text)" }}
                    />
                    {refund?.RefundPolicy}
                  </Typography>
                ))}
              </TabPanel>
            </TabContext>
          </Box>

          {/* Album */}
          <Box py={1}>
            <Typography
              style={{
                fontSize: "18px",
                color: "var(--primary-color)",
                fontWeight: "500",
              }}
            >
              Album
            </Typography>
            <Box
              sx={{
                ".slick-slide > div": {
                  margin: "1px 10px",
                  width: "auto",
                },
                ".slick-list": {
                  margin: "0px -10px",
                },
              }}
            >
              <Slider {...settings}>
                {allData?.albumImages?.map((album) => (
                  <Box
                    sx={{
                      bgcolor: "var(--white)",
                      boxShadow: "0px 0px 11px rgba(245, 153, 166, 0.85)",
                      borderRadius: "10px",
                    }}
                  >
                    <Box className="tours-box">
                      <Box
                        sx={{
                          color: "#fff",
                          position: "absolute",
                          bottom: "10px",
                          left: "10px",
                        }}
                      >
                        <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                          {album?.AlbumTitle}
                        </Typography>
                      </Box>
                      <img
                        src={album?.albumImageUrl}
                        alt="Tours Package"
                        width="100%"
                        height="180px"
                      />
                    </Box>
                  </Box>
                ))}
              </Slider>
            </Box>
          </Box>
          <Box
            style={{
              background: "var(--gtext-color)",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
            mt={2}
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
                <HeadsetMicIcon style={{ fontSize: "35px", color: "#fff" }} />
                <Box>
                  <Typography style={{ color: "#fff", fontSize: "11px" }}>
                    Have a Question About this tour ?
                  </Typography>
                  <Typography style={{ color: "#fff", fontSize: "9px" }}>
                    Reach out to our travel experts.
                  </Typography>
                </Box>
              </Box>
              <Box>
                <a href="/" style={{ color: "#fff", fontSize: "12px" }}>
                  Ask Question
                </a>
              </Box>
            </Box>
          </Box>

          {/* See our other Tour Pac */}
          <Box mt={3}>
            <Typography
              style={{
                fontSize: "18px",
                color: "var(--primary-color)",
                fontWeight: "500",
              }}
              my={1}
            >
              See Our Other Tour Packages
            </Typography>
            <Box
              sx={{
                ".slick-slide > div": {
                  margin: "1px 10px",
                  width: "auto",
                },
                ".slick-list": {
                  margin: "0px -10px",
                },
              }}
            >
              <Slider {...Package}>
                {data?.gettourpackage?.map((data) => (
                  <Box
                    sx={{
                      bgcolor: "var(--white)",
                      boxShadow: "0px 0px 11px rgba(245, 153, 166, 0.85)",
                      borderRadius: "10px",
                    }}
                  >
                    <Box className="tours-box">
                      <Box className="tours-btn" sx={{ color: "#fff" }}>
                        <FavoriteIcon />
                      </Box>
                      <Box className="tours-date">
                        <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                          date time
                        </Typography>
                      </Box>
                      <img
                        src={data?.coverimageurl}
                        alt="Tours Package"
                        width="100%"
                        height="200px"
                      />
                    </Box>
                    <Box px={1.5} py={1.2}>
                      <Typography
                        sx={{
                          fontSize: { xs: 16 },
                          fontWeight: 500,
                          color: "var(--text-color-b)",
                        }}
                      >
                        {data?.MainTitle}
                      </Typography>
                      <Stack direction="row">
                        <RoomOutlinedIcon
                          sx={{
                            color: "var(--primary-color)",
                            fontSize: 20,
                          }}
                        />
                        <Box>
                          <Typography
                            sx={{
                              fontSize: { xs: 12 },
                              fontWeight: 500,
                              color: "var(--text-color-b)",
                            }}
                          >
                            {data?.Location}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: { xs: 10 },
                              fontWeight: 400,
                              color: "var(--text-color-g)",
                            }}
                          >
                            Start Date: {data?.StartDate} <br />
                            End Date: {data?.EndDate}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        mt={1}
                      >
                        <Typography
                          sx={{
                            color: "var(--secondary-color)",
                            fontSize: 16,
                          }}
                        >
                          {commaNumber(Number(data?.Price))}/= BDT
                        </Typography>
                        <Button
                          size="small"
                          sx={{
                            color: "var(--white)",
                            bgcolor: "var(--secondary-color)",
                            ":hover": {
                              bgcolor: "var(--secondary-color)",
                              color: "var(--white)",
                            },
                          }}
                        >
                          Book Now
                        </Button>
                      </Stack>
                    </Box>
                  </Box>
                ))}
              </Slider>
            </Box>
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default TourPackageDetails;
