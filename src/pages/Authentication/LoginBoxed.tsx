import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signSellerInterface } from '../../interfaces/signSellerInterface';
import API from '../../services/api';

const LoginBoxed = () => {
    const [data, setData] = useState({
        email_seller: '',
        password: ''
    })

    const [errorStatus, setErrorStatus] = useState(null)
    
    const navigate = useNavigate();

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()

        try {
            const response: AxiosResponse<signSellerInterface> = await API.checkAccountSeller(data)
            if(response.status === 200) {
                setData({
                    email_seller: '',
                    password: ''
                })
                setErrorStatus(null)
                navigate('/')
            }
        } catch (error: any) {
            setErrorStatus(error.message)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel sm:w-[480px] m-6 max-w-lg w-full">
                <h2 className="font-bold text-2xl mb-3">Sign In</h2>
                <p className="mb-7">Enter your email and password to login</p>
                <form className="space-y-5" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" value={data.email_seller} name='email_seller' onChange={(e) => handleChange(e)} className="form-input" placeholder="Enter Email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" value={data.password} name='password' onChange={(e) => handleChange(e)} className="form-input" placeholder="Enter Password" />
                    </div>
                    <button type="submit" onClick={(e) => onSubmit(e)} className="btn btn-primary w-full">
                        SIGN IN
                    </button>
                </form>
                <div className="relative my-7 h-5 text-center before:w-full before:h-[1px] before:absolute before:inset-0 before:m-auto before:bg-[#ebedf2] dark:before:bg-[#253b5c]">
                    <div className="font-bold text-white-dark bg-white dark:bg-black px-2 relative z-[1] inline-block">
                        <span>OR</span>
                    </div>
                </div>
                <p className="text-center">
                    Dont&apos;t have an account ?
                    <Link to="/auth/boxed-signup" className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginBoxed;
