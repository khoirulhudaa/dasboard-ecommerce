import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import SweetAlert from '../../components/alertBox';
import InputField from '../../components/inputField';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useRegistrationFormik } from '../../utils/validations/validationRegister';

const RegisterBoxed = () => {
    
    const dispatch = useDispatch();
    const [errorStatus, setErrorStatus] = useState("")
    const [alertStatus, setAlertStatus] = useState(false)

    const handleErrorMessage = (error: string) => {
        setErrorStatus(error)
    }

    const handleAlertMessage = (alert: boolean) => {
        setAlertStatus(alert)
    }

    const listGender = [
        {label: "Select your gender", value: ""},
        {label: "Male", value: "Male"},
        {label: "Female", value: "Female"}
    ]

    const formik = useRegistrationFormik({ onError: handleErrorMessage, onAlert: handleAlertMessage })

    useEffect(() => {
        dispatch(setPageTitle('Register Boxed'));
    });

    return (
        <div>
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
                <h2 className="font-bold text-2xl mb-[15px] mt-5">Sign Up</h2>
                    <p className="mb-7">Lets go join with ElectShop</p>
                    {
                        alertStatus ? (
                            <SweetAlert 
                                title="Succes Register"
                                type="success"
                            />
                        ):
                        <></>
                    }
                    <form className="space-y-5" onSubmit={formik.handleSubmit}>
                        <div>
                            <InputField 
                                value={formik.values.seller_name} 
                                name='seller_name' 
                                label='seller name'
                                id='sellerName'
                                onError={formik.errors.seller_name}
                                onTouched={!!formik.touched.seller_name}
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                                placeholder="Enter Your Name" 
                            />
                        </div>
                        <div>
                            <InputField 
                                value={formik.values.email_seller} 
                                name='email_seller' 
                                label='email'
                                id='email'
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
                                id='password'
                                label='password'
                                onError={formik.errors.password}
                                onTouched={!!formik.touched.password}
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                                placeholder="Enter Password" 
                            />
                        </div>
                        <div>
                        <InputField 
                            value={formik.values.telephone_seller} 
                            name='telephone_seller' 
                            label='Number Telephone'
                            id='telephone'
                            onError={formik.errors.telephone_seller}
                            onTouched={!!formik.touched.telephone_seller}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            placeholder="Your number" 
                        />
                        </div>
                        <div>
                        <InputField 
                            value={formik.values.gender} 
                            name='gender' 
                            label='Gender'
                            id='gender'
                            typeInput='select-input'
                            onError={formik.errors.gender}
                            onTouched={!!formik.touched.gender}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            options={listGender}
                        />
                        </div>
                        <button type="submit" className="btn btn-primary w-full" onClick={() => formik.handleSubmit}>
                            SIGN UP
                        </button>
                    </form>
                    <div className="relative my-4 h-5 text-center before:w-full before:h-[1px] before:absolute before:inset-0 before:m-auto before:bg-[#ebedf2] dark:before:bg-[#253b5c]">
                        <div className="font-bold text-white-dark bg-white dark:bg-black px-2 relative z-[1] inline-block">
                            <span>OR</span>
                        </div>
                    </div>
                    <p className="text-center">
                        Already have an account ?
                        <Link to="/auth/signin" className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterBoxed;
