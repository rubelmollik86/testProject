import { Box, Grid, Input, InputBase, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import "./CommissionReport.css";

const CommissionReport = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  async function fetchData(startDate, endDate) {
    await fetch(
      `https://api.flyfarint.com/v.1.0.0/Accounts/GeneralLeaderReport.php?agentId=${agentID}&startDate=${startDate}&endDate=${endDate}`
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  }

  const id = ledgerDates[0]?.id;
  const printData = () => {
    navigate("/dashboard/pdf", {
      state: {
        ledgerDates,
        startDate,
        endDate,
      },
    });
  };

  const handleSubmit = (e) => {
    fetchData(startDate, endDate);
    e.preventDefault();
  };

  return (
    <Box mt={4}>
      <Container maxWidth="xxl">
        <Box className="ticketVendor-parent">
          <h3>Commission Report</h3>

          <form onSubmit={handleSubmit}>
            <Box>
              <Grid container spacing={4}>
                <Grid style={{ paddingTop: "20px" }} item xs={12} sm={6} md={3}>
                  <Box className="ticketVendor">
                    <Box>
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
                        style={{ border: "1px solid var(--primary-color)" }}
                        type="date"
                        id="startDate"
                        name="startDate"
                        onChange={(e) => setStartDate(e.target.value)}
                        required="required"
                      />
                    </Box>
                  </Box>
                </Grid>

                <Grid style={{ paddingTop: "20px" }} item xs={12} sm={6} md={3}>
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
                      type="date"
                      onChange={(e) => setEndDate(e.target.value)}
                      required="required"
                    ></input>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box className="ticketVendorbtn" sx={{ margin: "35px 0px" }}>
              <button type="submit">PROCEED</button>
            </Box>
          </form>
        </Box>

        {/* <Box sx={{ padding: "0px 10px" }}>
          {id ? (
            <Box>
              <div style={{ overflowX: "auto" }} className="deposite-tables">
                <table className="deposite-table">
                  <tr>
                    <th>Date</th>
                    <th>Ledger Type</th>
                    <th>Remaining Balance</th>
                    <th>Amount</th>
                    <th>TransactionId</th>
                    <th>Comment</th>
                  </tr>

                  {ledgerDates.map((ledgerDate) => (
                    <tr>
                      <td>{ledgerDate?.dateTime}</td>
                      <td>
                        {ledgerDate?.deposit > "0" ? (
                          <span
                            style={{
                              backgroundColor: "#177c33",
                              padding: "8px 15px",
                              color: "#fff",
                            }}
                          >
                            Deposit
                          </span>
                        ) : (
                          <span
                            style={{
                              backgroundColor: "#ed1c24",
                              padding: "8px 15px",
                              color: "#fff",
                            }}
                          >
                            Purchase
                          </span>
                        )}
                      </td>
                      <td>{ledgerDate?.lastAmount} Tk</td>

                      <td>
                        {ledgerDate?.deposit > "0"
                          ? ledgerDate?.deposit
                          : -ledgerDate?.purchase}{" "}
                        Tk
                      </td>

                      <td>{ledgerDate?.transactionId}</td>
                      <td>{ledgerDate?.details}</td>
                    </tr>
                  ))}
                </table>
              </div>

              <Box style={{ width: "10%", margin: "auto" }}>
                <Button
                  className="search-flight-btn"
                  type="search"
                  variant="contained"
                  onClick={printData}
                  // disabled
                >
                  Print
                </Button>
              </Box>
            </Box>
          ) : (
            <Box className="geneal-ledger-parent">
              <h5>No Records found...!</h5>
            </Box>
          )}
        </Box> */}

        <Box sx={{ padding: "0px 10px" }} className="geneal-ledger-parent">
          <h5>No Records found...!</h5>
        </Box>
      </Container>

      {/* <Container>
        <Box mt={5}>
          <Grid className="modify-search" container spacing={2}>
            <Grid container md={6}>
              <h5>
                One Way Flight <span>|</span> Adult(s) 1 <span>|</span> Economy{" "}
                <span>|</span> Sat 20 aug 2022
              </h5>
              <h6>
                Shajalal Intl Airport [DAC] <span>|</span> John F. Kennedy Intl
                Airport [JFK]{" "}
              </h6>
            </Grid>

            <Grid container columnGap={1} md={6}>
              <Grid md={2}>
                <button style={{ border: "1.2px solid #DC143C" }}>Share</button>
              </Grid>
              <Grid md={2}>
                <button style={{ backgroundColor: "var(--primary-color)" }}>
                  Previous Day
                </button>
              </Grid>
              <Grid md={2}>
                <button style={{ backgroundColor: "#DC143C" }}>Next Day</button>
              </Grid>
              <Grid md={2}>
                <button style={{ backgroundColor: "var(--primary-color)" }}>CM%</button>
              </Grid>
              <Grid className="" md={3}>
                <button style={{ backgroundColor: "#DC143C" }}>
                  Modify Search
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container> */}
    </Box>
  );
};

export default CommissionReport;
