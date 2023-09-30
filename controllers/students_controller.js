// Import the 'Student' and 'Interview' models.
const Student = require('../models/student');
const Interview = require('../models/interview');

//Define a controller function to render the 'add student/update student' page.
module.exports.students = async function(req, res){
    //Check if a student ID is provided in the query parameters.
    if(req.query.id){
        // If a student ID is provided, retrieve the student by their ID from the database.
        let student = await Student.findById(req.query.id);
        console.log(student);
        console.log(req.query.id);

        // Render the 'student' view with the student data for updating.
        return res.render('student', {
            title: "Placement Portal| Student",
            student: student,
        });
    }

    //  If no student ID is provided, render the 'student' view with no student data (for adding a new student).
    return res.render('student', {
        title: "Placement Portal| Student",
        student: null,
    });
}

//  Define a controller function to create or update a student in the database.
module.exports.create = async function(req, res){
    try {
        //Check if a student with the provided email already exists in the database.
        let student = await Student.findOne({email: req.body.email});

        if (student) {
            console.log('Student already exists');
            
            // If the student exists, update their information with data from the request body.
            student = await student.updateOne({
                name: req.body.name,
                email: req.body.email,
                batch: req.body.batch,
                college: req.body.college,
                status: req.body.status,
                dsa_score: req.body.dsa_score,
                webd_score: req.body.webd_score,
                react_score: req.body.react_score,
            });

            console.log('Student is updated successfully');
            req.flash('success', 'Student updated successfully');
            return res.redirect('/');
        }

        //If the student doesn't exist, create a new student document in the database.
        student = await Student.create({
            name: req.body.name,
            email: req.body.email,
            batch: req.body.batch,
            college: req.body.college,
            status: req.body.status,
            dsa_score: req.body.dsa_score,
            webd_score: req.body.webd_score,
            react_score: req.body.react_score,
        });

        if (student) {
            console.log('Student is created successfully');
            req.flash('success', 'Student created successfully');
            return res.redirect('/');
        }
        else{
            req.flash('error', 'Error in creating student');
            console.log('Error in creating student');
            return;
        }
    } 
    catch (err) {
        //  Handle any errors that occur during the student creation/update process.
        req.flash('error', 'Error in creating student');
        console.log('Error', err);
        return;
    }
}

// Define a controller function to remove a student from the database.
module.exports.destroy = async function(req, res){
    try {
        // Find the student by their ID.
        let student = await Student.findById(req.query.id);

        if (student) {
            // Iterate through the student's interview records and remove references to the student.
            for(let i=0; i<student.interviews.length; i++){
                let interview = await Interview.findById(student.interviews[i]);
                if(interview){
                    for(let j=0; j<interview.students.length; j++){
                        if(interview.students[j] == req.query.id){
                            interview.students.splice(j, 1);
                            break;
                        }
                    }
                }
            }

            // Delete the student document from the database.
            student.deleteOne();
            req.flash('success', 'Student deleted successfully');
            console.log('Student deleted successfully');
            return res.redirect('back');
        }
        else{
            // Handle the case where the student is not found.
            req.flash('error', 'Error in deleting student');
            console.log('Error in deleting student');
            return;
        }
    } 
    catch (err) {
        //Handle any errors that occur during the student deletion process.
        req.flash('error', 'Error in deleting student');
        console.log('Error', err);
        return;
    }
}

// Define a controller function to render the 'update student' page.
module.exports.update = async function(req, res){
    try{
        //Find the student by their ID.
        let student = await Student.findById(req.params.id); 

        // Render the 'update-student' view with the student data for updating.
        req.flash('success', 'Student updated successfully');
        console.log('Student updated successfully');
        return res.render('update-student', {
            title: "Placement Portal| Update Student",
            student: student,
        });
    }
    catch(err){
        // Handle any errors that occur during the process.
        req.flash('error', 'Error in updating student');
        console.log(err);
        return;
    }
}
