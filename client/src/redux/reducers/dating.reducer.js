import {createSlice} from '@reduxjs/toolkit'

const TODOS_REDUCER_NAME = 'dating'

const datingSlice = createSlice({
    name: TODOS_REDUCER_NAME,
    initialState: {
        categories: [],
        loaded: false,
        singleCategory: {
            title: '',
            ads: []
        }
    },
    reducers: {
        fetchAllDatingCategories(state, action) {
            state.categories = action.payload
        },
        fetchCategory(state, action) {
            state.singleCategory.title = action.payload.category.title
            state.singleCategory.ads = action.payload.ads
        }
    }
})

export const {
    fetchAllDatingCategories,
    fetchCategory
} = datingSlice.actions

export default datingSlice.reducer
