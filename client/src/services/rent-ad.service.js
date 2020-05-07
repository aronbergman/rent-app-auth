import axios from "axios";
import {setRentAds} from "../redux/reducers/rent.reducer";

const API_URL = "http://localhost:8080/api/rent/";


// const create = (username, email) => {
//     return axios
//         .post(API_URL + "create-ad", {
//             username,
//             email
//         })
//         .then(response => {
//             return response.data;
//         });
// }

export const fetchAll = () => async dispatch => {
    // dispatch(setLoading(true));
    const response = await axios.post(API_URL + "fetch-all")
    console.log(response.data)
    dispatch(setRentAds(response.data.response));
    return response.data;
}