import logo from './logo.svg';
import './App.css';
import Index from "./user/Page/Home/Index.jsx"
import About from "./user/Page/About/About.jsx"
import AdminIndex from "./admin/Dashboard/Index.jsx"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLayout from './user/Layout/UserLayout.jsx';
import AdminLogin from './admin/Login/Login.jsx';
import AdminLayout from './admin/Layout/AdminLayout.jsx';
import Login from './user/Page/SignUp/Login.jsx';
import SignUp from './user/Page/SignUp/SignUp.jsx';
import PaymentList from './admin/PaymentList/PaymentList.jsx';
import UserList from './admin/UserList/userList.jsx';
import BookingList from './admin/Bookingmanagement/BookingList.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* User */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path="/about" element={<UserLayout>    <About /> </UserLayout>} />

          {/* Admin */}
          <Route path="/access-admin" element={<AdminLayout>   <AdminIndex />          </AdminLayout>} />
          <Route path='/access-admin/login' element={<AdminLogin />} />
          <Route path="/access-admin/payment-list" element={<AdminLayout> <PaymentList /> </AdminLayout>} />
          <Route path="/access-admin/user-list" element={<AdminLayout> <UserList />  </AdminLayout>} />
          <Route path="/access-admin/book-list" element={<AdminLayout> <BookingList />  </AdminLayout>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
