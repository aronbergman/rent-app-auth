import {createSlice} from '@reduxjs/toolkit'

const TODOS_REDUCER_NAME = 'rent'

const rentSlice = createSlice({
    name: TODOS_REDUCER_NAME,
    initialState: {
        ads: [],
        loaded: false
    },
    reducers: {
        setRentAds(state, action) {
            state.ads = action.payload;
            state.loaded = true;
        }
    }
})

export const {setRentAds} = rentSlice.actions

export default rentSlice.reducer
