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
        
        </Routes>
      </Router>
    </>
  );
}

export default App;
