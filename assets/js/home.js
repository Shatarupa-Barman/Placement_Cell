// Select all HTML elements with the class "date" and store them in the 'dateElements' NodeList.
const dateElements = document.querySelectorAll('.date');

// Iterate through each element in the 'dateElements' NodeList.
dateElements.forEach((elem) => {

    //  Extract the text content (date in string format) from the current HTML element.
    const inputDateString = elem.textContent;
    
    //  Create a JavaScript Date object from the extracted date string.
    const dateObject = new Date(inputDateString);
    
    //  Define an array of month names.
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    //  Get the month, day, and year components from the date object.
    const month = monthNames[dateObject.getMonth()]; // Get the month name.
    const day = dateObject.getDate(); // Get the day of the month.
    const year = dateObject.getFullYear(); // Get the year.

    //  Create the formatted date string in the "MMM DD YYYY" format.
    const formattedDate = `${month} ${day} ${year}`;
    
    // Update the text content of the current HTML element with the formatted date string.
    elem.textContent = formattedDate;
})
