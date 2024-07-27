import React, { useState } from "react";
import { Box } from "@mui/system";
import { format, addDays, subDays } from "date-fns";
import Roundway from "../Roundway/Roundway";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
  Typography,
} from "@mui/material";
import "./FlightSearchBox.css";
import OneWay from "../OneWay/OneWay";
import Multicity from "../Multicity/Multicity";

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

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "var(--gray)",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "radial-gradient(var(--primary-color),var(--primary-color) 50%,transparent 28%)",
    content: '""',
  },
  // "input:hover ~ &": {
  //   backgroundColor: "var(--secondary-color)",
  // },
});

// Inspired by blueprintjs
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

const FlightSearchBox = ({
  type,
  setType,
  value,
  setValue,
  fromSearchText,
  setFromSearchText,
  toSearchText,
  setToSearchText,
  from,
  setFrom,
  to,
  setTo,
  faddress,
  setfaddress,
  toAddress,
  setToAddress,
  fromSendData,
  setFromSendData,
  toSendData,
  setToSendData,
  adultCount,
  setAdultCount,
  childCount,
  setChildCount,
  infant,
  setInfant,
  result,
  setResult,
  className,
  setClassName,
  setChangeState,
  changeState,
  changeFrom,
  setChangeFrom,
  searchData,
  setSearchData,
}) => {
  const handleClassName = (event) => {
    setClassName(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <TabContext value={value}>
        <Box
          sx={{
            paddingLeft: "30px",
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
            onChange={handleChange}
            sx={{
              "& .MuiFormControlLabel-label": {
                color: "var(--secondary-color)",
                fontWeight: "500",
              },
            }}
          >
            <FormControlLabel
              value="oneway"
              control={<BpRadio />}
              label={
                <Typography
                  sx={{ fontSize: 14, color: "var(--secondary-color)" }}
                >
                  One Way
                </Typography>
              }
            />
            <FormControlLabel
              value="return"
              control={<BpRadio />}
              label={
                <Typography
                  sx={{ fontSize: 14, color: "var(--secondary-color)" }}
                >
                  Round Way
                </Typography>
              }
            />
            <FormControlLabel
              value="multicity"
              control={<BpRadio />}
              label={
                <Typography
                  sx={{ fontSize: 14, color: "var(--secondary-color)" }}
                >
                  Multi City
                </Typography>
              }
            />
          </RadioGroup>
        </Box>
        <TabPanel value="oneway" style={{ padding: "10px 20px 20px 20px" }}>
          <OneWay
            tripType={value}
            iconColor={"#DC143C"}
            bgColor={"#fff"}
            bordercolor={"var(--primary-color)"}
            faddress={faddress}
            fromSendData={fromSendData}
            setFromSendData={setFromSendData}
            toSendData={toSendData}
            setToSendData={setToSendData}
            setfaddress={setfaddress}
            toAddress={toAddress}
            setToAddress={setToAddress}
            fromSearchText={fromSearchText}
            setFromSearchText={setFromSearchText}
            toSearchText={toSearchText}
            setToSearchText={setToSearchText}
            setValue={setValue}
            adultCount={adultCount}
            setAdultCount={setAdultCount}
            childCount={childCount}
            setChildCount={setChildCount}
            infant={infant}
            setInfant={setInfant}
            result={result}
            setResult={setResult}
            className={className}
            handleClassName={handleClassName}
            to={to}
            setTo={setTo}
            from={from}
            setFrom={setFrom}
            setChangeState={setChangeState}
            changeState={changeState}
            changeFrom={changeFrom}
            setChangeFrom={setChangeFrom}
          />
        </TabPanel>
        <TabPanel value="return" style={{ padding: "10px 20px 20px 20px" }}>
          <Roundway
            tripType={value}
            iconColor={"#DC143C"}
            bgColor={"#fff"}
            bordercolor={"var(--primary-color)"}
            faddress={faddress}
            setfaddress={setfaddress}
            toAddress={toAddress}
            setToAddress={setToAddress}
            fromSendData={fromSendData}
            setFromSendData={setFromSendData}
            toSendData={toSendData}
            setToSendData={setToSendData}
            fromSearchText={fromSearchText}
            setFromSearchText={setFromSearchText}
            toSearchText={toSearchText}
            setToSearchText={setToSearchText}
            setValue={setValue}
            adultCount={adultCount}
            setAdultCount={setAdultCount}
            childCount={childCount}
            setChildCount={setChildCount}
            infant={infant}
            setInfant={setInfant}
            result={result}
            setResult={setResult}
            className={className}
            handleClassName={handleClassName}
            to={to}
            setTo={setTo}
            from={from}
            setFrom={setFrom}
            setChangeState={setChangeState}
            changeState={changeState}
            changeFrom={changeFrom}
            setChangeFrom={setChangeFrom}
          />
        </TabPanel>
        <TabPanel value="multicity" style={{ padding: "10px 20px 20px 20px" }}>
          <Multicity
            tripType={value}
            iconColor={"#DC143C"}
            bgColor={"#fff"}
            bordercolor={"var(--primary-color)"}
            faddress={faddress}
            setfaddress={setfaddress}
            toAddress={toAddress}
            setToAddress={setToAddress}
            fromSendData={fromSendData}
            setFromSendData={setFromSendData}
            toSendData={toSendData}
            setToSendData={setToSendData}
            fromSearchText={fromSearchText}
            setFromSearchText={setFromSearchText}
            toSearchText={toSearchText}
            setToSearchText={setToSearchText}
            setValue={setValue}
            adultCount={adultCount}
            setAdultCount={setAdultCount}
            childCount={childCount}
            setChildCount={setChildCount}
            infant={infant}
            setInfant={setInfant}
            result={result}
            setResult={setResult}
            className={className}
            handleClassName={handleClassName}
            to={to}
            setTo={setTo}
            from={from}
            setFrom={setFrom}
            setChangeState={setChangeState}
            changeState={changeState}
            changeFrom={changeFrom}
            setChangeFrom={setChangeFrom}
            searchData={searchData}
            setSearchData={setSearchData}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default FlightSearchBox;
