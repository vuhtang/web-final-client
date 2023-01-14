import {
    CLEAR, LOAD_SHOTS,
    REMOVE_ERROR_MESSAGE, SET_ERROR_MESSAGE,
    SET_OFFSET, SET_RADIUS,
    SET_TOTAL_RECORDS
} from "../../utils/const/actionTypes.js";
import axios from "axios";

const config = (token) => {
    return {
        headers: {
            'Authorization': token
        }
    }
}

export function addShot(shot, pageSizeIsExhausted, lastPageOffset, pageSize, offset, token) {
    return function (dispatch) {
        if (pageSizeIsExhausted && offset !== lastPageOffset) {
            axios.post('http://localhost:8080/api/shots', shot, config(token)).then(() => {

                dispatch(setOffset(lastPageOffset))
                dispatch(fetchShots(lastPageOffset, pageSize, token))
            }).catch(() => {
                dispatch(setErrorMessage('Server is currently unavailable'))
            })
            return
        }
        if (pageSizeIsExhausted && offset === lastPageOffset) {
            lastPageOffset++
            axios.post('http://localhost:8080/api/shots', shot, config(token)).then(() => {
                dispatch(setOffset(lastPageOffset))
                dispatch(fetchShots(lastPageOffset, pageSize, token))
            }).catch(() => {
                dispatch(setErrorMessage('Server is currently unavailable'))
            })
        } else {
            axios.post('http://localhost:8080/api/shots', shot, config(token)).then(() => {
                dispatch(fetchShots(lastPageOffset, pageSize, token))
            }).catch(() => {
                dispatch(setErrorMessage('Server is currently unavailable'))
            })
        }
    }
}

export function fetchShots(offset, pageSize, token) {
    return function (dispatch) {
        axios.get(`http://localhost:8080/api/shots/pagination/${offset}/${pageSize}`, config(token))
            .then((res) => {
                let page = res.data
                dispatch(loadShots(page["content"]))
                dispatch(setTotalRecords(page["totalElements"]))
            }).then(() => {
            dispatch(removeErrorMessage())
        }).catch(() => {
            dispatch(setErrorMessage('Server is currently unavailable'))
        })
    }
}

export function clear(token) {
    return function (dispatch) {
        axios.delete('http://localhost:8080/api/shots', config(token))
            .then(() => {
                dispatch(deleteShots())
                dispatch(setOffset(0))
                dispatch(setTotalRecords(0))
                dispatch(removeErrorMessage())
            }).catch(() => {
            dispatch(setErrorMessage('Server is currently unavailable'))
        })
    }
}

function loadShots(shots) {
    shots.forEach((shot) => {
        shot.x = Math.round(shot.x * 1000) / 1000
        shot.y = Math.round(shot.y * 1000) / 1000
        shot.execTime = ` ${Math.round(shot.execTime / 1000) / 1000} ms `
    })
    return {
        type: LOAD_SHOTS,
        payload: shots
    }
}

function deleteShots() {
    return {
        type: CLEAR
    }
}

export function setRadius(radius) {
    return {
        type: SET_RADIUS,
        payload: radius
    }
}

export function setErrorMessage(errorMessage) {
    return {
        type: SET_ERROR_MESSAGE,
        payload: errorMessage
    }
}

export function removeErrorMessage() {
    return {
        type: REMOVE_ERROR_MESSAGE
    }
}

export function setOffset(value) {
    return {
        type: SET_OFFSET,
        payload: value
    }
}

export function setTotalRecords(value) {
    return {
        type: SET_TOTAL_RECORDS,
        payload: value
    }
}