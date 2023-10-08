import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { shopInterface } from "../utils/interfaces/shopInterface";

interface shopStates {
    shop: shopInterface
}

const initialState: shopStates = {
    shop: {
        shop_id: "",
        seller_name: "",
        shop_name: "",
        motto_shop: "",
        email_seller: "",
        password: "",
        shop_address: "",
        image_shop: null,
        description_shop: "",
        telephone_seller: "",
        followers: 0 // Ini adalah angka, bukan string
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
        }
    }
})

export const { getShopById } = shopSlice.actions
export default shopSlice.reducer