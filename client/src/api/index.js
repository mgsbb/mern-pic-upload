import axios from 'axios';

// ============================================================================================
// Instance
// ============================================================================================

const API = axios.create({ baseURL: '/api/v1' });

// ============================================================================================
// Interceptors
// ============================================================================================

API.interceptors.request.use(
	(req) => {
		if (localStorage.getItem('profile')) {
			req.headers.Authorization = `Bearer ${
				JSON.parse(localStorage.getItem('profile'))?.token
			}`;
		}
		return req;
	},
	(error) => console.log(error)
);

// ============================================================================================
// Posts
// ============================================================================================

export const getPost = (postId) => API.get(`/posts/${postId}`);

export const getPosts = (userId, search, searchTags, sort) =>
	API.get(
		`/posts?user=${userId}&search=${search}&searchTags=${searchTags}&sort=${sort}`
	);

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (updatedPost, postId) =>
	API.patch(`/posts/${postId}`, updatedPost);

export const deletePost = (postId) => API.delete(`/posts/${postId}`);

export const deletePostsOfUser = () => API.delete(`/posts`);

// ============================================================================================
// Users
// ============================================================================================

export const signUp = (authData) => API.post('/users/signup', authData);

export const signIn = (authData) => API.post('/users/signin', authData);

export const deleteUser = () => API.delete(`/users/userId`);

export const updateUser = (userId, formData) =>
	API.patch(`/users/userId`, formData);

export const getUser = (userId) => {
	return API.get(`/users/${userId}`);
};

export const getUsers = (userName) => {
	return API.get(`/users?userName=${userName}`);
};
