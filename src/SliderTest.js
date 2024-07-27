import React, { useState } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import tourImage from "./Assets/Ladies/tourimage.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Slider from "react-slick";
import { useQuery } from "react-query";
import { Container } from "@mui/system";
import Header from "./component/Header/Header";
import about1 from "../src/image/About/bgflight.png";
import about2 from "../src/image/About/img1.png";
import about3 from "../src/image/About/img2.png";
import about4 from "../src/image/About/img3.png";
import about5 from "../src/image/About/img4.png";

import "./SliderTest.css";

const image = [
  {
    img: about1,
  },
  {
    img: about2,
  },
  {
    img: about3,
  },
  {
    img: about4,
  },
  {
    img: about5,
  },
];

const SliderTest = () => {
  const settings = {
    arrows: true,
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


  return (
    <div className="DatePicker-style">
      <Container>
        <Header />

        <Box py={5}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    borderRadius: "20px",
                  }}
                >
                  <Box className="tours-box">
                    <Slider {...settings}>
                      {/* 
                      {slideLoad.map(function (slide) {
                        return (
                          <div key={slide}>
                            <img
                              src={tourImage}
                              alt="Tours Package"
                              width="100%"
                            />
                          </div>
                        );
                      })} */}

                      {image.map((data) => (
                        <div>
                          <img
                            src={data.img}
                            alt="Tours Package"
                            width="100%"
                            height="250px"
                            style={{
                              borderRadius: "20px",
                            }}
                          />
                        </div>
                      ))}
                    </Slider>
                  </Box>
                  <Box></Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default SliderTest;
