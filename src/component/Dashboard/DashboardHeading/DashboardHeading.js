import {
  Badge,
  Button,
  ClickAwayListener,
  Grid,
  Modal,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as React from "react";
import commaNumber from "comma-number";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import humanizeDuration from "humanize-duration";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./DashboardHeading.css";
import secureLocalStorage from "react-secure-storage";
import "./DashboardHeading.css";
import { format } from "date-fns";
import RefreashBtn from "../../Shared/RefreashBtn/RefreashBtn";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 5,
    top: 10,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "#DC143C",
  },
}));

const DashboardHeading = ({ dashboardheadingsm }) => {
  const styles = {
    position: "absolute",
    top: 40,
    right: 0,
    left: 0,
    zIndex: 1,
    p: 1,
    bgcolor: "var(--primary-color)",
  };
  const navigate = useNavigate();
  // Modal
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openBlance, setOpenBalance] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [notificationClick, setNotificationClick] = useState(false);
  const [notification, setNotification] = useState([]);
  const [state, setState] = useState(false);
  const users = secureLocalStorage.getItem("user-info");
  let agentID = users?.user?.agentId;

  const [balance, setBalance] = useState({});
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    let url = `https://api.flyfarint.com/v.1.0.0/Accounts/MyAccount.php?agentId=${agentID}`;
    let url1 = `https://api.flyfarint.com/v.1.0.0/Accounts/ClientLeadger.php?agentId=${agentID}&balance`;
    let url2 = `https://api.flyfarint.com/v.1.0.0/Notification/all.php?agentId=${agentID}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUserData(data[0]));
    fetch(url1)
      .then((res) => res.json())
      .then((data) => {
        setBalance(data[0]);
      });
    fetch(url2)
      .then((res) => res.json())
      .then((data) => setNotification(data));
  }, [agentID]);

  //todo: time difference function
  const shortEnglishHumanizer = humanizeDuration.humanizer({
    round: true,
    language: "shortEn",
    languages: {
      shortEn: {
        y: () => "y",
        mo: () => "mo",
        w: () => "w",
        d: () => "d",
        h: () => "h",
        m: () => "m",
        s: () => "s",
        ms: () => "ms",
      },
    },
  });

  const handleClick = () => {
    setOpenBalance((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpenBalance(false);
  };
  //todo: end of time difference function



  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box
          className="notification-heading-parent dashboard-heading-lg"
          sx={{ display: "flex" }}
        >
          <Grid
            container
            className="notification-heading"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            textAlign="center"
            height={{ lg: "fit-content", md: "fit-content", xs: "fit-content" }}
          >
            <Grid item sm={4} md={2} lg={2} display="flex" alignItems="center">
              <a
                href="tel:09606-912912"
                style={{
                  textDecoration: "none",
                  color: "var(--primary-color)",
                  display: "flex",
                  alignItems: "center",
                }}
                rel="noreferrer"
              >
                <BsFillTelephoneFill
                  style={{
                    fontSize: "15px",
                    marginRight: "10px",
                    color: "#154572",
                  }}
                />
                <h5> +880 9606 912 912</h5>
              </a>
            </Grid>

            <Grid item sm={4} md={2} lg={2} display="flex" alignItems="center">
              <Tooltip
                title={
                  <Typography variant="subtitle2">
                    support@flyfarint.com
                  </Typography>
                }
              >
                <Typography>
                  <h5 style={{ display: "flex", alignItems: "center" }}>
                    <a
                      href="https://mail.google.com/mail/u/0/?tab=support@flyfarint.com"
                      target="_blank"
                      style={{
                        textDecoration: "none",
                        color: "var(--primary-color)",
                        display: "flex",
                        alignItems: "center",
                      }}
                      rel="noreferrer"
                    >
                      <GrMail
                        style={{
                          fontSize: "20px",
                          marginRight: "10px",
                          color: "#154572",
                        }}
                      />
                      support@flyfarint.com
                    </a>
                  </h5>
                </Typography>
              </Tooltip>
            </Grid>

            {/* <Grid item xs={6} md={3} lg={3} display="flex" alignItems="center">
                <Box sx={{ position: "relative" }}>
                  <button type="button" onClick={handleClick}>
                    {balance.lastAmount > 0 ? (
                      <Box display="flex" alignItems="center">
                        <FaMoneyCheckAlt
                          style={{
                            fontSize: "20px",
                            marginRight: "10px",
                            color: "#154572",
                          }}
                        />
                        <h5>Balance: {commaNumber(balance.lastAmount)} ৳</h5>
                      </Box>
                    ) : (
                      <Box display="flex" alignItems="center">
                        <FaMoneyCheckAlt
                          style={{
                            fontSize: "20px",
                            marginRight: "10px",
                            color: "#dc143c",
                          }}
                        />
                        <h5 style={{ color: "#dc143c" }}>
                          Balance: {commaNumber(balance.lastAmount)} ৳
                        </h5>
                      </Box>
                    )}
                  </button>
                  {openBlance ? (
                    <Box sx={styles}>
                      <Box display="flex" alignItems="center">
                        <FaMoneyCheckAlt
                          style={{
                            fontSize: "20px",
                          }}
                        />
  
                        <Typography color="#fff" fontSize="12px">
                          &nbsp;Bonus:&nbsp;{commaNumber(balance?.bonus)}
                          &nbsp;৳
                        </Typography>
                      </Box>
                      <Box>
                        {balance.credit > 0 ? (
                          <Box display="flex" alignItems="center">
                            <FaMoneyCheckAlt
                              style={{
                                fontSize: "20px",
                                color: "#fff",
                                mr: "10px",
                              }}
                            />
                            <Typography color="#fff" fontSize="12px">
                              &nbsp;Credit:&nbsp;{commaNumber(balance.credit)} ৳{" "}
                            </Typography>
  
                            <RefreashBtn setState={setState} />
                          </Box>
                        ) : (
                          <>
                            <RefreashBtn setState={setState} />
                          </>
                        )}
                      </Box>
                    </Box>
                  ) : null}
                </Box>
              </Grid> */}

            <Grid
              item
              sm={4}
              md={8}
              lg={8}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                <Box sx={{ position: "relative" }}>
                  <button
                    type="button"
                    onClick={handleClick}
                    style={{
                      marginTop: "2px",
                      padding: "3px 10px",
                      color: "#fff",
                      backgroundColor: `${
                        balance.lastAmount > 0
                          ? "var(--primary-color)"
                          : "#dc143c"
                      }`,
                      outline: "none",
                      border: "none",
                    }}
                  >
                    {balance.lastAmount > 0 ? (
                      <Box display="flex" alignItems="center">
                        <FaMoneyCheckAlt
                          style={{
                            fontSize: "20px",
                            color: "#fff",
                          }}
                        />
                        <Typography sx={{ color: "#fff" }} fontSize="14px">
                          &nbsp;Balance:&nbsp;{commaNumber(balance.lastAmount)}
                          &nbsp;৳
                        </Typography>
                      </Box>
                    ) : (
                      <Box display="flex" alignItems="center">
                        <FaMoneyCheckAlt
                          style={{
                            fontSize: "20px",
                            marginRight: "10px",
                            color: "#fff",
                          }}
                        />
                        <h5 style={{ color: "#fff" }}>
                          Balance: {commaNumber(balance.lastAmount)} ৳
                        </h5>
                      </Box>
                    )}
                  </button>
                  {openBlance ? (
                    <Box
                      sx={styles}
                      display={
                        balance?.bonus > 0 || balance.credit > 0
                          ? "block"
                          : "none"
                      }
                    >
                      {balance?.bonus > 0 ? (
                        <Box display="flex" alignItems="center">
                          <FaMoneyCheckAlt
                            style={{
                              fontSize: "20px",
                            }}
                          />

                          <Typography color="#fff" fontSize="12px">
                            &nbsp;Bonus:&nbsp;{commaNumber(balance?.bonus)}
                            &nbsp;৳
                          </Typography>
                        </Box>
                      ) : null}

                      <Box>
                        {balance.credit > 0 ? (
                          <Box display="flex" alignItems="center">
                            <FaMoneyCheckAlt
                              style={{
                                fontSize: "20px",
                                color: "#fff",
                                mr: "10px",
                              }}
                            />
                            <Typography color="#fff" fontSize="12px">
                              &nbsp;Credit:&nbsp;{commaNumber(balance.credit)} ৳{" "}
                            </Typography>
                          </Box>
                        ) : (
                          ""
                        )}
                      </Box>
                    </Box>
                  ) : null}
                </Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    // alignItems: "flex-end",
                  }}
                >
                  {/* whatsapp btn  */}
                  <Button
                    style={{
                      // marginTop: "0px",
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    <RefreashBtn setState={setState} />
                  </Button>
                  <Button
                    style={{
                      marginTop: "5px",
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    <a
                      href="https://wa.me/+8801755572098"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaWhatsappSquare
                        color="main"
                        fontSize="32px"
                        style={{ color: "#0ac52f" }}
                      />
                    </a>
                  </Button>

                  <Button
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={handleOpen}
                  >
                    <StyledBadge
                      color="primary"
                      badgeContent={
                        !notificationClick ? notification.length : 0
                      }
                      onClick={() => setNotificationClick(true)}
                    >
                      <NotificationsIcon
                        color="main"
                        fontSize="large"
                        style={{ color: "#154572" }}
                      />
                    </StyledBadge>
                  </Button>
                </Box>
              </Box>
              <Modal open={open} onClose={handleClose}>
                <Box className="modalStyleNote">
                  <Paper
                    sx={{
                      width: "270px",
                      maxHeight: "350px",
                      borderRadius: "5px",
                      margin: "auto",
                      overflowY: "auto",
                    }}
                  >
                    <section className="login-parent">
                      <Box className="login-field">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "1px 0px",
                          }}
                        >
                          <Typography
                            fontSize="16px"
                            sx={{
                              color: "#DC143C",
                              fontWeight: "bold",
                            }}
                          >
                            Notification
                          </Typography>
                        </Box>

                        {notification.map((item, index) => (
                          <Link
                            key={index}
                            style={{
                              textDecoration: "none",
                              margin: "0px 1px",
                            }}
                            to={"/dashboard/account/Notification"}
                          >
                            <Box onClick={handleClose} className="notification">
                              <h4>{item.title}</h4>
                              <span style={{ textAlign: "right" }}>
                                {item?.timedate
                                  ? format(
                                      new Date(item.timedate?.trim()),
                                      "dd MMM yy hh:mm a"
                                    )
                                  : "Time"}
                              </span>
                            </Box>
                          </Link>
                        ))}
                      </Box>
                    </section>
                  </Paper>
                </Box>
              </Modal>
            </Grid>
          </Grid>
        </Box>

        {/* mobile device */}
      </ClickAwayListener>
    </>
  );
};

export default DashboardHeading;
