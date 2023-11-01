import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { signSellerInterface } from '../interfaces/signSellerInterface';
import API from '../../services/api';
import { authSignIn, saveToken } from '../../store/authSlice';


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
                const response: AxiosResponse = await API.checkAccountSeller(values)
                const responseAuth: AxiosResponse = await API.getAccountSeller(response.data.data.seller_id)
                dispatch(authSignIn(response.data.data))
                dispatch(saveToken(response.data.token))
                console.log('response auth1', response)
                console.log('responseAuth 2', responseAuth.data.data)
                if(response) {
                    resetForm()
                    navigate('/')
                }

            } catch (error: any) {
                onError(error)
            }
        }
    })

    return formik
}