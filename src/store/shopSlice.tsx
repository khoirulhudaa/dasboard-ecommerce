import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { shopInterface } from "../utils/interfaces/shopInterface";

interface shopStates {
    shop: shopInterface
}

const initialState: shopStates = {
    shop: {
        shop_id: "",
        seller_id: "",
        seller_name: "",
        shop_name: "",
        email_seller: "",
        shop_address: "",
        image_shop: null,
        motto_shop: "",
        description_shop: "",
        telephone_seller: "",
        followers: 0 
    }
}

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        getShopById: (state, action: PayloadAction<shopInterface>) => {
            state.shop = {
                   ...state.shop,
                ...action.payload
            };
        },
        clearShop: (state) => {
            state.shop = initialState.shop
        }
    }
})

export const { getShopById, clearShop } = shopSlice.actions
export default shopSlice.reducer