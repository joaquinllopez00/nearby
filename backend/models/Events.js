import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EventsSchema = Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  private: {
    type: Boolean,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: Array,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  participants: {
    type: Array,
    default: [],
  },
  host: {
    type: String,
    required: true,
  },
  hostId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Events", EventsSchema);
