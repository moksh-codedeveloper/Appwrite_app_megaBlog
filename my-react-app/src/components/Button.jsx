import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = "text-white",
    className = '',
    ...props
}){
    const onClick = (e) => {
        e.preventDefault();
    }
    return (
        <button className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`} {...props} onChange={onClick}>
            {children}
        </button>
    )
}

export default Button
