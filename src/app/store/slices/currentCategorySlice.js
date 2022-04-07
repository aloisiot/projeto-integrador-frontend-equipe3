import { createSlice } from "@reduxjs/toolkit";

export function selectCurrentCategoriy(state) {
    return state.currentCategory
}

export const currentCategorySlice = createSlice({
    name: 'currentCategory',
    initialState: {},
    reducers: {
        setCurrentCategory(_, action) {
            return action.payload
        }, 
        removeCurrentCategory() {
            return {}
        }
    }
})

export const { setCurrentCategory, removeCurrentCategory } = currentCategorySlice.actions
export default currentCategorySlice.reducer
