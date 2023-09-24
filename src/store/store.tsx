import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist'
import thunk from "redux-thunk";
import Reducers from './index'
import Storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage: Storage
}

const persistReducers = persistReducer(persistConfig, Reducers)

export const store = configureStore({
    reducer: persistReducers,
    middleware: [...getDefaultMiddleware({ serializableCheck: false }), thunk],
})

export const peristor = persistStore(store)
export default store