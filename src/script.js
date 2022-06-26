const createAccountPage = document.querySelector('#createAccountLink')
const loginPage = document.querySelector('#loginLink')
const loginForm = document.querySelector('#login')
const createAccount = document.querySelector('#createAccount')

// const submitButton = document.querySelector(".form-button")
// const formInput = document.querySelector("form-input")

function signup(event) {
    event.preventDefault()
    const username = document.querySelector('#createusername').value
    const password = document.querySelector('#createusernamepw').value
    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    let exist = formData.length && JSON.parse(localStorage.getItem('formData')).some(data => data.username == username)
    if (!exist) {
        formData.push({ username, password })
        localStorage.setItem('formData', JSON.stringify(formData));
        loginForm.reset();
        alert("Account Created.\n Please Sign In here.");
        window.location.replace("index.html");

    } else {
        alert("You have already signed up plesse sign in here");
        window.location.replace("index.html");
    }

}
function check(event) {
    event.preventDefault()
    // stored data from the register-form
    let userName = document.getElementById('signinusername').value;
    let userPw = document.getElementById('signinpw').value;

    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    let exist = formData.length > 0 && formData.some(data => data.username == userName && data.password == userPw)
    if (exist) {
        window.location.replace("dashboard.html")

    } else {
        alert('please enter the correct info');
        return
    }
}

createAccountPage.addEventListener('click', (e) => {
    e.preventDefault()
    loginForm.classList.add('form-hidden')
    createAccount.classList.remove('form-hidden')
})

loginPage.addEventListener('click', (e) => {
    e.preventDefault()
    loginForm.classList.remove('form-hidden')
    createAccount.classList.add('form-hidden')
})





