import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../components/inputField';
import { useForgotPassword } from '../../utils/validations/validationForgotPassword';

const ForgotPassword = () => {
    
    const [errorStatus, setErrorStatus] = useState("")

    const handleError = (error: string) => {
        setErrorStatus(error)
    }

    const formik = useForgotPassword({ onError: handleError })

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel sm:w-[480px] m-6 max-w-lg w-full">
                {
                    errorStatus !== "" ? (
                        <>
                            <small className='text-[white] rounded-full px-4 py-1 text-[12px] font-normal bg-[red] mb-[120px]'>
                                {errorStatus}
                            </small>
                        </>
                    ):
                        null
                }
                <h2 className="font-bold text-2xl mb-[15px] mt-5">Forgot password</h2>
                <form className="space-y-5" onSubmit={formik.handleSubmit}>
                    <div>
                        <InputField 
                            value={formik.values.email_seller} 
                            name='email_seller' 
                            label='email'
                            onError={formik.errors.email_seller}
                            onTouched={!!formik.touched.email_seller}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            placeholder="Enter Email" 
                        />
                    </div>
                    <button type="submit" onClick={() => formik.handleSubmit} className="btn btn-primary w-full">
                        SEND RESET LINK
                    </button>
                    <div className="relative my-2 h-max text-center before:w-full before:h-[1px] before:absolute before:inset-0 before:m-auto before:bg-[#ebedf2] dark:before:bg-[#253b5c]">
                        <div className="font-bold text-white-dark bg-white dark:bg-black px-2 relative z-[1] inline-block">
                            <span>OR</span>
                        </div>
                    </div>
                    <div className='flex items-center justify-center mt-[70px]'>
                        <p className="text-center">
                            Back to login page ?
                            <Link to="/auth/signin" className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1">
                                Here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
