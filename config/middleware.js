// This is a middleware function designed to set flash messages in the res.locals object.

// Step 1: Export the setflash function as a module so it can be used elsewhere.
module.exports.setflash = function(req, res, next){

    // Step 2: Create an object called 'flash' in the res.locals to store flash messages.
    res.locals.flash = {
        // Step 3: Set a 'success' property in the 'flash' object with the value of the 'success' flash message from the request.
        'success': req.flash('success'),

        // Step 4: Set an 'error' property in the 'flash' object with the value of the 'error' flash message from the request.
        'error': req.flash('error')
    }

    // Step 5: Call the 'next' function to pass control to the next middleware in the chain.
    next();
}
