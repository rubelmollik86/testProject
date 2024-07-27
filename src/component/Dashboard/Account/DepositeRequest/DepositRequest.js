import {
  Button,
  Box,
  Grid,
  Container,
  NativeSelect,
  Typography,
  TextField,
  Card,
  Tab,
  Modal,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Loader from "../../../../image/loader/Render.gif";
import secureLocalStorage from "react-secure-storage";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FiUserPlus } from "react-icons/fi";
import { format } from "date-fns";
import DepositEntry from "./DepositEntry";
import Update from "../../../../image/undraw/undraw_credit_card_re_blml.svg";
import Invalid from "../../../../image/undraw/undraw_warning_re_eoyh.svg";
import ServerDown from "../../../../image/undraw/undraw_server_down_s-4-lk.svg";
import ReConfirm from "../../../../image/undraw/undraw_confirmation_re_b6q5.svg";
import Delete from "../../../../image/undraw/undraw_throw_away_re_x60k.svg";
import "./DepositeRequest.css";
const DepositRequest = () => {
  const navigate = useNavigate();
  //  modal
  const [isLoading, setIsLoading] = useState(false);
  const [travelerId, setTravelerId] = useState({});
  const [agentId, setAgentId] = useState({});
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  //  Data fetch from depositRequest
  // const [depositDatas, setDepositData] = useState([]);
  // const [search, setSearch] = useState([]);

  // Sets the state of the const for the given page and state.
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  let size = 20;

  // Handle a page change.
  const handlePageChange = (event, value) => {
    setPage(value);
    setSearch(depositDatas?.slice((value - 1) * size, value * size));
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // const users = JSON.parse(sessionStorage.getItem("user-info"));
  const users = secureLocalStorage.getItem("user-info");
  let agentID = users?.user?.agentId;

  const [value, setValue] = React.useState("1");
  const [transectionValue, setTransectionValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeTransection = (event, newValue) => {
    setTransectionValue(newValue);
  };

  //  Data fetch from depositRequest

  const [depositDatas, setDepositData] = useState([]);
  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    setIsLoading(false);
    let url = `https://api.flyfarint.com/v.1.0.0/Deposit/allDeposit.php?agentId=${agentID}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(true);
        const count = data.length;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
        setDepositData(data);
        setSearch(data);
      });
    fetch(
      `https://api.flyfarint.com/v.1.0.0/Deposit/allBank.php?agentId=${agentID}`
    )
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(true);
        setAccountData(data);
        // setSearch(data);
      });
  }, [agentID]);

  //  update information
  const [search, setSearch] = useState([]);
  const handelSearchItems = (e) => {
    let searchInput = e.target.value;

    if (searchInput !== "") {
      const filterData = depositDatas.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setSearch(filterData);
    } else if (searchInput === "") {
      setSearch(depositDatas);
    }
  };

  const handleChangeSelect = (e) => {
    let searchSelect = e.target.value;
    if (searchSelect === "pending") {
      const filters = depositDatas.filter((item) => {
        return item.status === searchSelect;
      });
      setSearch(filters);
    } else if (searchSelect === "approved") {
      const filters = depositDatas.filter((item) => {
        return item.status === searchSelect;
      });
      setSearch(filters);
    } else if (searchSelect === "reject") {
      const filters = depositDatas.filter((item) => {
        return item.status === searchSelect;
      });
      setSearch(filters);
    } else {
      setSearch(depositDatas);
    }
  };

  // Bank Account Edit and Delete

  const [singleData, setSingleAccount] = useState([]);

  const [editAccname, setEditAccname] = useState("");
  const [editName, setEditName] = useState("");
  const [editAccno, setEditAccno] = useState("");
  const [editBranch, setEditBranch] = useState("");
  const [editSwift, setEditSwift] = useState("");
  const [editRouting, setEditRouting] = useState("");
  const [editAddress, setEditAddress] = useState("");

  const handleAccountDetails = async (id) => {
    let url = `https://api.flyfarint.com/v.1.0.0/Deposit/allBank.php?id=${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSingleAccount(data);
        setEditAccname(data[0]?.accname);
        setEditName(data[0]?.bankname);
        setEditAccno(data[0]?.accno);
        setEditBranch(data[0]?.branch);
        setEditSwift(data[0]?.swift);
        setEditRouting(data[0]?.routing);
        setEditAddress(data[0]?.address);
        setOpen(true);
      });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    let body = JSON.stringify({
      agentID,
      id: singleData[0]?.id,
      accname: editAccname,
      bankname: editName,
      accno: editAccno,
      branch: editBranch,
      swift: editSwift,
      routing: editRouting,
      address: editAddress,
    });
    const url = "https://api.flyfarint.com/v.1.0.0/Deposit/editBank.php";
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "Success") {
          setOpen(false);
          Swal.fire({
            imageUrl: Update,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Details Update Successfully",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(function () {
            navigate(0);
          });
        } else {
          setOpen(false);
          Swal.fire({
            imageUrl: ServerDown,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Server Error",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(function () {
            navigate(0);
          });
        }
      });
    setOpen(false);
    e.target.reset();
  };
  const handelDelete = async (id) => {
    setOpen(false);
    Swal.fire({
      imageUrl: ReConfirm,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonText: "Delete it!",
      confirmButtonColor: "var(--primary-color)",
      cancelButtonText: "Don't Delete it!",
      cancelButtonColor: "#dc143c",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        setIsLoading(true);
        fetch(
          `https://api.flyfarint.com/v.1.0.0/Deposit/deleteBank.php?agentId=${agentID}&id=${id}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data?.status === "success") {
              Swal.fire({
                imageUrl: Delete,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                title: "Account Deleted",
                confirmButtonColor: "#dc143c",
                confirmButtonText: "Ok",
              }).then(function () {
                navigate(0);
              });
            } else {
              Swal.fire({
                imageUrl: ServerDown,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                title: "Server Error",
                confirmButtonColor: "#dc143c",
                confirmButtonText: "Ok",
              }).then(function () {
                navigate(0);
              });
            }
            setIsLoading(false);
          });
      }
    });
  };

  return (
    <Box
      mx={{ xs: "2vh", md: "3vh" }}
      mt={{ xs: "0vh", sm: "0vh", md: "3vh", lg: "3vh" }}
    >
      {isLoading ? (
        <>
          <Box>
            <Box className="depositParent1">
              <TabContext value={value}>
                <Box sx={{ borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    color="#fff"
                    indicatorColor="none"
                  >
                    <Tab
                      sx={{
                        border: "2px solid #1a4a77",
                        mr: "10px",
                      }}
                      label="Transaction"
                      value="1"
                    />
                    <Tab
                      sx={{
                        border: "2px solid #1a4a77",
                        mr: "10px",
                      }}
                      label="Add Deposit"
                      value="2"
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Box mt={2}>
                    <div
                      // style={{ overflowX: "auto" }}
                      className="deposite-tables deposit-dataTable"
                    >
                      <>
                        <TabContext value={transectionValue}>
                          <Grid
                            container
                            justifyContent={"space-between"}
                            spacing={2}
                            my={2}
                          >
                            <Grid item xs={12} sm={12} md={12} lg={6}>
                              <Box
                                sx={{
                                  borderColor: "divider",
                                }}
                                width={{
                                  xs: "300px",
                                  sm: "100%",
                                  md: "100%",
                                  lg: "100%",
                                }}
                              >
                                <TabList
                                  onChange={handleChangeTransection}
                                  color="#fff"
                                  indicatorColor="none"
                                  variant="scrollable"
                                  scrollButtons
                                  allowScrollButtonsMobile
                                >
                                  <Tab
                                    sx={{
                                      border: "2px solid #1a4a77",
                                      mr: "10px",
                                    }}
                                    label="ALL"
                                    value="1"
                                  />
                                  <Tab
                                    sx={{
                                      border: "2px solid #1a4a77",
                                      mr: "10px",
                                    }}
                                    label="Cash"
                                    value="6"
                                  />
                                  <Tab
                                    sx={{
                                      border: "2px solid #1a4a77",
                                      mr: "10px",
                                    }}
                                    label="Cheque"
                                    value="3"
                                  />
                                  <Tab
                                    className="tab-break"
                                    sx={{
                                      border: "2px solid #1a4a77",
                                      mr: "10px",
                                    }}
                                    label="Bank Transfer"
                                    value="4"
                                  />
                                  <Tab
                                    sx={{
                                      border: "2px solid #1a4a77",
                                    }}
                                    label="Mobile Banking"
                                    value="5"
                                  />
                                </TabList>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6}>
                              <Box>
                                <Grid
                                  container
                                  justifyContent="space-between"
                                  columnSpacing={2}
                                >
                                  <Grid
                                    className="queues-input-search"
                                    item
                                    xs={12}
                                    sm={6}
                                    textAlign="end"
                                  >
                                    <Box
                                      position={"relative"}
                                      display="flex"
                                      justifyContent="space-between"
                                    >
                                      <input
                                        type="text"
                                        placeholder="Search"
                                        onChange={handelSearchItems}
                                      ></input>
                                      <span
                                        style={{
                                          position: "absolute",
                                          right: "10px",
                                          top: "7px",
                                        }}
                                      >
                                        <AiOutlineSearch
                                          style={{
                                            fontSize: "24px",
                                            color: "#EB2227",
                                          }}
                                        />
                                      </span>
                                    </Box>
                                  </Grid>

                                  <Grid
                                    className="queues-filter"
                                    item
                                    xs={12}
                                    sm={4}
                                    mt={{ xs: "10px", sm: "0px" }}
                                    textAlign="end"
                                  >
                                    <select
                                      onChange={handleChangeSelect}
                                      style={{
                                        width: "100%",
                                      }}
                                    >
                                      <option value="all">Show All</option>
                                      <option value="pending">Pending</option>
                                      <option value="approved">Approved</option>
                                      <option value="reject">Rejected</option>
                                    </select>
                                  </Grid>
                                </Grid>
                              </Box>
                            </Grid>
                          </Grid>

                          <TabPanel value="1">
                            <Box className="table-responsive-p">
                              <table className="deposite-table table-responsive-c">
                                <tr>
                                  <th>Reference No</th>
                                  <th>Status</th>
                                  <th>Amount</th>
                                  <th>Transaction Date</th>
                                  <th>Requested By</th>
                                  <th>Attachment</th>
                                  <th>Rejected Reason</th>
                                </tr>

                                {search.reverse().map((depositData) => (
                                  <>
                                    <>
                                      <tr>
                                        <td>{depositData?.depositId}</td>
                                        <td>
                                          <span>
                                            {depositData?.status ===
                                            "approved" ? (
                                              <Typography
                                                sx={{
                                                  color: "#fff",
                                                  bgcolor: "#177c33",
                                                  borderRadius: "5px",
                                                  fontSize: "12px",
                                                  py: "5px",
                                                  px: "10px",
                                                  mx: 1,
                                                }}
                                              >
                                                {depositData?.status.toUpperCase()}
                                              </Typography>
                                            ) : depositData?.status ===
                                              "pending" ? (
                                              <Typography
                                                sx={{
                                                  color: "#fff",
                                                  bgcolor: "#FCAF17",
                                                  borderRadius: "5px",
                                                  fontSize: "12px",
                                                  py: "5px",
                                                  px: "10px",
                                                  mx: 1,
                                                }}
                                              >
                                                {depositData?.status.toUpperCase()}
                                              </Typography>
                                            ) : (
                                              <Typography
                                                sx={{
                                                  color: "#fff",
                                                  bgcolor: "red",
                                                  borderRadius: "5px",
                                                  fontSize: "12px",
                                                  py: "5px",
                                                  px: "10px",
                                                  mx: 1,
                                                }}
                                              >
                                                {depositData?.status.toUpperCase()}
                                              </Typography>
                                            )}
                                          </span>
                                        </td>
                                        <td>{depositData?.amount}</td>

                                        <td>
                                          {depositData?.createdAt
                                            ? format(
                                                new Date(
                                                  depositData?.createdAt
                                                ),
                                                "dd MMM yyyy hh:mm a"
                                              )
                                            : "Transaction Date"}
                                        </td>
                                        <td>
                                          {depositData?.requestedby ||
                                            "Requested By"}
                                        </td>
                                        <td>
                                          <button
                                            style={{
                                              background: "transparent",
                                              border: "none",
                                              cursor: "pointer",
                                            }}
                                          >
                                            <a
                                              target="_blank"
                                              rel="noreferrer"
                                              href={depositData?.attachment}
                                            >
                                              View Details
                                            </a>
                                          </button>
                                        </td>

                                        <td>
                                          {depositData?.remarks ? (
                                            <>{depositData?.remarks}</>
                                          ) : (
                                            <>N/A</>
                                          )}
                                        </td>
                                      </tr>
                                    </>
                                  </>
                                ))}
                              </table>{" "}
                            </Box>
                          </TabPanel>
                          <TabPanel value="6">
                            <Box className="table-responsive-p">
                              <table className="deposite-table table-responsive-c">
                                <tr>
                                  <th>Reference No</th>
                                  <th>Status</th>
                                  <th>Amount</th>
                                  <th>Transaction Date</th>
                                  <th>Requested By</th>
                                  <th>Attachment</th>
                                  <th>Rejected Reason</th>
                                </tr>

                                {search.reverse().map((depositData) => (
                                  <>
                                    {depositData?.paymentway === "Cash" && (
                                      <tr>
                                        <td>{depositData?.depositId}</td>
                                        <td>
                                          <span>
                                            {depositData?.status ===
                                            "approved" ? (
                                              <Typography
                                                sx={{
                                                  color: "#fff",
                                                  bgcolor: "#177c33",
                                                  borderRadius: "5px",
                                                  fontSize: "12px",
                                                  py: "5px",
                                                  px: "10px",
                                                  mx: 1,
                                                }}
                                              >
                                                {depositData?.status.toUpperCase()}
                                              </Typography>
                                            ) : depositData?.status ===
                                              "pending" ? (
                                              <Typography
                                                sx={{
                                                  color: "#fff",
                                                  bgcolor: "#FCAF17",
                                                  borderRadius: "5px",
                                                  fontSize: "12px",
                                                  py: "5px",
                                                  px: "10px",
                                                  mx: 1,
                                                }}
                                              >
                                                {depositData?.status.toUpperCase()}
                                              </Typography>
                                            ) : (
                                              <Typography
                                                sx={{
                                                  color: "#fff",
                                                  bgcolor: "red",
                                                  borderRadius: "5px",
                                                  fontSize: "12px",
                                                  py: "5px",
                                                  px: "10px",
                                                  mx: 1,
                                                }}
                                              >
                                                {depositData?.status.toUpperCase()}
                                              </Typography>
                                            )}
                                          </span>
                                        </td>
                                        <td>{depositData?.amount}</td>

                                        <td>
                                          {depositData?.createdAt
                                            ? format(
                                                new Date(
                                                  depositData?.createdAt
                                                ),
                                                "dd MMM yyyy hh:mm a"
                                              )
                                            : "Transaction Date"}
                                        </td>
                                        <td>
                                          {depositData?.requestedby ||
                                            "Requested By"}
                                        </td>
                                        <td>
                                          <button
                                            style={{
                                              background: "transparent",
                                              border: "none",
                                              cursor: "pointer",
                                            }}
                                          >
                                            <a
                                              target="_blank"
                                              rel="noreferrer"
                                              href={depositData?.attachment}
                                            >
                                              View Details
                                            </a>
                                          </button>
                                        </td>

                                        <td>
                                          {depositData?.remarks ? (
                                            <>{depositData?.remarks}</>
                                          ) : (
                                            <>N/A</>
                                          )}
                                        </td>
                                      </tr>
                                    )}
                                  </>
                                ))}
                              </table>{" "}
                            </Box>
                          </TabPanel>
                          <TabPanel value="3">
                            <Box className="table-responsive-p">
                              <table className="deposite-table table-responsive-c">
                                <tr>
                                  <th>Reference No</th>
                                  <th>Status</th>
                                  <th>Amount</th>
                                  <th>Transaction Date</th>
                                  <th>Issue Date</th>
                                  <th>Check No</th>
                                  <th>Bank Name</th>
                                  <th>Requested By</th>
                                  <th>Attachment</th>
                                  <th>Rejected Reason</th>
                                </tr>

                                {search.reverse().map((depositData) => (
                                  <>
                                    {depositData?.paymentway === "Cheque" && (
                                      <>
                                        <tr>
                                          <td>
                                            {depositData?.depositId ||
                                              "Deposit Id"}
                                          </td>
                                          <td>
                                            <span>
                                              {depositData?.status ===
                                              "approved" ? (
                                                <Typography
                                                  sx={{
                                                    color: "#fff",
                                                    bgcolor: "#177c33",
                                                    borderRadius: "5px",
                                                    fontSize: "12px",
                                                    py: "5px",
                                                    px: "10px",
                                                    mx: 1,
                                                  }}
                                                >
                                                  {depositData?.status.toUpperCase()}
                                                </Typography>
                                              ) : depositData?.status ===
                                                "pending" ? (
                                                <Typography
                                                  sx={{
                                                    color: "#fff",
                                                    bgcolor: "#FCAF17",
                                                    borderRadius: "5px",
                                                    fontSize: "12px",
                                                    py: "5px",
                                                    px: "10px",
                                                    mx: 1,
                                                  }}
                                                >
                                                  {depositData?.status.toUpperCase()}
                                                </Typography>
                                              ) : (
                                                <Typography
                                                  sx={{
                                                    color: "#fff",
                                                    bgcolor: "red",
                                                    borderRadius: "5px",
                                                    fontSize: "12px",
                                                    py: "5px",
                                                    px: "10px",
                                                    mx: 1,
                                                  }}
                                                >
                                                  {depositData?.status.toUpperCase()}
                                                </Typography>
                                              )}
                                            </span>
                                          </td>
                                          <td>{depositData?.amount}</td>

                                          <td>
                                            {depositData?.createdAt
                                              ? format(
                                                  new Date(
                                                    depositData?.createdAt
                                                  ),
                                                  "dd MMM yyyy hh:mm a"
                                                )
                                              : "Transaction Date"}
                                          </td>
                                          <td>
                                            {depositData?.chequeIssueDate}
                                          </td>
                                          <td>{depositData?.transactionId}</td>
                                          <td>{depositData?.paymentmethod}</td>
                                          <td>{depositData?.requestedby}</td>
                                          <td>
                                            <button
                                              style={{
                                                background: "transparent",
                                                border: "none",
                                                cursor: "pointer",
                                              }}
                                            >
                                              <a
                                                target="_blank"
                                                rel="noreferrer"
                                                href={depositData?.attachment}
                                              >
                                                View Details
                                              </a>
                                            </button>
                                          </td>

                                          <td>
                                            {depositData?.remarks ? (
                                              <>{depositData?.remarks}</>
                                            ) : (
                                              <>N/A</>
                                            )}
                                          </td>
                                        </tr>
                                      </>
                                    )}
                                  </>
                                ))}
                              </table>
                            </Box>
                          </TabPanel>
                          <TabPanel value="4">
                            <Box className="table-responsive-p">
                              <table className="deposite-table table-responsive-c">
                                <tr>
                                  <th>Reference No</th>
                                  <th>Status</th>
                                  <th>Amount</th>
                                  <th>Transaction Date</th>
                                  <th>Deposit From</th>
                                  <th>Deposit To</th>
                                  <th>Transaction ID</th>
                                  <th>Requested By</th>
                                  <th>Attachment</th>
                                  <th>Rejected Reason</th>
                                </tr>

                                {search.reverse().map((depositData) => (
                                  <>
                                    {depositData?.paymentway ===
                                      "bankTransfer" && (
                                      <>
                                        <tr>
                                          <td>{depositData?.depositId}</td>
                                          <td>
                                            <span>
                                              {depositData?.status ===
                                              "approved" ? (
                                                <Typography
                                                  sx={{
                                                    color: "#fff",
                                                    bgcolor: "#177c33",
                                                    borderRadius: "5px",
                                                    fontSize: "12px",
                                                    py: "5px",
                                                    px: "10px",
                                                    mx: 1,
                                                  }}
                                                >
                                                  {depositData?.status.toUpperCase()}
                                                </Typography>
                                              ) : depositData?.status ===
                                                "pending" ? (
                                                <Typography
                                                  sx={{
                                                    color: "#fff",
                                                    bgcolor: "#FCAF17",
                                                    borderRadius: "5px",
                                                    fontSize: "12px",
                                                    py: "5px",
                                                    px: "10px",
                                                    mx: 1,
                                                  }}
                                                >
                                                  {depositData?.status.toUpperCase()}
                                                </Typography>
                                              ) : (
                                                <Typography
                                                  sx={{
                                                    color: "#fff",
                                                    bgcolor: "red",
                                                    borderRadius: "5px",
                                                    fontSize: "12px",
                                                    py: "5px",
                                                    px: "10px",
                                                    mx: 1,
                                                  }}
                                                >
                                                  {depositData?.status.toUpperCase()}
                                                </Typography>
                                              )}
                                            </span>
                                          </td>
                                          <td>{depositData?.amount}</td>
                                          <td>
                                            {depositData?.createdAt
                                              ? format(
                                                  new Date(
                                                    depositData?.createdAt
                                                  ),
                                                  "dd MMM yyyy hh:mm a"
                                                )
                                              : "Transaction Date"}
                                          </td>
                                          <td>{depositData?.sender}</td>
                                          <td>{depositData?.reciever}</td>
                                          <td>{depositData?.transactionId}</td>
                                          <td>{depositData?.requestedby}</td>
                                          <td>
                                            <button
                                              style={{
                                                background: "transparent",
                                                border: "none",
                                                cursor: "pointer",
                                              }}
                                            >
                                              <a
                                                target="_blank"
                                                rel="noreferrer"
                                                href={depositData?.attachment}
                                              >
                                                View Details
                                              </a>
                                            </button>
                                          </td>

                                          <td>
                                            {depositData?.remarks ? (
                                              <>{depositData?.remarks}</>
                                            ) : (
                                              <>N/A</>
                                            )}
                                          </td>
                                        </tr>
                                      </>
                                    )}
                                  </>
                                ))}
                              </table>
                            </Box>
                          </TabPanel>
                          <TabPanel value="5">
                            <Box className="table-responsive-p">
                              <table className="deposite-table table-responsive-c">
                                <tr>
                                  <th>Reference No</th>
                                  <th>Status</th>
                                  <th>Amount</th>
                                  <th>Transaction Date</th>
                                  <th>Payment Method</th>
                                  <th>Account No</th>
                                  <th>Transaction ID</th>
                                  <th>Requested By</th>
                                  <th>Attachment</th>
                                  <th>Rejected Reason</th>
                                </tr>

                                {search.reverse().map((depositData) => (
                                  <>
                                    {depositData?.paymentway ===
                                      "mobileTransfer" && (
                                      <>
                                        <tr>
                                          <td>{depositData?.depositId}</td>
                                          <td>
                                            <span>
                                              {depositData?.status ===
                                              "approved" ? (
                                                <Typography
                                                  sx={{
                                                    color: "#fff",
                                                    bgcolor: "#177c33",
                                                    borderRadius: "5px",
                                                    fontSize: "12px",
                                                    py: "5px",
                                                    px: "10px",
                                                    mx: 1,
                                                  }}
                                                >
                                                  {depositData?.status.toUpperCase()}
                                                </Typography>
                                              ) : depositData?.status ===
                                                "pending" ? (
                                                <Typography
                                                  sx={{
                                                    color: "#fff",
                                                    bgcolor: "#FCAF17",
                                                    borderRadius: "5px",
                                                    fontSize: "12px",
                                                    py: "5px",
                                                    px: "10px",
                                                    mx: 1,
                                                  }}
                                                >
                                                  {depositData?.status.toUpperCase()}
                                                </Typography>
                                              ) : (
                                                <Typography
                                                  sx={{
                                                    color: "#fff",
                                                    bgcolor: "red",
                                                    borderRadius: "5px",
                                                    fontSize: "12px",
                                                    py: "5px",
                                                    px: "10px",
                                                    mx: 1,
                                                  }}
                                                >
                                                  {depositData?.status.toUpperCase()}
                                                </Typography>
                                              )}
                                            </span>
                                          </td>
                                          <td>{depositData?.amount}</td>
                                          <td>
                                            {depositData?.createdAt
                                              ? format(
                                                  new Date(
                                                    depositData?.createdAt
                                                  ),
                                                  "dd MMM yyyy hh:mm a"
                                                )
                                              : "Transaction Date"}
                                          </td>
                                          <td>{depositData?.paymentmethod}</td>
                                          <td>{depositData?.sender}</td>
                                          <td>{depositData?.transactionId}</td>
                                          <td>{depositData?.requestedby}</td>
                                          <td>
                                            <button
                                              style={{
                                                background: "transparent",
                                                border: "none",
                                                cursor: "pointer",
                                              }}
                                            >
                                              <a
                                                target="_blank"
                                                rel="noreferrer"
                                                href={depositData?.attachment}
                                              >
                                                View Details
                                              </a>
                                            </button>
                                          </td>

                                          <td>
                                            {depositData?.remarks ? (
                                              <>{depositData?.remarks}</>
                                            ) : (
                                              <>N/A</>
                                            )}
                                          </td>
                                        </tr>
                                      </>
                                    )}
                                  </>
                                ))}
                              </table>
                            </Box>
                          </TabPanel>
                        </TabContext>
                      </>
                    </div>
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <>
                    <DepositEntry />
                  </>
                </TabPanel>
              </TabContext>
            </Box>
          </Box>
        </>
      ) : (
        <>
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
                  width: "50%",
                  objectFit: "center",
                }}
              />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default DepositRequest;
