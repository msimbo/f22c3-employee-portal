// PROBLEM: People Mgt. Platform can:
// 1. List all employees
// 2. Add Employees {first, lastname, state date, pay, role}
// 3. Modify Employees — give bonus or raise...

// Static Mockup (Figma, XD...) =>  HTML + CSS (TW, DaisyUI, Ant.Design)
// -> Interaction ("JS" & friends)
const employeeListAllEl = document.querySelector('#employee-list-all');
const employeeFormNewEl = document.querySelector('#employee-form-new');
const employeeFormBonusEl = document.querySelector('#employee-form-bonus');
const payAmtEl = document.querySelector('#employee-bonus-amt');
const employeeIDEl = document.querySelector('#employee-name-bonus');

let employees = [
    {id: 1, fullName: 'John Smith', pay: 100, role: 'Q/A'},
    {id: 2, fullName: 'Mary Ann', pay: 180, role: 'Q/A'},
    {id: 3, fullName: 'Don Draper', pay: 120, role: 'Q/A'},
];

showAllEmployees(employees);
updateEmployeeList(employees);

function updateEmployeeList(employees,
                            selectHTMLEl = document.querySelector('#employee-name-bonus')) {

    selectHTMLEl.innerHTML = '';
    employees.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;

        option.innerText = `${item.fullName} - ID: ${item.id}`;
        selectHTMLEl.appendChild(option);
    });

}

function displayEmployee(aSingleEmployeeObject, HTMLToAppendTo = employeeListAllEl) {
    const li = document.createElement('li');

    li.innerHTML = `<p>${aSingleEmployeeObject.fullName}, 
  $${aSingleEmployeeObject.pay}, ${aSingleEmployeeObject.role} <small>| ID: ${aSingleEmployeeObject.id}<small></p>`;

    HTMLToAppendTo.appendChild(li);

}

/**
 * This shows a list of all employees
 *
 * @param arrayOfEmployees: Array
 */
function showAllEmployees(arrayOfEmployees = [{}, {}]) {

    employeeListAllEl.innerHTML = '';
    arrayOfEmployees.forEach(function (aSingleEmployee) {

        displayEmployee(aSingleEmployee);

    });

}

/**
 * Adds a new employee to an existing array
 *
 * @param newEmployeeObject
 * @param existingEmployees
 */
function addEmployee(newEmployeeObject = {id: 1, fullName: 'John Smith', pay: 100, role: 'Q/A'},
                     existingEmployees = employees) {

    employees = [...existingEmployees, newEmployeeObject];

    showAllEmployees(employees);
    updateEmployeeList(employees);
}

/**
 * Utility functions
 *
 * @type {{generateId: (function(*))} }
 */
const Helper = {
    generateId: (collection) => {
        return Math.floor(Math.random() * 10000) + collection.length + 1;
    }
};

/// Event Listeners

// Adds a new employee to the portal....
employeeFormNewEl.addEventListener('submit', (event) => {
    event.preventDefault();

    // get the values from the form in the index.html....
    let fullName = document.querySelector('#employee-name').value;
    let pay = document.querySelector('#employee-pay').value;
    const role = document.querySelector('#employee-role').value;

    // create a new object from the values
    const newEmployee = {id: Helper.generateId(employees), fullName: fullName, pay: pay, role: role};
    //alternative:  const newEmployee = {fullName, pay, role};
    addEmployee(newEmployee, employees);

    // make the values empty to allow to input the next item

    // an alternative way to get the #employee-name without going through the document.*
    // the "event.target" refers to this form
    // then we set the `.value` to empty
    event.target[0].value = '';

    // we getting the "#employee-pay.
    // this is the second item in the `event.target` array
    event.target[1].value = '';


    // finally, we set the "focus" to the "name", so it's ready to start typing the next employee
    // this is the "effect" that Google uses to keep the input in focus when you load the page
    event.target[0].focus();
});

// Give an employee a raise
employeeFormBonusEl.addEventListener('submit', (event) => {
    event.preventDefault();
    // log

    giveBonus(Number(employeeIDEl.value), payAmtEl.value, employees);
});

// [].map : [ {},{}  ] => { ==black magic== } => [ {}, {} ]

function giveBonus(employeeID, bonusAmount, arrayOfEmployee = employees) {

    employees = arrayOfEmployee.map((item) => {

        if (item.id === employeeID) { //true
            return {id: Number(item.id), fullName: item.fullName, pay: item.pay + Number(bonusAmount), role: item.role};
        }
        // false
        return item;
    });

    // console.log(employees);

    // employees = []
    showAllEmployees(employees);
}
