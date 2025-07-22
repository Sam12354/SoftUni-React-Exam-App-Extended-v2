import Review from "../models/Reviews.js";
import mongoose from 'mongoose';

export const reviewService = {
    async createReview(userId, itemId, stars) {
        const existingReview = await Review.findOne({ user: userId, item: itemId });
        if (existingReview) {
            throw new Error("You have already reviewed this item.");
        }

        return Review.create({ user: userId, item: itemId, stars });
    },

    async getItemReviews(itemId) {
        return Review.find({ item: itemId }).populate("user", "email");
    },

    async getAverageRating(itemId) {
        // console.log('getAverageRating called with itemId:', itemId);
        try {
            const objectId = new mongoose.Types.ObjectId(itemId);
    
            const result = await Review.aggregate([
                { $match: { item: objectId } },
                {
                    $group: {
                        _id: "$item",
                        average: { $avg: "$stars" },
                        count: { $sum: 1 }
                    }
                }
            ]);
            // console.log('Aggregation result:', result);
            return result[0] || { average: 0, count: 0 };
        } catch (err) {
            // console.error('Aggregation error:', err);
            throw err;
        }
    },

    async getUserReview(userId, itemId) {
        return Review.findOne({ user: userId, item: itemId });
    }
};