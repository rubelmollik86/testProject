/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Button from "@mui/material/Button";
import iata from "../../image/footer/IATA.png";
import payment from "../../Assets/Images/image70.png";
import Logo from "../../Assets/Images/Logo.png";
import PhoneIcon from "@mui/icons-material/Phone";
import { Link, NavLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./NewFooter.css";

const NewFooter = () => {
  const date = new Date().getFullYear();

  return (
    <Container maxWidth={"lg"}>
      <Box my={6}>
        <Grid container>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 500,
                fontSize: "18px",
                pt: 2,
                color: "#2966AC",
              }}
            >
              Get in touch
            </Typography>
            <Typography sx={{ fontFamily: "Poppins", fontSize: "14px", pt: 1 }}>
              Feel free to get in touch with us.
              <br />
              Contact us at
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "14px",
                pt: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <PhoneIcon style={{ color: "#2966AC" }} /> &nbsp; 017452599655
            </Typography>

            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "14px",
                pt: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <EmailIcon style={{ color: "#2966AC" }} />{" "}
              &nbsp;support@flyway.com
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 500,
                fontSize: "18px",
                pt: 2,
                color: "#2966AC",
              }}
            >
              Solutions
            </Typography>
            <Typography sx={{ fontFamily: "Poppins", fontSize: "14px", pt: 1 }}>
              For Travelers
            </Typography>
            <Typography sx={{ fontFamily: "Poppins", fontSize: "14px", pt: 1 }}>
              For Senior Management
            </Typography>

            <Typography sx={{ fontFamily: "Poppins", fontSize: "14px", pt: 1 }}>
              For Travel Organizers
            </Typography>
            <Typography sx={{ fontFamily: "Poppins", fontSize: "14px", pt: 1 }}>
              For Developers
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 500,
                fontSize: "18px",
                pt: 2,
                color: "#2966AC",
              }}
            >
              Help & Policies
            </Typography>
            <Typography sx={{ fontFamily: "Poppins", fontSize: "14px", pt: 1 }}>
              Privacy Policy
            </Typography>
            <Typography sx={{ fontFamily: "Poppins", fontSize: "14px", pt: 1 }}>
              Refunds & Return Policy
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 500,
                fontSize: "18px",
                pt: 2,
                color: "#2966AC",
              }}
            >
              Company
            </Typography>
            <Typography sx={{ fontFamily: "Poppins", fontSize: "14px", pt: 1 }}>
              About us
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "14px",
                pt: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <PhoneIcon style={{ color: "#2966AC" }} /> &nbsp;0174525996558
            </Typography>

            <Typography sx={{ fontFamily: "Poppins", fontSize: "14px", pt: 1 }}>
              Contact
            </Typography>
          </Grid>
        </Grid>
        <Grid container my={6} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={6}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img src={Logo} alt="flyway" width="100px" />
              <Typography fontSize={"16px"} paddingLeft="20px">
                All material herein © Flyway travel LTD.
                <br /> All Rights Reserved & Devloped by
                <strong style={{ color: "#2966AC" }}> Fly Far Tech</strong>.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Typography pr={2}>We Accept</Typography>
              <img src={payment} alt="payment" width="180px" />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Typography>Contact Us &nbsp;&nbsp;</Typography>
              <Box>
                &nbsp;
                <FacebookIcon style={{ color: "#2966AC" }} />
                &nbsp;
                <EmailIcon style={{ color: "#2966AC" }} />
                &nbsp;
                <LinkedInIcon style={{ color: "#2966AC" }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default NewFooter;
