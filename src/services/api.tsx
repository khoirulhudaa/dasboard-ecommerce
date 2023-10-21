import { shopInterface } from "../utils/interfaces/shopInterface";
import { signSellerInterface } from "../utils/interfaces/signSellerInterface";
import api from './axios'

const API = {

    // Akun penjual
    checkAccountSeller: (body: signSellerInterface) => {
        return api.post('/account/signin/seller', body)
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
        return api.get('/product')
    },
    getAllHistoryBuy: () => {
        return api.get('/history')
    },
    getProfileAccount: () => {
        return api.get('/profileAccount')
    },

    // shop
    createShop: (body: shopInterface) => {
        return api.post('/shop', body)
    },
    getShopById: (seller_id?: string) => {
        return api.get(`/shop/${seller_id}`)
    },
    updateShopById: ({shop_id, body}:{shop_id: string, body: shopInterface}) => {
        return api.post(`/shop/${shop_id}`, body)
    },
    removeShopById: (shop_id: string) => {
        return api.delete(`/shop/${shop_id}`)
    }

    // history
}

export default API;