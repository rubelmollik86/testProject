import {
  Box,
  Button,
  CircularProgress,
  ClickAwayListener,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { Calendar } from "react-date-range";
import "./DepositeEntry.css";
import secureLocalStorage from "react-secure-storage";
import Bankpdf from "../../../../image/Fly-Far-Int-bank-details.pdf";
import { format } from "date-fns";
const bankTransfar = [
  {
    name: "Islami Bank, Baridhara Branch Account Fly Far International",
    number: "20503420100141709",
  },
  {
    name: "Brac Bank, Bashundhora Branch Fly Far International",
    number: "1521204262962001",
  },
  {
    name: "Sonali Bank, Baridhara Branch Fly Far International",
    number: "01081020006951",
  },
  {
    name: "Commercial Bank, Progati Sharani SME Branch Fly Far International",
    number: "1813001751",
  },
  {
    name: "Standard Chartered Bank ,Progati Sharani SME Branch Fly Far International",
    number: "01886946302",
  },
  {
    name: "NCC Bank,Bashundhora Branch Fly Far International",
    number: "00960210002554",
  },
  {
    name: "City Bank, Jomuna Future park Branch Fly Far International",
    number: "1502553140001",
  },
  {
    name: "Modhumoti Bank, Sheikh Kamal Sarani Branch Fly Far International",
    number: "112011100000223",
  },
  {
    name: "Dutch Bangla Bank, Bashundhora Branch Fly Far International",
    number: "14711016468",
  },
];

const DepositEntry = () => {
  const navigate = useNavigate();
  const users = secureLocalStorage.getItem("user-info");
  const [startDate, setStartDate] = useState(null);
  // payment method data select function
  const [transectionWay, setTransectionWay] = useState("");
  const paymentMethod = (e) => {
    setTransectionWay(e.target.value);
  };

  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(format(new Date(), "dd MMM yyyy"));

  const [accountData, setAccountData] = useState([]);
  let agentID = users?.user?.agentId;
  let staffId = users?.user?.staffId;
  useEffect(() => {
    let url = `https://api.flyfarint.com/v.1.0.0/Deposit/allBank.php?agentId=${agentID}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAccountData(data);
      });
  }, []);

  const [sender, setSender] = useState("");
  const [reciver, setReciver] = useState("");
  const [depositIn, setDepositIn] = useState("");
  const [depositFrom, setDepositFrom] = useState("");
  const [transectionNo, setTransectionNo] = useState("");
  const [reference, setReference] = useState("");
  const [amountType, setAmountType] = useState("");
  const [amount, setAmount] = useState("");
  const [minimumTk, setMinimumTk] = useState("");
  const [file, setFile] = useState("");
  const [bank, setBank] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const handleChangeAmount = (e) => {
    const balance = parseInt(e.target.value);
    const p = 1.5;
    function minusparcent(n, p) {
      return n - n * (p / 100);
    }
    setAmount(minusparcent(balance, p).toFixed(2));
  };

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };
  // const handleChangeAmount = (e) => {
  //   if (e.target.value >= 1) {
  //     setAmount(e.target.value);
  //     setMinimumTk("");
  //     return;
  //   } else {
  //     setMinimumTk("Deposit Minimum Balance 1 TK");
  //     setAmount("");
  //   }
  // };
  const handleClose = () => {
    setOpenDate(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(false);
    const formData = new FormData();
    formData.append("file", file);

    try {
      let res = await axios.post(
        `https://api.flyfarint.com/v.1.0.0/Deposit/addDeposit.php?agentId=${agentID}&sender=${sender}&receiver=${reciver}&way=${transectionWay}&method=${depositIn}&transactionId=${transectionNo}&amount=${amount}&ref=${reference}&staffId=${staffId}&ckDate=${new Date(
          date
        ).toLocaleString("sv")}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        setIsLoading(true);
        swal({
          icon: "success",
          title: "Deposit Successfully!",
          html: "Your Deposit request is submitted successfully Please wait for a response, if you do not receive any email, please contact us at <strong>support@flyfarint.com or 01755-572099, 09606912912</strong>",
          button: "Done!",
        }).then(function () {
          navigate("/dashboard/account/deposite");
        });
      } else {
        setIsLoading(true);
        Swal({
          icon: "error",
          title: "Deposit Failed!",
          html: "Your Deposit request is Failed.Please contact us at <strong>support@flyfarint.com or 01755-572099, 09606912912</strong>",
          button: "Done!",
        }).then(function () {
          navigate("/dashboard/account/DepositEntry");
        });
      }
    } catch (err) {
      setIsLoading(true);
      Swal({
        icon: "error",
        title: "Deposit Failed!",
        html: "Your Deposit request is Failed.Please contact us at <strong>support@flyfarint.com or 01755-572099, 09606912912</strong>",
        button: "Done!",
      }).then(function () {
        navigate("/dashboard/account/DepositEntry");
      });
    }
    e.target.reset();
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box mx={"24px"}>
        <Box my={4}>
          <Grid container justifyContent="space-between">
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <h3 style={{ marginBottom: "20px" }}>Deposit Request</h3>
              <NavLink
                to={"/dashboard/account/addbankaccount"}
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#fff",
                  textDecoration: "none",
                  backgroundColor: "#DC143C",
                  padding: "5px 20px",
                }}
              >
                Add Bank Account
              </NavLink>{" "}
            </Grid>
          </Grid>
          <form onSubmit={handleSubmit}>
            <Box className="deposite-input-content">
              <Box>
                <Grid className="input-parent" container spacing={2}>
                  <Grid
                    className="input-account-0"
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                  >
                    <Typography>Select Payment Method</Typography>
                    <select onChange={paymentMethod} required>
                      <option value="">Select Pay Method</option>
                      <option value="Cash">Cash</option>
                      <option value="Cheque">Cheque</option>
                      <option value="bankTransfer">Bank Transfer</option>
                      <option value="mobileTransfer">Mobile Transfer</option>
                    </select>
                  </Grid>
                  {transectionWay === "Cheque" && (
                    <>
                      <Grid
                        className="input-child-0"
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={4}
                      >
                        <Typography>Check Number</Typography>
                        <input
                          required
                          type="text"
                          placeholder="Check Number"
                          onChange={(e) => setTransectionNo(e.target.value)}
                        />
                      </Grid>

                      <Grid
                        className="input-child-0"
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={4}
                      >
                        <Typography>Bank Name</Typography>
                        <input
                          type="text"
                          placeholder="Bank Name"
                          required
                          onChange={(e) => setDepositIn(e.target.value)}
                        />
                      </Grid>
                      <Grid
                        className="input-child-0 account-info-date"
                        style={{ position: "relative" }}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={4}
                      >
                        <Typography>Check Date</Typography>
                        <input
                          required
                          type="text"
                          name="date"
                          readOnly
                          value={date}
                          onClick={() => {
                            setOpenDate((prev) => !prev);
                          }}
                        />
                        {openDate && (
                          <Calendar
                            color={"#dc143c"}
                            date={new Date(date)}
                            onChange={(date) => {
                              setDate(format(new Date(date), "dd MMM yyyy"));
                              setOpenDate(false);
                            }}
                            months={1}
                            direction="horizontal"
                            className="new-dashboard-calendar"
                            name="dashboard-calendar"
                          />
                        )}
                      </Grid>
                    </>
                  )}

                  {transectionWay === "mobileTransfer" && (
                    <>
                      <Grid
                        className="input-account-0"
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={4}
                      >
                        <Typography>Select Using Payment Method</Typography>
                        <select
                          id="afterSelect"
                          onChange={(e) => setDepositIn(e.target.value)}
                          required
                        >
                          {transectionWay === "mobileTransfer" && (
                            <>
                              <option value="">
                                Select Using Payment Method
                              </option>
                              <option value="Bkash">
                                Bkash Merchant (+880 1755-543447)
                              </option>
                              <option value="Nexus">
                                Nexus Pay (+880 1774-9751647)
                              </option>
                            </>
                          )}
                        </select>
                      </Grid>
                    </>
                  )}

                  {transectionWay === "bankTransfer" && (
                    <Grid
                      className="input-account-0"
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={4}
                    >
                      <Typography>Deposit From</Typography>
                      <select
                        id="afterSelect"
                        onChange={(e) => setSender(e.target.value)}
                        required
                      >
                        <>
                          <option value="">Deposit From A/C</option>
                          {accountData.map((account) => (
                            <option>
                              {account?.bankname}&nbsp;
                              {account?.branch}&nbsp;
                              {account?.accno}
                            </option>
                          ))}
                          <option value="">Please add a bank account</option>
                        </>
                      </select>
                    </Grid>
                  )}

                  {transectionWay === "mobileTransfer" && (
                    <Grid
                      className="input-child-0"
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={4}
                    >
                      <Typography>Pay Using Account Number</Typography>
                      <input
                        name="number"
                        type="text"
                        required
                        maxLength={12}
                        placeholder="Pay Using Account Number"
                        onChange={(e) =>
                          setSender(e.target.value.replace(/[^0-9.]{11}/g, ""))
                        }
                      />
                    </Grid>
                  )}

                  {transectionWay === "bankTransfer" && (
                    <>
                      <Grid
                        className="input-account-0"
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={4}
                      >
                        <Typography>Deposit To</Typography>
                        <select
                          id="afterSelect"
                          onChange={(e) => setReciver(e.target.value)}
                          required
                        >
                          <>
                            <option value="">Deposit To A/C</option>
                            {bankTransfar.map((bankName) => (
                              <option>
                                {bankName?.name} {bankName?.number}
                              </option>
                            ))}
                          </>
                        </select>
                      </Grid>
                    </>
                  )}

                  {transectionWay === "bankTransfer" && (
                    <Grid
                      className="input-child-0 account-info-date"
                      style={{ position: "relative" }}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={4}
                    >
                      <Typography>Check Date</Typography>
                      <input
                        required
                        type="text"
                        name="date"
                        readOnly
                        value={date}
                        onClick={() => {
                          setOpenDate((prev) => !prev);
                        }}
                      />
                      {openDate && (
                        <Calendar
                          color={"#dc143c"}
                          date={new Date(date)}
                          onChange={(date) => {
                            setDate(format(new Date(date), "dd MMM yyyy"));
                            setOpenDate(false);
                          }}
                          months={1}
                          direction="horizontal"
                          className="new-dashboard-calendar"
                          name="dashboard-calendar"
                        />
                      )}
                    </Grid>
                  )}
                  {transectionWay === "Cash" ||
                  transectionWay === "Cheque" ||
                  transectionWay === "bankTransfer" ||
                  transectionWay === "mobileTransfer" ? (
                    <>
                      {transectionWay === "Cash" && (
                        <Grid
                          className="input-child-0"
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={4}
                        >
                          <Typography>Name</Typography>
                          <input
                            type="text"
                            placeholder="Name"
                            required
                            onChange={(e) => setSender(e.target.value)}
                          />
                        </Grid>
                      )}
                      {transectionWay === "Cash" && (
                        <Grid
                          className="input-child-0"
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={4}
                        >
                          <Typography>Receiver Name</Typography>
                          <input
                            type="text"
                            placeholder="Receiver Name"
                            required
                            onChange={(e) => setReciver(e.target.value)}
                          />
                        </Grid>
                      )}
                      {transectionWay === "mobileTransfer" && (
                        <Grid
                          className="input-child-0"
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={4}
                        >
                          <Typography>Transaction ID</Typography>
                          <input
                            type="text"
                            placeholder="Transaction ID"
                            required
                            onChange={(e) => setTransectionNo(e.target.value)}
                            width="100%"
                          />
                        </Grid>
                      )}

                      {(transectionWay === "Cash" ||
                        transectionWay === "Cheque") && (
                        <Grid
                          className="input-child-0"
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={4}
                        >
                          <Typography>Reference</Typography>
                          <input
                            type="text"
                            placeholder="Reference"
                            required
                            onChange={(e) => setReference(e.target.value)}
                          />
                        </Grid>
                      )}

                      {transectionWay === "bankTransfer" && (
                        <Grid
                          className="input-child-0"
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={4}
                        >
                          <Typography>Transection ID</Typography>
                          <input
                            type="text"
                            placeholder="Transection ID"
                            required
                            onChange={(e) => setTransectionNo(e.target.value)}
                          />
                        </Grid>
                      )}
                      {transectionWay !== "mobileTransfer" && (
                        <Grid
                          item
                          className="input-child-0"
                          xs={12}
                          sm={6}
                          ms={4}
                          lg={4}
                        >
                          <Typography>Enter Amount</Typography>
                          <input
                            type="number"
                            placeholder="Enter Amount"
                            required
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </Grid>
                      )}

                      {transectionWay === "mobileTransfer" && (
                        <Grid
                          item
                          className="input-child-0"
                          xs={12}
                          sm={6}
                          ms={4}
                          lg={3}
                        >
                          <Typography>Total Payable Amount</Typography>
                          <input
                            type="number"
                            placeholder="Enter Amount"
                            required
                            onChange={handleChangeAmount}
                          />
                        </Grid>
                      )}

                      {transectionWay === "mobileTransfer" && (
                        <>
                          <Grid
                            item
                            className="input-child-0"
                            xs={12}
                            sm={6}
                            ms={4}
                            lg={2}
                          >
                            <Typography>Getway Fee(%)</Typography>
                            <input
                              type="number"
                              placeholder="1.5%"
                              value={"1.5%"}
                            />
                          </Grid>
                          <Grid
                            item
                            className="input-child-0"
                            xs={12}
                            sm={6}
                            ms={4}
                            lg={3}
                          >
                            <Typography>Amount to be deposit</Typography>
                            <input
                              type="number"
                              placeholder="0"
                              required
                              value={amount}

                              // onChange={(e) => setAmount(e.target.value)}
                            />
                          </Grid>
                        </>
                      )}

                      <Grid
                        className="input-child deposit-input-file"
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={4}
                      >
                        <Typography>
                          Choose file must jpg / png / pdf{" "}
                        </Typography>
                        <Box className="deposite-file-upload input-child-file0">
                          <input
                            onChange={onChangeFile}
                            className="customFileType"
                            type="file"
                            title="Choose a Image png and jpg please"
                            accept="image/*"
                            required
                          />
                        </Box>
                      </Grid>
                    </>
                  ) : (
                    <></>
                  )}
                </Grid>

                {transectionWay === "Cash" ||
                transectionWay === "Cheque" ||
                transectionWay === "bankTransfer" ||
                transectionWay === "mobileTransfer" ? (
                  <Box className="book-btn depo-book-btn" mt={4}>
                    <Button
                      type="submit"
                      variant="contained"
                      style={{ cursor: "pointer" }}
                      // disabled={amount >= 3000 ? false : true}
                    >
                      {isLoading ? (
                        "Done"
                      ) : (
                        <CircularProgress
                          sx={{ height: "30px", width: "30px" }}
                        />
                      )}
                    </Button>
                  </Box>
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          </form>
        </Box>
        {transectionWay === "mobileTransfer" && (
          <Box>
            <h3>MOBILE BANKING </h3>
            <p>Bkash Merchant</p>
            <p>01755543447</p>
            <p>Nexus Pay</p>
            <p>017749751647</p>
          </Box>
        )}
        {transectionWay === "Cash" && (
          <Box>
            <h3>CASH AT OFFICE </h3>
            <p>
              Address: Ka 11/2A, Jagannathpur, Bashundhora Road, Above Standard
              Chartered Bank. Dhaka, 1229
            </p>
          </Box>
        )}

        {transectionWay === "bankTransfer" && (
          <>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <h3>Islami Bank </h3>
                  <p>Fly Far International</p>
                  <p>Baridhara Branch</p>
                  <p>Account Number:</p>
                  <p>20503420100141709</p>
                  <p>Routing Number: 125260525</p>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <h3>City Bank </h3>
                  <p>Fly Far International</p>
                  <p>Jomuna Future park Branch </p>
                  <p>Account Number:</p>
                  <p>1502553140001</p>
                  <p>Routing Number: 225260333</p>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <h3>Brac Bank </h3>
                  <p>Bashundhora Branch </p>
                  <p>Baridhara Branch</p>
                  <p>Account Number:</p>
                  <p>1521204262962001</p>
                  <p>Routing Number: 060260556</p>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <h3>Dutch Bangla Bank </h3>
                  <p>Fly Far International</p>
                  <p>Bashundhora Branch </p>
                  <p>Account Number:</p>
                  <p>147.110.16468</p>
                  <p>Routing Number: 090260555</p>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <h3>Commercial Bank </h3>
                  <p>Fly Far International</p>
                  <p>Progati Sharani SME Branch </p>
                  <p>Account Number:</p>
                  <p>1813001751</p>
                  <p>Routing Number: 080271512</p>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <h3>NCC Bank </h3>
                  <p>Fly Far International</p>
                  <p>Bashundhora Branch </p>
                  <p>Account Number:</p>
                  <p>00960210002554</p>
                  <p>Routing Number: 160260551</p>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <h3>Modhumoti Bank </h3>
                  <p>Fly Far International</p>
                  <p>Sheikh Kamal Sarani Branch </p>
                  <p>Account Number:</p>
                  <p>112011100000223</p>
                  <p>Routing Number: </p>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <h3>Standard Chartered Bank</h3>
                  <p>Fly Far International</p>
                  <p>Gulshan Branch</p>
                  <p>Account Number:</p>
                  <p>01886946302</p>
                  <p>Routing Number: </p>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <h3>Sonali Bank </h3>
                  <p>Fly Far International</p>
                  <p>Baridhara Branch</p>
                  <p>Account Number:</p>
                  <p>0108102000695</p>
                  <p>Routing Number: 200260529</p>
                </Box>
              </Grid>
            </Grid>
            <Box my={5}>
              <a
                href={Bankpdf}
                download
                style={{
                  color: "#DC143C",
                  textDecoration: "none",
                  paddingBottom: "50px",
                }}
              >
                Download Fly Far International Bank Details
              </a>
            </Box>
          </>
        )}
        {transectionWay === "" && (
          <>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <h3>Islami Bank </h3>
                  <p>Fly Far International</p>
                  <p>Baridhara Branch</p>
                  <p>Account Number:</p>
                  <p>20503420100141709</p>
                  <p>Routing Number: 125260525</p>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <h3>City Bank </h3>
                  <p>Fly Far International</p>
                  <p>Jomuna Future park Branch </p>
                  <p>Account Number:</p>
                  <p>1502553140001</p>
                  <p>Routing Number: 225260333</p>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <h3>Brac Bank </h3>
                  <p>Bashundhora Branch </p>
                  <p>Baridhara Branch</p>
                  <p>Account Number:</p>
                  <p>1521204262962001</p>
                  <p>Routing Number: 060260556</p>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <h3>Dutch Bangla Bank </h3>
                  <p>Fly Far International</p>
                  <p>Bashundhora Branch </p>
                  <p>Account Number:</p>
                  <p>147.110.16468</p>
                  <p>Routing Number: 090260555</p>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <h3>Commercial Bank </h3>
                  <p>Fly Far International</p>
                  <p>Progati Sharani SME Branch </p>
                  <p>Account Number:</p>
                  <p>1813001751</p>
                  <p>Routing Number: 080271512</p>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <h3>NCC Bank </h3>
                  <p>Fly Far International</p>
                  <p>Bashundhora Branch </p>
                  <p>Account Number:</p>
                  <p>00960210002554</p>
                  <p>Routing Number: 160260551</p>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <h3>Modhumoti Bank </h3>
                  <p>Fly Far International</p>
                  <p>Sheikh Kamal Sarani Branch </p>
                  <p>Account Number:</p>
                  <p>112011100000223</p>
                  <p>Routing Number: </p>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <h3>Standard Chartered Bank</h3>
                  <p>Fly Far International</p>
                  <p>Gulshan Branch</p>
                  <p>Account Number:</p>
                  <p>01886946302</p>
                  <p>Routing Number: </p>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <h3>Sonali Bank </h3>
                  <p>Fly Far International</p>
                  <p>Baridhara Branch</p>
                  <p>Account Number:</p>
                  <p>0108102000695</p>
                  <p>Routing Number: 200260529</p>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <h3>MOBILE BANKING </h3>
                  <p>Bkash Merchant</p>
                  <p>01755543447</p>
                  <p>Nexus Pay</p>
                  <p>017749751647</p>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <h3>CASH AT OFFICE </h3>
                  <p>
                    Address: Ka 11/2A, Jagannathpur, Bashundhora Road, Above
                    Standard Chartered Bank. Dhaka, 1229
                  </p>
                </Box>
              </Grid>
            </Grid>
            <Box my={5}>
              <a
                href={Bankpdf}
                download
                style={{
                  color: "#DC143C",
                  textDecoration: "none",
                  paddingBottom: "50px",
                }}
              >
                Download Fly Far International Bank Details
              </a>
            </Box>
          </>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default DepositEntry;
