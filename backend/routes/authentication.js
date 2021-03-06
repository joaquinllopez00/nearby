const router = require("express").Router();
const User = require("../models/User");

import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { registerValidation } from "../validation/Validation";
router.post("/register", async (req, res) => {
  console.log("line 9");
  const { error } = registerValidation(req.body);
  if (error) return res.json({ message: error.details[0] }.message);

  const emailExist = await User.findOne({ email: req.body.email });
  console.log();
  if (emailExist) return res.json({ message: "Email is already associated with another account" });

  const userNameExist = await User.findOne({ email: req.body.email });
  if (userNameExist) return res.json({ message: "Username taken" });
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    id: uuidv4(),
    password: hashed,
    friends: 0,
    name: "",
    // eventsCompleted: req.body.eventsCompleted,
    // description: req.body.description,
  });
  try {
    const savedUser = await user.save();
    res.status(200).json({ message: "Account Created! Sign in to access your account." });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.json({
      message: "Invalid Username",
    });
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.json({ message: "Invalid Password" });
  res.json({ message: "Logged In!", user: user });
});

//edit profile
router.patch("/", async (req, res) => {
  try {
    let user = await User.findOneAndUpdate(
      { username: req.body.OriginalUsername },
      {
        $set: {
          username: req.body.username,
          name: req.body.name,
          description: req.body.description,
        },
      },
      { new: true },
    );
    user = await User.findOne({ username: req.body.username });

    res.json({ message: "Worked", updatedUser: user });
  } catch (err) {
    res.json({ message: err.message });
  }
});
module.exports = router;
