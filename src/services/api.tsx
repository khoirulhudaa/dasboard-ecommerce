import { paymentInterface } from "../utils/interfaces/paymentInterface";
import { productInterface } from "../utils/interfaces/productInterface";
import { shopInterface } from "../utils/interfaces/shopInterface";
import { signSellerInterface } from "../utils/interfaces/signSellerInterface";
import api from './axios';

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
    getAllHistoryBuy: (id: string) => {
        return api.get(`/history/seller/${id}`)
    },
    removeHistoryById: (history_id: string, idCart: string) => {
        return api.delete(`/history/seller/${history_id}/product/${idCart}`)
    },
    packNow: (history_id: string, status: string) => {
        return api.put(`/history/updateStatus/${history_id}/${status}`)
    },

    // payment
    getAllPaymentByShop: (shop_id: string) => {
        return api.get(`/payment/${shop_id}`)
    },
    updatePaymentMethodByShop: ({shop_id, body}:{shop_id: string, body: any}) => {
        return api.put(`/payment/${shop_id}`, body)
    },
    disbursement: (body: paymentInterface) => {
        return api.post('/payment/withdraw', body)
    },

    // revenue
    getRevenueById: (revenue_id: string) => {
        return api.get(`/revenue/${revenue_id}`)
    }
}

export default API;