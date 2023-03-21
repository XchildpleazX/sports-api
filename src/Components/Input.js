import React from "react";

function Input({
    type,
    label,
    onChange
}) {
    return (
        <div className='Input-Wrapper'>
            <label>{label}</label>
            <input
                type={type}
                onChange={onChange}
            />
        </div>
    );
}
export default Input;