import {
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  Skeleton,
  Stack,
  Typography,
  Collapse,
} from "@mui/material";
import React, { useState } from "react";
import FlightIcon from "@mui/icons-material/Flight";
import Header from "../Header/Header";
import TourPackageShow from "./TourPackageShow";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Home/Footer/Footer";
import { format } from "date-fns";
import Swal from "sweetalert2";
import TourPackageFilter from "./TourPackageFilter";
import TourPackageSearchBox from "../TourPackage/TourPackageSearchBox";

const TourPackageDataLoad = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const [modifyOpen, setModifyOpen] = useState(false);

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  let size = 30;

  // Handle a page change.
  const handlePageChange = (event, value) => {
    setPage(value);
    setData2(data?.slice((value - 1) * size, value * size));
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const dtate = new Date(data2[0]?.StartDate).toLocaleString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const fromdata = location?.state?.fromSendData;

  useEffect(() => {
    const url = `https://flyfarladies-apiv2.appspot.com/tourpackage?TripType=${location?.state?.fromSendData}&City=${location?.state?.toSendData}&StartDate=${location?.state?.dtate}`;

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data?.message !== "Internal server error") {
          setIsLoaded(true);
          const uniqueData = data;
          const count = uniqueData.length;
          const pageNumber = Math.ceil(count / size);
          setPageCount(pageNumber);
          setData(uniqueData);
          setData2(uniqueData);
        } else {
          Swal.fire({
            icon: "Error",
            text: data?.message,
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          }).then(function () {
            navigate("/");
          });
        }
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, [fromdata]);

  return (
    <Box>
      <Container>
        <Box
          sx={{
            mb: {
              xs: 10,
              md: 25,
            },
          }}
        >
          <Header />
          <Grid container columnSpacing={{ lg: 1.5, md: 0, xs: 0 }}>
            <Grid
              item
              lg={2.3}
              sx={{
                display: { xs: "none", md: "none", lg: "flex" },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <TourPackageFilter />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={9.7}
              sx={{
                display: { xs: "flex", md: "flex" },
              }}
            >
              <Box width="100%">
                <Grid container>
                  <Grid xs={12}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      bgcolor="var(--primary-color)"
                      borderRadius="5px"
                      py={1.5}
                      px={2}
                      alignItems="center"
                    >
                      <Stack Stack direction="row" spacing={2}>
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "35px",
                            width: "35px",
                            borderRadius: "50%",
                            backgroundColor: "var(--white)",
                          }}
                        >
                          <FlightIcon
                            sx={{
                              color: "var(--secondary-color)",
                              fontSize: "20px",
                              transform: "rotate(45deg)",
                            }}
                          />
                        </Box>
                        {isLoaded ? (
                          <Box>
                            <Typography
                              sx={{
                                color: "var(--white)",
                                fontSize: "16px",
                                fontWeight: 500,
                                textTransform: "capitalize",
                              }}
                            >
                              {data2[0]?.TripType}

                              {location?.state?.toSendData === "" ? (
                                " "
                              ) : (
                                <> {"& " + data2[0]?.City} </>
                              )}
                            </Typography>
                            <Typography
                              sx={{
                                color: "var(--white)",
                                fontSize: "13px",
                                fontWeight: 500,
                              }}
                            >
                              {dtate !== "Invalid Date" ? dtate : ""}
                            </Typography>
                          </Box>
                        ) : (
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "35px",
                            }}
                          >
                            <Skeleton
                              sx={{ borderRadius: "5px" }}
                              variant="rectangular"
                              width={"100%"}
                              height={"100%"}
                            />
                            <Typography style={{ color: "#fff" }}>
                              Loading...
                            </Typography>
                          </Box>
                        )}
                      </Stack>
                      <Box>
                        <Button
                          size="small"
                          sx={{
                            color: "var(--secondary-color)",
                            bgcolor: "var(--white)",
                            px: 1,
                            py: 0.7,
                            "&:hover": {
                              bgcolor: "var(--white)",
                            },
                          }}
                          onClick={() => setModifyOpen(!modifyOpen)}
                        >
                          Modify Search
                        </Button>
                      </Box>
                    </Stack>

                    <Box
                      pt={modifyOpen === true ? 1 : 0}
                      pb={modifyOpen === true ? 2 : 0}
                      mb={modifyOpen === true ? 3 : 1.5}
                      bgcolor="#fff"
                      borderRadius="0px 0px 10px 10px"
                    >
                      <Collapse
                        in={modifyOpen}
                        timeout="auto"
                        unmountOnExit
                        sx={{ width: "100%" }}
                      >
                        <TourPackageSearchBox />
                      </Collapse>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    sx={{
                      height: "fit-content",
                    }}
                  >
                    {isLoaded ? (
                      <>
                        {data2?.length !== 0 ? (
                          <>
                            {data2?.slice(0, size).map((data, index) => {
                              return <TourPackageShow tourData={data} />;
                            })}
                          </>
                        ) : (
                          "Package Not Available"
                        )}
                      </>
                    ) : (
                      [...new Array(5)].map((data, index) => (
                        <Box
                          key={index}
                          style={{
                            width: "100%",
                            height: "150px",
                            margin: "10px 0px",
                            borderRadius: "5px",
                            overFlow: "hidden",
                          }}
                        >
                          <Skeleton
                            sx={{ borderRadius: "5px" }}
                            variant="rectangular"
                            width={"100%"}
                            height={"100%"}
                          />
                        </Box>
                      ))
                    )}
                  </Grid>
                  {isLoaded ? (
                    <Grid item lg={12} md={12} sm={12} xs={12} width="100%">
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        width="100%"
                      >
                        {/* <Box width="100%">
                        <hr />
                      </Box> */}
                        <Box
                          width="100%"
                          display="flex"
                          justifyContent="flex-end"
                          className="pagination-select"
                        >
                          <Stack spacing={2}>
                            <Pagination
                              count={pageCount}
                              onChange={handlePageChange}
                              shape="circle"
                              style={{
                                color: "#ffF",
                              }}
                            />
                          </Stack>
                        </Box>
                      </Stack>
                    </Grid>
                  ) : (
                    <Box
                      style={{
                        width: "100%",
                        height: "50px",
                        margin: "10px 0px",
                        borderRadius: "5px",
                        overFlow: "hidden",
                      }}
                    >
                      <Skeleton
                        sx={{ borderRadius: "5px" }}
                        variant="rectangular"
                        width={"100%"}
                        height={"100%"}
                      />
                    </Box>
                  )}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default TourPackageDataLoad;
