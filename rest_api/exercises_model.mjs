import mongoose from "mongoose";
import "dotenv/config";

// Made by: Johnny Klucinec

mongoose.connect(process.env.MONGODB_CONNECT_STRING, { useNewUrlParser: true });

const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
  name: { type: String, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  unit: { type: String, required: true },
  date: { type: String, required: true },
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

const createExercise = async (name, reps, weight, unit, date) => {
  if (isNotValid(weight, date, reps)) {
    const exercise = new Exercise({
      name: name,
    });
    return exercise.save();
  }
  const exercise = new Exercise({
    name: name,
    reps: reps,
    weight: weight,
    unit: unit,
    date: date,
  });
  return exercise.save();
};

/**
 *
 * @param {string} date
 * Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
 */
function isDateValid(date) {
  const format = /^\d\d-\d\d-\d\d$/;
  return format.test(date);
}

function isMonthValid(date) {
  const month = parseInt(JSON.stringify(date).slice(1, 3));
  if (month <= 0 || month > 12) {
    return false;
  } else {
    return true;
  }
}

function isDayValid(date) {
  const day = parseInt(JSON.stringify(date).slice(4, 6));
  const month = parseInt(JSON.stringify(date).slice(1, 3));
  const maxDays = checkDays(month);
  if (day <= 0 || day > maxDays) {
    return false;
  } else {
    return true;
  }
}

/**
 * Calculate max number of days in a given month
 */
function checkDays(x) {
  return 28 + ((x + Math.floor(x / 8)) % 2) + (2 % x) + 2 * Math.floor(1 / x);
}

/**
 * Checks to see of values are valid
 */
function isNotValid(weight, date, reps) {
  if (weight <= 0 || reps <= 0 || !isDateValid(date)) {
    return true;
  } else {
    if (!isMonthValid(date) || !isDayValid(date)) {
      return true;
    }
    return false;
  }
}

/**
 * Checks to see if input contains all the properties
 */
function containsAllProperties(data) {
  if (
    typeof data.name == "undefined" ||
    typeof data.reps == "undefined" ||
    typeof data.weight == "undefined" ||
    typeof data.unit == "undefined" ||
    typeof data.date == "undefined"
  ) {
    return false;
  } else {
    return true;
  }
}
/**
 * Get all of the exercises
 */
const getExercises = async (filter) => {
  const query = Exercise.find(filter);
  return query.exec();
};

/**
 * Get an exercise given a spesific ID
 */
const findExerciseById = async (filter) => {
  const query = Exercise.find({ _id: filter });
  return query.exec();
};

/**
 * Update exercise info
 */

const updateExercise = async (filter, update) => {
  if (isNotValid(update.weight, update.date, update.reps)) {
    return -1;
  }

  if (!containsAllProperties(update)) {
    return -1;
  }

  const result = await Exercise.updateOne(
    { _id: filter },
    {
      name: update.name,
      reps: update.reps,
      weight: update.weight,
      unit: update.unit,
      date: update.date,
    }
  );
  return result.modifiedCount;
};

/**
 * Delete an exercise
 */

const deleteExercise = async (filter) => {
  const result = await Exercise.deleteMany({ _id: filter });
  return result.deletedCount;
};

export {
  createExercise,
  getExercises,
  findExerciseById,
  updateExercise,
  deleteExercise,
};
