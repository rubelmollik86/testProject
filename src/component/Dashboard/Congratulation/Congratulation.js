import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Box,
  Grid,
  Modal,
  Typography,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import commaNumber from "comma-number";
import confirm from "../../../image/Icon/confirm 1.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Congratulation.css";
import { Container } from "@mui/system";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../image/loader/Render.gif";
import axios from "axios";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";
import AddIcon from "@mui/icons-material/Add";
import { format } from "date-fns";
import Invalid from "../../../image/undraw/undraw_warning_re_eoyh.svg";
import ReConfirm from "../../../image/undraw/undraw_confirmation_re_b6q5.svg";
import Issue from "../../../image/undraw/undraw_booking_re_gw4j.svg";
import BookingCancel from "../../../image/undraw/undraw_cancel_re_pkdm.svg";
import FileUploadSection from "../../Shared/FileUploadSection/FileUploadSection";
import { ToWords } from "to-words";
import flightData from "../../flightData";
import RemoveIcon from "@mui/icons-material/Remove";
import Header from "../../Header/Header";
import FlightInformationOneWayData from "../FlightBookingOneway/FlightInformationOneWayData/FlightInformationOneWayData";
import FlightPriceBreakdownOneway from "../FlightBookingOneway/FlightPriceBreakdownOneway/FlightPriceBreakdownOneway";
import FlightInformationReturnData from "../../FlightBookingReturn/FlightInformationReturnData/FlightInformationReturnData";
import OneWayFlightDetails from "./OneWayFlightDetails";
import ReturnFlightDetails from "./ReturnFlightDetails";
import { Calendar } from "react-date-range";

const styles = {
  button: {
    padding: "6px 20px",
    marginRight: "20px",
    color: "#fff",
    backgroundColor: "var(--primary-color)",
    border: "none",
    cursor: "pointer",
  },
  buttonDisabled: {
    padding: "6px 20px",
    marginRight: "20px",
    color: "#fff",
    backgroundColor: "var(--primary-color)",
    border: "none",
    cursor: "not-allowed",
  },
};

