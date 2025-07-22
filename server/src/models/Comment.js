import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
	itemId: {
		type: mongoose.Types.ObjectId,
		ref: 'Item',
		required: true,
	},
	userId: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	text: {
		type: String,
		required: true,
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;