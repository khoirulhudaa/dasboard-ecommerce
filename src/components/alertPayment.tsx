import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import toRupiah from "../helpers/toRupiah";
import API from "../services/api";
import { useWithdrawFormik } from "../utils/validations/validationWithdraw";
import Button from "./button";
import InputField from "./inputField";

const AlertPayment = ({ onClick, close }: { onClick: any, close?: any }) => {

    const [errorMessage, setErrorMessage] = useState<string>("")
    const [responseMessage, setResponseMessage] = useState<string>("")
    const [paymentChecked, setPaymentChecked] = useState<string>("")
    const [payments, setPayments] = useState<any[]>([])
    const [balanca, setBalance] = useState<number>(0)

    const shop = useSelector((state: any) => state.shopSlice.shop)
    const auth = useSelector((state: any) => state.authSlice.auth)

    useEffect(() => {
        const getPayment = async () => {
            const response = await API.getAllPaymentByShop(shop?.[0].shop_id)
            const responseRevenue = await API.getRevenueById(shop?.[0].shop_id)

            setPayments(response.data.data.payments)
            setBalance(responseRevenue.data.data.balance)
            formik.setFieldValue('revenue_id', shop?.[0].shop_id)
        }
    
        getPayment()
    }, [])

    const handleResponse = (response: string) => {
        if(response === "Withdraw successfully!!") {
            close(response)
        }
    }

    const handleErrorMessage = (error: string) => {
        setErrorMessage(error)
    }

    const listPayment = [
        {label: 'Select payment method', value: ''},
        {label: 'BCA', value: 'ID_BCA'},
        {label: 'BNI', value: 'ID_BNI'},
        {label: 'BRI', value: 'ID_BRI'},
        {label: 'MANDIRI', value: 'ID_MANDIRI'},
        {label: 'BSI', value: 'ID_BSI'},
        {label: 'DANA', value: 'ID_DANA'},
        {label: 'OVO', value: 'ID_OVO'},
        {label: 'GOPAY', value: 'ID_GOPAY'},
        {label: 'SHOPEEPAY', value: 'ID_SHOPEEPAY'},
    ]

    const formik = useWithdrawFormik({ onResponse: handleResponse, onError: handleErrorMessage })

  return (
    <form onSubmit={formik.handleSubmit} className={`left-0 top-0 z-[9999999] flex items-center justify-center bg-slate-500 bg-opacity-60 w-[100vw] h-[100vh] fixed`}>
        <div className={`w-[45vw] z-[999999] bg-white fixed rounded-lg bg-slate-100 p-2 overflow-hidden fade-in-down duration-300" shadow-lg h-max`}>
            <div onClick={onClick} className="absolute right-4 top-4 rounded-full bg-red-500 text-white overflow-hidden cursor-pointer shadow-lg w-[30px] h-[30px] flex justify-center items-center hover:brightnes-[90%] active:scale-[0.98]">
                <FaTimes />
            </div>
            <div className='w-full mt-[25px] border-b border-b-slate-400 pb-3'>
                <div className='w-full px-4 py-3'>
                    <div className="mb-5">
                        <InputField 
                            value={auth?.seller_name} 
                            name='accountHolderName' 
                            disabled={true}
                            label='Your name'
                            id='accountHolderName'
                            onError={formik.errors.accountHolderName}
                            onTouched={!!formik.touched.accountHolderName}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                        />
                    </div>
                    <div className="mb-5">
                        <InputField 
                            value={formik.values.bank_code} 
                            name='bank_code' 
                            label='Payment method'
                            typeInput="select-input"
                            options={listPayment}
                            id='paymentMethod'
                            onError={formik.errors.bank_code}
                            onTouched={!!formik.touched.bank_code}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                        />
                    </div>
                    <div className="mb-5">
                        <InputField 
                            value={formik.values.account_number} 
                            name='account_number' 
                            label='Account/telephone number'
                            id='paymentMethod'
                            onError={formik.errors.account_number}
                            onTouched={!!formik.touched.account_number}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                        />
                    </div>
                    <div>
                        <InputField 
                            value={formik.values.amount} 
                            name='amount' 
                            label='Amount'
                            type="number"
                            id='amount'
                            onError={formik.errors.amount}
                            onTouched={!!formik.touched.amount}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                        />
                    </div>
                </div>
            </div>
            <div className='w-full px-[20px] flex items-center h-max py-[16px] justify-center justify-between'>
                <Button text='Withdraw' type="submit" />
                <p>{toRupiah(balanca)} - {toRupiah(formik.values.amount ? formik.values.amount : 0)}</p>
            </div>
        </div>
    </form>
  )
}

export default AlertPayment
