// Step 1: Import the 'express' library to create a router.
const express = require('express');

// Step 2: Create an instance of the Express Router.
const router = express.Router();

// Step 3: Import the 'passport' library for authentication purposes.
const passport = require('passport');

// Step 4: Import the 'studentsController' which contains controller functions for handling student-related actions.
const studentsController = require('../controllers/students_controller');

// Step 5: Define routes for handling various student-related actions.

// - Route 1: Handling GET requests to the root URL ('/').
//   It is protected by the 'passport.checkAuthentication' middleware to ensure only authenticated users can access it.
router.get('/', passport.checkAuthentication, studentsController.students);

// - Route 2: Handling POST requests to '/create'.
//   It is used for creating a new student and is protected by the 'passport.checkAuthentication' middleware.
router.post('/create', passport.checkAuthentication, studentsController.create);

// - Route 3: Handling GET requests to '/destroy'.
//   It is used for deleting a student and is protected by the 'passport.checkAuthentication' middleware.
router.get('/destroy', passport.checkAuthentication, studentsController.destroy);

// - Route 4: Handling GET requests to '/update/:id'.
//   It is used for rendering a page to update student information and is protected by the 'passport.checkAuthentication' middleware.
//   ':id' is a placeholder for the student ID.
router.get('/update/:id', passport.checkAuthentication, studentsController.update);

// Step 6: Export the router for this module to be used elsewhere in the application.
module.exports = router;
