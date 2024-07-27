import { Box, Button, Collapse, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
// import ServerDown from "../../images/undraw/undraw_server_down_s-4-lk.svg";
import ServerDown from "../../../src/Assets/Ladies/undraw/undraw_server_down_s-4-lk.svg";
import CountryList from "../CountryList";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";

const VisaSearchBox = () => {
  const data = CountryList; // json data from flight Data
  const [faddress, setfaddress] = useState("Bangladesh");
  const [toAddress, setToAddress] = useState("Tourist Visa");

  const navigate = useNavigate();
  const location = useLocation();
  const user = secureLocalStorage.getItem("user-info");
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  //For Country api
  const [fromSuggest, setFromSuggest] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [toSuggest, setToSuggest] = useState([]);
  const [toFilteredData, setToFilteredData] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      const resFromSuggest = await axios(
        `https://api.flyfarint.com/v.1.0.0/Visa/all.php?allcountry`
      );
      setFromSuggest(resFromSuggest.data);
      setFilteredData(resFromSuggest.data);

      resFromSuggest.data.map(async (item, index) => {
        const restoSuggest = await axios(
          `https://api.flyfarint.com/v.1.0.0/Visa/all.php?country=${item.country.trim()}`
        );

        setToSuggest(restoSuggest.data);
        setToFilteredData(restoSuggest.data);
      });
    };

    fetchAllData();
  }, []);

  //formOnChange Filter
  const formOnChange = (e) => {
    const searchvalue = e.target.value;
    let suggestion = [];
    suggestion = fromSuggest.filter((item) =>
      item.country.toLowerCase().includes(searchvalue.toLowerCase())
    );
    if (suggestion.length !== 0) {
      setFilteredData(suggestion);
    } else if (searchvalue.length > 0 && suggestion.length === 0) {
      setFilteredData(suggestion);
    } else {
      setFilteredData(fromSuggest);
    }
  };

  const fromSuggestedText = async (name) => {
    const restoSuggest = await axios(
      `https://api.flyfarint.com/v.1.0.0/Visa/all.php?country=${name.trim()}`
    );
    setToSuggest(restoSuggest.data);
    setToFilteredData(restoSuggest.data);
    setfaddress(name);
    setOpenFrom(false);
    setOpenTo(true);
  };
  //ToOnChange filter
  const toOnChange = (e) => {
    const searchvalue = e.target.value;
    let suggestion = [];
    suggestion = toSuggest.filter((item) =>
      item.visatype.toLowerCase().includes(searchvalue.toLowerCase())
    );
    if (suggestion.length !== 0) {
      setToFilteredData(suggestion);
    } else if (searchvalue.length > 0 && suggestion.length === 0) {
      setToFilteredData(suggestion);
    } else {
      setToFilteredData(toSuggest);
    }
  };

  const toSuggestedText = (name) => {
    setToAddress(name);
    setOpenTo(false);
  };
  const [click, setClick] = useState(false);
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
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            maxHeight: "230px",
            overflowY: "auto",
            background: "#fff",
            "&::-webkit-scrollbar": { width: "0px" },
          }}
        >
          {filteredData.length !== 0 ? (
            filteredData.map((item, index) => {
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
                      fromSuggestedText(` ${item.country}`);
                    }} //suggest to display name select with multiple data pass parameter
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          display: "block",
                          color: "var(--white)",
                          textAlign: "left",
                        }}
                      >
                        {item.country}
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
          {toFilteredData.length !== 0 ? (
            toFilteredData.map((item, index) => {
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
                    onClick={() => toSuggestedText(` ${item.visaCategory}`)} //suggest to display name select with multiple data pass parameter
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "var(--secondary-color)",
                          display: "block",
                          textAlign: "left",
                        }}
                      >
                        {item.visaCategory}
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
  };
  // Search Flight button click
  let fromaddress = faddress;
  let toaddress = toAddress;

  async function handleSearch(e) {
    e.preventDefault();
    secureLocalStorage.setItem("search-data", {
      fromaddress,
      toaddress,
    });
    if (data) {
      navigate(`/searchVisa/${fromaddress.trim()}/${toaddress.trim()}`, {
        state: { fromaddress, toaddress },
      });
    } else {
      Swal.fire({
        imageUrl: ServerDown,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        title: "Server Down!",
        confirmButtonColor: "#ffa84d",
        confirmButtonText: "Search Again...",
      }).then(function () {
        navigate("/dashboard");
      });
    }
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        className="search-body-trip"
        sx={{ position: "relative", width: "100%" }}
      >
        <form onSubmit={handleSearch}>
          <Grid
            container
            rowGap={{ lg: 0, md: 0, sm: 1, xs: 1 }}
            columnGap={{ lg: 2, md: 3, sm: 1, xs: 1 }}
            alignItems="center"
            justifyContent="center"
            paddingX={{ md: 2, xs: 2 }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={5.8}
              lg={5.8}
              style={{
                position: "relative",
                height: "60px",
                border: "1px solid #DEDEDE",
                borderRadius: "5px",
                // padding: "10px",
              }}
            >
              <Box
                onClick={() => {
                  setOpenFrom((prev) => !prev);
                  setOpenTo(false);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    padding: "15px",
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
                    <FlightTakeoffIcon />
                  </Box>
                </Box>
                <Box style={{ width: "100%", height: "100%" }}>
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontSize: "16px",
                      fontWeight: 500,
                      mt: "5px",
                    }}
                  >
                    Country
                  </Typography>
                  <Typography
                    sx={{
                      color: "#222222",
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  >
                    {faddress}
                  </Typography>
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
                    backgroundColor: "var( --secondary-color)",
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
                    style={{
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
                      placeholder="Search a Country..."
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
                  <Box width={"full"}>{fromGetSuggetion()}</Box>
                </Box>
              </Collapse>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={5.8}
              lg={5.8}
              style={{
                position: "relative",
                height: "60px",
                border: "1px solid #DEDEDE",
                borderRadius: "5px",
              }}
            >
              <Box
                onClick={() => {
                  setOpenTo((prev) => !prev);
                  setOpenFrom(false);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    padding: "15px",
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
                    <AirplaneTicketIcon />
                  </Box>
                </Box>
                <Box style={{ width: "100%", height: "100%" }}>
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontSize: "16px",
                      fontWeight: 500,
                      pt: "5px",
                    }}
                  >
                    Visa Type
                  </Typography>
                  <Typography
                    sx={{
                      color: "#222222",
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  >
                    {toAddress}
                  </Typography>
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
                      placeholder="Search a Visa Type..."
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
    </ClickAwayListener>
  );
};

export default VisaSearchBox;
