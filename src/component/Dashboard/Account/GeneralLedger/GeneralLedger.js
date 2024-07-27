import {
  Button,
  Box,
  Grid,
  Container,
  NativeSelect,
  Typography,
  TextField,
  Card,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./GeneralLedger.css";
import data from "./data";
import { AiOutlineSearch } from "react-icons/ai";
import Loader from "../../../../image/loader/Render.gif";
import secureLocalStorage from "react-secure-storage";
import commaNumber from "comma-number";
import { format } from "date-fns";

const GeneralLedger = () => {
  //user data fetch from localStorage
  const [users, setUsers] = useState("");
  useEffect(() => {
    // const users = JSON.parse(sessionStorage.getItem("user-info"));
    const users = secureLocalStorage.getItem("user-info");
    if (users) {
      setUsers(users);
    }
  }, []);

  let agentID = users?.user?.agentId;

  //Ledger data fetch

  const [ledgerDatas, setLedgerDate] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const url = `https://api.flyfarint.com/v.1.0.0/Accounts/ClientLeadger.php?agentId=${agentID}&search`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLedgerDate(data);
        setSearchData(data);
      });
  }, [agentID]);

  //  search funtonality handle

  const handelSearchItems = (e) => {
    let searchInput = e.target.value;
    if (searchInput !== "") {
      const filterData = ledgerDatas.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setSearchData(filterData);
    } else if (searchInput === "") {
      setSearchData(ledgerDatas);
    }
  };

  //  short functionality handle
  const handleChangeOption = (e) => {
    const optionValue = e.target.value;
    fetchData(optionValue);
  };

  async function fetchData(optionValue) {
    let url = `https://api.flyfarint.com/v.1.0.0/Accounts/ClientLeadger.php?agentId=${agentID}&search=${optionValue}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSearchData(data);
        isLoading(true);
      });
  }

  return (
    <Box>
      {!isLoading ? (
        <Box className=" general-ledger">
          <Container style={{ padding: "0" }}>
            <h3 style={{ marginTop: "20px" }}>General ledger </h3>

            <Box className="queues-search-box" my={2}>
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
                  textAlign="end"
                >
                  <select
                    onChange={handleChangeOption}
                    style={{ width: "200px" }}
                  >
                    <option value="all">All</option>
                    <option value="deposit">Deposit</option>
                    <option value="return">Return</option>
                    <option value="purchase">Purchase</option>
                  </select>
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{
                display: { lg: "block", md: "none", sm: "none", xs: "none" },
              }}
              style={{ overflowX: "auto" }}
              className="deposite-tables table-responsive-p "
            >
              <table className="deposite-table css-serial table-responsive-c">
                <thead>
                  <th width="5%">Sl. No</th>
                  <th width="5%">Ledger Type</th>
                  <th width="5%">Transaction Id</th>
                  <th width="10%">Transaction Date</th>
                  <th width="30%">Transaction Details</th>
                  <th width="10%">Transaction Amount</th>
                  <th width="10%">Last Balance</th>
                </thead>

                <tbody>
                  {searchData?.map((ledgerData) => (
                    <tr>
                      <td></td>
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
                          ? "-" + commaNumber(Number(ledgerData?.purchase))
                          : ledgerData?.returnMoney > "0"
                          ? "+" + commaNumber(Number(ledgerData?.returnMoney))
                          : ledgerData?.loan > "0"
                          ? "+" + commaNumber(Number(ledgerData?.loan))
                          : ledgerData?.void > "0"
                          ? "+" + commaNumber(Number(ledgerData?.void))
                          : ledgerData?.refund > "0"
                          ? "+" + commaNumber(Number(ledgerData?.refund))
                          : ledgerData?.reissue > "0"
                          ? "+" + commaNumber(Number(ledgerData?.reissue))
                          : ledgerData?.others > "0"
                          ? "+" + commaNumber(Number(ledgerData?.others))
                          : ledgerData?.servicefee > "0"
                          ? "+" + commaNumber(Number(ledgerData?.servicefee))
                          : ""}
                        {""}
                        Tk
                      </td>

                      <td>
                        {commaNumber(ledgerData?.lastAmount) ||
                          "Remaining Balance"}{" "}
                        Tk
                      </td>

                      {/* <td>{ledgerData?.transactionId || "TransactionId"}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>

            {/* mobile and tab table card start here */}

            <Box>
              <Grid
                container
                spacing={2}
                sx={{
                  display: { lg: "none", md: "flex", sm: "flex" },
                }}
              >
                {searchData.map((ledgerDate) => (
                  <Grid item xs={12} sm={6} md={6}>
                    <Box>
                      <Card
                        id="cardWidth"
                        variant="outlined"
                        sx={{
                          minWidth: "320px",
                          border: "none",
                          boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                          marginBottom: "20px",
                        }}
                      >
                        <Box className="traveller-refId">
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
                        </Box>

                        <Box className="traveller-details-card-content">
                          <Box mt={5} className="card-content-id deposit-type">
                            <h4>Transaction ID:{ledgerDate?.transactionId}</h4>
                          </Box>

                          <Box className="traveller-client-staff">
                            <Box className="traveller-card-details deposit-card-details">
                              <h4>Ledger Details</h4>
                              <h5
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "poppins",
                                }}
                              >
                                Transaction Date:{" "}
                                <span
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "poppins",
                                  }}
                                >
                                  {ledgerDate?.dateTime}
                                </span>
                              </h5>
                              <h5>
                                Remaining Balance:{" "}
                                <span>{ledgerDate?.lastAmount} Tk</span>
                              </h5>
                              <h5>
                                Amount:
                                <span>
                                  {ledgerDate?.deposit > "0"
                                    ? ledgerDate?.deposit
                                    : -ledgerDate?.purchase}{" "}
                                  Tk
                                </span>
                              </h5>
                              <h5>
                                Comment:
                                <span>{ledgerDate?.details}</span>
                              </h5>
                            </Box>
                          </Box>
                        </Box>
                      </Card>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* mobile and tab table card end here */}
          </Container>
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
                  width: "40%",
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

export default GeneralLedger;
