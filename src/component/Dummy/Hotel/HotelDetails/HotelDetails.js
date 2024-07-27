import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import hotel from "../../../../image/hotelImg/hotel.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "./HotelDetails.css";
import HotelRooms from "./HotelRooms/HotelRooms";
import HotelFacilities from "./HotelFacilities/HotelFacilities";
import HotelNearbyPlaces from "./HotelNearbyPlaces/HotelNearbyPlaces";
import HotelPolicy from "./HotelPolicy/HotelPolicy";

const HotelDetails = () => {
  const [desire, setDesire] = useState(0);
  return (
    <Box>
      <Container maxWidth="xl" className="hotemDetails">
        <Grid className="hotemDetails1" container spacing={5}>
          <Grid item xs={12} sm={12} md={4}>
            <img src={hotel} alt="hetelImg" />
          </Grid>
          <Grid item md={7}>
            <Box className="hotelDetailsContent1">
              <Typography variant="h5">Windy Terrace Boutique Hotel</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <LocationOnIcon
                  style={{ color: "#F1592A", fontSize: "25px" }}
                />
                <Typography variant="h6">
                  Plot-40, Block-C, Kolatoli, Cox's Bazar, Bangladesh <br></br>
                  0.8 km from kolatoli beach
                </Typography>
              </Box>
            </Box>

            <Grid container columnSpacing={{ xs: 11, sm: 2, md: 20 }}>
              <Grid item sx={6} sm={3} md={2} lg={2}>
                <Box className="hotelDetailsBtn1">
                  <button>Garden</button>
                </Box>
              </Grid>
              <Grid item sx={6} sm={3} md={2} lg={2}>
                <Box className="hotelDetailsBtn1">
                  <button>Swimming Pool</button>
                </Box>
              </Grid>
              <Grid item sx={6} sm={3} md={2} lg={2}>
                <Box className="hotelDetailsBtn1">
                  <button>Gym</button>
                </Box>
              </Grid>
              <Grid item sx={6} sm={3} md={2} lg={2}>
                <Box className="hotelDetailsBtn1">
                  <button>Couple Friendly</button>
                </Box>
              </Grid>
              <Grid item sx={6} sm={3} md={2} lg={2}>
                <Box className="hotelDetailsBtn1">
                  <button>Kid Friendly</button>
                </Box>
              </Grid>
            </Grid>

            <Box className="hotelDetailsContent1">
              <Typography
                sx={{ marginTop: "25px", marginBottom: "6px" }}
                variant="h5"
              >
                Overview
              </Typography>
              <Typography
                style={{
                  color: "#282e2c",
                  fontSize: "16px",
                  lineHeight: "25px",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim
                venenatis velit nulla pellentesque mauris mus nunc. venenatis
                velit nulla pellentesque mauris mus nunc.
              </Typography>{" "}
              <Typography
                style={{
                  color: "#282e2c",
                  fontSize: "16px",
                  lineHeight: "25px",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim
                venenatis velit nulla pellentesque mauris mus nunc. venenatis
                velit nulla pellentesque mauris mus nunc.
              </Typography>{" "}
              <Typography
                style={{
                  color: "#282e2c",
                  fontSize: "16px",
                  lineHeight: "25px",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim
                venenatis velit nulla pellentesque mauris mus nunc. venenatis
                velit nulla pellentesque mauris mus nunc.
              </Typography>{" "}
              <Typography
                style={{
                  color: "#282e2c",
                  fontSize: "16px",
                  lineHeight: "25px",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim
                venenatis velit nulla pellentesque mauris mus nunc. venenatis
                velit nulla pellentesque mauris mus nunc.
              </Typography>{" "}
            </Box>

            <Box className="mapHotel">
              <div class="mapouter">
                <div class="gmap_canvas">
                  <iframe
                    class="gmap_iframe"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=bosundhora&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  ></iframe>
                </div>
              </div>
            </Box>
          </Grid>
        </Grid>

        {/* ------------------------- */}

        <Box className=" hotelTab">
          <Box className="parent-hotelTab">
            <Box>
              <Tabs
                selectedIndex={desire}
                onSelect={(index) => setDesire(index)}
              >
                <TabList
                  style={{
                    paddingLeft: "0px",
                    display: "flex",
                    gap: "40px",
                    alignItems: "center",
                    fontSize: "22px",
                    marginBottom: "40px",
                  }}
                >
                  <Tab>Rooms</Tab>
                  <Box
                    style={{
                      width: "2px",
                      height: "15px",
                      backgroundColor: "#F1592A",
                    }}
                  ></Box>
                  <Tab>Facilities</Tab>
                  <Box
                    style={{
                      width: "2px",
                      height: "15px",
                      backgroundColor: "#F1592A",
                    }}
                  ></Box>
                  <Tab>Nearby Places</Tab>
                  <Box
                    style={{
                      width: "2px",
                      height: "15px",
                      backgroundColor: "#F1592A",
                    }}
                  ></Box>
                  <Tab>Policy</Tab>
                </TabList>

                <TabPanel>
                  <HotelRooms />
                </TabPanel>

                <TabPanel>
                  <HotelFacilities />
                </TabPanel>
                <TabPanel>
                  <HotelNearbyPlaces />
                </TabPanel>
                <TabPanel>
                  <HotelPolicy />
                </TabPanel>
              </Tabs>
            </Box>
          </Box>
        </Box>

        {/* ------------------------- */}
      </Container>
    </Box>
  );
};

export default HotelDetails;
