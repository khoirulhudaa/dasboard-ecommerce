// reducers/index.js
import { combineReducers } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import authSlice from './authSlice';
import productSlice from './productSlice';
import shopSlice from './shopSlice';
import paymentSlice from './paymentSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    authSlice,
    productSlice,
    shopSlice,
    paymentSlice
});

export default rootReducer;
