import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { setPageTitle } from '../../store/themeConfigSlice';

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

        try {
            const response: AxiosResponse = await API.createAccountSeller(data)
            console.log('result response:', response)
            if(response.data.status === 200) {
                setData({
                    seller_name: '',
                    email_seller: '',
                    password: '',
                    telephone_seller: '',
                    gender: ''
                });
                // Clear any error status if needed
                setErrorStatus(null);
            }else if(response.data.status === 401) {
                console.log('response4', response)
            }
        } catch (error: any) {
            console.log(error)
            setErrorStatus(error)
        }
    }

    return (
        <div>
            <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')]">
                <div className="panel sm:w-[480px] m-6 max-w-lg w-full">
                    <small className='text-[red] tex-[12px] font-normal mb-4'>
                    {/* {errorStatus !== null
                    ? errorStatus
                    : ''} */}
                    </small>
                    <h2 className="font-bold text-2xl mb-3">Sign Up</h2>
                    <p className="mb-7">Lets go join with ElectShop</p>
                    <form className="space-y-5">
                        <div>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" name='seller_name' value={data.seller_name} onChange={(e) => handleChange(e)} className="form-input" placeholder="Enter Name" />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" name='email_seller' value={data.email_seller} onChange={(e) => handleChange(e)} className="form-input" placeholder="Enter Email" />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" name='password' value={data.password} onChange={(e) => handleChange(e)} className="form-input" placeholder="Enter Password" />
                        </div>
                        <div>
                            <label htmlFor="telpehone">Number telephone</label>
                            <input id="telephone" type="text" name='telephone_seller' value={data.telephone_seller} onChange={(e) => handleChange(e)} className="form-input" placeholder="08xxxxxxxxxxx" />
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
