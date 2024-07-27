import React from "react";
import Slider from "react-slick";
import "./Carousel.css";
import { Box, Container } from "@mui/system";

import c1 from "../../image/c1.png";
import c2 from "../../image/c2.png";
import c3 from "../../image/c3.png";
import c4 from "../../image/c4.png";
import c5 from "../../image/c5.png";
import c6 from "../../image/c6.jpg";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      //   {
      //     breakpoint: 1440,
      //     settings: {
      //       slidesToShow: 4,
      //       slidesToScroll: 3,
      //       infinite: true,
      //       dots: true,
      //     },
      //   },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
    ],
  };

  return (
    <Box className="carousel-parent">
      <Container className="card-slider-customize" style={{ padding: "0" }}>
        <div className="carousel-header">
          <span>Our Most Popular Airline Partners</span>
        </div>
        <Slider {...settings}>
          <div className="card-carousel-img">
            <img src={c1} alt="..." />
          </div>

          <div className="card-carousel-img">
            <img src={c2} alt="..." />
          </div>

          <div className="card-carousel-img">
            <img src={c3} alt="..." />
          </div>

          <div className="card-carousel-img">
            <img src={c4} alt="..." />
          </div>

          <div className="card-carousel-img">
            <img src={c5} alt="..." />
          </div>

          <div className="card-carousel-img">
            <img src={c6} alt="..." />
          </div>
        </Slider>
      </Container>
    </Box>
  );
};

export default Carousel;
