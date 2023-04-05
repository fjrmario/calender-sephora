const express = require("express");
const path = require("path");
// const favicon = require("serve-favicon");
const logger = require("morgan");
require('dotenv').config();
require('./config/database');
const jwt = require("jsonwebtoken")
const customerRouter = require('./routes/userRouter');
const calendarRouter = require('./routes/calendarRouter');
const appointmentRouter = require('./routes/appointmentRouter');
const locationRouter = require('./routes/locationRouter')
const makeupArtistRouter = require('./routes/makeupArtistRouter')

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// app.get("/api/secret",  (req, res) => {
// // app.get("/api/secret", isLoggedIn, (req, res) => {
//   const authorization = req.headers.authorization;
//   const token = authorization.split(" ")[1];
//   const decode = jwt.verify(token, process.env.JWT_SECRET);
//   if (decode) {
//     res.json({ message : "secret"})
//   } else {
//     res.status(403).json({ message: "sorry"})
//   }
// });


// const isLoggedIn = (req, res, next) => {
//   const authorization = req.headers.authorization;
//   const token = authorization.split(" ")[1];
//   const decode = jwt.verify(token, process.env.JWT_SECRET);
//   if (decode) {
//     res.locals.user = decode.user;
//     next();
//   } else {
//     res.status(403).json({ message: "sorry" });
//   }
// };
      
app.use("/api/customer", customerRouter);
app.use("/api/calender", calendarRouter);
app.use("/api/booking", appointmentRouter);
app.use("/api/maps", locationRouter)
app.use("/api/makeupartist", makeupArtistRouter)

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
