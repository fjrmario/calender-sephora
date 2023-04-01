const express = require("express");
const path = require("path");
// const favicon = require("serve-favicon");
const logger = require("morgan");
require('dotenv').config();
require('./config/database');
const userRouter = require('./routes/userRouter');
const calendarRouter = require('./routes/calendarRouter');
const appointmentRouter = require('./routes/appointmentRouter');
const jwt = require("jsonwebtoken")

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/secret",  (req, res) => {
// app.get("/api/secret", isLoggedIn, (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  if (decode) {
    res.json({ message : "secret"})
  } else {
    res.status(403).json({ message: "sorry"})
  }
});


// const isLoggedIn = (req, res, next) => {
  //   const authorization = req.headers.authorization;
  //   const token = authorization.split(" ")[1];
  //   const decode = jwt.verify(token, process.env.JWT_SECRET);
  //   if (decode) {
    //     req.user = decode.user;
    //     next()
    //   } else {
      //     res.status(403).json({ message: "sorry" });
      //   } 
      // }
      
app.use("/api/users", userRouter);
app.use("/api/customer", calendarRouter);
app.use("/api/booking", appointmentRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
