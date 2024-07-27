import React, { useState } from "react";
import {
  Box,
  Button,
  ClickAwayListener,
  Container,
  Grid,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { Calendar } from "react-date-range";
import CancelIcon from "@mui/icons-material/Cancel";
import Loader from "../../../../image/loader/Render.gif";
import AddTraveler from "../../../../image/undraw/undraw_airport_re_oqk1.svg";
import ServerError from "../../../../image/undraw/undraw_server_down_s-4-lk.svg";
import PhoneInput from "react-phone-input-2";
import CountryList from "../../../CountryList";
import Swal from "sweetalert2";
import "./Travelers.css";
import { format } from "date-fns";

const Travelers = () => {
  const navigate = useNavigate();
  const users = secureLocalStorage.getItem("user-info");
  const agentId = users?.user?.agentId;
  const [travelerData, setTravelerData] = useState({});
  const [userPhoneNumber, setUserPhoneNumber] = useState("880");
  const [openDob, setOpenDob] = useState(false);
  const [openPassEx, setOpenPassEx] = useState(false);
  const [loading, setLoading] = useState(false);

  // todo: date validation
  function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
  }
  let dateAfterSixMonths = addMonths(new Date(), 6);
  let dateBeforeTwelveYears = addMonths(new Date(), -144);
  let dateBeforeTwoYears = addMonths(new Date(), -24);
  // todo:end

  //  form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch(
      `https://api.flyfarint.com/v.1.0.0/AirMaterials/addTraveler.php`,
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },

        body: JSON.stringify({
          agentId: agentId,
          fname: travelerData.fname,
          lname: travelerData.lname,
          dob: travelerData.dob,
          type: travelerData.type,
          nationality: travelerData.nationality,
          passportno: travelerData.passportno,
          passexpireDate: travelerData.passexpireDate,
          phone: travelerData.phone,
          email: travelerData.email,
          gender: travelerData.gender,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          Swal.fire({
            imageUrl: AddTraveler,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Success",
            html: "<strong>A New Travelers Added</strong>",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(function () {
            setLoading(false);
            navigate("/dashboard/manage/travelersDetails");
          });
        } else {
          throw new Error("error adding travelers");
        }
      })
      .catch((err) => {
        console.log(err.message);
        Swal.fire({
          imageUrl: ServerError,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "Server Error",
          html: "<strong>Failed to Add a New Traveler</strong>",
          confirmButtonColor: "#dc143c",
          confirmButtonText: "Ok",
        }).then(function () {
          setLoading(false);
          navigate("/dashboard/manage/travelersDetails");
        });
      });

    e.target.reset();
  };

  const handleChange = (e) => {
    const field = e.target.name;
    let value;
    if (field === "passportCopy" || field === "visaCopy") {
      value = URL.createObjectURL(e.target.files[0]);
    } else if (
      field === "gender" ||
      field === "nationality" ||
      field === "type" ||
      field === "email"
    ) {
      value = e.target.value;
    } else {
      value = e.target.value.toUpperCase();
    }
    const newTravelerData = { ...travelerData };
    newTravelerData[field] = value;
    setTravelerData(newTravelerData);
  };

  const deleteImage = (field) => {
    setTravelerData({ ...travelerData, [field]: "" });
  };

  if (loading) {
    return (
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          width: "70vw",
          marginInline: "auto",
        }}
      >
        <Box
          style={{
            width: "50%",
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={Loader}
            alt="loader"
            style={{
              width: "40%",
              objectFit: "center",
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Box className="flight-markup travels">
        <Container className="traveler-container" style={{ padding: "0" }}>
          <Box>
            <Box
              className="traveler-content"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Box>
                <h3>Add Travelers </h3>
              </Box>
            </Box>

            <Box className="traveler-form">
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Box>
                      <input
                        required
                        type="text"
                        name="fname"
                        value={travelerData.fname}
                        placeholder="Given Name"
                        onFocus={() => {
                          setOpenDob(false);
                          setOpenPassEx(false);
                        }}
                        onChange={(e) => handleChange(e)}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Box>
                      <input
                        required
                        type="text"
                        name="lname"
                        value={travelerData.lname}
                        placeholder="Surname"
                        onChange={(e) => handleChange(e)}
                        onFocus={() => {
                          setOpenDob(false);
                          setOpenPassEx(false);
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Box>
                      <select
                        required
                        name="gender"
                        value={travelerData.gender}
                        onChange={(e) => handleChange(e)}
                        onFocus={() => {
                          setOpenDob(false);
                          setOpenPassEx(false);
                        }}
                      >
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Box>
                      <select
                        required
                        type="text"
                        name="nationality"
                        value={travelerData.nationality}
                        onChange={(e) => handleChange(e)}
                        onFocus={() => {
                          setOpenDob(false);
                          setOpenPassEx(false);
                        }}
                      >
                        <option value="">Select Nationality</option>
                        {CountryList.map((country) => {
                          return (
                            <option value={country.code}>{country.name}</option>
                          );
                        })}
                      </select>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Box>
                      <select
                        required
                        name="type"
                        value={travelerData.type}
                        onChange={(e) => handleChange(e)}
                        onFocus={() => {
                          setOpenDob(false);
                          setOpenPassEx(false);
                        }}
                      >
                        <option value="">Passenger Type</option>
                        <option value="ADT">Adult</option>
                        <option value="CNN">Child</option>
                        <option value="INF">Infant</option>
                      </select>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={4}
                    style={{ position: "relative" }}
                  >
                    <Box>
                      <Tooltip
                        title={
                          travelerData.type
                            ? ""
                            : "Please Select Passenger first"
                        }
                      >
                        <input
                          disabled={travelerData.type ? false : true}
                          required
                          readOnly
                          type="text"
                          name="dob"
                          value={
                            travelerData.dob
                              ? format(
                                  new Date(travelerData.dob),
                                  "dd MMM yyyy"
                                )
                              : ""
                          }
                          placeholder="Date Of Birth"
                          onClick={() => {
                            setOpenDob((prev) => !prev);
                            setOpenPassEx(false);
                          }}
                        />
                      </Tooltip>
                    </Box>
                    {openDob ? (
                      <Calendar
                        color="var(--primary-color)"
                        months={1}
                        className="new-dashboard-calendar"
                        onChange={(data) => {
                          setTravelerData({
                            ...travelerData,
                            dob: new Date(data).toLocaleDateString("sv"),
                          });
                          setOpenPassEx(false);
                          setOpenDob(false);
                        }}
                        minDate={
                          travelerData.type === "ADT"
                            ? new Date("1800-01-01")
                            : travelerData.type === "CNN"
                            ? new Date(dateBeforeTwelveYears)
                            : new Date(dateBeforeTwoYears)
                        }
                        maxDate={
                          travelerData.type === "ADT"
                            ? new Date(dateBeforeTwelveYears)
                            : travelerData.type === "CNN"
                            ? new Date(dateBeforeTwoYears)
                            : new Date()
                        }
                      />
                    ) : null}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Box>
                      <input
                        required
                        type="text"
                        name="passportno"
                        value={travelerData.passportno}
                        placeholder="Passport Number"
                        onChange={(e) => handleChange(e)}
                        onFocus={() => {
                          setOpenDob(false);
                          setOpenPassEx(false);
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={4}
                    style={{ position: "relative" }}
                  >
                    <Box>
                      <input
                        required
                        type="text"
                        name="passexpireDate"
                        value={
                          travelerData.passexpireDate
                            ? format(
                                new Date(travelerData.passexpireDate),
                                "dd MMM yyy"
                              )
                            : ""
                        }
                        placeholder="Passport Expire Date"
                        onClick={() => {
                          setOpenPassEx((prev) => !prev);
                          setOpenDob(false);
                        }}
                      />
                    </Box>
                    {openPassEx ? (
                      <Calendar
                        color="var(--primary-color)"
                        months={1}
                        className="new-dashboard-calendar"
                        onChange={(data) => {
                          setTravelerData({
                            ...travelerData,
                            passexpireDate: new Date(data).toLocaleDateString(
                              "sv"
                            ),
                          });
                          setOpenPassEx(false);
                          setOpenDob(false);
                        }}
                        minDate={new Date()}
                      />
                    ) : null}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Box>
                      <PhoneInput
                        required
                        country={"bd"}
                        name="phone"
                        value={userPhoneNumber}
                        onFocus={() => {
                          setOpenDob(false);
                          setOpenPassEx(false);
                        }}
                        onChange={(phone) => {
                          setTravelerData({
                            ...travelerData,
                            phone: phone,
                          });
                          setUserPhoneNumber(phone);
                        }}
                        style={{
                          width: "100%",
                          backgroundColor: "#d8ebfc",
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={12}
                    style={{ marginBottom: "20px" }}
                  >
                    <Box style={{ width: "33%" }}>
                      <input
                        required
                        type="email"
                        name="email"
                        value={travelerData.email}
                        placeholder="Enter Email"
                        onChange={(e) => handleChange(e)}
                        onFocus={() => {
                          setOpenDob(false);
                          setOpenPassEx(false);
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    lg={4}
                    md={6}
                    xs={6}
                    style={{
                      position: "relative",
                      height: "200px",
                      top: "50%",
                      border: "dotted 1px #9999",
                      padding: "5px",
                    }}
                  >
                    <label
                      htmlFor={`passportCopy`}
                      style={{
                        backgroundColor: "transparent",
                        color: "#999",
                        fontsize: "8px",
                        position: "relative",
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "100%",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="file"
                        name="passportCopy"
                        id={`passportCopy`}
                        accept="image/*,.pdf"
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "none",
                        }}
                        onChange={(e) => handleChange(e)}
                        onFocus={() => {
                          setOpenDob(false);
                          setOpenPassEx(false);
                        }}
                      />
                      {travelerData.passportCopy ? (
                        <img
                          src={travelerData.passportCopy}
                          alt="..."
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      ) : (
                        " Upload Passport Copy"
                      )}
                    </label>

                    <CancelIcon
                      style={{
                        position: "absolute",
                        top: "-10px",
                        left: "-10px",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteImage("passportCopy")}
                    />
                  </Grid>
                  <Grid
                    item
                    lg={4}
                    md={6}
                    xs={6}
                    style={{
                      position: "relative",
                      height: "200px",
                      top: "50%",
                      border: "dotted 1px #9999",
                      padding: "5px",
                    }}
                  >
                    <label
                      htmlFor={`visaCopy`}
                      style={{
                        backgroundColor: "transparent",
                        color: "#999",
                        fontsize: "8px",
                        position: "relative",
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "100%",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        name="visaCopy"
                        id={`visaCopy`}
                        type="file"
                        accept="image/*,.pdf"
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "none",
                        }}
                        onChange={(e) => handleChange(e)}
                        onFocus={() => {
                          setOpenDob(false);
                          setOpenPassEx(false);
                        }}
                      />
                      {travelerData.visaCopy ? (
                        <img
                          src={travelerData.visaCopy}
                          alt="..."
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      ) : (
                        "Upload Visa Copy"
                      )}
                    </label>

                    <CancelIcon
                      style={{
                        position: "absolute",
                        top: "-10px",
                        left: "-10px",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteImage("visaCopy")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={12}>
                    <Box>
                      <Button
                        type="submit"
                        style={{
                          backgroundColor: "var(--primary-color)",
                          color: "#fff",
                          borderRadius: "0px",
                        }}
                      >
                        submit
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Travelers;
