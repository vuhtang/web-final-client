import React, {useEffect} from 'react';
import "./style/panel.css"
import {fetchShots} from "./store/actions";
import {useDispatch, useSelector} from "react-redux";
import {Main} from "./components/main/Main";
import {Route, Routes} from "react-router-dom";
import {ErrorPage} from "./components/util/ErrorPage";
import {Login} from "./components/login/Login";
import {Layout} from "./components/util/Layout";

export function App() {

    const dispatch = useDispatch()
    const offset = useSelector(state => state.shot.offset)
    const pageSize = useSelector(state => state.shot.pageSize)

    useEffect(() => {
        dispatch(fetchShots(offset, pageSize))
    }, [dispatch, offset, pageSize])

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Route>
            </Routes>
        </div>
    );
}
