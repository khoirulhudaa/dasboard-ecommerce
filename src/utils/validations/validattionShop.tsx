import { useFormik } from "formik";
import { shopInterface } from "../../interfaces/shopInterface";
import * as Yup from 'yup';
import API from "../../services/api";

const useValidationShop = () => {

    const abortController = new AbortController()
    const abortSignal = abortController.signal

    const formik = useFormik<shopInterface>({
        initialValues: {
            seller_name: '',
            email_seller: '',
            shop_name: '',
            password: '',
            shop_address: '',
            image_shop: '',
            motto_shop: '',
            description_shop: '',
            telephone_seller: '',
            followers: 0
        },
        validationSchema: Yup.object({
            seller_name: Yup.string()
            .required('This field is required.'),
            email_seller: Yup.string()
            .email('Invalid email address')
            .required('This field is required.'),
            shop_name: Yup.string()
            .required('This field is required.')
            .min(3, 'Must be at least 3 chracters'),
            password: Yup.string()
            .required('This field is required.')
            .min(6, 'Must be at least 6 characters'),
            shop_address: Yup.string()
            .required('This field is required.')
            .min(12, 'Must be at least 12 characters')
            .max(100, 'Maximum only 100 characters'),
            image_shop: Yup.mixed()
            .required('This field is required.')
            .test('fileType', 'Only JPG and PNG files are allowed,', (value: any) => {
                if (!value) return true; // Allow empty file input (optional field)
                const supportedFormats = ['image/jpeg', 'image/png'];
                return supportedFormats.includes(value.type);
            })
            .test('fileSize', 'File size must be less than 2MB.', (value: any) => {
                if (!value) return true; // Allow empty file input (optional field)
                return value.size <= 2 * 1024 * 1024; // 5MB in bytes
            }),
            motto_shop: Yup.string()
            .required('This field is required.')
            .max(100, 'Maximum only 100 characters'),
            description_shop: Yup.string()
            .required('This field is required.')
            .max(150, 'Maximum only 150 characters'),
            telephone_seller: Yup.string()
            .required('This field is required.')
            .max(13, 'Maximum only 13 characters'),
            followers: Yup.number()

        }),
        onSubmit: async (values) => {
            try {
                console.log('values shop:', values)
                const response = await API.createShop(values)
                console.log('response shop:', response)
            } catch (error) {
                console.log('error shop:', error)
            }
        }
    })

    return formik
}