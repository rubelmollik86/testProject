import { Box, Button, Grid, Stack } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";
import useAuthentication from "../../../hooks/useAuthentication";

function MobileTab() {
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuthentication();
  const getUserData = secureLocalStorage.getItem("UserData");
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [reference, setReference] = useState("");
  const [amount, setAmount] = useState("");
  const [chequeattachmenturl, Setchequeattachmenturl] = useState("");

  const calculatePayAble =
    parseInt(amount) - parseInt(amount) * (parseFloat(1.5) / 100);

  let formData = new FormData();
  formData.append("AgentType", paymentMethod);
  formData.append("AccountNumber", accountNumber);
  formData.append("DepositTo", transactionId);
  formData.append("Reference", reference);
  formData.append("TransactionId", transactionId);
  formData.append("Amount", calculatePayAble);
  formData.append("MobBankattachmenturl", chequeattachmenturl);
  formData.append("DepositType", "MobileBank");
  formData.append("uuid", getUserData?.uuid);

  const handleDeposit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const url = `https://flyfarladies-apiv2.appspot.com/user/${getUserData?.uuid}/mobilebanking/deposit`;
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
                <select
                  required
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="select">Select Payment Method</option>
                  <option value="Bkash">
                    Bkash Merchant (+8801755-543447)
                  </option>
                  <option value="Nexus">Nexus Pay (+8801774-9751647)</option>
                </select>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <input
                  required
                  type="text"
                  placeholder="Pay Using Account Number"
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <input
                  required
                  type="text"
                  placeholder="Transaction ID"
                  onChange={(e) => setTransactionId(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box style={{ marginTop: "5px" }}>
                <input
                  required
                  type="text"
                  placeholder="Reference"
                  onChange={(e) => setReference(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Stack direction="row" spacing={1}>
                <input
                  required
                  type="text"
                  placeholder="Amount"
                  onChange={(e) => setAmount(e.target.value)}
                />
                <input
                  disabled
                  style={{
                    width: "100%",
                    border: "none",
                    background: "var(--input-bgcolor)",
                    height: "35px",
                    fontSize: "12px",
                    color: "var(--text-mateBlack)",
                    padding: "0px 5px",
                    borderRadius: "3px",
                    boxSizing: "border-box",
                  }}
                  required
                  value={"Gateway Fee (1.5%)"}
                  type="text"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <input
                  disabled
                  required
                  type="number"
                  min={"1"}
                  value={calculatePayAble || 0}
                  placeholder="Amount to be Deposited"
                  // onChange={(e) => setAmount(e.target.value)}
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
                  borderRadius: "3px",
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
                {isLoading === true ? "Processing...." : "Send Deposit Request"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
}

export default MobileTab;
