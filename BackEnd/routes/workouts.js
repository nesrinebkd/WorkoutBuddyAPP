const express = require("express");
const Workout = require("../models/workout");
const { createWorkout ,getAllworkouts, getAworkout,deleteAworkout,updateworkout} = require("../controllers/workoutController");
// create an instance of the router
const router = express.Router();
// GET all workouts
router.get("/", getAllworkouts);
//GET a single workout
router.get("/:id", getAworkout);

// POST a new workout
router.post("/", createWorkout);

//DELETE a workout
router.delete("/:id", deleteAworkout);

// UPDATE a workout
router.patch("/:id", updateworkout);
module.exports = router;
