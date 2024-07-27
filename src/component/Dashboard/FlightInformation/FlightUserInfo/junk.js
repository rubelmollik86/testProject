/* eslint-disable no-lone-blocks */
// let url;
// if (location.state?.userData?.flightData?.system === "FlyHub") {
//   url = `https://api.flyfarint.com/v.1.0.0/FlyHub/AirBooking.php?SearchID=cf917d3d-e7f8-414c-86ad-3aa5fd9cb9f9&ResultID=e0e4c50e-7a34-4d90-9074-c42837c4895bTPUL&adult=${location.state.userData.adultCount}&child=${location.state.userData.childCount}&inf=${location.state.userData.infant}&afname0=${passengerData.afname0}&alname0=${passengerData.alname0}&agender0=${passengerData.agender0}&adob0=${passengerData.adob0}&apassNo0=${passengerData.apassNo0}&apassNoEx0=${passengerData.apassNoEx0}&apassNation0=${passengerData.apassNation0}`;
// } else if (
//   location.state?.userData?.flightData?.system === "Galileo" &&
//   location.state.userData.flightData.segment === "2"
// ) {
//   if (
//     location.state.userData.adultCount >= 1 &&
//     location.state.userData.childCount >= 1 &&
//     location.state.userData.infant >= 1
//   ) {
//     url = `https://api.flyfarint.com/v.1.0.0/AirBooking/Galileo/oneway.php?adult=${location.state.userData.adultCount}&child=${location.state.userData.childCount}&inf=${location.state.userData.infant}&segment=2&afName0=${passengerData.afName0}&alName0=${passengerData.alName0}&agender0=${passengerData.agender0}&adob0=${passengerData.adob0}&apassNo0=${passengerData.apassNo0}&apassEx0=${passengerData.apassNoEx0}&apassNation0=${passengerData.apassNation0}&cfName0=${passengerData.cfName0}&clName0=${passengerData.clName0}&cgender0=${passengerData.cgender0}&cdob0=${passengerData.cdob0}&cpassNo0=${passengerData.cpassNo0}&cpassEx0=${passengerData.cpassEx0}&cpassNation0=${passengerData.cpassNation0}&ifName0=${passengerData.ifName0}&ilName0=${passengerData.ilName0}&igender0=${passengerData.igender0}&idob0=${passengerData.idob0}&ipassNo0=${passengerData.ipassNo0}&ipassEx0=${passengerData.ipassEx0}&ipassNation0=${passengerData.ipassNation0}&airPriceSKey=${location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].attributes.Key}&airPriceInfoKey0=${location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].attributes.Key}&fareInfoKey0=${location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].airFareInfo.attributes.Key}&airPriceInfoKey1=${location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].airFareInfo.attributes.Key}&fareInfoKey1=${location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[1].airFareInfo.attributes.Key}&airPriceInfoKey2=${location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[2].attributes.Key}&fareInfoKey2=${location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[2].airFareInfo.attributes.Key}&fbcode=${location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].airFareInfo.attributes.FareBasis}&tDate=${location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].attributes.LatestTicketingTime}&eDate=${location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].airFareInfo.attributes.EffectiveDate}&airSegKey0=${location.state.searchResult?.airAirItinerary.airAirSegment[0].attributes.Key}&cr0=${location.state.searchResult?.airAirItinerary.airAirSegment[0].attributes.Carrier}&bcode0=${location.state.searchResult?.airAirItinerary.airAirSegment[0].attributes.ClassOfService}&dep0=${location.state.searchResult?.airAirItinerary.airAirSegment[0].attributes.Origin}&arr0=${location.state.searchResult?.airAirItinerary.airAirSegment[0].attributes.Destination}&Fno0=${location.state.searchResult?.airAirItinerary.airAirSegment[0].attributes.FlightNumber}&G0=${location.state.searchResult?.airAirItinerary.airAirSegment[0].attributes.Group}&DepTime0=${location.state.searchResult?.airAirItinerary.airAirSegment[0].attributes.DepartureTime}&ArrTime0=${location.state.searchResult?.airAirItinerary.airAirSegment[0].attributes.ArrivalTime}&airSegKey1=${location.state.searchResult?.airAirItinerary.airAirSegment[1].attributes.Key}&cr1=${location.state.searchResult?.airAirItinerary.airAirSegment[1].attributes.Carrier}&bcode1=${location.state.searchResult?.airAirItinerary.airAirSegment[1].attributes.ClassOfService}&dep1=${location.state.searchResult.airAirItinerary.airAirSegment[1].attributes.Origin}&arr1=${location.state.searchResult?.airAirItinerary.airAirSegment[1].attributes.Destination}&Fno1=${location.state.searchResult?.airAirItinerary.airAirSegment[1].attributes.FlightNumber}&G1=${location.state.searchResult?.airAirItinerary.airAirSegment[1].attributes.Group}&DepTime1=${location.state.searchResult?.airAirItinerary.airAirSegment[1].attributes.DepartureTime}&ArrTime1=${location.state.searchResult?.airAirItinerary.airAirSegment[1].attributes.ArrivalTime}`;
//   } else if (
//     location.state.userData.adultCount >= 1 &&
//     location.state.userData.childCount >= 1
//   ) {
//     url = `https://api.flyfarint.com/v.1.0.0/AirBooking/Galileo/oneway.php?adult=${location.state.userData.adultCount}&child=${location.state.userData.childCount}&inf=${location.state.userData.infant}&segment=2&afName0=${passengerData.afName0}&alName0=${passengerData.alName0}&agender0=${passengerData.agender0}&adob0=${passengerData.adob0}&apassNo0=${passengerData.apassNo0}&apassEx0=${passengerData.apassNoEx0}&apassNation0=${passengerData.apassNation0}&cfName0=${passengerData.cfName0}&clName0=${passengerData.clName0}&cgender0=${passengerData.cgender0}&cdob0=${passengerData.cdob0}&cpassNo0=${passengerData.cpassNo0}&cpassEx0=${passengerData.cpassEx0}&cpassNation0=${passengerData.cpassNation0}&ifName0=${passengerData.ifName0}&ilName0=${passengerData.ilName0}&igender0=${passengerData.igender0}&idob0=${passengerData.idob0}&ipassNo0=${passengerData.ipassNo0}&ipassEx0=${passengerData.ipassEx0}&ipassNation0=${passengerData.ipassNation0}&airPriceSKey=${location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].attributes.Key}&airPriceInfoKey0=${location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].attributes.Key}&fareInfoKey0=${location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].airFareInfo.attributes.Key}&airPriceInfoKey1=${location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[1].attributes.Key}&fareInfoKey1=${location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[1].airFareInfo.attributes.Key}&fbcode=${location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].airFareInfo.attributes.FareBasis}&tDate=${location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].attributes.LatestTicketingTime}&eDate=${location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].airFareInfo.attributes.EffectiveDate}&airSegKey0=${location.state.searchResult.airAirItinerary.airAirSegment[0].attributes.Key}&cr0=${location.state.searchResult.airAirItinerary.airAirSegment[0].attributes.Carrier}&bcode0=${location.state.searchResult.airAirItinerary.airAirSegment[0].attributes.ClassOfService}&dep0=${location.state.searchResult.airAirItinerary.airAirSegment[0].attributes.Origin}&arr0=${location.state.searchResult.airAirItinerary.airAirSegment[0].attributes.Destination}&Fno0=${location.state.searchResult.airAirItinerary.airAirSegment[0].attributes.FlightNumber}&G0=${location.state.searchResult.airAirItinerary.airAirSegment[0].attributes.Group}&DepTime0=${location.state.searchResult.airAirItinerary.airAirSegment[0].attributes.DepartureTime}&ArrTime0=${location.state.searchResult.airAirItinerary.airAirSegment[0].attributes.ArrivalTime}&airSegKey1=${location.state.searchResult.airAirItinerary.airAirSegment[1].attributes.Key}&cr1=${location.state.searchResult.airAirItinerary.airAirSegment[1].attributes.Carrier}&bcode1=${location.state.searchResult.airAirItinerary.airAirSegment[1].attributes.ClassOfService}&dep1=${location.state.searchResult.airAirItinerary.airAirSegment[1].attributes.Origin}&arr1=${location.state.searchResult.airAirItinerary.airAirSegment[1].attributes.Destination}&Fno1=${location.state.searchResult.airAirItinerary.airAirSegment[1].attributes.FlightNumber}&G1=${location.state.searchResult.airAirItinerary.airAirSegment[1].attributes.Group}&DepTime1=${location.state.searchResult.airAirItinerary.airAirSegment[1].attributes.DepartureTime}&ArrTime1=${location.state.searchResult.airAirItinerary.airAirSegment[1].attributes.ArrivalTime}&airPriceInfoKey2=${location.state.searchResult.airAirPriceResult.airAirPricingSolution[3].attributes.Key}&fareInfoKey2=${location.state.searchResult.airAirPriceResult.airAirPricingSolution[3].airAirPricingInfo[0].airFareInfo.attributes.Key}`;
//   } else if (location.state.userData.adultCount >= 1) {
//     url = `https://api.flyfarint.com/v.1.0.0/AirBooking/Galileo/oneway.php?adult=${location.state.userData.adultCount}&child=${location.state?.userData?.childCount}&inf=${location.state?.userData?.infant}&segment=2&afName0=${passengerData.afName0}&alName0=${passengerData.alName0}&agender0=${passengerData.agender0}&adob0=${passengerData.adob0}&apassNo0=${passengerData.apassNo0}&apassEx0=${passengerData.apassNoEx0}&apassNation0=${passengerData.apassNation0}&cfName0=${passengerData.cfName0}&clName0=${passengerData.clName0}&cgender0=${passengerData.cgender0}&cdob0=${passengerData.cdob0}&cpassNo0=${passengerData.cpassNo0}&cpassEx0=${passengerData.cpassEx0}&cpassNation0=${passengerData.cpassNation0}&ifName0=${passengerData.ifName0}&ilName0=${passengerData.ilName0}&igender0=${passengerData.igender0}&idob0=${passengerData.idob0}&ipassNo0=${passengerData.ipassNo0}&ipassEx0=${passengerData.ipassEx0}&ipassNation0=${passengerData.ipassNation0}&airPriceSKey=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.Key}&airPriceInfoKey0=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.Key}&fareInfoKey0=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.Key}&airPriceInfoKey1=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[1]?.attributes?.Key}&fareInfoKey1=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[1]?.airAirPricingInfo?.airFareInfo?.attributes?.Key}&airPriceInfoKey2=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[2]?.attributes?.Key}&fareInfoKey2=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[2]?.airAirPricingInfo?.airFareInfo?.attributes?.Key}&fbcode=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[0].airAirPricingInfo?.airFareInfo?.attributes?.FareBasis}&tDate=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[0]?.airAirPricingInfo?.attributes?.LatestTicketingTime}&eDate=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[0]?.airAirPricingInfo?.airFareInfo?.attributes?.EffectiveDate}&airSegKey0=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.Key}&cr0=${location.state?.searchResult?.airAirItinerary?.airAirSegment[0]?.attributes?.Carrier}&bcode0=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[0]?.airAirPricingInfo?.airBookingInfo[0]?.attributes?.BookingCode}&dep0=${location.state?.searchResult?.airAirItinerary?.airAirSegment[0]?.attributes?.Origin}&arr0=${location.state?.searchResult?.airAirItinerary?.airAirSegment[0]?.attributes?.Destination}&Fno0=${location.state?.searchResult?.airAirItinerary?.airAirSegment[0]?.attributes?.FlightNumber}&G0=${location.state?.searchResult?.airAirItinerary?.airAirSegment[0]?.attributes?.Group}&DepTime0=${location.state?.searchResult?.airAirItinerary?.airAirSegment[0]?.attributes?.DepartureTime}&ArrTime0=${location.state?.searchResult?.airAirItinerary?.airAirSegment[0]?.attributes?.ArrivalTime}&airSegKey1=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[1].attributes?.Key}&cr1=${location.state?.searchResult?.airAirItinerary?.airAirSegment[1]?.attributes?.Carrier}&bcode1=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[0]?.airAirPricingInfo?.airBookingInfo[1]?.attributes?.BookingCode}&dep1=${location.state?.searchResult?.airAirItinerary.airAirSegment[1].attributes.Origin}&arr1=${location.state?.searchResult?.airAirItinerary?.airAirSegment[1]?.attributes?.Destination}&Fno1=${location.state?.searchResult?.airAirItinerary?.airAirSegment[1]?.attributes?.FlightNumber}&G1=${location.state?.searchResult?.airAirItinerary?.airAirSegment[1]?.attributes?.Group}&DepTime1=${location.state?.searchResult?.airAirItinerary?.airAirSegment[1]?.attributes?.DepartureTime}&ArrTime1=${location.state?.searchResult?.airAirItinerary?.airAirSegment[1]?.attributes?.ArrivalTime}`;
//   }
// } else if (
//   location.state?.userData?.flightData?.system === "Galileo" &&
//   location.state.userData.flightData.segment === "1"
// ) {
//   url = `https://api.flyfarint.com/v.1.0.0/AirBooking/Galileo/oneway.php?adult=${location.state.userData.adultCount}&child=${location.state.userData.childCount}&inf=${location.state.userData.infant}&segment=${location.state?.userData?.flightData.segment}&afName0=${passengerData.afName0}&alName0=${passengerData.lName0}&agender0=${passengerData.agender0}&adob0=${passengerData.adob0}&apassNo0=${passengerData.apassNo0}&apassEx0=${passengerData.apassNoEx0}&apassNation0=${passengerData.apassNation0}&cfName0=${passengerData.cfName0}&clName0=${passengerData.clName0}&cgender0=${passengerData.cgender0}&cdob0=${passengerData.cdob0}&cpassNo0=${passengerData.cpassNo0}&cpassEx0=${passengerData.cpassEx0}&cpassNation0=${passengerData.cpassNation0}&ifName0=${passengerData.ifName0}&ilName0=${passengerData.ilName0}&igender0=${passengerData.igender0}&idob0=${passengerData.idob0}&ipassNo0=${passengerData.ipassNo0}&ipassEx0=${passengerData.ipassEx0}&ipassNation0=${passengerData.ipassNation0}&airPriceSKey=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.Key}&airPriceInfoKey0=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.Key}&fareInfoKey0=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.Key}&airPriceInfoKey1=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[1]?.attributes?.Key}&fareInfoKey1=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[1]?.airAirPricingInfo?.airFareInfo?.attributes?.Key}&airPriceInfoKey2=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[2]?.attributes?.Key}&fareInfoKey2=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[2]?.airAirPricingInfo?.airFareInfo?.attributes?.Key}&fbcode=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[0].airAirPricingInfo?.airFareInfo?.attributes?.FareBasis}&tDate=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[0]?.airAirPricingInfo?.attributes?.LatestTicketingTime}&eDate=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[0]?.airAirPricingInfo?.airFareInfo?.attributes?.EffectiveDate}&airSegKey0=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.Key}&cr0=${location.state?.searchResult?.airAirItinerary?.airAirSegment[0]?.attributes?.Carrier}&bcode0=${location.state?.searchResult?.airAirPriceResult?.airAirPricingSolution[0]?.airAirPricingInfo?.airBookingInfo[0]?.attributes?.BookingCode}&dep0=${location.state?.searchResult?.airAirItinerary?.airAirSegment[0]?.attributes?.Origin}&arr0=${location.state?.searchResult?.airAirItinerary?.airAirSegment[0]?.attributes?.Destination}&Fno0=${location.state?.searchResult?.airAirItinerary?.airAirSegment[0]?.attributes?.FlightNumber}&G0=${location.state?.searchResult?.airAirItinerary?.airAirSegment[0]?.attributes?.Group}&DepTime0=${location.state?.searchResult?.airAirItinerary?.airAirSegment[0]?.attributes?.DepartureTime}&ArrTime0=${location.state?.searchResult?.airAirItinerary?.airAirSegment[0]?.attributes?.ArrivalTime}`;
// }

// !Array.isArray(
//location.state.searchResult.airAirPriceResult.airAirPricingSolution
//  .airAirPricingInfo
//)
// todo adultCount >= 1 && childCount===0 && infant===0
//fareInfoKey:location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo.airFareInfo.attributes.Key
//airPriceInfoKey:location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo.attributes.Key
//tdate:location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo.attributes.LatestTicketingTime
//edate:location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo.airFareInfo.attributes.EffectiveDate
//fbcode:location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo.airFareInfo.attributes.FareBasis
//airPriceKey:location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].attributes.Key
//todo adultCount >=1 && childCount>=1 && infant===0
//fareInfoKey:location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].airFareInfo.attributes.Key
//airPriceInfoKey:location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].attributes.Key
//tdate:location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].attributes.LatestTicketingTime
//edate:location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].airFareInfo.attributes.EffectiveDate
//fbcode:location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].airFareInfo.attributes.FareBasis
//airPriceKey:location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].attributes.Key
//todo adultCount 1 && childCount 1 && infant===0
//fareInfoKey:location.state.searchResult
//airPriceInfoKey:location.state.searchResult
//tdate:location.state.searchResult
//edate:location.state.searchResult
//fbcode:location.state.searchResult
//airPriceKey:location.state.searchResult
//todo adultCount >=1 && childCount >= 1 && infant >=1
//fareInfoKey:location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].airFareInfo.attributes.Key
//airPriceInfoKey:location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].attributes.Key
//tdate:location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].attributes.LatestTicketingTime
//edate:location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].airFareInfo.attributes.EffectiveDate
//fbcode:location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].airFareInfo.attributes.FareBasis
//airPriceKey:location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].attributes.Key
//todo adultCount===1 && childCount===1 && infant===1
//fareInfoKey:location.state.searchResult
//airPriceInfoKey:location.state.searchResult
//tdate:location.state.searchResult
//edate:location.state.searchResult
//fbcode:location.state.searchResult
//airPriceKey:location.state.searchResult
//todo adultCount >= 1 && childCount >= 1 && infant >= 1
//fareInfoKey:location.state.searchResult
//airPriceInfoKey:location.state.searchResult
//tdate:location.state.searchResult
//edate:location.state.searchResult
//fbcode:location.state.searchResult
//airPriceKey:location.state.searchResult

