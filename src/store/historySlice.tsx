import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { historyInterface } from "../interfaces/historyInterface";

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
        getHistory: (state, action: PayloadAction<historyInterface>) => {
            state.history.push(action.payload)
        }      
    }
})

export const { getHistory } = historySlice.actions
export default historySlice.reducer