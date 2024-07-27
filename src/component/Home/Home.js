import React from "react";

import { Box, Container, Typography } from "@mui/material";
import DescriptionBox from "../HomeSearchBox/DescriptionBox/DescriptionBox";
import HomeSearchBox from "../HomeSearchBox/HomeSearchBox";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Banner from "./Banner";
import ClientSay from "./ClientSay";
import FounderMessage from "./FounderMessage";
import TravelNews from "./TravelNews";
import PressCoverage from "./PressCoverage/PressCoverage";
import Footer from "./Footer/Footer";
import ToursHome from "./Tours/ToursHome";

const Home = () => {
  return (
    <Box className="Home-parent">
      <Container sx={{ md: { padding: 0 } }}>
        <Header />
        <Banner />
        <Box pt={12}>
          <ToursHome />
        </Box>
        <Box pt={7}>
          <TravelNews />
        </Box>
        <FounderMessage />
        <PressCoverage />
        <ClientSay />
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default Home;
