import { RecipeModel } from "../models/recipeModel";
import { IngredientModel } from "../models/ingredientModel";

export const RecipeResolver = {
    Query: {
        recipes: () => RecipeModel.find({}).populate('ingredients'),
        recipe: (root, { _id }) => RecipeModel.findById(_id)
    },
    Mutation: {
        addRecipe: async (root, args, context) => {
            const newRecipe = new RecipeModel(args);
            let savedRecipe = await newRecipe.save();
            return savedRecipe.populate('ingredients').execPopulate();
            //return newRecipe.save().then(recipe => recipe.populate('ingredients').execPopulate())
        }
    }
};