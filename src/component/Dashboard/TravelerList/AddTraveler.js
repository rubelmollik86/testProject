import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Home/Footer/Footer";
import CountryList from "../../CountryList";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { addDays, format } from "date-fns";
import { Calendar } from "react-date-range";
import secureLocalStorage from "react-secure-storage";

function AddTraveler() {
  const users = secureLocalStorage.getItem("UserData");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // date field property for dob
  const now = useRef(new Date());

  const [dob, setDob] = useState(addDays(now.current, 0));

  const [open1, setOpen1] = useState(false);
  const [openDate1, setOpenDate1] = useState(false);
  const handleSelect1 = (date) => {
    setDob(date);
    setOpenDate1(false);
    setTimeout(() => setOpen1(true), 200);
  };

  // date field property

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [paxType, setPaxType] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [passNumber, setPassNumber] = useState("");
  const [passExpireDate, setPassExpireDate] = useState("");
  const [dobOpen, setDobOpen] = useState(false);
  const [expOpen, setEXPOpen] = useState(false);
  const [file, setFile] = useState("");

  const [inputs, setInputs] = useState({
    FirstName: "",
    LastName: "",
    DOB: addDays(now.current, 0),
    PaxType: "",
    Nationality: "",
    Gender: "",
    PassportNumber: "",
    PassportExpireDate: addDays(now.current, 0),
  });
  // console.log(inputs);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSelectDOB = (data) => {
    setInputs((prev) => ({
      ...prev,
      DOB: new Date(data).toLocaleDateString("sv"),
    }));
    setDobOpen(!dobOpen);
  };
  const handleSelectEXP = (data) => {
    setInputs((prev) => ({
      ...prev,
      PassportExpireDate: new Date(data).toLocaleDateString("sv"),
    }));
    setEXPOpen(false);
  };

  let formData = new FormData();
  for (const [key, value] of Object.entries(inputs)) {
    // Do something with the key-value pair
    formData.append(key, value);
  }

  formData.append("passportphotoUrl", file); //for the image file

  const handleAddTraveler = (e) => {
    setIsLoading(true);
    e.preventDefault();

    const url = `https://flyfarladies-apiv2.appspot.com/user/${users?.uuid}/addtraveler`;
    const config = {
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios.post(url, formData, config).then((res) => {
      if (res?.data?.status === "success") {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: res?.data?.status,
          text: res?.data?.message,
          confirmButtonText: "ok",
        }).then(function () {
          navigate("/dashboard/myTravellerList");
        });
      } else {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: res?.data?.status,
          text: res?.data?.message,
          confirmButtonText: "ok",
        });
      }
    });
  };

  return (
    <Box sx={{ mb: "2rem" }}>
      <Container>
        <Header />
      </Container>
      <Box
        sx={{
          bgcolor: "#fff",
          py: "2vh",
          position: "sticky",
          top: "0px",
          zIndex: "999",
        }}
      >
        <Container>
          <Typography
            sx={{
              fontSize: "30px",
              color: "var(--primary-color)",
              fontWeight: 500,
            }}
          >
            My Traveler List
          </Typography>
        </Container>
      </Box>
      <Container>
        <form onSubmit={handleAddTraveler}>
          <Grid
            sx={{
              background: "var(--white)",
              borderRadius: "5px",
              mt: 5,
              p: 4,
              input: {
                width: "100%",
                border: "none",
                background: "var(--input-bgcolor)",
                height: "35px",
                fontSize: "12px",
                color: "var(--text-mateBlack)",
                padding: "0px 5px",
                borderRadius: "3px",
                boxSizing: "border-box",
              },
              select: {
                width: "100%",
                border: "none",
                background: "var(--input-bgcolor)",
                height: "35px",
                fontSize: "12px",
                color: "#7d7b7b",
                padding: "0px 5px",
                borderRadius: "3px",
                boxSizing: "border-box",
              },
            }}
          >
            <Box>
              <Typography>Personal Information</Typography>
            </Box>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={6} md={4}>
                <input
                  type="text"
                  required
                  placeholder="Enter First / Given Name"
                  name="FirstName"
                  value={inputs.FirstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <input
                  type="text"
                  required
                  placeholder="Enter Last / Surname "
                  name="LastName"
                  value={inputs.LastName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{
                  position: "relative",
                  height: "50px",
                }}
              >
                <Box
                  style={{
                    backgroundColor: "var(--input-bgcolor)",
                    height: "100%",
                    width: "100%",
                    borderRadius: "3px",
                  }}
                  onClick={() => {
                    setTimeout(() => setDobOpen((prev) => !prev), 200);
                  }}
                >
                  <Stack direction="row" alignItems="center" height="100%">
                    <Box cursor="pointer">
                      <Typography
                        sx={{
                          color: "#808080",
                          fontSize: { xs: "12px", sm: "12px" },
                          padding: "0px 10px",
                        }}
                      >
                        Date Of Birth{" "}
                        {`${format(new Date(inputs?.DOB), "dd MMM yy")}`}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                {dobOpen && (
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 10,
                      top: "100%",
                      left: { xs: "auto", md: "auto", lg: "18px" },
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.09)",
                    }}
                  >
                    <Calendar
                      color="var(--primary-color)"
                      // date={new Date(dob)}
                      onChange={handleSelectDOB}
                      months={1}
                      style={{
                        fontSize: "11px",
                        padding: "0",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.09)",
                      }}
                    />
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <select
                  required
                  id="trip"
                  name="PaxType"
                  value={inputs?.PaxType}
                  onChange={handleChange}
                >
                  <option value="">Select PAX Type</option>
                  <option value="Adult">Adult</option>
                  <option value="Child">Child</option>
                  <option value="Infant">Infant</option>
                </select>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <select
                  required
                  id="trip"
                  name="Nationality"
                  value={inputs?.Nationality}
                  onChange={handleChange}
                >
                  <option value="">Select Nationality</option>
                  {CountryList.map((data) => (
                    <option value={data?.name}>{data?.name}</option>
                  ))}
                </select>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <select
                  required
                  id="trip"
                  name="Gender"
                  value={inputs?.Gender}
                  onChange={handleChange}
                >
                  <option>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Typography>Passport Information</Typography>
            </Box>
            <Grid
              container
              spacing={2}
              mt={1}
              display="flex"
              justifyContent={"flex-end"}
            >
              <Grid item xs={12} sm={6} md={4}>
                <input
                  type="text"
                  required
                  placeholder="Enter Passport Number"
                  name="PassportNumber"
                  value={inputs?.PassportNumber}
                  onChange={handleChange}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{
                  position: "relative",
                  height: "50px",
                }}
              >
                <Box
                  style={{
                    backgroundColor: "var(--input-bgcolor)",
                    height: "100%",
                    width: "100%",
                    borderRadius: "3px",
                  }}
                  onClick={() => {
                    setTimeout(() => setEXPOpen((prev) => !prev), 200);
                  }}
                >
                  <Stack direction="row" alignItems="center" height="100%">
                    <Box cursor="pointer">
                      <Typography
                        sx={{
                          color: "#808080",
                          fontSize: { xs: "12px", sm: "12px" },
                          padding: "0px 10px",
                        }}
                      >
                        Passport Expire Date{" "}
                        {`${format(
                          new Date(inputs?.PassportExpireDate),
                          "dd MMM yy"
                        )}`}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                {expOpen && (
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 10,
                      top: "100%",
                      left: { xs: "auto", md: "auto", lg: "18px" },
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.09)",
                    }}
                  >
                    <Calendar
                      color="var(--primary-color)"
                      // date={new Date(expirDate)}
                      onChange={handleSelectEXP}
                      months={1}
                      minDate={new Date()}
                      style={{
                        fontSize: "11px",
                        padding: "0",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.09)",
                      }}
                    />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box className="input-File1">
                  <input
                    required
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      padding: "5px 10px",
                      boxSizing: "border-box",
                      borderRadius: "3px",
                      width: "100%",
                    }}
                    className="customFileType"
                    type="file"
                    title="Choose Passport Copy"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  sx={{
                    fontFamily: "poppins",
                    fontWeight: "400",
                    height: "33px",
                    fontSize: "13px",
                    textTransform: "capitalize",
                    borderRadius: "2px",
                    background: "#222222",
                    color: "#FFFFFF",
                    width: "100%",
                    mt: "15px",
                    "&:hover": {
                      backgroundColor: "#222222",
                    },
                  }}
                  type="submit"
                >
                  {isLoading === false
                    ? " Add this Traveler"
                    : // <Box style={{ width: "10px" }}>
                      //   <CircularProgress
                      //     style={{
                      //       height: "22px",
                      //       width: "22px",
                      //     }}
                      //   />
                      // </Box>

                      "Processing"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
      <Box mt={25}>
        <Footer />
      </Box>
    </Box>
  );
}

export default AddTraveler;
