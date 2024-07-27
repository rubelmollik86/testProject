import React, { useState } from "react";
import { Box, Button, Grid, Container, Stack, Typography } from "@mui/material";
import footerimage from "../../../Assets/Ladies/footerimage1.png";
import sslcommarce from "../../../Assets/Ladies/sslcommarce.png";
import store from "../../../Assets/Ladies/store.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import CallIcon from "@mui/icons-material/Call";
import { NavLink, useNavigate } from "react-router-dom";
import { MailIcon } from "@mui/icons-material/Mail";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import footer from "../../../Assets/Ladies/footerimage2.png";
import "./Footer.css";
import axios from "axios";
import Swal from "sweetalert2";

const Footer = () => {
  const [subScription, setSubScription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubscription = (e) => {
    e.preventDefault();
    const url = `https://flyfarladies-apiv2.appspot.com/subscription/create`;
    let body = JSON.stringify({
      Email: subScription,
    });
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          Swal.fire({
            icon: "success",
            title: data?.status,
            text: data?.message,
            confirmButtonText: "ok",
          });
        } else {
          setIsLoading(false);
          Swal.fire({
            icon: "error",
            title: data?.status,
            text: data?.message,
            confirmButtonText: "ok",
          });
        }
      });
    e.target.reset();
  };

  return (
    <Box className="footer-bgimage" sx={{}}>
      <img src={footer} style={{ width: "100%", height: "100%" }} alt={"img"} />
      <Box sx={{ backgroundColor: "#F186B6" }}>
        <Container>
          <Box>
            <Grid container spacing={2} style={{ paddingTop: "50px" }}>
              <Grid item xs={12} sm={6} md={3} width="100%">
                <Typography
                  sx={{
                    color: "var(--white)",
                    fontSize: { md: "16px" },
                    fontWeight: 500,
                    mb: 1,
                  }}
                >
                  Download app
                </Typography>
                <Box my={1}>
                  <img
                    src={store}
                    style={{ width: "80%", height: "auto" }}
                    alt="ssl"
                  />
                </Box>
                <Stack direction={"row"} spacing={1} my={1}>
                  <a
                    href="https://www.facebook.com/flyfarladies/?ref=page_internal"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FacebookIcon style={{ color: "var(--white)" }} />
                  </a>

                  <a
                    href="https://www.instagram.com/flyfarladies/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <InstagramIcon style={{ color: "var(--white)" }} />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/fly-far-ladies/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkedInIcon style={{ color: "var(--white)" }} />
                  </a>

                  <a
                    href={`https://wa.me/+01755582111`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WhatsAppIcon style={{ color: "var(--white)" }} />
                  </a>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} md={3} width="100%">
                <Typography
                  sx={{
                    color: "var(--white)",
                    fontSize: { md: "16px" },
                    fontWeight: 500,
                    mb: 1,
                  }}
                >
                  Company
                </Typography>

                <NavLink
                  to="/termsandcondition"
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "14px" },
                      color: "var(--white)",
                      fontWeight: 300,
                    }}
                  >
                    Terms and Condition
                  </Typography>
                </NavLink>
                <NavLink to="/bookingpolicy" style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{
                      fontSize: { xs: "14px" },
                      color: "var(--white)",
                      fontWeight: 300,
                    }}
                  >
                    Booking Policy
                  </Typography>
                </NavLink>
                <NavLink to="/privacypolicy" style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{
                      fontSize: { xs: "14px" },
                      color: "var(--white)",
                      fontWeight: 300,
                    }}
                  >
                    Privacy Policy
                  </Typography>
                </NavLink>
              </Grid>
              <Grid item xs={12} sm={6} md={3} width="100%">
                <Typography
                  sx={{
                    color: "var(--white)",
                    fontSize: { md: "16px" },
                    fontWeight: 500,
                    mb: 1,
                  }}
                >
                  Contact Us
                </Typography>
                <NavLink to="/" style={{ textDecoration: "none" }}>
                  <Stack direction="row" spacing={1} mb={1}>
                    <CallIcon
                      sx={{
                        fontSize: { xs: "20px" },
                        color: "var(--white)",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: { xs: "14px" },
                        color: "var(--white)",
                        fontWeight: 300,
                      }}
                    >
                      +88 01755582111
                    </Typography>
                  </Stack>
                </NavLink>
                <NavLink to="/" style={{ textDecoration: "none" }}>
                  <Stack direction="row" spacing={1} mb={1}>
                    <MailOutlinedIcon
                      sx={{
                        fontSize: { xs: "20px" },
                        color: "var(--white)",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: { xs: "14px" },
                        color: "var(--white)",
                        fontWeight: 300,
                      }}
                    >
                      support@flyfarladies.com
                    </Typography>
                  </Stack>
                </NavLink>
                <NavLink to="/" style={{ textDecoration: "none" }}>
                  <Stack direction="row" spacing={1}>
                    <LocationOnOutlinedIcon
                      sx={{
                        fontSize: { xs: "20px" },
                        color: "var(--white)",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: { xs: "14px" },
                        color: "var(--white)",
                        fontWeight: 300,
                      }}
                    >
                      Ka-11, 2A Bashundhara Rd, Jagannathpur 1229
                    </Typography>
                  </Stack>
                </NavLink>
              </Grid>

              <Grid item xs={12} sm={6} md={3} width="100%">
                <Typography
                  sx={{
                    color: "var(--white)",
                    fontSize: { md: "16px" },
                    fontWeight: 500,
                    mb: 1,
                  }}
                >
                  Subscribe For Newsletter
                </Typography>
                <NavLink to="/" style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{
                      fontSize: { xs: "14px" },
                      color: "var(--white)",
                      fontWeight: 300,
                      mb: 1,
                    }}
                  >
                    It is a long established fact that a reader will be by
                    content.
                  </Typography>
                </NavLink>
                <form onSubmit={handleSubscription}>
                  <Stack direction="row" spacing={1}>
                    <input
                      required
                      type="email"
                      className="footer-input"
                      placeholder="Enter your email"
                      onChange={(e) => setSubScription(e.target.value)}
                    />
                    <button
                      style={{
                        background: "var(--tab-text)",
                        fontSize: "12px",
                        color: "var(--white)",
                        border: "none",
                        height: "34px",
                        width: "100px",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                      type="submit"
                    >
                      SUBSCRIBE
                    </button>
                  </Stack>
                </form>
              </Grid>
            </Grid>
          </Box>
          <Box mt={7}>
            <Box width={{ xs: "90vw", sm: "70vw", md: "40vw" }} margin="auto">
              <img
                src={sslcommarce}
                style={{ width: "100%", height: "auto" }}
                alt="ssl"
              />
            </Box>
            <Typography
              sx={{
                color: "var(--white)",
                fontSize: { xs: "12px", sm: "13px", md: "15px" },
                textAlign: "center",
                width: "100%",
              }}
              py={3}
            >
              @All Right Reserved By Fly Far Ladies & Developed By Fly Far Tech
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
