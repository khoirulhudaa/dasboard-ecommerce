import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';
import API from '../../services/api';
import { AxiosResponse } from 'axios';
import { signupSellerInterface } from '../../interfaces/signupSellerInterface';

const RegisterBoxed = () => {

    const [data, setData] = useState({
        seller_name: '',
        email_seller: '',
        password: '',
        telephone_seller: '',
        gender: ''
    })
    const [errorStatus, setErrorStatus] = useState(null)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Register Boxed'));
    });
    
    const handleChange = (e: any) => {
        const { value, name } = e.target
        setData({
            ...data,
            [name]: value
        })
    };

    const onSubmit = async (e: any) => {
        e.preventDefault()
        console.log('cek data:', data)
        
        const response: AxiosResponse<signupSellerInterface> = await API.createAccountSeller(data)
        if(response) {
            console.log(response)
        }
    }

    console.log('data :', data)
    return (
        <div>
            <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')]">
                <div className="panel sm:w-[480px] m-6 max-w-lg w-full">
                    <h2 className="font-bold text-2xl mb-3">Sign Up</h2>
                    <p className="mb-7">Lets go join with ElectShop</p>
                    <form className="space-y-5">
                        <div>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" name='seller_name' onChange={(e) => handleChange(e)} className="form-input" placeholder="Enter Name" />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" name='email_seller' onChange={(e) => handleChange(e)} className="form-input" placeholder="Enter Email" />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" name='password' onChange={(e) => handleChange(e)} className="form-input" placeholder="Enter Password" />
                        </div>
                        <div>
                            <label htmlFor="telpehone">Number telephone</label>
                            <input id="telephone" type="text" name='telephone_seller' onChange={(e) => handleChange(e)} className="form-input" placeholder="08xxxxxxxxxxx" />
                        </div>
                        <div>
                            <label htmlFor="gender">Gender</label>
                            <select name='gender' className='w-[90%] bg-white outline-0 border-0 p-2 box-sizing' onChange={(e) => handleChange(e)}>
                                <option value="">Select your gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary w-full" onClick={(e) => onSubmit(e)}>
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
