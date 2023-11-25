interface onOffInterface {
    status?: boolean,
    onClick?: () => void
}

const OnOff: React.FC<onOffInterface> = ({
    status,
    onClick
}) => {
  return (
    <div onClick={onClick} className={`left-[85%] w-[50px] h-[20px] flex items-center rounded-full ${status ? 'bg-blue-300' : 'bg-slate-300'} relative duration-100`}>
        <div onClick={onClick} className={`rounded-full w-[28px] h-[28px] cursor-pointer hover:brightness-[90%] active:scale-[0.97] ${status ? 'bg-blue-500 left-[50%]' : 'bg-slate-400 left-[0%]'} absolute duration-100`}>
        </div>
    </div>
  )
}

export default OnOff
