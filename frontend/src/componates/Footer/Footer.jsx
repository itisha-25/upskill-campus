import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
        <img src={assets.logo} alt="" />
        <p>lorem ipsum is simply dummy text of the printing and typesetting industry. lorem lpsum has been the industry's standard dummy text ever since the 1500s. when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />

        </div>
        </div>
        <div className="footer-content-center">
             <h2>company</h2>
             <ul>
                <li>HOME</li>
                <li>ABOUT US</li>
                <li>DELIVERY</li>
                <li>PRIVACY POLICY</li>
             </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 9876543210</li>
                <li>contact@tomato.com</li>
            </ul>

        </div>
      </div>
  
    <hr />
    <p className='footer-copyright'>© 2024 Tomato.com - All rights reserved.</p>
    </div>
  )
}

export default Footer
