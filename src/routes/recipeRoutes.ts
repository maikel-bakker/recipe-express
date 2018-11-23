import { RecipeController } from '../controllers/recipeController';
import { Request, Response } from 'express';

export class RecipeRoutes {
    recipeController : RecipeController = new RecipeController();  
        
    public routes(app): void {          
        app.route('/get-recipes').get(this.recipeController.getRecipes); 
        app.route('/add-recipe').post(this.recipeController.addRecipe);
         
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        });  
    }
}