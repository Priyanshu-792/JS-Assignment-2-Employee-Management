

// All global variaqble
var nameEl = document.getElementById("name");
var addressEl = document.getElementById("address");
var employeeidEl = document.getElementById("employeeid");
var designationEl = document.getElementById("designation");
var registerForm = document.getElementById("register-form");

var addBtn = document.getElementById("add-btn");
var addBtnEdit = document.getElementById("add-btn");
var modal = document.querySelector(".modal");
var closeBtn = document.querySelector(".close-icon");
var registerBtn = document.getElementById("register-btn");
var updateBtn = document.getElementById("update-btn");

// creating empty array data for storing employee details
var userData = [];
addBtn.onclick=function()
{
    modal.classList.add('active');

    // for removing update button 
    updateBtn.style.display = 'none';
    registerBtn.style.display = "block";
}

// styling for view button
const viewBtn = document.getElementById("view-btn");
const btnText = document.getElementById("view-btn-text");
document.addEventListener("DOMContentLoaded", function() {
viewBtn.addEventListener("click", function() {
  btnText.innerText = (btnText.innerText == 'View all employees') ? 'Hide all employees' : 'View all employees';
  var table = document.getElementById("myTable");
  if (table.style.display === "none") {
      table.style.display = "table"; // Show the table
  } else {
      table.style.display = "none"; // Hide the table
  }
});
});




// function used is different from the video
closeBtn.onclick=function()
{
    modal.classList.remove('active');
}

//   Functions to handle all the edge cases showing all the edge cases as a seperate functions
    function isValidName(name) {
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(name);
    }

    function isValidAddress(address) {
        const regex = /[a-zA-Z]/;
        return regex.test(address);
    }
    function isUniqueEmployeeId(employeeId) {
        if (employeeId === '' || employeeId<=0) 
            return false;
        return (!userData.some(user => user.employeeId === employeeId) );
    }

    function isValidDesignation(designation) {
        // Regular expression to match only alphabets and spaces
        const regex = /^[a-zA-Z\s]+$/;
        // Regular expression to match only numbers
        const numbersRegex = /^\d+$/;
        // Regular expression to match only special characters
        const specialCharsRegex = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    
        // Check if the designation contains only alphabets and spaces
        if (regex.test(designation)) {
            return true;
        }
        // Check if the designation contains only numbers or special characters
        else if (numbersRegex.test(designation) || specialCharsRegex.test(designation)) {
            return false;
        }
        // Designation contains alphabets, numbers, and/or special characters
        else {
            return true;
        }
    }
    
// creating employee class as said in assignment to add the employees details using class's objects
class Employee {
    constructor(name, address, employeeId, designation) {
      this.name = name;
      this.address = address;
      this.employeeId = employeeId;
      this.designation = designation;
    }
  }

document.addEventListener("DOMContentLoaded", function() {
// start register coding
    registerBtn.onclick = function(e) {
        e.preventDefault();
        const name = nameEl.value.trim();
        const address = addressEl.value.trim();
        const employeeId = employeeidEl.value.trim();
        const designation = designationEl.value.trim();


        if (!name || !address || !employeeId || !designation) {
            return  Swal.fire({
                title: "Fill all the Fields!",
                text: "All fields are required for registration",
                icon: "error",
                timer: 4000, // Timer in milliseconds (4 seconds in this case)
            });
        }
        //check validation of data entered by user
        if (!isValidName(name)) {
            return  Swal.fire({
                title: "warning!",
                text: "Name shouldn't contain special characters or digits",
                icon: "error",
                timer: 4000, 
            });
            
        }
        if (!isValidAddress(address)) {
            return  Swal.fire({
                title: "warning!",
                text: "Addrress cannot be only digits or special characters",
                icon: "error",
                timer: 4000 
            });
            
        }
        if (!isUniqueEmployeeId(employeeId)) {
            return     Swal.fire({
                title: "warning!",
                text: "Use unique id and donot keep it blank or less than equal to 0",
                icon: "error",
                timer: 4000 
            });
          
        }
        if (!isValidDesignation(designation)) {
            return     Swal.fire({
                title: "warning!",
                text: "Designation cannot contain only digits and special characters",
                icon: "error",
                timer: 4000 
            });
          
        }
        // Proceed with registration
        const newEmployee = new Employee(name, address, employeeId, designation);
        userData.push(newEmployee);
        var userString = JSON.stringify(userData);
        localStorage.setItem("userData", userString);
        Swal.fire({
            title: "Great!",
            text: "Registration done Successfully",
            icon: "success",
            timer: 4000
        });
        registerForm.reset('');
        closeBtn.click();
        getDataFromLocal();
    };

});


