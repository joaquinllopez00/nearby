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
  name: {
    type: String,
    required: false,
    default: "",
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  friends: {
    type: Number,
    default: 0,
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
