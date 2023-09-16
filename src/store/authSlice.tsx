import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authInterface } from "../interfaces/authInterface";

interface authStates {
    auth: authInterface,
    token: String
}

const initialState: authStates = {
    auth: {
        seller_id: "",
        email_seller: "",
        password: "",
        seller_name: "",
        telephone_seller: "",
        gender: ""  
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
            state.auth = initialState.auth;
            state.token = ""
        },
        saveToken: (state, action:PayloadAction<String>) => {
            state.token = action.payload
        }
    }
})

export const { authSignIn, authSignOut, saveToken } = authSlice.actions
export default authSlice.reducer