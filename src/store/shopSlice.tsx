import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface shopInterface {
    shop_id: String,
    seller_name: String,
    shop_name: String,
    motto_shop: String,
    email_seller: String,
    password: String,
    shop_address: String,
    image_shop: String,
    description_shop: String,
    telephone_seller: String,
    followers: Number
}

interface shopStates {
    shopDatas: shopInterface
}

const initialState: shopStates = {
    shopDatas: {
        shop_id: "",
        seller_name: "",
        shop_name: "",
        motto_shop: "",
        email_seller: "",
        password: "",
        shop_address: "",
        image_shop: "",
        description_shop: "",
        telephone_seller: "",
        followers: 0 // Ini adalah angka, bukan string
    }
}

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        getShop: (state, action: PayloadAction<shopInterface>) => {
            state.shopDatas = {
                ...state.shopDatas,
                ...action.payload
            };
        }
    }
})

export const { getShop } = shopSlice.actions
export default shopSlice.reducer