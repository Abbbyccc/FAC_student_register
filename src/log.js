const registerForm = document.querySelector('#registerForm')


function signup(event) {
    event.preventDefault()
    const fname = document.querySelector('#fName').value
    const lname = document.querySelector('#lName').value
    const dob = document.querySelector('#DOB').value
    if (!/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(dob)) {
        alert('please enter date of birth in dd/mm/yyyy')
    } else {

        let studentData = JSON.parse(localStorage.getItem('studentData')) || [];
        let exist = studentData.length && JSON.parse(localStorage.getItem('studentData')).some(data => data.fname == fname && data.lname == lname && data.dob == dob)
        if (!exist) {
            studentData.push({ fname, lname, dob })
            localStorage.setItem('studentData', JSON.stringify(studentData));
            registerForm.reset();
            alert("Student added.");
            makeList(fname, lname, dob)

        } else {
            alert("Student already exists, please check again");

        }

    }
}

function makeList(fname, lname, dob) {
    let list = [fname, lname, dob]
    let table = document.querySelector('.studentTable')
    let tableRow = document.createElement("tr")
    let registerButton = document.createElement("button")
    registerButton.setAttribute('class', 'register-btn')
    registerButton.setAttribute('onclick', 'register()')
    registerButton.innerHTML = 'Register'

    list.forEach((el) => {
        let tableData = document.createElement("td")
        tableData.textContent = el
        tableRow.appendChild(tableData)
    })
    tableRow.appendChild(registerButton)
    table.appendChild(tableRow)
}

