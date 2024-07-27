import React, { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Checkbox,
  FormGroup,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import useAuthentication from "../../hooks/useAuthentication";
import secureLocalStorage from "react-secure-storage";
import { LoginSocialGoogle } from "reactjs-social-login";
import { useQuery } from "react-query";

const UserSigninSignup = ({ open, setOpen, home }) => {
  const navigate = useNavigate();
  const { loginUser, isLoading, error } = useAuthentication();
  const [loading, setLoading] = useState(false);
  // const location = useLocation();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [showPassword, setShowPassword] = useState(false);
  const [checkedSignUp, setCheckedSignUp] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //  todo: register function
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    let body = JSON.stringify({
      Name: name,
      Mobile: mobile,
      Email: email,
      Password: password,
    });

    const url = `https://flyfarladies-apiv2.appspot.com/user/register`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data?.status === "success") {
          setOpen(false);
          Swal.fire({
            icon: "success",
            title: data?.message,
            button: "Done!",
          }).then(function () {
            secureLocalStorage.setItem("UserData", data);
            let body = JSON.stringify({
              Email: email,
              Password: password,
            });
            let url = `https://flyfarladies-apiv2.appspot.com/user/login`;
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
                if (data.status === "success") {
                  secureLocalStorage.setItem("user-info", data?.jwtToken);
                  const url = `https://flyfarladies-apiv2.appspot.com/user/verify`;
                  let body1 = JSON.stringify({
                    jwtToken: data?.jwtToken,
                  });
                  fetch(url, {
                    method: "POST",
                    headers: {
                      Accept: "*/*",
                      "Content-Type": "application/json",
                    },
                    body: body1,
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      secureLocalStorage.setItem("UserData", data);
                      navigate(0);
                    });
                }
              });
          });
        } else {
          setOpen(false);
          Swal.fire({
            icon: "error",
            title: data?.message,
            button: "Done!",
          }).then(function () {
            navigate(0);
          });
        }
      });
  };

  //  todo: login user
  const rememberUser = secureLocalStorage.getItem("remember");
  const [loginData, setLoginData] = useState({
    email: rememberUser?.email || "",
    password: rememberUser?.password || "",
  });

  const [checkBox, setCheckBox] = useState(rememberUser?.isChecked);
  const handleCheckBox = (e) => {
    setCheckBox(e.target.checked);
    if (e.target.checked) {
      secureLocalStorage.setItem("remember", {
        email: loginData.email,
        password: loginData.password,
        isChecked: e.target.checked,
      });
    } else {
      secureLocalStorage.removeItem("remember");
    }
  };

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  // google authentication

  const fetchProfile = async () => {
    const response = await fetch(
      "https://flyfarladies-apiv2.appspot.com/user/AllProfile"
    );
    const data = await response.json();
    return data?.Profile;
  };

  const {
    data: userEmail,
    refetch,
    isLoading: isLoaded,
  } = useQuery("profileData", fetchProfile);

  if (isLoaded) {
    return "Loading ...";
  }

  const googleLogin = (data) => {
    setOpen(!open);
    refetch();
    const generatePassword = data?.family_name + data?.family_name + "#@";
    const googleEmail = data?.email;

    const validEmail = userEmail?.filter((data) => {
      return data?.Email === googleEmail;
    });

    let body = {
      Name: data?.name,
      Mobile: "",
      Email: googleEmail,
      Password: generatePassword,
      PassportsizephotoUrl: data?.picture,
    };

    if (!validEmail[0]?.Email) {
      const url = `https://flyfarladies-apiv2.appspot.com/user/register`;
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);

          if (data?.status === "success") {
            secureLocalStorage.setItem("UserData", data);
            let body = JSON.stringify({
              Email: googleEmail,
              Password: generatePassword,
            });
            let url = `https://flyfarladies-apiv2.appspot.com/user/login`;
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
                if (data.status === "success") {
                  secureLocalStorage.setItem("user-info", data?.jwtToken);
                  const url = `https://flyfarladies-apiv2.appspot.com/user/verify`;
                  let body1 = JSON.stringify({
                    jwtToken: data?.jwtToken,
                  });
                  fetch(url, {
                    method: "POST",
                    headers: {
                      Accept: "*/*",
                      "Content-Type": "application/json",
                    },
                    body: body1,
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      secureLocalStorage.setItem("UserData", data);
                      Swal.fire({
                        icon: "success",
                        title: "Login Successful",
                        button: "Done!",
                      }).then(() => {
                        window.location.reload(true);
                      });
                    });
                }
              });
            setOpen(false);
          }
        });
    } else {
      secureLocalStorage.setItem("UserData", validEmail[0]);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        button: "Done!",
      }).then(() => {
        window.location.reload(true);
      });
    }
  };

  // ---------sign in with google end new

  return (
    <Box>
      {/*  login signup information */}
      <>
        {checkedSignUp === true ? (
          <Box>
            <Typography
              id="modal-modal-title"
              sx={{
                color: "#525371",
                fontSize: "25px",
                fontWeight: "500",
              }}
            >
              Sign Up
            </Typography>
            <form onSubmit={handleRegister}>
              <Box mt={2}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    className="input-field"
                    sx={{ paddingTop: "15px !important" }}
                  >
                    <Box style={{ position: "relative" }}>
                      <PermIdentityIcon
                        style={{
                          fontSize: "26px",
                          position: "absolute",
                          top: "8px",
                          left: "5px",
                          color: "#B6B6CC",
                        }}
                      />
                      <input
                        required
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
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    className="input-field"
                    sx={{ paddingTop: "15px !important" }}
                  >
                    <Box style={{ position: "relative" }}>
                      <MarkunreadIcon
                        style={{
                          fontSize: "22px",
                          position: "absolute",
                          top: "9px",
                          left: "5px",
                          color: "#B6B6CC",
                        }}
                      />

                      <input
                        required
                        type="email"
                        id="fname"
                        placeholder="Enter your email"
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
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    className="input-field"
                    sx={{ paddingTop: "15px !important" }}
                  >
                    <Box style={{ position: "relative" }}>
                      <LocalPhoneIcon
                        style={{
                          fontSize: "22px",
                          position: "absolute",
                          top: "9px",
                          left: "5px",
                          color: "#B6B6CC",
                        }}
                      />
                      <input
                        required
                        type="text"
                        id="fname"
                        placeholder="Enter your contact number"
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
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    className="input-field"
                    sx={{ paddingTop: "15px !important" }}
                  >
                    <Box style={{ position: "relative" }}>
                      <LockIcon
                        style={{
                          fontSize: "22px",
                          position: "absolute",
                          top: "9px",
                          left: "5px",
                          color: "#B6B6CC",
                        }}
                      />
                      <input
                        required
                        type={showPassword ? "text" : "password"}
                        id="fname"
                        placeholder="Enter your password"
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
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Box
                        onClick={handleClickShowPassword}
                        style={{
                          fontSize: "22px",
                          position: "absolute",
                          top: "9px",
                          right: "5px",
                        }}
                      >
                        {showPassword ? (
                          <Visibility
                            style={{ color: "#B6B6CC" }}
                            className="fonticon09"
                          />
                        ) : (
                          <VisibilityOff
                            style={{ color: "#B6B6CC" }}
                            className="fonticon09"
                          />
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Box style={{ display: "flex", alignItems: "center" }} mt={2}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          sx={{
                            color: "#BC6277",
                            "&.Mui-checked": {
                              color: "#BC6277",
                            },
                          }}
                        />
                      }
                    />
                  </FormGroup>
                  <span style={{ color: "#B6B6CC", fontSize: "14px" }}>
                    By creating an account you agree to our{" "}
                    <span style={{ color: "#BC6277" }}>Terms & Conditions</span>
                  </span>
                </Box>
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
                  >
                    {loading === false ? (
                      "Sign Up"
                    ) : (
                      <CircularProgress
                        style={{
                          height: "20px",
                          width: "20px",
                        }}
                      />
                    )}
                  </button>

                  <Typography
                    style={{
                      color: "#B6B6CC",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                    mt={1}
                  >
                    Already have a Account?{" "}
                    <span
                      onClick={() => setCheckedSignUp(false)}
                      style={{
                        color: "var(--primary-color)",
                        cursor: "pointer",
                      }}
                    >
                      Sign In
                    </span>
                  </Typography>
                </Box>
              </Box>
            </form>
          </Box>
        ) : (
          <Box>
            <Typography
              id="modal-modal-title"
              sx={{
                color: "#525371",
                fontSize: "25px",
                fontWeight: "500",
              }}
            >
              Sign In
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box mt={2}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    className="input-field"
                    sx={{ paddingTop: "15px !important" }}
                  >
                    <Box style={{ position: "relative" }}>
                      <PermIdentityIcon
                        style={{
                          fontSize: "26px",
                          position: "absolute",
                          top: "8px",
                          left: "5px",
                          color: "#B6B6CC",
                        }}
                      />
                      <input
                        value={loginData.email}
                        name="email"
                        type="email"
                        id="fname"
                        placeholder="Email "
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
                        onChange={handleOnChange}
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    className="input-field"
                    sx={{ paddingTop: "15px !important" }}
                  >
                    <Box style={{ position: "relative" }}>
                      <LockIcon
                        style={{
                          fontSize: "22px",
                          position: "absolute",
                          top: "9px",
                          left: "5px",
                          color: "#B6B6CC",
                        }}
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="fname"
                        placeholder="Password"
                        name="password"
                        value={loginData.password}
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
                        onChange={handleOnChange}
                      />
                      <Box
                        onClick={handleClickShowPassword}
                        style={{
                          fontSize: "22px",
                          position: "absolute",
                          top: "9px",
                          right: "5px",
                        }}
                      >
                        {showPassword ? (
                          <Visibility
                            style={{ color: "#B6B6CC" }}
                            className="fonticon09"
                          />
                        ) : (
                          <VisibilityOff
                            style={{ color: "#B6B6CC" }}
                            className="fonticon09"
                          />
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Box style={{ display: "flex", alignItems: "center" }} mt={2}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          sx={{
                            color: "#BC6277",
                            "&.Mui-checked": {
                              color: "#BC6277",
                            },
                          }}
                        />
                      }
                    />
                  </FormGroup>
                  <span style={{ color: "#B6B6CC", fontSize: "14px" }}>
                    By creating an account you agree to our{" "}
                    <span style={{ color: "#BC6277" }}>Terms & Conditions</span>
                  </span>
                </Box>
                <Box style={{ textAlign: "center" }} mt={1}>
                  <Box>
                    <button
                      style={{
                        width: "100%",
                        height: "40px",
                        border: "none",
                        background: "var(--primary-color)",
                        color: "#fff",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontSize: "15px",
                      }}
                      onClick={() => {
                        loginUser(loginData, navigate);
                      }}
                      disabled={!isLoading ? true : false}
                    >
                      {isLoading ? (
                        "Log In"
                      ) : (
                        <CircularProgress
                          style={{
                            height: "20px",
                            width: "20px",
                          }}
                        />
                      )}
                    </button>
                  </Box>

                  <Box mt={1}>
                    <span style={{ color: "red" }}>{error}</span>
                  </Box>

                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                    mt={2}
                  >
                    <hr style={{ width: "50%" }} />
                    <span
                      style={{
                        color: "var(--primary-color)",
                        fontSize: "18px",
                      }}
                    >
                      OR
                    </span>
                    <hr style={{ width: "50%" }} />
                  </Box>
                </Box>
              </Box>
            </form>

            <Box mt={2}>
              <LoginSocialGoogle
                client_id={
                  "318200802709-sbsqoc8004rn7qnarji1k80tu4i4kfg8.apps.googleusercontent.com"
                }
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={({ provider, data }) => {
                  googleLogin(data);
                }}
                onReject={(err) => {
                  console.log(err);
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  sx={{
                    bgcolor: "var(--input-bgcolor)",
                    p: 0.8,
                    textAlign: "center",
                    border: "1px solid #B6B6CC",
                    color: "#B6B6CC",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  <GoogleIcon style={{ color: "var(--tab-text)" }} /> Login with
                  Google
                </Stack>
              </LoginSocialGoogle>
            </Box>
            <Typography
              style={{
                color: "#B6B6CC",
                fontSize: "14px",
                fontWeight: "500",
                textAlign: "center",
              }}
              mt={1}
            >
              Don't have a Account?{" "}
              <span
                onClick={() => setCheckedSignUp(true)}
                style={{
                  color: "var(--primary-color)",
                  cursor: "pointer",
                }}
              >
                Sign Up
              </span>
            </Typography>
          </Box>
        )}
      </>
    </Box>
  );
};

export default UserSigninSignup;
