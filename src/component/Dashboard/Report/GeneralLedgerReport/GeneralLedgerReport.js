import React, { useEffect, useState } from "react";
import { Box, Button, ClickAwayListener, Grid } from "@mui/material";
import { Container } from "@mui/system";
import { format, addDays } from "date-fns";
import commaNumber from "comma-number";
import "./GeneralLedgerReport.css";

import { useRef } from "react";
// import { Button } from "@progress/kendo-react-buttons";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import logo from "../../../../image/logo.png";
import pdfFooter from "../../../../image/pdfFooter.png";
import { useLocation } from "react-router-dom";
import pdf1 from "../../../../image/pdf1.png";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useReactToPrint } from "react-to-print";
import PdfGenerate from "./PdfGenerate";
import { Calendar } from "react-date-range";

const footer = {
  backgroundImage: `url(${pdfFooter})`,
  backgroundSize: "cover",
  height: "8vh",
};

const bg = {
  backgroundImage: `url(${pdf1})`,
  backgroundRepeat: "no-repeat",
};

const GeneralLedgerReport = () => {
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [userData, setUserData] = useState();
  const [startDate, setStartDate] = useState(format(new Date(), "dd MMM yyyy"));
  const [endDate, setEndDate] = useState(format(new Date(), "dd MMM yyyy"));
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  const handleSubmit = (e) => {
    fetchData(startDate, endDate);
    e.preventDefault();
  };
  const handleClose = () => {
    setOpenStartDate(false);
    setOpenEndDate(false);
  };

  //user data fetch from localStorage
  const [users, setUsers] = useState("");
  useEffect(() => {
    const users = secureLocalStorage.getItem("user-info");
    if (users) {
      setUsers(users);
    }
  }, []);

  let agentID = users?.user?.agentId;
  //    general Ledger data fetch
  const [ledgerDates, setData] = useState([]);
  // console.log(ledgerDates);

  async function fetchData(startDate, endDate) {
    let url = `https://api.flyfarint.com/v.1.0.0/Accounts/GeneralLeaderReport.php?agentId=${agentID}&startDate=${new Date(
      startDate
    ).toLocaleDateString("sv")}&endDate=${new Date(endDate).toLocaleDateString(
      "sv"
    )}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }

  const id = ledgerDates[0]?.id;
  const navigate = useNavigate();

  const pdfExportComponent = useRef(null);
  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  };

  // const printData = () => {
  //   navigate("/dashboard/pdf", {
  //     state: {
  //       ledgerDates,
  //       startDate,
  //       endDate,
  //     },
  //   });
  // };

  useEffect(() => {
    let url = `https://api.flyfarint.com/v.1.0.0/Accounts/MyAccount.php?agentId=${agentID}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUserData(data[0]));
  }, [agentID]);

  const componentRef = useRef();
  const handleToPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `General_Ledger_From-${startDate}_To-${endDate}`,
    pageStyle: "@page { size: 200mm 297mm }",
  });

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        mx={{ xs: "2vh", md: "3vh" }}
        mt={{ xs: "0vh", sm: "0vh", md: "2vh", lg: "2vh" }}
      >
        <Box>
          <Box className="ticketVendor-parent">
            <h3>General Ledger</h3>

            <form onSubmit={handleSubmit}>
              <Box>
                <Grid container spacing={4} alignItems="center">
                  <Grid
                    style={{ paddingTop: "20px", position: "relative" }}
                    item
                    xs={12}
                    sm={6}
                    md={3}
                  >
                    <Box className="ticketVendor">
                      <label
                        htmlFor="startDate"
                        style={{
                          fontWeight: "bold",
                          color: "var(--primary-color)",
                        }}
                      >
                        Start Date
                      </label>
                      <input
                        id="startDate"
                        name="startDate"
                        style={{ border: "1px solid var(--primary-color)" }}
                        type="text"
                        value={startDate}
                        readOnly
                        onClick={() => setOpenStartDate((prev) => !prev)}
                        required="required"
                      />
                    </Box>
                    {openStartDate && (
                      <Calendar
                        color={"#dc143c"}
                        date={new Date(startDate)}
                        onChange={(date) => {
                          setStartDate(format(new Date(date), "dd MMM yyyy"));
                          setOpenStartDate(false);
                        }}
                        maxDate={addDays(new Date(), -1)}
                        months={1}
                        direction="horizontal"
                        className="new-dashboard-calendar"
                        name="dashboard-calendar"
                      />
                    )}
                  </Grid>

                  <Grid
                    style={{ paddingTop: "20px", position: "relative" }}
                    item
                    xs={12}
                    sm={6}
                    md={3}
                  >
                    <Box className="ticketVendor">
                      <label
                        htmlFor="endDate"
                        style={{
                          fontWeight: "bold",
                          color: "var(--primary-color)",
                        }}
                      >
                        End Date
                      </label>

                      <input
                        id="endDate"
                        name="endDate"
                        style={{ border: "1px solid var(--primary-color)" }}
                        type="text"
                        value={endDate}
                        readOnly
                        onClick={() => setOpenEndDate((prev) => !prev)}
                        required="required"
                      />
                    </Box>
                    {openEndDate && (
                      <Calendar
                        color={"#dc143c"}
                        date={new Date(endDate)}
                        onChange={(date) => {
                          setEndDate(format(new Date(date), "dd MMM yyyy"));
                          setOpenEndDate(false);
                        }}
                        months={1}
                        direction="horizontal"
                        className="new-dashboard-calendar"
                        name="dashboard-calendar"
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "var(--primary-color)",
                        px: "45px",
                        py: "10px",
                        mt: "10px",
                      }}
                      type="submit"
                    >
                      PROCEED
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>

          <Box sx={{ padding: "10px 10px" }}>
            {id ? (
              <Box>
                <Grid container justifyContent={"space-between"}>
                  <Grid item></Grid>
                  <Grid item>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        bgcolor: "var(--gray-text-color)",
                        px: "45px",
                        mb: "10px",
                      }}
                      onClick={handleToPrint}
                    >
                      Print
                    </Button>
                  </Grid>
                </Grid>
                <div className="deposite-tables table-responsive-p">
                  <table className="deposite-table table-responsive-c">
                    <tr>
                      <th width="5%">SL No.</th>
                      <th width="10%">Ledger Type</th>
                      <th width="10%">Reference</th>
                      <th width="15%">Date</th>
                      <th width="40%">Details</th>
                      <th width="10%">Amount</th>
                      <th width="10%">Remaining Balance</th>
                    </tr>
                    {ledgerDates?.length > 0 ? (
                      <>
                        {ledgerDates.map((ledgerData) => (
                          <tr>
                            <td> {ledgerData?.serial}</td>
                            <td>
                              {ledgerData?.deposit > "0" ? (
                                <span
                                  style={{
                                    backgroundColor: "#177c33",
                                    padding: "6px 28px",
                                    color: "#fff",
                                  }}
                                >
                                  Deposit
                                </span>
                              ) : ledgerData?.purchase > "0" ? (
                                <span
                                  style={{
                                    backgroundColor: "#ed1c24",
                                    padding: "6px 24px",
                                    color: "#fff",
                                  }}
                                >
                                  Purchase
                                </span>
                              ) : ledgerData?.loan > "0" ? (
                                <span
                                  style={{
                                    backgroundColor: "#ff6464",
                                    padding: "6px 37px",
                                    color: "#fff",
                                  }}
                                >
                                  Loan
                                </span>
                              ) : ledgerData?.void > "0" ? (
                                <span
                                  style={{
                                    backgroundColor: "#235f83",
                                    padding: "6px 40px",
                                    color: "#fff",
                                  }}
                                >
                                  Void
                                </span>
                              ) : ledgerData?.refund > "0" ? (
                                <span
                                  style={{
                                    backgroundColor: "#7a64ff",
                                    padding: "6px 32px",
                                    color: "#fff",
                                  }}
                                >
                                  Refund
                                </span>
                              ) : ledgerData?.others > "0" ? (
                                <span
                                  style={{
                                    backgroundColor: "#272323",
                                    padding: "8px 15px",
                                    color: "#fff",
                                  }}
                                >
                                  Other
                                </span>
                              ) : ledgerData?.servicefee > "0" ? (
                                <span
                                  style={{
                                    backgroundColor: "#0b8668",
                                    padding: "8px 15px",
                                    color: "#fff",
                                  }}
                                >
                                  Service Fee
                                </span>
                              ) : (
                                <span
                                  style={{
                                    backgroundColor: "orange",
                                    padding: "6px 7px",
                                    color: "#fff",
                                  }}
                                >
                                  Issue Rejected
                                </span>
                              )}
                            </td>
                            <td>{ledgerData?.reference}</td>
                            <td>
                              {ledgerData?.createdAt !== ""
                                ? format(
                                    new Date(ledgerData?.createdAt),
                                    "dd MMM yyyy hh:mm a"
                                  )
                                : "Transaction Date"}
                            </td>
                            <td>{ledgerData?.details || "-"}</td>
                            <td>
                              {ledgerData?.deposit > "0"
                                ? "+" + commaNumber(Number(ledgerData?.deposit))
                                : ledgerData?.purchase > "0"
                                ? "-" +
                                  commaNumber(Number(ledgerData?.purchase))
                                : ledgerData?.returnMoney > "0"
                                ? "+" +
                                  commaNumber(Number(ledgerData?.returnMoney))
                                : ""}
                              &nbsp;Tk
                            </td>

                            <td>
                              {commaNumber(ledgerData?.lastAmount) ||
                                "Remaining Balance"}
                              &nbsp;Tk
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </table>
                </div>
              </Box>
            ) : (
              <Box className="geneal-ledger-parent">
                <h5>No Records found...!</h5>
              </Box>
            )}
          </Box>

          <div style={{ display: "none" }}>
            <div ref={componentRef}>
              <div>
                <div className="inner-page">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ width: "50%" }}>
                      <h4>{userData?.company}</h4>
                      <h6>{userData?.companyadd}</h6>
                      <h6>Email: {userData?.email}</h6>
                      <h6>Phone: {userData?.phone}</h6>
                    </div>

                    <div style={{ width: "50%" }}>
                      <img
                        style={{
                          width: "150px",
                          position: "relative",
                          left: "-15px",
                        }}
                        src={userData?.companyImage}
                      />
                    </div>
                  </div>

                  <div className="pdf-body">
                    <h3 style={{ margin: "20px 0px" }}>
                      Ledger Report From {startDate} To {endDate}
                    </h3>

                    <table
                      style={{
                        width: "100%",
                        cellspacing: "0",
                        cellpadding: "0",
                      }}
                    >
                      <tr>
                        <th width="5%">SL No.</th>
                        <th width="10%">Ledger Type</th>
                        <th width="10%">Reference</th>
                        <th width="15%">Date</th>
                        <th width="40%">Details</th>
                        <th width="10%"> Amount </th>
                        <th width="10%">Remaining Balance</th>
                      </tr>
                      {id ? (
                        <>
                          {ledgerDates?.reverse().map((ledgerDate) => (
                            <tr>
                              <td>{ledgerDate?.id}</td>
                              <td>
                                {ledgerDate?.deposit > "0" ? (
                                  <span>Deposit</span>
                                ) : ledgerDate?.purchase > "0" ? (
                                  <span>Purchase</span>
                                ) : (
                                  <span>Return</span>
                                )}
                              </td>
                              <td>{ledgerDate?.reference}</td>
                              <td>
                                {ledgerDate?.createdAt !== ""
                                  ? format(
                                      new Date(ledgerDate?.createdAt),
                                      "dd MMM yyyy"
                                    )
                                  : "Date"}
                              </td>

                              <td>{ledgerDate?.details} Tk</td>
                              <td>
                                {ledgerDate?.deposit > "0"
                                  ? "+" +
                                    commaNumber(Number(ledgerDate?.deposit))
                                  : ledgerDate?.purchase > "0"
                                  ? "-" +
                                    commaNumber(Number(ledgerDate?.purchase))
                                  : ledgerDate?.returnMoney > "0"
                                  ? "+" +
                                    commaNumber(Number(ledgerDate?.returnMoney))
                                  : ""}
                                &nbsp;Tk
                              </td>

                              <td>
                                {commaNumber(ledgerDate?.lastAmount) ||
                                  "Remaining Balance"}
                                &nbsp;Tk
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        ""
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

export default GeneralLedgerReport;
