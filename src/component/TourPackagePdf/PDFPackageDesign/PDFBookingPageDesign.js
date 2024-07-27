import React, { useEffect, useState } from "react";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import commaNumber from "comma-number";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { ToWords } from "to-words";
import logo from "../../../Assets/Ladies/logo.png";
import circle from "../../../Assets/Ladies/circle.png";
import check from "../../../Assets/Ladies/check1.png";

const PDFBookingPageDesign = () => {
  const toWords = new ToWords();
  const table = {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  };
  const tableRow = {
    margin: "auto",
    flexDirection: "row",
  };

  const tableCol = {
    width: "25%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "2px",
  };
  //Passenger Details
  const tableColName = {
    width: "35%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "2px",
  };
  const tableColGender = {
    width: "20%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "2px",
  };
  const tableColType = {
    width: "20%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "2px",
  };
  const tableColNumber = {
    width: "25%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "2px",
  };

  const tableColfromto = {
    width: "22%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "2px",
  };
  const tableColtime = {
    width: "11%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "2px",
  };

  const tableColflight = {
    width: "17%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "2px",
  };
  const tableCol2 = {
    width: "100%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontWeight: "bold",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  };

  const tableCell = {
    // margin: "auto",
    margin: "3px",
    fontSize: "8px",
  };
  const tableCellInfo = {
    margin: "1px 3px",
    fontSize: "8px",
  };

  const adress = {
    fontSize: "10px",
    color: "#8b8b8b",
  };

  return (
    <Document>
      <Page size="A4" style={{ padding: "27px 20px" }}>
        <View style={{ padding: "15px" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  fontSize: "10px",
                  width: "180px",
                }}
              >
                <Text
                  style={{
                    fontSize: "16px",
                    fontWeight: "900",
                    paddingBottom: "10px",
                  }}
                >
                  PieCoder
                </Text>
                <Text style={adress}>Uttara</Text>
                <Text style={adress}>Email: pie@gmail.com</Text>
                <Text style={adress}>Phone:01775134681</Text>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Image style={{ height: "50px" }} src={logo} />
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              fontSize: "11px",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "10px",
            }}
          >
            <Text>Reference: F35210</Text>
            <Text>Booking: 10 Jun 2023</Text>
            <Text style={{ color: "green" }}>Refundable </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: "12px",
                color: "#03437B",
                padding: "20px 0 10px 0",
              }}
            >
              PASSENGER DETAILS
            </Text>
            <View style={table}>
              <View style={{ margin: "auto", flexDirection: "row" }}>
                <View style={tableColName}>
                  <Text style={tableCell}>Passenger Name </Text>
                </View>
                <View style={tableColGender}>
                  <Text style={tableCell}>Gender</Text>
                </View>
                <View style={tableColType}>
                  <Text style={tableCell}>Passenger Type</Text>
                </View>
                <View style={tableColNumber}>
                  <Text style={tableCell}>Passport Number</Text>
                </View>
              </View>
              <View>
                <View style={tableRow}>
                  <View style={tableColName}>
                    <Text style={tableCell}>Sabrina Jahan</Text>
                  </View>
                  <View style={tableColGender}>
                    <Text style={tableCell}>Female</Text>
                  </View>
                  <View style={tableColType}>
                    <Text style={tableCell}>Adult</Text>
                  </View>
                  <View style={tableColNumber}>
                    <Text style={tableCell}>A352140</Text>
                  </View>
                </View>
              </View>
              <View>
                <View style={tableRow}>
                  <View style={tableColName}>
                    <Text style={tableCell}>Soniya Akter</Text>
                  </View>
                  <View style={tableColGender}>
                    <Text style={tableCell}>Female</Text>
                  </View>
                  <View style={tableColType}>
                    <Text style={tableCell}>Child</Text>
                  </View>
                  <View style={tableColNumber}>
                    <Text style={tableCell}>B3364241</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: "12px",
                color: "#03437B",
                padding: "20px 0 10px 0",
              }}
            >
              TOUR PACKAGE ITINERARIES
            </Text>
            <View style={table}>
              <View style={{ margin: "auto", flexDirection: "row" }}>
                <View style={tableColName}>
                  <Text style={tableCell}>Passenger Name </Text>
                </View>
                <View style={tableColGender}>
                  <Text style={tableCell}>Gender</Text>
                </View>
                <View style={tableColType}>
                  <Text style={tableCell}>Passenger Type</Text>
                </View>
                <View style={tableColNumber}>
                  <Text style={tableCell}>Passport Number</Text>
                </View>
              </View>
              <View>
                <View style={tableRow}>
                  <View style={tableColName}>
                    <Text style={tableCell}>Sabrina Jahan</Text>
                  </View>
                  <View style={tableColGender}>
                    <Text style={tableCell}>Female</Text>
                  </View>
                  <View style={tableColType}>
                    <Text style={tableCell}>Adult</Text>
                  </View>
                  <View style={tableColNumber}>
                    <Text style={tableCell}>A352140</Text>
                  </View>
                </View>
              </View>
              <View>
                <View style={tableRow}>
                  <View style={tableColName}>
                    <Text style={tableCell}>Soniya Akter</Text>
                  </View>
                  <View style={tableColGender}>
                    <Text style={tableCell}>Female</Text>
                  </View>
                  <View style={tableColType}>
                    <Text style={tableCell}>Child</Text>
                  </View>
                  <View style={tableColNumber}>
                    <Text style={tableCell}>B3364241</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View>
            <View>
              <Text
                style={{
                  fontSize: "12px",
                  color: "#03437B",
                  padding: "20px 0 10px 0",
                }}
              >
                PRICE BREAKDOWN
              </Text>
              <View style={table}>
                <View style={{ margin: "auto", flexDirection: "row" }}>
                  <View style={tableCol}>
                    <Text style={tableCell}>Passenger</Text>
                  </View>
                  <View style={tableCol}>
                    <Text style={tableCell}>Base Fare</Text>
                  </View>
                  <View style={tableCol}>
                    <Text style={tableCell}>Tax</Text>
                  </View>
                  <View style={tableCol}>
                    <Text style={tableCell}>Total Fare</Text>
                  </View>
                </View>

                <View style={tableRow}>
                  <View style={tableCol}>
                    <Text style={tableCell}>Adult X 1</Text>
                  </View>
                  <View style={tableCol}>
                    <Text style={tableCell}>4,090 BDT</Text>
                  </View>
                  <View style={tableCol}>
                    <Text style={tableCell}>725 BDT</Text>
                  </View>
                  <View style={tableCol}>
                    <Text style={tableCell}>4,815 BDT</Text>
                  </View>
                </View>

                <View style={tableRow}>
                  <View style={tableCol2}>
                    <Text
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        margin: "3px",
                      }}
                    >
                      Grand Total: 4,815 BDT
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "70%",
                fontSize: "10px",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "20px 0px",
                border: "1px solid gray",
                padding: "10px",
              }}
            >
              <View>
                <View>
                  <Text style={{ marginBottom: "5px" }}>
                    Base fare total amount
                  </Text>
                  <Text style={{ marginBottom: "5px" }}>Tax</Text>
                  <Text>
                    ---------------------------------------------------------------------------------------
                  </Text>
                  <Text>Customer Total Ticket Fare Amount</Text>
                </View>
              </View>
              <View>
                <Text style={{ marginBottom: "5px" }}>4,090 BDT</Text>
                <Text style={{ marginBottom: "5px" }}>725 BDT</Text>
                <Text>------------------</Text>
                <Text>4,815 BDT</Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: "11px",
                  color: "#03437B",
                  padding: "10px 0px",
                }}
              >
                In Words: Four THousand Eight Hundred Fifteen Taka Only
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFBookingPageDesign;
