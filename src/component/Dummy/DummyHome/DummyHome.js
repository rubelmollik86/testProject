import { Box, Container } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import blog from "../../../image/blog/blog1.png";

import "./DummyHome.css";

const DummyHome = () => {
  const settings = {
    arrows: false,
    dots: true,
    // fade: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box mt={5}>
      {/*  section 1 */}
      <Box className="full-screen-slider">
        <Slider {...settings}>
          <Box className="slider-item">
            <img src={blog} alt="Tours Package" />
          </Box>

          <Box className="slider-item">
            <img src={blog} alt="Tours Package" />
          </Box>
        </Slider>
      </Box>
      {/*  section2 */}



      
    </Box>
  );
};

export default DummyHome;
