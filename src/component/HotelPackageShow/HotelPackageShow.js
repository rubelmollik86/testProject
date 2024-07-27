import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import ToysOutlinedIcon from "@mui/icons-material/ToysOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import Header from "../Header/Header";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const TourPackageShow = ({ tourData }) => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  const {
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
          {Discount !== "" ? (
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
                src={coverimageurl || ""}
                alt="PackageImage"
                width="100%"
                height={"152px"}
              />
            </Box>
          </Grid>
          <Grid item xs={8} sm={6} md={7}>
            <Box>
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  sx={{
                    color: "var(--secondary-color)",
                    fontSize: { xs: 14, sm: 20, md: 20 },
                    fontWeight: 500,
                    textTransform: "capitalize",
                  }}
                >
                  {MainTitle || ""}
                </Typography>{" "}
                <Typography
                  sx={{
                    color: "var(--gtext-color)",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  {TotalDuration || ""}
                </Typography>{" "}
              </Stack>
              <Typography
                sx={{
                  color: "var(--text-black)",
                  fontSize: { xs: 13, sm: 15, md: 14 },
                  fontWeight: 500,
                }}
              >
                {SubTitle}
              </Typography>{" "}
              <Tooltip title={PackageOverview || ""}>
                <Typography
                  sx={{
                    my: 1.5,
                    color: "var(--tab-text)",
                    fontSize: 13,
                    fontWeight: 500,
                    fontStyle: "italic",
                    display: "flex",
                  }}
                  noWrap
                >
                  <span>
                    {" "}
                    <LocationOnIcon style={{ fontSize: "20px" }} />
                  </span>{" "}
                  {Location || ""}
                </Typography>
              </Tooltip>
              <Stack direction="row" justifyContent="space-between">
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
                    />
                    <span> {discountPackagePrice || "0"}&nbsp;&#2547;</span>
                  </Typography>
                  <Typography
                    sx={{
                      mt: -1,
                      color: "var(--primary-color)",
                      fontSize: 18,
                      fontWeight: 400,
                    }}
                  >
                    <s>{Price || "0"}&nbsp;&#2547;</s>
                  </Typography>
                </Box>
                <Stack direction="row" justifyContent="flex-end" mb={2}>
                  <Typography
                    sx={{
                      color: "var(--white)",
                      bgcolor: "var(--primary-color)",
                      fontSize: 16,
                      fontWeight: 500,
                      textAlign: "right",
                      py: 0.3,
                      px: 3,
                      width: "fit-content",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      navigate("/dashboard/tourpackagedetails", {
                        state: {
                          tourData,
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
