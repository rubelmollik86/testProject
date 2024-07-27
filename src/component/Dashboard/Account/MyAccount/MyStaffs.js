import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";
import Loader from "../../../../image/loader/Render.gif";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import secureLocalStorage from "react-secure-storage";
import { format } from "date-fns";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PhoneInput from "react-phone-input-2";

import ReConfirm from "../../../../image/undraw/undraw_confirmation_re_b6q5.svg";
import Success from "../../../../image/undraw/undraw_completed_tasks_vs6q.svg";
import Invalid from "../../../../image/undraw/undraw_warning_re_eoyh.svg";
import ServerDown from "../../../../image/undraw/undraw_server_down_s-4-lk.svg";
import Delete from "../../../../image/undraw/undraw_throw_away_re_x60k.svg";
import AddStaff from "../../../../image/undraw/undraw_hire_re_gn5j.svg";

function Row(props) {
  const navigate = useNavigate();
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const users = secureLocalStorage.getItem("user-info");
  let agentID = users?.user?.agentId;
  const [check, setChecked] = useState(false);
  const [staffName, setStaffName] = useState("");
  const [staffEmail, setStaffEmail] = useState("");
  const [staffDesignation, setStaffDesignation] = useState("");
  const [staffPhone, setStaffPhone] = useState("");
  const [staffPass, setStaffPass] = useState("");
  const [staffRole, setStaffRole] = useState("");
  const [staffStatus, setStaffStatus] = useState("");
  const [staffId, setStaffId] = useState("");

  const updateStaffInfoGet = async (staffId) => {
    fetch(
      `https://api.flyfarint.com/v.1.0.0//Staff/all.php?search=id&agentId=${agentID}&staffId=${staffId} `
    )
      .then((res) => res.json())
      .then((data) => {
        setStaffName(data[0]?.name);
        setStaffEmail(data[0]?.email);
        setStaffDesignation(data[0]?.designation);
        setStaffPhone(data[0]?.phone);
        setStaffPass(data[0]?.password);
        setStaffRole(data[0]?.role);
        setStaffStatus(data[0]?.status);
        setStaffId(staffId);
      });
  };

  const updateStaffData = async () => {
    let url = `https://api.flyfarint.com/v.1.0.0/Staff/edit.php`;
    let body = JSON.stringify({
      staffId: staffId,
      Name: staffName,
      Email: staffEmail,
      Designation: staffDesignation,
      Phone: staffPhone,
      Role: staffRole,
      Status: check ? "Active" : "Deactivate",
      Password: staffPass,
    });
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          Swal.fire({
            imageUrl: Success,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Staff Details Updated",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(function () {
            navigate(0);
          });
        } else {
          Swal.fire({
            imageUrl: ServerDown,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Server Error",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(function () {
            navigate(0);
          });
        }
      });
  };

  // delete functionality handle here
  const deleteRequest = () => {
    Swal.fire({
      imageUrl: ReConfirm,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      title: "Are you sure?",
      text: "You wants to delete this staff ?",
      showCancelButton: true,
      confirmButtonColor: "var(--primary-color)",
      confirmButtonText: "Yes Delete it!",
      cancelButtonColor: "#dc143c",
      cancelButtonText: "Don't Delete it",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        let url = `https://api.flyfarint.com/v.1.0.0/Staff/delete.php?staffId=${staffId}&agentId=${agentID}`;

        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "success") {
              Swal.fire({
                imageUrl: Delete,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                title: "Staff Deleted",
                confirmButtonColor: "#dc143c",
                confirmButtonText: "Ok",
              }).then(function () {
                navigate(0);
              });
            }
          });
      }
    });
  };

  return (
    <React.Fragment>
      {/* visual data */}
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">{row.phone}</TableCell>
        <TableCell align="left">{row.role}</TableCell>
        <TableCell align="left">{row.designation}</TableCell>
        <TableCell align="left">
          {row.created
            ? format(new Date(row.created), "dd MMM yyyy hh:mm a")
            : "Created Time"}
        </TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <Typography color="var(--gray-text-color)" fontWeight={500}>
                Cancel
              </Typography>
            ) : (
              <Typography
                color="var(--gray-text-color)"
                fontWeight={500}
                onClick={() => updateStaffInfoGet(row?.staffId)}
              >
                Change
              </Typography>
            )}
          </IconButton>
        </TableCell>
      </TableRow>
      {/* end */}
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            backgroundColor: "#AFC8E0",
          }}
          colSpan={7}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <Box>
                  <Typography color={"#003365"} fontWeight="bold" my={2}>
                    STAFF INFORMATION
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item md={3}>
                      <input
                        required
                        className="u-input"
                        name="name"
                        type="text"
                        placeholder="Staff Name"
                        value={staffName}
                        onChange={(e) => setStaffName(e.target.value)}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <input
                        className="u-input"
                        name="name"
                        type="text"
                        value={staffEmail}
                        placeholder={"Email "}
                        onChange={(e) => setStaffEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <input
                        className="u-input"
                        name="name"
                        type="text"
                        value={staffPhone}
                        placeholder={"Phone Number "}
                        onChange={(e) => setStaffPhone(e.target.value)}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <input
                        className="u-input"
                        name="name"
                        type="text"
                        value={staffDesignation}
                        placeholder={"Staff Designation "}
                        onChange={(e) => setStaffDesignation(e.target.value)}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <input
                        className="u-input"
                        name="name"
                        type="text"
                        value={staffRole}
                        placeholder={"Staff Role "}
                        onChange={(e) => setStaffRole(e.target.value)}
                      />
                    </Grid>

                    <Grid item md={3}>
                      <input
                        className="u-input"
                        name="name"
                        type="text"
                        value={staffPass}
                        placeholder={"Staff Pass "}
                        onChange={(e) => setStaffPass(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Box my={2} style={{ display: "none" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          onClick={(e) => setChecked(e.target.checked)}
                        />
                      }
                      label={check ? "Active" : "Deactivate"}
                    />
                  </Box>
                  {/* <Typography color={"#003365"} fontWeight="bold" my={2}>
                    LOGIN INFORMATION
                  </Typography> */}
                  {/* <Grid container spacing={2} mb={2}>
                    <Grid item md={3}>
                      <input
                        disabled
                        className="u-input"
                        name="name"
                        type="text"
                        value={email}
                        placeholder={"Company "}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <input
                        disabled
                        className="u-input"
                        name="name"
                        type="text"
                        value={email}
                        placeholder={"Company "}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <input
                        disabled
                        className="u-input"
                        name="name"
                        type="text"
                        value={email}
                        placeholder={"Company "}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                  </Grid> */}
                  <Grid container spacing={2} justifyContent="flex-end" my={2}>
                    <Grid item>
                      <Button
                        size="small"
                        style={{
                          backgroundColor: "#033566",
                          padding: "5px 20px",
                          color: "#fff",
                          borderRadius: "0px",
                        }}
                        onClick={updateStaffData}
                      >
                        UPDATE
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{
                          backgroundColor: "var(--gray-text-color)",
                          padding: "5px 20px",
                          color: "#fff",
                          borderRadius: "0px",
                        }}
                        onClick={deleteRequest}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const MyStaffs = () => {
  const [users, setUsers] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    const users = secureLocalStorage.getItem("user-info");
    if (users) {
      setUsers(users);
    }
  }, []);
  let agentID = users?.user?.agentId;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("880");
  const [role, setRole] = useState("");
  const [designation, setDesignation] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    let url = "https://api.flyfarint.com/v.1.0.0/Staff/add.php";
    let body = JSON.stringify({
      agentId: agentID,
      Name: name,
      Email: email,
      Designation: designation,
      Phone: phone,
      Role: role,
      Password: password,
    });
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setIsSubmit(false);
          e.target.reset();
          Swal.fire({
            imageUrl: AddStaff,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Staff added successfully",
            html: "If you have any queries please contact us at support@flyfarint.com or 01755-572099, 09606912912",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(function () {
            navigate(0);
          });
        } else {
          throw new Error(data.message);
        }
      })
      .catch((err) => {
        setIsSubmit(false);
        e.target.reset();
        Swal.fire({
          imageUrl: Invalid,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: err.message,
          confirmButtonColor: "#dc143c",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate(0);
        });
      });
    setOpen(false);
    e.target.reset();
  };
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    setIsLoading(false);
    let url = `https://api.flyfarint.com/v.1.0.0/Staff/all.php?search=all&agentId=${agentID}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(true);
        setStaffs(data);
      })
      .catch((err) => {
        setIsLoading(true);
        Swal.fire({
          imageUrl: ServerDown,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "Server Down",
          confirmButtonColor: "#dc143c",
          confirmButtonText: "Ok",
        }).then(function () {
          navigate(-1);
        });
      });
  }, [agentID]);
  return (
    <Box m={"24px"}>
      <Grid container justifyContent={"space-between"}>
        <Typography
          color={"var(--primary-color)"}
          fontSize="18px"
          fontWeight={500}
        >
          Staff Information
        </Typography>
        <Typography
          bgcolor="var(--primary-color)"
          color={"#fff"}
          p={"5px 25px"}
          onClick={handleOpen}
          style={{ cursor: "pointer", borderRadius: "5px" }}
        >
          ADD STAFF
        </Typography>
      </Grid>

      <Modal open={open} onClose={handleClose} className="custom-modal-r">
        <Box className="modalStyler">
          <Box backgroundColor="#fff" p={3}>
            <Typography
              textAlign="center"
              color={"var(--gray-text-color)"}
              fontWeight={600}
              fontSize="25px"
              pb={3}
            >
              ADD STAFF
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box>
                <Typography color={"#003365"} fontWeight="bold" my={2}>
                  Staff INFORMATION
                </Typography>
                <Grid container spacing={2}>
                  <Grid item md={4}>
                    <label
                      htmlFor="name"
                      style={{
                        color: "var(--primary-color)",
                        marginLeft: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      Staff Name
                    </label>
                    <input
                      required
                      className="u-input"
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Staff Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>

                  <Grid item md={4} className="staffPhone">
                    <label
                      htmlFor="phone"
                      style={{
                        color: "var(--primary-color)",
                        marginLeft: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      Staff Phone
                    </label>
                    <PhoneInput
                      required
                      country={"bd"}
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={(phone) => {
                        setPhone(phone);
                      }}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <label
                      htmlFor="designation"
                      style={{
                        color: "var(--primary-color)",
                        marginLeft: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      Staff Designation
                    </label>
                    <input
                      required
                      className="u-input"
                      id="designation"
                      name="designation"
                      type="text"
                      placeholder={"Designation "}
                      onChange={(e) => setDesignation(e.target.value)}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <Typography color={"#003365"} fontWeight="bold" my={1}>
                      LOGIN INFORMATION
                    </Typography>
                  </Grid>
                  <Grid item md={4}>
                    <label
                      htmlFor="staffEmail"
                      style={{
                        color: "var(--primary-color)",
                        marginLeft: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      Email
                    </label>
                    <input
                      required
                      className="u-input"
                      id="staffEmail"
                      name="staffEmail"
                      type="email"
                      value={email}
                      placeholder="Your Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <label
                      htmlFor="agentPassword"
                      style={{
                        color: "var(--primary-color)",
                        marginLeft: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      Password
                    </label>
                    <Box
                      position={"relative"}
                      display="flex"
                      alignItems="center"
                    >
                      <input
                        required
                        className="u-input"
                        name="agentPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Box
                        position={"absolute"}
                        onClick={handleClickShowPassword}
                        mt="7px"
                        right="20px"
                      >
                        {showPassword ? (
                          <Visibility className="fonticon09" />
                        ) : (
                          <VisibilityOff className="fonticon09" />
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <label
                      htmlFor="staffRole"
                      style={{
                        color: "var(--primary-color)",
                        marginLeft: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      Select Role
                    </label>
                    <select
                      required
                      className="u-input"
                      id="staffRole"
                      name="staffRole"
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="reservation officer">
                        Reservation Officer
                      </option>
                      <option value="operation exicutive">
                        Operation Exicutive
                      </option>
                      <option value="staff">Staff</option>
                    </select>
                  </Grid>
                  <Grid container item justifyContent={"flex-end"}>
                    <Button
                      style={{
                        color: "#fff",
                        backgroundColor: " #dc143c",
                        outline: "none",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        width: "100px",
                        height: "40px",
                      }}
                      type="submit"
                      disabled={!isSubmit ? false : true}
                    >
                      {!isSubmit ? (
                        "Save"
                      ) : (
                        <CircularProgress
                          sx={{ height: "20px", width: "20px" }}
                        />
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>

      <Box mt={2} className="Staff-table">
        {!isLoading ? (
          <>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "70vh",
                width: "70vw",
                marginInline: "auto",
              }}
            >
              <Box
                style={{
                  width: "50%",
                  height: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={Loader}
                  alt="loader"
                  style={{
                    width: "40%",
                    objectFit: "center",
                  }}
                />
              </Box>
            </Box>
          </>
        ) : (
          <TableContainer>
            <Table>
              <TableHead style={{ backgroundColor: "var(--gray-text-color)" }}>
                <TableRow>
                  <TableCell
                    align="left"
                    style={{ minWidth: "170px", color: "#fff" }}
                  >
                    Name{" "}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "170px", color: "#fff" }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "170px", color: "#fff" }}
                  >
                    Phone Number
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "170px", color: "#fff" }}
                  >
                    Role
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "170px", color: "#fff" }}
                  >
                    Designation
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "170px", color: "#fff" }}
                  >
                    Created On
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ minWidth: "170px", color: "#fff" }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staffs.map((row) => (
                  <Row key={row.name} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default MyStaffs;
