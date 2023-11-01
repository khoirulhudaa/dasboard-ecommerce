import { useEffect, useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SweetAlert from '../../components/alertBox';
import Button from '../../components/button';
import Table from '../../components/table';
import { isEqual } from '../../helpers/equal';
import API from '../../services/api';
import { getHistoryBuy } from '../../store/historySlice';
import { productInterface } from '../../utils/interfaces/productInterface';

const SalesHistory = () => {

    const [search, setSearch] = useState<string>("")
    const [modalStatus, setModalStatus] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [alertMessage, setAlertMessage] = useState<boolean>(false)
    const [updateStatus, setUpdateStatus] = useState<boolean>(false)
    const [responseMessage, setResponseMessage] = useState<any>("")
    const [dataHistory, setDataHistory] = useState<productInterface[]>([])

    const auth = useSelector((state: any) => state.authSlice.auth)
    console.log('id:', auth.seller_id)
    const dispatch = useDispatch()

    useEffect(() => {
        const getDataHistory = async () => {
            try {
                const response = await API.getHistory(auth?.seller_id)
                console.log('response history:', response)

                if(!isEqual(dataHistory, response.data.data)) {
                    dispatch(getHistoryBuy(response.data.data));
                    setDataHistory(response.data.data)
                    setUpdateStatus(false)
                    setAlertMessage(false)
                }   
            } catch (error: any) {
                console.log(error.message);
            }
        };
        
        getDataHistory();
    }, [search, updateStatus, dataHistory, dispatch]);

    const handleRemoveHistory = async (e: string) => {
        const response = await API.removeHistoryById(e)
        if(response.data.message = "Successfully delete history") setUpdateStatus(true) 
        setAlertMessage(true)
    }

    const columns = [
        {
          header: 'History ID',
          accessorKey: 'history_id',
          footer: 'Product ID',
        },
        {
        header: 'Product name',
        accessorKey: 'product_name',
        footer: 'Product name',
        },
        {
            header: 'Product price',
            accessorKey: 'product_price',
            footer: 'Product price',
        },
        {
            header: 'Category',
            accessorKey: 'product_category',
            footer: 'Category',
        },
        {
            header: 'Quantity',
            accessorKey: 'quantity',
            footer: 'Category',
        },
        {
            header: 'Total amount',
            accessorKey: 'amount',
            footer: 'Total amount',
        },
        {
            header: 'Action',
            footer: 'Action',
            cell: (rowData: any) => (
                <div className='flex items-center justify-center'>
                    <Button typeButton='with-icon' onClick={() => handleRemoveHistory(rowData?.row.original.history_id)} icon={<FaTrash/>} method='delete' />
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="panel">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Sales history</h5>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables">
                    {
                        dataHistory && dataHistory.length > 0 ? (
                            <Table key={JSON.stringify(dataHistory)} columns={columns} dataTable={dataHistory} search={search} />
                        ):
                        null
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
