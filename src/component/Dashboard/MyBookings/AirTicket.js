import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Grid,
  Stack,
  Tab,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import logo from "../../../Assets/Images/logoo.png";
import CircleIcon from "@mui/icons-material/Circle";
import { IoAirplaneSharp } from "react-icons/io5";
import WorkIcon from "@mui/icons-material/Work";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { format } from "date-fns";
import FairPolicyTab from "./FairPolicyTab";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import moment from "moment/moment";
import commaNumber from "comma-number";

function AirTicket() {
  const userInfo = secureLocalStorage.getItem("UserData");
  const userId = userInfo?.uuid;

  console.log(userId);

  const [airData, setAirData] = useState([]);

  useEffect(() => {
    const url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/B2C/Booking/data.php?agentId=FFA1926&userId=${userId}&all`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAirData(data?.data);
      });
  }, [userId]);

  const [value, setValue] = useState("1");
  const [flightDetails, setFlightDetails] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const sendToQueuesDetails = (data, bookingId) => {
    // alert("Coming soon");

    navigate("/congratulation", {
      state: {
        data,
        bookingId: bookingId,
      },
    });
  };

  return (
    <Box>
      <Box sx={{ mb: 20, width: "100%", height: "100%" }}>
        {isLoading === false ? (
          <>
            <Box className="admin-balance-transaction">
              {isLoading === false ? (
                <table>
                  <tr>
                    <th>Booking Id</th>
                    <th>Status</th>
                    <th>Trip Type</th>
                    <th>Destination</th>
                    <th>Airlines</th>
                    <th>Travel Date</th>
                    <th>PAX</th>
                    <th>Booking Date</th>
                    <th>Price</th>
                  </tr>
                  <tbody>
                    {airData?.map((bookingDetail, index) => (
                      <tr key={index}>
                        <td>
                          <Tooltip
                            title={"Click To See Queues Details"}
                            followCursor
                          >
                            <button
                              style={{
                                backgroundColor: "#d1e9ff",
                                border: "none",
                                cursor: "pointer",
                                padding: "5px 15px",
                                color: "#003566",
                                textDecoration: "underline",
                              }}
                              onClick={() =>
                                sendToQueuesDetails(
                                  bookingDetail,
                                  bookingDetail.bookingId
                                )
                              }
                            >
                              {bookingDetail?.bookingId}
                            </button>
                          </Tooltip>
                        </td>
                        <td>{bookingDetail?.status}</td>
                        <td>{bookingDetail?.tripType}</td>
                        <td>
                          {bookingDetail?.deptFrom}-{bookingDetail?.arriveTo}
                        </td>
                        <td>{bookingDetail?.airlines}</td>
                        <td>{bookingDetail?.travelDate}</td>
                        <td>{bookingDetail?.pax}</td>
                        <td>
                          {moment(new Date(bookingDetail?.bookedAt)).format(
                            "DD MMM YY hh:mm a"
                          )}
                        </td>
                        <td>{commaNumber(bookingDetail?.grossCost)} &#2547;</td>
                      </tr>
                    ))}
                  </tbody>

                  <></>
                </table>
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "30vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
            </Box>
          </>
        ) : (
          <Box style={{ textAlign: "center" }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default AirTicket;
