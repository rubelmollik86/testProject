import { Box, Container, Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { useLocation } from "react-router-dom";
import travelnews from "../../../Assets/Ladies/travelnews.png";
import Header from "../../Header/Header";
import Footer from "../Footer/Footer";

const BlogDetails = () => {
  const location = useLocation();
  const blogDetails = location?.state?.data;

  console.log(blogDetails);
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
            Blog Details
          </Typography>
        </Container>
      </Box>
      <Container>
        <Box mb={25}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={7.5}>
              <Box>
                <img
                  style={{
                    width: "100%",
                    height: "338px",
                    // borderTopLeftRadius: "5px",
                    // borderBottomLeftRadius: "5px",
                  }}
                  src={blogDetails?.blogimages[0]}
                  alt="newsImg"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4.5}>
              <Grid container columnSpacing={1}>
                {blogDetails?.blogimages?.slice(1, 5)?.map((data) => (
                  <Grid item xs={12} sm={6} md={6}>
                    <Box>
                      <img
                        style={{ width: "100%", height: "165px" }}
                        src={data}
                        alt="newsImg"
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Typography
            style={{
              color: "var(--secondary-color)",
              fontSize: "22px",
              fontWeight: "500",
            }}
          >
            {blogDetails?.Title}
          </Typography>
          <Typography
            style={{
              fontSize: "12px",
              color: "var(--text-black)",
              fontWeight: "500",
            }}
          >
            {blogDetails?.WrittenBy},{" "}
            <span style={{ color: "var(--tab-text)" }}>
              {format(new Date(blogDetails?.Date), "dd MMM yyyy hh:mm a")}
            </span>
          </Typography>
          <Typography
            style={{
              color: "var(--text-black)",
              fontSize: "12px",
              textAlign: "justify",
              fontWeight: "500",
            }}
            mt={2}
            dangerouslySetInnerHTML={{ __html: blogDetails?.Description }}
          />
          {/* {blogDetails?.Description}
          </Typography> */}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default BlogDetails;
