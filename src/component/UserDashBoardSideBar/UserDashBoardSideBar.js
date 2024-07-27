import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate, Outlet, Link, NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ViewDayIcon from "@mui/icons-material/ViewDay";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LogoutIcon from "@mui/icons-material/Logout";
import TollIcon from "@mui/icons-material/Toll";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import MuiListItem from "@material-ui/core/ListItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import StorageIcon from "@mui/icons-material/Storage";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// import SignUp from "../SignUp/SignUp";
// import SignIn from "../SignIn/SignIn";
// import QueuesPage from "../Queues/QueuesPage";
import AuthProvider from "../Contexts/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "../../App";
import { borderRadius, color, width } from "@mui/system";
import useAuthentication from "../../hooks/useAuthentication";
import "./UserDashBoardSideBar.css";
import { Collapse, ListSubheader, Menu, MenuItem } from "@mui/material";

// Active color ListItem start
const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
  },
}));

const ListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "#222222",
      color: "white",
      width: "90%",
      borderRadius: "0 5px 5px 0",
      "& .MuiListItemIcon-root": {
        color: "white",
      },
    },
    "&$selected:hover": {
      backgroundColor: "#222222",
      color: "white",
      width: "90%",
      borderRadius: "0 5px 5px 0",
      "& .MuiListItemIcon-root": {
        color: "white",
      },
    },
    "&:hover": {
      backgroundColor: "var(--void)",
      color: "white",
      width: "90%",
      borderRadius: "0 5px 5px 0",
      "& .MuiListItemIcon-root": {
        color: "white",
      },
    },
  },
  selected: {},
})(MuiListItem);

const SubListItem = withStyles({
  subselected: {},
})(MuiListItem);

// Active color ListItem end

