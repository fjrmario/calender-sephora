const express = require("express");
const path = require("path");
const logger = require("morgan");
require('dotenv').config();
require('./config/database');
const jwt = require("jsonwebtoken")
const customerRouter = require('./routes/customerLoginRouter');
const calendarRouter = require('./routes/calendarRouter');
const appointmentRouter = require('./routes/appointmentRouter');
const makeupArtistRouter = require('./routes/makeupArtistRouter')
const locationRouter = require('./routes/locationRouter')

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.get("/api", (req, res) => {
  res.send("Hello World!");
});
     
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
