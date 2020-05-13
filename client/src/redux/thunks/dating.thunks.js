import axios from "axios";
import {
    API_CREATE_DATING_ADS,
    API_FETCH_DATING_CATEGORIES,
    API_FETCH_DELETE_DATING_AD,
    API_FETCH_DELETE_DATING_AD_AUTH, API_FETCH_OFFSET_DATING_ADS, API_FETCH_OFFSET_RENT_ADS,
    API_FETCH_SINGLE_CATEGORY,
    API_FETCH_SINGLE_DATING_AD,
    API_FETCH_USER_DATING_ADS,
} from "../../constants/api.constants";
import {fetchAllDatingCategories, fetchCategory, setDatingAdsOffset} from "../reducers/dating.reducer";
import {resetFiles, setLoading} from "../reducers/app.reducer";
import {FINISH, START} from "../../constants/others.constants";
import {parseAds} from "../../helpers/rentDataParsers";
import {setDatingAds, setSingleAd} from "../reducers/dating.reducer";
import authHeader from "../../services/auth-header";
import {setRentAdsOffset} from "../reducers/rent.reducer";

export const handlerDatingCategories = () => async dispatch => {
    const response = await axios.post(API_FETCH_DATING_CATEGORIES)
    dispatch(fetchAllDatingCategories(response.data));
    return response.data;
}

export const handlerSingleCategoryLoad = data => async dispatch => {
    dispatch(setLoading(START))
    const response = await axios.post(API_FETCH_SINGLE_CATEGORY, data)
    console.log(response.data)
    const parse = await parseAds(response.data)
    console.log(parse)
    dispatch(fetchCategory({
        ads: parse,
        category: response.data.category,
        count: response.data.count
    }));
    dispatch(setLoading(FINISH))
    return response.data;
}

export const handlerFetchOffsetDatingAd = (data) => async dispatch => {
    const response = await axios.post(API_FETCH_OFFSET_DATING_ADS, data)
    const parse = await parseAds(response.data)
    dispatch(setDatingAdsOffset(parse));
    return parse;
}

export const createAd = (data) => async dispatch => {
    dispatch(resetFiles())
    const response = await axios.post(API_CREATE_DATING_ADS, data)
    return response.data;
}

export const handlerSingleDatingAd = data => async dispatch => {
    dispatch(setLoading(START))
    const response = await axios.post(API_FETCH_SINGLE_DATING_AD, {id: data})
    const parse = parseAds({ads: [response.data]})
    dispatch(setSingleAd(parse.ads[0]))
    dispatch(setLoading(FINISH))
}

export const handlerDeleteDatingAd = data => async dispatch => {
    const response = await axios.post(API_FETCH_DELETE_DATING_AD, data)
    return response.data;
}

export const actionGetUserAds = data => async dispatch => {
    dispatch(setLoading(START))
    const response = await axios.post(API_FETCH_USER_DATING_ADS, data)
    const parse = await parseAds(response.data)
    dispatch(setDatingAds(parse));
    return response.data;
}

export const handlerDeleteRentAdAuth = data => async dispatch => {
    const response = await axios.post(API_FETCH_DELETE_DATING_AD_AUTH, data, {headers: authHeader()})
    return response.data;
}