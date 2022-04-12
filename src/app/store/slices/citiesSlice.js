import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { asyncThunkWithProssesMiddleware } from "./prossesSlice";

export const fetchCities = asyncThunkWithProssesMiddleware(
    "cities/fethCities", async () => {
        const resp = await axios.get(`${process.env.REACT_APP_LINK_API}/cities`)
        if(resp.status === 200) {
            return await resp.data
        }
    }
)

export function selectAllCities(state) {
    return state.cities
}

export const categoriesSlice = createSlice({
    name: 'cities',
    initialState: [],
    reducers: {},
    extraReducers:  (builder) => {
        builder.addCase(fetchCities.fulfilled, (_, action) => action.payload)
    }
})

export default categoriesSlice.reducer
