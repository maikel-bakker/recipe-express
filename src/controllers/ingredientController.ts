import * as mongoose from 'mongoose';
import { IngredientSchema } from '../models/ingredientModel';
import { Request, Response } from 'express';

const Ingredient = mongoose.model('Ingredient', IngredientSchema);

export class IngredientController {
    getIngredients(req: Request, res: Response): void {
        Ingredient.find({}, (err, ingredient) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(ingredient);
            }
        });
    }
    
    addIngredient(req: Request, res: Response): void {
        let newIngredient = new Ingredient(req.body);

        newIngredient.save((err, ingredient) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(ingredient);
            }
        })
    }
}