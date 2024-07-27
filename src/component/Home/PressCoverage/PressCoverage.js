import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Skeleton, Stack, Typography } from "@mui/material";
import news from "../../../Assets/Ladies/news.png";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import Slider from "react-slick";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";

const PressCoverage = () => {
  const [slideLoad, setSlideLoad] = useState([1, 2, 3, 4]);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`https://flyfarladies-apiv2.appspot.com/press/allpressoverages`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(true);
        setNewsData(data);
      });
  }, []);

  let len = newsData?.length > 4 ? 4 : newsData?.length;

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
          slidesToShow: len,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: len,
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
    <Box pt={5} pb={10}>
      <Box
        // sx={{
        //   display: { xs: "block", sm: "block", md: "flex" },
        //   justifyContent: { xs: "block", sm: "block", md: "center" },
        // }}
        sx={{
          display: { md: `${len > 3 ? "block" : "flex"}` },
          justifyContent: { md: `${len > 3 ? "start" : "center"}` },
        }}
      >
        {loading ? (
          newsData?.length === 0 ? null : (
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
              <Typography
                sx={{
                  fontSize: { xs: 15, sm: 20, md: 26 },
                  fontWeight: 500,
                  color: "var(--text-color-b)",
                  textAlign: "left",
                  my: { xs: 2, sm: 3 },
                }}
              >
                Press Coverage
              </Typography>
              <Slider {...settings}>
                {newsData?.map((data, index, arr) => (
                  <div style={{ margin: "auto" }}>
                    <Box
                      sx={{
                        bgcolor: "var(--white)",
                        borderRadius: "10px",
                        p: 2,
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        width: {
                          xs: "100%",
                          sm: `${arr.length < 4 ? "300px" : null}`,
                          md: `${arr.length < 4 ? "300px" : null}`,
                        },
                      }}
                    >
                      <Box>
                        <NavLink
                          to={data.links}
                          style={{ textDecoration: "none" }}
                          target="_blank"
                        >
                          <Box sx={{ width: "200px", height: "50px" }}>
                            <img
                              src={data?.Image}
                              alt="press-img"
                              style={{
                                width: "100%",
                                // height: "100%",
                                // objectFit: "cover",
                              }}
                            />
                          </Box>
                          <Typography
                            sx={{
                              color: "var(--text-color-g)",
                              fontSize: 12,
                              fontWeight: 500,
                              mt: 2,
                              height: "60px",
                            }}
                          >
                            {data?.Description.replace(
                              /(<([^>]+)>)/gi,
                              ""
                            ).slice(0, 100)}
                            ...
                          </Typography>
                          <Typography
                            sx={{
                              color: "var(--text-color-b)",
                              fontSize: 12,
                              fontWeight: 500,
                            }}
                          >
                            {format(new Date(data?.Date), "dd MMM yyyy")}
                          </Typography>
                        </NavLink>
                      </Box>
                    </Box>
                  </div>
                ))}
              </Slider>
            </Box>
          )
        ) : (
          <Grid container spacing={2}>
            {[...new Array(4)].map((slide, index) => {
              return (
                <Grid item xs={3}>
                  <Box sx={{ bgcolor: "#fff", p: 2, borderRadius: "5px" }}>
                    <Box
                      style={{
                        height: "100px",
                        marginBottom: "10px",
                      }}
                    >
                      <Skeleton
                        sx={{
                          borderRadius: "5px",
                          marginBottom: "10px",
                        }}
                        variant="rectangular"
                        width={"100%"}
                        height={"70px"}
                      />
                    </Box>

                    <Box>
                      <Skeleton
                        sx={{
                          borderRadius: "5px",
                          marginBottom: "10px",
                        }}
                        variant="rectangular"
                        width={"100%"}
                        height={"70px"}
                      />
                    </Box>

                    <Box>
                      <Skeleton
                        sx={{
                          borderRadius: "5px",
                          marginBottom: "5px",
                        }}
                        variant="rectangular"
                        width={"70%"}
                        height={"8px"}
                      />
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default PressCoverage;
