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
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
import { CircularProgress } from "@material-ui/core";
import Swal from "sweetalert2";
import Reset from "../../image/undraw/undraw_forgot_password_re_hxwm.svg";
import Invalid from "../../image/undraw/undraw_warning_re_eoyh.svg";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const auth = useParams();
  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let url = `https://api.flyfarint.com/v.1.0.0/Auth/forgetPassword.php?email=${loginData.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          Swal.fire({
            imageUrl: Reset,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Password reset link has been send",
            showConfirmButton: false,
            timer: 1500,
          }).then(function () {
            navigate("/");
          });
        } else {
          Swal.fire({
            imageUrl: Invalid,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Your email address is incorrect",
            confirmButtonText: "Try again",
            confirmButtonColor: "#dc143c",
          }).then(function () {
            navigate("/");
          });
        }
        setIsLoading(false);
      });
    e.target.reset();
  };

  return (
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
              <form onSubmit={handleSubmit}>
                <Box className="regiter-content" mb={2}>
                  <h2>Enter your Email</h2>
                </Box>

                <input
                  className="email"
                  placeholder="Enter Your Email"
                  name="email"
                  type="email"
                  onChange={handleOnChange}
                />
                <br />
                <br></br>

                <Box className="login-btn">
                  {!isLoading ? (
                    <Button type="submit" variant="contained">
                      Send
                    </Button>
                  ) : (
                    <CircularProgress />
                  )}
                </Box>
              </form>
            </Box>
          </Box>
        </section>
      </Paper>
    </Box>
  );
};

export default ForgetPassword;
