// Step 1: Import the 'express' library to create a router.
const express = require('express');

// Step 2: Create an instance of the Express Router.
const router = express.Router();

// Step 3: Import the 'passport' library for authentication purposes.
const passport = require('passport');

// Step 4: Import the 'csvController' which contains the export function.
const csvController = require('../controllers/csv_controller');

// Step 5: Define a route for handling GET requests to the '/export' URL.
router.get('/export', passport.checkAuthentication, csvController.export);

// Step 6: Export the router to be used in other parts of the application.
module.exports = router;
