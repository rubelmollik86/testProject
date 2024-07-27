import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import React, { useCallback, useMemo, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import SearchIcon from "@mui/icons-material/Search";
import { Calendar, DateRange } from "react-date-range";
import format from "date-fns/format";
import { styled } from "@mui/material/styles";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Swal from "sweetalert2";
import Grow from "@mui/material/Grow";
import { AiOutlineSwap } from "react-icons/ai";
import { IoIosPaperPlane } from "react-icons/io";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import "../HomeSearchBox/Roundway/Roundway.css";
import { addDays } from "date-fns";
import secureLocalStorage from "react-secure-storage";
import flightData from "../flightData";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    // outline: "2px auto rgba(19,124,189,.6)",
    outline: "2px auto var(--primary-color)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "var(--primary-color)",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#DC143C",
  },
});

function BpRadio(props) {
  return (
    <Radio
      sx={{
        "&:hover": {
          bgcolor: "transparent",
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

const GroupFareSearchBar = (tripType, iconColor, bgColor, borderColor) => {
  const data = flightData; // json data from flight Data
  const [type, setType] = React.useState("flight");
  const [value, setValue] = React.useState("return");
  const [fromSearchText, setFromSearchText] = useState(
    "Hazrat Shahjalal Intl Airport (DAC)"
  );
  const [toSearchText, setToSearchText] = useState("Cox's Bazar Airport(CXB)");

  const [departureDate, setDepartureDate] = useState(
    format(new Date(), "dd MMM yy")
  );
  const [returningDate, setReturningDate] = useState(
    format(addDays(new Date(departureDate), 3), "dd MMM yy")
  );
  const [travelDate, setTravelDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: "selection",
    },
  ]);
  const now = useRef(new Date());
  const [from, setFrom] = useState(now.current);
  const [to, setTo] = useState(addDays(now.current, 3));

  const [faddress, setfaddress] = useState("Dhaka,BANGLADESH");
  const [toAddress, setToAddress] = useState("Cox's Bazar,Bangladesh");
  const [fromSendData, setFromSendData] = useState("DAC");
  const [toSendData, setToSendData] = useState("CXB");
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infant, setInfant] = useState(0);
  const [result, setResult] = useState(1);
  const [className, setClassName] = useState("Economy");
  //  show the form data when click input field
  const initialData = [
    {
      code: "DAC",
      name: "Hazrat Shahjalal Intl Airport",
      Address: "Dhaka,BANGLADESH",
    },
    {
      code: "DXB",
      name: "Dubai Intl Airport",
      Address: "Dubai,UNITED ARAB EMIRATES",
    },
    {
      code: "CXB",
      name: "Cox's Bazar Airport",
      Address: "Cox's Bazar,Bangladesh",
    },
    {
      code: "JSR",
      name: "Jashore Airport",
      Address: "Jashore,Bangladesh",
    },
    {
      code: "BZL",
      name: "Barishal Airport",
      Address: "Barishal,Bangladesh",
    },
    {
      code: "RJH",
      name: "Shah Makhdum Airport",
      Address: "Rajshahi,Bangladesh",
    },
    {
      code: "SPD",
      name: "Saidpur Airport",
      Address: "Saidpur,Bangladesh",
    },
  ];

  const [fromSuggest, setFromSuggest] = useState(initialData);
  const [toSuggest, setToSuggest] = useState(initialData);

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

  const handleSwapBtn = () => {
    setfaddress(toAddress);
    setToAddress(faddress);
    setFromSearchText(toSearchText);
    setToSearchText(fromSearchText);
  };

  const handleClick = (e) => {
    navigate("/dashboard/groupfare");
  };

  //formOnChange Filter
  const formOnChange = (e) => {
    const searchvalue = e.target.value;
    let suggestion = [];
    if (searchvalue.length > 2) {
      suggestion = data.filter(
        (item) =>
          item.code.toLowerCase().includes(searchvalue.toLowerCase()) ||
          // item.name.toLowerCase().includes(searchvalue.toLowerCase()) ||
          item.Address.toLowerCase().includes(searchvalue.toLowerCase())
      );
      setFromSuggest(suggestion);
    } else {
      setFromSuggest(initialData);
    }
    // setFromSearchText(searchvalue);
  };

  const fromSuggestedText = (name, code, address) => {
    setFromSearchText(name + "   " + "(" + code + ")");
    setFromSuggest([]);
    setFromSendData(code);
    setfaddress(address);
    setOpenFrom(false);
    setOpenTo(true);
    setOpen(false);
  };
  //ToOnChange filter
  const toOnChange = (e) => {
    const searchvalue = e.target.value;
    let suggestion = [];
    if (searchvalue.length > 2) {
      suggestion = data.filter(
        (item) =>
          item.code.toLowerCase().includes(searchvalue.toLowerCase()) ||
          item.Address.toLowerCase().includes(searchvalue.toLowerCase())
      );
      setToSuggest(suggestion);
    } else {
      setToSuggest(initialData);
    }
    // setToSearchText(searchvalue);
  };

  const toSuggestedText = (name, code, address) => {
    setToSearchText(name + "   " + "(" + code + ")");
    setToSuggest([]);
    setToSendData(code);
    setToAddress(address);
    setOpenTo(false);
    setOpenDate(true);
  };
  //FromgetSuggetion
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
          className="box-index-oneway"
          sx={{
            maxHeight: "230px",
            overflowY: "auto",
            background: "#fff",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            "&::-webkit-scrollbar": { width: "5px" },
          }}
        >
          {fromSuggest.length !== 0 ? (
            fromSuggest.map((item, index) => {
              return (
                <Box
                  sx={{
                    paddingLeft: "20px",
                    paddingRight: "5px",
                    backgroundColor: "#fff",
                    transition: "all .5s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#D1E9FF",
                    },
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
                      fromSuggestedText(
                        ` ${item.name}`,
                        ` ${item.code} `,
                        `${item.Address}`
                      );
                    }} //suggest to display name select with multiple data pass parameter
                  >
                    <Box>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "var(--primary-color)",
                          display: "block",
                          textAlign: "left",
                          fontWeight: "500",
                        }}
                      >
                        {item.Address}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          display: "block",
                          textAlign: "left",
                          color: "#999",
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
                          display: "block",
                          textAlign: "left",
                          paddingRight: "5px",
                          color: "#999",
                          fontWeight: "600",
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
                variant="subtitle-2"
                style={{
                  color: "#DC143C",
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
          className="box-index-oneway"
          sx={{
            maxHeight: "230px",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            overflowY: "auto",
            background: "#fff",
            "&::-webkit-scrollbar": { width: "5px" },
          }}
        >
          {toSuggest.length !== 0 ? (
            toSuggest.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    paddingLeft: "20px",
                    paddingRight: "5px",
                    backgroundColor: "#fff",
                    transition: "all .5s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#D1E9FF",
                    },
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
                    onClick={() =>
                      toSuggestedText(
                        ` ${item.name}`,
                        `${item.code}`,
                        `${item.Address}`
                      )
                    } //suggest to display name select with multiple data pass parameter
                  >
                    <Box>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "var(--primary-color)",
                          display: "block",
                          textAlign: "left",
                        }}
                      >
                        {item.Address}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          display: "block",
                          color: "#999",
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
                          color: "#999",
                          fontWeight: "600",
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
                  color: "#DC143C",
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

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen((prev) => !prev);
    setOpenFrom(false);
    setOpenTo(false);
    setOpenDate(false);
    setOpenReturnDate(false);
  };
  const handleClickAway = () => {
    setOpenFrom(false);
    setOpenTo(false);
    setOpenDate(false);
    setOpenReturnDate(false);
    setOpen(false);
    setResult(adultCount + childCount + infant);
  };

  const handleClose = () => {
    setOpen(false);
    setResult(adultCount + childCount + infant);
  };

  function adultInclement(e) {
    e.preventDefault();
    if (adultCount < 9 - (childCount + infant)) {
      setAdultCount(adultCount + 1);
    }
  }

  function adultDecrement(e) {
    e.preventDefault();
    if (adultCount > 1) {
      setAdultCount(adultCount - 1);
      if (infant === adultCount) {
        if (infant > 1) {
          setInfant(infant - 1);
        }
      }
    }
  }

  function adult2Inclement(e) {
    e.preventDefault();
    if (childCount < 9 - (adultCount + infant)) {
      setChildCount(childCount + 1);
    }
  }

  function adult2Decrement(e) {
    e.preventDefault();
    if (childCount > 0) {
      setChildCount(childCount - 1);
    }
  }

  function infantIncrement(e) {
    e.preventDefault();
    if (infant < 9 - (adultCount + childCount)) {
      if (infant < adultCount) {
        setInfant(infant + 1);
      }
    }
  }

  function infantDecrement(e) {
    e.preventDefault();
    if (infant > 0) {
      setInfant(infant - 1);
    }
  }
  // Search Flight button click

  async function handleSearch(e) {
    e.preventDefault();
    // show notification if user is not found
    navigate("/dashboard/groupfare");
  }

  const handleSelect = useCallback(({ selection: { startDate, endDate } }) => {
    setFrom(startDate);
    setTo(startDate);
    if (startDate !== endDate) {
      setTo(endDate);
      setOpenDate(false);
      setTimeout(() => setOpen(true), 200);
    }
  });

  const ranges = useMemo(() => {
    return [
      {
        startDate: from,
        endDate: to,
        key: "selection",
      },
    ];
  }, [from, to]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <>
        {/* <Box style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          style={{
            width: "80%",
            textAlign: "justify",
            color: "var(--primary-color)",
            fontSize: "20px",
          }}
        >
          Group Fare Booking Is Not Available Now. Please Contact us at{" "}
          <span style={{ color: "#dc143c", fontSize: "20px" }}>
            support@flyfarint.com or 01755-572099, 09606912912.
          </span>{" "}
          for Group Fare Booking. Thank You for Stay Connected.
        </Typography>
      </Box> */}
        <Box className="search-body-trip" sx={{ position: "relative" }}>
          <form onSubmit={handleSearch}>
            <Grid
              sx={{ justifyContent: "space-between", mt: "20px" }}
              container
              rowSpacing={0}
              columnSpacing={0}
            >
              <Grid
                item
                className="dashboard-main-input-parent"
                xs={12}
                sm={12}
                md={6}
                lg={3}
                style={{
                  position: "relative",
                  height: "82px",
                  borderRight: "1px solid #DEDEDE",
                }}
              >
                <Box
                  className="update-search1"
                  bgcolor="#fff"
                  onClick={() => {
                    setOpenFrom((prev) => !prev);
                    setOpenTo(false);
                    setOpenDate(false);
                    setOpenReturnDate(false);
                    setOpen(false);
                  }}
                >
                  <Box>
                    <p>From</p>
                    {faddress ? (
                      <span className="addressTitle">
                        {" "}
                        {faddress?.split(",")[0]}
                      </span>
                    ) : (
                      <span className="addressTitle">Dhaka</span>
                    )}
                  </Box>
                  <Box
                    style={{
                      lineHeight: "0px",
                    }}
                  >
                    <input
                      autoFocus
                      required
                      readOnly
                      value={fromSearchText}
                      placeholder="Hazrat Shahjalal International Airport"
                    />
                  </Box>
                </Box>
                {/* <Grow in={openFrom}> */}
                {openFrom && (
                  <Box
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "0",
                      width: "100%",
                      backgroundColor: "#fff",
                      height: "fit-content",
                      marginTop: "-5px",
                      borderRadius: "5px",

                      zIndex: "10",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // paddingLeft: "10px",
                        color: "var(--primary-color)",
                        zIndex: 10,
                      }}
                      backgroundColor="#fff"
                      mt={"-55px"}
                    >
                      {/* <SearchIcon /> */}
                      <input
                        autoFocus
                        autoComplete="off"
                        onChange={formOnChange}
                        placeholder="Search a city..."
                        className="var(--gray-text-color)Placeholder"
                        style={{
                          color: "#DC143C",
                          fontWeight: 500,
                          paddingLeft: "20px",
                          width: "100%",
                          height: "40px",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      />
                    </Box>
                    <Box width={"full"}>{fromGetSuggetion()}</Box>
                  </Box>
                )}
                {/* </Grow> */}
                <Box
                  className="swap-btn2"
                  onClick={handleSwapBtn}
                  style={{
                    display: {
                      lg: "block",
                      md: "block",
                      sm: "none",
                      xs: "none",
                    },
                    zIndex: 11,
                    borderRadius: "5px",
                  }}
                >
                  <AiOutlineSwap style={{ color: "#fff", fontSize: "20px" }} />
                </Box>
              </Grid>

              <Grid
                className="dashboard-main-input-parent"
                item
                xs={12}
                sm={12}
                md={6}
                lg={3}
                style={{
                  position: "relative",
                  height: "82px",
                  borderRight: "1px solid #DEDEDE",
                }}
              >
                <Box
                  className="update-search1"
                  bgcolor="#fff"
                  onClick={() => {
                    setOpenTo((prev) => !prev);
                    setOpenFrom(false);
                    setOpenDate(false);
                    setOpenReturnDate(false);
                    setOpen(false);
                  }}
                >
                  <Box style={{ position: "relative" }}>
                    <p>To</p>

                    <span className="addressTitle">
                      {toAddress?.split(",")[0]}
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
                    </span>
                  </Box>
                  <Box
                    style={{
                      lineHeight: "0px",
                    }}
                  >
                    <input
                      required
                      readOnly
                      value={toSearchText}
                      placeholder="Dubai International Airport"
                    />
                  </Box>
                </Box>
                {/* <Grow in={openTo}> */}
                {openTo && (
                  <Box
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "0",
                      width: "100%",
                      backgroundColor: "#fff",
                      height: "fit-content",
                      marginTop: "-5px",
                      borderRadius: "5px",
                      zIndex: "10",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // paddingLeft: "12px",
                        color: "var(--primary-color)",
                        zIndex: 10,
                      }}
                      backgroundColor="#fff"
                      mt={"-55px"}
                    >
                      {/* <SearchIcon /> */}
                      <input
                        autoComplete="off"
                        autoFocus
                        onChange={toOnChange}
                        className="var(--gray-text-color)Placeholder"
                        placeholder="Search a city..."
                        style={{
                          color: "#DC143C",
                          fontWeight: 500,
                          paddingLeft: "20px",
                          width: "100%",
                          height: "40px",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      />
                    </Box>
                    <Box>{toGetSuggetion()}</Box>
                  </Box>
                )}
                {/* </Grow> */}
              </Grid>

              <Grid
                className="dashboard-main-input-parent"
                item
                xs={12}
                sm={12}
                md={6}
                lg={3}
                style={{
                  position: "relative",
                  height: "82px",
                  borderRight: "1px solid #DEDEDE",
                }}
              >
                <Box className="update-search1" bgcolor="#fff">
                  <Box
                    className="dashboard-main-input date12"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginTop: "0px",
                      transition: "all 0.5s ease-in-out",
                    }}
                    onClick={() => {
                      setOpenDate((prev) => !prev);
                      setOpenReturnDate(false);
                      setOpenFrom(false);
                      setOpenTo(false);
                      setOpen(false);
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                        width: "50%",
                      }}
                    >
                      <p>Range From &#10507;</p>

                      {/* <span className="addressTitle">{`${departureDate}`}</span> */}
                      <span className="addressTitle">{`${format(
                        new Date(from),
                        "dd MMM yy"
                      )}`}</span>

                      <Typography
                        variant="subtitle2"
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "11px",
                        }}
                      >
                        {/* {`${format(new Date(departureDate), "EEEE")}`} */}
                        {`${format(new Date(from), "EEEE")}`}
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                        width: "50%",
                      }}
                    >
                      <p>Range To &#10507;</p>

                      {/* <span className="addressTitle">{`${returningDate}`}</span> */}
                      <span className="addressTitle">{`${format(
                        new Date(to),
                        "dd MMM yy"
                      )}`}</span>
                      <Typography
                        variant="subtitle2"
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "11px",
                        }}
                      >
                        {`${format(new Date(to), "EEEE")}`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {/* <Grow in={openDate}> */}
                {openDate && (
                  <Box>
                    <Box
                      sx={{
                        border: "2px solid red",
                        display: {
                          lg: "block",
                          md: "block",
                          sm: "none",
                          xs: "none",
                        },
                      }}
                    >
                      <DateRange
                        onChange={handleSelect}
                        direction="horizontal"
                        moveRangeOnFirstSelection={false}
                        retainEndDateOnFirstSelection={false}
                        months={2}
                        ranges={ranges}
                        rangeColors={["#DC143C"]}
                        minDate={new Date()}
                        className="new-return-date-range"
                      />
                    </Box>
                    <Box
                      sx={{
                        border: "2px solid red",
                        display: {
                          lg: "none",
                          md: "none",
                          sm: "block",
                          xs: "block",
                        },
                      }}
                    >
                      <DateRange
                        onChange={handleSelect}
                        direction="vertical"
                        moveRangeOnFirstSelection={false}
                        retainEndDateOnFirstSelection={false}
                        months={2}
                        ranges={ranges}
                        rangeColors={["#DC143C"]}
                        minDate={new Date()}
                        className="new-return-date-mobile"
                      />
                    </Box>
                  </Box>
                )}
                {/* </Grow> */}
              </Grid>

              <Grid
                className="dashboard-main-input-parent "
                item
                xs={12}
                sm={12}
                md={4}
                lg={2}
                style={{
                  height: "82px",
                }}
              >
                <Box className="update-search1" bgcolor="#fff">
                  <Box className="traveler-count" onClick={handleClickOpen}>
                    <Button
                      sx={{
                        justifyContent: "flex-start",
                        color: "#000",
                        display: "block",
                      }}
                    >
                      <p>Travelers & Booking Class</p>
                      <span> {result} Traveler</span>
                      <Typography
                        variant="subtitle2"
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "11px",
                          lineHeight: "10px",
                        }}
                      >
                        {className}
                      </Typography>
                    </Button>
                  </Box>
                  {/* {open && ( */}
                  <Grow in={open}>
                    <Box>
                      <Box
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        className="dialog-box"
                        sx={{
                          backgroundColor: "#fff",
                          padding: "5px 10px 20px 10px",
                          overflow: "hidden",
                          width: "285px",
                        }}
                      >
                        <Box className="passenger-h3">
                          <h3>Passenger</h3>
                        </Box>
                        <Box className="dialog-flex">
                          <Box
                            sx={{
                              display: "flex",
                              gap: "20px",
                              alignItems: "center",
                            }}
                            className="dialog-content"
                          >
                            <Box className="dialog-content">
                              <h5>{adultCount}</h5>
                            </Box>
                            <Box>
                              <h5>Adult</h5>
                              <span style={{ fontSize: "13px" }}>12+ yrs</span>
                            </Box>
                          </Box>
                          <Box className="incre-decre">
                            <button onClick={adultDecrement}>-</button>
                            <button onClick={adultInclement}>+</button>
                          </Box>
                        </Box>

                        <Box className="dialog-flex-child">
                          <Box
                            sx={{
                              display: "flex",
                              gap: "20px",
                              alignItems: "center",
                            }}
                            className="dialog-content"
                          >
                            <Box className="dialog-content">
                              <h5>{childCount}</h5>
                            </Box>
                            <Box>
                              <h5>Children</h5>
                              <span style={{ fontSize: "13px" }}>
                                2- less than 12 yrs
                              </span>
                            </Box>
                          </Box>
                          <Box className="incre-decre">
                            <button onClick={adult2Decrement}>-</button>

                            <button onClick={adult2Inclement}>+</button>
                          </Box>
                        </Box>

                        <Box className="dialog-flex-infant">
                          <Box
                            sx={{
                              display: "flex",
                              gap: "20px",
                              alignItems: "center",
                            }}
                            className="dialog-content"
                          >
                            <Box className="dialog-content">
                              <h5>{infant}</h5>
                            </Box>
                            <Box>
                              <h5>Infant</h5>
                              <span style={{ fontSize: "13px" }}>
                                0 - 23 month{" "}
                              </span>
                            </Box>
                          </Box>
                          <Box className="incre-decre">
                            <button onClick={infantDecrement}>-</button>

                            <button onClick={infantIncrement}>+</button>
                          </Box>
                        </Box>
                        <Box className="hr-line"></Box>
                        <Box className="new-passengerBtn">
                          <Box>
                            <FormControl>
                              <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={className}
                                row
                                onChange={handleClassName}
                              >
                                <FormControlLabel
                                  value="Economy"
                                  control={<BpRadio />}
                                  label="Economy"
                                  sx={{
                                    mr: "21px",
                                  }}
                                />
                                <FormControlLabel
                                  value="Business"
                                  control={<BpRadio />}
                                  label="Business"
                                />
                                <FormControlLabel
                                  value="First Class"
                                  control={<BpRadio />}
                                  label="First Class"
                                />
                                <FormControlLabel
                                  value="Premium Economy "
                                  control={<BpRadio />}
                                  label="Premium Economy"
                                />
                              </RadioGroup>
                            </FormControl>
                          </Box>
                          <Box position={"relative"}>
                            <Button
                              id="passengerSaveBtn"
                              size="small"
                              variant="contained"
                              color="error"
                              onClick={handleClose}
                              className="shine-effect"
                            >
                              DONE
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Grow>
                  {/* )} */}
                </Box>
              </Grid>
              <Grid
                lg={1}
                md={2}
                sm={12}
                xs={12}
                justifyContent="center"
                alignItems={"center"}
              >
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<IoIosPaperPlane />}
                    className="shine-effect"
                    sx={{
                      height: "100%",
                      width: {
                        lg: "90%",
                        md: "90%",
                        sm: "100%",
                        xs: "100%",
                      },
                      mt: { lg: "0px", md: "0px", sm: "10px", xs: "10px" },
                      backgroundColor: "#dc143c",
                      color: "#fff",
                      textTransform: "capitalize",
                      display: "inline-block",
                      position: "relative",
                      "&:hover": {
                        backgroundColor: "#dc143c",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Box>Search</Box>
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ mt: "10px" }}
          >
            <Grid item>
              <Button
                onClick={() => {
                  navigate("/dashboard/groupfare");
                }}
                style={{
                  backgroundColor: "#dc143c",
                  color: "#fff",
                  padding: "8px 50px ",
                }}
              >
                See All Group Fare
              </Button>
            </Grid>
          </Grid>
        </Box>
      </>
    </ClickAwayListener>
  );
};

export default GroupFareSearchBar;
