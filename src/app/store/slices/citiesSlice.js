import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import withProcessMidlewares from "../processMidlewers";

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
    extraReducers:  withProcessMidlewares([fetchCities])
})

export default categoriesSlice.reducer
