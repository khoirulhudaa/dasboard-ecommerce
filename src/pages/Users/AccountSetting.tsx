import { useEffect, useState } from 'react';
import { FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../components/button';
import Gap from '../../components/gap';
import InputField from '../../components/inputField';
import Modal from '../../components/modal';
import API from '../../services/api';
import { clearShop, getShopById } from '../../store/shopSlice';
import store from '../../store/store';
import { setPageTitle } from '../../store/themeConfigSlice';
import useShopFormik from '../../utils/validations/validationShop';
import useShopUpdateFormik from '../../utils/validations/validationUpdateShop';
import SweetAlert from '../../components/alertBox';

const AccountSetting = () => {
    const dispatch = useDispatch();
    const [tabs, setTabs] = useState<string>('home');
    const [modalStatus, setModalStatus] = useState<boolean>(false);
    const [errorStatus, setErrorStatus] = useState<string>("");
    const [responseShop, setResponseShop] = useState<string>("");
    const [statusGet, setStatusGet] = useState<boolean>(false);
    const [dataShop, setDataShop] = useState<Record<string, any> | null>(null);
    const [statusForm, setStatusForm] = useState<boolean>(false)
    const [alertStatus, setAlertStatus] = useState<any>(null)

    const shopData = useSelector((state: any) => state.shopSlice.shop)
    const auth = useSelector((state: any) => state.authSlice.auth)
    console.log('auth2', auth)
    const currentShop = store.getState().shopSlice.shop;

    useEffect(() => {
        setDataShop(shopData[0])
        dispatch(setPageTitle('Account Setting'));
        const getDataShop = async () => {
            try {
                const responseShop = await API.getShopById(auth.data.seller_id)
                if(responseShop.data.data !== currentShop) {
                    dispatch(getShopById(responseShop.data.data))
                }
                setStatusGet(true)
            } catch (error: any) {
                console.log(error.message)
            }
        }
        
        getDataShop()
        console.log('data tko:', shopData[0])

    }, [statusGet, dispatch]);

    const toggleTabs = (name: string) => {
        setTabs(name);
    };

    // Close modal
    const handleClose = () => {
        setModalStatus(false)
    }

    // Handle error from validasi formik
    const handleError = (error: any) => {
        setErrorStatus(error.message)
    }

    // Handle response success from formik
    const handleResponse = async (response: any) => {
        setResponseShop(response)
        if(response.data.status === 200) {
            try {
                setModalStatus(false)
                await setAlertStatus(!alertStatus)
                const responseShop = await API.getShopById(auth.data.seller_id)
                if(responseShop.data.data !== currentShop) {
                    dispatch(getShopById(responseShop.data.data))
                    window.location.reload()
                }
                setStatusGet(true)
            } catch (error: any) {
                console.log(error.message)
            }
        }
    }

    // Delete shop and clearState shop
    const deleleteShop = async (shop_id: string) => {
        const response = await API.removeShopById(shop_id)
        const responseShop = await API.getShopById(auth.data.seller_id)
        try {
            if(!responseShop.data.data.length && response.data.message === "Successfully delete shop") {
                dispatch(clearShop()) 
                window.location.reload()
            } 
        } catch (error: any) {
            console.log('error delete:', error)            
        }
    }

    const formik = useShopFormik({ onError: handleError, onResponse: handleResponse })
    const formikUpdate = useShopUpdateFormik({ onError: handleError, onResponse: handleResponse })

    return (
        <div>
            {
                alertStatus ? (
                    <SweetAlert 
                        title="Success Create Shop!"
                        type="success"
                        showConfirm={false}
                        showCancel={false}
                    />
                ):
                <></>
            }
            {
                errorStatus && errorStatus !== "" ? (
                    <div className='lg:w-[70%] w-[90vw] flex items-center justify-between text-[20px] h-max bg-red-400 text-white font-normal px-4 py-3 rounded-md shadow-lg z-[999999] fixed top-2 animate-fadeInDown2'>
                        <small>{errorStatus}</small>
                        <FaTimes 
                            size={18} 
                            color='white' 
                            onClick={() => setErrorStatus("")} 
                        />
                    </div>
                ):
                    <></>
            }
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Users
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Account Shop Settings</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Settings</h5>
                </div>
                {
                    dataShop && dataShop.shop_id ? (
                        <div className='w-max h-max flex items-center justify-between px-5 py-2 bg-red-500 absolute right-[180px] active:scale-[0.98] transition-100 hover:brightness-[94%] text-white font-normal cursor-pointer rounded-md shadow-md' onClick={() => deleleteShop(dataShop.shop_id)}>
                            Delete Shop <FaTrash className='ml-3' />
                        </div>
                    ):
                    <></>
                }
                <div className='w-max h-max flex items-center justify-between px-5 py-2 bg-blue-500 absolute right-6 active:scale-[0.98] transition-100 hover:brightness-[94%] text-white font-normal cursor-pointer rounded-md shadow-md' onClick={() => setModalStatus(true)}>
                    Create Shop <FaPlus className='ml-3' />
                </div>
                <div>
                    <ul className="sm:flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
                        <li className="inline-block">
                            <div
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary bg-white hover:text-primary ${tabs === 'home' ? '!border-primary text-primary' : ''}`}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                    <path
                                        opacity="0.5"
                                        d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path d="M12 15L12 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                Account shop
                            </div>
                        </li>
                    </ul>
                </div>

                {dataShop ? (
                    <div>
                        <form onSubmit={formikUpdate.handleSubmit} className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                            <h6 className="text-lg font-bold mb-5">General Information</h6>
                            <div className="flex flex-col sm:flex-row">
                                <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                    <img src={`https://huda.descode.id/uploads/${dataShop ? dataShop.image_shop : 'default.png'}`} alt="img" className="w-20 h-20 md:w-[135px] md:h-[132px] rounded-full object-contain border-gray-200 border-2 mx-auto" />
                                </div>
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <InputField 
                                            label="Seller ID"
                                            type='text'
                                            id='seller_id'
                                            name='seller_id'
                                            onError={formikUpdate.errors.seller_id}
                                            onTouched={!!formikUpdate.touched.seller_id}
                                            onChange={formikUpdate.handleChange}
                                            onBlur={formikUpdate.handleBlur}
                                            disabled={true}
                                            value={dataShop ? dataShop.seller_id : ''}
                                        />
                                    </div>
                                    <div>
                                        <InputField 
                                            label="Email seller"
                                            type='text'
                                            id='email_seller'
                                            name='email_seller'
                                            value={dataShop ? dataShop.email_seller : ''}
                                            onError={formikUpdate.errors.email_seller}
                                            onTouched={!!formikUpdate.touched.email_seller}
                                            onChange={formikUpdate.handleChange}
                                            onBlur={formikUpdate.handleBlur}
                                            disabled={true}
                                        />
                                    </div>
                                    <div>
                                        <InputField 
                                            label="Seller Name"
                                            type='text'
                                            id='seller_name'
                                            name='seller_name'
                                            onError={formikUpdate.errors.seller_name}
                                            onTouched={!!formikUpdate.touched.seller_name}
                                            onChange={formikUpdate.handleChange}
                                            onBlur={formikUpdate.handleBlur}
                                            disabled={statusForm ? false : true}
                                            value={formikUpdate.values.seller_name}
                                        />
                                    </div>
                                    <div>
                                        <InputField 
                                            label="Shop Name"
                                            type='text'
                                            id='shop_name'
                                            name='shop_name'
                                            value={formikUpdate.values.shop_name}
                                            onError={formikUpdate.errors.shop_name}
                                            onTouched={!!formikUpdate.touched.shop_name}
                                            onChange={formikUpdate.handleChange}
                                            onBlur={formikUpdate.handleBlur}
                                            disabled={statusForm ? false : true}
                                        />
                                    </div>
                                    <div>
                                        <InputField 
                                            label="Shop address"
                                            typeInput='textarea-input'
                                            id='shop_address'
                                            type='text'
                                            name='shop_address'
                                            value={formikUpdate.values.shop_address}
                                            onError={formikUpdate.errors.shop_address}
                                            onTouched={!!formikUpdate.touched.shop_address}
                                            onChange={formikUpdate.handleChange}
                                            onBlur={formikUpdate.handleBlur}
                                            disabled={statusForm ? false : true}
                                        />
                                    </div>
                                    <div>
                                        <InputField 
                                            label="Description shop"
                                            typeInput='textarea-input'
                                            id='description_shop'
                                            type='text'
                                            name='description_shop'
                                            value={formikUpdate.values.description_shop}
                                            onError={formikUpdate.errors.description_shop}
                                            onTouched={!!formikUpdate.touched.description_shop}
                                            onChange={formikUpdate.handleChange}
                                            onBlur={formikUpdate.handleBlur}
                                            disabled={statusForm ? false : true}
                                        />
                                    </div>
                                    <div>
                                        <InputField 
                                            label="Telephone"
                                            type='text'
                                            id='telephone_seller'
                                            name='telephone_seller'
                                            value={formikUpdate.values.telephone_seller}
                                            onError={formikUpdate.errors.telephone_seller}
                                            onTouched={!!formikUpdate.touched.telephone_seller}
                                            onChange={formikUpdate.handleChange}
                                            onBlur={formikUpdate.handleBlur}
                                            disabled={statusForm ? false : true}
                                        />
                                    </div>
                                    <div>
                                        <InputField 
                                            label="Motto shop"
                                            type='text'
                                            id='motto_shop'
                                            name='motto_shop'
                                            value={formikUpdate.values.motto_shop}
                                            onError={formikUpdate.errors.motto_shop}
                                            onTouched={!!formikUpdate.touched.motto_shop}
                                            onChange={formikUpdate.handleChange}
                                            onBlur={formikUpdate.handleBlur}
                                            disabled={statusForm ? false : true}
                                        />
                                    </div>
                                    {
                                        statusForm ? (
                                            <div>
                                                <InputField 
                                                    label="Image shop"
                                                    type='file'
                                                    id='image_shop'
                                                    name='image_shop'
                                                    onError={formikUpdate.errors.image_shop}
                                                    disabled={statusForm ? false : true}
                                                    onTouched={!!formikUpdate.touched.image_shop}
                                                    onChange={(event: any) => {
                                                        // Menggunakan event.target.files[0] untuk mendapatkan objek File
                                                        formikUpdate.setFieldValue("image_shop", event.target.files[0]);
                                                    }}
                                                />
                                            </div>
                                        ):
                                        <></>
                                    }
                                    {
                                        statusForm ? (
                                            <div className="sm:col-span-2 flex items-center mt-3">
                                                <button type="button" onClick={() => formikUpdate.handleSubmit()} className="btn btn-primary">
                                                    Save update
                                                </button>
                                                <button type="button" onClick={() => setStatusForm(false)} className="btn ml-4 btn-danger">
                                                    Cancel
                                                </button>
                                            </div>
                                        ):
                                            <div className="sm:col-span-2 mt-3">
                                                <button type="button" onClick={() => setStatusForm(true)} className="btn btn-primary">
                                                    Edit data
                                                </button>
                                            </div>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className='font-bold text-[32px] text-black text-center my-[30vh]'>
                        🏪
                        <Gap />
                        <p>
                            You haven't created a shop yet
                        </p>
                    </div>
                )}

                {
                    modalStatus ? (
                        <Modal size="sm" isOpen={modalStatus} onClose={handleClose} onClick={formik.handleSubmit} title='Create Shop'>
                            <div className='w-full'>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className='w-full pt-8'>
                                        <div className="mb-5">
                                            <InputField 
                                                name='seller_name'
                                                onError={formik.errors.seller_name}
                                                onTouched={!!formik.touched.seller_name}
                                                value={formik.values.seller_name}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                id='seller_name'
                                                label="seller name"
                                                placeholder="Enter Your Name..."
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <InputField 
                                                name='shop_name'
                                                onError={formik.errors.shop_name}
                                                onTouched={!!formik.touched.shop_name}
                                                value={formik.values.shop_name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                id='shop_name'
                                                label="Shop Name"
                                                placeholder="What is Shop Name?"
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <InputField 
                                                name='motto_shop'
                                                onError={formik.errors.motto_shop}
                                                onTouched={!!formik.touched.motto_shop}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.motto_shop}
                                                id='motto_name'
                                                label="Motto"
                                                placeholder="Motto Your Shop?"
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <InputField 
                                                name='description_shop'
                                                onError={formik.errors.description_shop}
                                                onTouched={!!formik.touched.description_shop}
                                                value={formik.values.description_shop}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                id='description_shop'
                                                label="Description shop"
                                                typeInput='textarea-input'
                                                placeholder="Enter a store description..."
                                                />
                                        </div>
                                        <div className="mb-5">
                                            <InputField 
                                                name='shop_address'
                                                onError={formik.errors.shop_address}
                                                onTouched={!!formik.touched.shop_address}
                                                value={formik.values.shop_address}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                id='shop_address'
                                                label="Shop Address"
                                                typeInput='textarea-input'
                                                placeholder="Where is the shop located?"
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <InputField
                                                type="file"
                                                id="image_shop"
                                                label="Logo Shop"
                                                name="image_shop"
                                                onError={formik.errors.image_shop}
                                                onTouched={!!formik.touched.image_shop}
                                                onBlur={formik.handleBlur}
                                                onChange={(event: any) => {
                                                    // Menggunakan event.target.files[0] untuk mendapatkan objek File
                                                    formik.setFieldValue("image_shop", event.target.files[0]);
                                                }}
                                            />
                                        </div>
                                        <div className='w-full flex items-center'>
                                            {/* <button type='submit'>send</button> */}
                                            <Button type="submit" text='Send' />
                                            <div className='ml-5'>
                                                <Button typeButton='outline' text='Close' onClick={handleClose} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Modal>
                    ):
                    <></>
                }
            </div>
        </div>
    );
};

export default AccountSetting;
