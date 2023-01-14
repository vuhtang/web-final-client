import React from "react";

export function FormElementInput({title, valueGetter, inputType, maxLength}) {

    function changeHandler(event) {
        const raw = event.currentTarget.value.trim()
        valueGetter(raw)
    }

    return (
        <div className="panel-element-inner">
            <h4>{title}</h4>
            <input
                type={inputType}
                maxLength={maxLength}
                placeholder="Enter value..."
                onInput={changeHandler}
            />
        </div>
    )
}