import { gql } from "apollo-server-core";

export const RecipeType = gql`
    type Recipe {
        _id: String!,
        title: String!,
        description: String!,
        serves: Int!,
        cookTime: Int!,
        difficulty: Int!,
        createdAt: String,
        updatedAt: String,
        ingredients: [Ingredient]
    }
`;