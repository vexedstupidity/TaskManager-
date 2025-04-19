import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
  try {
    let token = null;

    // 1. Check Bearer token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2. If no Bearer token, fall back to cookie
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    // 3. If still no token, return error
    if (!token) {
      return res.status(401).json({ status: false, message: "No token provided" });
    }

    // 4. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("isAdmin email");

    if (!user) {
      return res.status(401).json({ status: false, message: "User not found" });
    }

    req.user = {
      userId: decoded.userId,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ status: false, message: "Not authorized. Try login again." });
  }
};


const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Try login as admin.",
    });
  }
};

//middleware/auth.js
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ status: false, message: "Invalid or expired token" });
  }
};

export { isAdminRoute, protectRoute };