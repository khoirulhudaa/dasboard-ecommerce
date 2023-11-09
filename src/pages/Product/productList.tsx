import { useEffect, useState } from 'react';
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SweetAlert from '../../components/alertBox';
import Button from '../../components/button';
import InputField from '../../components/inputField';
import Modal from '../../components/modal';
import Table from '../../components/table';
import { isEqual } from '../../helpers/equal';
import API from '../../services/api';
import { getProduct } from '../../store/productSlice';
import { productInterface } from '../../utils/interfaces/productInterface';
import useProductFormik from '../../utils/validations/validationProduct';

const AltPagination = () => {

    const [search, setSearch] = useState<string>("")
    const [modalStatus, setModalStatus] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [titleModal, setTitleModal] = useState<string>("")
    const [alertMessage, setAlertMessage] = useState<boolean>(false)
    const [updateStatus, setUpdateStatus] = useState<boolean>(false)
    const [responseMessage, setResponseMessage] = useState<any>("")
    const [dataProducts, setDataProducts] = useState<productInterface[]>([])

    const shop = useSelector((state: any) => state.shopSlice.shop)
    const products = useSelector((state: any) => state.productSlice.products)

    const dispatch = useDispatch()

    useEffect(() => {
        const getDataShop = async () => {
            try {
                const response = await API.getAllProduct(shop[0].shop_id)

                if(!isEqual(dataProducts, response.data.data)) {
                    dispatch(getProduct(response.data.data));
                    setDataProducts(response.data.data)
                    setUpdateStatus(false)
                    setAlertMessage(false)
                }   
            } catch (error: any) {
                console.log(error.message);
            }
        };
        
        getDataShop();
    }, [search, updateStatus, products[0], dispatch]);

    const handleRemoveProduct = async (e: string) => {
        const response = await API.removeProductById(e)
        if(response.data.message = "Successfully delete product") setUpdateStatus(true) 
        setAlertMessage(true)
        setTitleModal('Delete')
    }

    const columns = [
        {
          header: 'Product ID',
          accessorKey: 'product_id',
          footer: 'Product ID',
        },
        {
        header: 'Product name',
        accessorKey: 'product_name',
        //accessorFn: (row: {first_name: string, last_name: string}) => `${row.first_name} ${row.last_name}`,
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
            header: 'Product image',
            accessorKey: 'product_image',
            footer: 'Product image',
            cell: (rowData: any) => (
                <>
                    <img src={`https://huda.descode.id/uploads/${rowData?.row.original.product_image}`} alt={rowData.product_name} width="70" height="70" />
                </>
            ),
        },
        {
            header: 'Action',
            footer: 'Action',
            cell: (rowData: any) => (
                <div className='flex items-center justify-center'>
                    <Button typeButton='with-icon' onClick={() => handleRemoveProduct(rowData?.row.original.product_id)} icon={<FaTrash/>} method='delete' />
                    <div className='mx-1' />
                    <Link to={`/product/${rowData?.row.original.product_id}`}>
                        <Button typeButton='with-icon' icon={<FaPen/>} method='update' />
                    </Link>
                </div>
            ),
        },
    ];

    const handleClose = () => {
        setModalStatus(false)
    }

    const handleErrorMessage = (error: string) => {
        setErrorMessage(error)
    }
    
    const handleResponseMessage = (response: any) => {
        setResponseMessage(response)
        if(response.data.message === "Successfully add new product!") {
            setModalStatus(false)
            setTitleModal('Create')
            setAlertMessage(true)
            setUpdateStatus(true)
            setTimeout(() => {
                setAlertMessage(false)
                // window.location.reload()
            }, 2000)
        }
    }

    const formikProduct = useProductFormik({ 
        onError: handleErrorMessage, 
        onResponse: handleResponseMessage 
    })
    
    const optionsType = [
        {label: 'Select Type', value: ''},
        {label: 'New product', value: 'New product'},
        {label: 'Second', value: 'Second'},
    ]
    const optionsColors = [
        {label: 'Select Colors', value: ''},
        {label: 'Yellow', value: 'Yellow'},
        {label: 'Orange', value: 'Orange'},
        {label: 'Purple', value: 'Purple'},
        {label: 'Black', value: 'Black'},
        {label: 'White', value: 'White'},
        {label: 'Green', value: 'Green'},
        {label: 'Cream', value: 'Cream'},
        {label: 'Brown', value: 'Brown'},
        {label: 'Blue', value: 'Blue'},
        {label: 'Gray', value: 'Gray'},
        {label: 'Gold', value: 'Gold'},
        {label: 'Pink', value: 'Pink'},
        {label: 'Red', value: 'Red'},
    ]
    const optionsCategory = [
        {label: 'Select Category', value: ''},
        {label: 'Shoes', value: 'Shoes'},
        {label: 'Sports equipment', value: 'Sports equipment'},
        {label: 'Sports clothing', value: 'Sports clothing'},
    ]

    return (
        <>
            <div className="panel">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Data products</h5>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className={`w-max h-max flex items-center relative justify-between px-5 py-2 ${shop[0]?.shop_id ? 'bg-blue-500' : 'bg-gray-300'} ${shop[0]?.shop_id ? 'active:scale-[0.98]' : ''} transition-100 ${shop[0]?.shop_id ? 'hover:brightness-[94%]' : ''} text-white font-normal ${shop[0]?.shop_id ? 'cursor-pointer' : 'cursor-not-allowed'} rounded-md shadow-md`} onClick={() => shop[0]?.shop_id ? setModalStatus(true) : null}>
                        Create Product <FaPlus className='ml-3' />
                    </div>
                </div>
                <div className="datatables">
                    {
                        dataProducts && dataProducts.length > 0 ? (
                            <Table key={JSON.stringify(dataProducts)} columns={columns} dataTable={dataProducts} search={search} />
                        ):
                        null
                    }
                </div>
            </div>
            {
                alertMessage && (
                    <SweetAlert 
                        title={`Success ${titleModal} Product!`}
                        type="success"
                        showConfirm={true}
                        showCancel={false}
                    />
                )
            }
            {
                modalStatus ? (
                    <Modal size="lg" isOpen={modalStatus} onClose={handleClose} onClick={formikProduct.handleSubmit} title='Create New Product'>
                        <div className='w-full'>
                            <form onSubmit={formikProduct.handleSubmit}>
                                <div className='w-full pt-8 flex'>
                                    <div className='w-[50%] p-4'>
                                        <div className="mb-5">
                                            <InputField 
                                                name='product_name'
                                                onError={formikProduct.errors.product_name}
                                                onTouched={!!formikProduct.touched.product_name}
                                                value={formikProduct.values.product_name}
                                                onBlur={formikProduct.handleBlur}
                                                onChange={formikProduct.handleChange}
                                                id='product_name'
                                                label="Product name"
                                                placeholder="Enter Product Name..."
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <InputField 
                                                name='product_type'
                                                typeInput='select-input'
                                                onError={formikProduct.errors.product_type}
                                                onTouched={!!formikProduct.touched.product_type}
                                                value={formikProduct.values.product_type}
                                                placeholder="Select Type"
                                                options={optionsType}
                                                onChange={formikProduct.handleChange}
                                                onBlur={formikProduct.handleBlur}
                                                id='product_type'
                                                label="Product type"
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <InputField 
                                                name='product_color'
                                                typeInput='select-input'
                                                onError={formikProduct.errors.product_color}
                                                onTouched={!!formikProduct.touched.product_color}
                                                value={formikProduct.values.product_color}
                                                placeholder="Select Color"
                                                options={optionsColors}
                                                onBlur={formikProduct.handleBlur}
                                                onChange={formikProduct.handleChange}
                                                id='product_color'
                                                label="Product color"
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <InputField 
                                                name='product_description'
                                                typeInput='textarea-input'
                                                onError={formikProduct.errors.product_description}
                                                onTouched={!!formikProduct.touched.product_description}
                                                value={formikProduct.values.product_description}
                                                onBlur={formikProduct.handleBlur}
                                                onChange={formikProduct.handleChange}
                                                id='product_description'
                                                label="Product description"
                                                placeholder="Enter Product Description..."
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <InputField 
                                                name='product_price'
                                                type='number'
                                                onError={formikProduct.errors.product_price}
                                                onTouched={!!formikProduct.touched.product_price}
                                                value={formikProduct.values.product_price}
                                                onBlur={formikProduct.handleBlur}
                                                onChange={formikProduct.handleChange}
                                                id='product_price'
                                                label="Product price"
                                                placeholder="Enter Price..."
                                            />
                                        </div>
                                    </div>
                                    <div className='w-[50%] p-4'>
                                        <div className="mb-5">
                                            <InputField 
                                                name='product_size'
                                                onError={formikProduct.errors.product_size}
                                                onTouched={!!formikProduct.touched.product_size}
                                                value={formikProduct.values.product_size}
                                                onBlur={formikProduct.handleBlur}
                                                onChange={formikProduct.handleChange}
                                                id='product_size'
                                                label="Product size"
                                                placeholder="example: XL, 1KG, 300*500, etc"
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <InputField 
                                                name='product_brand'
                                                onError={formikProduct.errors.product_brand}
                                                onTouched={!!formikProduct.touched.product_brand}
                                                value={formikProduct.values.product_brand}
                                                onBlur={formikProduct.handleBlur}
                                                onChange={formikProduct.handleChange}
                                                id='product_brand'
                                                label="Product brand"
                                                placeholder="example: Asus, Luis vuiton, Adidas, etc"
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <InputField 
                                                name='product_category'
                                                typeInput='select-input'
                                                onError={formikProduct.errors.product_category}
                                                onTouched={!!formikProduct.touched.product_category}
                                                value={formikProduct.values.product_category}
                                                options={optionsCategory}
                                                onBlur={formikProduct.handleBlur}
                                                onChange={formikProduct.handleChange}
                                                id='product_category'
                                                label="Product category"
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <InputField 
                                                name='quantity'
                                                type='number'
                                                onError={formikProduct.errors.quantity}
                                                onTouched={!!formikProduct.touched.quantity}
                                                value={formikProduct.values.quantity}
                                                onBlur={formikProduct.handleBlur}
                                                onChange={formikProduct.handleChange}
                                                id='quantity'
                                                label="Quantity"
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <InputField 
                                                name='product_image'
                                                type='file'
                                                onError={formikProduct.errors.product_image}
                                                onTouched={!!formikProduct.touched.product_image}
                                                onBlur={formikProduct.handleBlur}
                                                onChange={(event: any) => {
                                                    // Menggunakan event.target.files[0] untuk mendapatkan objek File
                                                    formikProduct.setFieldValue("product_image", event.target.files[0])
                                                }}
                                                id='product_image'
                                                label="Product Image"
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
                                </div>
                            </form>
                        </div>
                    </Modal>
                ):
                <></>
            }
        </>
    );
};

export default AltPagination;
