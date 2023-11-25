import { useFormik } from 'formik';
import API from '../../services/api';
import * as Yup from 'yup'
import { paymentInterface } from '../interfaces/paymentInterface';
import store from '../../store/store';
import toRupiah from '../../helpers/toRupiah';

export const useWithdrawFormik = ({onError, onResponse}: {onError?: any, onResponse?: any}) => {

    const auth = store.getState().authSlice.auth
    const balance = store.getState().paymentSlice.balance

    console.log('balacknce', balance)

    const formik = useFormik<paymentInterface>({
        initialValues: {
            bank_code: '',
            account_number: 0,
            amount: 0,
            accountHolderName: '',
            revenue_id: ''
        },
        validationSchema: Yup.object({
            bank_code: Yup.string()
            .required(),
            account_number: Yup.number()
            .max(9999999999999999, 'Maximum only 16 characters.')
            .min(9999999999, 'Minimal must 10 characters.')
            .required(),
            amount: Yup.number()
            .min(9999, 'Minimal must Rp. 10.000.')
            .required()
        }),
        onSubmit: async (values: any, {resetForm}) => {
            try {
                const data = {
                    channelCode: values.bank_code,
                    accountNumber: values.account_number,
                    amount: values.amount,
                    revenue_id: values.revenue_id,
                    accountHolderName: auth?.seller_name
                }

                console.log('values:', data)

                if (values.amount > balance) {
                    // Display error message for exceeding balance
                    formik.setErrors({ amount: `Withdraw maximal ${toRupiah(balance)}` });
                    return; // Prevent further processing
                }

                const response = await API.disbursement(data)
                if(response.data.message === "Withdraw successfully!!") {
                    resetForm()
                    onResponse(response.data.message)
                } else {
                    onError(response.data.message)
                }

            } catch (error: any) {
                onError(error.data.message)
            }
        }
    })

    return formik
}