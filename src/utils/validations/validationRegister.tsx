import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signSellerInterface } from '../../interfaces/signSellerInterface';
import API from '../../services/api';

export const useRegistrationFormik = ({onError, onAlert}: {onError: any, onAlert: any}) => {

  const abortController = new AbortController()
  const abortSignal = abortController.signal

  const formik = useFormik<signSellerInterface>({
    initialValues: {
      seller_name: '',
      email_seller: '',
      password: '',
      telephone_seller: '',
      gender: '' 
    },
    validationSchema: Yup.object({
      seller_name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('This field is required.'),
      email_seller: Yup.string()
        .email('Invalid email address')
        .required('This field is required.'),
      password: Yup.string()
        .min(6, 'Must be at least 6 characters')
        .required('This field is required.'),
      telephone_seller: Yup.string()
        .max(13, 'Maximum only 13 characters')
        .required('This field is required.'),
      gender: Yup.string()
        .required('This field is required.')
        .oneOf(['Male', 'Female'], 'Invalid gender')
    }),
    onSubmit: async (values) => {
      try {

        if(abortSignal.aborted) return

        const response = await API.createAccountSeller(values);
        if (response.data.status === 200) {
          onAlert(true)
          onError("")
          formik.setValues({
            seller_name: '',
            email_seller: '',
            password: '',
            telephone_seller: '',
            gender: ''
          })
          formik.resetForm()
        } else if (response.data.status === 401) {
          onError(response.data.message)
        }
      } catch (error: any) {
        onError(error.message)
      }
    }
  });

  return formik

};
