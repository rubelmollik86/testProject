import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
const AirLineName = ({ code }) => {
  const [flightName, setFlightName] = useState({});
  useEffect(() => {
    fetch(
      `https://api.flyfarint.com/v.1.0.0/AirMaterials/Airlines.php?search=${code}`
    )
      .then((res) => res.json())
      .then((data) => setFlightName(data));
  }, []);
  return <Box>{flightName[0]?.name}</Box>;
};

export default AirLineName;
