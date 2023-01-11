import React from "react";
import "../../style/message.css"

export function MyMessage({message, className}) {
    return (
        <div className="never-gonna">
            <span className={className}>{message}</span>
        </div>
    )
}