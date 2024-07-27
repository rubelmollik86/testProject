import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useAuthentication from "../../hooks/useAuthentication";
import "./Contact.css";
import email from "../../image/contact/email.png";
import location from "../../image/contact/loca.png";
import phone from "../../image/contact/phone.png";
import fb from "../../image/social/fb.png";
import tr from "../../image/social/tr.png";
import le from "../../image/social/le.png";
import yt from "../../image/social/yt.png";
import pr from "../../image/social/pr.png";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const Contact = () => {
  return (
    <Box className="contact-pa">
      <Grid container spacing={2} className="for-desk">
        <Grid item xs={3.5}>
          <Box className="contact-left">
            <h3>CONTACT INFO</h3>
            <hr style={{ width: "67%" }}></hr>

            <Box className="contact-info-parent">
              <Box className="contact-info">
                <Box className="img-content">
                  <img src={email} />
                  <span> Email</span>
                </Box>
                <p>support@flyfarint.com</p>
              </Box>

              <Box className="contact-info">
                <Box className="img-content">
                  <img src={phone} />
                  <span> Phone</span>
                </Box>
                <p>
                  +880 9606 912 912
                  <br />
                  +880 1755 572 099,
                </p>
              </Box>

              <Box className="contact-info">
                <Box className="img-content">
                  <img src={location} />
                  <span> Location</span>
                </Box>
                <p>
                  2nd Floor, Ka-9, Hazi Abdul Latif Mansion, Bashundhara Road,,
                  Dhaka, Bangladesh
                </p>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              className="social-contact"
            >
              <span
                style={{
                  width: "fit-content",
                  borderRadius: "2px",
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  color: "#003556",
                  fontSize: "20px",
                }}
              >
                <FaFacebookF />
              </span>

              <span
                style={{
                  width: "fit-content",
                  borderRadius: "2px",
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  color: "#003556",
                  fontSize: "20px",
                }}
              >
                <FaTwitter />
              </span>
              <span
                style={{
                  width: "fit-content",
                  borderRadius: "2px",
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  color: "#003556",
                  fontSize: "20px",
                }}
              >
                <FaLinkedinIn />
              </span>
              <span
                style={{
                  width: "fit-content",
                  borderRadius: "2px",
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  color: "#003556",
                  fontSize: "20px",
                }}
              >
                <FaYoutube />
              </span>
              <span
                style={{
                  width: "fit-content",
                  borderRadius: "2px",
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  color: "#003556",
                  fontSize: "20px",
                }}
              >
                <FaWhatsapp />
              </span>
            </Box>

            {/* <Box className="social-contact">
              <img src={fb} />
              <img src={tr} />
              <img src={le} />
              <img src={yt} />
              <img src={pr} />
            </Box> */}
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box className="contact-right">
            <h3>CONTACT US</h3>
            <hr></hr>

            <Box className="contact-input">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box>
                    <label>Name</label> <br></br>
                    <input type="text" placeholder="Enter Your Name" />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <label>Email</label> <br></br>
                    <input type="text" placeholder="Enter Your Email" />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box>
                    <label>Phone</label> <br></br>
                    <input type="text" placeholder="Enter Your Phone" />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <label>Subject</label> <br></br>
                    <input type="text" placeholder="Enter Subject" />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <label>Message</label> <br></br>
                  <textarea
                    placeholder="Write Your Message"
                    rows="6"
                    style={{ resize: "none" }}
                  ></textarea>
                </Grid>
              </Grid>
            </Box>
            <Box className="contact-btn">
              <button>SEND MESSAGE</button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* ------------------for tab and phone start----------------- */}

      <Box className="fortabwithphone">
        <Box className="for-tab-phon">
          <Box className="contact-right">
            <h3>CONTACT US</h3>
            <hr></hr>

            <Box className="contact-input">
              <Grid container columnSpacing={1} rowSpacing={1}>
                <Grid item xs={6}>
                  <Box>
                    <label>Name</label> <br></br>
                    <input type="text" placeholder="Enter Your Name" />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <label>Email</label> <br></br>
                    <input type="text" placeholder="Enter Your Email" />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box>
                    <label>Phone</label> <br></br>
                    <input type="text" placeholder="Enter Your Phone" />
                  </Box>
                </Grid>
                <Grid item xs={6}></Grid>

                <Grid item xs={12}>
                  <label>Message</label> <br></br>
                  <textarea
                    placeholder="Write Your Message"
                    rows="3"
                    style={{ resize: "none" }}
                  ></textarea>
                </Grid>
              </Grid>
            </Box>

            <Box className="contact-btn" style={{ padding: "0px" }}>
              <button>SEND MESSAGE</button>
            </Box>
          </Box>
        </Box>
        <Box className="contact-bottom-tab">
          <h3>CONTACT INFO</h3>
          <hr style={{ width: "100%" }}></hr>

          <Box className="contact-info-parent">
            <Grid container columnSpacing={1}>
              <Grid item xs={6}>
                <Box className="contact-info">
                  <Box className="img-content">
                    <img src={email} />
                    <span> Email</span>
                  </Box>
                  <p>support@flyfarint.com</p>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className="contact-info">
                  <Box className="img-content">
                    <img src={phone} />
                    <span> Phone</span>
                  </Box>
                  <p>
                    +880 1755-543445,
                    <br /> 09606912912
                  </p>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className="contact-info">
                  <Box className="img-content">
                    <img src={location} />
                    <span> Location</span>
                  </Box>
                  <p>
                    Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.
                  </p>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className="social-contact">
                  <img src={fb} />
                  <img src={tr} />
                  <img src={le} />
                  <img src={yt} />
                  <img src={pr} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
