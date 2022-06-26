const createAccountPage = document.querySelector('#createAccountLink')
const loginPage = document.querySelector('#loginLink')
const loginForm = document.querySelector('#login')
const createAccount = document.querySelector('#createAccount')

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