// Import the 'Interview' and 'Student' models.
const Interview = require('../models/interview');
const Student = require('../models/student');

//  Define a controller function to render the 'add interview' page.
module.exports.interviews = function(req, res){
    return res.render('interview', {
        title: "Placement Portal| Interview",
    });
}   

//  Define a controller function to create a new interview in the database.
module.exports.create = async function(req, res){
    try{
        //  Create a new interview document with data from the request body.
        let interview = await Interview.create({
            company: req.body.company,
            date: req.body.date,
        });

        //  Check if the interview was created successfully.
        if(interview){
            console.log('Interview details created successfully');
            req.flash('success', 'Interview created successfully');
            return res.redirect('/');
        }
        else{
            console.log('Error in creating interview details');
            req.flash('error', 'Error in creating interview');
            return res.redirect('back');
        }
    }
    catch(err){
        //  Handle any errors that occur during the creation process.
        console.log('Error', err);
        req.flash('error', 'Error in creating interview');
        return res.redirect('back');
    }
}

//  Define a controller function to delete an interview from the database.
module.exports.destroy = async function(req, res){
    try{
        // Find the interview by its ID.
        let interview = await Interview.findById(req.query.id);

        //  Check if the interview exists.
        if(interview){
            // Remove the reference to the interview from related student records.
            for(let i=0; i<interview.students.length; i++){
                let student = await Student.findById(interview.students[i].student);
                if(student){
                    for(let j=0; j<student.interviews.length; j++){
                        if(student.interviews[j].company == req.query.id){
                            student.interviews.splice(j, 1);
                            student.save();
                            break;
                        }
                    }
                }
            }

            //  Delete the interview document from the database.
            interview.deleteOne();
            console.log('Interview deleted successfully');
            req.flash('success', 'Interview deleted successfully');
            return res.redirect('back');
        }
        else{
            //Handle the case where the interview is not found.
            req.flash('error', 'Error in deleting interview');
            console.log('Error in deleting interview');
            return;
        }
    }
    catch(err){
        //  Handle any errors that occur during the deletion process.
        req.flash('error', 'Error in deleting interview');
        console.log('Error', err);
        return;
    }
}

//  Define a controller function to assign a student to an interview.
module.exports.addStudent = async function(req, res){
    try{
        //Find the interview by its ID.
        let interview = await Interview.findById(req.params.id);

        // Retrieve the student's email from the request.
        let email = req.body.email;

        //  Find the student by their email.
        let student = await Student.findOne({email: email});

        //  Check if both the interview and student exist.
        if(interview && student){
            // Create objects to store student's details in the interview and interview details in the student.
            let obj1 = {
                student: student._id,
                result: req.body.result,
            }

            let obj2 = {
                company: interview._id,
                result: req.body.result,
            }

            // Remove any existing enrollment of the student in the interview.
            for(let i=0; i<interview.students.length; i++){
                if(interview.students[i].student.equals(student._id)){
                    interview.students.splice(i, 1);
                    await interview.save();
                }
            }

            for(let i=0; i<student.interviews.length; i++){
                if(student.interviews[i].company.equals(interview._id)){
                    student.interviews.splice(i, 1);
                    await student.save();
                }
            }

            //Add the student to the interview and the interview to the student.
            interview.students.push(obj1);
            student.interviews.push(obj2);
            interview.save();
            student.save();

            console.log('Student Assigned to interview successfully');    
            req.flash('success', 'Student Assigned to interview successfully');
            return res.redirect('back');
        }
        else{
            //Handle the case where either the interview or student is not found.
            console.log('Error in adding student to interview');
            req.flash('error', 'Error in adding student to interview');
            return;
        }
    }
    catch(err){
        //  Handle any errors that occur during the student assignment process.
        req.flash('error', 'Error in adding student to interview');
        console.log('Error', err);
        return;
    }
}

// Define a controller function to remove a student from an interview.
module.exports.removeStudent = async function(req, res){
    try{
        // Find the student and interview by their IDs.
        let student = await Student.findById(req.params.studentId);
        let interview = await Interview.findById(req.params.interviewId);

        // Check if both the student and interview exist.
        if(student && interview){
            //Remove the student from the interview and the interview from the student.
            for(let i=0; i<student.interviews.length; i++){
                if(student.interviews[i].company.equals(interview._id)){
                    student.interviews.splice(i, 1);
                    await student.save();
                }
            }

            for(let i=0; i<interview.students.length; i++){
                if(interview.students[i].student.equals(student._id)){
                    interview.students.splice(i, 1);
                    await interview.save();
                }
            }
            
            console.log('Student removed from interview successfully');
            req.flash('success', 'Student removed from interview successfully');
            return res.redirect('back');
        }
        else{
            //Handle the case where either the student or interview is not found.
            req.flash('error', 'Error in removing student from interview');
            console.log('Error in removing student from interview');
            return;
        }
    }
    catch(err){
        // Handle any errors that occur during the student removal process.
        req.flash('error', 'Error in removing student from interview');
        console.log('Error', err);
        return;
    }
}
