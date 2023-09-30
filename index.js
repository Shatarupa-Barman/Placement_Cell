//Import required modules and create an Express application.
const express = require('express');
const app = express();
const port = process.env.PORT || 8000; // Define the port for the server to listen on.
const db = require('./config/mongoose'); // Mongoose setup for connecting to MongoDB.
const session = require('express-session'); // Express session middleware for managing user sessions.
const passport = require('passport'); // Passport.js for authentication.
const passportLocal = require('./config/passport-local-strategy'); // Passport Local Strategy setup.
const MongoStore = require('connect-mongo'); // Connect Mongo for storing session data in MongoDB.
const expressLayouts = require('express-ejs-layouts'); // Express EJS layouts for layout support.
const flash = require('connect-flash'); // Connect Flash for flash messages.
const customMware = require('./config/middleware'); // Custom middleware setup.

//Configure middleware for handling form data.
app.use(express.urlencoded({ extended: true }));

//Configure session middleware to manage user sessions.
app.use(
    session({
        name: 'Placementcell', // Name of the session cookie.
        secret: 'secretone', // Secret key for session cookie encryption.
        saveUninitialized: false, // Don't save uninitialized sessions.
        resave: false, // Don't save sessions that haven't been modified.
        cookie: {
            maxAge: 1000 * 60 * 100, // Session cookie expiration time (100 minutes).
        },
        store: MongoStore.create(
            {
                mongoUrl: 'mongodb+srv://shatabarman3:5J46BAQg6RLClnll@cluster.htctynm.mongodb.net/Placement_Cell?retryWrites=true&w=majority', // MongoDB connection URL.
                autoRemove: 'disabled', // Disable session auto removal.
            },
            function (err) {
                console.log(err || 'connect-mongodb setup ok');
            }
        ),
    })
);

//Initialize Passport and set up Passport user sessions.
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//Use Connect Flash for flash messages.
app.use(flash());
app.use(customMware.setflash);

//Configure Express Layouts middleware.
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Make the "/uploads" path available to the browser for static file serving.
app.use('/uploads', express.static(__dirname + '/uploads'));

//Set the view engine and views directory for EJS templates.
app.set('view engine', 'ejs');
app.set('views', './views');

//Serve static assets from the "./assets" directory.
app.use(express.static('./assets'));

//Use the defined routes for handling HTTP requests.
app.use('/', require('./routes'));

//Start the server and listen on the specified port.
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
});
