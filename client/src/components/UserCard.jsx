import React from 'react';
import { useNavigate } from 'react-router-dom';

import './styles.css';

// ============================================================================================
// Component
// ============================================================================================

const UserCard = ({ user }) => {
	const navigate = useNavigate();

	return (
		<div className='card'>
			{/* Card name, email*/}
			<div
				style={{ cursor: 'pointer' }}
				onClick={() => navigate(`/home?userId=${user?._id}`)}
			>
				<h3 className='card-title'>{user?.firstName}</h3>
				<h3 className='card-title'>{user?.lastName}</h3>
			</div>
		</div>
	);
};

// ============================================================================================

export default UserCard;
