import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import Swal from "sweetalert2";
import "./MyWallet.css";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { addDays, format } from "date-fns";
import { Calendar } from "react-date-range";
import { useRef } from "react";
import useAuthentication from "../../../hooks/useAuthentication";

function ChequeTab() {
  const [isLoading, setIsLoading] = useState(false);
  const getUserData = secureLocalStorage.getItem("UserData");
  const navigate = useNavigate();
  const { logout } = useAuthentication();
  // date field property
  const now = useRef(new Date());
  const [TravelDate, setTravelDate] = useState(addDays(now.current, 0));

  const transectionDate = TravelDate.toLocaleDateString("sv");

  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const handleSelect = (date) => {
    setTravelDate(date);
    setOpenDate(false);
    setTimeout(() => setOpen(true), 200);
  };

  const [ChequeNumber, SetChequeNumber] = useState("");
  const [BankName, SetBankName] = useState("");
  const [Amount, SetAmount] = useState("");
  const [Reference, SetReference] = useState("");
  const [chequeattachmenturl, Setchequeattachmenturl] = useState("");

  let formData = new FormData();
  formData.append("ChequeNumber", ChequeNumber);
  formData.append("BankName", BankName);
  formData.append("ChequeDate", transectionDate);
  formData.append("Amount", Amount);
  formData.append("Reference", Reference);
  formData.append("chequeattachmenturl", chequeattachmenturl);
  formData.append("DepositType", "Cheque");
  formData.append("uuid", getUserData?.uuid);

  const handleDeposit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const url = `https://flyfarladies-apiv2.appspot.com/user/${getUserData?.uuid}/Add/cheque/deposit`;

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const res = await axios.post(url, formData, config);
      setIsLoading(false);

      if (res?.data?.status === "success") {
        Swal.fire({
          icon: "success",
          title: res?.data?.status,
          text: res?.data?.message,
          confirmButtonText: "ok",
        }).then(function () {
          navigate("/dashboard/transaction");
        });
      } else {
        console.log(res);
        Swal.fire({
          icon: "error",
          title: res?.data?.status,
          text: res?.data?.message,
          confirmButtonText: "ok",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error?.response?.data?.message,
        text: "Please logout and login again",
        confirmButtonText: "ok",
        confirmButtonColor: "var(--primary-color)",
      }).then(() => {
        logout();
      });
    }
  };

  return (
    <Box>
      <form onSubmit={handleDeposit}>
        <Box
          sx={{
            background: "var(--white)",
            borderRadius: "5px",
            mt: 1,
            p: 4,
            input: {
              width: "100%",
              border: "none",
              background: "var(--input-bgcolor)",
              height: "35px",
              fontSize: "12px",
              color: "var(--text-mateBlack)",
              padding: "0px 5px",
              borderRadius: "3px",
              boxSizing: "border-box",
            },
            select: {
              width: "100%",
              border: "none",
              background: "var(--input-bgcolor)",
              height: "35px",
              fontSize: "12px",
              color: "var(--text-mateBlack)",
              padding: "0px 5px",
              borderRadius: "3px",
              boxSizing: "border-box",
            },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <input
                  require
                  type="text"
                  placeholder="Cheque Number"
                  onChange={(e) => SetChequeNumber(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <input
                  require
                  type="text"
                  placeholder="Bank Name"
                  onChange={(e) => SetBankName(e.target.value)}
                />
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                position: "relative",
                height: "50px",
              }}
            >
              <Box
                style={{
                  backgroundColor: "var(--input-bgcolor)",
                  height: "100%",
                  width: "100%",
                  borderRadius: "3px",
                }}
                onClick={() => {
                  setTimeout(() => setOpenDate((prev) => !prev), 200);
                  setOpen(false);
                }}
              >
                <Stack direction="row" alignItems="center" height="100%">
                  {/* <Box>
                    <CalendarMonthIcon style={{ fontSize: "14px" }} />
                  </Box> */}
                  <Box cursor="pointer">
                    <Typography
                      sx={{
                        color: "#808080",
                        fontSize: { xs: "12px", sm: "12px" },
                        padding: "0px 10px",
                      }}
                    >
                      Transaction Date{" "}
                      {`${format(new Date(TravelDate), "dd MMM yy")}`}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              {openDate && (
                <Box
                  sx={{
                    position: "absolute",
                    zIndex: 10,
                    top: "100%",
                    left: { xs: "auto", md: "auto", lg: "18px" },
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.09)",
                  }}
                >
                  <Calendar
                    color="var(--primary-color)"
                    date={new Date(TravelDate)}
                    onChange={handleSelect}
                    months={1}
                    direction="horizontal"
                    minDate={new Date()}
                    style={{
                      fontSize: "11px",
                      padding: "0",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.09)",
                    }}
                  />
                </Box>
              )}
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <input
                  require
                  min={"1"}
                  type="number"
                  placeholder="Amount"
                  onChange={(e) => SetAmount(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <input
                  require
                  type="text"
                  placeholder="Reference"
                  onChange={(e) => SetReference(e.target.value)}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box className="input-File1">
                <input
                  required
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    padding: "8px 10px",
                    boxSizing: "border-box",
                    width: "100%",
                    borderRadius: "3px",
                    height: "35px",
                  }}
                  className="customFileType"
                  type="file"
                  title="Choose a Image png and jpg please"
                  accept="image/*"
                  onChange={(e) => Setchequeattachmenturl(e.target.files[0])}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Button
                sx={{
                  fontFamily: "poppins",
                  fontWeight: "400",
                  height: "35px",
                  fontSize: "13px",
                  textTransform: "capitalize",
                  borderRadius: "2px",
                  background: "#222222",
                  color: "#FFFFFF",
                  width: "100%",
                  mt: "0px",
                  "&:hover": {
                    backgroundColor: "#222222",
                  },
                }}
                type="submit"
              >
                {isLoading === true ? "Processing..." : "Send Deposit Request"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
}

export default ChequeTab;