const Congratulation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const bookingId =
    location?.state?.bookingData?.BookingId || location?.state?.bookingId;

  // --------------------- client information start ---------------------------
  const users = secureLocalStorage.getItem("UserData");
  let agentID = "FFA1926";
  const userId = users?.uuid;
  const userName = users?.name;

  const [expanded, setExpanded] = useState("panel1");
  const [downExpanded, setDownExpanded] = useState();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleChangeDown = (panel) => (event, newExpanded) => {
    setDownExpanded(newExpanded ? panel : false);
  };
  const [returnBtn, setReturnBtn] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [issueLoading, setIssueLoading] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [agentId, setAgentId] = useState("");
  const [siteConfig, setSiteConfig] = useState({});
  // todo:for multicity
  const [multiCityAllData, setMultiCityAllData] = useState([]);
  //todo: calculate total flight duration
  const calDuration = (mins) => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    h = h < 10 ? "0" + h : h; // (or alternatively) h = String(h).padStart(2, '0')
    m = m < 10 ? "0" + m : m; // (or alternatively) m = String(m).padStart(2, '0')
    return `${h}:${m}`;
  };
  // !end
  const toWords = new ToWords();

  // --------------------- client information start ---------------------------
  const [openModalReIssue, setOpenModalReIssue] = useState(false);
  const [openModalRefund, setOpenModalRefund] = useState(false);
  const [openModalVoid, setOpenModalVoid] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [isDone, setIsDone] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [allData, setAllData] = useState([]);
  const [userData, setUserData] = useState([0]);
  const [flightName, setFlightName] = useState([]);
  const [passengerData, setPassengerData] = useState([]);
  const [invoiceId, setInvoiceId] = useState([]);

  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(format(new Date(), "dd-MMM-yyyy"));

  //todo:state change
  const [state, setState] = useState(false);

  // visa and passport copy update state
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const handleOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleCloseUpdateModal = () => {
    setState((prev) => !prev);
    setOpenUpdateModal(false);
    setRefetch(!refetch);
  };
  const updateModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "#fff",
    p: 4,
    borderRadius: "10px",
  };

  const { gds, deptFrom, arriveTo, pnr, airlines, netCost, tripType } = allData;
  // End of visa and passport copy update
  useEffect(() => {
    // setIsLoading(true);
    const url1 = `https://api.flyfarint.com/v.1.0.0/Queues/BookingData.php?userId=${userId}&bookingId=${bookingId}&agentId=${agentID}`;
    console.log(url1);
    const airRetriveUrl = `https://api.flyfarint.com/v.1.0.0/FlyHub/AirRetrieve.php?BookingID=${pnr}`;
    fetch(url1)
      .then((res) => res.json())
      .then((data) => {
        if (data[0]?.tripType === "multicity") {
          setIsLoading(false);
          setAllData({ ...data[0], journeyType: "Outbound" });
        } else {
          setIsLoading(false);
          setAllData(data[0]);
        }
        setInvoiceId(data[0]?.ticketData);
      });

    fetch(airRetriveUrl)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setMultiCityAllData(data);
      });
    // setIsLoading(false);
  }, [bookingId, agentID, pnr, refetch]);

  const cancelBooking = (system, pnr) => {
    Swal.fire({
      imageUrl: ReConfirm,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      title: "Are you sure?",
      text: "You Wants to Cancel this Flight ?",
      showCancelButton: true,
      confirmButtonColor: "#003566",
      confirmButtonText: "Yes Cancel it !",
      cancelButtonColor: "#dc143c",
      cancelButtonText: "Don't Cancel it !",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        setIsDone(false);
        setOpen(false);
        setIsLoading(false);
        let url = `https://api.flyfarint.com/v.1.0.0/AirBooking/AirCancel.php`;
        let body = JSON.stringify({
          bookingId: bookingId,
          cancelBy: userId || userName || agentID,
          platform: "WLB2C",
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
            if (data?.status === "success") {
              Swal.fire({
                // icon: "success",
                // imageUrl: cancelImg,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                title: "Your Flight is Cancel!",
                html: `For any query.Please contact us at <strong>${siteConfig?.email}</strong> or Call <strong>${siteConfig?.phone}</strong>`,
                confirmButtonText: "OK",
                cancelButtonColor: "#dc143c",
              }).then(() => {
                setIsDone(true);
                setRefetch(!refetch);
              });
            } else {
              throw new Error("error");
            }
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err.message);
            Swal.fire({
              // imageUrl: cancelFailed,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
              title: "Booking Cancel Failed!",
              html: `For any query.Please contact us at <strong>${siteConfig?.email}</strong> or Call <strong>${siteConfig?.phone}</strong>`,
              confirmButtonText: "OK",
              cancelButtonColor: "#dc143c",
            }).then(() => {
              setIsDone(true);
              setRefetch(!refetch);
            });
          });
      }
    });
  };

  //--------------- Booking cancel handle end ------------------
  //--------------- Issue Ticket Start ------------------
  const issueData = {
    agentId: agentID || "Agent",
    userId: userId || "",
    bookingId: bookingId || "BookingId",
  };

  async function handleIssueTicket() {
    Swal.fire({
      imageUrl: ReConfirm,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      title: "Are you sure?",
      text: "You wants to issue this ticket ?",
      showCancelButton: true,
      confirmButtonColor: "var(--primary-color)",
      confirmButtonText: "Yes Issue it !",
      cancelButtonColor: "crimson",
      cancelButtonText: "Don't Issue it !",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        setIsDone(false);
        setOpen(false);
        setIsLoading(false);
        let url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/B2C/Booking/AirTicket.php`;
        let body = JSON.stringify(issueData);
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
            if (data?.status.toLowerCase() === "success") {
              Swal.fire({
                imageUrl: Issue,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                title: "Issue Ticket Request In Process",
                html: `For any query.Please contact us at <strong>${siteConfig?.email}</strong> or Call <strong>${siteConfig?.phone}</strong>`,
                confirmButtonColor: "var(--primary-color)",
                confirmButtonText: "Ok",
              }).then(function () {
                setIsDone(true);
                setIssueLoading(false);
                setRefetch(!refetch);
              });
            } else {
              Swal.fire({
                imageUrl: Invalid,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                title: `${data?.message}`,
                confirmButtonColor: "var(--primary-color)",
                confirmButtonText: "Ok",
              }).then(function () {
                setIsDone(true);
                setIssueLoading(false);
                setRefetch(!refetch);
              });
            }
            setIsLoading(false);
          })
          .catch((err) => {
            Swal.fire({
              imageUrl: Invalid,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
              title: "Issue Ticket Failed!",
              confirmButtonColor: "var(--primary-color)",
              confirmButtonText: "Ok",
            }).then(function () {
              setIsDone(true);
              setIssueLoading(false);
              setRefetch(!refetch);
            });
          });
      }
    });
  }

  //--------------- Isssue Ticket end ------------------
  // -------------- data get from queue page -------------
  // ------------ country name find-out ------------

  // ---------------------- Table row handle by filter start------------------=

  //  all passenger total price calculation
  const adultTotalPrice =
    parseInt(allData?.adultCostBase) + parseInt(allData?.adultCostTax);
  const childTotalPrice =
    parseInt(allData?.childCostBase) + parseInt(allData?.childCostTax);

  const infantTotalPrice =
    parseInt(allData?.infantCostBase) + parseInt(allData?.infantCostTax);

  const totalPrice = adultTotalPrice + childTotalPrice + infantTotalPrice;

  const savingMoney =
    parseInt(allData?.grossCost) - parseInt(allData?.subagentCost);

  // ---------------------- Table row handle by filter end ------------------

  const [checkBox, setCheckBox] = useState();
  const handleCheckBox = (index) => {
    const e = window.event;
    const tempData = [...invoiceId];
    tempData[index] = { ...tempData[index], checkBox: e.target.checked };
    setCheckBox(e.target.checked);
    setInvoiceId(tempData);
  };

  let reissue = [];
  const checkedData = invoiceId.filter((data) => {
    if (data.checkBox === true) {
      reissue = [
        ...reissue,
        { name: data.passengerName, ticket: data.ticketno },
      ];
    }
  });

  // --------Void Function
  const voideDate = new Date(allData?.lastUpdated);
  const handleVoid = async (e) => {
    setIsLoading(false);
    e.preventDefault();
    let body = JSON.stringify({
      agentId: agentID,
      userId: userId || "userId",
      bookingId: bookingId || "BookingId",
      requestedBy: userName || "userName",
      passengerData: reissue,
    });
    await fetch(
      "https://api.flyfarint.com/v.1.0.0/WhiteLabel/B2C/Booking/Void.php",
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: body,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setOpenModalVoid(false);
          Swal.fire({
            icon: "success",
            title: "Your void request is processing !",
            html: `For any query.Please contact us at <strong>${siteConfig?.email}</strong> or Call <strong>${siteConfig?.phone}</strong>`,
            confirmButtonText: "OK",
          }).then(function () {
            // window.location.href = "/dashboard/account/DepositEntry";
            setRefetch(!refetch);
          });
        } else {
          setOpenModalVoid(false);
          Swal.fire({
            icon: "error",
            title: "Void Request Failed!",
            html: `For any query.Please contact us at <strong>${siteConfig?.email}</strong> or Call <strong>${siteConfig?.phone}</strong>`,
            confirmButtonText: "OK",
          }).then(() => {
            setRefetch(!refetch);
          });
        }
      });

    e.target.reset();
  };
  const handleRefund = async (e) => {
    setIsDisabled(true);
    setIsLoading(false);
    e.preventDefault();
    let body = JSON.stringify({
      agentId: agentID,
      userId: userId || "userId",
      bookingId: bookingId || "BookingId",
      requestedBy: userName || userName,
      passengerData: reissue,
    });
    await fetch(
      "https://api.flyfarint.com/v.1.0.0/WhiteLabel/B2C/Booking/Refund.php",
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: body,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setOpenModalRefund(false);
          Swal.fire({
            icon: "success",
            title: "Your refund request is processing !",
            html: `For any query.Please contact us at <strong>${siteConfig?.email}</strong> or Call <strong>${siteConfig?.phone}</strong>`,
            confirmButtonText: "OK",
          }).then(function () {
            setRefetch(!refetch);
          });
        } else {
          setOpenModalRefund(false);
          Swal.fire({
            icon: "error",
            title: "Refund Request Failed!",
            html: `For any query.Please contact us at <strong>${siteConfig?.email}</strong> or Call <strong>${siteConfig?.phone}</strong>`,
            confirmButtonText: "OK",
          }).then(() => {
            setRefetch(!refetch);
          });
        }
      });

    e.target.reset();
  };

  const handleReissue = async (e) => {
    setIsLoading(false);
    e.preventDefault();
    let body = JSON.stringify({
      agentId: agentID,
      userId: userId || "userId",
      bookingId: bookingId || "BookingId",
      requestedBy: userName || userName,
      passengerData: reissue,
      date: date,
    });
    await fetch(
      "https://api.flyfarint.com/v.1.0.0/WhiteLabel/B2C/Booking/Reissue.php?request",
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: body,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setOpenModalReIssue(false);
          Swal.fire({
            icon: "success",
            title: "Your reissue request is processing !",
            html: `For any query.Please contact us at <strong>${siteConfig?.email}</strong> or Call <strong>${siteConfig?.phone}</strong>`,
            confirmButtonText: "OK",
          }).then(() => {
            setRefetch(!refetch);
          });
        } else {
          setOpenModalReIssue(false);
          Swal.fire({
            icon: "error",
            title: "Reissue Request Failed!",
            html: `For any query.Please contact us at <strong>${siteConfig?.email}</strong> or Call <strong>${siteConfig?.phone}</strong>`,
            confirmButtonText: "OK",
          }).then(() => {
            setRefetch(!refetch);
          });
        }
      });

    e.target.reset();
  };

  const todaydate = new Date().getDate();

  if (!isDone || isLoading) {
    return (
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          width: "70vw",
          marginInline: "auto",
        }}
      >
        <Box
          style={{
            width: "50%",
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={Loader}
            alt="loader"
            style={{
              width: "40%",
              objectFit: "center",
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Container>
        <Header />
        <Box>
          <Grid container columnSpacing={4}>
            <Grid item xs={12} sm={9}>
              {/* This Flight Details Section  */}
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: 14, sm: 18, ms: 22 },
                    fontWeight: 500,
                    mb: 2,
                    color: "var(--primary-color)",
                  }}
                >
                  Flight Information
                </Typography>
                {allData?.tripType === "oneway" ? (
                  <OneWayFlightDetails
                    flightData={allData?.flightData}
                    status={allData?.status}
                    allData={allData}
                  />
                ) : allData?.tripType === "return" ? (
                  <ReturnFlightDetails
                    flightData={allData?.flightData}
                    status={allData?.status}
                    allData={allData}
                  />
                ) : (
                  "Multicity"
                )}
              </Box>

              {/* Passebger Details Section*/}
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 18, ms: 22 },
                  fontWeight: 500,
                  mt: 2,
                  color: "var(--primary-color)",
                }}
              >
                Passenger Information
              </Typography>
              <Box
                mr={{ xs: 0, sm: 2 }}
                className="admin-balance-transaction"
                style={{ padding: "0px !important" }}
              >
                {allData?.passenger?.length === 0 ? (
                  <>
                    <CircularProgress />
                  </>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>DOB</th>
                        <th>PAX Type</th>
                        <th>Passport No</th>
                        <th>Expire Date</th>
                        {allData?.journeyType !== "Inbound" && (
                          <>
                            <th>Passport</th>
                            <th>Visa</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    {allData?.passenger?.map((traveler, index) => (
                      <tbody key={index}>
                        <tr>
                          <td>
                            {traveler?.gender === "Male" ? (
                              <>
                                {traveler?.gender === "Male" &&
                                traveler?.type === "ADT" ? (
                                  <>
                                    MR {traveler?.fName} {traveler?.lName}
                                  </>
                                ) : (
                                  <>
                                    MSTR {traveler?.fName} {traveler?.lName}
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                {traveler?.gender === "Female" &&
                                traveler?.type === "ADT" ? (
                                  <>
                                    MS {traveler?.fName} {traveler?.lName}
                                  </>
                                ) : (
                                  <>
                                    MISS {traveler?.fName} {traveler?.lName}
                                  </>
                                )}
                              </>
                            )}
                          </td>
                          <td>{traveler?.gender}</td>
                          <td>
                            {" "}
                            {traveler?.dob
                              ? format(new Date(traveler?.dob), "dd MMM yyyy")
                              : "Date of Birth"}
                          </td>
                          <td>
                            {traveler?.type === "ADT"
                              ? "Adult"
                              : traveler?.type === "CNN"
                              ? "Child"
                              : "Infat"}
                          </td>

                          <td>
                            {allData?.journeyType === "Outbound"
                              ? traveler?.passNo?.toUpperCase() ||
                                traveler?.passNo?.toUpperCase() ||
                                "Passport Number"
                              : "Domestic Flight"}
                          </td>

                          <td>
                            {allData?.journeyType === "Outbound"
                              ? traveler?.passEx || traveler?.passEx
                                ? format(
                                    new Date(
                                      traveler?.passEx || traveler?.passEx
                                    ),
                                    "dd MMM yyyy"
                                  )
                                : "Passport Expire Date"
                              : "Domestic Flight"}
                          </td>
                          {allData?.journeyType !== "Inbound" && (
                            <>
                              <td>
                                <a
                                  style={{
                                    color: "#003566",
                                    fontWeight: "500",
                                    fontSize: "12px",
                                    textDecoration: "none",
                                    marginRight: "10px",
                                  }}
                                  href={
                                    traveler?.passportCopy ||
                                    "/congratulatio/noimage"
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  View
                                </a>
                              </td>
                              <td>
                                <a
                                  style={{
                                    color: "#003566",
                                    fontWeight: "500",
                                    fontSize: "12px",
                                    textDecoration: "none",
                                  }}
                                  href={
                                    traveler?.visaCopy ||
                                    "/congratulatio/noimage"
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  View
                                </a>
                              </td>
                            </>
                          )}
                        </tr>
                      </tbody>
                    ))}
                  </table>
                )}
              </Box>
              {/* Passebger Details Section end  */}
              <Box></Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box sx={{ bgcolor: "var(--white)", px: 1.5, py: 2 }}>
                <Box sx={{ my: 2 }}>
                  <Box
                    sx={{
                      overflow: "hidden",
                      bgcolor: "var(--card-color)",
                    }}
                  >
                    <Box>
                      <Box>
                        <Typography
                          style={{
                            color: "var(--secondary-color)",
                            fontSize: 14,
                            fontWeight: "400",
                          }}
                        >
                          Total Payable
                        </Typography>
                        <Typography
                          style={{
                            color: "var(--secondary-color)",
                            fontSize: 24,
                            fontWeight: "500",
                          }}
                        >
                          {allData?.grossCost} ৳
                        </Typography>
                      </Box>

                      <Box
                        style={{
                          background: "var(--input-bgcolor)",
                          padding: "2px 10px",
                          display: "flex",
                          alignItems: "center",
                          margin: "8px 0px",
                        }}
                      >
                        <Typography
                          style={{
                            color: "var(--primary-color)",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          Price Breakdown
                        </Typography>
                      </Box>
                      <Box mt={2}>
                        <Typography
                          style={{
                            color: "#110F0F",
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          Adult x{allData?.adultCount}
                        </Typography>
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                          mt={0.7}
                        >
                          <Box>
                            <Typography
                              style={{
                                fontSize: "12px",
                                color: "var(--primary-color)",
                                fontWeight: "500",
                              }}
                            >
                              Base Fare x{allData?.adultCount}
                            </Typography>
                            <Typography
                              style={{
                                fontSize: "12px",
                                color: "var(--primary-color)",
                                fontWeight: "500",
                              }}
                            >
                              Tax x{allData?.adultCount}
                            </Typography>
                          </Box>
                          <Box style={{ textAlign: "right" }}>
                            <Typography
                              style={{
                                fontSize: "12px",
                                color: "var(--primary-color)",
                                fontWeight: "500",
                              }}
                            >
                              {allData?.adultCostBase} ৳
                            </Typography>
                            <Typography
                              style={{
                                fontSize: "12px",
                                color: "var(--primary-color)",
                                fontWeight: "500",
                              }}
                            >
                              {allData?.adultCostTax} ৳
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      {allData?.childCount > 0 && (
                        <Box mt={2}>
                          <Typography
                            style={{
                              color: "#110F0F",
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                          >
                            Child x{allData?.childCount}
                          </Typography>
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            mt={0.7}
                          >
                            <Box>
                              <Typography
                                style={{
                                  fontSize: "12px",
                                  color: "var(--primary-color)",
                                  fontWeight: "500",
                                }}
                              >
                                Base Fare x{allData?.childCount}
                              </Typography>
                              <Typography
                                style={{
                                  fontSize: "12px",
                                  color: "var(--primary-color)",
                                  fontWeight: "500",
                                }}
                              >
                                Tax x{allData?.childCount}
                              </Typography>
                            </Box>
                            <Box style={{ textAlign: "right" }}>
                              <Typography
                                style={{
                                  fontSize: "12px",
                                  color: "var(--primary-color)",
                                  fontWeight: "500",
                                }}
                              >
                                {allData?.childCostBase} ৳
                              </Typography>
                              <Typography
                                style={{
                                  fontSize: "12px",
                                  color: "var(--primary-color)",
                                  fontWeight: "500",
                                }}
                              >
                                {allData?.childCostTax} ৳
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      )}
                      {allData?.infantCount > 0 && (
                        <Box mt={2}>
                          <Typography
                            style={{
                              color: "#110F0F",
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                          >
                            Infant x{allData?.infantCount}
                          </Typography>
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            mt={0.7}
                          >
                            <Box>
                              <Typography
                                style={{
                                  fontSize: "12px",
                                  color: "var(--primary-color)",
                                  fontWeight: "500",
                                }}
                              >
                                Base Fare x{allData?.infantCount}
                              </Typography>
                              <Typography
                                style={{
                                  fontSize: "12px",
                                  color: "var(--primary-color)",
                                  fontWeight: "500",
                                }}
                              >
                                Tax x{allData?.infantCount}
                              </Typography>
                            </Box>
                            <Box style={{ textAlign: "right" }}>
                              <Typography
                                style={{
                                  fontSize: "12px",
                                  color: "var(--primary-color)",
                                  fontWeight: "500",
                                }}
                              >
                                {allData?.infantCostBase} ৳
                              </Typography>
                              <Typography
                                style={{
                                  fontSize: "12px",
                                  color: "var(--primary-color)",
                                  fontWeight: "500",
                                }}
                              >
                                {allData?.infantCostTax} ৳
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      )}
                      <Divider sx={{ my: "5px" }} />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "var(--primary-color)",
                            fontWeight: "500",
                          }}
                        >
                          Total Base & Tax
                        </Typography>

                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "var(--primary-color)",
                            fontWeight: "500",
                          }}
                        >
                          {totalPrice} ৳ <br />
                        </Typography>
                      </Box>
                      <Divider sx={{ my: "5px" }} />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography
                            style={{
                              fontSize: "12px",
                              color: "var(--primary-color)",
                              fontWeight: "500",
                            }}
                          >
                            Customer Invoice Total
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            style={{
                              textAlign: "right",
                              fontSize: "12px",
                              color: "var(--primary-color)",
                              fontWeight: "500",
                            }}
                          >
                            {allData?.grossCost} ৳
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    marginLeft={{ xs: 0, md: "10%" }}
                    width={{ xs: "100%", md: "90%" }}
                    m={2}
                    sx={{
                      ".MuiAccordion-root:before": {
                        height: 0,
                      },
                    }}
                  >
                    <Accordion
                      expanded={expanded === "panel2"}
                      onChange={handleChange("panel2")}
                      style={{
                        marginBottom: "10px",
                        boxShadow: "none",
                        backgroundColor: "var(--card-color)",
                      }}
                    >
                      <AccordionSummary
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                      >
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            alignItems: "center",
                            height: "20px",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "var(--secondary-color)",
                              fontWeight: "500",
                            }}
                          >
                            PNR History
                          </Typography>
                          <Box>
                            {expanded === "panel2" ? (
                              <RemoveIcon
                                style={{
                                  color: "var(--primary-color)",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <AddIcon
                                style={{
                                  color: "var(--primary-color)",
                                  fontSize: "25px",
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        {allData?.activity?.map((data, index) => (
                          <Box className="lineParentBox" key={index}>
                            <Grid container spacing={4}>
                              <Grid item xs={1}>
                                <Box className="note-line">
                                  <Box
                                    sx={{
                                      width: "18px",
                                      height: "18px",
                                      bgcolor: "var(--primary-color)",
                                      position: "absolute",
                                      left: "-10px",
                                      borderRadius: "50%",
                                    }}
                                  />
                                </Box>
                              </Grid>
                              <Grid item mt="-3px" xs={10}>
                                <Typography
                                  style={{
                                    color: "var(--secondary-color)",
                                    fontSize: "16px",
                                    fontWeight: 400,
                                  }}
                                >
                                  {data?.status}
                                </Typography>
                                <Box py={1}>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: "11px",
                                      fontWeight: 400,
                                    }}
                                  >
                                    {data?.status === "Hold" ||
                                    data?.status === "Issue In Processing" ||
                                    data?.status === "Reissue In Processing" ||
                                    data?.status === "Refund In Processing" ||
                                    data?.status === "Void In Processing" ? (
                                      <>
                                        {data?.actionBy}, {userData[0]?.company}
                                      </>
                                    ) : (
                                      <>{companyName}</>
                                    )}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: "11px",
                                      fontWeight: 400,
                                    }}
                                  >
                                    {data?.actionAt
                                      ? format(
                                          new Date(data?.actionAt?.toString()),
                                          "dd MMM yyyy hh:mm a"
                                        )
                                      : "Issue Time"}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--text-color)",
                                      fontSize: "12px",
                                      fontWeight: 400,
                                      mt: "4px",
                                    }}
                                  >
                                    {data?.remarks === "" ||
                                    data?.remarks === " " ? (
                                      ""
                                    ) : (
                                      <>Remarks: {data?.remarks}</>
                                    )}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        ))}
                      </AccordionDetails>
                    </Accordion>

                    <Accordion
                      expanded={expanded === "panel3"}
                      onChange={handleChange("panel3")}
                      style={{
                        marginBottom: "10px",
                        backgroundColor: "var(--card-color)",
                        boxShadow: "none",
                      }}
                    >
                      <AccordionSummary
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                      >
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            alignItems: "center",
                            height: "20px",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "var(--secondary-color)",
                              fontWeight: "500",
                            }}
                          >
                            Download PDF
                          </Typography>
                          <Box>
                            {expanded === "panel3" ? (
                              <RemoveIcon
                                style={{
                                  color: "var(--primary-color)",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <AddIcon
                                style={{
                                  color: "var(--primary-color)",
                                  fontSize: "25px",
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          {/* <AllPDF
                            agentID={agentID}
                            bookingId={bookingId}
                            pnr={pnr}
                            userSide="user"
                          /> */}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion
                      expanded={expanded === "panel4"}
                      onChange={handleChange("panel4")}
                      style={{
                        boxShadow: "none",
                        backgroundColor: "var(--card-color)",
                      }}
                    >
                      <AccordionSummary
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                      >
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            alignItems: "center",
                            height: "20px",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "var(--secondary-color)",
                              fontWeight: "500",
                            }}
                          >
                            Fare Rules
                          </Typography>
                          <Box>
                            {expanded === "panel4" ? (
                              <RemoveIcon
                                style={{
                                  color: "var(--primary-color)",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <AddIcon
                                style={{
                                  color: "var(--primary-color)",
                                  fontSize: "25px",
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "var(--text-color)",
                          }}
                        >
                          No automatic fare rules available, Please mail us for
                          fare rules.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Box>

                {/* accordion end here */}

                {/* Document Upload and Issue request start */}
                <Box
                  sx={{
                    width: { xs: "100%", sm: "90%" },
                    marginLeft: { xs: 0, sm: "10%" },
                    button: {
                      border: "none",
                      outline: "none",
                      width: "100%",
                      py: 0.8,
                      cursor: "pointer",
                      color: "var(--text-mateBlack)",
                    },
                  }}
                >
                  {allData?.status === "Hold" &&
                  allData?.journeyType === "Outbound" ? (
                    <Box>
                      {allData?.passenger[0]?.passportCopy === "" &&
                      allData?.passenger[0]?.visaCopy === "" ? (
                        <Box>
                          <Box className="upload" mt={2}>
                            <button onClick={() => handleOpenUpdateModal()}>
                              Upload Document
                            </button>
                          </Box>
                          <Box className="issueCancel" mt={2}>
                            <button onClick={cancelBooking}>
                              Cancel Ticket
                            </button>
                          </Box>
                        </Box>
                      ) : (
                        <Box>
                          <Box
                            sx={{
                              bgcolor: "green",
                              p: "5px",
                              color: "#fff",
                              textAlign: "center",
                            }}
                            my={2}
                          >
                            Document Uploaded ✔
                          </Box>
                          <Box className="issueTicket" mt={2}>
                            <button onClick={handleIssueTicket}>
                              Issue Ticket
                            </button>
                            <Box className="issueCancel" mt={2}>
                              <button onClick={cancelBooking}>
                                Cancel Ticket
                              </button>
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  ) : allData?.status === "Hold" ? (
                    <Box>
                      <Box className="issueTicket" mt={2}>
                        <button onClick={handleIssueTicket}>
                          Issue Ticket
                        </button>
                      </Box>
                      <Box className="issueCancel" mt={2}>
                        <button onClick={cancelBooking}>Cancel Ticket</button>
                      </Box>
                    </Box>
                  ) : null}
                </Box>
                {/* Document Upload and Issue request end */}

                {/* Refund and Reissue and Void  */}
                {allData.status === "Ticketed" ? (
                  <Box>
                    {/* Refundable start */}
                    {allData?.refundable === "yes" ? (
                      <Box className="queues-detail-calcel-btn">
                        <Box className="issueTicket" mt={2} textAlign="end">
                          <button onClick={() => setOpenModalRefund(true)}>
                            Refund
                          </button>
                        </Box>
                        <Modal
                          open={openModalRefund}
                          onClose={() => setOpenModalRefund(false)}
                          className="custom-modal-r modal-table-0"
                        >
                          <Box className="modalStyler" bgcolor="#fff" p="25px">
                            <Box className="modal-table">
                              <Typography
                                sx={{
                                  color: "#222222",
                                  fontSize: "20px",
                                  fontWeight: 500,
                                  mb: "10px",
                                }}
                              >
                                Make Refund Request
                              </Typography>
                              <table>
                                <tr style={{ padding: "10px" }}>
                                  <th width="5%">Select</th>
                                  <th width="35%">Passenger Name</th>
                                  <th width="20%">Gender</th>
                                  <th width="20%">Passenger Type</th>
                                  <th width="30%">Ticket No</th>
                                </tr>
                                {allData?.ticketData?.map((ticket, index) => (
                                  <tr key={index}>
                                    <td
                                      width="10px"
                                      style={{
                                        border: "none",
                                      }}
                                    >
                                      <FormGroup
                                        style={{
                                          padding: "0px",
                                          margin: "0px",
                                        }}
                                      >
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              style={{
                                                padding: "0px",
                                                margin: "auto",
                                                marginLeft: "20px",
                                              }}
                                              onChange={() =>
                                                handleCheckBox(index)
                                              }
                                            />
                                          }
                                        />
                                      </FormGroup>
                                    </td>
                                    <td>
                                      {ticket?.gender === "Female" ? (
                                        <>
                                          {ticket?.gender === "Female" &&
                                          ticket?.pType === "ADT" ? (
                                            <>MS {ticket?.passengerName}</>
                                          ) : (
                                            <>MISS {ticket?.passengerName}</>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {ticket?.gender === "Male" &&
                                          ticket?.pType === "ADT" ? (
                                            <>MR {ticket?.passengerName}</>
                                          ) : (
                                            <>MSTR {ticket?.passengerName}</>
                                          )}
                                        </>
                                      )}
                                    </td>
                                    <td>{ticket?.gender}</td>
                                    <td>
                                      {ticket?.pType === "ADT" ? (
                                        <>Adult</>
                                      ) : ticket?.pType === "CNN" ? (
                                        <>Child</>
                                      ) : (
                                        <>Infant</>
                                      )}
                                    </td>
                                    <td>{ticket?.ticketno}</td>
                                  </tr>
                                ))}
                              </table>
                              <Grid
                                container
                                justifyContent={"space-between"}
                                alignItems="center"
                              >
                                <Grid item mt={2}></Grid>
                                <Grid item mt={4}>
                                  <>
                                    <button
                                      disabled={!checkBox === true}
                                      style={
                                        isDisabled
                                          ? styles.buttonDisabled
                                          : styles.button
                                      }
                                      onClick={handleRefund}
                                    >
                                      {isDisabled
                                        ? "Wait for refund"
                                        : "Submit"}
                                    </button>
                                    <button
                                      style={{
                                        padding: "6px 20px",
                                        color: "#fff",
                                        backgroundColor: "crimson",
                                        border: "none",
                                        cursor: "pointer",
                                      }}
                                      type="reset"
                                      onClick={() => setOpenModalRefund(false)}
                                    >
                                      Cancel
                                    </button>
                                  </>
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                          {/* </from> */}
                        </Modal>
                      </Box>
                    ) : null}
                    {/* Refundable end */}
                    {/* Reissue start */}

                    {allData?.status === "Ticketed" ? (
                      <Box className="queues-detail-calcel-btn">
                        <Box className="issueTicket" mt={2} textAlign="end">
                          <button onClick={() => setOpenModalReIssue(true)}>
                            Reissue
                          </button>
                        </Box>
                        <Modal
                          open={openModalReIssue}
                          onClose={() => setOpenModalReIssue(false)}
                          className="custom-modal-r modal-table-0"
                        >
                          <Box className="modalStyler" bgcolor="#fff" p="25px">
                            <Box className="modal-table">
                              <Typography
                                sx={{
                                  color: "#222222",
                                  fontSize: "20px",
                                  fontWeight: 500,
                                  mb: "10px",
                                }}
                              >
                                Make Re-Issue Request
                              </Typography>
                              <table>
                                <tr>
                                  <th width="5%">Select</th>
                                  <th width="35%">Passenger Name</th>
                                  <th width="20%">Gender</th>
                                  <th width="20%">Passenger Type</th>
                                  <th width="30%">Ticket No</th>
                                </tr>
                                {allData?.ticketData?.map((ticket, index) => (
                                  <tr key={index}>
                                    <td width="10px" style={{ border: "none" }}>
                                      <FormGroup
                                        style={{
                                          padding: "0px",
                                          margin: "0px",
                                        }}
                                      >
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              style={{
                                                padding: "0px",
                                                margin: "auto",
                                                marginLeft: "20px",
                                              }}
                                              onChange={() =>
                                                handleCheckBox(index)
                                              }
                                            />
                                          }
                                        />
                                      </FormGroup>
                                    </td>
                                    <td>
                                      {ticket?.gender === "Female" ? (
                                        <>
                                          {ticket?.gender === "Female" &&
                                          ticket?.pType === "ADT" ? (
                                            <>MS {ticket?.passengerName}</>
                                          ) : (
                                            <>MISS {ticket?.passengerName}</>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {ticket?.gender === "Male" &&
                                          ticket?.pType === "ADT" ? (
                                            <>MR {ticket?.passengerName}</>
                                          ) : (
                                            <>MSTR {ticket?.passengerName}</>
                                          )}
                                        </>
                                      )}
                                    </td>
                                    <td>{ticket?.gender}</td>
                                    <td>
                                      {ticket?.pType === "ADT" ? (
                                        <>Adult</>
                                      ) : ticket?.pType === "CNN" ? (
                                        <>Child</>
                                      ) : (
                                        <>Infant</>
                                      )}
                                    </td>
                                    <td>{ticket?.ticketno}</td>
                                  </tr>
                                ))}
                              </table>
                              <Grid
                                container
                                justifyContent={"space-between"}
                                alignItems="center"
                              >
                                <Grid item mt={2}>
                                  <Box>
                                    <label htmlFor="date">Select Date</label>{" "}
                                    <br />
                                    <input
                                      style={{
                                        border: "2px solid #C4C4C4",
                                        padding: "5px",
                                        fontSize: "14px",
                                        cursor: "pointer",
                                      }}
                                      required
                                      type="text"
                                      name="date"
                                      readOnly
                                      value={format(
                                        new Date(date),
                                        "dd MMM yyyy"
                                      )}
                                      onClick={() => {
                                        setOpenDate((prev) => !prev);
                                      }}
                                    />
                                    {openDate && (
                                      <Calendar
                                        color={"#222222"}
                                        date={new Date(date)}
                                        onChange={(date) => {
                                          setDate(
                                            new Date(date).toLocaleDateString(
                                              "sv"
                                            )
                                          );
                                          setOpenDate(false);
                                        }}
                                        minDate={new Date(date)}
                                        months={1}
                                        direction="horizontal"
                                        className="new-dashboard-calendar"
                                        name="dashboard-calendar"
                                      />
                                    )}
                                  </Box>
                                </Grid>
                                <Grid item mt={4}>
                                  <>
                                    <button
                                      disabled={!checkBox === true}
                                      style={
                                        isDisabled
                                          ? styles.buttonDisabled
                                          : styles.button
                                      }
                                      onClick={handleReissue}
                                    >
                                      {isDisabled
                                        ? "Wait for reissue"
                                        : "Submit"}
                                    </button>
                                    <button
                                      style={{
                                        padding: "6px 20px",
                                        color: "#fff",
                                        backgroundColor: "crimson",
                                        border: "none",
                                        cursor: "pointer",
                                      }}
                                      type="reset"
                                      onClick={() => setOpenModalReIssue(false)}
                                    >
                                      Cancel
                                    </button>
                                  </>
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                          {/* </from> */}
                        </Modal>
                      </Box>
                    ) : null}

                    {/* Reissue end */}

                    {/* Void start */}
                    {allData?.status === "Ticketed" &&
                    todaydate <= voideDate ? (
                      <Box className="queues-detail-calcel-btn">
                        <Box className="issueTicket" mt={2} textAlign="end">
                          <button onClick={() => setOpenModalVoid(true)}>
                            Void
                          </button>
                        </Box>
                        <Modal
                          open={openModalVoid}
                          onClose={() => setOpenModalVoid(false)}
                          className="custom-modal-r modal-table-0"
                        >
                          <Box className="modalStyler" bgcolor="#fff" p="25px">
                            <Box className="modal-table">
                              <Typography
                                sx={{
                                  color: "#222222",
                                  fontSize: "20px",
                                  fontWeight: 500,
                                  mb: "10px",
                                }}
                              >
                                Make Void Request
                              </Typography>
                              <table>
                                <tr>
                                  <th width="5%">Select</th>
                                  <th width="35%">Passenger Name</th>
                                  <th width="20%">Gender</th>
                                  <th width="20%">Passenger Type</th>
                                  <th width="30%">Ticket No</th>
                                </tr>
                                {invoiceId.map((ticket, index) => (
                                  <tr key={index}>
                                    <td width="10px" style={{ border: "none" }}>
                                      <FormGroup
                                        style={{
                                          padding: "0px",
                                          margin: "0px",
                                        }}
                                      >
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              style={{
                                                padding: "0px",
                                                margin: "auto",
                                                marginLeft: "20px",
                                              }}
                                              onChange={() =>
                                                handleCheckBox(index)
                                              }
                                            />
                                          }
                                        />
                                      </FormGroup>
                                    </td>
                                    <td>
                                      {ticket?.gender === "Female" ? (
                                        <>
                                          {ticket?.gender === "Female" &&
                                          ticket?.pType === "ADT" ? (
                                            <>MS {ticket?.passengerName}</>
                                          ) : (
                                            <>MISS {ticket?.passengerName}</>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {ticket?.gender === "Male" &&
                                          ticket?.pType === "ADT" ? (
                                            <>MR {ticket?.passengerName}</>
                                          ) : (
                                            <>MSTR {ticket?.passengerName}</>
                                          )}
                                        </>
                                      )}
                                    </td>
                                    <td>{ticket?.gender}</td>
                                    <td>
                                      {ticket?.pType === "ADT" ? (
                                        <>Adult</>
                                      ) : ticket?.pType === "CNN" ? (
                                        <>Child</>
                                      ) : (
                                        <>Infant</>
                                      )}
                                    </td>
                                    <td>{ticket?.ticketno}</td>
                                  </tr>
                                ))}
                              </table>
                              <Grid
                                container
                                justifyContent={"space-between"}
                                alignItems="center"
                              >
                                <Grid item mt={2}></Grid>
                                <Grid item mt={4}>
                                  <>
                                    <button
                                      disabled={!checkBox === true}
                                      style={
                                        isDisabled
                                          ? styles.buttonDisabled
                                          : styles.button
                                      }
                                      onClick={handleVoid}
                                    >
                                      {isDisabled ? "Wait for void" : "Submit"}
                                    </button>

                                    <button
                                      style={{
                                        padding: "6px 20px",
                                        color: "#fff",
                                        backgroundColor: "crimson",
                                        border: "none",
                                        cursor: "pointer",
                                      }}
                                      type="reset"
                                      onClick={() => setOpenModalVoid(false)}
                                    >
                                      Cancel
                                    </button>
                                  </>
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                          {/* </from> */}
                        </Modal>
                      </Box>
                    ) : null}
                    {/* Void end */}
                  </Box>
                ) : allData?.status === "Issue In Processing" ? (
                  <Box className="queues-detail-wait-btn" textAlign="right">
                    <button>Wait For Ticketed</button>
                  </Box>
                ) : allData?.status === "Refund In Processing" ? (
                  <Box className="queues-detail-wait-btn" textAlign="right">
                    <button>Wait For Refunded</button>
                  </Box>
                ) : allData?.status === "Reissue In Processing" ? (
                  <Box className="queues-detail-wait-btn" textAlign="right">
                    <button>Wait For Reissued</button>
                  </Box>
                ) : allData?.status === "Void In Processing" ? (
                  <Box className="queues-detail-wait-btn" textAlign="right">
                    <button>Wait For Voided</button>
                  </Box>
                ) : null}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      {/* //todo: Update Document Modal */}
    </>
  );
};

export default Congratulation;
