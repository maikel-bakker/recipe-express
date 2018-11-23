import * as mongoose from 'mongoose';
import { RecipeSchema } from '../models/recipeModel';
import { Request, Response } from 'express';

const Recipe = mongoose.model('Recipe', RecipeSchema);

export class RecipeController {

    addRecipe(req: Request, res: Response): void {
        let newRecipe = new Recipe(req.body);

        newRecipe.save((err, recipe): void => {
            if (err) {
                res.status(500).json(err);
                console.log('recipe not saved due to error');
                console.log(err);
            } else {
                console.log('recipe saved');
                res.json(recipe);
            }
        });
    }

    getRecipes(req: Request, res: Response): void {
        Recipe.find({}, (err, recipe) => {
            if (err) {
                res.send(err);
            } else {
                res.json(recipe);
            }
            
        });
    }
}