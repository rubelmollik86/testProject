import { Box, Container, Slider, Tab, Typography } from "@mui/material";
import React from "react";
import Header from "../../Header/Header";
import Footer from "../../Home/Footer/Footer";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { useLocation } from "react-router-dom";
import AirTicket from "./AirTicket";
import TourTab from "./TourTab";

function MyBookings() {
  const location = useLocation();
  const allData = location?.state?.allData;
  const [value, setValue] = React.useState("1");
  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Container>
        <Header />
      </Container>
      <Box
        sx={{
          bgcolor: "#fff",
          py: "2vh",
          position: "sticky",
          top: "0px",
          zIndex: "999",
        }}
      >
        <Container>
          <Typography
            sx={{
              fontSize: "30px",
              color: "var(--primary-color)",
              fontWeight: 500,
            }}
          >
            My Bookings
          </Typography>
        </Container>
      </Box>
      <Container>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "transparent",
            }}
          >
            <TabList
              onChange={handleTabs}
              aria-label="lab API tabs example"
              TabIndicatorProps={{
                style: {
                  backgroundColor: "transparent",
                },
              }}
              style={{
                backgroundColor: "var(--secondary-color)",
                minHeight: "5px",
                height: "30px",
                width: "fit-content",
                borderRadius: "5px",
                marginTop: "20px",
              }}
            >
              <Tab
                label="Tour"
                value="1"
                sx={{
                  textTransform: "capitalize",
                  color: "var(--white)",
                  opacity: "1",
                  width: {
                    lg: "fit-content",
                    xs: "fit-content",
                  },

                  minHeight: "5px",
                  height: "30px",
                  margin: {
                    xs: "0px 0px",
                  },
                  "&.MuiTab-root.Mui-selected": {
                    color: "var(--white)",
                    opacity: "1",
                    background: "var(--primary-color)",
                    height: "30px",
                  },
                  fontSize: { xs: "11px", sm: "11px", md: "13px" },
                  paddingLeft: { xs: "0px", md: "13px" },
                }}
              />

              <Tab
                label="Air Ticket"
                value="2"
                sx={{
                  textTransform: "capitalize",
                  color: "var(--white)",
                  opacity: "1",
                  width: {
                    lg: "fit-content",
                    xs: "fit-content",
                  },

                  minHeight: "5px",
                  height: "30px",
                  margin: {
                    xs: "0px 0px",
                  },
                  "&.MuiTab-root.Mui-selected": {
                    color: "var(--white)",
                    opacity: "1",
                    background: "var(--primary-color)",
                    height: "30px",
                  },
                  fontSize: { xs: "11px", sm: "11px", md: "13px" },
                }}
              />
              <Tab
                label="Hotel"
                value="3"
                sx={{
                  textTransform: "capitalize",
                  color: "var(--white)",
                  opacity: "1",
                  width: {
                    lg: "fit-content",
                    xs: "fit-content",
                  },

                  minHeight: "5px",
                  height: "30px",
                  margin: {
                    xs: "0px 0px",
                  },
                  "&.MuiTab-root.Mui-selected": {
                    color: "var(--white)",
                    opacity: "1",
                    background: "var(--primary-color)",
                    height: "30px",
                  },
                  fontSize: { xs: "11px", sm: "11px", md: "13px" },
                }}
              />
              <Tab
                label="Visa"
                value="4"
                sx={{
                  textTransform: "capitalize",
                  color: "var(--white)",
                  opacity: "1",
                  width: {
                    lg: "fit-content",
                    xs: "fit-content",
                  },

                  minHeight: "5px",
                  height: "30px",
                  margin: {
                    xs: "0px 0px",
                  },
                  "&.MuiTab-root.Mui-selected": {
                    color: "var(--white)",
                    opacity: "1",
                    background: "var(--primary-color)",
                    height: "30px",
                  },
                  fontSize: { xs: "11px", sm: "11px", md: "13px" },
                }}
              />
            </TabList>
          </Box>
          <TabPanel value="1" style={{ paddingLeft: "0px" }}>
            <TourTab />
          </TabPanel>
          <TabPanel value="2" style={{ paddingLeft: "0px" }}>
            <AirTicket />
          </TabPanel>
          <TabPanel value="3" style={{ paddingLeft: "0px" }}></TabPanel>
          <TabPanel value="4"></TabPanel>
        </TabContext>
      </Container>

      <Footer />
    </Box>
  );
}

export default MyBookings;
