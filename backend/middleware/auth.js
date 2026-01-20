import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    
    if (!token) {
        return res.json({ success: false, message: "Not Authorized. Login Again" });
    }
    
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const adminAuth = async (req, res, next) => {
    const { token } = req.headers;
    
    if (!token) {
        return res.json({ success: false, message: "Not Authorized. Admin Login Required" });
    }
    
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (token_decode.role !== 'admin') {
            return res.json({ success: false, message: "Admin access required" });
        }
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { authMiddleware, adminAuth };