import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const IngredientAmountSchema = new Schema({
    ingredient: {
        type: Schema.Types.ObjectId, 
        ref: 'Ingredient',
        required: 'Enter an ingredient ID'
    },
    amount: {
        type: Number,
        required: 'Supply an ingredient amount'
    },
    amountUnit: {
        type: String,
        required: 'Supply an ingredient unit'
    }
});

export const IngredientAmountModel = mongoose.model('IngredientAmount', IngredientAmountSchema);
