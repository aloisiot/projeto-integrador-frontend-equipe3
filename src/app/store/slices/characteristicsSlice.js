import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { asyncThunkWithProssesMiddleware } from "./prossesSlice";

export const fetchCharacteristics = asyncThunkWithProssesMiddleware(
    "characteristics/fetchCharacteristics", async () => {
        const resp = await axios.get(`${process.env.REACT_APP_LINK_API}/characteristics
        `)
        if(resp.status === 200) {
            return await resp.data
        }
    }
)

export function selectAllCharacteristics(state) {
    return state.characteristics
}


export const characteristicsSlice = createSlice({
    name: 'characteristics',
    initialState: [],
    reducers: {},
    extraReducers:  (builder) => {
        builder.addCase(fetchCharacteristics.fulfilled, (_, action) => action.payload)
    }
})

export default characteristicsSlice.reducer
