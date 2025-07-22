import { Schema, model, Types } from "mongoose";

const itemSchema = new Schema ({

    title: {
        type: String,
        required: [true, 'Title field is required'],
        minLength: [5, 'Title must be at least 5 characters long']
    },

    brand: {
        type: String,
        required: [true, 'Brand field is required'],
        minLength: [2, 'Brand must be at least 2 characters long']
    },

    price: {
        type: Number,
        required: [true, 'Price field is required'],
        min: [0.1, 'Price must be a positive number']
    },

    image: {
        type: String,
        required: [true, 'Image field is required'],
    },

    description: {
        type: String,
        required: [true, 'Description field is required'],
        minLength: [10, 'Description must be at least 10 characters long']
    },

    userList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],

    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }

})

const Item = model('Item', itemSchema)

export default Item