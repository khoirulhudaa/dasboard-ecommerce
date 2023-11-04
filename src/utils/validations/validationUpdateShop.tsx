import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from 'yup';
import API from "../../services/api";
import store from "../../store/store";
import { shopInterface } from "../interfaces/shopInterface";

const useShopUpdateFormik = ({ onError, onResponse }:{ onError: any, onResponse: any }) => {

    const abortController = new AbortController()
    const abortSignal = abortController.signal
    
    const dataShopNow: any = store.getState().shopSlice.shop
    
    const formik = useFormik<shopInterface>({
        initialValues: {
            seller_name: dataShopNow[0]?.seller_name || '',
            shop_name: dataShopNow[0]?.shop_name || '',
            shop_address: dataShopNow[0]?.shop_address || '',
            image_shop: null,
            motto_shop: dataShopNow[0]?.motto_shop || '',
            telephone_seller: dataShopNow[0]?.telephone_seller || '',
            description_shop: dataShopNow[0]?.description_shop || '',
            followers: dataShopNow[0]?.followers || 0
        },  
        validationSchema: Yup.object({
            seller_name: Yup.string()
            .required('This field is required.')
            .min(3, 'Must be at lest 3 characters'),
            shop_name: Yup.string()
            .required('This field is required.')
            .min(3, 'Must be at least 3 chracters'),
            shop_address: Yup.string()
            .required('This field is required.')
            .min(12, 'Must be at least 12 characters')
            .max(100, 'Maximum only 100 characters'),
            image_shop: Yup.mixed()
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
            })
            .notRequired(),
            motto_shop: Yup.string()
            .required('This field is required.')
            .min(10, 'Must be at lest 10 characters')
            .max(100, 'Maximum only 100 characters'),
            description_shop: Yup.string()
            .required('This field is required.')
            .min(10, 'Must be at lest 10 characters')
            .max(150, 'Maximum only 150 characters'),
            telephone_seller: Yup.string()
            .required('This field is required!')
            .min(10, 'Must be at lest 10 numbers')
            .max(13, 'Maximum only 13 characters'),
        }),
        onSubmit: async (values: any) => {
            try {
                console.log(values)
                if(abortSignal.aborted) return
                
                const authData:any = store.getState().authSlice.auth;
                const formData:any = new FormData();

                formData.append('seller_name', values.seller_name);
                formData.append('shop_name', values.shop_name);
                formData.append('seller_id', authData.data.seller_id);
                formData.append('telephone_seller', values.telephone_seller);
                formData.append('motto_shop', values.motto_shop);
                formData.append('description_shop', values.description_shop);
                formData.append('shop_address', values.shop_address);
                if(values.image_shop && values.image_shop !== null) {
                    formData.append('image_shop', values.image_shop);
                }

                const response = await API.updateShopById({ shop_id: dataShopNow[0].shop_id, body: formData });
                onResponse(response)

            } catch (error: any) {
                onError(error.message)
            }
        }
    })

    useEffect(() => {
        formik.setValues({
            seller_name: dataShopNow[0]?.seller_name || '',
            shop_name: dataShopNow[0]?.shop_name || '',
            shop_address: dataShopNow[0]?.shop_address || '',
            image_shop: null,
            motto_shop: dataShopNow[0]?.motto_shop || '',
            telephone_seller: dataShopNow[0]?.telephone_seller || '',
            description_shop: dataShopNow[0]?.description_shop || '',
            followers: dataShopNow[0]?.followers || 0
        });
    }, [dataShopNow[0]]);

    return formik
}

export default useShopUpdateFormik;