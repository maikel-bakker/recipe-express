import { RecipeModel } from '../models/recipeModel';
import { Request, Response } from 'express';

export class RecipeController {

    addRecipe(req: Request, res: Response): void {
        let newRecipe = new RecipeModel(req.body);

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
        RecipeModel.find()
        .populate('ingredients')
        .exec((err, recipe) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(recipe);
            }
        });
    }
}