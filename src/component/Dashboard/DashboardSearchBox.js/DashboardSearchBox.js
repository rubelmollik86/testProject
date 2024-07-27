import React from "react";
import {
  Badge,
  Button,
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

import secureLocalStorage from "react-secure-storage";
// import "./DashboardHeading.css";
import { format } from "date-fns";
import RefreashBtn from "../../Shared/RefreashBtn/RefreashBtn";
import HomeSearchBox from "../../HomeSearchBox/HomeSearchBox";
// import DashBoardSlider from "./DashBoardSlider";
// import DashboardHeading from "./../Dashboard/DashboardHeading";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 5,
    top: 10,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "#DC143C",
  },
}));

const DashboardSearchBox = () => {
  const [open, setOpen] = React.useState(false);
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

  return (
    <Box>
      <Box className="dashboardheadingsm" m={2}></Box>
      <HomeSearchBox color="var(--primary-color)" backgroundColor={"#D1E9FF"} />
      {/* <Box mt={4}>
        <DashBoardSlider />
      </Box> */}
    </Box>
  );
};

export default DashboardSearchBox;
