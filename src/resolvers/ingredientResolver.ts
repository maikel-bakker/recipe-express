import { IngredientModel } from "../models/ingredientModel";

export const IngredientResolver = {
    Query: {
        ingredients: () => IngredientModel.find({})
    }
}