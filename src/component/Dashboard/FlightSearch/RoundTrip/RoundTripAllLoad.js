import {
  Box,
  ClickAwayListener,
  Container,
  Pagination,
  Stack,
  Typography,
  Skeleton,
  Collapse,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import RoundTripMain from "./RoundTripMain";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Grid, Button } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Swal from "sweetalert2";
import Loader from "../../../../image/loader/Render.gif";
import RoundFilterDrawer from "./RoundFilterDrawer";
import RoundWayFilter from "./RoundWayFilter";
import FlightSearchBox from "../../../HomeSearchBox/FlightSearchBox/FlightSearchBox";
import RoundCommison from "./RoundCommison";
import AirlinesNameSlider from "../AirlinesNameSlider";
import { addDays, format } from "date-fns";
import SessionTimer from "../../../Shared/SessionTimer/SessionTimer";
import RoundPreloader from "../../../Preloader/RoundPreloader";
import secureLocalStorage from "react-secure-storage";
import Search from "../../../../image/undraw/undraw_web_search_re_efla.svg";
import Header from "../../../Header/Header";
import OneWayFilter from "../OneWayFilter";
import FlightIcon from "@mui/icons-material/Flight";
import { RoundWayFakeData } from "./RoundWayFakeData";
import SearchResultSkeleton from "../SearchResultSkeleton";
import ReturnSearchSkeleton from "./ReturnSearchSkeleton";

const HtmlTooltip = styled(({ className, ...propss }) => (
  <Tooltip {...propss} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#dc143c",
    maxWidth: 220,
    fontSize: "20px",
    borderRadius: "8px 0px 8px 0px",
  },
}));

