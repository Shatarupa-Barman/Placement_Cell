// Step 1: Import the 'mongoose' library.
const mongoose = require('mongoose');

// Step 2: Define a schema for the 'student' data model.
const studentSchema = new mongoose.Schema({
    // Step 3: Define a field 'name' of type String which is required.
    name: {
        type : String,
        required : true
    },
    
    // Step 4: Define a field 'email' of type String which is required.
    email: {
        type : String,
        required : true
    },
    
    // Step 5: Define a field 'batch' of type String which is required.
    batch: {
        type : String,
        required : true
    },
    
    // Step 6: Define a field 'college' of type String which is required.
    college: {
        type : String,
        required : true
    },
    
    // Step 7: Define a field 'status' of type String with predefined values ('placed', 'not placed') which is required.
    status: {
        type : String,
        enum : ['placed', 'not placed'],
        required : true
    },
    
    // Step 8: Define a field 'dsa_score' of type Number which is required.
    dsa_score: {
        type : Number,
        required : true
    },
    
    // Step 9: Define a field 'webd_score' of type Number which is required.
    webd_score: {
        type : Number,
        required : true
    },
    
    // Step 10: Define a field 'react_score' of type Number which is required.
    react_score: {
        type : Number,
        required : true
    },
    
    // Step 11: Define a field 'interviews' which is an array of objects.
    interviews: [
        {
            // Step 12: Within 'interviews', define a subfield 'company' of type ObjectId which references the 'Interview' model.
            company: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Interview",
            },
            
            // Step 13: Define a subfield 'result' of type String with predefined values ("PASS", "FAIL", "Didn't Attempt", "On Hold").
            result: {
                type: String,
                enum: ["PASS", "FAIL", "Didn't Attempt", "On Hold"],
            },
        },
    ],
}
// Step 14: Add timestamps to the schema to automatically track 'createdAt' and 'updatedAt' fields.
,{timestamps: true});

// Step 15: Create a mongoose model named 'Student' based on the defined schema.
const Student = mongoose.model('Student', studentSchema);

// Step 16: Export the 'Student' model to be used in other parts of the application.
module.exports = Student;
