import React from "react";
import {ShotFormElementInput} from "./ShotFormElementInput.jsx";
import {useFormInput} from "../../hooks/formInput.js";
import {useDispatch} from "react-redux";
import {addShot} from "../../store/actions";
import {MyMessage} from "../util/MyMessage";
import {useShots} from "../../hooks/shots";

export function ShotForm() {

    const {coords, valid, getRValue, getYValue, getXValue, error} = useFormInput()
    const {pageSizeIsExhausted, lastPageOffset, pageSize, offset} = useShots()
    const dispatch = useDispatch()

    const submitHandler = (event) => {
        event.preventDefault()
        let data = {
            x: coords.xValue,
            y: coords.yValue,
            r: coords.radius
        }
        dispatch(addShot(data, pageSizeIsExhausted, lastPageOffset, pageSize, offset))
    }

    return (
        <div className="panel-element">
            <form id="shot" onSubmit={submitHandler}>
                <MyMessage message={error} className={'warning'} />
                <ShotFormElementInput title={'X'} valueGetter={getXValue} />
                <ShotFormElementInput title={'Y'} valueGetter={getYValue} />
                <ShotFormElementInput title={'R'} valueGetter={getRValue} />
                <div className="panel-element-inner">
                    <button type="submit" id="fire" disabled={!valid}>FIRE</button>
                </div>
            </form>
        </div>
    )
}