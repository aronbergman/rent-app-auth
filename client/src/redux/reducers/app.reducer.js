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
        },
        user: null
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
        setOneUserData(state, action) {
            state.user = action.payload
            state.loaded = true
        }
    }
})

export const {
    setLoadedFiles,
    resetFiles,
    setMetroStation,
    setLoading,
    setOneUserData
} = appSlice.actions

export default appSlice.reducer
