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
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import format from "date-fns/format";
import Swal from "sweetalert2";
import { AiOutlineSwap } from "react-icons/ai";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { IoIosPaperPlane } from "react-icons/io";
import { Notify } from "notiflix/build/notiflix-notify-aio";
// import "../Dashboard/DashboardMain/DashboardMain.css";
// import "../HomeSearchBox/NewRoundTrip/NewRoundTrip.css";
import { addDays } from "date-fns";
import CountryList from "../../CountryList";
import secureLocalStorage from "react-secure-storage";
import { Calendar } from "react-date-range";

const HotelSearchBox = () => {
  const data = CountryList; // json data from flight Data
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
  const [fromSendData, setFromSendData] = useState("BD");
  const [toSendData, setToSendData] = useState("");
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infant, setInfant] = useState(0);
  const [result, setResult] = useState(1);
  const [className, setClassName] = useState("Economy");
  //  show the form data when click input field
  const initialData = [
    { name: "Bangladesh", code: "BD" },
    { name: "China", code: "CN" },
    { name: "India", code: "IN" },
    { name: "Mexico", code: "MX" },
    { name: "Nepal", code: "NP" },
    { name: "Saudi Arabia", code: "SA" },
    { name: "Spain", code: "ES" },
    { name: "Sri Lanka", code: "LK" },
  ];

  const [fromSuggest, setFromSuggest] = useState(initialData);
  const [toSuggest, setToSuggest] = useState(initialData);
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
  // handle click function
  const handleClickAwayCalender = () => {
    setOpenDate(false);
  };

  const handleClassName = (event) => {
    setClassName(event.target.value);
  };

  //formOnChange Filter
  const formOnChange = (e) => {
    const searchvalue = e.target.value;
    let suggestion = [];
    if (searchvalue.length > 2) {
      suggestion = data?.filter(
        (item) =>
          item.code.toLowerCase().includes(searchvalue.toLowerCase()) ||
          item.name.toLowerCase().includes(searchvalue.toLowerCase())
      );
      setFromSuggest(suggestion);
    } else {
      setFromSuggest(initialData);
    }
    // setFromSearchText(searchvalue);
  };

  const fromSuggestedText = (name, code, address) => {
    setFromSearchText(`${name} (${code})`);
    setFromSuggest([]);
    setFromSendData(code);
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
          zIndex: "100",
        }}
      >
        <Box
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            maxHeight: "230px",
            overflowY: "auto",
            background: "#fff",
            "&::-webkit-scrollbar": { width: "0px" },
          }}
        >
          {fromSuggest.length !== 0 ? (
            fromSuggest.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    paddingLeft: "10px",
                    paddingRight: "0px",
                    backgroundColor: "var( --secondary-color)",
                    transition: "all .5s ease-in-out",
                    "&:hover": {
                      backgroundColor: "var(--primary-color)",
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
                      fromSuggestedText(` ${item.name}`, ` ${item.code} `);
                    }} //suggest to display name select with multiple data pass parameter
                  >
                    <Box>
                      <Typography
                        className="address"
                        sx={{
                          fontSize: "12px",
                          color: "var(--primary-color)",
                          display: "block",
                          textAlign: "left",
                          fontWeight: 400,
                        }}
                      >
                        {item.Address}
                      </Typography>
                      <span
                        style={{
                          fontSize: "11px",
                          display: "block",
                          color: "var(--white)",
                          textAlign: "left",
                        }}
                      >
                        {item.name}
                      </span>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          paddingRight: "10px",
                          display: "block",
                          textAlign: "left",
                          color: "#fff",
                          fontWeight: 400,
                        }}
                      >
                        {item.code}
                      </span>
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

  // Date Pick
  const handleSelect = (date) => {
    setFrom(date);
    setOpenDate(false);
    setOpenTo(true);
    // setTimeout(() => setOpenDate(true), 200);
  };

  // Wher .....Locations
  const toOnChange = (e) => {
    const searchvalue = e.target.value;
    let suggestion = [];
    if (searchvalue.length > 2) {
      suggestion = data.filter(
        (item) =>
          item.code.toLowerCase().includes(searchvalue.toLowerCase()) ||
          item.name.toLowerCase().includes(searchvalue.toLowerCase())
      );
      setToSuggest(suggestion);
    } else {
      setToSuggest(initialData);
    }
  };

  const toSuggestedText = (name, code, address) => {
    setToSendData(code);
    setToSearchText(`${name} (${code})`);
    setToSuggest([]);
    setToAddress(name);
    setOpenTo(true);
    setOpenDate(false);
    setTimeout(() => setOpenDate(true), 200);
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
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            maxHeight: "230px",
            overflowY: "auto",
            background: "#fff",
            "&::-webkit-scrollbar": { width: "0px" },
          }}
        >
          {toSuggest.length !== 0 ? (
            toSuggest.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    paddingLeft: "10px",
                    paddingRight: "0px",
                    backgroundColor: "var( --secondary-color)",
                    transition: "all .5s ease-in-out",
                    "&:hover": {
                      backgroundColor: "var(--primary-color)",
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
                      toSuggestedText(` ${item.name}`, ` ${item.code} `);
                    }}
                    //suggest to display name select with multiple data pass parameter
                  >
                    <Box>
                      <Typography
                        className="address"
                        sx={{
                          fontSize: "12px",
                          color: "var(--primary-color)",
                          display: "block",
                          textAlign: "left",
                          fontWeight: 400,
                        }}
                      >
                        {item.Address}
                      </Typography>
                      <span
                        style={{
                          fontSize: "11px",
                          display: "block",
                          color: "var(--white)",
                          textAlign: "left",
                        }}
                      >
                        {item.name}
                      </span>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          paddingRight: "10px",
                          display: "block",
                          textAlign: "left",
                          color: "#fff",
                          fontWeight: 400,
                        }}
                      >
                        {item.code}
                      </span>
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

  async function handleSearch(e) {
    e.preventDefault();
    // show notification if user is not found
    navigate("/dashboard/tourpackages");
  }

  const [click, setClick] = useState(false);

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
                border: "1px solid #DEDEDE",
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
                    <FlightTakeoffIcon style={{ fontSize: "20px" }} />
                  </Box>
                </Box>
                <Box sx={{ width: "100%", height: "100%", pl: 1 }}>
                  <Box style={{ position: "relative" }}>
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: { xs: "14px", sm: "16px" },
                        paddingTop: "1.5px",
                      }}
                    >
                      Destination Type
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
                    backgroundColor: "var(--secondary-color)",
                    height: "fit-content",
                    // borderBottom: "1px solid var(  --gray)",
                    // borderLeft: "1px solid var(  --gray)",
                    // borderRight: "2px solid var(  --gray)",
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
                    }}
                    backgroundColor="#fff"
                  >
                    <input
                      autoComplete="off"
                      autoFocus
                      onChange={formOnChange}
                      placeholder="Search a airport..."
                      className="customPlaceholder"
                      style={{
                        color: "var(--secondary-color)",
                        fontWeight: 400,
                        paddingLeft: "20px",
                        width: "100%",
                        height: "40px",
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                      }}
                    />
                  </Box>
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
                // padding: "5px",
                height: "60px",
              }}
            >
              <Box
                style={{
                  border: "1px solid #DEDEDE",
                  borderRadius: "10px",
                  height: "100%",
                  width: "100%",
                }}
                onClick={() => {
                  setTimeout(() => setOpenDate((prev) => !prev), 200);
                  setOpenFrom(false);
                  setOpenTo(false);
                  window.scrollTo({
                    top: 200,
                    behavior: "smooth",
                  });
                  // setOpen(false);
                }}
              >
                <Stack direction="row" alignItems="center" height="100%">
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
                  <Box cursor="pointer" pl={{ xs: 0.5, sm: 1.5 }}>
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: { xs: "14px", sm: "16px" },
                      }}
                    >
                      Check in & Out Date
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "var(--tab-text)",
                      }}
                    >{`${format(new Date(from), "dd MMM yy")}`}</Typography>
                  </Box>
                </Stack>
              </Box>
              {openDate && (
                <Box>
                  <Calendar
                    color="var(--primary-color)"
                    date={new Date(from)}
                    onChange={handleSelect}
                    months={1}
                    direction="horizontal"
                    minDate={new Date()}
                    className={"tour-calendar"}
                  />
                </Box>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={3.5}
              lg={3.7}
              style={{
                position: "relative",
                border: "1px solid #DEDEDE",
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
                    <FlightTakeoffIcon style={{ fontSize: "20px" }} />
                  </Box>
                </Box>
                <Box sx={{ width: "100%", height: "100%", pl: 1 }}>
                  <Box style={{ position: "relative" }}>
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: { xs: "14px", sm: "16px" },
                        paddingTop: "1.5px",
                      }}
                    >
                      Passenger ?
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
                    backgroundColor: "var(--secondary-color)",
                    height: "fit-content",
                    // borderBottom: "1px solid var(  --gray)",
                    // borderLeft: "1px solid var(  --gray)",
                    // borderRight: "2px solid var(  --gray)",
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
                    }}
                    backgroundColor="#fff"
                  >
                    <input
                      autoComplete="off"
                      autoFocus
                      onChange={toOnChange}
                      placeholder="Search a airport..."
                      className="customPlaceholder"
                      style={{
                        color: "var(--secondary-color)",
                        fontWeight: 400,
                        paddingLeft: "20px",
                        width: "100%",
                        height: "40px",
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                      }}
                    />
                  </Box>
                  <Box>{toGetSuggetion()}</Box>
                </Box>
              </Collapse>
            </Grid>

            {/* //todo: Search Button */}
            <Grid item xs={12} textAlign="center">
              <Button
                type="submit"
                // disabled={
                //   faddress?.split(",")[0] === toAddress?.split(",")[0] && !click
                //     ? true
                //     : faddress?.split(",")[0] !== toAddress?.split(",")[0] &&
                //       click
                //     ? true
                //     : false
                // }
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
                  px: 5,
                  mb: -6,
                }}
                disabled
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

export default HotelSearchBox;
