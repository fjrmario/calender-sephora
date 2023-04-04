const Customer = require("../model/customerModel");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");

const create = async (req, res) => {
  const { email, password, name } = req.body;
  if (password.length < 3) {
    return res.status(400).json({ error: "password too short" });
  }
  try {
    const existingCustomer = await Customer.findOne({ email });
    if(existingCustomer){
      return res.status(400).json({ error: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = new Customer({
      email,
      password: hashedPassword,
      name,
    });
    await newCustomer.save();
    // const payload = { userId: newCustomer._id };
    // const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 60 });
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('body', req.body)
  if (password.length < 3) {
    return res.status(400).json({ message: "password too short" });
  }
  try {
    const customer = await Customer.findOne({ email });
    if (customer === null) {
      res.status(400).json({ message: "no user" });
      return;
    }
  console.log('customer', customer)

    const match = await bcrypt.compare(password, customer.password);
    console.log('match', match)
    
    if (!match) {
      const payload = { customer };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 600 });
      localStorage.setItem('token', JSON.stringify(token))
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "wrong password" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  create,
  login,
};




