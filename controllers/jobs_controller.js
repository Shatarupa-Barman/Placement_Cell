// Step 1: Import the 'jobs' data from a JSON configuration file.
const jobs = require('../config/jobs.json');

// Step 2: Define a controller function to render the 'jobs' page.
module.exports.home = async function(req, res){
    // Step 3: Render the 'jobs' view with the imported 'jobs' data as a JSON string.
    return res.render('jobs', {
        title: "Placement Portal| Jobs",
        jobs: JSON.stringify(jobs)
    })
}
