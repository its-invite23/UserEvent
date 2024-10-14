import logo from './logo.svg';
import './App.css';
import Index  from "./user/Page/Home/Index.jsx"
import AdminIndex  from "./admin/Dashboard/Index.jsx"

import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path= "/access-admin" element={<AdminIndex/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
