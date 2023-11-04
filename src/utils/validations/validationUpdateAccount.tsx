import { useFormik } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as Yup from 'yup';
import API from "../../services/api";
import { authInterface } from "../interfaces/authInterface";

const useUpdateAccountFormik = ({ onError, onResponse }:{ onError?: any, onResponse?: any }) => {
    
    const auth = useSelector((state: any) => state.authSlice.auth)
  
    const abortController = new AbortController()
    const abortSignal = abortController.signal
  
    const formik = useFormik<authInterface>({
      initialValues: {
        seller_name: '',
        email_seller: '',
        telephone_seller: '',
        gender: '', 
        instagram: '',
        twitter: '', 
        birthday: new Date(),
        seller_image: null,
        seller_image_old: null
      },
      validationSchema: Yup.object({
        seller_name: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('This field is required.'),
        email_seller: Yup.string()
          .email('Invalid email address')
          .required('This field is required.'),
        telephone_seller: Yup.string()
          .max(13, 'Maximum only 13 characters')
          .required('This field is required.'),
        gender: Yup.string()
          .required('This field is required.')
          .oneOf(['Male', 'Female'], 'Invalid gender'),
        seller_image: Yup.mixed()
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
      }),
      onSubmit: async (values: any, {resetForm}) => {
        try {
          if(abortSignal.aborted) return
          const formData = new FormData()
          console.log(new Date(values.birthday).toISOString().split('T')[0])

          formData.append('seller_name', values.seller_name)
          formData.append('email_seller', values.email_seller)
          formData.append('gender', values.gender)
          formData.append('telephone_seller', values.telephone_seller)
          formData.append('instagram', values.instagram)
          formData.append('twitter', values.twitter)
          formData.append('birthday', new Date(values.birthday).toISOString().split('T')[0])
          if(values.seller_image && values.seller_image !== null) {
            formData.append('seller_image', values.seller_image);
          }

          const response = await API.updateAccountSeller({seller_id: auth?.seller_id, body: formData})
          if (response.data.status === 200) {
            onResponse(response)
          } 
          
        } catch (error: any) {
          onError(error.message)
        }
      }
    });

    useEffect(() => {
        formik.setValues({
            seller_name: auth?.seller_name || '',
            email_seller: auth?.email_seller || '',
            seller_image_old: auth?.seller_image || null,
            telephone_seller: auth?.telephone_seller || '',
            gender: auth?.gender || '' ,
            instagram: auth?.instagram || '',
            twitter: auth?.twitter || '', 
            birthday: auth?.birthday || new Date(),
        });
    }, [auth]);


    return formik
}

export default useUpdateAccountFormik