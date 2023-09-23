import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productInterface } from "../interfaces/productInterface";

interface ProductState {
    products: productInterface[];
}

const initialState: ProductState = {
    products: []
}

const productReducers = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProduct: (state, action: PayloadAction<productInterface>) => {
            const existingProduct = state.products.find(product => product.product_id === action.payload.product_id);

            // Jika tidak ada, tambahkan produk
            if (!existingProduct) {
                state.products.push(action.payload);
            }
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(product => product.product_name !== action.payload);
        },
        clearProducts: (state) => {
            state.products = [];
        },
    }
})

export const { getProduct, removeProduct, clearProducts } = productReducers.actions
export default productReducers.reducer;
