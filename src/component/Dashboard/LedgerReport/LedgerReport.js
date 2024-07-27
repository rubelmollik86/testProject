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
import format from "date-fns/format";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../Home/Footer/Footer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#bc6277",
      darker: "#bc6277",
    },
  },
});

const LedgerReport = () => {
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const userData = secureLocalStorage.getItem("UserData");
  const [ledgerReport, setLedgerReport] = useState([]);
  const [search, setSearch] = useState([]);

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  let size = 20;

  // Handle a page function.
  const handlePageChange = (event, value) => {
    setPage(value);
    setSearch(
      ledgerReport?.User[0].__travelers__?.slice(
        (value - 1) * size,
        value * size
      )
    );
  };

  useEffect(() => {
    const url = `https://flyfarladies-apiv2.appspot.com/ledger/${userData?.uuid}/userledger`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsloading(true);
        if (data?.statusCode !== 400) {
          const count = data?.length;
          const pageNumber = Math.ceil(count / size);
          setPageCount(pageNumber);
          setLedgerReport(data);
          setSearch(data);
        } else {
          console.log("error");
        }
      });
  }, [userData?.uuid]);

  //  search functionality handle

  const handelSearchItems = (e) => {
    let searchInput = e.target.value;
    if (searchInput !== "") {
      const filterData = ledgerReport.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setSearch(filterData);
    } else if (searchInput === "") {
      setSearch(ledgerReport);
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
            Ledger Report
          </Typography>
        </Container>
      </Box>
      <Container>
        <Box>
          <Grid container spacing={2} display="flex">
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
          </Grid>
        </Box>
        <Box className="admin-balance-transaction" marginTop={"20px"}>
          {isLoading ? (
            <table>
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Reference</th>
                  <th>Transaction Type</th>
                  <th>Transaction Date</th>
                  <th>Transaction Details</th>
                  <th>Transaction Amount</th>
                  <th>Remaining Balance</th>
                </tr>
              </thead>
              <>
                {search?.slice(0, size)?.map((data, index) => (
                  <tbody>
                    <tr key={index}>
                      <td data-column="Sl No">{index + 1}</td>
                      <td data-column="Reference"> AAAAAAAAAAAA</td>
                      <td data-column="Transaction Type">
                        {data?.DepositType}
                      </td>
                      <td data-column="Transaction Date">
                        {" "}
                        {/* {format(new Date(data?.ChequeDate), "dd MMM yyyy")} */}
                      </td>
                      <td data-column="Transaction Detail">HDGHGHDGHDGHDG</td>
                      <td data-column="Transaction Amount">{data?.Amount}</td>
                      <td data-column="Remaining Balance">
                        {data?.DepositType}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </>
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
      <Box mt={25}>
        <Footer />
      </Box>
    </Box>
  );
};

export default LedgerReport;
