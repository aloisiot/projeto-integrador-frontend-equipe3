import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCities = createAsyncThunk(
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
    extraReducers(builder){
        builder.addCase(fetchCities.fulfilled, (_, action) => {
            return action.payload
        })
    }
})

export default categoriesSlice.reducer
