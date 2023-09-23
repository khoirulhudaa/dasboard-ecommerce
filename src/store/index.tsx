import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import authSlice from './authSlice';
import productSlice from './productSlice';
import shopSlice from './shopSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    authSlice,
    productSlice,
    shopSlice
});

const rootRedurecers = combineReducers({})

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;