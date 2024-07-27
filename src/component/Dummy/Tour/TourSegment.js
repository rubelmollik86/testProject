import {
  Box,
  Container,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import ToysOutlinedIcon from "@mui/icons-material/ToysOutlined";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import blog from "../../../image/blog/blog1.png";

const TourSegment = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Box>
      <Container>
        <Box mt={5}>
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
              {/* {Discount !== "" ? (
                <Box className="discount">
                  <Box className="discountText">
                    <span style={{ color: "#fff" }}>{Discount}%</span>
                  </Box>
                </Box>
              ) : (
                ""
              )} */}

              <Grid item xs={4} sm={6} md={2.5}>
                <Box width={{ xs: "90%", sm: "160px" }}>
                  <img
                    src={blog}
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
                      What is Lorem Ipsum?
                    </Typography>{" "}
                    <Typography
                      sx={{
                        color: "var(--gtext-color)",
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    >
                      10 Days
                    </Typography>{" "}
                  </Stack>
                  <Typography
                    sx={{
                      color: "var(--text-black)",
                      fontSize: { xs: 13, sm: 15, md: 14 },
                      fontWeight: 500,
                    }}
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Typography>{" "}
                  <Tooltip title={"Lorem Ipsum is simply dummy"}>
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
                      Start Date: 10/12/2023 <br /> End Date:10/12/2023
                    </Typography>{" "}
                    <Typography
                      sx={{
                        color: "var(--black)",
                        fontSize: 22,
                        fontWeight: 500,
                      }}
                    >
                      <FlightIcon
                        sx={{
                          bgcolor: "var(--days-color)",
                          color: "#fff",
                          borderRadius: "50%",
                          p: 0.5,
                        }}
                      />
                      &nbsp;
                      <HotelIcon
                        sx={{
                          bgcolor: "var(--days-color)",
                          color: "#fff",
                          borderRadius: "50%",
                          p: 0.5,
                        }}
                      />
                      &nbsp;
                      <LocalDiningOutlinedIcon
                        sx={{
                          bgcolor: "var(--days-color)",
                          color: "#fff",
                          borderRadius: "50%",
                          p: 0.5,
                        }}
                      />
                      &nbsp;
                      <ToysOutlinedIcon
                        sx={{
                          bgcolor: "var(--days-color)",
                          color: "#fff",
                          borderRadius: "50%",
                          p: 0.5,
                        }}
                      />
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
                          //   fontSize: `${Price.length > 6 ? "20px" : "22px"}`,
                          fontWeight: 500,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Checkbox
                          icon={<FavoriteBorder />}
                          checkedIcon={
                            <Favorite
                              sx={{ color: "var(--secondary-color)" }}
                            />
                          }
                          sx={{ color: "var(--secondary-color)", p: 0, pl: 1 }}
                        />
                        <span>2000 &nbsp;&#2547;</span>
                      </Typography>
                      <Typography
                        sx={{
                          mt: -1,
                          color: "var(--primary-color)",
                          fontSize: 18,
                          fontWeight: 400,
                        }}
                      >
                        <s> 3000&nbsp;&#2547;</s>
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
                        // onClick={() =>
                        //   navigate("/dashboard/tourpackagedetails", {
                        //     state: {
                        //       tourData,
                        //     },
                        //   })
                        // }
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
      </Container>
    </Box>
  );
};

export default TourSegment;
