import { Request, Response } from 'express';
import { IngredientModel } from '../models/ingredientModel';
import { RecipeModel } from '../models/recipeModel';
import { IngredientListModel } from '../models/ingredientListModel';

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

        IngredientListModel
            .findOne({ weekNumber: req.params.weekNumber })
            .select('ingredientAmounts')
            .populate('ingredientAmounts.ingredient')
            .exec((err, ingredientList) => {
                if (err) {
                    res.status(500).send(err);
                } 

                if (ingredientList) {
                    res.status(200).json(ingredientList);
                } else {
                    res.status(404).json({ message: 'Ingredient List not found' })
                }
        });
    }

    getIngredientsByRecipe(req: Request, res: Response): void {
        const recipeIds = req.body.recipeIds;

        RecipeModel.find()
            .where('_id')
            .in(recipeIds)
            .populate('ingredientAmounts')
            .exec((err, recipes) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).json(recipes);
                }
            });
    }

    public async addIngredientList(schedule) {
        const ingredientAmounts = await this._findAndMergeIngredientAmounts(schedule);
        const ingredientList = {
            weekNumber: schedule.weekNumber,
            ingredientAmounts: ingredientAmounts
        }

        IngredientListModel.findOneAndUpdate({ weekNumber: schedule.weekNumber }, 
            ingredientList,
            { upsert: true }, 
            (err, ingredientList) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(ingredientList);
                }
            });
    }

    private _findAndMergeIngredientAmounts(schedule) {
        const self = this;

        return new Promise((resolve, reject) => {
            RecipeModel
                .find()
                .where('_id')
                .in(self._getRecipeIds(schedule))
                .select('ingredientAmounts')
                .populate('ingredientAmounts.ingredient')
                .exec((err, ingredientAmounts) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(self._mergeIngredientAmounts(ingredientAmounts));
                    }
                });
        })
    }

    private _mergeIngredientAmounts(ingredientAmountsRaw) {
        let ingredients : { ingredient, amount: String, amountUnit: string }[] = [];

        ingredientAmountsRaw.forEach(ingredientAmountRaw => {

            ingredientAmountRaw.ingredientAmounts.forEach(ingredientAmount => {
                let ingredient = ingredientAmount.ingredient;
                let name = ingredientAmount.ingredient.name;
                let amount = ingredientAmount.amount;
                let amountUnit = ingredientAmount.amountUnit;
    
                if (!ingredients.filter(ingredient => ingredient.ingredient.name === name).length) {
                    ingredients = [...ingredients, { ingredient: ingredient, amount: amount, amountUnit: amountUnit }];
                } else {
                    ingredients.map(ingredient => {
                        if (ingredient.ingredient.name === name) {
                            ingredient.amount = ingredient.amount += amount;
                        }
                    })
                }
            });

        });

        return ingredients;
    }

    private _getRecipeIds(schedule: any): string[] {
        return schedule.weekDays.map(weekDay => {
            if (weekDay.recipe) {
                return weekDay.recipe;
            }
        });
    }
}