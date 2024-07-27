import React, { useState } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import founder from "../../Assets/Ladies/founder.png";
import founder2 from "../../Assets/Ladies/banner.png";
import buttefly from "../../Assets/Ladies/bodyimage/buttefly.png";

import comma from "../../Assets/Ladies/comma.png";

const FounderMessage = () => {
  const text = `I am thrilled to address you today as the founder of our female-led travel agency. It is with immense pride and joy that 
  I share this message with each and every one of you who has been part of our journey.
  When I embarked on this endeavor, I had a vision to create a space that celebrates the spirit of exploration, empowerment, and connection
  among women. Today, I stand before you, humbled by the incredible support and dedication that has shaped our agency into what it is today.
  Travel is more than just visiting new places; it is an opportunity for personal growth, cultural exchange, and building lifelong memories.
  At our agency, we strive to create tailored experiences that cater to the unique needs and desires of our female travelers. We believe that
  women deserve a safe and inclusive environment to discover the world, where their voices are heard, and their dreams are embraced.`;
  const [showMore, setShowMore] = useState(false);

  return (
    <Box mt={{ xs: 15, sm: 25 }} mb={10}>
      <Box>
        <Grid
          container
          spacing={0}
          columnGap={6}
          sx={{
            backgroundColor: "#fff",
            height: { xs: "390px", md: "320px" },
            position: "relative",
            borderRadius: "5px",
          }}
        >
          <Grid item xs={12} md={2}>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <img
                src={founder}
                style={{
                  width: "260px",
                  position: "absolute",
                  bottom: "0px",
                  left: "10px",
                }}
                alt="founder-img"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ padding: { xs: "10px", md: "0px" } }}>
              <Box mt={5}>
                <Box sx={{ position: "relative", width: "fit-content" }}>
                  <Typography
                    sx={{
                      fontSize: { xs: 20, sm: 25, md: 25 },
                      fontWeight: 500,
                      color: "var(--text-black)",
                      my: { xs: 2, sm: 2, md: 2 },
                    }}
                  >
                    Founder's <span style={{ color: "#ED6274" }}>Message</span>
                  </Typography>

                  <img
                    style={{
                      width: "50px",
                      position: "absolute",
                      transform: " matrix(-0.99, 0.16, 0.16, 0.99, 0, 0)",
                      right: "-50px",
                      top: "-20px",
                    }}
                    src={buttefly}
                    alt="butterfly"
                  />
                </Box>

                <Typography
                  sx={{
                    fontSize: { xs: 10, sm: 10, md: 13 },
                    textAlign: "justify",
                    color: "var(--text-black)",
                  }}
                >
                  I am thrilled to address you today as the founder of our
                  female-led travel agency. It is with immense pride and joy
                  that I share this message with each and every one of you who
                  has been part of our journey. When I embarked on this
                  endeavor, I had a vision to create a space that celebrates the
                  spirit of exploration, empowerment, and connection among
                  women. Today, I stand before you, humbled by the incredible
                  support and dedication that has shaped our agency into what it
                  is today. Travel is more than just visiting new places; it is
                  an opportunity for personal growth, cultural exchange, and
                  building lifelong memories. At our agency, we strive to create
                  tailored experiences that cater to the unique needs and
                  desires of our female travelers. We believe that women deserve
                  a safe and inclusive environment to discover the world, where
                  their voices are heard, and their dreams are embraced.
                </Typography>
              </Box>

              <Box style={{ textAlign: "right" }} mt={2}>
                <Typography
                  sx={{
                    color: "#252733",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  Nusrat Jahan
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#7D7B7B",
                  }}
                >
                  Founder & CEO
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* <Grid container columnSpacing={2} alignItems="start">
        <Grid item xs={12} sm={8} order={{ xs: 2, sm: 2, md: 1 }}>
          <Typography
            sx={{
              color: "var(--text-color-g)",
              fontSize: 14,
              textAlign: "justify",
              "@media (min-width: 900px)": {
                display: "none",
              },
            }}
          >
            <img src={comma} alt="icon" />
            <img src={comma} alt="icon" />
            {showMore ? text : `${text.substring(0, 400)}`}
            <img
              src={comma}
              alt="icon"
              style={{ transform: "rotate(180deg)", width: "6px" }}
            />
            <img
              src={comma}
              alt="icon"
              style={{ transform: "rotate(180deg)", width: "6px" }}
            />
            &nbsp;
            <button
              style={{ border: "none" }}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "view less" : "view more"}
            </button>
          </Typography>

          <Typography
            sx={{
              color: "var(--text-color-g)",
              fontSize: 14,
              textAlign: "justify",
              "@media (max-width: 899px)": {
                display: "none",
              },
            }}
          >
            <img src={comma} alt="icon" style={{ width: "6px" }} />
            <img src={comma} alt="icon" style={{ width: "6px" }} />

            {text}
            <img
              src={comma}
              alt="icon"
              style={{ transform: "rotate(180deg)", width: "6px" }}
            />
            <img
              src={comma}
              alt="icon"
              style={{ transform: "rotate(180deg)", width: "6px" }}
            />
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}
          display="flex"
          justifyContent={{ xs: "center", md: "flex-end" }}
          order={{ xs: 1, sm: 1, md: 2 }}
        >
          <Box>
            <img src={founder} alt="banner" width="100%" height="100%" />
          </Box>
        </Grid>
      </Grid> */}
    </Box>
  );
};

export default FounderMessage;
