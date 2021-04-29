import express from "express";
import mongoose from "mongoose";
import cors from "cors";

//require routes
const eventRoute = require("./routes/events");
const userRoute = require("./routes/authentication");
const port = 4000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/events", eventRoute);
app.use("/user", userRoute);
const connectToDb = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://joaquinllopezzz:Promises12!@nearby.ocnk0.mongodb.net/NearbyData?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
      () => {
        console.log("Connected to Database");
      },
    );
  } catch (err) {
    console.log({ message: err.message });
  }
};

app.get("/", (req, res) => {
  res.json("GET REQUESTS WORKING");
});

app.listen(port, async () => {
  await connectToDb();
  console.log(`Running on ${port}`);
});
