// Step 1: Import the 'mongoose' library.
const mongoose = require('mongoose');

// Step 2: Define a schema for the 'interview' data model.
const interviewSchema = new mongoose.Schema({
    // Step 3: Define a field 'company' of type String which is required.
    company: {
        type : String,
        required : true
    },
    
    // Step 4: Define a field 'date' of type Date which is required.
    date: {
        type : Date,
        required : true
    },
    
    // Step 5: Define a field 'students' which is an array of objects.
    students: [
        {
            // Step 6: Within 'students', define a subfield 'student' of type ObjectId which references the 'Student' model.
            student: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
                required: true,
            },  
            
            // Step 7: Define a subfield 'result' of type String with predefined values ("PASS", "FAIL", "Didn't Attempt", "On Hold").
            result: {
                type: String,
                enum: ["PASS", "FAIL", "Didn't Attempt", "On Hold"],
                default: "On Hold",
            },
        },
    ],
}
// Step 8: Add timestamps to the schema to automatically track 'createdAt' and 'updatedAt' fields.
,{timestamps: true});

// Step 9: Create a mongoose model named 'Interview' based on the defined schema.
const Interview = mongoose.model('Interview', interviewSchema);

// Step 10: Export the 'Interview' model to be used in other parts of the application.
module.exports = Interview;
