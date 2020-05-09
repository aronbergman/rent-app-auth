import {createSlice} from '@reduxjs/toolkit'

const TODOS_REDUCER_NAME = 'rent'

const rentSlice = createSlice({
    name: TODOS_REDUCER_NAME,
    initialState: {
        ads: [],
        loaded: false,
        files: [],
        filter: {
            filterCategory: "all",
            filterCity: "all",
            filterSize: "all",
            filterText: "",
            inStockOnly: false
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
            state.files = [
                ...state.files,
                ...action.payload
            ]
        },
        resetFiles(state, payload) {
            state.files = []
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
    resetFiles
} = rentSlice.actions

export default rentSlice.reducer
