import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import commaNumber from "comma-number";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "./AirlinesNameSlider.css";

const AirlinesNameSlider = ({
  filteredData,
  setfilteredData,
  data,
  setData,
}) => {
  const [carearFlight, setCarearFlight] = useState([]);
  const [flightCheckBox, setFlightCheckBox] = useState(false);

  let carearArray = [];
  data.map((name) => {
    carearArray.push(name.careerName, name.career);
    return carearArray;
  });

  let carear = [];

  carearArray.forEach((i) => (carear[i] = false));

  let totalCarear = Object.keys(carear).map((item) => ({
    name: item,
    imgname: item,
  }));

  useEffect(() => {
    setCarearFlight(totalCarear);
  }, []);

  const handleflightCarear = (name) => {
    let updatedflight = data;
    // setFlightCheckBox(name.target.checked);
    if (name) {
      updatedflight = updatedflight.filter((item) => item.careerName === name);
      setfilteredData(updatedflight);
    }
  };

  //shorten the whole Array
  let airlineNames = data.map((item) => {
    return {
      careerName: item.careerName,
      career: item.career,
      clientPrice: item.system !== "Galileo" ? item.clientPrice : item.price,
      isActive: false,
    };
  });
  //sort the Array form higher to lower price
  let sortedAirlineNames = airlineNames.sort(
    (prev, curr) => curr.clientPrice - prev.clientPrice
  );
  //find uniqueAirlineNames form the Array
  let uniqueAirlineNames = [
    ...new Map(
      sortedAirlineNames.map((item) => [item["career"], item])
    ).values(),
  ];

  //find how many duplicate airlines are in the array
  let airlineDuplicateCount = uniqueAirlineNames.reduce((acc, curr) => {
    const str = JSON.stringify(curr.career);
    acc[str] = (acc[str] || 0) + 1;
    return acc;
  }, {});

  // Returns a map of airline names to their unique airline names.
  uniqueAirlineNames.map((item) => {
    for (let count in airlineDuplicateCount) {
      if (item.career === JSON.parse(count)) {
        item.count = airlineDuplicateCount[count];
      }
    }
  });
  const [itemsToShow, setItemsToShow] = useState(5);

  const showmore = () => {
    setItemsToShow(uniqueAirlineNames.length);
  };

  const showless = () => {
    setItemsToShow(5);
  };

  return (
    <Box>
      {uniqueAirlineNames
        .sort((a, b) => a.clientPrice - b.clientPrice)
        .slice(0, itemsToShow)
        .map((item, index) => {
          return (
            <Box width="100%" key={index}>
              <Tooltip title={item.careerName}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox className="box-0" />}
                    checked={flightCheckBox}
                    onChange={() => handleflightCarear(item.careerName)}
                    label={
                      <Typography
                        sx={{
                          color: "var(--primary-color)",
                          fontWeight: 500,
                          fontSize: 13,
                        }}
                      >
                        {item.careerName}
                      </Typography>
                    }
                  />
                </FormGroup>
              </Tooltip>
            </Box>
          );
        })}
      <Box textAlign="end">
        {itemsToShow === 5 ? (
          <button
            style={{
              outline: "none",
              border: "none",
              borderBottom: "2px solid var(--secondary-color)",
              cursor: "pointer",
              padding: "2px",
              background: "transparent",
              fontSize: "10px",
              width: "fit-content",
              color: "var(--primary-color)",
            }}
            onClick={showmore}
          >
            Show More
          </button>
        ) : (
          <button
            style={{
              outline: "none",
              border: "none",
              borderBottom: "2px solid var(--secondary-color)",
              cursor: "pointer",
              padding: "2px",
              background: "transparent",
              fontSize: "10px",
              width: "fit-content",
              color: "var(--primary-color)",
            }}
            onClick={showless}
          >
            Show Less
          </button>
        )}
      </Box>
    </Box>
  );
};

export default AirlinesNameSlider;
