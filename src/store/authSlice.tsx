import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authInterface {
    seller_id: String,
    email_seller: String,
    password: String,
    seller_name: String,
    telephone_seller: String,
    gender: String        
}

interface authStates {
    auth: authInterface
}

const initialState: authStates = {
    auth: {
        seller_id: "",
        email_seller: "",
        password: "",
        seller_name: "",
        telephone_seller: "",
        gender: ""  
    }
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
            state.auth = initialState.auth
        }
    }
})

export const { authSignIn, authSignOut } = authSlice.actions
export default authSlice.reducer