import thunk from "redux-thunk";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {errorReducer, radiusReducer, shotsReducer} from "./reducers/reducers";


// state = {
//     shot: {
//         currPage: 0
//         pageSize: 10
//         totalRecords: 0
//         shots: []
//     },
//     radius: {
//         value: 1
//     },
//         error: {
//             message: ''
//         }
// }

const root =combineReducers({
    shot: shotsReducer,
    radius: radiusReducer,
    error: errorReducer
})

export const store = configureStore({
        reducer: root,
        middleware: [thunk],
    }
)