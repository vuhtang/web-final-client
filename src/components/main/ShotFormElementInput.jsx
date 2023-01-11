import React from "react";

export function ShotFormElementInput({title, valueGetter}) {

    function changeHandler (event) {
        const raw = event.currentTarget.value.trim()
        valueGetter(raw)
    }

    return (
        <div className="panel-element-inner">
            <h4>{title}</h4>
            <input
                type="text"
                maxLength={6}
                placeholder="Enter value..."
                onInput={changeHandler}
            />
        </div>
    )
}