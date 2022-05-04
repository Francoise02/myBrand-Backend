const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema({
    _id: Number,
    username: {
    type: String,
    required: true,
  },
    email: {
        type: String,
        required: true,
        unique: true
  },
  password: {
        type: String,
        required: true,
  },
});


UserSchema.plugin(AutoIncrement);
const User = mongoose.model("User", UserSchema);

module.exports = User;