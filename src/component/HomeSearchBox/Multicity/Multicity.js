import {
  Box,
  ClickAwayListener,
  Grid,
  Typography,
  Button,
  Collapse,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays, format } from "date-fns";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import secureLocalStorage from "react-secure-storage";
import { useEffect } from "react";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import GroupsIcon from "@mui/icons-material/Groups";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import flightData from "../../flightData";

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
    outline: "2px auto var(--secondary-color)",
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
    backgroundImage:
      "radial-gradient(var(--white),var(--white) 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "var(--secondary-color)",
  },
});

// Inspired by blueprintjs
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
const Multicity = ({
  tripType,
  faddress,
  setfaddress,
  toAddress,
  setToAddress,
  fromSearchText,
  setFromSearchText,
  fromSendData,
  setFromSendData,
  toSendData,
  setToSendData,
  toSearchText,
  setToSearchText,
  departureDate,
  setDepartureDate,
  setValue,
  adultCount,
  setAdultCount,
  childCount,
  setChildCount,
  infant,
  setInfant,
  result,
  setResult,
  className,
  handleClassName,
  from,
  setFrom,
  to,
  setTo,
  setChangeState,
  changeState,
  changeFrom,
  setChangeFrom,
  searchData,
  setSearchData,
}) => {
  const data = flightData; // json data from flight Data
  const navigate = useNavigate();
  // todo: multiCity search Body

  const addCity = () => {
    const tempSearchData = [...searchData.segments];
    tempSearchData.push({
      id: tempSearchData.length,
      DepFrom: tempSearchData[tempSearchData.length - 1].ArrTo,
      depFromText: tempSearchData[tempSearchData.length - 1].arrToText,
      ArrTo: "DXB",
      arrToText: "Dubai Intl Airport (DXB)",
      openTo: false,
      Date: new Date().toLocaleDateString("sv"),
      openDate: false,
      open: false,
    });
    setSearchData({
      ...searchData,
      segments: tempSearchData,
      CityCount: tempSearchData.length,
    });
  };

  const removeCity = (id) => {
    const tempSearchData = searchData.segments.filter((item) => item.id !== id);
    setSearchData({
      ...searchData,
      segments: tempSearchData,
      CityCount: tempSearchData.length,
    });
  };
  // todo: end multiCity search Body

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
  //todo: users section
  const [users, setUsers] = useState("");
  useEffect(() => {
    const users = secureLocalStorage.getItem("user-info");
    if (users) {
      setUsers(users);
    }
  }, []);
  // todo: end of users section
  //todo: is Click state
  const [click, setClick] = useState(false);
  //todo: end of click state
  const [fromSuggest, setFromSuggest] = useState(initialData);
  const [toSuggest, setToSuggest] = useState(initialData);

  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState(false);

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  // Opens the dialog when the user clicks.
  const handleClickOpen = (index, segment) => {
    const tempSearchData = [...searchData.segments];
    tempSearchData[index] = {
      ...tempSearchData[index],
      openTo: false,
      openDate: false,
      open: !segment.open,
    };
    setSearchData({ ...searchData, segments: tempSearchData });
    setOpen((prev) => !prev);
    setOpenFrom(false);
    setOpenTo(false);
    setOpenDate(false);
  };

  // Closes the child process.
  const handleClose = (index) => {
    const tempSearchData = [...searchData.segments];
    tempSearchData[index] = {
      ...tempSearchData[index],
      openTo: false,
      openDate: false,
      open: false,
    };
    setSearchData({ ...searchData, segments: tempSearchData });
    setOpen(false);
    setOpenFrom(false);
    setOpenTo(false);
    setOpenDate(false);
    setResult(adultCount + childCount + infant);
  };

  // Sets the number of children.
  function adultInclement(e) {
    e.preventDefault();
    if (adultCount < 9 - (childCount + infant)) {
      setAdultCount(adultCount + 1);
      setSearchData({ ...searchData, adultCount: adultCount + 1 });
    }
  }

  // Decrement the count of children.
  function adultDecrement(e) {
    e.preventDefault();
    if (adultCount > 1) {
      setAdultCount(adultCount - 1);
      setSearchData({ ...searchData, adultCount: adultCount - 1 });
      if (infant === adultCount) {
        if (infant > 1) {
          setInfant(infant - 1);
          setSearchData({ ...searchData, infant: infant - 1 });
        }
      }
    }
  }

  function childInclement(e) {
    e.preventDefault();
    if (childCount < 9 - (adultCount + infant)) {
      setChildCount(childCount + 1);
      setSearchData({ ...searchData, childCount: childCount + 1 });
    }
  }

  function childDecrement(e) {
    e.preventDefault();
    if (childCount > 0) {
      setChildCount(childCount - 1);
      setSearchData({ ...searchData, childCount: childCount - 1 });
    }
  }

  // Increment the default value if the value is not a child.
  function infantIncrement(e) {
    e.preventDefault();
    if (infant < 9 - (adultCount + childCount)) {
      if (infant < adultCount) {
        setInfant(infant + 1);
        setSearchData({ ...searchData, infantCount: infant + 1 });
      }
    }
  }

  // Decrement the infant by 1.
  function infantDecrement(e) {
    e.preventDefault();
    if (infant > 0) {
      setInfant(infant - 1);
      setSearchData({ ...searchData, infantCount: infant - 1 });
    }
  }

  const formOnChange = (e) => {
    setOpen(false);
    const searchvalue = e.target.value;

    if (searchvalue.length > 2) {
      const suggestion = data.filter((item) =>
        item.code.toLowerCase().includes(searchvalue.toLowerCase())
      );
      setFromSuggest(suggestion);
      if (suggestion.length === 0) {
        const suggestion = data.filter(
          (item) =>
            item.code.toLowerCase().includes(searchvalue.toLowerCase()) ||
            item.Address.toLowerCase().includes(searchvalue.toLowerCase())
        );
        setFromSuggest(suggestion);
      }
    } else {
      setFromSuggest(initialData);
    }
  };

  const fromGetSuggetion = (index) => {
    const fromSuggestedText = (name, code, address) => {
      const tempSearchData = [...searchData.segments];
      tempSearchData[index] = {
        ...tempSearchData[index],
        DepFrom: code.trim(),
        depFromText: `${name} (${code.trim()})`,
        openFrom: false,
        openTo: true,
      };
      setSearchData({ ...searchData, segments: tempSearchData });
      setFromSendData(code);
      setFromSearchText(`${name} (${code})`);
      setFromSuggest([]);
      setfaddress(address);
      setOpen(false);
      setOpenFrom(false);
      setOpenTo(true);
    };
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
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            "&::-webkit-scrollbar": { width: "5px" },
          }}
        >
          {fromSuggest.length !== 0 ? (
            fromSuggest.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    paddingLeft: "20px",
                    paddingRight: "10px",
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
                      fromSuggestedText(
                        ` ${item.name}`,
                        ` ${item.code} `,
                        `${item.Address}`
                      );
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
                          fontWeight: "500",
                        }}
                      >
                        {item.Address}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "11px",
                          display: "block",
                          textAlign: "left",
                          color: "var(--white)",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "13px",
                          display: "block",
                          textAlign: "left",
                          paddingRight: "5px",
                          color: "#999",
                          fontWeight: 400,
                        }}
                      >
                        {item.code}
                      </Typography>
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
  const toOnChange = (e) => {
    const searchvalue = e.target.value;
    if (searchvalue.length > 2) {
      const suggestion = data.filter((item) =>
        item.code.toLowerCase().includes(searchvalue.toLowerCase())
      );
      setToSuggest(suggestion);
      if (suggestion.length === 0) {
        const suggestion = data.filter(
          (item) =>
            item.code.toLowerCase().includes(searchvalue.toLowerCase()) ||
            item.Address.toLowerCase().includes(searchvalue.toLowerCase())
        );
        setToSuggest(suggestion);
      }
    } else {
      setToSuggest(initialData);
    }
  };
  const toGetSuggetion = (index) => {
    const toSuggestedText = (name, code, address) => {
      const tempSearchData = [...searchData.segments];
      if (index === tempSearchData.length - 1) {
        tempSearchData[index] = {
          ...tempSearchData[index],
          ArrTo: code.trim(),
          arrToText: `${name} (${code.trim()})`,
          openFrom: false,
          openTo: false,
          openDate: true,
        };
      } else {
        tempSearchData[index] = {
          ...tempSearchData[index],
          ArrTo: code.trim(),
          arrToText: `${name} (${code.trim()})`,
          openFrom: false,
          openTo: false,
          openDate: true,
        };
        tempSearchData[index + 1] = {
          ...tempSearchData[index + 1],
          DepFrom: code.trim(),
          depFromText: `${name} (${code.trim()})`,
        };
      }
      setSearchData({ ...searchData, segments: tempSearchData });
      setToSendData(code);
      setToSearchText(`${name} (${code})`);
      setToSuggest([]);
      setToAddress(address);
      setOpenTo(false);
      setTimeout(() => setOpenDate(true), 200);
    };
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
                    onClick={() =>
                      toSuggestedText(
                        ` ${item.name}`,
                        `${item.code}`,
                        `${item.Address}`
                      )
                    } //suggest to display name select with multiple data pass parameter
                  >
                    <Box>
                      <Typography
                        className="address"
                        sx={{
                          fontSize: "12px",
                          color: "var(--primary-color)",
                          display: "block",
                          textAlign: "left",
                          fontWeight: "500",
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
                          color: "#999",
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

  async function handleSearch(e) {
    e.preventDefault();
    //todo: setChangeState for reTrigger useEffect
    setChangeState((prev) => !prev);
    //todo: setChangeState for reTrigger useEffect end

    // todo: setClick to true to start loader
    setClick(true);
    secureLocalStorage.setItem("multi-city", {
      faddress,
      toAddress,
      fromSearchText,
      toSearchText,
      departureDate: format(new Date(from), "dd MMM yy"),
      adultCount,
      childCount,
      infant,
      tripType,
      fromSendData,
      toSendData,
      className,
      searchData,
      changeState,
    });
    let body = JSON.stringify({
      agentid: users?.user?.agentId || "FFA1926",
      subagentid: users?.user?.subagentId,
      searchtype: tripType,
      DepFrom: searchData.segments.map((item) => item.DepFrom).join("\r\n"),
      ArrTo: searchData.segments.map((item) => item.ArrTo).join("\r\n"),
      depTime: searchData.segments.map((item) => item.Date).join("\r\n"),
      returnTime: null,
      adult: adultCount,
      child: childCount,
      infant: infant,
      class: className,
    });
    await fetch(
      "https://api.flyfarint.com/v.1.0.0/SearchHistory/addHistory.php",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          navigate("/multicityaftersearch", {
            state: {
              faddress,
              toAddress,
              fromSearchText,
              toSearchText,
              departureDate: format(new Date(from), "dd MMM yy"),
              adultCount,
              childCount,
              infant,
              tripType,
              fromSendData,
              toSendData,
              className,
              searchData,
              changeState,
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            confirmButtonText: "Search Again...",
          }).then(function () {
            navigate("/");
          });
        }
      });
  }

  const handleSelect = (date, index) => {
    const tempSearchData = [...searchData.segments];
    tempSearchData[index] = {
      ...tempSearchData[index],
      Date: new Date(date).toLocaleDateString("sv"),
      openDate: false,
      openFrom: false,
      openTo: false,
    };
    setSearchData({ ...searchData, segments: tempSearchData });
    setFrom(date);
    setTo(addDays(date, 3));
    setOpenDate(false);
    index === 0 && setOpen(true);
  };

  const handleClickAway = (index) => {
    setOpenFrom(false);
    setOpenTo(false);
    setOpenDate(false);
    setOpen(false);
    setResult(adultCount + childCount + infant);
    const tempSegment = [...searchData.segments];
    tempSegment[index] = {
      ...tempSegment[index],
      openFrom: false,
      openTo: false,
      openDate: false,
      open: false,
    };
    setSearchData({
      ...searchData,
      segments: tempSegment,
    });
  };

  return (
    <Box style={{ position: "relative" }}>
      <form onSubmit={handleSearch}>
        <Grid container rowGap={1}>
          {searchData?.segments?.map((segment, index, arr) => (
            <ClickAwayListener onClickAway={() => handleClickAway(index)}>
              <Grid
                key={index}
                sx={{
                  height: "fit-content",
                  width: "100%",
                  position: "relative",
                  mt: { lg: "0px", md: "0px", sm: "5px", xs: "5px" },
                }}
                container
                alignItems="center"
                rowSpacing={{ lg: 0, md: 1, sm: 1, xs: 1 }}
                columnSpacing={{ lg: 2, md: 1, sm: 1, xs: 1 }}
              >
                <Grid
                  item
                  xs={12}
                  lg={6}
                  alignItems="center"
                  // style={{
                  //   border: "1px solid rgba(var(--third-rgb),.3)",
                  //   borderRadius: "10px",
                  //   height: "100%",
                  // }}
                >
                  <Grid
                    container
                    sx={{
                      borderRadius: "10px",
                      height: "fit-content",
                      width: "100%",
                    }}
                    rowGap={{ lg: 0, md: 0, sm: 1, xs: 1 }}
                  >
                    {/* //todo: Departure City section */}
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      sx={{
                        position: "relative",
                        padding: "5px",
                        height: "82px",
                        border: "1px solid var(--border-color)",
                        borderRadius: {
                          xs: "10px",
                          sm: "10px",
                          md: "10px 0 0 10px",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                          width: "100%",
                          height: "100%",
                        }}
                        onClick={() => {
                          const tempSegment = [...searchData.segments];
                          tempSegment[index] = {
                            ...tempSegment[index],
                            openFrom: !segment.openFrom,
                            openTo: false,
                            openDate: false,
                          };
                          //console.log(tempSegment);
                          setSearchData({
                            ...searchData,
                            segments: tempSegment,
                          });
                          setOpenFrom((prev) => !prev);
                          setOpenTo(false);
                          setOpenDate(false);
                          setOpen(false);
                          // window.scrollTo({
                          //   top: 200,
                          //   behavior: "smooth",
                          // });
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
                          <Box sx={{ position: "relative" }}>
                            <Typography
                              sx={{
                                color: "var(--secondary-color)",
                                fontSize: { xs: "14px", sm: "16px" },
                                paddingTop: "1.5px",
                              }}
                            >
                              Departure City
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
                              {segment.depFromText}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Collapse
                        in={segment.openFrom}
                        timeout="auto"
                        unmountOnExit
                        sx={{ width: "100%" }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: "100%",
                            left: "0",
                            width: "100%",
                            backgroundColor: "var( --secondary-color)",
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
                            }}
                            backgroundColor="var(--white)"
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
                          <Box>{fromGetSuggetion(index)}</Box>
                        </Box>
                      </Collapse>
                    </Grid>
                    {/* //todo: Arrival City section */}
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      sx={{
                        position: "relative",
                        padding: "5px",
                        height: "82px",
                        width: "100%",

                        borderLeft: {
                          xs: "1px solid var(--border-color)",
                          sm: "1px solid var(--border-color)",
                          md: "0",
                        },
                        borderRight: {
                          xs: "1px solid var(--border-color)",
                          sm: "1px solid var(--border-color)",
                          md: "1px solid var(--border-color)",
                        },
                        borderTop: {
                          xs: "1px solid var(--border-color)",
                          sm: "1px solid var(--border-color)",
                          md: "1px solid var(--border-color)",
                        },
                        borderBottom: {
                          xs: "1px solid var(--border-color)",
                          sm: "1px solid var(--border-color)",
                          md: "1px solid var(--border-color)",
                        },

                        borderRadius: {
                          xs: "10px",
                          sm: "10px",
                          md: "0 10px 10px 0",
                        },
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
                          const tempSegment = [...searchData.segments];
                          tempSegment[index] = {
                            ...tempSegment[index],
                            openFrom: false,
                            openTo: !segment.openTo,
                            openDate: false,
                          };
                          setSearchData({
                            ...searchData,
                            segments: tempSegment,
                          });
                          setOpenFrom(false);
                          setOpenTo((prev) => !prev);
                          setOpenDate(false);
                          setOpen(false);
                          // window.scrollTo({
                          //   top: 200,
                          //   behavior: "smooth",
                          // });
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            paddingLeft: {
                              xs: "5px",
                            },
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
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
                            <FlightLandIcon style={{ fontSize: "20px" }} />
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
                              Arrival City
                            </Typography>
                          </Box>
                          <Box
                            style={{
                              width: "100%",
                            }}
                          >
                            <Typography
                              style={{
                                width: "100%",
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "var(--tab-text)",
                              }}
                            >
                              {segment.arrToText}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Collapse
                        in={segment.openTo}
                        timeout="auto"
                        unmountOnExit
                        sx={{ width: "100%" }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: "100%",
                            left: "0",
                            width: "100%",
                            backgroundColor: "var( --secondary-color)",
                            height: "fit-content",
                            // borderBottom: "1px solid var(  --gray)",
                            // borderLeft: "1px solid var(  --gray)",
                            // borderRight: "2px solid var(  --gray)",
                            borderRadius: "0px 0px 5px 5px",
                            zIndex: "999",
                            padding: "5px 5px 0",
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
                            backgroundColor="var(--white)"
                          >
                            <input
                              autoComplete="off"
                              autoFocus
                              onChange={toOnChange}
                              className="customPlaceholder"
                              placeholder="Search a airport..."
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
                          <Box>{toGetSuggetion(index)}</Box>
                        </Box>
                      </Collapse>
                    </Grid>
                  </Grid>
                </Grid>
                {/* //todo:Travel Date */}
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={3}
                  sx={{
                    position: "relative",
                    // padding: "5px",
                    height: "84px",
                  }}
                >
                  <Box
                    sx={{
                      border: "1px solid var(--border-color)",
                      borderRadius: "10px",
                      height: "100%",
                      width: "100%",
                    }}
                    onClick={() => {
                      const tempSearchData = [...searchData.segments];
                      tempSearchData[index] = {
                        ...tempSearchData[index],
                        openFrom: false,
                        openTo: false,
                        openDate: !segment.openDate,
                      };
                      setSearchData({
                        ...searchData,
                        segments: tempSearchData,
                      });
                      setTimeout(() => setOpenDate((prev) => !prev), 200);
                      setOpenFrom(false);
                      setOpenTo(false);
                      setOpen(false);
                    }}
                  >
                    <Stack direction="row" alignItems="center" height="100%">
                      <Box
                        ml={{ xs: 0.5, sm: 1.5 }}
                        sx={{
                          border: "1px solid var(--border-color)",
                          borderRadius: "100%",
                          color: "var(--secondary-color)",
                          height: { xs: "32px", sm: "35px" },
                          width: { xs: "32px", sm: "35px" },
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CalendarMonthIcon style={{ fontSize: "20px" }} />
                      </Box>
                      <Box cursor="pointer" mt={-0.5} pl={{ xs: 0.5, sm: 1.5 }}>
                        <Typography
                          sx={{
                            color: "var(--secondary-color)",
                            fontSize: { xs: "14px", sm: "16px" },
                          }}
                        >
                          Travel Date
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "var(--tab-text)",
                          }}
                        >{`${format(
                          new Date(segment?.Date),
                          "dd MMM yy"
                        )}`}</Typography>
                        <Typography
                          style={{
                            color: "var(--tab-text)",
                            fontSize: "13px",
                            fontWeight: 500,
                          }}
                        >
                          [Multicity]
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                  {segment.openDate && (
                    <Box
                      sx={{
                        position: "absolute",
                        zIndex: 10,
                        top: "100%",
                        left: { xs: "auto", md: "auto", lg: "18px" },
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.09)",
                      }}
                    >
                      <Calendar
                        color="var(--primary-color)"
                        onChange={(date) => handleSelect(date, index)}
                        months={1}
                        // direction="horizontal"
                        minDate={
                          index === 0
                            ? new Date()
                            : new Date(arr[index - 1]?.Date)
                        }
                        style={{
                          fontSize: "11px",
                          padding: "0",
                        }}
                      />
                    </Box>
                  )}
                </Grid>

                {/* //todo: Passenger Box section */}
                {index === 0 ? (
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    lg={3}
                    style={{
                      position: "relative",
                      height: "84px",
                    }}
                  >
                    <Box
                      sx={{
                        border: "1px solid var(--border-color)",
                        borderRadius: "10px",
                        height: "100%",
                        width: "100%",
                      }}
                      onClick={() => handleClickOpen(index, segment)}
                    >
                      <Stack direction="row" alignItems="center" height="100%">
                        <Box
                          ml={{ xs: 0.5, sm: 1.5 }}
                          sx={{
                            border: "1px solid var(--border-color)",
                            borderRadius: "100%",
                            color: "var(--secondary-color)",
                            height: { xs: "32px", sm: "35px" },
                            width: { xs: "32px", sm: "35px" },
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <GroupsIcon style={{ fontSize: "20px" }} />
                        </Box>
                        <Box
                          cursor="pointer"
                          mt={-0.5}
                          pl={{ xs: 0.5, sm: 1.5 }}
                        >
                          <Typography
                            sx={{
                              color: "var(--secondary-color)",
                              fontSize: { xs: "14px", sm: "16px" },
                            }}
                          >
                            Passenger
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "13px",
                              fontWeight: 500,
                              color: "var(--tab-text)",
                            }}
                          >
                            {result} Traveler
                          </Typography>
                          <Typography
                            style={{
                              color: "var(--tab-text)",
                              fontSize: "13px",
                              fontWeight: 500,
                            }}
                          >
                            {`[ ${className} ]`}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>

                    {segment.open && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: {
                            lg: "100%",
                            md: "100%",
                            sm: "100%",
                            xs: "100%",
                          },
                          right: "0px",
                          zIndex: 1000,
                          borderRadius: "5px",
                          backgroundColor: "var(--secondary-color)",
                        }}
                      >
                        <Box width="250px" p={2}>
                          <Typography
                            style={{
                              textAlign: "left",
                              marginBottom: "5px",
                              color: "var(--white)",

                              fontWeight: 400,
                            }}
                          >
                            Passenger
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={4}
                            justifyContent="space-between"
                            alignItems="center"
                            pb={1}
                          >
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="space-between"
                              width="40%"
                            >
                              <button
                                onClick={adultDecrement}
                                style={{
                                  backgroundColor: "var(--primary-color)",
                                  color: "var(--white)",
                                  border: "none",
                                  width: "25px",
                                  height: "25px",
                                  fontSize: "20px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "2px",
                                }}
                              >
                                -
                              </button>
                              <Typography
                                sx={{ fontSize: "14px", color: "#fff" }}
                              >
                                {adultCount}
                              </Typography>
                              <button
                                onClick={adultInclement}
                                style={{
                                  backgroundColor: "var(--primary-color)",
                                  color: "var(--white)",
                                  border: "none",
                                  width: "25px",
                                  height: "25px",
                                  fontSize: "20px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "2px",
                                }}
                              >
                                +
                              </button>
                            </Stack>
                            <Box width="60%">
                              <Typography
                                sx={{ fontSize: "14px", color: "#fff" }}
                              >
                                Adult
                              </Typography>
                              <Typography
                                sx={{ fontSize: "12px", color: "#fff" }}
                              >
                                12+ yrs
                              </Typography>
                            </Box>
                          </Stack>
                          <Stack
                            direction="row"
                            spacing={4}
                            justifyContent="space-between"
                            alignItems="center"
                            pb={1}
                          >
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="space-between"
                              width="40%"
                            >
                              <button
                                onClick={childDecrement}
                                style={{
                                  backgroundColor: "var(--primary-color)",
                                  color: "var(--white)",
                                  border: "none",
                                  width: "25px",
                                  height: "25px",
                                  fontSize: "20px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "2px",
                                }}
                              >
                                -
                              </button>
                              <Typography
                                sx={{ fontSize: "14px", color: "#fff" }}
                              >
                                {childCount}
                              </Typography>
                              <button
                                onClick={childInclement}
                                style={{
                                  backgroundColor: "var(--primary-color)",
                                  color: "var(--white)",
                                  border: "none",
                                  width: "25px",
                                  height: "25px",
                                  fontSize: "20px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "2px",
                                }}
                              >
                                +
                              </button>
                            </Stack>
                            <Box width="60%">
                              <Typography
                                sx={{ fontSize: "14px", color: "#fff" }}
                              >
                                Child
                              </Typography>
                              <Typography
                                sx={{ fontSize: "12px", color: "#fff" }}
                              >
                                2- less than 12 yrs
                              </Typography>
                            </Box>
                          </Stack>
                          <Stack
                            direction="row"
                            spacing={4}
                            justifyContent="space-between"
                            alignItems="center"
                            pb={1}
                          >
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="space-between"
                              width="40%"
                            >
                              <button
                                onClick={infantDecrement}
                                style={{
                                  backgroundColor: "var(--primary-color)",
                                  color: "var(--white)",
                                  border: "none",
                                  width: "25px",
                                  height: "25px",
                                  fontSize: "20px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "2px",
                                }}
                              >
                                -
                              </button>
                              <Typography
                                sx={{ fontSize: "14px", color: "#fff" }}
                              >
                                {infant}
                              </Typography>
                              <button
                                onClick={infantIncrement}
                                style={{
                                  backgroundColor: "var(--primary-color)",
                                  color: "var(--white)",
                                  border: "none",
                                  width: "25px",
                                  height: "25px",
                                  fontSize: "20px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "2px",
                                }}
                              >
                                +
                              </button>
                            </Stack>
                            <Box width="60%">
                              <Typography
                                sx={{ fontSize: "14px", color: "#fff" }}
                              >
                                Infant
                              </Typography>
                              <Typography
                                sx={{ fontSize: "12px", color: "#fff" }}
                              >
                                0 - 23 month
                              </Typography>
                            </Box>
                          </Stack>
                          <Box my={1}>
                            <hr />
                          </Box>
                          <Box>
                            <FormControl>
                              <RadioGroup
                                value={className}
                                onChange={handleClassName}
                              >
                                <Stack direction="row">
                                  <FormControlLabel
                                    value="Economy"
                                    control={<BpRadio />}
                                    label={
                                      <Typography
                                        sx={{
                                          color: "var(--white)",
                                          fontSize: 12,
                                        }}
                                      >
                                        Economy
                                      </Typography>
                                    }
                                  />
                                  <FormControlLabel
                                    value="Business"
                                    control={<BpRadio />}
                                    label={
                                      <Typography
                                        sx={{
                                          color: "var(--white)",
                                          fontSize: 12,
                                        }}
                                      >
                                        Business
                                      </Typography>
                                    }
                                  />
                                </Stack>
                                <FormControlLabel
                                  value="First Class"
                                  control={<BpRadio sx={{ py: 0 }} />}
                                  label={
                                    <Typography
                                      sx={{
                                        color: "var(--white)",
                                        fontSize: 12,
                                      }}
                                    >
                                      First Class
                                    </Typography>
                                  }
                                />
                              </RadioGroup>
                            </FormControl>

                            <Box mt={2} style={{ textAlign: "right" }}>
                              <Button
                                size="small"
                                onClick={handleClose}
                                className="shine-effect"
                                style={{
                                  backgroundColor: "var(--primary-color)",
                                  color: "var(--white)",
                                }}
                              >
                                DONE
                              </Button>
                            </Box>
                          </Box>
                        </Box>

                        {/* -----------new passenger- */}
                      </Box>
                    )}
                    {/* </Grow> */}
                  </Grid>
                ) : (
                  <Grid
                    xs={6}
                    sm={6}
                    md={6}
                    lg={3}
                    // border="1px solid var(--border-color)"
                    // zIndex="80000"
                    display="flex"
                    justifyContent="flex-end"
                  >
                    <Stack
                      direction="row"
                      spacing={{ xs: 0.5, sm: 2, md: 2 }}
                      justifyContent="space-around"
                      alignItems="center"
                    >
                      <Button
                        disabled={arr.length > 4 ? true : false}
                        onClick={addCity}
                        sx={{
                          backgroundColor: "var(--primary-color)",
                          px: { xs: 1, sm: 1, md: 2 },
                          py: { xs: 1, sm: 1, md: 1 },
                          borderRadius: "10px",
                          cursor: "pointer",
                          color: "#fff",
                          fontSize: { xs: 10, sm: 12, md: 12 },
                          "&:hover": {
                            backgroundColor: "var(--secondary-color)",
                          },
                        }}
                      >
                        <Stack
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <AddIcon
                            sx={{ fontSize: { xs: 18, sm: 18, md: 18 } }}
                          />
                          Add City
                        </Stack>
                      </Button>

                      <Button
                        disabled={arr.length === 2 ? true : false}
                        onClick={() => removeCity(segment.id)}
                        sx={{
                          backgroundColor: "var(--secondary-color)",
                          px: { xs: 1, sm: 1, md: 2 },
                          py: { xs: 1, sm: 1, md: 1 },
                          borderRadius: "10px",
                          cursor: "pointer",
                          color: "#fff",
                          fontSize: { xs: 10, sm: 12, md: 12 },
                          "&:hover": {
                            backgroundColor: "var(--primary-color)",
                          },
                        }}
                      >
                        <Stack
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <RemoveIcon
                            sx={{ fontSize: { xs: 18, sm: 18, md: 18 } }}
                          />
                          Remove City
                        </Stack>
                      </Button>
                    </Stack>
                  </Grid>
                )}
              </Grid>
            </ClickAwayListener>
          ))}
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
                px: 5,
                mb: -6,
              }}
            >
              {click ? "Wait..." : "Search Now"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Multicity;
