import React from "react";
import ExerciseList from "../components/ExerciseList";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Load the home page
 */

function HomePage({ setExerciseToEdit }) {
  const navigate = useNavigate();
  const [exercises, setExercise] = useState([]);

  /**
   * Update the exercises
   */
  const onDelete = async (_id) => {
    const response = await fetch(`/exercises/${_id}`, { method: "DELETE" });
    if (response.status === 204) {
      setExercise(exercises.filter((m) => m._id !== _id));
    } else {
      console.error(
        `Failed to delete exercise with id = ${_id}, status code = ${response.status}`
      );
    }
  };

  const onEdit = async (exerciseToEdit) => {
    setExerciseToEdit(exerciseToEdit);
    navigate("/edit-exercise");
  };

  const loadExercises = async () => {
    const response = await fetch("/exercises");
    const data = await response.json();
    setExercise(data);
  };

  useEffect(() => {
    loadExercises();
  }, []);

  return (
    <>
      <h2>List of Exercises</h2>
      <ExerciseList
        exercises={exercises}
        onDelete={onDelete}
        onEdit={onEdit}
      ></ExerciseList>
    </>
  );
}

export default HomePage;