// let url = "https://api.flyfarint.com/v.1.0.0/Sabre/AirPrice.php";
// let body = {
//   adultCount: 1,
//   childCount: 1,
//   infantCount: 1,
//   segment: location.state?.roundData?.segment,
//   tripType: location.state.roundData.tripType === "oneway" ? "1" : "2",
//   segments: {
//     go:
//       location.state?.roundData?.segment === "2"
//         ? [
//             {
//               departure: location.state.roundData.segments.go[0].departure,
//               arrival: location.state.roundData.segments.go[0].arrival,
//               dpTime: location.state.roundData.segments.go[0].departureTime,
//               arrTime: location.state.roundData.segments.go[0].arrivalTime,
//               bCode: location.state.roundData.segments.go[0].bookingcode,
//               mCarrier: location.state.roundData.segments.go[0].marketingcareer,
//               mCarrierFN:
//                 location.state.roundData.segments.go[0].marketingflight,
//               oCarrier: location.state.roundData.segments.go[0].operatingcareer,
//               oCarrierFN:
//                 location.state.roundData.segments.go[0].operatingflight,
//             },
//             {
//               departure: location.state.roundData.segments.go[1].departure,
//               arrival: location.state.roundData.segments.go[1].arrival,
//               dpTime: location.state.roundData.segments.go[1].departureTime,
//               arrTime: location.state.roundData.segments.go[1].arrivalTime,
//               bCode: location.state.roundData.segments.go[1].bookingcode,
//               mCarrier: location.state.roundData.segments.go[1].marketingcareer,
//               mCarrierFN:
//                 location.state.roundData.segments.go[1].marketingflight,
//               oCarrier: location.state.roundData.segments.go[1].operatingcareer,
//               oCarrierFN:
//                 location.state.roundData.segments.go[1].operatingflight,
//             },
//           ]
//         : [
//             {
//               departure: location.state.roundData.segments.go[0].departure,
//               arrival: location.state.roundData.segments.go[0].arrival,
//               dpTime: location.state.roundData.segments.go[0].departureTime,
//               arrTime: location.state.roundData.segments.go[0].arrivalTime,
//               bCode: location.state.roundData.segments.go[0].bookingcode,
//               mCarrier: location.state.roundData.segments.go[0].marketingcareer,
//               mCarrierFN:
//                 location.state.roundData.segments.go[0].marketingflight,
//               oCarrier: location.state.roundData.segments.go[0].operatingcareer,
//               oCarrierFN:
//                 location.state.roundData.segments.go[0].operatingflight,
//             },
//           ],
//     back:
//       location.state?.roundData?.segment === "2"
//         ? [
//             {
//               departure: location.state.roundData.segments.back[0].departure,
//               arrival: location.state.roundData.segments.back[0].arrival,
//               dpTime: location.state.roundData.segments.back[0].departureTime,
//               arrTime: location.state.roundData.segments.back[0].arrivalTime,
//               bCode: location.state.roundData.segments.back[0].bookingcode,
//               mCarrier:
//                 location.state.roundData.segments.back[0].marketingcareer,
//               mCarrierFN:
//                 location.state.roundData.segments.back[0].marketingflight,
//               oCarrier:
//                 location.state.roundData.segments.back[0].operatingcareer,
//               oCarrierFN:
//                 location.state.roundData.segments.back[0].operatingflight,
//             },
//             {
//               departure: location.state.roundData.segments.back[1].departure,
//               arrival: location.state.roundData.segments.back[1].arrival,
//               dpTime: location.state.roundData.segments.back[1].departureTime,
//               arrTime: location.state.roundData.segments.back[1].arrivalTime,
//               bCode: location.state.roundData.segments.back[1].bookingcode,
//               mCarrier:
//                 location.state.roundData.segments.back[1].marketingcareer,
//               mCarrierFN:
//                 location.state.roundData.segments.back[1].marketingflight,
//               oCarrier:
//                 location.state.roundData.segments.back[1].operatingcareer,
//               oCarrierFN:
//                 location.state.roundData.segments.back[1].operatingflight,
//             },
//           ]
//         : [
//             {
//               departure: location.state.roundData.segments.back[0].departure,
//               arrival: location.state.roundData.segments.back[0].arrival,
//               dpTime: location.state.roundData.segments.back[0].departureTime,
//               arrTime: location.state.roundData.segments.back[0].arrivalTime,
//               bCode: location.state.roundData.segments.back[0].bookingcode,
//               mCarrier:
//                 location.state.roundData.segments.back[0].marketingcareer,
//               mCarrierFN:
//                 location.state.roundData.segments.back[0].marketingflight,
//               oCarrier:
//                 location.state.roundData.segments.back[0].operatingcareer,
//               oCarrierFN:
//                 location.state.roundData.segments.back[0].operatingflight,
//             },
//           ],
//   },
// };
//   url = `https://api.flyfarint.com/v.1.0.0/AirPrice/return.php?system=Sabre&segment1=${location.state?.roundData?.segment}&fdeparture0=${location.state?.roundData?.segments.go[0].departure}&farrival0=${location.state?.roundData?.segments.go[0].arrival}&fdpTime0=${location.state?.roundData?.segments.go[0].departureTime}&farrTime0=${location.state?.roundData?.segments.go[0].arrivalTime}&fbCode0=${location.state?.roundData?.segments.go[0].bookingcode}&fmCarrier0=${location.state?.roundData?.segments.go[0].marketingcareer}&fmCarrierFN0=${location.state?.roundData?.segments.go[0].marketingflight}&foCarrier0=${location.state?.roundData?.segments.go[0].operatingcareer}&foCarrierFN0=${location.state?.roundData?.segments.go[0].operatingflight}&ldeparture0=${location.state?.roundData?.segments.back[0].departure}&larrival0=${location.state?.roundData?.segments.back[0].arrival}&ldpTime0=${location.state?.roundData?.segments.back[0].departureTime}&larrTime0=${location.state?.roundData?.segments.back[0].arrivalTime}&lbCode0=${location.state?.roundData?.segments.back[0].bookingcode}&lmCarrier0=${location.state?.roundData?.segments.back[0].marketingcareer}&lmCarrierFN0=${location.state?.roundData?.segments.back[0].marketingflight}&loCarrier0=${location.state?.roundData?.segments.back[0].operatingcareer}&loCarrierFN0=${location.state?.roundData?.segments.back[0].operatingflight}&adult=${location.state?.adultCount}&child=${location.state?.childCount}&inf=${location.state?.infant}`;
// } else if (
//   location.state?.roundData?.system === "Sabre" &&
//   location.state?.roundData.segment === "2"
// ) {
// url = "https://api.flyfarint.com/v.1.0.0/Sabre/AirPrice.php";
// body = {
//   adultCount: 1,
//   childCount: 1,
//   infantCount: 1,
//   segment: location.state?.roundData?.segment,
//   tripType: location.state.roundData.tripType === "oneway" ? "1" : "2",
//   segments: {
//     go:
//       location.state?.roundData?.segment === "2"
//         ? [
//             {
//               departure: location.state.roundData.segments.go[0].departure,
//               arrival: location.state.roundData.segments.go[0].arrival,
//               dpTime: location.state.roundData.segments.go[0].departureTime,
//               arrTime: location.state.roundData.segments.go[0].arrivalTime,
//               bCode: location.state.roundData.segments.go[0].bookingcode,
//               mCarrier:
//                 location.state.roundData.segments.go[0].marketingcareer,
//               mCarrierFN:
//                 location.state.roundData.segments.go[0].marketingflight,
//               oCarrier:
//                 location.state.roundData.segments.go[0].operatingcareer,
//               oCarrierFN:
//                 location.state.roundData.segments.go[0].operatingflight,
//             },
//             {
//               departure: location.state.roundData.segments.go[1].departure,
//               arrival: location.state.roundData.segments.go[1].arrival,
//               dpTime: location.state.roundData.segments.go[1].departureTime,
//               arrTime: location.state.roundData.segments.go[1].arrivalTime,
//               bCode: location.state.roundData.segments.go[1].bookingcode,
//               mCarrier:
//                 location.state.roundData.segments.go[1].marketingcareer,
//               mCarrierFN:
//                 location.state.roundData.segments.go[1].marketingflight,
//               oCarrier:
//                 location.state.roundData.segments.go[1].operatingcareer,
//               oCarrierFN:
//                 location.state.roundData.segments.go[1].operatingflight,
//             },
//           ]
//         : [
//             {
//               departure: location.state.roundData.segments.go[0].departure,
//               arrival: location.state.roundData.segments.go[0].arrival,
//               dpTime: location.state.roundData.segments.go[0].departureTime,
//               arrTime: location.state.roundData.segments.go[0].arrivalTime,
//               bCode: location.state.roundData.segments.go[0].bookingcode,
//               mCarrier:
//                 location.state.roundData.segments.go[0].marketingcareer,
//               mCarrierFN:
//                 location.state.roundData.segments.go[0].marketingflight,
//               oCarrier:
//                 location.state.roundData.segments.go[0].operatingcareer,
//               oCarrierFN:
//                 location.state.roundData.segments.go[0].operatingflight,
//             },
//           ],
//     back:
//       location.state?.roundData?.segment === "2"
//         ? [
//             {
//               departure:
//                 location.state.roundData.segments.back[0].departure,
//               arrival: location.state.roundData.segments.back[0].arrival,
//               dpTime:
//                 location.state.roundData.segments.back[0].departureTime,
//               arrTime:
//                 location.state.roundData.segments.back[0].arrivalTime,
//               bCode: location.state.roundData.segments.back[0].bookingcode,
//               mCarrier:
//                 location.state.roundData.segments.back[0].marketingcareer,
//               mCarrierFN:
//                 location.state.roundData.segments.back[0].marketingflight,
//               oCarrier:
//                 location.state.roundData.segments.back[0].operatingcareer,
//               oCarrierFN:
//                 location.state.roundData.segments.back[0].operatingflight,
//             },
//             {
//               departure:
//                 location.state.roundData.segments.back[1].departure,
//               arrival: location.state.roundData.segments.back[1].arrival,
//               dpTime:
//                 location.state.roundData.segments.back[1].departureTime,
//               arrTime:
//                 location.state.roundData.segments.back[1].arrivalTime,
//               bCode: location.state.roundData.segments.back[1].bookingcode,
//               mCarrier:
//                 location.state.roundData.segments.back[1].marketingcareer,
//               mCarrierFN:
//                 location.state.roundData.segments.back[1].marketingflight,
//               oCarrier:
//                 location.state.roundData.segments.back[1].operatingcareer,
//               oCarrierFN:
//                 location.state.roundData.segments.back[1].operatingflight,
//             },
//           ]
//         : [
//             {
//               departure:
//                 location.state.roundData.segments.back[0].departure,
//               arrival: location.state.roundData.segments.back[0].arrival,
//               dpTime:
//                 location.state.roundData.segments.back[0].departureTime,
//               arrTime:
//                 location.state.roundData.segments.back[0].arrivalTime,
//               bCode: location.state.roundData.segments.back[0].bookingcode,
//               mCarrier:
//                 location.state.roundData.segments.back[0].marketingcareer,
//               mCarrierFN:
//                 location.state.roundData.segments.back[0].marketingflight,
//               oCarrier:
//                 location.state.roundData.segments.back[0].operatingcareer,
//               oCarrierFN:
//                 location.state.roundData.segments.back[0].operatingflight,
//             },
//           ],
//   },
// };
//   // todo system Sabre segment 2
//   //url = `https://api.flyfarint.com/v.1.0.0/AirPrice/return.php?system=Sabre&segment1=${location.state?.roundData?.segment}&segment2=${location.state?.roundData?.segment}&fdeparture0=${location.state?.roundData?.segments.go[0].departure}&farrival0=${location.state?.roundData?.segments.go[0].arrival}&fdpTime0=${location.state?.roundData?.segments.go[0].departureTime}&farrTime0=${location.state?.roundData?.segments.go[0].arrivalTime}&fbCode0=${location.state?.roundData?.segments.go[0].bookingcode}&fmCarrier0=${location.state?.roundData?.segments.go[0].marketingcareer}&fmCarrierFN0=${location.state?.roundData?.segments.go[0].marketingflight}&foCarrier0=${location.state?.roundData?.segments.go[0].operatingcareer}&foCarrierFN0=${location.state?.roundData?.segments.go[0].operatingflight}&fdeparture1=${location.state?.roundData?.segments.go[1].departure}&farrival1=${location.state?.roundData?.segments.go[1].arrival}&fdpTime1=${location.state?.roundData?.segments.go[1].departureTime}&farrTime1=${location.state?.roundData?.segments.go[1].arrivalTime}&fbCode1=${location.state?.roundData?.segments.go[1].bookingcode}&fmCarrier1=${location.state?.roundData?.segments.go[1].marketingcareer}&fmCarrierFN1=${location.state?.roundData?.segments.go[1].marketingflight}&foCarrier1=${location.state?.roundData?.segments.go[1].operatingcareer}&foCarrierFN1=${location.state?.roundData?.segments.go[1].operatingflight}&ldeparture0=${location.state?.roundData?.segments.back[0].departure}&larrival0=${location.state?.roundData?.segments.back[0].arrival}&ldpTime0=${location.state?.roundData?.segments.back[0].departureTime}&larrTime0=${location.state?.roundData?.segments.back[0].arrivalTime}&lbCode0=${location.state?.roundData?.segments.back[0].bookingcode}&lmCarrier0=${location.state?.roundData?.segments.back[0].marketingcareer}&lmCarrierFN0=${location.state?.roundData?.segments.back[0].marketingflight}&loCarrier0=${location.state?.roundData?.segments.back[0].operatingcareer}&loCarrierFN0=${location.state?.roundData?.segments.back[0].operatingflight}&ldeparture1=${location.state?.roundData?.segments.back[1].departure}&larrival1=${location.state?.roundData?.segments.back[1].arrival}&ldpTime1=${location.state?.roundData?.segments.back[1].departureTime}&larrTime1=${location.state?.roundData?.segments.back[1].arrivalTime}&lbCode1=${location.state?.roundData?.segments.back[1].bookingcode}&lmCarrier1=${location.state?.roundData?.segments.back[1].marketingcareer}&lmCarrierFN1=${location.state?.roundData?.segments.back[1].marketingflight}&loCarrier1=${location.state?.roundData?.segments.back[1].operatingcareer}&loCarrierFN1=${location.state?.roundData?.segments.back[1].operatingflight}&adult=${location.state?.adultCount}&child=${location.state?.childCount}&inf=${location.state?.infant}`;
// }
// !Array.isArray(
//   location.state.searchResult.airAirPriceResult.airAirPricingSolution
// );
// todo adultCount >= 1 && childCount === 0 && infant === 0;
//!adult fareInfoKey:airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].airFareInfo[0].attributes.Key;
//!child fareInfoKey:airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[1].airFareInfo[0].attributes.Key;
//!infant fareInfoKey:airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[2].airFareInfo[0].attributes.Key;
// !adult airPriceInfoKey:airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].attributes.Key;
// !child airPriceInfoKey:airAirPriceResult.airAirPricingSolution[1].airAirPricingInfo[0].attributes.Key;
// !infant airPriceInfoKey:airAirPriceResult.airAirPricingSolution[2].airAirPricingInfo[0].attributes.Key;
// todo adultCount >= 1 && childCount >= 1 && infant === 0;
//!adult fareInfoKey:airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo.airFareInfo[0].attributes.Key;
//!child fareInfoKey:airAirPriceResult.airAirPricingSolution[1].airAirPricingInfo.airFareInfo[0].attributes.Key;
//!infant fareInfoKey:airAirPriceResult.airAirPricingSolution[2].airAirPricingInfo.airFareInfo[0].attributes.Key;
//!adult airPriceInfoKey:airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo.attributes.Key;
//!child airPriceInfoKey:airAirPriceResult.airAirPricingSolution[1].airAirPricingInfo.attributes.Key;
//!infant airPriceInfoKey:airAirPriceResult.airAirPricingSolution[2].airAirPricingInfo.attributes.Key;
//todo adultCount >= 1 && childCount >= 1 && infant >= 1;
//!adult fareInfoKey:airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].airFareInfo[0].attributes.Key;
//!child fareInfoKey:airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[1].airFareInfo[0].attributes.Key;
//!infant fareInfoKey:airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[2].airFareInfo[0].attributes.Key;
// !adult airPriceInfoKey:airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].attributes.Key;
// !child aorPriceInfoKey:airAirPriceResult.airAirPricingSolution[1].airAirPricingInfo[0].attributes.Key;
// !infant airPriceInfoKey:airAirPriceResult.airAirPricingSolution[2].airAirPricingInfo[0].attributes.Key;
//  tDate:
//     adultCount >= 1 && childCount >= 1 && infant >= 1
//       ? location.state.searchResult.airAirPriceResult.airAirPricingSolution[0]
//           .airAirPricingInfo[0].attributes.LatestTicketingTime
//       : location.state.searchResult.airAirPriceResult.airAirPricingSolution[0]
//           .airAirPricingInfo.attributes.LatestTicketingTime,
//   eDate:adultCount >= 1 && childCount >= 1 && infant >= 1?location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].airFareInfo[0].attributes.EffectiveDate:
//     location.state.searchResult.airAirPriceResult.airAirPricingSolution[0]
//       .airAirPricingInfo.airFareInfo[0].attributes.EffectiveDate,
//   fbcode:adultCount >= 1 && childCount >= 1 && infant >= 1?location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].airAirPricingInfo[0].airFareInfo[0].attributes.FareBasis:
//     location.state.searchResult.airAirPriceResult.airAirPricingSolution[0]
//       .airAirPricingInfo.airFareInfo[0].attributes.FareBasis,
//   airPriceSKey:adultCount >= 1 && childCount >= 1 && infant >= 1?location.state.searchResult.airAirPriceResult.airAirPricingSolution[0].attributes.Key
//     location.state.searchResult.airAirPriceResult.airAirPricingSolution[0]
//       .attributes.Key,

// todo oneway
// url = `https://api.flyfarint.com/v.1.0.0/AirPrice/oneway.php?system=${location.state?.flightData?.system}&segment=${location.state?.flightData?.segment}&departure0=${location.state?.flightData?.segments[0].departure}&arrival0=${location.state?.flightData?.segments[0]?.arrival}&dpTime0=${location.state.flightData?.segments[0]?.departureTime}&arrTime0=${location.state.flightData?.segments[0]?.arrivalTime}&bCode0=${location.state.flightData?.segments[0]?.bookingcode}&mCarrier0=${location.state.flightData?.segments[0].marketingcareer}&mCarrierFN0=${location.state.flightData?.segments[0]?.marketingflight}&oCarrier0=${location.state.flightData?.segments[0].operatingcareer}&oCarrierFN0=${location.state.flightData?.segments[0]?.operatingflight}&adult=${location.state.adultCount}&child=${location.state.childCount}&inf=${location.state.infant}`;

// url = `https://api.flyfarint.com/v.1.0.0/AirPrice/oneway.php?system=${location.state?.flightData?.system}&segment=${location.state?.flightData?.segment}&departure0=${location.state?.flightData?.segments[0]?.departure}&arrival0=${location.state?.flightData?.segments[0]?.arrival}&dpTime0=${location.state.flightData?.segments[0]?.departureTime}&arrTime0=${location.state.flightData?.segments[0]?.arrivalTime}&bCode0=${location.state.flightData?.segments[0]?.bookingcode}&mCarrier0=${location.state.flightData?.segments[0].marketingcareer}&mCarrierFN0=${location.state.flightData?.segments[0]?.marketingflight}&oCarrier0=${location.state.flightData?.segments[0].operatingcareer}&oCarrierFN0=${location.state.flightData?.segments[0]?.operatingflight}&departure1=${location.state.flightData?.segments[1].departure}&arrival1=${location.state.flightData?.segments[1]?.arrival}&dpTime1=${location.state.flightData?.segments[1].departureTime}&arrTime1=${location.state.flightData?.segments[1].arrivalTime}&bCode1=${location.state.flightData?.segments[1]?.bookingcode}&mCarrier1=${location.state.flightData?.segments[1]?.marketingcareer}&mCarrierFN1=${location.state.flightData?.segments[1]?.marketingflight}&oCarrier1=${location.state.flightData?.segments[1]?.operatingcareer}&oCarrierFN1=${location.state.flightData?.segments[1]?.operatingflight}&adult=${location.state.adultCount}&child=${location.state.childCount}&inf=${location.state.infant}`;
// todo system galileo and segment 2
// url = `https://api.flyfarint.com/v.1.0.0/AirPrice/oneway.php?system=${location.state?.flightData?.system}&segment=${location.state?.flightData?.segment}&adult=${location.state?.adultCount}&child=${location.state.childCount}&infant=${location.state.infant}&Group=${location.state?.flightData?.segments[0].SegmentDetails?.Group}&Carrier=${location.state?.flightData?.segments[0].SegmentDetails.Carrier}&FareBasisCode=${location.state?.flightData?.FareBasisCode}&FlightNumber=${location.state?.flightData?.segments[0].SegmentDetails.FlightNumber}&Origin=${location.state?.flightData?.segments[0].SegmentDetails.Origin}&Destination=${location.state.flightData?.segments[0].SegmentDetails.Destination}&DepartureTime=${location.state?.flightData?.segments[0]?.SegmentDetails?.DepartureTime}&ArrivalTime=${location.state.flightData?.segments[0].SegmentDetails.ArrivalTime}&BookingCode=${location.state.flightData?.segments[0].bookingcode}&AirSegmentKey=${location.state.flightData?.segments[0].SegmentDetails.key}&Group1=${location.state?.flightData?.segments[1].SegmentDetails.Group}&Carrier1=${location.state?.flightData?.segments[1].SegmentDetails.Carrier}&FareBasisCode1=${location.state?.flightData?.FareBasisCode}&FlightNumber1=${location.state?.flightData?.segments[1].SegmentDetails.FlightNumber}&Origin1=${location.state?.flightData?.segments[1].SegmentDetails.Origin}&Destination1=${location.state.flightData.segments[1].SegmentDetails.Destination}&DepartureTime1=${location.state?.flightData.segments[1].SegmentDetails.DepartureTime}&ArrivalTime1=${location.state.flightData?.segments[1].SegmentDetails.ArrivalTime}&BookingCode1=${location.state.flightData?.segments[1].bookingcode}&AirSegmentKey1=${location.state.flightData?.segments[1].SegmentDetails.key}`

// todo system galileo and segment 1
// url = `https://api.flyfarint.com/v.1.0.0/AirPrice/oneway.php?system=${location.state?.flightData?.system}&segment=${location.state?.flightData?.segment}&adult=${location.state?.adultCount}&child=${location.state.childCount}&infant=${location.state.infant}&Group=${location.state?.flightData?.segments[0].SegmentDetails?.Group}&Carrier=${location.state?.flightData?.segments[0].SegmentDetails.Carrier}&FareBasisCode=${location.state?.flightData?.FareBasisCode}&FlightNumber=${location.state?.flightData?.segments[0].SegmentDetails.FlightNumber}&Origin=${location.state?.flightData?.segments[0].SegmentDetails.Origin}&Destination=${location.state.flightData?.segments[0].SegmentDetails.Destination}&DepartureTime=${location.state?.flightData?.segments[0].SegmentDetails.DepartureTime}&ArrivalTime=${location.state.flightData?.segments[0].SegmentDetails.ArrivalTime}&BookingCode=${location.state.flightData?.segments[0].bookingcode}&AirSegmentKey=${location.state.flightData?.segments[0].SegmentDetails.key}`;

//   url = `https://api.flyfarint.com/v.1.0.0/FlyHub/AirPrice.php?SearchID=${location.state?.flightData?.SearchID}&ResultID=${location.state?.flightData?.ResultID}`;
{
  /* <Box className="dialog-flex">
                          <Box className="dialog-content">
                            <span>Adult 12+</span>
                          </Box>
                          <Box className="incre-decre">
                            <button onClick={adultDecrement}>-</button>
                            <span>{adultCount}</span>
                            <button onClick={adultInclement}>+</button>
                          </Box>
                        </Box>
                        <Box className="dialog-flex">
                          <Box className="dialog-content">
                            <span>Child 2-11</span>
                          </Box>
                          <Box className="incre-decre">
                            <button onClick={adult2Decrement}>-</button>
                            <span>{childCount}</span>
                            <button onClick={adult2Inclement}>+</button>
                          </Box>
                        </Box>
                        <Box className="dialog-flex">
                          <Box className="dialog-content">
                            <span>Infants 0-2</span>
                          </Box>
                          <Box className="incre-decre">
                            <button onClick={infantDecrement}>-</button>
                            <span>{infant}</span>
                            <button onClick={infantIncrement}>+</button>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "10px",
                            color: "rgb(217, 72, 72);",
                            fontSize: "14px",
                          }}
                        >
                          <span>Traveler should be only 9 person</span> <br />
                          <Button
                            size="small"
                            variant="contained"
                            color="error"
                            onClick={() => handleClose()}
                          >
                            save
                          </Button>
                        </Box> */
}
{
  /* </DialogContent> */
}

