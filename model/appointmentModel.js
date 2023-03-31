const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    customerName: { type: String, required: true },
    location: {
      id: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    },
  
    makeupArtist: {
      id: { type: Schema.Types.ObjectId, ref: 'MakeupArtist', required: true },
    },
    
    customerInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    date: {
      type: Date,
      required: true,
    },
    timeslot: {
      type: String,
      required: true,
    },
  });
  
  module.exports = mongoose.model('Appointment', AppointmentSchema);