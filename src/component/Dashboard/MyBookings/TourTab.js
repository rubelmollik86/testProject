import {
  Box,
  Checkbox,
  Grid,
  Stack,
  Tooltip,
  Typography,
  CircularProgress,
  Modal,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import secureLocalStorage from "react-secure-storage";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";

// tour booking
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 350, md: 400 },
  bgcolor: "white",
  outline: "none",
  p: 4,
  borderRadius: "5px",
};

function TourTab() {
  const getUserData = secureLocalStorage.getItem("UserData");
  const [bookInfo, setBookInfo] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [bookingId, setBookingId] = useState("");
  const navigate = useNavigate();

  const handleOpen = (bookingId) => {
    setBookingId(bookingId);
    setOpen(true);
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const url = `https://flyfarladies-apiv2.appspot.com/booking/${getUserData?.uuid}/getall/mybookings`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data?.statusCode !== 404) {
          setBookInfo(data);
        }
        setIsloading(true);
      });
  }, [getUserData?.uuid]);

  const handleCancelled = () => {
    handleClose(true);
    const url = `https://flyfarladies-apiv2.appspot.com/booking/${bookingId}/cancelled`;
    let body = JSON.stringify({
      uuid: getUserData?.uuid,
      CancelledReason: rejectionReason,
    });

    fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          Swal.fire({
            icon: "success",
            title: data?.status,
            text: data?.message,
            confirmButtonText: "ok",
          }).then(() => {
            navigate(0);
          });
        } else {
          Swal.fire({
            icon: "error",
            title: data?.status,
            text: data?.message,
            confirmButtonText: "ok",
          });
        }
      });
  };

  return (
    <Box sx={{ mb: 20, width: "100%", height: "100%" }}>
      {isLoading === true ? (
        <>
          <Box className="admin-balance-transaction">
            {isLoading === true ? (
              <table>
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Booking Id</th>
                    <th>Status</th>
                    <th>Package Type</th>
                    <th>Package Name</th>
                    <th>Country </th>
                    <th>City</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Duration</th>
                    <th>Package Price</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {bookInfo?.map((data, index) => (
                    <tr>
                      <td data-column="Sl No">{index + 1}</td>
                      <td data-column="Booking Id">
                        {" "}
                        <button
                          style={{
                            background: "var(--home-bg)",
                            padding: "2px 4px",
                            cursor: "pointer",
                            border: "none",
                          }}
                          onClick={() =>
                            navigate("/dashboard/tourbookingconfirm", {
                              state: {
                                data,
                              },
                            })
                          }
                        >
                          {data?.Bookingid}
                        </button>
                      </td>
                      <td
                        data-column="Status"
                        style={{ textTransform: "capitalize" }}
                      >
                        {data?.status}
                      </td>
                      <td data-column="Package Type">
                        {data?.tourPackage?.TripType}
                      </td>
                      <td data-column="Package Name">
                        {data?.tourPackage?.MainTitle}
                      </td>
                      <td data-column="Country">
                        {data?.tourPackage?.Country}
                      </td>
                      <td data-column="City">{data?.tourPackage?.City}</td>
                      <td data-column="Start Date">
                        {format(
                          new Date(data?.tourPackage?.StartDate),
                          "dd MMM yyyy"
                        )}
                      </td>
                      <td data-column="End Date">
                        {format(
                          new Date(data?.tourPackage?.EndDate),
                          "dd MMM yyyy"
                        )}
                      </td>
                      <td data-column="Duration">
                        {data?.tourPackage?.TotalDuration}
                      </td>
                      <td data-column="Package Price">
                        {data?.tourPackage?.Price}
                      </td>
                      <td data-column="Action">
                        {data?.status === "hold" ||
                        data?.status === "issue in process" ? (
                          <CancelIcon
                            sx={{
                              color: "var(--mateBlack)",
                              cursor: "pointer",
                            }}
                            onClick={() => handleOpen(data?.Bookingid)}
                          />
                        ) : (
                          <button
                            style={{
                              backgroundColor: "var(--text-black)",
                              borderRadius: "3px",
                              color: "#fff",
                              padding: "2px 4px",
                              cursor: "pointer",
                              border: "none",
                            }}
                          >
                            {data?.status}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
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

      {/* Modal */}

      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              sx={{
                fontSize: "16px",
                marginBottom: "10px",
              }}
            >
              Rejection Reason
            </Typography>
            <input
              type={"text"}
              style={{
                width: "100%",
                border: "1px solid var(--border-color)",
                height: "40px",
                outline: "none",
                borderRadius: "5px",
                fontSize: "13px",
                padding: "0px 10px",
              }}
              placeholder="Rejection Reason"
              onChange={(e) => setRejectionReason(e.target.value)}
            />

            <Box display={"flex"} justifyContent="center">
              <button
                style={{
                  width: "140px",
                  height: "32px",
                  backgroundColor: "var(--secondary-color)",
                  color: "#fff",
                  border: "none",
                  marginTop: "15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleCancelled()}
              >
                Submit
              </button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default TourTab;