{
  /* <FormControl>
  <Select
    sx={{
      fontSize: "12px",
      bgcolor: "var(--primary-color)",
      color: "#fff",
      width: "185px",
    }}
    value="SortBy"
    displayEmpty
    inputProps={{ "aria-label": "Without label" }}
    size="small"
  >
    <MenuItem value="SortBy" className="shot-btnn">
      Sort By
    </MenuItem>
    <FormGroup className="select-value">
      <FormControlLabel
        // onChange={handleChangeD}
        value={isDirectFlight}
        onChange={directFlightFilter}
        control={
          <Checkbox
            sx={{
              color: "var(--primary-color)",
              "&.Mui-checked": {
                color: "var(--primary-color)",
              },
            }}
          />
        }
        label="Direct Flight"
      />
      <FormControlLabel
        // onChange={handleChangeO}

        control={
          <Checkbox
            name={"segments"}
            sx={{
              color: "var(--primary-color)",
              "&.Mui-checked": {
                color: "var(--primary-color)",
              },
            }}
          />
        }
        label="One Stop Flight"
      />
      <FormControlLabel
        // onChange={handleChangeT}
        value={"TwoStopFlight"}
        control={
          <Checkbox
            sx={{
              color: "var(--primary-color)",
              "&.Mui-checked": {
                color: "var(--primary-color)",
              },
            }}
          />
        }
        label="Two Stop Flight"
      />
      <hr />
      <FormControlLabel
        // onChange={handleChangeR}
        value={isRefundableChecked}
        onChange={refundableFilter}
        control={
          <Checkbox
            sx={{
              color: "var(--primary-color)",
              "&.Mui-checked": {
                color: "var(--primary-color)",
              },
            }}
          />
        }
        label="Refundable"
      />
      <FormControlLabel
        // onChange={handleChangeN}
        value={isNonRefundableChecked}
        onChange={nonrefundableFilter}
        control={
          <Checkbox
            sx={{
              color: "var(--primary-color)",
              "&.Mui-checked": {
                color: "var(--primary-color)",
              },
            }}
          />
        }
        label="Non Refundable"
      />
    </FormGroup>
  </Select>
</FormControl>; */
}

// const directFlightFilter = (e) => {
//   if (e.target.checked === true) {
//     const filterData = datas.filter((item) => {
//       return item.segment === "1";
//     });

//     setData2(filterData);
//   } else if (e.target.checked === false) {
//     setData2(datas);
//   }
//   setIsDirectFlight((current) => !current);
// };

// // filter for refundable
// const refundableFilter = (e) => {
//   if (e.target.checked === true) {
//     const filterData = datas.filter((item) => {
//       return item.refundable === "Refundable";
//     });
//     setData2(filterData);
//   } else if (e.target.checked === false) {
//     setData2(datas);
//   }
//   setIsRefundableChecked((current) => !current);
// };

// const nonrefundableFilter = (e) => {
//   if (e.target.checked === true) {
//     const filterData = datas.filter((item) => {
//       return item.refundable === "Nonrefundable";
//     });
//     setFilteredData(filterData);
//   } else if (e.target.checked === false) {
//     setFilteredData(datas);
//   }
//   setIsNonRefundableChecked((current) => !current);
// };

{
  /* <Grid item className="select-form-control"> */
}
{
  /* sort by section */
}
{
  /* <FormControl>
                  <Select
                    sx={{
                      fontSize: "12px",
                      bgcolor: "var(--primary-color)",
                      color: "#fff",
                      width: "185px",
                    }}
                    value="SortBy"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    size="small"
                  >
                    <MenuItem value="SortBy" className="shot-btnn">
                      Sort By
                    </MenuItem>
                    <FormGroup className="select-value">
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="directFlight"
                            checked={directFlight}
                            onChange={handleDirectFlight}
                            sx={{
                              color: "var(--primary-color)",
                              "&.Mui-checked": {
                                color: "var(--primary-color)",
                              },
                            }}
                          />
                        }
                        label="Direct Flight"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="oneStopFlight"
                            checked={oneStopFlight}
                            onChange={handleOneStopFlight}
                            sx={{
                              color: "var(--primary-color)",
                              "&.Mui-checked": {
                                color: "var(--primary-color)",
                              },
                            }}
                          />
                        }
                        label="One Stop Flight"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="multiStopFlight"
                            checked={multiStopFlight}
                            onChange={handleMultiStopFlight}
                            sx={{
                              color: "var(--primary-color)",
                              "&.Mui-checked": {
                                color: "var(--primary-color)",
                              },
                            }}
                          />
                        }
                        label="Multi Stop Flight"
                      />
                      <hr />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="refundable"
                            checked={refundable}
                            onChange={handleRefundable}
                            sx={{
                              color: "var(--primary-color)",
                              "&.Mui-checked": {
                                color: "var(--primary-color)",
                              },
                            }}
                          />
                        }
                        label="Refundable"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="nonRefundable"
                            checked={nonRefundable}
                            onChange={handleNonRefundable}
                            sx={{
                              color: "var(--primary-color)",
                              "&.Mui-checked": {
                                color: "var(--primary-color)",
                              },
                            }}
                          />
                        }
                        label="Non Refundable"
                      />
                    </FormGroup>
                  </Select>
                </FormControl> */
}
{
  /* end */
}
{
  /* </Grid> */
}
// update home page

{
  /* <Box className="about-section">

        <Box
          style={{ overflowX: "hidden" }}
          className="header-parent containers custom-modal-close"
        >
          <Box className="header-tab">
            <Box className="header-logoo">
              <img alt="logo-not-found" src={logo} width="150px" />
            </Box>

            <Box>
              <Button
                onClick={rhandleOpen}
                id="register-buttonn"
                className="register-b"
                sx={{
                  color: "#fff",
                  fontSize: "17px",
                }}
              >
                Register Now
              </Button>
              <Modal
                open={ropen}
                onClose={rhandleClose}
                className="custom-modal-r"
              >
                <Box sx={modalStyle}>{<NewRegister />}</Box>
              </Modal>
              <Button
                id="signIn-responsive"
                className="sign-in"
                onClick={handleOpen}
              >
                Sign in
              </Button>
              <Modal open={open} onClose={handleClose} className="custom-modal">
                <Box sx={modalStyle}>{<LoginPage />}</Box>
              </Modal>
            </Box>
          </Box>
          <AppBar position="static" className="headerBgs appbody">
    
            <Box className="header-width">
              <Toolbar disableGutters>
                <Box sx={{ display: { md: "none" } }}>
                  <IconButton
                    className="humburger-icon"
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <img
                      style={{ width: "30px" }}
                      src={hamburger}
                      alt="img-not-found"
                    />
                  </IconButton>
                </Box>

                <Box className="header-logo">
                  <Link to="/">
                    <img alt="logo-not-found" src={logo} width="150px" />
                  </Link>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
            
                  </IconButton>

                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                

                    <Box className="menu-contentt" sx={{ padding: "0px 10px" }}>
                      <Button>Home </Button> <br></br>
                      <Button>Contact Us</Button>
                      <br></br>
                      <Button id="active"> About Us </Button>
                      <br></br>
                 
                      <Button
                        id="register-responsive"
                        className="register-b"
                        sx={{
                          margin: "15px 0px",
                          background: "#fff !important",
                          color: "#fff",
                        }}
                      >
                        Register Now
                      </Button>
                      <Modal
                        open={ropen}
                        onClose={rhandleClose}
                        className="custom-modal-r"
                      >
                        <Box sx={modalStyle}>{<NewRegister />}</Box>
                      </Modal>
               
                      <br></br>
                 
                      <Button
                        id="signIn-responsive"
                        className="sign-in"
                        onClick={handleOpen}
                      >
                        Sign in{" "}
                      </Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        className="custom-modal"
                      >
                        <Box sx={modalStyle}>{<LoginPage />}</Box>
                      </Modal>
              
                    </Box>
                  </Menu>
                </Box>
  
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <img alt="logo-not-found" src={logo} width="170px" />
                </Typography>




                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  <Box className="manu-parent">
                    <Box className="menu-contentt">
                      <Link to="/">
                        <Button>Home</Button>
                      </Link>
                      <Link to="/searchVisa">
                        <Button>Visa</Button>
                      </Link>
                      <Link to="/about">
                        <Button>
                          About Us{" "}
                          <FiberManualRecordIcon
                            id="active"
                            sx={{ fontSize: "8px", marginLeft: "5px" }}
                          />{" "}
                        </Button>
                      </Link>
                      <Button onClick={aboutHandleOpen}>Contact Us</Button>

                      <Modal
                        open={aboutOpen}
                        onClose={aboutHandleClose}
                        className="custom-modal-r"
                      >
                        <Box className="aboutModalStyle">{<Contact />}</Box>
                      </Modal>
                    </Box>

                    <Box className="menu-btn">
                      <Button
                        onClick={rhandleOpen}
                        id="register-buttonn"
                        className="register-b"
                        sx={{
                          color: "#fff",
                          fontSize: "17px",
                        }}
                      >
                        Register Now
                      </Button>

                      <Button className="sign-in" onClick={handleOpen}>
                        Sign in{" "}
                      </Button>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>

                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Toolbar>
            </Box>
          </AppBar>
        </Box>
     
      </Box>

      <Box className="allbodycolor">
        
        <section>
          <Box className="containers">
            <Box color="white" textAlign="center">
              <Box className="img-text">
                <img src={liner} alt="line" /> <span>Our Service</span>
              </Box>

              <h1 className="h2-text">What We Are Offering?</h1>
            </Box>
            <Grid container spacing={6} marginTop="4rem" marginBottom="4rem">
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <Box className="visa-card">
                  <Box className="visaImg">
                    <img src={Visac} alt="visa" />
                  </Box>

                  <Box className="visa-cont">
                    <h4>Smooth Booking Platform</h4>

                    <article>
                      Our long years experience in this trade helps us in making
                      a convenient booking platform for our valuable
                      agents/partners. You can get easy access to worldwide
                      suppliers and services just putting your simple details on
                      our platform.
                    </article>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <Box className="visa-card">
                  <Box className="visaImg">
                    <img src={travels} alt="visa" />
                  </Box>
                  <Box className="visa-cont">
                    <h4>Professional Travel Assistance</h4>

                    <article>
                      You can consult with our concerned support team for any
                      kind of travel related advice or consultancy. Our support
                      team will ensure you the best possible travel solutions
                      which will help you to deal with your customer with utmost
                      care.
                    </article>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <Box className="visa-card">
                  <Box className="visaImg">
                    <img src={air} alt="visa" />
                  </Box>

                  <Box className="visa-cont">
                    <h4>User friendly Customizable UI</h4>

                    <article>
                      We are offering a highly customizable user interface where
                      you can experience our smooth B2B portal & our dashboard
                      where the access of world class inventories will be at
                      your hand.
                    </article>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <Box className="visa-card">
                  <Box className="visaImg">
                    <img src={covids} alt="visa" />
                  </Box>
                  <Box className="visa-cont">
                    <h4>24*7 Online & Offline Services</h4>

                    <article>
                      Get our 24*7 Online & Offline Service assistance in
                      providing excellent service to your valuable clients. Our
                      experts are always there to help you grow your business.
                    </article>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </section>
        <section className="explore-more-body">

          <Grid
            sx={{ display: "flex", alignItems: "center" }}
            className="containers"
            container
            spacing={1}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              display="flex"
              alignItems="center"
            >
              <Box>
                <Box className="img-text3">
                  <img src={line} alt="line" /> <span>Why Choose Us</span>
                </Box>
                <h1 className="h1-text">Why Fly Far International?</h1>
                <Typography
                  className="finest"
                  color={"#fff"}
                  mt={1}
                  mb={1}
                  fontSize={"19px"}
                >
                  Finest Rates, User friendly/Flexible interface, Unlimited
                  resource inventory
                </Typography>
                <article className="article">
                  We are giving you the chance to grow your agency business in
                  the market, as you wi ll get the competitive air ticket rates
                  of any international routes from us. Also, you can get
                  unlimited hotel choosing option where you can choose the best
                  hotels with affordable rates. Our user friendly interface will
                  help you to confirm any service from us with shortest possible
                  time.
                </article>
                <br />
                <br />
                <Box className="get-ticket-button">
                  <Button className="explore-more-btn">Explore More</Button>
                </Box>
              </Box>
            </Grid>
            <Grid item md={1} lg={3} className="hide-section">
         
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={3} className="client-card">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Paper className="explore-card">
                  <Box>
                    <Box className="c-card">120+</Box>Client
                  </Box>
                </Paper>
                <Paper className="explore-card">
                  <Box>
                    <Box className="c-card">12k+</Box> Direct Contract
                  </Box>
                </Paper>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Paper className="explore-card">
                  <Box>
                    <Box className="c-card">100k+</Box> Agent Parmanent
                  </Box>
                </Paper>
                <Paper className="explore-card">
                  <Box>
                    <Box className="c-card">220+</Box> Customers
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
   
        </section>

        <DescriptionBox></DescriptionBox>

        <NewFooter className="footer-text-color" />
      </Box> */
  //todo: don't remove this
}

// console.log(
//   `https://api.flyfarint.com/v.1.0.0/AirPrice/return.php?system=Galileo&segment=${location.state?.roundData?.segment}&adult=${location.state?.adultCount}&child=${location.state?.childCount}&infant=${location.state?.infant}&goAirSegmentKey=${location.state?.roundData?.segments.go[0].segmentDetails.key}&goGroup=${location.state?.roundData?.segments.go[0].segmentDetails.Group}&goCarrier=${location.state?.roundData?.segments.go[0].segmentDetails.Carrier}&goFareBasisCode=${location.state?.roundData?.goFareBasisCode}&goFlightNumber=${location.state?.roundData?.segments.go[0].segmentDetails.FlightNumber}&goOrigin=${location.state?.roundData?.segments.go[0].segmentDetails.Origin}&goDestination=${location.state?.roundData?.segments.go[0].segmentDetails.Destination}&goDepartureTime=${location.state?.roundData?.segments.go[0].segmentDetails.DepartureTime}&goArrivalTime=${location.state?.roundData?.segments.go[0].segmentDetails.ArrivalTime}&goBookingCode=${location.state?.roundData?.segments.go[0].bookingcode}&goAirSegmentKey1=${location.state?.roundData?.segments.go[1].segmentDetails.key}&goGroup1=${location.state?.roundData?.segments.go[1].segmentDetails.Group}&goCarrier1=${location.state?.roundData?.segments.go[1].segmentDetails.Carrier}&goFareBasisCode1=${location.state?.roundData?.goFareBasisCode}&goFlightNumber1=${location.state?.roundData?.segments.go[1].segmentDetails.FlightNumber}&goOrigin1=${location.state?.roundData?.segments.go[1].segmentDetails.Origin}&goDestination1=${location.state?.roundData?.segments.go[1].segmentDetails.Destination}&goDepartureTime1=${location.state?.roundData?.segments.go[1].segmentDetails.DepartureTime}&goArrivalTime1=${location.state?.roundData?.segments.go[1].segmentDetails.ArrivalTime}&goBookingCode1=${location.state?.roundData?.segments.go[1].bookingcode}&backAirSegmentKey=${location.state?.roundData?.segments.back[0].segmentDetails.key}&backGroup=${location.state?.roundData?.segments.back[0].segmentDetails.Group}&backCarrier=${location.state?.roundData?.segments.back[0].segmentDetails.Carrier}&backFareBasisCode=${location.state?.roundData?.backFareBasisCode}&backFlightNumber=${location.state?.roundData?.segments.back[0].segmentDetails.FlightNumber}&backOrigin=${location.state?.roundData?.segments.back[0].segmentDetails.Origin}&backDestination=${location.state?.roundData?.segments.back[0].segmentDetails.Destination}&backDepartureTime=${location.state?.roundData?.segments.back[0].departureTime}&backArrivalTime=${location.state?.roundData?.segments.back[0].arrivalTime}&backBookingCode=${location.state?.roundData?.segments.back[0].bookingcode}&backAirSegmentKey1=${location.state?.roundData?.segments.back[1].segmentDetails.key}&backGroup1=${location.state?.roundData?.segments.back[1].segmentDetails.Group}&backCarrier1=${location.state?.roundData?.segments.back[1].segmentDetails.Carrier}&backFareBasisCode1=${location.state?.roundData?.backFareBasisCode}&backFlightNumber1=${location.state?.roundData?.segments.back[1].segmentDetails.FlightNumber}&backOrigin1=${location.state?.roundData?.segments.back[1].segmentDetails.Origin}&backDestination1=${location.state?.roundData?.segments.back[1].segmentDetails.Destination}&backDepartureTime1=${location.state?.roundData?.segments.back[1].departureTime}&backArrivalTime1=${location.state?.roundData?.segments.back[1].arrivalTime}&backBookingCode1=${location.state?.roundData?.segments.back[1].bookingcode}`
// );
//   url = `https://api.flyfarint.com/v.1.0.0/AirPrice/return.php?system=Galileo&segment=${location.state?.roundData?.segment}&adult=${location.state?.adultCount}&child=${location.state?.childCount}&infant=${location.state?.infant}&goAirSegmentKey=${location.state?.roundData?.segments.go[0].segmentDetails.key}&goGroup=${location.state?.roundData?.segments.go[0].segmentDetails.Group}&goCarrier=${location.state?.roundData?.segments.go[0].segmentDetails.Carrier}&goFareBasisCode=${location.state?.roundData?.goFareBasisCode}&goFlightNumber=${location.state?.roundData?.segments.go[0].segmentDetails.FlightNumber}&goOrigin=${location.state?.roundData?.segments.go[0].segmentDetails.Origin}&goDestination=${location.state?.roundData?.segments.go[0].segmentDetails.Destination}&goDepartureTime=${location.state?.roundData?.segments.go[0].segmentDetails.DepartureTime}&goArrivalTime=${location.state?.roundData?.segments.go[0].segmentDetails.ArrivalTime}&goBookingCode=${location.state?.roundData?.segments.go[0].bookingcode}&goAirSegmentKey1=${location.state?.roundData?.segments.go[1].segmentDetails.key}&goGroup1=${location.state?.roundData?.segments.go[1].segmentDetails.Group}&goCarrier1=${location.state?.roundData?.segments.go[1].segmentDetails.Carrier}&goFareBasisCode1=${location.state?.roundData?.goFareBasisCode}&goFlightNumber1=${location.state?.roundData?.segments.go[1].segmentDetails.FlightNumber}&goOrigin1=${location.state?.roundData?.segments.go[1].segmentDetails.Origin}&goDestination1=${location.state?.roundData?.segments.go[1].segmentDetails.Destination}&goDepartureTime1=${location.state?.roundData?.segments.go[1].segmentDetails.DepartureTime}&goArrivalTime1=${location.state?.roundData?.segments.go[1].segmentDetails.ArrivalTime}&goBookingCode1=${location.state?.roundData?.segments.go[1].bookingcode}&backAirSegmentKey=${location.state?.roundData?.segments.back[0].segmentDetails.key}&backGroup=${location.state?.roundData?.segments.back[0].segmentDetails.Group}&backCarrier=${location.state?.roundData?.segments.back[0].segmentDetails.Carrier}&backFareBasisCode=${location.state?.roundData?.backFareBasisCode}&backFlightNumber=${location.state?.roundData?.segments.back[0].segmentDetails.FlightNumber}&backOrigin=${location.state?.roundData?.segments.back[0].segmentDetails.Origin}&backDestination=${location.state?.roundData?.segments.back[0].segmentDetails.Destination}&backDepartureTime=${location.state?.roundData?.segments.back[0].departureTime}&backArrivalTime=${location.state?.roundData?.segments.back[0].arrivalTime}&backBookingCode=${location.state?.roundData?.segments.back[0].bookingcode}&backAirSegmentKey1=${location.state?.roundData?.segments.back[1].segmentDetails.key}&backGroup1=${location.state?.roundData?.segments.back[1].segmentDetails.Group}&backCarrier1=${location.state?.roundData?.segments.back[1].segmentDetails.Carrier}&backFareBasisCode1=${location.state?.roundData?.backFareBasisCode}&backFlightNumber1=${location.state?.roundData?.segments.back[1].segmentDetails.FlightNumber}&backOrigin1=${location.state?.roundData?.segments.back[1].segmentDetails.Origin}&backDestination1=${location.state?.roundData?.segments.back[1].segmentDetails.Destination}&backDepartureTime1=${location.state?.roundData?.segments.back[1].departureTime}&backArrivalTime1=${location.state?.roundData?.segments.back[1].arrivalTime}&backBookingCode1=${location.state?.roundData?.segments.back[1].bookingcode}`;

