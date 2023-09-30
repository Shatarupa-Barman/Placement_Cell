// Step 1: Import the 'mongoose' library.
const mongoose = require('mongoose');

// Step 2: Define a schema for the 'user' data model.
const userSchema = new mongoose.Schema({
    // Step 3: Define a field 'email' of type String which is required and must be unique.
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    // Step 4: Define a field 'password' of type String which is required.
    password: {
        type: String,
        required: true
    },
    
    // Step 5: Define a field 'name' of type String which is required.
    name: {
        type: String,
        required: true
    },
},
// Step 6: Add timestamps to the schema to automatically track 'createdAt' and 'updatedAt' fields.
{ timestamps: true });

// Step 7: Create a mongoose model named 'User' based on the defined schema.
const User = mongoose.model('User', userSchema);

// Step 8: Export the 'User' model to be used in other parts of the application.
module.exports = User;
