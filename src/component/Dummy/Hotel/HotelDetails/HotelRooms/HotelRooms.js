import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import room1 from "../../../../../image/hotelImg/room1.png";
import room2 from "../../../../../image/hotelImg/room2.png";
import room3 from "../../../../../image/hotelImg/room3.png";

const HotelRooms = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box>
        <Grid container rowSpacing={2} columnSpacing={4}>
          <Grid item sm={6} sx={12} md={6}>
            <Box mb={2.5}>
              <Grid
                container
                className="flight-filter1"
                sx={{
                  display: {
                    xs: "none",
                    sm: "flex",
                    md: "flex",
                    transition: "all .5s ease-in-out",
                    boxShadow:
                      "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                  },
                }}
              >
                <Grid md={8}>
                  <Box style={{ padding: "10px 0px 10px 25px" }}>
                    <Typography
                      style={{
                        fontSize: "20px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                        marginBottom: "10px",
                      }}
                    >
                      DOUBLE PREMIER KING BED
                    </Typography>

                    <Grid
                      container
                      sx={{ display: "flex", justifyContent: "space-between" }}
                      spacing={1}
                    >
                      <Grid sm={6} md={3} item>
                        <Box className="hotelRoomsDetailsBtn1">
                          <button>Internet</button>
                        </Box>
                      </Grid>

                      <Grid item sm={6} md={3}>
                        <Box className="hotelRoomsDetailsBtn1">
                          <button> Air Cooler </button>
                        </Box>
                      </Grid>

                      <Grid item sm={6} md={3}>
                        <Box className="hotelRoomsDetailsBtn1">
                          <button>Toiletries</button>
                        </Box>
                      </Grid>

                      <Grid item sm={6} md={3}>
                        <Box className="hotelRoomsDetailsBtn1">
                          <button>Minibar</button>
                        </Box>
                      </Grid>
                    </Grid>

                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginTop: "10px",
                      }}
                    >
                      <Box>
                        <img width="100%" src={room1} alt="roomImg" />
                      </Box>
                      <Box>
                        <Box>
                          <img width="100%" src={room2} alt="roomImg" />
                        </Box>
                        <Box>
                          <img width="100%" src={room3} alt="roomImg" />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid
                  md={4}
                  sm={12}
                  sx={{
                    paddingLeft: {
                      xs: "none",
                      sm: "5px",
                      md: "20px",
                    },
                  }}
                >
                  <Box
                    className="updatebooknowbtn"
                    style={{
                      paddingLeft: "12px",
                      background: "#3687B7",
                    }}
                  >
                    <Box>
                      <Typography
                        style={{
                          fontSize: "16px",
                          fontFamily: "Poppins",
                          fontWeight: "400",
                          color: "#fff",
                        }}
                      >
                        Per Night
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "22px",
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          color: "#fff",
                        }}
                      >
                        BDT 75,000
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "16px",
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          color: "#fff",
                        }}
                      >
                        <del>BDT 85,000</del>
                      </Typography>
                      <br></br>

                      <Button
                        onClick={() => navigate("/passengerdetailshotel")}
                        style={{
                          background: "#fff",
                          fontSize: "12px",
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          color: "#3687B7",
                          textTransform: "capitalize",
                          padding: "7px 18px",
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item sm={6} sx={12} md={6}>
            <Box mb={2.5}>
              <Grid
                container
                className="flight-filter1"
                sx={{
                  display: {
                    xs: "none",
                    sm: "flex",
                    md: "flex",
                    transition: "all .5s ease-in-out",
                    boxShadow:
                      "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                  },
                }}
              >
                <Grid md={8}>
                  <Box style={{ padding: "10px 0px 10px 25px" }}>
                    <Typography
                      style={{
                        fontSize: "20px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                        marginBottom: "10px",
                      }}
                    >
                      DOUBLE PREMIER KING BED
                    </Typography>

                    <Grid
                      container
                      sx={{ display: "flex", justifyContent: "space-between" }}
                      spacing={1}
                    >
                      <Grid sm={6} md={3} item>
                        <Box className="hotelRoomsDetailsBtn1">
                          <button>Internet</button>
                        </Box>
                      </Grid>
                      <Grid item sm={6} md={3}>
                        <Box className="hotelRoomsDetailsBtn1">
                          <button> Air Cooler </button>
                        </Box>
                      </Grid>
                      <Grid item sm={6} md={3}>
                        <Box className="hotelRoomsDetailsBtn1">
                          <button>Toiletries</button>
                        </Box>
                      </Grid>
                      <Grid item sm={6} md={3}>
                        <Box className="hotelRoomsDetailsBtn1">
                          <button>Minibar</button>
                        </Box>
                      </Grid>
                    </Grid>

                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginTop: "10px",
                      }}
                    >
                      <Box>
                        <img width="100%" src={room1} alt="roomImg" />
                      </Box>
                      <Box>
                        <Box>
                          <img width="100%" src={room2} alt="roomImg" />
                        </Box>
                        <Box>
                          <img width="100%" src={room3} alt="roomImg" />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid
                  md={4}
                  sm={12}
                  sx={{
                    paddingLeft: {
                      xs: "none",
                      sm: "5px",
                      md: "20px",
                    },
                  }}
                >
                  <Box
                    className="updatebooknowbtn"
                    style={{
                      paddingLeft: "12px",
                      background: "#3687B7",
                    }}
                  >
                    <Box>
                      <Typography
                        style={{
                          fontSize: "22px",
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          color: "#fff",
                        }}
                      >
                        BDT 75,000
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "16px",
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          color: "#fff",
                        }}
                      >
                        <del>BDT 85,000</del>
                      </Typography>
                      <br></br>

                      <Button
                        onClick={() => navigate("/passengerdetailshotel")}
                        style={{
                          background: "#fff",
                          fontSize: "12px",
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          color: "#3687B7",
                          textTransform: "capitalize",
                          padding: "7px 18px",
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item sm={6} sx={12} md={6}>
            <Box mb={2.5}>
              <Grid
                container
                className="flight-filter1"
                sx={{
                  display: {
                    xs: "none",
                    sm: "flex",
                    md: "flex",
                    transition: "all .5s ease-in-out",
                    boxShadow:
                      "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                  },
                }}
              >
                <Grid md={8}>
                  <Box style={{ padding: "10px 0px 10px 25px" }}>
                    <Typography
                      style={{
                        fontSize: "20px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                        marginBottom: "10px",
                      }}
                    >
                      DOUBLE PREMIER KING BED
                    </Typography>

                    <Grid
                      container
                      sx={{ display: "flex", justifyContent: "space-between" }}
                      spacing={1}
                    >
                      <Grid sm={6} md={3} item>
                        <Box className="hotelRoomsDetailsBtn1">
                          <button>Internet</button>
                        </Box>
                      </Grid>
                      <Grid item sm={6} md={3}>
                        <Box className="hotelRoomsDetailsBtn1">
                          <button> Air Cooler </button>
                        </Box>
                      </Grid>
                      <Grid item sm={6} md={3}>
                        <Box className="hotelRoomsDetailsBtn1">
                          <button>Toiletries</button>
                        </Box>
                      </Grid>
                      <Grid item sm={6} md={3}>
                        <Box className="hotelRoomsDetailsBtn1">
                          <button>Minibar</button>
                        </Box>
                      </Grid>
                    </Grid>

                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginTop: "10px",
                      }}
                    >
                      <Box>
                        <img width="100%" src={room1} alt="roomImg" />
                      </Box>
                      <Box>
                        <Box>
                          <img width="100%" src={room2} alt="roomImg" />
                        </Box>
                        <Box>
                          <img width="100%" src={room3} alt="roomImg" />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid
                  md={4}
                  sm={12}
                  sx={{
                    paddingLeft: {
                      xs: "none",
                      sm: "5px",
                      md: "20px",
                    },
                  }}
                >
                  <Box
                    className="updatebooknowbtn"
                    style={{
                      paddingLeft: "12px",
                      background: "#3687B7",
                    }}
                  >
                    <Box>
                      <Typography
                        style={{
                          fontSize: "22px",
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          color: "#fff",
                        }}
                      >
                        BDT 75,000
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "16px",
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          color: "#fff",
                        }}
                      >
                        <del>BDT 85,000</del>
                      </Typography>
                      <br></br>

                      <Button
                        onClick={() => navigate("/passengerdetailshotel")}
                        style={{
                          background: "#fff",
                          fontSize: "12px",
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          color: "#3687B7",
                          textTransform: "capitalize",
                          padding: "7px 18px",
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HotelRooms;
