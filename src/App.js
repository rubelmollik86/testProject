import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Unconfirmed from "./component/Dashboard/Queues/Unconfirmed/Unconfirmed";
import VoidManagement from "./component/Dashboard/Queues/VoidManagement.js/VoidManagement";
import ReissueManagement from "./component/Dashboard/Queues/ReissueManagement/ReissueManagement";
import Travelers from "./component/Dashboard/Manage/Travelers/Travelers";
import FlightMarkup from "./component/Dashboard/Manage/FlightMarkup/FlightMarkup";
import FlyTicketVendor from "./component/Dashboard/Manage/FlyTicketVendor/FlyTicketVendor";
import GeneralLedger from "./component/Dashboard/Account/GeneralLedger/GeneralLedger";
import PartialPayment from "./component/Dashboard/Account/PartialPayment/PartialPayment";
import MyAccount from "./component/Dashboard/Account/MyAccount/MyAccount";
import GeneralLedgerReport from "./component/Dashboard/Report/GeneralLedgerReport/GeneralLedgerReport";
import CommissionReport from "./component/Dashboard/Report/CommissionReport/CommissionReport";

import Searching from "./component/Dashboard/Searching/Searching";
import FlySlider from "./component/Dashboard/FlightSearch/FlySlider/FlySlider";
import Queues from "./component/Dashboard/Queues/Queues/Queues";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";
import About from "./component/About/About";
import BookInfo from "./component/Dashboard/BookInfo/BookInfo";
import RoundTripAllLoad from "./component/Dashboard/FlightSearch/RoundTrip/RoundTripAllLoad";
import FlightUserInfo from "./component/Dashboard/FlightInformation/FlightUserInfo/FlightUserInfo";
import FlightUserInfoFlyHub from "./component/Dashboard/FlightInformation/FlightUserInfo/FlightUserInfoFlyHub";
import FlightUserInfoSabre from "./component/Dashboard/FlightInformation/FlightUserInfo/FlightUserInfoSabre";
import ReturnFlightUserInfo from "./component/Dashboard/FlightInformation/FlightUserInfo/ReturnFlightUserInfo";
import ReturnFlightUserInfoSabre from "./component/Dashboard/FlightInformation/FlightUserInfo/ReturnFlightUserInfoSabre";
import ReturnFlightUserInfoFlyHub from "./component/Dashboard/FlightInformation/FlightUserInfo/ReturnFlightUserInfoFlyHub";
import Sidebar from "./component/Dashboard/Sidebar/Sidebar";
import RoundTripFlightInfo from "./component/Dashboard/FlightSearch/RoundTrip/RoundTripFlightInfo";
import PdfGenerate from "./component/Dashboard/Report/GeneralLedgerReport/PdfGenerate";
import TravelersDetails from "./component/Dashboard/Manage/Travelers/TravelersDetails";
import BookingPdf from "./component/Dashboard/Congratulation/BookingPdf";
import SearchCountry from "./component/Visa/SearchCountry/SearchCountry";
import CountryDetails from "./component/Visa/CountryDetails/CountryDetails";
import PdfVisa from "./component/Visa/CountryDetails/PdfVisa";
import DepositEntry from "./component/Dashboard/Account/DepositeRequest/DepositEntry";
import NotFound from "./component/NotFound/NotFound";
import ModifiedSearchBar from "./component/Shared/ModifiedSearchBar/ModifiedSearchBar";
import Home from "./component/Home/Home";
import QueuesDetail from "./component/Dashboard/Queues/Queues/QueuesDetail/QueuesDetail";
import FlightInfoDetails from "./component/Dashboard/FlightInformation/FlightUserInfo/FlightInfoDetails";
import ResetPassword from "./component/ResetPassword/ResetPassword";
import ForgetPassword from "./component/ResetPassword/ForgetPassword";
import GroupFetcheData from "./component/GroupFare/GroupFetcheData";
import TourPackages from "./component/TourPackages/TourPackages";
import TourDetails from "./component/TourPackages/TourDetails";
import GroupFlightUserInfo from "./component/GroupFare/GroupFlightInformation/GroupFlightUserInfo";
import MyStaffs from "./component/Dashboard/Account/MyAccount/MyStaffs";
import BankAccount from "./component/Dashboard/Account/DepositeRequest/BankAccount";
import AddBankAccount from "./component/Dashboard/Account/DepositeRequest/AddBankAccount";
import DepositRequest from "./component/Dashboard/Account/DepositeRequest/DepositRequest";
import Others from "./component/Dashboard/Queues/Queues/Others";
import OnewayDataLoad from "./component/Dashboard/FlightSearch/OnewayDataLoad";
import DashboardSearchBox from "./component/Dashboard/DashboardSearchBox.js/DashboardSearchBox";
import SearchHistory from "./component/Dashboard/SearchHistory/SearchHistory";
import Service from "./component/Service/Service";
import Blog from "./component/Blog/Blog";
import NewFooter from "./component/Footer/NewFooter";
import image1 from "../src/Assets/Ladies/bodyimage/projapoti1.png";
import image2 from "../src/Assets/Ladies/bodyimage/projapoti2.png";
import image3 from "../src/Assets/Ladies/bodyimage/projapoti3.png";
import image4 from "../src/Assets/Ladies/bodyimage/projapoti4.png";
import image5 from "../src/Assets/Ladies/bodyimage/projapoti5.png";
import image7 from "../src/Assets/Ladies/bodyimage/leaf.png";
import image8 from "../src/Assets/Ladies/bodyimage/leaf1.png";
import { Box } from "@mui/material";
import FlightInformationOneway from "./component/Dashboard/FlightBookingOneway/FlightInformationOneway/FlightInformationOneway";
import FlightInformationReturn from "./component/FlightBookingReturn/FlightInformationReturn/FlightInformationReturn";
import TourPackageDataLoad from "./component/TourPackageShow/TourPackageDataLoad";
import TourPackageDetails from "./component/TourPackageShow/TourPackageDetails";
import Test from "./Test";
import PackageInformation from "./component/PackageInformation/PackageInformation";
import { QueryClientProvider, QueryClient } from "react-query";
import SignUp from "./component/SignUp/SignUp";
import SignIn from "./component/SignIn/SignIn";
import ProfileDashboard from "./component/Dashboard/Profile/ProfileDashboard";
import MyWallet from "./component/Dashboard/MyWallet/MyWallet";
import MyProfile from "./component/Dashboard/Profile/MyProfile";
import TravelerList from "./component/Dashboard/TravelerList/TravelerList";
import AddTraveler from "./component/Dashboard/TravelerList/AddTraveler";
import MyBookings from "./component/Dashboard/MyBookings/MyBookings";
import MyBlogs from "./component/Dashboard/MyBlogs/MyBlogs";
import MyWishList from "./component/Dashboard/MyWishList/MyWishList";
import Transaction from "./component/Dashboard/Transaction/Transaction";
import SliderTest from "./SliderTest";
import TourSegmentMain from "./component/Dummy/Tour/TourSegmentMain";
import HotelDetails from "./component/Dummy/Hotel/HotelDetails/HotelDetails";
import DummyHome from "./component/Dummy/DummyHome/DummyHome";
import AlbumImgView from "./component/TourPackageShow/AlbumImgView";
import TourBookingConfirm from "./component/Dashboard/MyBookings/TourBookingConfirm";
import TermsAndCondition from "./component/CompanyCondition/TermsAndCondition";
import Privacy from "./component/CompanyCondition/Privacy";
import BookingPolicy from "./component/CompanyCondition/BookingPolicy";
import NewsPage from "./component/Home/NewsPage/NewsPage";
import BlogPage from "./component/Home/BlogPage/BlogPage";
import NewsDetails from "./component/Home/NewsPage/NewsDetails";
import BlogDetails from "./component/Home/BlogPage/BlogDetails";
import Congratulation from "./component/Dashboard/Congratulation/Congratulation";
import ViewPdf from "./component/TourPackagePdf/ViewPdf/ViewPdf";
import ScrollTop from "./component/ScrollTop/ScrollTop";
import LedgerReport from "./component/Dashboard/LedgerReport/LedgerReport";

