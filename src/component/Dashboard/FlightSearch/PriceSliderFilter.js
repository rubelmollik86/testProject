import React, { useState, useEffect, useRef } from "react";
import { Container } from "@mui/system";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Slider from "@mui/material/Slider";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbTwilightOutlinedIcon from "@mui/icons-material/WbTwilightOutlined";
import { AiFillCaretDown } from "react-icons/ai";
import {
  Box,
  Checkbox,
  Grid,
  MenuItem,
  Button,
  FormGroup,
  FormControl,
  FormControlLabel,
  Select,
  Typography,
  Drawer,
} from "@mui/material";

const PriceSliderFilter = ({
  filteredData,
  setfilteredData,
  data,
  setData,
}) => {
  let arr = [];

  let flightprice = data;
  flightprice.map((data) => {
    arr.push(data.price);
    return arr;
  });
  const maxPrice = Math.max(...arr);
  const minPrice = Math.min(...arr);
  const [selectPrice, setSelectPrice] = useState([minPrice, maxPrice]);
  const handleChangePrice = (event, value) => {
    setSelectPrice(value);
  };

  const applyFilters = () => {
    let updatedflight = data;
    const selectMinPrice = selectPrice[0];
    const selectMaxPrice = selectPrice[1];

    if (selectPrice) {
      updatedflight = updatedflight.filter(
        (item) => item.price >= selectMinPrice && item.price <= selectMaxPrice
      );
    }
    setfilteredData(updatedflight);
  };

  useEffect(() => {
    applyFilters();
  }, [selectPrice]);
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Grid item className="price-slider-line">
          <Slider
            value={selectPrice}
            onChange={handleChangePrice}
            valueLabelDisplay="auto"
            min={minPrice}
            max={minPrice}
          />
        </Grid>
        <Grid container justifyContent={"space-between"}>
          <Typography
            sx={{
              color: "#000",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            ৳ {minPrice}
          </Typography>
          <Typography
            sx={{
              color: "#000",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            {" "}
            ৳ {maxPrice}
          </Typography>
        </Grid>
      </Box>
    </div>
  );
};

export default PriceSliderFilter;
