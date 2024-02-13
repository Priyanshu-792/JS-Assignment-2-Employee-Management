# Employee-Management

# Explanation of JavaScript Code in HTML

This document provides an explanation of the JavaScript code embedded within the HTML file.

## Global Variables Initialization

- `nameEl`, `addressEl`, `employeeidEl`, `designationEl`, `registerForm`: These variables store references to various input elements in the registration form.

- `addBtn`, `addBtnEdit`, `modal`, `closeBtn`, `registerBtn`, `updateBtn`: These variables store references to different elements in the DOM such as buttons and modal.

- `userData`: This array stores employee data.

## Event Listeners

- `addBtn.onclick`: This event listener triggers the display of the modal for adding a new employee.

- `viewBtn.addEventListener`: This event listener toggles the visibility of the employee table when the "View all employees" button is clicked.

- `closeBtn.onclick`: This event listener closes the modal when the close icon is clicked.

- `registerBtn.onclick`: This event listener handles the registration of a new employee when the register button is clicked.

## Validation Functions

- `isValidName(name)`: This function validates the name input to ensure it contains only alphabets and spaces.

- `isValidAddress(address)`: This function validates the address input to ensure it contains at least one alphabet.

- `isUniqueEmployeeId(employeeId)`: This function validates the uniqueness of the employee ID input.

## Employee Class

- `Employee`: This class defines the structure of an employee object with properties for name, address, employee ID, and designation.

## Registration Process

- The registration process is handled within the `registerBtn.onclick` event listener. It collects input data, validates it, creates a new employee object, stores it in the `userData` array, updates the local storage, displays a success message, resets the form, closes the modal, and updates the table.

## Table Population and Manipulation

- `getDataFromLocal`: This function populates the employee table with data from the `userData` array. It also handles delete and edit functionalities for each employee.

- `allDelBtn[i].onclick`: This event listener deletes an employee record when the delete button is clicked. It prompts the user for confirmation before deletion.

- `allEditBtn[i].onclick`: This event listener allows editing of an employee record. It populates the form fields with existing data and updates the `userData` array upon modification.

---

This Markdown file provides a detailed explanation of the JavaScript code embedded within the HTML document.
