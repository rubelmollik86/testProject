import React from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
// import Loader from "../../image/loader/Preloader-2.gif";
// import Loader from "../../image/loader/Preloader-3.gif";
// import DotAnimation from "../Shared/DotAnimation/DotAnimation";
import "./Preloader.css";

const Preloader = ({
  fromSendData,
  fromSearchDate,
  className,
  toSendData,
  adultCount,
  childCount,
  infant,
  tripType,
  isPrevClicked,
  isNextClicked,
  departureDate,
}) => {
  return (
    <Box className="preloader-wrapper">
      <Box className="wrapper">
        <div class="body">
          <span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div class="base">
            <span></span>
            <div class="face"></div>
          </div>
        </div>
        <div class="longfazers">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Box className="search-details">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "var(--primary-color)",
            }}
          >
            <Typography variant="h4">{fromSendData}</Typography>
            <SwapHorizIcon fontSize="large" />
            <Typography variant="h4">{toSendData}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              noWrap: "wrap",
              fontSize: "max(20px)",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                noWrap: "wrap",
                fontSize: "max(20px)",
              }}
            >
              <Typography variant="h6" sx={{ color: "#222222" }}>
                {format(
                  new Date(
                    isNextClicked || isPrevClicked
                      ? fromSearchDate
                      : departureDate
                  ),
                  "dd MMM yy"
                )}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#222222", marginInline: "10px" }}
              >
                ||
              </Typography>
              <Typography variant="h6" sx={{ color: "#222222" }}>
                {className}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "var(--primary-color)",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#222222", textAlign: "center" }}
              >
                {adultCount > 0 && `Adult(${adultCount})`}
                {childCount > 0 && `Children(${childCount})`}
                {infant > 0 && `Infant(${infant})`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* <Box>
        <DotAnimation text="Loading" />
      </Box> */}
    </Box>
  );
};

export default Preloader;
