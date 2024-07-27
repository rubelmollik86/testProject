import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import founder from "../../Assets/Ladies/founder.png";
import comma from "../../Assets/Ladies/comma.png";
import travelnews from "../../Assets/Ladies/travelnews.png";
import ourblogs from "../../Assets/Ladies/ourblogs.png";
import format from "date-fns/format";
import { NavLink, useNavigate } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

const TravelNews = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch(`https://flyfarladies-apiv2.appspot.com/blog/myblogs`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.statusCode !== 404) {
          const blog = data?.blogs?.filter((data) => {
            return data?.Type === "Travel BLog";
          });
          const news = data?.blogs?.filter((data) => {
            return data?.Type === "Travel News";
          });
          setBlog(blog);
          setNews(news);
        }
      });
  }, []);

  const newsDataSend = () => {
    navigate("/newspage", {
      state: {
        data: news,
      },
    });
  };

  const blogDataSend = () => {
    navigate("/blogpage", {
      state: {
        data: blog,
      },
    });
  };

  return (
    <Box mt={8}>
      <Grid container columnSpacing={2}>
        {news?.length !== 0 ? (
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                color: "var(--text-color-b)",
                fontSize: "26px",
                fontWeight: 500,
              }}
              pb={2}
            >
              Travel News{" "}
              <span
                style={{
                  color: "var(--primary-color)",
                  fontSize: 14,
                  cursor: "pointer",
                }}
                onClick={() => newsDataSend()}
              >
                See More
              </span>
            </Typography>

            <Box>
              {news.length !== 0 ? (
                <>
                  {news?.slice(0, 2).map((data, index) => (
                    <Stack
                      key={index}
                      direction={"row"}
                      spacing={1}
                      sx={{
                        bgcolor: "var(--white)",
                        borderRadius: "5px",
                        cursor: "pointer",
                        height: { xs: "130px", sm: "140px", md: "160px" },
                        mb: 2,
                      }}
                      onClick={() =>
                        navigate("/newsdetails", {
                          state: {
                            data,
                          },
                        })
                      }
                    >
                      <Box
                        className="image-auto-resize"
                        sx={{
                          width: "220px",
                        }}
                      >
                        <img
                          src={data?.blogimages[0]}
                          alt="travel"
                          style={{
                            borderRadius: "5px",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </Box>
                      <Box p={2}>
                        <Stack
                          direction="column"
                          justifyContent={"space-between"}
                          height="100%"
                        >
                          <Box>
                            <Typography
                              sx={{
                                color: "var(--primary-color)",
                                fontSize: { xs: 12, sm: 15 },
                                mb: 1,
                              }}
                            >
                              {data?.Title}
                            </Typography>

                            <Typography
                              sx={{
                                color: "var(--text-color-g)",
                                fontSize: { xs: 10, sm: 12 },
                                mb: 1,
                              }}
                            >
                              {ReactHtmlParser(data?.Description?.slice(0, 80))}
                            </Typography>
                          </Box>

                          <Typography
                            sx={{
                              color: "#222222",
                              fontSize: 13,
                              fontWeight: 500,
                            }}
                          >
                            Date:{" "}
                            {format(new Date(data?.Date), "dd MMM yyyy hh:mm")}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                  ))}
                </>
              ) : (
                <>
                  <Box>
                    {[...new Array(2)].map((data) => (
                      <Box
                        sx={{
                          background: "#fff",
                          marginBottom: "10px",
                          paddingBottom: "10px",
                        }}
                      >
                        <Grid container spacing={0} columnSpacing={2}>
                          <Grid item xs={12} sm={6} md={3.5}>
                            <Skeleton
                              sx={{ borderRadius: "5px" }}
                              variant="rectangular"
                              width={"100%"}
                              height={"150px"}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={8.5}>
                            <Skeleton
                              sx={{ marginTop: "15px", borderRadius: "3px" }}
                              variant="rectangular"
                              width={"95%"}
                              height={"15px"}
                            />
                            <Skeleton
                              sx={{ marginTop: "15px", borderRadius: "3px" }}
                              variant="rectangular"
                              width={"95%"}
                              height={"50px"}
                            />
                            <Skeleton
                              sx={{ marginTop: "15px", borderRadius: "3px" }}
                              variant="rectangular"
                              width={"20%"}
                              height={"15px"}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    ))}
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        ) : (
          ""
        )}

        {blog?.length !== 0 ? (
          <Grid item xs={12} md={6} mt={{ xs: 10, sm: 0 }}>
            <Typography
              sx={{
                color: "var(--text-color-b)",
                fontSize: "26px",
                fontWeight: 500,
              }}
              pb={2}
            >
              Our Blogs{" "}
              <span
                style={{
                  color: "var(--primary-color)",
                  fontSize: 14,
                  cursor: "pointer",
                }}
                onClick={() => blogDataSend()}
              >
                See More
              </span>
            </Typography>

            <Grid container spacing={2}>
              {blog?.length !== 0 ? (
                <>
                  {blog?.slice(0, 2).map((data, index) => (
                    <Grid
                      key={index}
                      item
                      xs={12}
                      sm={6}
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        navigate("/blogdetails", {
                          state: {
                            data,
                          },
                        })
                      }
                    >
                      <Box
                        sx={{
                          borderRadius: "5px",
                          background: "var(--white)",
                          overflow: "hidden",
                        }}
                      >
                        <Box className="image-auto-resize" position="relative">
                          <img
                            src={data?.blogimages[0]}
                            alt="ourblogs"
                            style={{
                              width: "100%",
                              height: "270px",
                            }}
                          />
                          <Typography
                            sx={{
                              color: "var(--white)",
                              bgcolor: "var(--tab-text)",
                              fontSize: 12,
                              position: "absolute",
                              top: "10%",
                              px: 2,
                              py: 0.7,
                            }}
                          >
                            {data?.Blogfor}
                          </Typography>
                          <Typography
                            sx={{
                              color: "var(--white)",
                              fontSize: 12,
                              position: "absolute",
                              bottom: "10%",
                              px: 2,
                            }}
                          >
                            {data?.Title}
                          </Typography>
                        </Box>

                        <Stack direction={"row"} spacing={1} px={1.5} py={1}>
                          <Typography
                            sx={{
                              color: "var(--primary-color)",
                              fontSize: 14,
                              fontWeight: 500,
                            }}
                          >
                            {data?.WrittenBy} <br />
                            <span
                              style={{
                                color: "var(--text-color-b)",
                                fontSize: "12px",
                              }}
                            >
                              Date:{" "}
                              {format(
                                new Date(data?.Date),
                                "dd MMM yyyy hh:mm"
                              )}
                            </span>
                          </Typography>
                        </Stack>
                      </Box>
                    </Grid>
                  ))}
                </>
              ) : (
                <>
                  {[...new Array(2)].map((data) => (
                    <Grid item xs={12} sm={6} md={6}>
                      <Box
                        sx={{
                          bgcolor: "var(--white)",

                          borderRadius: "5px",
                        }}
                      >
                        <Box className="image-auto-resize" position="relative">
                          <Skeleton
                            sx={{ borderRadius: "5px" }}
                            variant="rectangular"
                            width={"100%"}
                            height={"260px"}
                          />
                        </Box>

                        <Stack
                          alignItems={"center"}
                          direction={"row"}
                          spacing={1}
                          px={1.5}
                          py={1}
                        >
                          <Skeleton
                            sx={{ borderRadius: "50%" }}
                            variant="rectangular"
                            width={"65px"}
                            height={"50px"}
                          />

                          <Skeleton
                            sx={{ borderRadius: "5px" }}
                            variant="rectangular"
                            width={"100%"}
                            height={"15px"}
                          ></Skeleton>
                        </Stack>
                      </Box>
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </Box>
  );
};

export default TravelNews;