//   // todo system galileo and segment 1
//   url = `https://api.flyfarint.com/v.1.0.0/AirPrice/return.php?system=Galileo&segment=${location.state?.roundData?.segment}&adult=${location.state?.adultCount}&child=${location.state?.childCount}&infant=${location.state?.infant}&goAirSegmentKey=${location.state?.roundData?.segments.go[0].segmentDetails.key}&goGroup=${location.state?.roundData?.segments.go[0].segmentDetails.Group}&goCarrier=${location.state?.roundData?.segments.go[0].segmentDetails.Carrier}&goFareBasisCode=${location.state?.roundData?.goFareBasisCode}&goFlightNumber=${location.state?.roundData?.segments.go[0].segmentDetails.FlightNumber}&goOrigin=${location.state?.roundData?.segments.go[0].segmentDetails.Origin}&goDestination=${location.state?.roundData?.segments.go[0].segmentDetails.Destination}&goDepartureTime=${location.state?.roundData?.segments.go[0].segmentDetails.DepartureTime}&goArrivalTime=${location.state?.roundData?.segments.go[0].segmentDetails.ArrivalTime}&goBookingCode=${location.state?.roundData?.segments.go[0].bookingcode}&backAirSegmentKey=${location.state?.roundData?.segments.back[0].segmentDetails.key}&backGroup=${location.state?.roundData?.segments.back[0].segmentDetails.Group}&backCarrier=${location.state?.roundData?.segments.back[0].segmentDetails.Carrier}&backFareBasisCode=${location.state?.roundData?.backFareBasisCode}&backFlightNumber=${location.state?.roundData?.segments.back[0].segmentDetails.FlightNumber}&backOrigin=${location.state?.roundData?.segments.back[0].segmentDetails.Origin}&backDestination=${location.state?.roundData?.segments.back[0].segmentDetails.Destination}&backDepartureTime=${location.state?.roundData?.segments.back[0].departureTime}&backArrivalTime=${location.state?.roundData?.segments.back[0].arrivalTime}&backBookingCode=${location.state?.roundData?.segments.back[0].bookingcode}`;

// `https://api.flyfarint.com/v.1.0.0/FlyHub/AirPrice.php?SearchID=${location.state?.roundData?.SearchID}&ResultID=${location.state?.roundData?.ResultID}`;

{
  /*  price break down accordion start here */
}

//todo flightInformation section

{
  /* <Box>
              <Accordion
                style={{
                  backgroundColor: "#FFFFFF",
                  boxShadow: "none",
                }}
                className="shadow-accordion"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: "var(--primary-color)" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="accordion-header">
                    Price Break Down
                  </Typography>
                </AccordionSummary>
                {Object.keys(loadData).length !== 0 ? (
                  <AccordionDetails>
                    <Box
                      style={{
                        borderTop: "1px solid var(--primary-color)",
                        padding: "10px 0px",
                      }}
                    ></Box>
                    <Grid
                      sx={{ display: "flex", alignItems: "center" }}
                      container
                      spacing={2}
                    >
                      <Grid
                        item
                        xs={12}
                        md={6}
                        lg={6}
                        sx={{
                          pr: { lg: "60px", md: "0px", sm: "0px" },
                        }}
                      >
                        {location.state?.adultCount >= 1 &&
                        location.state?.childCount >= 1 &&
                        location.state?.infant >= 1 ? (
                          <Box>
                            <Box>
                              <Box>
                                <h5 className="travellers">
                                  Traveler: Adult x{location.state?.adultCount}
                                </h5>

                                <Box className="traveller-price">
                                  Base Fare x{location.state?.adultCount}:{" "}
                                  <h5 className="traveller-fare">
                                    {commaNumber(adultPrice)} BDT
                                  </h5>
                                </Box>

                                <Box className="traveller-price">
                                  Tax & Fare x{location.state?.adultCount}:{" "}
                                  <h5 className="traveller-fare">
                                    {commaNumber(adultTaxPrice)} BDT
                                  </h5>
                                </Box>
                              </Box>
                            </Box>
                            <Box className="traveller-box">
                              <Box>
                                <h5 className="travellers">
                                  Traveller: Child x{location.state?.childCount}
                                </h5>

                                <Box className="traveller-price">
                                  Base Fare x{location.state?.childCount}:{" "}
                                  <h5 className="traveller-fare">
                                    {commaNumber(childPrice)} BDT
                                  </h5>
                                </Box>

                                <Box className="traveller-price">
                                  <h5 className="traveller-fare">
                                    Tax & Fare x{location.state?.childCount}:{" "}
                                  </h5>
                                  <h5 className="traveller-fare">
                                    {commaNumber(childTaxPrice)} BDT
                                  </h5>
                                </Box>
                              </Box>
                            </Box>
                            <Box>
                              <Box>
                                <h5 className="travellers">
                                  Traveller: Infant x{location.state?.infant}
                                </h5>
                                <Box className="traveller-price">
                                  <h5 className="traveller-fare">
                                    Base Fare x{location.state?.infant}:{" "}
                                  </h5>
                                  <h5 className="traveller-fare">
                                    {infPrice} BDT
                                  </h5>
                                </Box>
                                <Box className="traveller-price">
                                  <h5 className="traveller-fare">
                                    Tax & Fare x{location.state?.infant}:{" "}
                                  </h5>
                                  <h5 className="traveller-fare">
                                    {commaNumber(infTaxPrice)} BDT
                                  </h5>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        ) : location.state?.adultCount >= 1 &&
                          location.state?.childCount >= 1 ? (
                          <Box>
                            <Box>
                              <Box>
                                <h5 className="travellers">
                                  Traveller: Adult x{location.state?.adultCount}
                                </h5>
                                <Box className="traveller-price">
                                  <h5 className="traveller-fare">
                                    Base Fare x{location.state?.adultCount}:{" "}
                                  </h5>
                                  <h5 className="traveller-fare">
                                    {commaNumber(adultPrice)} BDT
                                  </h5>
                                </Box>
                                <Box className="traveller-price">
                                  <h5 className="traveller-fare">
                                    Tax & Fare x{location.state?.adultCount}:{" "}
                                  </h5>
                                  <h5 className="traveller-fare">
                                    {adultTaxPrice} BDT
                                  </h5>
                                </Box>
                              </Box>
                            </Box>
                            <Box className="traveller-box">
                              <Box>
                                <h5 className="travellers">
                                  Traveller: Child x{location.state?.childCount}
                                </h5>
                                <Box className="traveller-price">
                                  <h5 className="traveller-fare">
                                    Base Fare x{location.state?.childCount}:{" "}
                                  </h5>
                                  <h5 className="traveller-fare">
                                    {commaNumber(childPrice)} BDT
                                  </h5>
                                </Box>
                                <Box className="traveller-price">
                                  <h5 className="traveller-fare">
                                    Tax & Fare x{location.state?.childCount}:{" "}
                                  </h5>
                                  <h5 className="traveller-fare">
                                    {commaNumber(childTaxPrice)} BDT
                                  </h5>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        ) : (
                          <Box>
                            <Box>
                              <Box>
                                <h5 className="travellers">
                                  Traveller: Adult x{location.state?.adultCount}
                                </h5>
                                <Box className="traveller-price">
                                  <h5 className="traveller-fare">
                                    Base Fare x{location.state?.adultCount}:{" "}
                                  </h5>
                                  <h5 className="traveller-fare">
                                    {commaNumber(adultPrice)} BDT
                                  </h5>
                                </Box>
                                <Box className="traveller-price">
                                  <h5 className="traveller-fare">
                                    Tax & Fare x{location.state?.adultCount}:{" "}
                                  </h5>
                                  <h5 className="traveller-fare">
                                    {commaNumber(adultTaxPrice)} BDT
                                  </h5>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        )}
                      </Grid>

                      <Grid item xs={12} md={6} lg={6} className="price-grid">
                        <Box className="price-grid-child">
                          <Box className="traveller-price">
                            <h5 className="traveller-fare">
                              Total Base Fare :{" "}
                            </h5>
                            <h5 className="traveller-fare">
                              {commaNumber(inTotalBaseFare)} BDT
                            </h5>
                          </Box>

                          <Box className="traveller-price">
                            <h5 className="traveller-fare">Total Tax : </h5>
                            <h5 className="traveller-fare">
                              {commaNumber(totalTax)} BDT
                            </h5>
                          </Box>

                          <Box className="traveller-price">
                            <h5 className="traveller-fare">Total Fare: </h5>
                            <h5 className="traveller-fare">
                              {commaNumber(totalFare)} BDT
                            </h5>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress variant="determinate" value={progress} />
                  </Box>
                )}
              </Accordion>
            </Box> */
}

{
  /* price break down accordion end here */
}

{
  /*  Baggage policy accordion start here */
}

{
  /* <Box style={{ padding: "20px 0px" }}>
              <Accordion
                className="shadow-accordion"
                style={{
                  backgroundColor: "#FFFFFF",
                  boxShadow: "none",
                }}
              >
                <AccordionSummaryPassenger
                  Details
                  expandIcon={<ExpandMoreIcon style={{ color: "var(--primary-color)" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="accordion-header">
                    Baggage Policy
                  </Typography>
                </AccordionSummaryPassenger>
                {Object.keys(loadData).length !== 0 ? (
                  <AccordionDetails className="baggage-details">
                    <Box
                      style={{
                        borderTop: "1px solid var(--primary-color)",
                        padding: "10px 0px",
                      }}
                    ></Box>
                    <h4>How to read rules:</h4>
                    <h2>
                      Pay attention to the following notifications in the
                      CANCELLATIONS section:
                    </h2>
                    <Box>
                      <p>
                        TICKET IS NON-REFUNDABLE — the ticket is non-refundable;{" "}
                        <br />
                        TICKET IS NON-REFUNDABLE FOR CANCEL/REFUND — the ticket
                        is non-refundable; <br /> REFUND IS NOT PERMITTED — the
                        ticket is non-refundable;
                        <br /> ANY TIME TICKET IS NON-REFUNDABLE — the ticket is
                        non-refundable;
                        <br /> TICKET IS NON-REFUNDABLE IN CASE OF NO-SHOW — the
                        ticket cannot be refunded in case of no-show.
                        <br /> Change rules are described in the section with
                        the CHANGES subtitle.
                      </p>
                    </Box>
                    <h2>
                      The CHANGES ARE NOT PERMITTED line means that you cannot
                      make any changes and in such a case, you are not allowed
                      to change the date/time/route of the flight.
                    </h2>
                    <Box className="passenger-baggage">
                      <h3>
                        {location.state?.flightData?.departure} -{" "}
                        {location.state?.flightData?.arrival}
                      </h3>

                      {location.state?.adultCount >= 1 &&
                      location.state?.childCount >= 1 &&
                      location.state?.infant >= 1 ? (
                        <Box>
                          <p>
                            Adult <span>:</span>{" "}
                            {location.state?.flightData?.system === "Sabre"
                              ? loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Weight !==
                                "undefined"
                                ? loadData.OTA_AirLowFareSearchRS
                                    .PricedItineraries.PricedItinerary[0]
                                    .AirItineraryPricingInfo[0]
                                    .PTC_FareBreakdowns.PTC_FareBreakdown[0]
                                    .PassengerFare.TPA_Extensions
                                    .BaggageInformationList
                                    .BaggageInformation[0].Allowance[0].Weight +
                                  loadData.OTA_AirLowFareSearchRS
                                    .PricedItineraries.PricedItinerary[0]
                                    .AirItineraryPricingInfo[0]
                                    .PTC_FareBreakdowns.PTC_FareBreakdown[0]
                                    .PassengerFare.TPA_Extensions
                                    .BaggageInformationList
                                    .BaggageInformation[0].Allowance[0].Unit
                                : loadData.OTA_AirLowFareSearchRS
                                    .PricedItineraries.PricedItinerary[0]
                                    .AirItineraryPricingInfo[0]
                                    .PTC_FareBreakdowns.PTC_FareBreakdown[0]
                                    .PassengerFare.TPA_Extensions
                                    .BaggageInformationList
                                    .BaggageInformation[0].Allowance[0].Pieces
                              : location.state?.flightData?.system === "Galileo"
                              ? loadData?.airAirPriceResult
                                  ?.airAirPricingSolution[0]
                                  ?.airAirPricingInfo[0]?.airBaggageAllowances
                                  .airBaggageAllowanceInfo?.airTextInfo
                                  ?.airText[0] || "30kg"
                              : loadData?.Results[0]?.segments[0]?.Baggage}{" "}
                          </p>
                          <p>
                            Child <span>:</span>
                            {location.state?.flightData?.system === "Sabre"
                              ? loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Weight !==
                                "undefined"
                                ? loadData.OTA_AirLowFareSearchRS
                                    .PricedItineraries.PricedItinerary[0]
                                    .AirItineraryPricingInfo[0]
                                    .PTC_FareBreakdowns.PTC_FareBreakdown[0]
                                    .PassengerFare.TPA_Extensions
                                    .BaggageInformationList
                                    .BaggageInformation[0].Allowance[0].Weight +
                                  loadData.OTA_AirLowFareSearchRS
                                    .PricedItineraries.PricedItinerary[0]
                                    .AirItineraryPricingInfo[0]
                                    .PTC_FareBreakdowns.PTC_FareBreakdown[0]
                                    .PassengerFare.TPA_Extensions
                                    .BaggageInformationList
                                    .BaggageInformation[0].Allowance[0].Unit
                                : loadData.OTA_AirLowFareSearchRS
                                    .PricedItineraries.PricedItinerary[0]
                                    .AirItineraryPricingInfo[0]
                                    .PTC_FareBreakdowns.PTC_FareBreakdown[0]
                                    .PassengerFare.TPA_Extensions
                                    .BaggageInformationList
                                    .BaggageInformation[0].Allowance[0].Pieces
                              : location.state?.flightData?.system === "Galileo"
                              ? loadData?.airAirPriceResult
                                  ?.airAirPricingSolution[0]
                                  ?.airAirPricingInfo[0]?.airBaggageAllowances
                                  ?.airBaggageAllowanceInfo?.airTextInfo
                                  .airText[0] || "30kg"
                              : loadData?.Results[0]?.segments[0]?.Baggage}{" "}
                          </p>
                          <p>
                            Infant <span>:</span>
                            {location.state?.flightData?.system === "Sabre"
                              ? loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Weight !==
                                "undefined"
                                ? loadData.OTA_AirLowFareSearchRS
                                    .PricedItineraries.PricedItinerary[0]
                                    .AirItineraryPricingInfo[0]
                                    .PTC_FareBreakdowns.PTC_FareBreakdown[0]
                                    .PassengerFare.TPA_Extensions
                                    .BaggageInformationList
                                    .BaggageInformation[0].Allowance[0].Weight +
                                  loadData.OTA_AirLowFareSearchRS
                                    .PricedItineraries.PricedItinerary[0]
                                    .AirItineraryPricingInfo[0]
                                    .PTC_FareBreakdowns.PTC_FareBreakdown[0]
                                    .PassengerFare.TPA_Extensions
                                    .BaggageInformationList
                                    .BaggageInformation[0].Allowance[0].Unit
                                : loadData.OTA_AirLowFareSearchRS
                                    .PricedItineraries.PricedItinerary[0]
                                    .AirItineraryPricingInfo[0]
                                    .PTC_FareBreakdowns.PTC_FareBreakdown[0]
                                    .PassengerFare.TPA_Extensions
                                    .BaggageInformationList
                                    .BaggageInformation[0].Allowance[0].Pieces
                              : location.state?.flightData?.system === "Galileo"
                              ? loadData?.airAirPriceResult
                                  ?.airAirPricingSolution[0]
                                  ?.airAirPricingInfo[0]?.airBaggageAllowances
                                  ?.airBaggageAllowanceInfo?.airTextInfo
                                  .airText[0] || "30kg"
                              : loadData?.Results[0]?.segments[0]?.Baggage}{" "}
                          </p>
                        </Box>
                      ) : location.state?.adultCount >= 1 &&
                        location.state?.childCount >= 1 ? (
                        <Box>
                          <p>
                            Adult <span>:</span>
                            {location.state?.flightData?.system === "Sabre"
                              ? loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Weight !==
                                "undefined"
                                ? loadData.OTA_AirLowFareSearchRS
                                    .PricedItineraries.PricedItinerary[0]
                                    .AirItineraryPricingInfo[0]
                                    .PTC_FareBreakdowns.PTC_FareBreakdown[0]
                                    .PassengerFare.TPA_Extensions
                                    .BaggageInformationList
                                    .BaggageInformation[0].Allowance[0].Weight +
                                  loadData.OTA_AirLowFareSearchRS
                                    .PricedItineraries.PricedItinerary[0]
                                    .AirItineraryPricingInfo[0]
                                    .PTC_FareBreakdowns.PTC_FareBreakdown[0]
                                    .PassengerFare.TPA_Extensions
                                    .BaggageInformationList
                                    .BaggageInformation[0].Allowance[0].Unit
                                : loadData.OTA_AirLowFareSearchRS
                                    .PricedItineraries.PricedItinerary[0]
                                    .AirItineraryPricingInfo[0]
                                    .PTC_FareBreakdowns.PTC_FareBreakdown[0]
                                    .PassengerFare.TPA_Extensions
                                    .BaggageInformationList
                                    .BaggageInformation[0].Allowance[0].Pieces
                              : location.state?.flightData?.system === "Galileo"
                              ? loadData?.airAirPriceResult
                                  ?.airAirPricingSolution[0]
                                  ?.airAirPricingInfo[0]?.airBaggageAllowances
                                  ?.airBaggageAllowanceInfo?.airTextInfo
                                  .airText[0] || "30kg"
                              : loadData?.Results[0]?.segments[0]?.Baggage}{" "}
                          </p>
                          <p>
                            Child <span>:</span>
                            {location.state?.flightData?.system === "Sabre"
                              ? loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Weight !==
                                "undefined"
                                ? loadData.OTA_AirLowFareSearchRS
                                    .PricedItineraries.PricedItinerary[0]
                                    .AirItineraryPricingInfo[0]
                                    .PTC_FareBreakdowns.PTC_FareBreakdown[0]
                                    .PassengerFare.TPA_Extensions
                                    .BaggageInformationList
                                    .BaggageInformation[0].Allowance[0].Weight +
                                  loadData.OTA_AirLowFareSearchRS
                                    .PricedItineraries.PricedItinerary[0]
                                    .AirItineraryPricingInfo[0]
                                    .PTC_FareBreakdowns.PTC_FareBreakdown[0]
                                    .PassengerFare.TPA_Extensions
                                    .BaggageInformationList
                                    .BaggageInformation[0].Allowance[0].Unit
                                : loadData.OTA_AirLowFareSearchRS
                                    .PricedItineraries.PricedItinerary[0]
                                    .AirItineraryPricingInfo[0]
                                    .PTC_FareBreakdowns.PTC_FareBreakdown[0]
                                    .PassengerFare.TPA_Extensions
                                    .BaggageInformationList
                                    .BaggageInformation[0].Allowance[0].Pieces
                              : location.state?.flightData?.system === "Galileo"
                              ? loadData?.airAirPriceResult
                                  ?.airAirPricingSolution[0]
                                  ?.airAirPricingInfo[0]?.airBaggageAllowances
                                  ?.airBaggageAllowanceInfo?.airTextInfo
                                  .airText[0] || "30kg"
                              : loadData?.Results[0]?.segments[0]?.Baggage}{" "}
                          </p>
                        </Box>
                      ) : (
                        <Box>
                          <p>
                            Adult <span>: </span>
                            {location.state?.flightData?.system === "Sabre"
                              ? loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Weight !==
                                "undefined"
                                ? loadData.OTA_AirLowFareSearchRS
                                    .PricedItineraries.PricedItinerary[0]
                                    .AirItineraryPricingInfo[0]
                                    .PTC_FareBreakdowns.PTC_FareBreakdown[0]
                                    .PassengerFare.TPA_Extensions
                                    .BaggageInformationList
                                    .BaggageInformation[0].Allowance[0].Weight +
                                  loadData.OTA_AirLowFareSearchRS
                                    .PricedItineraries.PricedItinerary[0]
                                    .AirItineraryPricingInfo[0]
                                    .PTC_FareBreakdowns.PTC_FareBreakdown[0]
                                    .PassengerFare.TPA_Extensions
                                    .BaggageInformationList
                                    .BaggageInformation[0].Allowance[0].Unit
                                : loadData.OTA_AirLowFareSearchRS
                                    .PricedItineraries.PricedItinerary[0]
                                    .AirItineraryPricingInfo[0]
                                    .PTC_FareBreakdowns.PTC_FareBreakdown[0]
                                    .PassengerFare.TPA_Extensions
                                    .BaggageInformationList
                                    .BaggageInformation[0].Allowance[0].Pieces
                              : location.state?.flightData?.system === "Galileo"
                              ? loadData?.airAirPriceResult
                                  ?.airAirPricingSolution[0]
                                  ?.airAirPricingInfo[0]?.airBaggageAllowances
                                  ?.airBaggageAllowanceInfo?.airTextInfo
                                  .airText[0] || "30kg"
                              : loadData?.Results[0]?.segments[0]?.Baggage}
                          </p>
                        </Box>
                      )}
                    </Box>
                  </AccordionDetails>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress variant="determinate" value={progress} />
                  </Box>
                )}
              </Accordion>
            </Box> */
}

{
  /*  Baggage policy accordion end here */
}

{
  /* Cancellation start here */
}

