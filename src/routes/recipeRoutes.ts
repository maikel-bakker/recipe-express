import { RecipeController } from '../controllers/recipeController';

export class RecipeRoutes {
    recipeController : RecipeController = new RecipeController();  
        
    public routes(app): void {          
        app.route('/get-recipes').get(this.recipeController.getRecipes); 
        app.route('/add-recipe').post(this.recipeController.addRecipe);
    }
}