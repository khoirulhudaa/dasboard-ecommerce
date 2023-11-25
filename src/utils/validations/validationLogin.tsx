import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import API from '../../services/api';
import { authSignIn, saveToken } from '../../store/authSlice';
import { signSellerInterface } from '../interfaces/signSellerInterface';


export const useLoginFormik = ({onError}: {onError?: any}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik<signSellerInterface>({
        initialValues: {
            email_seller: '',
            password: ''
        },
        validationSchema: Yup.object({
            email_seller: Yup.string()
            .email('Invalid email address')
            .required('This field is required.'),
            password: Yup.string()
            .min(6, 'Must be at least 6 characters')
            .required('This field is required.')
        }),
        onSubmit: async (values: any, {resetForm}) => {
            try {
                const response: any = await API.checkAccountSeller(values)
                console.log('dd', response)
                if(response.data.status === 401 || response.data.status === 404) {  
                    onError(response.data.message)
                }else {
                    await API.getAccountSeller(response.data.seller_id)
                    dispatch(authSignIn(response.data.data))
                    dispatch(saveToken(response.data.token))
                    resetForm()
                    navigate('/')
                }
                
            } catch (error: any) {
                onError("Error signin!")
            }
        }
    })

    return formik
}