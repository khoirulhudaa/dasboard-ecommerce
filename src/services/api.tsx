import api from "./axios";

const API = {

    // Akun penjual
    checkAccountSeller: (body: any) => {
        return api.post('/account/signin/seller', body)
    },
    createAccountSeller: (body: any) => {
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