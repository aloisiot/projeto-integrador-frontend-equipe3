import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const findCurrentProduct = createAsyncThunk(
    'currentProduct/findCurrentProduct', async (id) => {
        const resp = await axios.get(`${process.env.REACT_APP_LINK_API}/products/${id}`)
        const bookingsByProduct = await fetchBookingsByProduct(id);
        if(resp.status === 200){
            const product = await resp.data;
            return {
                ...product,
                disabledDates : bookingsByProduct?.map?.(booking => {
                    return {
                        startDate : booking.startDate,
                        endDate : booking.endDate
                    }
                })
            }
        }
    }
)

export function selectCurrentProduct(state){
    return state.currentProduct
}

async function fetchBookingsByProduct(id){
    const resp = await axios.get(`${process.env.REACT_APP_LINK_API}/bookings/by-product/${id}`)
        if(resp.status === 200){
            return await resp.data
        }
}

export const currentProductSlice = createSlice({
    name: 'currentProduct',
    initialState: {},
    reducers: {},
    extraReducers(builder){
        builder.addCase(findCurrentProduct.fulfilled, (_,action) => {
            return action.payload
        })
    }
})

export default currentProductSlice.reducer