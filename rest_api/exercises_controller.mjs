import "dotenv/config";
import * as exercises from "./exercises_model.mjs";
import express from "express";
// Made by: Johnny Klucinec

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Create a new exercise with the name, reps, weight, unit, and date provided in the body
 */
app.post("/exercises", (req, res) => {
  exercises
    .createExercise(
      req.body.name,
      req.body.reps,
      req.body.weight,
      req.body.unit,
      req.body.date
    )
    .then((exercise) => {
      res.status(201).json(exercise);
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ Error: "Invalid request" });
    });
});

/**
 * Retrive the exercise corresponding to the ID provided in the URL.
 */
app.get("/exercises/:_id", (req, res) => {
  const exerciseId = req.params._id;
  exercises
    .findExerciseById(exerciseId)
    .then((exercise) => {
      if (exercise !== null && Object.keys(exercise).length != 0) {
        res.json(exercise);
      } else {
        res.status(404).json({ Error: "Not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ Error: "Invalid request" });
    });
});

/**
 * Retrieve exercises.
 */
app.get("/exercises", (req, res) => {
  let filter = {};
  exercises
    .getExercises(filter, "", 0)
    .then((exercises) => {
      res.send(exercises);
    })
    .catch((error) => {
      console.error(error);
      res.send({ Error: "Invalid request" });
    });
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its name, reps, weight, unit, and date to the values provided in the body.
 */
app.put("/exercises/:_id", (req, res) => {
  exercises
    .updateExercise(req.params._id, {
      name: req.body.name,
      reps: req.body.reps,
      weight: req.body.weight,
      unit: req.body.unit,
      date: req.body.date,
    })
    .then((numUpdated) => {
      if (numUpdated === 1) {
        res.json({
          _id: req.params._id,
          name: req.body.name,
          reps: req.body.reps,
          weight: req.body.weight,
          unit: req.body.unit,
          date: req.body.date,
        });
      } else if (numUpdated === -1) {
        res.status(400).json({ Error: "Invalid request" });
      } else {
        res.status(404).json({ Error: "Not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ Error: "Invalid request" });
    });
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete("/exercises/:_id", (req, res) => {
  exercises
    .deleteExercise(req.params._id)
    .then((deletedCount) => {
      if (deletedCount === 1) {
        res.status(204).send();
      } else {
        res.status(404).json({ Error: "Resource not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.send({ error: "Invalid request" });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
