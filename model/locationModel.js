const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    name: { type: String, required: true },
   
    Products: [{
        type: Schema.Types.ObjectId, 
        ref: 'Products', 
    }],
  });
  
  const Location = mongoose.model('Location', locationSchema);
  module.exports = Location
