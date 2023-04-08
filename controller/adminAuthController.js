const jwt = require("jsonwebtoken");
const Admin = require('../model/adminModel');

const adminAuth = async (req, res, next) => {
  const token = req.headers.authorization.replace(/"/g, "").split(" ")[1];
  console.log("token in authcontroller", token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check for admin user
      const admin = await Admin.findOne({ email: decoded.admin.email }).exec();
      
      if (admin) {
        req.admin = admin;
        next();
      } else {
        res.status(403).send("Forbidden");
      }
    } catch (error) {
      res.status(401).send("Invalid token");
      // console.log(error)
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};

const requireRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.admin.role)) {
        console.log(`roles in adminAuthController: ${roles}`);
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
module.exports = {
  adminAuth,
  requireRole
};
