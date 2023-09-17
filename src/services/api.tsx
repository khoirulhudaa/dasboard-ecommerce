import { signSellerInterface } from "../interfaces/signSellerInterface";
import api from "./axios";

import useSWR from 'swr'

const fetcher = async (url: any ,body: signSellerInterface) => {
    const response = await api.post(url, body)
    return response.data
}

const API = {

    // Akun penjual
    checkAccountSeller: (body: signSellerInterface) => {
        const url = '/account/signin/seller'
        return useSWR(url, () => fetcher(url, body))
    },

    createAccountSeller: (body: signSellerInterface) => {
        return api.post('/account/signup/seller', body)
    },
    
    // Akun pengguna
    checkAccountConsumer: (body: any) => {
        return api.post('/account/signup/consumer', body)
    },
    createAccountConsumer: () => {
        return api.post('/account/signin/consumer')
    },

    // Product
    getAllProduct: () => {
        return api.get('/products')
    },
    getAllHistoryBuy: () => {
        return api.get('/historyBuy')
    },
    getProfileAccount: () => {
        return api.get('/profileAccount')
    },


    // shop


    // history
}

export default API;