import { RecipeModel } from "../models/recipeModel";

export const RecipeResolver = {
    Query: {
        recipes: () => RecipeModel.find()
                        .sort({ 'updatedAt': 1 })
                        .populate('ingredientAmounts.ingredient'),
        recipe: (root, { _id }) => RecipeModel.findById(_id)
    },
    Mutation: {
        addRecipe: async (root, { recipe }) => {
            const newRecipe = new RecipeModel(recipe);
            let savedRecipe = await newRecipe.save();

            return savedRecipe.populate('ingredients').execPopulate();
        }
    }
};
