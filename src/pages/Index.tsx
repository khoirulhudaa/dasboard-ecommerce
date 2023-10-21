import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../assets/css/animate.css';
import API from '../services/api';
import { getProduct } from '../store/productSlice';
import { AxiosResponse } from 'axios';
import { getShopById } from '../store/shopSlice';
import store from '../store/store';

const Finance = () => {
    const dispatch = useDispatch();
    const [alertStatus, setAlertStatus] = useState(true)
    const [alertMessage, setAlertMessage] = useState("")
    const [dataProducts, setDataProducts] = useState<any[]>([])
    const [dataShop, setDataShop] = useState<any[]>([])
    const [dataFetch, setDataFetch] = useState<boolean>(false)

    const products = useSelector((state: any) => state.productSlice.products)
    console.log('products', products)
    
    const auth = useSelector((state: any) => state.authSlice.auth)
    console.log('auth', auth)
    
    const shop = useSelector((state: any) => state.shopSlice.shop)
    console.log('shop', shop)

    useEffect(() => {
        const currentShop = store.getState().shopSlice.shop;
        setDataProducts(products)
        setDataShop(shop)
        const getHistory = async () => {
            try {
                const response: AxiosResponse = await API.getAllProduct()
                const responseShop = await API.getShopById(auth.data.seller_id)
                dispatch(getShopById(responseShop.data.data))
                dispatch(getProduct(response.data))
                setDataProducts(response.data)
                setDataFetch(true)
            } catch (error: any) {
                console.log("error products", error.message)
                setAlertMessage(error.message)
            }
        }

        if (shop.length === 0 && !dataFetch || products.length === 0 && !dataFetch) {
            getHistory();
        }

        console.log('data shop:', dataShop)

    }, [dataFetch, dataShop, shop, dataProducts, dataFetch, dispatch]);

    const handleCloseAlert = (status: boolean) => {
        setAlertStatus(status)
    }

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
            </ul>
            {
                alertStatus && alertMessage !== "" ? (
                    <div className='lg:w-[70%] w-[90vw] flex items-center justify-between text-[20px] h-max bg-red-400 text-white font-normal px-4 py-3 rounded-md shadow-lg z-[999999] fixed top-2 animate-fadeInDown2'>
                        <small>{alertMessage}</small>
                        <FaTimes 
                            size={18} 
                            color='white' 
                            onClick={() => handleCloseAlert(false)} 
                        />
                    </div>
                ):
                    <></>
            }
            
            <div className="pt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 text-white">
                    <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Products</div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {dataProducts && dataProducts.length > 0 ? dataProducts[0]?.data?.length : 0} items</div>
                        </div>
                        <div className="flex items-center font-semibold mt-5">
                            Existing product info
                        </div>
                    </div>

                    {/* Sessions */}
                    <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Purchased item</div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 50 items</div>
                        </div>
                        <div className="flex items-center font-semibold mt-5">
                            Existing product info
                        </div>
                    </div>

                    {/*  Time On-Site */}
                    <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Followers</div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {dataShop?.length ?? 0} users</div>
                        </div>
                        <div className="flex items-center font-semibold mt-5">
                            Existing product info
                        </div>
                    </div>

                    {/* Bounce Rate */}
                    <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Total revenue</div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> Rp. 28.000</div>
                        </div>
                        <div className="flex items-center font-semibold mt-5">
                            Existing product info
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Finance;
