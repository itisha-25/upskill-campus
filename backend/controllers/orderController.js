import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Initialize Stripe only if secret key is available
let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
    const Stripe = (await import("stripe")).default;
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
}

// Place order for COD
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId || "guest",
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            paymentMethod: 'COD'
        });
        
        await newOrder.save();
        
        if (req.body.userId) {
            await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        }
        
        res.json({ success: true, message: "Order Placed Successfully" });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error placing order" });
    }
};

// Place order for Stripe
const placeOrderStripe = async (req, res) => {
    const frontend_url = process.env.FRONTEND_URL || "http://localhost:5175";
    
    try {
        const newOrder = new orderModel({
            userId: req.body.userId || "guest",
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            paymentMethod: 'Stripe'
        });
        
        await newOrder.save();
        
        if (req.body.userId) {
            await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        }
        
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));
        
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100
            },
            quantity: 1
        });
        
        if (process.env.STRIPE_SECRET_KEY && stripe) {
            const session = await stripe.checkout.sessions.create({
                line_items: line_items,
                mode: 'payment',
                success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
            });
            
            res.json({ success: true, session_url: session.url });
        } else {
            res.json({ success: false, message: "Stripe not configured" });
        }
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error processing payment" });
    }
};

// Verify order
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error verifying order" });
    }
};

// User orders for frontend
const userOrders = async (req, res) => {
    try {
        const userId = req.body.userId;
        if (!userId) {
            return res.json({ success: false, message: "User ID required" });
        }
        
        const orders = await orderModel.find({ userId: userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching user orders" });
    }
};

// List orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching orders" });
    }
};

// API for updating order status
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        
        if (!orderId || !status) {
            return res.json({ success: false, message: "Order ID and status required" });
        }
        
        await orderModel.findByIdAndUpdate(orderId, { status: status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating status" });
    }
};

export { placeOrder, placeOrderStripe, verifyOrder, userOrders, listOrders, updateStatus };