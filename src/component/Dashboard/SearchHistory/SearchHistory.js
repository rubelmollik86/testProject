import { Box, Button, Container, Grid, Pagination } from "@mui/material";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Loader from "../../../image/loader/Render.gif";
import { useNavigate } from "react-router-dom";
import "./SearchHistory.css";
import secureLocalStorage from "react-secure-storage";
import { Stack } from "@mui/system";
import { format } from "date-fns";
import { addDays } from "date-fns/esm";
import { AiOutlineConsoleSql } from "react-icons/ai";
import NoData from "../../Shared/NoData/NoData";

const SearchHistory = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [allSearchHistory, setAllSearchHistory] = useState([]);
  const [users, setUsers] = useState("");

  // Sets the state of the const for the given page and state.
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  // let size = 20;

  // Handle a page change.
  const handlePageChange = (event, value) => {
    setPage(value);
    // setSearchHistory(allSearchHistory?.slice((value - 1) * size, value * size));
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleSearchBtn = (searchData) => {
    searchData.searchtype === "oneway"
      ? navigate("/dashboard/allflight", {
          state: {
            faddress: searchData?.DepFrom,
            toAddress: searchData?.ArrTo,
            fromSearchText: searchData?.DepAirport,
            toSearchText: searchData?.ArrAirport,
            departureDate:
              new Date(searchData?.depTime) <= new Date()
                ? addDays(new Date(), 1)
                : new Date(searchData?.depTime),
            adultCount: Number(searchData?.adult),
            childCount: Number(searchData?.child),
            infant: Number(searchData?.infant),
            tripType: searchData?.searchtype,
            fromSendData: searchData?.DepFrom,
            toSendData: searchData?.ArrTo,
            className: searchData?.class,
          },
        })
      : navigate("/dashboard/roundtrip", {
          state: {
            faddress: searchData?.DepFrom,
            toAddress: searchData?.ArrTo,
            fromSearchText: searchData.DepAirport,
            toSearchText: searchData.ArrAirport,
            departureDate:
              new Date(searchData?.depTime) <= new Date()
                ? addDays(new Date(), 1)
                : new Date(searchData?.depTime),
            returningDate:
              new Date(searchData?.returnTime) <= new Date()
                ? addDays(new Date(), 3)
                : new Date(searchData?.returnTime),
            adultCount: Number(searchData?.adult),
            childCount: Number(searchData?.child),
            infant: Number(searchData?.infant),
            tripType: searchData?.searchtype,
            fromSendData: searchData?.DepFrom,
            toSendData: searchData?.ArrTo,
            className: searchData?.class,
          },
        });
  };

  useEffect(() => {
    setIsLoaded(false);
    const users = secureLocalStorage.getItem("user-info");
    if (users) {
      setUsers(users);
    }
  }, []);
  let agentID = users?.user?.agentId;

  useEffect(() => {
    setIsLoaded(false);
    fetch(
      `https://api.flyfarint.com/v.1.0.0/SearchHistory/allHistory.php?agentId=${agentID}&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.length > 0) {
          setIsLoaded(true);
          setPageCount(data?.number_of_page);
          setSearchHistory(data?.data);
          setAllSearchHistory(data?.data);
        }
      });
  }, [agentID, page]);

  return (
    <Container sx={{ md: 0 }}>
      <Box mt={{ xs: "0vh", sm: "0vh", md: "2vh", lg: "2vh" }}>
        {!isLoaded && Object.keys(allSearchHistory).length <= 1 ? (
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
        ) : (
          <>
            {Object.keys(searchHistory).length !== 0 ? (
              <Box>
                <Box>
                  <Box className="table-responsive-p">
                    <table className="search-history-table table-responsive-c">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th className="fixed-table-row">Search ID</th>
                          <th>Search Date</th>
                          <th>Type</th>
                          <th colSpan={2}>Route</th>
                          <th>Departure date</th>
                          <th>Arrival Date </th>
                          <th colSpan={3}>Pax</th>
                          <th>Class</th>
                          <th>Search By</th>
                        </tr>

                        <tr>
                          <th></th>
                          <th className="fixed-table-row"></th>
                          <th></th>
                          <th></th>

                          <th
                            style={{
                              backgroundColor: "var(--secondary-color)",
                              width: "60px",
                            }}
                          >
                            From
                          </th>
                          <th
                            style={{
                              backgroundColor: "var(--secondary-color)",
                              width: "60px",
                            }}
                          >
                            To
                          </th>
                          <th></th>
                          <th></th>
                          <th
                            style={{
                              backgroundColor: "var(--secondary-color)",
                            }}
                          >
                            Adult
                          </th>
                          <th
                            style={{
                              backgroundColor: "var(--secondary-color)",
                            }}
                          >
                            Child
                          </th>
                          <th
                            style={{
                              backgroundColor: "var(--secondary-color)",
                            }}
                          >
                            Infant
                          </th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchHistory?.map((search, index) => (
                          <tr key={index}>
                            <td>{(page - 1) * 20 + parseInt(search.serial)}</td>
                            <td className="fixed-table-row">
                              <Button
                                variant="contained"
                                style={{
                                  cursor: "pointer",
                                  padding: "1px 10px",
                                  backgroundColor: "var(--details-text-color)",
                                  color: "var(--blue-text-color",
                                  fontSize: "12px",
                                }}
                                onClick={() => handleSearchBtn(search)}
                              >
                                {search?.searchId}
                              </Button>
                            </td>
                            <td>
                              {format(
                                new Date(search?.searchTime),
                                "dd MMM yy hh:mm a"
                              ) || "Search Date"}
                            </td>
                            <td>
                              {search?.searchtype?.toUpperCase() ||
                                "search Type"}
                            </td>
                            <td>{search?.DepFrom || "From"}</td>
                            <td>{search?.ArrTo || "To"}</td>
                            <td>{search?.depTime || "Departure Date"}</td>
                            <td>{search?.returnTime || "No Date"}</td>
                            <td>{search?.adult || "Adult"}</td>
                            <td>{search?.child || "Child"}</td>
                            <td>{search?.infant || "Infant"}</td>
                            <td>{search?.class || "Class"}</td>
                            <td>{search?.searchBy || "No Record"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Box>
                </Box>
                {Object.keys(allSearchHistory).length > 10 ? (
                  <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box
                        sx={{
                          width: "100%",
                          my: 3,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Stack spacing={2}>
                          <Pagination
                            count={pageCount}
                            onChange={handlePageChange}
                            shape="rounded"
                          />
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>
                ) : null}
              </Box>
            ) : (
              <>
                <NoData />
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default SearchHistory;
