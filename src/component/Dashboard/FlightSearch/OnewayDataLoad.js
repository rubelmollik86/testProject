import React, { useState, useEffect, useRef } from "react";
import { Container } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import {
  Box,
  Button,
  Typography,
  Stack,
  Pagination,
  ClickAwayListener,
  CircularProgress,
  Skeleton,
  Grid,
  Collapse,
} from "@mui/material";
import Swal from "sweetalert2";
import OneWayFilter from "./OneWayFilter";
import OneWayFilterDrawer from "./OneWayFilterDrawer";
import FlightSearchBox from "../../HomeSearchBox/FlightSearchBox/FlightSearchBox";
import AirlinesNameSlider from "./AirlinesNameSlider";
import Commission from "./Commission";
import { addDays } from "date-fns/esm";
import { format } from "date-fns";
import SessionTimer from "../../Shared/SessionTimer/SessionTimer";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import styled from "styled-components";
import Preloader from "../../Preloader/Preloader";
import secureLocalStorage from "react-secure-storage";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FlightSearch.css";
import "./OnewayAllFlight.css";
import Search from "../../../image/undraw/undraw_web_search_re_efla.svg";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import OnewaySearchResult from "./OnewaySearchResult";
import FlightIcon from "@mui/icons-material/Flight";
import Header from "../../Header/Header";
import { makeStyles } from "@material-ui/core/styles";
import OneWayFakeData from "./OnewayFakeData";

