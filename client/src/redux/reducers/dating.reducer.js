import {createSlice} from '@reduxjs/toolkit'
import {START} from "../../constants/others.constants";

const TODOS_REDUCER_NAME = 'dating'

const datingSlice = createSlice({
    name: TODOS_REDUCER_NAME,
    initialState: {
        categories: null,
        ads: [],
        count: 0,
        limit: 10,
        pages: 1,
        hasMore: true,
        loaded: false,
        singleCategory: {
            title: '',
            ads: []
        },
        create: {
            files: [],
            metro: [],
            typeOfApplicant: null
        },
        singleAd: null
    },
    reducers: {
        // setDatingAds(state, action) {
        //     state.ads = action.payload.ads;
        //     state.count = action.payload.count
        //     state.singleAd = null
        //     state.loaded = true;
        // },
        setDatingAdsOffset(state, action) {
            state.hasMore = (state.limit * state.pages) !== Math.ceil(state.count / 10) * 10
            state.pages = ++state.pages
            state.singleCategory.ads = [
                ...state.singleCategory.ads,
                ...action.payload.ads
            ];
            state.loaded = true;
        },
        fetchAllDatingCategories(state, action) {
            state.categories = action.payload
        },
        fetchCategory(state, action) {
            state.singleCategory.title = action.payload.category.title
            state.singleCategory.ads = action.payload.ads.ads
            state.count = action.payload.count
            state.singleAd = null
            state.loaded = true;
            state.hasMore = !!action.payload.ads.ads.length
        },
        setSingleAd(state, action) {
            state.singleAd = action.payload
            state.loaded = true
        }
    }
})

export const {
    fetchAllDatingCategories,
    fetchCategory,
    setSingleAd,
    setDatingAds,
    setDatingAdsOffset
} = datingSlice.actions

export default datingSlice.reducer
