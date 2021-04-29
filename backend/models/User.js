import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  id: {
    type: String,
    required: true,
  },
  eventsCompeleted: {
    type: Array,
    default: [],
  },
  description: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", UserSchema);
