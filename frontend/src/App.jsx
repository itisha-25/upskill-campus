import React,{ useState } from 'react'
import Navbar from './componates/navbar/navbar.jsx'
import { Route, Routes } from 'react-router-dom'  
import Home from './pages/home/home.jsx'
import Cart from './pages/cart/cart.jsx'
import Placeorder from './pages/placeorder/placeorder.jsx'
import Footer from './componates/Footer/Footer.jsx' 
import LoginPopup from './componates/LoginPopup/LoginPopup.jsx'

const App = () => {

  const [showLogin,setShowLogin] = useState(false);
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
     <div className="App">
      
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<Placeorder/>}/>   
        
        
        
        
        </Routes> 
    </div>
    <Footer/>
    
    
    
    </>

  )
}

export default App
