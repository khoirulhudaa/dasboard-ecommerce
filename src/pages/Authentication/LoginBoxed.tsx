import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import InputField from '../../components/inputField';
import { authSignOut } from '../../store/authSlice';
import { clearProducts } from '../../store/productSlice';
import { clearShop } from '../../store/shopSlice';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useLoginFormik } from '../../utils/validations/validationLogin';

const LoginBoxed = () => {
    
    const [errorStatus, setErrorStatus] = useState("")
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(setPageTitle('Login Boxed'));
        dispatch(authSignOut())
        dispatch(clearProducts())
        dispatch(clearShop())
    }, [])

    const handleError = (error: string) => {
        console.log('err vag:', error)
        setErrorStatus(error)
    }

    const formik = useLoginFormik({ onError: handleError })

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
                <h2 className="font-bold text-2xl mb-[15px] mt-5">Sign In</h2>
                <p className="mb-7">Enter your email and password to login</p>
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
                    <div>
                        <InputField 
                            value={formik.values.password} 
                            name='password' 
                            label='password'
                            type='password'
                            onError={formik.errors.password}
                            onTouched={!!formik.touched.password}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            placeholder="Enter Password" 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        SIGN IN
                    </button>
                    <div className="relative my-2 h-5 text-center before:w-full before:h-[1px] before:absolute before:inset-0 before:m-auto before:bg-[#ebedf2] dark:before:bg-[#253b5c]">
                        <div className="font-bold text-white-dark bg-white dark:bg-black px-2 relative z-[1] inline-block">
                            <span>OR</span>
                        </div>
                        <Link to="/auth/forgot-password" className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1">
                            <button type="submit" onClick={() => formik.handleSubmit} className="btn border-0 bg-transparent shadow-sm w-full">
                                FORGOT PASSWORD
                            </button>
                        </Link>
                    </div>
                </form>
                <div className='flex items-center justify-center mt-[70px]'>
                    <p className="text-center">
                        Dont&apos;t have an account ?
                        <Link to="/auth/signup" className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginBoxed;
