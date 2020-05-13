import axios from "axios";
import {
    resetFiles,
    setLoadedFiles, setLoading,
    setMetroStation,
    setRentAds,
    setRentAdsOffset, setSingleAd,
    setTypeOfApplicant
} from "../reducers/rent.reducer";
import {
    API_CREATE_RENT_ADS,
    API_FETCH_ALL_RENT_ADS,
    API_FETCH_DELETE_AD,
    API_FETCH_DELETE_AD_AUTH,
    API_FETCH_LOAD_FILES, API_FETCH_OFFSET_RENT_ADS,
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
    const response = await axios.post(API_FETCH_SINGLE_RENT_AD, {id: data})
    return response.data;
}

export const handlerDeleteRentAd = data => async dispatch => {
    const response = await axios.post(API_FETCH_DELETE_AD, data)
    return response.data;
}

export const handlerSingleAd = data => async dispatch => {
    dispatch(setLoading(START))
    const parse = parseAds({ads: [data]})
    dispatch(setSingleAd(parse.ads[0]))
}

export const handlerDeleteRentAdAuth = data => async dispatch => {
    const response = await axios.post(API_FETCH_DELETE_AD_AUTH, data, {headers: authHeader()})
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

export const handlerTypeOfApplicant = data => async dispatch => {
    dispatch(setTypeOfApplicant(data));
}

export const handlerCityForLoadingMetro = data => async dispatch => {
    console.log('data handlerCityForLoadingMetro', data)
    let cityId = ''


    switch (data) {
        case '77':
            cityId = '1'
            break
        case '78':
            cityId = '2'
            break
        case '66':
            cityId = '3'
            break
        default:
            cityId = '1'
    }

    const API_METRO_STATION = `https://api.hh.ru/metro/${cityId}`;
    await axios.get(API_METRO_STATION).then(({data}) => {

        const stations = []
        data.lines.map(line => {
            let color = line.hex_color
            line.stations.map(station => {
                stations.push({name: station.name, color})
            })
        })

        dispatch(setMetroStation(stations))
    })
}