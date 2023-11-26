import {
	SIGN_UP,
	SIGN_IN,
	LOGOUT,
	DELETE_USER,
	UPDATE_USER,
	GET_USER,
	GET_USERS,
} from '../constants/actionTypes';
import { setAlert, clearAlert } from './alert';
import * as api from '../api';
import { endLoading, startLoading } from './loading';

// ============================================================================================
// Auth (page)
export const signUp = (authData, navigate) => async (dispatch) => {
	try {
		dispatch(setAlert('Authenticating. Please wait...', 'green'));
		const { data } = await api.signUp(authData);
		dispatch({ type: SIGN_UP, payload: data });
		navigate(`/home`);
		dispatch(clearAlert());
	} catch (error) {
		dispatch(setAlert(error.response.data.message, 'red'));
		console.log(error);
	}
};

// ============================================================================================
// Auth (page)
export const signIn = (authData, navigate) => async (dispatch) => {
	try {
		dispatch(setAlert('Authenticating. Please wait...', 'green'));
		const { data } = await api.signIn(authData);
		dispatch({ type: SIGN_IN, payload: data });
		navigate(`/home`);
		dispatch(clearAlert());
	} catch (error) {
		dispatch(setAlert(error.response.data.message, 'red'));
		console.log(error);
	}
};

// ============================================================================================
// Navbar (component)
export const logout = () => {
	return { type: LOGOUT };
};

// ============================================================================================
// Navbar (component)
export const deleteUser = (userId) => async (dispatch) => {
	try {
		const { data } = await api.deleteUser();
		dispatch({ type: DELETE_USER, payload: data });
	} catch (error) {
		console.log(error);
	}
};

// ============================================================================================
// User (page)
export const updateUser = (userId, formData) => async (dispatch) => {
	try {
		dispatch(startLoading());
		const { data } = await api.updateUser(userId, formData);
		dispatch({ type: UPDATE_USER, payload: data });
		dispatch(endLoading());
		dispatch(setAlert(data.message, 'green'));
		setTimeout(() => dispatch(clearAlert()), 3000);
	} catch (error) {
		console.log(error);
		dispatch(endLoading());
		console.log(error.response.data.message);
		dispatch(setAlert(error.response.data.message, 'red'));
	}
};

// ============================================================================================
// User (page)
export const getUser = (userId) => async (dispatch) => {
	try {
		dispatch(startLoading());
		const { data } = await api.getUser(userId);
		dispatch({ type: GET_USER, payload: data.userDetails });
		dispatch(endLoading());
	} catch (error) {
		console.log(error);
		dispatch(endLoading());
	}
};

// ============================================================================================
// User (page)
export const getUsers = (userName) => async (dispatch) => {
	try {
		dispatch(startLoading());
		const { data } = await api.getUsers(userName);
		dispatch({ type: GET_USERS, payload: data.users });
		dispatch(endLoading());
	} catch (error) {
		console.log(error);
		dispatch(endLoading());
	}
};
