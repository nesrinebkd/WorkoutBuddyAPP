require("dotenv").config();
const express = require("express");
const workoutRoutes  = require("./routes/workouts");
const mongoose = require("mongoose");

const app = express(); // create a express app

//middleware
app.use(express.json()); // any request that come it check if the request has a body
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);
//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connecting to DB and Listening to port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