// Adding data to the table
var tableData = document.getElementById("table-data");
const getDataFromLocal = () =>{
    tableData.innerHTML = "";
    userData.forEach((data,index)=>{
        tableData.innerHTML += `
        <tr index='${index}'>
        <td>${data.name}</td>
        <td>${data.address}</td>
        <td>${data.employeeId}</td>
        <td>${data.designation}</td>
        <td>
            <button class="edit-btn"><i class="fa fa-eye"></i></button>
            <button class="del-btn"><i class="fa fa-trash"></i></button>
         </td>
    </tr>`;
    })

    // deleting the employees data one by one on click
    var i;
    var allDelBtn = document.querySelectorAll(".del-btn");
    var allEditBtn = document.querySelectorAll(".edit-btn");
    for(i=0;i<allDelBtn.length;i++)
    {
        allDelBtn[i].onclick = function(){
            Swal.fire({
                title: "Do you really want to delete this employee detail?",
                showDenyButton: true,
                confirmButtonText: "Confirm",
                denyButtonText: `Don't Delete`
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    var tr = this.parentElement.parentElement;
                    var deletedid = tr.getAttribute("index");
                  tr.remove();
                  userData.splice(deletedid,1);
               
                  Swal.fire("Deleted", "", "successfully!");
                } else if (result.isDenied) {
                  Swal.fire("Not Deleted", "", "info");
                }
              });
   
        } 
        // styling the delete button
        allDelBtn[i].style.backgroundColor = "red";
        allDelBtn[i].style.borderRadius = "5px";
    }


// enabling edit option
for (let i = 0; i < allEditBtn.length; i++) {
    allEditBtn[i].onclick = function() {
        var tr = this.parentElement.parentElement;
        var td = tr.getElementsByTagName("td");
        var index = tr.getAttribute("index");
       
        var name = td[0].innerHTML;
        var address = td[1].innerHTML;
        var employeeid = td[2].innerHTML;
        var designation = td[3].innerHTML;

        // Create a new instance of Employee with existing data
        const existingEmployee = new Employee(name, address, employeeid, designation);

        // Set the values of input fields with existing data
        nameEl.value = existingEmployee.name;
        addressEl.value = existingEmployee.address;
        employeeidEl.value = existingEmployee.employeeId;
        designationEl.value = existingEmployee.designation;

        addBtn.click();
        registerBtn.style.display = "none";
        updateBtn.style.display = 'block';

        updateBtn.onclick = function(e) {
            e.preventDefault();

            // Update the existingEmployee object with new data
            existingEmployee.name = nameEl.value;
            existingEmployee.address = addressEl.value;
            existingEmployee.employeeId = employeeidEl.value;
            existingEmployee.designation = designationEl.value;

            // Update the userData array at the specified index
            userData[index] = existingEmployee;

            // Update data in local storage
            getDataFromLocal();
            localStorage.setItem("userData", JSON.stringify(userData));
            
            // Close the form or perform any other actions as needed
            closeBtn.click();
            registerForm.reset('');
        }
    }
      // styling the edit button
      allEditBtn[i].style.backgroundColor = "#237712";
      allEditBtn[i].style.borderRadius = "5px";
      
}
}
 

kj
