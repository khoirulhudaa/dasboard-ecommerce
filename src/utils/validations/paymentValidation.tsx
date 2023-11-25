import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import API from '../../services/api';
import store from '../../store/store';
import { paymentInterface } from '../interfaces/paymentInterface';


export const usePayment = ({onError, onResponse}: {onError?: any, onResponse?: any}) => {

    const payment: any = store.getState().paymentSlice.payment
    const shop: any = store.getState().shopSlice.shop
    
    const formik = useFormik<paymentInterface>({
        initialValues: {
            BRI: 0,
            BCA: 0,
            MANDIRI: 0,
            BNI: 0,
            DANA: 0,
            GOPAY: 0,
            SHOPEEPAY: 0,
            LINKAJA: 0,
            OVO: 0,
            BRI_status: true,
            BCA_status: false,
            MANDIRI_status: false,
            BNI_status: false,
            DANA_status: false,
            GOPAY_status: true,
            SHOPEEPAY_status: false,
            LINKAJA_status: false,
            OVO_status: false,
        },
        validationSchema: Yup.object({
            BRI: Yup.number()
            .max(9999999999999999, 'Maximum only 16 characters.')
            .min(9999999999, 'Minimal must 10 characters.')
            .notRequired(),
            BCA: Yup.number()
            .max(9999999999999999, 'Maximum only 16 characters.')
            .min(9999999999, 'Minimal must 10 characters.')
            .notRequired(),
            MANDIRI: Yup.number()
            .max(9999999999999999, 'Maximum only 16 characters.')
            .min(9999999999, 'Minimal must 10 characters.')
            .notRequired(),
            BNI: Yup.number()
            .max(9999999999999999, 'Maximum only 16 characters.')
            .min(9999999999, 'Minimal must 10 characters.')
            .notRequired(),
            DANA: Yup.number()
            .max(9999999999999, 'Maximum only 13 characters.')
            .min(9999999999, 'Minimal must 10 characters.')
            .notRequired(),
            GOPAY: Yup.number()
            .max(9999999999999, 'Maximum only 13 characters.')
            .min(9999999999, 'Minimal must 10 characters.')
            .notRequired(),
            OVO: Yup.number()
            .max(9999999999999, 'Maximum only 13 characters.')
            .min(9999999999, 'Minimal must 10 characters.')
            .notRequired(),
            SHOPEEPAY: Yup.number()
            .max(9999999999999, 'Maximum only 13 characters.')
            .min(9999999999, 'Minimal must 10 characters.')
            .notRequired()
        }),
        onSubmit: async (values: any, {resetForm}) => {
            try {
                console.log('values:', values)
                const payments = [
                    { bank_code: 'BCA', account_number: values.BCA, isEnabled: values.BCA_status },
                    { bank_code: 'BRI', account_number: values.BRI, isEnabled: values.BRI_status },
                    { bank_code: 'BNI', account_number: values.BNI, isEnabled: values.BNI_status },
                    { bank_code: 'MANDIRI', account_number: values.MANDIRI, isEnabled: values.MANDIRI_status },
                    { bank_code: 'ID_DANA', account_number: values.DANA, isEnabled: values.DANA_status },
                    { bank_code: 'ID_OVO', account_number: values.OVO, isEnabled: values.OVO_status },
                    { bank_code: 'ID_GOPAY', account_number: values.GOPAY, isEnabled: values.GOPAY_status },
                    { bank_code: 'ID_SHOPEEPAY', account_number: values.SHOPEEPAY, isEnabled: values.SHOPEEPAY_status },
                ]
                const response: AxiosResponse = await API.updatePaymentMethodByShop({shop_id: shop?.[0].shop_id, body: payments})
                console.log('response payment:', response)
                if(response.data.message === "Successfully updated payment methods!") {
                    resetForm()
                    onResponse(response.data.message)
                }else {
                    onError(response.data.message)
                }

            } catch (error: any) {
                onError(error.data.message)
            }
        }
    })

    useEffect(() => {
        console.log('ok', payment)
        formik.setValues({
            BCA: payment? payment?.[0][0].account_number : 0,
            BRI: payment? payment?.[0][1].account_number : 0,
            MANDIRI: payment? payment?.[0][2].account_number : 0,
            BNI: payment? payment?.[0][3].account_number : 0,
            DANA: payment? payment?.[0][4].account_number : 0,
            GOPAY: payment? payment?.[0][5].account_number : 0,
            OVO: payment? payment?.[0][6].account_number : 0,
            SHOPEEPAY: payment? payment?.[0][7].account_number : 0,
            BCA_status: payment? payment?.[0][0].isEnabled : false,
            BRI_status: payment? payment?.[0][1].isEnabled : false,
            MANDIRI_status: payment? payment?.[0][2].isEnabled : false,
            BNI_status: payment? payment?.[0][3].isEnabled : false,
            DANA_status: payment? payment?.[0][4].isEnabled : false,
            GOPAY_status: payment? payment?.[0][5].isEnabled : false,
            OVO_status: payment? payment?.[0][6].isEnabled : false,
            SHOPEEPAY_status: payment? payment?.[0][7].isEnabled : false,
        });
    }, [payment[0]]);

    return formik
}