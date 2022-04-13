import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { asyncThunkWithProssesMiddleware } from "./prossesSlice"

export const fetchFavoritesByClient = asyncThunkWithProssesMiddleware(
    "favorites/fetchFavoritesByClient", async ({token}) => {
        const config = {
            headers: {
                Authorization: token
            }
        }
        const resp = await axios.get(`${process.env.REACT_APP_LINK_API}/clients/favorite-products`, config)
        return resp.status === 200 ? await resp.data : []
    }
)


export function selectAllFavorites(state) {
    return state.favorites
}

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFavoritesByClient.fulfilled, (_, action) => action.payload)
    }
})

export default favoritesSlice.reducer
