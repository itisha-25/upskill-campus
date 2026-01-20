import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Create token
const createToken = (id, role = 'user') => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await userModel.findOne({ email });
        
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        
        const token = createToken(user._id, user.role);
        res.json({ 
            success: true, 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    
    try {
        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });
        
        const user = await newUser.save();
        const token = createToken(user._id);
        
        res.json({ 
            success: true, 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Admin login
const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await userModel.findOne({ email, role: 'admin' });
        
        if (!user) {
            return res.json({ success: false, message: "Admin not found" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        
        const token = createToken(user._id, user.role);
        res.json({ 
            success: true, 
            token,
            admin: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Create admin (for initial setup)
const createAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Check if admin already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "Admin already exists" });
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newAdmin = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            role: 'admin'
        });
        
        const admin = await newAdmin.save();
        const token = createToken(admin._id, admin.role);
        
        res.json({ 
            success: true, 
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { loginUser, registerUser, adminLogin, createAdmin };