import { gql, makeExecutableSchema } from "apollo-server-express";
import { merge } from "lodash";

import { RecipeType } from "./types/recipeType";
import { RecipeResolver } from "./resolvers/recipeResolver";

import { IngredientType } from "./types/ingredientType";
import { IngredientResolver } from "./resolvers/ingredientResolver";
import { IngredientAmountType } from "./types/ingredientAmountType";

const Query = gql`
    type Query {
        recipes: [Recipe!]!,
        recipe(_id: String!): Recipe,
        ingredients: [Ingredient!]!
    }
`;

const Mutation = gql`
    type Mutation {
        addRecipe(
            title: String!,
            description: String!,
            serves: Int!,
            cookTime: Int!,
            difficulty: Int!,
            ingredients: [String]
        ) : Recipe
    }
`

export const schema = makeExecutableSchema({
    typeDefs: [ Query, Mutation, RecipeType, IngredientType, IngredientAmountType ],
    resolvers: merge(RecipeResolver, IngredientResolver),
});
