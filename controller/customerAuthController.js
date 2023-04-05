const jwt = require("jsonwebtoken");
const Customer = require('../model/customerModel')


const isAuth = async (req, res, next) => {
const token = req.headers.authorization.split(" ")[1];
if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      const customer = await Customer.findOne({ email: decoded.email }).exec();

      if (customer) {
        req.customer = customer;
        next();
      } else {
        res.status(403).send("Forbidden");
      }
    } catch (error) {
      res.status(401).send("Invalid token");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = {
    isAuth
}