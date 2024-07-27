import React, { useState } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import tourImage from "../../Assets/Ladies/tourimage.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Slider from "react-slick";

const PlaceSlider = ({ allData, loading }) => {
  const visitPlace = allData?.__vistitedImages__;

  const [slideLoad, setSlideLoad] = useState([1, 2, 3, 4, 5, 6, 7]);

  let len;
  if (visitPlace?.length !== 0) {
    len = visitPlace?.length > 4 ? 4 : visitPlace?.length;
  } else {
    len = slideLoad?.length > 4 ? 4 : slideLoad?.length;
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: len,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
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

  return (
    <Box mt={5}>
      {visitPlace.length !== 0 ? (
        <Box>
          <Typography
            style={{
              fontSize: "18px",
              color: "var(--primary-color)",
              fontWeight: "500",
            }}
            my={1}
          >
            Place you will See
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
              {visitPlace?.map((visitPlace) => (
                <Box
                  sx={{
                    bgcolor: "var(--white)",
                    borderRadius: "10px",
                  }}
                >
                  <Box className="tours-box">
                    <img
                      src={visitPlace?.VisitedImagePath}
                      alt="Tours Package"
                      width="100%"
                      height={"170px"}
                    />
                  </Box>
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default PlaceSlider;
