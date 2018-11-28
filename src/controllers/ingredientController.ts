import { IngredientModel } from '../models/ingredientModel';
import { Request, Response } from 'express';

export class IngredientController {
    getIngredients(req: Request, res: Response): void {
        IngredientModel.find({}, (err, ingredient) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(ingredient);
            }
        });
    }
    
    addIngredient(req: Request, res: Response): void {
        let newIngredient = new IngredientModel(req.body);

        newIngredient.save((err, ingredient) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(ingredient);
            }
        })
    }
}