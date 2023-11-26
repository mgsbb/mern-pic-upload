import React from 'react';

import './styles.css';

// ============================================================================================
// Component
// ============================================================================================

const ErrorPage = () => {
	return (
		<div className='error-display'>
			<div>404</div>
			<p className='error-message'>Resource not found</p>
		</div>
	);
};

// ============================================================================================

export default ErrorPage;
