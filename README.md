# Exercise Tracker

A full-stack MERN application for tracking exercises!

## Features
  * Full-stack MERN application (MongoDB, Express.js, React.js, and Node.js)
  * Robust data validation on the server side
  * RESTful API for managing exercises
  * Uses React Router for seamless navigation between different components
  * Modern JavaScript features such as ES6 syntax and the useState React Hook for state management

## Supported commands and features

### Routes
  * "/" - Displays the homepage which shows all the exercises
  * "/add-exercise" - Allows the user to add a new exercise
  * "/edit-exercise" - Allows the user to edit an existing exercise

### Server Endpoints
  * POST "/exercises" - Creates a new exercise with the name, reps, weight, unit, and date provided in the request body
  * GET "/exercises/:_id" - Retrieves the exercise corresponding to the ID provided in the URL
  * GET "/exercises" - Retrieves all exercises
  * PUT "/exercises/:_id" - Updates the exercise whose id is provided in the path parameter and sets its name, reps, weight, unit, and date to the values provided in the request body
  * DELETE "/exercises/:_id" - Deletes the exercise whose id is provided in the path parameter
