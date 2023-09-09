import api from "./axios";

const API = {
    // Bikin akun pengguna
    createAccount: (body: any) => {
        return api.post('/auth/signup', body)
    },
    // Bikin akun penjual
    createAccountShop: (body: any) => {
        return api.post('/shop', body)
    },
    checkAccount: () => {
        return api.post('/auth/signup')
    },
    getAllProduct: () => {
        return api.get('/products')
    },
    getAllHistoryBuy: () => {
        return api.get('/historyBuy')
    },
    getProfileAccount: () => {
        return api.get('/profileAccount')
    },
}

export default API;