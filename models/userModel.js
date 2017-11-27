const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newSchema = new Schema({
   name: String,
   email: String,
   password: String,
   accountSettings: {
     city: String,
     state: String
   },
   bookData: {
      title: String,
      owner: String,
      thumbnail: String,
      requested_to_trade: { type: Boolean, default: false }
   },
   tradeRequest: {
      id: String,
      myEmail: String,
      requestedEmail: String,
      title: String,
      accepted: {type: Boolean, default: false } 
   }
});

const modelClass = mongoose.model('userModel', newSchema);

module.exports = modelClass;
