import * as mongoose from 'mongoose';
import { IngredientAmountSchema } from './ingredientAmountModel';

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
    imageUrl: {
        type: String
    },
    ingredientAmounts: [IngredientAmountSchema],
    steps: [{
        type: String
    }]
},
{
    timestamps: true
});

export const RecipeModel = mongoose.model('Recipe', RecipeSchema);
