import React from "react";
import {NavLink} from "react-router-dom";

export function Navbar() {

    return (
        <div className="header-element">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
        </div>
    )
}