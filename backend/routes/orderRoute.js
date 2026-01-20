import express from "express";
import { 
    placeOrder, 
    placeOrderStripe, 
    verifyOrder, 
    userOrders, 
    listOrders, 
    updateStatus 
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", placeOrder);
orderRouter.post("/stripe", placeOrderStripe);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;