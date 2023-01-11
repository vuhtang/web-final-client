import React from "react";
import {useSelector} from "react-redux";
import {Graph} from "./Graph";
import {ShotForm} from "./ShotForm";
import {History} from "./History";
import {MyMessage} from "../util/MyMessage";

export function Main() {

    const errorMessage = useSelector(state => state.error.message)

    return (
        <div className="main">
            {errorMessage.length === 0 ?
                <>
                <div className="container">
                <Graph/>
                <ShotForm/>
                </div>
                <div className="container">
                <div className="panel-element">
                <h2>History</h2>
                </div>
                <History/>
                </div>
                </> : <MyMessage message={'Server in currently unavailable'} className={'big-warning'} />}
        </div>
    )
}