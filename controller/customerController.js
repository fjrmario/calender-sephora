const Customer = require("../model/customerModel");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const create = async (req, res) => {
  const { email, password, name } = req.body;
  if (password.length < 3) {
    return res.status(400).json({ error: "password too short" });
  }
  try {
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ error: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newCustomer = await Customer.create({
      email,
      password: hashedPassword,
      name,
    });
    await newCustomer.save();
     res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (password.length < 3) {
    return res.status(400).json({ message: "password too short" });
  }
  try {
    const customer = await Customer.findOne({ email: email });
    console.log(`customer: ${customer}`);
    if (!customer) {
      res.status(400).json({ message: "Customer does not exist" });
      return;
    }
    const match = await bcrypt.compare(password, customer.password);
    console.log("Password from request:", password );
    console.log("Hashed password from database:", customer.password);
    console.log(match);
    if (match) {
      const payload = { customer };
      console.log(`payload: ${payload}`);
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24Hrs" });
      res.status(200).json({ token, customer });
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