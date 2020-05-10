import {createSlice} from '@reduxjs/toolkit'

const TODOS_REDUCER_NAME = 'news'

const newsSlice = createSlice({
    name: TODOS_REDUCER_NAME,
    initialState: {
        news: null,
        count: 0,
        limit: 10,
        pages: 1,
        hasMore: true,
        loaded: false
    },
    reducers: {
        fetchAllNews(state, action) {
            state.news = action.payload.news
            state.count = action.payload.count
        },
        fetchOffsetNews(state,action) {
            state.pages = ++state.pages
            state.news = [
                ...state.news,
                ...action.payload
            ];
            state.loaded = true;
            state.hasMore = (state.limit * state.pages) !== Math.ceil(state.count/10)*10
        }
    }
})

export const {
    fetchAllNews,
    fetchOffsetNews
} = newsSlice.actions

export default newsSlice.reducer
