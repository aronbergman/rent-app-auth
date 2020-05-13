import axios from "axios";
import {setLoading, resetFiles} from '../reducers/app.reducer'
import {
    setRentAds,
    setRentAdsOffset, setSingleAd,
    setTypeOfApplicant
} from '../reducers/rent.reducer';
import {
    API_CREATE_RENT_ADS,
    API_FETCH_ALL_RENT_ADS,
    API_FETCH_DELETE_AD,
    API_FETCH_DELETE_AD_AUTH,
    API_FETCH_OFFSET_RENT_ADS,
    API_FETCH_SINGLE_RENT_AD,
    API_FETCH_USER_RENT_ADS
} from "../../constants/api.constants";
import authHeader from "../../services/auth-header";
import {parseAds} from "../../helpers/rentDataParsers";
import {FINISH, START} from "../../constants/others.constants";

export const createAd = (data) => async dispatch => {
    dispatch(resetFiles())
    const response = await axios.post(API_CREATE_RENT_ADS, data)
    return response.data;
}

export const fetchAll = data => async dispatch => {
    const response = await axios.post(API_FETCH_ALL_RENT_ADS, data)
    const parse = await parseAds(response.data)
    dispatch(setRentAds(parse));
    return parse;
}

export const handlerFetchOffsetRentAd = (data) => async dispatch => {
    const response = await axios.post(API_FETCH_OFFSET_RENT_ADS, data)
    const parse = await parseAds(response.data)
    dispatch(setRentAdsOffset(parse));
    return parse;
}

export const actionGetUserAds = data => async dispatch => {
    dispatch(setLoading(START))
    const response = await axios.post(API_FETCH_USER_RENT_ADS, data)
    const parse = await parseAds(response.data)
    dispatch(setRentAds(parse));
    return response.data;
}

export const handlerSingleRentAd = data => async dispatch => {
    dispatch(setLoading(START))
    const response = await axios.post(API_FETCH_SINGLE_RENT_AD, {id: data})
    const parse = parseAds({ads: [response.data]})
    dispatch(setSingleAd(parse.ads[0]))
}

export const handlerDeleteRentAd = data => async dispatch => {
    const response = await axios.post(API_FETCH_DELETE_AD, data)
    return response.data;
}

export const handlerSingleAd = data => async dispatch => {

}

export const handlerDeleteRentAdAuth = data => async dispatch => {
    const response = await axios.post(API_FETCH_DELETE_AD_AUTH, data, {headers: authHeader()})
    return response.data;
}

export const handlerTypeOfApplicant = data => async dispatch => {
    dispatch(setTypeOfApplicant(data));
}