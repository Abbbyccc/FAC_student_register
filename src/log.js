const registerForm = document.querySelector('#registerForm')

const initatialData = [{
    name: "Millie",
    lastName: "Spencer",
    birthday: "29/11/2021",
}, {
    name: "Maeve",
    lastName: "Madden",
    birthday: "25/08/2020",
}, {
    name: "Joe",
    lastName: "Harris",
    birthday: "22/08/2020",
}, {
    name: "Alistair",
    lastName: "Renton",
    birthday: "23/07/2022",
}]

function initialize() {
    initatialData.forEach(id => {
        const studentRow = createStudentLine(id.name, id.lastName, id.birthday)
        addToStudentTable(studentRow)
    })
}

initialize()
function signup(event) {
    event.preventDefault()
    const fname = document.querySelector('#fName').value
    const lname = document.querySelector('#lName').value
    const dob = document.querySelector('#DOB').value
    if (!/^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\d{4}$/.test(dob)) {
        alert('please enter date of birth in dd/mm/yyyy')
    } else {
        let studentData = JSON.parse(localStorage.getItem('studentData')) || [];
        let exist = studentData.length && JSON.parse(localStorage.getItem('studentData')).some(data => data.fname == fname && data.lname == lname && data.dob == dob)
        if (!exist) {
            studentData.push({ fname, lname, dob })
            localStorage.setItem('studentData', JSON.stringify(studentData));
            registerForm.reset();
            alert("Student added.");
            const studentRow = createStudentLine(fname, lname, dob)
            addToStudentTable(studentRow, '.studentTable')
        } else {
            alert("Student already exists, please check again");
        }
    }
}

function createStudentLine(fname, lname, dob) {
    const tableRow = document.createElement("tr")
    tableRow.setAttribute('class', 'studentData')
    const registerButton = document.createElement("button")
    registerButton.setAttribute('class', 'register-btn') // TODO add an ID
    registerButton.innerHTML = 'Register'
    const logTime_title = document.querySelector('#log_time')

    const time_td = document.createElement("td")
    let flag = true
    registerButton.addEventListener("click", () => {
        if (flag) {
            const d = new Date().toLocaleString();
            time_td.textContent = d
            registerButton.classList.add('registeredBtn')
            registerButton.innerHTML = 'Registered'
            logTime_title.innerHTML = 'Log in Time'
            login(fname, lname, d)
            flag = false
        } else {
            const d = new Date().toLocaleString();;
            time_td.textContent = d
            registerButton.innerHTML = 'Register'
            registerButton.classList.remove('registeredBtn')
            logTime_title.innerHTML = 'Log out Time'
            logout(fname, lname, d)
            flag = true
        }
    })

    const list = [fname, lname, dob]
    list.forEach((el) => {
        const tableData = document.createElement("td")
        tableData.textContent = el
        tableRow.appendChild(tableData)
    })
    tableRow.appendChild(registerButton)
    tableRow.appendChild(time_td)


    return tableRow
}

function addToStudentTable(studentTableRow) {
    let table = document.querySelector('.studentTable')
    table.appendChild(studentTableRow)
}


function login(fname, lname, login) {
    let logData = JSON.parse(localStorage.getItem('logData')) || [];
    let existStudent = JSON.parse(localStorage.getItem('studentData')).some(data =>
        data.fname == fname && data.lname == lname) ||
        initatialData.some(data => data.name == fname && data.lastName == lname)

    if (existStudent) {
        logData.push({ fname, lname, login })
        localStorage.setItem('logData', JSON.stringify(logData));
    } else {
        return
    }
}

function logout(fname, lname, logout) {
    let logData = JSON.parse(localStorage.getItem('logData')) || [];
    let existStudent = JSON.parse(localStorage.getItem('studentData')).some(data =>
        data.fname == fname && data.lname == lname) ||
        initatialData.some(data => data.name == fname && data.lastName == lname)

    if (existStudent) {
        logData.push({ fname, lname, logout })
        localStorage.setItem('logData', JSON.stringify(logData));
    } else {
        return
    }
}


function button(event) {
    event.preventDefault()
    const x = document.getElementById("date");
    const currentVal = x.value;
    const formatcurVal = LogTimeFormat(currentVal)
    const logtimeData = [];
    JSON.parse(localStorage.getItem('logData')).forEach((x) => {
        const logTime = x['login'].slice(0, 10)
        console.log(logTime)
        console.log(formatcurVal)
        if (logTime == formatcurVal) {
            const studentLogRow = logStudent(x.fname, x.lname)
            addToTimeTable(studentLogRow)
        }
    })
    
}

function logStudent(fname, lname, dob) {
    const tableRow = document.createElement("tr")
    tableRow.setAttribute('class', 'logData')
    const list = [fname, lname, dob]
    list.forEach((el) => {
        const tableData = document.createElement("td")
        tableData.textContent = el
        tableRow.appendChild(tableData)
    })

    return tableRow
}

function addToTimeTable(addToTimeTable) {
    let table = document.querySelector('.timeLog')
    table.appendChild(addToTimeTable)
}

function LogTimeFormat(time) {
    let result = ''
    splitLogTime = time.split('-')
    result = splitLogTime[2] + '/' + splitLogTime[1] + '/' + splitLogTime[0]
    return result
}