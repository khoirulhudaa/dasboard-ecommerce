import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productInterface } from "../utils/interfaces/productInterface";

interface ProductState {
    products: productInterface[];
    productById: productInterface[];
}

const initialState: ProductState = {
    products: [],
    productById: []
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
        getProductById: (state, action: PayloadAction<productInterface>) => {
            state.productById = {
                ...state.productById,
                ...action.payload          
            }
        },
        removeProduct: (state, action: PayloadAction<productInterface>) => {
            state.products = state.products.filter(product => product.product_name !== action.payload.product_name);
        },
        clearProducts: (state) => {
            state.products = initialState.products;
        },
    }
})

export const { getProduct, removeProduct, clearProducts, getProductById } = productReducers.actions
export default productReducers.reducer;
