import {
  Checkbox,
  ClickAwayListener,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Calendar } from "react-date-range";
import { format } from "date-fns";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import secureLocalStorage from "react-secure-storage";
import bookingSuccess from "../../images/undraw/undraw_travel_booking_re_6umu.svg";
import noFareFound from "../../images/undraw/undraw_not_found_re_bh2e.svg";
import serverError from "../../images/undraw/undraw_server_down_s-4-lk.svg";
import SearchableDropDown from "../Shared/SearchableDropDown/SearchableDropDown";
import CountryList from "../Shared/CountryList";
import axios from "axios";
import flightData from "../flightData";

const MultiCityUserInfo = ({
  userData,
  searchResult,
  adultPrice,
  childPrice,
  infPrice,
  adultTaxPrice,
  childTaxPrice,
  infTaxPrice,
  totalBaseFare,
  inTotalBaseFare,
  totalTax,
  totalFare,
  limitTime,
  isLoaded,
  setIsLoaded,
  clientFare,
  serviceFeeAdult,
  serviceFeeChild,
  serviceFeeInfant,
  coupon,
  couponAppliedMessage,
  adultBaggage,
  childBaggage,
  infantBaggage,
}) => {
  //todo: copy of userData
  const userDataCopy = JSON.parse(JSON.stringify(userData));
  //todo:end of copy of userData

  //todo:
  const users = secureLocalStorage.getItem("user-info");
  let agentId = users?.user?.agentId;
  let subagentId = users?.user?.subagentId;

  const location = useLocation();
  const navigate = useNavigate();
  const [userPhoneNumber, setUserPhoneNumber] = useState(
    users?.user?.phone || "880"
  );
  const [email, setEmail] = useState(users?.user?.email || "");
  const { adultCount, childCount, infant } = userData;

  //todo: select traveler section
  const [travellers, setTravellers] = useState([]);

  useEffect(() => {
    let url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/Traveller/all.php?agentId=${agentId}&subagentId=${subagentId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let uniqueTravelers = [
          ...new Map(data.map((item) => [item["passNo"], item])).values(),
        ];
        setTravellers(uniqueTravelers);
      });
  }, [agentId]);

  const [companyName, setCompanyName] = useState("");
  const [siteConfig, setSiteConfig] = useState({});
  useEffect(() => {
    //todo: fetching the data
    axios
      .get(
        `https://api.flyfarint.com/v.1.0.0/WhiteLabel/MyAccount/all.php?website=${window.location.hostname.replace(
          "www.",
          ""
        )}`
      )
      .then((res) => {
        setSiteConfig(res?.data);
        setCompanyName(res?.data?.company_name);
      });
  }, []);

  // todo: date validation
  function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
  }
  let dateAfterSixMonths = addMonths(
    new Date(userData.flightData.arrivalDate),
    6
  );
  let dateBeforeTwelveYears = addMonths(
    new Date(userData.flightData.arrivalDate),
    -144
  );
  let dateBeforeTwoYears = addMonths(
    new Date(userData.flightData.arrivalDate),
    -24
  );
  // todo:end

  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };

  const [flightPassengerData, setFlightPassengerData] = useState({
    adult: [...new Array(adultCount)].map((item, index) => {
      return {
        type: "ADT",
        afName: "",
        alName: "",
        agender: "",
        adob: format(new Date(), "dd MMM yyyy"),
        apassNation: "BD",
        apassNo: "",
        apassEx: format(new Date(dateAfterSixMonths), "dd MMM yyyy"),
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
        cpassNo: "",
        cpassEx: format(new Date(dateAfterSixMonths), "dd MMM yyyy"),
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
        ipassNo: "",
        ipassEx: format(new Date(dateAfterSixMonths), "dd MMM yyyy"),
        openDate: false,
        openPassExDate: false,
      };
    }),
    adultCount: adultCount,
    childCount: childCount,
    infantCount: infant,
    email: email,
    phone: userPhoneNumber,
    tripType: userData.tripType,
    SearchID:
      userData?.flightData?.system?.toLowerCase() === "flyhub"
        ? searchResult.SearchId
        : null,
    ResultID:
      userData?.flightData?.system?.toLowerCase() === "flyhub"
        ? searchResult.Results[0].ResultID
        : null,
    segment:
      userData?.flightData?.system?.toLowerCase() === ("sabre" || "galileo")
        ? userData.flightData.segment
        : null,
    segments:
      userData?.flightData?.system?.toLowerCase() === "galileo"
        ? userData.flightData.segment === "1"
          ? [
              {
                cr: searchResult.airAirItinerary.airAirSegment.attributes
                  .Carrier,
                airSegKey:
                  searchResult.airAirItinerary.airAirSegment.attributes.Key,
                bcode:
                  searchResult.airAirItinerary.airAirSegment.attributes
                    .ClassOfService,
                dep: searchResult.airAirItinerary.airAirSegment.attributes
                  .Origin,
                arr: searchResult.airAirItinerary.airAirSegment.attributes
                  .Destination,
                Fno: searchResult.airAirItinerary.airAirSegment.attributes
                  .FlightNumber,
                G: searchResult.airAirItinerary.airAirSegment.attributes.Group,
                DepTime:
                  searchResult.airAirItinerary.airAirSegment.attributes
                    .DepartureTime,
                ArrTime:
                  searchResult.airAirItinerary.airAirSegment.attributes
                    .ArrivalTime,
              },
            ]
          : [
              {
                cr: searchResult.airAirItinerary.airAirSegment[0].attributes
                  .Carrier,
                airSegKey:
                  searchResult.airAirItinerary.airAirSegment[0].attributes.Key,
                bcode:
                  searchResult.airAirItinerary.airAirSegment[0].attributes
                    .ClassOfService,
                dep: searchResult.airAirItinerary.airAirSegment[0].attributes
                  .Origin,
                arr: searchResult.airAirItinerary.airAirSegment[0].attributes
                  .Destination,
                Fno: searchResult.airAirItinerary.airAirSegment[0].attributes
                  .FlightNumber,
                G: searchResult.airAirItinerary.airAirSegment[0].attributes
                  .Group,
                DepTime:
                  searchResult.airAirItinerary.airAirSegment[0].attributes
                    .DepartureTime,
                ArrTime:
                  searchResult.airAirItinerary.airAirSegment[0].attributes
                    .ArrivalTime,
              },
              {
                cr: searchResult.airAirItinerary.airAirSegment[1].attributes
                  .Carrier,
                airSegKey:
                  searchResult.airAirItinerary.airAirSegment[1].attributes.Key,
                bcode:
                  searchResult.airAirItinerary.airAirSegment[1].attributes
                    .ClassOfService,
                dep: searchResult.airAirItinerary.airAirSegment[1].attributes
                  .Origin,
                arr: searchResult.airAirItinerary.airAirSegment[1].attributes
                  .Destination,
                Fno: searchResult.airAirItinerary.airAirSegment[1].attributes
                  .FlightNumber,
                G: searchResult.airAirItinerary.airAirSegment[1].attributes
                  .Group,
                DepTime:
                  searchResult.airAirItinerary.airAirSegment[1].attributes
                    .DepartureTime,
                ArrTime:
                  searchResult.airAirItinerary.airAirSegment[1].attributes
                    .ArrivalTime,
              },
            ]
        : null,
    tDate:
      userData?.flightData?.system?.toLowerCase() === "galileo"
        ? adultCount >= 1 && childCount === 0 && infant === 0
          ? !Array.isArray(searchResult.airAirPriceResult.airAirPricingSolution)
            ? searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo.attributes.LatestTicketingTime
            : searchResult.airAirPriceResult.airAirPricingSolution[0]
                .airAirPricingInfo.attributes.LatestTicketingTime
          : adultCount >= 1 && childCount >= 1 && infant === 0
          ? !Array.isArray(searchResult.airAirPriceResult.airAirPricingSolution)
            ? searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo[0].attributes.LatestTicketingTime
            : searchResult.airAirPriceResult.airAirPricingSolution[0]
                .airAirPricingInfo[0].attributes.LatestTicketingTime
          : userData.flightData.segment === "1"
          ? searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo[0].attributes.LatestTicketingTime
          : !Array.isArray(searchResult.airAirPriceResult.airAirPricingSolution)
          ? searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo[0].attributes.LatestTicketingTime
          : searchResult.airAirPriceResult.airAirPricingSolution[0]
              .airAirPricingInfo[0].attributes.LatestTicketingTime
        : null,
    eDate:
      userData?.flightData?.system?.toLowerCase() === "galileo"
        ? adultCount >= 1 && childCount === 0 && infant === 0
          ? !Array.isArray(searchResult.airAirPriceResult.airAirPricingSolution)
            ? searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo.airFareInfo.attributes.EffectiveDate
            : searchResult.airAirPriceResult.airAirPricingSolution[0]
                .airAirPricingInfo.airFareInfo.attributes.EffectiveDate
          : adultCount >= 1 && childCount >= 1 && infant === 0
          ? !Array.isArray(searchResult.airAirPriceResult.airAirPricingSolution)
            ? searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo[0].airFareInfo.attributes.EffectiveDate
            : searchResult.airAirPriceResult.airAirPricingSolution[0]
                .airAirPricingInfo[0].airFareInfo.attributes.EffectiveDate
          : userData.flightData.segment === "1"
          ? searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo[0].airFareInfo.attributes.EffectiveDate
          : !Array.isArray(searchResult.airAirPriceResult.airAirPricingSolution)
          ? searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo[0].airFareInfo.attributes.EffectiveDate
          : searchResult.airAirPriceResult.airAirPricingSolution[0]
              .airAirPricingInfo[0].airFareInfo.attributes.EffectiveDate
        : null,
    fbcode:
      userData?.flightData?.system?.toLowerCase() === "galileo"
        ? adultCount >= 1 && childCount === 0 && infant === 0
          ? !Array.isArray(searchResult.airAirPriceResult.airAirPricingSolution)
            ? searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo.airFareInfo.attributes.FareBasis
            : searchResult.airAirPriceResult.airAirPricingSolution[0]
                .airAirPricingInfo.airFareInfo.attributes.FareBasis
          : adultCount >= 1 && childCount >= 1 && infant === 0
          ? !Array.isArray(searchResult.airAirPriceResult.airAirPricingSolution)
            ? searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo[0].airFareInfo.attributes.FareBasis
            : searchResult.airAirPriceResult.airAirPricingSolution[0]
                .airAirPricingInfo[0].airFareInfo.attributes.FareBasis
          : userData.flightData.segment === "1"
          ? searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo[0].airFareInfo.attributes.FareBasis
          : !Array.isArray(searchResult.airAirPriceResult.airAirPricingSolution)
          ? searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo[0].airFareInfo.attributes.FareBasis
          : searchResult.airAirPriceResult.airAirPricingSolution[0]
              .airAirPricingInfo[0].airFareInfo.attributes.FareBasis
        : null,
    airPriceKey:
      userData?.flightData?.system?.toLowerCase() === "galileo"
        ? adultCount >= 1 && childCount === 0 && infant === 0
          ? !Array.isArray(searchResult.airAirPriceResult.airAirPricingSolution)
            ? searchResult.airAirPriceResult.airAirPricingSolution.attributes
                .Key
            : searchResult.airAirPriceResult.airAirPricingSolution[0].attributes
                .Key
          : adultCount >= 1 && childCount >= 1 && infant === 0
          ? !Array.isArray(searchResult.airAirPriceResult.airAirPricingSolution)
            ? userData.flightData.segment === "1"
              ? searchResult.airAirPriceResult.airAirPricingSolution.attributes
                  .Key
              : searchResult.airAirPriceResult.airAirPricingSolution[0]
                  .attributes.Key
            : searchResult.airAirPriceResult.airAirPricingSolution[0].attributes
                .Key
          : userData.flightData.segment === "1"
          ? searchResult.airAirPriceResult.airAirPricingSolution.attributes.Key
          : !Array.isArray(searchResult.airAirPriceResult.airAirPricingSolution)
          ? searchResult.airAirPriceResult.airAirPricingSolution.attributes.Key
          : searchResult.airAirPriceResult.airAirPricingSolution[0].attributes
              .Key
        : null,
  });
  console.log(flightPassengerData);
  const handleOnChange = (e, type, index) => {
    if (type === "ADT") {
      const value = e.target.value;
      const field = e.target.name;
      //todo:copying data to temp variable so that we do not directly mutate original state
      const tempFlightData = [...flightPassengerData.adult];
      //todo: -1 check to see if we found that object in working hours
      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index], //todo:keeping existing values in object
          [field]: value, //todo:here property can be "price" or "description"
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
      //todo:copying data to temp variable so that we do not directly mutate original state
      const tempFlightData = [...flightPassengerData.child];
      // todo:-1 check to see if we found that object in working hours
      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index], //todo:keeping existing values in object
          [field]: value, //todo:here property can be "price" or "description"
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
      //todo:copying data to temp variable so that we do not directly mutate original state
      const tempFlightData = [...flightPassengerData.infant];
      // todo:-1 check to see if we found that object in working hours
      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index], //todo:keeping existing values in object
          [field]: value, //todo:here property can be "price" or "description"
        };
      }
      setFlightPassengerData({
        ...flightPassengerData,
        infant: tempFlightData,
      });
    }
  };
  // console.log(userData?.flightData);
  const bookingJson = {
    flightPassengerData: { ...flightPassengerData },
    bookingInfo: {
      agentId: users?.user?.agentId,
      subagentId: users?.user?.subagentId,
      staffId: users?.user?.staffId || "",
      system: userData.flightData.system,
      from: userData.from,
      to: userData.to,
      airlines: userData.flightData.careerName,
      tripType: userData.tripType,
      travelDate: userData.flightData.departureDate,
      name: `${flightPassengerData.adult[0].afName} ${flightPassengerData.adult[0].alName}`,
      phone: flightPassengerData.phone,
      email: flightPassengerData.email,
      pax: adultCount + childCount + infant,
      adultcount: adultCount,
      childcount: childCount,
      infantcount: infant,
      subagentprice: Number.parseInt(userData?.flightData?.subagentprice),
      agentprice: Number.parseInt(userData?.flightData?.agentprice),
      netcost: Number.parseInt(userData?.flightData?.netfare),
      adultcostbase: Math.round(adultPrice + serviceFeeAdult) || 0,
      childcostbase: Math.round(childPrice + serviceFeeChild) || 0,
      infantcostbase: Math.round(infPrice + serviceFeeInfant) || 0,
      adultcosttax: Math.round(adultTaxPrice) || 0,
      childcosttax: Math.round(childTaxPrice) || 0,
      infantcosttax: Math.round(infTaxPrice) || 0,
      grosscost: Math.round(totalFare) || 0,
      basefare: Math.round(totalBaseFare) || 0,
      tax: Math.round(totalTax) || 0,
      timelimit: new Date(limitTime),
      journeyType: userData.flightData.triptype,
      coupon: coupon || "",
      adultbag: adultCount ? `go-${adultBaggage}` : "",
      childbag: childCount ? `go-${childBaggage}` : "",
      infantbag: infant ? `go-${infantBaggage}` : "",
      refundable:
        userData.flightData.refundable === "Refundable" ? "yes" : "no",
    },
    saveBooking: { ...userDataCopy },
    system: userData.flightData.system,
    agentId: users?.user?.agentId,
    subagentId: users?.user?.subagentId,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoaded(false);
    console.log(JSON.stringify(bookingJson));
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
            html: `Thank you so much for booking a flight ticket with ${siteConfig?.company_name} Please issue your booking ticket within the time limit specified, otherwise your booking request will be automatically cancelled. For any query.Please contact us at <strong>${siteConfig?.email}</strong> or Call <strong>${siteConfig?.phone} <strong>`,
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          }).then(function () {
            setIsLoaded(true);
            navigate("/dashboard/congratulation", {
              state: {
                bookingData: data,
                flyhubOneway: bookingJson,
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
            html: `For any query.Please contact us at <strong>${siteConfig?.email}</strong> or Call <strong>${siteConfig?.phone}</strong>`,
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
          agentId: users?.user?.agentId || "Agent",
          staffId: users?.user?.staffId || "Staff",
          system: userData.flightData.system,
          from: userData.from,
          to: userData.to,
          deptime: userData.flightData.departureDate,
          arrtime: "",
          route: userData?.flightData?.segments?.map(
            (item) => `${item.departure}-${item.arrival}`
          ),
          airlines: userData.flightData.careerName,
          tripType: userData.tripType,
          travelDate: userData?.flightData?.segments[0]?.departureTime,
          pax: userData.adultCount + userData.childCount + userData.infant,
          adultcount: adultCount,
          childcount: childCount,
          infantcount: infant,
          netcost: Number.parseInt(userData.agentFare),
          flightnumber: userData?.flightData?.segments?.map(
            (item) => `${item.marketingflight}`
          ),
          cabinclass: userData?.flightData?.segments?.map(
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
            // console.log(data);
            Swal.fire({
              imageUrl: noFareFound,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
              title: "No Fare Available",
              html: `For any query.Please contact us at <strong>${siteConfig?.email}</strong> or Call <strong>${siteConfig?.phone}</strong>`,
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
              html: `For any query.Please contact us at <strong>${siteConfig?.email}</strong> or Call <strong>${siteConfig?.phone}</strong>`,
              confirmButtonColor: "var(--primary-color)",
              confirmButtonText: "Please Try Another Flights.",
            }).then(function () {
              setIsLoaded(true);
              navigate(-1);
            });
          });
      });
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

  // todo:Validate a Users Phone number.
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
              <h4 className="flight-h4"> Passenger Information Details </h4>
              <form onSubmit={handleSubmit}>
                {flightPassengerData.adult.map((item, index) => {
                  return (
                    <Box key={index}>
                      <Box className="adult-h4">
                        <h4>Adult :0{index + 1}</h4>
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
                          <Grid
                            item
                            xs={12}
                            md={6}
                            lg={6}
                            className="adult-info"
                          >
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
                              style={{
                                textTransform: "uppercase",
                              }}
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
                          {/* {console.log(userData.flightData.triptype)} */}

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
                                handleOpenPassDateState(item.type, index, item)
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
                                    apassEx: new Date(date).toLocaleDateString(
                                      "sv"
                                    ),
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
                        </Grid>
                      </Box>
                    </Box>
                  );
                })}
                {/*//todo:Adult Details end  */}

                {/*//todo:Child details */}

                {flightPassengerData.child.map((item, index) => (
                  <Box>
                    <Box className="adult-h4">
                      <h4>Child :{index + 1}</h4>
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

                            {CountryList.map((country) => {
                              return (
                                <option value={country.code}>
                                  {country.name}
                                </option>
                              );
                            })}
                          </select>
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
                          <label htmlFor="cpassEx">Passport Expire Date</label>

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
                              handleOpenPassDateState(item.type, index, item)
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
                                  cpassEx: new Date(date).toLocaleDateString(
                                    "sv"
                                  ),
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
                      </Grid>
                    </Box>
                  </Box>
                ))}
                {/*//todo:Child details end*/}

                {/*//todo:infant details start  */}
                {flightPassengerData.infant.map((item, index) => (
                  <Box>
                    <Box className="adult-h4">
                      <h4>Infant :0{index + 1}</h4>
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
                            {CountryList.map((country) => {
                              return (
                                <option value={country.code}>
                                  {country.name}
                                </option>
                              );
                            })}
                          </select>
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
                          <label htmlFor="ipassEx">Passport Expire Date</label>

                          <input
                            required
                            type="text"
                            id="ipassEx"
                            value={format(
                              new Date(item.ipassEx),
                              "dd MMM yyyy"
                            )}
                            onClick={() =>
                              handleOpenPassDateState(item.type, index, item)
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
                                  ipassEx: new Date(date).toLocaleDateString(
                                    "sv"
                                  ),
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
                        <label htmlFor="passengerEmail">Your Email </label>
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
                          label={`By Booking/Issuing this Ticket I agree to ${companyName} Terms & Conditions`}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box className="booking-btn">
                    {searchResult?.Results[0]?.Validatingcarrier === "SG" ||
                    searchResult?.Results[0]?.Validatingcarrier === "6E" ||
                    searchResult?.Results[0]?.Validatingcarrier === "J9" ||
                    searchResult?.Results[0]?.Validatingcarrier === "G9" ? (
                      <Box>
                        <Typography
                          sx={{
                            color: "red !important",
                            textDecoration: "none !important",
                            fontSize: "16px !important",
                            fontWeight: "bold !important",
                          }}
                        >
                          *For Instant purchasing this ticket and any query
                          Please contact us at
                          <strong> {siteConfig?.email} </strong>
                          or{" "}
                          <strong>
                            {siteConfig?.phone}
                            {", "}
                            {siteConfig?.whatsapp_num}
                          </strong>
                        </Typography>
                        <button disabled="disabled">Instant Ticketing</button>
                      </Box>
                    ) : (
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <button
                          type="submit"
                          style={{
                            backgroundColor: "var(--primary-color)",
                            color: "#fff",
                            fontSize: "14px",
                            height: "40px",
                          }}
                        >
                          Book & Hold
                        </button>
                      </Box>
                    )}
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

export default MultiCityUserInfo;
