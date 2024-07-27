import {
  Button,
  Container,
  Grid,
  Icon,
  IconButton,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import FlightIcon from "@mui/icons-material/Flight";
import GroupsIcon from "@mui/icons-material/Groups";
import { addDays, format } from "date-fns";
import { useRef } from "react";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import { useNavigate } from "react-router-dom";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import FlightSearchBox from "./FlightSearchBox/FlightSearchBox";
import VisaSearchBox from "./../Visa/VisaSearchBox";
import TourPackageSearchBox from "./../TourPackage/TourPackageSearchBox";

import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import TelegramIcon from "@mui/icons-material/Telegram";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import ArticleIcon from "@mui/icons-material/Article";

import "./HomeSearchBox.css";
import HotelSearchBox from "../Hotel/HotelSearchBox/HotelSearchBox";

const HomeSearchBox = () => {
  const navigate = useNavigate();
  //todo: state for retrigger useEffect
  const [changeState, setChangeState] = useState(null);
  //todo: End for retrigger useEffect

  //todo: state for from date change
  const [changeFrom, setChangeFrom] = useState(false);
  //todo: End state for from date change

  const [type, setType] = React.useState("tour");
  const [value, setValue] = React.useState("oneway");
  const [fromSearchText, setFromSearchText] = useState(
    "Hazrat Shahjalal Intl Airport (DAC)"
  );
  const [toSearchText, setToSearchText] = useState("Cox's Bazar Airport(CXB)");

  const [departureDate, setDepartureDate] = useState(
    format(addDays(new Date(), 1), "dd MMM yy")
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
  // for multiCity
  const now = useRef(new Date());
  const [from, setFrom] = useState(addDays(now.current, 1));
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

  const handleTypeChange = (event, newValue) => {
    setType(newValue);
  };

  const [searchData, setSearchData] = useState({
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
  });

  return (
    <Box pt={5}>
      <Box sx={{ width: { xs: "100%", md: "90%" } }} margin="0 auto 0">
        <TabContext value={type}>
          <Box
            sx={{
              color: "var(--tab-text)",
              width: {
                lg: "fit-content",
                md: "fit-content",
                sm: "fit-content",
                xs: "100%",
              },
              height: "50px",
              borderRadius: "5px",
              overflow: "hidden",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              margin: "0px auto 0px",
            }}
          >
            <TabList
              value={type}
              onChange={handleTypeChange}
              centered
              scrollButtons="auto"
              aria-label="dashboard-tab"
              className="tab-list-parent"
              TabIndicatorProps={{
                style: { backgroundColor: "var(--secondary-color)" },
              }}
              style={{
                background: "#fff",
                zIndex: 500,
                marginBottom: "-20px",
                height: "80%",
                borderRadius: "12px",
              }}
            >
              <Tab
                icon={
                  <TravelExploreIcon
                    sx={{
                      fontSize: { xs: "15px", sm: "20px" },
                      display: { xs: "none", sm: "block" },
                    }}
                  />
                }
                iconPosition="start"
                label="Tours"
                value="tour"
                sx={{
                  backgroundColor: "var(secondary-color)",
                  color: "var(--tab-text)",
                  opacity: "1",
                  width: {
                    lg: "150px",
                    xs: "fit-content",
                  },
                  minHeight: "50px",
                  margin: {
                    xs: "0px 0px",
                  },
                  "&.MuiTab-root.Mui-selected": {
                    color: "var(--secondary-color)",
                    opacity: "1",
                  },

                  fontSize: { xs: "11px", sm: "14px" },
                }}
              />
              <Tab
                icon={
                  <TelegramIcon
                    sx={{
                      fontSize: { xs: "15px", sm: "20px" },
                      display: { xs: "none", sm: "block" },
                    }}
                  />
                }
                iconPosition="start"
                label="Flight"
                value="flight"
                sx={{
                  backgroundColor: "white",
                  color: "var(--tab-text)",
                  opacity: "1",
                  width: {
                    lg: "150px",
                    xs: "fit-content",
                  },
                  minHeight: "50px",
                  margin: {
                    xs: "0px 0px",
                  },
                  "&.MuiTab-root.Mui-selected": {
                    color: "var(--secondary-color)",
                    opacity: "1",
                  },

                  fontSize: { xs: "11px", sm: "14px" },
                }}
              />

              <Tab
                icon={
                  <LocalHotelIcon
                    sx={{
                      fontSize: { xs: "15px", sm: "20px" },
                      display: { xs: "none", sm: "block" },
                    }}
                  />
                }
                iconPosition="start"
                label="Hotel"
                value="hotel"
                sx={{
                  opacity: "1",
                  backgroundColor: "white",
                  color: "var(--tab-text)",
                  width: {
                    lg: "150px",
                    xs: "fit-content",
                  },
                  minHeight: "50px",
                  margin: {
                    xs: "0px 0px",
                  },
                  "&.MuiTab-root.Mui-selected": {
                    color: "var(--secondary-color)",
                    opacity: "1",
                  },

                  fontSize: { xs: "11px", sm: "14px" },
                }}
              />
              <Tab
                icon={
                  <ArticleIcon
                    sx={{
                      fontSize: { xs: "15px", sm: "20px" },
                      display: { xs: "none", sm: "block" },
                    }}
                  />
                }
                iconPosition="start"
                label="Visa"
                value="visa"
                sx={{
                  backgroundColor: "white",
                  color: "var(--tab-text)",
                  width: {
                    lg: "150px",
                    xs: "fit-content",
                  },
                  opacity: "1",
                  minHeight: "50px",
                  margin: {
                    xs: "0px 0px",
                  },
                  "&.MuiTab-root.Mui-selected": {
                    color: "var(--secondary-color)",
                    opacity: "1",
                  },
                  fontSize: { xs: "11px", sm: "14px" },
                }}
              />
            </TabList>
          </Box>
          <TabPanel
            value={"flight"}
            style={{
              padding: "0px 0px 0px 0px",
            }}
          >
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: "10px",
                pt: 4,
                zIndex: -1,
                marginTop: "-15px",
              }}
            >
              <FlightSearchBox
                type={type}
                setType={setType}
                value={value}
                setValue={setValue}
                fromSearchText={fromSearchText}
                setFromSearchText={setFromSearchText}
                toSearchText={toSearchText}
                setToSearchText={setToSearchText}
                departureDate={departureDate}
                setDepartureDate={setDepartureDate}
                returningDate={returningDate}
                setReturningDate={setReturningDate}
                travelDate={travelDate}
                setTravelDate={setTravelDate}
                from={from}
                setFrom={setFrom}
                to={to}
                setTo={setTo}
                faddress={faddress}
                setfaddress={setfaddress}
                toAddress={toAddress}
                setToAddress={setToAddress}
                fromSendData={fromSendData}
                setFromSendData={setFromSendData}
                toSendData={toSendData}
                setToSendData={setToSendData}
                adultCount={adultCount}
                setAdultCount={setAdultCount}
                childCount={childCount}
                setChildCount={setChildCount}
                infant={infant}
                setInfant={setInfant}
                result={result}
                setResult={setResult}
                className={className}
                setClassName={setClassName}
                setChangeState={setChangeState}
                changeState={changeState}
                changeFrom={changeFrom}
                setChangeFrom={setChangeFrom}
                searchData={searchData}
                setSearchData={setSearchData}
              />
            </Box>
          </TabPanel>

          <TabPanel
            value={"tour"}
            style={{
              padding: "0px 0px 0px 0px",
            }}
          >
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: "10px",
                pt: 4,
                pb: 2,
                zIndex: -1,
                marginTop: "-15px",
              }}
            >
              <TourPackageSearchBox />
            </Box>
          </TabPanel>
          <TabPanel
            value={"hotel"}
            style={{
              padding: "0px 0px 0px 0px",
            }}
          >
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: "10px",
                pt: 4,
                pb: 2,
                zIndex: -1,
                marginTop: "-15px",
              }}
            >
              <HotelSearchBox />
            </Box>
          </TabPanel>
          <TabPanel
            value={"visa"}
            style={{
              padding: "0px 0px 0px 0px",
            }}
          >
            <Box
              sx={{
                bgcolor: "#fff",
                // boxShadow: "0px 0px 10px #FE99A6",
                borderRadius: "10px",
                pt: 4,
                pb: 2,
                zIndex: -1,
                marginTop: "-15px",
              }}
            >
              <VisaSearchBox />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default HomeSearchBox;
