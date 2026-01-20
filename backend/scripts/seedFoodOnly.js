import mongoose from "mongoose";
import foodModel from "../models/foodModel.js";
import 'dotenv/config';

// Sample food data with more variety and CDN images
const sampleFoods = [


  /* ---------------- SALADS (15) ---------------- */
  { name: "Greek Salad", description: "Feta cheese, olives & fresh veggies", price: 12.99, category: "Salad", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop" },
  { name: "Caesar Salad", description: "Romaine lettuce with parmesan", price: 10.99, category: "Salad", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop" },
  { name: "Garden Salad", description: "Seasonal vegetables & vinaigrette", price: 9.49, category: "Salad", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },
  { name: "Avocado Salad", description: "Avocado with greens & lemon dressing", price: 11.49, category: "Salad", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop" },
  { name: "Fruit Salad", description: "Fresh fruits & mint", price: 8.99, category: "Salad", image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&h=300&fit=crop" },
  { name: "Quinoa Salad", description: "Protein rich quinoa & veggies", price: 11.99, category: "Salad", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop" },
  { name: "Pasta Salad", description: "Cold pasta with olives", price: 10.49, category: "Salad", image: "https://images.unsplash.com/photo-1547496502-affa22d38842?w=400&h=300&fit=crop" },
  { name: "Chickpea Salad", description: "Healthy chickpeas & greens", price: 9.99, category: "Salad", image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400&h=300&fit=crop" },
  { name: "Coleslaw", description: "Creamy cabbage salad", price: 7.99, category: "Salad", image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=400&h=300&fit=crop" },
  { name: "Caprese Salad", description: "Tomato, mozzarella & basil", price: 10.99, category: "Salad", image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400&h=300&fit=crop" },
  { name: "Sprout Salad", description: "Mixed sprouts & lemon", price: 8.49, category: "Salad", image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=400&h=300&fit=crop" },
  { name: "Corn Salad", description: "Sweet corn & veggies", price: 8.99, category: "Salad", image: "https://images.unsplash.com/photo-1515516969-d4008cc6241a?w=400&h=300&fit=crop" },
  { name: "Asian Slaw", description: "Crunchy Asian style salad", price: 9.99, category: "Salad", image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=400&h=300&fit=crop" },
  { name: "Lentil Salad", description: "Protein-rich lentils & veggies", price: 10.49, category: "Salad", image: "https://images.unsplash.com/photo-1572441710291-59b74b03b1db?w=400&h=300&fit=crop" },
  { name: "Kale Salad", description: "Fresh kale with lemon dressing", price: 9.99, category: "Salad", image: "https://images.unsplash.com/photo-1562967916-eb82221dfb29?w=400&h=300&fit=crop" },

  /* ---------------- ROLLS (15) ---------------- */
  { name: "Veg Roll", description: "Veggie tortilla roll", price: 7.99, category: "Rolls", image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400&h=300&fit=crop" },
  { name: "Paneer Roll", description: "Spicy paneer wrap", price: 8.49, category: "Rolls", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop" },
  { name: "Falafel Roll", description: "Falafel with tahini", price: 8.99, category: "Rolls", image: "https://images.unsplash.com/photo-1547050605-2f125021fa2a?w=400&h=300&fit=crop" },
  { name: "Mexican Roll", description: "Beans & salsa wrap", price: 8.49, category: "Rolls", image: "https://images.unsplash.com/photo-1528613094057-7ef200d6218f?w=400&h=300&fit=crop" },
  { name: "Soya Roll", description: "Protein rich soya wrap", price: 7.99, category: "Rolls", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop" },
  { name: "Corn Roll", description: "Sweet corn & cheese", price: 7.49, category: "Rolls", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop" },
  { name: "Kathi Veg Roll", description: "Classic Indian kathi roll", price: 8.99, category: "Rolls", image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=400&h=300&fit=crop" },
  { name: "Butter Paneer Roll", description: "Butter paneer stuffing", price: 9.99, category: "Rolls", image: "https://images.unsplash.com/photo-1601050690187-2bdbfd8c2aa2?w=400&h=300&fit=crop" },
  { name: "Veg Shawarma Roll", description: "Middle-eastern veg roll", price: 10.49, category: "Rolls", image: "https://images.unsplash.com/photo-1547050605-2f125021fa2a?w=400&h=300&fit=crop" },
  { name: "Cheese Mayo Roll", description: "Creamy cheese mayo wrap", price: 7.99, category: "Rolls", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop" },
  { name: "Schezwan Veg Roll", description: "Spicy schezwan flavor", price: 8.79, category: "Rolls", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop" },
  { name: "Paneer BBQ Roll", description: "BBQ paneer chunks", price: 10.29, category: "Rolls", image: "https://images.unsplash.com/photo-1632778149975-420e04a26e32?w=400&h=300&fit=crop" },
  { name: "Veg Loaded Roll", description: "Fully loaded veggie roll", price: 9.49, category: "Rolls", image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400&h=300&fit=crop" },
  { name: "Onion Cheese Roll", description: "Caramelized onion & cheese", price: 7.69, category: "Rolls", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop" },
  { name: "Mushroom Roll", description: "Grilled mushroom wrap", price: 8.99, category: "Rolls", image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400&h=300&fit=crop" },

  /* ---------------- PURE VEG (15) ---------------- */
  { name: "Paneer Butter Masala", description: "Rich tomato gravy", price: 13.99, category: "Pure Veg", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop" },
  { name: "Dal Tadka", description: "Yellow lentils with ghee", price: 9.99, category: "Pure Veg", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop" },
  { name: "Veg Biryani", description: "Aromatic basmati rice", price: 12.99, category: "Pure Veg", image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400&h=300&fit=crop" },
  { name: "Chole Masala", description: "Spicy chickpeas curry", price: 10.99, category: "Pure Veg", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400&h=300&fit=crop" },
  { name: "Rajma Curry", description: "Kidney beans in onion gravy", price: 11.49, category: "Pure Veg", image: "https://images.unsplash.com/photo-1601050690187-2bdbfd8c2aa2?w=400&h=300&fit=crop" },
  { name: "Veg Korma", description: "Creamy mixed veg curry", price: 11.99, category: "Pure Veg", image: "https://images.unsplash.com/photo-1600628422019-8b98d4f29a2a?w=400&h=300&fit=crop" },
  { name: "Aloo Gobi", description: "Potato & cauliflower masala", price: 9.49, category: "Pure Veg", image: "https://images.unsplash.com/photo-1628294895606-6b1f2d2c1b3c?w=400&h=300&fit=crop" },
  { name: "Bhindi Masala", description: "Spicy okra curry", price: 9.99, category: "Pure Veg", image: "https://images.unsplash.com/photo-1626508035297-0cd47eefcf00?w=400&h=300&fit=crop" },
  { name: "Veg Kofta", description: "Vegetable dumplings curry", price: 12.49, category: "Pure Veg", image: "https://images.unsplash.com/photo-1600628421055-4d38c29f4d8f?w=400&h=300&fit=crop" },
  { name: "Palak Paneer", description: "Spinach & paneer curry", price: 13.49, category: "Pure Veg", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop" },
  { name: "Matar Paneer", description: "Peas & paneer gravy", price: 12.99, category: "Pure Veg", image: "https://images.unsplash.com/photo-1631452180860-33f1b94b8a6b?w=400&h=300&fit=crop" },
  { name: "Veg Fried Rice", description: "Rice with veggies", price: 10.49, category: "Pure Veg", image: "https://images.unsplash.com/photo-1600628422034-0b4d53f7c8f7?w=400&h=300&fit=crop" },
  { name: "Veg Thali", description: "Complete veg meal", price: 14.99, category: "Pure Veg", image: "https://images.unsplash.com/photo-1596797038530-8b74c7c19b7c?w=400&h=300&fit=crop" },

  /* ---------------- Deserts (15) ---------------- */
  { name: "Chocolate Cake", description: "Rich chocolate cake", price: 6.99, category: "Deserts", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop" },
  { name: "Vanilla Ice Cream", description: "Creamy vanilla scoop", price: 4.99, category: "Deserts", image: "https://images.unsplash.com/photo-1501443762994-82bd5dabb892?w=400&h=300&fit=crop" },
  { name: "Brownie", description: "Fudgy chocolate brownie", price: 5.99, category: "Deserts", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop" },
  { name: "Tiramisu", description: "Coffee flavored dessert", price: 7.99, category: "Deserts", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop" },
  { name: "Mousse", description: "Chocolate mousse", price: 5.49, category: "Deserts", image: "https://images.unsplash.com/photo-1541781408260-3c0bcd97c3c4?w=400&h=300&fit=crop" },
  { name: "Donut", description: "Glazed donut", price: 3.99, category: "Deserts", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop" },
  { name: "Cupcake", description: "Vanilla cupcake", price: 4.49, category: "Deserts", image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=400&h=300&fit=crop" },
  { name: "Waffle", description: "Crispy waffle", price: 6.49, category: "Deserts", image: "https://images.unsplash.com/photo-1562329265-95a6d7a83440?w=400&h=300&fit=crop" },
  { name: "Pudding", description: "Creamy pudding", price: 4.99, category: "Deserts", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop" },
  { name: "Apple Pie", description: "Classic apple pie", price: 6.99, category: "Deserts", image: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=400&h=300&fit=crop" },
  { name: "Ice Cream Sundae", description: "Ice cream with toppings", price: 5.99, category: "Deserts", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" },
  { name: "Milkshake", description: "Thick chocolate shake", price: 4.99, category: "Deserts", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop" },
  { name: "Cheese Balls", description: "Sweet cheese balls", price: 5.49, category: "Deserts", image: "https://images.unsplash.com/photo-1599785209793-c50c4c2b2b1c?w=400&h=300&fit=crop" },
  { name: "Rasgulla", description: "Soft Indian sweet", price: 4.99, category: "Deserts", image: "https://images.unsplash.com/photo-1608134963671-09a2eab3b68b?w=400&h=300&fit=crop" },
  { name: "Gulab Jamun", description: "Traditional Indian sweet", price: 4.99, category: "Deserts", image: "https://images.unsplash.com/photo-1589308078057-4168a30ee10f?w=400&h=300&fit=crop" },

  /* ---------------- SANDWICH (15) ---------------- */
  { name: "Veg Grilled Sandwich", description: "Grilled vegetables with cheese", price: 7.99, category: "Sandwich", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop" },
  { name: "Paneer Tikka Sandwich", description: "Spiced paneer with veggies", price: 8.99, category: "Sandwich", image: "https://images.unsplash.com/photo-1628294896516-344152572ee8?w=400&h=300"},

 /* ---------------- SANDWICH (continued to 15) ---------------- */
{ name: "Veggie Delight Sandwich", description: "Lettuce, tomato & cucumber", price: 6.99, category: "Sandwich", image: "https://images.unsplash.com/photo-1598514982810-3c244c22d7da?w=400&h=300&fit=crop" },
{ name: "Mushroom Sandwich", description: "Sautéed mushrooms & cheese", price: 8.49, category: "Sandwich", image: "https://images.unsplash.com/photo-1617196033275-d7dfaa1a81b0?w=400&h=300&fit=crop" },
{ name: "Paneer Cheese Sandwich", description: "Grilled paneer with veggies", price: 9.49, category: "Sandwich", image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400&h=300&fit=crop" },
{ name: "Tomato Basil Sandwich", description: "Fresh tomato & basil", price: 7.99, category: "Sandwich", image: "https://images.unsplash.com/photo-1599026317723-35c3f0b1a0c4?w=400&h=300&fit=crop" },

/* ---------------- CAKES (15) ---------------- */
{ name: "Chocolate Fudge Cake", description: "Rich chocolate layers", price: 12.99, category: "Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop" },
{ name: "Red Velvet Cake", description: "Classic red velvet", price: 13.49, category: "Cake", image: "https://images.unsplash.com/photo-1601924573109-9b2f153f4f8f?w=400&h=300&fit=crop" },
{ name: "Vanilla Sponge Cake", description: "Soft vanilla sponge", price: 11.99, category: "Cake", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" },
{ name: "Strawberry Cake", description: "Fresh strawberry topping", price: 13.99, category: "Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop" },
{ name: "Pineapple Cake", description: "Tropical pineapple flavor", price: 12.49, category: "Cake", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop" },
{ name: "Coffee Cake", description: "Moist coffee flavored cake", price: 11.99, category: "Cake", image: "https://images.unsplash.com/photo-1562440499-64e2c9491a0e?w=400&h=300&fit=crop" },
{ name: "Carrot Cake", description: "Carrot & cream cheese frosting", price: 12.99, category: "Cake", image: "https://images.unsplash.com/photo-1562440499-64e2c9491a0e?w=400&h=300&fit=crop" },
{ name: "Mango Cake", description: "Fresh mango topping", price: 13.49, category: "Cake", image: "https://images.unsplash.com/photo-1617196033275-d7dfaa1a81b0?w=400&h=300&fit=crop" },
{ name: "Butterscotch Cake", description: "Sweet butterscotch flavor", price: 12.49, category: "Cake", image: "https://images.unsplash.com/photo-1601924573109-9b2f153f4f8f?w=400&h=300&fit=crop" },
{ name: "Black Forest Cake", description: "Chocolate & cherry layers", price: 14.99, category: "Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop" },
{ name: "Pistachio Cake", description: "Nutty pistachio delight", price: 13.49, category: "Cake", image: "https://images.unsplash.com/photo-1617196033275-d7dfaa1a81b0?w=400&h=300&fit=crop" },
{ name: "Vanilla Almond Cake", description: "Almond & vanilla layers", price: 12.99, category: "Cake", image: "https://images.unsplash.com/photo-1601924573109-9b2f153f4f8f?w=400&h=300&fit=crop" },
{ name: "Chocolate Truffle Cake", description: "Rich chocolate truffle", price: 14.49, category: "Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop" },
{ name: "Vanilla Cream Cake", description: "Soft vanilla cream layers", price: 11.99, category: "Cake", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" },
{ name: "Fruit Cake", description: "Mixed dried fruits cake", price: 13.99, category: "Cake", image: "https://images.unsplash.com/photo-1601924573109-9b2f153f4f8f?w=400&h=300&fit=crop" },

/* ---------------- PASTA (15) ---------------- */
{ name: "Veg Alfredo Pasta", description: "Creamy white sauce pasta", price: 12.99, category: "Pasta", image: "https://images.unsplash.com/photo-1589308078057-4168a30ee10f?w=400&h=300&fit=crop" },
{ name: "Tomato Basil Pasta", description: "Fresh tomato sauce", price: 11.99, category: "Pasta", image: "https://images.unsplash.com/photo-1600628422019-8b98d4f29a2a?w=400&h=300&fit=crop" },
{ name: "Penne Arrabbiata", description: "Spicy tomato penne", price: 12.49, category: "Pasta", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400&h=300&fit=crop" },
{ name: "Pasta Primavera", description: "Mixed vegetables pasta", price: 13.49, category: "Pasta", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop" },
{ name: "Mac & Cheese", description: "Classic cheesy pasta", price: 11.49, category: "Pasta", image: "https://images.unsplash.com/photo-1626508035297-0cd47eefcf00?w=400&h=300&fit=crop" },
{ name: "Spinach Pasta", description: "Pasta with creamy spinach sauce", price: 12.99, category: "Pasta", image: "https://images.unsplash.com/photo-1600628422034-0b4d53f7c8f7?w=400&h=300&fit=crop" },
{ name: "Mushroom Pasta", description: "Sautéed mushrooms in sauce", price: 13.49, category: "Pasta", image: "https://images.unsplash.com/photo-1617196033275-d7dfaa1a81b0?w=400&h=300&fit=crop" },
{ name: "Pesto Pasta", description: "Basil pesto with penne", price: 12.49, category: "Pasta", image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=400&h=300&fit=crop" },
{ name: "Cheese Pasta", description: "Creamy cheesy delight", price: 11.99, category: "Pasta", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop" },
{ name: "Tomato Garlic Pasta", description: "Tomato & garlic sauce", price: 12.49, category: "Pasta", image: "https://images.unsplash.com/photo-1547496502-affa22d38842?w=400&h=300&fit=crop" },
{ name: "Veg Lasagna", description: "Layered pasta with veggies", price: 13.99, category: "Pasta", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop" },
{ name: "Spaghetti Marinara", description: "Tomato & herb spaghetti", price: 12.99, category: "Pasta", image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400&h=300&fit=crop" },
{ name: "Cheesy Penne Pasta", description: "Penne with creamy cheese", price: 11.99, category: "Pasta", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop" },
{ name: "Veg Macaroni Pasta", description: "Macaroni with mixed veggies", price: 12.49, category: "Pasta", image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&h=300&fit=crop" },

/* ---------------- NOODLES (15) ---------------- */
{ name: "Veg Hakka Noodles", description: "Stir-fried noodles with veggies", price: 10.99, category: "Noodles", image: "https://images.unsplash.com/photo-1543770783-4b0867a1d16d?w=400&h=300&fit=crop" },
{ name: "Chili Garlic Noodles", description: "Spicy garlic noodles", price: 11.49, category: "Noodles", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop" },
{ name: "Veg Schezwan Noodles", description: "Schezwan sauce stir-fry", price: 11.99, category: "Noodles", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop" },
{ name: "Singapore Noodles", description: "Curried noodles with veggies", price: 12.49, category: "Noodles", image: "https://images.unsplash.com/photo-1547496502-affa22d38842?w=400&h=300&fit=crop" },
{ name: "Hakka Chowmein", description: "Classic stir-fried noodles", price: 10.49, category: "Noodles", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop" },
{ name: "Veg Lo Mein", description: "Soft Chinese noodles", price: 11.49, category: "Noodles", image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&h=300&fit=crop" },
{ name: "Mushroom Noodles", description: "Sautéed mushrooms & noodles", price: 11.99, category: "Noodles", image: "https://images.unsplash.com/photo-1543770783-4b0867a1d16d?w=400&h=300&fit=crop" },
{ name: "Chowmein Veg", description: "Veggie stir-fry chowmein", price: 10.99, category: "Noodles", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop" },
{ name: "Schezwan Veg Noodles", description: "Spicy Indo-Chinese noodles", price: 12.49, category: "Noodles", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop" },
{ name: "Hakka Veg Stir Noodles", description: "Veg stir-fried noodles", price: 11.49, category: "Noodles", image: "https://images.unsplash.com/photo-1547496502-affa22d38842?w=400&h=300&fit=crop" },
{ name: "Garlic Noodles", description: "Noodles tossed with garlic", price: 10.99, category: "Noodles", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop" },
{ name: "Veg Lo Mein Deluxe", description: "Noodles with mixed veggies", price: 11.99, category: "Noodles", image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&h=300&fit=crop" },
{ name: "Tofu Noodles", description: "Soft noodles with tofu", price: 12.49, category: "Noodles", image: "https://images.unsplash.com/photo-1543770783-4b0867a1d16d?w=400&h=300&fit=crop" },
{ name: "Sweet & Sour Noodles", description: "Tangy veg noodles", price: 11.49, category: "Noodles", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop" },


];
const seedFoodOnly = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to database");

        // Clear existing food data only
        console.log("Clearing existing food data...");
        await foodModel.deleteMany({});
        console.log("Existing food data cleared");

        // Create food items
        console.log("Creating food items...");
        const foods = [];
        for (const foodData of sampleFoods) {
            const food = new foodModel(foodData);
            const savedFood = await food.save();
            foods.push(savedFood);
        }

        // Display summary
        console.log("\n=== FOOD SEEDING COMPLETED ===");
        console.log(`✅ Food items created: ${foods.length}`);
        
        console.log("\n=== FOOD CATEGORIES ===");
        const categories = [...new Set(foods.map(food => food.category))];
        categories.forEach(category => {
            const count = foods.filter(food => food.category === category).length;
            console.log(`${category}: ${count} items`);
        });

        console.log("\n=== PRICE RANGE ===");
        const prices = foods.map(food => food.price);
        console.log(`Lowest Price: $${Math.min(...prices).toFixed(2)}`);
        console.log(`Highest Price: $${Math.max(...prices).toFixed(2)}`);
        console.log(`Average Price: $${(prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2)}`);

        process.exit(0);
    } catch (error) {
        console.error("Error seeding food data:", error);
        process.exit(1);
    }
};

// Run the seeder
seedFoodOnly();