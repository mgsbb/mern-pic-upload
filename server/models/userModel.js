import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
		isGuest: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

userSchema.index(
	{ createdAt: 1 },
	{
		expireAfterSeconds: 3600,
		partialFilterExpression: { isGuest: true },
	}
);

const userModel = mongoose.model('User', userSchema);

export default userModel;
