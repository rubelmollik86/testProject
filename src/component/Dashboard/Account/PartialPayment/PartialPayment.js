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
import { AiOutlineSearch } from "react-icons/ai";
import Loader from "../../../../image/loader/Render.gif";
import secureLocalStorage from "react-secure-storage";

const PartialPayment = () => {
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

  const [ledgerDates, setLedgerDate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function ledgerData() {
    await fetch(
      `https://api.flyfarint.com/v.1.0.0/Accounts/ClientLeadger.php?search=all&agentId=${agentID}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLedgerDate(data);
        setShortValue(data);
        // isLoading(true);
      });
  }

  ledgerData();

  //  short functionality handle
  const handleChangeOption = (e) => {
    const optionValue = e.target.value;
    fetchData(optionValue);
  };

  const [shortValues, setShortValue] = useState([]);

  async function fetchData(optionValue) {
    await fetch(
      `https://api.flyfarint.com/v.1.0.0/Accounts/ClientLeadger.php?agentId=${agentID}&search=${optionValue}`
    )
      .then((res) => res.json())
      .then((data) => {
        setShortValue(data);
        isLoading(true);
      });
  }

  //  search funtonality handle

  const handelSearchItems = (e) => {
    let searchInput = e.target.value;

    if (searchInput !== "") {
      const filterData = ledgerDates.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setShortValue(filterData);
    } else if (searchInput === "") {
      setShortValue(ledgerDates);
    }
  };

  return (
    <Box>
      {!isLoading ? (
        <Box className=" general-ledger">
          <Container style={{ padding: "0" }}>
            <h3 style={{ marginTop: "20px" }}>Partial Payment Booking</h3>

            <Box className="queues-search-box">
              <Grid
                className="queues-search-box-flied"
                container
                spacing={2}
                justifyContent="space-between"
              >
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
                <Grid item xs={6} sm={6} md={6}>
                  <Grid container columnSpacing={4} justifyContent="flex-end">
                    <Grid item md={6}>
                      <Typography
                        fontSize="12px"
                        color="#fff"
                        bgcolor="var(--primary-color)"
                        px={1}
                        height="38px"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <span>Total Outstanding </span>
                        <span style={{ fontSize: "20px" }}>BDT 5000</span>
                      </Typography>
                    </Grid>
                    <Grid item md={5}>
                      <Typography
                        fontSize="12px"
                        color="#fff"
                        bgcolor="#DC143C"
                        px={1}
                        height="38px"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <span> Due Today </span>
                        <span style={{ fontSize: "20px" }}>BDT 5000</span>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{
                display: { lg: "block", md: "none", sm: "none", xs: "none" },
              }}
              style={{ overflowX: "auto" }}
              className="deposite-tables"
            >
              <table className="deposite-table css-serial">
                <tr>
                  <th>SL. No</th>
                  <th>Booking PDF</th>
                  <th>Status</th>
                  <th>Action</th>
                  <th>Booking</th>
                  <th>Travel Date</th>
                  <th>Total Amount</th>
                  <th>Paid Amount</th>
                  <th>Due Amount</th>
                  <th>Due Date</th>
                  <th>Settled On</th>
                </tr>

                {/* {shortValues.map((ledgerDate) => (
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ))} */}
              </table>
            </Box>

            {/* mobile and tab table card start here */}

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

export default PartialPayment;
