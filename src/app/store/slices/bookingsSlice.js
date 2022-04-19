import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { asyncThunkWithProssesMiddleware } from "./prossesSlice";


export const fetchBookingsByClients = asyncThunkWithProssesMiddleware(
    "bookings/fetchBookingsByClients", async ({token},clientId) => {
        const config = {
            headers: {
                Authorization: token
            }
        }
        const resp = await axios.get(`${process.env.REACT_APP_LINK_API}/bookings/by-client/${clientId}`, config)
        return resp.status === 200 ? await resp.data : []
    }
)


export function selectAllBookings(state) {
    return state.favorites
}


export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBookingsByClients.fulfilled, (_, action) => action.payload)
    }
})



export default bookingsSlice.reducer
