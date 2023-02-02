import { postRequest } from "../http";
import randomWords from 'random-words'
import {getAdminBaseUrl} from '../../assets/constants/index'
import * as Sentry from "@sentry/browser";
const RESET_PASSWORD_URL = getAdminBaseUrl() + "api/users/reset-password"
const LOGIN_URL = getAdminBaseUrl() + "api/users/login"

const generateRandomWords = (nrOfWords) => {
    const words = randomWords(nrOfWords).toString().replaceAll(",", " ");
    return words;
}

const login = async (email, password) => {
    try {
        const body ={
            email: email,
            password: password
        }

        const res = await postRequest(LOGIN_URL, body)
        console.log("res: ", res)
        Sentry.captureMessage("User logged in (this is temp, remove this capture)");

        return { data: res.data, code: 200, message: "OK" }
    } catch (error) {
        console.log("error: ", error)
        Sentry.captureException(error);
        return { data: undefined, code: 400, message: error.message }
    }
}

const createPassword = async (token, password) => {
    try {
        const body = {
            token: token,
            password: password
        }

        const res = await postRequest(RESET_PASSWORD_URL, body)
        console.log("res: ", res)
        return { data: res.data, code: 200, message: "OK" }
    } catch (error) {
        console.log("error: ", error)
        Sentry.captureException(error);
        return { data: undefined, code: 400, message: error.message }
    }
}

const validatePasswordStrength = (password, pswRe) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; //eslint-disable-line
    const digits = /\d/;  //eslint-disable-line
    const caps = /[A-Z]/; //eslint-disable-line
    const low = /[a-z]/; //eslint-disable-line
    const response = {
        length: false,
        special: false,
        caps: false,
        low: false,
        digit: false,
        match: false,
        valid: false
    }
    if (!password) return response

    var valid = true

    if (password.length >= 8) response.length = true
    else valid = false
    if (specialChars.test(password)) response.special = true
    else valid = false
    if (digits.test(password)) response.digit = true
    else valid = false
    if (caps.test(password)) response.caps = true
    else valid = false
    if (low.test(password)) response.low = true
    else valid = false
    if (password == pswRe) response.match = true
    else valid = false

    response.valid = valid;

    return response;

}

export { createPassword, validatePasswordStrength, login, generateRandomWords }
