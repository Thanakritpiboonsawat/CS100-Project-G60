const config = {
  backendUrl: "http://localhost:8000/", // Default backend URL
};
const port = 8000;

// Function to validate Firstname and Lastname
function validateName() {
  const fullnameInput = document.getElementById("fullname");
  const names = fullnameInput.value.trim().split(" ");
  const errorElement = document.getElementById("fullnameError");

  if (names.length !== 2) {
    errorElement.textContent = "Please enter both your Firstname and Lastname.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate Firstname and Lastname(Thai)
function validateThaiName() {
const fullnamethaiInput = document.getElementById("fullnamethai");
const names = fullnamethaiInput.value.trim().split(" ");
const errorElement = document.getElementById("fullnamethaiError");

if (names.length !== 2) {
  errorElement.textContent = "Please enter both your Firstname and Lastname in Thai.";
  return false;
} else {
  errorElement.textContent = ""; // Clear the error message when valid
}
return true;
}

// Function to validate Student ID
function validateStudentID() {
  const studentIDInput = document.getElementById("studentID");
  const studentIDPattern = /^\d{10}$/;
  const errorElement = document.getElementById("studentIDError");

  if (!studentIDPattern.test(studentIDInput.value)) {
    errorElement.textContent = "Please enter a 10-digit Student ID.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate University Email
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailPattern = /^.+@dome\.tu\.ac\.th$/;
  const errorElement = document.getElementById("emailError");

  if (!emailPattern.test(emailInput.value)) {
    errorElement.textContent =
      "Please provide a valid university email in the format 'xxx.yyy@dome.tu.ac.th'.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate form inputs on user input
function validateFormOnInput() {
  validateName();
  validateThaiName();
  validateStudentID();
  validateEmail();
}

// Function to fetch activity types from the backend
async function fetchActivityTypes() {
  try {
    const response = await fetch(`http://${window.location.hostname}:${port}/getActivityType`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch activity types.");
      return [];
    }
  } catch (error) {
    console.error("An error occurred while fetching activity types:", error);
    return [];
  }
}

// Function to populate activity types in the select element
function populateActivityTypes(activityTypes) {
  const activityTypeSelect = document.getElementById("activityType");

  for (const type of activityTypes) {
    const option = document.createElement("option");
    option.value = type.id;
    option.textContent = type.value;
    activityTypeSelect.appendChild(option);
  }
}

// Event listener when the page content has finished loading
document.addEventListener("DOMContentLoaded", async () => {
  const activityTypes = await fetchActivityTypes();
  populateActivityTypes(activityTypes);
});

// Function to submit the form
// Function to submit the form
async function submitForm(event) {
  event.preventDefault();

  // Validate form inputs before submission
  if (!validateName() || !validateThaiName()  || !validateStudentID() || !validateEmail()) {
    return;
  }

  const startDateInput = document.getElementById("startDate").value;
  const endDateInput = document.getElementById("endDate").value;
  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);

  if (endDate <= startDate) {
    alert("End datetime should be after the start datetime.");
    return;
  }

  // Create the data object to send to the backend
  const formData = new FormData(event.target);
  const data = {
    first_name: formData.get("fullname").split(" ")[0],
    last_name: formData.get("fullname").split(" ")[1],
    first_namethai: formData.get("fullnamethai").split(" ")[0],
    last_namethai: formData.get("fullnamethai").split(" ")[1],
    student_id: parseInt(formData.get("studentID")),
    email: formData.get("email"),
    title: formData.get("workTitle"),
    type_of_work_id: parseInt(formData.get("activityType")),
    academic_year: parseInt(formData.get("academicYear")) - 543,
    semester: parseInt(formData.get("semester")),
    start_date: formData.get("startDate"),
    end_date: formData.get("endDate"),
    location: formData.get("location"),
    description: formData.get("description")
  };

  console.log(data);

  try {
    // Send data to the backend using POST request
    const response = await fetch(`http://${window.location.hostname}:${port}/record`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Form data submitted successfully!");

      // Format JSON data for display
      const formattedData = Object.entries(responseData.data)
        .map(([key, value]) => `"${key}": "${value}"`)
        .join("\n");

      // Display success message with formatted data
      alert(responseData.message + "\n" + formattedData);

      document.getElementById("myForm").reset();
    } else {
      console.error("Failed to submit form data.");

      // Display error message
      alert("Failed to submit form data. Please try again.");
    }
  } catch (error) {
    console.error("An error occurred while submitting form data:", error);
  }
}

// Event listener for form submission
document.getElementById("myForm").addEventListener("submit", submitForm);

// Event listeners for input validation on user input
document.getElementById("fullname").addEventListener("input", validateName);
document.getElementById("fullnamethai").addEventListener("input", validateThaiName);
document.getElementById("studentID").addEventListener("input", validateStudentID);
document.getElementById("email").addEventListener("input", validateEmail);



function validation(){
  if(!validateName() || !validateThaiName() ||  !validateStudentID() || !validateEmail()){
      return false;
  }
  //voidoutputjs();
  getValuetoResult();
  showimage();
  
}



function getValuetoResult(){     
document.getElementById('submitdate').removeAttribute('hidden')
let topic = "Our Activities"
let fullname = document.getElementById('fullname')
let fullnamethai = document.getElementById('fullnamethai')
let stid = document.getElementById('studentID')
let mail = document.getElementById('email')
let work = document.getElementById('workTitle')
let type = document.getElementById('activityType')
let year = document.getElementById('academicYear')
let semester = document.getElementById('semester')
let start = document.getElementById('startDate')
let end = document.getElementById('endDate')
let location = document.getElementById('location')
let des = document.getElementById('description')


let res = document.getElementById('showresult')
let msg = ''
msg += '<h1><center>' + topic + '</center></h1>';
msg += '<p><b>Firstname and Lastname :</b> '+ fullname.value +'</p>'
msg += '<p><b>Firstname and Lastname in Thai :</b> '+ fullnamethai.value +'</p>'
msg += '<p><b>Student ID :</b> '+ stid.value +'</p>'
msg += '<p><b>University Email :</b> '+ mail.value +'</p>'
msg += '<p><b>Work/Activity Title : </b> '+ work.value +'</p>'
msg += '<p><b>Type of Work/Activity :</b> '+ type.value +'</p>'
msg += '<p><b>Academic Year :</b> ' + year.value +'</p>'
msg += '<p><b>Semester :</b> '+ semester.value +'</p>'
msg += '<p><b>Start Date/Time :</b> '+ start.value +'</p>'
msg += '<p><b>End Date/Time :</b> '+ end.value +'</p>'
msg += '<p><b>Location :</b> '+ location.value +'</p>'
msg += '<p><b>Activity :</b> '+ des.value +'</p>'

res.innerHTML = msg

res.scrollIntoView()
}

