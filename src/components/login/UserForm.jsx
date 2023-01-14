import React from "react";
import {MyMessage} from "../util/MyMessage";
import {FormElementInput} from "../util/FormElementInput";
import {useUserFormInput} from "../../hooks/form_input/userFormInput";
import {useDispatch, useSelector} from "react-redux";

export function UserForm({fetch, button, onClick}) {

    const {username, password, getUsername, getPassword, validate, error} = useUserFormInput()
    const externalError = useSelector(state => state.auth.error)

    const dispatch = useDispatch()

    const submitHandler = (event) => {
        event.preventDefault();

        if (validate())
            dispatch(fetch(username, password))
    }

    const exactError = () => {
        return error.length === 0 ? externalError : error
    }

    return (
        <>
            <div className="panel-element">
                <form id="shot" onSubmit={submitHandler}>
                    <MyMessage message={exactError()} className={'warning'}/>
                    <FormElementInput title={'Username'} valueGetter={getUsername} inputType={'text'} maxLength={12}/>
                    <FormElementInput title={'Password'} valueGetter={getPassword} inputType={'password'}
                                      maxLength={12}/>
                    <div className="panel-element-inner">
                        <button type="submit" id="login">{button}</button>
                    </div>
                </form>
            </div>
            <div className="panel-element">
                {button === 'LogIn' ?
                    <div className="register">Not registered? <span id="register" onClick={onClick}>Register. </span>
                    </div> :
                    <span id="back" onClick={onClick}>Back</span>
                }
            </div>
        </>
    )
}