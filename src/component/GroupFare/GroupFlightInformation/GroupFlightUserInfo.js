import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { width } from "@mui/system";

const GroupFlightUserInfo = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [flightPassengerData, setFlightPassengerData] = useState({
    adult: new Array({
      type: "ADT",
      fname: "",
      lname: "",
      gender: "",
      apassNation: "",
      dob: "",
      passexpireDate: "",
      passportno: "",
    }),
  });

  const [passengerCount, setPassengerCount] = useState(1);
  const handleClickCount = (e) => {
    if (passengerCount < 9) {
      setPassengerCount(passengerCount + 1);
      return;
    } else {
      setPassengerCount(1);
    }
  };

  const handleOnChange = (e, type, index) => {
    if (type === "ADT") {
      const value = e.target.value;
      const field = e.target.name;
      //copying data to temp variable so that we do not directly mutate original state
      const tempFlightData = [...flightPassengerData.adult];
      // -1 check to see if we found that object in working hours
      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index], //keeping existing values in object
          [field]: value, //here property can be "price" or "description"
        };
      }
      setFlightPassengerData({
        ...flightPassengerData,
        adult: tempFlightData,
      });
    }

    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoaded(false);
    e.target.reset();
    let url = "https://api.flyfarint.com/v.1.0.0/AirBooking/PreBooking.php";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: JSON.stringify(flightPassengerData),
    })
      .then((res) => res.json())
      .then((bookingDetails) => {
        if (bookingDetails.status === "success") {
          let url = "https://api.flyfarint.com/v.1.0.0/AirMaterials/AddPax.php";
          let body = {
            ...flightPassengerData,
            bookingId: bookingDetails.BookingId,
            // agentId: users?.user?.agentId,
          };
          fetch(url, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: JSON.stringify(body),
          })
            .then((res) => res.json())
            .then((data) => {
              setIsLoaded(true);
              if (data.status === "success") {
                setIsLoaded(true);
                navigate("/dashboard/congratulation", {
                  state: {
                    bookingData: data,
                    bookId: bookingDetails,
                  },
                });
              } else {
                setIsLoaded(true);
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Booking done but Travelers not saved",
                  confirmButtonText: "OK",
                }).then(function () {
                  navigate("/dashboard/congratulation", {
                    state: {
                      bookingData: data,
                      bookingDetails,
                    },
                  });
                });
              }
            });
        } else {
          setIsLoaded(true);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Booking Failed",
            confirmButtonText: "Search Another Flights...",
          }).then(function () {
            navigate(-2);
          });
        }
      });
  };

  // Change the user s email.
  const handleEmailChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newPassengerData = { ...flightPassengerData };
    newPassengerData[field] = value;
    setFlightPassengerData(newPassengerData);
    setEmail(e.target.value);
  };
  const validateNumber = (e) => {
    const field = e.target.name;
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newPassengerData = { ...flightPassengerData };
    newPassengerData[field] = value;
    setFlightPassengerData(newPassengerData);
    setUserPhoneNumber(e.target.value.replace(/[^0-9]/g, ""));
  };
  // Validate a Users Phone number.

  return (
    <Box>
      <Box px={"24px"} mt={2}>
        <Grid container>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="right-overflow1"
          >
            <Box>
              <h4 className="flight-h4"> Passenger Details</h4>
              <form onSubmit={handleSubmit}>
                <Box display="flex" alignItems="center" mb={4}>
                  <Typography mr={4}>
                    How Many People do you have on the Tour
                  </Typography>
                  <Box
                    bgcolor="var(--primary-color)"
                    p="5px 30px"
                    borderRadius="10px"
                    onClick={handleClickCount}
                    color="#fff"
                  >
                    Passenger
                  </Box>{" "}
                  <Box
                    ml="-20px"
                    width="50px"
                    height="50px"
                    borderRadius="50%"
                    bgcolor={"var(--gray-text-color)"}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {passengerCount}
                  </Box>
                </Box>
                {passengerCount > 1 ? (
                  <>
                    {" "}
                    {passengerCount.map((item, index) => (
                      <Box key={index}>
                        <Box className="adult-h4">
                          <h4>Adult-{index + 1}</h4>
                        </Box>
                        <Box className="adult-info">
                          <Grid
                            container
                            spacing={4}
                            sx={{ padding: "26px 0px" }}
                          >
                            <Grid item xs={12} md={6} lg={6}>
                              <input
                                required
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                                type="text"
                                name="fname"
                                value={item.fname}
                                placeholder="Enter First Name"
                              />
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                              <input
                                required
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                                type="text"
                                name="lname"
                                value={item.lname}
                                placeholder="Enter Last Name"
                              />
                            </Grid>
                          </Grid>
                          <Grid container spacing={4}>
                            <Grid item xs={12} md={6} lg={6}>
                              <select
                                required
                                name="gender"
                                value={item.gender}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                              >
                                <option value="">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                              <select
                                required
                                name="nationality"
                                selected={item.nationality}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                              >
                                <option value="">Enter Nationality</option>
                                <option value="BD">Bangladesh</option>
                              </select>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            spacing={4}
                            sx={{ padding: "26px 0px" }}
                          >
                            <Grid item xs={12} md={6} lg={6}>
                              <input
                                required
                                type="text"
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => (e.target.type = "text")}
                                placeholder="Enter Date of Birth"
                                name="dob"
                                value={item.dob}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                              />
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                              <input
                                required
                                type="text"
                                placeholder="Enter Passport Number"
                                name="passexpireDate"
                                value={item.passportno}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid container spacing={4}>
                            <Grid item xs={12} md={6} lg={6}>
                              <input
                                required
                                type="text"
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => (e.target.type = "text")}
                                placeholder="Enter Passport Expire Date"
                                name="passportno"
                                value={item.passexpireDate}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                              />
                            </Grid>
                          </Grid>
                          <br></br>
                        </Box>
                      </Box>
                    ))}
                  </>
                ) : (
                  <>
                    {" "}
                    {flightPassengerData.adult.map((item, index) => (
                      <Box key={index}>
                        <Box className="adult-h4">
                          <h4>Adult-{index + 1}</h4>
                        </Box>
                        <Box className="adult-info">
                          <Grid
                            container
                            spacing={4}
                            sx={{ padding: "26px 0px" }}
                          >
                            <Grid item xs={12} md={6} lg={6}>
                              <input
                                required
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                                type="text"
                                name="fname"
                                value={item.fname}
                                placeholder="Enter First Name"
                              />
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                              <input
                                required
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                                type="text"
                                name="lname"
                                value={item.lname}
                                placeholder="Enter Last Name"
                              />
                            </Grid>
                          </Grid>
                          <Grid container spacing={4}>
                            <Grid item xs={12} md={6} lg={6}>
                              <select
                                required
                                name="gender"
                                value={item.gender}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                              >
                                <option value="">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                              <select
                                required
                                name="nationality"
                                selected={item.nationality}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                              >
                                <option value="">Enter Nationality</option>
                                <option value="BD">Bangladesh</option>
                              </select>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            spacing={4}
                            sx={{ padding: "26px 0px" }}
                          >
                            <Grid item xs={12} md={6} lg={6}>
                              <input
                                required
                                type="text"
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => (e.target.type = "text")}
                                placeholder="Enter Date of Birth"
                                name="dob"
                                value={item.dob}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                              />
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                              <input
                                required
                                type="text"
                                placeholder="Enter Passport Number"
                                name="passexpireDate"
                                value={item.passportno}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid container spacing={4}>
                            <Grid item xs={12} md={6} lg={6}>
                              <input
                                required
                                type="text"
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => (e.target.type = "text")}
                                placeholder="Enter Passport Expire Date"
                                name="passportno"
                                value={item.passexpireDate}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                              />
                            </Grid>
                          </Grid>
                          <br></br>
                        </Box>
                      </Box>
                    ))}
                  </>
                )}

                <Box className="conatct-detail">
                  <p>
                    Contact Details (Airlines will send updates to this contact)
                  </p>
                  <Box className="adult-info">
                    <Grid container spacing={5}>
                      <Grid item xs={12} md={6} lg={6}>
                        <input
                          required
                          onChange={handleEmailChange}
                          type="text"
                          name="passengerEmail"
                          value={email}
                          placeholder="Enter Your Email"
                        />
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <input
                          required
                          type="text"
                          name="passengerPhoneNumber"
                          placeholder="Enter Phone Number"
                          maxLength="11"
                          value={userPhoneNumber}
                          onChange={validateNumber}
                        />
                      </Grid>
                    </Grid>
                    <br></br>
                  </Box>

                  <Box className="booking-btn">
                    <button type="submit">Book Ticket</button>
                  </Box>
                </Box>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default GroupFlightUserInfo;
