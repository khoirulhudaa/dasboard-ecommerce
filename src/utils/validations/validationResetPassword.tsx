import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import API from '../../services/api';
import { signSellerInterface } from '../interfaces/signSellerInterface';
import store from '../../store/store';


export const useResetPassword = ({onError}: {onError?: any}) => {
    const navigate = useNavigate()
    const { token } = useParams()
    const auth = store.getState().authSlice.auth

    const formik = useFormik<signSellerInterface>({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
            .min(6, 'Minimum 6 characters')
            .required('Required'),
            confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Required'),
        }),
        onSubmit: async (values: any, {resetForm}) => {
            try {
                if (token) {
                    const body = {
                        password: values.password
                    }
                    const response: AxiosResponse = await API.resetPassword({token, body})
                    if (response.data.message === "Password successfully reset") {
                        resetForm()
                        navigate('/auth/signin')
                    }else {
                        onError('Invalid token!')
                    }
                } 
            } catch (error: any) {
                onError(error.data.message)
            }
        }
    })

    return formik
}