import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./MyAccount.css";
import profile from "../../../../image/profile.png";
import useAuthentication from "../../../../hooks/useAuthentication";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { Container } from "@mui/system";
import flyfarTrips from "../../../../image/my-account/flyfarTrips.png";
import swal from "sweetalert";
import account from "../../../../image/my-account/account.png";
import EditIcon from "@mui/icons-material/Edit";
import avarter from "../../../../image/davarter.png";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../../image/loader/Render.gif";
import axios from "axios";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";

import Success from "../../../../image/undraw/undraw_completed_tasks_vs6q.svg";
import Invalid from "../../../../image/undraw/undraw_warning_re_eoyh.svg";
import ServerDown from "../../../../image/undraw/undraw_server_down_s-4-lk.svg";
import ReConfirm from "../../../../image/undraw/undraw_confirmation_re_b6q5.svg";
import Delete from "../../../../image/undraw/undraw_throw_away_re_x60k.svg";
import { format } from "date-fns";

const MyAccount = () => {
  const navigate = useNavigate();
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 5,
  };
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openc, setOpenc] = useState(false);
  const [isLoadingbtn, setIsLoadingbtn] = useState(true);
  //todo: state change
  const [stateChange, setStateChange] = useState(false);
  //todo:end

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClosePassword = () => {
    setOpenc(false);
  };
  const handleOpenPassword = () => {
    setOpenc(true);
  };

  // Staff Password Change
  const [opens, setOpens] = useState(false);
  const staffHandleClosePassword = () => {
    setOpens(false);
  };
  const staffHandleOpenPassword = () => {
    setOpens(true);
  };

  const [oldShowPassword, setOldShowPassword] = useState(false);
  const [newShowPassword, setNewShowPassword] = useState(false);
  const [confShowPassword, setConfShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const [state, setState] = useState({
    oPassword: "",
    nPassword: "",
    cPassword: "",
  });
  const [passMatch, setPassMatch] = useState(true);

  const handleClickShowOldPassword = () => {
    setOldShowPassword(!oldShowPassword);
  };
  const handleClickShowNewPassword = () => {
    setNewShowPassword(!newShowPassword);
  };
  const handleClickShowConfPassword = () => {
    setConfShowPassword(!confShowPassword);
  };
  const [ropen, setrOpen] = useState(false);
  const rhandleOpen = () => setrOpen(true);
  const rhandleClose = () => setrOpen(false);

  const [userData, setUserData] = useState();
  const [staffData, setStaffData] = useState();
  const [checked, setChecked] = useState(true);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();
  //todo: userData secion
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyadd, setCompanyadd] = useState("");
  const [clientName, setClientName] = useState("");
  //todo:end

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const validatePassword = () => {
    if (state.nPassword === "") {
    } else if (state.cPassword) {
      state.nPassword === state.cPassword
        ? setPassMatch(true)
        : setPassMatch(false);
    }
  };
  useEffect(() => {
    validatePassword();
  }, [state]);

  // const users = JSON.parse(sessionStorage.getItem("user-info"));
  const users = secureLocalStorage.getItem("user-info");
  let agentID = users?.user?.agentId;
  let staffId = users?.user?.staffId;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    const url = `https://api.flyfarint.com/v.1.0.0/Accounts/MyAccount.php?agentId=${agentID}`;
    const urlStaff = `https://api.flyfarint.com/v.1.0.0/Staff/all.php?search=id&agentId=${agentID}&staffId=${staffId}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const responseStaff = await fetch(urlStaff);
        const data = await response.json();
        const dataStaff = await responseStaff.json();
        if (data.length > 0 || dataStaff.length > 0) {
          setIsLoading(true);
          setUserData(data[0]);
          setCompanyName(data[0]?.company || "");
          setEmail(data[0]?.email || "");
          setPhone(data[0]?.phone || "");
          setCompanyadd(data[0]?.companyadd || "");
          setClientName(data[0]?.name || "");
          setStaffData(dataStaff[0] || "");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [agentID, stateChange]);

  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");

  const onChangeProfile = (e) => {
    setImage(fileInputRef.current.click());
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image, stateChange]);

  const onSubmitProfile = async (e) => {
    e.preventDefault();
    setIsLoadingbtn(false);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        `https://api.flyfarint.com/v.1.0.0/Accounts/CompanyLogo.php?agentId=${agentID}`,

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { fileName, filePath } = res.data;
      if (res.data.status === "success") {
        setIsLoadingbtn(true);
        setIsLoading(true);
        setUploadedFile({ fileName, filePath });
        Swal.fire({
          imageUrl: Success,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "Company Logo Uploaded",
          confirmButtonColor: "#dc143c",
          confirmButtonText: "Ok",
        }).then(function () {
          caches.delete(res);
          window.history.forward(1);
          setStateChange((prev) => !prev);
          window.location.reload(true);
        });
      } else {
        Swal.fire({
          imageUrl: Invalid,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: `${res.data.message}`,
          confirmButtonColor: "#dc143c",
          confirmButtonText: "Ok",
        }).then(function () {
          caches.delete(res);
          window.history.forward(1);
          setStateChange((prev) => !prev);
          window.location.reload(true);
        });
      }
    } catch (err) {
      if (err.response.status === 500) {
        Swal.fire({
          imageUrl: ServerDown,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "Server Error!",
          confirmButtonColor: "#dc143c",
          confirmButtonText: "Ok",
        }).then(function () {
          setStateChange((prev) => !prev);
          window.location.reload(true);
        });
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  // --------------Update Data--------

  const handleSubmit = async (e) => {
    setIsLoadingbtn(false);
    e.preventDefault();

    let body = JSON.stringify({
      agentId: agentID,
      name: clientName,
      phone: phone,
      company: companyName,
      companyadd: companyadd,
    });

    await fetch(
      "https://api.flyfarint.com/v.1.0.0/Accounts/MyAccount.php?action=update",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setIsLoadingbtn(true);
          Swal.fire({
            imageUrl: Success,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Account Updated",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(function () {
            setStateChange((prev) => !prev);
            // window.location.reload(true);
          });
        } else {
          Swal.fire({
            imageUrl: ServerDown,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Server Error!",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then((err) => {
            setStateChange((prev) => !prev);
          });
        }
      });
    setOpen(false);
    e.target.reset();
  };

  const handleSubmitPassword = async (e) => {
    setIsLoadingbtn(false);
    e.preventDefault();
    let body = JSON.stringify({
      agentId: agentID,
      oldpassword: state.oPassword,
      newpassword: state.nPassword,
    });
    await fetch(
      "https://api.flyfarint.com/v.1.0.0/Accounts/MyAccount.php?action=changepassword",

      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setIsLoadingbtn(true);
          Swal.fire({
            imageUrl: Success,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Password Changed",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(function () {
            setStateChange((prev) => !prev);
            // window.location.reload(true);
          });
        } else {
          Swal.fire({
            imageUrl: Invalid,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            text: "Old Password Dose Not Match",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(() => {
            setStateChange((prev) => !prev);
          });
        }
      });
    setOpenc(false);
    e.target.reset();
  };

  // staff password change
  const staffHandleSubmitPassword = async (e) => {
    setIsLoadingbtn(false);
    e.preventDefault();
    let body = JSON.stringify({
      agentId: agentID,
      staffId: staffId,
      oldpassword: state.oPassword,
      newpassword: state.nPassword,
    });

    await fetch(
      "https://api.flyfarint.com/v.1.0.0/Accounts/MyAccount.php?action=changestaffpassword",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setIsLoadingbtn(true);
          Swal.fire({
            imageUrl: Success,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Password Changed",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(function () {
            setStateChange((prev) => !prev);
            // window.location.reload(true);
          });
        } else {
          Swal.fire({
            imageUrl: Invalid,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            text: "Old Password Dose Not Match",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(() => {
            setStateChange((prev) => !prev);
          });
        }
      });
    setOpens(false);
    e.target.reset();
  };

  const deleteLogo = (agentId) => {
    // agentId.preventDefault();
    setOpen(false);
    Swal.fire({
      imageUrl: ReConfirm,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      title: "Are you sure?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete it!",
      confirmButtonColor: "var(--primary-color)",
      cancelButtonText: "Don't Delete it",
      cancelButtonColor: "#dc143c",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        Swal.fire({
          imageUrl: Delete,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "Logo Deleted",
          confirmButtonColor: "#dc143c",
          confirmButtonText: "Ok",
        }).then(async function () {
          // setIsLoading(true);
          await fetch(
            `https://api.flyfarint.com/v.1.0.0/Accounts/deleteLogo.php?agentId=${agentID}`
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.status === "success") {
                setIsLoading(false);
                const reload = () => {
                  setStateChange((prev) => !prev);
                  navigate(0);
                };
                reload();
              } else {
                Swal.fire({
                  imageUrl: ServerDown,
                  imageWidth: 400,
                  imageHeight: 200,
                  imageAlt: "Custom image",
                  title: "Server Error",
                  confirmButtonColor: "#dc143c",
                  confirmButtonText: "Ok",
                }).then(() => {
                  setStateChange((prev) => !prev);
                  navigate(0);
                });
              }
              setIsLoading(false);
            });
        });
      }
    });
  };

  return (
    <Box>
      {!isLoading ? (
        <>
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
        </>
      ) : (
        <>
          <Container style={{ padding: "0" }}>
            <Grid container mt={1}>
              <Grid item xs={12} sm={6} mt={2}>
                <Typography
                  sx={{
                    color: "var(--primary-color)",
                    fontSize: "30px",
                    fontWeight: "bold",
                    fontFamily: "Poppins",
                    textTransform: "uppercase",
                  }}
                >
                  {userData?.company}
                </Typography>
                <Typography
                  sx={{
                    mt: 2,
                    color: "#272323",
                    fontSize: "25px",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  <AccountCircleRoundedIcon className="icon-color-00" />
                  {userData?.name}
                </Typography>
                <Typography
                  sx={{
                    color: "#272323",
                    fontSize: "18px",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                    display: "flex",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <EmailIcon className="icon-color-00" />
                  {userData?.email}
                </Typography>
                <Typography
                  sx={{
                    color: "#272323",
                    fontSize: "18px",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <CallIcon className="icon-color-00" /> {userData?.phone}
                </Typography>
                <Typography
                  sx={{
                    color: "#272323",
                    fontSize: "18px",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <LocationOnIcon className="icon-color-00" />
                  {userData?.companyadd}
                </Typography>
                <Grid container>
                  <Typography
                    sx={{
                      color: "#272323",
                      fontSize: "18px",
                      fontWeight: 500,
                      fontFamily: "Poppins",
                      display: "flex",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <CalendarMonthOutlinedIcon className="icon-color-00" />
                    Joining :{" "}
                    {userData?.joinAt
                      ? format(
                          new Date(userData?.joinAt),
                          "dd MMM yyyy hh:mm a"
                        )
                      : "Joining Date"}
                  </Typography>
                </Grid>
                <Box item xs={12} mt={-0.8}>
                  {!staffId ? (
                    <>
                      <button
                        className="change-pass-btn-0"
                        onClick={handleOpen}
                      >
                        Edit Account Information
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} sm={3} mt={"65px"}>
                {/* ------ */}
                {!staffId ? (
                  <Box>
                    <Typography fontSize="14px" mb={4}>
                      Only PNG file allowed and maximum image size 2MB, width:
                      150px height: 80px
                    </Typography>
                    <Box className="my-account-page-img">
                      <form onSubmit={onSubmitProfile}>
                        <Box
                          className="img-upload-btn"
                          onClick={onChangeProfile}
                        >
                          <EditIcon className="img-edit-btn" />
                        </Box>
                        <input
                          type="file"
                          style={{ display: "none" }}
                          ref={fileInputRef}
                          name="file"
                          accept="image/*"
                          onChange={(event) => {
                            const file = event.target.files[0];
                            if (file && file.type.substr(0, 5) === "image") {
                              setFile(file);
                              setImage(file);
                            } else {
                              setImage(null);
                            }
                          }}
                          required
                        />

                        <Box>
                          {userData?.companyImage !== "" || preview ? (
                            <>
                              {!preview ? (
                                <Box width="100%" height="100%" mt={2}>
                                  <img
                                    src={userData?.companyImage}
                                    style={{
                                      width: "100%",
                                      objectFit: "cover",
                                    }}
                                    alt={userData?.company}
                                  />
                                </Box>
                              ) : (
                                <>
                                  <Box width="100%" height="100%" mt={2}>
                                    <img
                                      src={preview}
                                      style={{
                                        width: "100%",
                                        objectFit: "cover",
                                      }}
                                      alt="Company Logo"
                                      onClick={() => {
                                        setImage(null);
                                      }}
                                    />
                                  </Box>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              <Box
                                width="200px"
                                height="80px"
                                mt={2}
                                border="2px solid var(--primary-color)"
                                padding={"2px"}
                                display="flex"
                                alignItems="center"
                                textAlign="center"
                              >
                                <Typography>
                                  Upload Your Company Logo
                                </Typography>
                              </Box>
                            </>
                          )}
                        </Box>
                        <Box className="save-button-0" mt={2}>
                          <button
                            style={{
                              backgroundColor: "var(--primary-color)",
                              outline: "none",
                              border: "none",
                              color: "#fff",
                              padding: "5px 20px",
                              width: "200px",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                            type="submit"
                            disabled={isLoadingbtn ? false : true}
                          >
                            {isLoadingbtn ? (
                              "Done"
                            ) : (
                              <CircularProgress
                                sx={{ height: "5px", width: "5px" }}
                              />
                            )}
                          </button>
                        </Box>
                      </form>
                    </Box>
                    <Box mt={2}>
                      <button
                        style={{
                          backgroundColor: "var(--gray-text-color)",
                          outline: "none",
                          border: "none",
                          color: "#fff",
                          padding: "5px 20px",
                          width: "200px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => deleteLogo(agentID)}
                      >
                        Delete
                      </button>
                    </Box>
                  </Box>
                ) : (
                  <></>
                )}

                <Box>
                  <Box item xs={12}>
                    {!staffId ? (
                      <>
                        <button
                          className="change-pass-btn-0"
                          onClick={handleOpenPassword}
                        >
                          Change Password
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </Box>

                  <Modal
                    open={openc}
                    onClose={handleClosePassword}
                    className="custom-modal-r"
                  >
                    <Box className="modalStyler">
                      <Box
                        bgcolor={"#fff"}
                        textAlign="center"
                        width="300px"
                        py={3}
                      >
                        <Typography
                          color={"var(--gray-text-color)"}
                          fontWeight={500}
                          fontSize="25px"
                          pb={3}
                        >
                          Update Password
                        </Typography>
                        <form onSubmit={handleSubmitPassword}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} position="relative">
                              <input
                                required
                                className="u-pass-input"
                                id="oPassword"
                                type={oldShowPassword ? "text" : "password"}
                                onChange={handleChange}
                                name="oldpassword"
                                placeholder="Old Password"
                              />
                              <Box
                                position={"absolute"}
                                sx={{ right: "30px", top: "43%" }}
                                onClick={handleClickShowOldPassword}
                              >
                                {oldShowPassword ? (
                                  <Visibility className="fonticon09" />
                                ) : (
                                  <VisibilityOff className="fonticon09" />
                                )}
                              </Box>
                            </Grid>

                            <Grid item xs={12} position="relative">
                              <input
                                required
                                id="nPassword"
                                className="u-pass-input"
                                value={state.password}
                                type={newShowPassword ? "text" : "password"}
                                onChange={handleChange}
                                name="newpassword"
                                placeholder="New Password"
                              />
                              <Box
                                position={"absolute"}
                                sx={{ right: "30px", top: "43%" }}
                                onClick={handleClickShowNewPassword}
                              >
                                {newShowPassword ? (
                                  <Visibility className="fonticon09" />
                                ) : (
                                  <VisibilityOff className="fonticon09" />
                                )}
                              </Box>
                              {/* <Box color="red">
                                {passMatch ? "" : "Passwords do not match"}
                              </Box> */}
                            </Grid>
                            {/* <Grid item xs={12} position="relative">
                              <input
                                required
                                id="cPassword"
                                value={state.cPassword}
                                className="u-pass-input"
                                type={confShowPassword ? "text" : "password"}
                                onChange={handleChange}
                                name="confpassword"
                                placeholder="Confirm Password"
                              />

                              <Box
                                position={"absolute"}
                                sx={{ right: "30px", top: "43%" }}
                                onClick={handleClickShowConfPassword}
                              >
                                {confShowPassword ? (
                                  <Visibility className="fonticon09" />
                                ) : (
                                  <VisibilityOff className="fonticon09" />
                                )}
                              </Box>
                            </Grid> */}
                            <Grid item xs={12} mt={0.5}>
                              <input
                                type="submit"
                                value="Update"
                                className="update-btn-modal-pass"
                              />
                            </Grid>
                          </Grid>
                        </form>
                      </Box>
                    </Box>
                  </Modal>
                </Box>
              </Grid>
            </Grid>
            {/* Staff Aount Information */}
            {!staffId ? (
              <></>
            ) : (
              <Grid item xs={12} sm={6} mt={4}>
                <Typography
                  sx={{
                    color: "var(--gray-text-color)",
                    fontSize: "30px",
                    fontWeight: "bold",
                    fontFamily: "Poppins",
                  }}
                >
                  STAFF ACCOUNT INFORMATION
                </Typography>
                <Typography
                  sx={{
                    mt: 2,
                    color: "#272323",
                    fontSize: "25px",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  <AccountCircleRoundedIcon className="icon-color-00" />
                  {staffData?.name}
                </Typography>
                <Typography
                  sx={{
                    color: "#272323",
                    fontSize: "18px",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                    display: "flex",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <EmailIcon className="icon-color-00" />
                  {staffData?.email}
                </Typography>
                <Typography
                  sx={{
                    color: "#272323",
                    fontSize: "18px",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <CallIcon className="icon-color-00" /> {staffData?.phone}
                </Typography>
                <Typography
                  sx={{
                    color: "#272323",
                    fontSize: "18px",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <LocationOnIcon className="icon-color-00" />
                  {staffData?.designation}
                </Typography>
                <Grid container>
                  <Typography
                    sx={{
                      color: "#272323",
                      fontSize: "18px",
                      fontWeight: 500,
                      fontFamily: "Poppins",
                      display: "flex",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <CalendarMonthOutlinedIcon className="icon-color-00" />
                    Joining :{" "}
                    {staffData?.created
                      ? format(
                          new Date(staffData?.created),
                          "dd MMM yyyy hh:mm a"
                        )
                      : "Joining Date"}
                  </Typography>
                </Grid>
                <Box item xs={12} mt={-0.8}>
                  <button
                    className="change-pass-btn-0"
                    onClick={staffHandleOpenPassword}
                  >
                    Change Password
                  </button>
                </Box>
                <Modal
                  open={opens}
                  onClose={staffHandleClosePassword}
                  className="custom-modal-r"
                >
                  <Box className="modalStyler">
                    <Box
                      bgcolor={"#fff"}
                      textAlign="center"
                      width="300px"
                      py={3}
                    >
                      <Typography
                        color={"var(--gray-text-color)"}
                        fontWeight={500}
                        fontSize="25px"
                        pb={3}
                      >
                        Update Password
                      </Typography>
                      <form onSubmit={staffHandleSubmitPassword}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} position="relative">
                            <input
                              required
                              className="u-pass-input"
                              id="oPassword"
                              type={oldShowPassword ? "text" : "password"}
                              onChange={handleChange}
                              name="oldpassword"
                              placeholder="Old Password"
                            />
                            <Box
                              position={"absolute"}
                              sx={{ right: "30px", top: "43%" }}
                              onClick={handleClickShowOldPassword}
                            >
                              {oldShowPassword ? (
                                <Visibility className="fonticon09" />
                              ) : (
                                <VisibilityOff className="fonticon09" />
                              )}
                            </Box>
                          </Grid>

                          <Grid item xs={12} position="relative">
                            <input
                              required
                              id="nPassword"
                              className="u-pass-input"
                              value={state.password}
                              type={newShowPassword ? "text" : "password"}
                              onChange={handleChange}
                              name="newpassword"
                              placeholder="New Password"
                            />
                            <Box
                              position={"absolute"}
                              sx={{ right: "30px", top: "43%" }}
                              onClick={handleClickShowNewPassword}
                            >
                              {newShowPassword ? (
                                <Visibility className="fonticon09" />
                              ) : (
                                <VisibilityOff className="fonticon09" />
                              )}
                            </Box>
                            {/* <Box color="red">
                              {passMatch ? "" : "Passwords do not match"}
                            </Box> */}
                          </Grid>

                          {/* <Grid item xs={12} position="relative">
                            <input
                              required
                              id="cPassword"
                              value={state.cPassword}
                              className="u-pass-input"
                              type={confShowPassword ? "text" : "password"}
                              onChange={handleChange}
                              name="confpassword"
                              placeholder="Confirm Password"
                            />

                            <Box
                              position={"absolute"}
                              sx={{ right: "30px", top: "43%" }}
                              onClick={handleClickShowConfPassword}
                            >
                              {confShowPassword ? (
                                <Visibility className="fonticon09" />
                              ) : (
                                <VisibilityOff className="fonticon09" />
                              )}
                            </Box>
                          </Grid> */}

                          <Grid item xs={12} mt={0.5}>
                            <input
                              type="submit"
                              value="Update"
                              className="update-btn-modal-pass"
                            />
                          </Grid>
                        </Grid>
                      </form>
                    </Box>
                  </Box>
                </Modal>
              </Grid>
            )}
            <Modal open={open} onClose={handleClose} className="custom-modal-r">
              <Box className="modalStyler">
                <Box bgcolor={"#fff"} p={3}>
                  <Typography
                    color={"var(--gray-text-color)"}
                    fontWeight={500}
                    fontSize="25px"
                    pb={3}
                  >
                    Update Account Information
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={6}>
                        <input
                          required
                          className="u-input"
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          name="company address"
                          placeholder="Company Name"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <input
                          disabled
                          className="u-input"
                          name="email"
                          type="text"
                          value={email}
                          placeholder={
                            "Company Email: " + " " + userData?.email
                          }
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <input
                          required
                          className="u-input"
                          type="text"
                          value={phone}
                          placeholder={"Your Phone: " + " " + userData?.phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={8}>
                        <input
                          className="u-input"
                          type="text"
                          value={companyadd}
                          placeholder={
                            "Company Address: " + " " + userData?.companyadd
                          }
                          onChange={(e) => setCompanyadd(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <input
                          className="u-input"
                          type="text"
                          value={clientName}
                          placeholder={"Your Name: " + " " + userData?.name}
                          onChange={(e) => setClientName(e.target.value)}
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        mb={3}
                        textAlign="end"
                        mt={0.5}
                      >
                        <input
                          type="submit"
                          value="Update"
                          className="update-btn-modal"
                        />
                      </Grid>

                      <Grid
                        container
                        ml={2}
                        display="flex"
                        justifyContent={"flex-end"}
                      >
                        <Grid
                          className="account-update-btn"
                          item
                          xs={12}
                          sm={6}
                          md={4}
                        ></Grid>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </Box>
            </Modal>
          </Container>
        </>
      )}
    </Box>
  );
};

export default MyAccount;
