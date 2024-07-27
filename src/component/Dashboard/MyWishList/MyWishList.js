import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import ToysOutlinedIcon from "@mui/icons-material/ToysOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import { useLocation, useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Header from "../../Header/Header";
import Footer from "../../Home/Footer/Footer";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import secureLocalStorage from "react-secure-storage";
import commaNumber from "comma-number";

function MyWishList() {
  const userInfo = secureLocalStorage.getItem("UserData");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [wishListData, setWishListData] = useState([]);

  useEffect(() => {
    fetch(
      `https://flyfarladies-apiv2.appspot.com/user/${userInfo?.uuid}/mywishlist`
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(true);
        setWishListData(data);
      });
  }, [userInfo?.uuid]);

  return (
    <Box>
      <Container>
        <Header />
      </Container>

      <Box
        sx={{
          bgcolor: "#fff",
          py: "2vh",
          mb: 5,
          position: "sticky",
          top: "0px",
          zIndex: "999",
        }}
      >
        <Container>
          <Typography
            sx={{
              fontSize: "30px",
              color: "var(--primary-color)",
              fontWeight: 500,
            }}
          >
            My Wishlist
          </Typography>
        </Container>
      </Box>

      {loading ? (
        <Container>
          <Box sx={{ mb: 1.5, width: "100%", height: "100%" }}>
            {wishListData.map((data) => (
              <Grid
                container
                sx={{
                  display: {
                    xs: "flex",
                    sm: "flex",
                    md: "flex",
                  },
                  transition: "all .5s ease-in-out",
                  borderRadius: "5px",
                  overflow: "hidden",
                  bgcolor: "var(--white)",
                  columnSpacing: 2,
                  p: 1.5,
                  position: "relative",
                  mb: 1,
                }}
              >
                <Grid item xs={4} sm={6} md={2.5}>
                  <Box width={{ xs: "90%", sm: "160px" }}>
                    <img
                      src={`${data?.CoverImage}?t=${new Date().getDate()}`}
                      alt="PackageImage"
                      width="100%"
                      height={"150px"}
                    />
                  </Box>
                </Grid>
                <Grid item xs={8} sm={6} md={7}>
                  <Box>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={8} sm={8} md={8}>
                          <Tooltip followCursor title={data?.mainTitle || ""}>
                            <Typography
                              sx={{
                                color: "var(--secondary-color)",
                                fontSize: { xs: 14, sm: 20, md: 16 },
                                fontWeight: 500,
                                textTransform: "capitalize",
                              }}
                              noWrap
                            >
                              {data?.mainTitle}
                            </Typography>
                          </Tooltip>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          sm={4}
                          md={4}
                          display="flex"
                          justifyContent="flex-end"
                        >
                          <Typography
                            sx={{
                              color: "var(--gtext-color)",
                              fontSize: 16,
                              fontWeight: 500,
                            }}
                          >
                            {data?.Duration}
                          </Typography>{" "}
                        </Grid>
                      </Grid>
                    </Box>

                    <Tooltip followCursor title={data?.subtitle || ""}>
                      <Typography
                        sx={{
                          color: "var(--text-black)",
                          fontSize: { xs: 13, sm: 15, md: 13 },
                          fontWeight: 500,
                          textAlign: "justify",
                          marginTop: "2px",
                        }}
                        noWrap
                      >
                        {data?.subtitle}
                      </Typography>
                    </Tooltip>
                    <Typography
                      sx={{
                        mt: 1,
                        color: "var(--tab-text)",
                        fontSize: 12,
                        fontWeight: 500,
                        fontStyle: "italic",
                        display: "flex",
                      }}
                      noWrap
                    >
                      <span>
                        {" "}
                        <LocationOnIcon style={{ fontSize: "15px" }} />
                      </span>{" "}
                      {data?.Location || ""}
                    </Typography>

                    <Box>
                      <Tooltip followCursor title={data?.PackageOverview || ""}>
                        <Typography
                          sx={{
                            color: "#A6A5B1",
                            fontSize: { xs: 8, sm: 10, md: 11 },
                            textAlign: "justify",
                          }}
                        >
                          {data?.PackageOverview?.length >= 150 ? (
                            <>{data?.PackageOverview?.slice(0, 150)}. . .</>
                          ) : (
                            <>{data?.PackageOverview}</>
                          )}
                        </Typography>
                      </Tooltip>
                    </Box>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{ mt: 1.5 }}
                    >
                      <Typography
                        sx={{
                          color: "var(--gtext-color)",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      >
                        Start Date: {data?.StartDate || ""} <br /> End Date:{" "}
                        {data?.EndDate || ""}
                      </Typography>{" "}
                      <Typography
                        sx={{
                          color: "var(--black)",
                          fontSize: 22,
                          fontWeight: 500,
                          mt: 1,
                        }}
                      >
                        {data?.Flight === true && (
                          <FlightIcon
                            sx={{
                              bgcolor: "var(--days-color)",
                              color: "#fff",
                              borderRadius: "50%",
                              p: 0.5,
                            }}
                          />
                        )}
                        &nbsp;
                        {data?.Hotel === true && (
                          <HotelIcon
                            sx={{
                              bgcolor: "var(--days-color)",
                              color: "#fff",
                              borderRadius: "50%",
                              p: 0.5,
                            }}
                          />
                        )}
                        &nbsp;
                        {data?.Food === true && (
                          <LocalDiningOutlinedIcon
                            sx={{
                              bgcolor: "var(--days-color)",
                              color: "#fff",
                              borderRadius: "50%",
                              p: 0.5,
                            }}
                          />
                        )}
                        &nbsp;
                        {data?.Transport === true && (
                          <ToysOutlinedIcon
                            sx={{
                              bgcolor: "var(--days-color)",
                              color: "#fff",
                              borderRadius: "50%",
                              p: 0.5,
                            }}
                          />
                        )}
                      </Typography>{" "}
                    </Stack>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={2.5}>
                  <Box sx={{ height: "100%" }}>
                    <Stack
                      direction="column"
                      justifyContent="space-between"
                      height="100%"
                      ml={2}
                      borderLeft="3px solid #F1EAF0"
                    >
                      <Box textAlign="right">
                        <Typography
                          sx={{
                            color: "var(--secondary-color)",
                            fontSize: `${
                              data?.Price?.length > 6 ? "20px" : "22px"
                            }`,
                            fontWeight: 500,
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ fontSize: "16px", fontWeight: "400" }}>
                            {data?.Discount === 0 ? (
                              <Typography
                                sx={{
                                  mt: 0,
                                  color: "var(--primary-color)",
                                  fontSize: 22,
                                  fontWeight: 400,
                                }}
                              >
                                {commaNumber(data?.Price) || "0"}&nbsp;&#2547;
                              </Typography>
                            ) : (
                              <del>
                                {commaNumber(data?.Price) || "0"}&nbsp;&#2547;
                              </del>
                            )}
                          </span>
                        </Typography>

                        {data?.Discount !== 0 ? (
                          <Typography
                            sx={{
                              mt: 0,
                              color: "var(--primary-color)",
                              fontSize: 22,
                              fontWeight: 400,
                            }}
                          >
                            {commaNumber(
                              data?.Price - (data?.Discount / 100) * data?.Price
                            ).toFixed() || "0"}
                            &nbsp;&#2547;
                          </Typography>
                        ) : (
                          ""
                        )}
                      </Box>
                      <Stack direction="row" justifyContent="flex-end" mb={1}>
                        <Typography
                          sx={{
                            color: "var(--white)",
                            bgcolor: "var(--primary-color)",
                            fontSize: 13,
                            fontWeight: 500,
                            textAlign: "right",
                            py: 0.5,

                            px: 3,
                            width: "fit-content",
                            cursor: "pointer",
                            textTransform: "uppercase",
                            borderRadius: "2px",
                          }}
                          // onClick={() =>
                          //   navigate("/dashboard/tourpackagedetails", {
                          //     state: {
                          //       tourData,
                          //       discountPrice: discountPackagePrice,
                          //     },
                          //   })
                          // }
                          onClick={() => alert("Coming soon")}
                        >
                          View Tour
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Box>
        </Container>
      ) : (
        ""
      )}

      <Box mt={25}>
        <Footer />
      </Box>
    </Box>
  );
}

export default MyWishList;
