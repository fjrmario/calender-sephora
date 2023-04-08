const Admin = require("../model/adminModel");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const create = async (req, res) => {
  const { email, password, name, role } = req.body;
  if (password.length < 3) {
    return res.status(400).json({ error: "password too short" });
  }
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newAdmin = await Admin.create({
      email,
      password: hashedPassword,
      name,
      role,
    });
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (password.length < 3) {
    return res.status(400).json({ message: "Password too short" });
  }
  try {
    const admin = await Admin.findOne({ email: email });
    console.log(`admin: ${admin}`);
    if (!admin) {
      res.status(400).json({ message: "Customer does not exist" });
      return;
    }
    const match = await bcrypt.compare(password, admin.password);
    if (match) {
      const payload = { admin };
      console.log(`payload: ${payload}`);
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24Hrs" });
      res.status(200).json({ token, admin });
    } else {
      res.status(401).json({ message: "Wrong password" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  if (password.length < 3) {
    return res.status(400).json({ error: "Password too short" });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      return res.status(400).json({ error: "Invalid Email " });
    }

    const checkMatch = await bcrypt.compare(
      password,
      existingAdmin.password
    );

    if (!checkMatch) {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hash = await bcrypt.hash(password, salt);
      existingAdmin.password = hash;
      await existingAdmin.save();
      res.status(200).json({ message: "Password successfully changed" });
    } else {
      res.status(401).json({ message: "Error in changing password" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  create,
  login,
  resetPassword,
};
