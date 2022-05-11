const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const SubscriberSchema = new mongoose.Schema({
  // subId: Number,
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },

});


// SubscriberSchema.plugin(AutoIncrement);
const Subscriber = mongoose.model("Subscriber", SubscriberSchema);

module.exports = Subscriber;
