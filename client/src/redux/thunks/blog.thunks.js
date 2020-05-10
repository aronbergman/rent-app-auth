import axios from "axios";
import {API_CREATE_POST, API_FETCH_LOAD_FILES} from "../../constants/api.constants";

export const createPostHandler = data => async dispatch => {
    const response = await axios.post(API_CREATE_POST, data)
    return response.data;
}

export const getImageHandler = data => async dispatch => {
    let urls = []
    await axios.post(API_FETCH_LOAD_FILES, data).then((res) => {
        for (let i = 0; i < res.data.length; i++) {
            urls.push(res.data[i].filename)
        }
    })
    return urls
}