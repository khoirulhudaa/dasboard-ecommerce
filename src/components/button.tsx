import React from 'react'

const Button = ({
    typeButton,
    text,
    icon,
    onClick,
}: { typeButton:string, text: string, icon?: React.ReactNode, onClick?: () => void }) => {
    switch(typeButton) {
        case "with-icon":
            return (
                <div className='w-max flex items-center border-0 h-max px-4 py-2 text-white bg-blue-500 rounded-md shadow-md cursor-pointer hover:brightness-[94%] active:scale-[0.98] transition-100'>
                    {text} {icon}
                </div>
                )
        case "outline":
            return (
                <div className='w-max flex items-center border-[1px] border-blue-500 h-max px-4 py-2 text-blue-500 bg-transparent rounded-md shadow-md cursor-pointer hover:bg-blue-500 hover:text-white active:scale-[0.98] transition-100'>
                    {text}
                </div>
            )
        case "outline-with-icon":
            return (
                <div className='w-max flex items-center border-[1px] border-blue-500 h-max px-4 py-2 text-blue-500 bg-transparent rounded-md shadow-md cursor-pointer hover:bg-blue-500 hover:text-white active:scale-[0.98] transition-100'>
                    {text} {icon}
                </div>
            )
        default:
            return (
                <div className='+w-max flex items-center border-0 h-max px-4 py-2 text-white bg-blue-500 rounded-md shadow-md cursor-pointer hover:brightness-[94%] active:scale-[0.98] transition-100'>
                    {text}
                </div>
            )
    }
}

export default Button
