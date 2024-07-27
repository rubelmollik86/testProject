import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Pagination,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import { useNavigate } from "react-router-dom";
import { faEarListen } from "@fortawesome/free-solid-svg-icons";
import secureLocalStorage from "react-secure-storage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import format from "date-fns/format";
import Footer from "../../Home/Footer/Footer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#bc6277",
      darker: "#bc6277",
    },
  },
});

function TravelerList() {
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const userData = secureLocalStorage.getItem("UserData");
  const [travelerList, setTravelerList] = useState([]);
  const [search, setSearch] = useState([]);

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  let size = 20;

  // Handle a page function.
  const handlePageChange = (event, value) => {
    setPage(value);
    setSearch(
      travelerList?.User[0].__travelers__?.slice(
        (value - 1) * size,
        value * size
      )
    );
  };

  useEffect(() => {
    const url = `https://flyfarladies-apiv2.appspot.com/user/${userData?.uuid}/mytraveler`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setIsloading(true);
        const count = data?.User[0]?.__travelers__?.length;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
        setTravelerList(data?.User[0]?.__travelers__);
        setSearch(data?.User[0]?.__travelers__);
      });
  }, [userData?.uuid]);

  //  search functionality handle

  const handelSearchItems = (e) => {
    let searchInput = e.target.value;
    if (searchInput !== "") {
      const filterData = travelerList.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setSearch(filterData);
    } else if (searchInput === "") {
      setSearch(travelerList);
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
            My Traveler List
          </Typography>
        </Container>
      </Box>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            my: 2,
          }}
        >
          <Button
            sx={{
              background: "var(--secondary-color)",
              color: "var(--white)",
              borderRadius: "15px",
              "&:hover": {
                backgroundColor: "var(--secondary-color)",
              },
            }}
            onClick={() => navigate("/dashboard/addTraveler")}
          >
            Add Traveller
          </Button>
        </Box>
        <Box>
          <Grid
            container
            spacing={2}
            display="flex"
            justifyContent={"flex-end"}
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
          </Grid>
        </Box>

        <Box className="admin-balance-transaction" marginTop={"20px"}>
          {isLoading === true ? (
            <table>
              <thead>
                <tr>
                  <th>Sl </th>
                  <th>Name </th>
                  <th>Gender</th>
                  <th>Nationality</th>
                  <th>Pax Type</th>
                  <th>DOB</th>
                  <th>Passport Number</th>
                  <th>Passport Ex. Date</th>
                  <th>Attachment</th>
                </tr>
              </thead>
              <>
                {search?.slice(0, size)?.map((data, index) => (
                  <tbody>
                    <tr>
                      <td data-column="Sl No">{index + 1}</td>
                      <td data-column="Name">
                        {data?.FirstName} {data?.LastName}
                      </td>
                      <td data-column="Gender">{data?.Gender}</td>
                      <td data-column="Nationality">{data?.Nationality}</td>
                      <td data-column="Pax Type">{data?.PaxType}</td>
                      <td data-column="DOB">
                        {" "}
                        {format(new Date(data?.DOB), "dd MMM yyyy")}
                      </td>
                      <td data-column="Passport Number">
                        {data?.PassportNumber}
                      </td>
                      <td data-column="Passport Expire Date">
                        {format(
                          new Date(data?.PassportExpireDate),
                          "dd MMM yyyy"
                        )}
                      </td>
                      <td data-column="Attachment">
                        <a href={data?.PassportCopyURL} target="_blank">
                          View
                        </a>
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
}

export default TravelerList;
