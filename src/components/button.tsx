import React from 'react'

const Button = ({
    typeButton,
    text,
    icon,
    type,
    onClick,
}: { typeButton?:string, text?: string, icon?: React.ReactNode, type?: "button" | "submit" | "reset", onClick?: () => void }) => {
    switch(typeButton) {
        case "with-icon":
            return (
                <button type={type} className='w-max flex items-center border-0 h-max px-4 py-2 text-white bg-blue-500 rounded-md shadow-md cursor-pointer hover:brightness-[94%] active:scale-[0.98] transition-100' onClick={onClick}>
                    {text} {icon}
                </button>
                )
        case "outline":
            return (
                <button type={type} className='text-center w-max flex items-center border-[1px] border-blue-500 h-max px-6 py-2 text-blue-500 bg-transparent rounded-md shadow-md cursor-pointer hover:brightness-[94%] hover:text-white active:scale-[0.98] transition-100' onClick={onClick}>
                    {text}
                </button>
            )
        case "outline-with-icon":
            return (
                <button type={type} className='w-max flex items-center border-[1px] border-blue-500 h-max px-4 py-2 text-blue-500 bg-transparent rounded-md shadow-md cursor-pointer hover:brightness-[94%] hover:text-white active:scale-[0.98] transition-100' onClick={onClick}>
                    {text} {icon}
                </button>
            )
        default:
            return (
                <button type={type} className='text-center w-max flex items-center border-0 h-max px-6 py-2 text-white bg-blue-500 rounded-md shadow-md cursor-pointer hover:brightness-[94%] active:scale-[0.98] transition-100' onClick={onClick}>
                    {text}
                </button>
            )
    }
}

export default Button
