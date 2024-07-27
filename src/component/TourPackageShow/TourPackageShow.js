import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import ToysOutlinedIcon from "@mui/icons-material/ToysOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";
import commaNumber from "comma-number";

const TourPackageShow = ({ tourData }) => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const info = secureLocalStorage.getItem("UserData");

  const {
    Id,
    MainTitle,
    SubTitle,
    Price,
    Discount,
    Location,
    StartDate,
    EndDate,
    TripType,
    Code,
    TotalDuration,
    PackageOverview,
    Availability,
    Showpackage,
    Flight,
    Food,
    Transport,
    Hotel,
    coverimageurl,
    mainimage,
    albumImages,
    vistitedImages,
    exclusions,
    PackageInclusions,
    BookingPolicys,
    highlights,
    refundpolicys,
    tourpackageplans,
  } = tourData;

  const packageprice = parseInt(Price);

  const packageDiscount = Discount;
  const discountPackagePrice =
    packageprice - (packageDiscount / 100) * packageprice;

  const wishlisthandle = async (packageId) => {
    if (info?.uuid !== undefined) {
      let body = JSON.stringify({
        Id: packageId,
        uuid: info?.uuid,
      });
      const url = `https://flyfarladies-apiv2.appspot.com/user/addwishlist`;
      await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.status === "success") {
            Swal.fire({
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
              title: data?.message,
              confirmButtonColor: "var(--primary-color)",
              confirmButtonText: "Ok",
            }).then(function () {
              navigate(0);
            });
          } else {
            Swal.fire({
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
              text: "Invalid Information",
              title: data?.message,
              confirmButtonColor: "var(--primary-color)",
              confirmButtonText: "Ok",
            }).then(function () {
              navigate(0);
            });
          }
        });
    } else {
      Swal.fire({
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        text: "You can't add wishlist without login",
        title: "Login Please",
        confirmButtonColor: "var(--primary-color)",
        confirmButtonText: "Ok",
      }).then(function () {
        navigate(0);
      });
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 1.5, width: "100%", height: "100%" }}>
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
          }}
        >
          {Discount !== 0 ? (
            <Box className="discount">
              <Box className="discountText">
                <span style={{ color: "#fff" }}>{Discount}%</span>
              </Box>
            </Box>
          ) : (
            ""
          )}
          <Grid item xs={4} sm={6} md={2.5}>
            <Box width={{ xs: "90%", sm: "160px" }}>
              <img
                src={`${coverimageurl}?t=${new Date().getDate()}`}
                alt="PackageImage"
                width="100%"
                height={"150px"}
              />
            </Box>
          </Grid>
          <Grid item xs={8} sm={6} md={7}>
            <Box>
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Grid container spacing={2}>
                  <Grid item xs={8} sm={8} md={8}>
                    <Tooltip followCursor title={MainTitle || ""}>
                      <Typography
                        sx={{
                          color: "var(--secondary-color)",
                          fontSize: { xs: 14, sm: 20, md: 16 },
                          fontWeight: 500,
                          textTransform: "capitalize",
                        }}
                        noWrap
                      >
                        {MainTitle}
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
                      {TotalDuration}
                    </Typography>{" "}
                  </Grid>
                </Grid>
              </Box>

              <Tooltip followCursor title={SubTitle || ""}>
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
                  {SubTitle}
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
                {Location || ""}
              </Typography>

              <Box>
                <Tooltip followCursor title={PackageOverview || ""}>
                  <Typography
                    sx={{
                      color: "#A6A5B1",
                      fontSize: { xs: 8, sm: 10, md: 11 },
                      textAlign: "justify",
                    }}
                  >
                    {PackageOverview?.length >= 150 ? (
                      <>{PackageOverview?.slice(0, 150)}. . .</>
                    ) : (
                      <>{PackageOverview}</>
                    )}

                    {/* {PackageOverview?.slice(0, 148)}... */}
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
                  Start Date: {StartDate || ""} <br /> End Date: {EndDate || ""}
                </Typography>{" "}
                <Typography
                  sx={{
                    color: "var(--black)",
                    fontSize: 22,
                    fontWeight: 500,
                    mt: 1,
                  }}
                >
                  {Flight === true && (
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
                  {Hotel === true && (
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
                  {Food === true && (
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
                  {Transport === true && (
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
                      fontSize: `${Price.length > 6 ? "20px" : "22px"}`,
                      fontWeight: 500,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={
                        <Favorite sx={{ color: "var(--secondary-color)" }} />
                      }
                      sx={{ color: "var(--secondary-color)", p: 0, pl: 1 }}
                      onClick={() => wishlisthandle(Id)}
                    />

                    <span style={{ fontSize: "16px", fontWeight: "400" }}>
                      {Discount === null ? (
                        <Typography
                          sx={{
                            mt: 0,
                            color: "var(--primary-color)",
                            fontSize: 22,
                            fontWeight: 400,
                          }}
                        >
                          {commaNumber(Price) || "0"}&nbsp;&#2547;
                        </Typography>
                      ) : (
                        <del>{commaNumber(Price) || "0"}&nbsp;&#2547;</del>
                      )}
                    </span>
                  </Typography>

                  {Discount !== null ? (
                    <Typography
                      sx={{
                        mt: 0,
                        color: "var(--primary-color)",
                        fontSize: 22,
                        fontWeight: 400,
                      }}
                    >
                      {commaNumber(discountPackagePrice.toFixed()) || "0"}
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
                    onClick={() =>
                      navigate("/dashboard/tourpackagedetails", {
                        state: {
                          tourData,
                          discountPrice: discountPackagePrice,
                        },
                      })
                    }
                  >
                    View Tour
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TourPackageShow;
