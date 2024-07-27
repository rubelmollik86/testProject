import { Box, Button, Container, Grid } from "@mui/material";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./BookInfo.css";

const BookInfo = () => {
  const [value, setValue] = useState();
  return (
    <Box>
      <Container className="passenger-width" style={{ padding: "0" }}>
        <Box className="dashbord-content">
          <h3>Passenger Detail </h3>
          <span>(please specify the details as per the passport)</span>
        </Box>

        <from>
          <Box className="input-content input-border-color">
            <Box>
              <Box>
                <h5>Adult 1</h5>

                <Grid className="input-parent" container spacing={2}>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Choose a car</label> <br />
                    <select name="cars" id="cars">
                      <option value="volvo">Mr</option>
                      <option value="saab">Ms</option>
                    </select>
                  </Grid>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Given Name</label> <br />
                    <input type="text" />
                  </Grid>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Sure Name</label> <br />
                    <input type="text" />
                  </Grid>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Passport No</label> <br />
                    <input type="text" />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ marginTop: "25px" }}>
                {/* <h5>Gender</h5> */}
                <Grid className="input-parent" container spacing={2}>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Gender</label> <br />
                    <select name="cars" id="cars">
                      <option value="volvo">Male</option>
                      <option value="saab">Female</option>
                      <option value="saab">Other</option>
                    </select>
                  </Grid>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Date of Birth</label> <br />
                    <input type="text" />
                  </Grid>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Passport Nationality</label> <br />
                    <select name="cars" id="cars">
                      <option value="volvo">Bangladesh</option>
                      <option value="saab">Norway</option>
                      <option value="saab">Germany</option>
                      <option value="saab">Italy</option>
                    </select>
                  </Grid>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Expries Date</label> <br />
                    <input type="text" />
                  </Grid>
                </Grid>
              </Box>
            </Box>

            {/* second adult */}

            <Box>
              <Box>
                <h5>Adult 2</h5>
                <Grid className="input-parent" container spacing={2}>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Choose a car</label> <br />
                    <select name="cars" id="cars">
                      <option value="volvo">Mr</option>
                      <option value="saab">Ms</option>
                    </select>
                  </Grid>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Given Name</label> <br />
                    <input type="text" />
                  </Grid>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Sure Name</label> <br />
                    <input type="text" />
                  </Grid>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Passport No</label> <br />
                    <input type="text" />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ marginTop: "25px" }}>
                {/* <h5>Gender</h5> */}
                <Grid className="input-parent" container spacing={2}>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Gender</label> <br />
                    <select name="cars" id="cars">
                      <option value="volvo">Male</option>
                      <option value="saab">Female</option>
                      <option value="saab">Other</option>
                    </select>
                  </Grid>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Date of Birth</label> <br />
                    <input type="text" />
                  </Grid>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Passport Nationality</label> <br />
                    <select name="cars" id="cars">
                      <option value="volvo">Bangladesh</option>
                      <option value="saab">Norway</option>
                      <option value="saab">Germany</option>
                      <option value="saab">Italy</option>
                    </select>
                  </Grid>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Expries Date</label> <br />
                    <input type="text" />
                  </Grid>
                </Grid>
              </Box>
            </Box>

            {/* Infant 3 */}

            <Box>
              <Box>
                <h5>Infant 3</h5>
                <Grid className="input-parent" container spacing={2}>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Choose a car</label> <br />
                    <select name="cars" id="cars">
                      <option value="volvo">Mr</option>
                      <option value="saab">Ms</option>
                    </select>
                  </Grid>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Given Name</label> <br />
                    <input type="text" />
                  </Grid>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Sure Name</label> <br />
                    <input type="text" />
                  </Grid>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Passport No</label> <br />
                    <input type="text" />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ marginTop: "25px" }}>
                {/* <h5>Gender</h5> */}
                <Grid className="input-parent" container spacing={2}>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Gender</label> <br />
                    <select name="cars" id="cars">
                      <option value="volvo">Male</option>
                      <option value="saab">Female</option>
                      <option value="saab">Other</option>
                    </select>
                  </Grid>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Date of Birth</label> <br />
                    <input type="text" />
                  </Grid>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Passport Nationality</label> <br />
                    <select name="cars" id="cars">
                      <option value="volvo">Bangladesh</option>
                      <option value="saab">Norway</option>
                      <option value="saab">Germany</option>
                      <option value="saab">Italy</option>
                    </select>
                  </Grid>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Expries Date</label> <br />
                    <input type="text" />
                  </Grid>
                </Grid>
              </Box>
            </Box>

            <Box sx={{ marginTop: "40px" }}>
              <Box className="dashbord-content">
                <h3>Booking details will be sent to</h3>
              </Box>

              <Box sx={{ marginTop: "25px" }}>
                <Grid className="input-parent" container spacing={2}>
                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Email Address</label> <br />
                    <input type="text" />
                  </Grid>

                  <Grid className="input-child" item lg={3}>
                    <label for="cars">Mobile Number</label> <br />
                    <PhoneInput
                      international
                      defaultCountry="BD"
                      value={value}
                      onChange={setValue}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>

            <Box className="checkBox-parent">
              <Box className="checkBox">
                <input type="checkbox" />
                <label for="horns">Send SMS to mobile Number</label>
              </Box>

              <Box className="checkBox">
                <input type="checkbox" />
                <label for="horns">
                  I have read and understood the Fare Rules
                </label>
              </Box>
              <Box className="checkBox">
                <input type="checkbox" />
                <label for="horns">
                  I have read and agree to the Terms and Conditions
                </label>
              </Box>

              <Box className="book-btn">
                <Button variant="contained">Book and Hold</Button>
              </Box>
            </Box>
          </Box>
        </from>
      </Container>
    </Box>
  );
};

export default BookInfo;
