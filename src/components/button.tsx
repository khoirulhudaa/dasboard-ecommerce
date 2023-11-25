import React from 'react'

const Button = ({
    typeButton,
    text,
    icon,
    type,
    onClick,
    method,
    disabled=false
}: { 
    typeButton?:string, 
    text?: string, 
    icon?: React.ReactNode, 
    type?: "button" | "submit" | "reset", 
    onClick?: () => void,
    method?: string,
    disabled?: boolean
}) => {
    switch(typeButton) {
        case "with-icon":
            return (
                <button disabled={disabled} type={type} className={`w-max flex items-center border-0 h-max px-4 py-3 text-white ${method === 'delete' && !disabled ? 'bg-red-500' : method === 'update' && !disabled ? 'bg-yellow-500' : disabled ? 'bg-slate-300' : 'bg-blue-500'} rounded-md shadow-md cursor-pointer hover:brightness-[94%] active:scale-[0.98] ${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:brightness-[94%] active:scale-[0.98]'} transition-100`} onClick={onClick}>
                    <p className='mr-4'>{text}</p> {icon}
                </button>
                )
        case "outline":
            return (
                <button disabled={disabled} type={type} className={`text-center w-max flex items-center justify-between border-[1px] border-blue-500 h-max px-6 py-3 text-blue-500 bg-transparent rounded-md shadow-md ${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:brightness-[94%] active:scale-[0.98]'} transition-100`} onClick={onClick}>
                    {text}
                </button>
            )
        case "outline-with-icon":
            return (
                <button disabled={disabled} type={type} className={`w-max flex items-center border-[1px] border-blue-500 justify-between h-max px-4 py-3 text-blue-500 bg-transparent rounded-md shadow-md ${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:brightness-[94%] active:scale-[0.98]'} transition-100`} onClick={onClick}>
                    <p className='mr-4'>{text}</p> {icon}
                </button>
            )
        default:
            return (
                <button disabled={disabled} type={type} className={`text-center w-max flex items-center border-0 h-max px-6 py-3 text-white ${method === 'delete' && !disabled ? 'bg-red-500' : method === 'update' && !disabled ? 'bg-yellow-500' : disabled ? "bg-slate-300" : 'bg-blue-500'} rounded-md shadow-md ${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:brightness-[94%] active:scale-[0.98]'} transition-100`} onClick={onClick}>
                    {text}
                </button>
            )
    }
}

export default Button
