import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../components/inputField';
import { useResetPassword } from '../../utils/validations/validationResetPassword';

const ResetPassword = () => {
    
    const [errorStatus, setErrorStatus] = useState("")

    const handleError = (error: string) => {
        setErrorStatus(error)
    }

    const formik = useResetPassword({ onError: handleError })

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
                <h2 className="font-bold text-2xl mb-[15px] mt-5">Change password</h2>
                <p className="mb-7">Enter your new password</p>
                <form className="space-y-5" onSubmit={formik.handleSubmit}>
                    <div>
                        <InputField 
                            value={formik.values.password} 
                            name='password' 
                            label='New password'
                            onError={formik.errors.password}
                            onTouched={!!formik.touched.password}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            placeholder="Enter Email" 
                        />
                    </div>
                    <div>
                        <InputField 
                            value={formik.values.confirmPassword} 
                            name='confirmPassword' 
                            label='Confirm new password'
                            onError={formik.errors.confirmPassword}
                            onTouched={!!formik.touched.confirmPassword}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            placeholder="Enter Password" 
                        />
                    </div>
                    <button type="submit" onClick={() => formik.handleSubmit} className="btn btn-primary w-full">
                        SAVE NOW
                    </button>
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

export default ResetPassword;