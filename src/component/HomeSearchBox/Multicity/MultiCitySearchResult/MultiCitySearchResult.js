import React, { useState, useEffect, useRef } from "react";
import { Container } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import {
  Box,
  Grid,
  Button,
  Typography,
  Stack,
  Pagination,
  Skeleton,
} from "@mui/material";
import Swal from "sweetalert2";
import { addDays } from "date-fns/esm";
import { format } from "date-fns";
import Tooltip from "@mui/material/Tooltip";
import secureLocalStorage from "react-secure-storage";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AirlinesNameSlider from "../../components/AirlinesNameSlider/AirlinesNameSlider";
import FlightSearchBox from "../FlightSearchBox/FlightSearchBox";
import OneWayFilter from "../OneWayFilter";
import Search from "../../images/undraw/undraw_web_search_re_efla.svg";
import SingleMultiCityItem from "./SingleMultiCityItem";
import { MultiCityFakeData } from "../MultiCityFakeData";
import "./MultiCitySearchResult.css";
import Header from "../Header/Header";

const modalStyle = {
  position: "absolute",
  top: "10%",
  left: "50%",
  bottom: "0",
  transform: "translate(-50%, 0)",
  width: { lg: "70vw", md: "90vw", sm: "90vw", xs: "90vw" },
  height: "fit-content",
  padding: "20px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};

const MultiCitySearchResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [noData, setNoData] = useState("No Data");
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
  const [searchData, setSearchData] = useState(location.state.searchData);
  //end

  const [agentFarePrice, setAgentFarePrice] = useState(true);
  const [commisionFarePrice, setCommisionFarePrice] = useState(true);
  const [customerFare, setCustomerFare] = useState(true);

  //end
  const [modifyOpen, setModifyOpen] = useState(false);
  const modifyHandleOpen = () => setModifyOpen(true);
  const modifyHandleClose = () => setModifyOpen(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [searchDate, setSearchDate] = useState(
    new Date(from).toLocaleDateString("sv")
  );
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

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

  //todo Searches for flights today's date.
  useEffect(() => {
    let unSubscribed = false;
    setIsLoaded(false);
    modifyHandleClose();
    let url =
      "https://api.flyfarint.com/v.1.0.0/WhiteLabel/AirSearch/multicity.php";
    let body = JSON.stringify(location.state.searchData);
    // console.log("Multicity Search", body);
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
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
              navigate("/dashboard");
            });
          }
        }
      });
    return () => {
      unSubscribed = true;
    };
  }, [location.state.searchData, location.state.changeState, navigate, size]);

  return (
    <Box>
      <Header />
      <Container>
        <Box sx={{ position: "relative" }}>
          <Box className="flightSearchParent" maxWidth="xxl">
            <Box className="filter-parent01">
              <Grid container justifyContent="space-between">
                <Grid
                  mt={4}
                  className="modify-search modify-search-oneway"
                  container
                  spacing={2}
                  display="flex"
                  alignItems="center"
                  style={{ paddingLeft: "18px", display: "none" }}
                  position="static"
                  top="20px"
                >
                  {/* <Grid className="modify-search-info" container md={6}>
                    <Box style={{ width: "100%" }}>
                      <FlightTakeoffIcon />
                      <Typography style={{ color: "var(--secondary-color)" }}>
                        Flight Search Result
                      </Typography>
                    </Box>
                    <h5>
                      {tripType === "oneway"
                        ? "One Way"
                        : tripType === "return"
                        ? "Return"
                        : "Multi City"}{" "}
                      Flight <span>|</span>{" "}
                      {adultCount > 0 && `Adult(${adultCount})`}
                      {childCount > 0 && `Children(${childCount})`}
                      {infant > 0 && `Infant(${infant})`} <span>|</span>{" "}
                      {className} <span>|</span>{" "}
                      {format(
                        new Date(
                          isNextClicked || isPrevClicked
                            ? fromSearchDate
                            : departureDate
                        ),
                        "dd MMM yyyy"
                      )}
                    </h5>
                    <h6>
                      {fromSearchText.trim()} <span>|</span>{" "}
                      {toSearchText.trim()}
                    </h6>
                  </Grid> */}
                  <Grid container columnGap={1} rowGap={1} md={6}>
                    <Grid xs={2} sm={1} md={1.5} lg={1.5}>
                      <Tooltip title="Session Time">
                        <Button
                          style={{
                            border: "1.2px solid var(--primary-color)",
                            color: "var(--primary-color)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                          }}
                        ></Button>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  lg={2.2}
                  sx={{
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "none",
                      lg: "block",
                    },
                  }}
                >
                  {isLoaded ? (
                    <OneWayFilter
                      data={data}
                      setData={setData}
                      filteredData={data2}
                      setfilteredData={setData2}
                      noData={noData}
                      setNoData={setNoData}
                      departureDate={location.state.searchData.segments[0].Date}
                      setFrom={setFrom}
                    />
                  ) : (
                    <Box
                      style={{
                        height: "100%",
                        width: "100%",
                        margin: "10px 0px",
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={"100%"}
                      />
                    </Box>
                  )}
                </Grid>

                <Grid container item xs={12} sm={12} md={12} lg={9.6}>
                  {/* //todo: show search result section*/}
                  <Grid
                    container
                    className="modify-search"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    mt={4}
                    style={{ paddingLeft: "18px" }}
                  >
                    <Grid className="modify-search-info" item md={8} lg={8}>
                      <Box>
                        <Box
                          style={{
                            width: "100%",
                            height: "fit-content",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <FlightTakeoffIcon
                            style={{
                              width: "25px",
                              height: "25px",
                              padding: "5px",
                              backgroundColor: "var(--primary-color)",
                              color: "var(--white)",
                              borderRadius: "100%",
                            }}
                          />
                          <Typography
                            style={{
                              color: "#222222",
                              fontSize: "24px",
                            }}
                          >
                            Flight Search Result
                          </Typography>
                        </Box>

                        {location.state.searchData.segments.map(
                          (item, index) => (
                            <h6>{`City: ${
                              index + 1
                            } ${item?.depFromText.trim()} - ${item?.arrToText?.trim()}`}</h6>
                          )
                        )}

                        <h5>
                          {tripType === "oneway"
                            ? "One Way"
                            : tripType === "return"
                            ? "Return"
                            : "Multi City"}{" "}
                          Flight<span> | </span>
                          {format(
                            new Date(
                              location.state.searchData.segments[0].Date
                            ),
                            "dd MMM yyyy"
                          )}
                          <span> | </span>
                          {adultCount > 0 && `Adult(${adultCount})`}
                          {childCount > 0 && `Children(${childCount})`}
                          {infant > 0 && `Infant(${infant})`} | {className}
                        </h5>
                      </Box>
                    </Grid>
                    <Grid
                      container
                      md={4}
                      lg={4}
                      justifyContent="flex-end"
                      spacing={2}
                    >
                      {/* //todo:session timer  */}
                      <Grid
                        xs={6}
                        sm={6}
                        md={6}
                        lg={3}
                        style={{ padding: "0px 5px" }}
                      >
                        <Tooltip title="Session Time">
                          <Button
                            style={{
                              border: "1.2px solid var(--secondary-color)",
                              color: "var(--secondary-color)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-around",
                            }}
                          >
                            Session
                            {/* <SessionTimer
                                  setChangeState={setChangeStateSession}
                                /> */}
                          </Button>
                        </Tooltip>
                      </Grid>
                      {/* //todo: modify search button */}
                      <Grid xs={6} sm={6} md={6} lg={6}>
                        <Button
                          onClick={modifyHandleOpen}
                          style={{
                            backgroundColor: "var(--secondary-color)",
                            color: "var(--white)",
                            padding: "5px 10px",
                            cursor: "pointer",
                          }}
                        >
                          Modify Search
                        </Button>

                        <Modal open={modifyOpen} onClose={modifyHandleClose}>
                          <Container>
                            <Box sx={modalStyle}>
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
                                searchData={searchData}
                                setSearchData={setSearchData}
                              />
                            </Box>
                          </Container>
                        </Modal>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* //todo:airline slider */}
                  <Grid
                    my={2}
                    mx={"auto"}
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    style={{
                      width: "100%",
                      height: "50px",
                    }}
                  >
                    {isLoaded ? (
                      <AirlinesNameSlider
                        data={data}
                        setData={setData}
                        filteredData={data2}
                        setfilteredData={setData2}
                      />
                    ) : (
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={"100%"}
                      />
                    )}
                  </Grid>
                  {/* //todo:main search result */}
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
                    {isLoaded
                      ? data2?.slice(0, size).map((data, index) => {
                          return (
                            <SingleMultiCityItem
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
                        })
                      : [...new Array(5)].map((data, index) => (
                          <Box
                            key={index}
                            style={{
                              width: "100%",
                              height: "150px",
                              margin: "10px 0px",
                              borderRadius: "5px",
                              overFlow: "hidden",
                            }}
                          >
                            <Skeleton
                              variant="rectangular"
                              width={"100%"}
                              height={"100%"}
                            />
                          </Box>
                        ))}
                  </Grid>
                  {/* //todo: pagination*/}
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box
                      sx={{
                        width: "100%",
                        my: 3,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Stack spacing={2}>
                        <Pagination
                          count={pageCount}
                          onChange={handlePageChange}
                          shape="rounded"
                          color="primary"
                        />
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MultiCitySearchResult;
