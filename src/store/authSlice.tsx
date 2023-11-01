import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authInterface } from "../utils/interfaces/authInterface";

interface authStates {
    auth: authInterface,
    token: string
}

const initialState: authStates = {
    auth: {
        seller_id: "",
        email_seller: "",
        password: "",
        seller_name: "",
        telephone_seller: "",
        gender: "",
        birthday: new Date(),
        instagram: "",
        twitter: "",
        seller_image: null,
    },
    token: ""
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authSignIn: (state, action:PayloadAction<authInterface>) => {
            state.auth = {
                ...state.auth,
                ...action.payload
            }   
        },
        authSignOut: (state) => {
            state.auth = initialState.auth,
            state.token = initialState.token
        },
        saveToken: (state, action:PayloadAction<string>) => {
            state.token = action.payload
        }
    }
})

export const { authSignIn, authSignOut, saveToken } = authSlice.actions
export default authSlice.reducer