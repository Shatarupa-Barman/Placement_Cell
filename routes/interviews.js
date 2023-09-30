// Step 1: Import the 'express' library to create a router.
const express = require('express');

// Step 2: Create an instance of the Express Router.
const router = express.Router();

// Step 3: Import the 'passport' library for authentication purposes.
const passport = require('passport');

// Step 4: Import the 'interviewsController' which contains controller functions for handling interviews-related actions.
const interviewsController = require('../controllers/interviews_controller');

// Step 5: Define routes for handling various interview-related actions.

// - Route 1: Handling GET requests to the root URL ('/').
//   It is protected by the 'passport.checkAuthentication' middleware to ensure only authenticated users can access it.
router.get('/', passport.checkAuthentication, interviewsController.interviews);

// - Route 2: Handling POST requests to '/create'.
//   It is used for creating a new interview and is protected by the 'passport.checkAuthentication' middleware.
router.post('/create', passport.checkAuthentication, interviewsController.create);

// - Route 3: Handling GET requests to '/destroy'.
//   It is used for deleting an interview and is protected by the 'passport.checkAuthentication' middleware.
router.get('/destroy', passport.checkAuthentication, interviewsController.destroy);

// - Route 4: Handling POST requests to '/add-student/:id'.
//   It is used for adding a student to an interview and is protected by the 'passport.checkAuthentication' middleware.
//   ':id' is a placeholder for the interview ID.
router.post('/add-student/:id', passport.checkAuthentication, interviewsController.addStudent);

// - Route 5: Handling GET requests to '/remove-student/:studentId/:interviewId'.
//   It is used for removing a student from an interview and is protected by the 'passport.checkAuthentication' middleware.
//   ':studentId' and ':interviewId' are placeholders for the student and interview IDs.
router.get('/remove-student/:studentId/:interviewId', passport.checkAuthentication, interviewsController.removeStudent);

// Step 6: Export the router for this module to be used elsewhere in the application.
module.exports = router;
