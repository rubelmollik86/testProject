import React, { useState } from "react";
import {
  Box,
  Button,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Slider from "react-slick";
import { format } from "date-fns";

import { useNavigate } from "react-router-dom";
import commaNumber from "comma-number";

const Tours = ({ availablePac, isloading }) => {
  const navigate = useNavigate();

  const [slideLoad, setSlideLoad] = useState([1, 2, 3, 4, 5, 6, 7]);

  let len = availablePac?.length > 4 ? 4 : availablePac?.length;
  const laptopLen = availablePac?.length >= 3 ? 3 : availablePac?.length;
  const tabLen = availablePac?.length >= 2 ? 2 : availablePac?.length;

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: len,
    slidesToScroll: 1,
    initialSlide: 2,
    autoplay: true,
    arrows: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: laptopLen,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: tabLen,
          slidesToScroll: 2,
          initialSlide: len,
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
    <Box
      sx={{
        display: { md: `${len > 3 ? "block" : "flex"}` },
        justifyContent: { md: `${len > 3 ? "start" : "center"}` },
      }}
    >
      <Box
        sx={{
          ".slick-slide > div": {
            margin: "1px 10px",
            width: "auto",
          },
          ".slick-list": {
            margin: "0px -10px",
          },
          mx: { xs: 2, sm: 2, md: 0 },
        }}
      >
        {availablePac.length !== 0 ? (
          <Box>
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: 15, sm: 20, md: 30 },
                  fontWeight: 500,
                  color: "var(--text-color-b)",
                  textAlign: "center",
                  my: { xs: 2, sm: 2, md: 5 },
                }}
              >
                Our Most Popular{" "}
                <span style={{ color: "var(--secondary-color)" }}>Tours</span>
              </Typography>
            </Box>
            {isloading ? (
              <Slider {...settings}>
                {availablePac?.map((tourData, index, arr) => (
                  <div>
                    <Box
                      sx={{
                        bgcolor: "var(--white)",
                        borderRadius: "10px",
                        width: {
                          xs: "100%",
                          sm: `${arr.length < 3 ? "280px" : null}`,
                          md: `${arr.length < 3 ? "280px" : null}`,
                        },
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/dashboard/tourpackagedetails", {
                          state: {
                            tourData,
                          },
                        });
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                    >
                      <Box className="tours-box">
                        <img
                          src={tourData?.coverimageurl}
                          alt="Tours Package"
                          width="100%"
                          height="200px"
                          style={{
                            borderRadius: "5px 5px 0px 0px ",
                          }}
                        />
                      </Box>
                      <Box px={1.5} py={1.2}>
                        <Typography
                          sx={{
                            fontSize: { xs: 15 },
                            fontWeight: 500,
                            color: "var(--text-color-b)",
                          }}
                        >
                          <Tooltip
                            followCursor
                            title={
                              <Typography
                                variant="subtitle2"
                                style={{ fontSize: "11px" }}
                              >
                                {tourData?.MainTitle}
                              </Typography>
                            }
                          >
                            <Typography
                              variant="subtitle2"
                              style={{ fontSize: "14px" }}
                            >
                              {tourData?.MainTitle.length > 28 ? (
                                <> {tourData?.MainTitle.slice(0, 30)}...</>
                              ) : (
                                <> {tourData?.MainTitle.slice(0, 28)}</>
                              )}
                            </Typography>
                          </Tooltip>
                        </Typography>
                        <Stack direction="row">
                          <Box>
                            <Typography
                              sx={{
                                fontSize: { xs: 12 },
                                fontWeight: 500,
                                color: "var(--text-color-b)",
                                textTransform: "capitalize",
                              }}
                            >
                              {tourData?.City}, {tourData?.Country}
                            </Typography>

                            <Typography
                              sx={{
                                fontSize: { xs: 10 },
                                fontWeight: 400,
                                color: "var(--text-color-g)",
                              }}
                            >
                              Start Date :{" "}
                              {tourData?.StartDate !== ""
                                ? format(
                                    new Date(tourData?.StartDate),
                                    "dd MMM yyyy "
                                  )
                                : "Start Date"}
                              <br />
                              End Date :
                              {tourData?.EndDate !== ""
                                ? format(
                                    new Date(tourData?.EndDate),
                                    "dd MMM yyyy "
                                  )
                                : "Start Date"}
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
                              color: "var(--primary-color)",
                              fontSize: 16,
                              fontWeight: 500,
                            }}
                          >
                            {commaNumber(tourData?.Price)} &#2547;
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
                  </div>
                ))}
              </Slider>
            ) : (
              <Slider {...settings}>
                {slideLoad?.map(function (slide) {
                  return (
                    <div key={slide}>
                      <Box
                        sx={{
                          bgcolor: "var(--white)",
                          borderRadius: "10px",
                          width: "280px",
                        }}
                      >
                        <Box className="tours-box">
                          <Box
                            style={{
                              width: "100%",
                              height: "200px",
                              margin: "0px 0px",
                              borderRadius: "5px",
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

                          <Box px={1.5} py={1.2}>
                            <Skeleton
                              sx={{ borderRadius: "5px" }}
                              variant="rectangular"
                              width={"100%"}
                              height={"20px"}
                            />
                            <Stack direction="column" mt={1} spacing={1}>
                              <Skeleton
                                sx={{ borderRadius: "5px" }}
                                variant="rectangular"
                                width={"80%"}
                                height={"10px"}
                              />
                              <Skeleton
                                sx={{ borderRadius: "5px" }}
                                variant="rectangular"
                                width={"80%"}
                                height={"10px"}
                              />
                            </Stack>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              mt={1}
                              spacing={2}
                            >
                              <Skeleton
                                sx={{ borderRadius: "5px" }}
                                variant="rectangular"
                                width={"100%"}
                                height={"20px"}
                              />
                              <Skeleton
                                sx={{ borderRadius: "5px" }}
                                variant="rectangular"
                                width={"100%"}
                                height={"20px"}
                              />
                            </Stack>
                          </Box>
                        </Box>
                      </Box>
                    </div>
                  );
                })}
              </Slider>
            )}
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default Tours;
