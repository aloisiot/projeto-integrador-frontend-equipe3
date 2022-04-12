import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { asyncThunkWithProssesMiddleware } from "./prossesSlice";

export const fetchCategories = asyncThunkWithProssesMiddleware(
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
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (_, action) => action.payload)
    }
})

export default categoriesSlice.reducer
