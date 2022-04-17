import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const prossesSlice = createSlice({
    name: "process",
    initialState: {
        isLoading: false,
        processes: []
    },
    reducers: {
        add: (state, action) => {
            if(state.processes.includes(action.payload)) {
                return {...state};
            }
            const processes = state.processes.concat(action.payload)
            const isLoading = processes.length ? true : false
            return { processes, isLoading }
        },
        remove: (state, action) => {
            if(! state.processes.includes(action.payload)) {
                return { ...state }
            }
            const processes = state.processes.filter(process => process !== action.payload)
            const isLoading = processes.length ? true : false
            return { processes, isLoading }
        }
    }
})

const { add, remove } = prossesSlice.actions
export const actions = prossesSlice.actions;

export const asyncThunkWithProssesMiddleware = (typePrefix, payloadCreator) => {
    return createAsyncThunk(typePrefix, async (arg, thunkAPI) => {
        thunkAPI.dispatch(add(thunkAPI.requestId))
        const result = await payloadCreator(arg, thunkAPI)
        thunkAPI.dispatch(remove(thunkAPI.requestId))
        return result
    })
}

export const selectProcessState = (state) => state.prosses.isLoading
export default prossesSlice.reducer