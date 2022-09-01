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
const employeeNameEl = document.querySelector('#employee-name-bonus');

let employees = [
    {fullName: 'John Smith', pay: 100, role: 'Q/A'},
    {fullName: 'Mary Ann', pay: 180, role: 'Q/A'},
    {fullName: 'Don Draper', pay: 120, role: 'Q/A'},
];

showAllEmployees(employees);
updateEmployeeList(employees);

function updateEmployeeList(employees,
                            selectHTMLEl = document.querySelector('#employee-name-bonus')) {

    selectHTMLEl.innerHTML = '';
    employees.forEach(item => {
        const option = document.createElement('option');
        option.value = item.fullName;

        option.innerText = item.fullName;
        selectHTMLEl.appendChild(option);
    });

}

function displayEmployee(aSingleEmployeeObject, HTMLToAppendTo = employeeListAllEl) {
    const li = document.createElement('li');

    li.innerHTML = `<p>${aSingleEmployeeObject.fullName}, 
  $${aSingleEmployeeObject.pay}, ${aSingleEmployeeObject.role}</p>`;

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
function addEmployee(newEmployeeObject = {fullName: 'John Smith', pay: 100, role: 'Q/A'},
                     existingEmployees = employees) {

    employees = [...existingEmployees, newEmployeeObject];

    showAllEmployees(employees);
    updateEmployeeList(employees);
}


/// Event Listeners

// Adds a new employee to the portal....
employeeFormNewEl.addEventListener('submit', (event) => {
    event.preventDefault();

    // get the values from the form in the index.html....
    const fullName = document.querySelector('#employee-name').value;
    const pay = Number(document.querySelector('#employee-pay').value);
    const role = document.querySelector('#employee-role').value;

    // create a new object from the values
    const newEmployee = {fullName: fullName, pay: pay, role: role};
    //alternative:  const newEmployee = {fullName, pay, role};
    addEmployee(newEmployee, employees);

});

// Give an employee a raise
employeeFormBonusEl.addEventListener('submit', (event) => {
    event.preventDefault();


    giveBonus(employeeNameEl.value, payAmtEl.value, employees);
});

// [].map : [ {},{}  ] => { ==black magic== } => [ {}, {} ]

function giveBonus(employeeName, bonusAmount, arrayOfEmployee = employees) {

    employees = arrayOfEmployee.map((item) => {

        if (item.fullName === employeeName) { //true
            return {fullName: item.fullName, pay: item.pay + Number(bonusAmount), role: item.role};
        }
        // false
        return item;
    });

    // console.log(employees);

    // employees = []
    showAllEmployees(employees);
}