const drawerWidth = 230;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 20px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const UserDashBoardSideBar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [queues, setQueues] = useState(false);
  const [account, setAccount] = useState(false);
  const [report, setReport] = useState(false);

  const navigate = useNavigate();

  const { logout } = useAuthentication();

  //   -------------------submenu start here ----------------

  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState();
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    if (index === 2) {
      setOpen(true);
      setQueues(!queues);
      setAccount(false);
      setReport(false);
    } else if (index === 3) {
      setOpen(true);
      setQueues(false);
      setAccount(!account);
      setReport(false);
    } else if (index === 4) {
      setOpen(true);
      setQueues(false);
      setAccount(false);
      setReport(!report);
    }
  };

  const [subSelectedIndex, setSubSelectedIndex] = useState();
  const handleSubListItemClick = (event, index) => {
    // setSubSelectedIndex(index);
  };

  //   -------------------

  return (
    <Box sx={{ display: "flex" }} className="sideBar-user">
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          style={{
            display: "block",
            backgroundColor: "var(--secondary-color)",
          }}
        >
          <Box onClick={() => setOpen(!open)}>
            <MenuIcon
              style={{
                color: "var(--white)",
                fontSize: "28px",
                margin: "20px 15px 10px 15px",
              }}
            />
          </Box>
        </DrawerHeader>

        <Box backgroundColor="var(--secondary-color)" height="100vh">
          <List>
            <NavLink
              to="/dashboard/dashboardsearchbox"
              style={{ display: "block", marginBottom: "10px" }}
            >
              <ListItem
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
                style={{ padding: "0px" }}
              >
                <ListItemButton
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    p: "5px 3px 5px 20px",
                  }}
                >
                  <DashboardIcon />
                  <ListItemText sx={{ opacity: open ? 1 : 0, ml: 1 }}>
                    Dashboard
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink
              to="/dashboard/searchhistory"
              style={{ display: "block", marginBottom: "10px" }}
            >
              <ListItem
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
                style={{ padding: "0px" }}
              >
                <ListItemButton
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    p: "5px 3px 5px 20px",
                  }}
                >
                  <ContentPasteSearchIcon />
                  <ListItemText sx={{ opacity: open ? 1 : 0, ml: 1 }}>
                    Search History
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink
              to="/dashboard/queues/queues"
              style={{ display: "block", marginBottom: "10px" }}
            >
              <ListItem
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
                style={{ padding: "0px" }}
              >
                <ListItemButton
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    p: "5px 3px 5px 20px",
                  }}
                >
                  <StorageIcon />
                  <ListItemText sx={{ opacity: open ? 1 : 0, ml: 1 }}>
                    Queues
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </NavLink>
            {/* Sub Menu Queues Section start  */}
            {selectedIndex === 2 && queues && (
              <Box className="dash-sub-menu">
                <Box sx={{ opacity: open ? 1 : 0 }}>
                  <NavLink
                    to="/dashboard/queues/queues"
                    style={{ display: "block" }}
                  >
                    <SubListItem
                      // subselected={subSelectedIndex === 2}
                      // onClick={(event) => handleSubListItemClick(event, 2)}
                      style={{ padding: "0px" }}
                    >
                      <ListItemButton
                        sx={{
                          justifyContent: open ? "initial" : "center",
                          p: "0px 3px 0px 18px",
                        }}
                      >
                        <ListItemText
                          sx={{
                            opacity: open ? 1 : 0,
                            ml: 1,
                          }}
                        >
                          Air Ticket
                        </ListItemText>
                      </ListItemButton>
                    </SubListItem>
                  </NavLink>
                  <NavLink
                    to="/dashboard/queues/others"
                    style={{ display: "block" }}
                  >
                    <SubListItem
                      // subselected={subSelectedIndex === 2}
                      // onClick={(event) => handleSubListItemClick(event, 2)}
                      style={{ padding: "0px" }}
                    >
                      <ListItemButton
                        sx={{
                          justifyContent: open ? "initial" : "center",
                          p: "0px 20px 0px 18px",
                        }}
                      >
                        <ListItemText
                          sx={{
                            opacity: open ? 1 : 0,
                            ml: 1,
                          }}
                        >
                          Others
                        </ListItemText>
                      </ListItemButton>
                    </SubListItem>
                  </NavLink>
                </Box>
              </Box>
            )}
            {/* Sub Menu Queues Section end  */}
            <NavLink
              to="/dashboard/account/deposite"
              style={{ display: "block", marginBottom: "10px" }}
            >
              <ListItem
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
                style={{ padding: "0px" }}
              >
                <ListItemButton
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    p: "5px 3px 5px 20px",
                  }}
                >
                  <AccountBalanceIcon />
                  <ListItemText sx={{ opacity: open ? 1 : 0, ml: 1 }}>
                    Account
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </NavLink>
            {/* Sub Menu Account Section start  */}
            {selectedIndex === 3 && account && (
              <Box className="dash-sub-menu">
                <Box sx={{ opacity: open ? 1 : 0 }}>
                  <NavLink
                    to="/dashboard/account/deposite"
                    style={{ display: "block" }}
                  >
                    <SubListItem style={{ padding: "0px" }}>
                      <ListItemButton
                        sx={{
                          justifyContent: open ? "initial" : "center",
                          p: "0px 3px 0px 18px",
                        }}
                      >
                        <ListItemText
                          sx={{
                            opacity: open ? 1 : 0,
                            ml: 1,
                          }}
                        >
                          Deposit Request
                        </ListItemText>
                      </ListItemButton>
                    </SubListItem>
                  </NavLink>
                  <NavLink
                    to="/dashboard/account/bankaccount"
                    style={{ display: "block" }}
                  >
                    <SubListItem style={{ padding: "0px" }}>
                      <ListItemButton
                        sx={{
                          justifyContent: open ? "initial" : "center",
                          p: "0px 3px 0px 18px",
                        }}
                      >
                        <ListItemText
                          sx={{
                            opacity: open ? 1 : 0,
                            ml: 1,
                          }}
                        >
                          Bank Account
                        </ListItemText>
                      </ListItemButton>
                    </SubListItem>
                  </NavLink>
                  <NavLink
                    to="/dashboard/account/GeneralLedger"
                    style={{ display: "block" }}
                  >
                    <SubListItem style={{ padding: "0px" }}>
                      <ListItemButton
                        sx={{
                          justifyContent: open ? "initial" : "center",
                          p: "0px 3px 0px 18px",
                        }}
                      >
                        <ListItemText
                          sx={{
                            opacity: open ? 1 : 0,
                            ml: 1,
                          }}
                        >
                          General Ledger
                        </ListItemText>
                      </ListItemButton>
                    </SubListItem>
                  </NavLink>
                  <NavLink
                    to="/dashboard/account/MyAccount"
                    style={{ display: "block" }}
                  >
                    <SubListItem style={{ padding: "0px" }}>
                      <ListItemButton
                        sx={{
                          justifyContent: open ? "initial" : "center",
                          p: "0px 3px 0px 18px",
                        }}
                      >
                        <ListItemText
                          sx={{
                            opacity: open ? 1 : 0,
                            ml: 1,
                          }}
                        >
                          My Account
                        </ListItemText>
                      </ListItemButton>
                    </SubListItem>
                  </NavLink>
                  <NavLink
                    to="/dashboard/account/mystaffs"
                    style={{ display: "block" }}
                  >
                    <SubListItem style={{ padding: "0px" }}>
                      <ListItemButton
                        sx={{
                          justifyContent: open ? "initial" : "center",
                          p: "0px 3px 0px 18px",
                        }}
                      >
                        <ListItemText
                          sx={{
                            opacity: open ? 1 : 0,
                            ml: 1,
                          }}
                        >
                          My Staffs
                        </ListItemText>
                      </ListItemButton>
                    </SubListItem>
                  </NavLink>
                </Box>
              </Box>
            )}
            {/* Sub Menu Account Section end  */}

            <NavLink
              to="/dashboard/account/GeneralLedgerReport"
              style={{ display: "block", marginBottom: "10px" }}
            >
              <ListItem
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)}
                style={{ padding: "0px" }}
              >
                <ListItemButton
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    p: "5px 3px 5px 20px",
                  }}
                >
                  <AssessmentIcon />
                  <ListItemText sx={{ opacity: open ? 1 : 0, ml: 1 }}>
                    Report
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </NavLink>
            {/* Sub Menu report Section end  */}
            {selectedIndex === 4 && report && (
              <Box className="dash-sub-menu">
                <Box sx={{ opacity: open ? 1 : 0 }}>
                  <NavLink
                    to="/dashboard/account/GeneralLedgerReport"
                    style={{ display: "block" }}
                  >
                    <SubListItem style={{ padding: "0px" }}>
                      <ListItemButton
                        sx={{
                          justifyContent: open ? "initial" : "center",
                          p: "0px 3px 0px 18px",
                        }}
                      >
                        <ListItemText
                          sx={{
                            opacity: open ? 1 : 0,
                            ml: 1,
                          }}
                        >
                          Ledger Report
                        </ListItemText>
                      </ListItemButton>
                    </SubListItem>
                  </NavLink>
                  {/* <NavLink
                    to="/dashboard/account/bankaccount"
                    style={{ display: "block" }}
                  >
                    <SubListItem style={{ padding: "0px" }}>
                      <ListItemButton
                        sx={{
                          justifyContent: open ? "initial" : "center",
                          p: "0px 3px 0px 18px",
                        }}
                      >
                        <ListItemText
                          sx={{
                            opacity: open ? 1 : 0,
                            ml: 1,
                          }}
                        >
                          Bank Account
                        </ListItemText>
                      </ListItemButton>
                    </SubListItem>
                  </NavLink> */}
                </Box>
              </Box>
            )}
            {/* Sub Menu report Section end  */}

            <NavLink to="/" style={{ display: "block", marginTop: "100%" }}>
              <ListItem
                selected={selectedIndex === 5}
                onClick={logout}
                style={{ padding: "0px" }}
              >
                <ListItemButton
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    p: "5px 3px 5px 20px",
                  }}
                >
                  <ExitToAppIcon />
                  <ListItemText sx={{ opacity: open ? 1 : 0, ml: 1 }}>
                    Log Out
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </NavLink>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet></Outlet>
      </Box>
    </Box>
  );
};

export default UserDashBoardSideBar;
