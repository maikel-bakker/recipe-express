import { IngredientController } from '../controllers/ingredientController';

export class IngredientRoutes {
    ingredientController : IngredientController = new IngredientController();  
        
    public routes(app): void {          
        app.route('/get-ingredients').get(this.ingredientController.getIngredients); 
        app.route('/add-ingredient').post(this.ingredientController.addIngredient);
    }
}