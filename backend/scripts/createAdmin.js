import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import 'dotenv/config';

const createAdmin = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to database");

        // Check if admin already exists
        const existingAdmin = await userModel.findOne({ email: "admin@fooddel.com" });
        if (existingAdmin) {
            console.log("Admin already exists!");
            process.exit(0);
        }

        // Create admin user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("admin123", salt);

        const admin = new userModel({
            name: "Admin",
            email: "admin@fooddel.com",
            password: hashedPassword,
            role: "admin"
        });

        await admin.save();
        console.log("Admin created successfully!");
        console.log("Email: admin@fooddel.com");
        console.log("Password: admin123");
        console.log("Please change the password after first login");

        process.exit(0);
    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
};

createAdmin();