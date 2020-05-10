import {fetchRole} from "../reducers/user.reducer";

export const setRole = data => async dispatch => {
   dispatch(fetchRole(data))
}