import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  Container,
  Collapse,
  Stack,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./../../../Header/Header";
import commaNumber from "comma-number";
import secureLocalStorage from "react-secure-storage";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
// import AirLineName from "./AirLineName";
// import CommissionInvoice from "./CommissionInvoice";
import { fontWeight } from "@mui/system";
import FarePolicy from "../../FlightSearch/FarePolicy";
import FlightUserInformationOneway from "../FlightUserInformationOneway/FlightUserInformationOneway";
import FlightPriceBreakdownOneway from "../FlightPriceBreakdownOneway/FlightPriceBreakdownOneway";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Loader from "../../../../Assets/Ladies/loader/Render.gif";
import NotFound from "../../../../Assets/Ladies/undraw/undraw_not_found_re_bh2e.svg";
import FlightInformationOneWayData from "../FlightInformationOneWayData/FlightInformationOneWayData";

const FlightInformationOneway = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const flightData = location.state.flightData;

  const { adultCount, childCount, infant } = location.state;
  const agentFare = Math.round(
    parseInt(
      flightData.system !== "Galileo"
        ? flightData?.subagentprice || flightData.price
        : flightData.subagentprice
    )
  );

  const clientFare = Math.round(flightData?.clientPrice);
  const commission = Math.round(clientFare - agentFare);

  // Air Price api start hear
  const [isLoaded, setIsLoaded] = useState(true);
  const [loadData, setLoadData] = useState([]);
  let url;
  let body;
  let segments = [];
  location.state?.flightData?.segments?.map((data) =>
    segments.push({
      departure: data.departure,
      arrival: data.arrival,
      dpTime: data.departureTime,
      arrTime: data.arrivalTime,
      bCode: data.bookingcode,
      mCarrier: data.marketingcareer,
      mCarrierFN: data.marketingflight,
      oCarrier: data.marketingcareer,
      oCarrierFN: data.operatingflight,
    })
  );

  body = {
    adultCount: adultCount,
    childCount: childCount,
    infantCount: infant,
    segment: location.state.flightData.segment,
    tripType: location.state.tripType,
    segments: segments,
  };

  if (location.state?.flightData?.system === "Sabre") {
    url = "https://api.flyfarint.com/v.1.0.0/Sabre/AirPrice.php";
    body = {
      adultCount: adultCount,
      childCount: childCount,
      infantCount: infant,
      segment: location.state.flightData.segment,
      tripType: location.state.tripType,
      segments: segments,
    };
  } else if (location.state?.flightData.system === "FlyHub") {
    url = "https://api.flyfarint.com/v.1.0.0/FlyHub/AirPrice.php";
    body = {
      SearchID: location.state?.flightData?.SearchID,
      ResultID: location.state?.flightData?.ResultID,
    };
  } else if (location.state?.flightData.system === "Galileo") {
    url = "https://api.flyfarint.com/v.1.0.0/Galileo/AirPrice.php";
    body = {
      adultCount: adultCount,
      childCount: childCount,
      infantCount: infant,
      segment: location.state.flightData.segment,
      tripType: location.state.tripType,
      segments: segments,
    };
  }

  useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data?.status !== "error" || data?.Error === null) {
          setLoadData(data);
        } else {
          throw new Error(data);
        }
      })
      .catch((err) => {
        Swal.fire({
          imageUrl: NotFound,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "No Data Found",
          confirmButtonText: "Search Another Flights...",
          confirmButtonColor: "var(--primary-color)",
        }).then(function () {
          navigate(-1);
        });
      });
  }, [
    body.adultCount,
    body.childCount,
    body.infant,
    body.segment,
    body.tripType,
    navigate,
  ]);

  if (!isLoaded) {
    return (
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          width: "70vw",
          marginInline: "auto",
        }}
      >
        <Box
          style={{
            width: "50%",
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={Loader}
            alt="loader"
            style={{
              width: "40%",
              objectFit: "center",
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box height="100vh">
      <Container>
        <Header />

        {Object.keys(loadData).length !== 0 ? (
          <Grid container columnSpacing={4}>
            <Grid item xs={12} md={9}>
              <Box>
                <FlightInformationOneWayData flightData={flightData} />
              </Box>

              <Box>
                <FlightUserInformationOneway
                  loadData={loadData}
                  flightData={flightData}
                  tripType={location.state.tripType}
                  allData={location.state}
                  adultCount={adultCount}
                  childCount={childCount}
                  infant={infant}
                  isLoaded={isLoaded}
                  setIsLoaded={setIsLoaded}
                  SearchID={location?.state?.flightData?.SearchID}
                  ResultID={location?.state?.flightData?.ResultID}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  px: 1.5,
                  py: 2,
                  mt: 7.5,
                  borderRadius: "5px",
                }}
              >
                <FlightPriceBreakdownOneway flightData2={flightData} />
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "70vh",
              width: "70vw",
              marginInline: "auto",
            }}
          >
            <Box
              style={{
                width: "50%",
                height: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={Loader}
                alt="loader"
                style={{
                  width: "40%",
                  objectFit: "center",
                }}
              />
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default FlightInformationOneway;
