<p align="center">
  <a href="" rel="noopener">
 <img width=800px height=600px src="/image/home.png" alt="Calendar and Appointment System"></a>
</p>

<h3 align="center">Calendar and Appointment System/h3>

---

## Description

The React Calendar and Booking System is a simple application which utilises the calendar to create, view and delete appointments. The React Calendar is taken reference from this <a href="https://www.section.io/engineering-education/build-react-calendar-library/">link</a>. This project is build in conjuction with the <a href="https://github.com/beryln-t/sephora">Sephora Project</a>. 

<!-- 
## Deployment

The application is deployed on Cyclic. You would need to <a href="https://cockatoo-sun-hat.cyclic.app/signup">create</a> an account to access the application. -->

## Features
<li>Create, view and delete appointments placed</li>
<li>Using RESTFul Routes</li>
<li>Error validation on both the client and the backend server</li>
<li>Adopt the MVC approach; Model, View and Controller</li>
<br />

## Technologies & Tools Used
<li>React</li>
<li>Javascript</li>
<li>Git commands</li>
<li>React Calendar</li>
<li>MongoDB</li>
<li>NodeJS</li>
<li>Express</li>
<li>JWT</li>
<li>Vite</li>
<br>

## Calendar and Appointment React Routes</a>
<li>/booking</li>
<li>/history</li>
<br>

## Login/Forget Password/Sign Up React Routes</a>
<li>/login</li>
<li>/forgetpassword</li>
<li>/signup</li>
<br>

## RESTFUL Appointments Routes</a>
<li>/:id</li>
<li>/:customerName/:date</li>
<li>/:id/:date</li>
<li>/:customerName</li>
<br>

## RESTFUL Calendar Routes</a>
<li>/:id</li>
<li>/</li>
<br>

## RESTFUL Login/Forget Password/Sign Up Routes</a>
<li>/signup</li>
<li>/login</li>
<li>/forget</li>
<br>

## Server Routes</a>
```js
app.use("/api/customer", customerRouter);
app.use("/api/calender", calendarRouter);
app.use("/api/booking", appointmentRouter);
```
<br />

## Customer Logging in</a>
 <p align="center">
  <a href="" rel="noopener">
 <img style="max-width: 100%;" src="/images/login.png" alt="Login"></a>
</p>
<br>

## Create Appointment</a>
 <p align="center">
  <a href="" rel="noopener">
 <img style="max-width: 100%;" src="/images/create_appointment.png" alt="Create Appointment"></a>
</p>
<br>

 ## Successful Appointment</a>
 <p align="center">
  <a href="" rel="noopener">
 <img style="max-width: 100%;" src="/images/successful appointment booked.png" alt="Successful Appointment Booked"></a>
</p>
<br>
 
  ## Conditional Appointment Booking</a>
 <p align="center">
  <a href="" rel="noopener">
 <img style="max-width: 100%;" src="/images/conditional booking.png" alt="Conditional Appointment Booking"></a>
</p>
<br>

  ## View available timeslot for Appointment Booking</a>
 <p align="center">
  <a href="" rel="noopener">
 <img style="max-width: 100%;" src="/images/viewing available timeslot for appointment booking.png" alt="View Available Timeslot for Appointment Booking"></a>
</p>
<br>

  ## View Appointment/s Booked</a>
 <p align="center">
  <a href="" rel="noopener">
 <img style="max-width: 100%;" src="/images/view appointments.png" alt="View Appointment Booking"></a>
</p>
<br>


## Deliverables Timeline
<strong><u>Day 1:</u></strong>
<li>Working and drafting on the routes layout</li>
<li>Creating the data models</li>
<br>
<strong><u>Day 2:</u></strong>
<li>Setting up the routes; MVC approach</li>
<li>Connecting the controller with model</li>
<li>Inserting validation in the data model</li>
<li>Doing testing on the front end</li>
<br>
<strong><u>Day 3:</u></strong>
<br>
<li>Debugging errors on the routes, controller and view</li>
<li>Doing testing on the front end</li>
<li>Error validation on the front end</li>
<br>
<strong><u>Day 4:</u></strong>
<br>
<li>Unit testing using Jest</li>
<li>CSS structure</li>
<li>EJS structure</li>
<br>
<strong><u>Day 5:</u></strong>
<br>
<li>Wrap up</li>
<br>

## Key Takeaways
These are key takeaways when working on the project:
<li>Drafting up data models requirements and how to insert some validation</li>
<li>Making it a habit to comment the codes for easy reference and readability</li>
<li>Writing mulitple console.log syntax to ensure that the function or codes are returning the correct values</li>
<li>Assign meaningful name to functions for easy readability</li>
<li>Using the MVC approach to keep codes organised</li>
<li>Getting the RESTful routes right in the first place is crucial</li>

<br>

