import { Box, Container } from "@material-ui/core";
import React from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import line from "../../../image/line.png";
import Visac from "../../../image/Visac.png";
import covids from "../../../image/covids.png";
import air from "../../../image/air.png";
import travels from "../../../image/travels.png";
import Card from "react-animated-3d-card";
import FlightIcon from "@mui/icons-material/Flight";
import search from "../../../Assets/Images/Icon/1.png";
import travel from "../../../Assets/Images/Icon/2.png";
import setup from "../../../Assets/Images/Icon/3.png";
import price from "../../../Assets/Images/Icon/4.png";
import "./DescriptionBox.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DescriptionBox = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: "true",
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
  };
  return (
    <Container maxWidth={"lg"}>
      <Box my={4}>
        <Box display="flex" justifyContent="center">
          <Box textAlign="center" my={3}>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#2966AC",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <hr
                style={{
                  width: "30px",
                  height: "3px",
                  backgroundColor: "#2966AC",
                }}
              />{" "}
              Our Service
            </Typography>
            <Typography
              sx={{
                fontSize: "30px",
                color: "#35B5E7",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
              }}
            >
              Solutions for the whole <br />
              travel ecosystem
            </Typography>
          </Box>
        </Box>
        <Box className="service">
          <div>
            <Slider className="service-slider" {...settings}>
              <div>
                <Typography
                  paddingY={"10%"}
                  sx={{
                    fontSize: "3vw",
                    margin: "auto",
                    fontFamily: "Poppins",
                    color: "#fff",
                  }}
                >
                  Get upto 30% Discount on all <br /> Domestic Flight
                </Typography>
              </div>
              <div>
                <Typography
                  paddingY={"10%"}
                  sx={{
                    fontSize: "3vw",
                    margin: "auto",
                    fontFamily: "Poppins",
                    color: "#fff",
                  }}
                >
                  Get upto 30% Discount on all <br /> Domestic Flight
                </Typography>
              </div>
              <div>
                <Typography
                  paddingY={"10%"}
                  sx={{
                    fontSize: "3vw",
                    margin: "auto",
                    fontFamily: "Poppins",
                    color: "#fff",
                  }}
                >
                  Get upto 30% Discount on all <br /> Domestic Flight
                </Typography>
              </div>
            </Slider>
          </div>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center">
        <Box textAlign="center" mb={3}>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#2966AC",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <hr
              style={{
                width: "30px",
                height: "3px",
                backgroundColor: "#2966AC",
              }}
            />{" "}
            Why flyway ?
          </Typography>
          <Typography
            sx={{
              fontSize: "30px",
              color: "#35B5E7",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            We’re the travel platform of <br />
            choice for enterprises
          </Typography>
        </Box>
      </Box>
      <Grid container justifyContent={"space-between"} my={4}>
        <Grid item xs={12} sm={6} md={3} lg={3} px={6}>
          <Box textAlign="center">
            <img src={search} alt="For Travel Organizers"></img>
            <Typography
              sx={{
                fontSize: "24px",
                color: "#2966AC",
                fontWeight: 600,
              }}
            >
              Fast and relevant <br />
              search results
            </Typography>
            <Typography mt={2}>
              Convert more searches to bookings and reduce your cost per
              acquisition
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3} px={6}>
          <Box textAlign="center">
            <img src={travel} alt="For Travel Organizers"></img>
            <Typography
              sx={{
                fontSize: "24px",
                color: "#2966AC",
                fontWeight: 600,
              }}
            >
              The best travel <br />
              options anywhere
            </Typography>
            <Typography mt={2}>
              Every transport and accommodation options your travelers need in
              one place
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3} px={6}>
          <Box textAlign="center">
            <img src={setup} alt="For Travel Organizers"></img>
            <Typography
              sx={{
                fontSize: "24px",
                color: "#2966AC",
                fontWeight: 600,
              }}
            >
              Fast company <br />
              setup
            </Typography>
            <Typography mt={2}>
              Invite all of your employees, set up fully integrated travel
              policies, and start booking
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3} px={6}>
          <Box textAlign="center">
            <img src={price} alt="For Travel Organizers"></img>
            <Typography
              sx={{
                fontSize: "24px",
                color: "#2966AC",
                fontWeight: 600,
              }}
            >
              Affordable price & <br />
              deals
            </Typography>
            <Typography mt={2}>
              Offer competitive prices for your customer along with latest deals
              and promotions
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box className="sign-up-now-bottom" mt={8}>
        <Typography
          sx={{ color: "#fff", fontSize: "3.5vw", fontWeight: "bold" }}
        >
          Let’s make the travel <br />
          experience amazing together.
          <br />
          <Button
            variant="contained"
            sx={{ border: "2px solid #fff", color: "#fff", mt: "20px" }}
          >
            Sign Up Now
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default DescriptionBox;
