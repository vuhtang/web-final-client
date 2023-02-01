import React from "react";
import {FioText} from "./FioText";
import {Navbar} from "./Navbar";
import "../../style/header/header.css"

export function Header() {

    return (
        <div className="header">
            <div className="fio">
                <FioText fio_text_before={'Full name:'} fio_tet_after={'Varyukhin Ivan'}/>
                <FioText fio_text_before={'Variant:'} fio_tet_after={'23431'}/>
                <FioText fio_text_before={'Group:'} fio_tet_after={'P32302'}/>
            </div>
            <Navbar/>
        </div>
    )
}