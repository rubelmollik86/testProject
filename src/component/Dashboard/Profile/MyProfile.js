import {
  Box,
  Container,
  Grid,
  Modal,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Home/Footer/Footer";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import secureLocalStorage from "react-secure-storage";
import CountryList from "../../CountryList";
import Swal from "sweetalert2";
import dummyWomen from "../../../Assets/Ladies/dummyimg.png";
import { Link, useNavigate } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 350, md: 1000 },
  bgcolor: "white",
  outline: "none",
  p: 3,
  borderRadius: "5px",
  overflow: "auto",
  height: {
    xs: "95%",
    sm: "auto",
  },
  display: "block",
};

function MyProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = secureLocalStorage.getItem("UserData");
  const [userData, setProfileData] = useState([]);
  const [FirstName, setFirstName] = useState(userData?.Name || "");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [NameTitle, setNameTitle] = useState("");
  const [LastName, setLastName] = useState("");
  const [Gender, setGender] = useState("");
  const [DOB, setDOB] = useState("");
  const [Profession, setProfession] = useState("");
  const [Nationality, setNationality] = useState("");
  const [NID, setNID] = useState("");
  const [Email, setEmail] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Adress, setAdress] = useState("");
  const [FacebookId, setFacebookId] = useState("");
  const [LinkedIn, setLinkedIn] = useState("");
  const [PassportNumber, setPassportNumber] = useState("");
  const [PassportExpireDate, setPassportExpireDate] = useState("");
  const [passportphotoUrl, setPassportphotoUrl] = useState("");
  const [PassportsizephotoUrl, setPassportsizephotoUrl] = useState("");

  useEffect(() => {
    const url = `https://flyfarladies-apiv2.appspot.com/user/${userInfo?.uuid}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const userData = data?.dashboard;
        setProfileData(userData);
        setNameTitle(userData?.NameTitle);
        setFirstName(userData?.Name);
        setLastName(userData?.LastName);
        setGender(userData?.Gender);
        setDOB(userData?.DOB);
        setProfession(userData?.Profession);
        setNationality(userData?.Nationality);
        setNID(userData?.NID);
        setEmail(userData?.Email);
        setMobile(userData?.Mobile);
        setAdress(userData?.Address);
        setPassportNumber(userData?.PassportNumber);
        setPassportExpireDate(userData?.PassportExpireDate);
        setFacebookId(userData?.FaceBookId);
        setLinkedIn(userData?.LinkedIn);
      });
  }, [userInfo?.uuid]);

  let body = JSON.stringify({
    NameTitle: NameTitle,
    FirstName: FirstName,
    LastName: LastName,
    Email: Email,
    DOB: DOB,
    Gender: Gender,
    Profession: Profession,
    Nationality: Nationality,
    NID: NID,
    Mobile: Mobile,
    Address: Adress,
    PassportNumber: PassportNumber,
    PassportExpireDate: PassportExpireDate,
    FaceBookId: FacebookId,
    LinkedIn: LinkedIn,
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const url = `https://flyfarladies-apiv2.appspot.com/user/update/${userData?.uuid}`;
    console.log(url, body);
    await fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setIsLoading(false);
          Swal.fire({
            icon: "success",
            title: data?.status,
            text: data?.message,
            confirmButtonText: "ok",
          }).then(navigate("/dashboard/profile"));
          handleClose(true);
        } else {
          setIsLoading(true);
          Swal.fire({
            icon: "error",
            title: data?.status,
            text: data?.message,
            confirmButtonText: "ok",
          });
        }
      });
  };

  //  image upload
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [previewImage, setPreviewImage] = useState("");
  const [hotdealflightimg3, setHotDealFlightImg3] = useState("");

  //todo:file upload section
  const handleUpdateImage = (name, value) => {
    const url = `https://flyfarladies-apiv2.appspot.com/user/updateprofile/${userData?.uuid}`;
    console.log(url);
    const formData = new FormData();
    formData.append("profilephoto", value);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      axios.patch(url, formData, config).then((res) => {
        console.log(res);
        if (res?.data?.status.toLowerCase() === "success") {
          Swal.fire({
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: res.data.message,
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          }).then(function () {
            caches
              .keys()
              .then((keyList) =>
                Promise.all(keyList.map((key) => caches.delete(key)))
              );
            window.location.reload(true);
          });
        } else {
          Swal.fire({
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: res.data.message,
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          }).then(function () {
            caches
              .keys()
              .then((keyList) =>
                Promise.all(keyList.map((key) => caches.delete(key)))
              );
            window.location.reload(true);
          });
        }
      });
    } catch (err) {
      console.error(err.message);
      Swal.fire({
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        title: err.message,
        confirmButtonColor: "var(--primary-color)",
        confirmButtonText: "Ok",
      }).then(function () {
        caches
          .keys()
          .then((keyList) =>
            Promise.all(keyList.map((key) => caches.delete(key)))
          );
        window.location.reload(true);
      });
    }
  };

  return (
    <Box>
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
            My Profile
          </Typography>
        </Container>
      </Box>

      <Container>
        <Box bgcolor="var(--white)" borderRadius="10px" py={2} mt={3}>
          <Grid
            container
            direction="column"
            sx={{
              py: 2,
              px: 3,
            }}
          >
            <Grid container direction="row" spacing={4}>
              <Grid item md={2.5}>
                <Box
                  sx={{
                    width: "100%",
                    height: { md: "210px", sm: "210px", xs: "210px" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <label
                    htmlFor="hotdealflightimg3"
                    style={{
                      width: "100%",
                      height: "100%",
                      border: hotdealflightimg3
                        ? "2px solid var(--secondary-color)"
                        : "none",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <input
                      id="hotdealflightimg3"
                      type="file"
                      accept=".png,.jpg,.jpeg,.wabp"
                      onChange={(e) =>
                        handleUpdateImage(
                          "hotdealflightimg3",
                          e.target.files[0]
                        )
                      }
                      style={{ height: "100%", width: "100%", display: "none" }}
                    />
                    {userData?.PassportsizephotoUrl ? (
                      <Box
                        sx={{
                          position: "relative",
                          backgroundImage: `url(${
                            userData?.PassportsizephotoUrl
                          }?t=${new Date().getTime()})`,
                          backgroundSize: " cover",
                          backgroundPosition: "center",
                          borderRadius: "10px",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        {" "}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          height: { md: "210px", sm: "210px", xs: "210px" },
                        }}
                      >
                        <Skeleton
                          variant="rectangular"
                          sx={{
                            width: "100%",
                            height: { md: "210px", sm: "210px", xs: "210px" },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "30px",
                            textAlign: "center",
                          }}
                        >
                          Upload Your Photo
                        </Skeleton>
                      </Box>
                    )}
                  </label>
                </Box>
              </Grid>

              <Grid item md={7.5}>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "12px",
                      md: "18px",
                      lg: "24px",
                    },
                    color: "var(--tab-text)",
                    fontWeight: "500",
                  }}
                >
                  {userData?.FirstName !== null ||
                  userData?.LastName !== null ? (
                    <>
                      {userData?.FirstName} {userData?.LastName}
                    </>
                  ) : (
                    <>{userData?.Name}</>
                  )}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "9px",
                      md: "10px",
                      lg: "14px",
                    },
                    color: "var(--secondary-color)",
                    fontWeight: "500",
                  }}
                >
                  {userData?.Profession || "Your Profession"}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, my: 1 }}>
                  <Link to={userData?.FaceBookId} target="_blank">
                    <FacebookIcon
                      sx={{
                        color: "var(--secondary-color)",
                        cursor: "pointer",
                        fontSize: "26px",
                      }}
                    />
                  </Link>

                  <Link
                    to={`https://wa.me/+${userData?.Mobile}`}
                    target="_blank"
                  >
                    <WhatsAppIcon
                      sx={{
                        color: "var(--secondary-color)",
                        cursor: "pointer",
                        fontSize: "26px",
                      }}
                    />
                  </Link>

                  <Link to={userData?.LinkedIn} target="_blank">
                    <LinkedInIcon
                      sx={{
                        color: "var(--secondary-color)",
                        cursor: "pointer",
                        fontSize: "26px",
                      }}
                    />
                  </Link>
                </Box>
              </Grid>
              <Grid item md={2}>
                <Box>
                  <button
                    style={{
                      border: "none",
                      height: "35px",
                      width: "120px",
                      cursor: "pointer",
                      color: "#fff",
                      background: "var(--primary-color)",
                      borderRadius: "5px",
                    }}
                    onClick={handleOpen}
                  >
                    Profile Update
                  </button>
                </Box>
              </Grid>
            </Grid>

            {/* Profile update */}

            <Modal open={open} onClose={handleClose}>
              <Box sx={style}>
                <Box>
                  <Typography
                    id="modal-modal-title"
                    sx={{
                      color: "#525371",
                      fontSize: "22px",
                      fontWeight: "500",
                    }}
                  >
                    Profile Information
                  </Typography>
                  <form onSubmit={handleProfileUpdate}>
                    <Box mt={2}>
                      <Grid container spacing={2}>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          className="input-field"
                          sx={{ paddingTop: "15px !important" }}
                        >
                          <Box style={{ position: "relative" }}>
                            <select
                              type="text"
                              id="fname"
                              placeholder="Enter your name"
                              name="fname"
                              autocomplete="off"
                              style={{
                                borderRadius: "3px",
                                background: "var(--input-bgcolor)",
                                width: "100%",
                                height: "45px",
                                border: "none",
                                padding: "0px 40px",
                                boxSizing: "border-box",
                              }}
                              onChange={(e) => setNameTitle(e.target.value)}
                            >
                              <option>
                                {" "}
                                {NameTitle !== null
                                  ? NameTitle
                                  : " Your Name Title"}{" "}
                              </option>
                              <option value="Mr">Mr</option>
                              <option value="Miss">Miss</option>
                              <option value="Mrs">Mrs</option>
                            </select>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          className="input-field"
                          sx={{ paddingTop: "15px !important" }}
                        >
                          <Box style={{ position: "relative" }}>
                            <input
                              type="text"
                              id="fname"
                              placeholder="Your First Name "
                              name="fname"
                              autocomplete="off"
                              style={{
                                borderRadius: "3px",
                                background: "var(--input-bgcolor)",
                                width: "100%",
                                height: "45px",
                                border: "none",
                                padding: "0px 40px",
                                boxSizing: "border-box",
                              }}
                              value={FirstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          className="input-field"
                          sx={{ paddingTop: "15px !important" }}
                        >
                          <Box style={{ position: "relative" }}>
                            <input
                              type="text"
                              id="fname"
                              placeholder="Your Last Name "
                              name="fname"
                              autocomplete="off"
                              style={{
                                borderRadius: "3px",
                                background: "var(--input-bgcolor)",
                                width: "100%",
                                height: "45px",
                                border: "none",
                                padding: "0px 40px",
                                boxSizing: "border-box",
                              }}
                              value={LastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          className="input-field"
                          sx={{ paddingTop: "15px !important" }}
                        >
                          <Box style={{ position: "relative" }}>
                            <select
                              type="text"
                              id="fname"
                              placeholder="Enter your name"
                              name="fname"
                              autocomplete="off"
                              style={{
                                borderRadius: "3px",
                                background: "var(--input-bgcolor)",
                                width: "100%",
                                height: "45px",
                                border: "none",
                                padding: "0px 40px",
                                boxSizing: "border-box",
                              }}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option>
                                {" "}
                                {Gender === "0" ? "Your Gender" : Gender}{" "}
                              </option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </Box>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          className="input-field"
                          sx={{ paddingTop: "15px !important" }}
                        >
                          <Box style={{ position: "relative" }}>
                            <input
                              style={{
                                borderRadius: "3px",
                                background: "var(--input-bgcolor)",
                                width: "100%",
                                height: "45px",
                                border: "none",
                                padding: "0px 40px",
                                boxSizing: "border-box",
                              }}
                              type="text"
                              onFocus={(e) => (e.target.type = "date")}
                              id="subtitle"
                              placeholder="Date of Birth"
                              name="dateOfBirth"
                              value={DOB}
                              onChange={(e) => setDOB(e.target.value)}
                            />
                          </Box>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          className="input-field"
                          sx={{ paddingTop: "15px !important" }}
                        >
                          <Box style={{ position: "relative" }}>
                            <input
                              type="text"
                              id="fname"
                              placeholder="Your Profession"
                              name="fname"
                              autocomplete="off"
                              outline="1px solid red"
                              style={{
                                borderRadius: "3px",
                                background: "var(--input-bgcolor)",
                                width: "100%",
                                height: "45px",
                                border: "none",
                                padding: "0px 40px",
                                boxSizing: "border-box",
                              }}
                              value={Profession}
                              onChange={(e) => setProfession(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          className="input-field"
                          sx={{ paddingTop: "15px !important" }}
                        >
                          <Box style={{ position: "relative" }}>
                            <select
                              type="text"
                              id="fname"
                              placeholder="Enter your name"
                              name="fname"
                              autocomplete="off"
                              style={{
                                borderRadius: "3px",
                                background: "var(--input-bgcolor)",
                                width: "100%",
                                height: "45px",
                                border: "none",
                                padding: "0px 40px",
                                boxSizing: "border-box",
                              }}
                              onChange={(e) => setNationality(e.target.value)}
                            >
                              <option>
                                {" "}
                                {Nationality !== null
                                  ? Nationality
                                  : "Your Nationality"}{" "}
                              </option>

                              {CountryList?.map((countryName) => (
                                <option value={countryName?.name}>
                                  {countryName?.name}
                                </option>
                              ))}
                            </select>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          className="input-field"
                          sx={{ paddingTop: "15px !important" }}
                        >
                          <Box style={{ position: "relative" }}>
                            <input
                              type="text"
                              id="fname"
                              placeholder="Your NID"
                              name="fname"
                              autocomplete="off"
                              outline="1px solid red"
                              style={{
                                borderRadius: "3px",
                                background: "var(--input-bgcolor)",
                                width: "100%",
                                height: "45px",
                                border: "none",
                                padding: "0px 40px",
                                boxSizing: "border-box",
                              }}
                              value={NID}
                              onChange={(e) => setNID(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          className="input-field"
                          sx={{ paddingTop: "15px !important" }}
                        >
                          <Box style={{ position: "relative" }}>
                            <input
                              type="email"
                              id="fname"
                              placeholder="Your Email"
                              name="fname"
                              autocomplete="off"
                              outline="1px solid red"
                              style={{
                                borderRadius: "3px",
                                background: "var(--input-bgcolor)",
                                width: "100%",
                                height: "45px",
                                border: "none",
                                padding: "0px 40px",
                                boxSizing: "border-box",
                              }}
                              value={Email}
                              // onChange={(e) => setEmail(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          className="input-field"
                          sx={{ paddingTop: "15px !important" }}
                        >
                          <Box style={{ position: "relative" }}>
                            <input
                              type="number"
                              id="fname"
                              placeholder="Your contact number"
                              name="fname"
                              autocomplete="off"
                              outline="1px solid red"
                              style={{
                                borderRadius: "3px",
                                background: "var(--input-bgcolor)",
                                width: "100%",
                                height: "45px",
                                border: "none",
                                padding: "0px 40px",
                                boxSizing: "border-box",
                              }}
                              value={Mobile}
                              onChange={(e) => setMobile(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          className="input-field"
                          sx={{ paddingTop: "15px !important" }}
                        >
                          <Box style={{ position: "relative" }}>
                            <input
                              type="text"
                              id="fname"
                              placeholder="Your Address"
                              name="fname"
                              autocomplete="off"
                              outline="1px solid red"
                              style={{
                                borderRadius: "3px",
                                background: "var(--input-bgcolor)",
                                width: "100%",
                                height: "45px",
                                border: "none",
                                padding: "0px 40px",
                                boxSizing: "border-box",
                              }}
                              value={Adress}
                              onChange={(e) => setAdress(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          className="input-field"
                          sx={{ paddingTop: "15px !important" }}
                        >
                          <Box style={{ position: "relative" }}>
                            <input
                              type="text"
                              id="fname"
                              placeholder="Your Passport number"
                              name="fname"
                              autocomplete="off"
                              outline="1px solid red"
                              style={{
                                borderRadius: "3px",
                                background: "var(--input-bgcolor)",
                                width: "100%",
                                height: "45px",
                                border: "none",
                                padding: "0px 40px",
                                boxSizing: "border-box",
                              }}
                              value={PassportNumber}
                              onChange={(e) =>
                                setPassportNumber(e.target.value)
                              }
                            />
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          className="input-field"
                          sx={{ paddingTop: "15px !important" }}
                        >
                          <Box style={{ position: "relative" }}>
                            <input
                              style={{
                                borderRadius: "3px",
                                background: "var(--input-bgcolor)",
                                width: "100%",
                                height: "45px",
                                border: "none",
                                padding: "0px 40px",
                                boxSizing: "border-box",
                              }}
                              type="text"
                              onFocus={(e) => (e.target.type = "date")}
                              id="subtitle"
                              placeholder="Passport Exp Date"
                              name="dateOfBirth"
                              value={PassportExpireDate}
                              onChange={(e) =>
                                setPassportExpireDate(e.target.value)
                              }
                            />
                          </Box>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          className="input-field"
                          sx={{ paddingTop: "15px !important" }}
                        >
                          <Box style={{ position: "relative" }}>
                            <input
                              type="text"
                              id="fname"
                              placeholder="Your Facebook Id Link"
                              name="fname"
                              autocomplete="off"
                              outline="1px solid red"
                              style={{
                                borderRadius: "3px",
                                background: "var(--input-bgcolor)",
                                width: "100%",
                                height: "45px",
                                border: "none",
                                padding: "0px 40px",
                                boxSizing: "border-box",
                              }}
                              value={FacebookId}
                              onChange={(e) => setFacebookId(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          className="input-field"
                          sx={{ paddingTop: "15px !important" }}
                        >
                          <Box style={{ position: "relative" }}>
                            <input
                              type="text"
                              id="fname"
                              placeholder="Your linkedin Id Link"
                              name="fname"
                              autocomplete="off"
                              outline="1px solid red"
                              style={{
                                borderRadius: "3px",
                                background: "var(--input-bgcolor)",
                                width: "100%",
                                height: "45px",
                                border: "none",
                                padding: "0px 40px",
                                boxSizing: "border-box",
                              }}
                              value={LinkedIn}
                              onChange={(e) => setLinkedIn(e.target.value)}
                            />
                          </Box>
                        </Grid>

                        {/* <Grid
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          className="input-field"
                          sx={{ paddingTop: "15px !important" }}
                        >
                          <Box style={{ position: "relative" }}>
                            <input
                              style={{
                                borderRadius: "3px",
                                background: "var(--input-bgcolor)",
                                color: "#000",
                                width: "100%",
                                border: "none",
                                padding: "10px 40px",
                                boxSizing: "border-box",
                              }}
                              className="customFileType"
                              type="text"
                              onFocus={(e) => (e.target.type = "file")}
                              id="subtitle"
                              placeholder="Profile Image"
                              name="dateOfBirth"
                              onChange={(e) =>
                                setPassportsizephotoUrl(e.target.files[0])
                              }
                            />
                          </Box>
                        </Grid> */}
                        {/* <Grid
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          className="input-field"
                          sx={{ paddingTop: "15px !important" }}
                        >
                          <Box style={{ position: "relative" }}>
                            <input
                              style={{
                                borderRadius: "3px",
                                background: "var(--input-bgcolor)",
                                color: "#000",
                                width: "100%",
                                border: "none",
                                padding: "10px 40px",
                                boxSizing: "border-box",
                              }}
                              className="customFileType"
                              type="text"
                              onFocus={(e) => (e.target.type = "file")}
                              id="subtitle"
                              placeholder="Passport Copy"
                              name="dateOfBirth"
                              onChange={(e) =>
                                setPassportphotoUrl(e.target.files[0])
                              }
                            />
                          </Box>
                        </Grid> */}
                      </Grid>

                      <Box style={{ textAlign: "center" }} mt={2}>
                        <button
                          style={{
                            width: "100%",
                            height: "35px",
                            border: "none",
                            background: "var(--primary-color)",
                            color: "#fff",
                            borderRadius: "3px",
                            cursor: "pointer",
                          }}
                          type="submit"
                        >
                          {isLoading === false
                            ? "Update Profile "
                            : "Processing.."}
                        </button>
                      </Box>
                    </Box>
                  </form>
                </Box>
              </Box>
            </Modal>

            {/* Update profile end here */}

            <Typography
              sx={{
                color: "var(--primary-color)",
                fontSize: { xs: "13px", md: "16px", lg: "16px" },
                fontWeight: 500,
              }}
              mt={3}
              mb={2}
            >
              Personal Information
            </Typography>

            <Grid container direction="row">
              <Grid xs={6} md={2.4}>
                <Box sx={{ mb: "10px" }}>
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontSize: "15px",
                    }}
                  >
                    Name Title
                  </Typography>
                  <Typography
                    style={{ fontSize: "14px", color: "var(--text-color)" }}
                  >
                    {userData?.NameTitle || "Your Name Title "}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontSize: "15px",
                    }}
                  >
                    Profession{" "}
                  </Typography>
                  <Typography
                    style={{ fontSize: "14px", color: "var(--text-color)" }}
                  >
                    {userData?.Profession || "Your Profession"}
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={6} md={2.4}>
                <Box sx={{ mb: "10px" }}>
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontSize: "15px",
                    }}
                  >
                    First Name / Given Name
                  </Typography>
                  <Typography
                    style={{ fontSize: "14px", color: "var(--text-color)" }}
                  >
                    {userData?.FirstName || "Your First Name"}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontSize: "15px",
                    }}
                  >
                    Nationality{" "}
                  </Typography>
                  <Typography
                    style={{ fontSize: "14px", color: "var(--text-color)" }}
                  >
                    {userData?.Nationality || "Your Nationality"}
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={6} md={2.4}>
                <Box sx={{ mb: "10px" }}>
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontSize: "15px",
                    }}
                  >
                    Last Name / Surname
                  </Typography>
                  <Typography
                    style={{ fontSize: "14px", color: "var(--text-color)" }}
                  >
                    {userData?.LastName || "Your Last Name"}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontSize: "15px",
                    }}
                  >
                    NID{" "}
                  </Typography>
                  <Typography
                    style={{ fontSize: "14px", color: "var(--text-color)" }}
                  >
                    {userData?.NID || "Your NID Number"}
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={6} md={2.4}>
                <Box sx={{ mb: "10px" }}>
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontSize: "15px",
                    }}
                  >
                    Gender
                  </Typography>
                  <Typography
                    style={{ fontSize: "14px", color: "var(--text-color)" }}
                  >
                    {userData?.Gender === "0"
                      ? "Your Gender"
                      : userData?.Gender}
                  </Typography>
                </Box>

                {/* <Box>
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontSize: "15px",
                    }}
                  >
                    Personal Passport Size Photo{" "}
                  </Typography>
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
                    />
                  </Box>
                </Box> */}
              </Grid>
              <Grid xs={6} md={2.4}>
                <Box sx={{ mb: "10px" }}>
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontSize: "15px",
                    }}
                  >
                    DOB
                  </Typography>
                  <Typography
                    style={{ fontSize: "14px", color: "var(--text-color)" }}
                  >
                    {userData?.DOB || "Your Date Of Birth"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontSize: { xs: "13px", md: "16px", lg: "16px" },
                fontWeight: 500,
              }}
              mt={3}
              mb={2}
            >
              Contact Information
            </Typography>
            <Grid container direction="row">
              <Grid xs={6} md={4}>
                <Box>
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontSize: "15px",
                    }}
                  >
                    Email
                  </Typography>
                  <Typography
                    style={{ fontSize: "14px", color: "var(--text-color)" }}
                  >
                    {userData?.Email || ""}
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={6} md={4}>
                <Box>
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontSize: "15px",
                    }}
                  >
                    Phone Number
                  </Typography>
                  <Typography
                    style={{ fontSize: "14px", color: "var(--text-color)" }}
                  >
                    {userData?.Mobile || "N/A"}
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={6} md={4}>
                <Box>
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontSize: "15px",
                    }}
                  >
                    Address
                  </Typography>
                  <Typography
                    style={{ fontSize: "14px", color: "var(--text-color)" }}
                  >
                    {userData?.Address || "Your Address"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontSize: { xs: "13px", md: "16px", lg: "16px" },
                fontWeight: 500,
              }}
              mt={3}
              mb={2}
            >
              Passport Information
            </Typography>

            <Grid container direction="row">
              <Grid xs={6} md={4}>
                <Box>
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontSize: "15px",
                    }}
                  >
                    Passport Number
                  </Typography>
                  <Typography
                    style={{ fontSize: "14px", color: "var(--text-color)" }}
                  >
                    {userData?.PassportNumber || "Your Passport Number"}
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={6} md={4}>
                <Box>
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontSize: "15px",
                    }}
                  >
                    Passport Expiry Date
                  </Typography>
                  <Typography
                    style={{ fontSize: "14px", color: "var(--text-color)" }}
                  >
                    {userData?.PassportExpireDate ||
                      "Your Passport Expire Date"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Box mt={20}>
        <Footer />
      </Box>
    </Box>
  );
}

export default MyProfile;
