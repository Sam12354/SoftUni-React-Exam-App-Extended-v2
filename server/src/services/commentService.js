import Comment from '../models/Comment.js';

export const commentService = {
    // Get all comments for a specific item
    getItemComments: async (itemId) => {
        return Comment.find({ itemId }).populate('userId', 'email').sort({ createdAt: -1 });
    },
    

    // Create a new comment
    createComment: async (userId, itemId, content) => {
        return Comment.create({ userId: userId, itemId: itemId, text: content });
    }
};