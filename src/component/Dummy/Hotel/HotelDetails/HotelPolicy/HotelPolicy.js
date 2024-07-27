import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import PetsIcon from "@mui/icons-material/Pets";

const HotelPolicy = () => {
  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Grid item xs={12} sm={12} md={2}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <CalendarMonthIcon style={{ fontSize: "25px", color: "#235F83" }} />
            <Typography
              style={{
                color: "#222",
                fontSize: "18px",

                gap: "10px",
                lineHeight: "35px",
              }}
            >
              Check In
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Box style={{ display: "flex" }}>
            <Box
              style={{
                width: "100%",
                height: "15px",
                background: "#ccc",
              }}
            ></Box>
            <Box
              style={{
                width: "100%",
                height: "15px",
                background: "tomato",
              }}
            >
              <span
                style={{
                  color: "#ccc",
                  position: "relative",
                  top: "-28px",
                  fontWeight: "400",
                  fontSize: "20px",
                }}
              >
                14.00.00
              </span>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{ display: "flex", alignItems: "center" }}
        style={{ marginTop: "20px" }}
      >
        <Grid item xs={12} sm={12} md={2}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <CalendarMonthIcon style={{ fontSize: "25px", color: "#235F83" }} />
            <Typography
              style={{
                color: "#222",
                fontSize: "18px",

                gap: "10px",
                lineHeight: "35px",
              }}
            >
              Check Out
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Box style={{ display: "flex" }}>
            <Box
              style={{
                width: "100%",
                height: "15px",
                background: "tomato",
              }}
            >
              <span
                style={{
                  color: "#ccc",
                  position: "relative",
                  top: "-28px",
                  fontWeight: "400",
                  fontSize: "20px",
                }}
              >
                14.00.00
              </span>
            </Box>
            <Box
              style={{
                width: "100%",
                height: "15px",
                background: "#ccc",
              }}
            ></Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item sm={12} sx={2} md={2}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <ChildCareIcon style={{ fontSize: "25px", color: "#235F83" }} />
            <Typography
              style={{
                color: "#222",
                fontSize: "18px",
                gap: "10px",
                lineHeight: "35px",
              }}
            >
              Child policy
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={12} sx={2} md={4}>
          <Box style={{ margin: "8px 0px" }}>
            <span
              style={{
                color: "#ccc",
                fontWeight: "400",
                fontSize: "20px",
              }}
            >
              Allowed
            </span>
          </Box>
          <Box>
            <Typography
              style={{
                color: "#22222",
                fontWeight: "400",
                fontSize: "16px",
              }}
            >
              Middle childhood begins at around age 7, approximating primary
              school age. It ends with puberty (around age 12 or 13), which
              typically marks
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item sm={12} sx={2} md={2}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <PetsIcon style={{ fontSize: "25px", color: "#235F83" }} />
            <Typography
              style={{
                color: "#222",
                fontSize: "18px",
                gap: "10px",
                lineHeight: "35px",
              }}
            >
              Pet policy
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={12} sx={2} md={4}>
          <Box style={{ margin: "8px 0px" }}>
            <span
              style={{
                color: "#ccc",
                fontWeight: "400",
                fontSize: "20px",
              }}
            >
              Not Allowed
            </span>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item sm={12} sx={2} md={2}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <PetsIcon style={{ fontSize: "25px", color: "#235F83" }} />
            <Typography
              style={{
                color: "#222",
                fontSize: "18px",
                gap: "10px",
                lineHeight: "35px",
              }}
            >
              House Rules
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={12} sx={2} md={4}>
          <Box style={{ margin: "8px 0px" }}>
            <Typography
              style={{
                color: "#22222",
                fontWeight: "400",
                fontSize: "16px",
              }}
            >
              Middle childhood begins at around age 7, approximating primary
              school age. It ends with puberty (around age 12 or 13), which
              typically marks
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HotelPolicy;
