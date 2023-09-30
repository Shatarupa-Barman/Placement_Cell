// Step 1: Import the 'express' library to create a router.
const express = require('express');

// Step 2: Create an instance of the Express Router.
const router = express.Router();

// Step 3: Import the 'passport' library for authentication purposes.
const passport = require('passport');

// Step 4: Import the 'jobsController' which contains controller functions for handling job-related actions.
const jobsController = require('../controllers/jobs_controller');

// Step 5: Define a route for handling GET requests to the root URL ('/').
//   It is protected by the 'passport.checkAuthentication' middleware to ensure only authenticated users can access it.
router.get('/', passport.checkAuthentication, jobsController.home);

// Step 6: Export the router for this module to be used elsewhere in the application.
module.exports = router;
