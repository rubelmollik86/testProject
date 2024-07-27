import { Box, Container } from "@mui/system";
import React from "react";
import Button from "@mui/material/Button";
import banner1 from "../../image/Landing-page-1.jpg";
import banner2 from "../../image/Landing-page-2.jpg";
import banner3 from "../../image/Landing-page-3.jpg";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { BsSearch } from "react-icons/bs";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "./Banner.css";
// Import Swiper styles;
import "swiper/css";
// import required modules
import { Autoplay } from "swiper";

const bgbanner1 = {
  backgroundImage: `url(${banner1})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "10px",
  overflowY: "hidden",
};
const bgbanner2 = {
  backgroundImage: `url(${banner2})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "10px",
  overflowY: "hidden",
};
const bgbanner3 = {
  backgroundImage: `url(${banner3})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "10px",
  overflowY: "hidden",
};

const Banner = () => {
  return (
    <Box>
      {/* banner page start */}

      <Container style={{ padding: "0" }}>
        <Swiper
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {/* slide page 1 */}
          <SwiperSlide>
            <section style={bgbanner1}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box className="banner_content">
                    <h1>
                      One Platform,All <br></br> Travel Solutions.
                    </h1>
                    <p>
                      Bangladesh’s most comprehensive B2B portal for You. In
                      publishing and graphic design, Lorem ipsum is a
                      placeholder text commonly used to demonstrate the visual
                      form of a document or a typeface without relying on.
                    </p>
                    <Box className="banner_btn">
                      <Button variant="contained">
                        Register now as a Agent
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </section>
          </SwiperSlide>
          {/* slide page 2 */}
          <SwiperSlide>
            <section style={bgbanner2}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box className="banner_content">
                    <h1>
                      One Platform,All <br></br> Travel Solutions.
                    </h1>
                    <p>
                      Bangladesh’s most comprehensive B2B portal for You. In
                      publishing and graphic design, Lorem ipsum is a
                      placeholder text commonly used to demonstrate the visual
                      form of a document or a typeface without relying on.
                    </p>
                    <Box className="banner_btn">
                      <Button variant="contained">
                        Register now as a Agent
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </section>
          </SwiperSlide>
          {/* slide page 3 */}
          <SwiperSlide>
            <section style={bgbanner3}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box className="banner_content">
                    <h1>
                      One Platform,All <br></br> Travel Solutions.
                    </h1>
                    <p>
                      Bangladesh’s most comprehensive B2B portal for You. In
                      publishing and graphic design, Lorem ipsum is a
                      placeholder text commonly used to demonstrate the visual
                      form of a document or a typeface without relying on.
                    </p>
                    <Box className="banner_btn">
                      <Button variant="contained">
                        Register now as a Agent
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </section>
          </SwiperSlide>
        </Swiper>

        {/* banner form start  */}

        <section className="banner-form">
          <Box className="round-trip">
            <div>
              <h4>One Way</h4>
            </div>
            <div className="roundTrip" style={{ paddingTop: "1px" }}>
              <span>Round trip</span>
            </div>
            <div>
              <h4>Multi-City</h4>
            </div>
          </Box>

          <Box className="banner-form-parent ">
            <Grid
              className="banner-form-content banner-dfex "
              container
              spacing={2}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Grid item xs={12} sm={6} md={2}>
                <label>From</label>

                {/* <TextField
                  sx={{
                    borderBottom: "2px solid var(--primary-color)",
                    width: "100%",
                  }}
                  disabled
                  id="standard-basic"
                  variant="standard"
                /> */}

                <input
                  disabled
                  id="customInput"
                  style={{
                    border: "none",
                    borderBottom: "2px solid var(--primary-color)",
                    width: "100%",
                    paddingTop: "15px",
                  }}
                  type="text"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <label>To</label>

                {/* <TextField
                  sx={{ borderBottom: "2px solid var(--primary-color)", width: "100%" }}
                  disabled
                  id="standard-basic"
                  variant="standard"
                /> */}

                <input
                  id="customInput"
                  disabled
                  style={{
                    border: "none",
                    borderBottom: "2px solid var(--primary-color)",
                    width: "100%",
                    paddingTop: "15px",
                  }}
                  type="text"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <label>Departure Date</label>
                {/* <TextField
                  sx={{ borderBottom: "2px solid var(--primary-color)", width: "100%" }}
                  disabled
                  id="standard-basic"
                  variant="standard"
                /> */}

                <input
                  id="customInput"
                  disabled
                  style={{
                    border: "none",
                    borderBottom: "2px solid var(--primary-color)",
                    width: "100%",
                    paddingTop: "15px",
                  }}
                  type="text"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <label>Returning Date</label>
                {/* <TextField
                  sx={{ borderBottom: "2px solid var(--primary-color)", width: "100%" }}
                  disabled
                  id="standard-basic"
                  variant="standard"
                /> */}

                <input
                  id="customInput"
                  disabled
                  style={{
                    border: "none",
                    borderBottom: "2px solid var(--primary-color)",
                    width: "100%",
                    paddingTop: "15px",
                  }}
                  type="text"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Box>
                  <label>Passenger & Class</label>
                  {/* <TextField
                  sx={{ borderBottom: "2px solid var(--primary-color)", width: "100%" }}
                  disabled
                  id="standard-basic"
                  variant="standard"
                /> */}
                  <input
                    id="customInput"
                    disabled
                    style={{
                      border: "none",
                      borderBottom: "2px solid var(--primary-color)",
                      width: "100% ",
                      paddingTop: "15px",
                    }}
                    type="text"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </section>

        <Box className="fight-btn" id="fight-btn">
          <Button variant="contained">
            {" "}
            <BsSearch /> <span>Search Fight</span>
          </Button>
        </Box>

        {/* banner form end  */}
      </Container>

      {/* banner page end */}
    </Box>
  );
};

export default Banner;
