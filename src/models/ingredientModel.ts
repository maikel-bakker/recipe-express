import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const IngredientSchema = new Schema({
    name: {
        type: String,
        required: 'Enter an ingredient name'
    },
    type: {
        type: String,
        required: 'Supply an ingredient type'
    }
});

export const IngredientModel = mongoose.model('Ingredient', IngredientSchema);