const OnewayDataLoad = () => {
  const [noData, setNoData] = useState("No Data");
  const user = secureLocalStorage.getItem("user-info");
  const agentId = user?.user?.agentId;
  const subagentId = user?.user?.subagentId;
  const searchData = secureLocalStorage.getItem("search-data");
  const navigate = useNavigate();
  const location = useLocation();
  const requiredSearchData =
    location.state !== null
      ? location.state
      : secureLocalStorage.getItem("search-data");

  const {
    toSendData,
    adultCount,
    childCount,
    departureDate,
    infant,
    tripType,
    faddress,
    toAddress,
    fromSearchText,
    toSearchText,
    fromSendData,
    className,
  } = requiredSearchData;

  //all states that i have to send to modify search
  //todo: state for retrigger useEffect
  const [changeState, setChangeState] = useState(null);
  //todo: End for retrigger useEffect

  //todo: state for retrigger useEffect
  const [changeStateSession, setChangeStateSession] = useState(null);
  //todo: End for retrigger useEffect

  //todo: state for from date change
  const [changeFrom, setChangeFrom] = useState(false);
  //todo: End state for from date change

  const [type, setType] = React.useState("flight");
  const [value, setValue] = React.useState(tripType);
  const [oneWayFromSearchText, setOneWayFromSearchText] =
    useState(fromSearchText);
  const [oneWayToSearchText, setOneWayToSearchText] = useState(toSearchText);
  const now = useRef(new Date(departureDate));
  const [from, setFrom] = useState(now.current);
  const [to, setTo] = useState(addDays(now.current, 3));
  const [fromSearchDate, setFromSearchDate] = useState(new Date(departureDate));
  const [oneWayFaddress, setOneWayFaddress] = useState(faddress);
  const [oneWayToAddress, setOneWayToAddress] = useState(toAddress);
  const [oneWayFromSendData, setOneWayFromSendData] = useState(fromSendData);
  const [oneWayToSendData, setOneWayToSendData] = useState(toSendData);
  const [oneWayAdultCount, setOneWayAdultCount] = useState(adultCount);
  const [oneWayChildCount, setOneWayChildCount] = useState(childCount);
  const [oneWayInfant, setOneWayInfant] = useState(infant);
  const [result, setResult] = useState(adultCount + childCount + infant);
  const [oneWayClassName, setOneWayClassName] = useState(className);
  const [isPrevClicked, setIsPrevCliked] = useState(false);
  const [isNextClicked, setIsNextCliked] = useState(false);

  //end

  const [agentFarePrice, setAgentFarePrice] = useState(true);
  const [commisionFarePrice, setCommisionFarePrice] = useState(true);
  const [customerFare, setCustomerFare] = useState(true);

  //end
  const [modifyOpen, setModifyOpen] = useState(false);
  // const modifyHandleOpen = () => setModifyOpen(true);
  // const modifyHandleClose = () => setModifyOpen(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [searchDate, setSearchDate] = useState(
    new Date(from).toLocaleDateString("sv")
  );
  const [data, setData] = useState(OneWayFakeData);
  const [data2, setData2] = useState(OneWayFakeData);
  // const [data, setData] = useState([]);
  // const [data2, setData2] = useState([]);

  // todo:next day previous day variables
  let tomorrow = new Date(fromSearchDate);
  tomorrow.setDate(tomorrow.getDate() + 1);
  let yesterday = new Date(fromSearchDate);
  yesterday.setDate(yesterday.getDate() - 1);

  // Sets the state of the const for the given page and state.
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  let size = 30;

  // Handle a page change.
  const handlePageChange = (event, value) => {
    setPage(value);
    setData2(data?.slice((value - 1) * size, value * size));
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleClickAway = () => {};

  const handlePreviousDateChange = () => {
    setFromSearchDate(yesterday);
    setIsPrevCliked(true);
    setIsLoaded(false);
    // modifyHandleClose();
    let url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/B2C/AirSearch/oneway.php?tripType=${tripType}&journeyfrom=${fromSendData?.trim()}&journeyto=${toSendData}&departuredate=${new Date(
      yesterday
    ).toLocaleDateString(
      "sv"
    )}&adult=${adultCount}&child=${childCount}&infant=${infant}`;

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.length !== 0) {
          setIsLoaded(true);
          const uniqueData = data;
          const count = uniqueData.length;
          const pageNumber = Math.ceil(count / size);
          setPageCount(pageNumber);
          setData(uniqueData);
          setData2(uniqueData);
        } else {
          Swal.fire({
            imageUrl: Search,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "No Flights Found",
            confirmButtonText: "Search Again...",
            confirmButtonColor: "#dc143c",
          }).then(function () {
            navigate("/");
          });
        }
      })
      .catch(async (err) => {
        console.log(err.message);
        await Swal.fire({
          imageUrl: Search,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "No Flights Found",
          confirmButtonText: "Search Again...",
          confirmButtonColor: "#dc143c",
        }).then(function () {
          navigate("/");
        });
      });
  };

  // Handles the next date change.
  const handleNextDateChange = () => {
    setIsNextCliked(true);
    setFromSearchDate(tomorrow);
    setIsLoaded(false);
    // modifyHandleClose();
    let url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/B2C/AirSearch/oneway.php?tripType=${tripType}&journeyfrom=${fromSendData?.trim()}&journeyto=${toSendData}&departuredate=${new Date(
      tomorrow
    ).toLocaleDateString(
      "sv"
    )}&adult=${adultCount}&child=${childCount}&infant=${infant}`;

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.length !== 0) {
          setIsLoaded(true);
          const uniqueData = data;
          const count = uniqueData.length;
          const pageNumber = Math.ceil(count / size);
          setPageCount(pageNumber);
          setData(uniqueData);
          setData2(uniqueData);
        } else {
          Swal.fire({
            imageUrl: Search,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "No Flights Found",
            confirmButtonText: "Search Again...",
            confirmButtonColor: "#dc143c",
          }).then(function () {
            navigate("/");
          });
        }
      })
      .catch(async (err) => {
        console.log(err.message);
        await Swal.fire({
          imageUrl: Search,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "No Flights Found",
          confirmButtonText: "Search Again...",
          confirmButtonColor: "#dc143c",
        }).then(function () {
          navigate("/");
        });
      });
  };

  //todo Searches for flights today's date.
  useEffect(() => {
    let unSubscribed = false;
    setIsPrevCliked(false);
    setIsNextCliked(false);
    setIsLoaded(false);
    // modifyHandleClose();
    let url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/B2C/AirSearch/oneway.php?tripType=${tripType}&journeyfrom=${fromSendData?.trim()}&journeyto=${toSendData}&departuredate=${new Date(
      departureDate
    ).toLocaleDateString(
      "sv"
    )}&adult=${adultCount}&child=${childCount}&infant=${infant}`;
    let body = JSON.stringify({
      agentId: agentId || "",
      userId: "",
    });

    let option = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: body,
    };
    fetch(url, option)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!unSubscribed) {
          if (data.length !== 0) {
            setIsLoaded(true);
            const uniqueData = data;
            const count = uniqueData.length;
            const pageNumber = Math.ceil(count / size);
            setPageCount(pageNumber);
            setData(uniqueData);
            setData2(uniqueData);
          } else {
            Swal.fire({
              imageUrl: Search,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
              title: "No Flights Found",
              confirmButtonText: "Search Again...",
              confirmButtonColor: "var(--primary-color)",
            }).then(function () {
              navigate("/");
            });
          }
        }
      })
      .catch(async (err) => {
        await Swal.fire({
          imageUrl: Search,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "No Flights Found",
          confirmButtonText: "Search Again...",
          confirmButtonColor: "var(--primary-color)",
        }).then(function () {
          navigate("/");
        });
      });
    return () => {
      unSubscribed = true;
    };
  }, [
    agentId,

    changeState,
    changeStateSession,
    size,
    departureDate,
    fromSendData,
    toSendData,
    adultCount,
    childCount,
    infant,
    tripType,
    navigate,
  ]);
  // console.log("single search", data2);

  const multicity = secureLocalStorage.getItem("multi-city");
  const [multiCitySearchData, setMultiCitySearchData] = useState(
    multicity !== null
      ? multicity.searchData
      : {
          adultCount: adultCount,
          childCount: childCount,
          infantCount: infant,
          CityCount: 2,
          segments: [
            {
              id: 0,
              openFrom: false,
              DepFrom: fromSendData.trim(),
              depFromText: fromSearchText,
              ArrTo: toSendData.trim(),
              arrToText: toSearchText,
              openTo: false,
              Date: new Date().toLocaleDateString("sv"),
              openDate: false,
              open: false,
            },
            {
              id: 1,
              openFrom: false,
              DepFrom: toSendData.trim(),
              depFromText: toSearchText,
              ArrTo: "DXB",
              arrToText: "Dubai Intl Airport (DXB)",
              openTo: false,
              Date: new Date().toLocaleDateString("sv"),
              openDate: false,
              open: false,
            },
          ],
        }
  );

  return (
    <Box>
      <Container>
        <Header />
        <Grid container columnSpacing={{ lg: 1.5, md: 0, xs: 0 }}>
          <Grid
            item
            lg={2.3}
            sx={{
              display: { xs: "none", md: "none", lg: "flex" },
            }}
          >
            <Box
              sx={{
                width: "100%",
              }}
            >
              <OneWayFilter
                data={data}
                setData={setData}
                filteredData={data2}
                setfilteredData={setData2}
                noData={noData}
                setNoData={setNoData}
                departureDate={departureDate}
                setFrom={setFrom}
                isLoaded={isLoaded}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={9.7}
            sx={{
              display: { xs: "flex", md: "flex" },
            }}
          >
            <Box width="100%">
              <Grid container>
                <Grid xs={12}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    bgcolor="var(--primary-color)"
                    borderRadius="5px"
                    py={1.5}
                    px={2}
                    alignItems="center"
                  >
                    <Stack Stack direction="row" spacing={2}>
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "35px",
                          width: "35px",
                          borderRadius: "50%",
                          backgroundColor: "var(--white)",
                        }}
                      >
                        <FlightIcon
                          sx={{
                            color: "var(--secondary-color)",
                            fontSize: "20px",
                            transform: "rotate(45deg)",
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            color: "var(--white)",
                            fontSize: "16px",
                            fontWeight: 500,
                          }}
                        >
                          {faddress?.split(",")[0]}
                          {" - "}
                          {toAddress?.split(",")[0]}
                        </Typography>
                        <Typography
                          sx={{
                            color: "var(--white)",
                            fontSize: "13px",
                            fontWeight: 500,
                          }}
                        >
                          {format(
                            new Date(
                              departureDate ? departureDate : "departureDate"
                            ),
                            "dd MMM yyyy"
                          )}
                          {" | "} {adultCount + childCount + infant} Travelers
                        </Typography>
                      </Box>
                    </Stack>
                    <Box>
                      <Button
                        size="small"
                        sx={{
                          color: "var(--secondary-color)",
                          bgcolor: "var(--white)",
                          px: 1,
                          py: 0.7,
                          "&:hover": {
                            bgcolor: "var(--white)",
                          },
                        }}
                        onClick={() => setModifyOpen(!modifyOpen)}
                      >
                        Modify Search
                      </Button>
                    </Box>
                  </Stack>
                  <Box
                    pt={modifyOpen === true ? 1 : 0}
                    pb={0.0}
                    mb={modifyOpen === true ? 3 : 1.5}
                    bgcolor="#fff"
                    borderRadius="0px 0px 10px 10px"
                  >
                    <Collapse
                      in={modifyOpen}
                      timeout="auto"
                      unmountOnExit
                      sx={{ width: "100%" }}
                    >
                      <FlightSearchBox
                        type={type}
                        setType={setType}
                        value={value}
                        setValue={setValue}
                        fromSearchText={oneWayFromSearchText}
                        setFromSearchText={setOneWayFromSearchText}
                        toSearchText={oneWayToSearchText}
                        setToSearchText={setOneWayToSearchText}
                        from={from}
                        setFrom={setFrom}
                        to={to}
                        setTo={setTo}
                        faddress={oneWayFaddress}
                        setfaddress={setOneWayFaddress}
                        toAddress={oneWayToAddress}
                        setToAddress={setOneWayToAddress}
                        fromSendData={oneWayFromSendData}
                        setFromSendData={setOneWayFromSendData}
                        toSendData={oneWayToSendData}
                        setToSendData={setOneWayToSendData}
                        adultCount={oneWayAdultCount}
                        setAdultCount={setOneWayAdultCount}
                        childCount={oneWayChildCount}
                        setChildCount={setOneWayChildCount}
                        infant={oneWayInfant}
                        setInfant={setOneWayInfant}
                        result={result}
                        setResult={setResult}
                        className={oneWayClassName}
                        setClassName={setOneWayClassName}
                        changeState={changeState}
                        setChangeState={setChangeState}
                        changeFrom={changeFrom}
                        setChangeFrom={setChangeFrom}
                        searchData={multiCitySearchData}
                        setSearchData={setMultiCitySearchData}
                      />
                    </Collapse>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  sx={{
                    height: "fit-content",
                  }}
                >
                  {data2?.slice(0, size).map((data, index) => {
                    return (
                      <OnewaySearchResult
                        key={index}
                        flightData={data}
                        tripType={tripType}
                        adultCount={adultCount}
                        childCount={childCount}
                        infant={infant}
                        from={fromSendData}
                        to={toSendData}
                        fromAddress={faddress}
                        toAddress={toAddress}
                        dDate={searchDate}
                        agentFarePrice={agentFarePrice}
                        setAgentFarePrice={setAgentFarePrice}
                        commisionFarePrice={commisionFarePrice}
                        setCommisionFarePrice={setCommisionFarePrice}
                        customerFare={customerFare}
                        setCustomerFare={setCustomerFare}
                        isLoaded={isLoaded}
                      />
                    );
                  })}
                </Grid>
                {isLoaded ? (
                  <Grid item lg={12} md={12} sm={12} xs={12} width="100%">
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Box width="100%">
                        <hr />
                      </Box>
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent="flex-end"
                        className="pagination-select"
                      >
                        <Stack spacing={2}>
                          <Pagination
                            count={pageCount}
                            onChange={handlePageChange}
                            shape="circle"
                            style={{
                              color: "#ffF",
                            }}
                          />
                        </Stack>
                      </Box>
                    </Stack>
                  </Grid>
                ) : (
                  <Box
                    style={{
                      width: "100%",
                      height: "50px",
                      margin: "10px 0px",
                      borderRadius: "5px",
                      overFlow: "hidden",
                    }}
                  >
                    <Skeleton
                      sx={{ borderRadius: "5px" }}
                      variant="rectangular"
                      width={"100%"}
                      height={"100%"}
                    />
                  </Box>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OnewayDataLoad;
