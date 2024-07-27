import React, { useEffect, useState } from "react";
import "./PdfGenerate.css";
import "hammerjs";
import "@progress/kendo-theme-material/dist/all.css";
import { useRef } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import logo from "../../../../image/logo.png";
import pdfFooter from "../../../../image/pdfFooter.png";
import { useLocation } from "react-router-dom";
import { Box, Container } from "@mui/system";
import pdf1 from "../../../../image/pdf1.png";

import { format } from "date-fns";
import secureLocalStorage from "react-secure-storage";
import { useReactToPrint } from "react-to-print";

const footer = {
  backgroundImage: `url(${pdfFooter})`,
  backgroundSize: "cover",
  height: "8vh",
};

// const bg = {
//   backgroundImage: `url(${pdf1})`,
//   backgroundRepeat: "no-repeat",
// };

const PdfGenerate = () => {
  const location = useLocation();
  const componentRef = useRef();
  const ledgerDates = location.state;

  const { startDate, endDate } = location.state;

  const allData = ledgerDates.ledgerDates;

  const pdfExportComponent = useRef(null);
  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  };
  const handleToPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Invoice",
    pageStyle: "@page { size: 200mm 297mm }",
  });

  const [users, setUsers] = useState("");
  const [userData, setUserData] = useState();

  let agentID = users?.user?.agentId;

  useEffect(() => {
    const users = secureLocalStorage.getItem("user-info");
    if (users) {
      setUsers(users);
    }
  }, []);

  useEffect(() => {
    let url = `https://api.flyfarint.com/v.1.0.0/Accounts/MyAccount.php?agentId=${agentID}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUserData(data[0]));
  }, [agentID]);

  return (
    <div id="example">
      <Container>
        <div
          style={{ textAlign: "right", position: "fixed", marginTop: "20px" }}
          className="box-col"
        >
          {/* <Button primary={true} onClick={handleToPrint}>
            Print pdfhgghgh
          </Button> */}
        </div>
        <div style={{ display: "none" }}>
          <div ref={componentRef}>
            <div>
              <div className="inner-page">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <h4>{userData?.company}</h4>
                    <h6>{userData?.companyadd}</h6>
                    <h6>Email: {userData?.email}</h6>
                    <h6>Phone: {userData?.phone}</h6>
                  </div>

                  <div>
                    <img
                      style={{
                        width: "150px",
                        position: "relative",
                        left: "-15px",
                      }}
                      src={userData?.companyImage}
                    />
                  </div>
                </div>

                <div className="pdf-body">
                  <h3 style={{ margin: "20px 0px" }}>
                    Ledger Report From {startDate} To {endDate}
                  </h3>

                  <table
                    style={{
                      width: "100%",
                      cellspacing: "0",
                      cellpadding: "0",
                    }}
                  >
                    <tr>
                      <th width="5%">SL No.</th>
                      <th width="10%">Ledger Type</th>
                      <th width="10%">Reference</th>
                      <th width="15%">Date</th>
                      <th width="50%">Details</th>
                      <th width="5%">Amount</th>
                      <th width="5%">Remaining Balance</th>
                    </tr>

                    {allData.map((ledgerDate) => (
                      <tr>
                        <td>{allData?.id}</td>
                        <td>
                          {" "}
                          {allData?.deposit > "0" ? (
                            <span
                              style={{
                                backgroundColor: "transparent",
                              }}
                            >
                              Deposit
                            </span>
                          ) : (
                            <span
                              style={{
                                backgroundColor: "transparent",
                              }}
                            >
                              Purchase
                            </span>
                          )}
                        </td>
                        <td>{allData?.reference}</td>
                        <td>
                          {allData?.createdAt !== ""
                            ? format(
                                new Date(ledgerDate?.createdAt),
                                "dd MMM yyyy"
                              )
                            : "Date"}
                        </td>

                        <td>{allData?.details} Tk</td>
                        <td>{allData?.purchase} Tk</td>
                        <td>{allData?.lastAmount} Tk</td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PdfGenerate;
