import axios from "axios";
import {API_FETCH_USER_CHATS} from "../../constants/api.constants";
import {getLoaded, getUserChats} from "../reducers/chats.reducer";
import {FINISH, START} from "../../constants/others.constants";
import authHeader from "../../services/auth-header";

export const getUserChatsApi = data => async dispatch => {
    dispatch(getLoaded(START))
    const response = await axios.post(API_FETCH_USER_CHATS, data,{headers: authHeader()})
    dispatch(getUserChats(response.data));
    dispatch(getLoaded(FINISH))
    return response.data;
}