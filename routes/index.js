// Step 1: Import the 'express' library to create a router.
const express = require('express');

// Step 2: Create an instance of the Express Router.
const router = express.Router();

// Step 3: Import the 'passport' library for authentication purposes.
const passport = require('passport');

// Step 4: Import the 'homeController' which contains controller functions for the home route.
const homeController = require('../controllers/home_controller');

// Step 5: Define a route for handling GET requests to the root URL ('/').
//         It is protected by the 'passport.checkAuthentication' middleware to ensure only authenticated users can access it.
router.get('/', passport.checkAuthentication, homeController.home);

// Step 6: Define additional routes for various modules such as users, students, interviews, csv, and jobs.
//         These routes are defined using 'router.use', which includes routes from separate files.
router.use('/users', require('./users'));
router.use('/students', require('./students'));
router.use('/interviews', require('./interviews'));
router.use('/csv', require('./csv'));
router.use('/jobs', require('./jobs'));

// Step 7: Export the main router to be used as the entry point for the application.
module.exports = router;
