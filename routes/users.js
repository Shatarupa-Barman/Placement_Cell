// Step 1: Import the 'express' library to create a router.
const express = require('express');

// Step 2: Create an instance of the Express Router.
const router = express.Router();

// Step 3: Import the 'passport' library for authentication purposes.
const passport = require('passport');

// Step 4: Import the 'usersController' which contains controller functions for handling user-related actions.
const usersController = require('../controllers/users_controller');

// Step 5: Define routes for handling various user-related actions.

// - Route 1: Handling GET requests to '/sign-up'.
//   It is associated with the 'usersController.signUp' function and is used to render the sign-up page.
router.get('/sign-up', usersController.signUp);

// - Route 2: Handling GET requests to '/sign-in'.
//   It is associated with the 'usersController.signIn' function and is used to render the sign-in page.
router.get('/sign-in', usersController.signIn);

// - Route 3: Handling POST requests to '/create'.
//   It is associated with the 'usersController.create' function and is used for user registration.
router.post('/create', usersController.create);

// - Route 4: Handling POST requests to '/create-session'.
//   It uses the 'passport.authenticate' middleware to authenticate users locally.
//   If authentication fails, it redirects to the sign-in page ('/users/sign-in').
//   If authentication succeeds, it calls 'usersController.createSession' to create a user session.
router.post('/create-session', passport.authenticate(
    'local', // Local authentication strategy
    { failureRedirect: '/users/sign-in' }, // Redirect on failure
), usersController.createSession);

// - Route 5: Handling GET requests to '/sign-out'.
//   It is associated with the 'usersController.destroySession' function and is used for user logout.
router.get('/sign-out', usersController.destroySession);

// Step 6: Export the router for this module to be used elsewhere in the application.
module.exports = router;
