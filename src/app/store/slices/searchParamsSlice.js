import { createSlice } from "@reduxjs/toolkit";

export function selectSearchParams(state) {
    return state.searchParams
}

export const searchParamsSlice = createSlice({
    name: 'searchParams',
    initialState: {},
    reducers: {
        setDateRange(state, action) {
            return {
                ...state,
                dateRange: action.payload
            }
        },
        setCityId(state, action) {
            return {
                ...state,
                cityId: action.payload
            }
        },
        cleanParams() {
            return {}
        }
    }
})

export const {setCityId, setDateRange, cleanParams} = searchParamsSlice.actions
export default searchParamsSlice.reducer
