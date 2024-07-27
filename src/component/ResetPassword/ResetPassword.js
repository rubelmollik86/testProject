import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// import PasswordStrengthBar from "react-password-strength-bar";
import Swal from "sweetalert2";

import InvalidLink from "../../image/undraw/undraw_share_link_re_54rx.svg";
import ResetPass from "../../image/undraw/undraw_forgot_password_re_hxwm.svg";

const ResetPassword = () => {
  const [loginData, setLoginData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [isCheck, setIsCheck] = useState(true);
  const [data, setData] = useState();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };
  const handleCheck = (e) => {
    // e.preventDefault();
    let url = `https://api.flyfarint.com/v.1.0.0/Auth/resetPassword.php?auth=${auth}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "active") {
          setIsCheck(isCheck);
          setData(data);
        } else {
          Swal.fire({
            imageUrl: InvalidLink,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Link is invalid or may be expired",
            confirmButtonText: "Try again",
            confirmButtonColor: "#dc143c",
          }).then(function () {
            navigate("/");
          });
        }
        // setIsLoading(false);
      });
    // e.target.reset();
  };
  useEffect(() => {
    handleCheck();
  }, [data]);

  let resetBody = {
    agentId: data?.agentId,
    newpassword: loginData?.password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    if (loginData.password !== loginData.confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
      setIsLoading(true);

      try {
        const response = await fetch(
          `https://api.flyfarint.com/v.1.0.0/Accounts/MyAccount.php?action=resetpassword`,
          {
            method: "POST",
            body: JSON.stringify(resetBody),

            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          Swal.fire({
            imageUrl: InvalidLink,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Link is invalid or may be expired",
            confirmButtonText: "Try again",
            confirmButtonColor: "#dc143c",
          }).then(function () {
            navigate("/");
          });
        } else {
          Swal.fire({
            imageUrl: ResetPass,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Password reset has been Successfully",
            showConfirmButton: false,
            timer: 1500,
          }).then(function () {
            navigate("/");
          });
        }
        const result = await response.json();

        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {" "}
      {isCheck ? (
        <>
          {" "}
          <Box
            sx={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="not-found-wrapper"
          >
            <Paper
              sx={{
                width: "321px",
                height: "fit-content",
              }}
            >
              <section className="login-parent">
                <Box>
                  <Box className="login-field" sx={{ textAlign: "center" }}>
                    <form method="POST" onSubmit={handleSubmit}>
                      <Box className="regiter-content" mb={2}>
                        <h2>Reset Password</h2>
                      </Box>
                      <FormControl>
                        <Box
                          position={"relative"}
                          display="flex"
                          alignItems="flex-start"
                          flexDirection={"column"}
                        >
                          <label
                            htmlFor="password-label"
                            style={{
                              color: "var(--primary-color)",
                              fontWeight: "bold",
                            }}
                          >
                            New Password
                          </label>
                          <Box
                            position={"relative"}
                            display="flex"
                            justifyContent={"flex-end"}
                            alignItems="center"
                          >
                            <input
                              className="email"
                              placeholder="New Password"
                              required
                              name="password"
                              id="password-label"
                              type={showPassword ? "text" : "password"}
                              onChange={handleOnChange}
                            />
                            <Box
                              position={"absolute"}
                              onClick={handleClickShowPassword}
                              mt="7px"
                              mr="5px"
                            >
                              {showPassword ? (
                                <Visibility className="fonticon09" />
                              ) : (
                                <VisibilityOff className="fonticon09" />
                              )}
                            </Box>
                          </Box>
                          {/* <PasswordStrengthBar password={loginData.password} /> */}
                        </Box>
                      </FormControl>
                      <br />
                      <br></br>
                      {/* Confirm Password */}
                      <FormControl>
                        <Box
                          position={"relative"}
                          display="flex"
                          alignItems="flex-start"
                          flexDirection="column"
                        >
                          <label
                            htmlFor="confirm-password-label"
                            style={{
                              color: "var(--primary-color)",
                              fontWeight: "bold",
                            }}
                          >
                            Confirm Password
                          </label>
                          <Box
                            position={"relative"}
                            display="flex"
                            justifyContent={"flex-end"}
                            alignItems="center"
                          >
                            <input
                              className="email"
                              placeholder="Confirm Password"
                              required
                              name="confirmPassword"
                              id="confirm-password-label"
                              type={showResetPassword ? "text" : "password"}
                              onChange={handleOnChange}
                            />
                            <Box
                              position={"absolute"}
                              onClick={() =>
                                setShowResetPassword((prev) => !prev)
                              }
                              mt="7px"
                              mr="5px"
                            >
                              {showResetPassword ? (
                                <Visibility className="fonticon09" />
                              ) : (
                                <VisibilityOff className="fonticon09" />
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </FormControl>
                      <Typography variant="subtitle2" sx={{}}>
                        {error}
                      </Typography>
                      <br />
                      <br></br>
                      <Box className="login-btn">
                        <Button type="submit" variant="contained">
                          {" "}
                          Reset Password
                        </Button>
                      </Box>
                    </form>
                  </Box>
                </Box>
              </section>
            </Paper>
          </Box>
        </>
      ) : (
        <>no data</>
      )}
    </>
  );
};

export default ResetPassword;
