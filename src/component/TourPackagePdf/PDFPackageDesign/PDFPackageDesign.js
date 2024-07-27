import React, { useEffect, useState } from "react";
import {
  Document,
  Image,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import place1 from "../../../Assets/Ladies/place/place1.jpg";
import circle from "../../../Assets/Ladies/circle.png";
import { format } from "date-fns";
import commaNumber from "comma-number";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useQuery } from "react-query";
import logo from "../../../Assets/Ladies/logo.png";
import check from "../../../Assets/Ladies/check1.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import flight from "../../../Assets/Ladies/flight.png";
import hotel from "../../../Assets/Ladies/hotel.png";
import food from "../../../Assets/Ladies/food.png";
import transport from "../../../Assets/Ladies/transport.png";
import PackageFakeData from "./PackageFakeData";
import data from "./../../Dashboard/Account/GeneralLedger/data";

const PDFPackageDesign = () => {
  const data = PackageFakeData[0];
  // const data = PackageFakeData[0];

  const packageDiscount = parseInt(data?.Discount);
  const packageprice = parseInt(data?.Price);

  const discountPackagePrice =
    packageprice - (packageDiscount / 100) * packageprice;

  const styles = StyleSheet.create({
    page: {
      //   flexDirection: "row",
      backgroundColor: "#fff",
      padding: "30px 45px",
    },

    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 5,
    },
    item: {
      width: "33%",
      textAlign: "center",
      paddingRight: 5,
      paddingBottom: 5,
      boxSizing: "border-box",
    },
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* 1st page */}
        <View>
          <View>
            <Image style={{ width: "80px" }} src={logo} alt="logo" />
          </View>
          <View>
            <Text
              style={{
                fontSize: "14px",
                fontWeight: 400,
                color: "#702c8b",
                margin: "50px 0px",
              }}
            >
              Full Itinerary & Trip Details
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: "50px",
                fontWeight: 600,
                color: "#252733",
                textTransform: "capitalize",
              }}
              break
            >
              {data?.MainTitle}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: "10px",
                fontWeight: 500,
                color: "#D38DAD",
                marginTop: "10px",
                textAlign: "left",
              }}
            >
              {data?.SubTitle}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#BC6277",
                marginTop: "100px",
                marginBottom: "5px",
              }}
            >
              Highlights
            </Text>
          </View>

          {data?.__highlights__.map((data, index) => (
            <View
              style={{
                flexDirection: "row",
                marginTop: "5px",
              }}
            >
              <Image
                style={{ width: "10px", height: "10px", marginTop: "10px" }}
                src={check}
                alt="check-Image"
              />
              <Text
                style={{
                  fontSize: "11px",
                  fontWeight: 400,
                  color: "#837FB1",
                  marginTop: "10px",
                  marginLeft: "5px",
                }}
              >
                {data?.description}
              </Text>
            </View>
          ))}
        </View>
        {/* 2nd page breakdown  */}
        <View break>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image style={{ width: "80px" }} src={logo} alt="logo" />
            <Text
              style={{
                fontSize: "10px",
                fontWeight: 500,
                color: "#D38DAD",
                marginTop: "10px",
                textAlign: "left",
              }}
            >
              {data?.SubTitle}
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: "#BC6277",
                fontSize: "16px",
                marginTop: "40px",
                fontWeight: "500",
              }}
            >
              Trip Overview
            </Text>

            <Text
              style={{
                color: "#34343E",
                fontSize: "11px",
                marginTop: "10px",
                textAlign: "justify",
                fontWeight: 200,
                lineHeight: "1.5px",
              }}
            >
              {data?.PackageOverview}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <View
              style={{
                width: "345px",
                height: "50px",
                backgroundColor: "#FFEFF1",
                borderRadius: "5px",
                display: "flex",
                alignItems: "start",
                justifyContent: "center",
                paddingleft: "10px",
              }}
            >
              <Text
                style={{
                  color: "#702C8B",
                  fontSize: "10px",
                  paddingLeft: "10px",
                }}
              >
                Start & End Date{" "}
              </Text>
              <Text
                style={{
                  color: "#BC6277",
                  fontSize: "11px",
                  marginTop: "3px",
                  paddingLeft: "10px",
                }}
              >
                {format(new Date(data?.StartDate), "dd MMM yyyy")} -{" "}
                {format(new Date(data?.EndDate), "dd MMM yyyy")}
              </Text>
            </View>
            <View
              style={{
                width: "150px",
                height: "50px",
                backgroundColor: "#FFEFF1",
                borderRadius: "5px",
                display: "flex",
                alignItems: "left",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#702C8B",
                  fontSize: "10px",
                  paddingLeft: "10px",
                }}
              >
                DURATION
              </Text>
              <Text
                style={{
                  color: "#BC6277",
                  fontSize: "11px",
                  marginTop: "3px",
                  display: "flex",
                  alignItems: "left",
                  justifyContent: "center",
                  paddingLeft: "10px",
                }}
              >
                {data?.TotalDuration}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "150px",
              height: "50px",
              backgroundColor: "#FFEFF1",
              borderRadius: "5px",
              padding: "5px 10px",
              marginTop: "10px",
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#702C8B", fontSize: "10px" }}>
              PRICE STARTING FROM
            </Text>

            <Text
              style={{ color: "#BC6277", fontSize: "11px", marginTop: "3px" }}
            >
              {commaNumber(discountPackagePrice.toFixed()) || "0"} BDT
            </Text>
          </View>

          <View>
            <Text
              style={{
                color: "#BC6277",
                fontSize: "16px",
                marginTop: "40px",
                fontWeight: "500",
                marginBottom: "20px",
              }}
            >
              Includes
            </Text>

            <View
              style={{
                display: "flex",
                alignItems: "start",
                justifyContent: "space-between",
              }}
            >
              <View
              >
                {data?.Flight && (
                  <>
                    <Image style={{ width: "25px" }} src={food} alt="food" />
                    {/* <Text
                      style={{
                        fontSize: "8px",
                        color: "#ED6C7D",
                        marginTop: "5px",
                      }}
                    >
                      Flight
                    </Text> */}
                  </>
                )}
              </View>
              <View>
                {data?.Hotel && (
                  <>
                    <Image style={{ width: "25px" }} src={hotel} alt="food" />
                    {/* <Text
                      style={{
                        fontSize: "8px",
                        color: "#ED6C7D",
                        marginTop: "5px",
                      }}
                    >
                      Hotel
                    </Text> */}
                  </>
                )}
              </View>
              <View>
                {data?.Food && (
                  <>
                    <Image style={{ width: "25px" }} src={food} alt="food" />
                    {/* <Text
                      style={{
                        fontSize: "8px",
                        color: "#ED6C7D",
                        marginTop: "5px",
                      }}
                    >
                      Food
                    </Text> */}
                  </>
                )}
              </View>
              <View>
                {data?.Transport && (
                  <>
                    <Image
                      style={{ width: "25px" }}
                      src={transport}
                      alt="food"
                    />
                    {/* <Text
                      style={{
                        fontSize: "8px",
                        color: "#ED6C7D",
                        marginTop: "5px",
                      }}
                    >
                      Transport
                    </Text> */}
                  </>
                )}
              </View>
            </View>
          </View>

          <View>
            <Text
              style={{
                color: "#BC6277",
                fontSize: "16px",
                marginTop: "40px",
                fontWeight: "500",
                marginBottom: "10px",
              }}
            >
              Place You Will See
            </Text>
          </View>
          <View style={styles.container}>
            <View style={{ marginBottom: "10px" }}>
              <Text
                style={{
                  color: "#34343E",
                  fontSize: "11px",
                  marginTop: "5px",
                  textAlign: "justify",
                  fontWeight: 200,
                  lineHeight: "1.5px",
                }}
              >
                {data?.Location}
              </Text>
            </View>
          </View>
        </View>

        {/* 3rd page breakdown */}
        <View break>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image style={{ width: "80px" }} src={logo} alt="logo" />
            <Text
              style={{
                color: "#252733",
                fontSize: "10px",

                fontWeight: 500,
                color: "#D38DAD",
                marginTop: "10px",
                textAlign: "left",
              }}
            >
              {data?.SubTitle}
            </Text>
          </View>

          <View>
            <Text
              style={{
                color: "#BC6277",
                fontSize: "16px",
                marginTop: "40px",
                fontWeight: "500",
                marginBottom: "10px",
              }}
            >
              Itinerary
            </Text>
          </View>
          {data?.__tourpackageplans__?.map((data, index) => (
            <View style={{ marginBottom: "10px" }}>
              <Text
                style={{
                  color: "#702C8B",
                  fontSize: "11px",
                }}
              >
                Day {index + 1} Italy
              </Text>
              <Text
                style={{
                  color: "#34343E",
                  fontSize: "11px",
                  marginTop: "5px",
                  textAlign: "justify",
                  fontWeight: 200,
                  lineHeight: "1.5px",
                }}
              >
                {data?.dayplan}
              </Text>
            </View>
          ))}
        </View>

        {/* 3rd page breakdown in inclusion */}

        <View break>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image style={{ width: "80px" }} src={logo} alt="logo" />
            <Text
              style={{
                color: "#252733",
                fontSize: "10px",
                fontWeight: 500,
                color: "#D38DAD",
                marginTop: "10px",
                textAlign: "left",
              }}
            >
              {data?.SubTitle}
            </Text>
          </View>

          <View>
            <Text
              style={{
                color: "#BC6277",
                fontSize: "16px",
                marginTop: "40px",
                fontWeight: "500",
                marginBottom: "10px",
              }}
            >
              Inclusion
            </Text>

            {data?.__PackageInclusions__?.map((data, index) => (
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: "5px",
                }}
              >
                <Image
                  style={{
                    width: "10px",
                    height: "10px",
                    marginTop: "1px",
                    marginRight: "5px",
                  }}
                  src={check}
                  alt="check-Image"
                />
                <Text
                  style={{
                    color: "#282E2C",
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  {data?.Inclusions}
                </Text>
              </View>
            ))}
          </View>
          <View>
            <Text
              style={{
                color: "#BC6277",
                fontSize: "16px",
                marginTop: "40px",
                fontWeight: "500",
                marginBottom: "10px",
              }}
            >
              Booking Policy
            </Text>

            {data?.__BookingPolicys__?.map((data, index) => (
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: "5px",
                }}
              >
                <Image
                  style={{
                    width: "10px",
                    height: "10px",
                    marginTop: "1px",
                    marginRight: "5px",
                  }}
                  src={check}
                  alt="check-Image"
                />
                <Text
                  style={{
                    color: "#282E2C",
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  {data?.description}
                </Text>
              </View>
            ))}
          </View>
          <View>
            <Text
              style={{
                color: "#BC6277",
                fontSize: "16px",
                marginTop: "40px",
                fontWeight: "500",
                marginBottom: "10px",
              }}
            >
              Refund Policy
            </Text>

            {data?.__refundpolicys__?.map((data, index) => (
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: "5px",
                }}
              >
                <Image
                  style={{
                    width: "10px",
                    height: "10px",
                    marginTop: "1px",
                    marginRight: "5px",
                  }}
                  src={check}
                  alt="check-Image"
                />
                <Text
                  style={{
                    color: "#282E2C",
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  {data?.RefundPolicy}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFPackageDesign;
