import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as cors from "cors";

import { RecipeRoutes } from "./routes/recipeRoutes";
import { IngredientRoutes } from "./routes/ingredientRoutes";
import { ScheduleRoutes } from "./routes/scheduleRoutes";

import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";

const { ObjectId } = mongoose.Types;

ObjectId.prototype.valueOf = function() {
  return this.toString();
};

class App {

    app: express.Application;
    server: ApolloServer = new ApolloServer({
        schema
    });
    recipeRoutes: RecipeRoutes = new RecipeRoutes();
    ingredientRoutes: IngredientRoutes = new IngredientRoutes();
    scheduleRoutes: ScheduleRoutes = new ScheduleRoutes();
    mongoDbUrl: string = 'mongodb://maikel:sundin17@ds163417.mlab.com:63417/recipe-app';

    constructor() {
        this.app = express();
        const app = this.app;
        this.server.applyMiddleware({app});
        this.config();
        this.recipeRoutes.routes(this.app);
        this.ingredientRoutes.routes(this.app);
        this.scheduleRoutes.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        //enable cross domain
        this.app.use(cors());
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoDbUrl, { useNewUrlParser: true });
    }

}

export default new App().app;