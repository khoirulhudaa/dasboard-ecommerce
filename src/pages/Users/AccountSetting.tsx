import { useEffect, useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Gap from '../../components/gap';
import Modal from '../../components/modal';
import { setPageTitle } from '../../store/themeConfigSlice';
import InputField from '../../components/inputField';
import useShopFormik from '../../utils/validations/validationShop';
import Button from '../../components/button';

const AccountSetting = () => {
    const dispatch = useDispatch();
    const [tabs, setTabs] = useState<string>('home');
    const [modalStatus, setModalStatus] = useState<boolean>(false);
    const [errorStatus, setErrorStatus] = useState<string>("");
    const [responseShop, setResponseShop] = useState<string>("");
    
    useEffect(() => {
        dispatch(setPageTitle('Account Setting'));
    });
    
    const toggleTabs = (name: string) => {
        setTabs(name);
    };

    const handleClose = () => {
        setModalStatus(false)
    }

    const handleError = (error: any) => {
        setErrorStatus(error)
    }

    const handleResponse = (response: any) => {
        setResponseShop(response)
    }

    const formik = useShopFormik({ onError: handleError, onResponse: handleResponse })

    return (
        <div>
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
            {responseShop && (
                <div className="text-green-500">
                    {responseShop} {/* Tampilkan respons yang diterima */}
                </div>
            )}
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
                <div className='w-max h-max flex items-center justify-between px-5 py-2 bg-blue-500 absolute right-6 active:scale-[0.98] transition-100 hover:brightness-[94%] text-white font-normal cursor-pointer rounded-md shadow-md' onClick={() => setModalStatus(true)}>
                    Create Shop <FaPlus className='ml-3' />
                </div>
                <div>
                    <ul className="sm:flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('home')}
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'home' ? '!border-primary text-primary' : ''}`}
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
                            </button>
                        </li>
                    </ul>
                </div>

                {/* {tabs === 'home' ? (
                    <div>
                        <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                            <h6 className="text-lg font-bold mb-5">General Information</h6>
                            <div className="flex flex-col sm:flex-row">
                                <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                    <img src="/assets//images/profile-34.jpeg" alt="img" className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />
                                </div>
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="name">Seller name</label>
                                        <input id="name" type="text" placeholder="Jimmy Turner" className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="profession">Shop name</label>
                                        <input id="profession" type="text" placeholder="Web Developer" className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="country">Email seller</label>
                                        <select defaultValue="United States" id="country" className="form-select text-white-dark">
                                            <option value="All Countries">All Countries</option>
                                            <option value="United States">United States</option>
                                            <option value="India">India</option>
                                            <option value="Japan">Japan</option>
                                            <option value="China">China</option>
                                            <option value="Brazil">Brazil</option>
                                            <option value="Norway">Norway</option>
                                            <option value="Canada">Canada</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="address">Address</label>
                                        <input id="address" type="text" placeholder="New York" className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="location">Location</label>
                                        <input id="location" type="text" placeholder="Location" className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">Phone</label>
                                        <input id="phone" type="text" placeholder="+1 (530) 555-12121" className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input id="email" type="email" placeholder="Jimmy@gmail.com" className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="web">Website</label>
                                        <input id="web" type="text" placeholder="Enter URL" className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="web">Facebook</label>
                                        <div className="flex">
                                            <div className="bg-[#eee] flex justify-center items-center rounded px-3 font-semibold dark:bg-[#1b2e4b] ltr:mr-2 rtl:ml-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24px"
                                                height="24px"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-5 h-5"
                                            >
                                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                            </svg>
                                            </div>
                                            <input type="text" placeholder="jimmy_turner" className="form-input" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="web">Twitter</label>
                                        <div className="flex">
                                            <div className="bg-[#eee] flex justify-center items-center rounded px-3 font-semibold dark:bg-[#1b2e4b] ltr:mr-2 rtl:ml-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24px"
                                                height="24px"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-5 h-5"
                                            >
                                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                            </svg>
                                            </div>
                                            <input type="text" placeholder="jimmy_turner" className="form-input" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 mt-3">
                                        <button type="button" className="btn btn-primary">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    ''
                )} */}

                {
                    modalStatus ? (
                        <Modal size="sm" isOpen={modalStatus} onClose={handleClose} onClick={formik.handleSubmit} title='Create Shop'>
                            <div className='w-full'>
                                <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                                    <div className='w-full pt-8'>
                                        <div className="mb-5">
                                            <InputField 
                                                name='seller_name'
                                                onError={formik.errors.seller_name}
                                                onTouched={!!formik.touched.seller_name}
                                                value={formik.values.seller_name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
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
                                                value={formik.values.motto_shop}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
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
                                                name="image_shop"
                                                onError={formik.errors.image_shop}
                                                onTouched={!!formik.touched.image_shop}
                                                onChange={(event: any) => {
                                                    // Menggunakan event.target.files[0] untuk mendapatkan objek File
                                                    formik.setFieldValue("image_shop", event.target.files[0]);
                                                }}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>
                                        <div className='w-full flex items-center'>
                                            <button type='submit'>send</button>
                                            {/* <Button type="submit" text='Send' onClick={() => formik.handleSubmit} /> */}
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

                <div className='font-bold text-[32px] text-black text-center my-[30vh]'>
                    🏪
                    <Gap />
                    <p>
                        You haven't created a shop yet
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AccountSetting;