{
  /* <Box>
              <Accordion
                style={{
                  backgroundColor: "#FFFFFF",
                  boxShadow: "none",
                }}
                className="shadow-accordion"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: "var(--primary-color)" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="accordion-header">
                    Cancellation Policy
                  </Typography>
                </AccordionSummary>
                {Object.keys(loadData).length !== 0 ? (
                  <AccordionDetails>
                    <Box
                      style={{
                        borderTop: "1px solid var(--primary-color)",
                        padding: "10px 0px",
                      }}
                    ></Box>

                    <Box className="cancellation">
                      <p>
                        {location.state?.flightData?.system === "Sabre"
                          ? loadData.OTA_AirLowFareSearchRS.PricedItineraries
                              .PricedItinerary[0].AirItineraryPricingInfo[0]
                              .PTC_FareBreakdowns.PTC_FareBreakdown[0]
                              .TPA_Extensions.FareCalcLine.Info
                          : location.state?.flightData?.system === "Galileo"
                          ? loadData?.airAirPriceResult
                              ?.airAirPricingSolution[0]?.airAirPricingInfo[0]
                              ?.airFareCalc || "Air Cancellation Code"
                          : "Air Cancellation Code"}
                      </p>
                    </Box>
                  </AccordionDetails>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress variant="determinate" value={progress} />
                  </Box>
                )}
              </Accordion>
            </Box> */
}

{
  /* Cancellation start end */
}

//todo round way

{
  /*  price break down accordion start here */
}
{
  /* <Box>
            <Accordion
              style={{
                backgroundColor: "#FFFFFF",
                boxShadow: "none",
              }}
              className="shadow-accordion"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: "var(--primary-color)" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="accordion-header">
                  Price Break Down
                </Typography>
              </AccordionSummary>
              {Object.keys(loadData).length !== 0 ? (
                <AccordionDetails>
                  <Box
                    style={{
                      borderTop: "1px solid var(--primary-color)",
                      padding: "10px 0px",
                    }}
                  ></Box>
                  <Grid
                    sx={{ display: "flex", alignItems: "center" }}
                    container
                    spacing={2}
                  >
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={6}
                      style={{
                        paddingRight: "60px",
                      }}
                    >
                      {location.state?.adultCount >= 1 &&
                      location.state?.childCount >= 1 &&
                      location.state?.infant >= 1 ? (
                        <Box>
                          <Box>
                            <Box>
                              <h5 className="travellers">
                                Traveller: Adult x{location.state?.adultCount}
                              </h5>
                              <Box className="traveller-price">
                                Base Fare x{location.state?.adultCount}:{" "}
                                <h5 className="traveller-fare">
                                  {commaNumber(adultPrice)} BDT
                                </h5>
                              </Box>

                              <Box className="traveller-price">
                                Tax & Fare x{location.state?.adultCount}:{" "}
                                <h5 className="traveller-fare">
                                  {commaNumber(adultTaxPrice)} BDT
                                </h5>
                              </Box>
                            </Box>
                          </Box>
                          <Box className="traveller-box">
                            <Box>
                              <h5 className="travellers">
                                Traveller: Child x{location.state?.childCount}
                              </h5>

                              <Box className="traveller-price">
                                Base Fare x{location.state?.childCount}:{" "}
                                <h5 className="traveller-fare">
                                  {commaNumber(childPrice)} BDT
                                </h5>
                              </Box>

                              <Box className="traveller-price">
                                <h5 className="traveller-fare">
                                  Tax & Fare x{location.state?.childCount}:{" "}
                                </h5>
                                <h5 className="traveller-fare">
                                  {commaNumber(childTaxPrice)} BDT
                                </h5>
                              </Box>
                            </Box>
                          </Box>
                          <Box>
                            <Box>
                              <h5 className="travellers">
                                Traveler: Infant x{location.state?.infant}
                              </h5>
                              <Box className="traveller-price">
                                <h5 className="traveller-fare">
                                  Base Fare x{location.state?.infant}:{" "}
                                </h5>
                                <h5 className="traveller-fare">
                                  {commaNumber(infPrice)} BDT
                                </h5>
                              </Box>
                              <Box className="traveller-price">
                                <h5 className="traveller-fare">
                                  Tax & Fare x{location.state?.infant}:{" "}
                                </h5>
                                <h5 className="traveller-fare">
                                  {commaNumber(infTaxPrice)} BDT
                                </h5>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      ) : location.state?.adultCount >= 1 &&
                        location.state?.childCount >= 1 ? (
                        <Box>
                          <Box>
                            <Box>
                              <h5 className="travellers">
                                Traveler: Adult x{location.state?.adultCount}
                              </h5>

                              <Box className="traveller-price">
                                Base Fare x{location.state?.adultCount}:{" "}
                                <h5 className="traveller-fare">
                                  {commaNumber(adultPrice)} BDT
                                </h5>
                              </Box>

                              <Box className="traveller-price">
                                Tax & Fare x{location.state?.adultCount}:{" "}
                                <h5 className="traveller-fare">
                                  {commaNumber(adultTaxPrice)} BDT
                                </h5>
                              </Box>
                            </Box>
                          </Box>
                          <Box className="traveller-box">
                            <Box>
                              <h5 className="travellers">
                                Traveller: Child x{location.state?.childCount}
                              </h5>
                              <Box className="traveller-price">
                                Base Fare x{location.state?.childCount}:{" "}
                                <h5 className="traveller-fare">
                                  {commaNumber(childPrice)} BDT
                                </h5>
                              </Box>

                              <Box className="traveller-price">
                                <h5 className="traveller-fare">
                                  Tax & Fare x{location.state?.childCount}:{" "}
                                </h5>
                                <h5 className="traveller-fare">
                                  {commaNumber(childTaxPrice)} BDT
                                </h5>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      ) : (
                        <Box>
                          <Box>
                            <Box>
                              <h5 className="travellers">
                                Traveler: Adult x{location.state?.adultCount}
                              </h5>

                              <Box className="traveller-price">
                                Base Fare x{location.state?.adultCount}:{" "}
                                <h5 className="traveller-fare">
                                  {commaNumber(adultPrice)} BDT
                                </h5>
                              </Box>

                              <Box className="traveller-price">
                                Tax & Fare x{location.state?.adultCount}:{" "}
                                <h5 className="traveller-fare">
                                  {commaNumber(adultTaxPrice)} BDT
                                </h5>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </Grid>

                    <Grid
                      style={{ borderLeft: "1px solid var(--primary-color)" }}
                      item
                      xs={12}
                      md={6}
                      lg={6}
                      className="price-grid"
                    >
                      <Box className="price-grid-child">
                        <Box className="traveller-price">
                          <h5 className="traveller-fare">Total Base Fare : </h5>
                          <h5 className="traveller-fare">
                            {commaNumber(totalFare)} BDT
                          </h5>
                        </Box>

                        <Box className="traveller-price">
                          <h5 className="traveller-fare">Total Tax : </h5>
                          <h5 className="traveller-fare">
                            {commaNumber(totalTax)} BDT
                          </h5>
                        </Box>

                        <Box className="traveller-price">
                          <h5 className="traveller-fare">Total Fare: </h5>
                          <h5 className="traveller-fare">
                            {commaNumber(totalFare)} BDT
                          </h5>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress variant="determinate" value={progress} />
                </Box>
              )}
            </Accordion>
          </Box> */
}
{
  /* price break down accordion end here */
}
{
  /*  Baggage policy accordion start here */
}
{
  /* <Box style={{ padding: "20px 0px" }}>
            <Accordion
              className="shadow-accordion"
              style={{
                backgroundColor: "#FFFFFF",
                boxShadow: "none",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: "var(--primary-color)" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="accordion-header">
                  Baggage Policy
                </Typography>
              </AccordionSummary>

              {Object.keys(loadData).length !== 0 ? (
                <AccordionDetails className="baggage-details">
                  <Box
                    style={{
                      borderTop: "1px solid var(--primary-color)",
                      padding: "10px 0px",
                    }}
                  ></Box>
                  <h4>How to read rules:</h4>
                  <h2>
                    Pay attention to the following notifications in the
                    CANCELLATIONS section:
                  </h2>
                  <Box>
                    <p>
                      TICKET IS NON-REFUNDABLE — the ticket is non-refundable;{" "}
                      <br />
                      TICKET IS NON-REFUNDABLE FOR CANCEL/REFUND — the ticket is
                      non-refundable; <br /> REFUND IS NOT PERMITTED — the
                      ticket is non-refundable;
                      <br /> ANY TIME TICKET IS NON-REFUNDABLE — the ticket is
                      non-refundable;
                      <br /> TICKET IS NON-REFUNDABLE IN CASE OF NO-SHOW — the
                      ticket cannot be refunded in case of no-show.
                      <br /> Change rules are described in the section with the
                      CHANGES subtitle.
                    </p>
                  </Box>
                  <h2>
                    The CHANGES ARE NOT PERMITTED line means that you cannot
                    make any changes and in such a case, you are not allowed to
                    change the date/time/route of the flight.
                  </h2>
                  <Box className="passenger-baggage">
                    {location.state?.adultCount >= 1 &&
                    location.state?.childCount >= 1 &&
                    location.state?.infant >= 1 ? (
                      <Box>
                        <p>
                          Adult <span>:</span>
                          {location.state?.roundData.system === "Sabre"
                            ? typeof loadData.OTA_AirLowFareSearchRS
                                .PricedItineraries.PricedItinerary[0]
                                .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                .PTC_FareBreakdown[0].PassengerFare
                                .TPA_Extensions.BaggageInformationList
                                .BaggageInformation[0].Allowance[0].Weight !==
                              "undefined"
                              ? loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Weight +
                                loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Unit
                              : loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Pieces
                            : location.state?.roundData.system === "Galileo"
                            ? location.state?.roundData.segment === "2"
                              ? loadData?.airAirPriceResult
                                  .airAirPricingSolution[0].airAirPricingInfo[0]
                                  .airBaggageAllowances
                                  .airBaggageAllowanceInfo[0].airTextInfo
                                  .airText[0]
                              : loadData.airAirPriceResult.airAirPricingSolution
                                  .airAirPricingInfo[0].airBaggageAllowances
                                  .airBaggageAllowanceInfo[0].airTextInfo
                                  .airText[0]
                            : loadData?.Results[0]?.segments[0]?.Baggage ||
                              "40KG"}{" "}
                        </p>
                        <p>
                          Child <span>:</span>
                          {location.state?.roundData.system === "Sabre"
                            ? typeof loadData.OTA_AirLowFareSearchRS
                                .PricedItineraries.PricedItinerary[0]
                                .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                .PTC_FareBreakdown[0].PassengerFare
                                .TPA_Extensions.BaggageInformationList
                                .BaggageInformation[0].Allowance[0].Weight !==
                              "undefined"
                              ? loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Weight +
                                loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Unit
                              : loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Pieces
                            : location.state?.roundData.system === "Galileo"
                            ? location.state?.roundData.segment === "2"
                              ? loadData?.airAirPriceResult
                                  .airAirPricingSolution[0].airAirPricingInfo[0]
                                  .airBaggageAllowances
                                  .airBaggageAllowanceInfo[0].airTextInfo
                                  .airText[0]
                              : loadData.airAirPriceResult.airAirPricingSolution
                                  .airAirPricingInfo[1].airBaggageAllowances
                                  .airBaggageAllowanceInfo[0].airTextInfo
                                  .airText[0]
                            : loadData?.Results[0]?.segments[0]?.Baggage}{" "}
                        </p>
                        <p>
                          Infant <span>:</span>
                          {location.state?.roundData.system === "Sabre"
                            ? typeof loadData.OTA_AirLowFareSearchRS
                                .PricedItineraries.PricedItinerary[0]
                                .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                .PTC_FareBreakdown[0].PassengerFare
                                .TPA_Extensions.BaggageInformationList
                                .BaggageInformation[0].Allowance[0].Weight !==
                              "undefined"
                              ? loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Weight +
                                loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Unit
                              : loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Pieces
                            : location.state?.roundData.system === "Galileo"
                            ? location.state?.roundData.segment === "2"
                              ? loadData?.airAirPriceResult
                                  .airAirPricingSolution[0].airAirPricingInfo[0]
                                  .airBaggageAllowances
                                  .airBaggageAllowanceInfo[0].airTextInfo
                                  .airText[0]
                              : loadData.airAirPriceResult.airAirPricingSolution
                                  .airAirPricingInfo[2].airBaggageAllowances
                                  .airBaggageAllowanceInfo[0].airTextInfo
                                  .airText[0]
                            : loadData?.Results[0]?.segments[0]?.Baggage}{" "}
                        </p>
                      </Box>
                    ) : location.state?.adultCount >= 1 &&
                      location.state?.childCount >= 1 ? (
                      <Box>
                        <p>
                          Adult <span>:</span>
                          {location.state?.roundData.system === "Sabre"
                            ? typeof loadData.OTA_AirLowFareSearchRS
                                .PricedItineraries.PricedItinerary[0]
                                .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                .PTC_FareBreakdown[0].PassengerFare
                                .TPA_Extensions.BaggageInformationList
                                .BaggageInformation[0].Allowance[0].Weight !==
                              "undefined"
                              ? loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Weight +
                                loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Unit
                              : loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Pieces
                            : location.state?.roundData.system === "Galileo"
                            ? location.state?.roundData.segment === "2"
                              ? loadData?.airAirPriceResult
                                  .airAirPricingSolution[0].airAirPricingInfo[0]
                                  .airBaggageAllowances
                                  .airBaggageAllowanceInfo[0].airTextInfo
                                  .airText[0]
                              : loadData.airAirPriceResult.airAirPricingSolution
                                  .airAirPricingInfo[0].airBaggageAllowances
                                  .airBaggageAllowanceInfo[0].airTextInfo
                                  .airText[0]
                            : loadData?.Results[0]?.segments[0]?.Baggage}{" "}
                        </p>
                        <p>
                          Child <span>:</span>
                          {location.state?.roundData.system === "Sabre"
                            ? typeof loadData.OTA_AirLowFareSearchRS
                                .PricedItineraries.PricedItinerary[0]
                                .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                .PTC_FareBreakdown[0].PassengerFare
                                .TPA_Extensions.BaggageInformationList
                                .BaggageInformation[0].Allowance[0].Weight !==
                              "undefined"
                              ? loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Weight +
                                loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Unit
                              : loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Pieces
                            : location.state?.roundData.system === "Galileo"
                            ? location.state?.roundData.segment === "2"
                              ? loadData?.airAirPriceResult
                                  .airAirPricingSolution[0].airAirPricingInfo[0]
                                  .airBaggageAllowances
                                  .airBaggageAllowanceInfo[0].airTextInfo
                                  .airText[0]
                              : loadData.airAirPriceResult.airAirPricingSolution
                                  .airAirPricingInfo[1].airBaggageAllowances
                                  .airBaggageAllowanceInfo[0].airTextInfo
                                  .airText[0]
                            : loadData?.Results[0]?.segments[0]?.Baggage}{" "}
                        </p>
                      </Box>
                    ) : (
                      <Box>
                        <p>
                          Adult <span>:</span>{" "}
                          {location.state?.roundData.system === "Sabre"
                            ? typeof loadData.OTA_AirLowFareSearchRS
                                .PricedItineraries.PricedItinerary[0]
                                .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                .PTC_FareBreakdown[0].PassengerFare
                                .TPA_Extensions.BaggageInformationList
                                .BaggageInformation[0].Allowance[0].Weight !==
                              "undefined"
                              ? loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Weight +
                                loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Unit
                              : loadData.OTA_AirLowFareSearchRS
                                  .PricedItineraries.PricedItinerary[0]
                                  .AirItineraryPricingInfo[0].PTC_FareBreakdowns
                                  .PTC_FareBreakdown[0].PassengerFare
                                  .TPA_Extensions.BaggageInformationList
                                  .BaggageInformation[0].Allowance[0].Pieces
                            : location.state?.roundData.system === "Galileo"
                            ? location.state?.roundData.segment === "2"
                              ? loadData.airAirPriceResult
                                  .airAirPricingSolution[0].airAirPricingInfo
                                  .airBaggageAllowances
                                  .airBaggageAllowanceInfo[0].airTextInfo
                                  .airText[0]
                              : loadData.airAirPriceResult.airAirPricingSolution
                                  .airAirPricingInfo.airBaggageAllowances
                                  .airBaggageAllowanceInfo[0].airTextInfo
                                  .airText[0]
                            : loadData?.Results[0]?.segments[0]?.Baggage}{" "}
                        </p>
                      </Box>
                    )}
                  </Box>
                </AccordionDetails>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress variant="determinate" value={progress} />
                </Box>
              )}
            </Accordion>
          </Box> */
}
{
  /*  Baggage policy accordion end here */
}
{
  /* Cancellation start here */
}
{
  /* <Box>
            <Accordion
              style={{
                backgroundColor: "#FFFFFF",
                boxShadow: "none",
              }}
              className="shadow-accordion"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: "var(--primary-color)" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="accordion-header">
                  Cancellation Policy
                </Typography>
              </AccordionSummary>
              {Object.keys(loadData).length !== 0 ? (
                <AccordionDetails>
                  <Box
                    style={{
                      borderTop: "1px solid var(--primary-color)",
                      padding: "10px 0px",
                    }}
                  ></Box>

                  <Box className="cancellation">
                    {location.state.adultCount >= 1 &&
                    location.state.childCount >= 1 &&
                    location.state.infant >= 1 ? (
                      <Box>
                        <p>
                          Adult <span>: </span>
                          {location.state?.roundData.system === "Sabre"
                            ? loadData?.OTA_AirLowFareSearchRS
                                ?.PricedItineraries?.PricedItinerary[0]
                                ?.AirItineraryPricingInfo[0]?.PTC_FareBreakdowns
                                .PTC_FareBreakdown[0]?.TPA_Extensions
                                .FareCalcLine.Info
                            : location.state?.roundData.system === "Galileo"
                            ? loadData?.airAirPriceResult
                                ?.airAirPricingSolution[0]?.airAirPricingInfo[0]
                                ?.airFareCalc || "Air Cancellation Code"
                            : "Air Cancellation Code"}
                        </p>
                        <p>
                          Child <span>: </span>
                          {location.state?.roundData.system === "Sabre"
                            ? loadData?.OTA_AirLowFareSearchRS
                                ?.PricedItineraries?.PricedItinerary[0]
                                ?.AirItineraryPricingInfo[0]?.PTC_FareBreakdowns
                                .PTC_FareBreakdown[1]?.TPA_Extensions
                                ?.FareCalcLine?.Info
                            : location.state?.roundData.system === "Galileo"
                            ? loadData?.airAirPriceResult
                                ?.airAirPricingSolution[0]?.airAirPricingInfo[0]
                                ?.airFareCalc || "Air Cancellation Code"
                            : "Air Cancellation Code"}
                        </p>
                        <p>
                          Infant <span>: </span>
                          {location.state?.roundData.system === "Sabre"
                            ? loadData?.OTA_AirLowFareSearchRS.PricedItineraries
                                ?.PricedItinerary[0]?.AirItineraryPricingInfo[0]
                                ?.PTC_FareBreakdowns.PTC_FareBreakdown[2]
                                ?.TPA_Extensions?.FareCalcLine?.Info
                            : location.state?.roundData.system === "Galileo"
                            ? loadData?.airAirPriceResult
                                ?.airAirPricingSolution[0]?.airAirPricingInfo[0]
                                ?.airFareCalc || "Air Cancellation Code"
                            : "Air Cancellation Code"}
                        </p>
                      </Box>
                    ) : location.state.adultCount >= 1 &&
                      location.state.childCount >= 1 ? (
                      <Box>
                        <p>
                          Adult <span>: </span>
                          {location.state?.roundData.system === "Sabre"
                            ? loadData?.OTA_AirLowFareSearchRS
                                ?.PricedItineraries?.PricedItinerary[0]
                                ?.AirItineraryPricingInfo[0]?.PTC_FareBreakdowns
                                .PTC_FareBreakdown[0]?.TPA_Extensions
                                .FareCalcLine.Info
                            : location.state?.roundData.system === "Galileo"
                            ? loadData?.airAirPriceResult
                                ?.airAirPricingSolution[0]?.airAirPricingInfo[0]
                                ?.airFareCalc || "Air Cancellation Code"
                            : "Air Cancellation Code"}
                        </p>
                        <p>
                          Child <span>: </span>
                          {location.state?.roundData.system === "Sabre"
                            ? loadData?.OTA_AirLowFareSearchRS
                                ?.PricedItineraries?.PricedItinerary[0]
                                ?.AirItineraryPricingInfo[0]?.PTC_FareBreakdowns
                                .PTC_FareBreakdown[1]?.TPA_Extensions
                                ?.FareCalcLine?.Info
                            : location.state?.roundData.system === "Galileo"
                            ? loadData?.airAirPriceResult
                                ?.airAirPricingSolution[0]?.airAirPricingInfo[0]
                                ?.airFareCalc || "Air Cancellation Code"
                            : "Air Cancellation Code"}
                        </p>
                      </Box>
                    ) : (
                      <p>
                        Adult <span>: </span>
                        {location.state?.roundData.system === "Sabre"
                          ? loadData?.OTA_AirLowFareSearchRS.PricedItineraries
                              ?.PricedItinerary[0]?.AirItineraryPricingInfo[0]
                              ?.PTC_FareBreakdowns.PTC_FareBreakdown[2]
                              ?.TPA_Extensions?.FareCalcLine?.Info ||
                            "Air Cancellation Code"
                          : location.state?.roundData.system === "Galileo"
                          ? loadData?.airAirPriceResult
                              ?.airAirPricingSolution[0]?.airAirPricingInfo[0]
                              ?.airFareCalc || "Air Cancellation Code"
                          : "Air Cancellation Code"}
                      </p>
                    )}
                  </Box>
                </AccordionDetails>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress variant="determinate" value={progress} />
                </Box>
              )}
            </Accordion>
          </Box> */
}
{
  /* Cancellation start end */
}

