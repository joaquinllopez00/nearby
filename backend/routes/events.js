const router = require("express").Router();
const Event = require("../models/Events");

import { v4 as uuidv4 } from "uuid";

import mongoose from "mongoose";

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    console.log(events);
    res.status(200).json(events);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const newEvent = new Event({
    title: req.body.title,
    eventId: uuidv4(),
    address: req.body.address,
    location: req.body.location,
    private: req.body.private,
    password: req.body.password,
    participants: [],
    time: req.body.time,
    type: req.body.type,
    date: req.body.date,
    description: req.body.description,
    host: req.body.host,
    hostId: req.body.hostId,
  });

  try {
    const saveEvent = await newEvent.save();
    console.log(saveEvent, "Save Event");
    res.status(200).json({ message: "Event Created" });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.patch("/", async (req, res) => {
  console.log(req.body.id, "id");
  try {
    let event = await Event.findOneAndUpdate(
      { eventId: req.body.id },
      { participants: req.body.participants },
      { new: true },
    );
    event = await Event.findOne({ eventId: req.body.id });
    console.log(event);
    res.json({ message: "Worked", updatedEvent: event });
  } catch (err) {
    res.json({ message: err.message });
  }
});
module.exports = router;
