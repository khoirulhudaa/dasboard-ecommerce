import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SweetAlert from '../../components/alertBox';
import Button from '../../components/button';
import Gap from '../../components/gap';
import InputField from '../../components/inputField';
import API from '../../services/api';
import { getProductById } from '../../store/productSlice';
import store from '../../store/store';
import useUpdateProductFormik from '../../utils/validations/validationUpdateProduct';

const UpdateProduct = () => {
    const [errorStatus, setErrorStatus] = useState<string>("");
    const [dataProduct, setDataProduct] = useState<any>(null);
    const [alertStatus, setAlertStatus] = useState<any>(null)
    const [titleModal, setTitleModal] = useState<string>("")

    const navigate = useNavigate()

    const {product_id} = useParams()
    const dispatch = useDispatch()
    const products: any = store.getState().productSlice.productById
    console.log('produ', products)

    useEffect(() => {
        const getDataProductByID = async () => {
            try {
                if(product_id && !isEqual(dataProduct, products)) {
                    const responseShop = await API.getProductById(product_id)
                    dispatch(getProductById(responseShop.data.data[0]))
                    setDataProduct(responseShop.data.data[0]);
                }
            } catch (error: any) {
                console.log(error.message);
            }
        };
        
        getDataProductByID();
    }, [products, dispatch]);
    
    // Handle error from validasi formik
    const handleError = (error: any) => {
        setErrorStatus(error.message)
    }

    // Handle response success from formik
    const handleResponseUpdate = (response: any) => {
        if(response.data.status === 200) {
            setAlertStatus(true)
            setTimeout(() => {
                navigate('/products')
            }, 1000)
        } 
    }

    const formikUpdate = useUpdateProductFormik({ onError: handleError, onResponse: handleResponseUpdate })

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
        {label: 'Electronic', value: 'Electronic'},
        {label: 'Sports', value: 'Sports'},
        {label: 'Catalog', value: 'Catalog'},
        {label: 'Tools', value: 'Tools'},
        {label: 'Hardware', value: 'Hardware'},
    ]

    return (
        <div>
            {
                alertStatus ? (
                    <SweetAlert 
                        title='Success Update Product!'
                        type="success"
                        showConfirm={true}
                        confirmBtnText="Close" 
                        showCancel={false}
                    />
                ):
                null
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
                    <Link to={'/products'} className="text-primary hover:underline">
                        Product
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Update product</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Update product</h5>
                </div>

                {product_id ? (
                    <div>
                        <form onSubmit={formikUpdate.handleSubmit} className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-6 mb-5 bg-white dark:bg-black">
                            <div className="flex flex-col sm:flex-row">
                                <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                    <img src={`https://huda.descode.id/uploads/${dataProduct ? dataProduct.product_image : 'default.png'}`} alt="img" className="w-20 h-20 md:w-[135px] md:h-[132px] rounded-full object-contain border-gray-200 border-2 mx-auto" />
                                </div>
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <InputField 
                                            label="Product name"
                                            type='text'
                                            id='product_name'
                                            name='product_name'
                                            onError={formikUpdate.errors.product_name}
                                            onTouched={!!formikUpdate.touched.product_name}
                                            onChange={formikUpdate.handleChange}
                                            onBlur={formikUpdate.handleBlur}
                                            value={formikUpdate.values.product_name}
                                        />
                                    </div>
                                    <div>
                                        <InputField 
                                            label="Product type"
                                            type='text'
                                            typeInput='select-input'
                                            options={optionsType}
                                            id='product_type'
                                            name='product_type'
                                            value={formikUpdate.values.product_type}
                                            onError={formikUpdate.errors.product_type}
                                            onTouched={!!formikUpdate.touched.product_type}
                                            onChange={formikUpdate.handleChange}
                                            onBlur={formikUpdate.handleBlur}
                                        />
                                    </div>
                                    <div>
                                        <InputField 
                                            label="Product color"
                                            type='text'
                                            typeInput='select-input'
                                            id='product_color'
                                            options={optionsColors}
                                            name='product_color'
                                            onError={formikUpdate.errors.product_color}
                                            onTouched={!!formikUpdate.touched.product_color}
                                            onChange={formikUpdate.handleChange}
                                            onBlur={formikUpdate.handleBlur}
                                            value={formikUpdate.values.product_color}
                                        />
                                    </div>
                                    <div>
                                        <InputField 
                                            label="Product size"
                                            id='product_size'
                                            type='text'
                                            name='product_size'
                                            value={formikUpdate.values.product_size}
                                            onError={formikUpdate.errors.product_size}
                                            onTouched={!!formikUpdate.touched.product_size}
                                            onChange={formikUpdate.handleChange}
                                            onBlur={formikUpdate.handleBlur}
                                        />
                                    </div>
                                    <div>
                                        <InputField 
                                            label="Product price"
                                            typeInput='textarea-input'
                                            id='product_price'
                                            type='number'
                                            name='product_price'
                                            value={formikUpdate.values.product_price}
                                            onError={formikUpdate.errors.product_price}
                                            onTouched={!!formikUpdate.touched.product_price}
                                            onChange={formikUpdate.handleChange}
                                            onBlur={formikUpdate.handleBlur}
                                        />
                                    </div>
                                    <div>
                                        <InputField 
                                            label="Product description"
                                            typeInput='textarea-input'
                                            id='product_description'
                                            name='product_description'
                                            value={formikUpdate.values.product_description}
                                            onError={formikUpdate.errors.product_description}
                                            onTouched={!!formikUpdate.touched.product_description}
                                            onChange={formikUpdate.handleChange}
                                            onBlur={formikUpdate.handleBlur}
                                        />
                                    </div>
                                    <div>
                                        <InputField 
                                            label="Product brand"
                                            type='text'
                                            id='product_brand'
                                            name='product_brand'
                                            value={formikUpdate.values.product_brand}
                                            onError={formikUpdate.errors.product_brand}
                                            onTouched={!!formikUpdate.touched.product_brand}
                                            onChange={formikUpdate.handleChange}
                                            onBlur={formikUpdate.handleBlur}
                                        />
                                    </div>
                                    <div>
                                        <InputField 
                                            label="Product category"
                                            id='product_category'
                                            typeInput='select-input'
                                            options={optionsCategory}
                                            name='product_category'
                                            value={formikUpdate.values.product_category}
                                            onError={formikUpdate.errors.product_category}
                                            onTouched={!!formikUpdate.touched.product_category}
                                            onChange={formikUpdate.handleChange}
                                            onBlur={formikUpdate.handleBlur}
                                        />
                                    </div>
                                    <div>
                                        <InputField 
                                            label="Product quantity"
                                            id='quantity'
                                            name='quantity'
                                            value={formikUpdate.values.quantity}
                                            onError={formikUpdate.errors.quantity}
                                            onTouched={!!formikUpdate.touched.quantity}
                                            onChange={formikUpdate.handleChange}
                                            onBlur={formikUpdate.handleBlur}
                                        />
                                    </div>
                                    <div>
                                        <InputField 
                                            label="Image product (optional)"
                                            type='file'
                                            id='product_image'
                                            name='product_image'
                                            onError={formikUpdate.errors.product_image}
                                            onTouched={!!formikUpdate.touched.product_image}
                                            onChange={(event: any) => {
                                                // Menggunakan event.target.files[0] untuk mendapatkan objek File
                                                formikUpdate.setFieldValue("product_image", event.target.files[0]);
                                            }}
                                        />
                                    </div>
                                    <div className="sm:col-span-2 mt-3 flex items-center">
                                        <Button type="submit" text='Save now' />
                                        <div className='mx-2'></div>
                                        <Button type="submit" text='Cancel' onClick={() => navigate('/products')} method='delete' />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className='font-bold text-[32px] text-black text-center my-[30vh]'>
                        🏪
                        <Gap />
                        <p>
                            A technical error occurred
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdateProduct;
