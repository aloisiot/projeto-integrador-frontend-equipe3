import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts", async () => {
        const resp = await axios.get(`${process.env.REACT_APP_LINK_API}/products`)
        if(resp.status === 200) {
            return await resp.data
        }
    }
)

export const fetchProductsByCity = createAsyncThunk(
    "products/fetchProductsByCity", async (cityId) => {
        const resp = await axios.get(`${process.env.REACT_APP_LINK_API}/products/by-city/${cityId}`)
        if(resp.status === 200) {
            return await resp.data
        } else if(resp.status === 204) {
            return []
        }
    }
)

export const fetchProductsByCityAndDateRange = createAsyncThunk(
    "products/fetchProductsByCityAndDateRange", async ({cityId, startDate, endDate}) => {
        const resp = await axios.get(`${process.env.REACT_APP_LINK_API}/products/by-city/${cityId}/and-available-date-range/${startDate}/${endDate}`)
        if(resp.status === 200) {
            return await resp.data
        } else if(resp.status === 204) {
            return []
        }
    }
)

export const fetchProductsByDateRange = createAsyncThunk(
    "products/fetchProductsByDateRange", async ({startDate, endDate}) => {
        const resp = await axios.get(`${process.env.REACT_APP_LINK_API}/products/by-available-date-range/${startDate}/${endDate}`)
        if(resp.status === 200) {
            return await resp.data
        } else if(resp.status === 204) {
            return []
        }
    }
)

export function selectAllProducts(state) {
    return state.products
}

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {},
    extraReducers(builder){
        builder
            .addCase(fetchProducts.fulfilled, (_, action) => action.payload )
            .addCase(fetchProductsByCity.fulfilled, (_, action) => action.payload)
            .addCase(fetchProductsByCityAndDateRange.fulfilled, (_, action) => action.payload)
            .addCase(fetchProductsByDateRange.fulfilled, (_, action) => action.payload)
    }
})

export default productsSlice.reducer
