import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { BankList } from "./bankData";
import axios from "axios";
import Swal from "sweetalert2";
import bankDetails from "./bankDetails";
import { addDays, format } from "date-fns";
import { Calendar } from "react-date-range";
import { useRef } from "react";
import Stack from "@mui/material/Stack";
import useAuthentication from "../../../hooks/useAuthentication";

function BankTab() {
  const fromBankLists = BankList;
  const toBankList = bankDetails;
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

  const [isLoading, setIsLoading] = useState(false);
  const getUserData = secureLocalStorage.getItem("UserData");
  const navigate = useNavigate();

  const [chequeNumber, setChequeNumber] = useState("");
  const [depositFrom, setDepositFrom] = useState("");
  const [depositTo, setDepositTo] = useState("");

  const [transactionId, setTransactionId] = useState("");
  const [amount, setAmount] = useState("");
  const [chequeattachmenturl, Setchequeattachmenturl] = useState("");

  let formData = new FormData();
  formData.append("ChequeNumber", chequeNumber);
  formData.append("DepositFrom", depositFrom);
  formData.append("DepositTo", depositTo);
  formData.append("ChequeDate", transectionDate);
  formData.append("TransactionId", transactionId);
  formData.append("Amount", amount);
  formData.append("Bankattachmenturl", chequeattachmenturl);
  formData.append("DepositType", "Bank");
  formData.append("uuid", getUserData?.uuid);

  const handleDeposit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const url = `https://flyfarladies-apiv2.appspot.com/user/${getUserData?.uuid}/bank/deposit`;

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
        text: "Please login again",
        confirmButtonText: "ok",
        confirmButtonColor: "var(--primary-color)",
      }).then(() => {
        logout();
      });
    }
  };

  return (
    <Box >
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
                  required
                  type="text"
                  placeholder="Account Number"
                  onChange={(e) => setChequeNumber(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <select
                  required
                  onChange={(e) => setDepositFrom(e.target.value)}
                >
                  <option value="">Select Form Bank</option>
                  {fromBankLists.map((data) => (
                    <option value={data.name}> {data.name} </option>
                  ))}
                </select>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <select required onChange={(e) => setDepositTo(e.target.value)}>
                  <option value="">Select To Bank</option>
                  {toBankList.map((data) => (
                    <option value={data.name}>
                      {data.name} {data.number}
                    </option>
                  ))}
                </select>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <input
                  type="text"
                  placeholder="Transaction ID"
                  required
                  onChange={(e) => setTransactionId(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <input
                  type="number"
                  min={"1"}
                  placeholder="Amount"
                  required
                  onChange={(e) => setAmount(e.target.value)}
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
                  // window.scrollTo({
                  //   top: 200,
                  //   behavior: "smooth",
                  // });
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
                    height: "35px",
                    borderRadius: "3px",
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

export default BankTab;
