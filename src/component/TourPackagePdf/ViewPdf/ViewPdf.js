import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PDFPackageDesign from "../PDFPackageDesign/PDFPackageDesign";
import PDFBookingPageDesign from "../PDFPackageDesign/PDFBookingPageDesign";

const ViewPdf = () => {
  return (
    <PDFViewer>
      <PDFPackageDesign />
      {/* <PDFBookingPageDesign /> */}
    </PDFViewer>
  );
};

export default ViewPdf;
