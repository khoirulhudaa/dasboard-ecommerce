import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SweetAlert from '../../components/alertBox';
import InputField from '../../components/inputField';
import API from '../../services/api';
import { authSignIn } from '../../store/authSlice';
import useUpdateAccountFormik from '../../utils/validations/validationUpdateAccount';

const Profile = () => {

    const [errorStatus, setErrorStatus] = useState<string>("");
    const [alertStatus, setAlertStatus] = useState<any>(null)
    const [updateStatus, setUpdateStatus] = useState<boolean>(false)
    const [updateAccount, setUpdateAccount] = useState<boolean>(false)

    const dispatch = useDispatch()
    const auth = useSelector((state: any) => state.authSlice.auth)
    
    useEffect(() => {
        const getDataAccount = async () => {
            try {
                const response = await API.getAccountSeller(auth.seller_id)
                dispatch(authSignIn(response.data.data[0]))
                setUpdateAccount(false)    
            } catch (error: any) {
                console.log('error account', error)
            }
        }

        getDataAccount()
    }, [updateAccount, dispatch])

    // Handle error from validasi formik
    const handleError = (error: any) => {
        setErrorStatus(error.message)
    }

    // Handle response success from formik
    const handleResponseUpdate = (response: any) => {
        if(response.data.status === 200) {
            setAlertStatus(true)
            setUpdateStatus(false)
            setUpdateAccount(true)
        } 
        setTimeout(() => {
            setAlertStatus(false)
        }, 1000)
    }

    const formikUpdateAccount = useUpdateAccountFormik({ onError: handleError, onResponse: handleResponseUpdate })

    const listGender = [
        {label: "Select your gender", value: "", disabled: true},
        {label: "Male", value: "Male"},
        {label: "Female", value: "Female"}
    ]

    return (
        <div>
            {
                alertStatus && (
                    <SweetAlert 
                        title='Success Update Account!'
                        type="success"
                        showConfirm={true}
                        showCancel={false}
                        confirmBtnText='Ok'
                    />
                )
            }
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Users
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Profile</span>
                </li>
            </ul>
            <form action="post" onSubmit={formikUpdateAccount.handleSubmit}>
                <div className="pt-5">
                    <div className="flex flex-wrap sm:flex-no-wrap justify-between mb-5">
                        <div className="panel w-[100%] md:w-[43%] lg:w-[43%] lg:mb-[0] mb-6">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Profile</h5>
                            </div>
                            <div className="mb-5">  
                            <div className='mb-5'>
                                <div className='rounded-full overflow-hidden border-[1px] border-black w-[112px] h-[110px] flex items-center bg-cover justify-center'>
                                    <img src={`https://huda.descode.id/uploads/${formikUpdateAccount.values.seller_image_old}`} alt="foto-profile" />
                                </div>
                            </div>
                                <div className='mb-5'>
                                    <InputField 
                                        disabled={updateStatus ? false : true}
                                        label="Seller name"
                                        type='text'
                                        id='seller_name'
                                        name='seller_name'
                                        onError={formikUpdateAccount.errors.seller_name}
                                        onTouched={!!formikUpdateAccount.touched.seller_name}
                                        onChange={formikUpdateAccount.handleChange}
                                        onBlur={formikUpdateAccount.handleBlur}
                                        value={formikUpdateAccount.values.seller_name}
                                    />
                                </div>
                                <div className='mb-5'>
                                    <InputField 
                                        disabled={updateStatus ? false : true}
                                        label="Email seller"
                                        type='email'
                                        id='email_seller'
                                        name='email_seller'
                                        onError={formikUpdateAccount.errors.email_seller}
                                        onTouched={!!formikUpdateAccount.touched.email_seller}
                                        onChange={formikUpdateAccount.handleChange}
                                        onBlur={formikUpdateAccount.handleBlur}
                                        value={formikUpdateAccount.values.email_seller}
                                    />
                                </div>
                                <div className='mb-5'>
                                    <InputField 
                                        disabled={updateStatus ? false : true}
                                        label="Gender"
                                        type='text'
                                        typeInput='select-input'
                                        id='gender'
                                        options={listGender}
                                        name='gender'
                                        onError={formikUpdateAccount.errors.gender}
                                        onTouched={!!formikUpdateAccount.touched.gender}
                                        onChange={formikUpdateAccount.handleChange}
                                        onBlur={formikUpdateAccount.handleBlur}
                                        value={formikUpdateAccount.values.gender}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="panel w-[100%] md:w-[55%] lg:w-[55%] lg:ml-5">
                            <div className="space-y-4">
                                <div className='mb-5'>
                                    <InputField 
                                        disabled={updateStatus ? false : true}
                                        label="Birthday"
                                        type='date'
                                        typeInput='date-input'
                                        id='birthday'
                                        name='birthday'
                                        onError={formikUpdateAccount.errors.birthday}
                                        onTouched={!!formikUpdateAccount.touched.birthday}
                                        onChange={formikUpdateAccount.handleChange}
                                        onBlur={formikUpdateAccount.handleBlur}
                                        value={formikUpdateAccount.values.birthday ? new Date(formikUpdateAccount.values.birthday).toISOString().split('T')[0]: ''}
                                    />
                                </div>
                                <div className="border border-[#ebedf2] rounded dark:bg-[#1b2e4b] dark:border-0">
                                    <div className="flex items-center justify-between p-4 py-2">
                                        <div className="grid place-content-center w-9 h-9 rounded-md text-secondary dark:text-secondary-light">
                                            <img src="/assets/images/instagram.png" alt="" />
                                        </div>
                                        <div className="ltr:ml-4 rtl:mr-4 flex items-start justify-between flex-auto font-semibold">
                                            <InputField 
                                                disabled={updateStatus ? false : true}
                                                type='text'
                                                id='instagram'
                                                name='instagram'
                                                onError={formikUpdateAccount.errors.instagram}
                                                onTouched={!!formikUpdateAccount.touched.instagram}
                                                onChange={formikUpdateAccount.handleChange}
                                                onBlur={formikUpdateAccount.handleBlur}
                                                value={formikUpdateAccount.values.instagram}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-[#ebedf2] rounded dark:bg-[#1b2e4b] dark:border-0">
                                    <div className="flex items-center justify-between p-4 py-2">
                                        <div className="grid place-content-center w-9 h-9 rounded-md text-secondary dark:text-secondary-light">
                                            <img src="/assets/images/twitter.png" alt="" />
                                        </div>
                                        <div className="ltr:ml-4 rtl:mr-4 flex items-start justify-between flex-auto font-semibold">
                                            <InputField 
                                                disabled={updateStatus ? false : true}
                                                type='text'
                                                id='twitter'
                                                name='twitter'
                                                onError={formikUpdateAccount.errors.twitter}
                                                onTouched={!!formikUpdateAccount.touched.twitter}
                                                onChange={formikUpdateAccount.handleChange}
                                                onBlur={formikUpdateAccount.handleBlur}
                                                value={formikUpdateAccount.values.twitter}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-[#ebedf2] rounded dark:bg-[#1b2e4b] dark:border-0">
                                    <div className="flex items-center justify-between p-4 py-2">
                                        <div className="grid place-content-center w-9 h-9 rounded-md text-secondary dark:text-secondary-light">
                                            <img src="/assets/images/number.png" alt="" />
                                        </div>
                                        <div className="ltr:ml-4 rtl:mr-4 flex items-start justify-between flex-auto font-semibold">
                                            <InputField 
                                                disabled={updateStatus ? false : true}
                                                type='text'
                                                id='telephone_seller'
                                                name='telephone_seller'
                                                onError={formikUpdateAccount.errors.telephone_seller}
                                                onTouched={!!formikUpdateAccount.touched.telephone_seller}
                                                onChange={formikUpdateAccount.handleChange}
                                                onBlur={formikUpdateAccount.handleBlur}
                                                value={formikUpdateAccount.values.telephone_seller}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {
                                    updateStatus ? (
                                        <div className='mb-5'> 
                                            <InputField 
                                                disabled={updateStatus ? false : true}
                                                label='New image (optional)'
                                                type='file'
                                                id='seller_image'
                                                name='seller_image'
                                                onError={formikUpdateAccount.errors.seller_image}
                                                onTouched={!!formikUpdateAccount.touched.seller_image}
                                                onChange={(event: any) => {
                                                    formikUpdateAccount.setFieldValue('seller_image', event.target.files[0])
                                                }}
                                            />
                                        </div>
                                    ): 
                                        null
                                }
                                 {
                                    updateStatus ? (
                                        <div className="sm:col-span-2 flex items-center mt-3">
                                            <button type="button" onClick={() => formikUpdateAccount.handleSubmit()} className="btn btn-primary">
                                                Save update
                                            </button>
                                            <button type="button" onClick={() => setUpdateStatus(false)} className="btn ml-4 btn-danger">
                                                Cancel
                                            </button>
                                        </div>
                                    ):
                                        <div className="sm:col-span-2 mt-3">
                                            <button type="button" onClick={() => setUpdateStatus(true)} className="btn btn-primary">
                                                Edit profile
                                            </button>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Profile;