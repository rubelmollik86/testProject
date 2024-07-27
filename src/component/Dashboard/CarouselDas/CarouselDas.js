import { Box, Container } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "./CarouselDas.css";

import dasc1 from "../../../image/dsh-img/dash-c1.png";
import dasc2 from "../../../image/dsh-img/dash-c2.png";

const CarouselDas = () => {
  const settings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box className="carousel-parent">
      <Container
        style={{ padding: "0" }}
        className="slider-customize das-slider-customize"
      >
        <Slider {...settings} className="slider-customize">
          <div className="carousel-img dsh-carousel-img">
            <img src={dasc1} alt="..." />
          </div>

          <div className="carousel-img dsh-carousel-img">
            <img src={dasc2} alt="..." />
          </div>

          <div className="carousel-img dsh-carousel-img">
            <img src={dasc1} alt="..." />
          </div>

          <div className="carousel-img dsh-carousel-img">
            <img src={dasc2} alt="..." />
          </div>
        </Slider>
      </Container>
    </Box>
  );
};

export default CarouselDas;

// import React from 'react';
// import Slider from "react-slick";
// import './CarouselDas.css'

// import dasc1 from '../../../image/dsh-img/dash-c1.png'
// import dasc2 from '../../../image/dsh-img/dash-c2.png'

// const CarouselDas = () => {

//     const settings = {

//         infinite: true,
//         slidesToShow: 2,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 2000,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                     infinite: true,
//                     dots: false
//                 }
//             },

//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1
//                 }
//             },

//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 1
//                 }
//             },

//             {
//                 breakpoint: 320,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1
//                 }
//             },
//         ]
//     };

//     return (
//         <div>
//             <Slider {...settings} className='slider-customize'>
//                 <div className='' >
//                     <img src={dasc1} alt="..." />
//                 </div>

//                 <div className=''>
//                     <img src={dasc2} alt="..." />
//                 </div>

//             </Slider>
//         </div>
//     );
// };

// export default CarouselDas;
