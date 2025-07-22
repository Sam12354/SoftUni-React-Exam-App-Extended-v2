import { Router } from 'express';
import { commentService } from '../services/commentService.js';
import { isAuth } from '../middlewares/authMiddleware.js';
import { getErrorMassage } from '../utils/errorUtils.js';

const router = Router();

// Get all comments for an item
router.get('/item/:itemId', async (req, res) => {
    try {
        const comments = await commentService.getItemComments(req.params.itemId);
        res.json(comments);
    } catch (err) {
        // console.error('Error fetching comments:', err.message);
        res.status(400).json({ error: getErrorMassage(err) });
    }
});

// Create a comment for an item (auth required)
router.post('/item/:itemId/create', isAuth, async (req, res) => {
    const userId = req.user._id;
    const { text } = req.body;

    // console.log('Creating comment...');
    // console.log('User ID:', userId);
    // console.log('Item ID:', req.params.itemId);

    try {
        const newComment = await commentService.createComment(userId, req.params.itemId, text);
        // console.log(newComment);
        
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ error: getErrorMassage(err) });
    }
});

export default router;
