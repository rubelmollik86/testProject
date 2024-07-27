import React, { useEffect, useState } from "react";
import { Box, Tab, Button, Grid, Typography, Modal } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";
import Loader from "../../../../image/loader/Render.gif";
import AddBankAccount from "./AddBankAccount";
import addAccount from "../../../../image/undraw/undraw_credit_card_re_blml.svg";
import invalidInfo from "../../../../image/undraw/undraw_warning_re_eoyh.svg";
import serverError from "../../../../image/undraw/undraw_server_down_s-4-lk.svg";
import reConfirm from "../../../../image/undraw/undraw_confirmation_re_b6q5.svg";
import deleteAccount from "../../../../image/undraw/undraw_throw_away_re_x60k.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const BankAccount = () => {
  const navigate = useNavigate();
  // const users = JSON.parse(sessionStorage.getItem("user-info"));
  const users = secureLocalStorage.getItem("user-info");
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  let size = 20;
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState("1");
  const [transectionValue, setTransectionValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeTransection = (event, newValue) => {
    setTransectionValue(newValue);
  };
  const handlePageChange = (event, value) => {
    setPage(value);
    setSearch(depositDatas?.slice((value - 1) * size, value * size));
    window.scrollTo(0, 0);
  };
  const [startDate, setStartDate] = useState(null);
  // payment method data select function
  const [transectionWay, setTransectionWay] = useState("");
  const paymentMethod = (e) => {
    setTransectionWay(e.target.value);
  };

  let agentId = users?.user?.agentId;
  let staffId = users?.user?.staffId;

  useEffect(() => {
    setIsLoading(false);
    let url = `https://api.flyfarint.com/v.1.0.0/Deposit/allDeposit.php?agentId=${agentId}`;
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
      `https://api.flyfarint.com/v.1.0.0/Deposit/allBank.php?agentId=${agentId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(true);
        setAccountData(data);
        // setSearch(data);
      });
  }, [agentId]);

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
  // payment input data post
  const [bankname, setBankname] = useState("");
  const [accname, setAccName] = useState("");
  const [accno, setAccno] = useState("");
  const [branch, setBranch] = useState("");
  const [swift, setSwift] = useState("");
  const [routing, setRouting] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    setIsLoading(false);
    e.preventDefault();
    let body = JSON.stringify({
      agentId,
      bankname,
      accname,
      accno,
      branch,
      swift,
      routing,
      address,
    });

    await fetch(
      "https://api.flyfarint.com/v.1.0.0/Deposit/addBank.php",

      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          Swal.fire({
            // icon: "success",
            imageUrl: addAccount,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Bank Account Add Successfully !",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(function () {
            navigate("/dashboard/account/deposite");
          });
        } else {
          Swal.fire({
            // icon: "success",
            imageUrl: invalidInfo,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            text: "Invalid Information",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(function () {
            navigate("/dashboard/account/deposite");
          });
        }
      });

    e.target.reset();
  };

  const [depositDatas, setDepositData] = useState([]);
  const [accountData, setAccountData] = useState([]);

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

  //  bank information data update

  const [Updateopen, setUpdateOpen] = React.useState(false);
  const UpdateHandleClose = () => {
    setUpdateOpen(false);
  };

  const UpdateHandleOpen = async (id) => {
    setUpdateOpen(true);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    let body = JSON.stringify({
      agentId,
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
            // icon: "success",
            imageUrl: addAccount,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Bank Account Update Successfully !",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(function () {
            navigate(0);
          });
        } else {
          setOpen(false);
          Swal.fire({
            imageUrl: serverError,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            text: "Server Error",
            confirmButtonText: "Ok!",
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
      imageUrl: reConfirm,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      title: "Are you sure?",
      text: "You Wants to Delete This Bank Account?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--primary-color)",
      cancelButtonColor: "#dc143c",
      confirmButtonText: "Delete it!",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        setIsLoading(true);
        fetch(
          `https://api.flyfarint.com/v.1.0.0/Deposit/deleteBank.php?agentId=${agentId}&id=${id}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data?.status === "success") {
              Swal.fire({
                imageUrl: deleteAccount,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                title: "Bank Account Deleted!",
                confirmButtonColor: "#dc143c",
                confirmButtonText: "Ok",
              }).then(function () {
                navigate(0);
              });
            } else {
              Swal.fire({
                imageUrl: serverError,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                title: "Server Error",
                confirmButtonColor: "#dc143c",
                confirmButtonText: "Ok",
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
      mt={{ xs: "0vh", sm: "0vh", md: "2vh", lg: "2vh" }}
    >
      {isLoading ? (
        <Box className="depositParent1" my={4}>
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
                  label="Bank Account"
                  value="1"
                />
                <Tab
                  sx={{
                    border: "2px solid #1a4a77",
                    mr: "10px",
                  }}
                  label="Add Bank Account"
                  value="2"
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Box className="table-responsive-p" mt={2}>
                <table className="deposite-table table-responsive-c">
                  <tr>
                    <th>Holder Name</th>
                    <th>Bank Name</th>
                    <th>Account Number</th>
                    <th>Branch Name</th>
                    <th>Address</th>
                    <th>Swift</th>
                    <th>Routing</th>
                    {/* <th>Edit</th> */}
                    <th>Delete</th>
                  </tr>

                  {accountData.reverse().map((account) => (
                    <tr>
                      <td>{account?.accname}</td>
                      <td>{account?.bankname}</td>
                      <td>{account?.accno}</td>
                      <td>{account?.branch}</td>
                      <td>{account?.address}</td>
                      <td>{account?.swift}</td>
                      <td>{account?.routing}</td>
                      {/* <td>
                          <button
                            style={{
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => UpdateHandleOpen()}
                          >
                            Edit
                          </button>
                        </td> */}

                      <td>
                        <button
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => handelDelete(account.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </table>
              </Box>

              {/* update modal */}
              <Box>
                <Modal
                  open={Updateopen}
                  onClose={UpdateHandleClose}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                >
                  <Box
                    sx={{ ...style, width: 500 }}
                    style={{ border: "none", borderRadius: "5px" }}
                  >
                    <Typography
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        margin: "15px 0px",
                        color: "#000000",
                      }}
                    >
                      Update Your Bank Information
                    </Typography>
                    <Box className="airlinePnr1" mb={2}>
                      <label>Airline Code:</label>
                      <br></br>
                      <input
                        style={{
                          marginLeft: "0px",
                          marginTop: "5px",
                          width: "100%",
                        }}
                        required
                        type="text"
                        // value={updateAirCode}
                        // onChange={(e) => {
                        //   setUpdateAirCode(e.target.value);
                        // }}
                      />
                    </Box>
                    <Box className="airlinePnr1" mb={2}>
                      <label>Holder Name:</label>
                      <br></br>
                      <input
                        style={{
                          marginLeft: "0px",
                          marginTop: "5px",
                          width: "100%",
                        }}
                        required
                        type="text"
                        // value={updateAirNameEng}
                        // onChange={(e) => {
                        //   setUpdateAirNameEng(e.target.value);
                        // }}
                      />
                    </Box>
                    <Box className="airlinePnr1" mb={2}>
                      <label>Bank Name:</label> <br></br>
                      <input
                        style={{
                          marginLeft: "0px",
                          marginTop: "5px",
                          width: "100%",
                        }}
                        required
                        type="text"
                        // value={updateAirNameBng}
                        // onChange={(e) => {
                        //   setUpdateAirNameBng(e.target.value);
                        // }}
                      />
                    </Box>
                    <Box className="airlinePnr1" mb={2}>
                      <label>Account Number:</label> <br></br>
                      <input
                        style={{
                          marginLeft: "0px",
                          marginTop: "5px",
                          width: "100%",
                        }}
                        required
                        type="text"
                        // value={updateAirCom}
                        // onChange={(e) => {
                        //   setUpdateAirCom(e.target.value);
                        // }}
                      />
                    </Box>
                    <Box className="airlinePnr1" mb={2}>
                      <label>Branch Name:</label> <br></br>
                      <input
                        style={{
                          marginLeft: "0px",
                          marginTop: "5px",
                          width: "100%",
                        }}
                        required
                        type="text"
                        // value={updateAirCom}
                        // onChange={(e) => {
                        //   setUpdateAirCom(e.target.value);
                        // }}
                      />
                    </Box>
                    <Box className="airlinePnr1" mb={2}>
                      <label>Swift:</label> <br></br>
                      <input
                        style={{
                          marginLeft: "0px",
                          marginTop: "5px",
                          width: "100%",
                        }}
                        required
                        type="text"
                        // value={updateAirCom}
                        // onChange={(e) => {
                        //   setUpdateAirCom(e.target.value);
                        // }}
                      />
                    </Box>
                    <Box className="airlinePnr1" mb={2}>
                      <label>Branch Name:</label> <br></br>
                      <input
                        style={{
                          marginLeft: "0px",
                          marginTop: "5px",
                          width: "100%",
                        }}
                        required
                        type="text"
                        // value={updateAirCom}
                        // onChange={(e) => {
                        //   setUpdateAirCom(e.target.value);
                        // }}
                      />
                    </Box>
                    <Box className="airlinePnr1" mb={2}>
                      <label>Address:</label> <br></br>
                      <input
                        style={{
                          marginLeft: "0px",
                          marginTop: "5px",
                          width: "100%",
                        }}
                        required
                        type="text"
                        // value={updateAirCom}
                        // onChange={(e) => {
                        //   setUpdateAirCom(e.target.value);
                        // }}
                      />
                    </Box>

                    <Box className="balance-transaction">
                      <Box className="saveBtn1" mt={2}>
                        {/* <button onClick={() => UpdateHandleOpen()}>
                            Update
                          </button> */}
                      </Box>
                    </Box>
                  </Box>
                </Modal>
              </Box>
              {/* update modal end */}
            </TabPanel>
            <TabPanel value="2">
              <AddBankAccount />
            </TabPanel>
          </TabContext>
        </Box>
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

export default BankAccount;
