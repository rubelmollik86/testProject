import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import NewFooter from "./../Footer/NewFooter";
import Header from "../Header/Header";

const Refund = () => {
  return (
    <Box className="about-section">
      <Box>
        {/* header */}
        <Header />
        {/* end header */}
        <Box className="about-body-img" mt={"2rem"}>
          <Box className="containers">
            <Box>
              <Typography color="#fff" fontSize={"55px"}>
                Refund Policy
              </Typography>
            </Box>
            <Box className="privacy1">
              <p>
                Most of our airline tickets, hotels, tour packages and service
                fees are non-refundable prior to after booking. All
                cancellations must be done over the email/written format only.
                We can accept refund requests only if the following conditions
                have been met:
              </p>
            </Box>

            <Box className="privacy1">
              <p>
                You have applied for a cancellation and refund with us and if
                the fare rules (Flight & Hotels) provider allow for cancellation
                and refunds unless -
              </p>
            </Box>
            <Box className="privacy1">
              <p>
                If You are not a "no show" (most "no show" bookings are not
                eligible for any waiver from suppliers for refund processing);
                and
              </p>
            </Box>
            <Box className="privacy1">
              <p>
                We are able to secure waivers from suppliers to process this
                requested cancellation and refund. We are unable to provide a
                specific refund processing time frame. All refund requests
                are/will be processed in a sequential workline order. Once you
                have provided our customer service agent or through our portal
                with your cancellation request, we will then send you an email
                notification that your request has been received. This
                notification does not mean the eligibility or processing of a
                refund. This only notify you with an acknowledgement of your
                request and provides you with a tracking/reference number. After
                receiving your request, our support team will work with the
                suppliers such as airlines, hotels to generate a waiver based on
                airline and other supplier rules and will notify you of the
                supplier decision. Our service fees associated with the original
                travel reservation or initial booking time are non- refundable.
                Please note that receiving the requested refunds totally depends
                on the suppliers. We have nothing to do to fasten this process.
                Once the refund has been approved by the supplier it may take
                additional time for this to disburse it on your credit card
                statement/bank wallet. Generally, all suppliers will charge a
                penalty for refund. This entire process may take 60-90 working
                days (except weekends and Govt. Holidays) from receipt of your
                request to receiving credit on your statement. Apart from the
                airlines and other suppliers refund penalties, Fly Far
                International will charge a post-ticketing services fee, as
                applicable. All refund fees are charged on a per ticket per
                person basis or single transaction basis. These fees will only
                be assessed if a refund has been authorized by the supplier or a
                waiver has been received and when the airline/supplier rules
                permit such refunds. If such a refund is not processed by the
                supplier, we will refund you our post-ticketing service fees
                applicable to your agent assisted refund request, but not our
                booking fees for the original travel reservation or booking. In
                addition, online gateway/transaction charges are not refundable
                in case of refund disbursement. Also, for any unpleasant or
                unusual situation (like: supplier bankruptcy, operational shut
                down) where getting a refund becomes uncertain or there might
                arise a full possibility of not getting the refund. In that
                scenario Fly Far International will not be liable or will not
                carry any refund disbursement responsibility and you can’t sue
                against Fly Far International for that.
              </p>
            </Box>
            <Box className="privacy1">
              <p>
                As per our Compassion Exception Policy (CEP), we offer Special
                Discounts for U.S. Military, Natural Disasters, Bereavement,
                Customers with Visual Impairments, Senior Citizens and Youth.
              </p>
            </Box>
            <Box className="privacy1">
              <p>
                Cancellation Process - For your security, bookings may only be
                canceled over the registered email, and not by phone call or web
                chat. When requesting Fly Far International to cancel a booking
                on your behalf, our agents will send you an email on your
                registered email in which you booked the ticket from us. If you
                cannot access your email, we may not be able to honor your
                request for cancellation.
              </p>
            </Box>
          </Box>
          <NewFooter />
        </Box>
      </Box>
    </Box>
  );
};

export default Refund;
