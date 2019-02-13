import { IngredientModel } from '../models/ingredientModel';
import { IngredientAmountSchema } from '../models/ingredientAmountModel';
import { Request, Response } from 'express';
import { RecipeModel } from '../models/recipeModel';
import { ScheduleModel } from '../models/scheduleModel';
import { log } from 'util';

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

    getIngredientsByWeekNumber(req: Request, res: Response): void {
        let recipeIds = [];
        let self = new IngredientController();

        ScheduleModel
        .findOne({ weekNumber: req.params.weekNumber })
        .exec((err, schedule) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (schedule) {
                    schedule.weekDays.forEach(weekDay => {
                        if (weekDay.recipe) {
                            recipeIds.push(weekDay.recipe);
                        }
                    });

                    RecipeModel
                    .find()
                    .where('_id')
                    .in(recipeIds)
                    .select('ingredientAmounts')
                    .populate('ingredientAmounts.ingredient')
                    .exec((err, ingredientAmounts) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            const ingredients = self._mergeIngredientAmounts(ingredientAmounts);
                            console.log(ingredients);
                            
                            res.status(200).json(ingredients);
                        }
                    });
                    
                } else {
                    res.status(404).json({ statusText: `schedule ${req.params.weekNumber} not found`})
                }
            }
        })
    }

    getIngredientsByRecipe(req: Request, res: Response): void {
        let recipeIds = req.body.recipeIds;

        RecipeModel.find()
        .where('_id')
        .in(recipeIds)
        .select('ingredientAmounts')
        .populate('ingredientAmounts.ingredient')
        .exec((err, recipes) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(recipes);
            }
        });
    }

    private _mergeIngredientAmounts(ingredientAmountsRaw) {
        let ingredients : { name: String, amount: String, amountUnit: string }[] = [];

        ingredientAmountsRaw.forEach(ingredientAmountRaw => {
            ingredientAmountRaw.ingredientAmounts.forEach(ingredientAmount => {
                let name = ingredientAmount.ingredient.name;
                let amount = ingredientAmount.amount;
                let amountUnit = ingredientAmount.amountUnit;

                console.log(ingredients.filter(ingredient => ingredient.name === name));
                
    
                if (!ingredients.filter(ingredient => ingredient.name === name).length) {
                    ingredients = [...ingredients, { name: name, amount: amount, amountUnit: amountUnit }];
                } else {
                    ingredients.map(ingredient => {
                        if (ingredient.name === name) {
                            ingredient.amount = ingredient.amount += amount;
                        }
                    })
                }
            })
        })

        return ingredients;
    }
}