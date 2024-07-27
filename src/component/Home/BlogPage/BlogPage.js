import { Avatar, Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import travelnews from "../../../Assets/Ladies/ourblogs.png";
import ourblogs from "../../../Assets/Ladies/ourblogs.png";
import Header from "../../Header/Header";
import format from "date-fns/format";
import Footer from "../Footer/Footer";

const BlogPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const blogData = location?.state?.data;

  return (
    <Box>
      <Container>
        <Header />
      </Container>
      <Box
        sx={{
          bgcolor: "var(--white)",
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
            Our BLog
          </Typography>
        </Container>
      </Box>
      <Container style={{ marginBottom: "150px" }}>
        <Grid container spacing={2}>
          {blogData.map((data) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate("/blogdetails", {
                  state: {
                    data,
                  },
                })
              }
            >
              <Box
                sx={{
                  borderRadius: "5px",
                  background: "var(--white)",
                  overflow: "hidden",
                }}
              >
                <Box className="image-auto-resize" position="relative">
                  <img
                    src={data?.blogimages[0]}
                    alt="ourblogs"
                    style={{
                      width: "100%",
                      height: "270px",
                    }}
                  />
                  <Typography
                    sx={{
                      color: "var(--white)",
                      bgcolor: "var(--tab-text)",
                      fontSize: 12,
                      position: "absolute",
                      top: "10%",
                      px: 2,
                      py: 0.7,
                    }}
                  >
                    {data?.Blogfor}
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--white)",
                      fontSize: 12,
                      position: "absolute",
                      bottom: "10%",
                      px: 2,
                    }}
                  >
                    {data?.Title}
                  </Typography>
                </Box>

                <Stack direction={"row"} spacing={1} px={1.5} py={1}>
                  <Typography
                    sx={{
                      color: "var(--tab-text)",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    {data?.WrittenBy} <br />
                    <span style={{ color: "var(--text-color-b)" }}>
                      Date: {format(new Date(data?.Date), "dd MMM yyyy hh:mm")}
                    </span>
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default BlogPage;
