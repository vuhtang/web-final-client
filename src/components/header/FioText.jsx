import React from "react";
export function FioText(props) {

    return (
        <div className="fio-text">
            <span className="fio-text-before">{props.fio_text_before}</span>
            <span className="fio-text-after">{props.fio_tet_after}</span>
        </div>
    )
}