import { Box, Grid, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import "./Footer.css";
import Button from "@mui/material/Button";
import logo from "../../image/logo.png";
import fb from "../../image/facebook.png";
import youtube from "../../image/youtube.png";
import linkend from "../../image/linkend.png";
import pinterest from "../../image/pinterest.png";
import twiter from "../../image/twiter.png";
import iata from "../../image/IATA_logo1.png";
import toab from "../../image/toab.png";
import biman from "../../image/biman.png";
import payment from "../../image/payment.png";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <Box>
      <section className="footer-bg">
        <Container>
          <Box>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={3} md={2}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={12} md={12}>
                    <Box className="logo">
                      <img src={logo} />
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={12} md={12}>
                    <Box className="icon">
                      <img src={fb} />
                      <img src={youtube} />
                      <img src={linkend} />
                      <img src={pinterest} />
                      <img src={twiter} />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={3} md={2}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={12} md={12}>
                    <Box className="company-content">
                      <h5>Company</h5>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={12} md={12}>
                    <Box className="company-content">
                      <p>Payment Method</p>
                      <p>Terms and Condition</p>
                      <p>Privacy policy</p>
                      <p>Contact us</p>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={3} md={1.5}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={12} md={12}>
                    <Box
                      className="company-content"
                      sx={{ textAlign: "center" }}
                    >
                      <h5>Authorised by</h5>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={12} md={12}>
                    <Box className="iata">
                      <img src={iata} />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={3} md={1.5}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={12} md={12}>
                    <Box
                      className="company-content"
                      sx={{ textAlign: "center" }}
                    >
                      <h5>Members of</h5>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={12} md={12}>
                    <Box className=" taab">
                      <img src={toab} />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={3} md={2}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={12} md={12}>
                    <Box
                      className="company-content"
                      sx={{ textAlign: "center" }}
                    >
                      <h5>Approved Agent</h5>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={12} md={12}>
                    <Box className="biman-img ">
                      <img src={biman} />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={3} md={3}>
                <Box className="company-content">
                  <h5>Send us massage via Email</h5>
                  <p>
                    It is a long established fact that a reader will be by
                    content.
                  </p>

                  <Box className="companay-centent-child">
                    <Box className="message-input">
                      <input type="text" placeholder="Enter your Email" />
                    </Box>
                    <Box>
                      <Box className="custom-footer-btn" sx={{}}>
                        <Button variant="contained">SUBSCRIBE</Button>
                      </Box>
                    </Box>
                  </Box>

                  {/* <Grid container spacing={2}>
                    <Box>
                      <Grid item xs={6} sm={12} md={12}>
                        <input
                          style={{
                            width: "100%",
                            padding: "10px 0px",
                            border: "1px solid var(--primary-color)",
                          }}
                        />
                      </Grid>

                      <Grid item xs={6} sm={12} md={12}>
                        <Box className="custom-footer-btn" sx={{}}>
                          <Button variant="contained">SUBSCRIBE</Button>
                        </Box>
                      </Grid>
                    </Box>
                  </Grid> */}
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box className="payment-img">
            <img src={payment} />
          </Box>

          <Box className="reserve-right">
            <p>
              &copy; {date} All Right Reserved By Fly Far International &
              Developed By FLy Far Tech
            </p>
          </Box>
        </Container>
      </section>
    </Box>
  );
};

export default Footer;