<strong><u>Patient Data Model Validation:</u></strong>
```js
const patientSchema = new Schema(
  {
    nricfin: {
      type: String,
      unique: true,
      required: true,
      match: /^[0-9]{4}[A-Za-z]{1}$/,
      minlength: 5,
      message: "NRIC/FIN must be 5 characters long",
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    contactno: {
      type: String,
      unique: true,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["MALE", "FEMALE"],
      validate: {
        validator: function (v) {
          return ["MALE", "FEMALE"].includes(v);
        },
        message: "Invalid gender type",
      },
    },
    nationality: {
      type: String,
      required: true,
      enum: ["SINGAPOREAN", "WORK PERMIT", "PR", "S-PASS", "E-PASS"],
      validate: {
        validator: function (v) {
          return [
            "SINGAPOREAN",
            "WORK PERMIT",
            "PR",
            "S-PASS",
            "E-PASS",
          ].includes(v);
        },
        message: "Invalid Nationality",
      },
    },
    streetaddress: {
      type: String,
      required: true,
    },
    postalcode: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return (v.toString().length = 6);
        },
        message: "Postal Code must be 6 digits long",
      },
    },
    unitno: {
      type: String,
      required: true,
    },
    drugallergies: {
      type: [String],
      required: true,
    },
    vaccination: {
      type: String,
      required: true,
      enum: ["YES", "NO"],
      validate: {
        validator: function (v) {
          return ["YES", "NO"].includes(v);
        },
        message: "Invalid option",
      },
    },
    vaccinationtype: {
      type: String,
      enum: [" ", "PFIZER", "MODERNA", "NOVAVAX", "SINOVAC"],
      validate: {
        validator: function (v) {
          return [" ", "PFIZER", "MODERNA", "NOVAVAX", "SINOVAC"].includes(v);
        },
        message: "Invalid vaccination type",
      },
    },

    log: [patientLogSchema],
  },

```
<br>

<strong><u>Mongoose Validation Error in controller to view:</u></strong>

```js
const createPatient = async (req, res) => {

  try {

    if (req.body.drugallergies) {
      req.body.drugallergies = req.body.drugallergies.split(/\s*,\s*/);
    }

    const patient = new Patient({
      ...req.body,
    });
    const newPatient = await patient.save(); //update
    console.log(`newPatient: ${newPatient}`);
    res.redirect("/patients");
  } 
  catch (err) {
    if (err.code === 11000) {
      console.log(`Duplicate error: ${err}`);
      res.render("patients/error", { message: "Duplicate record!" });
    } else if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      console.log(`Data Model Errors: ${errors}`);
      res.render("patients/error", { message: errors });
    } else {
      console.log(err);
      res.render("patients/error", { message: err });
    }
  }
};
```
<br>

<strong><u>Validation Error in EJS:</u></strong>

```html

<div>
      <input type="text" name="nricfin" required placeholder=" " onkeyup="this.value = this.value.toUpperCase();"
        pattern="[0-9]{4}[A-Za-z]{1}" required />
      <label for="nricfin">NRIC/FIN Example: 1234A</label>
      <div class="requirements">
        Please enter 4 digits followed by 1 alphabet.
      </div>
    </div>

    <div>
      <input type="text" name="name" required placeholder=" " onkeyup="this.value = this.value.toUpperCase();"
        required />
      <label for="name">Name</label>

    </div>
```

## Future Enhancements
<p>As this application is part of a project submission, there would not be an future amendments made to this.</p>However, if there were any future enhancements to be made, these would be the following changes:</p>
<li>Improve the UX interface</li>
<li>Insert a calendar page to allow for appointments booking</li>
<li>Perform more unit testing</li>
<li>Utilise more 3rd party API like Twilio</li>

<br>
## References
Various sources which I have seek guidance from:
</li>
<li><a href=https://levelup.gitconnected.com/handling-errors-in-mongoose-express-for-display-in-react-d966287f573b>Handling Mongoose Errors</a>
</li>
<li><a href=https://jonathan-holloway.medium.com/node-and-express-session-a23eb36a052>Login and Authentication using sessions</a>
</li>
<li><a href=https://nodemailer.com/about>Nodemailer documentation</a>
</li>
<li><a href=https://stackoverflow.com/questions/63963246/bcrypt-mongoose-change-user-password>Changing password with bcrypt</a>
</li>
<li><a href=https://archive.jestjs.io/docs/en/24.x/configuration>Configuring Jest</a>
</li>
<li><a href=https://mongoosejs.com/docs/validation.html>Mongoose Validation</a>
</li>
<li><a href=https://mongoosejs.com/docs/api/model.html#model_Model-findOne>Mongoose findOne</a>
</li>
<li><a href=https://stackoverflow.com/questions/8675642/how-can-i-format-a-date-coming-from-mongodb>Date formatting in MongoDB</a>
</li>
<li><a href=https://mongoosejs.com/docs/tutorials/virtuals.html>Mongoose virtuals for dates</a>
</li>
</li>
<li><a href=https://mongoosejs.com/docs/api/model.html#model_Model-findByIdAndUpdate>Mongoose findByIdAndUpdate</a>
</li>
<li><a href=https://jestjs.io/docs/expect#rejects>Jest throw rejects</a>
</li>
<li><a href=https://www.freecodecamp.org/news/how-to-test-in-express-and-mongoose-apps>Unit testing using Jest in express</a>
</li>
<li><a href=https://stackoverflow.com/questions/60899999/is-there-any-other-method-for-deleting-a-data-in-mongoose-after-a-given-time>Deleting a data after a given time in mongoose</a>
</li>
<br>

## Application Asset Attribution
The CSS in this project does not belong to me. All rights belong to the original artists and owners. Below are the links to the CSS used in this project:
<li><a href=https://codepen.io/alvaromontoro/pen/JjoWVmx>Login form CSS from Codepen</a>
</li>
<li><a href=https://codepen.io/sanketbodke/pen/LYyzzYb>Nav Bar CSS from Codepen</a>
</li>

