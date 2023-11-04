import { Link } from 'react-router-dom'
import Button from '../../components/button'

const SuccessSendEmail = () => {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center text-center'>
      <div className='w-[100vw] h-[100vh] md:w-[40vw] md:h-[340px] rounded-[20px] p-4 bg-white shadow-md flex flex-col items-center justify-center'>
        <div className='w-[120px] h-[120px] overflow-hidden flex justify-center items-center p-2'>
            <img src="/assets/images/mail.png" alt="icon-message" />
        </div>
        <p className='mt-4 text-[14px] text-slate-400 font-normal mb-5 w-[90%]'>An email message to reset your password has been sent to your email. Check it now</p>
        <Link to={'/auth/signin'}>
            <Button text='Close' method='delete' />
        </Link>
      </div>    
    </div>
  )
}

export default SuccessSendEmail
 