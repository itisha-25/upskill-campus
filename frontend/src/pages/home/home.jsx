import React,{ useState } from 'react'
import './home.css'
import Header from '../../componates/header/header.jsx' 
import ExploreMenu from '../../componates/ExploreMenu/ExploreMenu.jsx'
import FoodDisplay from '../../componates/fooddisplay/fooddisplay.jsx'
import AppDownload from '../../componates/AppDownload/AppDownload.jsx'

const home = () => {

  const [category, setCategory] = useState('All')
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/> 
      <AppDownload/>
    </div>
  )
}

export default home
