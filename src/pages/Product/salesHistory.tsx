import { useEffect, useMemo, useState } from 'react';
import { FaSpinner, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SweetAlert from '../../components/alertBox';
import Button from '../../components/button';
import { isEqual } from '../../helpers/equal';
import toRupiah from '../../helpers/toRupiah';
import API from '../../services/api';
import { getHistoryBuy } from '../../store/historySlice';

const SalesHistory = () => {

    const [search, setSearch] = useState<string>("")
    const [alertMessage, setAlertMessage] = useState<boolean>(false)
    const [updateStatus, setUpdateStatus] = useState<boolean>(false)
    const [dataHistory, setDataHistory] = useState<any[]>([])
    const [statusGet, setStatusGet] = useState<boolean>(false)
    const [response, setResponse] = useState<string>("")

    const shop = useSelector((state: any) => state.shopSlice.shop)
    const dispatch = useDispatch()

    useEffect(() => {
        const getDataHistory = async () => {
            try {
                const response = await API.getAllHistoryBuy(shop?.[0].shop_id)

                if(!isEqual(dataHistory, response.data.data)) {
                    dispatch(getHistoryBuy(response.data.data));
                    setDataHistory(response.data.data)
                    setUpdateStatus(false)
                    setAlertMessage(false)
                    setStatusGet(false)
                }   
                setStatusGet(false)
            } catch (error: any) {
                console.log(error.message);
            }
        };
        
        getDataHistory();
    }, [search, updateStatus, statusGet, dataHistory, dispatch]);

    const handleRemoveHistory = async (history_id: string, idCart: string) => {
        const response = await API.removeHistoryById(history_id, idCart)
        if(response.data.message = "Successfully delete history") setUpdateStatus(true) 
        setAlertMessage(true)
        setStatusGet(true)
    }

    const handlePack = async (history_id: string, status: string) => {
        const response = await API.packNow(history_id, status)
        if(response.data.message) {
            setResponse(response.data.message)
            setStatusGet(true)
        }
    }

    const filteredData = useMemo(() => {
        if (!search) {
            return dataHistory.filter((dataMain) => {
                return (
                    dataMain.shop_id === shop?.[0].shop_id &&
                    (dataMain.status === "PENDING" || dataMain.status === "PAID")
                );
            });
        }
    
        return dataHistory.filter((dataMain) => {
            return (
                dataMain.shop_id === shop?.[0].shop_id &&
                (dataMain.status === "PENDING" || dataMain.status === "PAID") &&
                dataMain.products.some((product: any) =>
                    product.product_name.toLowerCase().includes(search.toLowerCase())
                )
            );
        });
    }, [search, dataHistory, shop]);
    

    return (
        <>
            {
                response !== "" ? (
                    <SweetAlert 
                        title={`${response}`}
                        type="success"
                        showConfirm={true}
                        showCancel={false}
                    />
                ):
                    null
            }
            <div className="panel">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Sales history</h5>
                    <div className="ltr:ml-auto rtl:mr-auto flex items-center">
                        <Button text='Refresh' typeButton='outline-with-icon' onClick={() => setStatusGet(true)} icon={<FaSpinner />} />
                        <input type="text" className="ml-5 form-input w-auto py-3" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables">
                {
                    filteredData && filteredData.length !== 0 ? (
                        filteredData
                            ?.map((dataMain) => (
                                dataMain.products.map((data: any, index: number) => (
                                    <div key={index} className={`relative flex w-full mt-4 h-max rounded-lg bg-white shadow-sm mb-[24px] overflow-hidden`}>
                                        <div className={`w-[30%] min-h-max flex items-center justify-center overflow-hidden`}>
                                            <img src={`https://huda.descode.id/uploads/${data?.product_image}`} alt="fotoProduct" className='w-[60%] my-auto' />
                                        </div>
                                        <div className={`relative w-full w-[70%] border-l my-auto border-l-slate-300 h-[90%] px-[20px] py-[20px]`}>
                                            <div className='absolute rounded-full right-[14%] bottom-5 hover:brightness-[90%] active:scale-[0.98] cursor-pointer w-[40px] h-[40px] flex items-center justify-center text-green-500 shadow-lg'>
                                                <small className='bg-blue-500 text-white rounded-full flex items-center justify-center w-[40px] h-[40px] text-[12px] absolute'>{data?.quantityInCart} Pcs</small>
                                            </div>
                                            <div onClick={() => handleRemoveHistory(dataMain?.history_id, data?.idCart ? data?.idCart : "")} className='absolute rounded-full bg-red-500 right-5 bottom-5 hover:brightness-[90%] active:scale-[0.98] cursor-pointer w-[40px] h-[40px] flex items-center justify-center text-white shadow-lg'>
                                                <FaTrash size={14} />
                                            </div>
                                            <h3 className='text-black w-full mb-3 text-[16px]'>{data?.product_name}</h3>
                                            <h3 className='text-black w-full mb-6 text-[16px] border border-slate-500 rounded-full px-3 w-max'>{dataMain?.consumer_name}</h3>
                                            <h3 className='text-black w-full mb-2 text-[16px] w-max'><span className='font-bold'>Adress</span> : {dataMain?.address}</h3>
                                            <h3 className='text-black w-full mb-6 text-[16px] w-max'><span className='font-bold'>Description</span> : {dataMain?.description}</h3>
                                            <hr className="my-3" />
                                            <h2 className='text-[24px] font-bold mb-2'>{toRupiah(data?.total_price)}</h2>
                                            <hr className="my-3" />
                                            <Button disabled={dataMain?.status !== 'PAID'} onClick={() => handlePack(dataMain?.history_id, 'PACK')} method='update' text="Pack now" />
                                            <div className="absolute right-[25px] top-[12px] rounded-full w-max h-max px-[10px] text-[14px] py-[6px] text-white bg-blue-500 flex justify-center items-center">
                                                {dataMain?.status}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ))
                        ): (
                            <div className='w-full h-full mb-[24px] text-center flex justify-center items-center border-t border-t-slate-300 pt-[40px]'>
                                <p className='text-[18px] ml-4 text-slate-500'>Your sales are still empty</p>
                            </div>
                        )
                    }
                </div>
            </div>
            {
                alertMessage && (
                    <SweetAlert 
                        title="Success delete history!"
                        type="success"
                        showConfirm={true}
                        showCancel={false}
                    />
                )
            }
        </>
    );
};

export default SalesHistory;
