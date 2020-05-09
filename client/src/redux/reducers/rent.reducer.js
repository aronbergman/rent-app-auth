import {createSlice} from '@reduxjs/toolkit'

const TODOS_REDUCER_NAME = 'rent'

const rentSlice = createSlice({
    name: TODOS_REDUCER_NAME,
    initialState: {
        ads: [],
        loaded: false,
        filter: {
            filterCategory: "all",
            filterCity: "all",
            filterSize: "all",
            filterText: "",
            inStockOnly: false
        },
        create: {
            files: [],
            metro: [],
            typeOfApplicant: null
        }
    },
    reducers: {
        setRentAds(state, action) {
            state.ads = action.payload;
            state.loaded = true;
        },
        handleFilterCategoryChange(state, action) {
            state.filter.filterCategory = action.payload
        },
        handleFilterCityChange(state, action) {
            state.filter.filterCity = action.payload
        },
        handleFilterSizeChange(state, action) {
            state.filter.filterSize = action.payload
        },
        handleFilterTextChange(state, action) {
            state.filter.filterText = action.payload
        },
        handleInStockChange(state, action) {
            state.filter.inStockOnly = action.payload
        },
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
        setTypeOfApplicant(state, action) {
            state.create.typeOfApplicant = action.payload
        }
    }
})

export const {
    setRentAds,
    handleFilterCategoryChange,
    handleFilterCityChange,
    handleFilterSizeChange,
    handleFilterTextChange,
    handleInStockChange,
    setLoadedFiles,
    setMetroStation,
    setTypeOfApplicant,
    resetFiles
} = rentSlice.actions

export default rentSlice.reducer
