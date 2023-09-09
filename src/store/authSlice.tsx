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

}

const initialState: authStates = {
    auth: {

    }
}