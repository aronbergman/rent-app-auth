import axios from "axios";
import { API_FETCH_ALL_NEWS, API_FETCH_NEWS_OFFSET, API_FETCH_SINGLE_POST } from "../../constants/api.constants";
import { fetchAllNews, fetchOffsetNews } from "../reducers/news.reducer";

export const handlerNews = () => async dispatch => {
    const response = await axios.post(API_FETCH_ALL_NEWS)
    console.log('response handlerNews', response.data)
    dispatch(fetchAllNews(response.data));
    return response.data;
}

export const handlerNewsOffset = (data) => async dispatch => {
    const response = await axios.post(API_FETCH_NEWS_OFFSET, data)
    if (response.data.length) {
        dispatch(fetchOffsetNews(response.data));
        return response.data;
    }
}

export const fetchSinglePost = (data) => async dispatch => {
    const response = await axios.post(API_FETCH_SINGLE_POST, data)
    return response.data;
}

