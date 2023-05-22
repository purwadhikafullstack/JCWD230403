export const API_URL = 'http://localhost:2343/api';

export const checkEmail = (email) => {
    let domain = /\.(com|id|co.id|org|gov|ac.id|my.id|xyz|tv)/;
    if(email.includes('@') && email.match(domain)) {
        return true;
    } else {
        return false;
    }
}

export const checkPassword = (password) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/;
    if (password.match(passwordPattern)) {
        return true
    } else {
        return false
    }
}

export const checkName = (name) => {
    const alphanumeric = /^[a-zA-Z0-9]+$/;
    if (name.length <= 100 && name.match(alphanumeric)){
        return true
    } else {
        return false
    }
}

export const checkPhone = (phone) => {
    const phonePattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/im;
    if (phone.match(phonePattern)) {
        return true
    } else {
        return false
    }
}