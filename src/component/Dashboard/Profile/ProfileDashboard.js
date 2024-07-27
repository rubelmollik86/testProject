import { Box } from "@material-ui/core";
import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Home/Footer/Footer";
import woman from "../../../Assets/Ladies/woman.png";
import dummyWomen from "../../../Assets/Ladies/dummyimg.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LuggageIcon from "@mui/icons-material/Luggage";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PaymentsIcon from "@mui/icons-material/Payments";
import EventNoteIcon from "@mui/icons-material/EventNote";
import GroupsIcon from "@mui/icons-material/Groups";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import LogoutIcon from "@mui/icons-material/Logout";
import useAuthentication from "../../../hooks/useAuthentication";
import commaNumber from "comma-number";

function ProfileDashboard() {
  const { logout } = useAuthentication();
  const [loading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userData = secureLocalStorage.getItem("UserData");
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    const url = `https://flyfarladies-apiv2.appspot.com/user/${userData?.uuid}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setIsloading(true);
        setProfileData(data?.dashboard);
      });
  }, [userData?.uuid]);
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
            Dashboard
          </Typography>
        </Container>
      </Box>

      <Container>
        <Box bgcolor="var(--white)" borderRadius="10px">
          <Grid
            container
            spacing={3}
            sx={{
              mt: "3vh",
              mb: "15vh",
              pb: "3vh",
              px: 3,
            }}
          >
            <Grid item xs={12} md={6} lg={2.5}>
              <Box
                sx={{
                  position: "relative",
                  backgroundImage: `url(${
                    profileData?.PassportsizephotoUrl || dummyWomen
                  }?t=${new Date().getTime()})`,
                  backgroundSize: " cover",
                  backgroundPosition: "center",
                  borderRadius: "10px",
                  width: "100%",
                  height: "100%",
                }}
              ></Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={9.5}
              container
              direction="column"
              justifyContent="space-between"
            >
              <Grid
                container
                sx={{ mb: 4, display: "flex", justifyContent: "space-between" }}
              >
                <Grid item md={7} lg={9}>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "12px",
                        md: "20px",
                        lg: "28px",
                      },
                      color: "var(--primary-color)",
                      fontWeight: "500",
                    }}
                  >
                    {profileData?.FirstName !== null ||
                    profileData?.LastName !== null ? (
                      <>
                        {profileData?.FirstName} {profileData?.LastName}
                      </>
                    ) : (
                      <>{userData?.Name}</>
                    )}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "10px",
                        md: "12px",
                        lg: "15px",
                      },
                      color: "var(--tab-text)",
                      fontWeight: "500",
                    }}
                  >
                    {profileData?.Profession || "Your Profession"}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 5, my: 1 }}>
                    <Link to={`${profileData?.FaceBookId}`} target="_blank">
                      <FacebookIcon
                        sx={{
                          color: "var(--secondary-color)",
                          cursor: "pointer",
                          fontSize: "28px",
                        }}
                      />
                    </Link>

                    <Link
                      to={`https://wa.me/+${profileData?.Mobile}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <WhatsAppIcon
                        sx={{
                          color: "var(--secondary-color)",
                          cursor: "pointer",
                          fontSize: "28px",
                        }}
                      />
                    </Link>

                    <Link to={`${profileData?.LinkedIn}`} target="_blank">
                      <LinkedInIcon
                        sx={{
                          color: "var(--secondary-color)",
                          cursor: "pointer",
                          fontSize: "28px",
                        }}
                      />
                    </Link>
                  </Box>

                  {/* 
                  <Box
                    sx={{
                      bgcolor: "var(--tab-text)",
                      width: "130px",
                      borderRadius: "2px",
                      padding: "4px 5px",
                    }}
                    mt={2}
                  >
                    <Typography
                      sx={{
                        color: "var(--white)",
                        fontSize: {
                          xs: "8px",
                          md: "10px",
                          lg: "11px",
                        },
                      }}
                    >
                      Complete Tour: 05
                    </Typography>
                  </Box> */}
                </Grid>
                <Grid item md={5} lg={3}>
                  <Typography
                    sx={{
                      color: "var(--text-mateBlack)",
                      fontSize: {
                        xs: "12px",
                        md: "15px",
                        lg: "19px",
                      },
                      fontWeight: "500",
                    }}
                  >
                    Wallet Balance
                  </Typography>
                  <Typography
                    sx={{
                      color: "#1A1363",
                      fontSize: {
                        xs: "10px",
                        md: "14px",
                        lg: "18px",
                      },
                      fontWeight: "500",
                    }}
                  >
                    {commaNumber(profileData?.Wallet) || 0} BDT
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                container
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  // mb: "3vh",
                }}
              >
                <Grid
                  item
                  xs={12}
                  md={5.5}
                  lg={1.5}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 1,
                    bgcolor: "#FFEEF1",
                    borderRadius: "5px",
                    width: "100px",
                    height: {
                      xs: "50px",
                      md: "70px",
                      lg: "100px",
                    },
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/dashboard/myprofile")}
                >
                  <AccountCircleIcon
                    sx={{
                      color: "var(--primary-color)",
                      width: "42px",
                      height: {
                        xs: "20px",
                        md: "30px",
                        lg: "42px",
                      },
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "12px", color: "var(--primary-color)" }}
                  >
                    My Profile
                  </Typography>
                </Grid>
                <Grid
                  xs={12}
                  md={5.5}
                  lg={1.5}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 1,
                    cursor: "pointer",
                    bgcolor: "#FFEEF1",
                    borderRadius: "5px",
                    width: "100px",
                    height: {
                      xs: "50px",
                      md: "70px",
                      lg: "100px",
                    },
                  }}
                  onClick={() => navigate("/dashboard/mybookings")}
                >
                  <LuggageIcon
                    sx={{
                      color: "var(--primary-color)",
                      width: "42px",
                      height: {
                        xs: "20px",
                        md: "30px",
                        lg: "42px",
                      },
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "12px", color: "var(--primary-color)" }}
                  >
                    My Bookings
                  </Typography>
                </Grid>
                <Grid
                  xs={12}
                  md={5.5}
                  lg={1.5}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 1,
                    bgcolor: "#FFEEF1",
                    borderRadius: "5px",
                    width: "100px",
                    height: {
                      xs: "50px",
                      md: "70px",
                      lg: "100px",
                    },
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/dashboard/transaction")}
                >
                  <AccountBalanceWalletIcon
                    sx={{
                      color: "var(--primary-color)",
                      width: "42px",
                      height: {
                        xs: "20px",
                        md: "30px",
                        lg: "42px",
                      },
                    }}
                  />

                  <Typography
                    sx={{ fontSize: "12px", color: "var(--primary-color)" }}
                  >
                    My Wallet
                  </Typography>
                </Grid>
                <Grid
                  xs={12}
                  md={5.5}
                  lg={1.5}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 1,
                    bgcolor: "#FFEEF1",
                    borderRadius: "5px",
                    width: "100px",
                    height: {
                      xs: "50px",
                      md: "70px",
                      lg: "100px",
                    },
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/dashboard/ledgerreport")}
                >
                  <PaymentsIcon
                    sx={{
                      color: "var(--primary-color)",
                      width: "42px",
                      height: {
                        xs: "20px",
                        md: "30px",
                        lg: "42px",
                      },
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "12px", color: "var(--primary-color)" }}
                  >
                    Ledger Report
                  </Typography>
                </Grid>

                <Grid
                  xs={12}
                  md={5.5}
                  lg={1.5}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 1,
                    bgcolor: "#FFEEF1",
                    borderRadius: "5px",
                    width: "100px",
                    height: {
                      xs: "50px",
                      md: "70px",
                      lg: "100px",
                    },
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/dashboard/wishList")}
                >
                  <FavoriteIcon
                    sx={{
                      color: "var(--primary-color)",
                      width: "42px",
                      height: {
                        xs: "20px",
                        md: "30px",
                        lg: "42px",
                      },
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "12px", color: "var(--primary-color)" }}
                  >
                    Wishlist
                  </Typography>
                </Grid>

                {/* <Grid
                  xs={12}
                  md={5.5}
                  lg={1.5}
                  sx={{
                    display: "flex",
                    cursor: "pointer",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 1,
                   bgcolor: "#FFEEF1",
                    borderRadius: "5px",
                    width: "100px",
                    height: {
                      xs: "50px",
                      md: "70px",
                      lg: "100px",
                    },
                  }}
                  onClick={() => navigate("/dashboard/myblogs")}
                >
                  <EventNoteIcon
                    sx={{
                      color: "var(--primary-color)",
                      width: "42px",
                      height: {
                        xs: "20px",
                        md: "30px",
                        lg: "42px",
                      },
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "12px", color: "var(--primary-color)" }}
                  >
                    My Blogs
                  </Typography>
                </Grid> */}

                <Grid
                  xs={12}
                  md={5.5}
                  lg={1.5}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 1,
                    bgcolor: "#FFEEF1",
                    borderRadius: "5px",
                    width: "100px",
                    height: {
                      xs: "50px",
                      md: "70px",
                      lg: "100px",
                    },
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/dashboard/myTravellerList")}
                >
                  <GroupsIcon
                    sx={{
                      color: "var(--primary-color)",
                      width: "42px",
                      height: {
                        xs: "20px",
                        md: "30px",
                        lg: "42px",
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "var(--primary-color)",
                      mx: "20px",
                    }}
                  >
                    My Travel Buddy
                  </Typography>
                </Grid>

                <Grid
                  xs={12}
                  md={5.5}
                  lg={1.5}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 1,
                    bgcolor: "#FFEEF1",
                    borderRadius: "5px",
                    width: "100px",
                    height: {
                      xs: "50px",
                      md: "70px",
                      lg: "100px",
                    },
                    cursor: "pointer",
                  }}
                  onClick={logout}
                >
                  <LogoutIcon
                    sx={{
                      color: "var(--primary-color)",
                      width: "42px",
                      height: {
                        xs: "20px",
                        md: "28px",
                        lg: "38px",
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "var(--primary-color)",
                      mx: "20px",
                    }}
                  >
                    Logout
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default ProfileDashboard;