function App() {
  const client = new QueryClient();

  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <Box>
      <QueryClientProvider client={client}>
        <Box className="image-body">
          {/* <Box className="image-3" display={{ md: "flex", xs: "none" }}>
            <img style={{ width: "200px" }} src={image3} alt="projapoti" />
          </Box>

          <Box className="image-4" display={{ md: "flex", xs: "none" }}>
            <img style={{ width: "200px" }} src={image4} alt="projapoti" />
          </Box>

          <Box className="image-5" display={{ md: "flex", xs: "none" }}>
            <img src={image5} alt="projapoti" />
          </Box>
          <Box className="image-7" display={{ md: "flex", xs: "none" }}>
            <img src={image7} alt="projapoti" />
          </Box>
          <Box className="image-7-1" display={{ md: "flex", xs: "none" }}>
            <img src={image7} alt="projapoti" />
          </Box>
          <Box className="image-7-2" display={{ md: "flex", xs: "none" }}>
            <img src={image7} alt="projapoti" />
          </Box>
          <Box className="image-7-3" display={{ md: "flex", xs: "none" }}>
            <img src={image7} alt="projapoti" />
          </Box>
          <Box className="image-7-4" display={{ md: "flex", xs: "none" }}>
            <img src={image7} alt="projapoti" />
          </Box>

          <Box className="image-8" display={{ md: "flex", xs: "none" }}>
            <img style={{ width: "300px" }} src={image8} alt="projapoti" />
          </Box> */}

          <ScrollTop />
          <Routes location={background || location}>
            <Route path="/" element={<Home />}></Route>
            {/*  dummy */}
            <Route path="/dummyhome" element={<DummyHome />}></Route>
            <Route path="/view" element={<ViewPdf />}></Route>
            <Route path="/test" element={<Test />}></Route>
            <Route path="/toursegment" element={<TourSegmentMain />}></Route>
            <Route path="/hoteldetails" element={<HotelDetails />}></Route>

            <Route path="/slidertest" element={<SliderTest />}></Route>

            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>

            <Route path="/footer" element={<NewFooter />}></Route>

            <Route path="/service" element={<Service />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/newspage" element={<NewsPage />} />
            <Route path="/newsdetails" element={<NewsDetails />} />
            <Route path="/blogdetails" element={<BlogDetails />} />
            <Route path="/blogpage" element={<BlogPage />} />
            {/* <Route path="/paymentmethod" element={<PaymentMethod />} /> */}
            <Route path="/termsandcondition" element={<TermsAndCondition />} />
            <Route path="/privacypolicy" element={<Privacy />} />
            <Route path="/bookingpolicy" element={<BookingPolicy />} />

            <Route
              path="/dashboard/onewayresults"
              element={<OnewayDataLoad />}
            />
            <Route path="/congratulation" element={<Congratulation />} />
            <Route path="/dashboard/roundtrip" element={<RoundTripAllLoad />} />
            <Route
              path="/dashboard/tourpackageshow"
              element={<TourPackageDataLoad />}
            />
            <Route
              path="/dashboard/tourpackagedetails"
              element={<TourPackageDetails />}
            />
            <Route path="/dashboard/albumimgview" element={<AlbumImgView />} />
            <Route
              path="/dashboard/flightInformationoneway"
              element={<FlightInformationOneway />}
            />
            <Route
              path="/dashboard/flightInformationreturn"
              element={<FlightInformationReturn />}
            />
            <Route
              path="/dashboard/packageinformation"
              element={<PackageInformation />}
            />

            <Route
              path="/dashboard/profile"
              element={
                <PrivateRoute>
                  <ProfileDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/myprofile"
              element={
                <PrivateRoute>
                  <MyProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/myWallet"
              element={
                <PrivateRoute>
                  <MyWallet />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/wishList"
              element={
                <PrivateRoute>
                  <MyWishList />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/myTravellerList"
              element={<TravelerList />}
            />
            <Route
              path="/dashboard/addTraveler"
              element={
                <PrivateRoute>
                  <AddTraveler />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/mybookings"
              element={
                <PrivateRoute>
                  <MyBookings />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/tourbookingconfirm"
              element={
                <PrivateRoute>
                  <TourBookingConfirm />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/myblogs"
              element={
                <PrivateRoute>
                  <MyBlogs />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/transaction"
              element={
                <PrivateRoute>
                  <Transaction />
                </PrivateRoute>
              }
            />

            <Route
              path="/dashboard/ledgerreport"
              element={
                <PrivateRoute>
                  <LedgerReport />
                </PrivateRoute>
              }
            />

            <Route
              path="/searchVisa"
              element={
                <PrivateRoute>
                  <SearchCountry />
                </PrivateRoute>
              }
            />

            {/* All Pdf Route end*/}
            <Route path="/visapdf" element={<PdfVisa />} />
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/resetpassword/:auth" element={<ResetPassword />} />
            <Route path="/resetpassword" element={<ForgetPassword />} />

            {/* No need below route */}
            <Route
              path="/dashboard"
              element={
                {
                  /* <UserDashBoardSideBar /> */
                }
              }
            >
              <Route
                path="/dashboard/dashboardsearchbox"
                element={<DashboardSearchBox />}
              ></Route>
              <Route path="/dashboard/searchVisa" element={<SearchCountry />} />
              <Route
                path="/dashboard/searchVisa/:countryName/:visaName"
                element={<CountryDetails />}
              />
              <Route
                path="/dashboard/tourpackages/:id"
                element={<TourDetails />}
              />
              <Route
                path="/dashboard/searchhistory"
                element={<SearchHistory />}
              ></Route>
              <Route
                path="/dashboard/tourpackages"
                element={<TourPackages />}
              />
              <Route
                path="/dashboard/groupfare"
                element={<GroupFetcheData />}
              ></Route>
              <Route
                path="/dashboard/groupfinfo"
                element={<GroupFlightUserInfo />}
              ></Route>
              <Route
                path="/dashboard/searching"
                element={<Searching />}
              ></Route>
              <Route
                path="/dashboard/congratulation"
                element={<Congratulation />}
              ></Route>
              <Route
                path="/dashboard/flightsearch/flyslider"
                element={<FlySlider />}
              ></Route>
              {/* RoundTrip flight search */}
              {/* Quotes menu */}
              <Route
                path="/dashboard/queues/queues"
                element={<Queues />}
              ></Route>
              <Route
                path="/dashboard/queues/others"
                element={<Others />}
              ></Route>
              <Route
                path="/dashboard/queues/queuesdetails"
                element={<QueuesDetail />}
              ></Route>

              <Route
                path="/dashboard/queues/unconfirmed"
                element={<Unconfirmed />}
              ></Route>

              <Route
                path="/dashboard/queues/VoidManagement"
                element={<VoidManagement />}
              ></Route>
              <Route
                path="/dashboard/queues/ReissueManagement"
                element={<ReissueManagement />}
              ></Route>
              {/* manage sub-menu */}
              <Route
                path="/dashboard/manage/travelers"
                element={<Travelers />}
              ></Route>
              <Route
                path="/dashboard/manage/travelersDetails"
                element={<TravelersDetails />}
              ></Route>
              <Route
                path="/dashboard/manage/flightmarkup"
                element={<FlightMarkup />}
              ></Route>
              <Route
                path="/dashboard/manage/FlyTicketVendor"
                element={<FlyTicketVendor />}
              ></Route>

              {/* <Route path="/dashboard/dashboard" element={<Dashboard />}></Route> */}
              {/* <Route
            path="/dashboard/account/DepositeRequest"
            element={<DepositeRequest />}
          ></Route> */}
              <Route
                path="/dashboard/account/DepositEntry"
                element={<DepositEntry />}
              />
              <Route
                path="/dashboard/account/bankaccount"
                element={<BankAccount />}
              />
              <Route
                path="/dashboard/account/addbankaccount"
                element={<AddBankAccount />}
              />
              <Route
                path="/dashboard/account/GeneralLedger"
                element={<GeneralLedger />}
              />
              <Route
                path="/dashboard/account/deposite"
                element={<DepositRequest />}
              />
              <Route
                path="/dashboard/account/PartialPayment"
                element={<PartialPayment />}
              />

              <Route
                path="/dashboard/account/MyAccount"
                element={<MyAccount />}
              />
              <Route
                path="/dashboard/account/mystaffs"
                element={<MyStaffs />}
              />
              {/* <Route
            path="/dashboard/account/Notification"
            element={<Notification />}
          /> */}
              <Route
                path="/dashboard/account/GeneralLedgerReport"
                element={<GeneralLedgerReport />}
              />
              <Route
                path="/dashboard/account/CommissionReport"
                element={<CommissionReport />}
              />
              <Route path="/dashboard/booking" element={<BookInfo />}></Route>

              {/* New FlightInformation  end hear */}
              {/* <Route
            path="/dashboard/flightinformation"
            element={<FlightInformation />}
          /> */}
              <Route
                path="/dashboard/flightinfodetails"
                element={<FlightInfoDetails />}
              />
              <Route
                path="/dashboard/flightUserInfo"
                element={<FlightUserInfo />}
              />
              <Route
                path="/dashboard/flightUserInfoFlyHub"
                element={<FlightUserInfoFlyHub />}
              />
              <Route
                path="/dashboard/flightUserInfoSabre"
                element={<FlightUserInfoSabre />}
              />
              <Route
                path="/dashboard/roundTripFlightInfo"
                element={<RoundTripFlightInfo />}
              />
              <Route
                path="/dashboard/returnflightuserinfo"
                element={<ReturnFlightUserInfo />}
              />
              <Route
                path="/dashboard/returnflightuserinfosabre"
                element={<ReturnFlightUserInfoSabre />}
              />
              <Route
                path="/dashboard/returnflightuserinfoflyhub"
                element={<ReturnFlightUserInfoFlyHub />}
              />
              <Route path="/dashboard/pdf" element={<PdfGenerate />} />
              <Route path="/dashboard/bookingPdf" element={<BookingPdf />} />
              <Route
                path="/dashboard/modify"
                element={<ModifiedSearchBar />}
              ></Route>
            </Route>
            
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Box>
      </QueryClientProvider>
    </Box>
  );
}

export default App;
