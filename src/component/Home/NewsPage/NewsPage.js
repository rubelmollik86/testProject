import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import travelnews from "../../../Assets/Ladies/travelnews.png";
import Header from "../../Header/Header";
import format from "date-fns/format";
import Footer from "../Footer/Footer";
import ReactHtmlParser from "react-html-parser";
const NewsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const newsData = location?.state?.data;

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
            Travel News
          </Typography>
        </Container>
      </Box>

      <Container>
        <Box mb={20}>
          <Grid container spacing={2}>
            {newsData?.map((data, index) => (
              <Grid
                sx={{ cursor: "pointer" }}
                key={index}
                item
                xs={12}
                sm={6}
                md={6}
                onClick={() =>
                  navigate("/newsdetails", {
                    state: {
                      data,
                    },
                  })
                }
              >
                <Stack
                  direction={"row"}
                  spacing={1}
                  sx={{
                    bgcolor: "var(--white)",
                    borderRadius: "5px",
                    maxHeight: "160px",
                  }}
                >
                  <Box className="image-auto-resize">
                    <img
                      src={data?.blogimages[0]}
                      alt="travel"
                      style={{
                        borderRadius: "5px",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Box>
                  <Box p={1.5}>
                    <Typography
                      sx={{
                        color: "var(--tab-text)",
                        fontSize: { xs: 12, sm: 15 },
                        mb: 1,
                      }}
                    >
                      {data?.Title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--text-color-g)",
                        fontSize: { xs: 10, sm: 12 },
                        mb: 1,
                      }}
                    >
                      {ReactHtmlParser(data?.Description.slice(0, 72))}{" "}
                      {/* {data?.Description.slice(0, 72)}{" "} */}
                      <button
                        style={{
                          color: "var(--primary-color)",
                          border: "none",
                          backgroundColor: "var(--white)",
                          cursor: "pointer",
                        }}
                      >
                        learn more
                      </button>
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: 13,
                        mb: 1.5,
                        fontWeight: 500,
                      }}
                    >
                      Date:{" "}
                      {format(new Date(data?.Date), "dd MMM yyyy hh:mm a")}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default NewsPage;
