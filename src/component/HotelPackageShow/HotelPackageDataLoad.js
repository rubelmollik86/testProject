import {
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FlightIcon from "@mui/icons-material/Flight";
import Header from "../Header/Header";
import TourPackageShow from "./TourPackageShow";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Home/Footer/Footer";
import { format } from "date-fns";

const TourPackageDataLoad = () => {
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

  console.log(data2[0]?.MainTitle);

  useEffect(() => {
    const url = `https://flyfarladies-apiv2.appspot.com/tourpackage?TripType=${location?.state?.fromSendData}&City=${location?.state?.toSendData}&StartDate=${location?.state?.dtate}`;

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setIsLoaded(true);
        const uniqueData = data;
        const count = uniqueData.length;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
        setData(uniqueData);
        setData2(uniqueData);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Container>
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
              <Box
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  overFlow: "hidden",
                }}
              >
                <Skeleton
                  sx={{ borderRadius: "5px" }}
                  variant="rectangular"
                  width={"100%"}
                  height={"100vh"}
                />
              </Box>
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
                    mb={1.5}
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
                      <Box>
                        <Typography
                          sx={{
                            color: "var(--white)",
                            fontSize: "16px",
                            fontWeight: 500,
                            textTransform: "capitalize",
                          }}
                        >
                          {data2[0]?.MainTitle}
                        </Typography>
                        <Typography
                          sx={{
                            color: "var(--white)",
                            fontSize: "13px",
                            fontWeight: 500,
                          }}
                        >
                          {data2[0]?.StartDate} | {data2[0]?.EndDate}
                        </Typography>
                      </Box>
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
                        // onClick={() => setModifyOpen(!modifyOpen)}
                      >
                        Modify Search
                      </Button>
                    </Box>
                  </Stack>
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
                  {isLoaded
                    ? data2?.slice(0, size).map((data, index) => {
                        return <TourPackageShow tourData={data} />;
                      })
                    : [...new Array(5)].map((data, index) => (
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
                      ))}
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
      </Container>
      <Footer />
    </Box>
  );
};

export default TourPackageDataLoad;
