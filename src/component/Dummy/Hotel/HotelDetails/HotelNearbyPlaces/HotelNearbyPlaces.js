import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const HotelNearbyPlaces = () => {
  return (
    <Box>
      <Box>
        <Typography
          style={{
            color: "#235F83",
            fontSize: "20px",
            fontWeight: "500",
          }}
        >
          Nearby Attraction
        </Typography>

        <Box style={{ marginTop: "15px" }}>
          <Typography
            style={{
              color: "#222",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              lineHeight: "30px",
            }}
          >
            <LocationOnIcon style={{ fontSize: "22px", color: "#235F83" }} />
            Raffies City (0.4 km)
          </Typography>

          <Typography
            style={{
              color: "#222",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              lineHeight: "30px",
            }}
          >
            <LocationOnIcon style={{ fontSize: "22px", color: "#235F83" }} />
            Bras Basah Complex (0.3 km)
          </Typography>
          <Typography
            style={{
              color: "#222",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              lineHeight: "30px",
            }}
          >
            <LocationOnIcon style={{ fontSize: "22px", color: "#235F83" }} />
            National Gallery (0.4 km)
          </Typography>
          <Typography
            style={{
              color: "#222",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              lineHeight: "30px",
            }}
          >
            <LocationOnIcon style={{ fontSize: "22px", color: "#235F83" }} />
            Fort Canning Park (0.8 km)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HotelNearbyPlaces;
