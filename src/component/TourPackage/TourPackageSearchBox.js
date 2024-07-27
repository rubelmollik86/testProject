import {
  Alert,
  Box,
  Button,
  Collapse,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation } from "react-router-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import format from "date-fns/format";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { addDays } from "date-fns";
import CountryList from "../CountryList";
import secureLocalStorage from "react-secure-storage";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

const TourPackageSearchBox = () => {
  const data = CountryList;
  const [fromSearchText, setFromSearchText] = useState("Domestic");
  const [toSearchText, setToSearchText] = useState("Location");
  const [departureDate, setDepartureDate] = useState(
    format(new Date(), "dd MMM yy")
  );
  const [returningDate, setReturningDate] = useState(
    format(addDays(new Date(departureDate), 3), "dd MMM yy")
  );

  const [faddress, setfaddress] = useState("Bangladesh");
  const [toAddress, setToAddress] = useState("Student");
  const [fromSendData, setFromSendData] = useState("domestic");
  const [toSendData, setToSendData] = useState("");
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infant, setInfant] = useState(0);
  const [result, setResult] = useState(1);
  const [className, setClassName] = useState("Economy");
  //  show the form data when click input field
  const initialDataDestination = [
    { name: "domestic" },
    { name: "international" },
  ];

  const initialDataCity = [
    { City: "dhaka" },
    { City: "chittagong" },
    { City: "rajshahi" },
  ];

  const initialData = [{ name: "dhaka", code: "BD" }];
  const [fromSuggest, setFromSuggest] = useState(initialDataDestination);
  const now = useRef(new Date());
  const [from, setFrom] = useState(addDays(now.current, 1));

  const navigate = useNavigate();
  const location = useLocation();
  const user = secureLocalStorage.getItem("user-info");
  const [openFrom, setOpenFrom] = useState(false);

  const [openTo, setOpenTo] = useState(false);
  // Date picker
  const [openDate, setOpenDate] = useState(false);
  const [openReturnDate, setOpenReturnDate] = useState(false);
  const [click, setClick] = useState(false);
  // handle click function
  const [cityData, setCityData] = useState([]);
  // new data
  const [selectedDate, setSelectedDate] = useState(new Date());
  const currentMonth = new Date().getMonth();

  const dtate = new Date(selectedDate).toLocaleString("en-GB", {
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const url = `https://flyfarladies-apiv2.appspot.com/tourpackage/location/${fromSendData}/${dtate}`;
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data?.statusCode !== 404) {
          setCityData(data);
          setToSuggest(data);
        }
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, [fromSendData, dtate]);

  const [toSuggest, setToSuggest] = useState([]);

  const fromSuggestedText = (name) => {
    setFromSearchText(name);
    setFromSuggest([...fromSuggest], fromSuggest.name);
    setFromSendData(name);
    setfaddress(name);
    setOpenTo(false);
    setOpenDate(true);
  };

  //Destination Type
  const fromGetSuggetion = () => {
    return (
      <Box
        style={{
          height: "fit-content",
          position: "relative",
          width: "100%",
          zIndex: "999",
        }}
      >
        <Box
          sx={{
            maxHeight: "230px",
            overflowY: "auto",
            background: "#fff",
            "&::-webkit-scrollbar": { width: "0px" },
          }}
        >
          {fromSuggest.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  paddingLeft: "10px",
                  paddingRight: "0px",
                  backgroundColor: "var(--white)",
                  borderShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  "&:hover": {
                    backgroundColor: "var(--secondary-color)",
                    color: "var(--white)",
                  },
                  "&:hover .address": { color: "var(--white)" },
                  zIndex: "999",
                }}
              >
                <Box
                  sx={{
                    margin: "0px 0px",
                    padding: "7px 0px",
                    cursor: "pointer",
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                  onClick={() => {
                    fromSuggestedText(item.name);
                    setOpenFrom(false);
                  }}
                >
                  <Box>
                    <Typography
                      className="address"
                      sx={{
                        fontSize: "15px",
                        color: "var(--primary-color)",
                        textAlign: "left",
                        fontWeight: 500,
                        width: "100%",
                        textTransform: "Capitalize",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };

  // Date Pick
  const handleSelect = (date) => {
    setFrom(date);
    setOpenDate(false);
    setOpenTo(true);
    // setTimeout(() => setOpenDate(true), 200);
  };

  // Where .....Locations
  const toOnChange = (e) => {
    const searchvalue = e.target.value;
    const suggestion = cityData?.filter((item) => {
      return (
        item?.City?.toLowerCase().includes(searchvalue?.toLowerCase()) ||
        item?.Country?.toLowerCase().includes(searchvalue?.toLowerCase())
      );
    });
    console.log("Result", suggestion);

    setToSuggest(suggestion);
  };

  const toSuggestedText = (name) => {
    setToSendData(name);
    setToSearchText(name);
    setToSuggest([...toSuggest], toSuggest.name);
    setToAddress(name);
    setOpenTo(false);
    setOpenDate(false);
    // setTimeout(() => setOpenDate(true), 200);
  };
  const toGetSuggetion = () => {
    return (
      <Box
        style={{
          height: "fit-content",
          position: "relative",
          width: "100%",
          zIndex: "100",
        }}
      >
        <Box
          sx={{
            maxHeight: "230px",
            overflowY: "auto",
            background: "#fff",
            "&::-webkit-scrollbar": { width: "0px" },
          }}
        >
          {toSuggest?.length !== 0 ? (
            toSuggest?.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    paddingLeft: "10px",
                    paddingRight: "0px",
                    backgroundColor: "var(--white)",
                    "&:hover": {
                      backgroundColor: "var(--secondary-color)",
                      color: "var(--white)",
                    },
                    "&:hover .address": { color: "var(--white)" },
                  }}
                >
                  <Box
                    sx={{
                      margin: "0px 0px",
                      padding: "5px 0px",
                      cursor: "pointer",
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                    onClick={() => {
                      toSuggestedText(item?.City);
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "95%",
                      }}
                    >
                      <Typography
                        className="address"
                        sx={{
                          fontSize: "15px",
                          color: "var(--primary-color)",
                          display: "block",
                          textAlign: "left",
                          fontWeight: 500,
                        }}
                      >
                        {item.City}
                      </Typography>
                      <Typography
                        className="address"
                        sx={{
                          fontSize: "15px",
                          color: "var(--primary-color)",
                          display: "block",
                          textAlign: "left",
                          fontWeight: 500,
                        }}
                      >
                        {item.Country}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Box>
              <Typography
                variant="subtitle2"
                style={{
                  color: "var(--primary-color)",
                  fontWidth: "bold",
                  paddingLeft: "10px",
                }}
              >
                Not found
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  };
  // SearchingField End

  const handleClickAway = () => {
    setOpenFrom(false);
    setOpenTo(false);
    setOpenDate(false);
    setOpenReturnDate(false);
  };

  const customStyles = {
    calendarContainer: {
      backgroundColor: "#fff",
      color: "var(--secondary-color)",

      padding: "16px",
      border: "none",
    },

    monthSelected: {
      backgroundColor: "blue",
      color: "white",
    },

    selected: {
      backgroundColor: "red",
    },
  };

  //  search
  async function handleSearch(e) {
    e.preventDefault();
    // show notification if user is not found
    navigate("/dashboard/tourpackageshow", {
      state: {
        fromSendData,
        toSendData,
        dtate,
        data,
      },
    });
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box style={{ position: "relative", width: "100%" }}>
        <form onSubmit={handleSearch}>
          <Grid
            container
            rowGap={{ lg: 0, md: 0, sm: 1, xs: 1 }}
            columnGap={{ lg: 2, md: 3, sm: 1, xs: 1 }}
            alignItems="center"
            justifyContent="center"
            paddingX={{ md: 0, xs: 2 }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={3.5}
              lg={3.7}
              style={{
                position: "relative",
                border: "1px solid var(--border-color)",
                padding: "5px",
                height: "60px",
                borderRadius: "10px",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                }}
                onClick={() => {
                  setOpenFrom((prev) => !prev);
                  setOpenDate(false);
                  setOpenTo(false);
                  window.scrollTo({
                    top: 200,
                    behavior: "smooth",
                  });
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "5px",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "35px",
                      width: "35px",
                      borderRadius: "50%",
                      backgroundColor: "var(--primary-color)",
                      color: "var(--white)",
                    }}
                  >
                    <TravelExploreIcon style={{ fontSize: "20px" }} />
                  </Box>
                </Box>
                <Box sx={{ width: "100%", height: "100%", pl: 1 }}>
                  <Box style={{ position: "relative" }}>
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: { xs: "14px", sm: "17px" },
                        paddingTop: "1.5px",
                        fontWeight: "500",
                      }}
                    >
                      Destination Type
                    </Typography>
                  </Box>

                  <Box style={{ width: "95%" }}>
                    <Typography
                      style={{
                        width: "100%",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "var(--tab-text)",
                      }}
                    >
                      {fromSearchText}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Collapse
                in={openFrom}
                timeout="auto"
                unmountOnExit
                sx={{ width: "100%" }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    right: "0",
                    width: "100%",
                    height: "fit-content",
                    borderRadius: "0px 0px 5px 5px",
                    zIndex: "999",
                    padding: "3px 5px 0px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "var(--secondary-color)",
                      zIndex: 10,
                      backgroundColor: "#fff",
                    }}
                  ></Box>
                  <Box>{fromGetSuggetion()}</Box>
                </Box>
              </Collapse>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={3.5}
              lg={3.7}
              sx={{
                position: "relative",
                height: "60px",
              }}
            >
              {/* <Box
                className="DatePicker-style"
                style={{
                  border: "1px solid var(--border-color)",
                  borderRadius: "10px",
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Box
                  ml={{ xs: 0.5, sm: 1.5 }}
                  sx={{
                    border: "1px solid rgba(var(--third-rgb),.3)",
                    borderRadius: "100%",
                    color: "var(--secondary-color)",
                    height: "35px",
                    width: "35px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CalendarMonthIcon style={{ fontSize: "20px" }} />
                </Box>

                <Box className="DatePicker-style">
                  <span
                    style={{
                      color: "var(--secondary-color)",
                      fontSize: { xs: "14px", sm: "17px" },
                      fontWeight: "500",
                    }}
                  >
                    When ?
                  </span>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    startDate={new Date()}
                    minDate={new Date(new Date().getFullYear(), currentMonth)}
                    maxDate={new Date("2080-12-31")}
                    placeholderText="Select a date"
                    calendarContainer={(props) => {
                      return (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            ...customStyles.calendarContainer,
                          }}
                        />
                      );
                    }}
                  />
                </Box>
              </Box> */}

              <Box className="DatePicker-style">
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "35px",
                    width: "35px",
                    borderRadius: "50%",
                    backgroundColor: "var(--primary-color)",
                    color: "var(--white)",
                    position: "absolute",
                    zIndex: "100",
                    left: "10px",
                    top: "12px",
                  }}
                >
                  <CalendarMonthIcon
                    style={{
                      fontSize: "20px",
                    }}
                  />
                </Box>

                <span
                  style={{
                    color: "var(--secondary-color)",
                    fontSize: { xs: "14px", sm: "17px" },
                    fontWeight: "500",
                    position: "absolute",
                    zIndex: "100",
                    left: "50px",
                    top: "5px",
                  }}
                >
                  When ?
                </span>

                <DatePicker
                  style={{
                    position: "relative",
                  }}
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="MMMM yyyy"
                  showMonthYearPicker
                  startDate={new Date()}
                  minDate={new Date(new Date().getFullYear(), currentMonth)}
                  maxDate={new Date("2080-12-31")}
                  placeholderText="Select a date"
                  calendarContainer={(props) => {
                    return (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          ...customStyles.calendarContainer,
                        }}
                      />
                    );
                  }}
                ></DatePicker>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={3.5}
              lg={3.7}
              style={{
                position: "relative",
                border: "1px solid var(--border-color)",
                padding: "5px",
                height: "60px",
                borderRadius: "10px",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                }}
                onClick={() => {
                  setOpenTo((prev) => !prev);
                  setOpenDate(false);
                  setOpenFrom(false);
                  window.scrollTo({
                    top: 200,
                    behavior: "smooth",
                  });
                  // setOpen(false);
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "5px",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "35px",
                      width: "35px",
                      borderRadius: "50%",
                      backgroundColor: "var(--primary-color)",
                      color: "var(--white)",
                    }}
                  >
                    <LocationOnIcon style={{ fontSize: "20px" }} />
                  </Box>
                </Box>
                <Box sx={{ width: "100%", height: "100%", pl: 1 }}>
                  <Box style={{ position: "relative" }}>
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: { xs: "14px", sm: "17px" },
                        paddingTop: "1.5px",
                        fontWeight: "500",
                      }}
                    >
                      Where ?
                    </Typography>
                    {/* <span>{faddress?.split(",")[0]}</span> */}
                    {faddress?.split(",")[0] === toAddress?.split(",")[0] && (
                      <Stack
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "0",
                          width: "100%",
                        }}
                      >
                        <Alert
                          icon={<ErrorOutlineIcon fontSize="inherit" />}
                          severity="error"
                          sx={{ fontSize: "11px" }}
                        >
                          Can't choose same place!
                        </Alert>
                      </Stack>
                    )}
                  </Box>

                  <Box style={{ width: "95%" }}>
                    <Typography
                      style={{
                        width: "100%",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "var(--tab-text)",
                      }}
                    >
                      {toSearchText}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Collapse
                in={openTo}
                timeout="auto"
                unmountOnExit
                sx={{ width: "100%" }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    right: "0",
                    width: "100%",
                    backgroundColor: "#fff",
                    height: "fit-content",
                    borderRadius: "0px 0px 5px 5px",
                    zIndex: "999",
                    padding: "2px 5px",
                    paddingBottom: "10px",
                    marginTop: "1px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "var(--secondary-color)",
                      zIndex: 10,
                    }}
                    backgroundColor="#fff"
                  >
                    <input
                      autoComplete="off"
                      autoFocus
                      onChange={toOnChange}
                      placeholder="Search a destination..."
                      className="customPlaceholder"
                      style={{
                        color: "var(--secondary-color)",
                        fontWeight: 400,
                        paddingLeft: "20px",
                        width: "100%",
                        height: "40px",
                        backgroundColor: "transparent",
                        border: "1px solid var(--border-color)",
                        outline: "none",
                        borderRadius: "5px",
                      }}
                    />
                  </Box>
                  <Box mt={1}>{toGetSuggetion()}</Box>
                </Box>
              </Collapse>
            </Grid>
            {/* //todo: Search Button */}
            <Grid item xs={12} textAlign="center">
              <Button
                type="submit"
                disabled={
                  faddress?.split(",")[0] === toAddress?.split(",")[0] && !click
                    ? true
                    : faddress?.split(",")[0] !== toAddress?.split(",")[0] &&
                      click
                    ? true
                    : false
                }
                className="shine-effect"
                sx={{
                  fontSize: "16px",
                  backgroundColor: "var(--secondary-color)",
                  color: "var(--white)",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "var(--primary-color)",
                    cursor: "pointer",
                  },
                  borderRadius: "125px",
                  px: 3,
                  mb: -6,
                }}
              >
                {click ? "Wait..." : "Search Now"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </ClickAwayListener>
  );
};

export default TourPackageSearchBox;
