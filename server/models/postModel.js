import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
	{
		title: String,
		description: String,
		selectedFile: String,
		tags: [String],
		creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		isGuestCreator: { type: Boolean, default: false },
		creatorName: String,
	},
	{ timestamps: true }
);

postSchema.index(
	{ createdAt: 1 },
	{
		expireAfterSeconds: 3600,
		partialFilterExpression: { isGuestCreator: true },
	}
);

const PostModel = mongoose.model('Post', postSchema);
export default PostModel;
