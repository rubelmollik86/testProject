import {
  Box,
  Button,
  Container,
  Grid,
  InputBase,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./FlightMarkup.css";

const FlightMarkup = () => {
  const [value, setValue] = useState();
  return (
    <Box className="flight-markup">
      <Box>
        <Container Paper className="markup">
          <Box className="markup">
            <Button
              className="button-color"
              style={{
                textTransform: "capitalize",
                backgroundColor: "var(--primary-color)",
              }}
            >
              New Markup
            </Button>
            &nbsp;&nbsp;
            <Button
              variant="outlined"
              className="button-color1"
              style={{
                textTransform: "capitalize",
              }}
            >
              Existing
            </Button>
          </Box>

          <form>
            <Box className="input-border-colorss">
              <Box>
                <h3 className="button-color1">Required Fields</h3>
                <Grid container component="form">
                  <Grid
                    lg={3}
                    md={3}
                    sm={6}
                    xs={12}
                    className="phone-sizes airlines"
                  >
                    <label for="cars">Airlines</label>
                    <br />
                    <InputBase
                      placeholder="airlines code(Ex: Ai,Ey,All)"
                      label="Standard"
                      variant="outlined"
                      className="inputbase"
                      type="text"
                    />
                  </Grid>
                  <Grid
                    item
                    lg={3}
                    md={3}
                    sm={6}
                    xs={12}
                    className="phone-sizes"
                  >
                    <label for="cars">Origin Country</label>
                    <br />
                    <InputBase
                      placeholder="ISO Country(Ex: IN,US,All)"
                      label="Standard"
                      variant="outlined"
                      className="inputbase"
                    />
                  </Grid>
                  <Grid
                    item
                    lg={3}
                    md={3}
                    sm={6}
                    xs={12}
                    className="phone-sizes"
                  >
                    <label for="cars">Destination Country</label>
                    <br />
                    <InputBase
                      placeholder="ISO Code(Ex: IN,US,All)"
                      label="Standard"
                      variant="outlined"
                      className="inputbase"
                    />
                  </Grid>
                  <Grid
                    item
                    lg={3}
                    md={3}
                    sm={6}
                    xs={12}
                    className="phone-sizes"
                  >
                    <label for="cars">RBD</label>
                    <br />
                    <InputBase
                      placeholder="Booking Class(Ex: YB,All)"
                      label="Standard"
                      variant="outlined"
                      className="inputbase"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <br />
            <br />
            {/* --------------------------- */}
            <Box className="input-border-colorss">
              <Box>
                <Grid container component="form">
                  <Grid
                    lg={2.4}
                    md={2.4}
                    sm={6}
                    xs={12}
                    className="travel-validity"
                  >
                    <label for="cars">Travel Validity From</label>
                    <br />
                    <InputBase
                      placeholder="Select Date"
                      label="Standard"
                      variant="outlined"
                      className="inputbase date-style"
                      type="date"
                    />
                  </Grid>
                  <Grid
                    lg={2.4}
                    md={2.4}
                    sm={6}
                    xs={12}
                    className="travel-validity"
                  >
                    <label for="cars">Travel Validity To</label>
                    <br />
                    <InputBase
                      placeholder="Select Date"
                      label="Standard"
                      variant="outlined"
                      className="inputbase date-style"
                      type="date"
                    />
                  </Grid>
                  <Grid
                    lg={2.4}
                    md={2.4}
                    sm={6}
                    xs={12}
                    className="travel-validity phone-size"
                  >
                    <label for="cars">Cabin Class</label>
                    <br />
                    <InputBase
                      placeholder="All"
                      label="Standard"
                      variant="outlined"
                      className="inputbase"
                    />
                  </Grid>
                  <Grid
                    lg={2.4}
                    md={2.4}
                    sm={6}
                    xs={12}
                    className="travel-validity break phone-size"
                  >
                    <label for="cars">Fare Form</label>
                    <br />
                    <InputBase
                      placeholder="Select Date"
                      label="Standard"
                      variant="outlined"
                      className="inputbase"
                    />
                  </Grid>
                  <Grid
                    lg={2.4}
                    md={2.4}
                    sm={6}
                    xs={12}
                    className="travel-validity break phone-size"
                  >
                    <label for="cars">Fare To</label>
                    <br />
                    <InputBase
                      placeholder="Select Date"
                      label="Standard"
                      variant="outlined"
                      className="inputbase"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <br />
            <br />
            {/* -------------------------------- */}
            <Box className="input-border-colors">
              <h3 className="button-color1">Markup Configuration</h3>
              <Box>
                <Grid container component="form">
                  <Grid
                    item
                    lg={3}
                    md={3}
                    sm={6}
                    xs={12}
                    className="phone-sizes"
                  >
                    <label for="cars">Currency</label>
                    <br />
                    <InputBase
                      placeholder="BDT"
                      label="Standard"
                      variant="outlined"
                      className="inputbase"
                      type="number"
                    />
                  </Grid>
                  <Grid
                    item
                    lg={3}
                    md={3}
                    sm={6}
                    xs={12}
                    className="phone-sizes"
                  >
                    <label for="cars">Flat Amount</label>
                    <br />
                    <InputBase
                      placeholder="0"
                      label="Standard"
                      variant="outlined"
                      className="inputbase"
                    />
                  </Grid>
                  <Grid
                    item
                    lg={3}
                    md={3}
                    sm={6}
                    xs={12}
                    className="phone-sizes"
                  >
                    <label for="cars">Percentage Value(%)</label>
                    <br />
                    <InputBase
                      placeholder="0"
                      label="Standard"
                      variant="outlined"
                      className="inputbase"
                    />
                  </Grid>
                  <Grid
                    lg={3}
                    md={3}
                    sm={6}
                    xs={12}
                    className="phone-sizes phone-size"
                  >
                    <label for="cars">Apply On</label>
                    <br />
                    <select
                      name="select"
                      placeholder="Booking "
                      label="Standard"
                      className="select"
                    >
                      <option value="name1">Booking1</option>
                      <option value="name2">Booking2</option>
                      <option value="name2">Booking3</option>
                    </select>
                  </Grid>
                </Grid>
              </Box>
              <br />
              <br />
              {/* ----------------------------- */}
              <Box className="input-border-colorss ">
                <Box>
                  <Grid container component="form">
                    <Grid
                      lg={2.4}
                      md={3}
                      sm={6}
                      xs={12}
                      className="travel-validity"
                    >
                      <label for="cars">Apply For</label>
                      <br />
                      <select
                        name="select"
                        placeholder="Booking "
                        label="Standard"
                        className="select"
                      >
                        <option value="name1">Booking1</option>
                        <option value="name2">Booking2</option>
                        <option value="name2">Booking3</option>
                      </select>
                    </Grid>
                    <Grid
                      lg={2.4}
                      md={3}
                      sm={6}
                      xs={12}
                      className="travel-validity"
                    >
                      <label for="cars">Fare Type</label>
                      <br />
                      <select
                        name="select"
                        placeholder="Booking "
                        label="Standard"
                        className="select"
                      >
                        <option value="name1">Booking1</option>
                        <option value="name2">Booking2</option>
                        <option value="name2">Booking3</option>
                      </select>
                    </Grid>
                    <Grid
                      lg={2.4}
                      md={3}
                      sm={6}
                      xs={12}
                      className="travel-validity phone-size"
                    >
                      <label for="cars">Origin Airport Code</label>
                      <br />
                      <InputBase
                        placeholder="All"
                        label="Standard"
                        variant="outlined"
                        className="inputbase"
                      />
                    </Grid>
                    <Grid
                      lg={2.4}
                      md={3}
                      sm={6}
                      xs={12}
                      className="travel-validity phone-size "
                    >
                      <label for="cars">Destination Airport Code</label>
                      <br />
                      <InputBase
                        placeholder="Ex: LHR,BLR,All"
                        label="Standard"
                        variant="outlined"
                        className="inputbase"
                      />
                    </Grid>
                    <Grid
                      lg={2.4}
                      md={3}
                      sm={6}
                      xs={12}
                      className="travel-validity"
                    >
                      <label for="cars">Fare from</label>
                      <br />
                      <select
                        placeholder="Ex: LHR,BLR,All "
                        label="Standard"
                        className="select"
                      >
                        <option value="name1">Booking1</option>
                        <option value="name2">Booking2</option>
                        <option value="name2">Booking3</option>
                      </select>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default FlightMarkup;
