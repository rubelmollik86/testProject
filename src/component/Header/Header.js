import React, { useState } from "react";
import { Box, Grid, Badge, Stack, Avatar } from "@mui/material";
import Logo from "../../Assets/Ladies/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Modal from "@mui/material/Modal";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import "./Header.css";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import UserSigninSignup from "../UserSigninSignup/UserSigninSignup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 350, md: 600 },
  bgcolor: "white",
  outline: "none",
  p: 3,
  borderRadius: "5px",
  overflow: "auto",
  height: {
    xs: "80%",
    sm: "auto",
  },
  display: "block",
};

const Header = () => {
  const userInfo = secureLocalStorage.getItem("UserData");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // wishlist
  const [wishListData, setWishListData] = useState([]);
  const [wishListCount, setWishListCount] = useState();
  useEffect(() => {
    fetch(
      `https://flyfarladies-apiv2.appspot.com/user/${userInfo?.uuid}/mywishlist`
    )
      .then((res) => res.json())
      .then((data) => {
        setWishListData(data);
        setWishListCount(data.length);
      });
  }, []);

  const wishlist = () => {
    if (userInfo?.uuid !== undefined) {
      navigate("/dashboard/wishList", {
        state: {
          userData: userInfo,
        },
      });
    } else {
      alert("Please login");
    }
  };

  return (
    <Box my={3}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        columnSpacing={2}
      >
        <Grid item>
          <NavLink to="/">
            <img src={Logo} alt="Logo" width={"108px"} />
          </NavLink>
        </Grid>

        {/* <Grid
          item
          sx={{ display: { xs: "none", sm: "flex", alignItems: "center" } }}
        >
          <Grid container columnSpacing={10}>
            <Grid item className="nav-bar-active">
              <Stack direction="row" spacing={3}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/service">Services</NavLink>
                <NavLink to="/blog">Blog</NavLink>
                <NavLink to="/about">About Us</NavLink>
              </Stack>
            </Grid>
          </Grid>
        </Grid> */}
        <Grid item>
          <Stack direction="row" spacing={2}>
            <Badge
              sx={{
                "& .MuiBadge-badge": {
                  color: "var(--text-color-b)",
                  backgroundColor: "var(--white)",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                },
              }}
              overlap="circular"
              badgeContent={wishListCount}
            >
              <Avatar sx={{ width: 40, height: 40, bgcolor: "transparent" }}>
                <FavoriteIcon
                  sx={{
                    fontSize: "30px",
                    color: "var(--primary-color)",
                    cursor: "pointer",
                  }}
                  onClick={wishlist}
                />
              </Avatar>
            </Badge>

            <Badge
              sx={{
                "& .MuiBadge-badge": {
                  color: "var(--text-color-b)",
                  backgroundColor: "var(--white)",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                },
              }}
              overlap="circular"
            >
              <Avatar sx={{ width: 40, height: 40, bgcolor: "transparent" }}>
                <ShoppingCartOutlinedIcon
                  sx={{ fontSize: "30px", color: "var(--primary-color)" }}
                />
              </Avatar>
            </Badge>
            <Badge
              sx={{
                "& .MuiBadge-badge": {
                  color: "var(--text-color-b)",
                  backgroundColor: "var(--white)",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                },
              }}
              overlap="circular"
              // badgeContent={count}
            >
              <Avatar sx={{ width: 40, height: 40, bgcolor: "transparent" }}>
                <NotificationsNoneOutlinedIcon
                  sx={{ fontSize: "30px", color: "var(--primary-color)" }}
                />
              </Avatar>
            </Badge>

            {userInfo?.Name || userInfo?.name ? (
              <span
                style={{
                  border: "none",
                  background: "var(--primary-color)",
                  color: "#fff",
                  borderRadius: "3px",
                  height: "35px",
                  padding: "0px 10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textDecoration: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
                onClick={() =>
                  navigate("/dashboard/profile", {
                    state: {
                      userData: userInfo,
                    },
                  })
                }
              >
                {/* {userInfo?.Picture ? (
                  <img
                    src={userInfo?.Picture}
                    width="25px"
                    style={{ borderRadius: "50%" }}
                    alt="profileimage"
                  />
                ) : (
                  <PersonRoundedIcon />
                )} */}
                &nbsp;{userInfo?.Name || userInfo?.name}
              </span>
            ) : (
              <button
                style={{
                  border: "none",
                  background: "var(--primary-color)",
                  cursor: "pointer",
                  color: "#fff",
                  borderRadius: "3px",
                  height: "35px",
                  width: "130px",
                }}
                onClick={handleOpen}
              >
                Login or SignUp
              </button>
            )}
          </Stack>
        </Grid>
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <UserSigninSignup home="home" open={open} setOpen={setOpen} />
        </Box>
      </Modal>
    </Box>
  );
};

export default Header;
