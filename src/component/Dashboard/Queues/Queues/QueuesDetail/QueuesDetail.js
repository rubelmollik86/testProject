/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-no-comment-textnodes */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
// import airlineNames from "../../../../../DashboardMain/airlineNames";
import airlineNames from "./airlineNames";
import commaNumber from "comma-number";
import Loader from "../../../../../image/loader/Render.gif";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import axios from "axios";
import "./QueuesDetail.css";
import secureLocalStorage from "react-secure-storage";
import { format } from "date-fns";
import { Calendar } from "react-date-range";
import cancelImg from "../../../../../image/undraw/undraw_cancel_re_pkdm.svg";
import cancelFailed from "../../../../../image/undraw/undraw_bug_fixing_oc-7-a.svg";
import ReConfirm from "../../../../../image/undraw/undraw_confirmation_re_b6q5.svg";
import Issue from "../../../../../image/undraw/undraw_booking_re_gw4j.svg";
import Invalid from "../../../../../image/undraw/undraw_warning_re_eoyh.svg";
import FileUploadSection from "../../../../Shared/FileUploadSection/FileUploadSection";
import { ToWords } from "to-words";
// import { toWords } from "number-to-words";
import flightData from "./../../../../flightData";

const QueuesDetail = () => {
  //  handle accordion function
  //Data from Queues page
  const location = useLocation();
  const {
    bookingId,
    gds,
    deptFrom,
    arriveTo,
    pnr,
    airlines,
    netCost,
    tripType,
  } = location?.state;

  const [triptype, setTripType] = useState("");

  const issueModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "#fff",
    p: 4,
  };
  const navigate = useNavigate();
  const [openModalReIssue, setOpenModalReIssue] = useState(false);
  const [openModalRefund, setOpenModalRefund] = useState(false);
  const [openModalVoid, setOpenModalVoid] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [expanded, setExpanded] = useState("panel1");
  const [downExpanded, setDownExpanded] = useState();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleChangeDown = (panel) => (event, newExpanded) => {
    setDownExpanded(newExpanded ? panel : false);
  };
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [issueLoading, setIssueLoading] = useState(false);
  // --------------------- client information start ---------------------------
  const users = secureLocalStorage.getItem("user-info");
  let agentID = users?.user?.agentId;

  let agentName = users?.user?.name;
  let staffName = users?.user?.name;
  let userStaffId = users?.user?.staffId;

  const [isDone, setIsDone] = useState(true);

  const [flyhubBookData, setflyhubBookData] = useState({});
  const [sabreBookData, setSabreBookData] = useState({});
  const [bookingDetails, setBookingDetails] = useState([]);
  const [allData, setAllData] = useState([]);
  const [invoiceId, setInvoiceId] = useState([]);
  const [userData, setUserData] = useState([0]);
  const [flightName, setFlightName] = useState([]);
  // const [passengerData, setPassengerData] = useState([]);
  const [prices, setPrices] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(format(new Date(), "dd-MMM-yyyy"));
  const [discountPrice, setDiscountPrice] = useState("");

  //todo:state change
  const [state, setState] = useState(false);

  // visa and passport copy update state
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const handleOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleCloseUpdateModal = () => {
    setState((prev) => !prev);
    setOpenUpdateModal(false);
    // navigate(0);
  };
  const updateModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "#fff",
    p: 4,
  };
  // End of visa and passport copy update
  const [balance, setBalance] = useState([]);
  const [lastBalance, setLastBalance] = useState(0);
  const [creditBalance, setCreditBalance] = useState(0);
  const [bonusBalance, setBonusBalance] = useState(0);
  useEffect(() => {
    //todo: inbound outbound
    const depObj = flightData.filter((item) => item.code === deptFrom.trim());
    const arrObj = flightData.filter((item) => item.code === arriveTo.trim());
    const depCountry = depObj[0]?.Address?.split(",")[1]?.trim()?.toLowerCase();
    const arrCountry = arrObj[0]?.Address?.split(",")[1]?.trim()?.toLowerCase();
    if (depCountry === "bangladesh" && arrCountry === "bangladesh") {
      setTripType("Inbound");
    } else {
      setTripType("Outbound");
    }
    //todo: inbound outbound

    const fetchAllData = async () => {
      const resBookingId = await axios(
        `https://api.flyfarint.com/v.1.0.0/Queues/BookingData.php?agentId=${agentID}&bookingId=${bookingId}`
      );
      setAllData(resBookingId.data[0]);
      setInvoiceId(resBookingId?.data[0]?.ticketData);

      const resUserData = await axios(
        `https://api.flyfarint.com/v.1.0.0/Accounts/MyAccount.php?agentId=${agentID}`
      );
      setUserData(resUserData.data);

      const resBalenceData = await axios(
        `https://api.flyfarint.com/v.1.0.0/Accounts/ClientLeadger.php?agentId=${agentID}&balance`
      );
      setBalance(resBalenceData.data);
      // console.log(resBalenceData.data[0]);
      setLastBalance(Number.parseInt(resBalenceData.data[0].lastAmount));
      setCreditBalance(Number.parseInt(resBalenceData.data[0].credit));
      setBonusBalance(Number.parseInt(resBalenceData.data[0].bonus));
    };

    fetchAllData();
  }, [agentID, bookingId]);

  const cancelBooking = (system, pnr) => {
    Swal.fire({
      imageUrl: ReConfirm,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      title: "Are you sure?",
      text: "You Wants to Cancel this Flight ?",
      showCancelButton: true,
      confirmButtonColor: "var(--primary-color)",
      confirmButtonText: "Yes Cancel it!",
      cancelButtonColor: "#dc143c",
      cancelButtonText: "Don't Cancel it",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        setIsDone(false);
        setOpen(false);
        setIsLoading(false);
        let url = `https://api.flyfarint.com/v.1.0.0/AirBooking/AirCancel.php`;
        let body = JSON.stringify({
          bookingId: bookingId,
          cancelBy: staffName || agentID,
          platform: "B2B",
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
                imageUrl: cancelImg,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                title: "Your Flight is Canceled!",
                html: "For any query.Please contact us at <strong>support@flyfarint.com</strong> or <strong>01755-572099, 09606912912</strong>",
                confirmButtonText: "OK",
                confirmButtonColor: "#dc143c",
              }).then(() => {
                setIsDone(true);
                navigate(-1);
              });
            } else {
              throw new Error("error");
            }
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              imageUrl: cancelFailed,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
              title: "Booking Cancel Failed!",
              html: "For any query.Please contact us at <strong>support@flyfarint.com</strong> or <strong>01755-572099, 09606912912</strong>",
              confirmButtonText: "OK",
              confirmButtonColor: "#dc143c",
            }).then(() => {
              setIsDone(true);
              navigate(-1);
            });
          });
      }
    });
  };

  //--------------- Booking cancel handle end ------------------
  //--------------- Issue Ticket Start ------------------

  async function handleIssueTicket() {
    const e = window.event;
    e.preventDefault();
    if (bonusBalance > 0) {
      Swal.fire({
        imageUrl: ReConfirm,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        title: "Use Your Bonus Balance",
        html: "If you use your bonus balance <strong>100 BDT</strong> will be deduct form your bonus wallet",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonColor: "var(--primary-color)",
        cancelButtonColor: "#9999",
        denyButtonColor: "#dc143c",
        confirmButtonText: "Redeem Bonus",
        denyButtonText: `Don't Use Bonus`,
      }).then((result) => {
        if (result.isConfirmed) {
          setIsDone(false);
          setIssueLoading(true);
          fetch(
            "https://api.flyfarint.com/v.1.0.0/AirBooking/AirTicketing.php",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },

              body: JSON.stringify({
                agentId: agentID || "Agent",
                bookingId: bookingId || "BookingId",
                staffId: userStaffId || "Staff",
                airlines: airlines,
                issueRequestBy: staffName || agentName,
                route: `${deptFrom}-${arriveTo}`,
                type: tripType,
                cost: netCost,
                pnr: pnr,
                gds: gds,
                status: "Issue in Process",
                useFromBonus: "yes",
              }),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                Swal.fire({
                  imageUrl: Issue,
                  imageWidth: 400,
                  imageHeight: 200,
                  imageAlt: "Custom image",
                  title: "Issue Ticket Request In Process",
                  html: "Your issue ticket request submitted successfully wait for a response. if you do not receive any email, please contact us at <strong>support@flyfarint.com or 01755-572099, 09606912912</strong>",
                  confirmButtonColor: "#dc143c",
                  confirmButtonText: "Ok",
                }).then(function () {
                  setIssueLoading(false);
                  setIsDone(true);
                  navigate(0);
                });
              } else {
                throw new Error("error");
              }
            })
            .catch((err) => {
              Swal.fire({
                imageUrl: Invalid,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                title: "Issue Ticket Failed!",
                confirmButtonColor: "#dc143c",
                confirmButtonText: "Ok",
              }).then(function () {
                setIssueLoading(false);
                setIsDone(true);
                navigate(-1);
              });
            });
        } else if (result.isDenied) {
          setIsDone(false);
          setIssueLoading(true);
          fetch(
            "https://api.flyfarint.com/v.1.0.0/AirBooking/AirTicketing.php",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                agentId: agentID || "Agent",
                bookingId: bookingId || "BookingId",
                staffId: userStaffId || "Staff",
                airlines: airlines,
                issueRequestBy: staffName || agentName,
                route: `${deptFrom}-${arriveTo}`,
                type: tripType,
                cost: netCost,
                pnr: pnr,
                gds: gds,
                status: "Issue in Process",
                useFromBonus: "no",
              }),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                Swal.fire({
                  imageUrl: Issue,
                  imageWidth: 400,
                  imageHeight: 200,
                  imageAlt: "Custom image",
                  title: "Issue Ticket Request In Process",
                  html: "Your issue ticket request submitted successfully wait for a response. if you do not receive any email, please contact us at <strong>support@flyfarint.com or 01755-572099, 09606912912</strong>",
                  confirmButtonColor: "#dc143c",
                  confirmButtonText: "Ok",
                }).then(function () {
                  setIssueLoading(false);
                  setIsDone(true);
                  navigate(0);
                });
              } else {
                throw new Error("error");
              }
            })
            .catch((err) => {
              Swal.fire({
                imageUrl: Invalid,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                title: "Issue Ticket Failed!",
                confirmButtonColor: "#dc143c",
                confirmButtonText: "Ok",
              }).then(function () {
                setIssueLoading(false);
                setIsDone(true);
                navigate(-1);
              });
            });
        }
      });
    } else {
      setIsDone(false);
      setIssueLoading(true);
      let url = "https://api.flyfarint.com/v.1.0.0/AirBooking/AirTicketing.php";
      let body = JSON.stringify({
        agentId: agentID || "Agent",
        bookingId: bookingId || "BookingId",
        staffId: userStaffId || "Staff",
        airlines: airlines,
        issueRequestBy: staffName || agentName,
        route: `${deptFrom}-${arriveTo}`,
        type: tripType,
        cost: netCost,
        pnr: pnr,
        gds: gds,
        status: "Issue in Process",
        useFromBonus: "no",
      });

      await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.status === "success") {
            Swal.fire({
              imageUrl: Issue,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
              title: "Issue Ticket Request In Process",
              html: "Your issue ticket request submitted successfully wait for a response. if you do not receive any email, please contact us at <strong>support@flyfarint.com or 01755-572099, 09606912912</strong>",
              confirmButtonColor: "#dc143c",
              confirmButtonText: "Ok",
            }).then(function () {
              setIsDone(true);
              setIssueLoading(false);
              navigate(-1);
            });
          } else {
            throw new Error("error");
          }
        })
        .catch((err) => {
          Swal.fire({
            imageUrl: Invalid,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Issue Ticket Failed!",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(function () {
            setIsDone(true);
            setIssueLoading(false);
            navigate(-1);
          });
        });
    }
  }

  //  all passenger total price calculation
  const adultTotalPrice =
    parseInt(allData?.adultCostBase) + parseInt(allData?.adultCostTax);
  const childTotalPrice =
    parseInt(allData?.childCostBase) + parseInt(allData?.childCostTax);

  const infantTotalPrice =
    parseInt(allData?.infantCostBase) + parseInt(allData?.infantCostTax);

  const totalPrice = adultTotalPrice + childTotalPrice + infantTotalPrice;

  const savingMoney = parseInt(allData?.grossCost) - parseInt(allData?.netCost);

  const finalPrice = totalPrice - savingMoney;

  const totalTicketFare = parseInt(allData?.netCost);

  // const number = 0;
  useEffect(() => {
    if (totalPrice > 0) {
      const toWords = new ToWords();
      let words = toWords.convert(totalPrice, {
        currency: false,
        ignoreDecimal: true,
      });
      setPrices(words);

      let discounts = toWords.convert(totalTicketFare, {
        currency: false,
        ignoreDecimal: true,
      });
      setDiscountPrice(discounts);
    }
  }, [totalPrice]);

  const [checkBox, setCheckBox] = useState();
  const handleCheckBox = (index) => {
    const e = window.event;

    const tempData = [...invoiceId];
    tempData[index] = { ...tempData[index], checkBox: e.target.checked };
    setCheckBox(e.target.checked);
    setInvoiceId(tempData);
  };

  let reissue = [];
  let checkIssueBalance = lastBalance + creditBalance;

  if (!isDone) {
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

  // Void -Function

  const handleVoid = async (e) => {
    setIsLoading(false);
    e.preventDefault();
    let body = JSON.stringify({
      agentId: agentID,
      staffId: userStaffId || "StaffId",
      bookingId: bookingId || "BookingId",
      requestedBy: staffName || agentName,
      passengerData: reissue,
    });

    await fetch(
      "https://api.flyfarint.com/v.1.0.0/AirBooking/Void.php",

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
            html: "For any query.Please contact us at <strong>support@flyfarint.com</strong> or <strong>01755-572099, 09606912912</strong>",
            confirmButtonText: "Ok",
            confirmButtonColor: "#dc143c",
          }).then(function () {
            // window.location.href = "/dashboard/account/DepositEntry";
            navigate(0);
          });
        } else {
          setOpenModalVoid(false);
          Swal.fire({
            icon: "error",
            title: "Reissue Request Failed!",
            html: "For any query.Please contact us at <strong>support@flyfarint.com</strong> or <strong>01755-572099, 09606912912</strong>",
            confirmButtonText: "Ok",
            confirmButtonColor: "#dc143c",
          }).then(() => {
            navigate(-1);
          });
        }
      });

    e.target.reset();
  };
  const handleRefund = async (e) => {
    setIsLoading(false);
    e.preventDefault();
    let body = JSON.stringify({
      agentId: agentID,
      staffId: userStaffId || "StaffId",
      bookingId: bookingId || "BookingId",
      requestedBy: staffName || agentName,
      passengerData: reissue,
      // date: date,
    });

    await fetch("https://api.flyfarint.com/v.1.0.0/AirBooking/Refund.php", {
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
          setOpenModalRefund(false);
          Swal.fire({
            icon: "success",
            title: "Your refund request is processing !",
            html: "For any query.Please contact us at <strong>support@flyfarint.com</strong> or <strong>01755-572099, 09606912912</strong>",
            confirmButtonText: "Ok",
            confirmButtonColor: "#dc143c",
          }).then(function () {
            // window.location.href = "/dashboard/account/DepositEntry";
            navigate(0);
          });
        } else {
          setOpenModalRefund(false);
          Swal.fire({
            icon: "error",
            title: "Reissue Request Failed!",
            html: "For any query.Please contact us at <strong>support@flyfarint.com</strong> or <strong>01755-572099, 09606912912</strong>",
            confirmButtonText: "Ok",
            confirmButtonColor: "#dc143c",
          }).then(() => {
            navigate(-1);
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
      staffId: userStaffId || "StaffId",
      bookingId: bookingId || "BookingId",
      requestedBy: staffName || agentName,
      passengerData: reissue,
      date: date,
    });

    await fetch(
      "https://api.flyfarint.com/v.1.0.0/AirBooking/Reissue.php",

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
            html: "For any query.Please contact us at <strong>support@flyfarint.com</strong> or <strong>01755-572099, 09606912912</strong>",
            confirmButtonText: "Ok",
            confirmButtonColor: "#dc143c",
          }).then(function () {
            // window.location.href = "/dashboard/account/DepositEntry";
            navigate(0);
          });
        } else {
          setOpenModalReIssue(false);
          Swal.fire({
            icon: "error",
            title: "Reissue Request Failed!",
            html: "For any query.Please contact us at <strong>support@flyfarint.com</strong> or <strong>01755-572099, 09606912912</strong>",
            confirmButtonText: "Ok",
            confirmButtonColor: "#dc143c",
          }).then(() => {
            navigate(-1);
          });
        }
      });

    e.target.reset();
  };

  const voideDate = new Date(allData?.lastUpdated);
  const todaydate = new Date();

  const allDataPdf = {
    allData,
    invoiceId,
    userData,
    adultTotalPrice,
    childTotalPrice,
    infantTotalPrice,
    totalPrice,
    prices,
    savingMoney,
    discountPrice,
    pnr: location?.state?.pnr || location.state.bookingInfo.pnr,
    bookingId: bookingId,
    // issueTime: issueTime,
  };

  return (
    <Box>
      <Container className="queues-detail-parent" maxWidth="xxl">
        {Object.keys(sabreBookData).length === 0 ? (
          <Box pb={4}>
            <Grid container spacing={2}>
              <>
                <Grid item md={9.5}>
                  <Box className="queues-detail">
                    <Grid container justifyContent={"space-between"}>
                      <Grid item mt={4} mb={2} md={6}>
                        <h2>Reference ID: {bookingId}</h2>
                      </Grid>

                      <Grid item mt={4} mb={2} md={6} textAlign="end">
                        <button>
                          {allData?.status === "Return"
                            ? "Issue Rejected"
                            : allData?.status || "Loading ..."}
                        </button>
                      </Grid>
                    </Grid>
                    <Grid
                      display={"flex"}
                      justifyContent="space-between"
                      alignItems={"center"}
                      container
                    ></Grid>
                  </Box>

                  {/* --------------- Booking confirmation--------------------------- */}
                  <Box mt={2} className="queues-detail-bookingInfo">
                    <span>Booking Confirmation</span>
                    <Grid mt={1} container>
                      <Grid item xs={12} md={6}>
                        <Box display={"flex"} gap="20px">
                          <Box>
                            <h5
                              style={{
                                fontSize: "17px",
                                marginBottom: "10px",
                              }}
                            >
                              Destination:
                            </h5>
                            <h5>Booked By: </h5>
                            <h5>Booked At: </h5>
                            {allData?.status === "Hold" ? (
                              <h5>Time Limit: </h5>
                            ) : (
                              ""
                            )}
                          </Box>
                          <Box>
                            <h5
                              style={{
                                color: "var(--primary-color)",
                                fontWeight: "500",
                                fontSize: "17px",
                                marginBottom: "10px",
                              }}
                            >
                              {deptFrom} - {arriveTo}
                              {tripType === "return" ? (
                                <> - {deptFrom}</>
                              ) : (
                                <></>
                              )}
                            </h5>

                            <h5>{allData?.bookedBy || "Agent"}</h5>
                            <h5>
                              {allData?.bookedAt
                                ? allData?.bookedAt
                                  ? format(
                                      new Date(allData?.bookedAt.toString()),
                                      "dd MMM yyyy hh:mm a"
                                    )
                                  : "Date Time"
                                : "Date Time"}
                            </h5>
                            {allData?.status === "Hold" ? (
                              <>
                                {allData?.timeLimit ? (
                                  allData?.timeLimit ? (
                                    format(
                                      new Date(allData?.timeLimit.toString()),
                                      "dd MMM yyyy hh:mm a"
                                    )
                                  ) : (
                                    <Typography color="var(--gray-text-color)">
                                      Immediate Issue
                                    </Typography>
                                  )
                                ) : (
                                  <Typography color="var(--gray-text-color)">
                                    Immediate Issue
                                  </Typography>
                                )}
                              </>
                            ) : (
                              ""
                            )}
                          </Box>
                        </Box>
                      </Grid>
                      <Grid xs={12} item md={6}>
                        <Box>
                          {allData?.refundable === "yes" ? (
                            <Typography
                              style={{
                                color: "green",
                                fontWeight: 600,
                              }}
                            >
                              Refundable | Economy
                            </Typography>
                          ) : (
                            <Typography
                              style={{
                                color: "red",
                                fontWeight: 600,
                              }}
                            >
                              Non Refundable | Economy
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* ------------- FLight Information ---------------------------- */}

                  <Box mt={2} className="flight-queue-detail-fareInfo">
                    <span>Flight Information</span>
                    <Box mt={2}>
                      <table width="100%">
                        <tr>
                          <th width="15%">Flight</th>
                          <th width="23%">Departure From</th>
                          <th width="23%">Arrival To</th>
                          <th width="10%">Depart At</th>
                          <th width="10%">Arrive At</th>
                          <th width="19%">Info</th>
                        </tr>

                        {allData.length === 0 ? (
                          <Box>Loading...</Box>
                        ) : (
                          <>
                            {allData?.tripType === "oneway" ? (
                              <>
                                {allData?.flightData?.segment.map((data) => (
                                  <tr>
                                    <td>
                                      <img
                                        src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data?.marketingCareer}.png`}
                                        width="30px"
                                        height="30px"
                                        alt="flight Image"
                                        className={`${allData?.flightData.system
                                          ?.toLowerCase()
                                          ?.split(" ")
                                          ?.join("-")}-border`}
                                      />
                                      <br />
                                      {data?.marketingCareerName}
                                      <br />
                                      {data?.marketingCareer}{" "}
                                      {data?.marketingFlight}
                                    </td>
                                    <td>
                                      ({data?.departure}){" "}
                                      {data?.departureAirport}
                                    </td>
                                    <td>
                                      ({data?.arrival}) {data?.arrivalAirport}
                                    </td>
                                    <td>
                                      {data?.departureTime
                                        ? format(
                                            new Date(`${data?.departureTime}`),
                                            "dd MMM yyyy hh:mm a"
                                          )
                                        : "depart Date"}
                                    </td>
                                    <td>
                                      {data?.arrivalTime
                                        ? format(
                                            new Date(`${data?.arrivalTime}`),
                                            "dd MMM yyyy hh:mm a"
                                          )
                                        : "depart Date"}
                                    </td>
                                    <td>
                                      Cabin: 7Kg, Class: {data?.bookingcode}
                                      <br />
                                      Baggage:{" "}
                                      {allData?.adultCount > 0 && (
                                        <>
                                          {parseInt(
                                            data?.adultBag?.split("-")[1]
                                          ) > 3 ? (
                                            <>
                                              ADT-
                                              {allData?.adultBag?.split("-")[1]}
                                            </>
                                          ) : (
                                            <>
                                              ADT-
                                              {allData?.adultBag?.split("-")[1]}
                                            </>
                                          )}
                                        </>
                                      )}
                                      {allData?.childCount > 0 && (
                                        <>
                                          {parseInt(
                                            allData?.childBag?.split("-")[1]
                                          ) > 3 ? (
                                            <>
                                              {", "}CNN-
                                              {allData?.childBag?.split("-")[1]}
                                            </>
                                          ) : (
                                            <>
                                              {", "}CNN-
                                              {allData?.childBag?.split("-")[1]}
                                            </>
                                          )}
                                        </>
                                      )}
                                      {allData?.infantCount > 0 && (
                                        <>
                                          {parseInt(
                                            allData?.infantBag?.split("-")[1]
                                          ) > 3 ? (
                                            <>
                                              {", "}INF-
                                              {
                                                allData?.infantBag?.split(
                                                  "-"
                                                )[1]
                                              }
                                            </>
                                          ) : (
                                            <>
                                              {", "}INF-
                                              {
                                                allData?.infantBag?.split(
                                                  "-"
                                                )[1]
                                              }
                                            </>
                                          )}
                                        </>
                                      )}
                                      <br />
                                      Duration: {data?.flightDuration}
                                    </td>
                                  </tr>
                                ))}
                              </>
                            ) : (
                              <>
                                {allData?.flightData?.Segment_data?.go?.map(
                                  (data) => (
                                    <tr>
                                      <td>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data?.goMarketingCareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt="flight Image"
                                          className={`${allData?.flightData.system
                                            ?.toLowerCase()
                                            ?.split(" ")
                                            ?.join("-")}-border`}
                                        />
                                        <br />
                                        {data?.goMarketingCareerName}
                                        <br />
                                        {data?.goMarketingCareer}{" "}
                                        {data?.goMarketingFlight}
                                      </td>
                                      <td>
                                        ({data?.goDeparture}){" "}
                                        {data?.goDepartureAirport}
                                      </td>
                                      <td>
                                        ({data?.goArrival}){" "}
                                        {data?.goArrivalAirport}
                                      </td>
                                      <td>
                                        {data?.goDepartureTime
                                          ? format(
                                              new Date(
                                                `${data?.goDepartureTime}`
                                              ),
                                              "dd MMM yyyy hh:mm a"
                                            )
                                          : "depart Date"}
                                      </td>
                                      <td>
                                        {data?.goArrivalTime
                                          ? format(
                                              new Date(
                                                `${data?.goArrivalTime}`
                                              ),
                                              "dd MMM yyyy hh:mm a"
                                            )
                                          : "depart Date"}
                                      </td>
                                      <td>
                                        Cabin: 7Kg, Class: {data?.goBookingCode}
                                        <br />
                                        Baggage:{" "}
                                        {allData?.adultCount > 0 && (
                                          <>
                                            {parseInt(
                                              data?.adultBag?.split("|")[0]
                                            ) > 3 ? (
                                              <>
                                                ADT-
                                                {
                                                  allData?.adultBag?.split(
                                                    "|"
                                                  )[0]
                                                }
                                              </>
                                            ) : (
                                              <>
                                                ADT-
                                                {
                                                  allData?.adultBag?.split(
                                                    "|"
                                                  )[0]
                                                }
                                              </>
                                            )}
                                          </>
                                        )}
                                        {allData?.childCount > 0 && (
                                          <>
                                            {parseInt(
                                              allData?.childBag?.split("|")[0]
                                            ) > 3 ? (
                                              <>
                                                {", "}CNN-
                                                {
                                                  allData?.childBag?.split(
                                                    "|"
                                                  )[0]
                                                }
                                              </>
                                            ) : (
                                              <>
                                                {", "}CNN-
                                                {
                                                  allData?.childBag?.split(
                                                    "|"
                                                  )[0]
                                                }
                                              </>
                                            )}
                                          </>
                                        )}
                                        {allData?.infantCount > 0 && (
                                          <>
                                            {parseInt(
                                              allData?.infantBag?.split("|")[0]
                                            ) > 3 ? (
                                              <>
                                                {", "}INF-
                                                {
                                                  allData?.infantBag?.split(
                                                    "|"
                                                  )[0]
                                                }
                                              </>
                                            ) : (
                                              <>
                                                {", "}INF-
                                                {
                                                  allData?.infantBag?.split(
                                                    "|"
                                                  )[0]
                                                }
                                              </>
                                            )}
                                          </>
                                        )}
                                        <br />
                                        Duration: {data?.goFlightDuration}
                                      </td>
                                    </tr>
                                  )
                                )}
                                {allData?.flightData?.Segment_data?.back?.map(
                                  (data) => (
                                    <tr>
                                      <td>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data?.backMarketingCareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt="flight Image"
                                          className={`${allData?.flightData.system
                                            ?.toLowerCase()
                                            ?.split(" ")
                                            ?.join("-")}-border`}
                                        />
                                        <br />
                                        {data?.backMarketingCareerName}
                                        <br />
                                        {data?.backMarketingCareer}{" "}
                                        {data?.backMarketingFlight}
                                      </td>
                                      <td>
                                        ({data?.backDeparture}){" "}
                                        {data?.backDepartureAirport}
                                      </td>
                                      <td>
                                        ({data?.backArrival}){" "}
                                        {data?.backArrivalAirport}
                                      </td>
                                      <td>
                                        {data?.backDepartureTime
                                          ? format(
                                              new Date(
                                                `${data?.backDepartureTime}`
                                              ),
                                              "dd MMM yyyy hh:mm a"
                                            )
                                          : "depart Date"}
                                      </td>
                                      <td>
                                        {data?.backArrivalTime
                                          ? format(
                                              new Date(
                                                `${data?.backArrivalTime}`
                                              ),
                                              "dd MMM yyyy hh:mm a"
                                            )
                                          : "arival Date"}
                                      </td>
                                      <td>
                                        Cabin: 7Kg, Class:{" "}
                                        {data?.backBookingCode}
                                        <br />
                                        Baggage:{" "}
                                        {allData?.adultCount > 0 && (
                                          <>
                                            {parseInt(
                                              data?.adultBag?.split("|")[1]
                                            ) > 3 ? (
                                              <>
                                                ADT-
                                                {
                                                  allData?.adultBag?.split(
                                                    "|"
                                                  )[1]
                                                }
                                              </>
                                            ) : (
                                              <>
                                                ADT-
                                                {
                                                  allData?.adultBag?.split(
                                                    "|"
                                                  )[1]
                                                }
                                              </>
                                            )}
                                          </>
                                        )}
                                        {allData?.childCount > 0 && (
                                          <>
                                            {parseInt(
                                              allData?.childBag?.split("|")[1]
                                            ) > 3 ? (
                                              <>
                                                {", "}CNN-
                                                {
                                                  allData?.childBag?.split(
                                                    "|"
                                                  )[1]
                                                }
                                              </>
                                            ) : (
                                              <>
                                                {", "}CNN-
                                                {
                                                  allData?.childBag?.split(
                                                    "|"
                                                  )[1]
                                                }
                                              </>
                                            )}
                                          </>
                                        )}
                                        {allData?.infantCount > 0 && (
                                          <>
                                            {parseInt(
                                              allData?.infantBag?.split("|")[1]
                                            ) > 3 ? (
                                              <>
                                                {", "}INF-
                                                {
                                                  allData?.infantBag?.split(
                                                    "|"
                                                  )[1]
                                                }
                                              </>
                                            ) : (
                                              <>
                                                {", "}INF-
                                                {
                                                  allData?.infantBag?.split(
                                                    "|"
                                                  )[1]
                                                }
                                              </>
                                            )}
                                          </>
                                        )}
                                        <br />
                                        Duration: {data?.backFlightDuration}
                                      </td>
                                    </tr>
                                  )
                                )}
                              </>
                            )}
                          </>
                        )}

                        {/* Segment 1 oneway and return  */}
                      </table>
                    </Box>
                  </Box>

                  {/*---------------------------- Fare details ----------------------------*/}

                  <Box mt={2} className="flight-queue-detail-fareInfo">
                    <span>Fare Details</span>
                    {allData.length === 0 ? (
                      <>Loading...</>
                    ) : (
                      <>
                        <Box mt={2}>
                          <Box>
                            <table>
                              <tr>
                                <th>Passenger </th>
                                <th>Base Fare </th>
                                <th>Tax</th>
                                <th>Total Fare</th>
                              </tr>

                              {allData?.adultCount > 0 ? (
                                <tr>
                                  <td>Adult X{allData?.adultCount}</td>

                                  <td>
                                    {commaNumber(allData?.adultCostBase)} BDT
                                  </td>
                                  <td>
                                    {commaNumber(allData?.adultCostTax)} BDT
                                  </td>
                                  <td>{commaNumber(adultTotalPrice)} BDT</td>
                                </tr>
                              ) : (
                                <></>
                              )}

                              {allData?.childCount > 0 ? (
                                <tr>
                                  <td>Child X{allData?.childCount}</td>

                                  <td>
                                    {commaNumber(allData?.childCostBase)} BDT
                                  </td>
                                  <td>
                                    {commaNumber(allData?.childCostTax)} BDT
                                  </td>
                                  <td>{commaNumber(childTotalPrice)} BDT</td>
                                </tr>
                              ) : (
                                <></>
                              )}
                              {allData?.infantCount > 0 ? (
                                <tr>
                                  <td>Infant X{allData?.infantCount}</td>
                                  {/* <td></td> */}
                                  <td>
                                    {commaNumber(allData?.infantCostBase)} BDT
                                  </td>
                                  <td>
                                    {commaNumber(allData?.infantCostTax)} BDT
                                  </td>
                                  <td>{commaNumber(infantTotalPrice)} BDT</td>
                                </tr>
                              ) : (
                                <></>
                              )}
                            </table>
                          </Box>
                          <table>
                            <tr>
                              <td style={{ color: "#DC143C" }}>
                                Your Saving:
                                <em style={{ padding: "0px 10px" }}>
                                  {allData?.netCost < totalPrice ? (
                                    <>
                                      {commaNumber(parseInt(savingMoney))} BDT
                                    </>
                                  ) : (
                                    <>1500 BDT</>
                                  )}
                                </em>{" "}
                              </td>

                              <td>
                                Agent Total:
                                <em style={{ paddingLeft: "10px" }}>
                                  {commaNumber(allData?.netCost)} BDT
                                </em>
                              </td>

                              <td>
                                Customer Total:
                                <em style={{ paddingLeft: "10px" }}>
                                  {allData?.netCost < totalPrice ? (
                                    <em style={{ paddingLeft: "10px" }}>
                                      {commaNumber(totalPrice)} BDT
                                    </em>
                                  ) : (
                                    <>
                                      {commaNumber(
                                        parseInt(allData?.netCost) + 1500
                                      )}
                                    </>
                                  )}
                                </em>
                              </td>
                            </tr>
                          </table>
                        </Box>
                      </>
                    )}
                  </Box>

                  {/* --------------------- passenger details accordion ---------------- */}

                  <Box mt={5} className="queue-detail-passenger-detail">
                    <Box my={2}>
                      <span>Passenger Details</span>
                    </Box>

                    <div>
                      {allData?.length === 0 ? (
                        <>loading...</>
                      ) : (
                        <>
                          {allData?.passenger?.map((traveler) => (
                            <>
                              <Box
                                p="3px"
                                border="1px solid #DEDEDE"
                                display={"flex"}
                                justifyContent={"space-between"}
                                width={"100%"}
                              >
                                <h5
                                  style={{
                                    color: "var(--primary-color)",
                                    fontWeight: "500",
                                    fontSize: "15px",
                                  }}
                                >
                                  {traveler?.gender === "Male" ? (
                                    <>
                                      {traveler?.gender === "Male" &&
                                      traveler?.type === "ADT" ? (
                                        <>
                                          MR {traveler?.fName} {traveler?.lName}
                                        </>
                                      ) : (
                                        <>
                                          MSTR {traveler?.fName}{" "}
                                          {traveler?.lName}
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
                                          MISS {traveler?.fName}{" "}
                                          {traveler?.lName}
                                        </>
                                      )}
                                    </>
                                  )}
                                </h5>
                              </Box>

                              <Box border="1px solid #DEDEDE" p="3px" mb={2}>
                                <Grid container spacing={2}>
                                  <Grid item xs={4} md={2}>
                                    <h5>Title</h5>
                                    <h6>
                                      {traveler?.gender === "Male" ? (
                                        <>
                                          {traveler?.gender === "Male" &&
                                          traveler?.type === "ADT" ? (
                                            <>MR</>
                                          ) : (
                                            <>MSTR</>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {traveler?.gender === "Female" &&
                                          traveler?.type === "ADT" ? (
                                            <>MS</>
                                          ) : (
                                            <>MISS</>
                                          )}
                                        </>
                                      )}
                                    </h6>
                                  </Grid>
                                  <Grid item xs={4} md={2}>
                                    <h5>First Name</h5>
                                    <h6>{traveler?.fName}</h6>
                                  </Grid>
                                  <Grid item xs={4} md={2}>
                                    <h5>Last Name</h5>
                                    <h6>{traveler?.lName}</h6>
                                  </Grid>
                                  <Grid item xs={4} md={2}>
                                    <h5>Nationality</h5>
                                    <h6>{traveler?.passNation}</h6>
                                  </Grid>

                                  <Grid item xs={4} md={2}>
                                    <h5>Date of Birth</h5>
                                    <h6>
                                      {traveler?.dob
                                        ? format(
                                            new Date(traveler?.dob),
                                            "dd MMM yyyy"
                                          )
                                        : "Date of Birth"}
                                    </h6>
                                  </Grid>

                                  <Grid item xs={4} md={2}>
                                    <h5>Gender</h5>
                                    <h6>{traveler?.gender}</h6>
                                  </Grid>

                                  <Grid item xs={4} md={2}>
                                    <h5>Pax Type</h5>
                                    <h6>
                                      {traveler?.type === "ADT"
                                        ? "Adult"
                                        : traveler?.type === "CNN"
                                        ? "Child"
                                        : "Infat"}
                                    </h6>
                                  </Grid>

                                  <Grid item xs={4} md={2}>
                                    <h5>Passport Number</h5>
                                    <h6>
                                      {allData?.journeyType === "Outbound"
                                        ? traveler?.passNo?.toUpperCase() ||
                                          traveler?.passNo?.toUpperCase() ||
                                          "Passport Number"
                                        : "Domestic Flight"}
                                    </h6>
                                  </Grid>
                                  <Grid item xs={2} md={2}>
                                    <h5>Passport Expire Date</h5>

                                    <h6>
                                      {allData?.journeyType === "Outbound"
                                        ? traveler?.passEx || traveler?.passEx
                                          ? format(
                                              new Date(
                                                traveler?.passEx ||
                                                  traveler?.passEx
                                              ),
                                              "dd MMM yyyy"
                                            )
                                          : "Passport Expire Date"
                                        : "Domestic Flight"}
                                    </h6>
                                  </Grid>
                                  {allData?.journeyType === "Outbound" &&
                                  allData?.status !== "Hold" ? (
                                    <>
                                      <Grid item xs={2} md={2}>
                                        <h5>Passport Copy</h5>

                                        <h6>
                                          <a
                                            style={{
                                              color: "var(--primary-color)",
                                              fontWeight: "500",
                                              fontSize: "12px",
                                              textDecoration: "none",
                                              marginRight: "10px",
                                            }}
                                            href={traveler?.passportCopy || ""}
                                            target="_blank"
                                            rel="noreferrer"
                                          >
                                            View
                                          </a>
                                        </h6>
                                      </Grid>
                                      <Grid item xs={2} md={2}>
                                        <h5>Visa Copy</h5>

                                        <h6>
                                          <a
                                            style={{
                                              color: "var(--primary-color)",
                                              fontWeight: "500",
                                              fontSize: "12px",
                                              textDecoration: "none",
                                            }}
                                            href={traveler?.visaCopy || ""}
                                            target="_blank"
                                            rel="noreferrer"
                                          >
                                            {" "}
                                            View
                                          </a>
                                        </h6>
                                      </Grid>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </Grid>
                              </Box>
                            </>
                          ))}
                        </>
                      )}
                    </div>
                  </Box>
                </Grid>

                <Grid item sm={12} md={2.5}>
                  <Box mt={5}>
                    <div>
                      <Accordion
                        expanded={downExpanded === "panel1"}
                        onChange={handleChangeDown("panel1")}
                        style={{
                          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px ",
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel8bh-content"
                          id="panelbh-header"
                        >
                          <Typography
                            style={{
                              color: "#dc143c",
                              fontFamily: "poppins",
                              fontWeight: "500",
                              fontSize: "16px",
                            }}
                          >
                            PNR History
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {allData?.activity?.map((data) => (
                            <Grid container>
                              <Grid item className="line" xs={1}>
                                <Box
                                  width="14px"
                                  height="14px"
                                  bgcolor="#DC143C"
                                  position="relative"
                                  ml={-1}
                                ></Box>
                              </Grid>
                              <Grid item mt="-3px" xs={11}>
                                <Typography
                                  sx={{
                                    color: "var(--primary-color)",
                                    fontSize: "16px",
                                    fontWeight: 500,
                                  }}
                                >
                                  {data?.status}
                                </Typography>
                                <Box py={2}>
                                  <Typography
                                    sx={{
                                      color: "#70A5D8",
                                      fontSize: "12px",
                                      fontWeight: 500,
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
                                      <>Fly Far International</>
                                    )}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "#767676",
                                      fontSize: "12px",
                                      fontWeight: 500,
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
                                      color: "var(--gray-text-color)",
                                      fontSize: "12px",
                                      fontWeight: 500,
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
                          ))}
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={downExpanded === "panel4"}
                        onChange={handleChangeDown("panel4")}
                        style={{
                          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px ",
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography
                            style={{
                              color: "#dc143c",
                              fontFamily: "poppies",
                              fontWeight: "500",
                              fontSize: "15px",
                            }}
                          >
                            {/* Download / PDF Sabre */}
                            Download / PDF
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {allData?.status === "Issue In Processing" ||
                          allData?.status === "Booking Failed" ||
                          allData?.status === "Hold" ||
                          allData?.status === "Cancelled" ||
                          allData?.status === "Issue Rejected" ? (
                            <>
                              {/* <BookingConfirWithPrice allDataPdf={allDataPdf} />
                              <BookingConfirWithoutPrice
                                allDataPdf={allDataPdf}
                              /> */}
                            </>
                          ) : (
                            <>
                              {/* <ClientInvoice allDataPdf={allDataPdf} />
                              <AgentInvoice allDataPdf={allDataPdf} />
                              <ClientTicketWithPrice allDataPdf={allDataPdf} />
                              <EticketWithoutPrice allDataPdf={allDataPdf} /> */}
                            </>
                          )}
                        </AccordionDetails>
                      </Accordion>

                      <Accordion
                        expanded={downExpanded === "panel2"}
                        onChange={handleChangeDown("panel2")}
                        style={{
                          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px ",
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2bh-content"
                          id="panel2bh-header"
                        >
                          <Typography
                            style={{
                              color: "#dc143c",
                              fontFamily: "poppies",
                              fontWeight: "500",
                              fontSize: "15px",
                            }}
                          >
                            Fare Rules
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography
                            style={{
                              color: "var(--primary-color)",
                              fontFamily: "poppies",
                              fontWeight: "500",
                              fontSize: "15px",
                            }}
                          >
                            No automatic fare rules available, Please mail us
                            for fare rules.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </div>

                    {allData?.status === "Ticketed" ? (
                      <>
                        <Box className="queues-detail-calcel-btn">
                          <button
                            style={{
                              backgroundColor: "var(--primary-color)",
                              color: "#fff",
                              border: "none",
                            }}
                            onClick={() => setOpenModalReIssue(true)}
                          >
                            Re-Issue
                          </button>
                          <Modal
                            open={openModalReIssue}
                            onClose={() => setOpenModalReIssue(false)}
                            className="custom-modal-r modal-table-0"
                          >
                            <Box
                              className="modalStyler"
                              bgcolor="#fff"
                              p="25px"
                            >
                              <Box className="modal-table">
                                <Typography
                                  sx={{
                                    color: "#033566",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    mb: "10px",
                                  }}
                                >
                                  Re-Issue
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
                                      <td
                                        width="10px"
                                        style={{ border: "none" }}
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
                                          color={"#dc143c"}
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
                                        style={{
                                          padding: "6px 20px",
                                          marginRight: "20px",
                                          color: "#fff",
                                          backgroundColor:
                                            "var(--primary-color)",
                                          border: "none",
                                          cursor: "pointer",
                                        }}
                                        disabled={!checkBox === true}
                                        onClick={handleReissue}
                                      >
                                        Submit
                                      </button>
                                      <button
                                        style={{
                                          padding: "6px 20px",
                                          color: "#fff",
                                          backgroundColor:
                                            "var(--gray-text-color)",
                                          border: "none",
                                          cursor: "pointer",
                                        }}
                                        type="reset"
                                        onClick={() =>
                                          setOpenModalReIssue(false)
                                        }
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

                        {allData?.refundable === "yes" ? (
                          <Box className="queues-detail-calcel-btn">
                            <button
                              style={{
                                backgroundColor: "var(--primary-color)",
                                color: "#fff",
                                border: "none",
                              }}
                              onClick={() => setOpenModalRefund(true)}
                            >
                              Refund
                            </button>
                            <Modal
                              open={openModalRefund}
                              onClose={() => setOpenModalRefund(false)}
                              className="custom-modal-r modal-table-0"
                            >
                              <Box
                                className="modalStyler"
                                bgcolor="#fff"
                                p="25px"
                              >
                                <Box className="modal-table">
                                  <Typography
                                    sx={{
                                      color: "#033566",
                                      fontSize: "20px",
                                      fontWeight: "bold",
                                      mb: "10px",
                                    }}
                                  >
                                    Refund
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
                                                <>
                                                  MISS {ticket?.passengerName}
                                                </>
                                              )}
                                            </>
                                          ) : (
                                            <>
                                              {ticket?.gender === "Male" &&
                                              ticket?.pType === "ADT" ? (
                                                <>MR {ticket?.passengerName}</>
                                              ) : (
                                                <>
                                                  MSTR {ticket?.passengerName}
                                                </>
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
                                          style={{
                                            padding: "6px 20px",
                                            marginRight: "20px",
                                            color: "#fff",
                                            backgroundColor:
                                              "var(--primary-color)",
                                            border: "none",
                                            cursor: "pointer",
                                          }}
                                          disabled={!checkBox === true}
                                          onClick={handleRefund}
                                        >
                                          Submit
                                        </button>
                                        <button
                                          style={{
                                            padding: "6px 20px",
                                            color: "#fff",
                                            backgroundColor:
                                              "var(--gray-text-color)",
                                            border: "none",
                                            cursor: "pointer",
                                          }}
                                          type="reset"
                                          onClick={() =>
                                            setOpenModalRefund(false)
                                          }
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
                        ) : (
                          ""
                        )}

                        {allData?.status === "Ticketed" &&
                        todaydate <= voideDate ? (
                          <Box className="queues-detail-calcel-btn">
                            <button
                              style={{
                                backgroundColor: "var(--primary-color)",
                                color: "#fff",
                                border: "none",
                              }}
                              onClick={() => setOpenModalVoid(true)}
                            >
                              Void
                            </button>
                            <Modal
                              open={openModalVoid}
                              onClose={() => setOpenModalVoid(false)}
                              className="custom-modal-r modal-table-0"
                            >
                              <Box
                                className="modalStyler"
                                bgcolor="#fff"
                                p="25px"
                              >
                                <Box className="modal-table">
                                  <Typography
                                    sx={{
                                      color: "#033566",
                                      fontSize: "20px",
                                      fontWeight: "bold",
                                      mb: "10px",
                                    }}
                                  >
                                    Void
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
                                        <td
                                          width="10px"
                                          style={{ border: "none" }}
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
                                                <>
                                                  MISS {ticket?.passengerName}
                                                </>
                                              )}
                                            </>
                                          ) : (
                                            <>
                                              {ticket?.gender === "Male" &&
                                              ticket?.pType === "ADT" ? (
                                                <>MR {ticket?.passengerName}</>
                                              ) : (
                                                <>
                                                  MSTR {ticket?.passengerName}
                                                </>
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
                                          style={{
                                            padding: "6px 20px",
                                            marginRight: "20px",
                                            color: "#fff",
                                            backgroundColor:
                                              "var(--primary-color)",
                                            border: "none",
                                            cursor: "pointer",
                                          }}
                                          disabled={!checkBox === true}
                                          onClick={handleVoid}
                                        >
                                          Submit
                                        </button>
                                        <button
                                          style={{
                                            padding: "6px 20px",
                                            color: "#fff",
                                            backgroundColor:
                                              "var(--gray-text-color)",
                                            border: "none",
                                            cursor: "pointer",
                                          }}
                                          type="reset"
                                          onClick={() =>
                                            setOpenModalVoid(false)
                                          }
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
                        ) : (
                          ""
                        )}
                      </>
                    ) : allData?.status === "Issue In Processing" ? (
                      <>
                        <Box className="queues-detail-wait-btn">
                          <button>Wait For Ticketed</button>
                        </Box>
                      </>
                    ) : allData?.status === "Refund In Processing" ? (
                      <Box className="queues-detail-wait-btn">
                        <button>Wait For Refunded</button>
                      </Box>
                    ) : allData?.status === "Reissue In Processing" ? (
                      <Box className="queues-detail-wait-btn">
                        <button>Wait For Reissued</button>
                      </Box>
                    ) : allData?.status === "Void In Processing" ? (
                      <Box className="queues-detail-wait-btn">
                        <button>Wait For Voided</button>
                      </Box>
                    ) : (
                      <>
                        {/* //todo: sabre issue ticket update document section */}
                        {allData?.status === "Hold" &&
                        lastBalance >= parseInt(allData?.netCost) ? (
                          <>
                            <Box className="queues-detail-calcel-btn">
                              {!issueLoading ? (
                                <Box
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <button
                                    style={{
                                      backgroundColor: "var(--primary-color)",
                                      color: "#fff",
                                      border: "none",
                                    }}
                                    onClick={() => {
                                      if (
                                        allData?.passenger[0]?.passportCopy ===
                                          "" &&
                                        allData?.passenger[0]?.visaCopy ===
                                          "" &&
                                        triptype === "Outbound"
                                      ) {
                                        handleOpenUpdateModal();
                                      } else if (
                                        allData?.passenger[0]?.passportCopy !==
                                          "" &&
                                        allData?.passenger[0]?.visaCopy !==
                                          "" &&
                                        triptype !== "Outbound"
                                      ) {
                                        handleIssueTicket();
                                      } else {
                                        handleIssueTicket();
                                      }
                                    }}
                                  >
                                    Issue Ticket
                                  </button>
                                  {/* //todo: upload section */}
                                  {triptype === "Outbound" ? (
                                    <button
                                      style={{
                                        backgroundColor:
                                          allData?.passenger[0]
                                            ?.passportCopy === "" &&
                                          allData?.passenger[0]?.visaCopy === ""
                                            ? "var(--primary-color)"
                                            : "green",
                                        color: "#fff",
                                        border: "none",
                                      }}
                                      onClick={() => {
                                        handleOpenUpdateModal();
                                      }}
                                    >
                                      {allData?.passenger[0]?.passportCopy ===
                                        "" &&
                                      allData?.passenger[0]?.visaCopy === ""
                                        ? "Update Document"
                                        : "Document Updated ✔"}
                                    </button>
                                  ) : null}
                                </Box>
                              ) : (
                                <CircularProgress />
                              )}
                            </Box>
                          </>
                        ) : allData?.status === "Hold" &&
                          checkIssueBalance >= parseInt(allData?.netCost) ? (
                          <>
                            <Box className="queues-detail-calcel-btn">
                              {!issueLoading ? (
                                <button
                                  style={{
                                    backgroundColor: "var(--primary-color)",
                                    color: "#fff",
                                    border: "none",
                                  }}
                                  onClick={handleIssueTicket}
                                >
                                  Issue Ticket
                                </button>
                              ) : (
                                <CircularProgress />
                              )}
                            </Box>
                          </>
                        ) : allData?.status === "Hold" &&
                          lastBalance >= parseInt(allData?.netCost) &&
                          sabreBookData?.fareRules[0]?.isRefundable === true ? (
                          <>
                            <Box className="queues-detail-calcel-btn">
                              {!issueLoading ? (
                                <button
                                  style={{
                                    backgroundColor: "var(--primary-color)",
                                    color: "#fff",
                                    border: "none",
                                  }}
                                  onClick={handleIssueTicket}
                                >
                                  Issue Ticket
                                </button>
                              ) : (
                                <CircularProgress />
                              )}
                            </Box>
                          </>
                        ) : allData?.status === "Hold" &&
                          lastBalance + creditBalance <=
                            parseInt(allData?.netCost) ? (
                          <Box className="queues-detail-calcel-btn">
                            <button
                              style={{
                                backgroundColor: "var(--primary-color)",
                                color: "#fff",
                                border: "none",
                              }}
                              onClick={() => setOpenModal(true)}
                            >
                              Issue Ticket
                            </button>
                            <Modal
                              open={openModal}
                              onClose={() => setOpenModal(false)}
                              className="custom-modal-r"
                              width="50%"
                            >
                              <Box
                                className="modalStyler"
                                bgcolor="#fff"
                                p="25px"
                                textAlign="center"
                              >
                                <Typography
                                  sx={{
                                    fontSize: "22px",
                                    textAlign: "center",
                                    fontWeight: 600,
                                    mt: "15px",
                                    color: "#DC143C",
                                    mb: "20px",
                                  }}
                                >
                                  Insufficient Balance !
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "16px",
                                    textAlign: "center",
                                    fontWeight: 500,
                                    mt: "15px",
                                    color: "#222222",
                                    mb: "20px",
                                  }}
                                >
                                  you have insufficient balance, please make
                                  deposit to issue this ticket
                                </Typography>
                                <NavLink
                                  to="/dashboard/account/DepositEntry"
                                  style={{
                                    textDecoration: "none",
                                    color: "#fff",
                                    backgroundColor: "#033655",
                                    padding: "5px 10px",
                                  }}
                                >
                                  Deposit Request
                                </NavLink>
                              </Box>
                            </Modal>
                          </Box>
                        ) : (
                          ""
                        )}
                        {allData?.status === "Hold" && (
                          <Box className="queues-detail-calcel-btn">
                            <button onClick={() => cancelBooking(gds, pnr)}>
                              Cancel Flight
                            </button>
                          </Box>
                        )}
                      </>
                    )}
                  </Box>
                </Grid>
              </>
            </Grid>
          </Box>
        ) : (
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
        )}
      </Container>

      {/* //todo: Update Document Modal */}
      <Modal open={openUpdateModal} onClose={handleCloseUpdateModal}>
        <Box sx={updateModalStyle}>
          <FileUploadSection
            setState={setState}
            passengerData={allData?.passenger}
            handleIssueTicket={handleIssueTicket}
            handleCloseUpdateModal={handleCloseUpdateModal}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default QueuesDetail;
