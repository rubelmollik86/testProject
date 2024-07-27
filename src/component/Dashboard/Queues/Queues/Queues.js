import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Pagination,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import commaNumber from "comma-number";
import Loader from "../../../../image/loader/Render.gif";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import secureLocalStorage from "react-secure-storage";
import { Stack } from "@mui/system";
import "./Queues.css";
import { format } from "date-fns";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};
const Queues = () => {
  // user get from localStorage
  const users = secureLocalStorage.getItem("user-info");
  let agentID = users?.user?.agentId;
  let staffId = users?.user?.staffId;
  // Modal
  const [open, setOpen] = useState(false);
  const [BookingId, setBookingId] = useState({});
  const [agentId, setAgentId] = useState({});
  const [staff, setStaff] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [modalDetails, setModalDetails] = useState([]);
  const handleClose = () => setOpen(false);
  const [userData, setUserData] = useState([]);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [shortValues, setShortValue] = useState([]);
  const [allShortValues, setAllShortValues] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // Sets the state of the const for the given page and state.
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState("20");

  // Handle a page change.
  const handlePageChange = (event, value) => {
    setPage(value);
    setShortValue(allShortValues?.slice((value - 1) * size, value * size));
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleOpen = (bookingId, agentID) => {
    setOpen(true);
    setBookingId(bookingId);
    setAgentId(agentID);
  };

  // data load from booking api
  useEffect(() => {
    setIsLoading(false);
    fetch(
      `https://api.flyfarint.com/v.1.0.0/Queues/Booking.php?agentId=${agentId}&search=BId&bookingId=${BookingId}`
    )
      .then((res) => res.json())
      .then((data) => setModalDetails(data[0]));
    fetch(
      `https://api.flyfarint.com/v.1.0.0/Accounts/MyAccount.php?agentId=${agentID}`
    )
      .then((res) => res.json())
      .then((data) => setUserData(data[0]));
    //todo: fetch all data
    fetch(
      `https://api.flyfarint.com/v.1.0.0/Queues/Booking.php?agentId=${agentID}&search=all`
    )
      .then((res) => res.json())
      .then((data) => {
        const uniqueData = data;
        const count = uniqueData.length;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
        setBookingDetails(data);
        setShortValue(data);
        setAllShortValues(data);
        if (data.length > 0) {
          data.map((item) => {
            fetch(
              `https://api.flyfarint.com/v.1.0.0/Admin/Agent/staffList.php?staffId=${item.staffId}`
            )
              .then((res) => res.json())
              .then((data) => {
                setIsLoading(true);
                setStaff(data[0]);
              });
          });
        } else {
          setIsLoading(true);
        }
      });
    //todo: end of fetch all data
  }, [agentID, size]);

  //  short functionality handle
  const handleChangeOption = (e) => {
    const optionValue = e.target.value;
    fetchData(optionValue);
  };

  async function fetchData(optionValue) {
    await fetch(
      `https://api.flyfarint.com/v.1.0.0/Queues/Booking.php?agentId=${agentID}&search=${optionValue}`
    )
      .then((res) => res.json())
      .then((data) => {
        const uniqueData = data;
        const count = uniqueData.length;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
        setShortValue(data);
        setAllShortValues(data);
      });
  }

  const handelSearchItems = (e) => {
    let searchInput = e.target.value;
    if (searchInput !== "") {
      const filterData = bookingDetails.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setShortValue(filterData);
    } else if (searchInput === "") {
      setShortValue(bookingDetails);
    }
  };

  // Booking cancel handle

  // async function cancelBooking(pnrId, gds) {
  //   setOpen(false);
  //   await fetch(
  //     `https://api.flyfarint.com/v.1.0.0/${gds}/AirCancel.php?BookingID=${pnrId}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data?.request?.cancelAll === true) {
  //         swal({
  //           title: "Booking Cancel Successfully!",
  //           icon: "success",
  //           button: "Done!",
  //         }).then(function () {
  //           window.location.href = "/dashboard/queues/queues";
  //         });
  //       } else {
  //         swal({
  //           title: "There is a problem",
  //           icon: "error",
  //           button: "Done!",
  //         });
  //       }
  //     });
  // }

  //  pdf function
  const navigate = useNavigate();
  // const queuePdf = () => {
  //   navigate("/dashboard/queuepdf", {
  //     state: {
  //       modalDetails,
  //     },
  //   });
  // };

  const sendToQueuesDetails = (
    bookingId,
    pnr,
    gds,
    flightType,
    status,
    bookDate,
    deptFrom,
    arriveTo,
    airlines,
    netCost,
    staffId,
    issueTime,
    agentId,
    tripType,
    bookedby,
    bookingDetail,
    searchId,
    resultId
  ) => {
    navigate("/dashboard/queues/queuesdetails", {
      state: {
        bookingId,
        pnr,
        gds,
        flightType,
        status,
        bookDate,
        deptFrom,
        arriveTo,
        airlines,
        netCost,
        staffId,
        issueTime,
        agentId,
        tripType,
        bookedby,
        bookingDetail,
        searchId,
        resultId,
      },
    });
  };
  return (
    <Box
      mx={{ xs: "2vh", md: "3vh" }}
      mt={{ xs: "0vh", sm: "0vh", md: "3vh", lg: "3vh" }}
    >
      {isLoading ? (
        <Box className={"q-box"}>
          <Box className="queues-parent">
            <Box className="queues-search-box">
              <Grid container justifyContent="space-between" spacing={2}>
                <Grid
                  className="queues-input-search"
                  item
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <input
                    type="text"
                    placeholder="Search"
                    onChange={handelSearchItems}
                  ></input>
                  <span id="search-icon5">
                    <AiOutlineSearch
                      style={{ fontSize: "24px", color: "#EB2227" }}
                    />
                  </span>
                </Grid>
                <Grid
                  className="queues-filter"
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  textAlign="right"
                >
                  <select
                    onChange={handleChangeOption}
                    className="queues-select-01"
                  >
                    <option value="all">&nbsp;Show All</option>
                    <option value="hold">&nbsp;Hold</option>
                    <option value="Issue In Processing">
                      &nbsp;Issue In Processing
                    </option>
                    <option value="Ticketed">&nbsp;Ticketed</option>

                    <option value="Void In Processing">
                      &nbsp;Void In Processing
                    </option>
                    <option value="Voided">&nbsp;Voided</option>
                    <option value="Void Rejected">&nbsp;Void Rejected</option>

                    <option value="Reissue In Processing">
                      &nbsp;Reissue In Processing
                    </option>
                    <option value="Reissued">&nbsp;Reissued</option>
                    <option value="Reissue Rejected">
                      &nbsp;Reissue Rejected
                    </option>

                    <option value="Refund In Processing">
                      &nbsp;Refund In Processing
                    </option>
                    <option value="Refunded">&nbsp;Refunded</option>
                    <option value="Refund Rejected">
                      &nbsp;Refund Rejected
                    </option>
                    <option value="Issue Rejected">&nbsp;Issue Rejected</option>
                    <option value="cancelled">&nbsp;Cancelled</option>
                  </select>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Box className="deposite-tables table-responsive-p " mt={3}>
                <table className="deposite-table table-responsive-c">
                  <thead>
                    <tr>
                      <th>SL. No</th>
                      <th className="fixed-table-row">Reference No</th>
                      <th>Airlines</th>
                      <th>Status</th>
                      <th>Route</th>
                      <th>Flight Type</th>
                      <th colSpan={5}>Booking Information</th>
                      <th>Net Cost</th>
                      <th>Gross Cost</th>
                    </tr>

                    <tr>
                      <th></th>
                      <th className="fixed-table-row"></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th style={{ backgroundColor: "#DC143C" }}>Total Pax</th>
                      <th style={{ backgroundColor: "#DC143C" }}>Booked By</th>
                      <th style={{ backgroundColor: "#DC143C" }}>
                        Booked Date
                      </th>
                      <th style={{ backgroundColor: "#DC143C" }}>
                        Passenger Name
                      </th>
                      <th style={{ backgroundColor: "#DC143C" }}>Phone</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {shortValues?.slice(0, size)?.map((bookingDetail) => (
                      <tr>
                        <td>{bookingDetail.serial || "SL"}</td>
                        <td className="fixed-table-row">
                          <button
                            style={{
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              backgroundColor: "#d1e9ff",
                              padding: "5px 15px",
                              color: "var(--primary-color)",
                              textDecoration: "underline",
                            }}
                            onClick={() =>
                              sendToQueuesDetails(
                                bookingDetail?.bookingId,
                                bookingDetail?.pnr,
                                bookingDetail?.gds,
                                bookingDetail?.tripType,
                                bookingDetail?.status,
                                bookingDetail?.dateTime,
                                bookingDetail?.deptFrom,
                                bookingDetail?.arriveTo,
                                bookingDetail?.airlines,
                                bookingDetail?.netCost,
                                bookingDetail?.staffId,
                                bookingDetail?.issueTime,
                                bookingDetail?.agentId,
                                bookingDetail?.tripType,
                                bookingDetail?.bookedby,
                                bookingDetail?.searchId,
                                bookingDetail?.resultId
                              )
                            }
                          >
                            {bookingDetail.bookingId ?? "Reference No"}
                          </button>
                          {/* )} */}
                        </td>
                        <td>{bookingDetail.airlines ?? "Airlines"}</td>
                        <td>
                          {bookingDetail.status ? (
                            <button
                              style={{
                                border: "none",
                                borderRadius: "5px",
                                width: "100%",
                              }}
                              className={`${bookingDetail.status
                                ?.toLowerCase()
                                ?.split(" ")
                                ?.join("-")}-btn`}
                            >
                              {bookingDetail.status}
                            </button>
                          ) : (
                            "Status"
                          )}
                        </td>
                        <td>
                          {bookingDetail.deptFrom ?? "From"} -{" "}
                          {bookingDetail.arriveTo ?? "To"}
                        </td>
                        <td>{bookingDetail.tripType ?? "Flight Type"}</td>
                        <td>{bookingDetail.pax ?? "Total Pax"}</td>
                        <td>{bookingDetail?.bookedby ?? "Booked By"} </td>
                        <td>
                          {bookingDetail?.bookedAt !== "" || "undefined"
                            ? format(
                                new Date(bookingDetail?.bookedAt),
                                "dd MMM yy hh:mm a"
                              )
                            : "Booked Date"}
                        </td>
                        <td>
                          {/* {console.log(typeof bookingDetail.passenger)} */}
                          {typeof bookingDetail?.passenger === "object" &&
                          bookingDetail?.passenger.length !== 0 ? (
                            <Tooltip
                              title={bookingDetail?.passenger.map(
                                (name, index) => (
                                  <Typography variant="subtitle2">
                                    {`${index + 1}. ${name.fName} ${
                                      name.lName
                                    }`}
                                  </Typography>
                                )
                              )}
                            >
                              <Typography
                                variant="subtitle2"
                                style={{ fontSize: "12px" }}
                              >
                                {bookingDetail?.passenger[0]?.fName}{" "}
                                {bookingDetail?.passenger[0]?.lName}
                              </Typography>
                            </Tooltip>
                          ) : (
                            "Passenger Name"
                          )}
                        </td>
                        <td>{userData?.phone ?? "Phone Number"}</td>
                        <td>
                          {commaNumber(bookingDetail.netCost) ?? "Gross Cost"}
                          &#2547;
                        </td>
                        <td>
                          {commaNumber(bookingDetail.grossCost) ?? "Net Cost"}
                          &#2547;
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>

              <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Box
                    sx={{
                      width: "100%",
                      my: 3,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Stack spacing={2}>
                      <Pagination
                        count={pageCount}
                        onChange={handlePageChange}
                        shape="rounded"
                      />
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
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
    </Box>
  );
};

export default Queues;
