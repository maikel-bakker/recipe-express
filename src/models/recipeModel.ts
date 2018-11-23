import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const RecipeSchema = new Schema({
    title: {
        type: String,
        required: 'Enter a title'
    },
    description: {
        type: String,
        required: 'Enter a description'
    },
    serves: {
        type: Number,
        required: 'Enter a number of people'
    },
    cookTime: {
        type: Number,
        required: 'Enter a cooking time'
    },
    difficulty: {
        type: Number,
        min: 1,
        max: 5,
        required: 'Enter a difficulty'
    }
})
