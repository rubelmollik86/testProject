import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Modal,
  Pagination,
  Stack,
  Paper,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import "./TravelersDetails.css";

const TravelersDetails = () => {
  const users = secureLocalStorage.getItem("user-info");
  const agentID = users?.user?.agentId;
  const [travellers, setTravellers] = useState([]);
  const [search, setSearch] = useState([]);
  // todo: pagination handle
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  let size = 20;

  useEffect(() => {
    fetch(
      `https://api.flyfarint.com/v.1.0.0/AirMaterials/AllTraveler.php?search=all&agentId=${agentID}`
    )
      .then((res) => res.json())
      .then((data) => {
        data.map((item, index) => (item.serial = index + 1));
        const count = data.length;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
        setTravellers(data);
        setSearch(data);
      });
  }, [agentID, size]);
  //todo: Handle a page change.
  const handlePageChange = (event, value) => {
    setPage(value);
    setSearch(travellers?.slice((value - 1) * size, value * size));
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  //  todo:search functionality handle
  const handelSearchItems = (e) => {
    let searchInput = e.target.value;
    if (searchInput !== "") {
      const filterData = travellers.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setSearch(filterData);
    } else if (searchInput === "") {
      setSearch(travellers);
    }
  };

  return (
    <div>
      <Box
        mx={{ xs: "2vh", md: "3vh" }}
        mt={{ xs: "0vh", sm: "0vh", md: "2vh", lg: "2vh" }}
        className="travellerDetailsParent"
      >
        <Box className="traveler-search-box">
          <Grid
            className="queues-search-box-flied"
            container
            justifyContent={"space-between"}
            spacing={2}
          >
            <Grid className="queues-input-search" item xs={12} sm={6} md={4}>
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
            <Grid item xs={12} sm={6} md={4} textAlign="end">
              <Link
                to={"/dashboard/manage/travelers"}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="outlined"
                  style={{
                    backgroundColor: "#dc143c",
                    border: "none",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                  startIcon={
                    <FiUserPlus
                      style={{
                        fontSize: "18px",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    />
                  }
                >
                  Add&nbsp;Travelers
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Box className="traveller-details-table">
          <div
            style={{ overflowX: "auto" }}
            className="deposite-tables table-responsive-p"
          >
            <table className="deposite-table css-serial table-responsive-c">
              <tr style={{ textTransform: "uppercase" }}>
                <th colSpan={10}>Travelers Details</th>
              </tr>
              <tr style={{ textTransform: "uppercase" }}>
                <th style={{ backgroundColor: "#DC143C" }}>No.</th>
                <th
                  className="fixed-table-row"
                  style={{ backgroundColor: "#DC143C" }}
                >
                  Name
                </th>
                <th style={{ backgroundColor: "#DC143C" }}> Gender</th>
                <th style={{ backgroundColor: "#DC143C" }}> type</th>
                <th style={{ backgroundColor: "#DC143C" }}>DOB</th>
                <th style={{ backgroundColor: "#DC143C" }}>Nationality</th>
                <th style={{ backgroundColor: "#DC143C" }}>Passport No</th>
                <th style={{ backgroundColor: "#DC143C" }}>
                  Passport Expired Date
                </th>
                <th style={{ backgroundColor: "#DC143C" }}>Email</th>
                <th style={{ backgroundColor: "#DC143C" }}>Phone</th>
              </tr>
              {search?.slice(0, size).map((traveller) => (
                <tbody>
                  <tr>
                    {console.log(traveller)}
                    <td>{traveller?.serial}</td>
                    <td className="fixed-table-row">
                      {traveller?.fName || "Name"} {traveller?.lName}{" "}
                    </td>
                    <td>{traveller?.gender || "gender"}</td>
                    <td>
                      {traveller?.type === "ADT" ? (
                        <>Adult</>
                      ) : traveller?.type === "CNN" ? (
                        <>Child</>
                      ) : (
                        <>Infant</> || "Type"
                      )}
                    </td>
                    <td>
                      {traveller?.dob !== "0000-00-00"
                        ? traveller?.dob
                          ? format(new Date(traveller?.dob), "dd MMM yyyy")
                          : "DOB"
                        : "Invalid Date"}
                    </td>
                    <td>{traveller?.passNation || "Nationality"}</td>
                    <td>{traveller?.passNo || "Passport No"}</td>
                    <td>
                      {traveller?.passEx !== "0000-00-00"
                        ? traveller?.passEx
                          ? format(new Date(traveller?.passEx), "dd MMM yyyy")
                          : "Expire Date"
                        : "Invalid Date"}
                    </td>
                    <td>{traveller?.email || "Email"}</td>
                    <td>{traveller?.phone || "Phone"}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </Box>

        {/* mobile and tab table card start here */}

        {/* <Box className="traveller-details-card ">
          <Grid container spacing={2}>
            {search.map((traveller) => (
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
                    <Box className="traveller-details-card-content">
                      <Box className="traveller-refId">
                        <h4>Reff Id:{traveller?.id || "ID"}</h4>
                      </Box>
                      <Box className="card-content-id">
                        <h4>
                          {traveller?.fName || "Name"} {traveller?.lName}
                        </h4>
                        <span>Type: {traveller?.type || "Type"}</span>
                      </Box>

                      <Box className="traveller-client-staff">
                        <Box className="traveller-card-details">
                          <h4>Personal Details</h4>
                          <h5>
                            Gender: <span>{traveller?.gender || "Gender"}</span>
                          </h5>
                          <h5>
                            Date of Birth:{" "}
                            <span>
                              {traveller?.dob
                                ? format(
                                    new Date(traveller?.dob),
                                    "dd MMM yyyy"
                                  )
                                : "Date of Birth"}
                            </span>
                          </h5>
                          <h5>
                            Nationality: <span>{traveller?.nationality}</span>
                          </h5>
                          <h5>
                            Passport No: <span>{traveller?.passportno}</span>
                          </h5>
                          <h5>
                            Passport Expired Date:{" "}
                            <span>{traveller?.passexpireDate}</span>
                          </h5>
                        </Box>
                        <Box className="traveller-card-details">
                          <h4>Contact Details</h4>
                          <h5>
                            Phone: <span>{traveller?.phone}</span>
                          </h5>
                          <h5>
                            Email: <span>{traveller?.email}</span>
                          </h5>
                          <h5>
                            Address: <span>{traveller?.address}</span>
                          </h5>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box> */}

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

        {/* mobile and tab table card end here */}
      </Box>
    </div>
  );
};

export default TravelersDetails;
