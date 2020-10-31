import axios from "axios";
import { API_FETCH_LOAD_FILES } from "../../constants/api.constants";
import { setLoadedFiles, setMetroStation } from "../reducers/app.reducer";

export const handlerLoadFiles = data => async dispatch => {
    await axios.post(API_FETCH_LOAD_FILES, data).then((res) => {
        const urls = []
        for (let i = 0; i < res.data.length; i++) {
            urls.push(res.data[i].filename)
        }
        dispatch(setLoadedFiles(urls));
    })
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
        case '52':
            cityId = '66'
            break
        case '54':
            cityId = '4'
            break
        case '16':
            cityId = '88'
            break
        case '63':
            cityId = '78'
            break
        default:
            cityId = null
    }

    if (cityId) {
        const API_METRO_STATION = `https://api.hh.ru/metro/${cityId}`;
        await axios.get(API_METRO_STATION).then(({ data }) => {
            const stations = []
            data.lines.map(line => {
                let color = line.hex_color
                line.stations.map(station => {
                    stations.push({ name: station.name, color })
                })
            })
            dispatch(setMetroStation(stations))
        })
    } else {
        dispatch(setMetroStation([]))
    }
}