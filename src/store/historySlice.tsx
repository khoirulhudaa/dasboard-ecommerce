import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { historyInterface } from "../utils/interfaces/historyInterface";

interface historyState {
    history: historyInterface[]
}

const initialState: historyState = {
    history: []
}

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        getHistoryBuy: (state, action: PayloadAction<historyInterface[]>) => {
            state.history = action.payload
        }      
    }
})

export const { getHistoryBuy } = historySlice.actions
export default historySlice.reducer