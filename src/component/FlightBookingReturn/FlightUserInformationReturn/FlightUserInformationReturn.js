import {
  Button,
  Checkbox,
  ClickAwayListener,
  FormControlLabel,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";
import { format } from "date-fns";
import { Calendar } from "react-date-range";
import bookingSuccess from "../../../image/undraw/undraw_travel_booking_re_6umu.svg";
import noFareFound from "../../../image/undraw/undraw_not_found_re_bh2e.svg";
import serverError from "../../../image/undraw/undraw_server_down_s-4-lk.svg";
import BookingFailed from "../../../image/undraw/undraw_cancel_re_pkdm.svg";
import axios from "axios";
import SearchableDropDown from "../../Shared/SearchableDropDown/SearchableDropDown";
import CountryList from "../../CountryList";
import "react-phone-input-2/lib/style.css";
import UserSigninSignup from "../../UserSigninSignup/UserSigninSignup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 250, md: 600 },
  bgcolor: "white",
  outline: "none",
  p: 4,
  borderRadius: "5px",
};

const FlightUserInformationReturn = ({
  flightData,
  roundData,
  userData,
  searchResult,
  adultCount,
  childCount,
  infant,
  adultPrice,
  childPrice,
  infPrice,
  adultTaxPrice,
  childTaxPrice,
  infTaxPrice,
  totalTax,
  totalFare,
  totalBaseFare,
  limitTime,
  isLoaded,
  setIsLoaded,
  serviceFeeAdult,
  serviceFeeChild,
  serviceFeeInfant,
  coupon,
  couponAppliedMessage,
  goAdultBaggage,
  goChildBaggage,
  goInfantBaggage,
  backAdultBaggage,
  backChildBaggage,
  backInfantBaggage,
  SearchID,
  ResultID,
  tripType,
}) => {
  console.log("lol", flightData);
  const userInfo = secureLocalStorage.getItem("UserData");
  let agentId = "FFA1926";
  let userId = userInfo?.uuid;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //  Adult price calculate
  const adultData = flightData?.pricebreakdown?.filter((data) => {
    return data?.PaxType === "ADT";
  });

  const adultInfo = adultData[0];
  const adultBaseFare =
    parseInt(adultInfo?.PaxCount || 0) * parseInt(adultInfo?.BaseFare || 0);

  const adultTotalTax =
    parseInt(adultInfo?.PaxCount || 0) * parseInt(adultInfo?.Tax || 0);

  //  child price calculate
  const childData = flightData?.pricebreakdown?.filter((data) => {
    return data?.PaxType === "CNN";
  });
  const childInfo = childData[0];

  const childBaseFare =
    parseInt(childInfo?.PaxCount || 0) * parseInt(childInfo?.BaseFare || 0);

  const childTotalTax =
    parseInt(childInfo?.PaxCount || 0) * parseInt(childInfo?.Tax || 0);

  //  Infant price calculate
  const infantData = flightData?.pricebreakdown?.filter((data) => {
    return data?.PaxType === "INF";
  });
  const infantInfo = infantData[0];

  const infantBaseFare =
    parseInt(infantInfo?.PaxCount || 0) * parseInt(infantInfo?.BaseFare || 0);

  const infantTotalTax =
    parseInt(infantInfo?.PaxCount || 0) * parseInt(infantInfo?.Tax || 0);

  //!end of Price Calculations
  //todo: copy of userData
  const userDataCopy = JSON.parse(
    JSON.stringify({
      adultCount: adultCount,
      childCount: childCount,
      infant: infant,
      agentFare: flightData?.agentprice,
      clientFare: flightData?.customerPrice,
      commission: "",
      tripType: tripType,
      roundData: flightData,
    })
  );

  const location = useLocation();
  const navigate = useNavigate();
  const [userPhoneNumber, setUserPhoneNumber] = useState(
    userInfo?.phone || "880"
  );

  const handleClickAway = () => {
    setOpen(false);
  };
  const [email, setEmail] = useState(userInfo?.email || "");

  // todo: date validation
  function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
  }
  let dateAfterSixMonths = addMonths(new Date(flightData?.backarrivalDate), 6);
  let dateBeforeTwelveYears = addMonths(
    new Date(flightData?.backarrivalDate),
    -144
  );
  let dateBeforeTwoYears = addMonths(
    new Date(flightData?.backarrivalDate),
    -24
  );

  //todo: select traveler section
  const [travellers, setTravellers] = useState([]);

  useEffect(() => {
    let url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/B2C/Traveller/all.php?agentId=${agentId}&userId=${userId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let uniqueTravelers = [
          ...new Map(data.map((item) => [item["passNo"], item])).values(),
        ];
        setTravellers(uniqueTravelers);
      });
  }, [agentId, userId]);

  //todo: end of select traveler

  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };

  //todo:internation passenger state
  const [isIntPassenger, setIsIntPassenger] = useState(false);
  const handleIntPassenger = () => {
    setIsIntPassenger((prev) => !prev);
  };
  //todo:end of international passenger state

  const [flightPassengerData, setFlightPassengerData] = useState({
    adult: [...new Array(adultCount)].map((item, index) => {
      return {
        type: "ADT",
        afName: "",
        alName: "",
        agender: "",
        adob: format(new Date(), "dd MMM yyyy"),
        apassNation: "BD",
        apassNo:
          flightData?.triptype === "Inbound"
            ? Math.round(Math.random() * 100000000 + index)
            : "",
        apassEx:
          flightData?.triptype === "Inbound"
            ? new Date(dateAfterSixMonths).toLocaleDateString("sv")
            : format(new Date(dateAfterSixMonths), "dd MMM yyyy"),
        openDate: false,
        openPassExDate: false,
      };
    }),
    child: [...new Array(childCount)].map((item, index) => {
      return {
        type: "CNN",
        cfName: "",
        clName: "",
        cgender: "",
        cdob: format(new Date(), "dd MMM yyyy"),
        cpassNation: "BD",
        cpassNo:
          flightData?.triptype === "Inbound"
            ? Math.round(Math.random() * 100000000 + index)
            : "",
        cpassEx:
          flightData?.triptype === "Inbound"
            ? new Date(dateAfterSixMonths).toLocaleDateString("sv")
            : format(new Date(dateAfterSixMonths), "dd MMM yyyy"),
        openDate: false,
        openPassExDate: false,
      };
    }),
    infant: [...new Array(infant)].map((item, index) => {
      return {
        type: "INF",
        ifName: "",
        ilName: "",
        igender: "",
        idob: format(new Date(), "dd MMM yyyy"),
        ipassNation: "BD",
        ipassNo:
          flightData?.triptype === "Inbound"
            ? Math.round(Math.random() * 100000000 + index)
            : "",
        ipassEx:
          flightData?.triptype === "Inbound"
            ? new Date(dateAfterSixMonths).toLocaleDateString("sv")
            : format(new Date(dateAfterSixMonths), "dd MMM yyyy"),
        openDate: false,
        openPassExDate: false,
      };
    }),
    adultCount: adultCount,
    childCount: childCount,
    infantCount: infant,
    email: email,
    phone: userPhoneNumber,
    tripType: tripType,
    segment: flightData?.segment,
    SearchID,
    ResultID,
  });
  const handleOnChange = (e, type, index) => {
    if (type === "ADT") {
      const value = e.target.value;
      const field = e.target.name;
      //copying data to temp variable so that we do not directly mutate original state
      const tempFlightData = [...flightPassengerData.adult];
      // -1 check to see if we found that object in working hours
      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index], //keeping existing values in object
          [field]: value, //here property can be "price" or "description"
        };
      }
      setFlightPassengerData({
        ...flightPassengerData,
        adult: tempFlightData,
      });
    }
    if (type === "CNN") {
      const value = e.target.value;
      const field = e.target.name;
      //copying data to temp variable so that we do not directly mutate original state
      const tempFlightData = [...flightPassengerData.child];
      // -1 check to see if we found that object in working hours
      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index], //keeping existing values in object
          [field]: value, //here property can be "price" or "description"
        };
      }
      setFlightPassengerData({
        ...flightPassengerData,
        child: tempFlightData,
      });
    }
    if (type === "INF") {
      const value = e.target.value;
      const field = e.target.name;
      //copying data to temp variable so that we do not directly mutate original state
      const tempFlightData = [...flightPassengerData.infant];
      // -1 check to see if we found that object in working hours
      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index], //keeping existing values in object
          [field]: value, //here property can be "price" or "description"
        };
      }
      setFlightPassengerData({
        ...flightPassengerData,
        infant: tempFlightData,
      });
    }
  };

  let bookingJson = {
    flightPassengerData: { ...flightPassengerData },
    bookingInfo: {
      agentId: "FFA1926",
      staffId: "",
      userId: userId,
      system: flightData?.system,
      from: flightData?.godeparture,
      to: flightData?.backdeparture,
      airlines: flightData?.careerName,
      tripType: tripType,
      travelDate: flightData?.backdepartureDate,
      name: `${flightPassengerData.adult[0].afName} ${flightPassengerData.adult[0].alName} `,
      phone: flightPassengerData.phone,
      email: flightPassengerData.email,
      pax: adultCount + childCount + infant,
      adultcount: adultCount,
      childcount: childCount,
      infantcount: infant,
      subagentprice: Number.parseInt(userData?.flightData?.subagentprice),
      agentprice: Number.parseInt(flightData?.agentprice),
      netcost: Number.parseInt(flightData?.agentprice),
      adultcostbase: adultBaseFare,
      childcostbase: childBaseFare,
      infantcostbase: infantBaseFare,
      adultcosttax: adultTotalTax,
      childcosttax: childTotalTax,
      infantcosttax: infantTotalTax,
      grosscost: flightData?.agentprice,
      basefare: flightData?.BasePrice,
      tax: flightData?.Taxes,
      timelimit: new Date(limitTime),
      platform: "FFLB2C",
      journeyType: flightData?.triptype,
      coupon: coupon || "",
      airlinescode: flightData?.career,
      adultbag: adultCount
        ? `go-${goAdultBaggage}|back-${backAdultBaggage}`
        : "",
      childbag: childCount
        ? `go-${goChildBaggage}|back-${backChildBaggage}`
        : "",
      infantbag: infant
        ? `go-${goInfantBaggage}|back-${backInfantBaggage}`
        : "",
      refundable: flightData?.refundable === "Refundable" ? "yes" : "no",
    },

    saveBooking: { ...userDataCopy },
    system: flightData?.system,
    agentId: "FFA1926",
    userId: userId,
    platform: "FFLB2C",
    tripType: tripType,
  };

  console.log("ReturnBookingJson", bookingJson);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoaded(false);
    e.target.reset();
    let url = "https://api.flyfarint.com/v.1.0.0/AirBooking/index.php";
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: JSON.stringify(bookingJson),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          Swal.fire({
            imageUrl: bookingSuccess,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Success",
            html: `Thank you so much for booking a flight ticket with FlyFar Ladies Please issue your booking ticket within the time limit specified, otherwise your booking request will be automatically cancelled. For any query.Please contact us at <strong> support@flyfarladies.com</strong> or Call <strong>+88 01755582111<strong>`,
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          }).then(function () {
            setIsLoaded(true);
            navigate("/congratulation", {
              state: {
                bookingData: data,
                bookingJson: bookingJson,
                flightData: flightData,
                // bookingInfo: bookingInfo,
                // bookId: bookingDetails,
                // allFlightData: { userData, searchResult },
              },
            });
          });
        } else {
          Swal.fire({
            imageUrl: noFareFound,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "No Fare Available",
            html: `For any query.Please contact us at <strong>support@flyfarladies.com</strong> or Call <strong>+88 01755582111</strong>`,
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Please Try Another Flights.",
          }).then(function () {
            setIsLoaded(true);
            navigate(-1);
          });
        }
      })

      .catch((err) => {
        console.log(err.message);
        //todo: booking failed section
        let url =
          "https://api.flyfarint.com/v.1.0.0/AirBooking/BookingFailed.php";
        let body = JSON.stringify({
          agentId: "FFA1926" || "Agent",
          staffId: "Staff",
          system: flightData?.system,
          from: flightData?.godeparture,
          to: flightData?.backdeparture,
          deptime: flightData?.godepartureDate || "",
          arrtime: flightData?.backarrivalDate || "",
          route: userData?.flightData?.segments?.go?.map(
            (item) => `${item.departure}-${item.arrival}`
          ),
          airlines: flightData?.careerName,
          tripType: tripType,
          pax: adultCount + childCount + infant,
          adultcount: adultCount,
          childcount: childCount,
          infantcount: infant,
          netcost:
            couponAppliedMessage.status === "success"
              ? Number(flightData?.price - 100)
              : Number(flightData?.price),
          flightnumber: userData?.flightData?.segments?.go?.map(
            (item) => `${item.marketingflight}`
          ),
          cabinclass: userData?.flightData?.segments?.go?.map(
            (item) => `${item.bookingcode}`
          ),
          SearchID: "",
          ResultID: "",
        });

        fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: body,
        })
          .then((res) => res.json())
          .then((data) => {
            Swal.fire({
              imageUrl: noFareFound,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
              title: "No Fare Available",
              html: `For any query.Please contact us at <strong>support@flyfarladies.com</strong> or Call <strong>+88 01755582111</strong>`,
              confirmButtonColor: "var(--primary-color)",
              confirmButtonText: "Please Try Another Flights.",
            }).then(function () {
              setIsLoaded(true);
              navigate(-1);
            });
          })
          .catch((err) => {
            console.log(err.message);
            Swal.fire({
              // icon: "error",
              imageUrl: serverError,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
              title: "Server Error",
              html: `For any query.Please contact us at <strong>support@flyfarladies.com</strong> or Call <strong>+88 01755582111</strong>`,
              confirmButtonColor: "var(--primary-color)",
              confirmButtonText: "Please Try Another Flights.",
            }).then(function () {
              setIsLoaded(true);
              navigate(-1);
            });
          });
      });
  };

  const handleOpenDateState = (type, index, item) => {
    if (type === "ADT") {
      const tempFlightData = [...flightPassengerData.adult];
      tempFlightData[index] = {
        ...tempFlightData[index],
        openDate: !item.openDate,
        openPassExDate: false,
      };
      setFlightPassengerData({
        ...flightPassengerData,
        adult: tempFlightData,
      });
    } else if (type === "CNN") {
      const tempFlightData = [...flightPassengerData.child];
      tempFlightData[index] = {
        ...tempFlightData[index],
        openDate: !item.openDate,
        openPassExDate: false,
      };
      setFlightPassengerData({
        ...flightPassengerData,
        child: tempFlightData,
      });
    } else {
      const tempFlightData = [...flightPassengerData.infant];
      tempFlightData[index] = {
        ...tempFlightData[index],
        openDate: !item.openDate,
        openPassExDate: false,
      };
      setFlightPassengerData({
        ...flightPassengerData,
        infant: tempFlightData,
      });
    }
  };
  const handleOpenPassDateState = (type, index, item) => {
    if (type === "ADT") {
      const tempFlightData = [...flightPassengerData.adult];
      tempFlightData[index] = {
        ...tempFlightData[index],
        openDate: false,
        openPassExDate: !item.openPassExDate,
      };
      setFlightPassengerData({
        ...flightPassengerData,
        adult: tempFlightData,
      });
    } else if (type === "CNN") {
      const tempFlightData = [...flightPassengerData.child];
      tempFlightData[index] = {
        ...tempFlightData[index],
        openDate: false,
        openPassExDate: !item.openPassExDate,
      };
      setFlightPassengerData({
        ...flightPassengerData,
        child: tempFlightData,
      });
    } else {
      const tempFlightData = [...flightPassengerData.infant];
      tempFlightData[index] = {
        ...tempFlightData[index],
        openDate: false,
        openPassExDate: !item.openPassExDate,
      };
      setFlightPassengerData({
        ...flightPassengerData,
        infant: tempFlightData,
      });
    }
  };

  const handleAutoFill = (obj, index) => {
    const {
      dob,
      email,
      fName,
      gender,
      id,
      lName,
      passEx,
      passNation,
      passNo,
      passportCopy,
      paxId,
      phone,
      type,
      visaCopy,
    } = obj;
    if (obj.type === "ADT") {
      const tempFlightData = [...flightPassengerData.adult];
      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index],
          type,
          afName: fName,
          alName: lName,
          agender: gender,
          adob: new Date(dob).toLocaleDateString("sv"),
          apassNation: passNation,
          apassNo: passNo,
          apassEx: new Date(passEx).toLocaleDateString("sv"),
        };
      }
      setFlightPassengerData({
        ...flightPassengerData,
        adult: tempFlightData,
      });
    } else if (obj.type === "CNN") {
      const tempFlightData = [...flightPassengerData.child];
      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index],
          type,
          cfName: fName,
          clName: lName,
          cgender: gender,
          cdob: new Date(dob).toLocaleDateString("sv"),
          cpassNation: passNation,
          cpassNo: passNo,
          cpassEx: new Date(passEx).toLocaleDateString("sv"),
        };
      }
      setFlightPassengerData({
        ...flightPassengerData,
        child: tempFlightData,
      });
    } else {
      const tempFlightData = [...flightPassengerData.infant];
      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index],
          type,
          ifName: fName,
          ilName: lName,
          igender: gender,
          idob: new Date(dob).toLocaleDateString("sv"),
          ipassNation: passNation,
          ipassNo: passNo,
          ipassEx: new Date(passEx).toLocaleDateString("sv"),
        };
      }
      setFlightPassengerData({
        ...flightPassengerData,
        infant: tempFlightData,
      });
    }
  };

  //todo: add traveler states
  const adultTravelers = travellers.filter((item) => item.type === "ADT");
  const childTravelers = travellers.filter((item) => item.type === "CNN");
  const infantTravelers = travellers.filter((item) => item.type === "INF");
  const optionAdults = adultTravelers.map((x, index) => {
    if (x.type === "ADT") {
      return {
        value: x,
        label: `Name: ${x.fName} ${x.lName} Type: ${x.type} Gender: ${x.gender} Nation: ${x.passNation} Dob: ${x.dob} PassNo: ${x.passNo} PassEx: ${x.passEx}`,
      };
    }
  });
  const optionChilds = childTravelers.map((x, index) => {
    if (x.type === "CNN") {
      return {
        value: x,
        label: `Name:${x.fName} ${x.lName} Type:${x.type} Gender:${x.gender} Nation:${x.passNation} Dob:${x.dob} PassNo:${x.passNo} PassEx${x.passEx}`,
      };
    }
  });
  const optionInfants = infantTravelers.map((x, index) => {
    if (x.type === "INF") {
      return {
        value: x,
        label: `Name:${x.fName} ${x.lName} Type:${x.type} Gender:${x.gender} Nation:${x.passNation} Dob:${x.dob} PassNo:${x.passNo} PassEx${x.passEx}`,
      };
    }
  });
  //todo: end of add traveler states

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box
          mt={2}
          sx={{
            position: "relative",
          }}
        >
          <Grid container>
            <Grid
              item
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className="right-overflow1"
            >
              <Typography
                sx={{
                  color: "var(--primary-color)",
                  fontSize: { xs: 14, sm: 18, md: 24 },
                  fontWeight: 500,
                  mt: 3,
                  mb: 1,
                }}
              >
                Passenger Details
              </Typography>
              <Box bgcolor="var(--white)" px={4} borderRadius="5px">
                <form onSubmit={handleSubmit}>
                  {flightPassengerData?.adult?.map((item, index) => {
                    return (
                      <Box key={index} mt={4}>
                        {/* Select Travelers  */}
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={2}
                          py={2}
                        >
                          <Grid item xs={12} sm={8}>
                            {/* {travellers.length !== 0 && ( */}
                            <Box>
                              <label htmlFor="selectTravelerADT">
                                Select Travelers
                              </label>
                              <Typography
                                sx={{
                                  color: "var(--primary-color)",
                                  fontSize: "13px",
                                }}
                              >
                                <SearchableDropDown
                                  index={index}
                                  handler={handleAutoFill}
                                  options={optionAdults}
                                />
                              </Typography>
                            </Box>
                            {/* )} */}
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                          >
                            <Box pt={2}>
                              <Typography
                                sx={{
                                  p: "5px 30px",
                                  bgcolor: "var(--primary-color)",
                                  borderRadius: "5px",
                                  width: "fit-content",
                                  color: "var(--white)",
                                }}
                              >
                                Adult- #0{index + 1}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>

                        <Box className="adult-info">
                          <Grid container columnSpacing={2} rowSpacing={2}>
                            {/*//todo: auto fil travelers */}

                            <Grid item xs={12} sm={6} md={4} lg={4}>
                              <label htmlFor="afName">
                                Given Name / First Name
                              </label>
                              <input
                                required
                                onBlur={handleFocus}
                                focused={focused.toString()}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                                type="text"
                                name="afName"
                                id="afName"
                                value={item.afName}
                                placeholder="Given Name / First Name"
                                pattern="[a-zA-Z\s]+"
                                style={{ textTransform: "uppercase" }}
                              />
                              <span
                                className="form-validation-span"
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                }}
                              >
                                *No Special Character
                              </span>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                              <label htmlFor="alName">
                                Surname / Last Name
                              </label>
                              <input
                                required
                                focused={focused.toString()}
                                onBlur={handleFocus}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                                type="text"
                                name="alName"
                                id="alName"
                                pattern="[a-zA-Z\s]+"
                                value={item.alName}
                                placeholder="Surname / Last Name"
                                style={{ textTransform: "uppercase" }}
                              />
                              <span
                                className="form-validation-span"
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                }}
                              >
                                *No Special Character
                              </span>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                              <label htmlFor="agender">Select Gender</label>
                              <select
                                className="user-info-select"
                                required
                                name="agender"
                                id="agender"
                                autoFocus="true"
                                value={item.agender}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                              >
                                <option value="">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={4}
                              lg={4}
                              style={{ position: "relative" }}
                            >
                              <label htmlFor="adob">Date of Birth</label>
                              <input
                                required
                                type="text"
                                name="adob"
                                id="adob"
                                value={format(
                                  new Date(item.adob),
                                  "dd MMM yyyy"
                                )}
                                onClick={() =>
                                  handleOpenDateState(item.type, index, item)
                                }
                              />
                              {item.openDate && (
                                <Calendar
                                  color={"#003566"}
                                  onChange={(date) => {
                                    const tempFlightData = [
                                      ...flightPassengerData.adult,
                                    ];
                                    tempFlightData[index] = {
                                      ...tempFlightData[index],
                                      adob: new Date(date).toLocaleDateString(
                                        "sv"
                                      ),
                                      openDate: false,
                                    };
                                    setFlightPassengerData({
                                      ...flightPassengerData,
                                      adult: tempFlightData,
                                    });
                                  }}
                                  months={1}
                                  maxDate={new Date(dateBeforeTwelveYears)}
                                  className="user-info-calendar"
                                />
                              )}
                              <span
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                }}
                              >
                                *Age must be 12+
                              </span>
                            </Grid>

                            {flightData.triptype === "Outbound" ? (
                              <>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                  <label htmlFor="apassNation">
                                    Select Nationality
                                  </label>
                                  <select
                                    className="user-info-select"
                                    required
                                    name="apassNation"
                                    id="apassNation"
                                    selected={item.apassNation}
                                    onChange={(e) =>
                                      handleOnChange(e, item.type, index)
                                    }
                                    value={item.apassNation}
                                  >
                                    <option value="">Select Nationality</option>
                                    {CountryList.map((country) => {
                                      return (
                                        <option value={country.code}>
                                          {country.name.substring(0, 25)}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                  <label htmlFor="apassNo">
                                    Passport Number
                                  </label>
                                  <input
                                    required
                                    focused={focused.toString()}
                                    onBlur={handleFocus}
                                    type="text"
                                    name="apassNo"
                                    id="apassNo"
                                    placeholder="xx-xxxxxxx"
                                    pattern="^[a-zA-Z0-9]*$"
                                    value={item.apassNo}
                                    onChange={(e) =>
                                      handleOnChange(e, item.type, index)
                                    }
                                    style={{ textTransform: "uppercase" }}
                                  />
                                  <span
                                    className="form-validation-span"
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                    }}
                                  >
                                    *Only Uppercase and number
                                  </span>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  md={4}
                                  lg={4}
                                  sx={{ position: "relative" }}
                                >
                                  <label htmlFor="apassEx">
                                    Passport Expire Date
                                  </label>
                                  <input
                                    required
                                    type="text"
                                    name="apassEx"
                                    id="apassEx"
                                    value={format(
                                      new Date(item.apassEx),
                                      "dd MMM yyyy"
                                    )}
                                    onClick={() =>
                                      handleOpenPassDateState(
                                        item.type,
                                        index,
                                        item
                                      )
                                    }
                                  />
                                  {item.openPassExDate && (
                                    <Calendar
                                      color={"#003566"}
                                      onChange={(date) => {
                                        const tempFlightData = [
                                          ...flightPassengerData.adult,
                                        ];
                                        tempFlightData[index] = {
                                          ...tempFlightData[index],
                                          apassEx: new Date(
                                            date
                                          ).toLocaleDateString("sv"),
                                          openPassExDate: false,
                                        };
                                        setFlightPassengerData({
                                          ...flightPassengerData,
                                          adult: tempFlightData,
                                        });
                                      }}
                                      months={1}
                                      minDate={new Date()}
                                      className="user-info-calendar"
                                    />
                                  )}
                                </Grid>
                              </>
                            ) : null}
                          </Grid>
                        </Box>
                      </Box>
                    );
                  })}
                  {/* //todo:Adult Details end  */}

                  {/* //todo:Child details */}

                  {flightPassengerData?.child?.map((item, index) => (
                    <Box key={index} mt={4}>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        py={2}
                      >
                        <Grid item xs={12} sm={8}>
                          {travellers.length !== 0 && (
                            <Box>
                              <label htmlFor="selectTravelerADT">
                                Select Travelers
                              </label>
                              <Typography
                                sx={{
                                  color: "var(--primary-color)",
                                  fontSize: "13px",
                                }}
                              >
                                <SearchableDropDown
                                  index={index}
                                  handler={handleAutoFill}
                                  options={optionChilds}
                                />
                              </Typography>
                            </Box>
                          )}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                          <Box pt={2}>
                            <Typography
                              sx={{
                                p: "5px 30px",
                                bgcolor: "var(--primary-color)",
                                borderRadius: "5px",
                                width: "fit-content",
                                color: "var(--white)",
                              }}
                            >
                              Child- #0{index + 1}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      <Box className="adult-info">
                        <Grid container columnSpacing={2} rowSpacing={2}>
                          {/*//todo: auto fil travelers */}
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <label htmlFor="cfName">
                              Given Name / First Name
                            </label>
                            <input
                              required
                              focused={focused.toString()}
                              onBlur={handleFocus}
                              type="text"
                              name="cfName"
                              id="cfName"
                              value={item.cfName}
                              placeholder="Given Name / First Name"
                              pattern="[a-zA-Z\s]+"
                              onChange={(e) =>
                                handleOnChange(e, item.type, index)
                              }
                              style={{ textTransform: "uppercase" }}
                            />
                            <span
                              className="form-validation-span"
                              style={{
                                color: "red",
                                fontSize: "12px",
                              }}
                            >
                              *No Special Character
                            </span>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <label htmlFor="clName">Surname / Last Name</label>
                            <input
                              required
                              focused={focused.toString()}
                              onBlur={handleFocus}
                              type="text"
                              name="clName"
                              id="clName"
                              pattern="[a-zA-Z\s]+"
                              value={item.clName}
                              placeholder="Surname / Last Name"
                              onChange={(e) =>
                                handleOnChange(e, item.type, index)
                              }
                              style={{ textTransform: "uppercase" }}
                            />
                            <span
                              className="form-validation-span"
                              style={{
                                color: "red",
                                fontSize: "12px",
                              }}
                            >
                              *No Special Character
                            </span>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <label htmlFor="cgender">Select Gender</label>
                            <select
                              className="user-info-select"
                              required
                              onBlur={handleFocus}
                              onChange={(e) =>
                                handleOnChange(e, item.type, index)
                              }
                              name="cgender"
                              id="cgender"
                              value={item.cgender}
                            >
                              <option value="">Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            style={{ position: "relative" }}
                          >
                            <label htmlFor="cdob">Date of Birth</label>
                            <input
                              required
                              type="text"
                              id="cdob"
                              value={format(new Date(item.cdob), "dd MMM yyyy")}
                              onClick={() =>
                                handleOpenDateState(item.type, index, item)
                              }
                            />
                            {item.openDate && (
                              <Calendar
                                color={"#003566"}
                                onChange={(date) => {
                                  const tempFlightData = [
                                    ...flightPassengerData.child,
                                  ];
                                  tempFlightData[index] = {
                                    ...tempFlightData[index],
                                    cdob: new Date(date).toLocaleDateString(
                                      "sv"
                                    ),
                                    openDate: false,
                                  };
                                  setFlightPassengerData({
                                    ...flightPassengerData,
                                    child: tempFlightData,
                                  });
                                }}
                                months={1}
                                minDate={new Date(dateBeforeTwelveYears)}
                                maxDate={new Date(dateBeforeTwoYears)}
                                className="user-info-calendar"
                              />
                            )}

                            <span
                              style={{
                                color: "red",
                                fontSize: "12px",
                              }}
                            >
                              *Age must be between 2 to 12 years
                            </span>
                          </Grid>
                          {flightData.triptype === "Outbound" ? (
                            <>
                              <Grid item xs={12} sm={6} md={4} lg={4}>
                                <label htmlFor="cpassNation">
                                  Select Nationality
                                </label>
                                <select
                                  className="user-info-select"
                                  required
                                  name="cpassNation"
                                  id="cpassNation"
                                  onChange={(e) =>
                                    handleOnChange(e, item.type, index)
                                  }
                                  value={item.cpassNation}
                                >
                                  <option value="">Select Nationality</option>

                                  {CountryList.map((country) => {
                                    return (
                                      <option value={country.code}>
                                        {country.name?.substring(0, 25)}
                                      </option>
                                    );
                                  })}
                                </select>
                              </Grid>

                              <Grid item xs={12} sm={6} md={4} lg={4}>
                                <label htmlFor="cpassNo">Passport Number</label>
                                <input
                                  required
                                  onBlur={handleFocus}
                                  focused={focused.toString()}
                                  onChange={(e) =>
                                    handleOnChange(e, item.type, index)
                                  }
                                  type="text"
                                  name="cpassNo"
                                  id="cpassNo"
                                  pattern="^[a-zA-Z0-9]*$"
                                  placeholder="xx-xxxxxxx"
                                  value={item.cpassNo}
                                  style={{ textTransform: "uppercase" }}
                                />
                                <span
                                  className="form-validation-span"
                                  style={{ color: "red", fontSize: "12px" }}
                                >
                                  *Only Uppercase and number
                                </span>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={4}
                                sx={{ position: "relative" }}
                              >
                                <label htmlFor="cpassEx">
                                  Passport Expire Date
                                </label>

                                <input
                                  required
                                  type="text"
                                  name="cpassEx"
                                  id="cpassEx"
                                  value={format(
                                    new Date(item.cpassEx),
                                    "dd MMM yyyy"
                                  )}
                                  onClick={() =>
                                    handleOpenPassDateState(
                                      item.type,
                                      index,
                                      item
                                    )
                                  }
                                />
                                {item.openPassExDate && (
                                  <Calendar
                                    color={"#003566"}
                                    onChange={(date) => {
                                      const tempFlightData = [
                                        ...flightPassengerData.child,
                                      ];
                                      tempFlightData[index] = {
                                        ...tempFlightData[index],
                                        cpassEx: new Date(
                                          date
                                        ).toLocaleDateString("sv"),
                                        openPassExDate: false,
                                      };
                                      setFlightPassengerData({
                                        ...flightPassengerData,
                                        child: tempFlightData,
                                      });
                                    }}
                                    months={1}
                                    className="user-info-calendar"
                                    minDate={new Date()}
                                  />
                                )}
                              </Grid>
                            </>
                          ) : null}
                        </Grid>
                      </Box>
                    </Box>
                  ))}
                  {/* //todo:Child details end*/}

                  {/* //todo:infant details start  */}
                  {flightPassengerData?.infant?.map((item, index) => (
                    <Box key={index} mt={4}>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        py={2}
                      >
                        <Grid item xs={12} sm={8}>
                          {travellers.length !== 0 && (
                            <Box>
                              <label htmlFor="selectTravelerADT">
                                Select Travelers
                              </label>
                              <Typography
                                sx={{
                                  color: "var(--primary-color)",
                                  fontSize: "13px",
                                }}
                              >
                                <SearchableDropDown
                                  index={index}
                                  handler={handleAutoFill}
                                  options={optionInfants}
                                />
                              </Typography>
                            </Box>
                          )}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                          <Box pt={2}>
                            <Typography
                              sx={{
                                p: "5px 30px",
                                bgcolor: "var(--primary-color)",
                                borderRadius: "5px",
                                width: "fit-content",
                                color: "var(--white)",
                              }}
                            >
                              Infant- #0{index + 1}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      <Box className="adult-info">
                        <Grid container columnSpacing={2} rowSpacing={2}>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <label htmlFor="ifName">
                              Given Name / First Name
                            </label>
                            <input
                              required
                              focused={focused.toString()}
                              onBlur={handleFocus}
                              type="text"
                              name="ifName"
                              id="ifName"
                              value={item.ifName}
                              placeholder="Given Name / First Name"
                              pattern="[a-zA-Z\s]+"
                              onChange={(e) =>
                                handleOnChange(e, item.type, index)
                              }
                              style={{ textTransform: "uppercase" }}
                            />
                            <span
                              className="form-validation-span"
                              style={{ color: "red", fontSize: "12px" }}
                            >
                              *No Special Character
                            </span>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <label htmlFor="ilName">Surname / Last Name</label>
                            <input
                              required
                              focused={focused.toString()}
                              onBlur={handleFocus}
                              type="text"
                              name="ilName"
                              id="ilName"
                              pattern="[a-zA-Z\s]+"
                              value={item.ilName}
                              placeholder="Surname / Last Name"
                              onChange={(e) =>
                                handleOnChange(e, item.type, index)
                              }
                              style={{ textTransform: "uppercase" }}
                            />
                            <span
                              className="form-validation-span"
                              style={{ color: "red", fontSize: "12px" }}
                            >
                              *No Special Character
                            </span>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <label htmlFor="igender">Select Gender</label>
                            <select
                              className="user-info-select"
                              required
                              name="igender"
                              id="igender"
                              onChange={(e) =>
                                handleOnChange(e, item.type, index)
                              }
                              value={item.igender}
                            >
                              <option value="">Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            style={{ position: "relative" }}
                          >
                            <label htmlFor="idob">Date of Birth</label>
                            <input
                              required
                              type="text"
                              id="idob"
                              value={format(new Date(item.idob), "dd MMM yyyy")}
                              onClick={() =>
                                handleOpenDateState(item.type, index, item)
                              }
                            />
                            {item.openDate && (
                              <Calendar
                                color={"#003566"}
                                // date={new Date(item.adob)}
                                onChange={(date) => {
                                  const tempFlightData = [
                                    ...flightPassengerData.infant,
                                  ];
                                  tempFlightData[index] = {
                                    ...tempFlightData[index],
                                    idob: new Date(date).toLocaleDateString(
                                      "sv"
                                    ),
                                    openDate: false,
                                  };
                                  setFlightPassengerData({
                                    ...flightPassengerData,
                                    infant: tempFlightData,
                                  });
                                }}
                                months={1}
                                minDate={new Date(dateBeforeTwoYears)}
                                maxDate={new Date()}
                                className="user-info-calendar"
                              />
                            )}
                            <span style={{ color: "red", fontSize: "12px" }}>
                              *Age must be less then 2 years
                            </span>
                          </Grid>
                          {flightData.triptype === "Outbound" ? (
                            <>
                              <Grid item xs={12} sm={6} md={4} lg={4}>
                                <label htmlFor="ipassNation">
                                  Select Nationality
                                </label>
                                <select
                                  className="user-info-select"
                                  required
                                  name="ipassNation"
                                  id="ipassNation"
                                  value={item.ipassNation}
                                  onChange={(e) =>
                                    handleOnChange(e, item.type, index)
                                  }
                                >
                                  <option value="">Select Nationality</option>
                                  {CountryList.map((country) => {
                                    return (
                                      <option value={country.code}>
                                        {country.name.substring(0, 25)}
                                      </option>
                                    );
                                  })}
                                </select>
                              </Grid>

                              <Grid item xs={12} sm={6} md={4} lg={4}>
                                <label htmlFor="ipassNo">Passport Number</label>
                                <input
                                  required
                                  focused={focused.toString()}
                                  onBlur={handleFocus}
                                  type="text"
                                  name="ipassNo"
                                  id="ipassNo"
                                  pattern="^[a-zA-Z0-9]*$"
                                  placeholder="xx-xxxxxxx"
                                  value={item.ipassNo}
                                  onChange={(e) =>
                                    handleOnChange(e, item.type, index)
                                  }
                                  style={{ textTransform: "uppercase" }}
                                />
                                <span
                                  className="form-validation-span"
                                  style={{ color: "red", fontSize: "12px" }}
                                >
                                  *Only Uppercase and number
                                </span>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={4}
                                sx={{ position: "relative" }}
                              >
                                <label htmlFor="ipassEx">
                                  Passport Expire Date
                                </label>
                                <input
                                  required
                                  type="text"
                                  id="ipassEx"
                                  value={format(
                                    new Date(item.ipassEx),
                                    "dd MMM yyyy"
                                  )}
                                  onClick={() =>
                                    handleOpenPassDateState(
                                      item.type,
                                      index,
                                      item
                                    )
                                  }
                                />
                                {item.openPassExDate && (
                                  <Calendar
                                    color={"#003566"}
                                    onChange={(date) => {
                                      const tempFlightData = [
                                        ...flightPassengerData.infant,
                                      ];
                                      tempFlightData[index] = {
                                        ...tempFlightData[index],
                                        ipassEx: new Date(
                                          date
                                        ).toLocaleDateString("sv"),
                                        openPassExDate: false,
                                      };
                                      setFlightPassengerData({
                                        ...flightPassengerData,
                                        infant: tempFlightData,
                                      });
                                    }}
                                    months={1}
                                    className="user-info-calendar"
                                    minDate={new Date()}
                                  />
                                )}
                              </Grid>
                            </>
                          ) : null}
                        </Grid>
                      </Box>
                    </Box>
                  ))}
                  {/* infant details end  */}

                  <Box mt={6}>
                    <Typography sx={{ color: "var(--primary-color)" }}>
                      Contact Details (Airlines will send updates to this
                      contact)
                    </Typography>
                    <Box className="adult-info" sx={{ mt: 2 }}>
                      <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                          <label htmlFor="passengerEmail">Your Email</label>
                          <input
                            required
                            focused={focused.toString()}
                            onBlur={handleFocus}
                            type="email"
                            name="passengerEmail"
                            id="passengerEmail"
                            value={email}
                            placeholder="example@example.com"
                            onChange={(e) => {
                              setFlightPassengerData({
                                ...flightPassengerData,
                                email: e.target.value,
                              });
                              setEmail(e.target.value);
                            }}
                          />
                          <span
                            className="form-validation-span"
                            style={{ color: "red", fontSize: "12px" }}
                          >
                            *Enter a valid email
                          </span>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <label htmlFor="contactpersonphonenumber">
                            Phone Number
                          </label>
                          <PhoneInput
                            required
                            country={"bd"}
                            name="contactpersonphonenumber"
                            id="contactpersonphonenumber"
                            value={userPhoneNumber}
                            onChange={(phone) => {
                              setFlightPassengerData({
                                ...flightPassengerData,
                                phone: phone,
                              });
                              setUserPhoneNumber(phone);
                            }}
                            style={{
                              width: "100%",
                              backgroundColor: "#d8ebfc",
                            }}
                          />
                          <span
                            className="form-validation-span"
                            style={{ color: "red", fontSize: "12px" }}
                          >
                            *Enter a valid phone number
                          </span>
                        </Grid>
                      </Grid>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label={`By Booking/Issuing this Ticket I agree to FLy Far Ladies Terms & Conditions`}
                      />
                    </Box>
                    <Box
                      className="booking-btn"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      {userInfo?.uuid !== undefined ? (
                        <Button
                          type="submit"
                          style={{
                            backgroundColor: "var(--primary-color)",
                            color: "#fff",
                            fontSize: "14px",
                            height: "40px",
                            width: "100%",
                          }}
                        >
                          Book & Hold
                        </Button>
                      ) : (
                        <Button
                          style={{
                            backgroundColor: "var(--primary-color)",
                            color: "#fff",
                            fontSize: "14px",
                            height: "40px",
                            width: "100%",
                          }}
                          onClick={() => setOpen(true)}
                        >
                          Book & Hold
                        </Button>
                      )}
                    </Box>
                  </Box>
                </form>
              </Box>
            </Grid>
          </Grid>

          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <UserSigninSignup home="home" open={open} setOpen={setOpen} />
            </Box>
          </Modal>
        </Box>
      </ClickAwayListener>
    </>
  );
};

export default FlightUserInformationReturn;
