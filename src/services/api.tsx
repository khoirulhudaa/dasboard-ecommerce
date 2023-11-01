import { productInterface } from "../utils/interfaces/productInterface";
import { shopInterface } from "../utils/interfaces/shopInterface";
import { signSellerInterface } from "../utils/interfaces/signSellerInterface";
import api from './axios'

const API = {

    // Account seller
    checkAccountSeller: (body: signSellerInterface) => {
        return api.post('/account/signin/seller', body)
    },
    createAccountSeller: (body: signSellerInterface) => {
        return api.post('/account/signup/seller', body)
    },
    updateAccountSeller: ({seller_id, body}: {seller_id: string, body: any}) => {
        return api.put(`/account/seller/${seller_id}`, body)
    },
    getAccountSeller: (seller_id?: string) => {
        return api.get(`/account/list/seller/${seller_id}`)
    },

    // reset-password
    sendEmailResetPassword: (body: signSellerInterface) => {
        return api.post('/account/seller/forgot-password', body)
    },
    resetPassword: ({token, body}: {token: string, body: any}) => {
        return api.put(`/account/seller/reset-password/${token}`, body)
    },
    
    // Account consumer
    checkAccountConsumer: (body: any) => {
        return api.post('/account/signup/consumer', body)
    },
    createAccountConsumer: () => {
        return api.post('/account/signin/consumer')
    },

    // Product
    getAllProduct: (shop_id?: string) => {
        if (shop_id === undefined) {
            // Handle the case when shop_id is not provided
            console.log('shop_id is not provided');
            return api.get('/product');
        } else {
            // Handle the case when shop_id is provided
            console.log('test id', shop_id);
            return api.get(`/product/${shop_id}`);
        }
    },
    createNewProduct: (body: productInterface) => {
        return api.post('/product', body)
    },
    removeProductById: (product_id: string) => {
        return api.delete(`/product/${product_id}`)
    },
    getProductById: (product_id: string) => {
        return api.get(`/product/Oneproduct/${product_id}`)
    },
    updateProductById: ({ product_id, body }: {product_id: string, body: any}) => {
        return api.put(`/product/${product_id}`, body)
    },

    // shop
    createShop: (body: any) => {
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
    },

    // history
    getHistory: (sellerIdorConsumerId: string) => {
        return api.get(`/history/${sellerIdorConsumerId}`)
    },
    removeHistoryById: (history_id: string) => {
        return api.delete(`/history/${history_id}`)
    },
}

export default API;