import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { paymentInterface } from "../utils/interfaces/paymentInterface";

interface payment {
    payment: paymentInterface[],
    balance: number
}


const initialState: payment = {
    payment: [],
    balance: 0
}

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        getAllPaymentByShop: (state, action: PayloadAction<paymentInterface>) => {
            state.payment = [action.payload];
        },
        getBalance: (state, action: PayloadAction<number>) => {
            state.balance = action.payload
        }
    }
})

export const { getAllPaymentByShop, getBalance } = paymentSlice.actions
export default paymentSlice.reducer