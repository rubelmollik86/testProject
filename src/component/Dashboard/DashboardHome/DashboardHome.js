import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Link, Outlet, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { FiDatabase } from "react-icons/fi";
import { BsBank2 } from "react-icons/bs";
import { AiOutlineBarChart } from "react-icons/ai";
import { AiOutlineCaretDown } from "react-icons/ai";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";
// import DashboardHeading from "../Dashboard/DashboardHeading";
import logo from "../../../image/logo/header-logo.png";
import mobileLogo from "../../../image/logo/dashlogo.png";
import { height } from "@mui/system";
import secureLocalStorage from "react-secure-storage";
import useAuthentication from "../../../hooks/useAuthentication";
import "./DashboardHome.css";
import DashboardHeading from "../DashboardHeading/DashboardHeading";

const DashboardHome = (props) => {
  const { logout } = useAuthentication();
  const navigate = useNavigate();
  const [iconClicked, setIconClicked] = useState(false);
  const drawerWidth = 50;
  const headingHeight = 90;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  let activeStyle = {
    textDecoration: "underline",
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [display, setDisplay] = useState(false);
  const [others, setOthers] = useState(false);
  const [account, setAccount] = useState(false);
  const [report, setReport] = useState(false);
  const [companyLogo, setCompanyLogo] = useState();
  const users = secureLocalStorage.getItem("user-info");
  let agentID = users?.user?.agentId;
  let staffId = users?.user?.staffId;
  useEffect(() => {
    fetch(
      `https://api.flyfarint.com/v.1.0.0/Accounts/MyAccount.php?agentId=${agentID}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCompanyLogo(data[0]);
      });
  }, [agentID]);

  const drawer = (
    <Box
      className="dash-body dash-bg-color1"
      style={{ border: "none !important" }}
    >
      <Box
        mx="auto"
        my={1}
        onClick={() => setIconClicked(!iconClicked)}
        style={{
          border: "none",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          width: "150px",
          height: "80px",
        }}
      >
        {/* <Link to={"/dashboard/dashboardsearchbox"} className="link-logo">
          {companyLogo?.companyImage === "" ? (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Typography
                style={{
                  color: "var(--primary-color)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize:
                    companyLogo?.company?.length <= 20 ? "20px" : "15px",
                  fontWeight: "bold",
                }}
              >
                {companyLogo?.company || "Company Name"}
              </Typography>
            </Box>
          ) : (
            <Box width="100%" height="100%" mt={2}>
              <img
                src={companyLogo?.companyImage}
                style={{ width: "100%", objectFit: "cover" }}
                alt={companyLogo?.company || "Company Name"}
              />
            </Box>
          )}
        </Link> */}
      </Box>
      <Box className="dash-bg-color">
        <List>
          {/* Dashboard menu start here */}
          <Box className="dashboard-menu">
            <Box
              className="dashboard-menu-content"
              onClick={() => {
                setIconClicked(false);
                setDisplay(false);
                setAccount(false);
                setReport(false);
              }}
            >
              <NavLink to={"/dashboard/dashboardsearchbox"}>
                <AiOutlineHome style={{ fontSize: "28px" }} />
                <span style={{ padding: "4px 25px" }}> Dashboard</span>
              </NavLink>
              <br />
            </Box>

            <Box
              className="dashboard-menu-content"
              onClick={() => {
                setIconClicked(false);
                setDisplay(false);
                setAccount(false);
                setReport(false);
              }}
            >
              <NavLink to={"/dashboard/searchhistory"}>
                <AiOutlineSearch style={{ fontSize: "28px" }} />
                <span style={{ padding: "4px 25px" }}> Search History</span>
              </NavLink>
              <br />
            </Box>

            {/* Queues  */}
            <Box
              sx={{
                marginTop: "10px",
                marginLeft: "8px",
                width: "230px",
              }}
            >
              <Accordion
                className="accordion-bg"
                sx={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  width: "100%",
                  border: "none",
                  padding: "0px",
                }}
                onClick={() => {
                  setIconClicked(false);
                  setOthers(!others);
                  setDisplay(false);
                  setAccount(false);
                  setReport(false);
                }}
              >
                <AccordionSummary
                  sx={{
                    paddingLeft: "10px !important",
                    color: "#fff !important",
                  }}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <a style={{ padding: "0px 10px" }}>
                    <MdOutlinePeopleAlt
                      style={{
                        fontSize: "26px",
                        marginTop: "2px",
                      }}
                    />
                    <span style={{ padding: "2px 25px" }}> Queues</span>
                    <AiOutlineCaretDown
                      style={{
                        fontSize: "22px",
                        marginTop: "6px",
                        marginLeft: "8px",
                      }}
                      id="downIcon"
                    />
                  </a>
                </AccordionSummary>
              </Accordion>

              {others && (
                <AccordionDetails className="sub-menu">
                  <Box className="sub-menu-link">
                    <NavLink
                      to={"/dashboard/queues/queues"}
                      className="circle-link"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Air Ticket
                    </NavLink>{" "}
                    <br />
                  </Box>
                  <Box className="sub-menu-link">
                    <NavLink
                      to={"/dashboard/queues/others"}
                      className="circle-link"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Others
                    </NavLink>{" "}
                    <br />
                  </Box>
                </AccordionDetails>
              )}
            </Box>

            <Box
              sx={{
                marginTop: "10px",
                marginLeft: "8px",
                width: "230px",
              }}
            >
              <Accordion
                className="accordion-bg"
                sx={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  width: "100%",
                  border: "none",
                  padding: "0px",
                }}
                onClick={() => {
                  setIconClicked(false);
                  setDisplay(!display);
                  setOthers(false);
                  setAccount(false);
                  setReport(false);
                }}
              >
                <AccordionSummary
                  sx={{
                    paddingLeft: "10px !important",
                    color: "#fff !important",
                  }}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <a style={{ padding: "0px 10px" }}>
                    <FiDatabase
                      style={{ fontSize: "26px", marginTop: "2px" }}
                    />
                    <span style={{ padding: "2px 25px" }}> Manage</span>
                    <AiOutlineCaretDown
                      style={{ fontSize: "22px", marginTop: "6px" }}
                      id="downIcon"
                    />
                  </a>
                </AccordionSummary>
              </Accordion>

              {display && (
                <AccordionDetails className="sub-menu">
                  <Box className="sub-menu-link">
                    <NavLink
                      to={"/dashboard/manage/travelersDetails"}
                      className="circle-link"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Travelers
                    </NavLink>{" "}
                    <br />
                    <br />
                  </Box>
                </AccordionDetails>
              )}
            </Box>

            <Box sx={{ marginTop: "10px", marginLeft: "8px", width: "230px" }}>
              <Box>
                <Accordion
                  className="accordion-bg"
                  sx={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    width: "100%",
                    border: "none",
                    padding: "0px",
                  }}
                  onClick={() => {
                    setIconClicked(false);
                    setAccount(!account);
                    setOthers(false);
                    setDisplay(false);
                    setReport(false);
                  }}
                >
                  <AccordionSummary
                    sx={{
                      paddingLeft: "10px !important",
                      color: "#fff !important",
                    }}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <a style={{ padding: "0px 10px" }}>
                      <BsBank2 style={{ fontSize: "26px" }} />
                      <span style={{ padding: "4px 25px" }}> Account</span>
                      <AiOutlineCaretDown
                        style={{ fontSize: "22px", marginTop: "6px" }}
                        id="downIcon"
                      />
                    </a>
                  </AccordionSummary>
                </Accordion>

                {account && (
                  <AccordionDetails className="sub-menu">
                    <Box className="sub-menu-link">
                      <NavLink
                        to={"/dashboard/account/deposite"}
                        className="circle-link"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        Deposit Request
                      </NavLink>{" "}
                      <br />
                      <NavLink
                        to={"/dashboard/account/bankaccount"}
                        className="circle-link"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        Bank Account
                      </NavLink>{" "}
                      <br />
                      {/* <NavLink
                        to={"/dashboard/account/partialpayment"}
                        className="circle-link"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        Partial Payment
                      </NavLink>{" "}
                      <br /> */}
                      <NavLink
                        to={"/dashboard/account/GeneralLedger"}
                        className="circle-link"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        General Ledger
                      </NavLink>{" "}
                      <br />
                      <NavLink
                        to={"/dashboard/account/MyAccount"}
                        className="circle-link"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        My Account
                      </NavLink>{" "}
                      <br />
                      {!staffId ? (
                        <>
                          <NavLink
                            to={"/dashboard/account/mystaffs"}
                            className="circle-link"
                            style={({ isActive }) =>
                              isActive ? activeStyle : undefined
                            }
                          >
                            My Staffs
                          </NavLink>{" "}
                        </>
                      ) : (
                        <></>
                      )}
                    </Box>
                  </AccordionDetails>
                )}
              </Box>
            </Box>

            <Box
              sx={{ marginTop: "10px", marginLeft: "8px", width: "230px" }}
              style={{ transition: "all 0.5s ease-in-out" }}
            >
              <Accordion
                className="accordion-bg"
                sx={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  width: "100%",
                  border: "none",
                  padding: "0px",
                }}
                onClick={() => {
                  setIconClicked(false);
                  setReport(!report);
                  setAccount(false);
                  setDisplay(false);
                }}
              >
                <AccordionSummary
                  sx={{
                    paddingLeft: "10px !important",
                    color: "#fff !important",
                  }}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <a style={{ padding: "0px 10px" }}>
                    <AiOutlineBarChart style={{ fontSize: "26px" }} />
                    <span style={{ padding: "4px 25px" }}> Report</span>
                    <AiOutlineCaretDown
                      style={{
                        fontSize: "22px",
                        marginTop: "6px",
                        marginLeft: "12px",
                      }}
                      id="downIcon"
                    />
                  </a>
                </AccordionSummary>
              </Accordion>

              {report && (
                <AccordionDetails className="sub-menu">
                  <Box className="sub-menu-link">
                    <NavLink
                      to={"/dashboard/account/GeneralLedgerReport"}
                      className="circle-link"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      {" "}
                      General Ledger Report
                    </NavLink>{" "}
                    <br />
                    {/* <NavLink
                      to={"/dashboard/account/CommissionReport"}
                      className="circle-link"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Commission Report
                    </NavLink> */}
                    <br />
                  </Box>
                </AccordionDetails>
              )}
            </Box>

            <Box
              style={{ padding: "0px 13px" }}
              className="dashboard-menu-content logout "
            >
              <IoIosLogOut
                id="logoutIcon"
                style={{ fontSize: "28px", color: "#fff" }}
              />
              <span style={{ padding: "15px 25px" }} onClick={logout}>
                {" "}
                Logout
              </span>
              <br />
            </Box>
          </Box>

          {/* Dashboard menu end here */}
        </List>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{
          width: {
            md: `calc(100% - ${drawerWidth}px)`,
            // sm: `calc(100% - ${drawerWidth}px)`,
          },
          ml: { md: `${drawerWidth}px`, sm: `${drawerWidth}px` },
          height: "fit-content",
          backgroundColor: "#fff !important",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ display: "block", maxHeight: "fit-content" }}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems="center"
            sx={{
              mb: { lg: 0, md: 0, sm: 0, xs: 1 },
              mt: { lg: 0, md: 0, sm: 1, xs: 2 },
            }}
          >
            {/* <Box
              className="mobileLogo"
              sx={{
                display: { md: "none", sm: "block" },
              }}
            >
              {companyLogo?.logo === "" ? (
                <>
                  <Typography
                    fontWeight={500}
                    fontSize="18px"
                    sx={{
                      color: "#fff",
                      position: "relative",
                    }}
                  >
                    {companyLogo?.company}
                  </Typography>
                </>
              ) : (
                <Box width="100%" height="100%">
                  <img
                    src={companyLogo?.companyImage}
                    style={{ width: "100%", objectFit: "cover" }}
                    alt={companyLogo?.company || "Company Name"}
                  />
                </Box>
              )}
            </Box> */}
            <Box textAlign={"right"}>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  color: "var(--primary-color)",
                  display: { xs: "block", sm: "block", md: "none" },
                  paddingRight: "0px",
                }}
              >
                <HiMenuAlt1 id="mobileHumbarger" />
              </IconButton>
            </Box>
          </Box>

          {/*  drawer header start here */}

          {/* <DashboardHeading /> */}

          {/*  drawer header end here */}
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          // width: { md: drawerWidth, sm: drawerWidth },
          width: { md: drawerWidth },
          flexShrink: { md: 0, sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            // display: { xs: "block", md: "none", sm: "none" },
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            // display: { xs: "none", md: "block", sm: "block" },
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pb: 3,
          mt: {
            lg: `${headingHeight}px`,
            md: `${headingHeight}px`,
            sm: `${headingHeight}px`,
            xs: `${headingHeight}px`,
          },
          width: {
            md: `calc(100% - ${drawerWidth}px)`,
          },
        }}
      >
        <Outlet></Outlet>
      </Box>
    </Box>
  );
};

export default DashboardHome;
