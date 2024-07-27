import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PlaceIcon from "@mui/icons-material/Place";
import { useReactToPrint } from "react-to-print";
import secureLocalStorage from "react-secure-storage";

import "./CountryDetails.css";

function TableRowData({ data }) {
  const {
    entryType,
    maximumStay,
    duration,
    processingTime,
    cost,
    interview,
    embassyFee,
    agentFee,
    agencyFee,
    FFIServiceCharge,
    total,
    visaType,
  } = data;
  const arrayData = [data];

  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell
          sx={{
            padding: "6px 10px",
            color: "var(--primary-color)",
          }}
        >
          {entryType}
        </TableCell>
        <TableCell
          sx={{
            padding: "6px 10px",
            color: "var(--primary-color)",
          }}
        >
          {duration}&nbsp;Months
        </TableCell>
        <TableCell
          sx={{
            padding: "6px 10px",
            color: "var(--primary-color)",
          }}
        >
          {maximumStay}&nbsp;Days
        </TableCell>
        <TableCell
          sx={{
            padding: "6px 10px",
            color: "var(--primary-color)",
          }}
        >
          {processingTime}&nbsp;Working&nbsp;Days
        </TableCell>
        <TableCell
          sx={{
            padding: "6px 10px",
            color: "var(--primary-color)",
          }}
        >
          {interview}
        </TableCell>
        <TableCell>
          {parseInt(embassyFee) +
            parseInt(agentFee) +
            parseInt(agencyFee) +
            parseInt(FFIServiceCharge)}
          &nbsp;BDT
        </TableCell>
        <TableCell
          sx={{
            padding: "6px 10px",
            color: "var(--primary-color)",
          }}
        >
          <Button
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <Typography
                sx={{
                  width: "100px",
                  color: "#fff",
                  bgcolor: "#DC143C",
                  fontSize: "14px",
                }}
              >
                hide
              </Typography>
            ) : (
              <Typography
                sx={{
                  width: "100px",
                  color: "#fff",
                  bgcolor: "var(--primary-color)",
                  fontSize: "14px",
                  textDecoration: "capitalize",
                }}
              >
                show
              </Typography>
            )}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            backgroundColor: "#D1E9FF",
          }}
          colSpan={12}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="p"
                color="#DC143C"
                gutterBottom
                component="div"
              >
                *Depends on embassy
              </Typography>
              <Typography
                sx={{
                  color: "var(--primary-color)",
                  fontSize: "18px",
                  fontWeight: 500,
                  mb: "10px",
                }}
              >
                Price Break Down
              </Typography>
              <Table
                size="small"
                aria-label="purchases"
                style={{ border: "none" }}
              >
                <TableHead style={{ backgroundColor: "#88BAEB" }}>
                  <TableRow style={{ border: "none" }}>
                    <TableCell align="center">Embassy&nbsp;Fee</TableCell>
                    <TableCell align="center">Agent&nbsp;Fee</TableCell>
                    <TableCell align="center">Agency&nbsp;Fee</TableCell>
                    <TableCell align="center">
                      FFI&nbsp;Service&nbsp;Charge
                    </TableCell>
                    <TableCell align="center">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {arrayData?.map((price, index) => (
                    <TableRow
                      key={index}
                      style={{
                        backgroundColor: "#D1E9FF",
                        border: "none",
                      }}
                    >
                      <TableCell align="center">
                        {price?.embassyFee}&nbsp;BDT
                      </TableCell>
                      <TableCell align="center">
                        {price?.agentFee}&nbsp;BDT
                      </TableCell>
                      <TableCell align="center">
                        {price?.agencyFee}&nbsp;BDT
                      </TableCell>
                      <TableCell align="center">
                        {price?.FFIServiceCharge}&nbsp;BDT
                      </TableCell>
                      <TableCell align="center">
                        {parseInt(price?.embassyFee) +
                          parseInt(price?.agentFee) +
                          parseInt(price?.agencyFee) +
                          parseInt(price?.FFIServiceCharge)}
                        &nbsp;BDT
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const CountryDetails = () => {
  // const params = useParams();
  const location = useLocation();
  const componentRefEN = useRef();
  const componentRefBN = useRef();
  const [expandeed, setExpanded] = useState("panel");
  const handleChangeDown = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [optionValue, setOptionvalue] = useState("JobHolder");
  const [users, setUsers] = useState("");
  const [userData, setUserData] = useState();
  useEffect(() => {
    const users = secureLocalStorage.getItem("user-info");
    if (users) {
      setUsers(users);
    }
  }, []);
  let agentID = users?.user?.agentId;
  const requiredSearchData =
    location.state !== null
      ? location.state
      : secureLocalStorage.getItem("search-data");

  const [visaDetails, setVisaDetails] = useState({});

  // header added
  useEffect(() => {
    let url = `https://api.flyfarint.com/v.1.0.0/Visa/all.php?singleVisa`;
    let body = JSON.stringify({
      country: requiredSearchData.fromaddress.trim(),
      category: requiredSearchData.toaddress.trim(),
    });

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        setVisaDetails(data);
      });
  }, [requiredSearchData.fromaddress, requiredSearchData.toaddress]);

  useEffect(() => {
    let url = `https://api.flyfarint.com/v.1.0.0/Accounts/MyAccount.php?agentId=${agentID}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUserData(data[0]));
  }, [agentID]);

  const handleToPrintEN = useReactToPrint({
    content: () => componentRefEN.current,
    documentTitle: `${visaDetails?.country}_${visaDetails?.visatype}`,
    pageStyle: "@page { size: 200mm 297mm }",
  });
  const handleToPrintBN = useReactToPrint({
    content: () => componentRefBN.current,
    documentTitle: `${visaDetails?.country}_${visaDetails?.visatype}`,
    pageStyle: "@page { size: 200mm 297mm }",
  });

  return (
    <Box margin="24px">
      <Grid container justifyContent="space-between">
        <Grid item sm={12} md={9}>
          <Typography
            sx={{
              color: "var(--primary-color)",
              fontSize: "28px",
              fontWeight: 600,
              mb: "10px",
            }}
          >
            {/* Required Documents for Tourist Visa Malaysia */}
            Required Documents for {requiredSearchData?.toaddress}{" "}
            {requiredSearchData?.fromaddress}
          </Typography>
          <Typography>
            Visa Type:{" "}
            {Object.keys(visaDetails).length !== 0 ? (
              <>{visaDetails?.visainfo[0]?.visaType || ""}</>
            ) : (
              "Loading..."
            )}
          </Typography>
          <Typography my={3} color={"#DC143C"} fontSize="20px" fontWeight={600}>
            Duration and Cost Details
          </Typography>
          <Box my={3}>
            <TableContainer>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow
                    sx={{
                      bgcolor: "var(--primary-color)",
                    }}
                  >
                    <TableCell
                      sx={{
                        padding: "6px 10px",
                        color: "#fff",
                      }}
                    >
                      Entry
                    </TableCell>
                    <TableCell
                      // align="right"
                      sx={{
                        padding: "6px 10px",
                        color: "#fff",
                      }}
                    >
                      Duration
                    </TableCell>
                    <TableCell
                      // align="right"
                      sx={{
                        padding: "6px 10px",
                        color: "#fff",
                      }}
                    >
                      Maximum&nbsp;Stay
                    </TableCell>
                    <TableCell
                      // align="right"
                      sx={{
                        padding: "6px 10px",
                        color: "#fff",
                      }}
                    >
                      Processing&nbsp;Time
                    </TableCell>
                    <TableCell
                      // align="right"
                      sx={{
                        padding: "6px 10px",
                        color: "#fff",
                      }}
                    >
                      Interview
                    </TableCell>
                    <TableCell
                      // align="right"
                      sx={{
                        padding: "6px 10px",
                        color: "#fff",
                      }}
                    >
                      Cost
                    </TableCell>
                    <TableCell
                      // align="right"
                      sx={{
                        padding: "6px 10px",
                        color: "#fff",
                      }}
                    >
                      View&nbsp;Details
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visaDetails?.visainfo?.map((row) => (
                    <TableRowData data={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box display={"flex"} alignItems="center" my={2}>
            <Typography
              color="var(--primary-color)"
              fontSize="16px"
              fontWeight={500}
              mr={2}
            >
              Select Your Profession:{" "}
            </Typography>
            <select
              style={{
                width: "150px",
                backgroundColor: "var(--primary-color)",
                color: "#fff",
                padding: "6px",
              }}
              onChange={(e) => setOptionvalue(e.target.value)}
            >
              <option value="JobHolder">Job Holder</option>
              <option value="BusinessMan">Business Man</option>
              <option value="GovtJobHolder">Govt Job Holder</option>
              <option value="Doctor">Doctor</option>
              <option value="AdvocateLawyer">Advocate Lawyer</option>
              <option value="Student">Student</option>
              <option value="NonStudentChild">Non Student Child</option>
              <option value="Housewife">House Wife</option>
              <option value="Unemployed">Unemployed</option>
            </select>
          </Box>
          <Box>
            <Typography
              sx={{
                color: "#DC143C",
                fontSize: "20px",
                fontWeight: 600,
                my: "40px",
              }}
            >
              {optionValue === "JobHolder" ? (
                <>Job Holder</>
              ) : optionValue === "BusinessMan" ? (
                <>Business Man</>
              ) : optionValue === "GovtJobHolder" ? (
                <>Govt. Job Holder</>
              ) : optionValue === "Doctor" ? (
                <>Doctor</>
              ) : optionValue === "AdvocateLawyer" ? (
                <>Advocate Lawyer</>
              ) : optionValue === "Student" ? (
                <>Student</>
              ) : optionValue === "NonStudentChild" ? (
                <>Non Student Child</>
              ) : optionValue === "Housewife" ? (
                <>House Wife</>
              ) : optionValue === "Unemployed" ? (
                <>Unemployed</>
              ) : (
                <></> || "Select Visa Type"
              )}
            </Typography>
            {visaDetails?.checklist?.map((check, index) => (
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "var(--primary-color)",
                  mb: "10px",
                }}
              >
                {optionValue === check?.passengertype ? (
                  <>
                    {"💠 "}
                    {check?.checkList}
                  </>
                ) : (
                  <></>
                )}
              </Typography>
            ))}
          </Box>
        </Grid>

        <Grid item sm={12} md={2.7}>
          {/* <Accordion
            style={{ boxShadow: "none" }}
            expanded={expandeed === "panel"}
            onChange={handleChangeDown("panel")}
          >
            <AccordionSummary
              style={{
                padding: "0px 10px",
                margin: "0px 10px",
              }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography fontSize="16px" color="var(--primary-color)" fontWeight={500}>
                Tourist Visa
              </Typography>
            </AccordionSummary> */}
          {/* <AccordionDetails style={{ padding: "10px", margin: "0" }}> */}
          <Paper sx={{ padding: "15px 10px" }}>
            <Typography
              fontSize="16px"
              color="#DC143C"
              borderBottom="1px solid #000000"
              mb={2}
            >
              Download / PDF
            </Typography>
            <Button size="small" sx={{ color: "var(--primary-color)" }}>
              PDF Daynamic Name
            </Button>
          </Paper>
          <br />
          <Paper sx={{ padding: "15px 10px" }}>
            <Typography
              fontSize="16px"
              color="#DC143C"
              borderBottom="1px solid #000000"
              mb={2}
            >
              Visa Submission Location
            </Typography>
            <Typography display={"flex"}>
              <PlaceIcon style={{ color: "#DC143C" }} />
              <Typography fontSize="12px" paddingLeft="10px">
                Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229
              </Typography>
            </Typography>
          </Paper>
          <br />
          <Box
            sx={{
              color: "#fff",
              bgcolor: "#DC143C",
              fontSize: "14px",
              fontWeight: 500,
              textAlign: "center",
              cursor: "pointer",
              mb: 1,
              p: 1,
            }}
          >
            Apply Visa
          </Box>

          <Box
            sx={{
              color: "#fff",
              bgcolor: "var(--primary-color)",
              fontSize: "14px",
              fontWeight: 500,
              textAlign: "center",
              cursor: "pointer",
              mb: 1,
              p: 1,
            }}
          >
            Notes
          </Box>

          <Box
            sx={{
              color: "#fff",
              bgcolor: "var(--primary-color)",
              fontSize: "14px",
              fontWeight: 500,
              textAlign: "center",
              p: 1,
            }}
          >
            Exception
          </Box>
          {/* </AccordionDetails>
          </Accordion> */}
        </Grid>
      </Grid>

      {/* <Box ref={componentRefEN}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          <div style={{ width: "50%" }}>
            <h4>{userData?.company}</h4>
            <h6>{userData?.companyadd}</h6>
            <h6>Email: {userData?.email}</h6>
            <h6>Phone: {userData?.phone}</h6>
          </div>
          <div style={{ width: "50%", textAlign: "end" }}>
            {userData?.companyImage === "" ? (
              ""
            ) : (
              <img
                style={{
                  width: "150px",
                  position: "relative",
                  left: "-15px",
                }}
                src={userData?.companyImage}
                alt={userData?.company}
              />
            )}
          </div>
        </div>
        {ReactHtmlParser(visaDetails.visaDetailsEN)}
      </Box> */}
      {/* <Box ref={componentRefBN} style={{ display: "none" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          <div style={{ width: "50%" }}>
            <h4>{userData?.company}</h4>
            <h6>{userData?.companyadd}</h6>
            <h6>Email: {userData?.email}</h6>
            <h6>Phone: {userData?.phone}</h6>
          </div>
          <div style={{ width: "50%", textAlign: "end" }}>
            {userData?.companyImage === "" ? (
              ""
            ) : (
              <img
                style={{
                  width: "150px",
                  position: "relative",
                  left: "-15px",
                }}
                src={userData?.companyImage}
                alt={userData?.company}
              />
            )}
          </div>
        </div>
        {ReactHtmlParser(visaDetails.visaDetailsBN)}
      </Box>
      <Stack direction="row" spacing={5} mt={2}>
        <Button
          style={{ backgroundColor: "#dc143c", color: "#fff" }}
          onClick={handleToPrintEN}
        >
          PDF ENGLISH
        </Button>
        <Button
          style={{ backgroundColor: "#dc143c", color: "#fff" }}
          onClick={handleToPrintBN}
        >
          PDF BANGLA
        </Button>
      </Stack> */}
    </Box>
  );
};

export default CountryDetails;
