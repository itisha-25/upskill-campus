import React, { useState, useEffect } from 'react'
import Navbar from './componates/Navbar/Navbar.jsx'
import Sidebar from './componates/Sidebar/Sidebar.jsx'
import { Routes, Route } from 'react-router-dom'
import List from './Pages/List/List.jsx'
import Add from './Pages/Add/Add.jsx'
import Orders from './Pages/Orders/Orders.jsx'
import Login from './components/Login/Login.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('adminToken', token);
    } else {
      localStorage.removeItem('adminToken');
    }
  }, [token]);

  if (!token) {
    return (
      <>
        <Login setToken={setToken} />
        <ToastContainer />
      </>
    );
  }

  return (
    <div>
      <ToastContainer />
      <Navbar setToken={setToken} />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add token={token} />} />
          <Route path="/list" element={<List token={token} />} />
          <Route path="/orders" element={<Orders token={token} />} />
        </Routes>
      </div>
    </div>
  )
}


export default App
