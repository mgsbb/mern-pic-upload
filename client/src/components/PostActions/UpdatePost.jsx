import React from 'react';
import { useNavigate } from 'react-router-dom';

// ============================================================================================
// Component
// ============================================================================================
const UpdatePost = ({ post }) => {
	const navigate = useNavigate();

	const handleUpdate = async () => {
		navigate(`/update/${post._id}`);
	};

	return <i className='fa-solid fa-pen edit-btn' onClick={handleUpdate}></i>;
};

// ============================================================================================

export default UpdatePost;
