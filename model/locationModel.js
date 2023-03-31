const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    name: { type: String, required: true },
   
    Products: {
        type: Array, 
        default: [],
        ref: 'Products', 
    },
  });
  
  const Location = mongoose.model('Location', locationSchema);
  module.exports = Location
