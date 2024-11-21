import './App.css';
import "./FilpSwiper.css"
import Index from "./user/Page/Home/Index.jsx"
import About from "./user/Page/About/About.jsx"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './user/Page/SignUp/Login.jsx';
import SignUp from './user/Page/SignUp/SignUp.jsx';
import Start from './user/Page/SignUp/Start.jsx';
import NotFoundPage from './user/compontents/NoFoundPage.jsx';
import AskQuestion from './user/Page/GetStart/AskQuestion.jsx';
import Package from "./user/Page/Package/Package"
import Profile from "./user/Page/Profile/Profile.jsx"
import Cancel from "./user/Page/Payment/Cancel.jsx"
import Success from "./user/Page/Payment/Success.jsx"
import ForgetPassword from './user/Forgetlink/ForgetPassword.jsx';
import PaymentDetails from './user/Page/Payment/PaymentDetails.jsx';
import VerifyAccount from './user/Page/VerifyAccount/VerifyAccount.js';
import PlaceDetails from './user/compontents/PlaceDetails.jsx';
import Counrty from './user/Page/SignUp/Counrty.jsx';
import Services from './user/Page/services/Services.jsx';
import Terms from './user/Page/Terms/Terms.jsx';
import ServicesProviderHome from './user/Page/services/ServicesProviderHome.jsx';
import Organiser from './user/Page/EventOrganiser/Organiser.jsx';
import StripePayment from './user/Page/Payment/StripePayment.js';
import MapComponent from './user/Page/Google/MapComponent.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/event-show" element={<Services />} />
          <Route path="/services-provider" element={<ServicesProviderHome />} />

          <Route path="/event-show/:id" element={<Services />} />
          <Route path="/askquestion" element={<AskQuestion />} />
          <Route path="/package" element={<Package />} />
          <Route path="/payment/:id" element={<StripePayment />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/forgotpassword/:token' element={<ForgetPassword />} />
          <Route path='/verify/:token' element={<VerifyAccount />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/start' element={<Start />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/cancel/:id" element={<Cancel />} />
          <Route path="/success/:id" element={<Success />} />
          <Route path="/location" element={<MapComponent />} />
          <Route path="/place-data" element={<PlaceDetails />} />
          <Route path="/country" element={<Counrty />} />
          <Route path="/payment-book" element={<PaymentDetails />} />
          <Route path="/payment-book/:id" element={<PaymentDetails />} />
          <Route path="/about" element={   <About /> } />
          <Route path="/terms" element={   <Terms /> } />
          <Route path="/event-organiser" element={   <Organiser /> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
