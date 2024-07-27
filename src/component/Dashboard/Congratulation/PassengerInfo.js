import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { format } from "date-fns";
import fakeData from "../FlightBookingOneway/FlightInformationOneWayData/fakeData";

import PassengerFakeData from "./PassengerFakeData";

const PassengerInfo = ({ allData }) => {
  const passengerInfo = allData?.passenger;
  return (
    <Box mt={2}>
      <Typography sx={{ fontSize: "21px", fontWeight: "500", my: 2 }}>
        Passenger Information
      </Typography>
      <Box sx={{ background: "#ffffff", px: 2, py: 3 }}>
        <Box className="admin-balance-transaction" marginTop={"10px"}>
          <table>
            <tr>
              <th>Name </th>
              <th>Nationality </th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Pax Type</th>
              <th>Passport No</th>
              <th>Expire Date</th>
            </tr>
            {passengerInfo?.map((data) => (
              <tbody>
                <tr>
                  <td>
                    {data?.fName} {data?.lName}
                  </td>
                  <td>{data?.passNation}</td>
                  <td>{data?.gender}</td>
                  <td>{data?.dob}</td>
                  <td>{data?.type}</td>
                  <td>{data?.passNo}</td>
                  <td>{data?.passEx}</td>
                  {/* <td>
                    <a href="#"></a>
                  </td> */}
                  {/* <td></td> */}
                </tr>
              </tbody>
            ))}
          </table>
        </Box>
      </Box>
    </Box>
  );
};

export default PassengerInfo;