const RoundTripAllLoad = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const requiredSearchData =
    location.state !== null
      ? location.state
      : secureLocalStorage.getItem("search-data");

  const {
    fromSendData,
    toSendData,
    departureDate,
    returningDate,
    adultCount,
    childCount,
    infant,
    tripType,
    faddress,
    toAddress,
    fromSearchText,
    toSearchText,
    className,
  } = requiredSearchData;

  //fetch data form localStorage
  const commissionData = secureLocalStorage.getItem("commissionData");
  //all states that i have to send to modify search
  const [type, setType] = React.useState("flight");
  const [value, setValue] = React.useState(tripType);
  const [roundWayFromSearchText, setRoundWayFromSearchText] =
    useState(fromSearchText);
  const [roundWayToSearchText, setRoundWayToSearchText] =
    useState(toSearchText);
  const now = useRef(new Date(departureDate));
  const returnNow = useRef(new Date(returningDate));
  const [from, setFrom] = useState(now.current);
  const [to, setTo] = useState(returnNow.current);
  const [fromSearchDate, setFromSearchDate] = useState(departureDate);
  const [toSearchDate, setToSearchDate] = useState(returningDate);

  const [roundWayFaddress, setRoundWayFaddress] = useState(faddress);
  const [roundWayToAddress, setRoundWayToAddress] = useState(toAddress);
  const [roundWayFromSendData, setRoundWayFromSendData] =
    useState(fromSendData);
  const [roundWayToSendData, setRoundWayToSendData] = useState(toSendData);
  const [roundWayAdultCount, setRoundWayAdultCount] = useState(adultCount);
  const [roundWayChildCount, setRoundWayChildCount] = useState(childCount);
  const [roundWayInfant, setRoundWayInfant] = useState(infant);
  const [result, setResult] = useState(adultCount + childCount + infant);
  const [roundWayClassName, setRoundWayClassName] = useState(className);
  const [isPrevClicked, setIsPrevCliked] = useState(false);
  const [isNextClicked, setIsNextCliked] = useState(false);
  //end

  //CM Box States
  const [openCm, setOpenCm] = useState(false);
  const [agentFarePrice, setAgentFarePrice] = useState(
    commissionData?.agentFarePrice
  );
  const [commisionFarePrice, setCommisionFarePrice] = useState(
    commissionData?.commissionFarePrice
  );
  const [defaultCommissionRate, setDefaultCommissionRate] = useState(
    commissionData?.defaultCommissionRate
  );
  const [defaultCommissionRateAmount, setDefaultCommissionRateAmount] =
    useState(commissionData?.defaultCommissionRateAmount);

  const [customerFare, setCustomerFare] = useState(
    commissionData?.customerFare
  );

  //end
  //todo:all flight and nxt and previous day data states
  // const [datas, setDatas] = useState(RoundWayFakeData);
  // const [data2, setData2] = useState(RoundWayFakeData);
  const [datas, setDatas] = useState([]);
  const [data2, setData2] = useState([]);

  // const [filteredData, setFilteredData] = useState([]);
  const [noData, setNoData] = useState("No Data");
  // filter states
  const [isChange, setIsChange] = useState(false);

  const [modifyOpen, setModifyOpen] = useState(false);
  const modifyHandleOpen = () => setModifyOpen(true);
  const modifyHandleClose = () => setModifyOpen(false);

  //todo: state for retrigger useEffect
  const [changeState, setChangeState] = useState(null);
  //todo: End for retrigger useEffect

  //todo: state for from date change
  const [changeFrom, setChangeFrom] = useState(false);
  //todo: End state for from date change

  // Sets the state of the const for the given page and state.
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  // todo: previous day and next day date variables
  let tomorrowDepartureDate = new Date(fromSearchDate);
  let tomorrowReturnDate = new Date(toSearchDate);
  tomorrowDepartureDate.setDate(tomorrowDepartureDate.getDate() + 1);
  tomorrowReturnDate.setDate(tomorrowReturnDate.getDate() + 1);
  let yesterdayDepartureDate = new Date(fromSearchDate);
  let yesterdayReturnDate = new Date(toSearchDate);
  yesterdayDepartureDate.setDate(yesterdayDepartureDate.getDate() - 1);
  yesterdayReturnDate.setDate(yesterdayReturnDate.getDate() - 1);

  let size = 30;
  // Handle a page change.
  const handlePageChange = (event, value) => {
    setPage(value);
    setData2(datas?.slice((value - 1) * size, value * size));
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // get the target element to toggle
  const handleClickAway = () => {};
  // on date change, store date in state
  // const [range, setRange] = useState([
  //   {
  //     startDate: new Date(departureDate),
  //     endDate: new Date(returningDate),
  //     key: "selection",
  //   },
  // ]);
  // Handle the previous date change

  const [isLoaded, setIsLoaded] = useState(false);
  //todo All Flight Data for Today
  useEffect(() => {
    // modifyHandleClose();
    let unSubscribed = false;
    setIsPrevCliked(false);
    setIsNextCliked(false);
    setIsLoaded(false);
    let url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/B2C/AirSearch/return.php?tripType=${tripType}&journeyfrom=${fromSendData?.replace(
      /\s+/g,
      ""
    )}&journeyto=${toSendData}&departuredate=${new Date(
      departureDate
    ).toLocaleDateString("sv")}&returndate=${new Date(
      returningDate
    ).toLocaleDateString(
      "sv"
    )}&adult=${adultCount}&child=${childCount}&infant=${infant}`;
    let body = JSON.stringify({
      agentId: "FFA1926",
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
            setDatas(uniqueData);
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
        }
      })
      .catch((err) => {
        console.log(err);
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
      });
    return () => {
      unSubscribed = true;
    };
  }, [
    changeState,
    departureDate,
    returningDate,
    fromSendData,
    toSendData,
    adultCount,
    childCount,
    infant,
    isChange,
  ]);

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
                data={datas}
                setData={setDatas}
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
                          {" - "}
                          {format(
                            new Date(
                              returningDate ? returningDate : "departureDate"
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
                        fromSearchText={roundWayFromSearchText}
                        setFromSearchText={setRoundWayFromSearchText}
                        toSearchText={roundWayToSearchText}
                        setToSearchText={setRoundWayToSearchText}
                        from={from}
                        setFrom={setFrom}
                        to={to}
                        setTo={setTo}
                        faddress={roundWayFaddress}
                        setfaddress={setRoundWayFaddress}
                        toAddress={roundWayToAddress}
                        setToAddress={setRoundWayToAddress}
                        fromSendData={roundWayFromSendData}
                        setFromSendData={setRoundWayFromSendData}
                        toSendData={roundWayToSendData}
                        setToSendData={setRoundWayToSendData}
                        adultCount={roundWayAdultCount}
                        setAdultCount={setRoundWayAdultCount}
                        childCount={roundWayChildCount}
                        setChildCount={setRoundWayChildCount}
                        infant={roundWayInfant}
                        setInfant={setRoundWayInfant}
                        result={result}
                        setResult={setResult}
                        className={roundWayClassName}
                        setClassName={setRoundWayClassName}
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
                  {isLoaded
                    ? data2?.slice(0, size).map((roundTrip, index) => {
                        return (
                          <RoundTripMain
                            key={index}
                            roundData={roundTrip}
                            adultCount={adultCount}
                            childCount={childCount}
                            infant={infant}
                            fromSendData={fromSendData}
                            toSendData={toSendData}
                            tripType={tripType}
                            departureDate={departureDate}
                            returingDate={returningDate}
                            faddress={faddress}
                            toAddress={toAddress}
                            agentFarePrice={agentFarePrice}
                            setAgentFarePrice={setAgentFarePrice}
                            commisionFarePrice={commisionFarePrice}
                            setCommisionFarePrice={setCommisionFarePrice}
                            customerFare={customerFare}
                            setCustomerFare={setCustomerFare}
                            searchData={multiCitySearchData}
                            setSearchData={setMultiCitySearchData}
                            isLoaded={isLoaded}
                          />
                        );
                      })
                    : [...new Array(5)].map((data, index) => (
                        <Box sx={{ marginBottom: "5px" }}>
                          <ReturnSearchSkeleton />
                        </Box>
                      ))}
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

export default RoundTripAllLoad;
