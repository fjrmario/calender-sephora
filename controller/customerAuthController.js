const jwt = require("jsonwebtoken");
const Customer = require('../model/customerModel')


const isAuth = async (req, res, next) => {
const token = req.headers.authorization.replace(/"/g, '').split(' ')[1];

// const token = req.headers.authorization
// const token = req.headers["authorization"].split(" ")[1];
console.log("token in authcontroller" ,token)
// console.log("header", req.headers)
if (token) {
    try {
      console.log("hi")
      console.log(process.env.JWT_SECRET)
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      console.log("decoded", decoded)
      const customer = await Customer.findOne({ email: decoded.customer.email }).exec();
        console.log(customer, 'this is my customer')
      if (customer) {
        req.customer = decoded.customer;
        next();
      } else {
        res.status(403).send("Forbidden");
      }
    } catch (error) {
      res.status(401).send("Invalid token");
    //   console.log(error)
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = {
    isAuth
}