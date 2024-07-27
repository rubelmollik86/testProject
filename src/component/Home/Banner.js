import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import banner from "../../Assets/Ladies/banner.png";
import HomeSearchBox from "../HomeSearchBox/HomeSearchBox";
import butterfly from "../../Assets/Ladies/bodyimage/buttefly.png";

const Banner = () => {
  return (
    <Box>
      {/* <Grid container alignItems="center">
        <Grid item sm={6}>
          <Box>
            <Typography
              sx={{
                fontSize: { xs: 20, sm: 30, md: 47 },
                fontWeight: 500,
                color: "var(--text-color-b)",
              }}
            >
              It's a Big World
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 20, sm: 30, md: 47 },
                fontWeight: 500,
                color: "var(--text-color-b)",
                marginTop: "-10px",
              }}
            >
              Out There{" "}
              <span style={{ color: "var(--secondary-color)" }}>
                Go Explore
              </span>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 12, sm: 14, md: 14 },
                color: "var(--text-color-g)",
              }}
            >
              Placeholder text commonly used to demonstrate the visual form of a
              document or a typeface without relying on meaningful content. may
              be used as a placeholder before the final.
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          sm={6}
          display="flex"
          justifyContent={{ xs: "center", sm: "center", md: "flex-end" }}
          margin="auto"
        >
          <Box sx={{ maxWidth: 350 }}>
            <img src={banner} alt="banner" width="100%" />
          </Box>
        </Grid>
      </Grid> */}
      <Box>
        <Box style={{ textAlign: "center" }}>
          <Box mt={10} mb={1}>
            <Box style={{ position: "relative" }}>
              <Typography
                sx={{
                  fontSize: { xs: 20, sm: 30, md: 47 },
                  fontWeight: 500,
                  color: "var(--text-color-b)",
                }}
              >
                It's a Big World Out There{" "}
                <span
                  style={{
                    color: "var(--secondary-color)",
                  }}
                >
                  Go Explore
                </span>
              </Typography>

              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <img
                  src={butterfly}
                  style={{
                    width: "65px",
                    position: "absolute",
                    top: "-15px",
                    right: "70px",
                  }}
                  alt="img"
                />
              </Box>
            </Box>
          </Box>
          <Typography
            sx={{
              fontSize: { xs: 12, sm: 14, md: 12 },
              color: "var(--text-color-g)",
              width: { md: "69%" },
              margin: "auto",
            }}
            pb={8}
          >
            <em>
              She travels not just to see the world, but to discover the depths
              of her own strength, courage, and resilience. A ladies traveler
              embraces the unknown, finds solace in the unfamiliar, and creates
              her own extraordinary story. With each journey, she redefines
              boundaries, connects with diverse cultures, and leaves a trail of
              inspiration in her wake
            </em>
          </Typography>
        </Box>
      </Box>

      <Box>
        <HomeSearchBox />
      </Box>
    </Box>
  );
};

export default Banner;
