import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/admin_assets/assets.js'

const Navbar = ({ setToken }) => {
  const logout = () => {
    setToken('');
    localStorage.removeItem('adminToken');
  }

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="" />
      <div className="navbar-right">
        <img src={assets.profile_image} alt="" className="profile" />
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
    </div>
  )
}

export default Navbar
