import foodmodel from "../models/foodModel.js";
import fs from 'fs'

// Add food item
const addFood = async (req, res) => {
    if (!req.file) {
        return res.json({ success: false, message: "Image is required" });
    }

    let image_filename = `${req.file.filename}`;

    const food = new foodmodel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });
    
    try {
        await food.save();
        res.json({ success: true, message: "Food Added Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding food item" });
    }
}

// All food list
const listFood = async (req, res) => {
    try {
        const foods = await foodmodel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching food items" });
    }
}

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodmodel.findById(req.body.id);
        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }
        
        fs.unlink(`uploads/${food.image}`, () => {});
        await foodmodel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food removed successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing food item" });
    }
}

export { addFood, listFood, removeFood };