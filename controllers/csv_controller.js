//  Import the 'fs' module (File System) for working with file operations and import the 'Student' model.
const fs = require("fs");
const Student = require("../models/student");

// Define an asynchronous function to export student data as a CSV file.
module.exports.export = async function (req, res) {
  try {
    //Retrieve all student data from the database, populating 'interviews' with 'company' and 'result'.
    const allStudents = await Student.find({}).populate('interviews.company interviews.result');

    //Initialize the CSV report header.
    let report = "student Id, Student name,Student college, Student email, Student status, DSA Final Score, WebD Final Score, React Final Score, Interview date, Interview company, Interview result";
    let studentData1 = "";

    // Loop through each student in the database.
    for (let student of allStudents) {
      // Step 6: Create a CSV row with basic student information.
      studentData1 =
        student.id +
        "," +
        student.name +
        "," +
        student.college +
        "," +
        student.email +
        "," +
        student.status +
        "," +
        student.dsa_score +
        "," +
        student.webd_score +
        "," +
        student.react_score;

      //  Check if the student has interview data.
      if (student.interviews.length > 0) {
        for (let interview of student.interviews) {
          let studentData2 = "";

          //  Append interview details to the CSV row.
          studentData2 +=
            "," +
            correctDate(interview.company.date) + // Correct and format the interview date.
            "," +
            interview.company.company +
            "," +
            interview.result;

          //  Append the completed CSV row to the report.
          report += "\n" + studentData1 + studentData2;
        }
      }
      else {
        //  If the student has no interviews, append the basic student data to the report.
        report += "\n" + studentData1;
      }
    }

    // Write the CSV report to a file in the 'uploads' directory.
    const csvFile = fs.writeFile(
      "uploads/studentsReport.csv",
      report,
      function (err, data) {
        if (err) {
          console.log(err);
          return res.redirect("back");
        }
        //If the file is successfully written, trigger a download of the CSV file.
        return res.download("uploads/studentsReport.csv");
      }
    );

  } catch (err) {
    // Handle any errors that occur during the process.
    console.log(err);
  }
};

//  Define a helper function to correct and format the interview date.
let correctDate = (input) => {
    const dateObject = new Date((input).toString());

    //  Define an array of month names.
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[dateObject.getMonth()];
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();

    //  Format the date as "Month Day Year" (e.g., "Sep 29 2023").
    const formattedDate = `${month} ${day} ${year}`;

    //  Return the formatted date.
    return formattedDate;
}
