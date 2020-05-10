import {createSlice} from '@reduxjs/toolkit'

const TODOS_REDUCER_NAME = 'user'

const userSlice = createSlice({
    name: TODOS_REDUCER_NAME,
    initialState: {
        loaded: false
    },
    reducers: {
        fetchRole(state, action) {
            state.loaded = true
        },

    }
})

export const {
    fetchRole,
} = userSlice.actions

export default userSlice.reducer
