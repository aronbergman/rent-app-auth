import {createSlice} from '@reduxjs/toolkit'
import {START} from "../../constants/others.constants";

const APP_REDUCER_NAME = 'app'

const appSlice = createSlice({
    name: APP_REDUCER_NAME,
    initialState: {
        loaded: false,
        create: {
            files: [],
            metro: [],
            typeOfApplicant: null
        }
    },
    reducers: {
        setLoadedFiles(state, action) {
            state.create.files = [
                ...state.create.files,
                ...action.payload
            ]
        },
        resetFiles(state, payload) {
            state.create.files = []
        },
        setMetroStation(state, action) {
            state.create.metro = action.payload
        },
        setLoading(state, action) {
            state.loaded = action.payload !== START
        },
    }
})

export const {
    setLoadedFiles,
    resetFiles,
    setMetroStation,
    setLoading
} = appSlice.actions

export default appSlice.reducer
