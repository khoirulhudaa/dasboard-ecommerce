import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../assets/css/animate.css';
import AlertPayment from '../components/alertPayment';
import Button from '../components/button';
import { isEqual } from '../helpers/equal';
import toRupiah from '../helpers/toRupiah';
import API from '../services/api';
import { getBalance } from '../store/paymentSlice';
import { getProduct } from '../store/productSlice';
import { getShopById } from '../store/shopSlice';
import SweetAlert from '../components/alertBox';

const Finance = () => {
    const dispatch = useDispatch();
    const [dataProducts, setDataProducts] = useState<any[]>([])
    const [statusWithdraw, setStatusWithdraw] = useState<boolean>(false)
    const [revenue, setRevenue] = useState<number>(0)
    const [balance, setBalance] = useState<number>(0)
    const [result, setResult] = useState<string>("")

    const products = useSelector((state: any) => state.productSlice.products)
    const auth = useSelector((state: any) => state.authSlice.auth)

    useEffect(() => {
        const resultData = async () => {
            try {
                const responseShop = await API.getShopById(auth?.seller_id)
                const response = await API.getAllProduct(responseShop.data.data[0].shop_id)
                const responseRevenue = await API.getRevenueById(responseShop.data.data[0].shop_id)
                setStatusWithdraw(false)
                
                if(!isEqual(dataProducts, response.data.data) || !isEqual(balance, responseRevenue.data.data.balance)) {
                    dispatch(getProduct(response.data.data))
                    dispatch(getShopById(responseShop.data.data));
                    dispatch(getBalance(responseRevenue.data.data.balance))
                    setDataProducts(response.data.data)
                    setRevenue(responseRevenue.data.data.revenue)
                    setBalance(responseRevenue.data.data.balance)
                    setResult("")
                } 
                
            } catch (error: any) {
                console.log(error.message);
            }
        };
        
        resultData();
    }, [result, products[0]?.data, result, dispatch]);
    
    return (
        <div>
            {
                result !== "" ? (
                    <SweetAlert 
                        title={`${result}`}
                        type="success"
                        showConfirm={true}
                        showCancel={false}
                    /> 
                ): 
                    null
            }
            {
                statusWithdraw ? <AlertPayment close={(response: string) => setResult(response)} onClick={() => setStatusWithdraw(false)} /> : null
            }
                
            <ul className="flex items-center justify-between space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <div className='flex items-center'>
                    <p>SALDO : 
                        <span className='font-bold ml-2 text-[16px]'>
                            {balance ? toRupiah(balance) : 0}
                        </span>
                    </p>
                    <div className='w-[1px] h-[40px] bg-slate-300 mx-5'>

                    </div>
                    <small className='text-slate-500 text-[14px] mr-5'>Min. balance Rp. 10.000</small>
                    <Button disabled={balance > 10000 ? false : true} text='Withdraw' onClick={() => setStatusWithdraw(true)} />
                </div>
            </ul>
            <hr className='my-5' />
            <div className="pt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 mb-6 text-white">
                    <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Products</div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {dataProducts && dataProducts.length > 0 ? dataProducts?.length : 0} items</div>
                        </div>
                        <div className="flex items-center font-semibold mt-5">
                            Total product
                        </div>
                    </div>

                    <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Total revenue</div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{revenue ? toRupiah(revenue) : 0}</div>
                        </div>
                        <div className="flex items-center font-semibold mt-5">
                            Total revenue
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Finance;
