import axios from "axios";
import {API_FETCH_DATING_CATEGORIES, API_FETCH_SINGLE_CATEGORY} from "../../constants/api.constants";
import {fetchAllDatingCategories, fetchCategory} from "../reducers/dating.reducer";

export const handlerDatingCategories = () => async dispatch => {
    const response = await axios.post(API_FETCH_DATING_CATEGORIES)
    dispatch(fetchAllDatingCategories(response.data));
    return response.data;
}

export const handlerSingleCategoryLoad = data => async dispatch => {
    const response = await axios.post(API_FETCH_SINGLE_CATEGORY, data)
    dispatch(fetchCategory(response.data));
    return response.data;
}
