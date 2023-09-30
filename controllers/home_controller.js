// Import the 'Student' and 'Interview' models.
const Student = require('../models/student');
const Interview = require('../models/interview');

//Define a controller function to render the homepage/dashboard.
module.exports.home = async function(req, res){
    try {
        //  Retrieve all students from the database and populate their 'interviews' field with 'company' and 'result'.
        let students = await Student.find({}).populate('interviews.company interviews.result');

        // Retrieve all interviews from the database and populate their 'students' field with 'student' and 'result'.
        let interviews = await Interview.find({}).populate('students.student students.result');
        
        // Render the 'home' view with the retrieved student and interview data.
        return res.render('home', {
            title: "Placement Portal| Dashboard",
            students: students,
            interviews: interviews
        });
    } 
    catch (err) {
        //Handle any errors that occur during the data retrieval or rendering process.
        console.log('Error', err);
        return;
    }
}