//todo allflight.js
{
  /* <Grid container>
          <Grid item>
                <Button
                  onClick={modifyHandleOpen}
                  sx={{ fontSize: "12px", color: "#fff", bgcolor: "#DC143C" }}
                  variant="contained"
                >
                  Modify Search
                </Button>
                <Modal
                  open={modifyOpen}
                  onClose={
                    modifyHandleClose
                    // setModifyOpen(false);
                  }
                >
                  <Container>
                    <Box sx={modalStyle}>
                      <FlightSearchBox />
                    </Box>
                  </Container>
                </Modal>
              </Grid>
          <Grid item className="next-day">
                <Box
                  sx={{
                    display: {
                      xs: "block",
                      sm: "block",
                      md: "block",
                      lg: "none",
                    },
                  }}
                >
                  <FilterDrawer
                    data={datas}
                    setData={setData}
                    filteredData={data2}
                    setfilteredData={setData2}
                  />
                </Box>
              </Grid>
        </Grid> */
}
{
  /* Location and modify btn end */
}

{
  /* -------------------------------------- */
}

{
  /* <Grid
                container
                rowSpacing={0}
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <Grid
                  container
                  spacing={0}
                  item
                  xs={12}
                  sm={12}
                  md={8}
                  lg={8}
                  style={{
                    backgroundColor: "#D1E9FF",

                    padding: "5px",
                  }}
                >
              

                  <Grid item xs={4} sm={4} md={3} lg={2}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "5px",
                        height: "100%",
                        width: "100%",
                        lineHeight: 1,
                      }}
                    >
                      <FlightTakeoffIcon sx={{ color: "var(--primary-color)" }} />
                      <Box>
                        <span
                          style={{
                            fontSize: "11px",
                            color: "#DC143C",
                            fontWeight: "500",
                          }}
                        >
                          From
                        </span>
                        <br />
                        <span
                          style={{
                            fontSize: "15px",
                            color: "var(--primary-color)",
                            fontWeight: "bold",
                          }}
                        >
                          {faddress?.split(",")[0]}
                        </span>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={4} sm={4} md={3} lg={2}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "5px",
                        height: "100%",
                        width: "100%",
                        lineHeight: 1,
                      }}
                    >
                      <FlightLandIcon sx={{ color: "var(--primary-color)" }} />
                      <br />
                      <Box>
                        <span
                          style={{
                            fontSize: "11px",
                            color: "#DC143C",
                            fontWeight: "500",
                          }}
                        >
                          To
                        </span>
                        <br />
                        <span
                          style={{
                            fontSize: "15px",
                            color: "var(--primary-color)",
                            fontWeight: "bold",
                          }}
                        >
                          {toAddress?.split(",")[0]}
                        </span>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={4} sm={4} md={3} lg={3}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "5px",
                        height: "100%",
                        width: "100%",
                        lineHeight: 1,
                      }}
                    >
                      <CalendarMonthIcon sx={{ color: "var(--primary-color)" }} />
                      <br />
                      <Box>
                        <span
                          style={{
                            fontSize: "11px",
                            color: "#DC143C",
                            fontWeight: "500",
                          }}
                        >
                          Departure
                        </span>
                        <br />
                        <span
                          style={{
                            fontSize: "15px",
                            color: "var(--primary-color)",
                            fontWeight: "bold",
                          }}
                        >
                          {departureDate}
                        </span>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={4} sm={4} md={3} lg={2}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "5px",
                        height: "100%",
                        width: "100%",
                        lineHeight: 1,
                      }}
                    >
                      <PersonIcon sx={{ color: "var(--primary-color)" }} />
                      <br />
                      <Box>
                        <span
                          style={{
                            fontSize: "11px",
                            color: "#DC143C",
                            fontWeight: "500",
                          }}
                        >
                          Traveler
                        </span>
                        <br />

                        <span
                          style={{
                            fontSize: "15px",
                            color: "var(--primary-color)",
                            fontWeight: "bold",
                          }}
                        >
                          {adultCount + childCount + infant}
                        </span>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={4} sm={4} md={3} lg={3}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "5px",
                        height: "100%",
                        width: "100%",
                        lineHeight: 1,
                      }}
                    >
                      <AirlineSeatReclineNormalIcon sx={{ color: "var(--primary-color)" }} />
                      <br />
                      <Box>
                        <span
                          style={{
                            fontSize: "11px",
                            color: "#DC143C",
                            fontWeight: "500",
                          }}
                        >
                          Booking Class
                        </span>
                        <br />
                        <span
                          style={{
                            fontSize: "15px",
                            color: "var(--primary-color)",
                            fontWeight: "bold",
                          }}
                        >
                          {location?.state?.className}
                        </span>
                      </Box>
                    </Box>
                  </Grid>
                
                </Grid>

                <Grid
                  display={"flex"}
                  alignItems={"center"}
                  container
                  spacing={2}
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  style={{
                    padding: "5px",
                  }}
                  className="share-modify-btn"
                >
                  <Grid item xs={6} sm={6} md={6} lg={4}>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Button
                        variant="contained"
                        startIcon={<ShareIcon />}
                        sx={{
                          fontSize: "12px",
                          color: "#dc143c",
                          border: "1px solid #dc143c",
                          bgcolor: "transparent",
                          boxShadow: "none",
                          "&:hover": {
                            backgroundColor: "#dc143c",
                            color: "#fff",
                          },
                        }}
                      ></Button>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={12}
                    lg={6}
                    sx={{
                      display: { md: "flex" },
                      justifyContent: { md: "flex-end" },
                    }}
                  >
                    <Button
                      onClick={modifyHandleOpen}
                      sx={{
                        size: "small",
                        fontSize: "12px",
                        color: "#dc143c",
                        border: "1px solid #dc143c",
                        bgcolor: "transparent",
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: "#dc143c",
                          color: "#fff",
                        },
                      }}
                      variant="contained"
                    >
                      Modify Search
                    </Button>
                    <Modal open={modifyOpen} onClose={modifyHandleClose}>
                      <Container>
                        <Box sx={modalStyle}>
                          <FlightSearchBox />
                        </Box>
                      </Container>
                    </Modal>
                  </Grid>
                </Grid>
                <Grid container></Grid>           
              </Grid> */
}

{
  /* Flight name End */
}
//todo end

//todo roundTripAllLoad

{
  /* <Grid item>
                <Button
                  sx={{
                    fontSize: "12px",
                    color: "#fff",
                    bgcolor: "#DC143C",
                  }}
                  variant="contained"
                  onClick={modifyHandleOpen}
                >
                  Modify Search
                </Button>
                <Modal open={modifyOpen} onClose={() => setModifyOpen(false)}>
                  <Box sx={modalStyle} className="custom-modal-modify">
                    <Box p={4}>
                      <TabContext value={tripTypeValue}>
                        <Box
                          sx={{
                            bgcolor: "#DC143C",
                            color: "#FFF",
                            minHeight: "0px",
                          }}
                        >
                          <TabList
                            onChange={tripTypeHandleChange}
                            aria-label="Dashboard Tabs"
                            centered
                            className="tab-list-parent"
                          >
                            <Tab
                              label="One Way"
                              value="oneway"
                              sx={{
                                p: "5px 5px",
                                m: "6px",
                                minHeight: "0px",
                              }}
                            />
                            <Box className="whiteBox"></Box>
                            <Tab
                              label="Round Way"
                              value="return"
                              sx={{
                                p: "5px 5px",
                                m: "6px",
                                minHeight: "0px",
                              }}
                            />
                            <Box className="whiteBox"></Box>
                            <Tab
                              label="Multi City"
                              value="multicity"
                              sx={{
                                p: "5px 5px",
                                m: "6px",
                                minHeight: "0px",
                              }}
                            />
                          </TabList>
                        </Box>
                        <TabPanel value="oneway">
                          <OneWay
                            tripType={tripTypeValue}
                            iconColor={"#DC143C"}
                            bgColor={"#d8ebfc"}
                            borderColor={"var(--primary-color)"}
                          />
                        </TabPanel>
                        <TabPanel value="return">
                          <RoundTrip
                            tripType={tripTypeValue}
                            iconColor={"#DC143C"}
                            bgColor={"#d8ebfc"}
                            borderColor={"var(--primary-color)"}
                          />
                        </TabPanel>
                        <TabPanel value="multicity">
                          <MultiCity
                            tripType={tripTypeValue}
                            iconColor={"#DC143C"}
                            bgColor={"#d8ebfc"}
                            borderColor={"var(--primary-color)"}
                          />
                        </TabPanel>
                      </TabContext>
                    </Box>
                  </Box>
                </Modal>
              </Grid> */
}
//todo: allFlight.js filter functionality
// const handleRefundable = (e) => {
//   setRefundable(e.target.checked);
//   setNonRefundable(false);
//   if (e.target.checked) {
//     const data = datas.filter((item) => item.refundable === "Refundable");
//     setData2(data);
//   } else {
//     setData2(datas);
//   }
// };
// const handleNonRefundable = (e) => {
//   setRefundable(false);
//   setNonRefundable(e.target.checked);
//   if (e.target.checked) {
//     const data = datas.filter((item) => item.refundable === "Nonrefundable");
//     setData2(data);
//   } else {
//     setData2(datas);
//   }
// };

// const handleDirectFlight = (e) => {
//   setDirectFlight(e.target.checked);
//   setOneStopFlight(false);
//   setMultiStopFlight(false);
//   if (e.target.checked) {
//     const data = datas.filter((item) => item.segment === "1");
//     setData2(data);
//   } else if (e.target.checked && refundable) {
//     const data = datas.filter(
//       (item) => item.segment === "1" && item.refundable === "Refundable"
//     );
//     setData2(data);
//   } else if (e.target.checked && nonRefundable) {
//     const data = datas.filter(
//       (item) => item.segment === "1" && item.refundable === "Nonrefundable"
//     );
//     setData2(data);
//   } else {
//     setData2(datas);
//   }
// };
// const handleOneStopFlight = (e) => {
//   setDirectFlight(false);
//   setOneStopFlight(e.target.checked);
//   setMultiStopFlight(false);
//   if (e.target.checked) {
//     const data = datas.filter((item) => item.segment === "2");
//     setData2(data);
//   } else if (e.target.checked && refundable) {
//     const data = datas.filter(
//       (item) => item.segment === "2" && item.refundable === "Refundable"
//     );
//     setData2(data);
//   } else if (e.target.checked && nonRefundable) {
//     const data = datas.filter(
//       (item) => item.segment === "2" && item.refundable === "Nonrefundable"
//     );
//     setData2(data);
//   } else {
//     setData2(datas);
//   }
// };
// const handleMultiStopFlight = (e) => {
//   setDirectFlight(false);
//   setOneStopFlight(false);
//   setMultiStopFlight(e.target.checked);
//   if (e.target.checked) {
//     const data = datas.filter((item) => item.segment >= "3");
//     setData2(data);
//   } else if (e.target.checked && refundable) {
//     const data = datas.filter(
//       (item) => item.segment >= "3" && item.refundable === "Refundable"
//     );
//     setData2(data);
//   } else if (e.target.checked && nonRefundable) {
//     const data = datas.filter(
//       (item) => item.segment >= "3" && item.refundable === "Nonrefundable"
//     );
//     setData2(data);
//   } else {
//     setData2(datas);
//   }
// };

// const handleRefundable = (e) => {
//   setRefundable(e.target.checked);
//   setNonRefundable(false);
//   if (e.target.checked) {
//     const data = datas.filter((item) => item.refundable === "Refundable");
//     setFilteredData(data);
//   } else {
//     setFilteredData(datas);
//   }
// };
// const handleNonRefundable = (e) => {
//   setRefundable(false);
//   setNonRefundable(e.target.checked);
//   if (e.target.checked) {
//     const data = datas.filter((item) => item.refundable === "Nonrefundable");
//     setFilteredData(data);
//   } else {
//     setFilteredData(datas);
//   }
// };

//todo flightinformation.js

// const passengerDetails = () => {
//   location.state?.flightData?.system === "Galileo"
//     ? navigate("/dashboard/flightUserInfo", {
//         state: {
//           userData: location.state,
//           searchResult: loadData,
//         },
//       })
//     : location.state?.flightData?.system === "FlyHub"
//     ? navigate("/dashboard/flightUserInfoFlyHub", {
//         state: {
//           userData: location.state,
//           searchResult: loadData,
//         },
//       })
//     : navigate("/dashboard/flightUserInfoSabre", {
//         state: {
//           userData: location.state,
//           searchResult: loadData,
//         },
//       });
// };

//?  pdf code here

{
  /* body start */
}

//         <Box mt={4} className="E-ticket-passenger-details">
//         <Box
//           style={{
//             display: "flex",
//             gap: "8px",
//             alignItems: "center",
//           }}
//           my={2}
//         >
//           <h4>PASSENGER DETAILS </h4>
//           <MdOutlineAirlineSeatReclineNormal
//             style={{ fontSize: "20px", color: "var(--primary-color)" }}
//           />
//         </Box>

//         <Box display={"flex"} gap={"20px"}>
//           <Box>
//             <p>Passenger Name:</p>
//             <p>Contact Number:</p>
//           </Box>
//           <Box>
//             <p>
//               <span>SYED Zafridi</span>
//             </p>
//             <p>
//               <span>+880 1925785592</span>
//             </p>
//           </Box>
//         </Box>

//         <Box mt={2} display={"flex"} gap={"80px"}>
//           <Box display={"flex"} gap={"30px"}>
//             <Box>
//               <p>TICKET NUMBER:</p>
//               <p>REFERENCE ID:</p>
//               <p>AIRLINES PNR:</p>
//             </Box>
//             <Box>
//               <p>9979564554155</p>
//               <p>FFI220531546851</p>
//               <p>YYDOY1</p>
//             </Box>
//           </Box>
//           <Box display={"flex"} gap={"20px"}>
//             <Box>
//               <p>STATUS:</p>
//               <p>ISSUE DATE:</p>
//               <p>FLIGHT TYPE:</p>
//             </Box>
//             <Box>
//               <p>Ticketed</p>
//               <p>31/05/2022</p>
//               <p>DOMESTIC & ONE WAY</p>
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       <Box className="E-ticket-passenger-flight">
//         <Box
//           style={{
//             display: "flex",
//             gap: "8px",
//             alignItems: "center",
//           }}
//           my={2}
//         >
//           <h4>FLIGHT ITNERARIES</h4>
//           <MdOutlineFlight id="flight-pdf" />
//         </Box>
//         <Box display={"flex"} justifyContent={"space-between"}>
//           <Box>
//             <h5>Dhaka</h5>
//             <p>Hazrat Shajalal Intl Airport</p>
//             <p>
//               12:00 AM <span>Sat, 21 mar, ‘22</span>{" "}
//             </p>
//           </Box>

//           <Box width="45%">
//             <Box>
//               <Grid container justifyContent="center">
//                 <Typography
//                   sx={{
//                     color: "var(--primary-color)",
//                     fontWeight: 500,
//                     fontSize: {
//                       xs: "12px",
//                       sm: "10px",
//                       md: "12px",
//                     },
//                   }}
//                 >
//                   2h:3min |&nbsp;
//                 </Typography>
//                 <Typography
//                   sx={{
//                     color: "#DC143C",
//                     fontWeight: 500,
//                     fontSize: {
//                       xs: "12px",
//                       sm: "11px",
//                       md: "12px",
//                     },
//                   }}
//                 >
//                   Two Stops
//                 </Typography>
//               </Grid>
//               <Box px={1}>
//                 <div className="eticket-parent-03">
//                   <hr className="eticeket-line" />
//                   <div className="eticket-segment-circle">
//                     <div className="eticket-circle-0">
//                       <span>
//                         <CircleIcon
//                           sx={{
//                             color: "var(--gray-text-color)",
//                             fontSize: "15px",
//                             cursor: "pointer",
//                           }}
//                         />
//                       </span>
//                     </div>
//                     <hr className="eticket-segment-stop"></hr>
//                     <hr className="eticket-segment-stop"></hr>
//                     <div className="eticket-circle-0">
//                       <span>
//                         <CircleIcon
//                           sx={{
//                             color: "var(--gray-text-color)",
//                             fontSize: "15px",
//                             cursor: "pointer",
//                           }}
//                         />
//                       </span>
//                     </div>
//                   </div>
//                   <div className="eticket-03">
//                     <FlightIcon />
//                   </div>
//                 </div>
//               </Box>
//               <Typography className="eticket-seg-3">
//                 <Box className="arival-text">DELLHI</Box>
//                 <Box className="arival-text">ISTANBUL</Box>
//               </Typography>
//             </Box>
//           </Box>

//    <Box width="30%">
//   <Box>
//     <Grid container justifyContent="center">
//       <Typography
//         sx={{
//           color: "var(--primary-color)",
//           fontWeight: 500,
//           fontSize: {
//             xs: "12px",
//             sm: "10px",
//             md: "12px",
//           },
//         }}
//       >
//         2h:3min |&nbsp;
//       </Typography>
//       <Typography
//         sx={{
//           color: "#DC143C",
//           fontWeight: 500,
//           fontSize: {
//             xs: "12px",
//             sm: "11px",
//             md: "12px",
//           },
//         }}
//       >
//         Two Stops
//       </Typography>
//     </Grid>
//     <Box px={1}>
//       <div className="eticket-parent-03">
//         <hr className="eticeket-line" />
//         <div className="eticket-segment-circle">
//           <div className="eticket-circle-0">
//             <span>
//               <CircleIcon
//                 sx={{
//                   color: "var(--gray-text-color)",
//                   fontSize: "15px",
//                   cursor: "pointer",
//                 }}
//               />
//             </span>
//           </div>
//           <hr className="eticket-segment-stop"></hr>
//           <div className="eticket-circle-0">
//             <span>
//               <CircleIcon
//                 sx={{
//                   color: "var(--gray-text-color)",
//                   fontSize: "15px",
//                   cursor: "pointer",
//                 }}
//               />
//             </span>
//           </div>
//         </div>
//         <div className="eticket-03">
//           <FlightIcon />
//         </div>
//       </div>
//     </Box>
//     <Typography className="eticket-seg-3">
//       <Box className="arival-text">DXB</Box>
//     </Typography>
//   </Box>
// </Box>

//        <Box width="30%">
//   <Box>
//     <Grid container justifyContent="center">
//       <Typography
//         sx={{
//           color: "var(--primary-color)",
//           fontWeight: 500,
//           fontSize: {
//             xs: "12px",
//             sm: "10px",
//             md: "12px",
//           },
//         }}
//       >
//         2h:3min |&nbsp;
//       </Typography>
//       <Typography
//         sx={{
//           color: "#DC143C",
//           fontWeight: 500,
//           fontSize: {
//             xs: "12px",
//             sm: "11px",
//             md: "12px",
//           },
//         }}
//       >
//         Two Stops
//       </Typography>
//     </Grid>
//     <Box px={1}>
//       <div className="eticket-parent-03">
//         <hr className="eticeket-line" />
//         <div className="eticket-segment-circle">
//           <div className="eticket-circle-0">
//             <span>
//               <CircleIcon
//                 sx={{
//                   color: "var(--gray-text-color)",
//                   fontSize: "15px",
//                   cursor: "pointer",
//                 }}
//               />
//             </span>
//           </div>

//           <div className="eticket-circle-0">
//             <span>
//               <CircleIcon
//                 sx={{
//                   color: "var(--gray-text-color)",
//                   fontSize: "15px",
//                   cursor: "pointer",
//                 }}
//               />
//             </span>
//           </div>
//         </div>
//         <div className="eticket-03">
//           <FlightIcon />
//         </div>
//       </div>
//     </Box>
//   </Box>
// </Box>

//           <Box>
//             <h5>Dubai</h5>
//             <p>Dubai Intl Airport</p>
//             <p>
//               12:00 AM <span>Sat, 21 mar, ‘22</span>{" "}
//             </p>
//           </Box>
//         </Box>

//         <Box mt={3} className="clientInvoice-table">
//           <table>
//             <tr>
//               <th>Flight Segment</th>
//               <th>Flight</th>
//               <th>Career name</th>
//               <th>Departure</th>
//               <th>Arrival</th>
//               <th>Class</th>
//               <th>Seat</th>
//             </tr>
//             <tr>
//               <td>Istanbul-Dubai</td>
//               <td>BS341</td>
//               <td>Turkey Airlines</td>
//               <td>01-sep-22 18:15</td>
//               <td>01-sep-22 18:15</td>
//               <td>Economy </td>
//               <td>G DH8 </td>
//             </tr>
//           </table>
//         </Box>
//       </Box>

//       <Box className="E-ticket-passenger-flight">
//         <Box
//           style={{
//             display: "flex",
//             gap: "8px",
//             alignItems: "center",
//           }}
//           my={2}
//         >
//           <h4>BAGGAGE & FARE DETAILS</h4>
//           <MdLuggage style={{ color: "var(--primary-color)", fontSize: "20px" }} />
//         </Box>

