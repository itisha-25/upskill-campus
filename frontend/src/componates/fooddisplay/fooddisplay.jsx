import React, { useContext } from 'react'
import './fooddisplay.css'
import { StoreContext } from '../../context/storecontext.jsx'
import FoodItem from '../FoodItem/FoodItem.jsx'

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)
    
    console.log("🎯 FoodDisplay rendered with category:", category);
    console.log("📋 Food list in FoodDisplay:", food_list);
    console.log("📊 Food list length:", food_list ? food_list.length : 0);

    if (!food_list) {
        console.log("⏳ Food list is null/undefined");
        return (
            <div className='food-display' id='food-display'>
                <h2>Top Dishes near you</h2>
                <div className="food-display-list">
                    <p>Loading food items...</p>
                </div>
            </div>
        );
    }

    if (food_list.length === 0) {
        console.log("📭 Food list is empty");
        return (
            <div className='food-display' id='food-display'>
                <h2>Top Dishes near you</h2>
                <div className="food-display-list">
                    <p>No food items available</p>
                </div>
            </div>
        );
    }

    const filteredItems = food_list.filter(item => category === "All" || category === item.category);
    console.log(`🔍 Filtered items for category "${category}":`, filteredItems.length);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes near you</h2>
      <div className="food-display-list">
         {filteredItems.map((item,index)=>{
           console.log(`🍽️ Rendering item ${index}:`, item.name, "Category:", item.category);
           return <FoodItem key={item._id} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} />
         })}
      </div>
    </div>

  )
}

export default FoodDisplay;
