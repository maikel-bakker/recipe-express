import * as mongoose from 'mongoose';
import { IngredientAmountSchema } from './ingredientAmountModel';

const Schema = mongoose.Schema;

export const IngredientListSchema = new Schema({
    weekNumber: {
        type: Number,
        required: 'Enter a weeknumber'
    },
    ingredientAmounts: [IngredientAmountSchema],
});

export const IngredientListModel = mongoose.model('IngredientList', IngredientListSchema);