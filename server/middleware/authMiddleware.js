import jwt from 'jsonwebtoken';

// ============================================================================================

const auth = async (req, res, next) => {
	try {
		const token = req?.headers?.authorization?.split(' ')[1];

		if (!token) {
			throw new Error('There is no token found');
		}

		let decodedData;

		if (token) {
			decodedData = jwt.verify(token, process.env.JWT_SECRET);
			req.tokenData = decodedData;
		}

		next();
	} catch (error) {
		console.log(error);

		res.status(401).json({ message: 'Unauthorized action' });
	}
};

// ============================================================================================

export default auth;
