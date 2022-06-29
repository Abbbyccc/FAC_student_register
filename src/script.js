const createAccountPage = document.querySelector('#createAccountLink')
const loginPage = document.querySelector('#loginLink')
const loginForm = document.querySelector('#login')
const createAccount = document.querySelector('#createAccount')


function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}



function signup(event) {
    event.preventDefault()
    const email = document.querySelector('#register-email').value
    const username = document.querySelector('#createusername').value
    const password = document.querySelector('#createusernamepw').value
    const confirmPW = document.querySelector('#confirmPW').value
    let errorMsg = document.querySelector('.error-msg-singup')

    if (email.length == 0 || username.length == 0 || password.length == 0) {
        errorMsg.textContent = 'please enter all information'
        return
    } else if (validateEmail(email) !== true) {
        errorMsg.textContent = 'please enter correct email eg. xxx@xx.xx'
        return
    } else if (password !== confirmPW) {
        errorMsg.textContent = 'password you entered is not matching'
        return
    } else {
        let formData = JSON.parse(localStorage.getItem('formData')) || [];

        let exist = formData.length && JSON.parse(localStorage.getItem('formData'))
            .some(data => data.username.toLowerCase() == username.toLowerCase() && data.email.toLowerCase() == email.toLowerCase())
        if (!exist) {
            formData.push({ username, email, password })
            localStorage.setItem('formData', JSON.stringify(formData));
            loginForm.reset();
            alert("Account Created. Please Sign In here.");
            window.location.replace("index.html");

        } else {
            errorMsg.textContent = "You have already signed up plesse sign in here";
            window.location.replace("index.html");
        }
    }
}
function check(event) {
    event.preventDefault()
    // stored data from the register-form
    let userName = document.getElementById('signinusername').value;
    let userPw = document.getElementById('signinpw').value;
    let errorMsgSignin = document.querySelector('.error-msg-login')
    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    console.log(formData)
    let exist = formData.length > 0 && formData
        .some(data => (data.username.toLowerCase() == userName.toLowerCase() || data.email.toLowerCase() == userName.toLowerCase()) && data.password == userPw)
    if (!exist) {
        errorMsgSignin.textContent = 'Please enter the correct info';
        return
    } else {
        window.location.replace("dashboard.html")

    }
}

createAccountPage.addEventListener('click', (event) => {
    event.preventDefault()
    loginForm.classList.add('form-hidden')
    createAccount.classList.remove('form-hidden')
})

loginPage.addEventListener('click', (event) => {
    event.preventDefault()
    loginForm.classList.remove('form-hidden')
    createAccount.classList.add('form-hidden')
})
