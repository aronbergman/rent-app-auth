import axios from "axios";
import {resetFiles, setLoadedFiles, setRentAds} from "../reducers/rent.reducer";
import {
    API_CREATE_RENT_ADS,
    API_FETCH_ALL_RENT_ADS, API_FETCH_DELETE_AD, API_FETCH_LOAD_FILES, API_FETCH_SINGLE_RENT_AD,
    API_FETCH_USER_RENT_ADS
} from "../../constants/api.constants";


export const createAd = (data) => async dispatch => {
    dispatch(resetFiles())
    const response = await axios.post(API_CREATE_RENT_ADS, data)
    return response.data;
}

export const fetchAll = () => async dispatch => {
    const response = await axios.post(API_FETCH_ALL_RENT_ADS)
    dispatch(setRentAds(response.data));
    return response.data;
}

export const actionGetUserAds = data => async dispatch => {
    const response = await axios.post(API_FETCH_USER_RENT_ADS, data)
    return response.data;
}

export const handlerSingleRentAd = data => async dispatch => {
    const response = await axios.post(API_FETCH_SINGLE_RENT_AD, {id: data})
    return response.data;
}

export const handlerDeleteRentAd = data => async dispatch => {
    const response = await axios.post(API_FETCH_DELETE_AD, data)
    return response.data;
}

export const handlerLoadFiles = data => async dispatch => {
    await axios.post(API_FETCH_LOAD_FILES, data).then((res) => {
        const urls = []
        for (let i = 0; i < res.data.length; i++) {
            urls.push(res.data[i].filename)
        }
        dispatch(setLoadedFiles(urls));
    })
}