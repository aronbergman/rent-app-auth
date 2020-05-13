import {createSlice} from '@reduxjs/toolkit'
import {START} from "../../constants/others.constants";

const TODOS_REDUCER_NAME = 'rent'

const rentSlice = createSlice({
    name: TODOS_REDUCER_NAME,
    initialState: {
        ads: [],
        count: 0,
        limit: 10,
        pages: 1,
        hasMore: true,
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
        },
        singleAd: null
    },
    reducers: {
        setRentAds(state, action) {
            state.ads = action.payload.ads;
            state.count = action.payload.count
            state.singleAd = null
            state.loaded = true;
        },
        setRentAdsOffset(state, action) {
            state.hasMore = (state.limit * state.pages) !== Math.ceil(state.count / 10) * 10
            state.pages = ++state.pages
            state.ads = [
                ...state.ads,
                ...action.payload.ads
            ];
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
        },
        setLoading(state, action) {
            state.loaded = action.payload !== START
        },
        setSingleAd(state, action) {
            state.singleAd = action.payload
            state.loaded = true
        }
    }
})

export const {
    setRentAds,
    setRentAdsOffset,
    handleFilterCategoryChange,
    handleFilterCityChange,
    handleFilterSizeChange,
    handleFilterTextChange,
    handleInStockChange,
    setLoadedFiles,
    setMetroStation,
    setTypeOfApplicant,
    resetFiles,
    setSingleAd,
    setLoading
} = rentSlice.actions

export default rentSlice.reducer
