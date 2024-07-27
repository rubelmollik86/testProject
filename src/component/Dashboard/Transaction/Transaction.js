import { Container } from "@material-ui/core";
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  Pagination,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import secureLocalStorage from "react-secure-storage";
import Header from "../../Header/Header";
// import format from "date-fns/format";
import "./Transaction.css";
import moment from "moment/moment";
import { NavLink } from "react-router-dom";
import Footer from "../../Home/Footer/Footer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#bc6277",
      darker: "#bc6277",
    },
  },
});

function Transaction() {
  const userData = secureLocalStorage.getItem("UserData");
  const [isLoading, setIsloading] = useState(false);
  const [transectionData, setTransectionData] = useState([]);
  const [search, setSearch] = useState([]);

  //  pagination state
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  let size = 15;

  // Handle a page function.
  const handlePageChange = (event, value) => {
    setPage(value);
    setSearch(transectionData.slice((value - 1) * size, value * size));
  };

  //  data fetch from transaction api
  useEffect(() => {
    const url = `https://flyfarladies-apiv2.appspot.com/user/${userData?.uuid}/allDeposit`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setIsloading(true);
        const count = data?.AllDeposit.length;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
        setTransectionData(data?.AllDeposit);
        setSearch(data?.AllDeposit);
      });
  }, [userData?.uuid]);

  //  handle search functionality
  const handelSearchItems = (e) => {
    let searchInput = e.target.value;
    if (searchInput !== "") {
      const filterData = transectionData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setSearch(filterData);
    } else if (searchInput === "") {
      setSearch(transectionData);
    }
  };

  return (
    <Box>
      <Container>
        <Header />
      </Container>
      <Box
        sx={{
          bgcolor: "#fff",
          py: "2vh",
          mb: 5,
          position: "sticky",
          top: "0px",
          zIndex: "999",
        }}
      >
        <Container>
          <Typography
            sx={{
              fontSize: "30px",
              color: "var(--primary-color)",
              fontWeight: 500,
            }}
          >
            Transaction
          </Typography>
        </Container>
      </Box>
      <Container>
        <Box>
          <Grid
            container
            spacing={2}
            display="flex"
            justifyContent={"space-between"}
          >
            <Grid item xs={12} sm={6} md={4}>
              <input
                style={{
                  width: "100%",
                  height: "32px",
                  padding: "0px 10px",
                  background: "var(--white)",
                  border: "none",
                  color: "#22222",
                }}
                type="text"
                placeholder="Search"
                onChange={handelSearchItems}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              display="flex"
              justifyContent={"flex-end"}
            >
              <Box>
                <NavLink to={"/dashboard/myWallet"}>
                  <button
                    style={{
                      cursor: "pointer",
                      border: "none",
                      background: "var(--primary-color)",
                      color: "#fff",
                      borderRadius: "3px",
                      height: "32px",
                      width: "150px",
                    }}
                  >
                    Add Deposit
                  </button>
                </NavLink>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="admin-balance-transaction" marginTop={"20px"}>
          {isLoading ? (
            <table>
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Transaction Date</th>
                  <th>Reject reason</th>
                  <th>Attachment</th>
                </tr>
              </thead>

              <tbody>
                {search?.slice(0, size)?.map((data, index) => (
                  <tr key={index}>
                    <td data-column="Sl No">{index + 1}</td>
                    <td data-column="Status">{data?.status}</td>
                    <td data-column="Type">{data?.DepositType}</td>
                    <td data-column="Amount">{data?.Amount} &#2547;</td>
                    <td data-column="Transaction Date">
                      {moment(data?.CreatedAt.slice(0, 16)).format(
                        "DD MMM YYYY hh:mma"
                      )}
                    </td>
                    <td data-column="Rejection Reason">
                      {data?.rejectionReason !== ""
                        ? data?.rejectionReason
                        : "N/A"}
                    </td>
                    <td data-column="Attachment">
                      <a
                        href={
                          data?.chequeattachmenturl ||
                          data?.Bankattachmenturl ||
                          data?.MobBankattachmenturl
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "30vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Box>

        <Box
          sx={{
            width: "100%",
            my: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ThemeProvider theme={theme}>
            <Stack spacing={2}>
              <Pagination
                count={pageCount}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          </ThemeProvider>
        </Box>
      </Container>
      <Box mt={20}>
        <Footer />
      </Box>
    </Box>
  );
}

export default Transaction;