//         <Box mt={2} className="clientInvoice-table">
//           <table>
//             <tr>
//               <th>Flight Segment</th>
//               <th>Pax Type</th>
//               <th>Bag Allowance</th>
//               <th>Fare Code</th>
//               <th>Currency</th>
//               <th>Base Fare </th>
//               <th>Tax</th>
//               <th>Total Fare</th>
//             </tr>
//             <tr>
//               <td>Air Ticket</td>
//               <td>Adult</td>
//               <td>45,000</td>
//               <td>0</td>
//               <td>0</td>
//               <td>2500</td>
//               <td>1</td>
//               <td>79,000 BDT</td>
//             </tr>

//             <tr>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>

//               <td colSpan={"2"}>
//                 GRAND TOTAL:
//                 <em style={{ paddingLeft: "10px" }}>7000 BDT</em>
//               </td>
//             </tr>
//           </table>
//         </Box>

//         <li>
//           Baggage allowances apply to each passenger in your booking.
//         </li>
//       </Box>

//       <Box mt={2}>
//         <Grid container spacing={2}>
//           <Grid item md={7}>
//             <Box
//               display={"flex"}
//               justifyContent={"space-between"}
//               className="clientInvoice-price-box"
//             >
//               <Box>
//                 <h5>Base fare total amount</h5>
//                 <h5>Discount</h5>
//                 <h5>Tax</h5>
//                 <h5>AIT & VAT</h5>

//                 <h5 style={{ fontWeight: "bold" }}>
//                   Total Ticket fare Amount
//                 </h5>
//               </Box>
//               <Box>
//                 <h5>94,500 BDT</h5>
//                 <h5>8,500 BDT</h5>
//                 <h5>94,500 BDT</h5>
//                 <h5>8,500 BDT</h5>

//                 <h5 style={{ fontWeight: "bold" }}>104,500 BDT</h5>
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>

//       <Box mt={3} className="clientInvoice-note">
//         <h6>Note:</h6>
//         <p>
//           All payment should be made in favor of "Fly Far
//           International".This Invoice will not be recognized as paid
//           unless supported by Company Official Receipt. 3% Bank Charge
//           will be add on total bill amount, if the bill Paid/settled by
//           Debit/Credit Card
//         </p>
//       </Box>

{
  /* body end */
}

//?  pdf code end here
//todo callender code here
{
  /* <Calendar
                    color={iconColor}
                    date={new Date(departureDate)}
                    placeholderText="Departure Date"
                    onChange={(date) => {
                      setDepartureDate(format(new Date(date), "dd MMM yy"));
                      new Date(departureDate).getMonth() &&
                        new Date(departureDate).getDate() >=
                          new Date(returningDate).getMonth() &&
                        new Date(returningDate).getDate() &&
                        setReturningDate(format(new Date(date), "dd MMM yy"));
                      setOpenDate(false);
                      setOpenReturnDate(true);
                      setOpenFrom(false);
                      setOpenTo(false);
                    }}
                    months={1}
                    direction="horizontal"
                    minDate={new Date()}
                    className="new-return-date"
                    name="date"
                  /> */
}

{
  /* <Grow in={openReturnDate}> */
}
{
  /* {openReturnDate && (
                <Box
                  sx={{
                    display: {
                      lg: "block",
                      md: "block",
                      sm: "block",
                      xs: "block",
                    },
                  }}
                >
                  <Calendar
                    color="var(--primary-color)"
                    date={new Date(returningDate)}
                    onChange={(date) => {
                      setReturningDate(format(new Date(date), "dd MMM yy"));
                      setOpenReturnDate(false);
                      setOpenDate(false);
                      setOpenFrom(false);
                      setOpenTo(false);
                      setOpen(true);
                    }}
                    months={1}
                    direction="horizontal"
                    minDate={new Date(departureDate)}
                    className="new-return-date-return"
                    name="departure-date"
                  />
                </Box>
              )} */
}
{
  /* </Grow> */
}
// onClick={() => {
//   setOpenDate((prev) => !prev);
//   setOpenReturnDate(false);
//   setOpenFrom(false);
//   setOpenTo(false);
//   setOpen(false);
// }}
// onClick={() => {
//   setOpenReturnDate((prev) => !prev);
//   setOpenDate(false);
//   setOpenFrom(false);
//   setOpenTo(false);
//   setOpen(false);
// }}
{
  /* <Calendar
                      color={iconColor}
                      date={new Date(departureDate)}
                      onChange={(date) => {
                        setDepartureDate(format(new Date(date), "dd MMM yy"));
                        setOpenDate(false);
                        setTimeout(() => setOpen(true), 200);
                      }}
                      months={1}
                      direction="horizontal"
                      minDate={new Date()}
                      className="new-dashboard-calendar"
                      name="dashboard-calendar"
                    /> */
}
//todo queues page code .
{
  /* 
                    <td>
                      <button
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleOpen(
                            bookingDetail?.BookingId,
                            bookingDetail?.agentId
                          )
                        }
                      >
                        View Details
                      </button>

                      <Modal
                        open={open}
                        onClose={handleClose}
                        className="custom-modal-r queues-modal"
                      >
                        <Box sx={modalStyle}>
                          <Paper
                            sx={{
                              width: "700px",
                              height: "430px",
                              boxShadow: "none",
                              borderRadius: "10px",
                              overflow: " hidden",
                            }}
                            className="queues-modal5"
                          >
                            <section className="queues-modal">
                              <Box className="pending-modal">
                                <button>{modalDetails?.status}</button>
                              </Box>
                              <Box className="queues-inner">
                                <Box className="queues-id">
                                  <h3>
                                    Reference ID: {modalDetails?.BookingId}{" "}
                                  </h3>
                                  <span>GDS:{modalDetails?.gds}</span>
                                </Box>

                                <Box className="ticket-detail">
                                  <h4>Agency Details</h4>
                                  <p>
                                    Name: <span>{modalDetails?.name}</span>
                                  </p>
                                  <p>
                                    Email: <span>{modalDetails?.email}</span>
                                  </p>
                                  <p>
                                    Phone: <span>{modalDetails?.phone}</span>
                                  </p>
                                </Box>

                                <Box className="ticket-detail">
                                  <h4>Flight Details</h4>

                                  <Box className="flight-detail">
                                    <Box>
                                      <p>
                                        Trip Type:{" "}
                                        <span>{modalDetails?.tripType}</span>
                                      </p>
                                      <p>
                                        Departure From:{" "}
                                        <span>{modalDetails?.deptFrom}</span>
                                      </p>
                                      <p>
                                        Arrival To:{" "}
                                        <span>{modalDetails?.arriveTo}</span>
                                      </p>
                                      <p>
                                        Airlines:{" "}
                                        <span>{modalDetails?.airlines}</span>
                                      </p>
                                      <p>
                                        Invoice Price:{" "}
                                        <span>{modalDetails?.cost} Tk</span>
                                      </p>
                                      <p>
                                        PAX: <span>{modalDetails?.pax}</span>
                                      </p>
                                    </Box>

                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "end",
                                      }}
                                    >
                                      <Box>
                                        <p style={{ padding: "10px 0px" }}>
                                          <strong
                                            style={{
                                              fontSize: "18px",
                                            }}
                                          >
                                            PNR:{" "}
                                            <span>{modalDetails?.pnr}</span>{" "}
                                          </strong>
                                        </p>
                                        <Box className="modal-btn-queues">
                                          {modalDetails?.status === "Hold" ? (
                                            <Box className="queue-cancelBtn">
                                              <button
                                                onClick={() =>
                                                  cancelBooking(
                                                    modalDetails?.pnr,
                                                    modalDetails?.gds
                                                  )
                                                }
                                              >
                                                Cancel Flight
                                              </button>
                                            </Box>
                                          ) : (
                                            ""
                                          )}

                                          <Box className="queue-pdfBtn">
                                            <button onClick={queuePdf}>
                                              Download PDF
                                            </button>
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            </section>
                          </Paper>
                        </Box>
                      </Modal>
                    </td> */
}
//todo allFlight page

// const calParcent = (num, percentage) => {
//   const result = num * (percentage / 100);
//   return parseFloat(result.toFixed(0));
// };
// const percntVal = calParcent(parseInt(price), 7);
// const AgentPrice =
//   parseInt(BasePrice) + parseInt(Taxes) - percntVal;

// const commisonPrice = parseInt(BasePrice) - percntVal;
// const offerPrice = parseInt(price) + parseInt(percntVal);
// const [afPrice, setAfPrice] = useState(AgentPrice);
// const [cmPrice, setCmPrice] = useState(commisonPrice);

//  todo: implement customization price button handle
// const [openCustomize, setOpenCustomize] = useState(false);

// const [openDefault, setOpenDefault] = useState(true);
// const [openCm, setOpenCm] = useState(false);
//todo myaccount.js
{
  /* Super  Final design  */
}
{
  /* <Container className="account-details-parent" maxWidth="xxl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Box className="account-details-profile">
              <img src={userData?.companyImage} />
            </Box>
            <Box className="account-heading">
              <h3>{userData?.name}</h3>

              <Box className="account-heading ">
                <p style={{ color: "var(--primary-color)" }}>
                  Administrative <span>Date of Joining: 2022/04/08</span>
                </p>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={7} className="account-details">
            <h4>Company Information</h4>
            <Box mt={1} mb={1} className="account-company-img">
              <img src={userData?.logo} />
            </Box>

            <Box display={"flex"} gap={"10px"} alignItems={"center"}>
              <MdEmail
                style={{
                  fontSize: "24px",

                  color: "#DC143C",
                }}
              />
              <p>{userData?.email}</p>
            </Box>

            <Box display={"flex"} gap={"15px"} alignItems={"center"}>
              <BsFillTelephoneFill
                style={{
                  fontSize: "20px",

                  color: "#DC143C",
                }}
              />
              {userData?.phone}
            </Box>

            <Box display={"flex"} gap={"15px"} alignItems={"center"}>
              <TbWorld
                style={{
                  fontSize: "23px",

                  color: "#DC143C",
                }}
              />
              <p>www.flyway.com</p>
            </Box>

            <Box display={"flex"} gap={"12px"} alignItems={"center"}>
              <MdLocationOn
                style={{
                  fontSize: "26px",
                  color: "#DC143C",
                }}
              />
              <p>{userData?.companyadd} </p>
            </Box>
          </Grid>
        </Grid>

        <Box className="profile-update-btn">
          <button onClick={rhandleOpen}>Update Account Information</button>
        </Box>

        <Modal open={ropen} onClose={rhandleClose} className="custom-modal-r">
          <Box sx={modalStyle}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={12}>
                <Box className="account-update-img">
                  <img src={userData?.companyImage} />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <input
                  className="u-input"
                  type="text"
                  placeholder="Enter Company Name"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <input
                  className="u-input"
                  type="text"
                  value={companyName}
                  placeholder="Enter Company Email"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <input
                  className="u-input"
                  type="text"
                  value={companyName}
                  placeholder="Enter Company Phone Number "
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <input
                  className="u-input"
                  type="text"
                  placeholder="Enter Website Address "
                />
              </Grid>
              <Grid item xs={12} sm={6} md={8}>
                <input
                  className="u-input"
                  type="text"
                  value={companyName}
                  placeholder="Enter Company  Address"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <input className="customFileType u-input" type="file" />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={12}
                display={"flex"}
                alignItems={"center"}
                gap={"10px"}
                mb={3}
              >
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                />
                <labe
                  style={{ color: "#DC143C", fontWeight: "400" }}
                  for="vehicle1"
                >
                  Add This Logo in your Documents
                </labe>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <input
                  className="u-input"
                  type="text"
                  value={companyName}
                  placeholder="Enter Your Name"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <input
                  className="u-input"
                  type="text"
                  value={companyName}
                  placeholder="Enter Your Email"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <input
                  className="u-input"
                  type="text"
                  value={companyName}
                  placeholder="Enter Phone Number"
                />
              </Grid>

              <Grid className="account-update-btn" item xs={12} sm={6} md={12}>
                <button>Update Account Information</button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Container> */
}
//todo 22 sep
{
  /* <Grid container justifyContent={"space-between"}>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item className="next-day">
                <Box
                  sx={{
                    display: {
                      xs: "block",
                      sm: "block",
                      md: "block",
                      lg: "none",
                    },
                  }}
                >
                  <RoundFilterDrawer
                    data={datas}
                    setData={setDatas}
                    filteredData={data2}
                    setfilteredData={setData2}
                    noData={noData}
                    setNoData={setNoData}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid> */
}
//todo register page
// useEffect(() => {
//   if (isCPasswordDirty) {
//     if (password === cPassword) {
//       setShowErrorMessage(false);
//       setCPasswordClass("form-control is-valid");
//     } else {
//       setShowErrorMessage(true);
//       setCPasswordClass("form-control is-invalid");
//     }
//   }
// }, [cPassword]);
// check boxx click after button enable
{
  /* <Grid
                item
                xs={12}
                sm={6}
                md={6}
                className="input-field"
                sx={{ paddingTop: "15px !important" }}
              >
                <input
                  className="email"
                  placeholder="Enter First Name "
                  required
                  name="firstName"
                  label="First Name"
                  type="text"
                  onChange={(e) => setFname(e.target.value)}
                />
              </Grid> */
}
{
  /* <Modal
                    open={ropen}
                    onClose={rhandleClose}
                    className="custom-modal-r"
                  >
                    <Box className="modalStyler">{<NewRegister />}</Box>
                  </Modal> */
}
//todo new header code
{
  /* <Box className="nav-slider">
        <NavSlider />
      </Box> */
}
{
  /* <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={6}
          className="half-side"
          marginTop="2rem"
        >
          <Box className="search-containers">
            <h1 className="h1-texts">
              WHERE WOULD YOU <br /> <strong>LIKE TO GO ?</strong>
            </h1>
            <br />
            <Box className="homePage-header">
              <h1>
                WHERE WOULD YOU <br /> <strong>LIKE TO GO ?</strong>
              </h1>
            </Box>
            <Box className="homeSearch">
              <HomeSearchBoard />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          md={12}
          lg={6}
          className="slider-side"
          sx={{ position: "relative", mt: "-150px" }}
        >
          <Box className="web-nav-slider">
            <NavSlider />
          </Box>
        </Grid>
      </Grid> */
}
//todo flightuserinfo page code
{
  /* <Grid container justifyContent="space-between">
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontSize: "10px",
                fontWeight: 500,
              }}
            >
              Cancellation Code:
            </Typography>
            <Typography
              sx={{
                color: "#000",
                fontSize: "13px",
                fontWeight: 500,
              }}
            ></Typography>
            <Typography
              sx={{
                color: "#999",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              {searchData?.flightData?.system === "Sabre"
                ? loadData.OTA_AirLowFareSearchRS.PricedItineraries
                    .PricedItinerary[0].AirItineraryPricingInfo[0]
                    .PTC_FareBreakdowns.PTC_FareBreakdown[0].TPA_Extensions
                    .FareCalcLine.Info
                : searchData?.flightData?.system === "Galileo"
                ? loadData?.airAirPriceResult?.airAirPricingSolution[0]
                    ?.airAirPricingInfo[0]?.airFareCalc ||
                  "Air Cancellation Code"
                : "Air Cancellation Code"}
            </Typography>
          </Grid> */
}
//todo roundFlightInfoDetails
{
  /* <Grid container justifyContent="space-between">
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontSize: "10px",
                fontWeight: 500,
              }}
            >
              Cancellation Code:
            </Typography>
            <Typography
              sx={{
                color: "#000",
                fontSize: "13px",
                fontWeight: 500,
              }}
            ></Typography>
            <Typography
              sx={{
                color: "#999",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              {searchData?.roundData.system === "Sabre"
                ? loadData?.OTA_AirLowFareSearchRS.PricedItineraries
                    ?.PricedItinerary[0]?.AirItineraryPricingInfo[0]
                    ?.PTC_FareBreakdowns.PTC_FareBreakdown[2]?.TPA_Extensions
                    ?.FareCalcLine?.Info || "Air Cancellation Code"
                : searchData?.roundData.system === "Galileo"
                ? loadData?.airAirPriceResult?.airAirPricingSolution[0]
                    ?.airAirPricingInfo[0]?.airFareCalc ||
                  "Air Cancellation Code"
                : "Air Cancellation Code"}
            </Typography>
          </Grid> */
}
//todo roundTripAllLoad page
{
  /* <Grid
                      container
                      className="botom-service"
                      sx={{ mt: "15px", mb: "15px" }}
                    >
                      <Grid
                        item
                        xs={6}
                        sm={6}
                        md={3}
                        lg={3}
                        xl={3}
                        textAlign={"center"}
                      >
                        <Box>
                          <img src={seatimg} alt="smeting" />
                          <span>&nbsp; 81 cm Seat pitch</span>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sm={6}
                        md={3}
                        lg={3}
                        xl={3}
                        textAlign={"center"}
                      >
                        <Box>
                          <img src={airplane} alt="smeting" />
                          <span>&nbsp; 777(wide body)</span>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sm={6}
                        md={3}
                        lg={3}
                        xl={3}
                        textAlign={"center"}
                      >
                        <Box>
                          <img src={wifiImg} alt="smeting" />
                          <span>&nbsp; Basic web browsing free</span>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sm={6}
                        md={3}
                        lg={3}
                        xl={3}
                        textAlign={"center"}
                      >
                        <Box>
                          <img src={hexa} alt="smeting" />
                          <span>&nbsp; Power & USB OUtlets</span>
                        </Box>
                      </Grid>
                    </Grid> */
}
//todo: rountripmain
// const [airLine, setAirLine] = useState([]);
// useEffect(() => {
//   fetch`https://api.flyfarint.com/v.1.0.0/AirMaterials/Airlines.php?all`
//     .then((response) => response.json())
//     .then((actualData) => setAirLine(actualData));
// }, []);

// const [airLine, setAirLine] = useState([]);
// useEffect(() => {
//   fetch`https://api.flyfarint.com/v.1.0.0/AirMaterials/Airlines.php?all`
//     .then((response) => response.json())
//     .then((actualData) => setAirLine(actualData));
// }, []);
//todo:searchCountry
{
  /* header start */
}
{
  /* <Box className="header-parent custom-modal-close">
  {/* ------------------------------Responsive Menubar Start -----------------*/
}
// <Box className="containers header-tab ">
//   <Box className="header-logoo">
//     <Link to="/">
//       <img alt="logo-not-found" src={logo} />
//     </Link>
//   </Box>
//   <Box
//   // sx={{
//   //   display: { xs: "block", sm: "block", md: "none" },
//   // }}
//   >
//     <ClickAwayListener onClickAway={menuHandleClickAway}>
//       {/* <Box position={"relative"}> */}
//       <Box>
//         {/* <Box className="button-hmnu1"> */}
//         <Box>
//           <Button onClick={menuHandleClick} className="menu-icon">
//             <HiMenuAlt1
//               fontSize={"40px"}
//               color="#fff"
//               // transform="rotate(40deg)"
//             />
//           </Button>
//         </Box>
//         {menuOpen ? (
//           <Box>
//             <Box className="menuStyles" pt="60px">
//               <ul>
//                 <li>
//                   <Link to="/">
//                     <Button>
//                       Home
//                       <FiberManualRecordIcon
//                         id="active"
//                         sx={{ fontSize: "8px", marginLeft: "5px" }}
//                       />
//                     </Button>
//                   </Link>
//                 </li>
//                 <li className="visa89">
//                   <Link to="/searchVisa">
//                     <Button>Visa</Button>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/about">
//                     <Button>About Us</Button>
//                   </Link>
//                 </li>
//                 <li>
//                   <Button onClick={aboutHandleOpen}>Contact Us</Button>
//                 </li>

//                 <Box
//                   sx={{
//                     mt: "30px",
//                     mb: "30px",
//                     textAlign: "center",
//                   }}
//                 >
//                   <Button className="register-b" onClick={rhandleOpen}>
//                     Register Now
//                   </Button>
//                   <Modal
//                     open={ropen}
//                     onClose={rhandleClose}
//                     className="custom-modal-r"
//                   >
//                     <Box className="modalStyler">{<NewRegister />}</Box>
//                   </Modal>
//                   <Button
//                     size="small"
//                     id="signIn-responsive"
//                     className="sign-in"
//                     onClick={handleOpen}
//                   >
//                     Sign in
//                   </Button>
//                   <Modal
//                     open={open}
//                     onClose={handleClose}
//                     // className="custom-modal"
//                   >
//                     <Box className="modalStyle">{<LoginPage />}</Box>
//                   </Modal>
//                 </Box>
//               </ul>
//             </Box>
//           </Box>
//         ) : null}
//       </Box>
//     </ClickAwayListener>
//   </Box>
// </Box>

{
  /* -----------------------Responsive Menubar End -----------------*/
}

{
  /* main menu here  */
}
// <AppBar position="static" className="headerBgs appbody containers">
//   <Box className="header-width">
//     <Toolbar disableGutters>
//       <Box className="header-logo">
//         <Link to="/">
//           <img alt="logo-not-found" src={logo} width="150px" />
//         </Link>
//       </Box>

//       {/* responsive  menu end  here */}

//       {/* main menu here  */}
//       <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//         <Box className="manu-parent">
//           <Box className="menu-contentt">
//             <Link to="/">
//               <Button>Home</Button>
//             </Link>
//             <Link to="/searchVisa">
//               <Button>
//                 Visa{" "}
//                 <FiberManualRecordIcon
//                   id="active"
//                   sx={{ fontSize: "8px", marginLeft: "5px" }}
//                 />{" "}
//               </Button>
//             </Link>
//             <Link to="/about">
//               <Button>About Us </Button>
//             </Link>
//             <Button onClick={aboutHandleOpen}>Contact Us</Button>

