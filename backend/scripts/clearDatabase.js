import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";
import 'dotenv/config';

const clearDatabase = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to database");

        console.log("⚠️  WARNING: This will delete ALL data from the database!");
        console.log("Clearing all collections...");

        // Get counts before deletion
        const userCount = await userModel.countDocuments();
        const foodCount = await foodModel.countDocuments();
        const orderCount = await orderModel.countDocuments();

        console.log(`Found ${userCount} users, ${foodCount} food items, ${orderCount} orders`);

        // Clear all data
        await userModel.deleteMany({});
        await foodModel.deleteMany({});
        await orderModel.deleteMany({});

        console.log("\n=== DATABASE CLEARED ===");
        console.log("✅ All users deleted");
        console.log("✅ All food items deleted");
        console.log("✅ All orders deleted");
        console.log("\nDatabase is now empty. Run 'npm run seed' to populate with sample data.");

        process.exit(0);
    } catch (error) {
        console.error("Error clearing database:", error);
        process.exit(1);
    }
};

// Run the clear script
clearDatabase();