//  Get a reference to an HTML element with the ID "jobs" and store it in the 'container' variable.
let container = document.getElementById('jobs');

//  Parse JSON data from the 'dataset.jobs' attribute of the 'container' element and store it in the 'jobs' variable.
let jobs = JSON.parse(container.dataset.jobs);

//  Iterate through each job in the 'jobs' array using a 'for...in' loop.
for (let i in jobs) {
    // Step 4: Get the current job object from the 'jobs' array.
    let job = jobs[i];

    //  Get the current date (today) and calculate a random day within the next two days.
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1; // Adding 1 because months are zero-based.
    let day = today.getDate() + Math.floor(Math.random() * 2); // Random day within the next two days.

    //  Format the date as "DD/MM/YYYY".
    let date = `${day}/${month}/${year}`;

    //  Create an HTML string that represents a job card using the job data and formatted date.
    let html = `
        <div class="card mb-3 job">
            <div class="card-body">
                <h5 class="card-title">${job.job_title}</h5>
                <h6 class="card-subtitle mb-2" style="color:green">${job.company_name}</h6>
                <p class="card-text">${date}</p>
                <a href="${job.url}" target="_blank" class="card-link" style="color:blue">View <i class="fa-solid fa-link"></i> </a>
            </div>
        </div>
    `;

    //  Append the generated HTML for the job card to the 'container' element.
    container.innerHTML += html;
}
