// Step 1: Require necessary modules: passport, passport-local strategy, and the User model.
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

// Step 2: Define an authentication strategy using passport-local.
passport.use(new LocalStrategy({
    // Step 3: Specify the field in the request (typically a form field) that contains the username (in this case, 'email').
    usernameField: 'email',
    passReqToCallback: true // This option allows you to pass the entire request to the callback function.
}, async function(req, email, password, done) {
    try {
        // Step 4: Attempt to find a user with the provided email in the database.
        let user = await User.findOne({ email: email });

        // Step 5: If the user doesn't exist or the password is incorrect, return an error message and 'false' to indicate authentication failure.
        if (!user || user.password != password) { 
            req.flash('error', 'Invalid Username/Password');
            return done(null, false); 
        }

        // Step 6: If authentication is successful, return the user object to indicate success.
        return done(null, user);
    }
    catch(err) {
        // Step 7: If an error occurs during authentication, return an error and flash an error message.
        req.flash('error', "Something went wrong");
        return done(err);
    }
}));

// Step 8: Serialize the user to determine what data should be stored in the session cookie.
passport.serializeUser(function(user, done) {
    return done(null, user.id);
});

// Step 9: Deserialize the user from the session cookie.
passport.deserializeUser(async function(id, done) {
    try {
        // Step 10: Find the user by their ID in the database.
        let user = await User.findById(id);

        // Step 11: Return the user object to populate 'req.user' with the current user.
        return done(null, user);
    }
    catch(err) {
        // Step 12: If an error occurs while deserializing the user, log an error.
        console.log('Error in finding user Passport');
        return done(err);
    }
});

// Step 13: Define a custom middleware to check if the user is authenticated.
passport.checkAuthentication = function(req, res, next) {
    // Step 14: If the user is authenticated, pass the request to the next middleware (controller's action).
    if(req.isAuthenticated()){
        return next();
    }

    // Step 15: If the user is not authenticated, redirect them to the sign-in page.
    return res.redirect('/users/sign-in');
}

// Step 16: Define middleware to set the authenticated user in res.locals for use in views.
passport.setAuthenticatedUser = function(req, res, next) {
    if(req.isAuthenticated()){
        // Step 17: Add the authenticated user to res.locals to make it available in views.
        res.locals.user = req.user;
    }

    next();
}

// Step 18: Export the configured passport object for use in other parts of the application.
module.exports = passport;
