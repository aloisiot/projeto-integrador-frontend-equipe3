import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import withProcessMidlewares from "../processMidlewers";

export const fetchCategories = createAsyncThunk(
    "categories/fethCategories", async () => {
        const resp = await axios.get(`${process.env.REACT_APP_LINK_API}/categories`)
        if(resp.status === 200) {
            return await resp.data
        }
    }
)

export function selectAllCategories(state) {
    return state.categories
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: [],
    reducers: {},
    extraReducers(builder){
        withProcessMidlewares(builder, [fetchCategories])
    }
})

export default categoriesSlice.reducer
