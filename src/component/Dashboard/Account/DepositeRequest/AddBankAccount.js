import React, { useEffect, useState } from "react";
import { Box, Tab, Button, Grid, Typography, Modal } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";

import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";
import Loader from "../../../../image/loader/Render.gif";
import addAccount from "../../../../image/undraw/undraw_credit_card_re_blml.svg";
import invalidInfo from "../../../../image/undraw/undraw_warning_re_eoyh.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const AddBankAccount = () => {
  const navigate = useNavigate();
  // const users = JSON.parse(sessionStorage.getItem("user-info"));
  const users = secureLocalStorage.getItem("user-info");
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  let size = 20;
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState("1");
  const [transectionValue, setTransectionValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeTransection = (event, newValue) => {
    setTransectionValue(newValue);
  };
  // const handlePageChange = (event, value) => {
  //   setPage(value);
  //   setSearch(depositDatas?.slice((value - 1) * size, value * size));
  //   window.scrollTo(0, 0);
  // };
  const [startDate, setStartDate] = useState(null);
  // const handlePageChange = (event, value) => {
  //   setPage(value);
  //   setSearch(depositDatas?.slice((value - 1) * size, value * size));
  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  // };
  // payment method data select function

  let agentId = users?.user?.agentId;
  let staffId = users?.user?.staffId;

  // payment input data post
  const [bankname, setBankname] = useState("");
  const [accname, setAccName] = useState("");
  const [accno, setAccno] = useState("");
  const [branch, setBranch] = useState("");
  const [swift, setSwift] = useState("");
  const [routing, setRouting] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    setIsLoading(false);
    e.preventDefault();
    let body = JSON.stringify({
      agentId,
      bankname,
      accname,
      accno,
      branch,
      swift,
      routing,
      address,
    });

    await fetch(
      "https://api.flyfarint.com/v.1.0.0/Deposit/addBank.php",

      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          Swal.fire({
            // icon: "success",
            // imageUrl: addAccount,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Bank Account Add Successfully !",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(function () {
            navigate("/dashboard/account/DepositEntry");
          });
        } else {
          Swal.fire({
            // icon: "success",
            imageUrl: invalidInfo,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            text: "Invalid Information",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(function () {
            navigate("/dashboard/account/bank");
          });
        }
      });

    e.target.reset();
  };

  return (
    <Box
      className="depositParent1"
      mx={{ xs: "2vh", md: "3vh" }}
      mt={{ xs: "0vh", sm: "0vh", md: "2vh", lg: "2vh" }}
    >
      <Typography color="#003356" fontSize="24px" fontWeight={600}>
        Bank Account
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          className=" deposite-input-content"
          style={{ overflowX: "auto", marginTop: "25px" }}
        >
          <Grid className="input-parent" container spacing={2}>
            <Grid className="input-child-0" item xs={12} sm={6} md={4} lg={4}>
              <input
                type="text"
                name="name"
                placeholder="Account Holder Name"
                required
                onChange={(e) => setAccName(e.target.value)}
              />
            </Grid>
            <Grid className="input-child-0" item xs={12} sm={6} md={4} lg={4}>
              <input
                type="text"
                name="bankname"
                placeholder="Bank Name"
                required
                onChange={(e) => setBankname(e.target.value)}
              />
            </Grid>
            <Grid className="input-child-0" item xs={12} sm={6} md={4} lg={4}>
              <input
                type="number"
                name="number"
                placeholder="Account Number"
                required
                onChange={(e) => setAccno(e.target.value)}
              />
            </Grid>
            <Grid className="input-child-0" item xs={12} sm={6} md={4} lg={4}>
              <input
                type="text"
                name="banbranch"
                placeholder="Branch Name"
                required
                onChange={(e) => setBranch(e.target.value)}
              />
            </Grid>
            <Grid className="input-child-0" item xs={12} sm={6} md={4} lg={4}>
              <input
                type="text"
                name="address"
                placeholder="Address"
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid className="input-child-0" item xs={12} sm={6} md={4} lg={4}>
              <input
                type="text"
                name="routing"
                placeholder="Routing number (optional)"
                onChange={(e) => setRouting(e.target.value)}
              />
            </Grid>

            <Grid className="input-child-0" item xs={12} sm={6} md={4} lg={4}>
              <input
                type="text"
                name="swift"
                placeholder="Swift Code (optional)"
                onChange={(e) => setSwift(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
        <Box textAlign={"end"}>
          <button
            type="submit"
            variant="contained"
            style={{
              marginLeft: "30px",
              cursor: "pointer",
              outline: "none",
              border: "0px",
              backgroundColor: "var(--primary-color)",
              padding: "8px 30px",
              color: "#fff",
            }}
          >
            Save
          </button>
          {/* <button
                      style={{
                        backgroundColor: "var(--gray-text-color)",
                        marginLeft: "30px",
                        cursor: "pointer",
                        outline: "none",
                        border: "0px",
                        padding: "8px 20px",
                        color: "#fff",
                      }}
                      type="reset"
                      variant="contained"
                    >
                      Cencel
                    </button> */}
        </Box>
      </form>
    </Box>
  );
};

export default AddBankAccount;
