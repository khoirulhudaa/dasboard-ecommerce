import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { signSellerInterface } from '../../interfaces/signSellerInterface';
import API from '../../services/api';
import { authSignIn, saveToken } from '../../store/authSlice';


export const useLoginFormik = ({onError}: {onError: any}) => {
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
        onSubmit: async (values: any) => {
            try {
                const response: AxiosResponse = await API.checkAccountSeller(values)
                dispatch(authSignIn(response.data))
                dispatch(saveToken(response.data.token))
                onError("")
                if(response.data.status === 200) {
                    formik.setValues({
                        email_seller: '',
                        password: ''
                    })
                    formik.resetForm()
                    navigate('/')
                }else {
                    onError(response.data.message)
                }
            } catch (error: any) {
                onError(error.message)
            }
        }
    })

    return formik
}