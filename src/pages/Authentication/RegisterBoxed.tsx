import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { signSellerInterface } from '../../interfaces/signSellerInterface';
import API from '../../services/api';
import { setPageTitle } from '../../store/themeConfigSlice';

const RegisterBoxed = () => {
    
    const dispatch = useDispatch();
    const [errorStatus, setErrorStatus] = useState(null)
  
    const formik = useFormik<signSellerInterface>({
        initialValues: {
            seller_name: '',
            email_seller: '',
            password: '',
            telephone_seller: '',
            gender: '' 
        },
        validationSchema: Yup.object({
            seller_name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('This field is required.'),
            email_seller: Yup.string()
            .email('Invalid email address')
            .required('This field is required.'),
            password: Yup.string()
            .min(6, 'Must be at least 6 characters')
            .required('This field is required.'),
            telephone_seller: Yup.string()
            .max(13, 'Maximum only 13 characters')
            .required('This field is required.'),
            gender: Yup.string()
            .required('This field is required.')
            .oneOf(['Male', 'Female'], 'Invalid gender')
        }),
        onSubmit: async (values) => {
            try {
                console.log('values:', values)
                const response: AxiosResponse = await API.createAccountSeller(values)
                console.log('result response:', response)
                if(response.data.status === 200) {
                    await formik.setValues({
                        seller_name: '',
                        email_seller: '',
                        password: '',
                        telephone_seller: '',
                        gender: ''
                    })
                    formik.resetForm()
                    setErrorStatus(null);
                }else if(response.data.status === 401) {
                    setErrorStatus(response.data.message)
                }
            } catch (error: any) {
                console.log(error)
                setErrorStatus(error.message)
            }
        }
    })


    useEffect(() => {
        dispatch(setPageTitle('Register Boxed'));
    });
    
    return (
        <div>
            <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')]">
                <div className="panel sm:w-[480px] m-6 max-w-lg w-full">
                    <small className='text-[red] tex-[12px] font-normal mb-4'>
                        {errorStatus !== null ? errorStatus: ''}
                    </small>
                    <h2 className="font-bold text-2xl mb-3">Sign Up</h2>
                    <p className="mb-7">Lets go join with ElectShop</p>
                    <form className="space-y-5" onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" name='seller_name' value={formik.values.seller_name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-input" placeholder="Enter Name" />
                            {formik.touched.seller_name && formik.errors.seller_name ? (
                                <small className='text-[red] text-[12px] font-normal my-2'>
                                    {formik.errors.seller_name}
                                </small>
                            ):
                            null}
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" name='email_seller' value={formik.values.email_seller} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-input" placeholder="Enter Email" />
                            {formik.touched.email_seller && formik.errors.email_seller ? (
                                <small className='text-[red] text-[12px] font-normal my-2'>
                                    {formik.errors.email_seller}
                                </small>
                            ):
                            null}
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-input" placeholder="Enter Password" />
                            {formik.touched.password && formik.errors.password ? (
                                <small className='text-[red] text-[12px] font-normal my-2'>
                                    {formik.errors.password}
                                </small>
                            ):
                            null}
                        </div>
                        <div>
                            <label htmlFor="telpehone">Number telephone</label>
                            <input id="telephone" type="text" name='telephone_seller' value={formik.values.telephone_seller} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-input" placeholder="08xxxxxxxxxxx" />
                            {formik.touched.telephone_seller && formik.errors.telephone_seller ? (
                                <small className='text-[red] text-[12px] font-normal my-2'>
                                    {formik.errors.telephone_seller}
                                </small>
                            ):
                            null}
                        </div>
                        <div>
                            <label htmlFor="gender">Gender</label>
                            <select name='gender' className='w-[90%] bg-white outline-0 border-0 p-2 box-sizing' value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                <option value="">Select your gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        {formik.touched.gender && formik.errors.gender ? (
                            <small className='text-[red] text-[12px] font-normal my-2'>
                                {formik.errors.gender}
                            </small>
                        ):
                        null}
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
                        <Link to="/auth/boxed-signin" className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterBoxed;