//             <Modal
//               open={aboutOpen}
//               onClose={aboutHandleClose}
//               className="custom-modal-r"
//             >
//               <Box className="aboutModalStyle">{<Contact />}</Box>
//             </Modal>
//           </Box>

//           <Box className="menu-btn">
//             <Button
//               onClick={rhandleOpen}
//               id="register-buttonn"
//               className="register-b"
//               sx={{
//                 color: "#fff",
//                 fontSize: "17px",
//               }}
//             >
//               Register Now
//             </Button>
//             <Modal
//               open={ropen}
//               onClose={rhandleClose}
//               className="custom-modal-r"
//             >
//               <Box className="modalStyler">{<NewRegister />}</Box>
//             </Modal>
//             <Button className="sign-in" onClick={handleOpen}>
//               Sign in{" "}
//             </Button>

//             {trigger ? (
//               <LoginModal open={handleOpen} onClose={handleClose} />
//             ) : (
//               <LoginModal open={open} onClose={handleClose} />
//             )}
//           </Box>
//         </Box>
//       </Box>

//       <Box sx={{ flexGrow: 0 }}>
//         <Tooltip title="Open settings">
//           <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//             <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//           </IconButton>
//         </Tooltip>

//         <Menu
//           sx={{ mt: "45px" }}
//           id="menu-appbar"
//           anchorEl={anchorElUser}
//           anchorOrigin={{
//             vertical: "top",
//             horizontal: "right",
//           }}
//           keepMounted
//           transformOrigin={{
//             vertical: "top",
//             horizontal: "right",
//           }}
//           open={Boolean(anchorElUser)}
//           onClose={handleCloseUserMenu}
//         >
//           {settings.map((setting) => (
//             <MenuItem key={setting} onClick={handleCloseUserMenu}>
//               <Typography textAlign="center">{setting}</Typography>
//             </MenuItem>
//           ))}
//         </Menu>
//       </Box>
//     </Toolbar>
//   </Box>
// </AppBar>
// </Box>;
{
  /* header end */
  // } */}
}
{
  /* <AppBar position="static" className="headerBgs appbody containers">
  <Box className="header-width">
    <Toolbar disableGutters>
      <Box className="header-logo">
        <Link to="/">
          <img alt="logo-not-found" src={logo} width="150px" />
        </Link>
      </Box> */
}

{
  /* responsive  menu end  here */
}

{
  /* main menu here  */
}
{
  /* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  <Box className="manu-parent">
                    <Box className="menu-contentt">
                      <Link to="/">
                        <Button>Home</Button>
                      </Link>
                      <Link to="/about">
                        <Button>
                          About Us{" "}
                          <FiberManualRecordIcon
                            id="active"
                            sx={{ fontSize: "8px", marginLeft: "5px" }}
                          />{" "}
                        </Button>
                      </Link>
                      <Button onClick={aboutHandleOpen}>Contact Us</Button>

                      <Modal
                        open={aboutOpen}
                        onClose={aboutHandleClose}
                        className="custom-modal-r"
                      >
                        <Box className="aboutModalStyle">{<Contact />}</Box>
                      </Modal>
                    </Box>

                    <Box className="menu-btn">
                      <Button
                        onClick={rhandleOpen}
                        id="register-buttonn"
                        className="register-b"
                        sx={{
                          color: "#fff",
                          fontSize: "17px",
                        }}
                      >
                        Register Now
                      </Button>
                      <Modal
                        open={ropen}
                        onClose={rhandleClose}
                        className="custom-modal-r"
                      >
                        <Box className="modalStyler">{<NewRegister />}</Box>
                      </Modal>
                      <Button className="sign-in" onClick={handleOpen}>
                        Sign in{" "}
                      </Button>

                      {trigger ? (
                        <LoginModal open={handleOpen} onClose={handleClose} />
                      ) : (
                        <LoginModal open={open} onClose={handleClose} />
                      )}
                    </Box>
                  </Box>
                </Box> */
}

{
  /* <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>

                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box> */
}
{
  /* </Toolbar>
  </Box>
</AppBar>; */
}
// <Box
//   sx={{
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "column",
//     height: "50vh",
//     width: "50vw",
//     marginInline: "auto",
//   }}
// >
//   <Box
//     sx={{
//       width: "100%",
//       height: "100%",
//       mb: "10px",
//     }}
//   >
//     <img
//       src={Loader}
//       alt="loader"
//       style={{
//         width: "100%",
//         height: "100%",
//         objectFit: "cover",
//       }}
//     />
//   </Box>
//   <Box
//     sx={{
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       flexDirection: "column",
//       width: "50%",
//       height: "50%",
//     }}
//   >
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         color: "var(--primary-color)",
//       }}
//     >
//       <Typography variant="h3">{fromSendData}</Typography>
//       <SwapHorizIcon fontSize="large" />
//       <Typography variant="h3">{toSendData}</Typography>
//     </Box>
//     <Box sx={{ display: "flex", fontSize: "max(20px)" }}>
//       <Typography variant="h6" sx={{ color: "#999" }}>
//         {format(new Date(fromSearchDate), "dd MMM yy")}
//       </Typography>
//       <Typography
//         variant="h6"
//         sx={{ color: "#999", marginInline: "10px" }}
//       >
//         ||
//       </Typography>
//       <Typography variant="h6" sx={{ color: "#999" }}>
//         {className}
//       </Typography>
//       <Typography
//         variant="h6"
//         sx={{ color: "#999", marginInline: "10px" }}
//       >
//         ||
//       </Typography>
//       <Typography variant="h6" sx={{ color: "#999" }}>
//         {adultCount > 0 && `Adult(${adultCount})`}
//         {childCount > 0 && `Children(${childCount})`}
//         {infant > 0 && `Infant(${infant})`}
//       </Typography>
//     </Box>
//   </Box>
// </Box>
/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "70vh",
            width: "70vw",
            marginInline: "auto",
          }}
        >
          <Box
            sx={{
              width: "50%",
              height: "50%",
              mb: "10px",
            }}
          >
            <img
              src={Loader}
              alt="loader"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "center",
              }}
            />
          </Box>
        </Box> */
// const sortedData = data.sort(
//   (prev, curr) => curr.clientPrice - prev.clientPrice
// );
// const uniqueData = [
//   ...new Map(data.map((item) => [item["price"], item])).values(),
// ];
// const uniqueData = data.reduce((acc, current) => {
//   const x = acc.find(
//     (item) =>
//       item.segments[0].marketingflight ===
//       current.segments[0].marketingflight
//   );
//   if (!x) {
//     return acc.concat([current]);
//   } else {
//     return acc;
//   }
// }, []);

//todo
// useEffect(() => {
//   const url5 = `https://api.flyfarint.com/v.1.0.0/Queues/Ticketing.php?bookingId=${bookingId}&invoiceId=${fareCost[0]?.invoiceId}`;
//   const fetchUserData5 = fetch(url5)
//     .then((res) => res.json())
//     .then((data) => {
//       setInvoiceId(data);
//       setIsLoading(false);
//     });
// }, [bookingId]);
//todo:
// const capsCount = (state.password.match(/[A-Z]/g) || []).length;
// const smallCount = (state.password.match(/[a-z]/g) || []).length;
// const numberCount = (state.password.match(/[0-9]/g) || []).length;
// const symbolCount = (state.password.match(/\W/g) || []).length;
// if (capsCount < 1) {
//   setError("Must contain one UPPERCASE letter");
//   return;
// } else if (smallCount < 1) {
//   setError("Must contain one lowercase letter");
//   return;
// } else if (numberCount < 1) {
//   setError("Must contain one number");
//   return;
// } else if (symbolCount < 1) {
//   setError("Must contain one special character: @$! % * ? &");
//   return;
// } else if (contactNumber.length < 10) {
//   setErrorNum("Must contain phone number");
//   return;
// } else {
//   setError("");
// }
//todo:my name is md sohan
//todo:testing branch code

//todo: FlightInforDetails
{
  /* <>
            <Typography
              sx={{
                color: "#DC143C",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              {searchData.from} - {searchData.to}
            </Typography>
            {adultCount >= 1 && childCount >= 1 && infant >= 1 ? (
              <Box>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Adult
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {searchData?.flightData?.system === "Sabre"
                      ? loadData.groupedItineraryResponse
                          .baggageAllowanceDescs[0].weight +
                        loadData.groupedItineraryResponse
                          .baggageAllowanceDescs[0].unit
                      : searchData?.flightData?.system === "Galileo"
                      ? loadData?.airAirPriceResult?.airAirPricingSolution[0]
                          ?.airAirPricingInfo[0]?.airBaggageAllowances
                          .airBaggageAllowanceInfo?.airTextInfo?.airText[0] ||
                        "30kg"
                      : loadData?.Results[0]?.segments[0]?.Baggage?.split(
                          ","
                        )[0]}
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Child
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {searchData?.flightData?.system === "Sabre"
                      ? loadData.groupedItineraryResponse
                          .baggageAllowanceDescs[1]?.weight +
                        loadData.groupedItineraryResponse
                          .baggageAllowanceDescs[1]?.unit
                      : searchData?.flightData?.system === "Galileo"
                      ? loadData?.airAirPriceResult?.airAirPricingSolution[0]
                          ?.airAirPricingInfo[0]?.airBaggageAllowances
                          ?.airBaggageAllowanceInfo?.airTextInfo.airText[0] ||
                        "30kg"
                      : loadData?.Results[0]?.segments[0]?.Baggage?.split(
                          ","
                        )[1]}
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Infant
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {searchData?.flightData?.system === "Sabre"
                      ? "0KG"
                      : searchData?.flightData?.system === "Galileo"
                      ? loadData?.airAirPriceResult?.airAirPricingSolution[0]
                          ?.airAirPricingInfo[0]?.airBaggageAllowances
                          ?.airBaggageAllowanceInfo?.airTextInfo.airText[0] ||
                        "30kg"
                      : loadData?.Results[0]?.segments[0]?.Baggage?.split(
                          ","
                        )[2]}
                  </Typography>
                </Grid>
              </Box>
            ) : adultCount >= 1 && childCount >= 1 ? (
              <Box>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Adult
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {searchData?.flightData?.system === "Sabre"
                      ? loadData.groupedItineraryResponse
                          .baggageAllowanceDescs[0].weight +
                        loadData.groupedItineraryResponse
                          .baggageAllowanceDescs[0].unit
                      : searchData?.flightData?.system === "Galileo"
                      ? loadData?.airAirPriceResult?.airAirPricingSolution[0]
                          ?.airAirPricingInfo[0]?.airBaggageAllowances
                          .airBaggageAllowanceInfo?.airTextInfo?.airText[0] ||
                        "30kg"
                      : loadData?.Results[0]?.segments[0]?.Baggage}
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Child
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {searchData?.flightData?.system === "Sabre"
                      ? loadData.groupedItineraryResponse
                          .baggageAllowanceDescs[0].weight +
                        loadData.groupedItineraryResponse
                          .baggageAllowanceDescs[0].unit
                      : searchData?.flightData?.system === "Galileo"
                      ? loadData?.airAirPriceResult?.airAirPricingSolution[0]
                          ?.airAirPricingInfo[0]?.airBaggageAllowances
                          ?.airBaggageAllowanceInfo?.airTextInfo.airText[0] ||
                        "30kg"
                      : loadData?.Results[0]?.segments[0]?.Baggage}
                  </Typography>
                </Grid>
              </Box>
            ) : (
              <Box>
                <Grid container justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Adult
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {searchData?.flightData?.system === "Sabre"
                      ? loadData.groupedItineraryResponse
                          .baggageAllowanceDescs[0].weight +
                        loadData.groupedItineraryResponse
                          .baggageAllowanceDescs[0].unit
                      : searchData?.flightData?.system === "Galileo"
                      ? loadData?.airAirPriceResult?.airAirPricingSolution[0]
                          ?.airAirPricingInfo[0]?.airBaggageAllowances
                          .airBaggageAllowanceInfo?.airTextInfo?.airText[0] ||
                        "30kg"
                      : loadData?.Results[0]?.segments[0]?.Baggage}
                  </Typography>
                </Grid>
              </Box>
            )}
          </> */
  {
    /* <form onSubmit={submitCoupon}>
        <Grid container spacing={1} p={2} style={{ height: "30px" }}>
          <Grid item lg={8} md={8} sm={12}>
            <input
              type="text"
              placeholder="Apply Coupon"
              onChange={(e) => {
                setCoupon(e.target.value);
              }}
              style={{
                height: "100%",
                width: "100%",
                paddingLeft: "5px",
                borderRadius: "5px",
                outline: "none",
                border: "1px solid #002566",
              }}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={12}>
            <Button
              type="submit"
              style={{
                color: "var(--primary-color)",
                background: "#fff",
                height: "100%",
                width: "100%",
                border: "1px solid #d3143c",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              Apply
            </Button>
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <Typography>{couponAppliedMessage.message}</Typography>
          </Grid>
        </Grid>
      </form> */
  }
  //Todo: END
  // Todo: Start ReturnFlightInfo Section
  {
    /* <>
          {adultCount >= 1 && childCount >= 1 && infant >= 1 ? (
            <Box>
              <Grid container justifyContent="space-between">
                <Typography
                  sx={{
                    color: "var(--primary-color)",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  Adult
                </Typography>
                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  {searchData?.roundData?.system === "Sabre"
                    ? loadData?.groupedItineraryResponse
                        ?.baggageAllowanceDescs[0]?.pieceCount *
                        10 +
                      "Kg"
                    : searchData.state?.roundData.system === "Galileo"
                    ? searchData?.roundData?.segment === "2"
                      ? loadData?.airAirPriceResult?.airAirPricingSolution[0]
                          ?.airAirPricingInfo[0]?.airBaggageAllowances
                          ?.airBaggageAllowanceInfo[0]?.airTextInfo.airText[0]
                      : loadData.airAirPriceResult?.airAirPricingSolution
                          ?.airAirPricingInfo[0]?.airBaggageAllowances
                          ?.airBaggageAllowanceInfo[0]?.airTextInfo.airText[0]
                    : loadData?.Results[0]?.segments[0]?.baggageDetails[0] !==
                      "undefined"
                    ? loadData?.Results[0]?.segments[0]?.baggageDetails[0]
                        ?.Checkin
                    : "No Baggage Details"}
                </Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography
                  sx={{
                    color: "var(--primary-color)",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  Child
                </Typography>
                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  {searchData?.roundData?.system === "Sabre"
                    ? loadData?.groupedItineraryResponse
                        ?.baggageAllowanceDescs[0]?.pieceCount *
                        10 +
                      "Kg"
                    : searchData?.roundData?.system === "Galileo"
                    ? searchData?.roundData?.segment === "2"
                      ? loadData?.airAirPriceResult?.airAirPricingSolution[0]
                          ?.airAirPricingInfo[0]?.airBaggageAllowances
                          ?.airBaggageAllowanceInfo[0]?.airTextInfo.airText[0]
                      : loadData.airAirPriceResult?.airAirPricingSolution
                          ?.airAirPricingInfo[1]?.airBaggageAllowances
                          ?.airBaggageAllowanceInfo[0]?.airTextInfo.airText[0]
                    : loadData?.Results[0]?.segments[0]?.baggageDetails[1] !==
                      "undefined"
                    ? loadData?.Results[0]?.segments[0]?.baggageDetails[1]
                        ?.Checkin
                    : "No Baggage Details"}
                </Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography
                  sx={{
                    color: "var(--primary-color)",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  Infant
                </Typography>
                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  {searchData?.roundData?.system === "Sabre"
                    ? "0Kg"
                    : searchData?.roundData?.system === "Galileo"
                    ? searchData?.roundData?.segment === "2"
                      ? loadData?.airAirPriceResult?.airAirPricingSolution[0]
                          ?.airAirPricingInfo[0]?.airBaggageAllowances
                          ?.airBaggageAllowanceInfo[0]?.airTextInfo.airText[0]
                      : loadData.airAirPriceResult?.airAirPricingSolution
                          ?.airAirPricingInfo[2]?.airBaggageAllowances
                          ?.airBaggageAllowanceInfo[0]?.airTextInfo.airText[0]
                    : loadData?.Results[0]?.segments[0]?.baggageDetails[2] !==
                      "undefined"
                    ? loadData?.Results[0]?.segments[0]?.baggageDetails[2]
                        ?.Checkin
                    : "No Baggage Details"}
                </Typography>
              </Grid>
            </Box>
          ) : adultCount >= 1 && childCount >= 1 ? (
            <Box>
              <Grid container justifyContent="space-between">
                <Typography
                  sx={{
                    color: "var(--primary-color)",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  Adult
                </Typography>
                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  {searchData?.roundData?.system === "Sabre"
                    ? loadData?.groupedItineraryResponse
                        ?.baggageAllowanceDescs[0]?.pieceCount *
                        10 +
                      "Kg"
                    : searchData?.roundData?.system === "Galileo"
                    ? searchData?.roundData?.segment === "2"
                      ? loadData?.airAirPriceResult?.airAirPricingSolution[0]
                          ?.airAirPricingInfo[0]?.airBaggageAllowances
                          ?.airBaggageAllowanceInfo[0]?.airTextInfo.airText[0]
                      : loadData.airAirPriceResult?.airAirPricingSolution
                          ?.airAirPricingInfo[0]?.airBaggageAllowances
                          ?.airBaggageAllowanceInfo[0]?.airTextInfo.airText[0]
                    : loadData?.Results[0]?.segments[0]?.baggageDetails[0] !==
                      "undefined"
                    ? loadData?.Results[0]?.segments[0]?.baggageDetails[0]
                        ?.Checkin
                    : "No Baggage Details"}
                </Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography
                  sx={{
                    color: "var(--primary-color)",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  Child
                </Typography>
                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  {searchData?.roundData?.system === "Sabre"
                    ? loadData?.groupedItineraryResponse
                        ?.baggageAllowanceDescs[1]?.pieceCount *
                        10 +
                      "Kg"
                    : searchData?.roundData?.system === "Galileo"
                    ? searchData.state?.roundData?.segment === "2"
                      ? loadData?.airAirPriceResult.airAirPricingSolution[0]
                          ?.airAirPricingInfo[0]?.airBaggageAllowances
                          ?.airBaggageAllowanceInfo[0]?.airTextInfo.airText[0]
                      : loadData?.airAirPriceResult?.airAirPricingSolution
                          ?.airAirPricingInfo[1]?.airBaggageAllowances
                          ?.airBaggageAllowanceInfo[0]?.airTextInfo.airText[0]
                    : loadData?.Results[0]?.segments[0]?.baggageDetails[1] !==
                      "undefined"
                    ? loadData?.Results[0]?.segments[0]?.baggageDetails[1]
                        ?.Checkin
                    : "No Baggage Details"}
                </Typography>
              </Grid>
            </Box>
          ) : (
            <Box>
              <Grid container justifyContent="space-between">
                <Typography
                  sx={{
                    color: "var(--primary-color)",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  Adult
                </Typography>
                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  {searchData?.roundData?.system === "Sabre"
                    ? loadData.groupedItineraryResponse
                        ?.baggageAllowanceDescs[0]?.pieceCount *
                        10 +
                      "Kg"
                    : searchData?.roundData?.system === "Galileo"
                    ? searchData?.roundData?.segment === "2"
                      ? loadData.airAirPriceResult.airAirPricingSolution[0]
                          ?.airAirPricingInfo?.airBaggageAllowances
                          ?.airBaggageAllowanceInfo[0]?.airTextInfo?.airText[0]
                      : loadData.airAirPriceResult?.airAirPricingSolution
                          ?.airAirPricingInfo?.airBaggageAllowances
                          ?.airBaggageAllowanceInfo[0]?.airTextInfo.airText[0]
                    : loadData?.Results[0]?.segments[0]?.baggageDetails[0] !==
                      "undefined"
                    ? loadData?.Results[0]?.segments[0]?.baggageDetails[0]
                        ?.Checkin
                    : "No Baggage Details"}
                </Typography>
              </Grid>
            </Box>
          )}
          </> */
  }
  //Todo: End ReturnFlightInfo Section
  //Todo: Cancellation Policy Section
  {
    /* <li>- U - Economy Flex | BDDXB Fare basis code </li>
              <li>- 6 Available seat(s) </li>
              <li>- HK Status </li>
              <li>- allowed One way </li>
              <li>- not allowed Open ticket </li>
              <li>
                - The duration of the stay must be included between 0 and 360
                days{" "}
              </li>
              <li>
                - Modifiable with fee Ticket 4655 BDT Before 72 hour(s) of the
                flight departure{" "}
              </li>
              <li>
                - Refundable with fee Ticket 9309 BDT Before 72 hour(s) of the
                flight departure{" "}
              </li>
              <li>- Bag allowance 30 Kg AD</li> */
  }
  //Todo: End of Cancellaton Policy Section
  //Todo: send form data and json() section
  // const obj = {
  //   hello: "world",
  // };
  // const json = JSON.stringify(obj);
  // const blob = new Blob([json], {
  //   type: "application/json",
  // });
  // const data = new FormData();
  // data.append("document", blob);
  // axios({
  //   method: "post",
  //   url: "/sample",
  //   data: data,
  // });
  //Todo: End of form data and json() section
}
