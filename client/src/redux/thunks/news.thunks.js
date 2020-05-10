import axios from "axios";
import {API_FETCH_ALL_NEWS, API_FETCH_NEWS_OFFSET} from "../../constants/api.constants";
import {fetchAllNews, fetchOffsetNews} from "../reducers/news.reducer";

export const handlerNews = () => async dispatch => {
    const response = await axios.post(API_FETCH_ALL_NEWS)
    dispatch(fetchAllNews(response.data));
    return response.data;
}

export const handlerNewsOffset = (data) => async dispatch => {
    const response = await axios.post(API_FETCH_NEWS_OFFSET, data)
    dispatch(fetchOffsetNews(response.data));
    return response.data;
}

