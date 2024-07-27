import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Header from "../../Header/Header";
import Footer from "../../Home/Footer/Footer";
import blog1 from "../../../image/blog/blog1.png";
import people1 from "../../../image/blog/people.png";

function MyBlogs() {
  return (
    <Box>
      <Container>
        <Header />
      </Container>

      <Box sx={{ bgcolor: "#fff", py: "2vh" }}>
        <Container>
          <Typography
            sx={{
              fontSize: "30px",
              color: "var(--primary-color)",
              fontWeight: 500,
            }}
          >
            My Blog
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md">
        <Box my={2}>
          <Typography
            style={{ fontSize: "17px", color: "var(--primary-color)" }}
          >
            Dashboard{" "}
            <span style={{ color: "var(--secondary-color)" }}>/ BLog</span>
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {[...new Array(8)].map((data, index) => (
            <Grid item xs={12} sm={6} md={4}>
              <Box style={{ background: "#fff", position: "relative" }}>
                <Box>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={blog1}
                    alt="blog"
                  />
                  <Box style={{ position: "absolute", top: "25px" }}>
                    <span
                      style={{
                        background: "var(--tab-text)",
                        padding: "3px 10px",
                        fontSize: "14px",
                        color: "#fff",
                        width: "100px",
                        display: "block",
                      }}
                    >
                      Japan
                    </span>
                  </Box>
                  <Box
                    style={{
                      position: "absolute",
                      bottom: "110px",
                      left: "10px",
                    }}
                  >
                    <Typography style={{ color: "#fff", fontSize: "14px" }}>
                      Dark mode in ui design for mobile Apps: beauty
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "20px 15px",
                  }}
                >
                  <Box>
                    <img style={{ width: "100%" }} src={people1} alt="people" />
                  </Box>
                  <Box>
                    <Typography
                      style={{
                        fontSize: "15px",
                        color: "var(--tab-text)",
                        fontWeight: "500",
                      }}
                    >
                      Mrs. Lana Hoque
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "14px",
                        color: "var(--dark-text-color)",
                        fontWeight: "400",
                      }}
                    >
                      Date : 01 Apr, 2022
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}

export default MyBlogs;
