import { Schema, model, Types } from 'mongoose'

const reviewSchema = new Schema({
    item: {
        type: Types.ObjectId,
        ref: 'Item',
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
}, { timestamps: true });

const Review = model('Review', reviewSchema)

export default Review