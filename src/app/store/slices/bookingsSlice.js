import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { asyncThunkWithProssesMiddleware } from "./prossesSlice";


export const fetchBookingsByClient = asyncThunkWithProssesMiddleware(
    "bookings/fetchBookingsByClient", async ({token}) => {
        const config = {
            headers: {
                Authorization: token
            }
        }
        const resp = await axios.get(`${process.env.REACT_APP_LINK_API}/bookings/by-client`, config)
        return resp.status === 200 ? await resp.data : []
    }
)

export function selectAllBookings(state) {
    return state.bookings
}

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBookingsByClient.fulfilled, (_, action) => action.payload)
    }
})

export default bookingsSlice.reducer
