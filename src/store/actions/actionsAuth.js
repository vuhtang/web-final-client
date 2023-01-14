import axios from "axios";
import {setErrorMessage} from "./actionsShots";
import {BEARER, LOGIN, LOGOUT, SET_AUTH_ERROR} from "../../utils/const/actionTypes";

export function fetchRegister(username, password) {
    return function (dispatch) {
        let data = {
            username: username,
            password: password
        }
        axios.post('http://localhost:8080/api/auth/register', data)
            .then(res => res.data)
            .then((res) => {
                if (res.message === 'success')
                    dispatch(login(username, res.token))
                dispatch(setAuthErrorMessage(res.message))
            })
            .catch(() => {
                dispatch(setErrorMessage('Server is currently unavailable'))
            })
    }
}

export function fetchLogin(username, password) {
    return function (dispatch) {
        let data = {
            username: username,
            password: password
        }
        axios.post('http://localhost:8080/api/auth/login', data)
            .then(res => res.data)
            .then((res) => {
                if (res.message === 'success') {
                    console.log(res)
                    dispatch(login(username, res.token))
                }
                dispatch(setAuthErrorMessage(res.message))
            })
            .catch(() => {
                dispatch(setErrorMessage('Server is currently unavailable'))
            })
    }
}

export function logOutAndClearMessage() {
    return function (dispatch) {
        dispatch(setAuthErrorMessage(''))
        dispatch(logOut())
    }
}

function login(username, token) {
    token = BEARER + token
    return {
        type: LOGIN,
        payload: {
            username: username,
            token: token
        }
    }
}

export function logOut() {
    return {
        type: LOGOUT
    }
}

export function setAuthErrorMessage(message) {
    return {
        type: SET_AUTH_ERROR,
        payload: message
    }
}