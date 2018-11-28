import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as cors from "cors";

import { RecipeRoutes } from "./routes/recipeRoutes";
import { IngredientRoutes } from "./routes/ingredientRoutes";

class App {

    app: express.Application;
    recipeRoutes: RecipeRoutes = new RecipeRoutes();
    ingredientRoutes: IngredientRoutes = new IngredientRoutes();
    mongoDbUrl: string = 'mongodb://maikel:sundin17@ds163417.mlab.com:63417/recipe-app';

    constructor() {
        this.app = express();
        this.config();
        this.recipeRoutes.routes(this.app);
        this.ingredientRoutes.routes(this.app);
        this.mongoSetup();
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        //enable cross domain
        this.app.use(cors());
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoDbUrl);    
    }

}

export default new App().app;