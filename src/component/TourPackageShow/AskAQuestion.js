import {
  Box,
  Grid,
  Typography,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";
import { TabContext, TabPanel } from "@material-ui/lab";
import { styled, Radio } from "@mui/material";
import { useRef } from "react";
import { addDays, format } from "date-fns";
import Stack from "@mui/material/Stack";
import { Calendar } from "react-date-range";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { async } from "@firebase/util";
import Swal from "sweetalert2";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 350, md: 600 },
  bgcolor: "white",
  outline: "none",
  p: 3,
  borderRadius: "5px",
  overflow: "auto",
  height: {
    xs: "100%",
    sm: "auto",
  },
  display: "block",
};

const BpIcon = styled("span")(({ theme, checked }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto var(--primary-color)",
    outlineOffset: 2,
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "var(--gray)",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#837fb1,#837fb1 50%,transparent 28%)",
    content: '""',
  },
});

const AskAQuestion = ({ handleClose, handleOpen, setOpenAsk, openAsk }) => {
  const [value, setValue] = React.useState("group");
  const handleChangeAskQuestion = (event, newValue) => {
    setValue(newValue);
  };

  // Ask question modal state

  // date field property
  const now = useRef(new Date());
  const navigate = useNavigate();
  const [TravelDate, setTravelDate] = useState(addDays(now.current, 1));
  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const handleSelect = (date) => {
    setTravelDate(date);
    setOpenDate(false);
    setTimeout(() => setOpen(true), 200);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [TravelerCount, setTravelerCount] = useState(1);
  const [question, setQuestion] = useState("");

  const travelerAdd = () => {
    setTravelerCount(TravelerCount + 1);
  };
  const travelerReduce = () => {
    if (TravelerCount > 0) {
      setTravelerCount(TravelerCount - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://flyfarladies-apiv2.appspot.com/question/add`;
    const body = JSON.stringify({
      FullName: name,
      Email: email,
      Phone: phone,
      TourType: value,
      Traveller: TravelerCount,
      Date: TravelDate,
      Description: question,
    });

    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setOpenAsk(false);
          Swal.fire({
            icon: "success",
            title: data?.message,
            button: "Done!",
          }).then(function () {
            navigate(0);
          });
        } else {
          setOpenAsk(false);
          Swal.fire({
            icon: "error",
            title: data?.message,
            button: "Done!",
          }).then(function () {
            navigate(0);
          });
        }
      });
  };

  return (
    <Box>
      {/* ask a question  */}
      {/* <Box
        style={{
          background: "var(--gtext-color)",
          padding: "10px 10px",
          borderRadius: "5px",
        }}
        mt={6}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <HeadsetMicIcon style={{ fontSize: "25px", color: "#fff" }} />
            <Box>
              <Typography style={{ color: "#fff", fontSize: "14px" }}>
                Have a Question About this tour ?
              </Typography>
              <Typography style={{ color: "#fff", fontSize: "12px" }}>
                Reach out to our travel experts.
              </Typography>
            </Box>
          </Box>
          <Box>
            <span
              style={{
                color: "#fff",
                fontSize: "14px",
                paddingRight: "10px",
                cursor: "pointer",
              }}
              onClick={handleOpen1}
            >
              Ask Question
            </span>
          </Box>
        </Box>
      </Box> */}
      {/* modal for ask your question */}
      <Box>
        <Modal open={openAsk} onClose={handleClose}>
          <Box sx={style2}>
            <Box>
              <Box>
                <Typography
                  sx={{
                    color: "#2c3e50",
                    fontSize: "22px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Ask a Question
                </Typography>

                <Typography
                  style={{
                    color: "#323637",
                    fontSize: "13px",
                    padding: "10px 0px",
                  }}
                >
                  Do you have a question before you book? Expat Explore Travel
                  will get back to you shortly to answer all of your questions,
                  just complete the form below.
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <input
                          type="text"
                          style={{
                            width: "100%",
                            fontSize: "12px",
                            height: "40px",
                            outline: "none",
                            color: "#222222",
                            border: "1px solid var(--input-text-color)",
                            borderRadius: "5px",
                            padding: "0px 10px",
                            boxSizing: "border-box",
                          }}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1.5} mt={0.1}>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <input
                          type="email"
                          style={{
                            width: "100%",
                            fontSize: "12px",
                            height: "40px",
                            outline: "none",
                            color: "#222222",
                            border: "1px solid var(--input-text-color)",
                            borderRadius: "5px",
                            padding: "0px 10px",
                            boxSizing: "border-box",
                          }}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your Email"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <input
                          type="number"
                          style={{
                            width: "100%",
                            fontSize: "12px",
                            height: "40px",
                            outline: "none",
                            color: "#222222",
                            border: "1px solid var(--input-text-color)",
                            borderRadius: "5px",
                            padding: "0px 10px",
                            boxSizing: "border-box",
                          }}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Your Phone"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={2}>
                  <Typography
                    style={{
                      color: "#222222",
                      fontWeight: "500",
                      fontSize: "16px",
                    }}
                  >
                    Tour Type
                  </Typography>

                  <TabContext value={value}>
                    <Box
                      sx={{
                        bgcolor: "transparent",
                        color: "var(--mateBlack)",
                        width: "100%",
                        height: "fit-content",
                        display: "flex",
                        justifyContent: "flex-start",
                        "& button.Mui-selected": {
                          color: "var(--secondary-color)",
                        },
                      }}
                    >
                      <RadioGroup
                        row
                        value={value}
                        onChange={handleChangeAskQuestion}
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            color: "blue",
                            fontWeight: "500",
                          },
                        }}
                      >
                        <FormControlLabel
                          value="group"
                          control={<BpRadio />}
                          label={
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: "#222222",
                              }}
                            >
                              Group
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          value="private"
                          control={<BpRadio />}
                          label={
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: "#222222",
                              }}
                            >
                              Private
                            </Typography>
                          }
                        />
                      </RadioGroup>
                    </Box>
                    <TabPanel
                      value="group"
                      style={{ padding: "10px 0px 0px 0px" }}
                    >
                      <Box>
                        <Grid container spacing={2}>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={6}
                            sx={{
                              position: "relative",
                              height: "55px",
                            }}
                          >
                            <Box
                              style={{
                                height: "100%",
                                width: "100%",
                                borderRadius: "3px",
                                border: "1px solid var(--input-text-color)",
                              }}
                              onClick={() => {
                                setTimeout(
                                  () => setOpenDate((prev) => !prev),
                                  200
                                );
                                setOpen(false);
                              }}
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                height="100%"
                              >
                                <Box cursor="pointer">
                                  <Typography
                                    sx={{
                                      color: "#808080",
                                      fontSize: { xs: "12px", sm: "12px" },
                                      padding: "0px 10px",
                                    }}
                                  >
                                    Departure Date{" "}
                                    {`${format(
                                      new Date(TravelDate),
                                      "dd MMM yy"
                                    )}`}
                                  </Typography>
                                </Box>
                              </Stack>
                            </Box>
                            {openDate && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  zIndex: 10,
                                  top: "70%",
                                  left: {
                                    xs: "auto",
                                    md: "auto",
                                    lg: "18px",
                                  },
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
                                    boxShadow:
                                      "0px 4px 4px rgba(0, 0, 0, 0.09)",
                                  }}
                                />
                              </Box>
                            )}
                          </Grid>
                        </Grid>

                        <Box mt={1}>
                          <Box>
                            <Grid
                              container
                              spacing={2}
                              sx={{
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Grid item xs={12} sm={6} mt={1.5}>
                                <Typography
                                  sx={{
                                    color: "#222222",
                                    fontWeight: "500",
                                    fontSize: "16px",
                                  }}
                                >
                                  Traveler
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6} mt={1.5}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={1.5}
                                >
                                  <Box
                                    style={{
                                      width: "35px",
                                      height: "35px",
                                      borderRadius: "50%",
                                      cursor: "pointer",
                                      backgroundColor: "var(--primary-color)",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                    onClick={travelerReduce}
                                  >
                                    <RemoveIcon
                                      style={{
                                        fontSize: "25px",
                                        color: "#ffffff",
                                      }}
                                    />
                                  </Box>

                                  <Typography
                                    style={{
                                      fontSize: "18px",
                                      width: "30px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {TravelerCount}
                                  </Typography>

                                  <Box
                                    style={{
                                      width: "35px",
                                      height: "35px",
                                      borderRadius: "50%",
                                      cursor: "pointer",
                                      backgroundColor: "var(--primary-color)",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                    onClick={travelerAdd}
                                  >
                                    <AddIcon
                                      style={{
                                        fontSize: "25px",
                                        color: "#ffffff",
                                      }}
                                    />
                                  </Box>
                                </Stack>
                              </Grid>
                            </Grid>
                          </Box>

                          <Box mt={4}>
                            <textarea
                              style={{
                                width: "100%",
                                fontSize: "12px",
                                height: "100px",
                                outline: "none",
                                color: "#222222",
                                border: "1px solid var(--input-text-color)",
                                borderRadius: "5px",
                                padding: "10px 10px",
                                boxSizing: "border-box",
                                resize: "none",
                              }}
                              onChange={(e) => setQuestion(e.target.value)}
                              placeholder="Your Question"
                            ></textarea>
                          </Box>

                          <Box textAlign={"right"} mt={2}>
                            <button
                              style={{
                                height: "50px",
                                width: "180px",
                                borderRadius: "50px",
                                border: "none",
                                background: "var(--tab-text)",
                                color: "#fff",
                                fontSize: "14px",
                                cursor: "pointer",
                              }}
                            >
                              Send Question
                            </button>
                          </Box>
                        </Box>
                      </Box>
                    </TabPanel>

                    <TabPanel
                      value="private"
                      style={{ padding: "10px 0px 0px 0px" }}
                    >
                      <Box>
                        <Grid container spacing={2}>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={6}
                            sx={{
                              position: "relative",
                              height: "55px",
                            }}
                          >
                            <Box
                              style={{
                                height: "100%",
                                width: "100%",
                                borderRadius: "3px",
                                border: "1px solid var(--input-text-color)",
                              }}
                              onClick={() => {
                                setTimeout(
                                  () => setOpenDate((prev) => !prev),
                                  200
                                );
                                setOpen(false);
                              }}
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                height="100%"
                              >
                                <Box cursor="pointer">
                                  <Typography
                                    sx={{
                                      color: "#808080",
                                      fontSize: { xs: "12px", sm: "12px" },
                                      padding: "0px 10px",
                                    }}
                                  >
                                    When{" "}
                                    {`${format(
                                      new Date(TravelDate),
                                      "dd MMM yy"
                                    )}`}
                                  </Typography>
                                </Box>
                              </Stack>
                            </Box>
                            {openDate && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  zIndex: 10,
                                  top: "70%",
                                  left: {
                                    xs: "auto",
                                    md: "auto",
                                    lg: "18px",
                                  },
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
                                    boxShadow:
                                      "0px 4px 4px rgba(0, 0, 0, 0.09)",
                                  }}
                                />
                              </Box>
                            )}
                          </Grid>
                        </Grid>

                        <Box mt={1}>
                          <Typography
                            style={{
                              color: "#222222",
                              fontWeight: "500",
                              fontSize: "15px",
                            }}
                          >
                            Travelers{" "}
                            <span
                              style={{
                                fontWeight: "400",
                                fontSize: "13px",
                              }}
                            >
                              (Optional)
                            </span>
                          </Typography>

                          <Box>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} mt={1.5}>
                                <Typography>Traveler</Typography>
                              </Grid>
                              <Grid item xs={12} sm={6} mt={1.5}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={1.5}
                                >
                                  <Box
                                    style={{
                                      width: "35px",
                                      height: "35px",
                                      borderRadius: "50%",
                                      cursor: "pointer",
                                      boxShadow:
                                        "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                    onClick={travelerReduce}
                                  >
                                    <RemoveIcon
                                      style={{
                                        fontSize: "25px",
                                        color: "#505557",
                                      }}
                                    />
                                  </Box>

                                  <Typography
                                    style={{
                                      fontSize: "18px",
                                      width: "30px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {TravelerCount}
                                  </Typography>

                                  <Box
                                    style={{
                                      width: "35px",
                                      height: "35px",
                                      borderRadius: "50%",
                                      cursor: "pointer",
                                      boxShadow:
                                        "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                    onClick={travelerAdd}
                                  >
                                    <AddIcon
                                      style={{
                                        fontSize: "25px",
                                        color: "#505557",
                                      }}
                                    />
                                  </Box>
                                </Stack>
                              </Grid>
                            </Grid>
                          </Box>

                          <Box mt={4}>
                            <textarea
                              style={{
                                width: "100%",
                                fontSize: "12px",
                                height: "100px",
                                outline: "none",
                                color: "#222222",
                                border: "1px solid var(--input-text-color)",
                                borderRadius: "5px",
                                padding: "10px 10px",
                                boxSizing: "border-box",
                                resize: "none",
                              }}
                              onChange={(e) => setQuestion(e.target.value)}
                              placeholder="Your Question"
                            ></textarea>
                          </Box>

                          <Box textAlign={"right"} mt={2}>
                            <button
                              style={{
                                height: "50px",
                                width: "180px",
                                borderRadius: "50px",
                                border: "none",
                                background: "var(--tab-text)",
                                color: "#fff",
                                fontSize: "14px",
                                cursor: "pointer",
                              }}
                            >
                              Send Question
                            </button>
                          </Box>
                        </Box>
                      </Box>
                    </TabPanel>
                  </TabContext>
                </Box>
              </form>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default AskAQuestion;
