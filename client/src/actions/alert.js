import { SET_ALERT, CLEAR_ALERT } from '../constants/actionTypes';

export const setAlert = (message, color) => ({
	type: SET_ALERT,
	payload: { message, color },
});

export const clearAlert = () => ({ type: CLEAR_ALERT });
