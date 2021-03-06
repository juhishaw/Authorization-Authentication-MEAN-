const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  /* Credentials */
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

  privilege: {
    type: String,
    required: true,
  },

  /* For expiring JWTs */
  sessions: {
    type: Array,
    required: true,
    default: [],
  },

  /* Password resets */
  resetPasswordToken: {
    type: String,
    default: null,
  },

  resetPasswordTokenExpires: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
mongoose.models = {};
module.exports = mongoose.model("User", schema);
