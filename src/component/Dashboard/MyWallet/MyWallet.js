import { Box, Container, Stack, Tab, Typography } from "@mui/material";
import React from "react";
import Header from "../../Header/Header";
import Footer from "../../Home/Footer/Footer";

import PropTypes from "prop-types";
import ChequeTab from "./ChequeTab";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import "./MyWallet.css";
import BankTab from "./BankTab";
import MobileTab from "./MobileTab";
import { NavLink } from "react-router-dom";

function MyWallet() {
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
            My Wallet
          </Typography>
        </Container>
      </Box>

      <Container>
        <TabContext value={value}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            justifyContent="space-between"
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
                label="Cheque"
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
                label="Bank Transfer"
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
                label="Mobile Banking"
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
            </TabList>
            <Box display={{ xs: "none", sm: "block" }}>
              <NavLink to={"/dashboard/transaction"}>
                <button
                  style={{
                    marginTop: "20px",
                    cursor: "pointer",
                    border: "none",
                    background: "var(--primary-color)",
                    color: "#fff",
                    borderRadius: "3px",
                    height: "32px",
                    width: "150px",
                  }}
                >
                  Transection
                </button>
              </NavLink>
            </Box>
          </Stack>
          <TabPanel value="1" style={{ paddingLeft: "0px" }}>
            <ChequeTab />
          </TabPanel>
          <TabPanel value="2" style={{ paddingLeft: "0px" }}>
            <BankTab />
          </TabPanel>
          <TabPanel value="3" style={{ paddingLeft: "0px" }}>
            <MobileTab />
          </TabPanel>
        </TabContext>
      </Container>

      <Box mt={20}>
        <Footer />
      </Box>
    </Box>
  );
}

export default MyWallet;
