import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../actions/auth';
import { useQuery } from './Home';

import { UserCard } from '../components';

// ============================================================================================
// Component
// ============================================================================================

const UserSearchResults = () => {
	const query = useQuery();
	const userName = query.get('name');
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state) => state.loadingState);

	// ------------------------------------------------------------------------------------------

	useEffect(() => {
		dispatch(getUsers(userName));
	}, [userName, dispatch]);

	const { users } = useSelector((state) => state.authState);
	// ------------------------------------------------------------------------------------------
	// Return
	// ------------------------------------------------------------------------------------------

	// Loading finished and no posts found
	if (!isLoading && users.length === 0) {
		return (
			<div style={{ width: '100vw', height: '100vh' }}>
				<div className='no-posts-text'>NO USERS FOUND</div>
			</div>
		);
	}

	return (
		<div className='home-bg'>
			{/* Mapping of users as UserCard components*/}
			<div className='center'>
				<div className='grid-container'>
					{users?.map((user) => (
						<UserCard user={user} key={user._id} />
					))}
				</div>
			</div>
		</div>
	);
};

// ============================================================================================
export default UserSearchResults;
