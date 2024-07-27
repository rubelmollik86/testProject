import {
  Checkbox,
  ClickAwayListener,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import Loader from "../../../../image/loader/Render.gif";
import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";
// import CountryDropdown from "country-dropdown-with-flags-for-react";
import "./FlightUserInfo.css";
import CountryList from "../../../CountryList";
import secureLocalStorage from "react-secure-storage";
import { format } from "date-fns";
import { Calendar } from "react-date-range";
import bookingSuccess from "../../../../image/undraw/undraw_travel_booking_re_6umu.svg";
import noFareFound from "../../../../image/undraw/undraw_not_found_re_bh2e.svg";
import serverError from "../../../../image/undraw/undraw_server_down_s-4-lk.svg";
import BookingFailed from "../../../../image/undraw/undraw_cancel_re_pkdm.svg";
import SearchableDropDown from "../../../Shared/SearchableDropDown/SearchableDropDown";

const FlightUserInfo = ({
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
}) => {
  //!end of Price Calculations
  //todo: copy of userData
  const userDataCopy = JSON.parse(JSON.stringify(userData));
  //todo:end of copy of userData

  const users = secureLocalStorage.getItem("user-info");
  const location = useLocation();
  const navigate = useNavigate();
  const [userPhoneNumber, setUserPhoneNumber] = useState(
    users?.user?.phone || "880"
  );
  const [email, setEmail] = useState(users?.user?.email || "");

  // todo: date validation
  function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
  }
  let dateAfterSixMonths = addMonths(
    new Date(userData.roundData.backarrivalDate),
    6
  );
  let dateBeforeTwelveYears = addMonths(
    new Date(userData.roundData.backarrivalDate),
    -144
  );
  let dateBeforeTwoYears = addMonths(
    new Date(userData.roundData.backarrivalDate),
    -24
  );

  // todo:end

  //todo: select traveler section
  const [travellers, setTravellers] = useState([]);
  let agentId = users?.user?.agentId;
  useEffect(() => {
    let url = `https://api.flyfarint.com/v.1.0.0/AirMaterials/AllTraveler.php?search=all&agentId=${agentId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let uniqueTravelers = [
          ...new Map(data.map((item) => [item["passNo"], item])).values(),
        ];
        setTravellers(uniqueTravelers);
      });
  }, [agentId]);

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
          userData.roundData.triptype === "Inbound"
            ? Math.round(Math.random() * 100000000 + index)
            : "",
        apassEx:
          userData.roundData.triptype === "Inbound"
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
          userData.roundData.triptype === "Inbound"
            ? Math.round(Math.random() * 100000000 + index)
            : "",
        cpassEx:
          userData.roundData.triptype === "Inbound"
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
          userData.roundData.triptype === "Inbound"
            ? Math.round(Math.random() * 100000000 + index)
            : "",
        ipassEx:
          userData.roundData.triptype === "Inbound"
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
    tripType: userData.tripType === "oneway" ? "1" : "2",
    segment: userData.roundData.segment,
    segments: {
      go:
        userData.roundData.segment === "2"
          ? [
              {
                departure: userData?.roundData?.segments?.go[0]?.departure,
                arrival: userData?.roundData?.segments?.go[0]?.arrival,
                dpTime: userData?.roundData?.segments?.go[0]?.departureTime,
                arrTime: userData?.roundData?.segments?.go[0]?.arrivalTime,
                bCode: userData?.roundData?.segments?.go[0]?.bookingcode,
                mCarrier: userData?.roundData?.segments?.go[0]?.marketingcareer,
                mCarrierFN:
                  userData?.roundData?.segments?.go[0]?.marketingflight,
                oCarrier: userData?.roundData?.segments?.go[0]?.operatingcareer,
                oCarrierFN:
                  userData?.roundData?.segments?.go[0]?.operatingflight,
              },
              {
                departure: userData?.roundData?.segments?.go[1]?.departure,
                arrival: userData?.roundData?.segments?.go[1]?.arrival,
                dpTime: userData?.roundData?.segments?.go[1]?.departureTime,
                arrTime: userData?.roundData?.segments?.go[1]?.arrivalTime,
                bCode: userData?.roundData?.segments?.go[1]?.bookingcode,
                mCarrier: userData?.roundData?.segments?.go[1]?.marketingcareer,
                mCarrierFN:
                  userData?.roundData?.segments?.go[1]?.marketingflight,
                oCarrier: userData?.roundData?.segments?.go[1]?.operatingcareer,
                oCarrierFN:
                  userData?.roundData?.segments?.go[1]?.operatingflight,
              },
            ]
          : userData.roundData.segment === "12"
          ? [
              {
                departure: userData?.roundData?.segments?.go[0]?.departure,
                arrival: userData?.roundData?.segments?.go[0]?.arrival,
                dpTime: userData?.roundData?.segments?.go[0]?.departureTime,
                arrTime: userData?.roundData?.segments?.go[0]?.arrivalTime,
                bCode: userData?.roundData?.segments?.go[0]?.bookingcode,
                mCarrier: userData?.roundData?.segments?.go[0]?.marketingcareer,
                mCarrierFN:
                  userData?.roundData?.segments?.go[0]?.marketingflight,
                oCarrier: userData?.roundData?.segments?.go[0]?.operatingcareer,
                oCarrierFN:
                  userData?.roundData?.segments?.go[0]?.operatingflight,
              },
            ]
          : userData.roundData.segment === "21"
          ? [
              {
                departure: userData?.roundData?.segments?.go[0]?.departure,
                arrival: userData?.roundData?.segments?.go[0]?.arrival,
                dpTime: userData?.roundData?.segments?.go[0]?.departureTime,
                arrTime: userData?.roundData?.segments?.go[0]?.arrivalTime,
                bCode: userData?.roundData?.segments?.go[0]?.bookingcode,
                mCarrier: userData?.roundData?.segments?.go[0]?.marketingcareer,
                mCarrierFN:
                  userData?.roundData?.segments?.go[0]?.marketingflight,
                oCarrier: userData?.roundData?.segments?.go[0]?.operatingcareer,
                oCarrierFN:
                  userData?.roundData?.segments?.go[0]?.operatingflight,
              },
              {
                departure: userData?.roundData?.segments?.go[1]?.departure,
                arrival: userData?.roundData?.segments?.go[1]?.arrival,
                dpTime: userData?.roundData?.segments?.go[1]?.departureTime,
                arrTime: userData?.roundData?.segments?.go[1]?.arrivalTime,
                bCode: userData?.roundData?.segments?.go[1]?.bookingcode,
                mCarrier: userData?.roundData?.segments?.go[1]?.marketingcareer,
                mCarrierFN:
                  userData?.roundData?.segments?.go[1]?.marketingflight,
                oCarrier: userData?.roundData?.segments?.go[1]?.operatingcareer,
                oCarrierFN:
                  userData?.roundData?.segments?.go[1]?.operatingflight,
              },
            ]
          : [
              {
                departure: userData?.roundData?.segments?.go[0]?.departure,
                arrival: userData?.roundData?.segments?.go[0]?.arrival,
                dpTime: userData?.roundData?.segments?.go[0]?.departureTime,
                arrTime: userData?.roundData?.segments?.go[0]?.arrivalTime,
                bCode: userData?.roundData?.segments?.go[0]?.bookingcode,
                mCarrier: userData?.roundData?.segments?.go[0]?.marketingcareer,
                mCarrierFN:
                  userData?.roundData?.segments?.go[0]?.marketingflight,
                oCarrier: userData?.roundData?.segments?.go[0]?.operatingcareer,
                oCarrierFN:
                  userData?.roundData?.segments?.go[0]?.operatingflight,
              },
            ],
      back:
        userData.roundData.segment === "2"
          ? [
              {
                departure: userData?.roundData?.segments?.back[0]?.departure,
                arrival: userData?.roundData?.segments?.back[0]?.arrival,
                dpTime: userData?.roundData?.segments?.back[0]?.departureTime,
                arrTime: userData?.roundData?.segments?.back[0]?.arrivalTime,
                bCode: userData?.roundData?.segments?.back[0]?.bookingcode,
                mCarrier:
                  userData?.roundData?.segments?.back[0]?.marketingcareer,
                mCarrierFN:
                  userData?.roundData?.segments?.back[0]?.marketingflight,
                oCarrier:
                  userData?.roundData?.segments?.back[0]?.operatingcareer,
                oCarrierFN:
                  userData?.roundData?.segments?.back[0]?.operatingflight,
              },
              {
                departure: userData?.roundData?.segments?.back[1]?.departure,
                arrival: userData?.roundData?.segments?.back[1]?.arrival,
                dpTime: userData?.roundData?.segments?.back[1]?.departureTime,
                arrTime: userData?.roundData?.segments?.back[1]?.arrivalTime,
                bCode: userData?.roundData?.segments?.back[1]?.bookingcode,
                mCarrier:
                  userData?.roundData?.segments?.back[1]?.marketingcareer,
                mCarrierFN:
                  userData?.roundData?.segments?.back[1]?.marketingflight,
                oCarrier:
                  userData?.roundData?.segments?.back[1]?.operatingcareer,
                oCarrierFN:
                  userData?.roundData?.segments?.back[1]?.operatingflight,
              },
            ]
          : userData.roundData.segment === "12"
          ? [
              {
                departure: userData?.roundData?.segments?.back[0]?.departure,
                arrival: userData?.roundData?.segments?.back[0]?.arrival,
                dpTime: userData?.roundData?.segments?.back[0]?.departureTime,
                arrTime: userData?.roundData?.segments?.back[0]?.arrivalTime,
                bCode: userData?.roundData?.segments?.back[0]?.bookingcode,
                mCarrier:
                  userData?.roundData?.segments?.back[0]?.marketingcareer,
                mCarrierFN:
                  userData?.roundData?.segments?.back[0]?.marketingflight,
                oCarrier:
                  userData?.roundData?.segments?.back[0]?.operatingcareer,
                oCarrierFN:
                  userData?.roundData?.segments?.back[0]?.operatingflight,
              },
            ]
          : userData.roundData.segment === "21"
          ? [
              {
                departure: userData?.roundData?.segments?.back[0]?.departure,
                arrival: userData?.roundData?.segments?.back[0]?.arrival,
                dpTime: userData?.roundData?.segments?.back[0]?.departureTime,
                arrTime: userData?.roundData?.segments?.back[0]?.arrivalTime,
                bCode: userData?.roundData?.segments?.back[0]?.bookingcode,
                mCarrier:
                  userData?.roundData?.segments?.back[0]?.marketingcareer,
                mCarrierFN:
                  userData?.roundData?.segments?.back[0]?.marketingflight,
                oCarrier:
                  userData?.roundData?.segments?.back[0]?.operatingcareer,
                oCarrierFN:
                  userData?.roundData?.segments?.back[0]?.operatingflight,
              },
              {
                departure: userData?.roundData?.segments?.back[1]?.departure,
                arrival: userData?.roundData?.segments?.back[1]?.arrival,
                dpTime: userData?.roundData?.segments?.back[1]?.departureTime,
                arrTime: userData?.roundData?.segments?.back[1]?.arrivalTime,
                bCode: userData?.roundData?.segments?.back[1]?.bookingcode,
                mCarrier:
                  userData?.roundData?.segments?.back[1]?.marketingcareer,
                mCarrierFN:
                  userData?.roundData?.segments?.back[1]?.marketingflight,
                oCarrier:
                  userData?.roundData?.segments?.back[1]?.operatingcareer,
                oCarrierFN:
                  userData?.roundData?.segments?.back[1]?.operatingflight,
              },
            ]
          : [
              {
                departure: userData?.roundData?.segments?.back[0]?.departure,
                arrival: userData?.roundData?.segments?.back[0]?.arrival,
                dpTime: userData?.roundData?.segments?.back[0]?.departureTime,
                arrTime: userData?.roundData?.segments?.back[0]?.arrivalTime,
                bCode: userData?.roundData?.segments?.back[0]?.bookingcode,
                mCarrier:
                  userData?.roundData?.segments?.back[0]?.marketingcareer,
                mCarrierFN:
                  userData?.roundData?.segments?.back[0]?.marketingflight,
                oCarrier:
                  userData?.roundData?.segments?.back[0]?.operatingcareer,
                oCarrierFN:
                  userData?.roundData?.segments?.back[0]?.operatingflight,
              },
            ],
    },
  });
  // console.log(flightPassengerData);
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

  // console.log(JSON.stringify(userData));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoaded(false);
    e.target.reset();
    let url = "https://api.flyfarint.com/v.1.0.0/Sabre/AirBooking.php";
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: JSON.stringify(flightPassengerData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // console.log(JSON.stringify(flightPassengerData));
        if (data.status === "success" && data.message !== null) {
          let bookingInfo = {
            agentId: users?.user?.agentId,
            staffId: users?.user?.staffId,
            system: userData.roundData.system,
            from: userData.roundData.godeparture,
            to: userData.roundData.backdeparture,
            airlines: userData.roundData.careerName,
            tripType: userData.tripType,
            travelDate: userData?.roundData?.segments[0]?.departureTime,
            name: `${flightPassengerData.adult[0].afName} ${flightPassengerData.adult[0].alName} `,
            phone: flightPassengerData.phone,
            email: flightPassengerData.email,
            pnr: data.message.CreatePassengerNameRecordRS.ItineraryRef.ID,
            pax: adultCount + childCount + infant,
            adultcount: adultCount,
            childcount: childCount,
            infantcount: infant,
            netcost: Number(userData.roundData.price),
            adultcostbase: Math.round(adultPrice + serviceFeeAdult),
            childcostbase: Math.round(childPrice + serviceFeeChild),
            infantcostbase: Math.round(infPrice + serviceFeeInfant),
            adultcosttax: Math.round(adultTaxPrice),
            childcosttax: Math.round(childTaxPrice),
            infantcosttax: Math.round(infTaxPrice),
            grosscost: Math.round(totalFare),
            basefare: Math.round(totalBaseFare),
            tax: Math.round(totalTax),
            timelimit: new Date(limitTime),
            journeyType: userData.roundData.triptype,
            coupon: coupon || "",
            adultbag: adultCount
              ? `go-${goAdultBaggage}|back-${backAdultBaggage}`
              : "",
            childbag: childCount
              ? `go-${goChildBaggage}|back-${backChildBaggage}`
              : "",
            infantbag: infant
              ? `go-${goInfantBaggage}|back-${backInfantBaggage}`
              : "",
            refundable:
              userData.roundData.refundable === "Refundable" ? "yes" : "no",
          };
          //todo: add terminal to body
          userDataCopy.roundData.segments.go.map((item) => {
            item["departureTerminal"] = Number(
              data?.message.CreatePassengerNameRecordRS?.TravelItineraryRead?.TravelItinerary?.ItineraryInfo?.ReservationItems?.Item[1]?.FlightSegment[0]?.DestinationLocation?.Terminal.split(
                " "
              )[1]
            );
            item["arrivalTerminal"] = Number(
              data?.message?.CreatePassengerNameRecordRS?.TravelItineraryRead?.TravelItinerary?.ItineraryInfo?.ReservationItems?.Item[1]?.FlightSegment[0]?.DestinationLocation?.Terminal.split(
                " "
              )[1]
            );
          });
          userDataCopy.roundData.segments.back.map((item) => {
            item["departureTerminal"] = Number(
              data?.message.CreatePassengerNameRecordRS?.TravelItineraryRead?.TravelItinerary?.ItineraryInfo?.ReservationItems?.Item[1]?.FlightSegment[0]?.DestinationLocation?.Terminal.split(
                " "
              )[1]
            );
            item["arrivalTerminal"] = Number(
              data?.message?.CreatePassengerNameRecordRS?.TravelItineraryRead?.TravelItinerary?.ItineraryInfo?.ReservationItems?.Item[1]?.FlightSegment[0]?.DestinationLocation?.Terminal.split(
                " "
              )[1]
            );
          });
          //todo: end of terminal adding section
          // console.log(
          //   JSON.stringify({
          //     ...userDataCopy,
          //     pnr: data?.message?.CreatePassengerNameRecordRS?.ItineraryRef?.ID,
          //   })
          // );
          let url =
            "https://api.flyfarint.com/v.1.0.0/AirBooking/PreBooking.php";
          fetch(url, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: JSON.stringify(bookingInfo),
          })
            .then((res) => res.json())
            .then((bookingDetails) => {
              // console.log(bookingDetails);
              // console.log(JSON.stringify(bookingInfo));
              if (bookingDetails.status === "success") {
                let url =
                  "https://api.flyfarint.com/v.1.0.0/AirBooking/saveBooking.php";
                fetch(url, {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type":
                      "application/x-www-form-urlencoded;charset=UTF-8",
                  },
                  body: JSON.stringify({
                    ...userData,
                    pnr: data.message.CreatePassengerNameRecordRS.ItineraryRef
                      .ID,
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.status === "success") {
                      let url =
                        "https://api.flyfarint.com/v.1.0.0/AirMaterials/AddPax.php";
                      let body = {
                        ...flightPassengerData,
                        bookingId: bookingDetails.BookingId,
                        agentId: users?.user?.agentId,
                      };
                      fetch(url, {
                        method: "POST",
                        headers: {
                          Accept: "application/json",
                          "Content-Type":
                            "application/x-www-form-urlencoded;charset=UTF-8",
                        },
                        body: JSON.stringify(body),
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
                              html: "Thank you so much for Book a flight ticket with fly far international. Please issue your booking ticket within the time limit specified, otherwise your booking request will be automatically cancelled.",
                              confirmButtonColor: "#dc143c",
                              confirmButtonText: "Ok",
                            }).then(function () {
                              setIsLoaded(true);
                              navigate("/dashboard/congratulation", {
                                state: {
                                  bookingData: data,
                                  bookingInfo: bookingInfo,
                                  allFlightData: { userData, searchResult },
                                  bookingDetails,
                                },
                              });
                            });
                          } else {
                            Swal.fire({
                              imageWidth: 400,
                              imageHeight: 200,
                              imageAlt: "Custom image",
                              title: "Success",
                              html: "Thank you so much for Book a flight ticket with fly far international. Please issue your booking ticket within the time limit specified, otherwise your booking request will be automatically cancelled.",
                              confirmButtonColor: "#dc143c",
                              confirmButtonText: "Ok",
                            }).then(function () {
                              setIsLoaded(true);
                              navigate("/dashboard/congratulation", {
                                state: {
                                  bookingData: data,
                                  bookingInfo: bookingInfo,
                                  allFlightData: { userData, searchResult },
                                  bookingDetails,
                                },
                              });
                            });
                          }
                        })
                        .catch((err) => {
                          console.log(err.message);
                          Swal.fire({
                            imageUrl: bookingSuccess,
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: "Custom image",
                            title: "Success",
                            html: "Thank you so much for Book a flight ticket with fly far international. Please issue your booking ticket within the time limit specified, otherwise your booking request will be automatically cancelled.",
                            confirmButtonColor: "#dc143c",
                            confirmButtonText: "Ok",
                          }).then(function () {
                            setIsLoaded(true);
                            navigate("/dashboard/congratulation", {
                              state: {
                                bookingData: data,
                                bookingInfo: bookingInfo,
                                bookId: bookingDetails,
                                allFlightData: { userData, searchResult },
                                bookingDetails,
                              },
                            });
                          });
                        });
                    } else {
                      throw new Error("Error");
                    }
                  })
                  .catch((err) => {
                    console.log(err.message);
                    let url =
                      "https://api.flyfarint.com/v.1.0.0/AirBooking/AirCancel.php";
                    let body = JSON.stringify({
                      bookingId: bookingDetails.BookingId,
                      cancelBy: users?.user?.name,
                      platform: "B2B",
                    });
                    console.log(body);
                    fetch(url, {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type":
                          "application/x-www-form-urlencoded;charset=UTF-8",
                      },
                      body: body,
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        if (data.status === "success") {
                          Swal.fire({
                            imageUrl: BookingFailed,
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: "Custom image",
                            title: "Booking Failed",
                            html: "Booking Failed.If you have any queries please contact us at <strong>support@flyfarint.com or 01755-572099, 09606912912</strong>",
                            confirmButtonColor: "#dc143c",
                            confirmButtonText: "Please Try Another Flights.",
                          }).then(function () {
                            setIsLoaded(true);
                            navigate(-1);
                          });
                        }
                      });
                  });
              } else {
                throw new Error(bookingDetails.message);
              }
            })
            .catch((err) => {
              console.log(err.message);
              //todo: booking failed section
              let url =
                "https://api.flyfarint.com/v.1.0.0/AirBooking/BookingFailed.php";
              let body = JSON.stringify({
                agentId: users?.user?.agentId || "Agent",
                staffId: users?.user?.staffId || "Staff",
                system: userData.roundData.system,
                from: userData.roundData.godeparture,
                to: userData.roundData.backdeparture,
                deptime: userData.roundData.godepartureDate || "",
                arrtime: userData.roundData.backarrivalDate || "",
                route: userData?.roundData?.segments?.go?.map(
                  (item) => `${item.departure}-${item.arrival}`
                ),
                airlines: userData.roundData.careerName,
                tripType: userData.tripType,
                pax: adultCount + childCount + infant,
                adultcount: adultCount,
                childcount: childCount,
                infantcount: infant,
                netcost:
                  couponAppliedMessage.status === "success"
                    ? Number(userData.roundData.price - 100)
                    : Number(userData.roundData.price),
                flightnumber: userData?.roundData?.segments?.go?.map(
                  (item) => `${item.marketingflight}`
                ),
                cabinclass: userData?.roundData?.segments?.go?.map(
                  (item) => `${item.bookingcode}`
                ),
                SearchID: "",
                ResultID: "",
              });
              fetch(url, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
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
                    text: "No Fare Available.",
                    html: "No Fare Available.If you have any queries please contact us at <strong>support@flyfarint.com or 01755-572099, 09606912912</strong>",
                    confirmButtonColor: "#dc143c",
                    confirmButtonText: "Please Try Another Flights.",
                  }).then(function () {
                    setIsLoaded(true);
                    navigate(-1);
                  });
                })
                .catch((err) => {
                  Swal.fire({
                    // icon: "error",
                    imageUrl: noFareFound,
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: "Custom image",
                    html: "No Fare Available.If you have any queries please contact us at <strong>support@flyfarint.com or 01755-572099, 09606912912</strong>",
                    confirmButtonColor: "#dc143c",
                    confirmButtonText: "Please Try Another Flights.",
                  }).then(function () {
                    setIsLoaded(true);
                    navigate(-1);
                  });
                });
            });
        } else {
          throw new Error(data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
        //todo: booking failed section
        let url =
          "https://api.flyfarint.com/v.1.0.0/AirBooking/BookingFailed.php";
        let body = JSON.stringify({
          agentId: users?.user?.agentId || "Agent",
          staffId: users?.user?.staffId || "Staff",
          system: userData.roundData.system,
          from: userData.roundData.godeparture,
          to: userData.roundData.backdeparture,
          deptime: userData.roundData.godepartureDate || "",
          arrtime: userData.roundData.backarrivalDate || "",
          route: userData?.roundData?.segments?.go?.map(
            (item) => `${item.departure}-${item.arrival}`
          ),
          airlines: userData.roundData.careerName,
          tripType: userData.tripType,
          pax: adultCount + childCount + infant,
          adultcount: adultCount,
          childcount: childCount,
          infantcount: infant,
          netcost:
            couponAppliedMessage.status === "success"
              ? Number(userData.roundData.price - 100)
              : Number(userData.roundData.price),
          flightnumber: userData?.roundData?.segments?.go?.map(
            (item) => `${item.marketingflight}`
          ),
          cabinclass: userData?.roundData?.segments?.go?.map(
            (item) => `${item.bookingcode}`
          ),
          SearchID: flightPassengerData.SearchID,
          ResultID: flightPassengerData.ResultID,
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
              imageUrl: serverError,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
              title: "No Fare Available",
              html: "If you have any queries please contact us at <strong>support@flyfarint.com or 01755-572099, 09606912912</strong>",
              confirmButtonColor: "#dc143c",
              confirmButtonText: "Please Try Another Flights.",
            }).then(function () {
              setIsLoaded(true);
              navigate(-1);
            });
          })
          .catch((err) => {
            Swal.fire({
              imageUrl: serverError,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
              title: "No Fare Available",
              html: "If you have any queries please contact us at <strong>support@flyfarint.com or 01755-572099, 09606912912</strong>",
              confirmButtonColor: "#dc143c",
              confirmButtonText: "Please Try Another Flights.",
            }).then(function () {
              setIsLoaded(true);
              navigate(-1);
            });
          });
      });
  };

  const handleEmailChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newPassengerData = { ...flightPassengerData };
    newPassengerData[field] = value;
    setFlightPassengerData(newPassengerData);
    setEmail(e.target.value);
  };
  const validateNumber = (e) => {
    const field = e.target.name;
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newPassengerData = { ...flightPassengerData };
    newPassengerData[field] = value;
    setFlightPassengerData(newPassengerData);
    // setPassengerPhone(e.target.value.replace(/[^0-9]/g, ""));
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

  const handleClickAway = () => {};

  //todo: add traveler states
  const adultTravelers = travellers.filter((item) => item.type === "ADT");
  const childTravelers = travellers.filter((item) => item.type === "CNN");
  const infantTravelers = travellers.filter((item) => item.type === "INF");
  const optionAdults = adultTravelers.map((x, index) => {
    if (x.type === "ADT") {
      return {
        value: x,
        label: `Name:${x.fName} ${x.lName} Type:${x.type} Gender:${x.gender} Nation:${x.passNation} Dob:${x.dob} PassNo:${x.passNo} PassEx${x.passEx}`,
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
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box mt={2} sx={{ position: "relative" }}>
        <Grid container>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="right-overflow1"
          >
            <Box>
              <h4 className="flight-h4"> Passenger Details</h4>

              {/* <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  style={{ marginBottom: "10px" }}
                >
                  <FormControlLabel
                    control={<Checkbox onChange={handleIntPassenger} />}
                    label="International Passenger?"
                  />
                </Grid> */}

              <form onSubmit={handleSubmit}>
                {flightPassengerData.adult.map((item, index) => {
                  return (
                    <Box key={index}>
                      <Box className="adult-h4">
                        <h4>Adult-{index + 1}</h4>
                      </Box>
                      <Box className="adult-info">
                        <Grid
                          container
                          spacing={4}
                          sx={{ padding: "26px 0px" }}
                        >
                          {/*//todo: auto fil travelers */}
                          {travellers.length !== 0 && (
                            <Grid item xs={12} md={12} lg={12}>
                              <label htmlFor="selectTravelerADT">
                                Select Travelers
                              </label>
                              <SearchableDropDown
                                index={index}
                                handler={handleAutoFill}
                                options={optionAdults}
                              />
                            </Grid>
                          )}
                          <Grid item xs={12} md={6} lg={6}>
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
                                fontSize: "14px",
                              }}
                            >
                              *No Special Character
                            </span>
                          </Grid>
                          <Grid item xs={12} md={6} lg={6}>
                            <label htmlFor="alName">Surname / Last Name</label>
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
                                fontSize: "14px",
                              }}
                            >
                              *No Special Character
                            </span>
                          </Grid>
                          <Grid item xs={12} md={6} lg={6}>
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
                            md={6}
                            lg={6}
                            style={{ position: "relative" }}
                          >
                            <label htmlFor="adob">Date of Birth</label>
                            {/* <input
                              required
                              type="date"
                              name="adob"
                              id="adob"
                              value={item.adob}
                              max={`${new Date(
                                dateBeforeTwelveYears
                              ).toLocaleDateString("sv")}`}
                              onChange={(e) =>
                                handleOnChange(e, item.type, index)
                              }
                            /> */}

                            <input
                              required
                              type="text"
                              name="adob"
                              id="adob"
                              value={format(new Date(item.adob), "dd MMM yyyy")}
                              onClick={() =>
                                handleOpenDateState(item.type, index, item)
                              }
                            />
                            {item.openDate && (
                              <Calendar
                                color={"var(--primary-color)"}
                                // date={new Date(item.adob)}
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
                                fontSize: "14px",
                              }}
                            >
                              *Age Should be 12+
                            </span>
                          </Grid>

                          {userData.roundData.triptype === "Outbound" ? (
                            <>
                              <Grid item xs={12} md={6} lg={6}>
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
                                        {country.name}
                                      </option>
                                    );
                                  })}
                                </select>
                                {/* <CountryDropdown
                              id="UNIQUE_ID"
                              name="apassNation"
                              preferredCountries={["bd", "in"]}
                              value={item.apassNation}
                              handleChange={(e) =>
                                handleOnChange(e, item.type, index)
                              }
                            /> */}
                              </Grid>
                              <Grid item xs={12} md={6} lg={6}>
                                <label htmlFor="apassNo">Passport Number</label>
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
                                    fontSize: "14px",
                                  }}
                                >
                                  *Only Uppercase and number
                                </span>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                md={6}
                                lg={6}
                                sx={{ position: "relative" }}
                              >
                                <label htmlFor="apassEx">
                                  Passport Expire Date
                                </label>
                                {/* <input
                                  required
                                  type="date"
                                  name="apassEx"
                                  id="apassEx"
                                  value={item.apassEx}
                                  min={`${new Date(
                                    dateAfterSixMonths
                                  ).toLocaleDateString("sv")}`}
                                  onChange={(e) =>
                                    handleOnChange(e, item.type, index)
                                  }
                                /> */}
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
                                    color={"var(--primary-color)"}
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
                                    className="user-info-calendar"
                                    minDate={new Date()}
                                  />
                                )}
                              </Grid>
                            </>
                          ) : null}
                        </Grid>
                        {/* <Box className="checkBox">
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="checkboxAdult"
                      onChange={(e) => handleOnChange(e, item.type, index)}
                    />
                    <label htmlFor="vehicle1">
                      {" "}
                      Add this Person to traveled list
                    </label>
                    <br></br>
                  </Box> */}
                      </Box>
                    </Box>
                  );
                })}
                {/*  Adult Details end  */}

                {/* Child details */}

                {flightPassengerData.child.map((item, index) => (
                  <Box>
                    <Box className="adult-h4">
                      <h4>Child-{index + 1}</h4>
                    </Box>

                    <Box className="adult-info">
                      <Grid container spacing={4} sx={{ padding: "26px 0px" }}>
                        {/*//todo: auto fil travelers */}
                        {travellers.length !== 0 && (
                          <Grid item xs={12} md={12} lg={12}>
                            <label htmlFor="selectTravelerADT">
                              Select Travelers
                            </label>
                            <SearchableDropDown
                              index={index}
                              handler={handleAutoFill}
                              options={optionChilds}
                            />
                          </Grid>
                        )}
                        <Grid item xs={12} md={6} lg={6}>
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
                              fontSize: "14px",
                            }}
                          >
                            *No Special Character
                          </span>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
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
                              fontSize: "14px",
                            }}
                          >
                            *No Special Character
                          </span>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
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
                          md={6}
                          lg={6}
                          style={{ position: "relative" }}
                        >
                          <label htmlFor="cdob">Date of Birth</label>
                          {/* <input
                            required
                            type="date"
                            name="cdob"
                            id="cdob"
                            value={item.cdob}
                            min={`${new Date(
                              dateBeforeTwelveYears
                            ).toLocaleDateString("sv")}`}
                            max={`${new Date(
                              dateBeforeTwoYears
                            ).toLocaleDateString("sv")}`}
                            onChange={(e) =>
                              handleOnChange(e, item.type, index)
                            }
                          /> */}
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
                              color={"var(--primary-color)"}
                              // date={new Date(item.adob)}
                              onChange={(date) => {
                                const tempFlightData = [
                                  ...flightPassengerData.child,
                                ];
                                tempFlightData[index] = {
                                  ...tempFlightData[index],
                                  cdob: new Date(date).toLocaleDateString("sv"),
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
                              fontSize: "14px",
                            }}
                          >
                            *Age should be more than 2 years and less the 12
                            years
                          </span>
                        </Grid>
                        {userData.roundData.triptype === "Outbound" ? (
                          <>
                            <Grid item xs={12} md={6} lg={6}>
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
                                {/* <option value="BD">Bangladesh</option> */}
                                {CountryList.map((country) => {
                                  return (
                                    <option value={country.code}>
                                      {country.name}
                                    </option>
                                  );
                                })}
                              </select>
                              {/* <CountryDropdown
                        id="UNIQUE_ID"
                        name="apassNation"
                        preferredCountries={["bd", "in"]}
                        value={item.apassNation}
                        handleChange={(e) =>
                          handleOnChange(e, item.type, index)
                        }
                      /> */}
                            </Grid>

                            <Grid item xs={12} md={6} lg={6}>
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
                                style={{ color: "red", fontSize: "14px" }}
                              >
                                *Only Uppercase and number
                              </span>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              md={6}
                              lg={6}
                              sx={{ position: "relative" }}
                            >
                              <label htmlFor="cpassEx">
                                Passport Expire Date
                              </label>
                              {/* <input
                                required
                                type="date"
                                name="cpassEx"
                                id="cpassEx"
                                value={item.cpassEx}
                                min={`${new Date(
                                  dateAfterSixMonths
                                ).toLocaleDateString("sv")}`}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                              /> */}
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
                                  color={"var(--primary-color)"}
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
                {/* Child details end*/}

                {/* infant details start  */}
                {flightPassengerData.infant.map((item, index) => (
                  <Box>
                    <Box className="adult-h4">
                      <h4>Infant-{index + 1}</h4>
                    </Box>

                    <Box className="adult-info">
                      <Grid container spacing={4} sx={{ padding: "26px 0px" }}>
                        {/*//todo: auto fil travelers */}
                        {travellers.length !== 0 && (
                          <Grid item xs={12} md={12} lg={12}>
                            <label htmlFor="selectTravelerADT">
                              Select Travelers
                            </label>
                            <SearchableDropDown
                              index={index}
                              handler={handleAutoFill}
                              options={optionInfants}
                            />
                          </Grid>
                        )}
                        <Grid item xs={12} md={6} lg={6}>
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
                            style={{ color: "red", fontSize: "14px" }}
                          >
                            *No Special Character
                          </span>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
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
                            style={{ color: "red", fontSize: "14px" }}
                          >
                            *No Special Character
                          </span>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
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
                          md={6}
                          lg={6}
                          style={{ position: "relative" }}
                        >
                          <label htmlFor="idob">Date of Birth</label>
                          {/* <input
                            required
                            type="date"
                            name="idob"
                            id="idob"
                            value={item.idob}
                            min={`${new Date(
                              dateBeforeTwoYears
                            ).toLocaleDateString("sv")}`}
                            max={`${new Date().toLocaleDateString("sv")}`}
                            onChange={(e) =>
                              handleOnChange(e, item.type, index)
                            }
                          /> */}

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
                              color={"var(--primary-color)"}
                              // date={new Date(item.adob)}
                              onChange={(date) => {
                                const tempFlightData = [
                                  ...flightPassengerData.infant,
                                ];
                                tempFlightData[index] = {
                                  ...tempFlightData[index],
                                  idob: new Date(date).toLocaleDateString("sv"),
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
                          <span style={{ color: "red", fontSize: "14px" }}>
                            *Age should be less then 2 years
                          </span>
                        </Grid>
                        {userData.roundData.triptype === "Outbound" ? (
                          <>
                            <Grid item xs={12} md={6} lg={6}>
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
                                {/* <option value="BD">Bangladesh</option> */}
                                {CountryList.map((country) => {
                                  return (
                                    <option value={country.code}>
                                      {country.name}
                                    </option>
                                  );
                                })}
                              </select>
                              {/* <CountryDropdown
                        id="UNIQUE_ID"
                        name="apassNation"
                        preferredCountries={["bd", "in"]}
                        value={item.apassNation}
                        handleChange={(e) =>
                          handleOnChange(e, item.type, index)
                        }
                      /> */}
                            </Grid>

                            <Grid item xs={12} md={6} lg={6}>
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
                                style={{ color: "red", fontSize: "14px" }}
                              >
                                *Only Uppercase and number
                              </span>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              md={6}
                              lg={6}
                              sx={{ position: "relative" }}
                            >
                              <label htmlFor="ipassEx">
                                Passport Expire Date
                              </label>
                              {/* <input
                                required
                                type="date"
                                name="ipassEx"
                                id="ipassEx"
                                value={item.ipassEx}
                                min={`${new Date(
                                  dateAfterSixMonths
                                ).toLocaleDateString("sv")}`}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                              /> */}
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
                                  color={"var(--primary-color)"}
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

                <Box className="conatct-detail">
                  <p>
                    Contact Details (Airlines will send updates to this contact)
                  </p>
                  <Box className="adult-info" sx={{ mt: 2 }}>
                    <Grid container spacing={5}>
                      <Grid item xs={12} md={6} lg={6}>
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
                          style={{ color: "red", fontSize: "14px" }}
                        >
                          *Enter a valid email
                        </span>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
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
                          style={{ color: "red", fontSize: "14px" }}
                        >
                          *Enter a valid phone number
                        </span>
                      </Grid>{" "}
                      <Grid item xs={12} md={12} lg={12}>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="By Booking/Issuing this Ticket I agree to Fly Far International Terms & Conditions"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box className="booking-btn">
                    <button type="submit">Book Ticket</button>
                  </Box>
                </Box>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ClickAwayListener>
  );
};

export default FlightUserInfo;
