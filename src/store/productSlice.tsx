import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface productInterface {
    product_name: string,
    product_price: number,
    product_category: string
}

interface ProductState {
    products: productInterface[];
}

const initialState: ProductState = {
    products: [],
}

const productReducers = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<productInterface>) => {
            state.products.push(action.payload);
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(product => product.product_name !== action.payload);
        },
        clearProducts: (state) => {
            state.products = [];
        }
    }
})

export const { addProduct, removeProduct, clearProducts } = productReducers.actions
export default productReducers.reducer;
