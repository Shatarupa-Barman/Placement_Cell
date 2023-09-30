//Import the 'User' model.
const User = require('../models/user');

// Define a controller function to render the 'sign-up' page.
module.exports.signUp = function(req, res){
    //  Check if the user is already authenticated. If so, redirect them back.
    if (req.isAuthenticated()) {
        return res.redirect('back');
    }

    // Render the 'user_signup' view for user registration.
    return res.render('user_signup', {
        title: "Placement Cell | Sign Up"
    });
}

// Define a controller function to render the 'sign-in' page.
module.exports.signIn = function(req, res){
    // Check if the user is already authenticated. If so, redirect them back.
    if (req.isAuthenticated()) {
        return res.redirect('back');
    }

    // Render the 'user_signin' view for user login.
        return res.render('user_signin', {
        title: "Placement Cell | Sign In"
    });
}

// Define a controller function to handle user registration.
module.exports.create = async function(req, res){
    // Check if the provided password and confirm password match. If not, redirect back with an error message.
    if(req.body.password != req.body.confirm_password){
       console.log('Passwords do not match');
        return res.redirect('back');
    }

    try{
        // Check if a user with the provided email already exists in the database.
        let user = await User.findOne({email: req.body.email});
    
        //  If the user doesn't exist, create a new user with the provided data.
        if(!user){
            user = await User.create(req.body);
            console.log(user);
            return res.redirect('/users/sign-in');
        }
        else{
            //  Handle the case where a user with the same email already exists.
            console.log('User already exists with this email');
            res.redirect('back');
        }
    }
    catch(err){
        //Handle any errors that occur during user creation.
        console.log('Error something went wrong', err);
    };
}

//  Define a controller function to handle user login and create a user session.
module.exports.createSession = function(req, res){
    // Flash a success message and log that the user has logged in successfully.
    console.log('Logged in Successfully');

    // Redirect the user to the homepage.
    return res.redirect('/');
}

// Define a controller function to handle user logout and destroy the user session.
module.exports.destroySession = function(req, res){
    // Use the 'logout' function provided by Passport to log the user out.
    req.logout(function(err) {
        // Flash an error message if something goes wrong during logout.
        if(err) console.log('Something went wrong');
    });
    
    // Flash a success message and log that the user has been logged out.
    console.log('Logged out successfully');

    // Redirect the user to the homepage.
    return res.redirect('/');
}
