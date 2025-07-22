import { Router } from 'express';
import { reviewService } from '../services/reviewService.js';
import { getErrorMassage } from '../utils/errorUtils.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/item/:itemId', async (req, res) => {
    const itemId = req.params.itemId;

    try {
        const reviews = await reviewService.getItemReviews(itemId);
        res.json(reviews);
    } catch (err) {
        res.status(400).json({ error: getErrorMassage(err) });
    }
});

router.get('/item/:itemId/average', async (req, res) => {
    const itemId = req.params.itemId;
    // console.log(itemId); check
    
    try {
        const stats = await reviewService.getAverageRating(itemId);
        // console.log(stats); working
        
        res.json(stats);
    } catch (err) {
        res.status(400).json({ error: getErrorMassage(err) });
    }
});

router.post('/item/:itemId/create', isAuth, async (req, res) => {
    const itemId = req.params.itemId;
    const userId = req.user._id;
    const stars = req.body.stars;

    // console.log('POST /create review:', { userId, itemId, stars });

    try {
        const review = await reviewService.createReview(userId, itemId, stars);
        
        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ error: getErrorMassage(err) });
    }
});

router.get('/item/:itemId/user', isAuth, async (req, res) => {
    const itemId = req.params.itemId;
    const userId = req.user._id;

    try {
        const review = await reviewService.getUserReview(userId, itemId);
        res.json(review);
    } catch (err) {
        res.status(400).json({ error: getErrorMassage(err) });
    }
});

export default router;