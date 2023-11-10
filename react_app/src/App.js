import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddExercisePage from "./pages/AddExercisePage";
import EditExercisePage from "./pages/EditExercisePage";
import Navigation from "./components/Navigation";
import { useState } from "react";

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <div className="App">
      <header>
        <h1>Exercise Tracker</h1>
        <h4>Full Stack MERN App Demonstration</h4>
      </header>
      <Router>
        <div className="App-header">
          <div className="Menu">
            <Navigation />
          </div>
          <Routes>
            <Route
              path="/"
              element={<HomePage setExerciseToEdit={setExerciseToEdit} />}
            />
            <Route 
              path="/add-exercise" 
              element={<AddExercisePage />}
            />
            <Route
              path="/edit-exercise"
              element={<EditExercisePage exerciseToEdit={exerciseToEdit} />}
            />
          </Routes>
        </div>
      </Router>
      <footer>
        <h4>© 2024 John Klucinec</h4>
      </footer>
    </div>
  );
}

export default App;
