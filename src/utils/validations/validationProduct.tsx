import { useFormik } from "formik";
import * as Yup from 'yup';
import API from "../../services/api";
import store from "../../store/store";
import { productInterface } from "../interfaces/productInterface";

const useProductFormik = ({ onError, onResponse }:{ onError?: any, onResponse?: any }) => {
    const abortController = new AbortController()
    const abortSignal = abortController.signal

    const shop:any = store.getState().shopSlice.shop
    
    const formik = useFormik<productInterface>({
        initialValues: {
            product_name: '',
            product_type: '',
            product_color: '',
            product_description: '',
            product_image: null,
            product_price: 0,
            product_size: '',
            product_category: '',
            product_brand: '',
            quantity: 0,
        },
        validationSchema: Yup.object({
            product_name: Yup.string()
            .required('This field is required.')
            .min(3, 'Must be at lest 3 characters'),
            product_type: Yup.string()
            .required('This field is required.'),
            product_color: Yup.string()
            .required('This field is required.'),
            product_image: Yup.mixed()
            .required('This field is required.')
            .test('fileType', 'Only JPG and PNG', (value: any) => {
                if (!value) return true; // Izinkan input berkas kosong (opsional)
                const supportedFormats = ['image/jpeg', 'image/png'];
                const fileExtension = value.type;
                const isExtensionSupported = supportedFormats.includes(fileExtension);
                return isExtensionSupported;
            })
            .test('fileSize', 'Maximal size is 2MB.', (value: any) => {
                if (!value) return true; // Izinkan input berkas kosong (opsional)
                return value.size <= 2 * 1024 * 1024; // 2MB dalam byte
            }),
            product_description: Yup.string()
            .required('This field is required.')
            .min(10, 'Must be at lest 10 characters')
            .max(500, 'Maximum only 500 characters'),
            product_size: Yup.string()
            .required('This field is required.'),
            product_price: Yup.number()
            .required('This field is required.')
            .min(1000, 'Minimal price is Rp.1000'),
            product_category: Yup.string()
            .required('This field is required.'),
            product_brand: Yup.string()
            .required('This field is required.'),
            quantity: Yup.number()
            .required('This field is required.')
            .min(1, 'Minimal quantity is 1'),
        }),
        onSubmit: async (values: any, { resetForm }) => {
            try {
                console.log(values)
                if(abortSignal.aborted) return
                
                const formData: any = new FormData()
                const shopData:any = store.getState().shopSlice.shop;
                console.log('shop my:', shop)

                formData.append('shop_id', shopData[0]?.shop_id);
                formData.append('product_name', values.product_name);
                formData.append('product_type', values.product_type);
                formData.append('product_color', values.product_color);
                formData.append('product_description', values.product_description);
                formData.append('product_image', values.product_image);
                formData.append('product_price', values.product_price);
                formData.append('product_size', values.product_size);
                formData.append('product_category', values.product_category);
                formData.append('product_brand', values.product_brand);
                formData.append('quantity', values.quantity);
                formData.append('shop_name', shop[0]?.shop_name);
                formData.append('image_shop', shop[0]?.image_shop);

                const response = await API.createNewProduct(formData)
                if(response && response.data.message === "Successfully add new product!") {
                    resetForm(); 
                }
                onResponse(response)
                
            } catch (error: any) {
                onError(error.data.message)
            }
        }
    })

    return formik
}

export default useProductFormik