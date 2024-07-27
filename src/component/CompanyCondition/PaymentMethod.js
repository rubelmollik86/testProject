import React, { useState } from "react";
import useAuthentication from "../../hooks/useAuthentication";
import {
  Box,
  Button,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  Menu,
  Tooltip,
  Avatar,
  MenuItem,
  IconButton,
} from "@mui/material";
import logo from "../../image/dsh-img/WhiteLogo.png";
import { NavLink, Link } from "react-router-dom";
import NewFooter from "./../Footer/NewFooter";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Modal from "@mui/material/Modal";
import Contact from "../Contact/Contact";
import NewRegister from "../Register/NewRegister";
import LoginPage from "../Login/LoginPage";
import hamburger from "../../image/Icon/humburger.png";

import "./PaymentMethod.css";
import LoginModal from "../Header/LoginModal";
import Header from "../Header/Header";

const PaymentMethod = () => {
  return (
    <Box className="about-section">
      <Box>
        <Box>
          <Header />
        </Box>
        <Box className="about-body-img" mt={"2rem"}>
          <Box className="containers">
            <Box className="payment-header">
              <h2>Payment Method</h2>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box className="bank-info">
                    <h4>Islami Bank </h4>
                    <p>Fly Far International</p>
                    <p>Baridhara Branch</p>
                    <p>Account Number:</p>
                    <p>20503420100141709</p>
                    <p>Routing Number: 125260525</p>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box className="bank-info">
                    <h4>City Bank </h4>
                    <p>Fly Far International</p>
                    <p>Jomuna Future park Branch </p>
                    <p>Account Number:</p>
                    <p>1502553140001</p>
                    <p>Routing Number: 225260333</p>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box className="bank-info">
                    <h4>Brac Bank </h4>
                    <p>Bashundhora Branch </p>
                    <p>Baridhara Branch</p>
                    <p>Account Number:</p>
                    <p>1521204262962001</p>
                    <p>Routing Number: 060260556</p>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box className="bank-info">
                    <h4>Dutch Bangla Bank </h4>
                    <p>Fly Far International</p>
                    <p>Bashundhora Branch </p>
                    <p>Account Number:</p>
                    <p>147.110.16468</p>
                    <p>Routing Number: 090260555</p>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box className="bank-info">
                    <h4>Commercial Bank </h4>
                    <p>Fly Far International</p>
                    <p>Progati Sharani SME Branch </p>
                    <p>Account Number:</p>
                    <p>1813001751</p>
                    <p>Routing Number: 080271512</p>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box className="bank-info">
                    <h4>NCC Bank </h4>
                    <p>Fly Far International</p>
                    <p>Bashundhora Branch </p>
                    <p>Account Number:</p>
                    <p>00960210002554</p>
                    <p>Routing Number: 160260551</p>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box className="bank-info">
                    <h4>Modhumoti Bank </h4>
                    <p>Fly Far International</p>
                    <p>Sheikh Kamal Sarani Branch </p>
                    <p>Account Number:</p>
                    <p>112011100000223</p>
                    <p>Routing Number: </p>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box className="bank-info">
                    <h4>Sonali Bank </h4>
                    <p>Fly Far International</p>
                    <p>Baridhara Branch</p>
                    <p>Account Number:</p>
                    <p>0108102000695</p>
                    <p>Routing Number: 200260529</p>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box className="bank-info">
                    <h4>MOBILE BANKING </h4>
                    <p>Bkash Merchant</p>
                    <p>01755543447</p>
                    <Box py={2}>
                      <p> Nexus Pay</p>
                      <p> 017749751647</p>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Box className="bank-info">
                    <h4>CASH AT OFFICE </h4>
                    <p>
                      Address: Ka 11/2A, Jagannathpur, Bashundhora Road, Above
                      Standard Chartered Bank. Dhaka, 1229
                    </p>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <NewFooter />
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentMethod;
