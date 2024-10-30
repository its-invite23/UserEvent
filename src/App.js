import './App.css';
import Index from "./user/Page/Home/Index.jsx"
import About from "./user/Page/About/About.jsx"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLayout from './user/Layout/AuthLayout.jsx';
import Login from './user/Page/SignUp/Login.jsx';
import SignUp from './user/Page/SignUp/SignUp.jsx';
import Start from './user/Page/SignUp/Start.jsx';
import Places from './MapComponent.jsx';
import NotFoundPage from './user/compontents/NoFoundPage.jsx';
import AskQuestion from './user/Page/GetStart/AskQuestion.jsx';
import PlayerFAQ from './test.js';
import Package from "./user/Page/Package/Package"
import Profile from "./user/Page/Profile/Profile.jsx"
import Cancel from "./user/Page/Payment/Cancel.jsx"
import Success from "./user/Page/Payment/Success.jsx"
import ForgetPassword from './user/Forgetlink/ForgetPassword.jsx';
import Servicesrecap from './user/Page/services/Servicesrecap.jsx';
import PaymentDetails from './user/Page/Payment/PaymentDetails.jsx';
import VerifyAccount from './user/Page/VerifyAccount/VerifyAccount.js';
import PlaceDetails from './user/compontents/PlaceDetails.jsx';

function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/nearby" element={<Places />} />
          <Route path="/event-show" element={<Servicesrecap />} />
          <Route path="/askquestion" element={<AskQuestion />} />
          <Route path="/package" element={<Package />} />
          <Route path="/test" element={<PlayerFAQ />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/forgotpassword/:token' element={<ForgetPassword />} />
          <Route path='/verify/:token' element={<VerifyAccount />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/start' element={<Start />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/success" element={<Success />} />
          {/* <Route path="/location" element={<Location />} /> */}
          <Route path="/place-data" element={<PlaceDetails />} />



          <Route path="/payment-book" element={<PaymentDetails />} />
          <Route path="/about" element={<UserLayout>    <About /> </UserLayout>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
